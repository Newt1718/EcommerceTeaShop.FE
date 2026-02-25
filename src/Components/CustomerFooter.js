import React from 'react';
import { Link } from 'react-router-dom';

const CustomerFooter = () => {
  return (
    <footer className="bg-surface-light pt-16 pb-8 px-4 md:px-10 border-t border-primary/10 mt-auto text-[#0d1b10] font-display">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        
        <div className="col-span-1 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="grid grid-cols-2 gap-[2px] w-6 h-6 pt-1">
              <div className="bg-primary rounded-sm h-full w-full"></div>
              <div className="bg-transparent h-full w-full"></div>
              <div className="bg-primary rounded-sm h-full w-full"></div>
              <div className="bg-primary rounded-sm h-full w-full"></div>
            </div>
            <h2 className="text-xl font-black leading-tight tracking-tight group-hover:text-primary transition-colors">Tea Soul</h2>
          </Link>
          <p className="text-sm text-gray-500 mt-2 pr-4">
            Expert-verified premium teas from authentic artisan growers worldwide.
          </p>
          <div className="flex gap-4 mt-4">
            <span className="material-symbols-outlined text-gray-400 hover:text-primary transition-colors cursor-pointer">thumb_up</span>
            <span className="material-symbols-outlined text-gray-400 hover:text-primary transition-colors cursor-pointer">photo_camera</span>
            <span className="material-symbols-outlined text-gray-400 hover:text-primary transition-colors cursor-pointer">smart_display</span>
          </div>
        </div>


        <div className="col-span-1">
          <h3 className="font-bold mb-4 text-lg">Shop</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors">All Teas</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Tea Verification</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Sustainability</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">The Vault Journal</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Tea Experts</Link></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-bold mb-4 text-lg">Support</h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-500 font-medium">
            <li><Link to="/" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Returns & Refund</Link></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-bold mb-4 text-lg">Contact</h3>
          <ul className="flex flex-col gap-4 text-sm text-gray-500 font-medium">
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-[20px]">location_on</span> 123 Tea Garden Lane, Portland, OR</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-[20px]">mail</span> hello@teasoul.com</li>
            <li className="flex items-center gap-3"><span className="material-symbols-outlined text-primary text-[20px]">call</span> +1 (555) 123-4567</li>
          </ul>
        </div>

      </div>

      <div className="max-w-[1440px] mx-auto pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400 font-medium">© 2026 Tea Soul. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-gray-400 font-medium">
          <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;