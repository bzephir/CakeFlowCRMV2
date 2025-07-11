import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { formatDate, formatTime, formatCurrency } from '../utils/formatters';
import { generateDocumentNumber } from '../utils/documentNumbering';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Mail,
  Download,
  Trash2,
  CheckCircle2, 
  Clock, 
  CreditCard,
  AlertCircle,
  FileText,
  Hourglass
} from 'lucide-react';

const Invoices: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock invoice data with new numbering format
  const invoices = [
    {
      id: 'I-202501-0001',
      customer: 'David Fraga',
      issueDate: '2025-01-15',
      dueDate: '2025-06-01',
      amount: 642.00,
      status: 'deposit-paid',
      eventType: 'Wedding',
      eventDate: '2025-06-15',
      eventTime: '16:00'
    },
    {
      id: 'I-202501-0002',
      customer: 'Sarah Johnson',
      issueDate: '2025-01-10',
      dueDate: '2025-01-25',
      amount: 450.00,
      status: 'paid',
      eventType: 'Birthday',
      eventDate: '2025-01-15',
      eventTime: '14:00'
    },
    {
      id: 'I-202501-0003',
      customer: 'Mike Chen',
      issueDate: '2025-01-05',
      dueDate: '2025-01-20',
      amount: 120.00,
      status: 'overdue',
      eventType: 'Corporate',
      eventDate: '2025-01-16',
      eventTime: '12:00'
    },
    {
      id: 'I-202412-0045',
      customer: 'Emma Davis',
      issueDate: '2024-12-20',
      dueDate: '2025-01-10',
      amount: 280.00,
      status: 'pending',
      eventType: 'Anniversary',
      eventDate: '2025-01-18',
      eventTime: '18:30'
    },
    {
      id: 'I-202412-0046',
      customer: 'James Wilson',
      issueDate: '2024-12-15',
      dueDate: '2025-01-05',
      amount: 180.00,
      status: 'draft',
      eventType: 'Graduation',
      eventDate: '2025-01-20',
      eventTime: '11:00'
    },
    {
      id: 'I-202412-0047',
      customer: 'Lisa Park',
      issueDate: '2024-12-10',
      dueDate: '2024-12-25',
      amount: 200.00,
      status: 'paid',
      eventType: 'Baby Shower',
      eventDate: '2024-12-28',
      eventTime: '13:00'
    },
    {
      id: 'I-202412-0048',
      customer: 'Robert Smith',
      issueDate: '2024-12-05',
      dueDate: '2024-12-20',
      amount: 350.00,
      status: 'deposit-paid',
      eventType: 'Wedding',
      eventDate: '2024-12-22',
      eventTime: '17:00'
    },
    {
      id: 'I-202411-0032',
      customer: 'Jennifer Brown',
      issueDate: '2024-11-30',
      dueDate: '2024-12-15',
      amount: 175.00,
      status: 'overdue',
      eventType: 'Birthday',
      eventDate: '2024-12-18',
      eventTime: '15:00'
    },
    {
      id: 'I-202411-0033',
      customer: 'Michael Taylor',
      issueDate: '2024-11-25',
      dueDate: '2024-12-10',
      amount: 420.00,
      status: 'paid',
      eventType: 'Corporate',
      eventDate: '2024-12-12',
      eventTime: '09:00'
    },
    {
      id: 'I-202411-0034',
      customer: 'Jessica Lee',
      issueDate: '2024-11-20',
      dueDate: '2024-12-05',
      amount: 300.00,
      status: 'pending',
      eventType: 'Anniversary',
      eventDate: '2024-12-08',
      eventTime: '19:00'
    },
    {
      id: 'I-202411-0035',
      customer: 'Daniel Garcia',
      issueDate: '2024-11-15',
      dueDate: '2024-11-30',
      amount: 225.00,
      status: 'cancelled',
      eventType: 'Graduation',
      eventDate: '2024-12-02',
      eventTime: '10:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-pink-100 text-pink-800';
      case 'deposit-paid': return 'bg-aqua-100 text-aqua-800';
      case 'partial': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-mint-100 text-mint-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-black-100 text-black-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Hourglass className="h-4 w-4 mr-1" />;
      case 'deposit-paid': return <CreditCard className="h-4 w-4 mr-1" />;
      case 'partial': return <HalfCircle className="h-4 w-4 mr-1" />;
      case 'paid': return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'cancelled': return <Ban className="h-4 w-4 mr-1" />;
      default: return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending;': return 'Pending';
      case 'deposit-paid': return 'Deposit Paid';
      case 'partial;': return 'Partial';
      case 'paid': return 'Paid';
      case 'overdue': return 'Overdue';
      case 'cancelled;': return 'Cancelled';
      default: return status;
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    navigate(`/invoice/${invoiceId}`);
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
    alert(`Delete invoice ${invoiceId}`);
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
    const matchesSearch = invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Invoices" />
      
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
                <option value="deposit-paid">Deposit Paid</option>
                <option value="draft">Partial</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Cancelled</option>
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

        {/* Invoices Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-1 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedInvoices.length === filteredInvoices.length && filteredInvoices.length > 0}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                      />
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice #
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                 <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Column 
                  </th>
                  <th className="px-2 py-1 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedInvoices.includes(invoice.id)}
                          onChange={() => toggleSelectInvoice(invoice.id)}
                          className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                        />
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 cursor-pointer hover:text-coral-600" onClick={() => handleViewInvoice(invoice.id)}>
                        {invoice.id}
                      </div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{invoice.customer}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.eventType}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{formatDate(invoice.eventDate)}  {formatTime(invoice.eventTime)}</span>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(invoice.dueDate)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap text-right">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusIcon(invoice.status)}
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="px-2 py-1 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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