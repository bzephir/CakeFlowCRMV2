import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import VenueSelector from '../components/VenueSelector';
import { Venue } from '../types/venue';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { 
  ArrowLeft,
  Plus,
  Trash2,
  User,
  Calendar,
  FileText,
  DollarSign,
  Package,
  Save,
  X,
  Search,
  ChevronDown,
  Calculator,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Truck
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

interface OrderFormData {
  orderNumber: string;
  customerId: string;
  customerInfo: Customer | null;
  eventDate: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime: string;
  deliveryTime: string;
  eventTime: string;
  eventType: string;
  selectedVenue: Venue | null;
  guestCount: number;
  orderItems: OrderItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  depositAmount: number;
  balance: number;
  specialInstructions: string;
  deliveryNotes: string;
  status: 'inquiry' | 'quoted' | 'confirmed' | 'in-production' | 'completed';
}

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || generateDocumentNumber('order');

  // Mock customers data
  const customers: Customer[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '(555) 123-4567',
      address: '123 Main Street',
      city: 'Springfield',
      state: 'IL',
      zip: '62701'
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike@email.com',
      phone: '(555) 234-5678',
      address: '456 Oak Avenue',
      city: 'Springfield',
      state: 'IL',
      zip: '62702'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma@email.com',
      phone: '(555) 345-6789',
      address: '789 Pine Road',
      city: 'Springfield',
      state: 'IL',
      zip: '62703'
    }
  ];

  // Mock products/services
  const products = [
    { id: '1', name: 'Wedding Cake - 3 Tier', price: 450.00 },
    { id: '2', name: 'Birthday Cake - Custom', price: 85.00 },
    { id: '3', name: 'Cupcakes (dozen)', price: 36.00 },
    { id: '4', name: 'Cake Delivery', price: 25.00 },
    { id: '5', name: 'Setup Service', price: 50.00 }
  ];

  const eventTypes = [
    'Wedding', 'Birthday', 'Anniversary', 'Corporate Event', 'Baby Shower',
    'Graduation', 'Holiday Party', 'Bridal Shower', 'Engagement', 'Other'
  ];

  const [formData, setFormData] = useState<OrderFormData>({
    orderNumber,
    customerId: '',
    customerInfo: null,
    eventDate: '',
    fulfillmentType: 'pickup',
    pickupTime: '',
    deliveryTime: '',
    eventTime: '',
    eventType: '',
    selectedVenue: null,
    guestCount: 0,
    orderItems: [
      {
        id: '1',
        name: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }
    ],
    subtotal: 0,
    taxRate: 7.0,
    taxAmount: 0,
    total: 0,
    depositAmount: 0,
    balance: 0,
    specialInstructions: '',
    deliveryNotes: '',
    status: 'inquiry'
  });

  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculate totals whenever order items or tax rate changes
  useEffect(() => {
    calculateTotals();
  }, [formData.orderItems, formData.taxRate, formData.depositAmount]);

  const calculateTotals = () => {
    const subtotal = formData.orderItems.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = (subtotal * formData.taxRate) / 100;
    const total = subtotal + taxAmount;
    const balance = total - formData.depositAmount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
      balance
    }));
  };

  const handleCustomerSelect = (customer: Customer) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id,
      customerInfo: customer
    }));
    setCustomerSearch(customer.name);
    setShowCustomerDropdown(false);
  };

  const addOrderItem = () => {
    const newItem: OrderItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    
    setFormData(prev => ({
      ...prev,
      orderItems: [...prev.orderItems, newItem]
    }));
  };

  const removeOrderItem = (id: string) => {
    if (formData.orderItems.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      orderItems: prev.orderItems.filter(item => item.id !== id)
    }));
  };

  const updateOrderItem = (id: string, field: keyof OrderItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      orderItems: prev.orderItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate total for this order item
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const selectProduct = (orderItemId: string, product: any) => {
    updateOrderItem(orderItemId, 'name', product.name);
    updateOrderItem(orderItemId, 'unitPrice', product.price);
    setShowProductDropdown(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerId) {
      newErrors.customer = 'Please select a customer';
    }
    
    if (!formData.eventDate) {
      newErrors.eventDate = 'Event date is required';
    }
    
    if (!formData.eventType) {
      newErrors.eventType = 'Event type is required';
    }
    
    if (formData.fulfillmentType === 'pickup' && !formData.pickupTime) {
      newErrors.pickupTime = 'Pickup time is required';
    }
    
    if (formData.fulfillmentType === 'delivery' && !formData.deliveryTime) {
      newErrors.deliveryTime = 'Delivery time is required';
    }
    
    if (formData.orderItems.some(item => !item.name.trim())) {
      newErrors.orderItems = 'All order items must have a name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveOrder = () => {
    if (validateForm()) {
      console.log('Saving order:', formData);
      alert(`Order ${formData.orderNumber} saved successfully!`);
      navigate('/orders');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Create Order" />
      
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Orders
        </button>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Customer Information */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-coral-500" />
                Customer Information
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Customer *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => {
                        setCustomerSearch(e.target.value);
                        setShowCustomerDropdown(true);
                      }}
                      onFocus={() => setShowCustomerDropdown(true)}
                      placeholder="Search customers..."
                      className={`block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.customer
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {showCustomerDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
                      {filteredCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          onClick={() => handleCustomerSelect(customer)}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900">{customer.name}</span>
                            <span className="ml-2 text-gray-500">{customer.email}</span>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 py-2 px-3">
                        <button className="text-sm text-coral-600 hover:text-coral-700 font-medium">
                          + Add New Customer
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {errors.customer && (
                    <p className="mt-1 text-sm text-red-600">{errors.customer}</p>
                  )}
                </div>

                {/* Customer Details Display */}
                {formData.customerInfo && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {formData.customerInfo.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        {formData.customerInfo.phone}
                      </div>
                      <div className="flex items-start text-sm text-gray-600 md:col-span-2">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400 mt-0.5" />
                        <div>
                          {formData.customerInfo.address}<br />
                          {formData.customerInfo.city}, {formData.customerInfo.state} {formData.customerInfo.zip}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-aqua-500" />
                Order Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Number
                  </label>
                  <input
                    type="text"
                    value={formData.orderNumber}
                    readOnly
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  >
                    <option value="inquiry">Inquiry</option>
                    <option value="quoted">Quoted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="in-production">In Production</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Event Information */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-mint-500" />
                Event Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Date *
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.eventDate
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventDate}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fulfillment Type *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.fulfillmentType === 'pickup' 
                        ? 'border-mint-500 bg-mint-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="fulfillmentType"
                        value="pickup"
                        checked={formData.fulfillmentType === 'pickup'}
                        onChange={(e) => setFormData(prev => ({ ...prev, fulfillmentType: e.target.value as 'pickup' | 'delivery' }))}
                        className="sr-only"
                      />
                      <Package className="h-5 w-5 mr-3 text-mint-500" />
                      <div>
                        <div className="font-medium text-gray-900">Pickup</div>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.fulfillmentType === 'delivery' 
                        ? 'border-coral-500 bg-coral-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="fulfillmentType"
                        value="delivery"
                        checked={formData.fulfillmentType === 'delivery'}
                        onChange={(e) => setFormData(prev => ({ ...prev, fulfillmentType: e.target.value as 'pickup' | 'delivery' }))}
                        className="sr-only"
                      />
                      <Truck className="h-5 w-5 mr-3 text-coral-500" />
                      <div>
                        <div className="font-medium text-gray-900">Delivery</div>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div>
                  {formData.fulfillmentType === 'pickup' ? (
                    <>
                      <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Pickup Time *
                      </label>
                      <input
                        type="time"
                        id="pickupTime"
                        name="pickupTime"
                        value={formData.pickupTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, pickupTime: e.target.value }))}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                          errors.pickupTime
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                        }`}
                      />
                      {errors.pickupTime && (
                        <p className="mt-1 text-sm text-red-600">{errors.pickupTime}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Time *
                      </label>
                      <input
                        type="time"
                        id="deliveryTime"
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                          errors.deliveryTime
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                        }`}
                      />
                      {errors.deliveryTime && (
                        <p className="mt-1 text-sm text-red-600">{errors.deliveryTime}</p>
                      )}
                    </>
                  )}
                </div>
                
                <div>
                  <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Time
                  </label>
                  <input
                    type="time"
                    id="eventTime"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventTime: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Only required if this order is for an event</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Type *
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                    className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.eventType
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-sm text-red-600">{errors.eventType}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guest Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.guestCount || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, guestCount: parseInt(e.target.value) || 0 }))}
                    placeholder="Number of guests"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <VenueSelector
                    selectedVenue={formData.selectedVenue}
                    onVenueSelect={(venue) => setFormData(prev => ({ ...prev, selectedVenue: venue }))}
                    className="relative"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-pink-500" />
                  Order Items
                </h3>
                <button
                  onClick={addOrderItem}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </button>
              </div>

              {errors.orderItems && (
                <p className="mb-4 text-sm text-red-600">{errors.orderItems}</p>
              )}

              <div className="space-y-4">
                {formData.orderItems.map((item, index) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Product/Service *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateOrderItem(item.id, 'name', e.target.value)}
                            onFocus={() => setShowProductDropdown(item.id)}
                            placeholder="Enter or select product"
                            className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                          
                          {showProductDropdown === item.id && (
                            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                              {products.map((product) => (
                                <div
                                  key={product.id}
                                  onClick={() => selectProduct(item.id, product)}
                                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                                >
                                  <div className="flex justify-between">
                                    <span className="font-medium text-gray-900">{product.name}</span>
                                    <span className="text-gray-500">{formatCurrency(product.price)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateOrderItem(item.id, 'description', e.target.value)}
                          placeholder="Optional description"
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(e) => updateOrderItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit Price
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateOrderItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-1 flex items-end">
                        <div className="w-full">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Total
                          </label>
                          <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-medium text-right">
                            {formatCurrency(item.total)}
                          </div>
                        </div>
                        {formData.orderItems.length > 1 && (
                          <button
                            onClick={() => removeOrderItem(item.id)}
                            className="ml-2 p-2 text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Payment */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-aqua-500" />
                Pricing & Payment
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={formData.taxRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deposit Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.depositAmount}
                        onChange={(e) => setFormData(prev => ({ ...prev, depositAmount: parseFloat(e.target.value) || 0 }))}
                        className="block w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(formData.subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax ({formData.taxRate}%):</span>
                      <span className="font-medium">{formatCurrency(formData.taxAmount)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-base font-semibold text-gray-900">Total:</span>
                        <span className="text-lg font-bold text-coral-600">{formatCurrency(formData.total)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deposit:</span>
                      <span className="font-medium">{formatCurrency(formData.depositAmount)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">Balance Due:</span>
                      <span className="text-lg font-bold text-aqua-600">{formatCurrency(formData.balance)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={formData.specialInstructions}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                    placeholder="Any special requirements or instructions..."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.deliveryNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryNotes: e.target.value }))}
                    placeholder="Delivery instructions, setup requirements, etc..."
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={() => navigate('/orders')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4 mr-2 inline" />
              Cancel
            </button>
            <button
              onClick={handleSaveOrder}
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all shadow-sm"
            >
              <Save className="h-4 w-4 mr-2 inline" />
              Save Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;