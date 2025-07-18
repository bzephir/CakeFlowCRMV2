import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInquiryContext } from '../context/InquiryContext';
import Header from '../components/Header';
import { formatDate, formatTime } from '../utils/formatters';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageSquare,
  ArrowRight,
  CheckSquare,
  AlertCircle,
  User,
  Building2,
  Cake
} from 'lucide-react';

const Inquiries: React.FC = () => {
  const navigate = useNavigate();
  const { inquiries, markAsOpened } = useInquiryContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-coral-100 text-coral-800';
      case 'opened': return 'bg-aqua-100 text-aqua-800';
      case 'contacted': return 'bg-mint-100 text-mint-800';
      case 'quoted': return 'bg-pink-100 text-pink-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'declined': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'wedding': return <Cake className="h-4 w-4 text-coral-500" />;
      case 'celebration': return <Cake className="h-4 w-4 text-mint-500" />;
      case 'corporate': return <Building2 className="h-4 w-4 text-aqua-500" />;
      default: return <Cake className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleViewInquiry = (inquiryId: string) => {
    markAsOpened(inquiryId);
    navigate(`/inquiries/${inquiryId}`);
  };

  const handleCreateInquiry = () => {
    navigate('/inquiry-form');
  };

  // Filter inquiries based on search term, status, and type
  const filteredInquiries = inquiries.filter(inquiry => {
    const fullName = `${inquiry.firstName} ${inquiry.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.phone.includes(searchTerm) ||
                         inquiry.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const matchesType = typeFilter === 'all' || inquiry.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort inquiries by submission date (newest first)
  const sortedInquiries = [...filteredInquiries].sort((a, b) => 
    new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Inquiries" />
      
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
                placeholder="Search inquiries..."
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
                <option value="new">New</option>
                <option value="opened">Opened</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="converted">Converted</option>
                <option value="declined">Declined</option>
              </select>
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Cake className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value="wedding">Wedding</option>
                <option value="celebration">Celebration</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleCreateInquiry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Inquiry
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">New Inquiries</p>
                <p className="text-lg font-semibold text-gray-900">
                  {inquiries.filter(i => i.status === 'new').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-lg font-semibold text-gray-900">
                  {inquiries.filter(i => i.status === 'opened' || i.status === 'contacted').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <CheckSquare className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Converted</p>
                <p className="text-lg font-semibold text-gray-900">
                  {inquiries.filter(i => i.status === 'converted').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-lg font-semibold text-gray-900">
                  {inquiries.filter(i => {
                    const date = new Date(i.submittedAt);
                    const now = new Date();
                    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inquiry
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
                     Fulfillment
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                   <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned
                  </th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className={`hover:bg-gray-50 transition-colors ${inquiry.status === 'new' ? 'bg-coral-50' : ''}`}>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getTypeIcon(inquiry.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{inquiry.id}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                          
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {inquiry.firstName} {inquiry.lastName}
                          </div>
                          <div className="flex flex-col text-xs text-gray-500">
                            <span className="flex items-center">
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize"> {inquiry.type} </div>
                      <div className="text-sm text-gray-500">
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize" > {formatDate(inquiry.eventDate)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {inquiry.fulfillmentType === 'pickup' 
                          ? `Pickup: ${inquiry.pickupTime ? formatTime(inquiry.pickupTime) : 'TBD'}`
                          : `Delivery: ${inquiry.deliveryTime ? formatTime(inquiry.deliveryTime) : 'TBD'}`
                        }
                       
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                       </td>
                     <td> <div className="text-xs text-gray-500 mt-1">
                        {inquiry.assignedTo ? `${inquiry.assignedTo}` : 'Unassigned'}
                      </div></td>
                     
                   
                    <td className="px-2 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleViewInquiry(inquiry.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                   
                      View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredInquiries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No inquiries found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first inquiry'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inquiries;