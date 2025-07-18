import React, { useState } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import CalendarWidget from '../components/CalendarWidget';
import EventModal from '../components/EventModal';
import DashboardChartPlaceholder from '../components/DashboardChartPlaceholder';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  UserCheck,
  ClipboardList,
  Mail,
  MapPin,
  Package
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Recent metrics data
  const recentMetrics = [
    { count: 7, label: 'invoices are overdue', icon: AlertCircle, color: 'text-red-600' },
    { count: 5, label: 'contracts need counter signatures', icon: FileText, color: 'text-orange-600' },
    { count: 3, label: 'workflow actions need approval', icon: UserCheck, color: 'text-yellow-600' },
    { count: 2, label: 'incomplete tasks', icon: ClipboardList, color: 'text-blue-600' },
    { count: 1, label: 'inquiry not responded to', icon: Mail, color: 'text-purple-600' }
  ];

  // Today's orders data with pickup and delivery details
  const todaysOrders = [
    {
      id: 'O-202501-0001',
      customerName: 'Sarah Johnson',
      eventDate: '2025-01-17',
      eventTime: '09:00',
      orderType: 'pickup',
      address: null
    },
    {
      id: 'O-202501-0002',
      customerName: 'Mike Chen',
      eventDate: '2025-01-17',
      eventTime: '10:30',
      orderType: 'delivery',
      address: '456 Oak Avenue, Springfield, IL 62702'
    },
    {
      id: 'O-202501-0003',
      customerName: 'Emma Davis',
      eventDate: '2025-01-17',
      eventTime: '14:00',
      orderType: 'pickup',
      address: null
    },
    {
      id: 'O-202501-0004',
      customerName: 'James Wilson',
      eventDate: '2025-01-17',
      eventTime: '15:30',
      orderType: 'delivery',
      address: '321 Elm Street, Springfield, IL 62704'
    },
    {
      id: 'O-202501-0005',
      customerName: 'Lisa Park',
      eventDate: '2025-01-17',
      eventTime: '16:00',
      orderType: 'pickup',
      address: null
    },
    {
      id: 'O-202501-0006',
      customerName: 'Robert Smith',
      eventDate: '2025-01-17',
      eventTime: '17:45',
      orderType: 'delivery',
      address: '654 Maple Drive, Springfield, IL 62705'
    }
  ];

  // Sort today's orders chronologically by event time
  const sortedTodaysOrders = [...todaysOrders].sort((a, b) => {
    const timeA = new Date(`${a.eventDate} ${a.eventTime}`);
    const timeB = new Date(`${b.eventDate} ${b.eventTime}`);
    return timeA.getTime() - timeB.getTime();
  });

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCreateEvent = (date: string, time?: string) => {
    setSelectedDate(date);
    setSelectedTime(time || '');
    setIsEventModalOpen(true);
  };

  const handleViewEvent = (event: any) => {
    console.log('View event:', event);
    // In a real app, this would open an event details modal
    alert(`View event: ${event.title}`);
  };

  const handleEventSubmit = (eventData: any) => {
    console.log('New event created:', eventData);
    // In a real app, this would save the event to your database
    alert(`Event "${eventData.title}" created successfully!`);
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Dashboard" />
      
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Monthly Revenue"
            value="$12,450"
            change="+15%"
            changeType="increase"
            icon={DollarSign}
            color="coral"
          />
          <StatCard
            title="Active Orders"
            value="23"
            change="+3"
            changeType="increase"
            icon={ShoppingBag}
            color="aqua"
          />
          <StatCard
            title="Total Customers"
            value="156"
            change="+8"
            changeType="increase"
            icon={Users}
            color="mint"
          />
          <StatCard
            title="Growth Rate"
            value="18.5%"
            change="+2.1%"
            changeType="increase"
            icon={TrendingUp}
            color="pink"
          />
        
         <div className="space-y-6">
          {/* Recent - Vertical List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-coral-400 to-pink-400 rounded-t-lg">
              <h3 className="text-lg font-semibold text-gray-900">Recent</h3>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentMetrics.map((metric, index) => (
                  <li key={index} className="px-4 py-2 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      <span className="text-sm text-gray-900">
                        <span className="font-semibold">{metric.count}</span> {metric.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            </div>
            {/* <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-coral-600 hover:text-coral-500 font-medium">
                View all items →
              </button>
            </div>*/}
          </div>
           </div>
          
{/* Chart Placeholder Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
  <DashboardChartPlaceholder
    title="Order Volume Trend"
    description="Line chart showing order growth over time."
  />
  <DashboardChartPlaceholder
    title="Revenue Breakdown"
    description="Bar or donut chart by service type or product category."
  />
  <DashboardChartPlaceholder
    title="Customer Acquisition"
    description="How customers found your business."
  />
  <DashboardChartPlaceholder
    title="Best-Selling Items"
    description="Products contributing most to total revenue."
  />
</div>

        {/* Calendar Widget - Full Width */}
        <div className="mb-8">
          <CalendarWidget
            onCreateEvent={handleCreateEvent}
            onViewEvent={handleViewEvent}
          />
        </div>

        {/* Recent Metrics and Today's Orders */}
       
          {/* Today's Orders - Table Format */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-coral-400 to-pink-400 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Orders</h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedTodaysOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{formatTime(order.eventTime)}</div>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          order.orderType === 'pickup' 
                            ? 'bg-mint-100 text-mint-800' 
                            : 'bg-aqua-100 text-aqua-800'
                        }`}>
                          {order.orderType === 'pickup' ? (
                            <>
                              <Package className="h-3 w-3 mr-1" />
                              Pickup
                            </>
                          ) : (
                            <>
                              <MapPin className="h-3 w-3 mr-1" />
                              Delivery
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        {order.orderType === 'delivery' && order.address ? (
                          <div className="text-sm text-gray-500">{order.address}</div>
                        ) : (
                          <div className="text-sm text-gray-400">-</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-coral-600 hover:text-coral-500 font-medium">
                View all orders →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleEventSubmit}
        initialDate={selectedDate}
        initialTime={selectedTime}
      />
    </div>
  );
};

export default Dashboard;