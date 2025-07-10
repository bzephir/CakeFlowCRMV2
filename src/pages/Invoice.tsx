import React, { useState } from 'react';
import Header from '../components/Header';
import Logo from '../components/Logo';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { 
  Printer, 
  Download, 
  Mail, 
  Clock, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  MapPin,
  Users
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// Sample invoice data - in a real app, this would come from your database
const sampleInvoice = {
  id: 'I-202501-0001',
  customer: {
    name: 'David Fraga',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701'
  },
  event: {
    date: '2025-06-15',
    time: '4:00 PM',
    venue: 'Grand Hotel Ballroom',
    guestCount: 150
  },
  items: [
    { id: 1, description: '3-Tier Wedding Cake', quantity: 1, price: 450.00 },
    { id: 2, description: 'Custom Cake Topper', quantity: 1, price: 65.00 },
    { id: 3, description: 'Delivery & Setup', quantity: 1, price: 85.00 }
  ],
  payments: [
    { id: 1, date: '2025-01-15', amount: 300.00, method: 'Credit Card' }
  ],
  notes: 'Cake design to match wedding colors: blush pink and gold. Flavors: vanilla cake with strawberry filling (top tier), chocolate cake with raspberry filling (middle tier), and lemon cake with blueberry filling (bottom tier).',
  terms: 'Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.',
  subtotal: 600.00,
  tax: 42.00,
  total: 642.00,
  balance: 342.00,
  issueDate: '2025-01-15',
  dueDate: '2025-06-01',
  status: 'deposit-paid' // 'paid', 'deposit-paid', 'pending', 'overdue'
};

const Invoice: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isNewInvoice = id === 'new';
  
  // Get invoice number from location state if creating new invoice
  const invoiceNumber = location.state?.invoiceNumber || (isNewInvoice ? generateDocumentNumber('invoice') : id);
  
  // Initialize with sample data for existing invoice or empty data for new invoice
  const [invoice, setInvoice] = useState(isNewInvoice ? {
    id: invoiceNumber,
    customer: {
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: ''
    },
    event: {
      date: '',
      time: '',
      venue: '',
      guestCount: 0
    },
    items: [
      { id: 1, description: '', quantity: 1, price: 0 }
    ],
    payments: [],
    notes: '',
    terms: 'Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.',
    subtotal: 0,
    tax: 0,
    total: 0,
    balance: 0,
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'draft'
  } : sampleInvoice);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-mint-100 text-mint-800';
      case 'deposit-paid': return 'bg-coral-100 text-coral-800';
      case 'pending': return 'bg-aqua-100 text-aqua-800';
      case 'overdue': return 'bg-pink-100 text-pink-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'deposit-paid': return <CreditCard className="h-4 w-4 mr-1" />;
      case 'pending': return <Clock className="h-4 w-4 mr-1" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'draft': return <Clock className="h-4 w-4 mr-1" />;
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
    alert(`Email would be sent to ${invoice.customer.name}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section?: string, field?: string, index?: number) => {
    const { name, value } = e.target;
    
    if (section === 'customer') {
      setInvoice({
        ...invoice,
        customer: {
          ...invoice.customer,
          [field as string]: value
        }
      });
    } else if (section === 'event') {
      setInvoice({
        ...invoice,
        event: {
          ...invoice.event,
          [field as string]: value
        }
      });
    } else if (section === 'items' && typeof index === 'number') {
      const updatedItems = [...invoice.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field as string]: field === 'price' || field === 'quantity' ? parseFloat(value) || 0 : value
      };
      
      // Recalculate subtotal, tax, total, and balance
      const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxRate = 0.07; // 7% tax rate
      const tax = subtotal * taxRate;
      const total = subtotal + tax;
      const totalPayments = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
      const balance = total - totalPayments;
      
      setInvoice({
        ...invoice,
        items: updatedItems,
        subtotal,
        tax,
        total,
        balance
      });
    } else {
      setInvoice({
        ...invoice,
        [name]: value
      });
    }
  };

  const addItem = () => {
    const newItem = {
      id: invoice.items.length + 1,
      description: '',
      quantity: 1,
      price: 0
    };
    
    setInvoice({
      ...invoice,
      items: [...invoice.items, newItem]
    });
  };

  const removeItem = (index: number) => {
    if (invoice.items.length <= 1) return;
    
    const updatedItems = invoice.items.filter((_, i) => i !== index);
    
    // Recalculate subtotal, tax, total, and balance
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.07; // 7% tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const totalPayments = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balance = total - totalPayments;
    
    setInvoice({
      ...invoice,
      items: updatedItems,
      subtotal,
      tax,
      total,
      balance
    });
  };

  const handleSaveInvoice = () => {
    // In a real app, this would save the invoice to your database
    console.log('Saving invoice:', invoice);
    alert(`Invoice ${invoice.id} saved successfully!`);
    navigate('/invoices');
  };

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
      
      <Header title={isNewInvoice ? "Create Invoice" : "Invoice"} />
      
      <div className="p-6 print:p-0">
        {/* Back Button - hide when printing */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors print:hidden"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        {/* Invoice Actions - hide when printing */}
        <div className="flex justify-end mb-6 print:hidden">
          {!isNewInvoice && (
            <>
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
                className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Invoice
              </button>
            </>
          )}
          {isNewInvoice && (
            <button 
              onClick={handleSaveInvoice}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Save Invoice
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
                  <span className="font-medium">Issue Date:</span> {isNewInvoice ? (
                    <input 
                      type="date" 
                      name="issueDate" 
                      value={invoice.issueDate} 
                      onChange={handleInputChange}
                      className="border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                    />
                  ) : formatDate(invoice.issueDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Due Date:</span> {isNewInvoice ? (
                    <input 
                      type="date" 
                      name="dueDate" 
                      value={invoice.dueDate} 
                      onChange={handleInputChange}
                      className="border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                    />
                  ) : formatDate(invoice.dueDate)}
                </p>
              </div>
              <div className="text-right">
                {!isNewInvoice && (
                  <div className="flex items-center justify-end mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {invoice.status === 'deposit-paid' ? 'Deposit Paid' : 
                      invoice.status === 'paid' ? 'Paid' : 
                      invoice.status === 'pending' ? 'Pending' : 
                      invoice.status === 'draft' ? 'Draft' : 'Overdue'}
                    </span>
                  </div>
                )}
                {isNewInvoice && (
                  <div className="flex items-center justify-end mb-2">
                    <select
                      name="status"
                      value={invoice.status}
                      onChange={(e) => setInvoice({...invoice, status: e.target.value})}
                      className="border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                    >
                      <option value="draft">Draft</option>
                      <option value="pending">Pending</option>
                      <option value="deposit-paid">Deposit Paid</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                )}
                <div className="text-sm text-gray-600 mb-4">
                  <p className="font-medium text-gray-900">Sweet Delights Bakery</p>
                  <p>123 Frosting Lane</p>
                  <p>Sugarville, CA 90210</p>
                  <p>Phone: (555) 987-6543</p>
                  <p>Email: orders@sweetdelights.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bill To & Event Details */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Bill To</h2>
                {isNewInvoice ? (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                      <input 
                        type="text" 
                        value={invoice.customer.name} 
                        onChange={(e) => handleInputChange(e, 'customer', 'name')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input 
                        type="text" 
                        value={invoice.customer.phone} 
                        onChange={(e) => handleInputChange(e, 'customer', 'phone')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input 
                        type="text" 
                        value={invoice.customer.address} 
                        onChange={(e) => handleInputChange(e, 'customer', 'address')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input 
                          type="text" 
                          value={invoice.customer.city} 
                          onChange={(e) => handleInputChange(e, 'customer', 'city')}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input 
                          type="text" 
                          value={invoice.customer.state} 
                          onChange={(e) => handleInputChange(e, 'customer', 'state')}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP</label>
                        <input 
                          type="text" 
                          value={invoice.customer.zip} 
                          onChange={(e) => handleInputChange(e, 'customer', 'zip')}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-medium">{invoice.customer.name}</p>
                    <p>{invoice.customer.address}</p>
                    <p>{invoice.customer.city}, {invoice.customer.state} {invoice.customer.zip}</p>
                    <p>Phone: {invoice.customer.phone}</p>
                  </>
                )}
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Event Details</h2>
                {isNewInvoice ? (
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Date</label>
                      <input 
                        type="date" 
                        value={invoice.event.date} 
                        onChange={(e) => handleInputChange(e, 'event', 'date')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Event Time</label>
                      <input 
                        type="time" 
                        value={invoice.event.time} 
                        onChange={(e) => handleInputChange(e, 'event', 'time')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Venue</label>
                      <input 
                        type="text" 
                        value={invoice.event.venue} 
                        onChange={(e) => handleInputChange(e, 'event', 'venue')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Guest Count</label>
                      <input 
                        type="number" 
                        value={invoice.event.guestCount} 
                        onChange={(e) => handleInputChange(e, 'event', 'guestCount')}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                   <div className="flex items-start mb-1">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="font-medium">
                          {formatDate(invoice.event.date)}
                          {invoice.event.time && <span className="text-gray-600 ml-2">at {formatTime(invoice.event.time)}</span>}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start mb-1">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      <div>
                        <p className="text-gray-600">{invoice.event.guestCount} guests</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                      <p>{invoice.event.venue}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    {isNewInvoice && (
                      <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-3 py-4 text-sm text-gray-900">
                        {isNewInvoice ? (
                          <input 
                            type="text" 
                            value={item.description} 
                            onChange={(e) => handleInputChange(e, 'items', 'description', index)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                            placeholder="Item description"
                          />
                        ) : item.description}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-center">
                        {isNewInvoice ? (
                          <input 
                            type="number" 
                            value={item.quantity} 
                            onChange={(e) => handleInputChange(e, 'items', 'quantity', index)}
                            className="block w-20 mx-auto text-center border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                            min="1"
                          />
                        ) : item.quantity}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-right">
                        {isNewInvoice ? (
                          <input 
                            type="number" 
                            value={item.price} 
                            onChange={(e) => handleInputChange(e, 'items', 'price', index)}
                            className="block w-24 ml-auto text-right border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                            min="0"
                            step="0.01"
                          />
                        ) : formatCurrency(item.price)}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-900 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      {isNewInvoice && (
                        <td className="px-3 py-4 text-sm text-right">
                          <button 
                            onClick={() => removeItem(index)}
                            className="text-pink-600 hover:text-pink-900 transition-colors"
                            disabled={invoice.items.length <= 1}
                          >
                            Remove
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {isNewInvoice && (
              <div className="mt-3">
                <button 
                  onClick={addItem}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  + Add Item
                </button>
              </div>
            )}
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
                    <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-3 py-4 text-sm text-gray-900">{formatDate(payment.date)}</td>
                      <td className="px-3 py-4 text-sm text-gray-900">{payment.method}</td>
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
                {isNewInvoice ? (
                  <textarea
                    name="notes"
                    value={invoice.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                    placeholder="Add notes about the order..."
                  />
                ) : (
                  <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.notes}</p>
                )}
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Terms & Conditions</h2>
                {isNewInvoice ? (
                  <textarea
                    name="terms"
                    value={invoice.terms}
                    onChange={handleInputChange}
                    rows={4}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:border-coral-500 focus:ring focus:ring-coral-500 focus:ring-opacity-50"
                    placeholder="Add terms and conditions..."
                  />
                ) : (
                  <p className="text-sm text-gray-600 whitespace-pre-line">{invoice.terms}</p>
                )}
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
      </div>
    </div>
  );
};

export default Invoice;