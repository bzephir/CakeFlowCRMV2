import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CommunicationForm from '../components/CommunicationForm';
import { mockCommunications } from '../data/mockCommunications';
import { 
  CommunicationEntry, 
  CommunicationType, 
  Visibility, 
  Priority,
  CommunicationFormData,
  CommunicationFilters 
} from '../types/communication';
import { 
  Plus, 
  Search, 
  Filter, 
  MessageSquare,
  Mail,
  Phone,
const Communication: React.FC = () => {
  const navigate = useNavigate();
  const [communications, setCommunications] = useState<CommunicationEntry[]>(mockCommunications);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<CommunicationFilters>({
    type: 'all',
    module: 'all',
    priority: 'all',
    dateRange: 'all',
    showPinnedOnly: false,
    showUnreadOnly: false
  });

  const getCommunicationIcon = (type: CommunicationType) => {
    switch (type) {
      case CommunicationType.EMAIL: return <Mail className="h-4 w-4" />;
      case CommunicationType.CALL: return <Phone className="h-4 w-4" />;
      case CommunicationType.SMS: return <MessageCircle className="h-4 w-4" />;
      case CommunicationType.NOTE: return <FileText className="h-4 w-4" />;
      case CommunicationType.ANNOUNCEMENT: return <Megaphone className="h-4 w-4" />;
      case CommunicationType.ORDER_UPDATE: return <Package className="h-4 w-4" />;
      case CommunicationType.QUOTE_UPDATE: return <Receipt className="h-4 w-4" />;
      case CommunicationType.INVOICE_UPDATE: return <DollarSign className="h-4 w-4" />;
      case CommunicationType.TASK_UPDATE: return <AlertTriangle className="h-4 w-4" />;
      case CommunicationType.SYSTEM: return <Settings className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getCommunicationColor = (type: CommunicationType) => {
    switch (type) {
      case CommunicationType.EMAIL: return 'text-aqua-600 bg-aqua-50 border-aqua-200';
      case CommunicationType.CALL: return 'text-mint-600 bg-mint-50 border-mint-200';
      case CommunicationType.SMS: return 'text-pink-600 bg-pink-50 border-pink-200';
      case CommunicationType.NOTE: return 'text-gray-600 bg-gray-50 border-gray-200';
      case CommunicationType.ANNOUNCEMENT: return 'text-coral-600 bg-coral-50 border-coral-200';
      case CommunicationType.ORDER_UPDATE: return 'text-purple-600 bg-purple-50 border-purple-200';
      case CommunicationType.QUOTE_UPDATE: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case CommunicationType.INVOICE_UPDATE: return 'text-green-600 bg-green-50 border-green-200';
      case CommunicationType.TASK_UPDATE: return 'text-orange-600 bg-orange-50 border-orange-200';
      case CommunicationType.SYSTEM: return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case Priority.URGENT: return 'bg-red-100 text-red-800';
      case Priority.HIGH: return 'bg-orange-100 text-orange-800';
      case Priority.NORMAL: return 'bg-gray-100 text-gray-800';
      case Priority.LOW: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVisibilityIcon = (visibility: Visibility) => {
    switch (visibility) {
      case Visibility.STAFF_ONLY: return <EyeOff className="h-3 w-3" />;
      case Visibility.CUSTOMER_SPECIFIC: return <User className="h-3 w-3" />;
      default: return <Eye className="h-3 w-3" />;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else if (diffInHours < 168) { // Less than a week
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  const handleFormSubmit = (data: CommunicationFormData) => {
    const newEntry: CommunicationEntry = {
      id: `COMM-${Date.now()}`,
      type: data.type,
      title: data.title,
      content: data.content,
      createdAt: new Date().toISOString(),
      performedBy: 'Current User', // In real app, this would be the logged-in user
      isPinned: data.isPinned,
      visibility: data.visibility,
      priority: data.priority,
      customerId: data.customerId || undefined,
      customerName: data.customerId ? customers.find(c => c.id === data.customerId)?.name : undefined,
      orderId: data.orderId || undefined,
      quoteId: data.quoteId || undefined,
      invoiceId: data.invoiceId || undefined,
      venueId: data.venueId || undefined,
      venueName: data.venueId ? venues.find(v => v.id === data.venueId)?.name : undefined,
      followUpRequired: data.followUpRequired,
      followUpDate: data.followUpDate || undefined,
      tags: data.tags,
      isRead: false
    };

    setCommunications(prev => [newEntry, ...prev]);
    alert('Communication entry added successfully!');
  };

  const handleTogglePin = (id: string) => {
    setCommunications(prev => prev.map(comm => 
      comm.id === id ? { ...comm, isPinned: !comm.isPinned } : comm
    ));
  };

  const handleMarkAsRead = (id: string) => {
    setCommunications(prev => prev.map(comm => 
      comm.id === id ? { ...comm, isRead: true } : comm
    ));
  };

  const handleNavigateToLinkedRecord = (entry: CommunicationEntry) => {
    if (entry.customerId) {
      navigate(`/customers/${entry.customerId}`);
    } else if (entry.orderId) {
      navigate(`/orders/${entry.orderId}`);
    } else if (entry.quoteId) {
      navigate(`/quotes/${entry.quoteId}`);
    } else if (entry.invoiceId) {
      navigate(`/invoice/${entry.invoiceId}`);
    } else if (entry.venueId) {
      navigate(`/venues/${entry.venueId}`);
    }
  };

  // Mock data for filters
  const customers = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Emma Davis' },
    { id: '4', name: 'James Wilson' },
    { id: '5', name: 'Lisa Park' }
  ];

  const venues = [
    { id: 'V-001', name: 'Grand Hotel Ballroom' },
    { id: 'V-002', name: 'Riverside Gardens' },
    { id: 'V-003', name: 'Downtown Conference Center' }
  ];

  const staffMembers = [
    'Admin', 'Sarah Martinez', 'Mike Rodriguez', 'Chef Maria', 'Lisa Chen', 
    'Sales Team', 'Delivery Team', 'Accounting', 'Marketing', 'System'
  ];

  // Apply filters
  const filteredCommunications = communications.filter(comm => {
    const matchesSearch = comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (comm.customerName && comm.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (comm.tags && comm.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesType = filters.type === 'all' || comm.type === filters.type;
    const matchesPriority = filters.priority === 'all' || comm.priority === filters.priority;
    const matchesPinned = !filters.showPinnedOnly || comm.isPinned;
    const matchesUnread = !filters.showUnreadOnly || !comm.isRead;

    const matchesModule = filters.module === 'all' || 
                         (filters.module === 'orders' && comm.orderId) ||
                         (filters.module === 'quotes' && comm.quoteId) ||
                         (filters.module === 'invoices' && comm.invoiceId) ||
                         (filters.module === 'venues' && comm.venueId) ||
                         (filters.module === 'customers' && comm.customerId);

    return matchesSearch && matchesType && matchesPriority && matchesPinned && matchesUnread && matchesModule;
  });

  // Sort communications: pinned first, then by date
  const sortedCommunications = [...filteredCommunications].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const unreadCount = communications.filter(comm => !comm.isRead).length;
  const pinnedCount = communications.filter(comm => comm.isPinned).length;
  const todayCount = communications.filter(comm => {
    const today = new Date().toDateString();
    const commDate = new Date(comm.createdAt).toDateString();
    return today === commDate;
  }).length;

  return (
    <div className="p-6">
      <Header title="Communication Center" icon={MessageSquare} />
      <div className="p-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <Bell className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Unread</p>
                <p className="text-lg font-semibold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <Pin className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Pinned</p>
                <p className="text-lg font-semibold text-gray-900">{pinnedCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Today</p>
                <p className="text-lg font-semibold text-gray-900">{todayCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-lg font-semibold text-gray-900">{communications.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search communications..."
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
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Types</option>
                {Object.values(CommunicationType).map(type => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="block w-full sm:w-32 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Priority</option>
                {Object.values(Priority).map(priority => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.showPinnedOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, showPinnedOnly: e.target.checked }))}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Pinned Only</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.showUnreadOnly}
                  onChange={(e) => setFilters(prev => ({ ...prev, showUnreadOnly: e.target.checked }))}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Unread Only</span>
              </label>
            </div>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </button>
        </div>

        {/* Communication Feed */}
        <div className="space-y-4">
          {sortedCommunications.map((entry) => (
            <div
              key={entry.id}
              className={`bg-white shadow-sm rounded-lg border transition-all hover:shadow-md ${
                entry.isPinned ? 'border-coral-300 bg-coral-50' : 'border-gray-200'
              } ${!entry.isRead ? 'ring-2 ring-aqua-200' : ''}`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Communication Type Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getCommunicationColor(entry.type)}`}>
                      {getCommunicationIcon(entry.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{entry.title}</h3>
                        
                        {entry.isPinned && (
                          <Pin className="h-4 w-4 text-coral-500" />
                        )}
                        
                        {!entry.isRead && (
                          <div className="w-2 h-2 bg-aqua-500 rounded-full"></div>
                        )}
                        
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(entry.priority)}`}>
                          {entry.priority}
                        </span>
                        
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700`}>
                          {getVisibilityIcon(entry.visibility)}
                          <span className="ml-1">
                            {entry.visibility === Visibility.STAFF_ONLY ? 'Staff Only' :
                             entry.visibility === Visibility.CUSTOMER_SPECIFIC ? 'Customer' : 'All'}
                          </span>
                        </span>
                      </div>

                      {/* Content */}
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{entry.content}</p>

                      {/* Metadata */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDateTime(entry.createdAt)}
                        </div>
                        
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {entry.performedBy}
                        </div>
                        
                        {entry.callDuration && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {entry.callDuration} min
                          </div>
                        )}
                        
                        {entry.followUpRequired && entry.followUpDate && (
                          <div className="flex items-center text-orange-600">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Follow-up: {new Date(entry.followUpDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>

                      {/* Linked Records */}
                      {(entry.customerName || entry.orderId || entry.quoteId || entry.invoiceId || entry.venueName) && (
                        <div className="flex items-center space-x-4 mt-3">
                          {entry.customerName && (
                            <button
                              onClick={() => navigate(`/customers/${entry.customerId}`)}
                              className="inline-flex items-center text-xs text-coral-600 hover:text-coral-700 transition-colors"
                            >
                              <User className="h-3 w-3 mr-1" />
                              {entry.customerName}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </button>
                          )}
                          
                          {entry.orderId && (
                            <button
                              onClick={() => navigate(`/orders/${entry.orderId}`)}
                              className="inline-flex items-center text-xs text-aqua-600 hover:text-aqua-700 transition-colors"
                            >
                              <Package className="h-3 w-3 mr-1" />
                              {entry.orderId}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </button>
                          )}
                          
                          {entry.quoteId && (
                            <button
                              onClick={() => navigate(`/quotes/${entry.quoteId}`)}
                              className="inline-flex items-center text-xs text-mint-600 hover:text-mint-700 transition-colors"
                            >
                              <Receipt className="h-3 w-3 mr-1" />
                              {entry.quoteId}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </button>
                          )}
                          
                          {entry.invoiceId && (
                            <button
                              onClick={() => navigate(`/invoice/${entry.invoiceId}`)}
                              className="inline-flex items-center text-xs text-pink-600 hover:text-pink-700 transition-colors"
                            >
                              <DollarSign className="h-3 w-3 mr-1" />
                              {entry.invoiceId}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </button>
                          )}
                          
                          {entry.venueName && (
                            <button
                              onClick={() => navigate(`/venues/${entry.venueId}`)}
                              className="inline-flex items-center text-xs text-purple-600 hover:text-purple-700 transition-colors"
                            >
                              <Building2 className="h-3 w-3 mr-1" />
                              {entry.venueName}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {entry.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleTogglePin(entry.id)}
                      className={`p-2 rounded-md transition-colors ${
                        entry.isPinned 
                          ? 'text-coral-600 bg-coral-100 hover:bg-coral-200' 
                          : 'text-gray-400 hover:text-coral-600 hover:bg-coral-50'
                      }`}
                      title={entry.isPinned ? 'Unpin' : 'Pin'}
                    >
                      <Pin className="h-4 w-4" />
                    </button>
                    
                    {!entry.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(entry.id)}
                        className="p-2 text-gray-400 hover:text-aqua-600 hover:bg-aqua-50 rounded-md transition-colors"
                        title="Mark as Read"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    )}
                    
                    {(entry.customerName || entry.orderId || entry.quoteId || entry.invoiceId || entry.venueName) && (
                      <button
                        onClick={() => handleNavigateToLinkedRecord(entry)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                        title="View Linked Record"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedCommunications.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">No communications found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || Object.values(filters).some(f => f !== 'all' && f !== false)
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first communication entry'
              }
            </div>
          </div>
        )}
      </div>

      {/* Communication Form Modal */}
      <CommunicationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Communication;