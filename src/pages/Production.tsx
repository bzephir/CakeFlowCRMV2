import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  User,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  PlayCircle,
  Download,
  Grid,
  List,
  SlidersHorizontal,
  Factory,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import Header from '../components/Header';
import {
  mockProductionJobs,
  searchProductionJobs,
} from '../data/mockProduction';
import { ProductionJob, ProductionJobStatus, ProductionPriority, JobType } from '../types/production';

const Production: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [staffFilter, setStaffFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('external');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'status' | 'customer'>('priority');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const allJobs = mockProductionJobs;
  const tabFilteredJobs = allJobs.filter(job => job.jobType === activeTab);

  const stats = {
    queued: tabFilteredJobs.filter(j => j.status === 'queued').length,
    inProgress: tabFilteredJobs.filter(j => j.status === 'in_progress').length,
    completed: tabFilteredJobs.filter(j => j.status === 'completed').length,
    cancelled: tabFilteredJobs.filter(j => j.status === 'cancelled').length,
    onHold: tabFilteredJobs.filter(j => j.status === 'on_hold').length,
  };

  const allStaff = useMemo(() => {
    const staffSet = new Set<string>();
    mockProductionJobs.forEach(job => {
      if (job.assignedStaffName) {
        staffSet.add(job.assignedStaffName);
      }
    });
    return Array.from(staffSet).sort();
  }, []);

  const filteredJobs = useMemo(() => {
    let jobs = searchTerm
      ? searchProductionJobs(searchTerm).filter(job => job.jobType === activeTab)
      : statusFilter === 'all'
      ? tabFilteredJobs
      : tabFilteredJobs.filter(job => job.status === statusFilter);

    if (priorityFilter !== 'all') {
      jobs = jobs.filter(job => job.priority === priorityFilter);
    }

    if (staffFilter !== 'all') {
      if (staffFilter === 'unassigned') {
        jobs = jobs.filter(job => !job.assignedStaffName);
      } else {
        jobs = jobs.filter(job => job.assignedStaffName === staffFilter);
      }
    }

    if (dateFilter !== 'all') {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      const weekFromNow = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];

      switch (dateFilter) {
        case 'today':
          jobs = jobs.filter(job => job.scheduledDate === today);
          break;
        case 'tomorrow':
          jobs = jobs.filter(job => job.scheduledDate === tomorrow);
          break;
        case 'this_week':
          jobs = jobs.filter(job => job.scheduledDate >= today && job.scheduledDate <= weekFromNow);
          break;
        case 'overdue':
          jobs = jobs.filter(
            job => job.orderDueDate && job.orderDueDate < today && job.status !== 'completed'
          );
          break;
      }
    }

    jobs = [...jobs].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison = a.scheduledDate.localeCompare(b.scheduledDate);
          break;
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          comparison = (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) -
                      (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'customer':
          comparison = (a.customerName || '').localeCompare(b.customerName || '');
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return jobs;
  }, [searchTerm, statusFilter, priorityFilter, dateFilter, staffFilter, activeTab, sortBy, sortOrder, tabFilteredJobs]);

  const getStatusBadge = (status: ProductionJobStatus) => {
    const badges: Record<ProductionJobStatus, { label: string; className: string; icon: any }> = {
      queued: { label: 'Queued', className: 'bg-gray-100 text-gray-700', icon: Clock },
      in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700', icon: PlayCircle },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-700', icon: CheckCircle },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700', icon: XCircle },
      on_hold: { label: 'On Hold', className: 'bg-yellow-100 text-yellow-700', icon: Pause },
    };

    const badge = badges[status];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badge.className}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: ProductionPriority) => {
    const badges: Record<ProductionPriority, { label: string; className: string }> = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-600' },
      medium: { label: 'Medium', className: 'bg-orange-100 text-orange-600' },
      high: { label: 'High', className: 'bg-red-100 text-red-600' },
      urgent: { label: 'Urgent', className: 'bg-red-200 text-red-800' }
    };

    const badge = badges[priority] || badges.medium;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.className}`}>
        {(priority === 'high' || priority === 'urgent') && <AlertTriangle className="w-3 h-3 mr-1" />}
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = (job: ProductionJob) => {
    if (!job.orderDueDate || job.status === 'completed') return false;
    const today = new Date().toISOString().split('T')[0];
    return job.orderDueDate < today;
  };

  const handleExport = () => {
    console.log('Exporting production jobs...');
    alert('Export functionality coming soon!');
  };

  return (
    <div className="p-6">
      <Header title="Production" icon={Factory} />
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by job number, recipe, customer..."
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
                <option value="queued">Queued</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field as any);
                  setSortOrder(order as 'asc' | 'desc');
                }}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="priority-desc">Priority (High to Low)</option>
                <option value="priority-asc">Priority (Low to High)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="date-desc">Date (Newest First)</option>
                <option value="status-asc">Status (A-Z)</option>
                <option value="status-desc">Status (Z-A)</option>
                <option value="customer-asc">Customer (A-Z)</option>
                <option value="customer-desc">Customer (Z-A)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <Link
              to="/production/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Production Job
            </Link>
          </div>
        </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('external')}
              className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-sm font-semibold text-center focus:z-10 transition-all ${
                activeTab === 'external'
                  ? 'text-coral-700 bg-coral-50 border-b-4 border-coral-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-4 border-transparent'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <User className="h-5 w-5" />
                <span>External Jobs</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'external'
                    ? 'bg-coral-100 text-coral-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {allJobs.filter(j => j.jobType === 'external').length}
                </span>
                {allJobs.filter(j => j.jobType === 'external' && j.priority === 'urgent').length > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {allJobs.filter(j => j.jobType === 'external' && j.priority === 'urgent').length} urgent
                  </span>
                )}
              </div>
            </button>
            <button
              onClick={() => setActiveTab('internal')}
              className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-sm font-semibold text-center focus:z-10 transition-all ${
                activeTab === 'internal'
                  ? 'text-coral-700 bg-coral-50 border-b-4 border-coral-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-4 border-transparent'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Factory className="h-5 w-5" />
                <span>Internal Jobs</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'internal'
                    ? 'bg-coral-100 text-coral-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {allJobs.filter(j => j.jobType === 'internal').length}
                </span>
                {allJobs.filter(j => j.jobType === 'internal' && j.priority === 'urgent').length > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {allJobs.filter(j => j.jobType === 'internal' && j.priority === 'urgent').length} urgent
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setStatusFilter('queued')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Queued</p>
              <p className="text-2xl font-bold text-gray-900">{stats.queued}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setStatusFilter('in_progress')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-900">{stats.inProgress}</p>
            </div>
            <PlayCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setStatusFilter('completed')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setStatusFilter('on_hold')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">On Hold</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.onHold}</p>
            </div>
            <Pause className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setStatusFilter('cancelled')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Cancelled</p>
              <p className="text-2xl font-bold text-red-900">{stats.cancelled}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-2 border rounded-lg transition-colors ${
                  showFilters ? 'bg-coral-50 border-coral-300 text-coral-700' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </button>

              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this_week">This Week</option>
                <option value="overdue">Overdue</option>
              </select>

              <select
                value={staffFilter}
                onChange={(e) => setStaffFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Staff</option>
                <option value="unassigned">Unassigned</option>
                {allStaff.map(staff => (
                  <option key={staff} value={staff}>{staff}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 text-sm">
            <span className="text-gray-500 ml-auto">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job#
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Staff
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg font-medium">No production jobs found</p>
                      <p className="text-sm">Try adjusting your filters or create a new production job</p>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/production/${job.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-blue-600 hover:text-blue-800 font-medium">
                          {job.jobNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{job.recipeName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(job.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          {isOverdue(job) && (
                            <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                          )}
                          <span className={isOverdue(job) ? 'text-red-600 font-medium' : 'text-gray-900'}>
                            {formatDate(job.scheduledDate)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {job.assignedStaffName ? (
                          <div className="flex items-center text-sm text-gray-900">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            {job.assignedStaffName}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Unassigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPriorityBadge(job.priority)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/production/${job.id}`}
                className={`block p-4 border-2 rounded-lg hover:shadow-md transition-shadow ${
                  isOverdue(job) ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.jobNumber}</h3>
                    <p className="text-sm text-gray-600">{job.recipeName}</p>
                  </div>
                  {getPriorityBadge(job.priority)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    {job.quantityToProduce} {job.unit}
                  </div>

                  <div className="flex items-center text-sm">
                    {isOverdue(job) && (
                      <AlertTriangle className="w-4 h-4 mr-2 text-red-600" />
                    )}
                    <span className={isOverdue(job) ? 'text-red-600 font-medium' : 'text-gray-600'}>
                      {formatDate(job.scheduledDate)}
                    </span>
                  </div>

                  {job.assignedStaffName && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      {job.assignedStaffName}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  {getStatusBadge(job.status)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {filteredJobs.length > 0 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredJobs.length}</span> production job
            {filteredJobs.length !== 1 ? 's' : ''}
          </p>
          <p className="text-sm text-gray-500">
            Total Production Cost: <span className="font-semibold text-gray-900">
              ${filteredJobs.reduce((sum, job) => sum + job.totalCost, 0).toFixed(2)}
            </span>
          </p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Production;
