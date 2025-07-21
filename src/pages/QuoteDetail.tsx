import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { mockSampleQuoteDetail, mockSampleQuotesDetail } from '../data/mockData';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { 
  ArrowLeft,
  Edit,
  Copy,
  Mail,
  Download,
  Trash2,
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileText,
  DollarSign,
  Send,
  Package,
  Truck,
  MapPin,
  Users,
  MessageSquare,
  Calculator,
  Percent,
  Calendar,
  Tag,
  Utensils,
  Briefcase,
  FileCheck,
  Palette,
  Cake,
  Building2,
  User
} from 'lucide-react';

import {
  CelebrationInquiryDetails,
  WeddingInquiryDetails,
  CorporateInquiryDetails
} from '../types';

const QuoteDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const renderWeddingDetails = (details: WeddingInquiryDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Wedding Details Column */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Wedding Details</h4>
        <div className="space-y-3">
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
      </div>

      {/* Cake Details Column */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Cake Details</h4>
        <div className="space-y-3">
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
        </div>
      </div>
    </div>
  );

  const renderCelebrationDetails = (details: CelebrationInquiryDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Event Details Column */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Event Details</h4>
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
        </div>
      </div>

      {/* Cake Details Column */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Cake Details</h4>
        <div className="space-y-3">
          <div className="flex items-start">
            <Utensils className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-900">Cake Tasting</p>
              <p className="text-sm text-gray-600">{details.cakeTasting ? 'Requested' : 'Not requested'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCorporateDetails = (details: CorporateInquiryDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Company & Event Details Column */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Company & Event Details</h4>
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
        </div>
      </div>

      {/* Contact & Process Column */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Contact & Process</h4>
        <div className="space-y-3">
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
      </div>
    </div>
  );

  useEffect(() => {
    // In a real application, you would fetch the quote data from an API
    // using the 'id' from useParams. For now, we use mock data.
    const foundQuote = mockSampleQuotesDetail.find(quote => quote.id === id);
    if (foundQuote) {
      setQuote(foundQuote);
    } else {
      // Simulate a "not found" scenario for other IDs
      setQuote(null);
    }
    setLoading(false);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-mint-100 text-mint-800';
      case 'sent': return 'bg-aqua-100 text-aqua-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-pink-100 text-pink-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'sent': return <Mail className="h-4 w-4 mr-1" />;
      case 'draft': return <FileText className="h-4 w-4 mr-1" />;
      case 'rejected': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'expired': return <Clock className="h-4 w-4 mr-1" />;
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };

  const handleEditQuote = () => {
    if (quote) {
      console.log('Edit quote:', quote.id);
      // navigate(`/quotes/${quote.id}/edit`); // Placeholder for edit page
      alert(`Editing quote ${quote.id}`);
    }
  };

  const handleSendQuote = () => {
    if (quote) {
      console.log('Send quote:', quote.id);
      alert(`Sending quote ${quote.id} to ${quote.customer.email}`);
    }
  };

  const handleDownloadPDF = () => {
    if (quote) {
      console.log('Download PDF for quote:', quote.id);
      alert(`Downloading PDF for quote ${quote.id}`);
    }
  };

  const handleConvertToOrder = () => {
    if (quote) {
      const newOrderNumber = generateDocumentNumber('order');
      console.log('Convert to order:', quote.id);
      alert(`Converting quote ${quote.id} to order ${newOrderNumber}`);
      // navigate('/orders/new', { state: { convertedFromQuote: quote.id, orderNumber: newOrderNumber } });
    }
  };

  const handleDuplicateQuote = () => {
    if (quote) {
      const newQuoteNumber = generateDocumentNumber('quote');
      console.log('Duplicate quote:', quote.id);
      alert(`Duplicating quote ${quote.id} as ${newQuoteNumber}`);
      // navigate('/quotes/new', { state: { duplicateFrom: quote.id, quoteNumber: newQuoteNumber } });
    }
  };

  const handleDeleteQuote = () => {
    if (quote && window.confirm(`Are you sure you want to delete quote ${quote.id}?`)) {
      console.log('Delete quote:', quote.id);
      alert(`Quote ${quote.id} deleted.`);
      navigate('/quotes'); // Go back to quotes list after deletion
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading quote details...</p>
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-coral-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Quote Not Found</h2>
          <p className="text-gray-600 mb-4">The quote you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/quotes')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quotes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Header title={`Quote ${quote.id}`} />
      
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/quotes')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quotes
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quote Header */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Quote #{quote.id}
                      </h2>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                          {getStatusIcon(quote.status)}
                          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                        </span>
                        {quote.poNumber && (
                          <span className="text-sm text-gray-500">PO: {quote.poNumber}</span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          Issued: {formatDate(quote.issueDate)}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          Expires: {formatDate(quote.expiryDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditQuote}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={handleSendQuote}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </button>
                    <button
                      onClick={handleConvertToOrder}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                    >
                      <DollarSign className="h-4 w-4 mr-1" />
                      Convert to Order
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer & Event Details */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer & Event Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-coral-500" />
                      Customer
                    </h4>
                    <p className="font-medium">{quote.customer.name}</p>
                    <p className="text-sm text-gray-600">{quote.customer.email}</p>
                    <p className="text-sm text-gray-600">{quote.customer.phone}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {quote.customer.address}<br/>
                      {quote.customer.city}, {quote.customer.state} {quote.customer.zip}
                    </p>
                  </div>
                  {/* Event Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-mint-500" />
                      Event Details
                    </h4>
                    <div className="space-y-2">
                       <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        Event Type: <span className="capitalize">{quote.eventType}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        Event Date: {formatDate(quote.issueDate)} {/* Using issueDate as placeholder for eventDate */}
                      </div>
                      {quote.eventTime && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          Event Time: {formatTime(quote.eventTime)}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        {quote.fulfillmentType === 'pickup' ? (
                          <Package className="h-4 w-4 mr-2 text-gray-400" />
                        ) : (
                          <Truck className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        Fulfillment: {quote.fulfillmentType === 'pickup' ? `Pickup at ${formatTime(quote.pickupTime || '')}` : `Delivery at ${formatTime(quote.deliveryTime || '')}`}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Event Specific Details */}
            {quote.details && (
              <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
                  {quote.eventType === 'Wedding' && renderWeddingDetails(quote.details as WeddingInquiryDetails)}
                  {quote.eventType === 'Birthday' && renderCelebrationDetails(quote.details as CelebrationInquiryDetails)}
                  {quote.eventType === 'Corporate Event' && renderCorporateDetails(quote.details as CorporateInquiryDetails)}
                  {quote.eventType === 'Anniversary' && renderCelebrationDetails(quote.details as CelebrationInquiryDetails)}
                  {quote.eventType === 'Baby Shower' && renderCelebrationDetails(quote.details as CelebrationInquiryDetails)}
                  {quote.eventType === 'Graduation' && renderCelebrationDetails(quote.details as CelebrationInquiryDetails)}
                  {quote.eventType === 'Celebration' && renderCelebrationDetails(quote.details as CelebrationInquiryDetails)}
                  {quote.eventType === 'Corporate' && renderCorporateDetails(quote.details as CorporateInquiryDetails)}
                   {quote.eventType === 'Team Building' && renderCorporateDetails(quote.details as CorporateInquiryDetails)}
                </div>
              </div>
            )}

            {/* Line Items */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quote.lineItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-3 py-4 text-sm font-medium text-gray-900">
                            {item.name}
                            {item.description && <p className="text-xs text-gray-500">{item.description}</p>}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.quantity}</td>
                          <td className="px-3 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.unitPrice)}</td>
                          <td className="px-3 py-4 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
                <div className="flex justify-end">
                  <div className="w-full md:w-1/2 space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(quote.subtotal)}</span>
                    </div>
                    {quote.discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Discount ({quote.discountType === 'percentage' ? `${quote.discountValue}%` : 'Fixed'}):</span>
                        <span className="text-red-600">-{formatCurrency(quote.discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax ({quote.taxRate}%):</span>
                      <span>{formatCurrency(quote.taxAmount)}</span>
                    </div>
                    {quote.shippingFee > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping:</span>
                        <span>{formatCurrency(quote.shippingFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-coral-600">{formatCurrency(quote.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Customer Notes</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {quote.customerNotes || 'No customer notes.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Internal Notes</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {quote.internalNotes || 'No internal notes.'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {quote.termsConditions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quote Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleSendQuote}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Quote
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                  <button
                    onClick={handleConvertToOrder}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Convert to Order
                  </button>
                  <button
                    onClick={handleDuplicateQuote}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Quote
                  </button>
                  <button
                    onClick={handleDeleteQuote}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;