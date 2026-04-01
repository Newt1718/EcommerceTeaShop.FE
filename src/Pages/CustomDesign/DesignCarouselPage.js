import React, { useEffect, useMemo, useState } from "react";
import { Layout, Typography, ConfigProvider } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const TEA_PRODUCTS = [
  {
    id: "jasmine",
    title: "Jasmine Reserve",
    type: "Bạch Lộ Lục Trà",
    price: "550.000₫",
    bg: "https://res.cloudinary.com/dtlatkdui/image/upload/v1774542484/tea-products/gqr10wcrwuryycujaiyx.jpg",
    desc: "Hương nhài tinh khiết được ướp thủ công qua 7 tuần trăng.",
  },
  {
    id: "matcha",
    title: "Matcha Gold",
    type: "Nghiền Đá Non",
    price: "420.000₫",
    bg: "https://res.cloudinary.com/dtlatkdui/image/upload/v1774287990/tea-products/axlhieuacqztaymoda1j.jpg",
    desc: "Bột trà xanh siêu mịn, giữ trọn diệp lục tố và vị umami đậm đà.",
  },
  {
    id: "vault",
    title: "The Vault Set",
    type: "Limited Collection",
    price: "1.200.000₫",
    bg: "https://res.cloudinary.com/dtlatkdui/image/upload/v1774287931/tea-products/nhhkcceeigjsft81elre.jpg",
    desc: "Hệ thống bảo quản kép bao gồm lon thiếc và hộp bìa kiến trúc.",
  },
  {
    id: "sencha",
    title: "Sencha Breeze",
    type: "Nhật Bản Mùa Xuân",
    price: "480.000₫",
    bg: "https://res.cloudinary.com/dtlatkdui/image/upload/v1774542484/tea-products/gqr10wcrwuryycujaiyx.jpg",
    desc: "Tầng hương cỏ non thanh mát, hậu vị ngọt nhẹ và sạch vị.",
  },
  {
    id: "oolong",
    title: "Oolong Amber",
    type: "Bán Lên Men",
    price: "510.000₫",
    bg: "https://res.cloudinary.com/dtlatkdui/image/upload/v1774287931/tea-products/nhhkcceeigjsft81elre.jpg",
    desc: "Mùi hương mật ong khô và quả chín, thân trà dày nhưng êm.",
  },
  {
    id: "whitepearl",
    title: "White Pearl",
    type: "Bạch Trà Tuyển Chọn",
    price: "690.000₫",
    bg: "https://res.cloudinary.com/dtlatkdui/image/upload/v1774287990/tea-products/axlhieuacqztaymoda1j.jpg",
    desc: "Nụ trà phủ lông tơ bạc, nước sáng và vị ngọt mượt kéo dài.",
  },
];

const DesignCarouselPage = () => {
  const [activeId, setActiveId] = useState("vault");
  const navigate = useNavigate();

  const activeProduct = useMemo(
    () => TEA_PRODUCTS.find((product) => product.id === activeId) || TEA_PRODUCTS[0],
    [activeId],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = TEA_PRODUCTS.findIndex((product) => product.id === currentId);
        const nextIndex = (currentIndex + 1) % TEA_PRODUCTS.length;
        return TEA_PRODUCTS[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#13ec37" } }}>
      <Layout className="bg-black overflow-hidden relative min-h-full">
        <div className="absolute inset-0 z-0 transition-all duration-1000 ease-in-out">
          <img
            key={activeProduct.bg}
            src={activeProduct.bg}
            alt="Dynamic Mood"
            className="w-full h-full object-cover opacity-40 blur-md scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        <div className="absolute top-0 w-full px-6 md:px-12 py-6 md:py-8 z-30">
          <Text className="text-white font-black tracking-tighter uppercase text-xl">TEAVAULT</Text>
        </div>

        <div className="absolute top-[12%] w-full text-center z-30 px-6 pointer-events-none">
          <Title level={5} className="!text-gray-400 uppercase tracking-[0.4em] !m-0 !text-xs">
            {activeProduct.type}
          </Title>
          <Title
            level={1}
            className="!text-white !text-5xl md:!text-7xl !font-black !tracking-tighter !m-0 !leading-none uppercase"
          >
            {activeProduct.title}
          </Title>
          <Paragraph className="text-gray-300 max-w-md mx-auto mt-4 font-medium italic">
            "{activeProduct.desc}"
          </Paragraph>
        </div>

        <Content className="relative z-10 flex items-center justify-center h-screen pt-28 md:pt-20 pb-8">
          <div className="flex flex-col items-center w-full">
            <div
              className="relative flex items-center justify-center w-full h-[500px]"
              style={{ perspective: "1200px" }}
            >
              {TEA_PRODUCTS.map((product, index) => {
                const isActive = product.id === activeId;
                const centerIndex = TEA_PRODUCTS.findIndex((item) => item.id === activeId);
                const offset = index - centerIndex;

                const rotateY = offset * 28;
                const translateZ = isActive ? 180 : -150;
                const translateX = offset * 220;

                return (
                  <div
                    key={product.id}
                    onClick={() => setActiveId(product.id)}
                    className={`absolute cursor-pointer transition-all duration-700 ease-out ${
                      isActive ? "z-30 w-[280px] md:w-[340px] h-[420px] md:h-[480px]" : "z-10 w-[220px] md:w-[260px] h-[320px] md:h-[380px] opacity-40 grayscale"
                    }`}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                    }}
                  >
                    <div
                      className={`h-full w-full border-[3px] bg-white overflow-hidden transition-colors ${
                        isActive ? "border-primary shadow-[0_0_50px_rgba(19,236,55,0.3)]" : "border-zinc-800"
                      }`}
                    >
                      <img src={product.bg} className="w-full h-full object-cover" alt={product.title} />

                      <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-md p-5 border-t border-zinc-800">
                        <div className="flex justify-between items-center mb-1">
                          <Text className="text-white font-black uppercase text-xs tracking-widest">{product.title}</Text>
                          <Text className="text-primary font-mono text-[10px]">
                            {String(index + 1).padStart(2, "0")}/{String(TEA_PRODUCTS.length).padStart(2, "0")}
                          </Text>
                        </div>
                        {isActive && (
                          <div className="flex justify-between items-center mt-2">
                            <Text className="text-white font-bold">{product.price}</Text>
                            <ShoppingOutlined className="text-primary text-xl" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-20 md:mt-25 px-9 py-3 md:px-11 md:py-3.5 text-sm md:text-base font-extrabold uppercase tracking-[0.18em] text-black bg-primary border border-primary rounded-none shadow-[0_0_24px_rgba(19,236,55,0.45)] hover:bg-black hover:text-primary transition-colors duration-300"
            >
              Mua ngay
            </button>
          </div>
        </Content>

        <div
          className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-[5000ms] ease-linear"
          style={{ width: "100%" }}
          key={activeId}
        />
      </Layout>
    </ConfigProvider>
  );
};

export default DesignCarouselPage;