import React, { useState } from 'react';

const Analytics = () => {
  const [activeTimeframe, setActiveTimeframe] = useState('This Month');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Simulated metrics data for different timeframes
  const metricsData = {
    'This Week': {
      revenue: '$5,120.00',
      revenueChange: '+2.1% vs last period',
      orders: '164',
      ordersChange: '+1.8% vs last period',
      avgOrder: '$31.22',
      avgOrderChange: '+0.3% vs last period',
      convRate: '3.88%',
      convRateChange: '-0.2% vs last period',
    },
    'This Month': {
      revenue: '$24,892.50',
      revenueChange: '+14.5% vs last period',
      orders: '842',
      ordersChange: '+5.2% vs last period',
      avgOrder: '$29.56',
      avgOrderChange: 'Steady vs last period',
      convRate: '3.24%',
      convRateChange: '-1.1% vs last period',
    },
    'This Year': {
      revenue: '$184,500.00',
      revenueChange: '+8.9% vs last period',
      orders: '6,215',
      ordersChange: '+4.1% vs last period',
      avgOrder: '$29.68',
      avgOrderChange: '-0.1% vs last period',
      convRate: '3.12%',
      convRateChange: '+0.5% vs last period',
    }
  };

  const topProducts = [
    { id: '1', name: 'Imperial Jasmine Pearl', category: 'Green Tea', sold: 342, revenue: '$8,208.00', trend: '+12%' },
    { id: '2', name: 'Classic Earl Grey', category: 'Black Tea', sold: 215, revenue: '$3,547.50', trend: '+5%' },
    { id: '3', name: 'Aged Pu-erh Cake', category: 'Specialty', sold: 89, revenue: '$3,115.00', trend: '-2%' },
    { id: '4', name: 'Spring Harvest Oolong', category: 'Oolong', sold: 124, revenue: '$2,976.00', trend: '+18%' }
  ];

  const chartDataMapper = {
    'This Week': [100, 40, 65, 45, 80, 55, 90].map(h => (h / 1.5)), 
    'This Month': [40, 65, 45, 80, 55, 90, 75, 100, 60, 85, 70, 95], 
    'This Year': [40, 65, 45, 80, 55, 90, 75, 100, 60, 85, 70, 95].map(h => (h * 1.5)) 
  }

  const barHeights = chartDataMapper[activeTimeframe];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const simulatedData = metricsData[activeTimeframe];

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen relative">
      
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-slate-100 transform scale-100">
            <div className="flex items-center justify-center size-12 rounded-full bg-blue-50 text-blue-600 mb-4 mx-auto">
              <span className="material-symbols-outlined text-2xl">folder_zip</span>
            </div>
            <h3 className="text-lg font-bold text-center text-slate-900 mb-1">Export Sales Report</h3>
            <p className="text-sm text-slate-500 text-center mb-4">
              Packaging detailed sales data for <span className="font-bold text-slate-700">{activeTimeframe.toLowerCase()}</span>.
            </p>
            <div className="bg-slate-50 rounded-lg p-3 mb-6 border border-slate-100 text-sm text-slate-600 flex flex-col gap-2">
              <label className="block text-xs font-bold text-slate-500 uppercase">Select Format</label>
              <select className="w-full rounded-lg border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option>High-Res CSV Data</option>
                <option>Detailed PDF Report</option>
                <option>Excel Analytics Workbook</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="flex-1 py-2 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setTimeout(() => setIsReportModalOpen(false), 600);
                  alert(`Simulating ZIP download of detailed ${activeTimeframe} report...`);
                }}
                className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                Save ZIP
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Sales Analytics</h1>
            <p className="mt-1 text-slate-500">Monitor store revenue, conversion rates, and top-performing products.</p>
          </div>
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            {['This Week', 'This Month', 'This Year'].map((range) => (
              <button
                key={range}
                onClick={() => setActiveTimeframe(range)}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
                  activeTimeframe === range ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Revenue</p>
              <span className={`material-symbols-outlined ${simulatedData.revenueChange.startsWith('+') ? 'text-green-500' : 'text-red-500'} text-[20px]`}>
                {simulatedData.revenueChange.startsWith('+') ? 'trending_up' : 'trending_down'}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{simulatedData.revenue}</h3>
            <p className={`text-xs font-bold ${simulatedData.revenueChange.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} self-start px-2 py-0.5 rounded`}>
              {simulatedData.revenueChange}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Orders</p>
              <span className={`material-symbols-outlined ${simulatedData.ordersChange.startsWith('+') ? 'text-blue-500' : 'text-red-500'} text-[20px]`}>
                {simulatedData.ordersChange.startsWith('+') ? 'trending_up' : 'trending_down'}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{simulatedData.orders}</h3>
            <p className={`text-xs font-bold ${simulatedData.ordersChange.startsWith('+') ? 'text-blue-600 bg-blue-50' : 'text-red-600 bg-red-50'} self-start px-2 py-0.5 rounded`}>
              {simulatedData.ordersChange}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Avg Order Value</p>
              <span className={`material-symbols-outlined ${simulatedData.avgOrderChange.startsWith('+') ? 'text-purple-500' : simulatedData.avgOrderChange.startsWith('-') ? 'text-red-500' : 'text-slate-500'} text-[20px]`}>
                {simulatedData.avgOrderChange.startsWith('+') ? 'trending_up' : simulatedData.avgOrderChange.startsWith('-') ? 'trending_down' : 'horizontal_rule'}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{simulatedData.avgOrder}</h3>
            <p className={`text-xs font-bold ${simulatedData.avgOrderChange.startsWith('+') ? 'text-purple-600 bg-purple-50' : simulatedData.avgOrderChange.startsWith('-') ? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-100'} self-start px-2 py-0.5 rounded`}>
              {simulatedData.avgOrderChange}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Conversion Rate</p>
              <span className={`material-symbols-outlined ${simulatedData.convRateChange.startsWith('+') ? 'text-orange-500' : simulatedData.convRateChange.startsWith('-') ? 'text-red-500' : 'text-slate-500'} text-[20px]`}>
                {simulatedData.convRateChange.startsWith('+') ? 'trending_up' : simulatedData.convRateChange.startsWith('-') ? 'trending_down' : 'horizontal_rule'}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900">{simulatedData.convRate}</h3>
            <p className={`text-xs font-bold ${simulatedData.convRateChange.startsWith('+') ? 'text-orange-600 bg-orange-50' : simulatedData.convRateChange.startsWith('-') ? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-100'} self-start px-2 py-0.5 rounded`}>
              {simulatedData.convRateChange}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
            <button 
              onClick={() => setIsReportModalOpen(true)}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 p-2 rounded-md hover:bg-blue-50"
            >
              Detailed Report <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 border-b border-slate-100 pb-4 mt-4">
            {barHeights.map((height, idx) => (
              <div key={idx} className="w-full h-full flex flex-col items-center justify-end gap-2 group cursor-pointer">
                <div 
                  className="w-full bg-blue-100 rounded-t-md relative group-hover:bg-blue-200 transition-colors"
                  style={{ height: `${height}%` }}
                >
                  <div 
                    className="absolute bottom-0 w-full bg-blue-600 rounded-t-md group-hover:bg-blue-700 transition-colors"
                    style={{ height: `${height * 0.7}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-slate-400 group-hover:text-slate-600">{months[idx]}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="text-xs font-bold text-slate-500">Gross Sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-100"></div>
              <span className="text-xs font-bold text-slate-500">Net Profit</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Top Performing Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 pl-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-[40%]">Product Name</th>
                  <th className="p-4 text-sm font-bold text-slate-500 uppercase tracking-wider w-[20%]">Category</th>
                  <th className="p-4 text-sm font-bold text-slate-500 uppercase tracking-wider w-[15%]">Units Sold</th>
                  <th className="p-4 pr-6 text-sm font-bold text-slate-500 uppercase tracking-wider w-[25%] text-right">Total Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-900 truncate">{product.name}</td>
                    <td className="p-4 text-sm text-slate-600 truncate">{product.category}</td>
                    <td className="p-4 text-sm font-bold text-slate-700">{product.sold}</td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-sm font-bold text-slate-900">{product.revenue}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${product.trend.startsWith('+') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {product.trend}
                        </span>
                      </div>
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

export default Analytics;