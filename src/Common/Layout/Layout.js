import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/AdminSidebar/Sidebar";

function Layout() {
  return (
    <div className={`min-h-screen transition-all duration-500 bg-gray-50`}>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
