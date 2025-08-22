import React, { useState } from 'react';
import { X, MessageSquare, User, Calendar, AlertCircle, Search, ChevronDown } from 'lucide-react';
import { CommunicationType, Priority, CommunicationFormData } from '../types/communication';

interface CommunicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CommunicationFormData) => void;
}

const CommunicationForm: React.FC<CommunicationFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CommunicationFormData>({
    type: CommunicationType.NOTE,
    title: '',
    content: '',
    priority: Priority.NORMAL,
    isPinned: false,
    customerId: '',
    orderId: '',
    quoteId: '',
    invoiceId: '',
    venueId: '',
    followUpRequired: false,
    followUpDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');

  // Mock data for dropdowns
  const customers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com' },
    { id: '2', name: 'Mike Chen', email: 'mike@email.com' },
    { id: '3', name: 'Emma Davis', email: 'emma@email.com' },
    { id: '4', name: 'James Wilson', email: 'james@email.com' },
    { id: '5', name: 'Lisa Park', email: 'lisa@email.com' }
  ];

  const orders = [
    { id: 'O-202501-0001', customer: 'Sarah Johnson' },
    { id: 'O-202501-0002', customer: 'Mike Chen' },
    { id: 'O-202501-0003', customer: 'Emma Davis' }
  ];

  const quotes = [
    { id: 'Q-202501-0001', customer: 'Sarah Johnson' },
    { id: 'Q-202501-0002', customer: 'Lisa Park' },
    { id: 'Q-202501-0003', customer: 'Emma Davis' }
  ];

  const venues = [
    { id: 'V-001', name: 'Grand Hotel Ballroom' },
    { id: 'V-002', name: 'Riverside Gardens' },
    { id: 'V-003', name: 'Downtown Conference Center' }
  ];

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
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCustomerSelect = (customerId: string, customerName: string) => {
    setFormData(prev => ({
      ...prev,
      customerId
    }));
    setCustomerSearch(customerName);
    setShowCustomerDropdown(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (formData.followUpRequired && !formData.followUpDate) {
      newErrors.followUpDate = 'Follow-up date is required when follow-up is enabled';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      type: CommunicationType.NOTE,
      title: '',
      content: '',
      priority: Priority.NORMAL,
      isPinned: false,
      customerId: '',
      orderId: '',
      quoteId: '',
      invoiceId: '',
      venueId: '',
      followUpRequired: false,
      followUpDate: '',
    });
    setErrors({});
    setCustomerSearch('');
    onClose();
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add Communication Entry</h2>
              <p className="text-sm text-gray-500">Create a new communication record or announcement</p>
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
          {/* Communication Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Communication Type *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.values(CommunicationType).map((type) => (
                <label key={type} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                  formData.type === type 
                    ? 'border-coral-500 bg-coral-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={formData.type === type}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center w-full">
                    <div className="font-medium text-gray-900 text-xs capitalize">
                      {type.replace('_', ' ')}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Title and Content */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
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
                    : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                }`}
                placeholder="Enter a descriptive title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                rows={4}
                value={formData.content}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                  errors.content
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                }`}
                placeholder="Enter the communication content or message"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content}</p>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
              >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.NORMAL}>Normal</option>
                <option value={Priority.HIGH}>High</option>
                <option value={Priority.URGENT}>Urgent</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isPinned"
                  checked={formData.isPinned}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Pin Message</span>
              </label>
            </div>
          </div>

          {/* Linked Entities */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-aqua-500" />
              Link to Records (Optional)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customerSearch}
                    onChange={(e) => {
                      setCustomerSearch(e.target.value);
                      setShowCustomerDropdown(true);
                    }}
                    onFocus={() => setShowCustomerDropdown(true)}
                    placeholder="Search customers..."
                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  
                  {showCustomerDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer) => (
                          <div
                            key={customer.id}
                            onClick={() => handleCustomerSelect(customer.id, customer.name)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{customer.name}</span>
                              <span className="text-xs text-gray-500">{customer.email}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-2 px-3 text-sm text-gray-500">No customers found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Selection */}
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <select
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Select order (optional)</option>
                  {orders.map(order => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {order.customer}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quote Selection */}
              <div>
                <label htmlFor="quoteId" className="block text-sm font-medium text-gray-700 mb-1">
                  Quote
                </label>
                <select
                  id="quoteId"
                  name="quoteId"
                  value={formData.quoteId}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Select quote (optional)</option>
                  {quotes.map(quote => (
                    <option key={quote.id} value={quote.id}>
                      {quote.id} - {quote.customer}
                    </option>
                  ))}
                </select>
              </div>

              {/* Venue Selection */}
              <div>
                <label htmlFor="venueId" className="block text-sm font-medium text-gray-700 mb-1">
                  Venue
                </label>
                <select
                  id="venueId"
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Select venue (optional)</option>
                  {venues.map(venue => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Follow-up */}
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="followUpRequired"
                  checked={formData.followUpRequired}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Follow-up Required</span>
              </label>
            </div>

            {formData.followUpRequired && (
              <div>
                <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up Date *
                </label>
                <input
                  type="date"
                  id="followUpDate"
                  name="followUpDate"
                  value={formData.followUpDate}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.followUpDate
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                />
                {errors.followUpDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.followUpDate}</p>
                )}
              </div>
            )}
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
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all shadow-sm"
            >
              Add Communication
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationForm;