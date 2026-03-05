import React from 'react';

const Dashboard = () => {
  const recentOrders = [
    { id: '#ORD-0012', customer: 'Alex Morgan', type: 'Custom Gift Box', date: 'Oct 24, 2023', amount: '$48.00', status: 'Completed', statusColor: 'bg-green-100 text-green-800' },
    { id: '#ORD-0011', customer: 'Sarah Jones', type: 'Standard', date: 'Oct 23, 2023', amount: '$32.00', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: '#ORD-0010', customer: 'Michael Chen', type: 'Corporate Gift', date: 'Oct 23, 2023', amount: '$285.00', status: 'Packaging', statusColor: 'bg-blue-100 text-blue-800' },
    { id: '#ORD-0009', customer: 'Emma Wilson', type: 'Standard', date: 'Oct 22, 2023', amount: '$16.00', status: 'Completed', statusColor: 'bg-green-100 text-green-800' }
  ];

  const contentAlerts = [
    { title: 'Tết Holiday Banner', type: 'Animated Hero', status: 'Scheduled', icon: 'animation' },
    { title: 'Spring Matcha Sale', type: 'Voucher/Discount', status: 'Active', icon: 'sell' },
    { title: 'Oolong Origin Guide', type: 'Blog Content', status: 'Pending Review', icon: 'article' },
    { title: 'Uji Matcha Matrix', type: 'Tea Comparison', status: 'Updated', icon: 'tune' }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 text-[#102213] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-[#102213]">System Overview</h2>
            <p className="text-gray-500 mt-1">TeaVault Central Management & Analytics Console.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span className="flex items-center text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[16px] mr-1">trending_up</span> 12%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">Sales Revenue</p>
            <h3 className="text-2xl font-bold mt-1">$45,231</h3>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500">Active Order States</p>
            <h3 className="text-2xl font-bold mt-1">342</h3>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <span className="material-symbols-outlined">redeem</span>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-500">Custom Gift Packages</p>
            <h3 className="text-2xl font-bold mt-1">128</h3>
          </div>

          <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <span className="flex items-center text-sm font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                Action Req.
              </span>
            </div>
            <p className="text-sm font-medium text-gray-500">Low Stock / Vendors</p>
            <h3 className="text-2xl font-bold mt-1">5 Items</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-lg">Revenue & Profit Analytics</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold tracking-tight">$12,450</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm font-medium rounded-lg bg-gray-100 transition-colors">Week</button>
                <button className="px-3 py-1 text-sm font-medium rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">Month</button>
              </div>
            </div>
            <div className="relative w-full h-full min-h-[250px] mt-4">
              <svg className="w-full h-full absolute inset-0" fill="none" preserveAspectRatio="none" viewBox="0 0 478 150" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="236" x2="236" y1="1" y2="149">
                    <stop stopColor="#3b82f6" stopOpacity="0.2"></stop>
                    <stop offset="1" stopColor="#3b82f6" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear)"></path>
                <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#3b82f6" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-lg mb-6">Media & Campaign Control</h3>
              <div className="flex flex-col gap-5">
                {contentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center gap-4 border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                      <span className="material-symbols-outlined">{alert.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{alert.title}</p>
                      <p className="text-xs text-gray-500">{alert.type}</p>
                    </div>
                    <span className="text-xs font-bold text-blue-600">{alert.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-lg mb-4">Support & Feedback</h3>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center p-3 bg-yellow-50/50 rounded-lg border border-yellow-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-yellow-600 text-[20px]">star_half</span>
                    <span className="text-sm font-bold text-gray-700">Pending Reviews</span>
                  </div>
                  <span className="px-2.5 py-1 bg-yellow-100 text-yellow-800 rounded-md text-xs font-black">12 Awaiting</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50/50 rounded-lg border border-red-100">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-500 text-[20px]">support_agent</span>
                    <span className="text-sm font-bold text-gray-700">Open Tickets</span>
                  </div>
                  <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-black">3 Urgent</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg">Transaction Evidence (Recent)</h3>
            <div className="flex gap-2">
              <span className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <span className="material-symbols-outlined text-[18px]">search</span>
                </span>
                <input className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" placeholder="Search orders..." type="text" />
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Fulfillment Type</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium">{order.id}</td>
                    <td className="px-6 py-4 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 text-gray-500">{order.type}</td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 font-bold">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${order.statusColor}`}>
                        {order.status}
                      </span>
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

export default Dashboard;