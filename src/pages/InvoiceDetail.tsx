import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Logo from '../components/Logo';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { 
  ArrowLeft,
  Printer, 
  Download, 
  Mail, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Edit,
  Copy,
  Trash2,
  User,
  Phone,
  MapPin,
  Package,
  Truck,
  FileText,
  MessageSquare,
  CreditCard,
  AlertCircle,
  Clock as ClockIcon,
  Ban
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference?: string;
}

interface InvoiceData {
  id: string;
  customer: Customer;
  event: {
    date: string;
    time: string;
    fulfillmentType: 'pickup' | 'delivery';
    pickupTime: string;
    deliveryTime: string;
    venue: string;
    guestCount: number;
  };
  items: InvoiceItem[];
  payments: Payment[];
  notes: string;
  terms: string;
  subtotal: number;
  tax: number;
  total: number;
  balance: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'deposit-paid' | 'pending' | 'overdue' | 'cancelled' | 'draft';
  orderId?: string;
}

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  // Sample invoice data - in a real app, this would come from your database
  const sampleInvoices: InvoiceData[] = [
    {
      id: 'I-202501-0001',
      customer: {
        id: '1',
        name: 'David Fraga',
        email: 'david.fraga@example.com',
        phone: '(555) 123-4567',
        address: '123 Main Street',
        city: 'Springfield',
        state: 'IL',
        zip: '62701'
      },
      event: {
        date: '2025-06-15',
        time: '16:00',
        fulfillmentType: 'delivery',
        pickupTime: '',
        deliveryTime: '14:00',
        venue: 'Grand Hotel Ballroom',
        guestCount: 150
      },
      items: [
        { id: '1', description: '3-Tier Wedding Cake', quantity: 1, price: 450.00 },
        { id: '2', description: 'Custom Cake Topper', quantity: 1, price: 65.00 },
        { id: '3', description: 'Delivery & Setup', quantity: 1, price: 85.00 }
      ],
      payments: [
        { id: '1', date: '2025-01-15', amount: 300.00, method: 'Credit Card', reference: 'TXID-12345' }
      ],
      notes: 'Cake design to match wedding colors: blush pink and gold. Flavors: vanilla cake with strawberry filling (top tier), chocolate cake with raspberry filling (middle tier), and lemon cake with blueberry filling (bottom tier).',
      terms: 'Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.',
      subtotal: 600.00,
      tax: 42.00,
      total: 642.00,
      balance: 342.00,
      issueDate: '2025-01-15',
      dueDate: '2025-06-01',
      status: 'deposit-paid',
      orderId: 'O-202501-0001'
    },
    {
      id: 'I-202501-0002',
      customer: {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        phone: '(555) 234-5678',
        address: '456 Oak Avenue',
        city: 'Springfield',
        state: 'IL',
        zip: '62702'
      },
      event: {
        date: '2025-01-15',
        time: '14:00',
        fulfillmentType: 'pickup',
        pickupTime: '12:00',
        deliveryTime: '',
        venue: 'Private Residence',
        guestCount: 25
      },
      items: [
        { id: '1', description: 'Custom Birthday Cake', quantity: 1, price: 85.00 },
        { id: '2', description: 'Cupcakes (dozen)', quantity: 3, price: 36.00 },
        { id: '3', description: 'Cake Pops (dozen)', quantity: 2, price: 24.00 }
      ],
      payments: [
        { id: '1', date: '2025-01-10', amount: 450.00, method: 'Cash' }
      ],
      notes: 'Birthday cake for 30th celebration with blue and silver theme.',
      terms: 'All sales are final. No refunds for picked-up items.',
      subtotal: 241.00,
      tax: 16.87,
      total: 257.87,
      balance: 0.00,
      issueDate: '2025-01-10',
      dueDate: '2025-01-15',
      status: 'paid',
      orderId: 'O-202412-0045'
    },
    {
      id: 'I-202501-0003',
      customer: {
        id: '3',
        name: 'Mike Chen',
        email: 'mike@email.com',
        phone: '(555) 345-6789',
        address: '789 Pine Road',
        city: 'Springfield',
        state: 'IL',
        zip: '62703'
      },
      event: {
        date: '2025-01-16',
        time: '12:00',
        fulfillmentType: 'delivery',
        pickupTime: '',
        deliveryTime: '10:30',
        venue: 'TechCorp Office',
        guestCount: 50
      },
      items: [
        { id: '1', description: 'Corporate Cupcakes', quantity: 48, price: 2.50 },
        { id: '2', description: 'Delivery Fee', quantity: 1, price: 25.00 }
      ],
      payments: [],
      notes: 'Cupcakes with company logo as per provided design.',
      terms: 'Payment due within 30 days of invoice date. Late payments subject to 1.5% monthly interest.',
      subtotal: 145.00,
      tax: 10.15,
      total: 155.15,
      balance: 155.15,
      issueDate: '2025-01-05',
      dueDate: '2025-02-04',
      status: 'overdue',
      orderId: 'O-202412-0046'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch invoice data
    setLoading(true);
    
    // Find the invoice with the matching ID
    const foundInvoice = sampleInvoices.find(i => i.id === id);
    
    if (foundInvoice) {
      setInvoice(foundInvoice);
    }
    
    setLoading(false);
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-mint-100 text-mint-800';
      case 'deposit-paid': return 'bg-coral-100 text-coral-800';
      case 'pending': return 'bg-aqua-100 text-aqua-800';
      case 'overdue': return 'bg-pink-100 text-pink-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'deposit-paid': return <CreditCard className="h-4 w-4 mr-1" />;
      case 'pending': return <ClockIcon className="h-4 w-4 mr-1" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'cancelled': return <Ban className="h-4 w-4 mr-1" />;
      case 'draft': return <FileText className="h-4 w-4 mr-1" />;
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
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
    alert(`Email would be sent to ${invoice?.customer.email}`);
  };

  const handleEdit = () => {
    navigate(`/invoice/${id}/edit`);
  };

  const handleRecordPayment = () => {
    // In a real app, this would open a payment form
    alert('Record payment functionality would be implemented here');
  };

  const handleDuplicate = () => {
    // Generate new invoice number
    const invoiceNumber = generateDocumentNumber('invoice');
    
    // Navigate to create invoice page with duplicated data
    navigate('/invoice/new', { 
      state: { 
        invoiceNumber,
        duplicateFrom: id
      } 
    });
  };

  const handleDelete = () => {
    // In a real app, this would delete the invoice
    if (confirm('Are you sure you want to delete this invoice?')) {
      alert(`Invoice ${id} deleted successfully`);
      navigate('/invoices');
    }
  };

  const handleViewOrder = () => {
    if (invoice?.orderId) {
      navigate(`/orders/${invoice.orderId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Loading invoice details...</p>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Invoice Not Found</h2>
          <p className="text-gray-600 mb-4">The invoice you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/invoices')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Invoices
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
      
      <Header title="Invoice Details" />
      
      <div className="p-6 print:p-0">
        {/* Back Button - hide when printing */}
        <button
          onClick={() => navigate('/invoices')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors print:hidden"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Invoices
        </button>

        {/* Invoice Actions - hide when printing */}
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
            Email Invoice
          </button>
          <button 
            onClick={handleEdit}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 mr-3"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          {invoice.balance > 0 && (
            <button 
              onClick={handleRecordPayment}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Record Payment
            </button>
          )}
        </div>

        {/* Invoice Document */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
          {/* Invoice Header */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="hidden print:flex items-center space-x-3 mb-4">
                    <Logo className="text-coral-500" size="md" />
                    <span className="text-xl font-semibold text-gray-900 tracking-tight">CakeFlow CRM</span>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">INVOICE</h1>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Invoice #:</span> {invoice.id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Issue Date:</span> {formatDate(invoice.issueDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Due Date:</span> {formatDate(invoice.dueDate)}
                </p>
                {invoice.orderId && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Order #:</span> 
                    <button 
                      onClick={handleViewOrder}
                      className="ml-1 text-coral-600 hover:text-coral-700 transition-colors print:text-gray-900 print:hover:text-gray-900"
                    >
                      {invoice.orderId}
                    </button>
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    <span className="capitalize">{invoice.status === 'deposit-paid' ? 'Deposit Paid' : invoice.status.replace('-', ' ')}</span>
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-medium text-gray-900">Sweet Delights Bakery</p>
                  <p>123 Frosting Lane</p>
                  <p>Sugarville, CA 90210</p>
                  <p>Phone: (555) 987-6543</p>
                  <p>Email: accounting@sweetdelights.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bill To & Event Details */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Bill To</h2>
                <div className="space-y-2">
                  <p className="font-medium">{invoice.customer.name}</p>
                  <p>{invoice.customer.address}</p>
                  <p>{invoice.customer.city}, {invoice.customer.state} {invoice.customer.zip}</p>
                  <p>Phone: {invoice.customer.phone}</p>
                  <p>Email: {invoice.customer.email}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Event Details</h2>
                <div className="space-y-2">
                  <div className="flex items-start mb-1">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <p className="font-medium">
                        {formatDate(invoice.event.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mb-1">
                    {invoice.event.fulfillmentType === 'pickup' ? (
                      <>
                        <Package className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-gray-900">Pickup at {formatTime(invoice.event.pickupTime)}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Truck className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <div>
                          <p className="text-gray-900">Delivery at {formatTime(invoice.event.deliveryTime)}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {invoice.event.time && (
                    <div className="flex items-start mb-1">
                      <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-gray-900">Event at {formatTime(invoice.event.time)}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start mb-1">
                    <User className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <p className="text-gray-900">{invoice.event.guestCount} guests</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                    <p>{invoice.event.venue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Invoice Items</h2>
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
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-3 py-4 text-sm text-gray-900">{item.description}</td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-center">{item.quantity}</td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.price)}</td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-right">{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Summary */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="flex justify-end">
              <div className="w-full md:w-64">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(invoice.subtotal)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Tax:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(invoice.tax)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total:</span>
                  <span className="text-base font-medium text-gray-900">{formatCurrency(invoice.total)}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Amount Paid:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(invoice.total - invoice.balance)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-base font-medium text-coral-600">Balance Due:</span>
                  <span className="text-base font-medium text-coral-600">{formatCurrency(invoice.balance)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Payment History</h2>
            {invoice.payments && invoice.payments.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-3 py-4 text-sm text-gray-900">{formatDate(payment.date)}</td>
                      <td className="px-3 py-4 text-sm text-gray-900">{payment.method}</td>
                      <td className="px-3 py-4 text-sm text-gray-900">{payment.reference || '-'}</td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-right">{formatCurrency(payment.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-600">No payments recorded yet.</p>
            )}
          </div>

          {/* Notes & Terms */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Order Notes</h2>
                <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Terms & Conditions</h2>
                <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.terms}</p>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Payment Instructions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start mb-2">
                  <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">Credit Card</p>
                    <p className="text-sm text-gray-600">Pay securely online through our customer portal</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-2 text-gray-400" />
                  <div>
                    <p className="font-medium">Check</p>
                    <p className="text-sm text-gray-600">Make checks payable to "Sweet Delights Bakery"</p>
                  </div>
                </div>
              </div>
              <div className="bg-coral-50 rounded-lg p-3">
                <p className="text-sm font-medium text-coral-800 mb-1">Payment Due Date</p>
                <p className="text-sm text-coral-800">
                  Please submit payment by <span className="font-medium">{formatDate(invoice.dueDate)}</span>
                </p>
                <p className="text-sm text-coral-800 mt-2">
                  Final payment must be received at least 14 days before your event date.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 print:bg-white print:py-2">
            <div className="text-center">
              <p className="text-sm text-gray-600">Thank you for your business!</p>
              <p className="text-sm text-gray-500">
                If you have any questions about this invoice, please contact us at
                <span className="text-coral-600"> accounting@sweetdelights.com</span> or
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
              Delete Invoice
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
            {invoice.balance > 0 && (
              <button 
                onClick={handleRecordPayment}
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Record Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;