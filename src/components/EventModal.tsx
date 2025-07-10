import React, { useState } from 'react';
import { X, User, CheckSquare, Calendar, Clock, MapPin, FileText, Ban } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: EventFormData) => void;
  initialDate?: string;
  initialTime?: string;
}

interface EventFormData {
  title: string;
  type: 'appointment' | 'task' |'blocked';
  date: string;
  time: string;
  endTime: string;
  customer: string;
  location: string;
  description: string;
  allDay: boolean;
}

const EventModal: React.FC<EventModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  initialDate = '',
  initialTime = ''
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    type: 'appointment',
    date: initialDate,
    time: initialTime,
    endTime: '',
    customer: '',
    location: '',
    description: '',
    allDay: false
  });

  const [errors, setErrors] = useState<Partial<EventFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name as keyof EventFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EventFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    if (!formData.allDay && !formData.time) {
      newErrors.time = 'Time is required for scheduled events';
    }
    if (formData.time && formData.endTime && formData.time >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        title: '',
        type: 'appointment',
        date: '',
        time: '',
        endTime: '',
        customer: '',
        location: '',
        description: '',
        allDay: false
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      type: 'appointment',
      date: '',
      time: '',
      endTime: '',
      customer: '',
      location: '',
      description: '',
      allDay: false
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Event</h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <div className="grid grid-cols-3 gap-3">
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.type === 'appointment' 
                  ? 'border-coral-500 bg-coral-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="appointment"
                  checked={formData.type === 'appointment'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <User className="h-5 w-5 mr-3 text-coral-500" />
                <div>
                  <div className="font-medium text-gray-900">Appointment</div>
                </div>
              </label>
              
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.type === 'task' 
                  ? 'border-aqua-500 bg-aqua-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="task"
                  checked={formData.type === 'task'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <CheckSquare className="h-5 w-5 mr-3 text-aqua-500" />
                <div>
                  <div className="font-medium text-gray-900">Task</div>
                </div>
              </label>
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                formData.type === 'blocked' 
                  ? 'border-gray-500 bg-gray-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="type"
                  value="blocked"
                  checked={formData.type === 'blocked'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Ban className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Blocked</div>
                </div>
              </label>
            </div>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title*
              
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                errors.title
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-aqua-500 focus:border-aqua-500'
              }`}
             /* placeholder={formData.type === 'task' ? "Enter task title" : "Enter event title"}*/
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Date and Time */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-aqua-500" />
              Date & Time
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.date
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-aqua-500 focus:border-aqua-500'
                  }`}
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="allDay"
                    checked={formData.allDay}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-aqua-600 focus:ring-aqua-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">All day event</span>
                </label>
              </div>

              {!formData.allDay && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.time
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-aqua-500 focus:border-aqua-500'
                      }`}
                    />
                    {errors.time && (
                      <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.endTime
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-aqua-500 focus:border-aqua-500'
                      }`}
                    />
                    {errors.endTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer and Location */}
          {formData.type === 'appointment' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
                  Customer
                </label>
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  value={formData.customer}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 transition-colors"
                  placeholder="Customer name"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 transition-colors"
                  placeholder="Event location"
                />
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FileText className="h-4 w-4 mr-1 text-gray-400" /> 
              {formData.type === 'task' ? 'Task' : 'Description'}
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 transition-colors"
              placeholder={formData.type === 'task' ? "Add task details..." : "Add notes or details about this event..."}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all shadow-sm"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;