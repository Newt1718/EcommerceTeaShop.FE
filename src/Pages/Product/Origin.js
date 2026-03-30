import React from "react";

const Origin = ({ origin }) => {
  const content = String(origin || "").trim();

  if (!content) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-surface-light p-6 text-gray-500 font-medium">
        Chưa có thông tin xuất xứ cho sản phẩm này.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black text-[#0d1b10]">Xuất xứ</h3>
      <div className="bg-surface-light p-6 rounded-2xl border border-gray-100">
        <p className="text-gray-600 font-medium leading-relaxed whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
};

export default Origin;
