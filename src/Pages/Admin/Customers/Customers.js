import React, { useState, useMemo } from 'react';

const Customers = () => {
  const [activeTab, setActiveTab] = useState('User Directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const customers = [
    { id: 'CUS-092', name: 'Alice Green', email: 'alice@example.com', orders: 14, spent: '$345.50', status: 'Active' },
    { id: 'CUS-091', name: 'Bob Herbal', email: 'bob@herbal.com', orders: 2, spent: '$45.00', status: 'Inactive' },
    { id: 'CUS-090', name: 'Charlie Chai', email: 'charlie@tea.co', orders: 28, spent: '$1,250.00', status: 'VIP' },
    { id: 'CUS-089', name: 'Diana Darjeeling', email: 'diana@outlook.com', orders: 5, spent: '$115.00', status: 'Active' }
  ];

  const reviews = [
    { id: 'REV-105', product: 'Imperial Jasmine Pearl', customer: 'Alice Green', rating: 5, text: 'Absolutely incredible aroma. Will buy again!', status: 'Pending' },
    { id: 'REV-104', product: 'Classic Earl Grey', customer: 'Bob Herbal', rating: 3, text: 'Good, but a bit too much bergamot for my taste.', status: 'Approved' },
    { id: 'REV-103', product: 'Aged Pu-erh Cake', customer: 'Charlie Chai', rating: 5, text: 'A masterpiece. The 2018 vintage is so smooth.', status: 'Pending' }
  ];

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredReviews = useMemo(() => {
    return reviews.filter(r => 
      r.product.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen relative">
      
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xl">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedCustomer.name}</h3>
                  <p className="text-sm text-slate-500">{selectedCustomer.email}</p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Lifetime Orders</p>
                <p className="text-2xl font-black text-slate-900">{selectedCustomer.orders}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Spent</p>
                <p className="text-2xl font-black text-blue-600">{selectedCustomer.spent}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setSelectedCustomer(null)} 
                className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
              >
                Close Profile
              </button>
              <button 
                onClick={() => {
                  alert(`Simulating password reset email sent to ${selectedCustomer.email}`);
                  setSelectedCustomer(null);
                }} 
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">rate_review</span>
                Moderate Review
              </h3>
              <button onClick={() => setSelectedReview(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">{selectedReview.product}</p>
                  <p className="text-xs text-slate-500">By {selectedReview.customer}</p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: i < selectedReview.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-slate-700 italic">"{selectedReview.text}"</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Official Store Reply</label>
                <textarea 
                  className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none" 
                  rows="3" 
                  placeholder="Write a public response to this customer..."
                ></textarea>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  alert("Review flagged for deletion.");
                  setSelectedReview(null);
                }} 
                className="px-4 py-2.5 rounded-lg bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors"
              >
                Flag
              </button>
              <div className="flex-1 flex gap-3">
                <button 
                  onClick={() => setSelectedReview(null)} 
                  className="flex-1 py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert("Simulating review approval and reply posting...");
                    setSelectedReview(null);
                  }} 
                  className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
                >
                  Approve & Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Users & Reviews</h1>
            <p className="mt-1 text-slate-500">Manage user accounts, track lifetime value, and moderate public feedback.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Invite User
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Total Users</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">1,205</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Pending Reviews</p>
            <h3 className="text-2xl font-bold text-orange-600 mt-2">12</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Average Store Rating</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">4.8 / 5.0</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">VIP Members</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">142</h3>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {['User Directory', 'Product Reviews'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="relative group w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors">search</span>
            </div>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border-none ring-1 ring-slate-200 rounded-lg bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" 
              placeholder={`Search ${activeTab === 'User Directory' ? 'names or emails' : 'products or reviews'}...`} 
              type="text"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            {activeTab === 'User Directory' ? (
              <table className="w-full text-left border-collapse table-fixed min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 pl-6 text-sm font-semibold text-slate-600 w-[15%]">User ID</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[25%]">User Info</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[15%]">Total Orders</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[15%]">Lifetime Value</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[15%]">Account Status</th>
                    <th className="p-4 pr-6 text-sm font-semibold text-slate-600 w-[15%] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((customer, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-4 pl-6 truncate">
                        <span className="font-mono font-bold text-slate-500">{customer.id}</span>
                      </td>
                      <td className="p-4 truncate">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 truncate">{customer.name}</span>
                          <span className="text-xs font-medium text-slate-500 truncate">{customer.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900 truncate">{customer.orders}</td>
                      <td className="p-4 text-sm font-bold text-blue-600 truncate">{customer.spent}</td>
                      <td className="p-4 truncate">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          customer.status === 'VIP' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          customer.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button 
                          onClick={() => setSelectedCustomer(customer)}
                          className="text-blue-600 hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-md text-xs font-bold border border-slate-200 hover:border-blue-200"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 pl-6 text-sm font-semibold text-slate-600 w-[10%]">Review ID</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[20%]">Product</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[30%]">User Feedback</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[15%]">Rating</th>
                    <th className="p-4 text-sm font-semibold text-slate-600 w-[10%]">Status</th>
                    <th className="p-4 pr-6 text-sm font-semibold text-slate-600 w-[15%] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReviews.map((review, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-4 pl-6 truncate">
                        <span className="font-mono font-bold text-slate-500">{review.id}</span>
                      </td>
                      <td className="p-4 truncate">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 truncate">{review.product}</span>
                          <span className="text-xs font-medium text-slate-500 truncate">By {review.customer}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600 truncate italic">
                        "{review.text}"
                      </td>
                      <td className="p-4 truncate">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 truncate">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          review.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-orange-100 text-orange-800 border-orange-200'
                        }`}>
                          {review.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button 
                          onClick={() => setSelectedReview(review)}
                          className="text-blue-600 hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-md text-xs font-bold border border-slate-200 hover:border-blue-200"
                        >
                          Moderate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Customers;