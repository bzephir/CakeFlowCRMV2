import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Mail,
  Trash2,
  Calendar,
  Copy,
  FileText,
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  ArrowRightCircle
} from 'lucide-react';

const Quotes: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedQuotes, setSelectedQuotes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock quote data with new numbering format
  const quotes = [
    {
      id: 'Q-202501-0001',
      customer: 'David Fraga',
      email: 'david.fraga@example.com',
      issueDate: '2025-01-15',
      expiryDate: '2025-02-15',
      amount: 642.00,
      status: 'sent',
      eventDate: '2025-06-15'
    },
    {
      id: 'Q-202501-0002',
      customer: 'Sarah Johnson',
      email: 'sarah@email.com',
      issueDate: '2025-01-10',
      expiryDate: '2025-02-10',
      amount: 450.00,
      status: 'accepted',
      eventDate: '2025-03-15'
    },
    {
      id: 'Q-202501-0003',
      customer: 'Mike Chen',
      email: 'mike@email.com',
      issueDate: '2025-01-05',
      expiryDate: '2025-02-05',
      amount: 120.00,
      status: 'draft',
      eventDate: '2025-02-16'
    },
    {
      id: 'Q-202412-0015',
      customer: 'Emma Davis',
      email: 'emma@email.com',
      issueDate: '2024-12-20',
      expiryDate: '2025-01-20',
      amount: 280.00,
      status: 'rejected',
      eventDate: '2025-01-18'
    },
    {
      id: 'Q-202412-0016',
      customer: 'James Wilson',
      email: 'james@email.com',
      issueDate: '2024-12-15',
      expiryDate: '2025-01-15',
      amount: 180.00,
      status: 'expired',
      eventDate: '2025-01-20'
    },
    {
      id: 'Q-202412-0017',
      customer: 'Lisa Park',
      email: 'lisa@email.com',
      issueDate: '2024-12-10',
      expiryDate: '2025-01-10',
      amount: 200.00,
      status: 'accepted',
      eventDate: '2024-12-28'
    },
    {
      id: 'Q-202412-0018',
      customer: 'Robert Smith',
      email: 'robert@email.com',
      issueDate: '2024-12-05',
      expiryDate: '2025-01-05',
      amount: 350.00,
      status: 'sent',
      eventDate: '2024-12-22'
    },
    {
      id: 'Q-202411-0025',
      customer: 'Jennifer Brown',
      email: 'jennifer@email.com',
      issueDate: '2024-11-30',
      expiryDate: '2024-12-30',
      amount: 175.00,
      status: 'expired',
      eventDate: '2024-12-18'
    },
    {
      id: 'Q-202411-0026',
      customer: 'Michael Taylor',
      email: 'michael@email.com',
      issueDate: '2024-11-25',
      expiryDate: '2024-12-25',
      amount: 420.00,
      status: 'accepted',
      eventDate: '2024-12-12'
    },
    {
      id: 'Q-202411-0027',
      customer: 'Jessica Lee',
      email: 'jessica@email.com',
      issueDate: '2024-11-20',
      expiryDate: '2024-12-20',
      amount: 300.00,
      status: 'sent',
      eventDate: '2024-12-08'
    },
    {
      id: 'Q-202411-0028',
      customer: 'Daniel Garcia',
      email: 'daniel@email.com',
      issueDate: '2024-11-15',
      expiryDate: '2024-12-15',
      amount: 225.00,
      status: 'draft',
      eventDate: '2024-12-02'
    }
  ];

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleViewQuote = (quoteId: string) => {
    // Navigate to quote details page
    navigate(`/quotes/${quoteId}`);
  };

  const handleCreateQuote = () => {
    // Generate new quote number and navigate to create quote page
    const newQuoteNumber = generateDocumentNumber('quote');
    console.log('Creating new quote with number:', newQuoteNumber);
    navigate('/quotes/new', { state: { quoteNumber: newQuoteNumber } });
  };

  const handleEditQuote = (quoteId: string) => {
    // Navigate to quote edit page
    navigate(`/quotes/${quoteId}/edit`);
  };

  const handleSendQuote = (quoteId: string) => {
    // Send quote email
    alert(`Email quote ${quoteId} to customer`);
  };

  const handleConvertToInvoice = (quoteId: string) => {
    // Convert quote to invoice with new invoice number
    const newInvoiceNumber = generateDocumentNumber('invoice');
    console.log('Converting quote to invoice with number:', newInvoiceNumber);
    navigate('/invoice/new', { state: { convertedFromQuote: quoteId, invoiceNumber: newInvoiceNumber } });
  };

  const handleDuplicateQuote = (quoteId: string) => {
    // Duplicate quote with new quote number
    const newQuoteNumber = generateDocumentNumber('quote');
    console.log('Duplicating quote with new number:', newQuoteNumber);
    alert(`Duplicate quote ${quoteId} as ${newQuoteNumber}`);
  };

  const handleDeleteQuote = (quoteId: string) => {
    // Delete quote
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

  // Filter quotes based on search term and status filter
  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quote.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Quotes" />
      
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
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-1 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedQuotes.length === filteredQuotes.length && filteredQuotes.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                      />
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quote #
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Date
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">    
                    Date Issued
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedQuotes.includes(quote.id)}
                          onChange={() => toggleSelectQuote(quote.id)}
                          className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-coral-600" onClick={() => handleViewQuote(quote.id)}>
                        {quote.id}
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{quote.customer}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(quote.issueDate)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(quote.eventDate)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(quote.expiryDate)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(quote.amount)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                        {getStatusIcon(quote.status)}
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleViewQuote(quote.id)}
                          className="text-aqua-600 hover:text-aqua-900 transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleEditQuote(quote.id)}
                          className="text-coral-600 hover:text-coral-900 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleSendQuote(quote.id)}
                          className="text-mint-600 hover:text-mint-900 transition-colors"
                          title="Send"
                        >
                          <Mail className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleConvertToInvoice(quote.id)}
                          className="text-aqua-600 hover:text-aqua-900 transition-colors"
                          title="Convert to Invoice"
                        >
                          <ArrowRightCircle className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDuplicateQuote(quote.id)}
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteQuote(quote.id)}
                          className="text-pink-600 hover:text-pink-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredQuotes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No quotes found</div>
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
    </div>
  );
};

export default Quotes;