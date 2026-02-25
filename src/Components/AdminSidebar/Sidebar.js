import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/customers", label: "Customers", icon: "👥" },
    { path: "/products", label: "Products", icon: "📦" },
    { path: "/orders", label: "Orders", icon: "🛒" },
    { path: "/analytics", label: "Analytics", icon: "📈" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div>
      <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-73px overflow-auto translate-x-full">
        <nav className="p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
