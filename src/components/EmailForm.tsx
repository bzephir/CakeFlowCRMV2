import React, { useState } from 'react';
import { X, Mail, User, Search, Paperclip, Send, Save, Star, AlertCircle } from 'lucide-react';
import { EmailPriority, EmailFormData } from '../types/email';

interface EmailFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmailFormData) => void;
  replyTo?: any; // Email being replied to
}

const EmailForm: React.FC<EmailFormProps> = ({ isOpen, onClose, onSubmit, replyTo }) => {
  const [formData, setFormData] = useState<EmailFormData>({
    to: replyTo?.fromEmail || '',
    cc: '',
    bcc: '',
    subject: replyTo ? `Re: ${replyTo.subject}` : '',
    content: replyTo ? `\n\n--- Original Message ---\nFrom: ${replyTo.fromName} <${replyTo.fromEmail}>\nSent: ${new Date(replyTo.sentAt || replyTo.receivedAt).toLocaleString()}\nSubject: ${replyTo.subject}\n\n${replyTo.content}` : '',
    priority: EmailPriority.NORMAL,
    customerId: replyTo?.customerId || '',
    orderId: replyTo?.orderId || '',
    quoteId: replyTo?.quoteId || '',
    invoiceId: replyTo?.invoiceId || '',
    templateId: '',
    attachments: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');

  // Mock data
  const customers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@email.com' },
    { id: '2', name: 'Mike Chen', email: 'mike.chen@email.com' },
    { id: '3', name: 'Emma Davis', email: 'emma.davis@techcorp.com' },
    { id: '4', name: 'James Wilson', email: 'james.wilson@email.com' },
    { id: '5', name: 'Lisa Park', email: 'lisa.park@email.com' }
  ];

  const emailTemplates = [
    { id: 'TMPL-001', name: 'Wedding Consultation Follow-up' },
    { id: 'TMPL-002', name: 'Thank You Template' },
    { id: 'TMPL-003', name: 'Quote Follow-up' },
    { id: 'TMPL-004', name: 'Payment Reminder' },
    { id: 'TMPL-005', name: 'Order Confirmation' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCustomerSelect = (customer: any) => {
    setFormData(prev => ({
      ...prev,
      customerId: customer.id,
      to: customer.email
    }));
    setCustomerSearch(customer.name);
    setShowCustomerDropdown(false);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      // In a real app, you would load the template content
      setFormData(prev => ({
        ...prev,
        templateId,
        subject: `Template: ${template.name}`,
        content: `[Template content for ${template.name} would be loaded here]`
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.to.trim()) {
      newErrors.to = 'Recipient email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.to)) {
      newErrors.to = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Email content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSend = () => {
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleSaveDraft = () => {
    // Save as draft without validation
    onSubmit({ ...formData, priority: EmailPriority.NORMAL });
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      content: '',
      priority: EmailPriority.NORMAL,
      customerId: '',
      orderId: '',
      quoteId: '',
      invoiceId: '',
      templateId: '',
      attachments: []
    });
    setErrors({});
    setCustomerSearch('');
    onClose();
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {replyTo ? 'Reply to Email' : 'Compose New Email'}
              </h2>
              <p className="text-sm text-gray-500">
                {replyTo ? `Replying to ${replyTo.fromName}` : 'Send an email to customers or team members'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form className="p-6 space-y-6">
          {/* Recipients */}
          <div className="space-y-4">
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                To *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.to
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-aqua-500 focus:border-aqua-500'
                  }`}
                  placeholder="recipient@email.com"
                />
                <button
                  type="button"
                  onClick={() => setShowCustomerDropdown(!showCustomerDropdown)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <User className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              
              {showCustomerDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
                  <div className="px-3 py-2 border-b border-gray-200">
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      placeholder="Search customers..."
                      className="block w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  {filteredCustomers.map((customer) => (
                    <div
                      key={customer.id}
                      onClick={() => handleCustomerSelect(customer)}
                      className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{customer.name}</span>
                        <span className="text-xs text-gray-500">{customer.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {errors.to && (
                <p className="mt-1 text-sm text-red-600">{errors.to}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cc" className="block text-sm font-medium text-gray-700 mb-1">
                  CC
                </label>
                <input
                  type="email"
                  id="cc"
                  name="cc"
                  value={formData.cc}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500"
                  placeholder="cc@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="bcc" className="block text-sm font-medium text-gray-700 mb-1">
                  BCC
                </label>
                <input
                  type="email"
                  id="bcc"
                  name="bcc"
                  value={formData.bcc}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500"
                  placeholder="bcc@email.com"
                />
              </div>
            </div>
          </div>

          {/* Subject and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                  errors.subject
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-aqua-500 focus:border-aqua-500'
                }`}
                placeholder="Enter email subject"
              />
              {errors.subject && (
                <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500"
              >
                <option value={EmailPriority.LOW}>Low</option>
                <option value={EmailPriority.NORMAL}>Normal</option>
                <option value={EmailPriority.HIGH}>High</option>
                <option value={EmailPriority.URGENT}>Urgent</option>
              </select>
            </div>
          </div>

          {/* Template Selection */}
          <div>
            <label htmlFor="templateId" className="block text-sm font-medium text-gray-700 mb-1">
              Use Template (Optional)
            </label>
            <select
              id="templateId"
              name="templateId"
              value={formData.templateId}
              onChange={(e) => {
                handleInputChange(e);
                if (e.target.value) {
                  handleTemplateSelect(e.target.value);
                }
              }}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500"
            >
              <option value="">Select a template</option>
              {emailTemplates.map(template => (
                <option key={template.id} value={template.id}>{template.name}</option>
              ))}
            </select>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="content"
              name="content"
              rows={12}
              value={formData.content}
              onChange={handleInputChange}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                errors.content
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-aqua-500 focus:border-aqua-500'
              }`}
              placeholder="Type your message here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {/* Linked Records */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Link to Records (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="orderId" className="block text-xs font-medium text-gray-600 mb-1">
                  Order
                </label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  value={formData.orderId}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 text-sm"
                  placeholder="O-202501-0001"
                />
              </div>
              
              <div>
                <label htmlFor="quoteId" className="block text-xs font-medium text-gray-600 mb-1">
                  Quote
                </label>
                <input
                  type="text"
                  id="quoteId"
                  name="quoteId"
                  value={formData.quoteId}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 text-sm"
                  placeholder="Q-202501-0001"
                />
              </div>
              
              <div>
                <label htmlFor="invoiceId" className="block text-xs font-medium text-gray-600 mb-1">
                  Invoice
                </label>
                <input
                  type="text"
                  id="invoiceId"
                  name="invoiceId"
                  value={formData.invoiceId}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-aqua-500 focus:border-aqua-500 text-sm"
                  placeholder="I-202501-0001"
                />
              </div>
            </div>
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-aqua-400 transition-colors">
              <Paperclip className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drag and drop files here, or click to browse
              </p>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Choose Files
              </button>
              <p className="text-xs text-gray-500 mt-2">
                PDF, DOC, JPG, PNG up to 10MB each
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </button>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all shadow-sm"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;