import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Calendar,
  DollarSign,
  Trash2,
  Mail,
  Copy,
  ArrowRightCircle
} from 'lucide-react';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock orders with new numbering format
  const orders = [
    {
      id: 'O-202501-0001',
      customer: 'Sarah Johnson',
      email: 'sarah@email.com',
      eventType: 'Wedding',
      eventDate: '2025-01-15',
      eventTime: '1:45 PM',
      status: 'in-production',
      total: 450.00,
      deposited: 225.00,
      balance: 225.00,
      items: ['3-Tier Wedding Cake', 'Cake Toppers'],
      createdAt: '2025-01-01'
    },
    {
      id: 'O-202501-0002',
      customer: 'Mike Chen',
      email: 'mike@email.com',
      eventType: 'Birthday',
      eventDate: '2025-01-16',
      eventTime: '7:300 PM',
      status: 'confirmed',
      total: 120.00,
      deposited: 60.00,
      balance: 60.00,
      items: ['Custom Birthday Cake'],
      createdAt: '2025-01-05'
    },
    {
      id: 'O-202501-0003',
      customer: 'Emma Davis',
      email: 'emma@email.com',
      eventType: 'Corporate Event',
      eventDate: '2025-01-18',
      eventTime: '4:00 PM',
      status: 'quoted',
      total: 280.00,
      deposited: 0.00,
      balance: 280.00,
      items: ['Corporate Cupcakes (48)', 'Branded Toppers'],
      createdAt: '2025-01-10'
    },
    {
      id: 'O-202412-0025',
      customer: 'James Wilson',
      email: 'james@email.com',
      eventType: 'Anniversary',
      eventDate: '2025-03-08',
      eventTime: '8:00 PM',
      status: 'inquiry',
      total: 180.00,
      deposited: 0.00,
      balance: 180.00,
      items: ['Anniversary Cake'],
      createdAt: '2024-12-12'
    },
    {
      id: 'O-202412-0026',
      customer: 'Lisa Park',
      email: 'lisa@email.com',
      eventType: 'Baby Shower',
      eventDate: '2025-01-14',
      eventTime: '11:00 AM',
      status: 'completed',
      total: 200.00,
      deposited: 200.00,
      balance: 0.00,
      items: ['Baby Shower Cake', 'Mini Cupcakes (24)'],
      createdAt: '2024-11-28'
    },
    {
      id: 'O-202412-0027',
      customer: 'Robert Smith',
      email: 'robert@email.com',
      eventType: 'Graduation',
      eventDate: '2025-02-05',
      eventTime: '2:00 PM',
      status: 'confirmed',
      total: 150.00,
      deposited: 75.00,
      balance: 75.00,
      items: ['Graduation Cake', 'Cookies (12)'],
      createdAt: '2024-12-10'
    },
    {
      id: 'O-202412-0028',
      customer: 'Jennifer Brown',
      email: 'jennifer@email.com',
      eventType: 'Birthday',
      eventDate: '2025-01-30',
      eventTime: '12:30 PM',
      status: 'in-production',
      total: 95.00,
      deposited: 95.00,
      balance: 0.00,
      items: ['Custom Birthday Cake'],
      createdAt: '2024-12-05'
    },
    {
      id: 'O-202411-0015',
      customer: 'Michael Taylor',
      email: 'michael@email.com',
      eventType: 'Corporate Event',
      eventDate: '2024-12-15',
      eventTime: '4:00 PM',
      status: 'completed',
      total: 350.00,
      deposited: 350.00,
      balance: 0.00,
      items: ['Corporate Cupcakes (72)', 'Logo Cookies (24)'],
      createdAt: '2024-11-20'
    },
    {
      id: 'O-202411-0016',
      customer: 'Jessica Lee',
      email: 'jessica@email.com',
      eventType: 'Wedding',
      eventDate: '2025-03-10',
      eventTime: '3:30 PM',
      status: 'confirmed',
      total: 550.00,
      deposited: 275.00,
      balance: 275.00,
      items: ['3-Tier Wedding Cake', 'Dessert Table'],
      createdAt: '2024-11-15'
    },
    {
      id: 'O-202411-0017',
      customer: 'Daniel Garcia',
      email: 'daniel@email.com',
      eventType: 'Anniversary',
      eventDate: '2025-02-20',
      eventTime: '10:00 AM',
      status: 'quoted',
      total: 175.00,
      deposited: 0.00,
      balance: 175.00,
      items: ['Anniversary Cake'],
      createdAt: '2024-11-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-mint-100 text-mint-800';
      case 'in-production': return 'bg-aqua-100 text-aqua-800';
      case 'confirmed': return 'bg-coral-100 text-coral-800';
      case 'quoted': return 'bg-pink-100 text-pink-800';
      case 'inquiry': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'in-production': return <Clock className="h-4 w-4 mr-1" />;
      case 'confirmed': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'quoted': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'inquiry': return <AlertCircle className="h-4 w-4 mr-1" />;
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };
  const handleViewOrder = (orderId: string) => {
    // Navigate to order details page
    console.log('View order:', orderId);
    // navigate(`/orders/${orderId}`);
  };

  const handleCreateOrder = () => {
    // Generate new order number and navigate to create order page
    const newOrderNumber = generateDocumentNumber('order');
    console.log('Creating new order with number:', newOrderNumber);
    navigate('/orders/new', { state: { orderNumber: newOrderNumber } });
  };

  const handleEditOrder = (orderId: string) => {
    // Navigate to order edit page
    console.log('Edit order:', orderId);
    // navigate(`/orders/${orderId}/edit`);
  };

  const handleSendInvoice = (orderId: string) => {
    // Send invoice email
    console.log('Send invoice for order:', orderId);
    alert(`Create and send invoice for order ${orderId}`);
  };

  const handleDuplicateOrder = (orderId: string) => {
    // Duplicate order with new order number
    const newOrderNumber = generateDocumentNumber('order');
    console.log('Duplicating order with new number:', newOrderNumber);
    alert(`Duplicate order ${orderId} as ${newOrderNumber}`);
  };

  const handleDeleteOrder = (orderId: string) => {
    // Delete order
    console.log('Delete order:', orderId);
    alert(`Delete order ${orderId}`);
  };

  const handleBulkAction = (action: 'send' | 'delete') => {
    if (selectedOrders.length === 0) {
      alert('Please select at least one order');
      return;
    }

    if (action === 'send') {
      alert(`Send invoices for ${selectedOrders.length} orders`);
    } else if (action === 'delete') {
      alert(`Delete ${selectedOrders.length} orders`);
    }
  };

  const toggleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Orders" />
      
      <div className="p-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="inquiry">Inquiry</option>
                <option value="quoted">Quoted</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-production">In Production</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleCreateOrder}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {selectedOrders.length} selected
            </span>
            <button 
              onClick={() => handleBulkAction('send')}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <Mail className="h-3 w-3 mr-1" />
              Send Invoice
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </button>
          </div>
        )}

        {/* Orders Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-1 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                      />
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order #
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Date
                  </th>
                   <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Time
                  </th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => toggleSelectOrder(order.id)}
                          className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-coral-600" onClick={() => handleViewOrder(order.id)}>
                        {order.id}
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.eventType}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(order.eventDate)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-xs text-gray-900">{order.eventTime ? formatTime(order.eventTime) : ''}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(order.total)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleViewOrder(order.id)}
                          className="text-aqua-600 hover:text-aqua-900 transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditOrder(order.id)}
                          className="text-coral-600 hover:text-coral-900 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleSendInvoice(order.id)}
                          className="text-mint-600 hover:text-mint-900 transition-colors"
                          title="Create Invoice"
                        >
                          <ArrowRightCircle className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDuplicateOrder(order.id)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-pink-600 hover:text-pink-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No orders found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first order'
              }
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    currentPage === number
                      ? 'bg-coral-100 border-coral-500 text-coral-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;