import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { mockSampleQuoteDetail, mockSampleQuotesDetail, mockQuotesList } from '../data/mockData';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { Plus, Search, Filter, Eye, CreditCard as Edit, Mail, Trash2, Calendar, Copy, FileText, Clock, Receipt, CheckCircle2, XCircle, AlertCircle, ArrowRightCircle, Package, Truck, DollarSign, TrendingUp } from 'lucide-react';

const Quotes: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const quotes = mockQuotesList;

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
      default: return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };

  const handleViewQuote = (quoteId: string) => {
    navigate(`/quotes/${quoteId}`);
  };

  const handleCreateQuote = () => {
    const newQuoteNumber = generateDocumentNumber('quote');
    console.log('Creating new quote with number:', newQuoteNumber);
    navigate('/quotes/new', { state: { quoteNumber: newQuoteNumber } });
  };

  const handleEditQuote = (quoteId: string) => {
    navigate(`/quotes/${quoteId}/edit`);
  };

  const handleSendQuote = (quoteId: string) => {
    alert(`Email quote ${quoteId} to customer`);
  };

  const handleConvertToInvoice = (quoteId: string) => {
    const newInvoiceNumber = generateDocumentNumber('invoice');
    console.log('Converting quote to invoice with number:', newInvoiceNumber);
    navigate('/invoice/new', { state: { convertedFromQuote: quoteId, invoiceNumber: newInvoiceNumber } });
  };

  const handleDuplicateQuote = (quoteId: string) => {
    const newQuoteNumber = generateDocumentNumber('quote');
    console.log('Duplicating quote with new number:', newQuoteNumber);
    alert(`Duplicate quote ${quoteId} as ${newQuoteNumber}`);
  };

  const handleDeleteQuote = (quoteId: string) => {
    alert(`Delete quote ${quoteId}`);
  };

  const handleBulkAction = (action: 'send' | 'delete') => {
    if (selectedQuotes.length === 0) {
      alert('Please select at least one quote');
      return;
    }

    if (action === 'send') {
      alert(`Send ${selectedQuotes.length} quotes to customers`);
    } else if (action === 'delete') {
      alert(`Delete ${selectedQuotes.length} quotes`);
    }
  };

  const toggleSelectQuote = (quoteId: string) => {
    if (selectedQuotes.includes(quoteId)) {
      setSelectedQuotes(selectedQuotes.filter(id => id !== quoteId));
    } else {
      setSelectedQuotes([...selectedQuotes, quoteId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedQuotes.length === filteredQuotes.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(filteredQuotes.map(quote => quote.id));
    }
  };

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const quoteStats = useMemo(() => {
    const total = filteredQuotes.length;
    const totalAmount = filteredQuotes.reduce((sum, quote) => sum + quote.amount, 0);
    const draftCount = filteredQuotes.filter(q => q.status === 'draft').length;
    const sentCount = filteredQuotes.filter(q => q.status === 'sent').length;
    const acceptedCount = filteredQuotes.filter(q => q.status === 'accepted').length;
    const rejectedCount = filteredQuotes.filter(q => q.status === 'rejected').length;
    const expiredCount = filteredQuotes.filter(q => q.status === 'expired').length;

    const today = new Date();
    const sevenDaysFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const expiringSoonCount = filteredQuotes.filter(q => {
      const expiryDate = new Date(q.expiryDate);
      return expiryDate >= today && expiryDate <= sevenDaysFromNow && q.status === 'sent';
    }).length;

    const averageValue = total > 0 ? totalAmount / total : 0;
    const acceptanceRate = sentCount + acceptedCount > 0
      ? ((acceptedCount / (sentCount + acceptedCount + rejectedCount)) * 100).toFixed(0)
      : 0;

    return {
      total,
      totalAmount,
      draftCount,
      sentCount,
      acceptedCount,
      rejectedCount,
      expiredCount,
      expiringSoonCount,
      averageValue,
      acceptanceRate,
    };
  }, [filteredQuotes]);

  const handleSummaryFilter = (status: string) => {
    if (statusFilter === status) {
      setStatusFilter('all');
    } else {
      setStatusFilter(status);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <Header title="Quotes" icon={Receipt} />

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search quotes..."
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
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleCreateQuote}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Quote
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-lg font-semibold text-gray-900">{formatCurrency(quoteStats.totalAmount)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                <Mail className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Sent</p>
              <p className="text-lg font-semibold text-gray-900">{quoteStats.sentCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Accepted</p>
              <p className="text-lg font-semibold text-gray-900">{quoteStats.acceptedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Acceptance Rate</p>
              <p className="text-lg font-semibold text-gray-900">{quoteStats.acceptanceRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedQuotes.length > 0 && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {selectedQuotes.length} selected
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

      {/* Quotes Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="grid grid-cols-[40px_110px_1fr_130px_120px_140px_110px_120px_110px_160px] gap-4 px-6 py-4 items-center">
            <div className="flex justify-center">
              <input
                type="checkbox"
                checked={selectedQuotes.length === filteredQuotes.length && filteredQuotes.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Quote #</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Event Type</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Event Date</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Fulfillment</span>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Expiry Date</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</span>
            </div>
            <div className="text-center">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</span>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-100">
          {currentQuotes.map((quote, index) => (
            <div
              key={quote.id}
              className={`grid grid-cols-[40px_110px_1fr_130px_120px_140px_110px_120px_110px_160px] gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors cursor-pointer ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
              }`}
              onClick={() => handleViewQuote(quote.id)}
            >
              <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedQuotes.includes(quote.id)}
                  onChange={() => toggleSelectQuote(quote.id)}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div>
                <span className="text-sm font-semibold text-aqua-600 hover:text-aqua-700 transition-colors">
                  {quote.id}
                </span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-900 line-clamp-1" title={quote.customer}>
                  {quote.customer}
                </span>
                <span className="text-xs text-gray-500 block mt-0.5">{quote.email}</span>
              </div>
              <div>
                <span className="text-sm text-gray-700">{quote.eventType}</span>
              </div>
              <div>
                <span className="text-sm text-gray-700">{formatDate(quote.eventDate)}</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  {quote.fulfillmentType === 'pickup' ? (
                    <>
                      <div className="w-6 h-6 bg-mint-100 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="h-3.5 w-3.5 text-mint-600" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-medium text-gray-700">Pickup</span>
                        <span className="text-xs text-gray-500">{quote.pickupTime ? formatTime(quote.pickupTime) : 'TBD'}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 bg-aqua-100 rounded flex items-center justify-center flex-shrink-0">
                        <Truck className="h-3.5 w-3.5 text-aqua-600" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-medium text-gray-700">Delivery</span>
                        <span className="text-xs text-gray-500">{quote.deliveryTime ? formatTime(quote.deliveryTime) : 'TBD'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-700">{formatDate(quote.expiryDate)}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(quote.amount)}</span>
              </div>
              <div className="flex justify-center">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(quote.status)}`}>
                  {getStatusIcon(quote.status)}
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-end items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleViewQuote(quote.id)}
                  className="p-1.5 text-aqua-600 hover:bg-aqua-50 rounded-md transition-all"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleEditQuote(quote.id)}
                  className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-all"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-0.5"></div>
                <button
                  onClick={() => handleSendQuote(quote.id)}
                  className="p-1.5 text-mint-600 hover:bg-mint-50 rounded-md transition-all"
                  title="Send"
                >
                  <Mail className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleConvertToInvoice(quote.id)}
                  className="p-1.5 text-coral-600 hover:bg-coral-50 rounded-md transition-all"
                  title="Convert to Invoice"
                >
                  <ArrowRightCircle className="h-4 w-4" />
                </button>
                <div className="w-px h-4 bg-gray-200 mx-0.5"></div>
                <button
                  onClick={() => handleDuplicateQuote(quote.id)}
                  className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-all"
                  title="Duplicate"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteQuote(quote.id)}
                  className="p-1.5 text-pink-600 hover:bg-pink-50 rounded-md transition-all"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No Results */}
      {filteredQuotes.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 text-center py-16">
          <Receipt className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <div className="text-gray-600 text-lg font-medium">No quotes found</div>
          <div className="text-gray-400 text-sm mt-2">
            {searchTerm || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first quote'
            }
          </div>
        </div>
      )}

      {/* Pagination */}
      {filteredQuotes.length > 0 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredQuotes.length)} of {filteredQuotes.length} quotes
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
  );
};

export default Quotes;
