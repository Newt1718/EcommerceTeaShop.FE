import React from "react";
import DesignCarouselPage from "./DesignCarouselPage";
import { Layout, ConfigProvider } from "antd";

const { Content } = Layout;

const emeraldZenithTheme = {
  token: {
    colorPrimary: "#13ec37",
    borderRadius: 2,
    fontFamily: "Work Sans, sans-serif",
    colorBgBase: "#f8fcf9",
  },
};

const CustomDesignPage = () => {
  return (
    <ConfigProvider theme={emeraldZenithTheme}>
      <Layout className="bg-black">
        <Content className="p-0 m-0">
          <DesignCarouselPage />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default CustomDesignPage;
