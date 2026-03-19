import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice/cartSlice';
import { designVariants } from '../../data/designVariants';
import { getAddonsApi } from '../../services/addonApi';
import { toast } from 'react-toastify';

const CUSTOM_DESIGN_PRODUCT = {
  productId: 'custom-design-product',
  name: 'Thiết kế trà tùy chỉnh',
  desc: 'Sản phẩm thiết kế riêng độc lập, khách có thể mua trực tiếp mà không gắn với trà có sẵn.',
  variants: designVariants,
};

const formatVnd = (value) => `${Number(value || 0).toLocaleString('vi-VN')}đ`;

const CustomDesign = () => {
  const [selectedStyle, setSelectedStyle] = useState(CUSTOM_DESIGN_PRODUCT.variants[0]);
  const [addons, setAddons] = useState([]);
  const [selectedAddonId, setSelectedAddonId] = useState('');
  const [loadingAddons, setLoadingAddons] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const loadAddons = async () => {
      try {
        setLoadingAddons(true);
        const response = await getAddonsApi();

        if (mounted) {
          setAddons(Array.isArray(response?.data) ? response.data : []);
        }
      } catch (error) {
        if (mounted) {
          setAddons([]);
          toast.error(error?.message || 'Không tải được danh sách add-on.');
        }
      } finally {
        if (mounted) {
          setLoadingAddons(false);
        }
      }
    };

    loadAddons();

    return () => {
      mounted = false;
    };
  }, []);

  const thumbnails = useMemo(
    () => CUSTOM_DESIGN_PRODUCT.variants.map((variant) => ({ id: variant.id, image: variant.heroImage })),
    [],
  );

  const selectedAddon = useMemo(
    () => addons.find((addon) => addon.id === selectedAddonId) || null,
    [addons, selectedAddonId],
  );

  const handleAddToCart = () => {
    if (!selectedStyle) {
      return;
    }

    const detailId = `${selectedStyle.id}-${selectedAddon?.id || 'none'}`;

    dispatch(
      addToCart({
        productId: CUSTOM_DESIGN_PRODUCT.productId,
        name: CUSTOM_DESIGN_PRODUCT.name,
        img: null,
        quantity,
        productDetail: {
          id: detailId,
          productVariantId: null,
          addonId: selectedAddon?.id || null,
          addonName: selectedAddon?.name || null,
          sizeLabel: selectedStyle.label,
          unitPrice: Number(selectedStyle.unitPrice || 0) + Number(selectedAddon?.price || 0),
        },
      }),
    );

    toast.success('Đã thêm thiết kế tùy chỉnh vào giỏ hàng.');
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
    setQuantity(1);
  };

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10 font-display bg-background-light text-[#0d1b10] min-h-screen">
      <nav className="flex flex-wrap gap-2 pb-6 text-sm">
        <Link to="/" className="text-gray-500 hover:text-primary transition-colors font-medium">
          Trang chủ
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#0d1b10] font-bold">Thiết kế tùy chỉnh</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] no-scrollbar pb-2 md:pb-0">
            {thumbnails.map((thumb) => (
              <div
                key={thumb.id}
                onClick={() => handleStyleSelect(CUSTOM_DESIGN_PRODUCT.variants.find((variant) => variant.id === thumb.id))}
                className={`shrink-0 cursor-pointer border-2 rounded-xl overflow-hidden size-20 md:size-24 transition-all ${
                  selectedStyle.id === thumb.id
                    ? 'border-primary opacity-100 scale-95'
                    : 'border-transparent hover:border-primary/50 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={thumb.image} alt={`Custom design thumbnail ${thumb.id}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          <div className="flex-1 h-[400px] md:h-[600px] rounded-3xl overflow-hidden bg-surface-light relative shadow-sm group">
            <img
              src={selectedStyle.heroImage}
              alt="Thiết kế trà tùy chỉnh"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#0d1b10] mb-2">
              {CUSTOM_DESIGN_PRODUCT.name}
            </h1>
            <p className="text-2xl font-black text-primary">{formatVnd(Number(selectedStyle.unitPrice || 0) + Number(selectedAddon?.price || 0))}</p>
            <p className="text-sm text-gray-500 font-medium">{selectedStyle.name}</p>
          </div>

          <p className="text-base leading-relaxed text-gray-600 font-medium">
            {selectedStyle.description || CUSTOM_DESIGN_PRODUCT.desc}
          </p>

          <div className="h-px w-full bg-gray-200"></div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Mẫu thiết kế</label>
            <div className="flex flex-wrap gap-3">
              {CUSTOM_DESIGN_PRODUCT.variants.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleStyleSelect(style)}
                  className={`px-6 py-2.5 rounded-xl border-2 font-bold transition-all ${
                    selectedStyle.id === style.id
                      ? 'border-primary bg-primary/10 text-[#0d1b10] shadow-sm'
                      : 'border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]'
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Add-on (tùy chọn)</label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedAddonId('')}
                className={`px-4 py-2.5 rounded-xl border-2 font-bold transition-all ${
                  !selectedAddonId
                    ? 'border-primary bg-primary/10 text-[#0d1b10] shadow-sm'
                    : 'border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]'
                }`}
              >
                Không chọn
              </button>
              {addons.map((addon) => (
                <button
                  type="button"
                  key={addon.id}
                  onClick={() => setSelectedAddonId(addon.id)}
                  className={`px-4 py-2.5 rounded-xl border-2 font-bold transition-all ${
                    selectedAddonId === addon.id
                      ? 'border-primary bg-primary/10 text-[#0d1b10] shadow-sm'
                      : 'border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]'
                  }`}
                >
                  <span>{addon.name}</span>
                  <span className="ml-2 text-xs font-black text-gray-500">+{formatVnd(addon.price)}</span>
                </button>
              ))}
            </div>
            {loadingAddons && <p className="text-xs text-slate-500">Đang tải add-on...</p>}
            {selectedAddon && (
              <p className="text-sm font-medium text-gray-600">
                Đã chọn: {selectedAddon.name} (+{formatVnd(selectedAddon.price)})
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center border-2 border-gray-200 rounded-xl h-14 w-32 overflow-hidden bg-white">
              <button
                className="w-10 h-full flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <input
                type="text"
                readOnly
                value={quantity}
                className="flex-1 w-full h-full text-center bg-transparent border-none focus:ring-0 p-0 font-black text-[#0d1b10]"
              />
              <button
                className="w-10 h-full flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                onClick={() => setQuantity((qty) => Math.min(99, qty + 1))}
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 h-14 bg-primary hover:bg-primary/90 text-[#0d1b10] font-black text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
