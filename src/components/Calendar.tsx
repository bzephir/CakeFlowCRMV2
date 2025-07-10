import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckSquare,
  Plus,
  Eye,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'appointment' | 'task' | 'blocked';
  date: string;
  time?: string;
  endTime?: string;
  customer?: string;
  description?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface CalendarProps {
  view: 'overview' | 'month' | 'week' | 'day';
  isWidget?: boolean;
  onCreateEvent?: (date: string, time?: string) => void;
  onViewEvent?: (event: CalendarEvent) => void;
}

const Calendar: React.FC<CalendarProps> = ({ 
  view, 
  isWidget = false, 
  onCreateEvent,
  onViewEvent 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock events data with various years for demonstration
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Wedding Cake Consultation',
      type: 'appointment',
      date: '2025-01-15',
      time: '10:00',
      endTime: '11:00',
      customer: 'Sarah Johnson',
      description: 'Discuss wedding cake design and flavors',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Cake Delivery - Birthday Party',
      type: 'task',
      date: '2025-01-16',
      time: '14:00',
      customer: 'Mike Chen',
      description: 'Deliver custom birthday cake',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Final Cake Tasting',
      type: 'appointment',
      date: '2025-01-18',
      time: '15:30',
      endTime: '16:30',
      customer: 'Emma Davis',
      description: 'Final tasting before corporate event',
      status: 'scheduled'
    },
    {
      id: '4',
      title: 'Order Ingredients',
      type: 'task',
      date: '2025-01-20',
      description: 'Restock flour, sugar, and vanilla extract',
      status: 'scheduled'
    },
    {
      id: '5',
      title: 'Wedding Cake Setup',
      type: 'task',
      date: '2025-01-22',
      time: '08:00',
      customer: 'James Wilson',
      description: 'Setup 3-tier wedding cake at venue',
      status: 'completed'
    },
    // Historical events for 2024
    {
      id: '6',
      title: 'Anniversary Cake Delivery',
      type: 'task',
      date: '2024-12-15',
      time: '16:00',
      customer: 'Robert & Linda Smith',
      description: 'Golden anniversary celebration cake',
      status: 'completed'
    },
    {
      id: '7',
      title: 'Holiday Cake Orders Review',
      type: 'appointment',
      date: '2024-11-20',
      time: '09:00',
      endTime: '10:30',
      description: 'Review and plan holiday season orders',
      status: 'completed'
    },
    // Future events for 2026
    {
      id: '8',
      title: 'Spring Wedding Expo',
      type: 'appointment',
      date: '2026-03-15',
      time: '10:00',
      endTime: '18:00',
      description: 'Showcase wedding cakes at local expo',
      status: 'scheduled'
    }
  ];

  const getEventColor = (event: CalendarEvent) => {
    if (event.status === 'completed') return 'bg-mint-100 text-mint-800 border-mint-200';
    if (event.status === 'cancelled') return 'bg-gray-100 text-gray-600 border-gray-200';
    
    if (event.type === 'appointment') {
      return 'bg-coral-100 text-coral-800 border-coral-200';
    } 
    if (event.type === 'task') {
      return 'bg-aqua-100 text-aqua-800 border-aqua-200'
    }
    if (event.type === 'blocked') {
      return "bg-gray-100 text-gray-800 border-gray-200"
    }/*else {
      return 'bg-aqua-100 text-aqua-800 border-aqua-200';
    }*/
  };

  const getEventIcon = (event: CalendarEvent) => {
    if (event.type === 'appointment') {
      return <User className="h-3 w-3" />;
    }
   if (event.type === 'task') {
      return <CheckSquare className="h-3 w-3" />;
    }    
    if (event.type === 'blocked') {
      return <Ban className="h-3 w-3" />;
    } 
     /*else {
      return <CheckSquare className="h-3 w-3" />;
    }*/
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Navigation functions
  const navigateYear = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= nextWeek;
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time || '00:00'}`);
        const dateB = new Date(`${b.date} ${b.time || '00:00'}`);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 5);
  };

  const handleDateClick = (date: string) => {
    if (onCreateEvent) {
      onCreateEvent(date);
    }
  };

  const handleTimeSlotClick = (date: string, time: string) => {
    if (onCreateEvent) {
      onCreateEvent(date, time);
    }
  };

  // Enhanced navigation component
  const NavigationHeader = ({ title, showYearNavigation = true }: { title: string; showYearNavigation?: boolean }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {!isWidget && (
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm font-medium text-aqua-600 hover:text-aqua-700 bg-aqua-50 hover:bg-aqua-100 rounded-md transition-colors"
          >
            Today
          </button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {showYearNavigation && !isWidget && (
          <>
            {/* Year Navigation */}
            <button
              onClick={() => navigateYear('prev')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Previous Year"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-600 min-w-[60px] text-center">
              {currentDate.getFullYear()}
            </span>
            <button
              onClick={() => navigateYear('next')}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Next Year"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
            <div className="w-px h-4 bg-gray-300 mx-2"></div>
          </>
        )}
        
        {/* Month/Week/Day Navigation */}
        <button
          onClick={() => {
            if (view === 'month') navigateMonth('prev');
            else if (view === 'week') navigateWeek('prev');
            else if (view === 'day') navigateDay('prev');
          }}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title={`Previous ${view}`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => {
            if (view === 'month') navigateMonth('next');
            else if (view === 'week') navigateWeek('next');
            else if (view === 'day') navigateDay('next');
          }}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          title={`Next ${view}`}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Overview View (Dashboard Widget)
  if (view === 'overview') {
    const upcomingEvents = getUpcomingEvents();
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
          <button
            onClick={() => onCreateEvent?.(new Date().toISOString().split('T')[0])}
            className="p-1 text-coral-600 hover:text-coral-700 transition-colors"
            title="Add Event"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        
        {upcomingEvents.length > 0 ? (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${getEventColor(event)}`}
                onClick={() => onViewEvent?.(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    {getEventIcon(event)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        {event.time && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs">{formatTime(event.time)}</span>
                          </>
                        )}
                      </div>
                      {event.customer && (
                        <p className="text-xs text-gray-600 mt-1">{event.customer}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No upcoming events</p>
          </div>
        )}
      </div>
    );
  }

  // Month View
  if (view === 'month') {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDay = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return (
      <div className="space-y-4">
        {/* Month Navigation */}
        <NavigationHeader 
          title={currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        />

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {days.map((day, index) => {
            const dateString = day.toISOString().split('T')[0];
            const dayEvents = getEventsForDate(dateString);
            const isCurrentMonth = day.getMonth() === month;
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={index}
                className={`min-h-[80px] p-1 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  !isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''
                } ${isToday ? 'bg-coral-50 border-coral-200' : ''}`}
                onClick={() => handleDateClick(dateString)}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? 'text-coral-600' : ''}`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, isWidget ? 1 : 3).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded border truncate ${getEventColor(event)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewEvent?.(event);
                      }}
                    >
                      <div className="flex items-center space-x-1">
                        {getEventIcon(event)}
                        <span className="truncate">{event.title}</span>
                      </div>
                    </div>
                  ))}
                  {dayEvents.length > (isWidget ? 1 : 3) && (
                    <div className="text-xs text-gray-500 px-1">
                      +{dayEvents.length - (isWidget ? 1 : 3)} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Week View
  if (view === 'week') {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      weekDays.push(day);
    }

    const timeSlots = [];
    for (let hour = 8; hour < 20; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return (
      <div className="space-y-4">
        {/* Week Navigation */}
        <NavigationHeader 
          title={`${startOfWeek.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${weekDays[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
        />

        {/* Week Grid */}
        <div className="grid grid-cols-8 gap-1">
          {/* Time Column Header */}
          <div className="p-2"></div>
          
          {/* Day Headers */}
          {weekDays.map((day) => {
            const isToday = day.toDateString() === new Date().toDateString();
            return (
              <div key={day.toISOString()} className={`p-2 text-center border-b ${isToday ? 'bg-coral-50 border-coral-200' : 'border-gray-200'}`}>
                <div className="text-xs text-gray-500">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className={`text-sm font-medium ${isToday ? 'text-coral-600' : ''}`}>
                  {day.getDate()}
                </div>
              </div>
            );
          })}

          {/* Time Slots */}
          {timeSlots.map((time) => (
            <React.Fragment key={time}>
              {/* Time Label */}
              <div className="p-2 text-xs text-gray-500 border-r border-gray-200">
                {formatTime(time)}
              </div>
              
              {/* Day Columns */}
              {weekDays.map((day) => {
                const dateString = day.toISOString().split('T')[0];
                const timeEvents = events.filter(event => 
                  event.date === dateString && event.time === time
                );
                
                return (
                  <div
                    key={`${dateString}-${time}`}
                    className="min-h-[60px] p-1 border-r border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleTimeSlotClick(dateString, time)}
                  >
                    {timeEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded border mb-1 ${getEventColor(event)}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewEvent?.(event);
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          {getEventIcon(event)}
                          <span className="truncate">{event.title}</span>
                        </div>
                        {event.customer && (
                          <div className="text-xs opacity-75 truncate">{event.customer}</div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // Day View
  if (view === 'day') {
    const dateString = currentDate.toISOString().split('T')[0];
    const dayEvents = getEventsForDate(dateString);
    
    const timeSlots = [];
    for (let hour = 8; hour < 20; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return (
      <div className="space-y-4">
        {/* Day Navigation */}
        <NavigationHeader 
          title={formatDate(currentDate)}
        />

        {/* Day Schedule */}
        <div className="space-y-1">
          {timeSlots.map((time) => {
            const timeEvents = dayEvents.filter(event => event.time === time);
            
            return (
              <div key={time} className="flex">
                <div className="w-20 p-2 text-xs text-gray-500 border-r border-gray-200">
                  {formatTime(time)}
                </div>
                <div
                  className="flex-1 min-h-[60px] p-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleTimeSlotClick(dateString, time)}
                >
                  {timeEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`p-2 rounded border mb-2 ${getEventColor(event)}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewEvent?.(event);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getEventIcon(event)}
                          <span className="font-medium">{event.title}</span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                      {event.customer && (
                        <p className="text-sm text-gray-600 mt-1">{event.customer}</p>
                      )}
                      {event.description && (
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      )}
                      {event.endTime && (
                        <p className="text-xs text-gray-500 mt-1">
                          Until {formatTime(event.endTime)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* All Day Events */}
        {dayEvents.filter(event => !event.time).length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">All Day</h4>
            <div className="space-y-2">
              {dayEvents.filter(event => !event.time).map((event) => (
                <div
                  key={event.id}
                  className={`p-2 rounded border ${getEventColor(event)}`}
                  onClick={() => onViewEvent?.(event)}
                >
                  <div className="flex items-center space-x-2">
                    {getEventIcon(event)}
                    <span className="font-medium">{event.title}</span>
                  </div>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default Calendar;