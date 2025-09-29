import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { 
  Bell,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Clock,
  DollarSign,
  Package,
  FileText,
  User,
  Calendar,
  Eye,
  EyeOff,
  Trash2,
  Filter,
  Search,
  X
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'payment' | 'task' | 'system' | 'customer' | 'inventory';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actionUrl?: string;
  relatedId?: string;
}

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'N-001',
      type: 'payment',
      title: 'Payment Overdue',
      message: 'Invoice I-202412-0046 for Emma Davis is now 7 days overdue. Total amount: $280.00',
      createdAt: '2025-01-17T08:00:00Z',
      isRead: false,
      priority: 'urgent',
      actionUrl: '/invoice/I-202412-0046',
      relatedId: 'I-202412-0046'
    },
    {
      id: 'N-002',
      type: 'order',
      title: 'Order Ready for Pickup',
      message: 'Order O-202501-0002 for Mike Chen is ready for pickup today at 2:00 PM',
      createdAt: '2025-01-17T07:30:00Z',
      isRead: false,
      priority: 'high',
      actionUrl: '/orders/O-202501-0002',
      relatedId: 'O-202501-0002'
    },
    {
      id: 'N-003',
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Vanilla extract inventory is running low (2 bottles remaining). Reorder recommended.',
      createdAt: '2025-01-17T06:00:00Z',
      isRead: false,
      priority: 'high',
      actionUrl: '/inventory'
    },
    {
      id: 'N-004',
      type: 'task',
      title: 'Task Overdue',
      message: 'Task "Schedule cake tasting appointment" assigned to Sales Team is now overdue',
      createdAt: '2025-01-16T18:00:00Z',
      isRead: true,
      priority: 'high',
      actionUrl: '/tasks'
    },
    {
      id: 'N-005',
      type: 'customer',
      title: 'New Customer Inquiry',
      message: 'New wedding inquiry received from Jennifer Brown. Event date: March 15, 2025',
      createdAt: '2025-01-16T15:45:00Z',
      isRead: true,
      priority: 'normal',
      actionUrl: '/inquiries/INQ-2025-004',
      relatedId: 'INQ-2025-004'
    },
    {
      id: 'N-006',
      type: 'order',
      title: 'Order Confirmed',
      message: 'Order O-202501-0001 for Sarah Johnson has been confirmed. Production starts tomorrow.',
      createdAt: '2025-01-16T14:20:00Z',
      isRead: true,
      priority: 'normal',
      actionUrl: '/orders/O-202501-0001',
      relatedId: 'O-202501-0001'
    },
    {
      id: 'N-007',
      type: 'system',
      title: 'Backup Completed',
      message: 'Daily system backup completed successfully at 2:00 AM',
      createdAt: '2025-01-16T02:00:00Z',
      isRead: true,
      priority: 'low'
    },
    {
      id: 'N-008',
      type: 'payment',
      title: 'Payment Received',
      message: 'Deposit payment of $300.00 received for Order O-202501-0001 (Sarah Johnson)',
      createdAt: '2025-01-15T16:30:00Z',
      isRead: true,
      priority: 'normal',
      actionUrl: '/orders/O-202501-0001',
      relatedId: 'O-202501-0001'
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return <Package className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'task': return <CheckCircle2 className="h-4 w-4" />;
      case 'system': return <AlertTriangle className="h-4 w-4" />;
      case 'customer': return <User className="h-4 w-4" />;
      case 'inventory': return <FileText className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-aqua-600 bg-aqua-50 border-aqua-200';
      case 'payment': return 'text-mint-600 bg-mint-50 border-mint-200';
      case 'task': return 'text-coral-600 bg-coral-50 border-coral-200';
      case 'system': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'customer': return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'inventory': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-gray-100 text-gray-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) { // Less than a week
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notif.type === typeFilter;
    const matchesRead = !showUnreadOnly || !notif.isRead;
    
    return matchesSearch && matchesType && matchesRead;
  });

  // Sort notifications: unread first, then by date
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (a.isRead !== b.isRead) {
      return a.isRead ? 1 : -1; // Unread first
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  const urgentCount = notifications.filter(notif => notif.priority === 'urgent' && !notif.isRead).length;
  const todayCount = notifications.filter(notif => {
    const today = new Date().toDateString();
    const notifDate = new Date(notif.createdAt).toDateString();
    return today === notifDate;
  }).length;

  return (
    <div className="p-6">
      <Header title="Notifications" icon={Bell} />
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

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
                <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Urgent</p>
                <p className="text-lg font-semibold text-gray-900">{urgentCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
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
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-lg font-semibold text-gray-900">{notifications.length}</p>
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
                placeholder="Search notifications..."
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
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Types</option>
                <option value="order">Orders</option>
                <option value="payment">Payments</option>
                <option value="task">Tasks</option>
                <option value="customer">Customers</option>
                <option value="inventory">Inventory</option>
                <option value="system">System</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showUnreadOnly}
                  onChange={(e) => setShowUnreadOnly(e.target.checked)}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Unread Only</span>
              </label>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark All Read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {sortedNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white shadow-sm rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                !notification.isRead ? 'border-coral-300 bg-coral-50' : 'border-gray-200'
              }`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {/* Notification Type Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{notification.title}</h3>
                        
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-coral-500 rounded-full flex-shrink-0"></div>
                        )}
                        
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)} flex-shrink-0`}>
                          {notification.priority}
                        </span>
                      </div>

                      {/* Message */}
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

                      {/* Metadata */}
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDateTime(notification.createdAt)}
                        </div>
                        
                        <div className="flex items-center capitalize">
                          {getNotificationIcon(notification.type)}
                          <span className="ml-1">{notification.type}</span>
                        </div>
                        
                        {notification.relatedId && (
                          <div className="flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {notification.relatedId}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-1 ml-3" onClick={(e) => e.stopPropagation()}>
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-aqua-600 hover:bg-aqua-50 rounded-md transition-colors"
                        title="Mark as Read"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {sortedNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">No notifications found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || typeFilter !== 'all' || showUnreadOnly
                ? 'Try adjusting your search or filter criteria'
                : 'All caught up! No new notifications.'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;