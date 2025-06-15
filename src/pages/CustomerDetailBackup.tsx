import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { 
  ArrowLeft,
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Plus,
  Eye,
  Clock,
  Package,
  ShoppingBag
} from 'lucide-react';

const CustomerDetailBackup: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'orders' | 'dates'>('details');

  // Mock customer data - in real app, fetch based on ID
  const customer = {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@email.com',
    phone: '(555) 123-4567',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    totalOrders: 3,
    totalSpent: 850.00,
    lastOrderDate: '2024-01-15',
    firstOrderDate: '2022-03-15',
    status: 'active',
    avatar: null
  };

  const orders = [
    {
      id: '1001',
      eventType: 'Wedding',
      eventDate: '2024-01-15',
      status: 'completed',
      total: 450.00,
      items: ['3-Tier Wedding Cake', 'Cake Toppers'],
      createdAt: '2023-12-01'
    },
    {
      id: '1005',
      eventType: 'Anniversary',
      eventDate: '2023-06-20',
      status: 'completed',
      total: 280.00,
      items: ['Anniversary Cake', 'Custom Decorations'],
      createdAt: '2023-05-15'
    },
    {
      id: '1008',
      eventType: 'Birthday',
      eventDate: '2022-03-15',
      status: 'completed',
      total: 120.00,
      items: ['Custom Birthday Cake'],
      createdAt: '2022-02-28'
    }
  ];

  const specialDates = [
    {
      id: '1',
      date: '2024-03-15',
      type: 'Birthday',
      note: 'Sarah\'s birthday - prefers chocolate cake'
    },
    {
      id: '2',
      date: '2024-06-20',
      type: 'Anniversary',
      note: '5th wedding anniversary'
    }
  ];

  const calculateYearsAsCustomer = (firstOrderDate: string) => {
    const first = new Date(firstOrderDate);
    const now = new Date();
    const years = now.getFullYear() - first.getFullYear();
    const monthDiff = now.getMonth() - first.getMonth();
    
    if (years === 0) {
      return 'New customer';
    } else if (years === 1 && monthDiff < 0) {
      return 'Less than 1 year';
    } else {
      return `${years} year${years > 1 ? 's' : ''} as customer`;
    }
  };

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

  const getCustomerStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-mint-100 text-mint-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewOrder = () => {
    // Navigate to order form with customer pre-selected
    navigate('/orders/new', { state: { customerId: customer.id, customerName: `${customer.firstName} ${customer.lastName}` } });
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title={`${customer.firstName} ${customer.lastName}`} 
        subtitle="Customer details and order history" 
      />
      
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/customers')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </button>

        {/* Customer Header Card */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCustomerStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {calculateYearsAsCustomer(customer.firstOrderDate)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={handleNewOrder}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  New Order
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Customer
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-900">{customer.totalOrders}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-900">${customer.totalSpent.toFixed(0)}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-gray-900">
                  ${(customer.totalSpent / customer.totalOrders).toFixed(0)}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Avg Order Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'details', name: 'Contact Details', icon: User },
                { id: 'orders', name: 'Order History', icon: Package },
                { id: 'dates', name: 'Special Dates', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-coral-500 text-coral-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="text-sm text-gray-900">{customer.firstName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="text-sm text-gray-900">{customer.lastName}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center text-sm text-gray-900">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {customer.phone}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
                    <div className="text-sm text-gray-900">{customer.address1}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
                    <div className="text-sm text-gray-900">{customer.address2 || '—'}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <div className="text-sm text-gray-900">{customer.city}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <div className="text-sm text-gray-900">{customer.state}</div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <div className="text-sm text-gray-900">{customer.zip}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {orders.length} order{orders.length !== 1 ? 's' : ''} total
                  </span>
                  <button 
                    onClick={handleNewOrder}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Order
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-sm font-semibold text-gray-900">Order #{order.id}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            Event: {new Date(order.eventDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-2 text-gray-400" />
                            {order.eventType}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            ${order.total.toFixed(2)}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Items: {order.items.join(', ')}
                        </div>
                        <div className="mt-1 text-xs text-gray-400">
                          Ordered: {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Special Dates</h3>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Date
                </button>
              </div>
              <div className="space-y-4">
                {specialDates.map((date) => (
                  <div key={date.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Calendar className="h-5 w-5 text-coral-500" />
                          <h4 className="text-sm font-semibold text-gray-900">{date.type}</h4>
                          <span className="text-sm text-gray-500">
                            {new Date(date.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 ml-8">{date.note}</p>
                      </div>
                      <button className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {specialDates.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No special dates recorded</p>
                    <p className="text-sm text-gray-400 mt-1">Add important dates to remember for this customer</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetailBackup;