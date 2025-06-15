import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CustomerForm from '../components/CustomerForm';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Mail,
  Phone,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Package,
  FileText,
  Star,
  Tag,
  MessageSquare
} from 'lucide-react';

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  firstOrderDate: string;
  status: 'active' | 'inactive';
  avatar?: string;
  tags?: string[];
  notes?: string;
  recentOrders?: Array<{
    id: string;
    eventType: string;
    eventDate: string;
    status: string;
    total: number;
  }>;
  recentQuotes?: Array<{
    id: string;
    eventType: string;
    eventDate: string;
    status: string;
    total: number;
  }>;
}

const Customers: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [expandedCustomerId, setExpandedCustomerId] = useState<string | null>(null);

  const customers: Customer[] = [
    {
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
      tags: ['VIP', 'Repeat Customer'],
      notes: 'Prefers chocolate cakes. Always orders 2 weeks in advance.',
      recentOrders: [
        { id: 'O-202501-0001', eventType: 'Wedding', eventDate: '2025-01-15', status: 'completed', total: 450.00 },
        { id: 'O-202412-0025', eventType: 'Anniversary', eventDate: '2024-06-20', status: 'completed', total: 280.00 }
      ],
      recentQuotes: [
        { id: 'Q-202501-0001', eventType: 'Birthday', eventDate: '2025-03-20', status: 'sent', total: 180.00 }
      ]
    },
    {
      id: '2',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike@email.com',
      phone: '(555) 234-5678',
      address1: '456 Oak Avenue',
      city: 'Springfield',
      state: 'IL',
      zip: '62702',
      totalOrders: 1,
      totalSpent: 120.00,
      lastOrderDate: '2024-01-16',
      firstOrderDate: '2024-01-16',
      status: 'active',
      tags: ['New Customer'],
      notes: 'First-time customer, very satisfied with service.',
      recentOrders: [
        { id: 'O-202501-0002', eventType: 'Birthday', eventDate: '2024-01-16', status: 'completed', total: 120.00 }
      ],
      recentQuotes: []
    },
    {
      id: '3',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma@email.com',
      phone: '(555) 345-6789',
      address1: '789 Pine Road',
      city: 'Springfield',
      state: 'IL',
      zip: '62703',
      totalOrders: 2,
      totalSpent: 460.00,
      lastOrderDate: '2023-12-20',
      firstOrderDate: '2021-06-10',
      status: 'active',
      tags: ['Corporate Client'],
      notes: 'Orders for company events. Prefers modern designs.',
      recentOrders: [
        { id: 'O-202312-0015', eventType: 'Corporate Event', eventDate: '2023-12-20', status: 'completed', total: 280.00 },
        { id: 'O-202106-0008', eventType: 'Corporate Event', eventDate: '2021-06-15', status: 'completed', total: 180.00 }
      ],
      recentQuotes: [
        { id: 'Q-202501-0003', eventType: 'Corporate Event', eventDate: '2025-02-14', status: 'draft', total: 320.00 }
      ]
    },
    {
      id: '4',
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james@email.com',
      phone: '(555) 456-7890',
      address1: '321 Elm Street',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
      totalOrders: 4,
      totalSpent: 720.00,
      lastOrderDate: '2024-01-10',
      firstOrderDate: '2020-08-22',
      status: 'active',
      tags: ['VIP', 'Referral Source'],
      notes: 'Long-time customer. Has referred 3 new clients.',
      recentOrders: [
        { id: 'O-202501-0003', eventType: 'Anniversary', eventDate: '2024-01-10', status: 'completed', total: 200.00 },
        { id: 'O-202312-0020', eventType: 'Birthday', eventDate: '2023-12-05', status: 'completed', total: 150.00 }
      ],
      recentQuotes: []
    },
    {
      id: '5',
      firstName: 'Lisa',
      lastName: 'Park',
      email: 'lisa@email.com',
      phone: '(555) 567-8901',
      address1: '654 Maple Drive',
      city: 'Springfield',
      state: 'IL',
      zip: '62705',
      totalOrders: 2,
      totalSpent: 380.00,
      lastOrderDate: '2023-11-15',
      firstOrderDate: '2022-11-15',
      status: 'inactive',
      tags: ['Seasonal Customer'],
      notes: 'Orders annually for holiday parties.',
      recentOrders: [
        { id: 'O-202311-0012', eventType: 'Holiday Party', eventDate: '2023-11-15', status: 'completed', total: 200.00 },
        { id: 'O-202211-0008', eventType: 'Holiday Party', eventDate: '2022-11-15', status: 'completed', total: 180.00 }
      ],
      recentQuotes: []
    },
  ];

  const calculateYearsAsCustomer = (firstOrderDate: string) => {
    const first = new Date(firstOrderDate);
    const now = new Date();
    const years = now.getFullYear() - first.getFullYear();
    const monthDiff = now.getMonth() - first.getMonth();
    
    if (years === 0) {
      return 'New';
    } else if (years === 1 && monthDiff < 0) {
      return '< 1 year';
    } else {
      return `${years} year${years > 1 ? 's' : ''}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-mint-100 text-mint-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-mint-100 text-mint-800';
      case 'in-production': return 'bg-aqua-100 text-aqua-800';
      case 'confirmed': return 'bg-coral-100 text-coral-800';
      case 'quoted': return 'bg-pink-100 text-pink-800';
      case 'sent': return 'bg-aqua-100 text-aqua-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'VIP': return 'bg-coral-100 text-coral-800';
      case 'Repeat Customer': return 'bg-mint-100 text-mint-800';
      case 'New Customer': return 'bg-aqua-100 text-aqua-800';
      case 'Corporate Client': return 'bg-pink-100 text-pink-800';
      case 'Referral Source': return 'bg-purple-100 text-purple-800';
      case 'Seasonal Customer': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCustomerClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const handlePreviewToggle = (customerId: string) => {
    setExpandedCustomerId(expandedCustomerId === customerId ? null : customerId);
  };

  const handleAddCustomer = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (customerData: CustomerFormData) => {
    console.log('Creating new customer:', customerData);
    alert(`Customer ${customerData.firstName} ${customerData.lastName} has been created successfully!`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Customers" subtitle="Manage your customer relationships and track their order history" />
      
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
                placeholder="Search customers..."
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
                <option value="all">All Customers</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleAddCustomer}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <React.Fragment key={customer.id}>
                    {/* Main Customer Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {customer.firstName} {customer.lastName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {calculateYearsAsCustomer(customer.firstOrderDate)} customer
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{customer.email}</div>
                        <div className="text-sm text-gray-500">{customer.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{customer.totalOrders}</div>
                        {customer.lastOrderDate && (
                          <div className="text-sm text-gray-500">
                            Last: {formatDate(customer.lastOrderDate)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(customer.totalSpent)}
                        </div>
                        <div className="text-sm text-gray-500">
                          Avg: {formatCurrency(customer.totalSpent / customer.totalOrders)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                        {customer.tags && customer.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {customer.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTagColor(tag)}`}>
                                {tag}
                              </span>
                            ))}
                            {customer.tags.length > 2 && (
                              <span className="text-xs text-gray-500">+{customer.tags.length - 2}</span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handlePreviewToggle(customer.id)}
                            className="text-aqua-600 hover:text-aqua-900 transition-colors"
                            title="Preview"
                          >
                            {expandedCustomerId === customer.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                          <button 
                            onClick={() => handleCustomerClick(customer.id)}
                            className="text-coral-600 hover:text-coral-900 transition-colors"
                            title="View Full Record"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 transition-colors" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Preview Row */}
                    {expandedCustomerId === customer.id && (
                      <tr>
                        <td colSpan={6} className="px-6 py-0">
                          <div className="bg-gray-50 border-l-4 border-coral-400 rounded-lg p-6 my-4">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                              {/* Contact Details */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                  <User className="h-4 w-4 mr-2 text-coral-500" />
                                  Contact Details
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                                    <a href={`mailto:${customer.email}`} className="hover:text-coral-600 transition-colors">
                                      {customer.email}
                                    </a>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                                    <a href={`tel:${customer.phone}`} className="hover:text-coral-600 transition-colors">
                                      {customer.phone}
                                    </a>
                                  </div>
                                  <div className="flex items-start text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                                    <div>
                                      {customer.address1}
                                      {customer.address2 && <><br />{customer.address2}</>}
                                      <br />
                                      {customer.city}, {customer.state} {customer.zip}
                                    </div>
                                  </div>
                                </div>

                                {/* Tags */}
                                {customer.tags && customer.tags.length > 0 && (
                                  <div className="mt-4">
                                    <h5 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                                      <Tag className="h-3 w-3 mr-1" />
                                      Tags
                                    </h5>
                                    <div className="flex flex-wrap gap-1">
                                      {customer.tags.map((tag) => (
                                        <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTagColor(tag)}`}>
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Notes */}
                                {customer.notes && (
                                  <div className="mt-4">
                                    <h5 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                                      <MessageSquare className="h-3 w-3 mr-1" />
                                      Notes
                                    </h5>
                                    <p className="text-sm text-gray-600 bg-white rounded p-2 border">
                                      {customer.notes}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Recent Orders */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                  <Package className="h-4 w-4 mr-2 text-mint-500" />
                                  Recent Orders
                                </h4>
                                {customer.recentOrders && customer.recentOrders.length > 0 ? (
                                  <div className="space-y-3">
                                    {customer.recentOrders.slice(0, 3).map((order) => (
                                      <div key={order.id} className="bg-white rounded-lg p-3 border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-900">{order.id}</span>
                                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                                            {order.status}
                                          </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          <div className="flex items-center justify-between">
                                            <span>{order.eventType}</span>
                                            <span className="font-medium">{formatCurrency(order.total)}</span>
                                          </div>
                                          <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(order.eventDate)}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 italic">No recent orders</p>
                                )}
                              </div>

                              {/* Recent Quotes */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-aqua-500" />
                                  Recent Quotes
                                </h4>
                                {customer.recentQuotes && customer.recentQuotes.length > 0 ? (
                                  <div className="space-y-3">
                                    {customer.recentQuotes.slice(0, 3).map((quote) => (
                                      <div key={quote.id} className="bg-white rounded-lg p-3 border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm font-medium text-gray-900">{quote.id}</span>
                                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(quote.status)}`}>
                                            {quote.status}
                                          </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                          <div className="flex items-center justify-between">
                                            <span>{quote.eventType}</span>
                                            <span className="font-medium">{formatCurrency(quote.total)}</span>
                                          </div>
                                          <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            {formatDate(quote.eventDate)}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 italic">No recent quotes</p>
                                )}

                                {/* View Record Button */}
                                <div className="mt-4">
                                  <button
                                    onClick={() => handleCustomerClick(customer.id)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    View Full Record
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No customers found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first customer'
              }
            </div>
          </div>
        )}
      </div>

      {/* Customer Form Modal */}
      <CustomerForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Customers;