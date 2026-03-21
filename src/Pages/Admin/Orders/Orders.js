import React, { useState, useMemo, useEffect } from 'react';
import {
  getAdminOrderDetailApi,
  getAdminOrdersApi,
} from '../../../services/adminOrderApi';

const formatVnd = (value) => `${new Intl.NumberFormat('vi-VN').format(Number(value || 0))} đ`;

const formatDateTime = (value) => {
  if (!value) {
    return { date: '--', time: '--' };
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return { date: '--', time: '--' };
  }

  return {
    date: parsed.toLocaleDateString('vi-VN'),
    time: parsed.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
};

const mapTabToTypeParam = (tab) => {
  if (tab === 'Trà') return 'tea';
  if (tab === 'Thiết kế trà') return 'design';
  if (tab === 'Cả trà & thiết kế') return 'both';
  return 'all';
};

const mapSortToApiParam = (sortOption) => {
  if (sortOption === 'Cũ nhất') return 'oldest';
  return 'newest';
};

const mapApiTypeToUiType = (type) => {
  if ((type || '').toLowerCase() === 'tea') return 'Trà';
  if ((type || '').toLowerCase() === 'design') return 'Thiết kế trà';
  if ((type || '').toLowerCase() === 'both') return 'Cả trà & thiết kế';
  return type || 'Không xác định';
};

const mapStatusClass = (status) => {
  const normalized = (status || '').toLowerCase();
  if (normalized === 'paid' || normalized === 'completed' || normalized === 'success') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }
  if (normalized === 'pending') {
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
  if (normalized === 'cancelled' || normalized === 'failed') {
    return 'bg-rose-50 text-rose-700 border-rose-200';
  }
  return 'bg-slate-100 text-slate-700 border-slate-200';
};

const Orders = () => {
  const [activeTab, setActiveTab] = useState('Tất cả đơn');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('Mới nhất');
  const [statusOption, setStatusOption] = useState('Tất cả trạng thái');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ordersPage, setOrdersPage] = useState({
    pageNumber: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 1,
    items: [],
  });
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState('');
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState('');

  const itemsPerPage = ordersPage.pageSize || 10;

  const allOrders = useMemo(
    () =>
      (ordersPage.items || []).map((order) => {
        const { date, time } = formatDateTime(order.orderDate);
        return {
          id: order.id,
          orderCode: order.orderCode,
          customer: order.customerName || 'Không có tên',
          email: order.email || '--',
          type: mapApiTypeToUiType(order.type),
          date,
          time,
          amount: Number(order.totalPrice || 0),
          status: order.status || '--',
        };
      }),
    [ordersPage.items],
  );

  const filteredOrders = useMemo(() => {
    let result = allOrders.filter(order => {
      const matchesTab = 
        activeTab === 'Tất cả đơn' ||
        (activeTab === 'Trà' && order.type === 'Trà') ||
        (activeTab === 'Thiết kế trà' && order.type === 'Thiết kế trà') ||
        (activeTab === 'Cả trà & thiết kế' && order.type === 'Cả trà & thiết kế');

      const normalizedStatus = String(order.status || '').toLowerCase();
      const matchesStatus =
        statusOption === 'Tất cả trạng thái' ||
        (statusOption === 'Paid' && normalizedStatus === 'paid') ||
        (statusOption === 'Pending' && normalizedStatus === 'pending');

      const matchesSearch = 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesStatus && matchesSearch;
    });

    if (sortOption === 'Giá trị cao nhất') {
      result.sort((a, b) => Number(b.amount) - Number(a.amount));
    } else if (sortOption === 'Giá trị thấp nhất') {
      result.sort((a, b) => Number(a.amount) - Number(b.amount));
    } else if (sortOption === 'Cũ nhất') {
      result.sort((a, b) => a.orderCode - b.orderCode);
    } else {
      result.sort((a, b) => b.orderCode - a.orderCode);
    }

    return result;
  }, [activeTab, searchQuery, sortOption, statusOption, allOrders]);

  const totalPages = Math.max(ordersPage.totalPages || 1, 1);
  const currentOrders = filteredOrders;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, sortOption, statusOption]);

  useEffect(() => {
    let mounted = true;

    const loadOrders = async () => {
      setIsLoadingOrders(true);
      setOrdersError('');

      try {
        const response = await getAdminOrdersApi({
          sort: mapSortToApiParam(sortOption),
          type: mapTabToTypeParam(activeTab),
          pageNumber: currentPage,
          pageSize: itemsPerPage,
        });

        if (!mounted) {
          return;
        }

        const pageData = response?.data || {};
        setOrdersPage({
          pageNumber: Number(pageData.pageNumber || currentPage),
          pageSize: Number(pageData.pageSize || itemsPerPage),
          totalItems: Number(pageData.totalItems || 0),
          totalPages: Number(pageData.totalPages || 1),
          items: Array.isArray(pageData.items) ? pageData.items : [],
        });
      } catch (error) {
        if (!mounted) {
          return;
        }

        setOrdersError(error?.message || 'Không tải được danh sách đơn hàng.');
        setOrdersPage((prev) => ({ ...prev, items: [], totalItems: 0, totalPages: 1 }));
      } finally {
        if (mounted) {
          setIsLoadingOrders(false);
        }
      }
    };

    loadOrders();

    return () => {
      mounted = false;
    };
  }, [activeTab, currentPage, itemsPerPage, sortOption]);

  const handleViewDetail = async (order) => {
    setIsLoadingDetail(true);
    setDetailError('');
    try {
      const response = await getAdminOrderDetailApi(order.id);
      const detail = response?.data;

      if (!detail) {
        throw new Error('Không có dữ liệu chi tiết đơn hàng.');
      }

      const { date, time } = formatDateTime(detail.orderDate);

      setSelectedOrder({
        id: detail.id,
        orderCode: detail.orderCode,
        status: detail.status || '--',
        date,
        time,
        customer: detail.customer?.fullName || '--',
        phone: detail.customer?.phone || '--',
        items: Array.isArray(detail.items) ? detail.items : [],
        totalPrice: Number(detail.totalPrice || 0),
      });
    } catch (error) {
      setDetailError(error?.message || 'Không tải được chi tiết đơn hàng.');
    } finally {
      setIsLoadingDetail(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-scroll p-4 md:p-8 bg-gray-50 text-slate-900 min-h-screen relative">

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Đơn {selectedOrder.id}</h3>
                <p className="text-sm text-slate-500">Mã đơn #{selectedOrder.orderCode}</p>
                <p className="text-sm text-slate-500">{selectedOrder.date} lúc {selectedOrder.time}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Thông tin khách hàng</p>
                <p className="text-sm font-bold text-slate-900">{selectedOrder.customer}</p>
                <p className="text-sm text-slate-600">SĐT: {selectedOrder.phone}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Trạng thái</p>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${mapStatusClass(
                    selectedOrder.status,
                  )}`}
                >
                  {selectedOrder.status}
                </span>
              </div>
            </div>

            <div className="mb-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sản phẩm trong đơn</p>
              </div>
              <div className="p-4 space-y-3">
                {selectedOrder.items.length > 0 ? (
                  selectedOrder.items.map((item, index) => (
                    <div key={`${item.product}-${index}`} className="flex justify-between items-center text-sm">
                      <div>
                        <span className="font-medium text-slate-700">{item.product}</span>
                        <div className="text-xs text-slate-500 mt-1">
                          {item.gram ? `${item.gram}g` : '--'} • SL: {item.quantity || 0}
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">{formatVnd(item.price)}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">Không có sản phẩm trong đơn.</p>
                )}
                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                  <span className="font-medium text-slate-500">Tạm tính</span>
                  <span className="font-bold text-slate-900">{formatVnd(selectedOrder.totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                  <span className="font-medium text-slate-500">Vận chuyển tiêu chuẩn</span>
                  <span className="font-bold text-slate-900">{formatVnd(0)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-3">
                  <span className="font-black text-slate-900 uppercase">Tổng thanh toán</span>
                  <span className="font-black text-blue-600 text-lg">{formatVnd(selectedOrder.totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <button onClick={() => setSelectedOrder(null)} className="w-full py-2.5 rounded-lg bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-200 transition-colors">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quản lý đơn hàng</h1>
            <p className="mt-1 text-slate-500">Theo dõi lịch sử mua hàng của khách để quản lý tổng quan.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
            {['Tất cả đơn', 'Trà', 'Thiết kế trà', 'Cả trà & thiết kế'].map((tab) => (
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
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative group w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-blue-600 transition-colors">search</span>
              </div>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border-none ring-1 ring-slate-200 rounded-lg bg-white text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" 
                placeholder="Tìm mã đơn hoặc khách hàng..." 
                type="text"
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                Sắp xếp: {sortOption} • {statusOption}
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 z-20 py-2">
                  <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Sắp xếp theo</div>
                  {['Mới nhất', 'Cũ nhất', 'Giá trị cao nhất', 'Giá trị thấp nhất'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortOption(option);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        sortOption === option ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}

                  <div className="my-2 h-px bg-slate-100" />
                  <div className="px-3 py-1 text-xs font-bold text-slate-400 uppercase tracking-wider">Trạng thái</div>
                  {['Tất cả trạng thái', 'Paid', 'Pending'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setStatusOption(option);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        statusOption === option ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {ordersError && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 font-medium">
            {ordersError}
          </div>
        )}

        {detailError && (
          <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 font-medium">
            {detailError}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 pl-6 text-sm font-semibold text-slate-600 w-[12%]">Mã đơn</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[20%]">Khách hàng</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[16%]">Loại sản phẩm</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[16%]">Trạng thái</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[18%]">Ngày ghi nhận</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 w-[16%]">Tổng</th>
                  <th className="p-4 pr-6 text-sm font-semibold text-slate-600 w-[8%] text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoadingOrders ? (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500 font-medium">
                      Đang tải đơn hàng...
                    </td>
                  </tr>
                ) : currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-4 pl-6 truncate">
                        <span className="font-bold text-slate-900">#{order.orderCode}</span>
                      </td>
                      <td className="p-4 truncate">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 truncate">{order.customer}</span>
                          <span className="text-xs font-medium text-slate-500 truncate">{order.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600 truncate">
                        {order.type}
                      </td>
                      <td className="p-4 truncate">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${mapStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-500 truncate">
                        {order.date}
                        <div className="text-xs text-slate-400 font-medium">{order.time}</div>
                      </td>
                      <td className="p-4 text-sm font-bold text-slate-900 truncate">
                        {formatVnd(order.amount)}
                      </td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button 
                          onClick={() => handleViewDetail(order)}
                          disabled={isLoadingDetail}
                          className="text-blue-600 hover:bg-blue-50 transition-colors px-4 py-1.5 rounded-md text-xs font-bold border border-slate-200 hover:border-blue-200"
                        >
                          {isLoadingDetail ? 'Đang tải...' : 'Xem'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-slate-500 font-medium">
                      Không tìm thấy đơn hàng phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50/50">
              <span className="text-sm text-slate-500 font-medium">
                Hiển thị <span className="font-bold text-slate-900">{ordersPage.totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</span> đến <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, ordersPage.totalItems)}</span> trên <span className="font-bold text-slate-900">{ordersPage.totalItems}</span>
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                  <button 
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`size-8 rounded-lg font-bold text-sm transition-colors ${
                      currentPage === num 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;