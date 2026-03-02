import React, { useState } from 'react';

const Campaigns = () => {
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

  const banners = [
    { id: 1, title: 'Tết Holiday Hero (Animated)', type: 'Homepage Hero', status: 'Scheduled', date: 'Feb 10 - Feb 24', color: 'bg-gradient-to-r from-red-500 to-orange-400' },
    { id: 2, title: 'Spring Matcha Collection', type: 'Category Banner', status: 'Live', date: 'Current', color: 'bg-gradient-to-r from-green-400 to-emerald-600' },
    { id: 3, title: 'Oolong Flash Sale', type: 'Popup Asset', status: 'Draft', date: 'TBD', color: 'bg-gradient-to-r from-blue-400 to-indigo-500' }
  ];

  const vouchers = [
    { code: 'TETTEA20', discount: '20% OFF', usage: '0 / 500', status: 'Scheduled' },
    { code: 'SPRINGFREESHIP', discount: 'Free Shipping', usage: '342 / ∞', status: 'Active' },
    { code: 'WELCOME10', discount: '10% OFF', usage: '1,205 / ∞', status: 'Active' }
  ];

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen relative">
      
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">campaign</span>
                Launch New Campaign
              </h3>
              <button onClick={() => setIsCampaignModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Campaign Title</label>
                <input type="text" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., Summer Iced Tea Promo" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Attach Asset</label>
                  <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option>Select from library...</option>
                    <option>Tết Holiday Hero (Animated)</option>
                    <option>Spring Matcha Collection</option>
                    <option>Oolong Flash Sale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Schedule Dates</label>
                  <input type="text" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="MM/DD - MM/DD" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsCampaignModalOpen(false)} className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Simulating campaign scheduling...");
                  setIsCampaignModalOpen(false);
                }} 
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Schedule Campaign
              </button>
            </div>
          </div>
        </div>
      )}

      {isAssetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">wallpaper</span>
                Upload Graphic Asset
              </h3>
              <button onClick={() => setIsAssetModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Internal Asset Name</label>
                <input type="text" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., Spring Matcha Final v2" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Asset Placement</label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option>Homepage Hero</option>
                  <option>Category Banner</option>
                  <option>Animated Popup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Designer File</label>
                <label className="flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <span className="material-symbols-outlined text-slate-400 text-3xl mb-1">cloud_upload</span>
                  <span className="text-sm font-bold text-slate-600">Click to upload banner (PNG, GIF)</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsAssetModalOpen(false)} className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Simulating saving asset to library...");
                  setIsAssetModalOpen(false);
                }} 
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Upload to Library
              </button>
            </div>
          </div>
        </div>
      )}

      {isVoucherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">local_activity</span>
                Create Discount Code
              </h3>
              <button onClick={() => setIsVoucherModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Voucher Code</label>
                <input type="text" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm font-mono uppercase tracking-widest" placeholder="e.g., FRESHTEA20" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Discount Offer</label>
                  <input type="text" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="e.g., 20% OFF or Free Ship" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Usage Limit</label>
                  <input type="number" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Leave blank for infinite" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsVoucherModalOpen(false)} className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Simulating voucher generation to backend...");
                  setIsVoucherModalOpen(false);
                }} 
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Activate Code
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Campaigns & Media</h1>
            <p className="mt-1 text-slate-500">Coordinate graphic designer assets, seasonal events, and discount vouchers.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCampaignModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              New Campaign
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">wallpaper</span> Graphic Asset Library
            </h3>
            <button onClick={() => setIsAssetModalOpen(true)} className="text-sm font-bold text-blue-600 hover:text-blue-700">Upload Asset</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {banners.map((banner) => (
              <div key={banner.id} className="flex flex-col group cursor-pointer" onClick={() => setIsAssetModalOpen(true)}>
                <div className={`w-full aspect-[21/9] rounded-lg ${banner.color} mb-3 flex items-center justify-center shadow-inner relative overflow-hidden group-hover:shadow-md transition-all`}>
                  <span className="text-white/80 font-black tracking-widest uppercase text-xl mix-blend-overlay">Preview</span>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 transition-opacity text-3xl drop-shadow-md">edit</span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{banner.title}</h4>
                    <p className="text-xs text-slate-500 font-medium">{banner.type} • {banner.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${banner.status === 'Live' ? 'bg-green-50 text-green-700 border-green-200' : banner.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                    {banner.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">local_activity</span> Voucher & Discount Engine
            </h3>
            <button 
              onClick={() => setIsVoucherModalOpen(true)}
              className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50"
            >
              <span className="material-symbols-outlined text-[16px]">add</span> Create Code
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 pl-6 text-sm font-semibold text-slate-600 w-[30%]">Voucher Code</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[25%]">Discount Offer</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[20%]">Usage Limit</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[15%]">Status</th>
                  <th className="p-4 pr-6 text-sm font-semibold text-slate-600 w-[10%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vouchers.map((voucher, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                    <td className="p-4 pl-6 truncate">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded tracking-wide border border-slate-200">{voucher.code}</span>
                    </td>
                    <td className="p-4 text-sm font-bold text-blue-600 truncate">
                      {voucher.discount}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-500 truncate">
                      {voucher.usage}
                    </td>
                    <td className="p-4 truncate">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${voucher.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200'}`}>
                        {voucher.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button 
                        onClick={() => setIsVoucherModalOpen(true)}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Campaigns;