import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VenueForm from '../components/VenueForm';
import { mockVenues, venueTagOptions } from '../data/mockVenues';
import { Venue, VenueFormData, OutsideFoodRules } from '../types/venue';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MapPin,
  Phone,
  Mail,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Tag,
  Building2,
  Trash2,
  Copy,
  ExternalLink,
  FileText
} from 'lucide-react';

const Venues: React.FC = () => {
  const navigate = useNavigate();
  const [venues, setVenues] = useState<Venue[]>(mockVenues);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [coiFilter, setCoiFilter] = useState('all');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [expandedVenueId, setExpandedVenueId] = useState<string | null>(null);

  const allTags = [...new Set(venues.flatMap(venue => venue.tags))];

  const getOutsideFoodRulesColor = (rules: OutsideFoodRules) => {
    switch (rules) {
      case OutsideFoodRules.ALLOWED: return 'bg-mint-100 text-mint-800';
      case OutsideFoodRules.NOT_ALLOWED: return 'bg-red-100 text-red-800';
      case OutsideFoodRules.NOTES: return 'bg-aqua-100 text-aqua-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutsideFoodRulesIcon = (rules: OutsideFoodRules) => {
    switch (rules) {
      case OutsideFoodRules.ALLOWED: return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case OutsideFoodRules.NOT_ALLOWED: return <XCircle className="h-4 w-4 mr-1" />;
      case OutsideFoodRules.NOTES: return <AlertCircle className="h-4 w-4 mr-1" />;
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };

  const getOutsideFoodRulesText = (rules: OutsideFoodRules) => {
    switch (rules) {
      case OutsideFoodRules.ALLOWED: return 'Allowed';
      case OutsideFoodRules.NOT_ALLOWED: return 'Not Allowed';
      case OutsideFoodRules.NOTES: return 'Special Rules';
      default: return 'Unknown';
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-coral-100 text-coral-800',
      'bg-aqua-100 text-aqua-800',
      'bg-mint-100 text-mint-800',
      'bg-pink-100 text-pink-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800'
    ];
    const index = tag.length % colors.length;
    return colors[index];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleAddVenue = () => {
    setEditingVenue(null);
    setIsFormOpen(true);
  };

  const handleEditVenue = (venue: Venue) => {
    setEditingVenue(venue);
    setIsFormOpen(true);
  };

  const handleDeleteVenue = (venueId: string) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      setVenues(prev => prev.filter(venue => venue.id !== venueId));
      alert('Venue deleted successfully!');
    }
  };

  const handleDuplicateVenue = (venue: Venue) => {
    const duplicatedVenue: Venue = {
      ...venue,
      id: `V-${Date.now()}`,
      name: `${venue.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setVenues(prev => [...prev, duplicatedVenue]);
    alert('Venue duplicated successfully!');
  };

  const handleFormSubmit = (venueData: VenueFormData) => {
    if (editingVenue) {
      // Update existing venue
      const updatedVenue: Venue = {
        ...editingVenue,
        ...venueData,
        updatedAt: new Date().toISOString()
      };
      setVenues(prev => prev.map(venue => 
        venue.id === editingVenue.id ? updatedVenue : venue
      ));
      alert(`Venue "${venueData.name}" updated successfully!`);
    } else {
      // Add new venue
      const newVenue: Venue = {
        ...venueData,
        id: `V-${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin'
      };
      setVenues(prev => [...prev, newVenue]);
      alert(`Venue "${venueData.name}" added successfully!`);
    }
    setEditingVenue(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingVenue(null);
  };

  const handlePreviewToggle = (venueId: string) => {
    setExpandedVenueId(expandedVenueId === venueId ? null : venueId);
  };

  const handleViewVenue = (venueId: string) => {
    navigate(`/venues/${venueId}`);
  };

  // Filter venues based on search term and filters
  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.address1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesTag = tagFilter === 'all' || venue.tags.includes(tagFilter);
    const matchesCoi = coiFilter === 'all' || 
                      (coiFilter === 'required' && venue.coiRequired) ||
                      (coiFilter === 'not-required' && !venue.coiRequired);
    
    const matchesCapacity = capacityFilter === 'all' ||
                           (capacityFilter === 'small' && venue.capacity <= 50) ||
                           (capacityFilter === 'medium' && venue.capacity > 50 && venue.capacity <= 150) ||
                           (capacityFilter === 'large' && venue.capacity > 150);
    
    return matchesSearch && matchesTag && matchesCoi && matchesCapacity;
  });

  return (
    <div className="p-6">
      <Header title="Venues" icon={Building2} />
      <div className="p-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={coiFilter}
                onChange={(e) => setCoiFilter(e.target.value)}
                className="block w-full sm:w-40 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All COI</option>
                <option value="required">COI Required</option>
                <option value="not-required">COI Not Required</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
                className="block w-full sm:w-36 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Sizes</option>
                <option value="small">Small (≤50)</option>
                <option value="medium">Medium (51-150)</option>
                <option value="large">Large (150+)</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleAddVenue}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Venue
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Venues</p>
                <p className="text-lg font-semibold text-gray-900">{venues.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">COI Required</p>
                <p className="text-lg font-semibold text-gray-900">
                  {venues.filter(v => v.coiRequired).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg Capacity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {Math.round(venues.reduce((sum, v) => sum + v.capacity, 0) / venues.length)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Tag className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Unique Tags</p>
                <p className="text-lg font-semibold text-gray-900">{allTags.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Venues Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Venue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVenues.map((venue) => (
                  <React.Fragment key={venue.id}>
                    {/* Main Venue Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-4 w-4 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{venue.name}</div>
                          </div>
                        </div>
                      </td>
                      <td> <div className="text-sm text-gray-500">
                              {venue.address1}
                              {venue.address2 && `, ${venue.address2}`}
                            </div>
                            <div className="text-sm text-gray-500">
                              {venue.city}, {venue.state} {venue.zip}
                            </div></td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={() => handlePreviewToggle(venue.id)}
                            className="text-aqua-600 hover:text-aqua-900 transition-colors"
                            title="Toggle Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleViewVenue(venue.id)}
                            className="text-coral-600 hover:text-coral-900 transition-colors"
                            title="View Full Record"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleEditVenue(venue)}
                            className="text-mint-600 hover:text-mint-900 transition-colors"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDuplicateVenue(venue)}
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                            title="Duplicate"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteVenue(venue.id)}
                            className="text-pink-600 hover:text-pink-900 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {expandedVenueId === venue.id && (
                      <tr>
                        <td colSpan={2} className="px-6 py-0">
                          <div className="bg-gray-50 border-l-4 border-coral-400 rounded-lg p-6 my-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Contact & Venue Details */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                  <User className="h-4 w-4 mr-2 text-coral-500" />
                                  Contact & Venue Details
                                </h4>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Contact Person</p>
                                    <p className="text-sm text-gray-600">{venue.contactName}</p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Email</p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                      <Mail className="h-3 w-3 mr-1" />
                                      {venue.contactEmail}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Phone</p>
                                    <p className="text-sm text-gray-600 flex items-center">
                                      <Phone className="h-3 w-3 mr-1" />
                                      {venue.contactPhone}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Full Address</p>
                                    <p className="text-sm text-gray-600">
                                      {venue.address1}
                                      {venue.address2 && <><br />{venue.address2}</>}
                                      <br />
                                      {venue.city}, {venue.state} {venue.zip}
                                    </p>
                                  </div>
                                  
                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Capacity</p>
                                    <p className="text-sm text-gray-600">{venue.capacity} guests maximum</p>
                                  </div>

                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Certificate of Insurance</p>
                                    <p className="text-sm text-gray-600">
                                      {venue.coiRequired ? 'Required' : 'Not required'}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Outside Food Policy</p>
                                    <div className="flex items-center mt-1">
                                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOutsideFoodRulesColor(venue.outsideFoodRules)}`}>
                                        {getOutsideFoodRulesIcon(venue.outsideFoodRules)}
                                        {getOutsideFoodRulesText(venue.outsideFoodRules)}
                                      </span>
                                    </div>
                                    {venue.outsideFoodRules === OutsideFoodRules.NOTES && venue.outsideFoodNotes && (
                                      <p className="text-sm text-gray-600 mt-2 bg-white rounded p-2 border">
                                        {venue.outsideFoodNotes}
                                      </p>
                                    )}
                                  </div>

                                  {/* All Tags */}
                                  <div>
                                    <p className="text-xs font-medium text-gray-700 mb-2">All Tags</p>
                                    <div className="flex flex-wrap gap-1">
                                      {venue.tags.map((tag) => (
                                        <span key={tag} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTagColor(tag)}`}>
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Delivery & Notes */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-aqua-500" />
                                  Delivery & Notes
                                </h4>
                                <div className="space-y-3">
                                  {venue.deliveryNotes && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-700">Delivery Notes</p>
                                      <p className="text-sm text-gray-600 bg-white rounded p-2 border">
                                        {venue.deliveryNotes}
                                      </p>
                                    </div>
                                  )}

                                  {venue.additionalNotes && (
                                    <div>
                                      <p className="text-xs font-medium text-gray-700">Additional Notes</p>
                                      <p className="text-sm text-gray-600 bg-white rounded p-2 border">
                                        {venue.additionalNotes}
                                      </p>
                                    </div>
                                  )}

                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Created</p>
                                    <p className="text-sm text-gray-600">
                                      {formatDate(venue.createdAt)} by {venue.createdBy}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-xs font-medium text-gray-700">Last Updated</p>
                                    <p className="text-sm text-gray-600">{formatDate(venue.updatedAt)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredVenues.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">No venues found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || tagFilter !== 'all' || coiFilter !== 'all' || capacityFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first venue'
              }
            </div>
          </div>
        )}
      </div>

      {/* Venue Form Modal */}
      <VenueForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        venue={editingVenue}
      />
    </div>
  );
};

export default Venues;