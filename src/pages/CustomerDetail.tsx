import React, { useState, useEffect } from 'react';
import { Customer } from '../types';
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
  ShoppingBag,
  FileText,
  MessageSquare,
  Paperclip,
  Star,
  CheckCircle2,
  AlertCircle,
  Download,
  Send,
  Archive,
  MoreHorizontal,
  Filter,
  Search
} from 'lucide-react';

const CustomerDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'quotes' | 'invoices' | 'communications' | 'files'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  useEffect(() => {
  // Simulate fetching data
  const foundCustomer = mockCustomers.find(cust => cust.id === id);
  if (foundCustomer) {
    setCurrentCustomer(foundCustomer);
  } else {
    // If customer not found, navigate back to customers list
    navigate('/customers');
  }
}, [id, navigate]); // Depend on id and navigate to re-run if they change

  // Mock customer data - in real app, fetch based on ID
  const mockCustomer: Customer = {
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
    avatar: null,
    notes: 'Prefers chocolate cakes. Always orders 2 weeks in advance. Very detail-oriented about decorations.',
    tags: ['VIP', 'Repeat Customer', 'Referral Source'],
    birthday: '1990-05-20', // Example birthday
    anniversary: '2015-08-10' // Example anniversary
  };
  {
    id: '2',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike@email.com',
    phone: '(555) 234-5678',
    address1: '456 Oak Ave',
    city: 'Springfield',
    state: 'IL',
    zip: '62702',
    totalOrders: 1,
    totalSpent: 120.00,
    lastOrderDate: '2024-01-16',
    firstOrderDate: '2024-01-16',
    status: 'active',
    avatar: null,
    notes: 'New customer, interested in custom designs.',
    tags: ['New Customer'],
    birthday: '1985-11-12',
    anniversary: '2020-03-01'
  }
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

  const quotes = [
    {
      id: '2024-001',
      eventType: 'Wedding',
      eventDate: '2024-06-15',
      status: 'accepted',
      total: 642.00,
      createdAt: '2024-01-15',
      expiryDate: '2024-02-15'
    },
    {
      id: '2024-002',
      eventType: 'Birthday',
      eventDate: '2024-03-20',
      status: 'sent',
      total: 180.00,
      createdAt: '2024-01-10',
      expiryDate: '2024-02-10'
    }
  ];

  const invoices = [
    {
      id: '1396',
      eventDate: '2024-06-15',
      status: 'deposit-paid',
      total: 642.00,
      balance: 342.00,
      issueDate: '2024-01-15',
      dueDate: '2024-06-01'
    },
    {
      id: '1395',
      eventDate: '2024-01-15',
      status: 'paid',
      total: 450.00,
      balance: 0.00,
      issueDate: '2024-01-10',
      dueDate: '2024-01-25'
    }
  ];

  const communications = [
    {
      id: '1',
      type: 'email',
      subject: 'Wedding Cake Consultation Follow-up',
      date: '2024-01-15',
      status: 'sent',
      preview: 'Thank you for meeting with us today to discuss your wedding cake...'
    },
    {
      id: '2',
      type: 'phone',
      subject: 'Phone consultation - Wedding details',
      date: '2024-01-10',
      status: 'completed',
      preview: 'Discussed cake flavors, design preferences, and delivery logistics...'
    },
    {
      id: '3',
      type: 'email',
      subject: 'Quote for Wedding Cake Services',
      date: '2024-01-08',
      status: 'sent',
      preview: 'Please find attached your custom quote for wedding cake services...'
    }
  ];

  const files = [
    {
      id: '1',
      name: 'Wedding Inspiration Photos.zip',
      type: 'images',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      uploadedBy: 'Sarah Johnson'
    },
    {
      id: '2',
      name: 'Wedding Contract - Signed.pdf',
      type: 'document',
      size: '156 KB',
      uploadDate: '2024-01-12',
      uploadedBy: 'Admin'
    },
    {
      id: '3',
      name: 'Venue Layout Diagram.pdf',
      type: 'document',
      size: '89 KB',
      uploadDate: '2024-01-10',
      uploadedBy: 'Sarah Johnson'
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Wedding Cake Delivery',
      date: '2024-06-15',
      time: '10:00 AM',
      type: 'delivery',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Final Cake Tasting',
      date: '2024-05-15',
      time: '2:00 PM',
      type: 'appointment',
      status: 'scheduled'
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
      case 'accepted': return 'bg-mint-100 text-mint-800';
      case 'sent': return 'bg-aqua-100 text-aqua-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-pink-100 text-pink-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'paid': return 'bg-mint-100 text-mint-800';
      case 'deposit-paid': return 'bg-coral-100 text-coral-800';
      case 'pending': return 'bg-aqua-100 text-aqua-800';
      case 'overdue': return 'bg-pink-100 text-pink-800';
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

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VIP': return 'bg-coral-100 text-coral-800';
      case 'Repeat Customer': return 'bg-mint-100 text-mint-800';
      case 'Referral Source': return 'bg-aqua-100 text-aqua-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewOrder = () => {
    navigate('/orders/new', { state: { customerId: customer.id, customerName: `${customer.firstName} ${customer.lastName}` } });
  };

  const handleNewQuote = () => {
    navigate('/quotes/new', { state: { customerId: customer.id, customerName: `${customer.firstName} ${customer.lastName}` } });
  };

  const handleNewInvoice = () => {
    navigate('/invoice/new', { state: { customerId: customer.id, customerName: `${customer.firstName} ${customer.lastName}` } });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
// Add the following check above it:
  if (!currentCustomer) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Loading customer details...
      </div>
    );
  }
  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title={`${customer.firstName} ${customer.lastName}`} 
        subtitle="Customer project overview and management" 
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
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.phone}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {customer.address1}
                      </div>
                      <div className="text-sm text-gray-600 ml-6">
                        {customer.city}, {customer.state} {customer.zip}
                      </div>
                    </div>
                  </div>

                  {/* Status and Tags */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCustomerStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {calculateYearsAsCustomer(customer.firstOrderDate)}
                    </span>
                    {customer.tags.map((tag) => (
                      <span key={tag} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Customer Notes */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-700">{customer.notes}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={handleNewOrder}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  New Order
                </button>
                <button 
                  onClick={handleNewQuote}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  New Quote
                </button>
                <button 
                  onClick={handleNewInvoice}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-mint-400 to-mint-500 hover:from-mint-500 hover:to-mint-600 transition-all"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  New Invoice
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Customer
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">{customer.totalOrders}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">${customer.totalSpent.toFixed(0)}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  ${(customer.totalSpent / customer.totalOrders).toFixed(0)}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Avg Order Value</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">{quotes.length}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">Active Quotes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: Eye },
                { id: 'orders', name: 'Orders', icon: Package, count: orders.length },
                { id: 'quotes', name: 'Quotes', icon: FileText, count: quotes.length },
                { id: 'invoices', name: 'Invoices', icon: DollarSign, count: invoices.length },
                { id: 'communications', name: 'Communications', icon: MessageSquare, count: communications.length },
                { id: 'files', name: 'Files', icon: Paperclip, count: files.length }
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
                  {tab.count !== undefined && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-coral-500" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-500">
                            {formatDate(event.date)} at {event.time}
                          </div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-mint-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Invoice #1396 payment received</div>
                      <div className="text-sm text-gray-500">2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-aqua-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Quote #2024-002 sent to customer</div>
                      <div className="text-sm text-gray-500">5 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-coral-400 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">New order #1001 created</div>
                      <div className="text-sm text-gray-500">1 week ago</div>
                    </div>
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
                <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
                <button 
                  onClick={handleNewOrder}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Order
                </button>
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
                            Event: {formatDate(order.eventDate)}
                          </div>
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-2 text-gray-400" />
                            {order.eventType}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            {formatCurrency(order.total)}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Items: {order.items.join(', ')}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Quotes</h3>
                <button 
                  onClick={handleNewQuote}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Quote
                </button>
              </div>
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-sm font-semibold text-gray-900">Quote #{quote.id}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                            {quote.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            Event: {formatDate(quote.eventDate)}
                          </div>
                          <div className="flex items-center">
                            <Package className="h-4 w-4 mr-2 text-gray-400" />
                            {quote.eventType}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            {formatCurrency(quote.total)}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          Expires: {formatDate(quote.expiryDate)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Send className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
                <button 
                  onClick={handleNewInvoice}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </button>
              </div>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-sm font-semibold text-gray-900">Invoice #{invoice.id}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                            {invoice.status === 'deposit-paid' ? 'Deposit Paid' : invoice.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            Due: {formatDate(invoice.dueDate)}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            Total: {formatCurrency(invoice.total)}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            Balance: {formatCurrency(invoice.balance)}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            Event: {formatDate(invoice.eventDate)}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Send className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communications' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Communications</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all">
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </button>
              </div>
              <div className="space-y-4">
                {communications.map((comm) => (
                  <div key={comm.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <MessageSquare className="h-4 w-4 text-gray-400" />
                          <h4 className="text-sm font-semibold text-gray-900">{comm.subject}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comm.status)}`}>
                            {comm.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{comm.preview}</p>
                        <div className="text-xs text-gray-500">
                          {formatDate(comm.date)}
                        </div>
                      </div>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'files' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Files</h3>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload File
                </button>
              </div>
              <div className="space-y-4">
                {files.map((file) => (
                  <div key={file.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Paperclip className="h-5 w-5 text-gray-400" />
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900">{file.name}</h4>
                          <div className="text-sm text-gray-500">
                            {file.size} • Uploaded by {file.uploadedBy} on {formatDate(file.uploadDate)}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;