import React from 'react';
import { Link } from 'react-router-dom';

const ProfileOverview = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 px-4 md:px-10 py-12 font-display bg-background-light">
      
      <aside className="w-full shrink-0 lg:w-64">
        <nav className="flex flex-col gap-2">
          <Link to="/profile" className="flex items-center gap-3 rounded-xl bg-primary/10 px-5 py-4 font-bold text-[#0d1b10] border border-primary/20 transition-all">
            <span className="material-symbols-outlined text-[22px] text-primary">account_circle</span>
            <span className="text-sm">Overview</span>
          </Link>
          <Link to="/orders" className="flex items-center gap-3 rounded-xl px-5 py-4 text-gray-500 hover:text-[#0d1b10] hover:bg-surface-light transition-all font-medium">
            <span className="material-symbols-outlined text-[22px]">package_2</span>
            <span className="text-sm">Orders</span>
          </Link>
          <Link to="/wishlist" className="flex items-center gap-3 rounded-xl px-5 py-4 text-gray-500 hover:text-[#0d1b10] hover:bg-surface-light transition-all font-medium">
            <span className="material-symbols-outlined text-[22px]">favorite</span>
            <span className="text-sm">Wishlist</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 rounded-xl px-5 py-4 text-gray-500 hover:text-[#0d1b10] hover:bg-surface-light transition-all font-medium">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="text-sm">Settings</span>
          </Link>

          <div className="mt-10 p-6 rounded-2xl bg-[#0d1b10] text-white shadow-xl shadow-black/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">stars</span>
              <span className="text-xs font-black tracking-widest uppercase">Tea Club</span>
            </div>
            <p className="text-xs text-gray-400 mb-4 font-medium">250 points to Platinum</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4 rounded-full"></div>
            </div>
          </div>
        </nav>
      </aside>

      <section className="flex flex-1 flex-col gap-8">
        
        <div className="rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-sm">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6 md:gap-8">
              <div className="relative group">
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-full ring-4 ring-surface-light p-1 overflow-hidden bg-white">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" alt="Profile" className="h-full w-full rounded-full object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg border border-gray-100 hover:text-primary hover:border-primary transition-colors">
                  <span className="material-symbols-outlined text-lg">photo_camera</span>
                </button>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-black text-[#0d1b10]">Newt</h2>
                  <span className="flex items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-[10px] font-bold tracking-widest text-[#0d1b10] uppercase">
                    <span className="material-symbols-outlined text-sm font-bold text-primary">verified</span>
                    Gold
                  </span>
                </div>
                <p className="mt-2 text-gray-500 font-medium text-sm">Tea Enthusiast since 2026</p>
                <div className="mt-5 flex gap-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Points</p>
                    <p className="text-xl font-black text-[#0d1b10]">1,250</p>
                  </div>
                  <div className="w-px bg-gray-200"></div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Orders</p>
                    <p className="text-xl font-black text-[#0d1b10]">14</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/profile/edit" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-8 py-3 text-sm font-bold text-[#0d1b10] hover:border-primary hover:bg-primary/5 transition-all mt-4 md:mt-0 whitespace-nowrap">
              Edit Profile
            </Link>
          </div>

          {/* Account Details & Preferences Grids */}
          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 pt-10 border-t border-gray-100">
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Account Details</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Full Name</label>
                  <p className="text-base font-bold text-[#0d1b10] group-hover:text-primary transition-colors">Newt</p>
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Email Address</label>
                  <p className="text-base font-bold text-[#0d1b10] group-hover:text-primary transition-colors">hello@teasoul.com</p>
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Phone Number</label>
                  <p className="text-base font-bold text-[#0d1b10] group-hover:text-primary transition-colors">+84 123 456 789</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Preferences</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Favorite Blend</label>
                  <p className="text-base font-bold text-[#0d1b10] group-hover:text-primary transition-colors">Jasmine Pearls</p>
                </div>
                <div className="group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1 block">Brewing Method</label>
                  <p className="text-base font-bold text-[#0d1b10] group-hover:text-primary transition-colors">Gongfu Cha</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="rounded-3xl bg-white border border-gray-100 p-8 md:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-[#0d1b10]">Recent Activity</h3>
            <Link to="/orders" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline transition-all">View History</Link>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between py-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-surface-light flex items-center justify-center text-[#0d1b10]">
                  <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                </div>
                <div>
                  <p className="text-base font-bold text-[#0d1b10]">#TEA-8829</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Feb 24, 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-[#0d1b10]">$42.00</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-1 block">Shipped</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-5">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-surface-light flex items-center justify-center text-[#0d1b10]">
                  <span className="material-symbols-outlined text-2xl">shopping_bag</span>
                </div>
                <div>
                  <p className="text-base font-bold text-[#0d1b10]">#TEA-8710</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">Feb 15, 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-[#0d1b10]">$65.50</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1 block">Delivered</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default ProfileOverview;