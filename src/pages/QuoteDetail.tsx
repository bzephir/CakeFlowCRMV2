import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { MockQuoteDetail, mockSampleQuotesDetail } from '../data/mockData';
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
  User,
  MessageSquare,
  Calculator,
  Calendar,
  Tag,
  Utensils,
  Briefcase,
  FileCheck,
  Palette,
  Cake,
  Building2
} from 'lucide-react';
import {
  CelebrationInquiryDetails,
  WeddingInquiryDetails,
  CorporateInquiryDetails
} from '../types';

const OrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the order data from an API
    // using the 'id' from useParams. For now, we use mock data.
    const foundOrder = mockSampleOrdersDetail.find(order => order.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      // Simulate a "not found" scenario for other IDs
      setOrder(null);
    }
    setLoading(false);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-mint-100 text-mint-800';
      case 'in-production': return 'bg-aqua-100 text-aqua-800';
      case 'confirmed': return 'bg-coral-100 text-coral-800';
      case 'quoted': return 'bg-pink-100 text-pink-800';
      case 'inquiry': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'in-production': return <Clock className="h-4 w-4 mr-1" />;
      case 'confirmed': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'quoted': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'inquiry': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'cancelled': return <Trash2 className="h-4 w-4 mr-1" />;
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };

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

  const handleEditOrder = () => {
    if (order) {
      console.log('Edit order:', order.id);
      // navigate(`/orders/${order.id}/edit`); // Placeholder for edit page
      alert(`Editing order ${order.id}`);
    }
  };

  const handleSendInvoice = () => {
    if (order) {
      const newInvoiceNumber = generateDocumentNumber('invoice');
      console.log('Send invoice for order:', order.id);
      alert(`Creating and sending invoice ${newInvoiceNumber} for order ${order.id}`);
      // navigate('/invoice/new', { state: { convertedFromOrder: order.id, invoiceNumber: newInvoiceNumber } });
    }
  };

  const handleDuplicateOrder = () => {
    if (order) {
      const newOrderNumber = generateDocumentNumber('order');
      console.log('Duplicate order:', order.id);
      alert(`Duplicating order ${order.id} as ${newOrderNumber}`);
      // navigate('/orders/new', { state: { duplicateFrom: order.id, orderNumber: newOrderNumber } });
    }
  };

  const handleDeleteOrder = () => {
    if (order && window.confirm(`Are you sure you want to delete order ${order.id}?`)) {
      console.log('Delete order:', order.id);
      alert(`Order ${order.id} deleted.`);
      navigate('/orders'); // Go back to orders list after deletion
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-coral-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/orders')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Header title={`Order ${order.id}`} />
      
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        Order #{order.id}
                      </h2>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                        </span>
{/*{order.poNumber && (
      } <span className="text-sm text-gray-500">PO: {order.poNumber}</span>                        )} */}                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          Created: {formatDate(order.issueDate)}
                        </div>
                        {/*  <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          Event Date: {formatDate(order.eventDate)}
                        </div>*/}
                      </div>
                    </div>
                  </div>
         
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditOrder}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={handleSendInvoice}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send Invoice
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
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-gray-600">{order.customer.email}</p>
                    <p className="text-sm text-gray-600">{order.customer.phone}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      {order.customer.address}<br/>
                      {order.customer.city}, {order.customer.state} {order.customer.zip}
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
                        Event Type: {order.eventType}
                      </div>

 <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        Event Date: {formatDate(order.eventDate)} {/* Using issueDate as placeholder for eventDate */}
                      </div>   
                                            {order.eventTime && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          Event Time: {formatTime(order.eventTime)}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        {order.fulfillmentType === 'pickup' ? (
                          <Package className="h-4 w-4 mr-2 text-gray-400" />
                        ) : (
                          <Truck className="h-4 w-4 mr-2 text-gray-400" />
                        )}
                        Fulfillment: {order.fulfillmentType === 'pickup' ? `Pickup at ${formatTime(order.pickupTime || '')}` : `Delivery at ${formatTime(order.deliveryTime || '')}`}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}  
            {order.details && (
              <div className="bg-white shadow-sm rounded-lg border border-gray-200">  
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
                  <div>
                    {order.eventType === 'Wedding' && renderWeddingDetails(order.details as WeddingInquiryDetails)}
                    {order.eventType === 'Birthday' && renderCelebrationDetails(order.details as CelebrationInquiryDetails)}
                    {order.eventType === 'Corporate Event' && renderCorporateDetails(order.details as CorporateInquiryDetails)}

                  </div>
                </div>
              </div>
            )}

            {!order.details && (
              <div className="bg-white shadow-sm rounded-lg border border-gray-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
                  <p className="text-sm text-gray-500 italic">No additional event details available.</p>
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
                      {order.lineItems.map((item) => (
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
                      <span>{formatCurrency(order.subtotal)}</span>
                    </div>
                    {order.shippingFee > 0 && (
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping:</span>
                        <span>{formatCurrency(order.shippingFee)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tax ({order.taxRate}%):</span>
                      <span>{formatCurrency(order.taxAmount)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-coral-600">{formatCurrency(order.total)}</span>
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
                      {order.customerNotes || 'No customer notes.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Internal Notes</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {order.internalNotes || 'No internal notes.'}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Terms & Conditions</h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      Payment terms: 50% deposit required to confirm order. Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.
                    </p>
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

export default OrderDetail;