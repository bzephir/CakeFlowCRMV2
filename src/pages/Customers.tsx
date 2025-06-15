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
  Clock
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

const Customers: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const customers = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      totalOrders: 3,
      totalSpent: 850.00,
      lastOrderDate: '2024-01-15',
      firstOrderDate: '2022-03-15',
      status: 'active',
      avatar: null
    },
    {
      id: '2',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike@email.com',
      phone: '(555) 234-5678',
      totalOrders: 1,
      totalSpent: 120.00,
      lastOrderDate: '2024-01-16',
      firstOrderDate: '2024-01-16',
      status: 'active',
      avatar: null
    },
    {
      id: '3',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma@email.com',
      phone: '(555) 345-6789',
      totalOrders: 2,
      totalSpent: 460.00,
      lastOrderDate: '2023-12-20',
      firstOrderDate: '2021-06-10',
      status: 'active',
      avatar: null
    },
    {
      id: '4',
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james@email.com',
      phone: '(555) 456-7890',
      totalOrders: 4,
      totalSpent: 720.00,
      lastOrderDate: '2024-01-10',
      firstOrderDate: '2020-08-22',
      status: 'active',
      avatar: null
    },
    {
      id: '5',
      firstName: 'Lisa',
      lastName: 'Park',
      email: 'lisa@email.com',
      phone: '(555) 567-8901',
      totalOrders: 2,
      totalSpent: 380.00,
      lastOrderDate: '2023-11-15',
      firstOrderDate: '2022-11-15',
      status: 'inactive',
      avatar: null
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

  const handleCustomerClick = (customerId: string) => {
    navigate(`/customers/${customerId}`);
  };

  const handleAddCustomer = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (customerData: CustomerFormData) => {
    // In a real app, this would make an API call to create the customer
    console.log('Creating new customer:', customerData);
    
    // For demo purposes, you could add the customer to the local state
    // In production, you'd refresh the customer list from the API
    alert(`Customer ${customerData.firstName} ${customerData.lastName} has been created successfully!`);
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

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div 
              key={customer.id} 
              onClick={() => handleCustomerClick(customer.id)}
              className="bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-all cursor-pointer hover:border-coral-200 overflow-hidden"
            >
              <div className="p-6">
                {/* Customer Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {customer.firstName} {customer.lastName}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                          {customer.status}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {calculateYearsAsCustomer(customer.firstOrderDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {customer.phone}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-semibold text-gray-900">{customer.totalOrders}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Orders</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-semibold text-gray-900">${customer.totalSpent.toFixed(0)}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Spent</div>
                  </div>
                </div>

                {/* Last Order */}
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  Last order: {new Date(customer.lastOrderDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
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