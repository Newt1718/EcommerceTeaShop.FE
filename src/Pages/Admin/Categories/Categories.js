import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
  createAdminCategoryApi,
  deleteAdminCategoryApi,
  getAdminCategoriesApi,
  updateAdminCategoryApi,
} from '../../../services/productApi';

const Categories = () => {
  const FORM_SECTION_ID = 'category-editor-form';
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await getAdminCategoriesApi({ pageNumber: 1, pageSize: 100 });
      setCategories(response?.data?.items || []);
    } catch (error) {
      toast.error(error?.message || 'Không tải được danh mục.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return categories;
    }

    return categories.filter((item) => {
      const id = String(item?.categoryId || '').toLowerCase();
      const itemName = String(item?.name || '').toLowerCase();
      const description = String(item?.description || '').toLowerCase();
      return id.includes(query) || itemName.includes(query) || description.includes(query);
    });
  }, [categories, searchQuery]);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setImageFile(null);
  };

  const startEdit = (category) => {
    const resolvedCategoryId = category?.categoryId || category?.id || null;
    setEditingId(resolvedCategoryId);
    setName(category?.name || '');
    setImageFile(null);

    toast.info(`Đang chỉnh sửa danh mục: ${category?.name || 'Không tên'}`);

    const editor = document.getElementById(FORM_SECTION_ID);
    if (editor) {
      editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning('Vui lòng nhập tên danh mục.');
      return;
    }

    if (!editingId && !imageFile) {
      toast.warning('Vui lòng chọn ảnh cho danh mục mới.');
      return;
    }

    try {
      setSubmitting(true);

      if (editingId) {
        await updateAdminCategoryApi({
          categoryId: editingId,
          name: name.trim(),
          image: imageFile,
        });
        toast.success('Cập nhật danh mục thành công.');
      } else {
        await createAdminCategoryApi({
          name: name.trim(),
          image: imageFile,
        });
        toast.success('Tạo danh mục thành công.');
      }

      resetForm();
      await loadCategories();
    } catch (error) {
      toast.error(error?.message || 'Không thể lưu danh mục.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (category) => {
    const categoryId = category?.categoryId;
    const categoryName = category?.name || '';

    if (!categoryId) {
      return;
    }

    const confirmed = window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${categoryName}"?`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteAdminCategoryApi(categoryId);
      toast.success('Xóa danh mục thành công.');
      setCategories((prev) => prev.filter((item) => item.categoryId !== categoryId));
      if (editingId === categoryId) {
        resetForm();
      }
    } catch (error) {
      toast.error(error?.message || 'Không thể xóa danh mục.');
    }
  };

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quản lý danh mục</h1>
            <p className="mt-1 text-slate-500">Thêm, sửa và xóa danh mục sản phẩm từ API admin.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div id={FORM_SECTION_ID} className="lg:col-span-1 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              {editingId ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tên danh mục</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="vd. Trà xanh"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Ảnh danh mục</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700 file:font-bold"
                />
                <p className="mt-1 text-xs text-slate-500">
                  {editingId
                    ? 'Nếu không chọn ảnh mới, hệ thống sẽ giữ ảnh hiện tại (nếu backend cho phép).'
                    : 'Danh mục mới cần ít nhất 1 ảnh.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-60"
                >
                  {submitting ? 'Đang xử lý...' : editingId ? 'Lưu cập nhật' : 'Tạo danh mục'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200"
                  >
                    Hủy sửa
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Tìm theo tên, mô tả hoặc categoryId..."
                />
              </div>
            </div>

            {loading ? (
              <div className="p-6 text-sm text-slate-500">Đang tải danh mục...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 text-sm font-semibold text-slate-600">Tên</th>
                      <th className="p-4 text-sm font-semibold text-slate-600">CategoryId</th>
                      <th className="p-4 text-sm font-semibold text-slate-600">Mô tả</th>
                      <th className="p-4 text-sm font-semibold text-slate-600">Ảnh</th>
                      <th className="p-4 text-sm font-semibold text-slate-600 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCategories.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="p-6 text-center text-sm text-slate-500">
                          Không có danh mục phù hợp.
                        </td>
                      </tr>
                    ) : (
                      filteredCategories.map((item) => (
                        <tr key={item.categoryId} className="hover:bg-slate-50">
                          <td className="p-4 text-sm font-bold text-slate-900">{item.name}</td>
                          <td className="p-4 text-xs font-mono text-slate-600">{item.categoryId}</td>
                          <td className="p-4 text-sm text-slate-600">{item.description || '-'}</td>
                          <td className="p-4 text-sm text-slate-600">{item.imageUrl || '-'}</td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => startEdit(item)}
                              className="cursor-pointer text-blue-600 hover:bg-blue-50 transition-colors px-2 py-1 rounded-md text-xs font-bold border border-transparent hover:border-blue-200"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              className="cursor-pointer text-red-600 hover:bg-red-50 transition-colors px-2 py-1 rounded-md text-xs font-bold border border-transparent hover:border-red-200"
                            >
                              Xóa
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;

