import React, { useState } from 'react';
import Calendar from './Calendar';
import { Calendar as CalendarIcon, Grid, List, Clock } from 'lucide-react';

interface CalendarWidgetProps {
  onCreateEvent?: (date: string, time?: string) => void;
  onViewEvent?: (event: any) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ onCreateEvent, onViewEvent }) => {
  const [view, setView] = useState<'overview' | 'month' | 'week'>('overview');

  const viewOptions = [
    { id: 'overview', label: 'Overview', icon: List },
    { id: 'month', label: 'Month', icon: Grid },
    { id: 'week', label: 'Week', icon: Clock }
  ];

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="p-6">
        {/* Widget Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
              <p className="text-sm text-gray-500">Upcoming appointments and tasks</p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
          {viewOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setView(option.id as any)}
              className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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

        {/* Calendar Content */}
        <Calendar
          view={view}
          isWidget={true}
          onCreateEvent={onCreateEvent}
          onViewEvent={onViewEvent}
        />
      </div>
    </div>
  );
};

export default CalendarWidget;