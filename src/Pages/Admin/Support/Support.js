import React, { useState, useMemo } from 'react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('Open Tickets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    { id: 'TKT-1042', customer: 'Alice Green', email: 'alice@example.com', subject: 'Damaged packaging on arrival', priority: 'High', status: 'Open', date: '2 hours ago', message: 'Hi, my Imperial Jasmine Pearl box arrived crushed. The tea inside seems fine but this was meant to be a gift. Can I get a replacement box sent out?' },
    { id: 'TKT-1041', customer: 'Diana Darjeeling', email: 'diana@outlook.com', subject: 'Brewing temperature for Oolong?', priority: 'Low', status: 'Open', date: '5 hours ago', message: 'What is the absolute best water temperature for the Spring Harvest Oolong? I don\'t want to burn the leaves.' },
    { id: 'TKT-1040', customer: 'Marcus Tealeaf', email: 'marcus@tealeaf.com', subject: 'Missing my free sample', priority: 'Normal', status: 'In Progress', date: '1 day ago', message: 'My order #TV-1015 arrived but the complimentary matcha sample was missing from the package.' },
    { id: 'TKT-1039', customer: 'Charlie Chai', email: 'charlie@tea.co', subject: 'Corporate bulk order inquiry', priority: 'High', status: 'Resolved', date: '2 days ago', message: 'Looking to order 50 custom gift packages for my team for the holidays. Do you offer bulk scaling discounts?' }
  ];

  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesSearch = t.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTab = activeTab === 'All Tickets' || 
                         (activeTab === 'Open Tickets' && (t.status === 'Open' || t.status === 'In Progress')) ||
                         (activeTab === 'Resolved' && t.status === 'Resolved');

      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen relative">
      
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-start mb-6 shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-slate-900">{selectedTicket.subject}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    selectedTicket.priority === 'High' ? 'bg-red-100 text-red-700' :
                    selectedTicket.priority === 'Normal' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {selectedTicket.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-500">Ticket {selectedTicket.id} • From <span className="font-bold text-slate-700">{selectedTicket.customer}</span> ({selectedTicket.email})</p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-6 scrollbar-hide">
              <div className="flex gap-4">
                <div className="size-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
                  {selectedTicket.customer.charAt(0)}
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-none p-4 text-sm text-slate-700 leading-relaxed w-full">
                  {selectedTicket.message}
                </div>
              </div>

              {selectedTicket.status === 'Resolved' && (
                <div className="flex gap-4 flex-row-reverse">
                  <div className="size-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                    <span className="material-symbols-outlined text-[18px]">support_agent</span>
                  </div>
                  <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 text-sm leading-relaxed w-full">
                    Hi Charlie, absolutely! We have a dedicated corporate gifting tier. I have just emailed you our enterprise pricing sheet and a direct link to schedule a call with our fulfillment manager.
                  </div>
                </div>
              )}
            </div>

            {selectedTicket.status !== 'Resolved' && (
              <div className="shrink-0 space-y-4 pt-4 border-t border-slate-100">
                <textarea 
                  className="w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-500 focus:ring-blue-500 sm:text-sm resize-none p-4" 
                  rows="3" 
                  placeholder="Type your official support response here..."
                ></textarea>
                <div className="flex gap-3 justify-end">
                  <button 
                    onClick={() => setSelectedTicket(null)} 
                    className="py-2.5 px-6 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button 
                    onClick={() => {
                      alert("Simulating email dispatch and marking ticket as resolved...");
                      setSelectedTicket(null);
                    }} 
                    className="py-2.5 px-6 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Send & Resolve
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Customer Support</h1>
            <p className="mt-1 text-slate-500">Manage inquiries, resolve shipping issues, and ensure a perfect tea experience.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Logs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Open Tickets</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">12</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">High Priority</p>
            <h3 className="text-2xl font-bold text-red-600 mt-2">3</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Avg Response Time</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-2">1.4 hrs</h3>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-1">
            <p className="text-slate-500 text-sm font-medium">Resolved Today</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-2">28</h3>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {['Open Tickets', 'All Tickets', 'Resolved'].map((tab) => (
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
              placeholder="Search by ticket ID, subject, or user..." 
              type="text"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 pl-6 text-sm font-semibold text-slate-600 w-[12%]">Ticket ID</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[20%]">Customer</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[30%]">Subject Line</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[10%]">Priority</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[13%]">Status</th>
                  <th className="p-4 pr-6 text-sm font-semibold text-slate-600 w-[15%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-4 pl-6 truncate">
                        <span className="font-mono font-bold text-slate-500">{ticket.id}</span>
                        <div className="text-xs text-slate-400 mt-0.5">{ticket.date}</div>
                      </td>
                      <td className="p-4 truncate">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 truncate">{ticket.customer}</span>
                          <span className="text-xs font-medium text-slate-500 truncate">{ticket.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-700 truncate">
                        {ticket.subject}
                      </td>
                      <td className="p-4 truncate">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          ticket.priority === 'High' ? 'bg-red-50 text-red-700' :
                          ticket.priority === 'Normal' ? 'bg-blue-50 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="p-4 truncate">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          ticket.status === 'Resolved' ? 'bg-green-100 text-green-800 border-green-200' :
                          ticket.status === 'In Progress' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                          'bg-blue-100 text-blue-800 border-blue-200'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button 
                          onClick={() => setSelectedTicket(ticket)}
                          className="text-blue-600 hover:bg-blue-50 transition-colors px-3 py-1.5 rounded-md text-xs font-bold border border-slate-200 hover:border-blue-200"
                        >
                          Respond
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 font-medium">
                      No support tickets found matching your criteria.
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

export default Support;