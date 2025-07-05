import React, { useState } from 'react';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import CalendarWidget from '../components/CalendarWidget';
import EventModal from '../components/EventModal';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const recentOrders = [
    { id: 'O-202501-0001', customer: 'Sarah Johnson', event: 'Wedding Cake', date: '2025-01-15', status: 'in-production', amount: '$450' },
    { id: 'O-202501-0002', customer: 'Mike Chen', event: 'Birthday Cake', date: '2025-01-16', status: 'confirmed', amount: '$120' },
    { id: 'O-202501-0003', customer: 'Emma Davis', event: 'Corporate Event', date: '2025-01-18', status: 'quoted', amount: '$280' },
    { id: 'O-202412-0025', customer: 'James Wilson', event: 'Anniversary Cake', date: '2025-01-20', status: 'inquiry', amount: '$180' },
  ];

  const upcomingDeliveries = [
    { customer: 'Sarah Johnson', time: '10:00 AM', venue: 'Grand Hotel Ballroom', type: 'Wedding Cake' },
    { customer: 'Lisa Park', time: '2:30 PM', venue: 'Community Center', type: 'Birthday Cake' },
    { customer: 'Tech Corp', time: '4:00 PM', venue: 'Downtown Office', type: 'Corporate Cupcakes' },
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
        </div>

        {/* Calendar Widget - Full Width */}
        <div className="mb-8">
          <CalendarWidget
            onCreateEvent={handleCreateEvent}
            onViewEvent={handleViewEvent}
          />
        </div>

        {/* Recent Orders and Today's Deliveries */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <li key={order.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {order.customer}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {order.event} • {order.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status.replace('-', ' ')}</span>
                        </span>
                        <span className="text-sm font-semibold text-gray-900">{order.amount}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-coral-600 hover:text-coral-500 font-medium">
                View all orders →
              </button>
            </div>
          </div>

          {/* Today's Orders */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Orders</h3>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {upcomingDeliveries.map((delivery, index) => (
                  <li key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {delivery.customer}
                        </p>
                        <p className="text-sm text-gray-500">
                          {delivery.type} • {delivery.venue}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-coral-600">
                        {delivery.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
              <button className="text-sm text-coral-600 hover:text-coral-500 font-medium">
                View delivery schedule →
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