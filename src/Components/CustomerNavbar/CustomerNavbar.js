import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice/authSlice";

const CustomerNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.cart?.products) || [];
  const { isAuthenticated, user } = useSelector((state) => state.auth || { isAuthenticated: false, user: null });

  const totalItems = products.reduce((total, product) => {
    const productTotal =
      product.productDetails?.reduce(
        (sum, detail) => sum + (detail.quantity || 0),
        0,
      ) || 0;
    return total + productTotal;
  }, 0);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-light bg-background-light/95 backdrop-blur-sm">
      <div className="px-4 md:px-10 py-3 mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-[#0d1b10] group"
            >
              <div className="w-8 h-8 bg-primary/20 text-primary flex items-center justify-center rounded-md font-bold tracking-tighter">
                TV
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">
                Tea vault
              </h2>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                to="/shop"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Shop
              </Link>
              <Link
                to="/journal"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Journal
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
            <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64 relative">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-surface-light transition-colors focus-within:ring-2 focus-within:ring-primary/50">
                <div className="text-primary flex items-center justify-center pl-3 pr-1 rounded-l-lg">
                  <span className="material-symbols-outlined text-[20px]">
                    search
                  </span>
                </div>
                <input
                  className="w-full bg-transparent border-none text-sm text-[#0d1b10] placeholder:text-gray-500 focus:outline-none focus:ring-0 h-full px-2"
                  placeholder="Search teas..."
                />
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <Link
                to="/cart"
                className="relative flex items-center justify-center rounded-lg w-10 h-10 bg-surface-light hover:bg-primary/20 hover:text-primary transition-all text-[#0d1b10]"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-black text-[#0d1b10] shadow-sm animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 rounded-lg p-1 pr-3 hover:bg-surface-light transition-colors border border-transparent hover:border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary text-[#0d1b10] flex items-center justify-center font-bold text-sm shadow-sm">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-bold text-[#0d1b10] hidden md:block">
                      {user?.name || "My Account"}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-gray-500 hidden md:block">
                      expand_more
                    </span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 py-1">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                        <p className="text-sm font-bold text-[#0d1b10] truncate">{user?.name || "Customer"}</p>
                        <p className="text-xs font-medium text-gray-500 truncate">{user?.email || "user@teavault.com"}</p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">person</span>
                        Manage Profile
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                        My Orders
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center rounded-lg px-4 h-10 bg-surface-light hover:bg-primary/20 hover:text-primary transition-all text-[#0d1b10] text-sm font-bold"
                >
                  Sign In | Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;