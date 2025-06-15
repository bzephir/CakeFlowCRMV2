import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { generateDocumentNumber } from '../utils/documentNumbering';
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
  DollarSign
} from 'lucide-react';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock orders with new numbering format
  const orders = [
    {
      id: 'O-202501-0001',
      customer: 'Sarah Johnson',
      email: 'sarah@email.com',
      eventType: 'Wedding',
      eventDate: '2025-01-15',
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
      eventDate: '2025-01-20',
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
      status: 'completed',
      total: 200.00,
      deposited: 200.00,
      balance: 0.00,
      items: ['Baby Shower Cake', 'Mini Cupcakes (24)'],
      createdAt: '2024-11-28'
    },
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
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'in-production': return <Clock className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle2 className="h-4 w-4" />;
      case 'quoted': return <AlertCircle className="h-4 w-4" />;
      case 'inquiry': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleCreateOrder = () => {
    // Generate new order number and navigate to create order page
    const newOrderNumber = generateDocumentNumber('order');
    console.log('Creating new order with number:', newOrderNumber);
    navigate('/orders/new', { state: { orderNumber: newOrderNumber } });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Orders" subtitle="Manage all your cake orders and track their progress" />
      
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

        {/* Orders Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Financial
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-900 font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          Created: {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {new Date(order.eventDate).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{order.eventType}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {order.items.join(', ')}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status.replace('-', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center text-sm text-gray-900">
                          <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                          ${order.total.toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Paid: ${order.deposited.toFixed(2)}
                        </div>
                        {order.balance > 0 && (
                          <div className="text-xs text-coral-600">
                            Balance: ${order.balance.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-aqua-600 hover:text-aqua-900 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-coral-600 hover:text-coral-900 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default Orders;