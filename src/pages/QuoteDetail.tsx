import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuoteContext } from '../context/QuoteContext';
import { useOrderContext } from '../context/OrderContext';
import Header from '../components/Header';
import Logo from '../components/Logo';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import {Quote, QuoteItem, CelebrationInquiryDetails, WeddingInquiryDetails, CorporateInquiryDetails} from "../types/index.ts";
import { generateDocumentNumber } from '../utils/documentNumbering';
import { 
  ArrowLeft,
  Printer, 
  Download, 
  Mail, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  XCircle,
  Edit,
  ArrowRightCircle,
  Copy,
  Trash2,
  User,
  Phone,
  MapPin,
  Package,
  Truck,
  FileText,
  MessageSquare,
  Percent
} from 'lucide-react';


const QuoteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuoteById, updateQuote, addAction } = useQuoteContext();
  const { addOrder } = useOrderContext();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch quote data
    setLoading(true);
    
    // Find the quote with the matching ID
    const foundQuote = getQuoteById(id);
    
    if (foundQuote) {
      setQuote(foundQuote);
    }
    
    setLoading(false);
  }, [id, getQuoteById]);

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
      case 'rejected': return <XCircle className="h-4 w-4 mr-1" />;
      case 'expired': return <Clock className="h-4 w-4 mr-1" />;
      default: return <FileText className="h-4 w-4 mr-1" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Download functionality would be implemented here');
  };

  const handleEmail = () => {
    // In a real app, this would send an email
    alert(`Email would be sent to ${quote?.customer.email}`);
  };

  const handleEdit = () => {
    navigate(`/quotes/${id}/edit`);
  };

  const handleConvertToOrder = () => {
    // Generate new order number
    const orderNumber = generateDocumentNumber('order');

    // Add action for order conversion
    if (quote) {
      addAction(quote.id, {
        type: 'status_change',
        description: 'Quote converted to order',
        performedBy: 'admin',
        details: {
          previousStatus: quote.status,
          newStatus: 'accepted'
        }
      });
      
      // Update quote status
      updateQuote(quote.id, { status: 'accepted' });
    }
    
    // Navigate to create order page with quote data
    navigate('/orders/new', { 
      state: { 
        orderNumber,
        quoteId: id
      } 
    });
  };

  const handleConvertToInvoice = () => {
    // Generate new invoice number
    const invoiceNumber = generateDocumentNumber('invoice');
    
    // Navigate to create invoice page with quote data
    navigate('/invoice/new', { 
      state: { 
        invoiceNumber,
        convertedFromQuote: id,
        customerId: quote?.customer.id,
        customerName: quote?.customer.name
      } 
    });
  };

  const handleDuplicate = () => {
    // Generate new quote number
    const quoteNumber = generateDocumentNumber('quote');
    
    // Navigate to create quote page with duplicated data
    navigate('/quotes/new', { 
      state: { 
        quoteNumber,
        duplicateFrom: id
      } 
    });
  };

  const handleDelete = () => {
    // In a real app, this would delete the quote
    if (confirm('Are you sure you want to delete this quote?')) {
      alert(`Quote ${id} deleted successfully`);
      navigate('/quotes');
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
    <div className="flex-1 overflow-hidden print:block">
      <div className="hidden print:block p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Logo className="text-coral-500" size="md" />
            <span className="text-xl font-semibold text-gray-900 tracking-tight">CakeFlow CRM</span>
          </div>
        </div>
      </div>
      
      <Header title="Quote Details" />
      
      <div className="p-6 print:p-0">
        {/* Back Button - hide when printing */}
        <button
          onClick={() => navigate('/quotes')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors print:hidden"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Quotes
        </button>

        {/* Quote Actions - hide when printing */}
        <div className="flex justify-end mb-6 print:hidden">
          <button 
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 mr-3"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </button>
          <button 
            onClick={handleDownload}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 mr-3"
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
          <button 
            onClick={handleEmail}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 mr-3"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email Quote
          </button>
          <button 
            onClick={handleEdit}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 mr-3"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button 
            onClick={handleConvertToOrder}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aqua-500 mr-3"
          >
            <ArrowRightCircle className="h-4 w-4 mr-2" />
            Convert to Order
          </button>
          <button 
            onClick={handleConvertToInvoice}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Convert to Invoice
          </button>
        </div>

        {/* Quote Document */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
          {/* Quote Header */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="hidden print:flex items-center space-x-3 mb-4">
                    <Logo className="text-coral-500" size="md" />
                    <span className="text-xl font-semibold text-gray-900 tracking-tight">CakeFlow CRM</span>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">QUOTE</h1>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Quote #:</span> {quote.id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Date:</span> {formatDate(quote.quoteDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Valid Until:</span> {formatDate(quote.expirationDate)}
                </p>
                {quote.poNumber && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">PO/Reference #:</span> {quote.poNumber}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                    {getStatusIcon(quote.status)}
                    {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-medium text-gray-900">Sweet Delights Bakery</p>
                  <p>123 Frosting Lane</p>
                  <p>Sugarville, CA 90210</p>
                  <p>Phone: (555) 987-6543</p>
                  <p>Email: quotes@sweetdelights.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Event Details */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">{quote.firstName, quote.lastName}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`mailto:${quote.email}`} className="hover:text-coral-600 transition-colors">
                      {quote.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`tel:${quote.phone}`} className="hover:text-coral-600 transition-colors">
                      {quote.phone}
                    </a>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      {quote.address}<br />
                      {quote.city}, {quote.state} {quote.zip}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Event Details</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">Event Date:</span> {formatDate(quote.eventDate)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">Event Time:</span> {quote.eventTime ? formatTime(quote.eventTime) : 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    {quote.fulfillmentType === 'pickup' ? (
                      <>
                        <Package className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          <span className="font-medium">Pickup Time:</span> {quote.pickupTime ? formatTime(quote.pickupTime) : 'Not specified'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Truck className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          <span className="font-medium">Delivery Time:</span> {quote.deliveryTime ? formatTime(quote.deliveryTime) : 'Not specified'}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">Event Type:</span> {quote.eventType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          // Render wedding-specific fields
function renderWeddingDetails(details: WeddingInquiryDetails) {
  return (
    <section>
      <h3>Wedding Details</h3>
      <div><strong>Venue:</strong> {details.venue}</div>
      <div><strong>Wedding Size:</strong> {details.size}</div>
      <div><strong>Cake Style:</strong> {details.cakeStyle}</div>
      <div><strong>Flavors:</strong> {details.flavors?.join(', ')}</div>
      <div><strong>Dietary Restrictions:</strong> {details.dietaryRestrictions}</div>
      <div><strong>Delivery/Setup:</strong> {details.deliveryNeeds}</div>
      <div><strong>Tasting Request:</strong> {details.tastingRequested ? 'Yes' : 'No'}</div>
      <div><strong>Wedding Planner:</strong> {details.plannerName} ({details.plannerContact})</div>
    </section>
  );
}

// Render celebration-specific fields
function renderCelebrationDetails(details: CelebrationInquiryDetails) {
  return (
    <section>
      <h3>Celebration Details</h3>
      <div><strong>Occasion:</strong> {details.occasion}</div>
      <div><strong>Theme:</strong> {details.theme}</div>
      <div><strong>Colors:</strong> {details.colors?.join(', ')}</div>
      <div><strong>Tasting Request:</strong> {details.tastingRequested ? 'Yes' : 'No'}</div>
    </section>
  );
}

// Render corporate-specific fields
function renderCorporateDetails(details: CorporateInquiryDetails) {
  return (
    <section>
      <h3>Corporate Event Details</h3>
      <div><strong>Company:</strong> {details.companyName}</div>
      <div><strong>Event Type:</strong> {details.eventType}</div>
      <div><strong>Recurring:</strong> {details.isRecurring ? 'Yes' : 'No'}</div>
      <div><strong>Branding Requirements:</strong> {details.branding}</div>
      <div><strong>Delivery Address:</strong> {details.deliveryAddress}</div>
      <div><strong>Contact Person:</strong> {details.contactPerson}</div>
      <div><strong>Approval Process:</strong> {details.approvalProcess}</div>
      <div><strong>Invoicing Requirements:</strong> {details.invoicingRequirements}</div>
    </section>
  );
}    
          function renderTypeSpecificDetails(quote: Quote) {
  switch (quote.type) {
    case 'wedding':
      return renderWeddingDetails(quote.details as WeddingInquiryDetails);
    case 'celebration':
      return renderCelebrationDetails(quote.details as CelebrationInquiryDetails);
    case 'corporate':
      return renderCorporateDetails(quote.details as CorporateInquiryDetails);
    default:
      return null;
  }
}

          {/* Type-specific details */}
          <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3 capitalize">
          {quote.type} Details
          </h4>
            {renderTypeSpecificDetails(quote)}
          </div>          
          {/* Quote Items */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Quote Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {quote.quoteItems.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 py-4 text-sm text-gray-900">
                        <div className="font-medium">{item.name}</div>
                        {item.description && <div className="text-gray-500">{item.description}</div>}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-center">
                        {item.quantity}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-right">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-right">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quote Summary */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="flex justify-end">
              <div className="w-full md:w-64">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(quote.subtotal)}</span>
                </div>
                
                {quote.discountAmount > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Percent className="h-4 w-4 mr-1" />
                      Discount {quote.discountType === 'percentage' ? `(${quote.discountValue}%)` : ''}:
                    </span>
                    <span className="text-sm font-medium text-pink-600">-{formatCurrency(quote.discountAmount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Tax ({quote.taxRate}%):</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(quote.taxAmount)}</span>
                </div>
                
                {quote.shippingFee > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-gray-600">Shipping/Delivery:</span>
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(quote.shippingFee)}</span>
                  </div>
                )}
                
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total:</span>
                  <span className="text-base font-medium text-coral-600">{formatCurrency(quote.total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes & Terms */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-gray-400" />
                  Notes
                </h2>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 whitespace-pre-line">{quote.customerNotes}</p>
                </div>
                
                {/* Only show internal notes when not printing */}
                <div className="mt-4 print:hidden">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Internal Notes</h3>
                  <div className="bg-yellow-50 p-3 rounded-md">
                    <p className="text-sm text-gray-600 whitespace-pre-line">{quote.internalNotes}</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Terms & Conditions</h2>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 whitespace-pre-line">{quote.termsConditions}</p>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quote Validity</h3>
                  <p className="text-sm text-gray-600">
                    This quote is valid until <span className="font-medium">{formatDate(quote.expirationDate)}</span>.
                    Please contact us if you have any questions or would like to proceed with this order.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 print:bg-white print:py-2">
            <div className="text-center">
              <p className="text-sm text-gray-600">Thank you for your business!</p>
              <p className="text-sm text-gray-500">
                If you have any questions about this quote, please contact us at
                <span className="text-coral-600"> quotes@sweetdelights.com</span> or
                <span className="text-coral-600"> (555) 987-6543</span>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Actions - hide when printing */}
        <div className="mt-6 flex justify-between print:hidden">
          <div>
            <button 
              onClick={handleDelete}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Quote
            </button>
          </div>
          <div className="space-x-3">
            <button 
              onClick={handleDuplicate}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </button>
            <button 
              onClick={handleConvertToOrder}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aqua-500"
            >
              <ArrowRightCircle className="h-4 w-4 mr-2" />
              Convert to Order
            </button>
            <button 
              onClick={handleConvertToInvoice}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Convert to Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteDetail;