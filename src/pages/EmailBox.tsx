import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import EmailForm from '../components/EmailForm';
import { mockEmails } from '../data/mockEmails';
import { 
  Email, 
  EmailStatus, 
  EmailPriority, 
  EmailFolder,
  EmailFormData,
  EmailFilters 
} from '../types/email';
import { 
  Plus, 
  Search,
  Mail,
  Send,
  Archive,
  Trash2,
  Star,
  Reply,
  Forward,
  Clock,
  User,
  CheckCircle2,
  ChevronDown,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  ArrowLeft
} from 'lucide-react';

const EmailBox: React.FC = () => {
  const navigate = useNavigate();
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [replyToEmail, setReplyToEmail] = useState<Email | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFolder, setCurrentFolder] = useState<EmailFolder>(EmailFolder.INBOX);
  const [expandedEmailId, setExpandedEmailId] = useState<string | null>(null);
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false);
  const [filters, setFilters] = useState<EmailFilters>({
    folder: EmailFolder.INBOX,
    status: 'all',
    priority: 'all',
    dateRange: 'all',
    showStarredOnly: false,
    showUnreadOnly: false,
    customerId: 'all'
  });

  const folders = [
    { id: EmailFolder.INBOX, name: 'Inbox', icon: Mail, count: emails.filter(e => e.folder === EmailFolder.INBOX).length },
    { id: EmailFolder.SENT, name: 'Sent', icon: Send, count: emails.filter(e => e.folder === EmailFolder.SENT).length },
    { id: EmailFolder.DRAFTS, name: 'Drafts', icon: Archive, count: emails.filter(e => e.folder === EmailFolder.DRAFTS).length },
    { id: EmailFolder.ARCHIVED, name: 'Archived', icon: Archive, count: emails.filter(e => e.folder === EmailFolder.ARCHIVED).length },
    { id: EmailFolder.TRASH, name: 'Trash', icon: Trash2, count: emails.filter(e => e.folder === EmailFolder.TRASH).length }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const handleComposeEmail = () => {
    setReplyToEmail(null);
    setIsComposeOpen(true);
  };

  const handleReplyEmail = (email: Email) => {
    setReplyToEmail(email);
    setIsComposeOpen(true);
  };

  const handleEmailSubmit = (data: EmailFormData) => {
    const newEmail: Email = {
      id: `EMAIL-${Date.now()}`,
      subject: data.subject,
      content: data.content,
      fromEmail: 'admin@sweetdelights.com',
      fromName: 'Sweet Delights Bakery',
      toEmail: data.to,
      toName: data.to, // In real app, would resolve name from email
      ccEmails: data.cc ? [data.cc] : undefined,
      bccEmails: data.bcc ? [data.bcc] : undefined,
      status: EmailStatus.SENT,
      priority: data.priority,
      folder: EmailFolder.SENT,
      isRead: true,
      isStarred: false,
      sentAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerId: data.customerId || undefined,
      customerName: data.customerId ? customers.find(c => c.id === data.customerId)?.name : undefined,
      orderId: data.orderId || undefined,
      quoteId: data.quoteId || undefined,
      invoiceId: data.invoiceId || undefined,
      templateId: data.templateId || undefined,
      inReplyTo: replyToEmail?.id
    };

    setEmails(prev => [newEmail, ...prev]);
    alert('Email sent successfully!');
  };

  const handleToggleStar = (id: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const priorityCycle: EmailPriority[] = [EmailPriority.LOW, EmailPriority.NORMAL, EmailPriority.HIGH, EmailPriority.URGENT];

  const getPriorityMarkerClass = (priority: EmailPriority) => {
    switch (priority) {
      case EmailPriority.URGENT: return 'text-red-500';
      case EmailPriority.HIGH: return 'text-yellow-500';
      case EmailPriority.NORMAL: return 'text-green-500';
      default: return 'text-gray-400';
    }
  };

  const getPriorityLabel = (priority: EmailPriority) => {
    switch (priority) {
      case EmailPriority.URGENT: return 'Urgent';
      case EmailPriority.HIGH: return 'High priority';
      case EmailPriority.NORMAL: return 'Normal priority';
      default: return 'Low priority';
    }
  };

  const PriorityMarker: React.FC<{ priority: EmailPriority; className?: string }> = ({ priority, className = 'h-4 w-4' }) => (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden="true">
      <path d="M2.5 1.5 C 6.5 5.8, 6.5 10.2, 2.5 14.5 L 14.5 8 Z" />
    </svg>
  );

  const handleCyclePriority = (id: string) => {
    setEmails(prev => prev.map(email => {
      if (email.id !== id) return email;
      const currentIndex = priorityCycle.indexOf(email.priority);
      const next = priorityCycle[(currentIndex + 1) % priorityCycle.length];
      return { ...email, priority: next };
    }));
  };

  const handleMarkAsRead = (id: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isRead: true } : email
    ));
  };

  const handleMarkAsUnread = (id: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, isRead: false } : email
    ));
  };

  const handleMoveToFolder = (id: string, folder: EmailFolder) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, folder } : email
    ));
  };

  const handleDeleteEmail = (id: string) => {
    setEmails(prev => prev.map(email => 
      email.id === id ? { ...email, folder: EmailFolder.TRASH } : email
    ));
  };

  const handleToggleExpand = (id: string) => {
    setExpandedEmailId(expandedEmailId === id ? null : id);
    // Mark as read when expanded
    const email = emails.find(e => e.id === id);
    if (email && !email.isRead) {
      handleMarkAsRead(id);
    }
  };

  const toggleSelectEmail = (emailId: string) => {
    if (selectedEmails.includes(emailId)) {
      setSelectedEmails(selectedEmails.filter(id => id !== emailId));
    } else {
      setSelectedEmails([...selectedEmails, emailId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map(email => email.id));
    }
  };

  const handleBulkAction = (action: 'read' | 'unread' | 'star' | 'archive' | 'delete') => {
    if (selectedEmails.length === 0) {
      alert('Please select at least one email');
      return;
    }

    switch (action) {
      case 'read':
        setEmails(prev => prev.map(email => 
          selectedEmails.includes(email.id) ? { ...email, isRead: true } : email
        ));
        break;
      case 'unread':
        setEmails(prev => prev.map(email => 
          selectedEmails.includes(email.id) ? { ...email, isRead: false } : email
        ));
        break;
      case 'star':
        setEmails(prev => prev.map(email => 
          selectedEmails.includes(email.id) ? { ...email, isStarred: !email.isStarred } : email
        ));
        break;
      case 'archive':
        setEmails(prev => prev.map(email => 
          selectedEmails.includes(email.id) ? { ...email, folder: EmailFolder.ARCHIVED } : email
        ));
        break;
      case 'delete':
        setEmails(prev => prev.map(email => 
          selectedEmails.includes(email.id) ? { ...email, folder: EmailFolder.TRASH } : email
        ));
        break;
    }
    
    setSelectedEmails([]);
    alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action applied to ${selectedEmails.length} emails`);
  };

  // Mock data for filters
  const customers = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Mike Chen' },
    { id: '3', name: 'Emma Davis' },
    { id: '4', name: 'James Wilson' },
    { id: '5', name: 'Lisa Park' }
  ];

  // Apply filters
  const filteredEmails = emails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.fromName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         email.toName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFolder = email.folder === currentFolder;
    const matchesStatus = filters.status === 'all' || email.status === filters.status;
    const matchesPriority = filters.priority === 'all' || email.priority === filters.priority;
    const matchesCustomer = filters.customerId === 'all' || email.customerId === filters.customerId;

    return matchesSearch && matchesFolder && matchesStatus && matchesPriority && matchesCustomer;
  });

  // Sort emails by date (newest first)
  const sortedEmails = [...filteredEmails].sort((a, b) => {
    const dateA = new Date(a.sentAt || a.receivedAt || a.createdAt);
    const dateB = new Date(b.sentAt || b.receivedAt || b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  const unreadCount = emails.filter(email => !email.isRead && email.folder === EmailFolder.INBOX).length;
  const starredCount = emails.filter(email => email.isStarred).length;
  const todayCount = emails.filter(email => {
    const today = new Date().toDateString();
    const emailDate = new Date(email.sentAt || email.receivedAt || email.createdAt).toDateString();
    return today === emailDate;
  }).length;

  return (
    <div className="p-6">
      <Header title="Email" icon={Mail} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          {/* Compose Button */}
          <div className="p-4">
            <button 
              onClick={handleComposeEmail}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </button>
          </div>

          {/* Folders */}
          <nav className="flex-1 px-4 pb-4">
            <div className="space-y-1">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setCurrentFolder(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentFolder === folder.id
                      ? 'bg-coral-100 text-coral-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <folder.icon className={`mr-3 h-4 w-4 ${
                      currentFolder === folder.id ? 'text-coral-500' : 'text-gray-400'
                    }`} />
                    {folder.name}
                  </div>
                  {folder.count > 0 && (
                    <span className="bg-gray-200 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {folder.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                    <Mail className="h-4 w-4 text-white" />
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
                  <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Starred</p>
                  <p className="text-lg font-semibold text-gray-900">{starredCount}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-white" />
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
                    <Send className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500">Total</p>
                  <p className="text-lg font-semibold text-gray-900">{emails.length}</p>
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
                  placeholder="Search emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-coral-500 text-sm"
                />
              </div>

              <select
                  value={filters.priority === 'all' ? 'title' : filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                  className="block w-full sm:w-24 pl-2.5 pr-4 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:border-coral-500 text-sm"
                >
                  <option value="title" disabled hidden>Priority</option>
                  <option value="all">None</option>
                  <optgroup label="Priority">
                    {Object.values(EmailPriority).map(priority => (
                      <option key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </optgroup>
                </select>

            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setIsComposeOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Compose
              </button>
              
              <button 
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedEmails.length > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {selectedEmails.length} selected
              </span>
              <button 
                onClick={() => handleBulkAction('read')}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-3 w-3 mr-1" />
                Mark Read
              </button>
              <button 
                onClick={() => handleBulkAction('unread')}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <EyeOff className="h-3 w-3 mr-1" />
                Mark Unread
              </button>
              <button 
                onClick={() => handleBulkAction('star')}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Star className="h-3 w-3 mr-1" />
                Star
              </button>
              <button 
                onClick={() => handleBulkAction('archive')}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Archive className="h-3 w-3 mr-1" />
                Archive
              </button>
              <button 
                onClick={() => handleBulkAction('delete')}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </button>
            </div>
          )}

          {/* Email List */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-3 text-left">
                      <div className="flex items-center space-x-1 relative">
                        <input
                          type="checkbox"
                          checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 text-coral-600 border-gray-300 rounded"
                        />
                        <button
                          onClick={() => setIsSelectMenuOpen(!isSelectMenuOpen)}
                          className="p-0.5 text-gray-400 hover:text-gray-700 transition-colors"
                          title="Selection and priority filter options"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        {isSelectMenuOpen && (
                          <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                            <div className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                              Select
                            </div>
                            <button
                              onClick={() => {
                                setSelectedEmails(filteredEmails.map(email => email.id));
                                setIsSelectMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              All
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEmails([]);
                                setIsSelectMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              None
                            </button>
                            <div className="mt-1 px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                              Show priority
                            </div>
                            <button
                              onClick={() => {
                                setFilters(prev => ({ ...prev, priority: 'all' }));
                                setIsSelectMenuOpen(false);
                              }}
                              className={`w-full text-left px-3 py-1.5 text-sm flex items-center transition-colors ${
                                filters.priority === 'all'
                                  ? 'bg-coral-50 text-coral-900 font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <PriorityMarker priority={filters.priority === 'all' ? EmailPriority.LOW : (filters.priority as EmailPriority)} className="h-3.5 w-4 mr-2 text-gray-300" />
                              All priorities
                            </button>
                            {[EmailPriority.LOW, EmailPriority.NORMAL, EmailPriority.HIGH, EmailPriority.URGENT].map((priority) => (
                              <button
                                key={priority}
                                onClick={() => {
                                  setFilters(prev => ({ ...prev, priority }));
                                  setIsSelectMenuOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 text-sm flex items-center transition-colors ${
                                  filters.priority === priority
                                    ? 'bg-coral-50 text-coral-900 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <PriorityMarker priority={priority} className={`h-3.5 w-4 mr-2 ${getPriorityMarkerClass(priority)}`} />
                                {getPriorityLabel(priority)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedEmails.map((email) => (
                    <React.Fragment key={email.id}>
                      {/* Main Email Row */}
                      <tr className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                        !email.isRead ? 'bg-aqua-50' : ''
                      }`} onClick={() => handleToggleExpand(email.id)}>
                        <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedEmails.includes(email.id)}
                            onChange={() => toggleSelectEmail(email.id)}
                            className="h-4 w-4 text-coral-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleToggleStar(email.id)}
                            className={`transition-colors ${
                              email.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                            }`}
                            title={email.isStarred ? 'Unstar' : 'Star'}
                          >
                            <Star className={`h-4 w-4 ${email.isStarred ? 'fill-current' : ''}`} />
                          </button>
                        </td>
                        <td className="px-2 py-4" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleCyclePriority(email.id)}
                            className={`transition-colors hover:opacity-80 ${getPriorityMarkerClass(email.priority)}`}
                            title={`${getPriorityLabel(email.priority)} — click to change`}
                          >
                            <PriorityMarker priority={email.priority} className="h-4 w-5" />
                          </button>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`text-sm text-gray-900 ${!email.isRead ? 'font-semibold' : ''}`}>
                            {currentFolder === EmailFolder.SENT ? email.toName : email.fromName}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <span className={`text-sm text-gray-900 ${!email.isRead ? 'font-semibold' : ''}`}>
                            {email.subject}
                          </span>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <span className={`text-sm ${!email.isRead ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                            {formatDate(email.sentAt || email.receivedAt || email.createdAt)}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDeleteEmail(email.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Move to Trash"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Email Content */}
                      {expandedEmailId === email.id && (
                        <tr>
                          <td colSpan={7} className="px-6 py-0">
                            <div className="bg-gray-50 border-l-4 border-aqua-400 rounded-lg p-6 my-4">
                              <div className="space-y-4">
                                {/* Email Header */}
                                <div className="border-b border-gray-200 pb-4">
                                  <h4 className="text-lg font-medium text-gray-900 mb-2">{email.subject}</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                      <p><strong>From:</strong> {email.fromName} &lt;{email.fromEmail}&gt;</p>
                                      <p><strong>To:</strong> {email.toName} &lt;{email.toEmail}&gt;</p>
                                      {email.ccEmails && email.ccEmails.length > 0 && (
                                        <p><strong>CC:</strong> {email.ccEmails.join(', ')}</p>
                                      )}
                                    </div>
                                    <div>
                                      <p><strong>Date:</strong> {new Date(email.sentAt || email.receivedAt || email.createdAt).toLocaleString()}</p>
                                      <p><strong>Priority:</strong> {email.priority}</p>
                                      {email.templateName && (
                                        <p><strong>Template:</strong> {email.templateName}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {/* Email Content */}
                                <div className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                                    {email.content}
                                  </div>
                                </div>

                                {/* Linked Records */}
                                {(email.customerName || email.orderId || email.quoteId || email.invoiceId) && (
                                  <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-700">Linked to:</span>
                                    {email.customerName && (
                                      <button
                                        onClick={() => navigate(`/customers/${email.customerId}`)}
                                        className="inline-flex items-center text-sm text-coral-600 hover:text-coral-700 transition-colors"
                                      >
                                        <User className="h-4 w-4 mr-1" />
                                        {email.customerName}
                                      </button>
                                    )}
                                    {email.orderId && (
                                      <button
                                        onClick={() => navigate(`/orders/${email.orderId}`)}
                                        className="inline-flex items-center text-sm text-aqua-600 hover:text-aqua-700 transition-colors"
                                      >
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        {email.orderId}
                                      </button>
                                    )}
                                    {email.quoteId && (
                                      <button
                                        onClick={() => navigate(`/quotes/${email.quoteId}`)}
                                        className="inline-flex items-center text-sm text-mint-600 hover:text-mint-700 transition-colors"
                                      >
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        {email.quoteId}
                                      </button>
                                    )}
                                    {email.invoiceId && (
                                      <button
                                        onClick={() => navigate(`/invoice/${email.invoiceId}`)}
                                        className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 transition-colors"
                                      >
                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                        {email.invoiceId}
                                      </button>
                                    )}
                                  </div>
                                )}

                                {/* Email Actions */}
                                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                  <button
                                    onClick={() => handleReplyEmail(email)}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                                  >
                                    <Reply className="h-4 w-4 mr-2" />
                                    Reply
                                  </button>
                                  <button
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                  >
                                    <Forward className="h-4 w-4 mr-2" />
                                    Forward
                                  </button>
                                  <button
                                    onClick={() => handleMoveToFolder(email.id, EmailFolder.ARCHIVED)}
                                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                  >
                                    <Archive className="h-4 w-4 mr-2" />
                                    Archive
                                  </button>
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

          {/* No Results */}
          {sortedEmails.length === 0 && (
            <div className="text-center py-12">
              <Mail className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-gray-500 text-lg">No emails found</div>
              <div className="text-gray-400 text-sm mt-2">
                {searchTerm || Object.values(filters).some(f => f !== 'all' && f !== false)
                  ? 'Try adjusting your search or filter criteria'
                  : currentFolder === EmailFolder.INBOX 
                    ? 'Your inbox is empty'
                    : `No emails in ${currentFolder}`
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Email Compose/Reply Modal */}
      <EmailForm
        isOpen={isComposeOpen}
        onClose={() => {
          setIsComposeOpen(false);
          setReplyToEmail(null);
        }}
        onSubmit={handleEmailSubmit}
        replyTo={replyToEmail}
      />
    </div>
  );
};

export default EmailBox;