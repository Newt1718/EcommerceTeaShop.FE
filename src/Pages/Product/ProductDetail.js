import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Description from "./Description";
import Origin from "./Origin";
import Reviews from "./Reviews";
import { useDispatch } from "react-redux";
import { setCartProducts } from "../../redux/cartSlice/cartSlice.js";
import { getProductDetailApi, getProductsApi } from "../../services/productApi";
import { getAddonsByProductApi } from "../../services/addonApi";
import {
  addCartItemApi,
  getCartApi,
  normalizeCartProducts,
} from "../../services/cartApi";
import { toast } from "react-toastify";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?auto=format&fit=crop&w=1200&q=80";

const formatVnd = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;

function extractImageUrl(image) {
  if (!image) {
    return null;
  }

  if (typeof image === "string") {
    return image;
  }

  if (typeof image !== "object") {
    return null;
  }

  return (
    image.imageUrl ||
    image.url ||
    image.path ||
    image.src ||
    image.thumbnail ||
    image.thumbnailUrl ||
    null
  );
}

function getProductImages(item) {
  const directCandidates = [
    item?.imageUrl,
    item?.thumbnail,
    item?.thumbnailUrl,
    item?.coverImage,
    item?.mainImage,
    item?.image,
  ];

  const direct = directCandidates.find((value) => Boolean(value));

  const arraySources = [item?.images, item?.productImages, item?.imageResponses];
  const mapped = [];

  for (const source of arraySources) {
    if (!Array.isArray(source)) {
      continue;
    }

    const main = source.find((image) =>
      Boolean(image?.isMain || image?.isPrimary || image?.isDefault || image?.isMainImage),
    );
    const mainUrl = extractImageUrl(main);
    if (mainUrl) {
      mapped.push(mainUrl);
    }

    source.forEach((image) => {
      const url = extractImageUrl(image);
      if (url) {
        mapped.push(url);
      }
    });
  }

  if (direct) {
    mapped.unshift(direct);
  }

  const unique = Array.from(new Set(mapped.filter(Boolean)));
  return unique;
}

function normalizeProduct(item) {
  const images = getProductImages(item);
  const mainImage = images[0] || FALLBACK_IMAGE;
  const variants = Array.isArray(item.variants) ? item.variants : [];
  const mappedVariants = variants
    .map((variant, index) => {
      const variantId =
        variant?.productVariantId ||
        variant?.variantId ||
        variant?.id ||
        `${item.productId}-variant-${index}`;

      const weight = Number(variant?.gram ?? variant?.weight ?? variant?.size ?? 100);
      const unit = variant?.sizeLabel || variant?.unit || variant?.weightUnit || "g";

      return {
        id: variantId,
        productVariantId: variantId,
        addonId: variant?.addonId || null,
        weight,
        sizeLabel: unit,
        unitPrice: Number(variant?.price || item.price || 0),
        stockQuantity: Number(variant?.stock ?? variant?.stockQuantity ?? item.stockQuantity ?? 0),
        sku: variant?.sku || variantId,
      };
    })
    .filter((variant) => Boolean(variant.productVariantId));

  return {
    productId: item.productId,
    name: item.name || "Sản phẩm trà",
    type: item.categoryName || "Khác",
    origin: item.categoryName || "Khác",
    desc: item.description || "Chưa có mô tả.",
    img: mainImage,
    thumbnails: images.length > 0 ? images : [mainImage],
    productDetails:
      mappedVariants.length > 0
        ? mappedVariants
        : [
            {
              id: `${item.productId}-default`,
              productVariantId: null,
              addonId: null,
              weight: 100,
              sizeLabel: "g",
              unitPrice: Number(item.price || 0),
              stockQuantity: Number(item.stockQuantity || 0),
              sku: item.productId,
            },
          ],
  };
}

function normalizeAddon(addon) {
  return {
    id: String(addon?.id || ""),
    name: addon?.name || "Thiết kế",
    description: addon?.description || "",
    imageUrl: addon?.imageUrl || "",
    price: Number(addon?.price || 0),
  };
}

const ProductDetail = () => {
  const { id } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedImage, setSelectedImage] = useState(FALLBACK_IMAGE);
  const [quantity, setQuantity] = useState(1);
  const [carouselStart, setCarouselStart] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const [assignedAddons, setAssignedAddons] = useState([]);
  const [addonMode, setAddonMode] = useState("none");
  const [selectedAddonId, setSelectedAddonId] = useState("");
  const [isAddonPopupOpen, setIsAddonPopupOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pageSize = 4;
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const [detailResponse, listResponse, addonResponse] = await Promise.all([
          getProductDetailApi(id),
          getProductsApi({ pageNumber: 1, pageSize: 100 }),
          getAddonsByProductApi(id),
        ]);

        const mappedList = (listResponse?.data?.items || []).map(normalizeProduct);
        setAllProducts(mappedList);

        const detailData = detailResponse?.data || {};
        const detailProduct = normalizeProduct(detailData);

        const addonItems = Array.isArray(addonResponse?.data) ? addonResponse.data : [];
        const normalizedAddons = addonItems.map(normalizeAddon).filter((addon) => addon.id);

        setProduct(detailProduct);
        setAssignedAddons(normalizedAddons);
        setAddonMode("none");
        setSelectedAddonId("");
        setIsAddonPopupOpen(false);
        setSelectedDetail(detailProduct.productDetails[0]);
        setSelectedImage(detailProduct.thumbnails[0] || detailProduct.img || FALLBACK_IMAGE);
        setQuantity(1);
      } catch (apiError) {
        setError(apiError?.message || "Không tải được thông tin sản phẩm.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProducts();
    }
  }, [id]);

  const selectedProductDetail =
    product?.productDetails.find((detail) => detail.id === selectedDetail?.id) ||
    product?.productDetails[0];

  const selectedDetailId = selectedProductDetail?.id;
  const selectedDetailStock = selectedProductDetail?.stockQuantity;
  const selectedAddon =
    assignedAddons.find((addon) => addon.id === selectedAddonId) || null;
  const hasAssignedAddons = assignedAddons.length > 0;
  const selectedAddonPrice = addonMode === "design" ? Number(selectedAddon?.price || 0) : 0;
  const finalUnitPrice = Number(selectedProductDetail?.unitPrice || 0) + selectedAddonPrice;

  useEffect(() => {
    const maxQuantity = Math.max(1, Number(selectedDetailStock || 1));
    setQuantity((prev) => Math.min(Math.max(prev, 1), maxQuantity));
  }, [selectedDetailId, selectedDetailStock]);

  const handleAddToCart = async () => {
    if (!product || !selectedProductDetail) {
      return;
    }

    if (!selectedProductDetail.productVariantId) {
      toast.error("Sản phẩm này chưa có biến thể khả dụng để thêm vào giỏ.");
      return;
    }

    if (Number(selectedProductDetail.stockQuantity || 0) <= 0) {
      toast.error("Biến thể này đã hết hàng.");
      return;
    }

    if (quantity > Number(selectedProductDetail.stockQuantity || 0)) {
      toast.error("Số lượng vượt quá tồn kho hiện tại.");
      return;
    }

    if (addonMode === "design" && !selectedAddon?.id) {
      toast.warning("Vui lòng chọn thiết kế cho sản phẩm.");
      return;
    }

    try {
      await addCartItemApi({
        productVariantId: selectedProductDetail.productVariantId,
        addonId: addonMode === "design" ? selectedAddon?.id : null,
        addonName: addonMode === "design" ? selectedAddon?.name : null,
        addonPrice: addonMode === "design" ? Number(selectedAddon?.price || 0) : 0,
        unitPrice: finalUnitPrice,
        quantity,
      });

      const cartResponse = await getCartApi();
      dispatch(setCartProducts(normalizeCartProducts(cartResponse?.data)));
      toast.success("Đã thêm sản phẩm vào giỏ hàng.");
    } catch (error) {
      const message = error?.message || "Không thể thêm sản phẩm vào giỏ hàng.";
      if (message.includes("Không tìm thấy biến thể")) {
        toast.error(
          "Biến thể này chưa hợp lệ trên server. Cần lấy productVariantId từ trường variants trong API chi tiết sản phẩm.",
        );
        return;
      }
      toast.error(message);
    }
  };

  const relatedProducts = useMemo(
    () => allProducts.filter((item) => item.productId !== id),
    [allProducts, id],
  );

  const relatedLen = relatedProducts.length;
  const prevCarousel = () => {
    if (relatedLen <= pageSize) return;
    setCarouselStart((s) => (s - pageSize + relatedLen) % relatedLen);
  };
  const nextCarousel = () => {
    if (relatedLen <= pageSize) return;
    setCarouselStart((s) => (s + pageSize) % relatedLen);
  };
  const visibleProducts =
    relatedLen === 0
      ? []
      : Array.from({ length: Math.min(pageSize, relatedLen) }, (_, i) => {
          const idx = (carouselStart + i) % relatedLen;
          return relatedProducts[idx];
        });

  if (loading) {
    return (
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-20 text-center text-gray-500 font-bold">
        Đang tải chi tiết sản phẩm...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-20 text-center text-red-500 font-bold">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-20 text-center text-gray-500 font-bold">
        Không tìm thấy sản phẩm.
      </div>
    );
  }

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10 font-display bg-background-light text-[#0d1b10] min-h-screen">
      <nav className="flex flex-wrap gap-2 pb-6 text-sm">
        <Link
          to="/"
          className="text-gray-500 hover:text-primary transition-colors font-medium"
        >
          Trang chủ
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          to="/shop"
          className="text-gray-500 hover:text-primary transition-colors font-medium"
        >
          Tất cả trà
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#0d1b10] font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] no-scrollbar pb-2 md:pb-0">
            {product.thumbnails.map((src, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(src)}
                className={`shrink-0 cursor-pointer border-2 rounded-xl overflow-hidden size-20 md:size-24 transition-all ${
                  selectedImage === src
                    ? "border-primary opacity-100 scale-95"
                    : "border-transparent hover:border-primary/50 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={src}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 h-[400px] md:h-[600px] rounded-3xl overflow-hidden bg-surface-light relative shadow-sm group">
            <img
              src={selectedImage || product.img || FALLBACK_IMAGE}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#0d1b10] mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-black text-primary">
              {formatVnd(finalUnitPrice)}
            </p>
          </div>

          <p className="text-base leading-relaxed text-gray-600 font-medium">
            {product.desc}
          </p>

          <div className="h-px w-full bg-gray-200"></div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              Kích cỡ
            </label>
            <div className="flex flex-wrap gap-3">
              {product.productDetails.map((detail) => (
                <button
                  key={detail.id}
                  type="button"
                  onClick={() => setSelectedDetail(detail)}
                  disabled={Number(detail.stockQuantity || 0) <= 0}
                  className={`px-6 py-2.5 rounded-xl border-2 font-bold transition-all ${
                    selectedProductDetail?.id === detail.id
                      ? "border-primary bg-primary/10 text-[#0d1b10] shadow-sm"
                      : "border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]"
                  }`}
                >
                  {detail.weight + detail.sizeLabel}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Tồn kho: {Number(selectedProductDetail?.stockQuantity || 0)}
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              Tùy chọn thiết kế
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setAddonMode("none");
                  setSelectedAddonId("");
                  setIsAddonPopupOpen(false);
                }}
                className={`px-5 py-2.5 rounded-xl border-2 font-bold transition-all ${
                  addonMode === "none"
                    ? "border-primary bg-primary/10 text-[#0d1b10] shadow-sm"
                    : "border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]"
                }`}
              >
                Không thiết kế
              </button>
              <button
                type="button"
                disabled={!hasAssignedAddons}
                onClick={() => {
                  setAddonMode("design");
                  setIsAddonPopupOpen(true);
                }}
                className={`px-5 py-2.5 rounded-xl border-2 font-bold transition-all ${
                  addonMode === "design"
                    ? "border-primary bg-primary/10 text-[#0d1b10] shadow-sm"
                    : "border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]"
                } ${!hasAssignedAddons ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                Chọn thiết kế
              </button>
            </div>

            {!hasAssignedAddons && (
              <p className="text-sm text-gray-500 font-medium">
                Sản phẩm này chưa được gán thiết kế nào.
              </p>
            )}

            {addonMode === "design" && selectedAddon && (
              <p className="text-sm text-gray-600 font-medium">
                Đã chọn: <span className="font-bold text-[#0d1b10]">{selectedAddon.name}</span> (+{formatVnd(selectedAddon.price)})
              </p>
            )}

            {addonMode === "design" && hasAssignedAddons && (
              <button
                type="button"
                onClick={() => setIsAddonPopupOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80"
              >
                <span className="material-symbols-outlined text-[18px]">palette</span>
                {selectedAddon ? "Đổi mẫu thiết kế" : "Chọn mẫu thiết kế"}
              </button>
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
                onClick={() =>
                  setQuantity((qty) =>
                    Math.min(qty + 1, Math.max(1, Number(selectedProductDetail?.stockQuantity || 1))),
                  )
                }
                disabled={quantity >= Math.max(1, Number(selectedProductDetail?.stockQuantity || 1))}
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={Number(selectedProductDetail?.stockQuantity || 0) <= 0}
              className="flex-1 h-14 bg-primary hover:bg-primary/90 text-[#0d1b10] font-black text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("Description")}
            className={`px-8 py-4 border-b-4 whitespace-nowrap font-black ${
              activeTab === "Description"
                ? "border-primary text-[#0d1b10]"
                : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600 font-bold"
            }`}
          >
            Mô tả
          </button>
          <button
            onClick={() => setActiveTab("Origin")}
            className={`px-8 py-4 border-b-4 whitespace-nowrap ${
              activeTab === "Origin"
                ? "border-primary text-[#0d1b10] font-black"
                : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600 font-bold"
            }`}
          >
            Xuất xứ
          </button>
          <button
            onClick={() => setActiveTab("Reviews")}
            className={`px-8 py-4 border-b-4 whitespace-nowrap ${
              activeTab === "Reviews"
                ? "border-primary text-[#0d1b10] font-black"
                : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600 font-bold"
            }`}
          >
            Đánh giá
          </button>
        </div>

        {activeTab === "Description" ? (
          <Description />
        ) : activeTab === "Origin" ? (
          <Origin />
        ) : (
          <Reviews />
        )}
      </div>

      <div className="mt-32 mb-12">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl md:text-3xl font-black text-[#0d1b10]">
            Có thể bạn sẽ thích
          </h3>
          <div className="flex gap-3">
            <button
              onClick={prevCarousel}
              className={`size-12 rounded-full border-2 flex items-center justify-center transition-colors text-gray-400 ${
                relatedLen <= pageSize
                  ? "opacity-40 cursor-not-allowed"
                  : "border-gray-200 hover:border-primary hover:text-primary"
              }`}
              aria-label="trước"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={nextCarousel}
              className={`size-12 rounded-full border-2 flex items-center justify-center transition-colors text-gray-400 ${
                relatedLen <= pageSize
                  ? "opacity-40 cursor-not-allowed"
                  : "border-gray-200 hover:border-primary hover:text-primary"
              }`}
              aria-label="sau"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {visibleProducts.map((item) => (
            <Link
              to={`/product/${item.productId}`}
              key={item.productId}
              className="flex flex-col gap-4 group cursor-pointer bg-white p-4 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-light">
                <img
                  src={item.img || FALLBACK_IMAGE}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-lg font-black group-hover:text-primary transition-colors text-[#0d1b10]">
                    {item.name}
                  </h4>
                  <span className="font-bold text-gray-500">
                    {formatVnd(item.productDetails[0]?.unitPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">{item.origin}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {isAddonPopupOpen && hasAssignedAddons && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h3 className="text-lg font-black text-[#0d1b10]">Chọn thiết kế cho sản phẩm</h3>
              <button
                type="button"
                onClick={() => setIsAddonPopupOpen(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-5 space-y-3">
              {assignedAddons.map((addon) => {
                const isSelected = selectedAddonId === addon.id;
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => setSelectedAddonId(addon.id)}
                    className={`w-full text-left rounded-xl border p-3 transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-slate-200 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {addon.imageUrl ? (
                        <img
                          src={addon.imageUrl}
                          alt={addon.name}
                          className="size-14 rounded-lg object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="size-14 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                          <span className="material-symbols-outlined">image</span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-[#0d1b10] truncate">{addon.name}</p>
                        <p className="text-sm font-bold text-primary">+{formatVnd(addon.price)}</p>
                        {addon.description && (
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{addon.description}</p>
                        )}
                      </div>
                      <span className={`material-symbols-outlined ${isSelected ? "text-primary" : "text-slate-300"}`}>
                        check_circle
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsAddonPopupOpen(false)}
                className="flex-1 rounded-lg bg-slate-100 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setAddonMode("design");
                  setIsAddonPopupOpen(false);
                }}
                disabled={!selectedAddonId}
                className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-black text-[#0d1b10] hover:bg-primary/90 disabled:opacity-60"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
