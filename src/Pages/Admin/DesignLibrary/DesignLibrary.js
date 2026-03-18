import React, { useMemo, useState } from "react";
import { designVariants } from "../../../data/designVariants";

const formatVnd = (value) => `${new Intl.NumberFormat('vi-VN').format(Number(value || 0))} đ`;

const emptyVariant = {
  id: "",
  label: "",
  name: "",
  description: "",
  placement: "Hero trang chủ",
  unitPrice: 0,
  heroImage: "",
};

const DesignLibrary = () => {
  const [variants, setVariants] = useState(designVariants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState(emptyVariant);
  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const summary = useMemo(() => {
    const total = variants.length;
    const avgPrice = total ? variants.reduce((sum, item) => sum + Number(item.unitPrice), 0) / total : 0;
    return { total, avgPrice: avgPrice.toFixed(2) };
  }, [variants]);

  const handleOpenModal = (variant = null) => {
    if (variant) {
      setEditingId(variant.id);
      setFormData({ ...variant });
    } else {
      setEditingId(null);
      setFormData({ ...emptyVariant, id: `style-${Date.now()}` });
    }
    setIsModalOpen(true);
  };

  const handleSaveVariant = () => {
    if (!formData.label || !formData.name || !formData.heroImage) {
      alert("Vui lòng nhập đầy đủ tên, label và chọn ảnh.");
      return;
    }

    setVariants((prev) => {
      if (editingId) {
        return prev.map((variant) => (variant.id === editingId ? { ...formData, unitPrice: Number(formData.unitPrice) } : variant));
      }
      return [...prev, { ...formData, unitPrice: Number(formData.unitPrice) }];
    });

    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDeleteVariant = () => {
    if (!pendingDelete) return;
    setVariants((prev) => prev.filter((variant) => variant.id !== pendingDelete.id));
    setPendingDelete(null);
    setIsDeleteOpen(false);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteOpen(false);
    setEditingId(null);
    setPendingDelete(null);
  };

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen relative">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">stylus_note</span>
                {editingId ? "Chỉnh sửa thiết kế" : "Thiết kế mới"}
              </h3>
              <button onClick={closeModals} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Label hiển thị</label>
                <input
                  value={formData.label}
                  onChange={(e) => setFormData((prev) => ({ ...prev, label: e.target.value }))}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="vd. Kiểu 6"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tên thiết kế</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="vd. Lunar Bloom"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Vị trí gợi ý</label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData((prev) => ({ ...prev, placement: e.target.value }))}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>Hero trang chủ</option>
                  <option>Banner danh mục</option>
                  <option>Popup / lead form</option>
                  <option>Trang thiết kế đặt riêng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Đơn giá tham khảo (đ)</label>
                <input
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData((prev) => ({ ...prev, unitPrice: e.target.value }))}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="vd. 55"
                />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  rows="3"
                  placeholder="Tông màu, cảm hứng, cách dùng"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Ảnh preview</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files && e.target.files[0];
                    if (!file) return;
                    const previewUrl = URL.createObjectURL(file);
                    setFormData((prev) => ({ ...prev, heroImage: previewUrl }));
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:border-blue-500 focus:ring-blue-500 sm:text-sm file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white hover:file:bg-slate-800"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={closeModals} className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                Hủy
              </button>
              <button onClick={handleSaveVariant} className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors">
                Lưu thiết kế
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteOpen && pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100">
            <div className="flex items-center justify-center size-12 rounded-full bg-red-50 text-red-600 mb-4 mx-auto">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-2">Xóa thiết kế?</h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              Thiết kế "{pendingDelete.name}" sẽ biến mất khỏi thư viện và trang khách hàng.
            </p>
            <div className="flex gap-3">
              <button onClick={closeModals} className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                Hủy
              </button>
              <button onClick={handleDeleteVariant} className="flex-1 py-2 rounded-lg bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Thư viện thiết kế đặt riêng</h1>
            <p className="mt-1 text-slate-500">Quản lý các layout mà khách có thể đặt mua trong mục Thiết kế.</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Thiết kế mới
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <p className="text-sm font-medium text-slate-500">Số thiết kế đang bán</p>
            <p className="text-3xl font-black text-slate-900 mt-2">{summary.total}</p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <p className="text-sm font-medium text-slate-500">Giá trung bình</p>
            <p className="text-3xl font-black text-slate-900 mt-2">{formatVnd(summary.avgPrice)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {variants.map((variant) => (
            <div key={variant.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3] bg-slate-100">
                {variant.heroImage ? (
                  <img src={variant.heroImage} alt={variant.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">No preview</div>
                )}
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-black uppercase tracking-widest bg-white/80 rounded-full">
                  {variant.label}
                </span>
              </div>
              <div className="flex-1 p-5 flex flex-col gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">{variant.placement}</p>
                  <h3 className="text-lg font-black text-slate-900">{variant.name}</h3>
                </div>
                <p className="text-sm text-slate-500 flex-1">{variant.description || "Chưa có mô tả"}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900">{formatVnd(variant.unitPrice)}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(variant)}
                      className="size-9 rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-colors flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button
                      onClick={() => {
                        setPendingDelete(variant);
                        setIsDeleteOpen(true);
                      }}
                      className="size-9 rounded-xl border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 transition-colors flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {variants.length === 0 && (
          <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-300 text-center text-slate-500 font-medium">
            Chưa có thiết kế nào. Hãy tạo thiết kế đầu tiên để khách có thể chọn mua.
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignLibrary;
