import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, setCartProducts } from "../../redux/cartSlice/cartSlice";
import { designVariants } from "../../data/designVariants";
import { addCartItemApi, getCartApi, normalizeCartProducts } from "../../services/cartApi";
import { getAddonsApi } from "../../services/addonApi";
import { getProductDetailApi } from "../../services/productApi";
import { toast } from "react-toastify";


const CUSTOM_PRODUCT_ID = "531af83d-feea-4720-8913-fb2f0e78a1fa";

const fallbackProduct = {
  productId: "custom-design-1",
  name: "Bespoke Tea Design",
  desc: "Tạo trải nghiệm trà hoàn hảo với tùy chọn thiết kế theo yêu cầu. Chọn kiểu bạn thích để hợp gu riêng.",
  variants: designVariants,
};

const isUuid = (value) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    String(value || ""),
  );

const formatVnd = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;

const CustomDesign = () => {
  const [customProduct, setCustomProduct] = useState(fallbackProduct);
  const [selectedStyle, setSelectedStyle] = useState(fallbackProduct.variants[0]);
  const [addons, setAddons] = useState([]);
  const [selectedAddonId, setSelectedAddonId] = useState("");
  const [adding, setAdding] = useState(false);
  const [productLoading, setProductLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const mapApiVariantsToDesignStyles = (apiProduct) => {
    const variants = Array.isArray(apiProduct?.variants) ? apiProduct.variants : [];

    if (variants.length === 0) {
      return fallbackProduct.variants;
    }

    return variants.map((variant, index) => {
      const designVisual = designVariants[index % designVariants.length] || designVariants[0];
      const gram = Number(variant?.gram || 0);

      return {
        id: variant?.variantId || designVisual?.id || `variant-${index}`,
        productVariantId: variant?.variantId || null,
        label: `${gram}g`,
        name: `${apiProduct?.name || fallbackProduct.name} ${gram}g`,
        unitPrice: Number(variant?.price || 0),
        stockQuantity: Number(variant?.stock || 0),
        heroImage: designVisual?.heroImage,
        description:
          apiProduct?.description ||
          designVisual?.description ||
          fallbackProduct.desc,
      };
    });
  };

  useEffect(() => {
    let mounted = true;

    const loadProduct = async () => {
      try {
        setProductLoading(true);
        const response = await getProductDetailApi(CUSTOM_PRODUCT_ID);
        const apiProduct = response?.data || {};
        const mappedVariants = mapApiVariantsToDesignStyles(apiProduct);

        if (mounted) {
          const normalizedProduct = {
            productId: apiProduct?.productId || fallbackProduct.productId,
            name: apiProduct?.name || fallbackProduct.name,
            desc: apiProduct?.description || fallbackProduct.desc,
            variants: mappedVariants,
          };

          setCustomProduct(normalizedProduct);
          setSelectedStyle(mappedVariants[0]);
        }
      } catch (error) {
        if (mounted) {
          setCustomProduct(fallbackProduct);
          setSelectedStyle(fallbackProduct.variants[0]);
          toast.error(error?.message || "Khong tai duoc bien the custom design.");
        }
      } finally {
        if (mounted) {
          setProductLoading(false);
        }
      }
    };

    const loadAddons = async () => {
      try {
        const response = await getAddonsApi();
        if (mounted) {
          setAddons(Array.isArray(response?.data) ? response.data : []);
        }
      } catch (error) {
        if (mounted) {
          setAddons([]);
          toast.error(error?.message || "Khong tai duoc danh sach addon.");
        }
      }
    };

    loadProduct();
    loadAddons();

    return () => {
      mounted = false;
    };
  }, []);

  const thumbnails = useMemo(
    () => customProduct.variants.map((variant) => ({ id: variant.id, image: variant.heroImage })),
    [customProduct.variants],
  );

  const selectedAddon = useMemo(
    () => addons.find((addon) => addon.id === selectedAddonId) || null,
    [addons, selectedAddonId],
  );

  const selectedStyleId = selectedStyle?.id;
  const selectedStyleStock = selectedStyle?.stockQuantity;

  useEffect(() => {
    const hasStockLimit = selectedStyleStock !== undefined && selectedStyleStock !== null;
    const maxQuantity = hasStockLimit
      ? Math.max(1, Number(selectedStyleStock || 1))
      : 99;
    setQuantity((prev) => Math.min(Math.max(prev, 1), maxQuantity));
  }, [selectedStyleId, selectedStyleStock]);

  const handleAddToCart = async () => {
    if (!selectedStyle) {
      return;
    }

    const hasStockLimit = selectedStyle.stockQuantity !== undefined && selectedStyle.stockQuantity !== null;

    if (hasStockLimit && Number(selectedStyle.stockQuantity || 0) <= 0) {
      toast.error("Bien the nay da het hang.");
      return;
    }

    if (hasStockLimit && quantity > Number(selectedStyle.stockQuantity || 0)) {
      toast.error("So luong vuot qua ton kho hien tai.");
      return;
    }

    const productVariantId = selectedStyle.productVariantId || selectedStyle.id;

    if (isUuid(productVariantId)) {
      try {
        setAdding(true);
        await addCartItemApi({
          productVariantId,
          addonId: selectedAddon?.id || undefined,
          quantity,
        });

        const cartResponse = await getCartApi();
        dispatch(setCartProducts(normalizeCartProducts(cartResponse?.data)));
        toast.success("Them vao gio hang thanh cong.");
      } catch (error) {
        toast.error(error?.message || "Khong the them vao gio hang.");
      } finally {
        setAdding(false);
      }
      return;
    }

    dispatch(
      addToCart({
        productId: customProduct.productId,
        name: customProduct.name,
        img: selectedStyle.heroImage,
        quantity: quantity,
        productDetail: {
          id: selectedStyle.id,
          productVariantId: null,
          addonId: selectedAddon?.id || null,
          addonName: selectedAddon?.name || null,
          sizeLabel: selectedStyle.label,
          unitPrice: selectedStyle.unitPrice,
        },
      }),
    );

    toast.info("Da them ban thiet ke local vao gio hang.");
  };

  const handleStyleSelect = (style) => {
    setSelectedStyle(style);
  };

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
        <span className="text-[#0d1b10] font-bold">Thiết kế tùy chỉnh</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] no-scrollbar pb-2 md:pb-0">
            {thumbnails.map((thumb) => (
              <div
                key={thumb.id}
                onClick={() => handleStyleSelect(customProduct.variants.find((variant) => variant.id === thumb.id))}
                className={`shrink-0 cursor-pointer border-2 rounded-xl overflow-hidden size-20 md:size-24 transition-all ${
                  selectedStyle.id === thumb.id
                    ? "border-primary opacity-100 scale-95"
                    : "border-transparent hover:border-primary/50 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={thumb.image}
                  alt={`Custom design thumbnail ${thumb.id}`}
                  className="w-full h-full object-cover"
                />
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
              {customProduct.name}
            </h1>
            <p className="text-2xl font-black text-primary">
              {formatVnd(selectedStyle.unitPrice)}
            </p>
            <p className="text-sm text-gray-500 font-medium">{selectedStyle.name}</p>
          </div>

          <p className="text-base leading-relaxed text-gray-600 font-medium">
            {selectedStyle.description || customProduct.desc}
          </p>

          <div className="h-px w-full bg-gray-200"></div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              Kiểu
            </label>
            <div className="flex flex-wrap gap-3">
              {customProduct.variants.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  disabled={
                    productLoading ||
                    (style.stockQuantity !== undefined &&
                      style.stockQuantity !== null &&
                      Number(style.stockQuantity || 0) <= 0)
                  }
                  onClick={() => handleStyleSelect(style)}
                  className={`px-6 py-2.5 rounded-xl border-2 font-bold transition-all ${
                    selectedStyle.id === style.id
                      ? "border-primary bg-primary/10 text-[#0d1b10] shadow-sm"
                      : "border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]"
                  }`}
                >
                  {style.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Ton kho: {selectedStyle?.stockQuantity ?? "Dang cap nhat"}
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              Add-on (tuy chon)
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSelectedAddonId("")}
                className={`px-4 py-2.5 rounded-xl border-2 font-bold transition-all ${
                  !selectedAddonId
                    ? "border-primary bg-primary/10 text-[#0d1b10] shadow-sm"
                    : "border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]"
                }`}
              >
                Khong chon
              </button>
              {addons.map((addon) => (
                <button
                  type="button"
                  key={addon.id}
                  onClick={() => setSelectedAddonId(addon.id)}
                  className={`px-4 py-2.5 rounded-xl border-2 font-bold transition-all ${
                    selectedAddonId === addon.id
                      ? "border-primary bg-primary/10 text-[#0d1b10] shadow-sm"
                      : "border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]"
                  }`}
                >
                  <span>{addon.name}</span>
                  <span className="ml-2 text-xs font-black text-gray-500">
                    +{formatVnd(addon.price)}
                  </span>
                </button>
              ))}
            </div>
            {selectedAddon && (
              <p className="text-sm font-medium text-gray-600">
                Da chon: {selectedAddon.name} (+{formatVnd(selectedAddon.price)})
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex items-center border-2 border-gray-200 rounded-xl h-14 w-32 overflow-hidden bg-white">
              <button
                className="w-10 h-full flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
              >
                <span className="material-symbols-outlined text-sm">
                  remove
                </span>
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
                    Math.min(
                      qty + 1,
                      selectedStyle?.stockQuantity !== undefined &&
                        selectedStyle?.stockQuantity !== null
                        ? Math.max(1, Number(selectedStyle?.stockQuantity || 1))
                        : 99,
                    ),
                  )
                }
                disabled={
                  selectedStyle?.stockQuantity !== undefined &&
                  selectedStyle?.stockQuantity !== null &&
                  quantity >= Math.max(1, Number(selectedStyle?.stockQuantity || 1))
                }
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={
                adding ||
                productLoading ||
                (selectedStyle?.stockQuantity !== undefined &&
                  selectedStyle?.stockQuantity !== null &&
                  Number(selectedStyle?.stockQuantity || 0) <= 0)
              }
              className="flex-1 h-14 bg-primary hover:bg-primary/90 text-[#0d1b10] font-black text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95"
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              {adding ? "Dang them..." : "Thêm vào giỏ"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomDesign;