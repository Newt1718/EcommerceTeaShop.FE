import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  removeItem,
  setCartProducts,
} from "../../redux/cartSlice/cartSlice.js";
import {
  addCartItemApi,
  getCartApi,
  normalizeCartProducts,
  removeCartItemApi,
  updateCartItemApi,
} from "../../services/cartApi";
import { getProductDetailApi, getProductsApi } from "../../services/productApi";
import { toast } from "react-toastify";

const formatVnd = (value) => `${Number(value || 0).toLocaleString("vi-VN")}đ`;
const FALLBACK_CART_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80";
const CHECKOUT_SELECTED_ITEMS_KEY = "checkoutSelectedCartItemIds";

const isLocalOnlyDetail = (detail) => !detail?.cartItemId && !detail?.productVariantId;

const isSameDetailLine = (detailA, detailB) => {
  const sameId = String(detailA?.id || "") === String(detailB?.id || "");
  const sameAddon = String(detailA?.addonId || "") === String(detailB?.addonId || "");
  return sameId && sameAddon;
};

const getItemUnitPrice = (item) => Number(item?.unitPrice || 0);

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isUnknownProductId(value) {
  return String(value || "").startsWith("unknown-product-");
}

function getVariantId(variant) {
  return (
    variant?.productVariantId ||
    variant?.variantId ||
    variant?.variantID ||
    variant?.id ||
    null
  );
}

function getVariantPrice(variant) {
  return Number(
    variant?.price ||
      variant?.unitPrice ||
      variant?.salePrice ||
      variant?.basePrice ||
      0,
  );
}

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
    image.imagePath ||
    image.filePath ||
    null
  );
}

function extractProductImage(item) {
  const imageLists = [
    item?.images,
    item?.productImages,
    item?.imageResponses,
    item?.productImageResponses,
  ];

  for (const list of imageLists) {
    if (!Array.isArray(list)) {
      continue;
    }

    const preferred = list.find((img) =>
      Boolean(img?.isMain || img?.isPrimary || img?.isDefault || img?.isMainImage),
    );
    const preferredUrl = extractImageUrl(preferred);
    if (preferredUrl) {
      return preferredUrl;
    }
  }

  const directCandidates = [
    item?.imageUrl,
    item?.thumbnail,
    item?.thumbnailUrl,
    item?.coverImage,
    item?.mainImage,
    item?.image,
    item?.imagePath,
    item?.filePath,
  ];

  for (const candidate of directCandidates) {
    const resolvedCandidate = extractImageUrl(candidate);
    if (resolvedCandidate) {
      return resolvedCandidate;
    }
  }

  for (const list of imageLists) {
    if (!Array.isArray(list)) {
      continue;
    }

    for (const image of list) {
      const url = extractImageUrl(image);
      if (url) {
        return url;
      }
    }
  }

  return null;
}

function shouldReplaceImage(currentImage, nextImage) {
  if (!nextImage) {
    return false;
  }

  if (!currentImage) {
    return true;
  }

  return currentImage === FALLBACK_CART_IMAGE;
}

const extractLocalOnlyProducts = (products) => {
  const list = Array.isArray(products) ? products : [];

  return list
    .map((product) => {
      const details = (product?.productDetails || []).filter(isLocalOnlyDetail);

      if (details.length === 0) {
        return null;
      }

      return {
        productId: product.productId,
        name: product.name,
        img: product.img || null,
        productDetails: details,
      };
    })
    .filter(Boolean);
};

const mergeProductsByDetails = (serverProducts, localProducts) => {
  const merged = new Map();

  (Array.isArray(serverProducts) ? serverProducts : []).forEach((product) => {
    merged.set(product.productId, {
      ...product,
      productDetails: Array.isArray(product.productDetails)
        ? [...product.productDetails]
        : [],
    });
  });

  (Array.isArray(localProducts) ? localProducts : []).forEach((localProduct) => {
    const existing = merged.get(localProduct.productId);

    if (!existing) {
      merged.set(localProduct.productId, {
        ...localProduct,
        productDetails: Array.isArray(localProduct.productDetails)
          ? [...localProduct.productDetails]
          : [],
      });
      return;
    }

    localProduct.productDetails?.forEach((localDetail) => {
      const matchedDetail = existing.productDetails.find(
        (detail) => isSameDetailLine(detail, localDetail),
      );

      if (matchedDetail) {
        matchedDetail.quantity += Number(localDetail.quantity || 0);
      } else {
        existing.productDetails.push({ ...localDetail });
      }
    });

    if (shouldReplaceImage(existing.img, localProduct.img)) {
      existing.img = localProduct.img;
    }
  });

  return Array.from(merged.values());
};

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedCartItemIds, setSelectedCartItemIds] = useState([]);

  // 1. Get data from Redux
  const products = useSelector((state) => state.cart.products);

  const loadCart = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getCartApi();
      const normalizedProducts = normalizeCartProducts(response?.data);

      const storedProducts =
        localStorage.getItem("cartList") !== null
          ? JSON.parse(localStorage.getItem("cartList"))
          : [];
      const localOnlyProducts = extractLocalOnlyProducts(storedProducts);
      const mergedProducts = mergeProductsByDetails(
        normalizedProducts,
        localOnlyProducts,
      );

      let productIdByName = new Map();
      try {
        const catalogResponse = await getProductsApi({ pageNumber: 1, pageSize: 200 });
        const catalogItems = Array.isArray(catalogResponse?.data?.items)
          ? catalogResponse.data.items
          : [];
        productIdByName = new Map(
          catalogItems
            .map((item) => [normalizeText(item?.name), item?.productId || item?.id])
            .filter(([nameKey, id]) => Boolean(nameKey) && Boolean(id)),
        );
      } catch (catalogError) {
        productIdByName = new Map();
      }

      const hydratedProducts = await Promise.all(
        mergedProducts.map(async (product) => {
          const resolvedProductId = isUnknownProductId(product?.productId)
            ? productIdByName.get(normalizeText(product?.name)) || product?.productId
            : product?.productId;

          const needsImage = !product?.img || product.img === FALLBACK_CART_IMAGE;
          const needsPrice = (product?.productDetails || []).some(
            (detail) => Number(detail?.unitPrice || 0) <= 0,
          );

          if ((!needsImage && !needsPrice) || !resolvedProductId || isUnknownProductId(resolvedProductId)) {
            return product;
          }

          try {
            const detailResponse = await getProductDetailApi(resolvedProductId);
            const detail = detailResponse?.data || {};
            const detailImage = extractProductImage(detailResponse?.data);
            const variants = Array.isArray(detail?.variants) ? detail.variants : [];

            const variantPriceMap = new Map(
              variants
                .map((variant) => [String(getVariantId(variant) || ""), getVariantPrice(variant)])
                .filter(([id, price]) => Boolean(id) && Number(price) > 0),
            );
            const fallbackVariantPrice = Math.min(
              ...variants
                .map((variant) => getVariantPrice(variant))
                .filter((price) => Number(price) > 0),
            );

            const nextDetails = (product?.productDetails || []).map((detailLine) => {
              if (Number(detailLine?.unitPrice || 0) > 0) {
                return detailLine;
              }

              const detailVariantId = String(
                detailLine?.productVariantId || detailLine?.id || "",
              );
              const resolvedUnitPrice =
                variantPriceMap.get(detailVariantId) ||
                (Number.isFinite(fallbackVariantPrice) ? fallbackVariantPrice : 0);

              return {
                ...detailLine,
                unitPrice: resolvedUnitPrice,
              };
            });

            return {
              ...product,
              productId: resolvedProductId,
              img: detailImage || product.img || null,
              productDetails: nextDetails,
            };
          } catch (detailError) {
            return {
              ...product,
              productId: resolvedProductId,
              img: product.img || null,
            };
          }
        }),
      );

      dispatch(setCartProducts(hydratedProducts));
    } catch (error) {
      const message = error?.message || "Khong tai duoc gio hang.";
      if (message.includes("Giỏ hàng trống")) {
        const storedProducts =
          localStorage.getItem("cartList") !== null
            ? JSON.parse(localStorage.getItem("cartList"))
            : [];
        const localOnlyProducts = extractLocalOnlyProducts(storedProducts);
        dispatch(setCartProducts(localOnlyProducts));
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleIncreaseQuantity = async (item) => {
    if (item?.cartItemId) {
      try {
        await updateCartItemApi({
          cartItemId: item.cartItemId,
          quantity: Number(item.quantity || 0) + 1,
        });
        await loadCart();
      } catch (error) {
        toast.error(error?.message || "Khong the cap nhat so luong san pham.");
      }
      return;
    }

    if (!item?.productVariantId) {
      dispatch(
        addToCart({
          productId: item.productId,
          name: item.name,
          img: item.img,
          quantity: 1,
          productDetail: {
            id: item.id,
            sizeLabel: item.sizeLabel,
            unitPrice: item.unitPrice,
            addonId: item.addonId || null,
            addonName: item.addonName || null,
          },
        }),
      );
      return;
    }

    try {
      await addCartItemApi({
        productVariantId: item.productVariantId,
        addonId: item.addonId || null,
        quantity: 1,
      });
      await loadCart();
    } catch (error) {
      toast.error(error?.message || "Khong the cap nhat so luong san pham.");
    }
  };

  const handleDecreaseQuantity = async (item) => {
    if (item?.cartItemId) {
      try {
        if (Number(item.quantity || 0) <= 1) {
          await removeCartItemApi(item.cartItemId);
        } else {
          await updateCartItemApi({
            cartItemId: item.cartItemId,
            quantity: Number(item.quantity || 0) - 1,
          });
        }
        await loadCart();
      } catch (error) {
        toast.error(error?.message || "Khong the cap nhat so luong san pham.");
      }
      return;
    }

    dispatch(
      decreaseQuantity({
        productId: item.productId,
        detailId: item.id,
        addonId: item.addonId || null,
      }),
    );
  };

  const handleRemoveCartItem = async (item) => {
    if (item?.cartItemId) {
      try {
        await removeCartItemApi(item.cartItemId);
        await loadCart();
      } catch (error) {
        toast.error(error?.message || "Khong the xoa san pham khoi gio hang.");
      }
      return;
    }

    dispatch(
      removeItem({
        productId: item.productId,
        detailId: item.id,
        addonId: item.addonId || null,
      }),
    );
  };

  // 2. Flatten nested structure for the UI list
  const flatCartItems =
    products?.flatMap(
      (product) =>
        product.productDetails?.map((detail) => ({
          ...detail,
          productId: product.productId,
          name: product.name,
          img: product.img || null,
        })) || [],
    ) || [];

  useEffect(() => {
    const selectableIds = Array.from(
      new Set(flatCartItems.map((item) => item?.cartItemId).filter(Boolean)),
    );

    setSelectedCartItemIds((prev) => {
      const preserved = (Array.isArray(prev) ? prev : []).filter((id) =>
        selectableIds.includes(id),
      );
      return preserved;
    });
  }, [flatCartItems]);

  const selectedSet = new Set(selectedCartItemIds);
  const selectedFlatCartItems = flatCartItems.filter(
    (item) => item?.cartItemId && selectedSet.has(item.cartItemId),
  );
  const selectableItemCount = Array.from(
    new Set(flatCartItems.map((item) => item?.cartItemId).filter(Boolean)),
  ).length;
  const selectedCount = selectedCartItemIds.length;
  const allSelected = selectableItemCount > 0 && selectedCount === selectableItemCount;

  const handleToggleItemSelection = (cartItemId) => {
    if (!cartItemId) {
      return;
    }

    setSelectedCartItemIds((prev) => {
      if (prev.includes(cartItemId)) {
        return prev.filter((id) => id !== cartItemId);
      }
      return [...prev, cartItemId];
    });
  };

  const handleToggleSelectAll = () => {
    const allIds = Array.from(
      new Set(flatCartItems.map((item) => item?.cartItemId).filter(Boolean)),
    );

    setSelectedCartItemIds((prev) =>
      prev.length === allIds.length ? [] : allIds,
    );
  };

  const handleProceedCheckout = () => {
    if (selectedCartItemIds.length === 0) {
      toast.warning("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán.");
      return;
    }

    const targetUrl = `/checkout?from=cart&ts=${Date.now()}`;

    try {
      sessionStorage.setItem(
        CHECKOUT_SELECTED_ITEMS_KEY,
        JSON.stringify(selectedCartItemIds),
      );
    } catch (error) {
      // ignore storage failures and still navigate with state/fallback redirect
    }

    navigate(targetUrl, {
      state: {
        selectedCartItemIds,
        fromCart: true,
      },
    });

    setTimeout(() => {
      if (window.location.pathname === "/cart") {
        window.location.assign(targetUrl);
      }
    }, 0);
  };

  const calculatedTotal = selectedFlatCartItems.reduce((acc, item) => {
    return acc + getItemUnitPrice(item) * Number(item.quantity || 0);
  }, 0);

  const cartItemCount = flatCartItems.length;

  return (
    <div className="flex-1 flex justify-center py-8 px-4 md:px-10 lg:px-20 font-display bg-background-light text-[#102213] min-h-screen">
      <div className="flex flex-col max-w-[1200px] w-full">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 pb-6 px-1">
          <Link
            to="/"
            className="text-gray-500 hover:text-primary text-sm font-medium transition-colors"
          >
            Trang chủ
          </Link>
          <span className="text-gray-400 text-sm font-medium">/</span>
          <span className="text-[#102213] text-sm font-medium">Giỏ hàng</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side: Cart Items */}
          <div className="flex-1 w-full flex flex-col gap-6">
            <div className="flex justify-between items-end border-b border-[#e7f3e9] pb-4">
              <h1 className="text-[#0d1b10] text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Giỏ hàng của bạn ({cartItemCount} món)
              </h1>
            </div>

            {flatCartItems.length > 0 && (
              <div className="flex items-center justify-between rounded-lg border border-[#e7f3e9] bg-white p-3">
                <label className="inline-flex items-center gap-2 text-sm font-medium text-[#0d1b10] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleToggleSelectAll}
                    disabled={selectableItemCount === 0}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  Chọn tất cả
                </label>
                <span className="text-sm text-gray-500">
                  Đã chọn {selectedCount}/{selectableItemCount} sản phẩm có thể thanh toán
                </span>
              </div>
            )}

            {loading ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Dang tai gio hang...</p>
              </div>
            ) : flatCartItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Giỏ hàng của bạn đang trống.</p>
                <Link
                  to="/shop"
                  className="text-primary font-bold mt-4 inline-block underline"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            ) : (
              flatCartItems.map((item) => (
                <div
                  key={`${item.id}-${item.addonId || "none"}`}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white p-6 rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] transition-all"
                >
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={Boolean(item?.cartItemId && selectedSet.has(item.cartItemId))}
                      onChange={() => handleToggleItemSelection(item?.cartItemId)}
                      disabled={!item?.cartItemId}
                      title={!item?.cartItemId ? "Sản phẩm này chưa đồng bộ cartItemId." : "Chọn để checkout"}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
                    />
                  </div>

                  <div className="shrink-0">
                    {item.img ? (
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-full sm:w-28 h-28"
                        style={{ backgroundImage: `url("${item.img}")` }}
                      ></div>
                    ) : (
                      <div className="rounded-lg w-full sm:w-28 h-28 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 text-xs font-bold px-2 text-center">
                        Không yêu cầu ảnh
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between h-full min-h-[112px]">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="text-[#0d1b10] text-lg font-bold leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm font-normal mt-1">
                          {item.sizeLabel}
                        </p>
                        {item.addonId ? (
                          <p className="text-gray-500 text-sm font-normal mt-1">
                            Thiet ke: {item.addonName || "Thiet ke da chon"}
                          </p>
                        ) : (
                          <p className="text-gray-500 text-sm font-normal mt-1">Khong thiet ke</p>
                        )}
                      </div>
                      <p className="text-[#0d1b10] text-lg font-bold">
                        {formatVnd(getItemUnitPrice(item))}
                      </p>
                    </div>

                    <div className="flex justify-between items-end mt-4 sm:mt-0">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-[#e7f3e9] bg-background-light h-9">
                          <button
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#0d1b10] transition-colors"
                          >
                            -
                          </button>
                          <input
                            className="w-8 h-full text-center bg-transparent border-none text-sm font-medium focus:ring-0 p-0 text-[#0d1b10]"
                            type="number"
                            readOnly
                            value={item.quantity}
                          />
                          <button
                            onClick={() => handleIncreaseQuantity(item)}
                            className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#0d1b10] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveCartItem(item)}
                        className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                        <span className="hidden sm:inline">Xóa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e7f3e9]">
              <h3 className="font-bold text-xl mb-6 text-[#0d1b10]">
                Tổng đơn hàng
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tạm tính (mục đã chọn)</span>
                  <span className="font-medium text-[#0d1b10]">
                    {formatVnd(calculatedTotal)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Phí vận chuyển dự kiến</span>
                  <span className="font-medium text-primary">Miễn phí</span>
                </div>
              </div>

              <div className="border-t border-[#e7f3e9] my-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-[#0d1b10]">
                    Tổng
                  </span>
                  <span className="text-2xl font-black text-[#0d1b10]">
                    {formatVnd(calculatedTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceedCheckout}
                disabled={selectedCount === 0}
                className="w-full bg-primary disabled:bg-gray-300 text-[#102213] text-lg font-bold py-3.5 rounded-lg hover:bg-[#10d430] active:scale-[0.99] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Thanh toán mục đã chọn</span>
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
