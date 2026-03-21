import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { designVariants } from '../../data/designVariants';

const CUSTOM_DESIGN_PRODUCT = {
  productId: 'custom-design-product',
  name: 'Thiết kế trà tùy chỉnh',
  desc: 'Bộ sưu tập mẫu thiết kế được dựng để truyền cảm hứng hình ảnh cho từng phong cách trà.',
  variants: designVariants,
};

const CustomDesign = () => {
  const [selectedStyle, setSelectedStyle] = useState(CUSTOM_DESIGN_PRODUCT.variants[0]);
  const navigate = useNavigate();

  const thumbnails = useMemo(
    () => CUSTOM_DESIGN_PRODUCT.variants.map((variant) => ({ id: variant.id, image: variant.heroImage })),
    [],
  );

  const goToShop = () => {
    navigate('/shop');
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
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
            <p className="text-2xl font-black text-primary">{selectedStyle.name}</p>
            <p className="text-sm text-gray-500 font-medium">Dành cho mục đích tham khảo phong cách thiết kế</p>
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

          <div className="rounded-2xl bg-surface-light border border-gray-200 p-4 md:p-5">
            <p className="text-sm font-semibold text-gray-600 mb-2">Ứng dụng đề xuất</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Vị trí phù hợp: <span className="font-bold text-[#0d1b10]">{selectedStyle.placement}</span> • Cập nhật lần cuối: {selectedStyle.lastUpdated}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={goToShop}
              className="flex-1 h-14 bg-primary hover:bg-primary/90 text-[#0d1b10] font-black text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined">storefront</span>
              Khám phá trà trong cửa hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
