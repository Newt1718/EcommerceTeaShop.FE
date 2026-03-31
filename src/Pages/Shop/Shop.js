import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";
import {
  getCategoriesApi,
  getProductDetailApi,
  getProductsApi,
  getProductsByCategoryApi,
} from "../../services/productApi";

const FALLBACK_TEA_TYPES = [
  "Trà xanh",
  "Trà ô long",
  "Trà hoa",
  "Trà thảo mộc",
  "Trà trái cây",
];

const ITEMS_PER_PAGE = 6;

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

function getProductFirstImage(item) {
  const arraySources = [item?.images, item?.productImages, item?.imageResponses];

  for (const source of arraySources) {
    if (!Array.isArray(source)) {
      continue;
    }

    const main = source.find((image) =>
      Boolean(image?.isMain || image?.isPrimary || image?.isDefault || image?.isMainImage),
    );

    const fromMain = extractImageUrl(main);
    if (fromMain) {
      return fromMain;
    }
  }

  const directCandidates = [
    item?.imageUrl,
    item?.thumbnail,
    item?.thumbnailUrl,
    item?.coverImage,
    item?.mainImage,
    item?.image,
  ];

  for (const candidate of directCandidates) {
    const resolvedCandidate = extractImageUrl(candidate);
    if (resolvedCandidate) {
      return resolvedCandidate;
    }
  }

  for (const source of arraySources) {
    if (!Array.isArray(source)) {
      continue;
    }

    for (const image of source) {
      const fromItem = extractImageUrl(image);
      if (fromItem) {
        return fromItem;
      }
    }
  }

  return null;
}

function hasReliableMainImageSignal(item) {
  if (extractImageUrl(item?.mainImage)) {
    return true;
  }

  const arraySources = [item?.images, item?.productImages, item?.imageResponses];

  for (const source of arraySources) {
    if (!Array.isArray(source)) {
      continue;
    }

    const hasMainFlag = source.some((image) =>
      Boolean(image?.isMain || image?.isPrimary || image?.isDefault || image?.isMainImage),
    );

    if (hasMainFlag) {
      return true;
    }
  }

  return false;
}

function mapProduct(item) {
  const firstImage = getProductFirstImage(item);
  const derivedIsActive =
    Boolean(item.isActive) ||
    Number(item.price || 0) > 0 ||
    Number(item.stockQuantity || 0) > 0;

  return {
    id: item.productId,
    name: item.name,
    type: item.categoryName || "Khác",
    origin: item.categoryName || "Khác",
    rating: "—",
    price: Number(item.price || 0),
    priceLabel: `${Number(item.price || 0).toLocaleString("vi-VN")}đ`,
    size: `Tồn kho ${Number(item.stockQuantity || 0)}`,
    desc: item.description || "Chưa có mô tả.",
    badge: item.isActive ? "Sản phẩm" : "Sắp ra mắt",
    badgeColor: derivedIsActive
      ? "bg-emerald-200 text-emerald-900"
      : "bg-gray-900/80 text-white",
    comingSoon: !derivedIsActive,
    img: firstImage || null,
  };
}

async function enrichProductsWithVariantData(items) {
  const safeItems = Array.isArray(items) ? items : [];

  const enriched = await Promise.all(
    safeItems.map(async (item) => {
      const hasBasePrice = Number(item?.price || 0) > 0;
      const hasStock = Number(item?.stockQuantity || 0) > 0;
      const hasImage = Boolean(getProductFirstImage(item));
      const hasReliableMainImage = hasReliableMainImageSignal(item);

      if ((hasBasePrice || hasStock) && hasImage && hasReliableMainImage) {
        return item;
      }

      try {
        const response = await getProductDetailApi(item.productId);
        const detail = response?.data || {};
        const variants = Array.isArray(detail?.variants)
          ? detail.variants
          : [];

        const detailImage = getProductFirstImage(detail);

        const prices = variants
          .map((variant) => Number(variant?.price || 0))
          .filter((price) => price > 0);

        const stocks = variants.map((variant) => Number(variant?.stock || 0));

        return {
          ...item,
          images:
            (Array.isArray(detail?.images) && detail.images.length > 0
              ? detail.images
              : Array.isArray(detail?.productImages) && detail.productImages.length > 0
                ? detail.productImages
                : Array.isArray(detail?.imageResponses) && detail.imageResponses.length > 0
                  ? detail.imageResponses
                  : Array.isArray(item?.images)
                    ? item.images
                    : detailImage
                      ? [detailImage]
                      : []),
          imageUrl: detailImage || detail.mainImage || detail.imageUrl || item.imageUrl || null,
          thumbnail: detail.thumbnail || item.thumbnail || null,
          mainImage: detail.mainImage || item.mainImage || null,
          price: prices.length > 0 ? Math.min(...prices) : Number(item?.price || 0),
          stockQuantity:
            stocks.length > 0
              ? stocks.reduce((sum, value) => sum + (Number.isFinite(value) ? value : 0), 0)
              : Number(item?.stockQuantity || 0),
          isActive:
            Boolean(item?.isActive) ||
            prices.length > 0 ||
            stocks.some((stock) => Number(stock) > 0),
        };
      } catch (error) {
        return item;
      }
    }),
  );

  return enriched;
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesCategoryKey(type, categoryKey) {
  const normalizedType = normalizeText(type);
  const key = normalizeText(categoryKey);

  const keywordMap = {
    green: ["green", "tra xanh", "xanh"],
    fruit: ["fruit", "fruity", "tra trai cay", "trai cay"],
    herbal: ["herbal", "thao moc", "hoa", "flower", "chamomile"],
    oolong: ["oolong", "o long", "olong"],
  };

  const candidates = keywordMap[key] || [];
  return candidates.some((word) => normalizedType.includes(word));
}

const Shop = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("Nổi bật");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [appliedKeyword, setAppliedKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleReset = () => {
    setCurrentPage(1);
    setSelectedTypes([]);
    setSortBy("Nổi bật");
    setSearchInput("");
    setAppliedKeyword("");
  };

  const toggleFilter = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
    setCurrentPage(1);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategoriesApi({ pageNumber: 1, pageSize: 50 });
        const items = response?.data?.items || [];
        setCategories(items);
      } catch (apiError) {
        console.log("[Shop] Không tải được category API, dùng fallback.");
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        let sourceItems = [];

        if (selectedTypes.length === 1) {
          const selectedCategory = categories.find(
            (cat) => cat.name === selectedTypes[0],
          );

          if (selectedCategory?.categoryId) {
            const response = await getProductsByCategoryApi({
              categoryId: selectedCategory.categoryId,
              pageNumber: 1,
              pageSize: 100,
            });
            sourceItems = response?.data || [];
          } else {
            const response = await getProductsApi({ pageNumber: 1, pageSize: 100 });
            sourceItems = response?.data?.items || [];
          }
        } else {
          const response = await getProductsApi({ pageNumber: 1, pageSize: 100 });
          sourceItems = response?.data?.items || [];
        }

        if (selectedTypes.length > 1) {
          sourceItems = sourceItems.filter((item) =>
            selectedTypes.includes(item.categoryName || "Khác"),
          );
        }

        if (appliedKeyword.trim()) {
          const keyword = normalizeText(appliedKeyword);
          sourceItems = sourceItems.filter((item) => {
            const target = normalizeText(
              `${item.name} ${item.description} ${item.categoryName}`,
            );
            return target.includes(keyword);
          });
        }

        const enrichedItems = await enrichProductsWithVariantData(sourceItems);
        setProducts(enrichedItems.map(mapProduct));
      } catch (apiError) {
        setProducts([]);
        setError(apiError?.message || "Khong tai duoc danh sach san pham.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [appliedKeyword, selectedTypes, categories]);

  const teaTypes = useMemo(() => {
    const categoryTypes = categories.map((item) => item.name).filter(Boolean);
    const dynamicTypes = categoryTypes.length
      ? categoryTypes
      : [...new Set(products.map((item) => item.type).filter(Boolean))];
    return dynamicTypes.length > 0 ? dynamicTypes : FALLBACK_TEA_TYPES;
  }, [categories, products]);

  let processedProducts = [...products];

  if (sortBy === "Giá: Thấp đến cao") {
    processedProducts.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
  } else if (sortBy === "Giá: Cao đến thấp") {
    processedProducts.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
  } else if (sortBy === "Mới nhất") {
    processedProducts.sort((a, b) => String(b.id).localeCompare(String(a.id)));
  }

  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE) || 1;
  const displayedProducts = processedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilters = [...selectedTypes];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryKey = params.get("categoryKey");
    const categoryFromQuery = params.get("category");

    if (!categoryFromQuery && !categoryKey) {
      return;
    }

    let matchedType = null;

    if (categoryKey) {
      matchedType = teaTypes.find((type) => matchesCategoryKey(type, categoryKey));
    }

    if (!matchedType && categoryFromQuery) {
      const normalizedQuery = normalizeText(categoryFromQuery);
      matchedType = teaTypes.find(
        (type) => normalizeText(type) === normalizedQuery,
      );
    }

    if (!matchedType) {
      return;
    }

    if (selectedTypes.length === 1 && selectedTypes[0] === matchedType) {
      return;
    }

    setSelectedTypes([matchedType]);
    setCurrentPage(1);
  }, [location.search, teaTypes, selectedTypes]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-20 font-display bg-background-light text-[#0d1b10]">
      <div className="w-full max-w-[1440px] px-4 md:px-10 py-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Trang chu
          </Link>
          <span className="material-symbols-outlined !text-[14px] text-gray-400">
            chevron_right
          </span>
          <span className="font-bold text-[#0d1b10]">Tất cả trà</span>
        </div>
      </div>

      <div className="w-full max-w-[1440px] px-4 md:px-10 flex flex-col lg:flex-row gap-8 items-start mt-8">
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-24 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">tune</span> Bộ lọc
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-primary font-bold"
            >
              Đặt lại
            </button>
          </div>

          <div>
            <h4 className="text-xs font-black mb-4 uppercase tracking-widest text-gray-400">
              Loại trà
            </h4>
            <div className="space-y-3">
              {teaTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() =>
                      toggleFilter(type, selectedTypes, setSelectedTypes)
                    }
                    className="rounded border-gray-300 text-primary focus:ring-primary/20 bg-transparent"
                  />
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full">
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 items-center">
                {activeFilters.map((filter) => (
                  <div
                    key={filter}
                    className="flex h-8 items-center justify-center gap-x-2 rounded-full border border-primary/30 bg-primary/10 pl-3 pr-2"
                  >
                    <p className="text-[#0d1b10] text-xs font-bold">{filter}</p>
                    <button
                      onClick={() =>
                        toggleFilter(filter, selectedTypes, setSelectedTypes)
                      }
                      className="hover:text-red-500 flex items-center"
                    >
                      <span className="material-symbols-outlined !text-[16px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}

                {activeFilters.length > 0 && (
                  <button
                    onClick={handleReset}
                    className="text-xs font-bold underline text-gray-500 hover:text-primary ml-1"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer text-[#0d1b10] py-0 pl-0"
                >
                  <option>Nổi bật</option>
                  <option>Mới nhất</option>
                  <option>Giá: Thấp đến cao</option>
                  <option>Giá: Cao đến thấp</option>
                </select>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentPage(1);
                setAppliedKeyword(searchInput);
              }}
              className="flex gap-2"
            >
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm theo tên sản phẩm..."
                className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-[#0d1b10] hover:bg-primary/90"
              >
                Tìm
              </button>
            </form>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-500 font-bold">Đang tải sản phẩm...</div>
          ) : error ? (
            <div className="py-20 text-center text-amber-600 font-bold">{error}</div>
          ) : (
            <ProductGrid displayedProducts={displayedProducts} />
          )}

          {!loading && !error && totalPages > 1 && (
            <Pagination totalPages={totalPages} onPageChange={setCurrentPage}></Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
