import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../../Components/SlideBanner/HeroSlider";
import {
  getCategoriesApi,
  getProductDetailApi,
  getProductsApi,
} from "../../services/productApi";

const CATEGORIES_PER_PAGE = 4;
const FALLBACK_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80";

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
  const direct =
    item?.imageUrl ||
    item?.thumbnail ||
    item?.thumbnailUrl ||
    item?.coverImage ||
    item?.mainImage ||
    item?.image ||
    item?.imagePath ||
    item?.filePath ||
    null;

  if (direct) {
    return direct;
  }

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
    const fromPreferred = extractImageUrl(preferred);
    if (fromPreferred) {
      return fromPreferred;
    }

    for (const image of list) {
      const fromList = extractImageUrl(image);
      if (fromList) {
        return fromList;
      }
    }
  }

  return null;
}

function getPurchaseCount(item) {
  const candidates = [
    item?.soldCount,
    item?.soldQuantity,
    item?.totalSold,
    item?.purchaseCount,
    item?.orderCount,
    item?.totalOrders,
  ];

  for (const value of candidates) {
    const converted = Number(value);
    if (Number.isFinite(converted) && converted >= 0) {
      return converted;
    }
  }

  return 0;
}

function extractCategoryImage(item) {
  return (
    item?.imageUrl ||
    item?.image ||
    item?.thumbnail ||
    item?.coverImage ||
    null
  );
}

function mapCategoryCard(item) {
  const id = item?.categoryId || item?.id || "";
  const name = item?.name || "Danh mục";
  const imageUrl = extractCategoryImage(item);

  return {
    id: String(id || name),
    name,
    imageUrl,
    hasImage: Boolean(imageUrl),
  };
}

function deriveCategoryCardsFromProducts(products) {
  const list = Array.isArray(products) ? products : [];
  const byName = new Map();

  list.forEach((item, index) => {
    const name = String(item?.categoryName || "").trim();
    if (!name) {
      return;
    }

    if (byName.has(name)) {
      return;
    }

    const fallbackId = item?.categoryId || item?.categoryID || `derived-category-${index}`;

    byName.set(name, {
      id: String(fallbackId || name),
      name,
      imageUrl: null,
      hasImage: false,
    });
  });

  return Array.from(byName.values());
}

function mapFavoriteProduct(item) {
  const purchaseCount = getPurchaseCount(item);

  return {
    id: item?.productId || item?.id,
    name: item?.name || "Sản phẩm",
    price: Number(item?.price || 0),
    desc: item?.origin || item?.categoryName || "Đang cập nhật",
    tag: purchaseCount > 0 ? `ĐÃ MUA ${purchaseCount}` : "BÁN CHẠY",
    purchaseCount,
    img: extractProductImage(item),
  };
}

function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("vi-VN")}đ`;
}

const Home = () => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoryPage, setCategoryPage] = useState(1);

  useEffect(() => {
    let mounted = true;

    async function loadFavorites() {
      setFavoritesLoading(true);
      try {
        const response = await getProductsApi({ pageNumber: 1, pageSize: 100 });
        const list = Array.isArray(response?.data?.items)
          ? response.data.items
          : Array.isArray(response?.data)
            ? response.data
            : [];

        const mapped = list
          .map(mapFavoriteProduct)
          .filter((item) => item.id)
          .sort((a, b) => {
            if (b.purchaseCount !== a.purchaseCount) {
              return b.purchaseCount - a.purchaseCount;
            }
            return Number(b.price || 0) - Number(a.price || 0);
          })
          .slice(0, 4);

        const withImage = await Promise.all(
          mapped.map(async (product) => {
            if (product.img) {
              return product;
            }

            try {
              const detailResponse = await getProductDetailApi(product.id);
              const detailImage = extractProductImage(detailResponse?.data);
              return {
                ...product,
                img: detailImage || FALLBACK_PRODUCT_IMAGE,
              };
            } catch (detailError) {
              return {
                ...product,
                img: FALLBACK_PRODUCT_IMAGE,
              };
            }
          }),
        );

        if (mounted) {
          setFavorites(withImage);
        }
      } catch (error) {
        if (mounted) {
          setFavorites([]);
        }
      } finally {
        if (mounted) {
          setFavoritesLoading(false);
        }
      }
    }

    loadFavorites();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      setCategoriesLoading(true);
      try {
        const response = await getCategoriesApi({ pageNumber: 1, pageSize: 20 });
        const apiItems = Array.isArray(response?.data?.items)
          ? response.data.items
          : Array.isArray(response?.data)
            ? response.data
            : [];
        const mapped = apiItems.map(mapCategoryCard).filter((item) => item.id && item.name);

        if (mapped.length > 0) {
          if (mounted) {
            setCategories(mapped);
            setCategoryPage(1);
          }
          return;
        }

        const productResponse = await getProductsApi({ pageNumber: 1, pageSize: 100 });
        const productItems = Array.isArray(productResponse?.data?.items)
          ? productResponse.data.items
          : Array.isArray(productResponse?.data)
            ? productResponse.data
            : [];
        const derived = deriveCategoryCardsFromProducts(productItems);

        if (mounted) {
          setCategories(derived);
          setCategoryPage(1);
        }
      } catch (error) {
        try {
          const productResponse = await getProductsApi({ pageNumber: 1, pageSize: 100 });
          const productItems = Array.isArray(productResponse?.data?.items)
            ? productResponse.data.items
            : Array.isArray(productResponse?.data)
              ? productResponse.data
              : [];
          const derived = deriveCategoryCardsFromProducts(productItems);

          if (mounted) {
            setCategories(derived);
            setCategoryPage(1);
          }
        } catch (fallbackError) {
          if (mounted) {
            setCategories([]);
            setCategoryPage(1);
          }
        }
      } finally {
        if (mounted) {
          setCategoriesLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const categoryCards = useMemo(() => {
    if (categories.length > 0) {
      return categories;
    }

    return Array.from({ length: 4 }).map((_, index) => ({
      id: `category-placeholder-${index}`,
      name: categoriesLoading ? "Đang tải..." : "Coming soon",
      imageUrl: null,
      hasImage: false,
      isPlaceholder: true,
    }));
  }, [categories, categoriesLoading]);

  const categoryPageCount = Math.max(1, Math.ceil(categoryCards.length / CATEGORIES_PER_PAGE));
  const currentCategoryPage = Math.min(categoryPage, categoryPageCount);
  const pagedCategoryCards = useMemo(() => {
    const startIndex = (currentCategoryPage - 1) * CATEGORIES_PER_PAGE;
    return categoryCards.slice(startIndex, startIndex + CATEGORIES_PER_PAGE);
  }, [categoryCards, currentCategoryPage]);

  const favoriteCards = useMemo(() => {
    if (!favoritesLoading && favorites.length > 0) {
      return favorites;
    }

    return Array.from({ length: 4 }).map((_, index) => ({
      id: `skeleton-${index}`,
      name: favoritesLoading ? "Đang tải..." : "Chưa có sản phẩm",
      price: 0,
      desc: favoritesLoading
        ? "Vui lòng đợi trong giây lát"
        : "Vui lòng quay lại sau",
      tag: "",
      img:
        "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=900&q=80",
      isPlaceholder: true,
    }));
  }, [favorites, favoritesLoading]);

  return (
    <div className="bg-background-light text-[#0d1b10] font-display">
      <HeroSlider></HeroSlider>

      <section className="max-w-[1440px] mx-auto px-4 md:px-10 pt-16 pb-8">
        <div className="flex flex-col items-center mb-10">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Khám phá
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Chọn theo danh mục
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {pagedCategoryCards.map((cat, i) => (
            <Link
              to={cat.isPlaceholder ? "/shop" : `/shop?category=${encodeURIComponent(cat.name)}`}
              key={cat.id || i}
              className={`group relative overflow-hidden rounded-xl aspect-[4/5] md:aspect-square shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 block ${cat.isPlaceholder ? "pointer-events-none" : ""}`}
            >
              {cat.hasImage ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url("${cat.imageUrl}")` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_45%)]"></div>
                  <div className="absolute top-4 right-4 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Unavailable
                  </div>
                </>
              )}
              <div className="absolute bottom-0 p-5 w-full flex flex-col gap-1">
                <p className="text-white text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {cat.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setCategoryPage((prev) => Math.max(1, prev - 1))}
            disabled={currentCategoryPage <= 1}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Trang trước
          </button>

          <span className="text-sm font-medium text-slate-500">
            Trang {currentCategoryPage}/{categoryPageCount}
          </span>

          <button
            type="button"
            onClick={() => setCategoryPage((prev) => Math.min(categoryPageCount, prev + 1))}
            disabled={currentCategoryPage >= categoryPageCount}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Trang sau
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 md:px-10 pb-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Trà được mua nhiều nhất
            </h2>
            <p className="text-gray-500 mt-2">
              Đồng bộ từ dữ liệu sản phẩm hiện có trên hệ thống.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Xem tất cả{" "}
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {favoriteCards.map((item, i) => (
            <Link
              to={item.isPlaceholder ? "/shop" : `/product/${item.id}`}
              key={item.id || i}
              className={`flex flex-col gap-3 group ${item.isPlaceholder ? "pointer-events-none" : ""}`}
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface-light">
                {item.tag && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-sm z-10 ${item.tag === "BÁN CHẠY" ? "bg-primary text-[#0d1b10]" : "bg-white/90 text-[#0d1b10] backdrop-blur-md"}`}
                  >
                    {item.tag}
                  </span>
                )}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors cursor-pointer">
                    {item.name}
                  </h3>
                  <span className="font-bold">{formatCurrency(item.price)}</span>
                </div>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full bg-surface-light py-16 md:py-24">
        <div className="px-4 md:px-10 max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeHbsJYGeTazYnwl-9JLA4yHKMpi11TvuMEWwpMuhnvevsR4Zw68n46KfsTp_3Q-3K_r3_XCQ3wdUmVialHw94vZfO_ACknPdfsavNcrDM2eap4tVA8K6desQj_BNYdCjFKwLBgvd77Prt7zsD1t7DMePlmPpODWJWAytD3i-wq7nmJi1lKpX3fhjsQQcWosks-q6lCAKgrc_RfQQWqTcEKchC6VGj9QyNSZwK6oo2URDkoSYV0QpM9oBGzyxHjo7i7703AL6u13n2"
                alt="Bố trí pha trà"
                className="w-full h-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-[#0d1b10] text-sm font-bold">
                <span className="material-symbols-outlined text-base">eco</span>{" "}
                Nguồn cung bền vững
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                Từ núi đến ly của bạn
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Chúng tôi hợp tác trực tiếp với các vườn trà nhỏ tại châu Á để
                mang tới bạn lá trà tươi, có nguồn gốc đạo đức. Mỗi ngụm trà kể
                một câu chuyện về truyền thống, tay nghề và sự tôn trọng thiên
                nhiên.
              </p>
              <ul className="flex flex-col gap-3 mt-2">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>{" "}
                  Chứng nhận hữu cơ 100%
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>{" "}
                  Bao bì không nhựa
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>{" "}
                  Thực hành thương mại công bằng
                </li>
              </ul>
              <Link to="/about">
                <button className="mt-4 px-8 py-3 bg-[#0d1b10] text-white font-bold rounded-lg hover:bg-opacity-80 transition-opacity">
                  Đọc sứ mệnh của chúng tôi
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
