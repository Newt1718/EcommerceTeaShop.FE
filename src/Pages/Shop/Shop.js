import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import Pagination from "../../Components/Pagination/Pagination";

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState("Nổi bật");

  const ITEMS_PER_PAGE = 6;

  const handleReset = () => {
    setCurrentPage(1);
    setSelectedTypes([]);
    setSortBy("Nổi bật");
  };

  const toggleFilter = (item, list, setList) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
    setCurrentPage(1);
  };
  const products = [
    {
      id: 1,
      name: "Trà Tân Cương Signature",
      type: "Trà Tân Cương",
      origin: "Tân Cương, Thái Nguyên",
      rating: "5.0",
      price: "$25.00",
      size: "Hộp 100g",
      desc: "Lá trà tôm một búp được sao thủ công cho hậu vị ngọt thanh kéo dài.",
      badge: "Đặc sản vùng",
      badgeColor: "bg-emerald-200 text-emerald-900",
      img: "https://static.hotdeal.vn/images/618/618027/500x500/126343-tra-tan-cuong-thai-nguyen-thom-ngon-tinh-khiet-500g.jpg",
    },
    {
      id: 2,
      name: "Bộ sưu tập Trà Xanh",
      type: "Trà xanh",
      origin: "Sắp ra mắt",
      rating: "—",
      price: "$0.00",
      size: "Đang cập nhật",
      desc: "Dòng trà xanh cao cấp đang trong giai đoạn hoàn thiện chất lượng.",
      badge: "Coming soon",
      badgeColor: "bg-gray-900/80 text-white",
      comingSoon: true,
    },
    {
      id: 3,
      name: "Bộ sưu tập Trà Đen",
      type: "Trà đen",
      origin: "Sắp ra mắt",
      rating: "—",
      price: "$0.00",
      size: "Đang cập nhật",
      desc: "Những mẻ trà đen đậm hương malt sẽ xuất hiện trong thời gian tới.",
      badge: "Coming soon",
      badgeColor: "bg-gray-900/80 text-white",
      comingSoon: true,
    },
    {
      id: 4,
      name: "Bộ sưu tập Trà Oolong",
      type: "Trà Oolong",
      origin: "Sắp ra mắt",
      rating: "—",
      price: "$0.00",
      size: "Đang cập nhật",
      desc: "Các phiên bản Oolong rang nhẹ, kem sữa sẽ sớm mở bán.",
      badge: "Coming soon",
      badgeColor: "bg-gray-900/80 text-white",
      comingSoon: true,
    },
    {
      id: 5,
      name: "Bộ sưu tập Trà Thảo Mộc",
      type: "Trà thảo mộc",
      origin: "Sắp ra mắt",
      rating: "—",
      price: "$0.00",
      size: "Đang cập nhật",
      desc: "Các blend thảo mộc thư giãn, tốt cho giấc ngủ đang được ươm mẻ đầu tiên.",
      badge: "Coming soon",
      badgeColor: "bg-gray-900/80 text-white",
      comingSoon: true,
    },
  ];

  // 1. Filter
  let processedProducts = products.filter((item) => {
    const matchType =
      selectedTypes.length === 0 || selectedTypes.includes(item.type);

    return matchType;
  });

  // 2. Sort
  if (sortBy === "Giá: Thấp đến cao") {
    processedProducts.sort(
      (a, b) =>
        parseFloat(a.price.replace("$", "")) -
        parseFloat(b.price.replace("$", "")),
    );
  } else if (sortBy === "Giá: Cao đến thấp") {
    processedProducts.sort(
      (a, b) =>
        parseFloat(b.price.replace("$", "")) -
        parseFloat(a.price.replace("$", "")),
    );
  }

  // 3. Paginate
  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = processedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilters = [...selectedTypes];

  return (
    <div className="flex flex-col items-center w-full min-h-screen pb-20 font-display bg-background-light text-[#0d1b10]">
      <div className="w-full max-w-[1440px] px-4 md:px-10 py-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <Link
            to="/"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            Trang chủ
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
              {["Trà Tân Cương", "Trà xanh", "Trà đen", "Trà Oolong", "Trà thảo mộc"].map((type) => (
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2 items-center">
              {activeFilters.map((filter) => (
                <div
                  key={filter}
                  className="flex h-8 items-center justify-center gap-x-2 rounded-full border border-primary/30 bg-primary/10 pl-3 pr-2"
                >
                  <p className="text-[#0d1b10] text-xs font-bold">{filter}</p>
                  <button
                    onClick={() => {
                      if (selectedTypes.includes(filter))
                        toggleFilter(filter, selectedTypes, setSelectedTypes);
                    }}
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
              <span className="text-sm text-gray-500 font-medium">
                Sắp xếp theo:
              </span>
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

          <ProductGrid displayedProducts={displayedProducts} />

          {totalPages > 1 && <Pagination totalPages={totalPages}></Pagination>}
        </div>
      </div>
    </div>
  );
};

export default Shop;
