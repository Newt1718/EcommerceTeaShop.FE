import React, { useState, useMemo } from 'react';

const QRSystem = () => {
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [downloadBatch, setDownloadBatch] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Newest Batch');

  const qrBatches = [
    { id: 'QRB-8842', product: 'Imperial Jasmine Pearl', origin: 'Fujian Province, China', harvest: 'Oct 12, 2023', scans: 142, status: 'Active' },
    { id: 'QRB-8841', product: 'Classic Earl Grey', origin: 'Assam, India', harvest: 'Sep 28, 2023', scans: 89, status: 'Active' },
    { id: 'QRB-8840', product: 'Uji Matcha Ceremony', origin: 'Kyoto, Japan', harvest: 'Sep 15, 2023', scans: 315, status: 'Depleted' },
    { id: 'QRB-8839', product: 'Aged Pu-erh Cake', origin: 'Yunnan, China', harvest: 'Spring 2018', scans: 42, status: 'Active' },
    { id: 'QRB-8838', product: 'Wild Chamomile', origin: 'Da Lat, Vietnam', harvest: 'Oct 20, 2023', scans: 0, status: 'Printing' }
  ];

  const filteredBatches = useMemo(() => {
    let result = qrBatches.filter(batch => 
      batch.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOption === 'Most Scans') {
      result.sort((a, b) => b.scans - a.scans);
    } else if (sortOption === 'Least Scans') {
      result.sort((a, b) => a.scans - b.scans);
    } else if (sortOption === 'Oldest Batch') {
      result.sort((a, b) => a.id.localeCompare(b.id)); 
    } else {
      result.sort((a, b) => b.id.localeCompare(a.id)); 
    }

    return result;
  }, [searchQuery, sortOption]);

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen relative">
      
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">qr_code_scanner</span>
                Generate Traceability Batch
              </h3>
              <button onClick={() => setIsGenerateModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Select Product</label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option>Imperial Jasmine Pearl Green Tea</option>
                  <option>Spring Harvest Oolong</option>
                  <option>Silver Needle White Tea</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Harvest Date</label>
                  <input type="date" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Batch Size (Stickers)</label>
                  <input type="number" defaultValue="500" className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Origin / Farm Partner</label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                  <option>Fujian Province, China (Partner A)</option>
                  <option>Kyoto, Japan (Partner B)</option>
                  <option>Da Lat, Vietnam (Partner C)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsGenerateModalOpen(false)} className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Simulating QR Code generation sequence...");
                  setIsGenerateModalOpen(false);
                }} 
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">print</span>
                Generate & Print
              </button>
            </div>
          </div>
        </div>
      )}

      {downloadBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 transform scale-100">
            <div className="flex items-center justify-center size-12 rounded-full bg-blue-50 text-blue-600 mb-4 mx-auto">
              <span className="material-symbols-outlined text-2xl">folder_zip</span>
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-1">Export QR Assets</h3>
            <p className="text-sm text-slate-500 text-center mb-4">
              Packaging image files for batch <span className="font-bold text-slate-700">{downloadBatch.id}</span>.
            </p>
            <div className="bg-slate-50 rounded-lg p-3 mb-6 border border-slate-100 text-sm text-slate-600 flex flex-col gap-1">
              <div className="flex justify-between"><span>Product:</span> <span className="font-bold text-slate-900 truncate ml-2">{downloadBatch.product}</span></div>
              <div className="flex justify-between"><span>Format:</span> <span className="font-bold text-slate-900">High-Res PNG</span></div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setDownloadBatch(null)}
                className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setTimeout(() => setDownloadBatch(null), 600);
                  alert(`Simulating ZIP download for ${downloadBatch.id}...`);
                }}
                className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px] animate-bounce">download</span>
                Save ZIP
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">QR Traceability</h1>
            <p className="mt-1 text-slate-500">Manage origin tracking codes and monitor customer scan engagement.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsGenerateModalOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              Generate Batch
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Total Batches</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">184</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Customer Scans (30d)</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">2,405</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Active Farm Partners</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">12</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Awaiting Print</p>
            <h3 className="text-2xl font-bold text-orange-500 mt-2">1 Batch</h3>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative group w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors">search</span>
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border-none ring-1 ring-slate-200 rounded-lg bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" 
              placeholder="Search by Batch ID or Product Name..." 
              type="text"
            />
          </div>
          
          <div className="relative w-full md:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
              Sort: {sortOption}
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-20 py-2">
                <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Sort By</div>
                {['Newest Batch', 'Oldest Batch', 'Most Scans', 'Least Scans'].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortOption(option);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      sortOption === option ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 pl-6 text-sm font-semibold text-slate-600 w-[15%]">Batch ID</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[25%]">Product Link</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[20%]">Verified Origin</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[15%]">Harvest Date</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[10%]">Scans</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[10%]">Status</th>
                  <th className="p-4 pr-6 text-sm font-semibold text-slate-600 w-[5%] text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-4 pl-6 truncate">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded tracking-wide border border-slate-200">
                          {batch.id}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900 truncate">
                        {batch.product}
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 truncate flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-green-600">verified</span>
                        {batch.origin}
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-500 truncate">
                        {batch.harvest}
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900 truncate">
                        {batch.scans}
                      </td>
                      <td className="p-4 truncate">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                          batch.status === 'Active' ? 'text-green-700 bg-green-50' : 
                          batch.status === 'Printing' ? 'text-orange-700 bg-orange-50' : 
                          'text-slate-500 bg-slate-100'
                        }`}>
                          {batch.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button 
                          onClick={() => setDownloadBatch(batch)}
                          className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50"
                        >
                          <span className="material-symbols-outlined text-[20px]">download</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500 font-medium">
                      No tracking batches found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QRSystem;