import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Logo from '../components/Logo';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
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
  AlertCircle,
  CreditCard,
  Hourglass,
  ShoppingBag
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

interface OrderItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference?: string;
}

interface OrderData {
  id: string;
  customer: Customer;
  orderDate: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime: string;
  deliveryTime: string;
  eventTime: string;
  eventDate: string;
  eventType: string;
  venue?: string;
  guestCount?: number;
  orderItems: OrderItem[];
  payments: Payment[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  depositAmount: number;
  balance: number;
  specialInstructions: string;
  deliveryNotes: string;
  status: 'inquiry' | 'quoted' | 'confirmed' | 'in-production' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
  lastUpdated: string;
}

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock orders data
  const mockOrders: OrderData[] = [
    {
      id: 'O-202501-0001',
      customer: {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@email.com',
        phone: '(555) 123-4567',
        address: '123 Main Street',
        city: 'Springfield',
        state: 'IL',
        zip: '62701'
      },
      orderDate: '2025-01-01',
      fulfillmentType: 'delivery',
      pickupTime: '',
      deliveryTime: '13:00',
      eventTime: '15:00',
      eventDate: '2025-01-15',
      eventType: 'Wedding',
      venue: 'Grand Ballroom at The Plaza',
      guestCount: 120,
      orderItems: [
        { id: '1', name: '3-Tier Wedding Cake', description: 'Vanilla cake with buttercream frosting', quantity: 1, unitPrice: 450.00, total: 450.00 }
      ],
      payments: [
        { id: '1', date: '2025-01-01', amount: 225.00, method: 'Credit Card', reference: 'TXID-12345' }
      ],
      subtotal: 450.00,
      taxRate: 7.0,
      taxAmount: 31.50,
      total: 481.50,
      depositAmount: 225.00,
      balance: 256.50,
      specialInstructions: 'Cake should match wedding colors: blush pink and gold.',
      deliveryNotes: 'Delivery to venue at 1:00 PM. Ask for event coordinator at main entrance.',
      status: 'in-production',
      createdBy: 'admin',
      createdAt: '2025-01-01T10:30:00Z',
      lastUpdated: '2025-01-05T14:15:00Z'
    },
    {
      id: 'O-202501-0002',
      customer: {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@email.com',
        phone: '(555) 234-5678',
        address: '456 Oak Avenue',
        city: 'Springfield',
        state: 'IL',
        zip: '62702'
      },
      orderDate: '2025-01-05',
      fulfillmentType: 'pickup',
      pickupTime: '15:30',
      deliveryTime: '',
      eventTime: '17:00',
      eventDate: '2025-01-16',
      eventType: 'Birthday',
      guestCount: 25,
      orderItems: [
        { id: '1', name: 'Custom Birthday Cake', description: 'Chocolate cake with chocolate ganache', quantity: 1, unitPrice: 85.00, total: 85.00 },
        { id: '2', name: 'Cupcakes (dozen)', description: 'Assorted flavors', quantity: 1, unitPrice: 36.00, total: 36.00 }
      ],
      payments: [
        { id: '1', date: '2025-01-05', amount: 60.00, method: 'Cash' }
      ],
      subtotal: 121.00,
      taxRate: 7.0,
      taxAmount: 8.47,
      total: 129.47,
      depositAmount: 60.00,
      balance: 69.47,
      specialInstructions: 'Birthday cake for 40th celebration. Include "Happy 40th Mike!" text.',
      deliveryNotes: '',
      status: 'confirmed',
      createdBy: 'admin',
      createdAt: '2025-01-05T11:45:00Z',
      lastUpdated: '2025-01-05T11:45:00Z'
    },
    {
      id: 'O-202501-0003',
      customer: {
        id: '3',
        name: 'Emma Davis',
        email: 'emma@email.com',
        phone: '(555) 345-6789',
        address: '789 Pine Road',
        city: 'Springfield',
        state: 'IL',
        zip: '62703'
      },
      orderDate: '2025-01-10',
      fulfillmentType: 'delivery',
      pickupTime: '',
      deliveryTime: '15:30',
      eventTime: '16:00',
      eventDate: '2025-01-18',
      eventType: 'Corporate Event',
      venue: 'TechCorp Headquarters',
      guestCount: 50,
      orderItems: [
        { id: '1', name: 'Corporate Cupcakes', description: 'With company logo', quantity: 48, unitPrice: 2.50, total: 120.00 },
        { id: '2', name: 'Branded Cookies', description: 'Company logo cookies', quantity: 48, unitPrice: 3.00, total: 144.00 },
        { id: '3', name: 'Delivery', description: 'Delivery to corporate office', quantity: 1, unitPrice: 25.00, total: 25.00 }
      ],
      payments: [],
      subtotal: 289.00,
      taxRate: 7.0,
      taxAmount: 20.23,
      total: 309.23,
      depositAmount: 0.00,
      balance: 309.23,
      specialInstructions: 'All items must have company branding as per provided logo.',
      deliveryNotes: 'Deliver to reception desk. Contact Emma upon arrival.',
      status: 'quoted',
      createdBy: 'admin',
      createdAt: '2025-01-10T09:30:00Z',
      lastUpdated: '2025-01-10T09:30:00Z'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch order data
    setLoading(true);
    
    // Find the order with the matching ID
    const foundOrder = mockOrders.find(o => o.id === id);
    
    if (foundOrder) {
      setOrder(foundOrder);
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
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'in-production': return <ShoppingBag className="h-4 w-4 mr-1" />;
      case 'confirmed': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'quoted': return <FileText className="h-4 w-4 mr-1" />;
      case 'inquiry': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4 mr-1" />;
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
    alert(`Email would be sent to ${order?.customer.email}`);
  };

  const handleEdit = () => {
    navigate(`/orders/${id}/edit`);
  };

  const handleCreateInvoice = () => {
    // Generate new invoice number
    const invoiceNumber = generateDocumentNumber('invoice');
    
    // Navigate to create invoice page with order data
    navigate('/invoice/new', { 
      state: { 
        invoiceNumber,
        convertedFromOrder: id,
        customerId: order?.customer.id,
        customerName: order?.customer.name
      } 
    });
  };

  const handleDuplicate = () => {
    // Generate new order number
    const orderNumber = generateDocumentNumber('order');
    
    // Navigate to create order page with duplicated data
    navigate('/orders/new', { 
      state: { 
        orderNumber,
        duplicateFrom: id
      } 
    });
  };

  const handleDelete = () => {
    // In a real app, this would delete the order
    if (confirm('Are you sure you want to delete this order?')) {
      alert(`Order ${id} deleted successfully`);
      navigate('/orders');
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
    <div className="flex-1 overflow-hidden print:block">
      <div className="hidden print:block p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Logo className="text-coral-500" size="md" />
            <span className="text-xl font-semibold text-gray-900 tracking-tight">CakeFlow CRM</span>
          </div>
        </div>
      </div>
      
      <Header title="Order Details" />
      
      <div className="p-6 print:p-0">
        {/* Back Button - hide when printing */}
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors print:hidden"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </button>

        {/* Order Actions - hide when printing */}
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
            Email Order
          </button>
          <button 
            onClick={handleEdit}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 mr-3"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button 
            onClick={handleCreateInvoice}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
          >
            <DollarSign className="h-4 w-4 mr-2" />
            Create Invoice
          </button>
        </div>

        {/* Order Document */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
          {/* Order Header */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="hidden print:flex items-center space-x-3 mb-4">
                    <Logo className="text-coral-500" size="md" />
                    <span className="text-xl font-semibold text-gray-900 tracking-tight">CakeFlow CRM</span>
                  </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">ORDER</h1>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Order #:</span> {order.id}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Date:</span> {formatDate(order.orderDate)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Event Date:</span> {formatDate(order.eventDate)}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status.replace('-', ' ')}</span>
                  </span>
                </div>
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

          {/* Customer & Event Details */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="font-medium">{order.customer.name}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`mailto:${order.customer.email}`} className="hover:text-coral-600 transition-colors">
                      {order.customer.email}
                    </a>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <a href={`tel:${order.customer.phone}`} className="hover:text-coral-600 transition-colors">
                      {order.customer.phone}
                    </a>
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                    <div>
                      {order.customer.address}<br />
                      {order.customer.city}, {order.customer.state} {order.customer.zip}
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
                      <span className="font-medium">Event Date:</span> {formatDate(order.eventDate)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">Event Time:</span> {order.eventTime ? formatTime(order.eventTime) : 'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    {order.fulfillmentType === 'pickup' ? (
                      <>
                        <Package className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          <span className="font-medium">Pickup Time:</span> {order.pickupTime ? formatTime(order.pickupTime) : 'Not specified'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Truck className="h-4 w-4 mr-2 text-gray-400" />
                        <span>
                          <span className="font-medium">Delivery Time:</span> {order.deliveryTime ? formatTime(order.deliveryTime) : 'Not specified'}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                    <span>
                      <span className="font-medium">Event Type:</span> {order.eventType}
                    </span>
                  </div>
                  {order.venue && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        <span className="font-medium">Venue:</span> {order.venue}
                      </span>
                    </div>
                  )}
                  {order.guestCount && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>
                        <span className="font-medium">Guest Count:</span> {order.guestCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.orderItems.map((item) => (
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

          {/* Order Summary */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="flex justify-end">
              <div className="w-full md:w-64">
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(order.subtotal)}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Tax ({order.taxRate}%):</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(order.taxAmount)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total:</span>
                  <span className="text-base font-medium text-coral-600">{formatCurrency(order.total)}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-600">Deposit Paid:</span>
                  <span className="text-sm font-medium text-gray-900">{formatCurrency(order.depositAmount)}</span>
                </div>
                
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="text-base font-medium text-gray-900">Balance Due:</span>
                  <span className="text-base font-medium text-aqua-600">{formatCurrency(order.balance)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Payment History</h2>
            {order.payments && order.payments.length > 0 ? (
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
                  {order.payments.map((payment) => (
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

          {/* Notes */}
          <div className="px-6 py-4 border-b border-gray-200 print:py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-gray-400" />
                  Special Instructions
                </h2>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 whitespace-pre-line">{order.specialInstructions || 'No special instructions provided.'}</p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-gray-400" />
                  Delivery Notes
                </h2>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600 whitespace-pre-line">{order.deliveryNotes || 'No delivery notes provided.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 print:bg-white print:py-2">
            <div className="text-center">
              <p className="text-sm text-gray-600">Thank you for your business!</p>
              <p className="text-sm text-gray-500">
                If you have any questions about this order, please contact us at
                <span className="text-coral-600"> orders@sweetdelights.com</span> or
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
              Delete Order
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
              onClick={handleCreateInvoice}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;