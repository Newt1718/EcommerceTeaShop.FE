import React, { useState } from "react";
import { Link } from "react-router-dom";
import Description from "./Description";
import Origin from "./Origin";
import Reviews from "./Reviews";

const thumbnails = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDEy5SGb1GoJxVolf_VV1JBcRC0xUgcv-Rnd59svi8y8pYh9wb7wTv69LD6QpDZy4kVYcCYXr03WGkHpXAMydPgfkmCcD77WCWLeM4jGdZP-UDSOw7FcajWa6AVChxPXrMjAWFq6H7jzB5n2VjhgvPAwhiOaJpFz6xVAqU8SF37LYFXjrcu568cXvfRtJ5ySNOE_4ytShAlBpuPvCFgjZQOPj-pP8njxZEAHSFhLync2cSXHXjp0jARPdjvpQreZr-5anGUr96tDCsx",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhr9MKfge7rKsRy4-67IG7PaCQ-xIiFA-n-ifJ6E7mmWmx0wHP3oRvAP1l0uFhEPrVJ2xYo1yUoDnS3uBht9GKgEZctDi8ksSmKDXvdMNwR2zPR-PXAXZQHXvIrUDuM8fIkmMVeize2e59g76QbrmLJWTAn4Gc9GFxjssyIsDRZPpMG34V7w3WI5TpyL1KvkiSN_z1wIYw60mpRvxSLvXfq0DlcKKCBtBrlm9pR18tg2uKtbnA-rq-wKZzEqyvEnksc08LBeZ1ZPnM",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAK5udmXVqauR08mI9cHzl_cU6jmrHxHtpfSNyJm-yJvGFBPjchE9FHHA3l4MnyzbuKM53m3Vy6_LqnlNKwWBxjiMxr__xJYlJEe4MBSlqFvtgQ0qRrKzL6pvFtdiow5Kf1Y3cFc6529G3DVKq-dpBaQeLj3sSCi9TnNfFJ1OBUJhTNmGcpoDWY2vKGjeyoNHJUAk-LiMdiXUOA-XMWI6DeZk4uxNP0EXy22YXTgKMOY5oRxoagOdo9zLI6KRhrFKSo15IwLItKH9U_",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDatd4azIC27G0oJosUCsoYIyVz2sqfUQcai9atn14GfRqE2UQ_9JseL_fZ3ia3Hi_9iVCEtrq7lw3szV1AJNYr9l2pVO8O79wDRJkFf2oc93eIXd43JdNbIUJ0dLXf1jpQlEfIjPEo3nNcxcBa2D5G_24fxZERsx9IKlFvleI-8DM7beUAp0KV5ik3NFaZ_vjYUox0uekF022l_rFneEB7Etq9APZ0Eev1n-swYKI2T7HFyt05l-sB0fOBdgT5KDXcK6ajGp0obULq",
];

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("30g");
  const [quantity, setQuantity] = useState(1);
  const [carouselStart, setCarouselStart] = useState(0);
  const pageSize = 4;
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);

  const relatedProducts = [
    {
      name: "Bamboo Whisk",
      price: "$18.00",
      desc: "Essential for frothy matcha",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7K55ZdjQhjrz3iGZFvNhFp_-nIEP9DRGCnnBOMC_qS0YKyGE1PSVzYpXHKsAJiDihpwWf65cuo6_7QvAkZxd5zkdfP8nLC9obhbyi8DvajJOU9-B_EmaY2jYUdDfWQkWJ_gR0Yi9ycMWW8rfPoPgjFBnP3e4NO5dJ-ALG9R_CdEgqm1hj-iOB_71mko5CAawd7ZAkfmrz6EVEUfgLwbgW125m8tnesbSydLVv92PX3WDwu8jCQQpCKZ8pU97KiRbl6kIA8WFyLkbG",
    },
    {
      name: "Premium Sencha",
      price: "$21.00",
      desc: "Deep steamed green tea",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClFQShTmxw7hwEMBY6fTuihtXKdb8cLCDa7-4MqLFRQYL3g26XwjrrPhQdlx4ayRY26TFo0yapDrVhdDsAJAVr1749hymQkacV5uRoDSemPzhgfvz8sN1VoEFHGfX6dHWBt6NwZxUQcowo2pQsZJekIC2mPs12d-S9Yyk7fZeYMmN-CQCjII0_zwur77XfESn__4nj5OgStk4IUa4lq_AslorAJBjuZ_7DsmhXbA1oB43YW7IXiZjoHiBAdSlIazj_V8s5vNqWe0Z1",
    },
    {
      name: "Matcha Bowl",
      price: "$45.00",
      desc: "Handcrafted in Japan",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-zVYAk4QZeGjW0XvSG9WcVBv2-9JjE-uPtrRutJuy0FkdjX7ttyTlcbLMg93qioKFrx418DoWysF19rkXerO7LANFlbxmfu1tmWpKYTD1Ag5d6jsLHzeNTHYGKsU1B45MrjPMuLorCJa7f__-1YGKEsiKVnYoAqWTV2tS8qEMx3_432O4vY6iSdGSD1xiBcjnhtnb0dp1r-yT0ZO2-c7N8spaX1BB822R_srXNS67eqZK9x9dVPkegUQP2Cd9UCI5FGjJOJcrzUcq",
    },
    {
      name: "Hojicha Powder",
      price: "$19.00",
      desc: "Roasted green tea powder",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZtsxL1UZXLjLFyqm0zo4308WfmgHLmVhu90k-DDPYkPaQ1qkk5XUMZIRtBvwiL1U29CMe8kFJ7OMLeVUwQddWhAQzKvtnlxEYze2qUmvR5XmR-vwFIxCZYM4FMuQJ4O1OJudvK4MmpIYzNn2BpnhlRRib28QzO8k9CtLBB4XLzW1n0GcKBs75gb-9QklWjTo_9DqChKhUUm0T6CVd2v2GRhliC-7_mS4JhBluTK3OXKYStvK86g1G03_7z_firDUxmTfsHjb3C7Wf",
    },
    {
      name: "Hojicha Powder",
      price: "$19.00",
      desc: "Roasted green tea powder",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZtsxL1UZXLjLFyqm0zo4308WfmgHLmVhu90k-DDPYkPaQ1qkk5XUMZIRtBvwiL1U29CMe8kFJ7OMLeVUwQddWhAQzKvtnlxEYze2qUmvR5XmR-vwFIxCZYM4FMuQJ4O1OJudvK4MmpIYzNn2BpnhlRRib28QzO8k9CtLBB4XLzW1n0GcKBs75gb-9QklWjTo_9DqChKhUUm0T6CVd2v2GRhliC-7_mS4JhBluTK3OXKYStvK86g1G03_7z_firDUxmTfsHjb3C7Wf",
    },
  ];

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
          return { ...relatedProducts[idx], origIndex: idx };
        });

  return (
    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10 font-display bg-background-light text-[#0d1b10] min-h-screen">
      <nav className="flex flex-wrap gap-2 pb-6 text-sm">
        <Link
          to="/"
          className="text-gray-500 hover:text-primary transition-colors font-medium"
        >
          Home
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          to="/shop"
          className="text-gray-500 hover:text-primary transition-colors font-medium"
        >
          Shop All
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-[#0d1b10] font-bold">Ceremonial Matcha</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] no-scrollbar pb-2 md:pb-0">
            {thumbnails.map((src, idx) => (
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
                  alt="Matcha detail"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="flex-1 h-[400px] md:h-[600px] rounded-3xl overflow-hidden bg-surface-light relative shadow-sm group">
            <img
              src={selectedImage}
              alt="High quality ceremonial matcha"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#0d1b10] text-[10px] font-black px-3 py-1.5 rounded-md uppercase tracking-widest shadow-sm">
              Best Seller
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-1 text-amber-400 mb-3">
              <span className="material-symbols-outlined text-[16px] font-variation-settings-'FILL'1">
                star
              </span>
              <span className="material-symbols-outlined text-[16px] font-variation-settings-'FILL'1">
                star
              </span>
              <span className="material-symbols-outlined text-[16px] font-variation-settings-'FILL'1">
                star
              </span>
              <span className="material-symbols-outlined text-[16px] font-variation-settings-'FILL'1">
                star
              </span>
              <span className="material-symbols-outlined text-[16px] font-variation-settings-'FILL'1">
                star_half
              </span>
              <span className="ml-2 text-gray-500 text-sm font-bold underline cursor-pointer hover:text-primary transition-colors">
                4.8 (124 Reviews)
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#0d1b10] mb-2">
              Ceremonial Grade Matcha
            </h1>
            <p className="text-2xl font-black text-primary">$24.00</p>
          </div>

          <p className="text-base leading-relaxed text-gray-600 font-medium">
            Stone-ground, shade-grown green tea from Uji, Japan. This premium
            ceremonial grade matcha is rich in antioxidants with a smooth,
            vegetal flavor, creamy texture, and natural sweetness without
            bitterness.
          </p>

          <div className="h-px w-full bg-gray-200"></div>

          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-widest text-gray-400">
              Size
            </label>
            <div className="flex flex-wrap gap-3">
              {["30g", "50g", "100g"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2.5 rounded-xl border-2 font-bold transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary/10 text-[#0d1b10] shadow-sm"
                      : "border-gray-200 hover:border-primary text-gray-500 hover:text-[#0d1b10]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
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
                onClick={() => setQuantity((qty) => qty + 1)}
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button className="flex-1 h-14 bg-primary hover:bg-primary/90 text-[#0d1b10] font-black text-lg rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-95">
              <span className="material-symbols-outlined">shopping_bag</span>
              Add to Cart
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                eco
              </span>
              <span className="text-xs font-bold text-[#0d1b10]">Organic</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                bolt
              </span>
              <span className="text-xs font-bold text-[#0d1b10]">Energy</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-primary text-2xl">
                spa
              </span>
              <span className="text-xs font-bold text-[#0d1b10]">Calming</span>
            </div>
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
            Description
          </button>
          <button
            onClick={() => setActiveTab("Origin")}
            className={`px-8 py-4 border-b-4 whitespace-nowrap ${
              activeTab === "Origin"
                ? "border-primary text-[#0d1b10] font-black"
                : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600 font-bold"
            }`}
          >
            Origin
          </button>
          <button
            onClick={() => setActiveTab("Reviews")}
            className={`px-8 py-4 border-b-4 whitespace-nowrap ${
              activeTab === "Reviews"
                ? "border-primary text-[#0d1b10] font-black"
                : "border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600 font-bold"
            }`}
          >
            Reviews (124)
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
            You Might Also Like
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => prevCarousel()}
              className={`size-12 rounded-full border-2 flex items-center justify-center transition-colors text-gray-400 ${
                relatedLen <= pageSize
                  ? "opacity-40 cursor-not-allowed"
                  : "border-gray-200 hover:border-primary hover:text-primary"
              }`}
              aria-label="previous"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button
              onClick={() => nextCarousel()}
              className={`size-12 rounded-full border-2 flex items-center justify-center transition-colors text-gray-400 ${
                relatedLen <= pageSize
                  ? "opacity-40 cursor-not-allowed"
                  : "border-gray-200 hover:border-primary hover:text-primary"
              }`}
              aria-label="next"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {visibleProducts.map((item, idx) => (
            <Link
              to={`/product/${item.origIndex + 1}`}
              key={item.origIndex}
              className="flex flex-col gap-4 group cursor-pointer bg-white p-4 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-surface-light">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button className="absolute bottom-3 right-3 size-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#0d1b10] hover:bg-primary transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                  <span className="material-symbols-outlined text-[20px]">
                    add_shopping_cart
                  </span>
                </button>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-lg font-black group-hover:text-primary transition-colors text-[#0d1b10]">
                    {item.name}
                  </h4>
                  <span className="font-bold text-gray-500">{item.price}</span>
                </div>
                <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
