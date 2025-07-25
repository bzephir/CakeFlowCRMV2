import React, { useState } from 'react';
import Header from '../components/Header';
import { 
  Upload, 
  X, 
  Calendar,
  Users,
  Palette,
  DollarSign,
  Camera
} from 'lucide-react';

const InquiryForm: React.FC = () => {
  const [formType, setFormType] = useState<'celebration' | 'wedding' | 'corporate'>('celebration');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    fulfillmentType: 'pickup' | 'delivery',
    pickupTime: '',
    deliveryTime: '',
    eventTime: '',
    occasion: '',
    services: [] as string[],
    guestCount: '',
    theme: '',
    colors: '',
    budget: '',
    cakeTasting: false,
    hearAboutUs: '',
    additionalNotes: ''
  });

  const occasions = {
    celebration: [
      'Anniversary', 'Baby Shower', 'Bachelor/Bachelorette', 'Bah Mitzvah',               'Baptism', 'Birthday', 'Bridal Shower', 'Christening', 'Communion',                 'Engagement', 'Farewell', 'Gender Reveal', 'Graduation', 'Holiday',                 'Promotion', 'Quinceanera', 'Religious', 'Retirement', 'Reunion', 'Sweet 16', 'Other'
    ],
    wedding: [
      'Wedding Reception', 'Rehearsal Dinner', 'Engagement Party', 'Bridal Shower',
      'Bachelor/Bachelorette Party', 'Wedding Shower', 'Other'
    ],
    corporate: [
      'Corporate Gifting', 'Company Anniversary', 'Product Launch', 'Holiday Party', 'Team Building', 'Thank You', 'Branding', 'Employee Appreciation'
      'Conference', 'Award Ceremony', 'Client Appreciation', 'Other'
    ]
  };

  const services = [
    'Custom Cake',
    'Cupcakes', 
    'Custom Cookies',
    'Cake Pops',
    'Mini Desserts/Dessert Tables',
    'Wedding Cake',
    'Tiered Cake',
    'Sheet Cake'
  ];

  const budgetRanges = [
    'Under $100',
    '$100 - $250',
    '$250 - $500', 
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    'Over $5,000'
  ];

  const referralSources = [
    'Instagram',
    'Google', 
    'Friend',
    'Facebook',
    'TikTok',
    'Bridal Show',
    'Wedding Planner',
    'Venue Recommendation',
    'Other'
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
    if (formData.fulfillmentType === 'pickup' && !formData.pickupTime) {
      newErrors.pickupTime = 'Pickup time is required';
    }
    if (formData.fulfillmentType === 'delivery' && !formData.deliveryTime) {
      newErrors.deliveryTime = 'Delivery time is required';
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { type: formType, ...formData });
    // Handle form submission here
    alert('Inquiry submitted successfully! We\'ll be in touch within 48 hours.');
  };

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Customer Inquiry Form" />
      
      <div className="p-6">
        {/* Form Type Selector */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
            {(['celebration', 'wedding', 'corporate'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFormType(type)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                  formType === type
                    ? 'bg-white text-coral-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden max-w-4xl">
          <div className="bg-gradient-to-r from-coral-400 to-pink-400 px-6 py-4">
            <h2 className="text-xl font-semibold text-white capitalize">
              {formType} Cake Inquiry Form
            </h2>
            <p className="text-coral-50 text-sm mt-1">
              Tell us about your special occasion and we'll create something amazing!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-coral-500" />
                Contact Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-aqua-500" />
                Event Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Order Date *
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    required
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fulfillment Type *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.fulfillmentType === 'pickup' 
                        ? 'border-mint-500 bg-mint-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="fulfillmentType"
                        value="pickup"
                        checked={formData.fulfillmentType === 'pickup'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <Package className="h-5 w-5 mr-3 text-mint-500" />
                      <div>
                        <div className="font-medium text-gray-900">Pickup</div>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.fulfillmentType === 'delivery' 
                        ? 'border-coral-500 bg-coral-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="fulfillmentType"
                        value="delivery"
                        checked={formData.fulfillmentType === 'delivery'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <Truck className="h-5 w-5 mr-3 text-coral-500" />
                      <div>
                        <div className="font-medium text-gray-900">Delivery</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                {formData.fulfillmentType === 'pickup' && (
                  <div>
                    <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Pickup Time *
                    </label>
                    <input
                      type="time"
                      id="pickupTime"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                )}
                
                {formData.fulfillmentType === 'delivery' && (
                  <div>
                    <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Time *
                    </label>
                    <input
                      type="time"
                      id="deliveryTime"
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Time
                  </label>
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Only required if this order is for an event</p>
                </div>
                <div>
                  <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                    What's the Occasion? *
                  </label>
                  <select
                    id="occasion"
                    name="occasion"
                    required
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  >
                    <option value="">Select an occasion</option>
                    {occasions[formType].map(occasion => (
                      <option key={occasion} value={occasion}>{occasion}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1">
                    Estimated Guest Count
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    min="1"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                What Service are you interested in? *
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {services.map(service => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Design Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Palette className="h-5 w-5 mr-2 text-mint-500" />
                Design Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Theme
                  </label>
                  <input
                    type="text"
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                    placeholder="e.g., Rustic, Modern, Vintage"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                <div>
                  <label htmlFor="colors" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Colors
                  </label>
                  <input
                    type="text"
                    id="colors"
                    name="colors"
                    value={formData.colors}
                    onChange={handleInputChange}
                    placeholder="e.g., Blush Pink, Gold, Navy"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>
            </div>

            {/* Budget & Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <DollarSign className="h-4 w-4 mr-1 text-pink-500" />
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="hearAboutUs" className="block text-sm font-medium text-gray-700 mb-1">
                  How did you hear about us?
                </label>
                <select
                  id="hearAboutUs"
                  name="hearAboutUs"
                  value={formData.hearAboutUs}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="">Select source</option>
                  {referralSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cake Tasting */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="cakeTasting"
                  checked={formData.cakeTasting}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Would you like to set up a cake tasting?
                </span>
              </label>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Camera className="h-4 w-4 mr-1 text-aqua-500" />
                Inspiration Photos
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-coral-400 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload photos that inspire your vision
                </p>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Choose Files
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  PNG, JPG, GIF up to 10MB each
                </p>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes or Special Requests
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={4}
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Tell us anything else you'd like us to know about your vision..."
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
              />
            </div>

            {/* Disclaimer */}
            <div className="bg-coral-50 border border-coral-200 rounded-lg p-4">
              <p className="text-sm text-coral-800">
                <strong>Please note:</strong> This inquiry form is for quote requests only and does not constitute placing an actual order. 
                We'll review your request and get back to you within 48 hours with availability and pricing information.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InquiryForm;