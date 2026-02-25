import React from 'react';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 px-4 md:px-10 py-12 font-display bg-background-light">
      
      <aside className="w-full shrink-0 lg:w-64">
        <nav className="flex flex-col gap-2">
          <Link to="/profile" className="flex items-center gap-3 rounded-xl px-5 py-4 text-gray-500 hover:text-[#0d1b10] hover:bg-surface-light transition-all font-medium">
            <span className="material-symbols-outlined text-[22px]">account_circle</span>
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
          <Link to="/profile/edit" className="flex items-center gap-3 rounded-xl bg-primary/10 px-5 py-4 font-bold text-[#0d1b10] border border-primary/20 transition-all">
            <span className="material-symbols-outlined text-[22px] text-primary">settings</span>
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

      <section className="flex-1 max-w-4xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-[#0d1b10] tracking-tight">Edit Profile</h1>
          <p className="text-gray-500 mt-2 font-medium text-sm">Manage your personal information and profile appearance.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
          
          <div className="flex flex-col md:flex-row items-center gap-10 mb-12 pb-12 border-b border-gray-100">
            <div className="relative group">
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-surface-light shadow-xl bg-white">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <label className="absolute bottom-0 right-0 bg-primary text-[#0d1b10] p-3 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer flex items-center justify-center border-4 border-white">
                <span className="material-symbols-outlined text-sm font-bold">photo_camera</span>
                <input type="file" className="hidden" />
              </label>
            </div>
            <div className="flex flex-col gap-3 text-center md:text-left">
              <div>
                <h4 className="text-xl md:text-2xl font-black text-[#0d1b10]">Profile Photo</h4>
                <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">Recommended: Square JPG or PNG, min. 400x400px</p>
              </div>
              <div className="flex gap-4 justify-center md:justify-start mt-2">
                <button type="button" className="px-5 py-2.5 bg-surface-light hover:bg-primary/20 text-[#0d1b10] rounded-xl text-sm font-bold transition-all">Upload New</button>
                <button type="button" className="px-5 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-sm font-bold transition-all">Remove</button>
              </div>
            </div>
          </div>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">First Name</label>
                <input type="text" defaultValue="Newt" className="w-full rounded-2xl border-none bg-surface-light py-4 px-5 font-semibold text-[#0d1b10] focus:ring-2 focus:ring-primary transition-all placeholder:text-gray-400" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Last Name</label>
                <input type="text" defaultValue="Doe" className="w-full rounded-2xl border-none bg-surface-light py-4 px-5 font-semibold text-[#0d1b10] focus:ring-2 focus:ring-primary transition-all placeholder:text-gray-400" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                  <input type="email" defaultValue="hello@teasoul.com" className="w-full rounded-2xl border-none bg-surface-light py-4 pl-14 pr-5 font-semibold text-[#0d1b10] focus:ring-2 focus:ring-primary transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Phone Number (Optional)</label>
                <input type="tel" defaultValue="+84 123 456 789" className="w-full rounded-2xl border-none bg-surface-light py-4 px-5 font-semibold text-[#0d1b10] focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 md:gap-6 pt-10 border-t border-gray-100">
              <Link to="/profile" className="text-sm font-bold text-gray-500 hover:text-[#0d1b10] transition-colors py-4 md:py-0">Discard Changes</Link>
              <button type="submit" className="w-full md:w-auto px-10 py-4 bg-primary text-[#0d1b10] rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary/90 hover:scale-[1.02] active:scale-95 transition-all shadow-md shadow-primary/20">
                Save Changes
              </button>
            </div>
          </form>

        </div>
      </section>
    </div>
  );
};

export default EditProfile;