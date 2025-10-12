import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInvoiceContext } from '../context/InvoiceContext';
import Header from '../components/Header';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { getInvoiceStatusColor, getInvoiceStatusText } from '../data/mockData';
import { Plus, Search, Filter, Eye, CreditCard as Edit, Mail, Download, Trash2, CheckCircle2, DollarSign, Clock, CreditCard, AlertCircle, FileText, Hourglass, Ban } from 'lucide-react';

const Invoices: React.FC = () => {
  const navigate = useNavigate();
  const { invoices, deleteInvoice } = useInvoiceContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Hourglass className="h-4 w-4 mr-1" />;
      case 'deposit_paid': return <CreditCard className="h-4 w-4 mr-1" />;
      case 'partial': return <Clock className="h-4 w-4 mr-1" />;
      case 'paid': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'cancelled': return <Ban className="h-4 w-4 mr-1" />;
      default: return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const handleCreateInvoice = () => {
    // Generate new invoice number and navigate to create invoice page
    const newInvoiceNumber = generateDocumentNumber('invoice');
    console.log('Creating new invoice with number:', newInvoiceNumber);
    navigate('/invoice/new', { state: { invoiceNumber: newInvoiceNumber } });
  };

  const handleEditInvoice = (invoiceId: string) => {
    // Navigate to invoice edit page
    navigate(`/invoice/${invoiceId}/edit`);
  };

  const handleSendInvoice = (invoiceId: string) => {
    // Send invoice email
    alert(`Email invoice ${invoiceId} to customer`);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // Download invoice as PDF
    alert(`Download invoice ${invoiceId} as PDF`);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    // Delete invoice
    if (confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(invoiceId);
      alert(`Invoice ${invoiceId} deleted successfully!`);
    }
  };

  const handleBulkAction = (action: 'send' | 'delete') => {
    if (selectedInvoices.length === 0) {
      alert('Please select at least one invoice');
      return;
    }

    if (action === 'send') {
      alert(`Send ${selectedInvoices.length} invoices to customers`);
    } else if (action === 'delete') {
      alert(`Delete ${selectedInvoices.length} invoices`);
    }
  };

  const toggleSelectInvoice = (invoiceId: string) => {
    if (selectedInvoices.includes(invoiceId)) {
      setSelectedInvoices(selectedInvoices.filter(id => id !== invoiceId));
    } else {
      setSelectedInvoices([...selectedInvoices, invoiceId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedInvoices.length === filteredInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(filteredInvoices.map(invoice => invoice.id));
    }
  };

  // Filter invoices based on search term and status filter
  const filteredInvoices = invoices.filter(invoice => {
    const fullName = `${invoice.firstName} ${invoice.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         invoice.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Sort invoices by issue date (newest first)
  const sortedInvoices = [...filteredInvoices].sort((a, b) => 
    new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
  );
  const currentInvoices = sortedInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <Header title="Invoice"icon={DollarSign} />
      <div className="p-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="deposit_paid">Deposit Paid</option>
                <option value="partial">Partial</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleCreateInvoice}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedInvoices.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {selectedInvoices.length} selected
            </span>
            <button 
              onClick={() => handleBulkAction('send')}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <Mail className="h-3 w-3 mr-1" />
              Send
            </button>
            <button 
              onClick={() => handleBulkAction('delete')}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </button>
          </div>
        )}

        {/* Invoices Header */}
        <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 flex justify-center">
                <input
                  type="checkbox"
                  checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
              </div>
              <div className="w-28">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</span>
              </div>
              <div className="w-24 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</span>
              </div>
              <div className="w-36 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</span>
              </div>
              <div className="w-24 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</span>
              </div>
              <div className="w-24 text-right">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total</span>
              </div>
              <div className="w-24 text-right">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</span>
              </div>
              <div className="w-24 text-right">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Due</span>
              </div>
              <div className="w-28 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment</span>
              </div>
              <div className="w-32 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
              </div>
            </div>
            <div className="w-44">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider"></span>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="space-y-0">
          {currentInvoices.map((invoice) => (
            <div key={invoice.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-10 flex justify-center">
                    <input
                      type="checkbox"
                      checked={selectedInvoices.includes(invoice.id)}
                      onChange={() => toggleSelectInvoice(invoice.id)}
                      className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="w-28">
                    <span className="text-sm font-medium text-gray-700 cursor-pointer hover:text-aqua-600" onClick={() => handleViewInvoice(invoice.id)}>
                      {invoice.id}
                    </span>
                  </div>
                  <div className="w-24 text-left">
                    <span className="text-sm text-gray-700">{formatDate(invoice.issueDate)}</span>
                  </div>
                  <div className="w-36 text-left">
                    <span className="text-sm font-medium text-gray-700">{invoice.firstName} {invoice.lastName}</span>
                  </div>
                  <div className="w-24 text-left">
                    <span className="text-sm text-gray-700">{invoice.eventType}</span>
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(invoice.total)}</span>
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amountPaid)}</span>
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-sm font-medium text-gray-900">{formatCurrency(invoice.balance)}</span>
                  </div>
                  <div className="w-28 text-left">
                    <span className="text-sm text-gray-700">{formatDate(invoice.dueDate)}</span>
                  </div>
                  <div className="w-32 flex justify-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      {getInvoiceStatusText(invoice.status)}
                    </span>
                  </div>
                </div>
                <div className="w-44 flex justify-end space-x-2">
                  <button
                    onClick={() => handleViewInvoice(invoice.id)}
                    className="text-aqua-600 hover:text-aqua-900 transition-colors"
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEditInvoice(invoice.id)}
                    className="text-coral-600 hover:text-coral-900 transition-colors"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleSendInvoice(invoice.id)}
                    className="text-mint-600 hover:text-mint-900 transition-colors"
                    title="Send"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="text-aqua-600 hover:text-aqua-900 transition-colors"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteInvoice(invoice.id)}
                    className="text-pink-600 hover:text-pink-900 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredInvoices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No invoices found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by creating your first invoice'
              }
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredInvoices.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredInvoices.length)} of {filteredInvoices.length} invoices
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === 1
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    currentPage === number
                      ? 'bg-coral-100 border-coral-500 text-coral-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 border rounded-md text-sm ${
                  currentPage === totalPages
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;