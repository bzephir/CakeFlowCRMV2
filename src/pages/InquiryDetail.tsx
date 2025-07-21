import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInquiryContext } from '../context/InquiryContext';
import Header from '../components/Header';
import { formatTime } from '../utils/formatters';
import { 
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Clock,
  User,
  MessageSquare,
  CheckCircle2,
  XCircle,
  FileText,
  DollarSign,
  Send,
  Plus,
  Edit,
  Cake,
  Building2,
  Users,
  MapPin,
  Tag,
  AlertCircle,
  Palette,
  Package,
  FileCheck,
  Utensils,
  Truck,
  Briefcase,
  Eye
} from 'lucide-react';
import { Inquiry, InquiryAction } from '../types';
import { generateDocumentNumber } from '../utils/documentNumbering';

const InquiryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getInquiryById, updateInquiry, addAction } = useInquiryContext();
  
  const [inquiry, setInquiry] = useState<Inquiry | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  useEffect(() => {
    if (id) {
      const inquiryData = getInquiryById(id);
      setInquiry(inquiryData);
      setLoading(false);
    }
  }, [id, getInquiryById]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-coral-100 text-coral-800';
      case 'opened': return 'bg-aqua-100 text-aqua-800';
      case 'contacted': return 'bg-mint-100 text-mint-800';
      case 'quoted': return 'bg-pink-100 text-pink-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'declined': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'status_change': return <Tag className="h-4 w-4" />;
      case 'note_added': return <MessageSquare className="h-4 w-4" />;
      case 'email_sent': return <Mail className="h-4 w-4" />;
      case 'call_made': return <Phone className="h-4 w-4" />;
      case 'quote_sent': return <FileText className="h-4 w-4" />;
      case 'meeting_scheduled': return <Calendar className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'status_change': return 'text-coral-500';
      case 'note_added': return 'text-aqua-500';
      case 'email_sent': return 'text-mint-500';
      case 'call_made': return 'text-pink-500';
      case 'quote_sent': return 'text-purple-500';
      case 'meeting_scheduled': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const handleStatusChange = (newStatus: string) => {
    if (!inquiry) return;
    
    updateInquiry(inquiry.id, { status: newStatus as any });
    setInquiry({
      ...inquiry,
      status: newStatus as any,
      lastUpdated: new Date().toISOString()
    });
  };

  const handleAddNote = () => {
    if (!inquiry || !newNote.trim()) return;
    
    addAction(inquiry.id, {
      type: 'note_added',
      description: 'Added note',
      performedBy: 'admin',
      details: {
        notes: newNote
      }
    });
    
    // Refresh inquiry data
    const updatedInquiry = getInquiryById(inquiry.id);
    setInquiry(updatedInquiry);
    
    // Reset form
    setNewNote('');
    setShowAddNote(false);
  };

  const handleCreateQuote = () => {
    if (!inquiry) return;
    
    // Generate new quote number
    const quoteNumber = generateDocumentNumber('quote');
    
    // Add action for quote creation
    addAction(inquiry.id, {
      type: 'quote_sent',
      description: 'Created quote',
      performedBy: 'admin',
      details: {
        quoteId: quoteNumber
      }
    });
    
    // Update status if not already quoted or converted
    if (inquiry.status !== 'quoted' && inquiry.status !== 'converted') {
      updateInquiry(inquiry.id, { status: 'quoted' });
    }
    
    // Navigate to create quote page with customer info
    navigate('/quotes/new', { 
      state: { 
        quoteNumber,
        customerId: inquiry.id,
        customerName: `${inquiry.firstName} ${inquiry.lastName}`,
        customerEmail: inquiry.email,
        customerPhone: inquiry.phone,
        eventDate: inquiry.eventDate,
        eventType: inquiry.type
      } 
    });
  };

  const handleCreateOrder = () => {
    if (!inquiry) return;
    
    // Generate new order number
    const orderNumber = generateDocumentNumber('order');
    
    // Add action for order creation
    addAction(inquiry.id, {
      type: 'status_change',
      description: 'Converted to order',
      performedBy: 'admin',
      details: {
        previousStatus: inquiry.status,
        newStatus: 'converted'
      }
    });
    
    // Update status to converted
    updateInquiry(inquiry.id, { status: 'converted' });
    
    // Navigate to create order page with customer info
    navigate('/orders/new', { 
      state: { 
        orderNumber,
        customerId: inquiry.id,
        customerName: `${inquiry.firstName} ${inquiry.lastName}`,
        customerEmail: inquiry.email,
        customerPhone: inquiry.phone,
        eventDate: inquiry.eventDate,
        eventType: inquiry.type
      } 
    });
  };

  const handleSendEmail = () => {
    if (!inquiry) return;
    
    addAction(inquiry.id, {
      type: 'email_sent',
      description: 'Sent follow-up email',
      performedBy: 'admin',
      details: {
        emailSubject: `Re: ${inquiry.type.charAt(0).toUpperCase() + inquiry.type.slice(1)} Inquiry`
      }
    });
    
    // Update status if still new
    if (inquiry.status === 'new') {
      updateInquiry(inquiry.id, { status: 'contacted' });
    }
    
    // Refresh inquiry data
    const updatedInquiry = getInquiryById(inquiry.id);
    setInquiry(updatedInquiry);
    
    alert('Email functionality would be implemented here');
  };

  const renderWeddingDetails = (details: any) => (
    <div className="space-y-3">
      <div className="flex items-start">
        <Tag className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Occasion</p>
          <p className="text-sm text-gray-600 capitalize">{details.occasion || 'Not specified'}</p>
        </div>
      </div>
      <div className="flex items-start">
        <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Venue</p>
          <p className="text-sm text-gray-600">{details.venue || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <Users className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Wedding Size</p>
          <p className="text-sm text-gray-600 capitalize">{details.weddingSize || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <Cake className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Cake Style</p>
          <p className="text-sm text-gray-600">{details.cakeStyle || 'Not specified'}</p>
        </div>
      </div>
      
      {details.flavors && details.flavors.length > 0 && (
        <div className="flex items-start">
          <Utensils className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Flavors</p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {details.flavors.map((flavor: string, index: number) => (
                <li key={index}>{flavor}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {details.dietaryRestrictions && details.dietaryRestrictions.length > 0 && (
        <div className="flex items-start">
          <AlertCircle className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Dietary Restrictions</p>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              {details.dietaryRestrictions.map((restriction: string, index: number) => (
                <li key={index}>{restriction}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="flex items-start">
        <Truck className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Delivery & Setup</p>
          <p className="text-sm text-gray-600">{details.deliverySetup ? 'Required' : 'Not required'}</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <Utensils className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Tasting</p>
          <p className="text-sm text-gray-600">{details.tastingRequested ? 'Requested' : 'Not requested'}</p>
        </div>
      </div>
      
      {details.weddingPlanner && (
        <div className="flex items-start">
          <User className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Wedding Planner</p>
            <p className="text-sm text-gray-600">{details.weddingPlanner.name}</p>
            <p className="text-sm text-gray-600">{details.weddingPlanner.company}</p>
            <p className="text-sm text-gray-600">{details.weddingPlanner.contact}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderCelebrationDetails = (details: any) => (
    <div className="space-y-3">
      <div className="flex items-start">
        <Tag className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Occasion</p>
          <p className="text-sm text-gray-600">{details.occasion || 'Not specified'}</p>
        </div>
      </div>
      
      {details.theme && (
        <div className="flex items-start">
          <Palette className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Theme</p>
            <p className="text-sm text-gray-600">{details.theme}</p>
          </div>
        </div>
      )}
      
      {details.colors && (
        <div className="flex items-start">
          <Palette className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Colors</p>
            <p className="text-sm text-gray-600">{details.colors}</p>
          </div>
        </div>
      )}
      
      <div className="flex items-start">
        <Utensils className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Cake Tasting</p>
          <p className="text-sm text-gray-600">{details.cakeTasting ? 'Requested' : 'Not requested'}</p>
        </div>
      </div>
    </div>
  );

  const renderCorporateDetails = (details: any) => (
    <div className="space-y-3">
      <div className="flex items-start">
        <Building2 className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Company</p>
          <p className="text-sm text-gray-600">{details.companyName || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <Tag className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Occasion</p>
          <p className="text-sm text-gray-600">{details.occasion || 'Not specified'}</p>
        </div>
      </div>
      
      <div className="flex items-start">
        <Calendar className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Recurring</p>
          <p className="text-sm text-gray-600">
            {details.recurring ? `Yes (${details.frequency})` : 'No'}
          </p>
        </div>
      </div>
      
      <div className="flex items-start">
        <FileCheck className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Branding Required</p>
          <p className="text-sm text-gray-600">{details.brandingRequired ? 'Yes' : 'No'}</p>
        </div>
      </div>
      
      {details.deliveryAddress && (
        <div className="flex items-start">
          <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Delivery Address</p>
            <p className="text-sm text-gray-600">{details.deliveryAddress}</p>
          </div>
        </div>
      )}
      
      {details.contactPerson && (
        <div className="flex items-start">
          <User className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Contact Person</p>
            <p className="text-sm text-gray-600">{details.contactPerson.name}</p>
            <p className="text-sm text-gray-600">{details.contactPerson.title}, {details.contactPerson.department}</p>
          </div>
        </div>
      )}
      
      {details.approvalProcess && (
        <div className="flex items-start">
          <Briefcase className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Approval Process</p>
            <p className="text-sm text-gray-600">{details.approvalProcess}</p>
          </div>
        </div>
      )}
      
      {details.invoicingRequirements && (
        <div className="flex items-start">
          <FileText className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-900">Invoicing Requirements</p>
            <p className="text-sm text-gray-600">{details.invoicingRequirements}</p>
          </div>
        </div>
      )}
    </div>
  );

  const renderTypeSpecificDetails = () => {
    if (!inquiry) return null;
    
    switch (inquiry.type) {
      case 'wedding':
        return renderWeddingDetails(inquiry.details);
      case 'celebration':
        return renderCelebrationDetails(inquiry.details);
      case 'corporate':
        return renderCorporateDetails(inquiry.details);
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading inquiry details...</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-coral-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Inquiry Not Found</h2>
          <p className="text-gray-600 mb-4">The inquiry you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/inquiries')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Inquiries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Header title={`Inquiry ${inquiry.id}`} />
      
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/inquiries')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Inquiries
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Inquiry Header */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {inquiry.firstName} {inquiry.lastName}
                      </h2>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                          {inquiry.status}
                        </span>
                        <span className="text-sm text-gray-500 capitalize">{inquiry.type}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <a href={`mailto:${inquiry.email}`} className="hover:text-coral-600 transition-colors">
                            {inquiry.email}
                          </a>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <a href={`tel:${inquiry.phone}`} className="hover:text-coral-600 transition-colors">
                            {inquiry.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSendEmail}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </button>
                    <button
                      onClick={handleCreateQuote}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Create Quote
                    </button>
                    <button
                      onClick={handleCreateOrder}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      Create Order
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-coral-500" />
                  Event Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Event Date</p>
                        <p className="text-sm text-gray-600">{formatDate(inquiry.eventDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      {inquiry.fulfillmentType === 'pickup' ? (
                        <Package className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      ) : (
                        <Truck className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {inquiry.fulfillmentType === 'pickup' ? 'Pickup Time' : 'Delivery Time'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {inquiry.fulfillmentType === 'pickup' 
                            ? (inquiry.pickupTime ? formatTime(inquiry.pickupTime) : 'Not specified')
                            : (inquiry.deliveryTime ? formatTime(inquiry.deliveryTime) : 'Not specified')
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Event Time</p>
                        <p className="text-sm text-gray-600">{inquiry.eventTime ? formatTime(inquiry.eventTime) : 'Not applicable'}</p>
                      </div>
                    </div>
                    
                    {inquiry.guestCount && (
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Guest Count</p>
                          <p className="text-sm text-gray-600">{inquiry.guestCount} guests</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {inquiry.budget && (
                      <div className="flex items-start">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Budget</p>
                          <p className="text-sm text-gray-600">{inquiry.budget}</p>
                        </div>
                      </div>
                    )}
                    
                    {inquiry.hearAboutUs && (
                      <div className="flex items-start">
                        <MessageSquare className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Referral Source</p>
                          <p className="text-sm text-gray-600">{inquiry.hearAboutUs}</p>
                        </div>
                      </div>
                    )}
                    
                    {inquiry.details.services && (
                      <div className="flex items-start">
                        <Package className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Services Requested</p>
                          <ul className="text-sm text-gray-600 list-disc list-inside">
                            {(inquiry.details.services as string[]).map((service, index) => (
                              <li key={index}>{service}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Type-specific details */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3 capitalize">
                    {inquiry.type} Details
                  </h4>
                  {renderTypeSpecificDetails()}
                </div>
                
                {/* Additional Notes */}
                {inquiry.additionalNotes && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Notes</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      {inquiry.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-aqua-500" />
                    Activity Timeline
                  </h3>
                  <button
                    onClick={() => setShowAddNote(!showAddNote)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Note
                  </button>
                </div>
                
                {/* Add Note Form */}
                {showAddNote && (
                  <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add a Note
                    </label>
                    <textarea
                      rows={3}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter your note here..."
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                    />
                    <div className="mt-3 flex justify-end space-x-3">
                      <button
                        onClick={() => setShowAddNote(false)}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddNote}
                        className="px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                        disabled={!newNote.trim()}
                      >
                        Save Note
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Timeline */}
                <div className="flow-root">
                  <ul className="-mb-8">
                    {inquiry.actions.slice().reverse().map((action, actionIdx) => (
                      <li key={action.id}>
                        <div className="relative pb-8">
                          {actionIdx !== inquiry.actions.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActionColor(action.type)} bg-white`}>
                                {getActionIcon(action.type)}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-900">{action.description}</p>
                                
                                {action.type === 'note_added' && action.details?.notes && (
                                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {action.details.notes}
                                  </p>
                                )}
                                
                                {action.type === 'call_made' && action.details?.notes && (
                                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {action.details.notes}
                                  </p>
                                )}
                                
                                {action.type === 'meeting_scheduled' && action.details?.notes && (
                                  <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                    {action.details.notes}
                                  </p>
                                )}
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <div>{formatDateTime(action.performedAt)}</div>
                                <div className="text-xs">{action.performedBy}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleStatusChange('opened')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      inquiry.status === 'opened' 
                        ? 'border-aqua-500 bg-aqua-50 text-aqua-800' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    disabled={inquiry.status === 'opened'}
                  >
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      <span>Opened</span>
                    </div>
                    {inquiry.status === 'opened' && (
                      <CheckCircle2 className="h-4 w-4 text-aqua-500" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange('contacted')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      inquiry.status === 'contacted' 
                        ? 'border-mint-500 bg-mint-50 text-mint-800' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    disabled={inquiry.status === 'contacted'}
                  >
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>Contacted</span>
                    </div>
                    {inquiry.status === 'contacted' && (
                      <CheckCircle2 className="h-4 w-4 text-mint-500" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange('quoted')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      inquiry.status === 'quoted' 
                        ? 'border-pink-500 bg-pink-50 text-pink-800' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    disabled={inquiry.status === 'quoted'}
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Quoted</span>
                    </div>
                    {inquiry.status === 'quoted' && (
                      <CheckCircle2 className="h-4 w-4 text-pink-500" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange('converted')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      inquiry.status === 'converted' 
                        ? 'border-purple-500 bg-purple-50 text-purple-800' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    disabled={inquiry.status === 'converted'}
                  >
                    <div className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      <span>Converted</span>
                    </div>
                    {inquiry.status === 'converted' && (
                      <CheckCircle2 className="h-4 w-4 text-purple-500" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleStatusChange('declined')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      inquiry.status === 'declined' 
                        ? 'border-gray-500 bg-gray-50 text-gray-800' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    disabled={inquiry.status === 'declined'}
                  >
                    <div className="flex items-center">
                      <XCircle className="h-4 w-4 mr-2" />
                      <span>Declined</span>
                    </div>
                    {inquiry.status === 'declined' && (
                      <CheckCircle2 className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={handleSendEmail}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </button>
                  
                  <button
                    onClick={handleCreateQuote}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Create Quote
                  </button>
                  
                  <button
                    onClick={handleCreateOrder}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Create Order
                  </button>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Inquiry Details</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Inquiry ID:</span>
                    <span className="font-medium text-gray-900">{inquiry.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium text-gray-900">{formatDate(inquiry.submittedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium text-gray-900">{formatDate(inquiry.lastUpdated)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Assigned To:</span>
                    <span className="font-medium text-gray-900">{inquiry.assignedTo || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900 capitalize">{inquiry.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryDetail;