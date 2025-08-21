import React, { useState, useEffect } from 'react';
import { X, MapPin, User, Phone, Mail, Users, FileText, Tag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Venue, VenueFormData, OutsideFoodRules } from '../types/venue';
import { venueTagOptions } from '../data/mockVenues';

interface VenueFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (venueData: VenueFormData) => void;
  venue?: Venue | null;
}

const VenueForm: React.FC<VenueFormProps> = ({ isOpen, onClose, onSubmit, venue }) => {
  const [formData, setFormData] = useState<VenueFormData>({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    capacity: 50,
    deliveryNotes: '',
    coiRequired: false,
    outsideFoodRules: OutsideFoodRules.ALLOWED,
    outsideFoodNotes: '',
    tags: [],
    additionalNotes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');
  const [showTagDropdown, setShowTagDropdown] = useState(false);

  useEffect(() => {
    if (venue) {
      setFormData({
        name: venue.name,
        address1: venue.address1,
        address2: venue.address2 || '',
        city: venue.city,
        state: venue.state,
        zip: venue.zip,
        contactName: venue.contactName,
        contactEmail: venue.contactEmail,
        contactPhone: venue.contactPhone,
        capacity: venue.capacity,
        deliveryNotes: venue.deliveryNotes,
        coiRequired: venue.coiRequired,
        outsideFoodRules: venue.outsideFoodRules,
        outsideFoodNotes: venue.outsideFoodNotes || '',
        tags: venue.tags,
        additionalNotes: venue.additionalNotes
      });
    } else {
      setFormData({
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        capacity: 50,
        deliveryNotes: '',
        coiRequired: false,
        outsideFoodRules: OutsideFoodRules.ALLOWED,
        outsideFoodNotes: '',
        tags: [],
        additionalNotes: ''
      });
    }
    setErrors({});
  }, [venue, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (name === 'capacity') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
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

  const handleTagAdd = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setTagInput('');
    setShowTagDropdown(false);
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCustomTagAdd = () => {
    const customTag = tagInput.trim().toLowerCase();
    if (customTag && !formData.tags.includes(customTag)) {
      handleTagAdd(customTag);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Venue name is required';
    }
    if (!formData.address1.trim()) {
      newErrors.address1 = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = 'Contact name is required';
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }
    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = 'Contact phone is required';
    }
    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity = 'Capacity must be at least 1';
    }
    if (formData.outsideFoodRules === OutsideFoodRules.NOTES && !formData.outsideFoodNotes.trim()) {
      newErrors.outsideFoodNotes = 'Please provide details about outside food rules';
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
      name: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      capacity: 50,
      deliveryNotes: '',
      coiRequired: false,
      outsideFoodRules: OutsideFoodRules.ALLOWED,
      outsideFoodNotes: '',
      tags: [],
      additionalNotes: ''
    });
    setErrors({});
    setTagInput('');
    onClose();
  };

  const filteredTagOptions = venueTagOptions.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) && 
    !formData.tags.includes(tag)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {venue ? 'Edit Venue' : 'Add New Venue'}
              </h2>
              <p className="text-sm text-gray-500">
                {venue ? 'Update venue information' : 'Create a new venue profile'}
              </p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-coral-500" />
              Venue Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Venue Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                  placeholder="Enter venue name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="capacity"
                    name="capacity"
                    min="1"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.capacity
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                    placeholder="Maximum guests"
                  />
                </div>
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate of Insurance Required
                </label>
                <div className="flex items-center space-x-6 mt-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="coiRequired"
                      checked={formData.coiRequired}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">COI Required</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-aqua-500" />
              Address
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1 *
                </label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.address1
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                  placeholder="Street address"
                />
                {errors.address1 && (
                  <p className="mt-1 text-sm text-red-600">{errors.address1}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="Suite, floor, etc. (optional)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.city
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                    placeholder="City"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.state
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                    placeholder="State"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.zip
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                    placeholder="ZIP"
                  />
                  {errors.zip && (
                    <p className="mt-1 text-sm text-red-600">{errors.zip}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-mint-500" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.contactName
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                  placeholder="Contact person name"
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.contactEmail
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                    placeholder="contact@venue.com"
                  />
                </div>
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.contactPhone
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {errors.contactPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Venue Rules & Requirements */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-pink-500" />
              Rules & Requirements
            </h3>
            
            <div className="space-y-6">
              {/* Outside Food Rules */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Outside Food Rules *
                </label>
                <div className="space-y-3">
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.outsideFoodRules === OutsideFoodRules.ALLOWED 
                      ? 'border-mint-500 bg-mint-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="outsideFoodRules"
                      value={OutsideFoodRules.ALLOWED}
                      checked={formData.outsideFoodRules === OutsideFoodRules.ALLOWED}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <CheckCircle2 className="h-5 w-5 mr-3 text-mint-500" />
                    <div>
                      <div className="font-medium text-gray-900">Allowed</div>
                      <div className="text-sm text-gray-600">Outside catering is permitted</div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.outsideFoodRules === OutsideFoodRules.NOT_ALLOWED 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="outsideFoodRules"
                      value={OutsideFoodRules.NOT_ALLOWED}
                      checked={formData.outsideFoodRules === OutsideFoodRules.NOT_ALLOWED}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <X className="h-5 w-5 mr-3 text-red-500" />
                    <div>
                      <div className="font-medium text-gray-900">Not Allowed</div>
                      <div className="text-sm text-gray-600">Outside catering is prohibited</div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    formData.outsideFoodRules === OutsideFoodRules.NOTES 
                      ? 'border-aqua-500 bg-aqua-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="outsideFoodRules"
                      value={OutsideFoodRules.NOTES}
                      checked={formData.outsideFoodRules === OutsideFoodRules.NOTES}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <AlertCircle className="h-5 w-5 mr-3 text-aqua-500" />
                    <div>
                      <div className="font-medium text-gray-900">Special Rules</div>
                      <div className="text-sm text-gray-600">Outside catering with restrictions</div>
                    </div>
                  </label>
                </div>

                {formData.outsideFoodRules === OutsideFoodRules.NOTES && (
                  <div className="mt-3">
                    <label htmlFor="outsideFoodNotes" className="block text-sm font-medium text-gray-700 mb-1">
                      Outside Food Rules Details *
                    </label>
                    <textarea
                      id="outsideFoodNotes"
                      name="outsideFoodNotes"
                      rows={3}
                      value={formData.outsideFoodNotes}
                      onChange={handleInputChange}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.outsideFoodNotes
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                      placeholder="Describe the specific rules and restrictions for outside catering..."
                    />
                    {errors.outsideFoodNotes && (
                      <p className="mt-1 text-sm text-red-600">{errors.outsideFoodNotes}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Delivery Notes */}
              <div>
                <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Notes
                </label>
                <textarea
                  id="deliveryNotes"
                  name="deliveryNotes"
                  rows={3}
                  value={formData.deliveryNotes}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="Special delivery instructions, loading dock info, access requirements, etc."
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Tag className="h-5 w-5 mr-2 text-aqua-500" />
              Tags & Categories
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue Tags
              </label>
              
              {/* Selected Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-coral-100 text-coral-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="ml-2 text-coral-600 hover:text-coral-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Tag Input */}
              <div className="relative">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowTagDropdown(true);
                  }}
                  onFocus={() => setShowTagDropdown(true)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCustomTagAdd();
                    }
                  }}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="Type to search tags or add custom tag..."
                />
                
                {showTagDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                    {filteredTagOptions.length > 0 && (
                      <>
                        {filteredTagOptions.map((tag) => (
                          <div
                            key={tag}
                            onClick={() => handleTagAdd(tag)}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                          >
                            <span className="font-medium text-gray-900">{tag}</span>
                          </div>
                        ))}
                        <div className="border-t border-gray-200"></div>
                      </>
                    )}
                    {tagInput.trim() && (
                      <div
                        onClick={handleCustomTagAdd}
                        className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 border-t border-gray-200"
                      >
                        <span className="text-coral-600 font-medium">+ Add "{tagInput.trim()}"</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <p className="mt-1 text-xs text-gray-500">
                Press Enter to add custom tags, or select from suggested options
              </p>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              rows={4}
              value={formData.additionalNotes}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
              placeholder="Any additional information about the venue, special requirements, or notes for staff..."
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
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all shadow-sm"
            >
              {venue ? 'Update Venue' : 'Add Venue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VenueForm;