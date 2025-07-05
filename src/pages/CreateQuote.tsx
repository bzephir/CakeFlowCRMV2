import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Logo from '../components/Logo';
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
  Mail,
  Download,
  Eye,
  Save,
  Send,
  X,
  Search,
  ChevronDown,
  Calculator,
  Percent,
  Truck,
  MessageSquare,
  Building2,
  Phone,
  MapPin
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

interface LineItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuoteFormData {
  quoteNumber: string;
  customerId: string;
  customerInfo: Customer | null;
  quoteDate: string;
  expirationDate: string;
  poNumber: string;
  lineItems: LineItem[];
  subtotal: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  shippingFee: number;
  total: number;
  customerNotes: string;
  internalNotes: string;
  termsConditions: string;
}

const CreateQuote: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quoteNumber = location.state?.quoteNumber || generateDocumentNumber('quote');

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

  const [formData, setFormData] = useState<QuoteFormData>({
    quoteNumber,
    customerId: '',
    customerInfo: null,
    quoteDate: new Date().toISOString().split('T')[0],
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    poNumber: '',
    lineItems: [
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
    discountType: 'percentage',
    discountValue: 0,
    discountAmount: 0,
    taxRate: 7.0, // 7% default tax rate
    taxAmount: 0,
    shippingFee: 0,
    total: 0,
    customerNotes: '',
    internalNotes: '',
    termsConditions: 'Payment terms: 50% deposit required to confirm order. Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.'
  });

  const [customerSearch, setCustomerSearch] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  // Calculate totals whenever line items, discount, or shipping changes
  useEffect(() => {
    calculateTotals();
  }, [formData.lineItems, formData.discountType, formData.discountValue, formData.taxRate, formData.shippingFee]);

  const calculateTotals = () => {
    const subtotal = formData.lineItems.reduce((sum, item) => sum + item.total, 0);
    
    let discountAmount = 0;
    if (formData.discountValue > 0) {
      if (formData.discountType === 'percentage') {
        discountAmount = (subtotal * formData.discountValue) / 100;
      } else {
        discountAmount = formData.discountValue;
      }
    }
    
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * formData.taxRate) / 100;
    const total = afterDiscount + taxAmount + formData.shippingFee;

    setFormData(prev => ({
      ...prev,
      subtotal,
      discountAmount,
      taxAmount,
      total
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

  const addLineItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }));
  };

  const removeLineItem = (id: string) => {
    if (formData.lineItems.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          
          // Recalculate total for this line item
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const selectProduct = (lineItemId: string, product: any) => {
    updateLineItem(lineItemId, 'name', product.name);
    updateLineItem(lineItemId, 'unitPrice', product.price);
    setShowProductDropdown(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerId) {
      newErrors.customer = 'Please select a customer';
    }
    
    if (!formData.quoteDate) {
      newErrors.quoteDate = 'Quote date is required';
    }
    
    if (!formData.expirationDate) {
      newErrors.expirationDate = 'Expiration date is required';
    }
    
    if (formData.lineItems.some(item => !item.name.trim())) {
      newErrors.lineItems = 'All line items must have a name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDraft = () => {
    if (validateForm()) {
      console.log('Saving quote as draft:', formData);
      alert('Quote saved as draft successfully!');
      navigate('/quotes');
    }
  };

  const handleSendQuote = () => {
    if (validateForm()) {
      console.log('Sending quote to customer:', formData);
      alert(`Quote ${formData.quoteNumber} sent to ${formData.customerInfo?.email} successfully!`);
      navigate('/quotes');
    }
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF for quote:', formData.quoteNumber);
    alert('PDF download functionality would be implemented here');
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
      <Header title="Create Quote" />
      
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
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
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

            {/* Quote Details */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-aqua-500" />
                  Quote Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quote Number
                    </label>
                    <input
                      type="text"
                      value={formData.quoteNumber}
                      readOnly
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PO/Reference Number
                    </label>
                    <input
                      type="text"
                      value={formData.poNumber}
                      onChange={(e) => setFormData(prev => ({ ...prev, poNumber: e.target.value }))}
                      placeholder="Optional"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quote Date *
                    </label>
                    <input
                      type="date"
                      value={formData.quoteDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, quoteDate: e.target.value }))}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.quoteDate
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                    />
                    {errors.quoteDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.quoteDate}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date *
                    </label>
                    <input
                      type="date"
                      value={formData.expirationDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, expirationDate: e.target.value }))}
                      className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                        errors.expirationDate
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                    />
                    {errors.expirationDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.expirationDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Package className="h-5 w-5 mr-2 text-mint-500" />
                    Line Items
                  </h3>
                  <button
                    onClick={addLineItem}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-mint-400 to-mint-500 hover:from-mint-500 hover:to-mint-600 transition-all"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </button>
                </div>

                {errors.lineItems && (
                  <p className="mb-4 text-sm text-red-600">{errors.lineItems}</p>
                )}

                <div className="space-y-4">
                  {formData.lineItems.map((item, index) => (
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
                              onChange={(e) => updateLineItem(item.id, 'name', e.target.value)}
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
                            onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
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
                            onChange={(e) => updateLineItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
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
                              onChange={(e) => updateLineItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
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
                          {formData.lineItems.length > 1 && (
                            <button
                              onClick={() => removeLineItem(item.id)}
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

            {/* Totals */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-pink-500" />
                  Totals
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount
                      </label>
                      <div className="flex space-x-2">
                        <select
                          value={formData.discountType}
                          onChange={(e) => setFormData(prev => ({ ...prev, discountType: e.target.value as 'percentage' | 'fixed' }))}
                          className="block w-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                        >
                          <option value="percentage">%</option>
                          <option value="fixed">$</option>
                        </select>
                        <input
                          type="number"
                          min="0"
                          step={formData.discountType === 'percentage' ? '1' : '0.01'}
                          value={formData.discountValue}
                          onChange={(e) => setFormData(prev => ({ ...prev, discountValue: parseFloat(e.target.value) || 0 }))}
                          placeholder="0"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                        />
                      </div>
                    </div>
                    
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
                        Shipping/Delivery Fee
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.shippingFee}
                          onChange={(e) => setFormData(prev => ({ ...prev, shippingFee: parseFloat(e.target.value) || 0 }))}
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
                      
                      {formData.discountAmount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Discount:</span>
                          <span className="font-medium text-red-600">-{formatCurrency(formData.discountAmount)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax ({formData.taxRate}%):</span>
                        <span className="font-medium">{formatCurrency(formData.taxAmount)}</span>
                      </div>
                      
                      {formData.shippingFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="font-medium">{formatCurrency(formData.shippingFee)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between">
                          <span className="text-base font-semibold text-gray-900">Total:</span>
                          <span className="text-lg font-bold text-coral-600">{formatCurrency(formData.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-aqua-500" />
                  Notes & Terms
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.customerNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerNotes: e.target.value }))}
                      placeholder="Notes visible to customer..."
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Internal Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.internalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, internalNotes: e.target.value }))}
                      placeholder="Internal notes (not visible to customer)..."
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Terms & Conditions
                    </label>
                    <textarea
                      rows={4}
                      value={formData.termsConditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, termsConditions: e.target.value }))}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Preview & Actions */}
          <div className="space-y-6">
            {/* Quote Preview */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Quote Preview</h3>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-coral-600 hover:text-coral-700 transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Company Branding */}
                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Logo className="text-coral-500" size="md" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Sweet Delights Bakery</h4>
                      <p className="text-sm text-gray-600">Professional Cake Services</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>123 Frosting Lane</p>
                    <p>Sugarville, CA 90210</p>
                    <p>(555) 987-6543</p>
                  </div>
                </div>
                
                {/* Quote Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quote #:</span>
                    <span className="font-medium">{formData.quoteNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">{formData.customerInfo?.name || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items:</span>
                    <span className="font-medium">{formData.lineItems.length}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="font-bold text-coral-600">{formatCurrency(formData.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Actions</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={handleSendQuote}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send to Customer
                  </button>
                  
                  <button
                    onClick={handleSaveDraft}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save as Draft
                  </button>
                  
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </button>
                  
                  <button
                    onClick={() => setShowPreview(true)}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Quote
                  </button>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <button
                      onClick={() => navigate('/quotes')}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
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

export default CreateQuote;