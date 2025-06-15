import React, { useState } from 'react';
import Header from '../components/Header';
import Calendar from '../components/Calendar';
import EventModal from '../components/EventModal';
import { 
  Calendar as CalendarIcon, 
  Grid, 
  List, 
  Clock,
  Plus,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react';

const CalendarPage: React.FC = () => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const viewOptions = [
    { id: 'month', label: 'Month', icon: Grid },
    { id: 'week', label: 'Week', icon: List },
    { id: 'day', label: 'Day', icon: Clock }
  ];

  // Generate year options (current year ± 5 years)
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    yearOptions.push(year);
  }

  const handleCreateEvent = (date: string, time?: string) => {
    setSelectedDate(date);
    setSelectedTime(time || '');
    setIsEventModalOpen(true);
  };

  const handleViewEvent = (event: any) => {
    console.log('View event:', event);
    // In a real app, this would open an event details modal or navigate to event page
    alert(`View event: ${event.title}`);
  };

  const handleEventSubmit = (eventData: any) => {
    console.log('New event created:', eventData);
    // In a real app, this would save the event to your database
    alert(`Event "${eventData.title}" created successfully!`);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // You could also update the calendar's current date to the selected year
    // This would require passing the selected year to the Calendar component
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title="Calendar" 
        subtitle="Manage your appointments, tasks, and schedule" 
      />
      
      <div className="p-6">
        {/* Calendar Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 text-sm"
              />
            </div>
            
            {/* Year Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={selectedYear}
                onChange={(e) => handleYearChange(parseInt(e.target.value))}
                className="block w-full sm:w-32 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 text-sm appearance-none"
              >
                {yearOptions.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            {/* Event Type Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 text-sm"
              >
                <option value="all">All Events</option>
                <option value="appointment">Appointments</option>
                <option value="task">Tasks</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {viewOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setView(option.id as any)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    view === option.id
                      ? 'bg-white text-aqua-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <option.icon className="h-4 w-4 mr-2" />
                  {option.label}
                </button>
              ))}
            </div>

            {/* Create Event Button */}
            <button 
              onClick={() => handleCreateEvent(new Date().toISOString().split('T')[0])}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aqua-500 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </button>
          </div>
        </div>

        {/* Year Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <CalendarIcon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Events</p>
                <p className="text-lg font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Appointments</p>
                <p className="text-lg font-semibold text-gray-900">16</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <List className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Tasks</p>
                <p className="text-lg font-semibold text-gray-900">8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Grid className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="text-lg font-semibold text-gray-900">18</p>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="p-6">
            <Calendar
              view={view}
              isWidget={false}
              onCreateEvent={handleCreateEvent}
              onViewEvent={handleViewEvent}
            />
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

export default CalendarPage;