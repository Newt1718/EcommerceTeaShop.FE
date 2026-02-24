import React from 'react';
import { Link } from 'react-router-dom';

const CustomerNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-light bg-background-light/95 backdrop-blur-sm">
      <div className="px-4 md:px-10 py-3 mx-auto max-w-[1440px]">
        <div className="flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-[#0d1b10] group">
              <div className="w-8 h-8 bg-primary/20 text-primary flex items-center justify-center rounded-md font-bold tracking-tighter">
                TV
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary transition-colors">Tea vault</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Journal</Link>
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Contact Us</Link>
            </nav>
          </div>

          <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
            <div className="hidden md:flex flex-col min-w-40 h-10 max-w-64 relative">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-surface-light transition-colors focus-within:ring-2 focus-within:ring-primary/50">
                <div className="text-primary flex items-center justify-center pl-3 pr-1 rounded-l-lg">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input className="w-full bg-transparent border-none text-sm text-[#0d1b10] placeholder:text-gray-500 focus:outline-none focus:ring-0 h-full px-2" placeholder="Search teas..." />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-surface-light hover:bg-primary/20 hover:text-primary transition-all text-[#0d1b10]">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              
              {/* The new dedicated routing button! */}
              <Link to="/login" className="flex items-center justify-center rounded-lg px-4 h-10 bg-surface-light hover:bg-primary/20 hover:text-primary transition-all text-[#0d1b10] text-sm font-bold">
                Sign In | Log In
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default CustomerNavbar;