import React, { useState } from 'react';
import { Search, Plus, MapPin, Users, CheckCircle2, XCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { Venue, VenueFormData, OutsideFoodRules } from '../types/venue';
import { mockVenues } from '../data/mockVenues';
import VenueForm from './VenueForm';

interface VenueSelectorProps {
  selectedVenue: Venue | null;
  onVenueSelect: (venue: Venue) => void;
  onVenueAdd?: (venue: Venue) => void;
  className?: string;
  error?: string;
}

const VenueSelector: React.FC<VenueSelectorProps> = ({ 
  selectedVenue, 
  onVenueSelect, 
  onVenueAdd,
  className = '',
  error 
}) => {
  const [venues, setVenues] = useState<Venue[]>(mockVenues);
  const [venueSearch, setVenueSearch] = useState(selectedVenue?.name || '');
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);
  const [isVenueFormOpen, setIsVenueFormOpen] = useState(false);

  const getOutsideFoodRulesColor = (rules: OutsideFoodRules) => {
    switch (rules) {
      case OutsideFoodRules.ALLOWED: return 'text-mint-600';
      case OutsideFoodRules.NOT_ALLOWED: return 'text-red-600';
      case OutsideFoodRules.NOTES: return 'text-aqua-600';
      default: return 'text-gray-600';
    }
  };

  const getOutsideFoodRulesIcon = (rules: OutsideFoodRules) => {
    switch (rules) {
      case OutsideFoodRules.ALLOWED: return <CheckCircle2 className="h-3 w-3" />;
      case OutsideFoodRules.NOT_ALLOWED: return <XCircle className="h-3 w-3" />;
      case OutsideFoodRules.NOTES: return <AlertCircle className="h-3 w-3" />;
      default: return <AlertCircle className="h-3 w-3" />;
    }
  };

  const handleVenueSelect = (venue: Venue) => {
    onVenueSelect(venue);
    setVenueSearch(venue.name);
    setShowVenueDropdown(false);
  };

  const handleVenueFormSubmit = (venueData: VenueFormData) => {
    const newVenue: Venue = {
      ...venueData,
      id: `V-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin'
    };
    
    setVenues(prev => [...prev, newVenue]);
    handleVenueSelect(newVenue);
    
    if (onVenueAdd) {
      onVenueAdd(newVenue);
    }
    
    alert(`Venue "${venueData.name}" added successfully!`);
  };

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(venueSearch.toLowerCase()) ||
    venue.address1.toLowerCase().includes(venueSearch.toLowerCase()) ||
    venue.city.toLowerCase().includes(venueSearch.toLowerCase()) ||
    venue.tags.some(tag => tag.toLowerCase().includes(venueSearch.toLowerCase()))
  );

  return (
    <>
      <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Venue
        </label>
        <div className="relative">
          <input
            type="text"
            value={venueSearch}
            onChange={(e) => {
              setVenueSearch(e.target.value);
              setShowVenueDropdown(true);
              if (!e.target.value) {
                onVenueSelect(null as any);
              }
            }}
            onFocus={() => setShowVenueDropdown(true)}
            placeholder="Search venues or add new..."
            className={`block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
              error
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
            }`}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        {showVenueDropdown && (
          <div className="absolute z-20 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
            {filteredVenues.length > 0 && (
              <>
                {filteredVenues.map((venue) => (
                  <div
                    key={venue.id}
                    onClick={() => handleVenueSelect(venue)}
                    className="cursor-pointer select-none relative py-3 pl-3 pr-9 hover:bg-gray-50"
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 text-coral-500 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{venue.name}</div>
                        <div className="text-sm text-gray-500">
                          {venue.address1}, {venue.city}, {venue.state}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            {venue.capacity} guests
                          </div>
                          <div className={`flex items-center text-xs ${getOutsideFoodRulesColor(venue.outsideFoodRules)}`}>
                            {getOutsideFoodRulesIcon(venue.outsideFoodRules)}
                            <span className="ml-1">Outside food {venue.outsideFoodRules.replace('_', ' ')}</span>
                          </div>
                          {venue.coiRequired && (
                            <div className="flex items-center text-xs text-mint-600">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              COI Required
                            </div>
                          )}
                        </div>
                        {venue.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {venue.tags.slice(0, 4).map((tag) => (
                              <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                                {tag}
                              </span>
                            ))}
                            {venue.tags.length > 4 && (
                              <span className="text-xs text-gray-500">+{venue.tags.length - 4}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200"></div>
              </>
            )}
            <div
              onClick={() => setIsVenueFormOpen(true)}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50 border-t border-gray-200"
            >
              <div className="flex items-center">
                <Plus className="h-4 w-4 mr-2 text-coral-500" />
                <span className="text-coral-600 font-medium">Add New Venue</span>
              </div>
            </div>
          </div>
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}

        {/* Selected Venue Display */}
        {selectedVenue && (
          <div className="mt-3 bg-coral-50 rounded-lg p-3 border border-coral-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-coral-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{selectedVenue.name}</p>
                  <p className="text-xs text-gray-600">
                    {selectedVenue.address1}, {selectedVenue.city}, {selectedVenue.state}
                  </p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-500">
                      <Users className="h-3 w-3 inline mr-1" />
                      {selectedVenue.capacity} capacity
                    </span>
                    {selectedVenue.coiRequired && (
                      <span className="text-xs text-mint-600">
                        <CheckCircle2 className="h-3 w-3 inline mr-1" />
                        COI Required
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  onVenueSelect(null as any);
                  setVenueSearch('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Venue Form Modal */}
      <VenueForm
        isOpen={isVenueFormOpen}
        onClose={() => setIsVenueFormOpen(false)}
        onSubmit={handleVenueFormSubmit}
      />
    </>
  );
};

export default VenueSelector;