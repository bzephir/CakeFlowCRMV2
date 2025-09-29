import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import VenueForm from '../components/VenueForm';
import { mockVenues } from '../data/mockVenues';
import { Venue, VenueFormData, OutsideFoodRules } from '../types/venue';
import { 
  ArrowLeft,
  Edit,
  Trash2,
  Copy,
  MapPin,
  Phone,
  Mail,
  Users,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Tag,
  Building2,
  FileText,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';

const VenueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundVenue = mockVenues.find(v => v.id === id);
    setVenue(foundVenue || null);
    setLoading(false);
  }, [id]);

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
      case OutsideFoodRules.ALLOWED: return 'Outside Food Allowed';
      case OutsideFoodRules.NOT_ALLOWED: return 'Outside Food Not Allowed';
      case OutsideFoodRules.NOTES: return 'Outside Food - Special Rules';
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
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    setIsEditFormOpen(true);
  };

  const handleDelete = () => {
    if (!venue) return;
    
    if (window.confirm(`Are you sure you want to delete "${venue.name}"? This action cannot be undone.`)) {
      // In a real app, this would call an API to delete the venue
      console.log('Deleting venue:', venue.id);
      alert(`Venue "${venue.name}" has been deleted.`);
      navigate('/venues');
    }
  };

  const handleDuplicate = () => {
    if (!venue) return;
    
    // Navigate to venues page and trigger creation of duplicate
    navigate('/venues', { 
      state: { 
        duplicateVenue: {
          ...venue,
          name: `${venue.name} (Copy)`,
          id: undefined // Will get new ID when created
        }
      }
    });
  };

  const handleFormSubmit = (venueData: VenueFormData) => {
    if (!venue) return;
    
    // In a real app, this would update the venue via API
    const updatedVenue: Venue = {
      ...venue,
      ...venueData,
      updatedAt: new Date().toISOString()
    };
    
    setVenue(updatedVenue);
    alert(`Venue "${venueData.name}" updated successfully!`);
  };

  const handleUseInOrder = () => {
    if (!venue) return;
    navigate('/orders/new', { state: { selectedVenue: venue } });
  };

  const handleUseInQuote = () => {
    if (!venue) return;
    navigate('/quotes/new', { state: { selectedVenue: venue } });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading venue details...</p>
      </div>
    );
  }

  if (!venue) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 text-coral-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Venue Not Found</h2>
          <p className="text-gray-600 mb-4">The venue you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/venues')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Header title={venue.name} />
      
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/venues')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Venues
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Venue Header */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Building2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{venue.name}</h2>
                      <div className="flex items-start space-x-2 mb-3">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          {venue.address1}
                          {venue.address2 && <><br />{venue.address2}</>}
                          <br />
                          {venue.city}, {venue.state} {venue.zip}
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-400" />
                          <span className="font-medium">{venue.capacity}</span> capacity
                        </div>
                        <div className="flex items-center">
                          {venue.coiRequired ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 mr-1 text-mint-500" />
                              <span>COI Required</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 mr-1 text-gray-400" />
                              <span>No COI Required</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEdit}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={handleDuplicate}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicate
                    </button>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-coral-500" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Contact Person</p>
                        <p className="text-sm text-gray-600">{venue.contactName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Email</p>
                        <a 
                          href={`mailto:${venue.contactEmail}`}
                          className="text-sm text-coral-600 hover:text-coral-700 transition-colors"
                        >
                          {venue.contactEmail}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Phone</p>
                        <a 
                          href={`tel:${venue.contactPhone}`}
                          className="text-sm text-coral-600 hover:text-coral-700 transition-colors"
                        >
                          {venue.contactPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Full Address</p>
                        <div className="text-sm text-gray-600">
                          {venue.address1}
                          {venue.address2 && <><br />{venue.address2}</>}
                          <br />
                          {venue.city}, {venue.state} {venue.zip}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Capacity</p>
                        <p className="text-sm text-gray-600">{venue.capacity} guests maximum</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Policies */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-aqua-500" />
                  Venue Policies & Requirements
                </h3>
                
                <div className="space-y-6">
                  {/* COI Requirement */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {venue.coiRequired ? (
                        <CheckCircle2 className="h-5 w-5 text-mint-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Certificate of Insurance</p>
                      <p className="text-sm text-gray-600">
                        {venue.coiRequired 
                          ? 'Certificate of Insurance is required for events at this venue'
                          : 'No Certificate of Insurance required'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Outside Food Rules */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {getOutsideFoodRulesIcon(venue.outsideFoodRules)}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Outside Food Policy</p>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOutsideFoodRulesColor(venue.outsideFoodRules)}`}>
                          {getOutsideFoodRulesText(venue.outsideFoodRules)}
                        </span>
                      </div>
                      {venue.outsideFoodRules === OutsideFoodRules.NOTES && venue.outsideFoodNotes && (
                        <div className="mt-3 bg-aqua-50 rounded-lg p-3 border border-aqua-200">
                          <p className="text-sm text-aqua-800">{venue.outsideFoodNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Notes */}
                  {venue.deliveryNotes && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Delivery Instructions</p>
                        <div className="mt-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <p className="text-sm text-gray-700 whitespace-pre-line">{venue.deliveryNotes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags & Categories */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Tag className="h-5 w-5 mr-2 text-mint-500" />
                  Tags & Categories
                </h3>
                
                {venue.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {venue.tags.map((tag) => (
                      <span key={tag} className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No tags assigned</p>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            {venue.additionalNotes && (
              <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-pink-500" />
                    Additional Notes
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-700 whitespace-pre-line">{venue.additionalNotes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-aqua-500" />
                  Record Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Venue ID</p>
                      <p className="text-sm text-gray-600 font-mono">{venue.id}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-900">Created</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(venue.createdAt)}
                        <span className="text-gray-500"> by {venue.createdBy}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Updated</p>
                      <p className="text-sm text-gray-600">{formatDate(venue.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={handleUseInOrder}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Use in New Order
                  </button>
                  
                  <button
                    onClick={handleUseInQuote}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Use in New Quote
                  </button>
                  
                  <button
                    onClick={handleEdit}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Venue
                  </button>
                  
                  <button
                    onClick={handleDuplicate}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Venue
                  </button>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <button
                      onClick={handleDelete}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md shadow-sm text-red-700 bg-white hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Venue
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Summary */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Venue Summary</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-gray-900">{venue.capacity}</div>
                      <div className="text-sm text-gray-500">Maximum Capacity</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">COI Required:</span>
                      <span className={`text-sm font-medium ${venue.coiRequired ? 'text-mint-600' : 'text-gray-600'}`}>
                        {venue.coiRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Outside Food:</span>
                      <span className={`text-sm font-medium ${
                        venue.outsideFoodRules === OutsideFoodRules.ALLOWED ? 'text-mint-600' :
                        venue.outsideFoodRules === OutsideFoodRules.NOT_ALLOWED ? 'text-red-600' :
                        'text-aqua-600'
                      }`}>
                        {venue.outsideFoodRules === OutsideFoodRules.ALLOWED ? 'Allowed' :
                         venue.outsideFoodRules === OutsideFoodRules.NOT_ALLOWED ? 'Not Allowed' :
                         'Special Rules'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tags:</span>
                      <span className="text-sm font-medium text-gray-900">{venue.tags.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* External Links */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">External Links</h3>
                
                <div className="space-y-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(`${venue.address1}, ${venue.city}, ${venue.state} ${venue.zip}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Google Maps
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                  
                  <a
                    href={`mailto:${venue.contactEmail}?subject=Event Inquiry - ${venue.name}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      <VenueForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSubmit={handleFormSubmit}
        venue={venue}
      />
    </div>
  );
};

export default VenueDetail;