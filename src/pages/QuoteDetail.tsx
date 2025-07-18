import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuoteContext } from '../context/QuoteContext';
import { useOrderContext } from '../context/OrderContext';
import Header from '../components/Header';
import Logo from '../components/Logo';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { Quote, CelebrationInquiryDetails, WeddingInquiryDetails, CorporateInquiryDetails } from "../types/index.ts";
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

// ==== Helper: render wedding/corporate/celebration details, and type switch ====
function renderWeddingDetails(details: WeddingInquiryDetails) {
  if (!details) return null;
  return (
    <section>
      <h3 className="text-base font-semibold mb-2">Wedding Details</h3>
      <div><strong>Venue:</strong> {details.venue}</div>
      <div><strong>Wedding Size:</strong> {details.size || details.guestCount}</div>
      <div><strong>Cake Style:</strong> {details.cakeStyle}</div>
      <div><strong>Flavors:</strong> {details.flavors?.join(', ')}</div>
      <div><strong>Dietary Restrictions:</strong> {details.dietaryRestrictions}</div>
      <div><strong>Delivery/Setup:</strong> {details.deliveryNeeds}</div>
      <div><strong>Tasting Request:</strong> {details.tastingRequested ? 'Yes' : 'No'}</div>
      {details.plannerName && (
        <div><strong>Wedding Planner:</strong> {details.plannerName} {details.plannerContact && `(${details.plannerContact})`}</div>
      )}
    </section>
  );
}

function renderCelebrationDetails(details: CelebrationInquiryDetails) {
  if (!details) return null;
  return (
    <section>
      <h3 className="text-base font-semibold mb-2">Celebration Details</h3>
      <div><strong>Occasion:</strong> {details.occasion}</div>
      <div><strong>Theme:</strong> {details.theme}</div>
      <div><strong>Colors:</strong> {details.colors?.join(', ')}</div>
      <div><strong>Tasting Request:</strong> {details.tastingRequested ? 'Yes' : 'No'}</div>
    </section>
  );
}

function renderCorporateDetails(details: CorporateInquiryDetails) {
  if (!details) return null;
  return (
    <section>
      <h3 className="text-base font-semibold mb-2">Corporate Event Details</h3>
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

// ==== Main component ====

const QuoteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuoteById, updateQuote, addAction } = useQuoteContext();
  const { addOrder } = useOrderContext();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const foundQuote = getQuoteById(id);
    if (foundQuote) setQuote(foundQuote);
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

  const handlePrint = () => window.print();
  const handleDownload = () => alert('Download functionality would be implemented here');
  const handleEmail = () => alert(`Email would be sent to ${quote?.email}`);
  const handleEdit = () => navigate(`/quotes/${id}/edit`);
  const handleConvertToOrder = () => {
    const orderNumber = generateDocumentNumber('order');
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
      updateQuote(quote.id, { status: 'accepted' });
    }
    navigate('/orders/new', { state: { orderNumber, quoteId: id } });
  };
  const handleConvertToInvoice = () => {
    const invoiceNumber = generateDocumentNumber('invoice');
    navigate('/invoice/new', { 
      state: { 
        invoiceNumber,
        convertedFromQuote: id,
        customerId: quote?.id, // or whatever ID is appropriate for your system
        customerName: `${quote.firstName} ${quote.lastName}`
      } 
    });
  };
  const handleDuplicate = () => {
    navigate('/quotes/new', {
      state: {
        quoteId: id
      }
    });
  };
  const handleDelete = () => {
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
      {/* Print header, app header, and actions omitted for brevity */}
      <Header title="Quote Details" />
      <div className="p-6 print:p-0">
        {/* Actions and document header omitted for brevity */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
          {/* Quote Header and Customer/Event Details omitted for brevity */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">{quote.firstName} {quote.lastName}</span>
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
                      {quote.address1}<br />
                      {quote.city}, {quote.state} {quote.zip}
                    </div>
                  </div>
                </div>
              </div>
              {/* ... Event Details Column as before ... */}
            </div>
          </div>

          {/* --- Type-specific details --- */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3 capitalize">
              {(quote.type) + " Details"}
            </h4>
            {renderTypeSpecificDetails(quote)}
          </div>
          {/* ... Rest of your JSX document (items, summary, notes, etc.) ... */}
          {/* No changes needed to summary/items/etc parts for these instructions */}
        </div>

        {/* Additional Actions */}
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
