import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, User, Package, AlertTriangle, Clock, CheckCircle, XCircle, Pause, PlayCircle } from 'lucide-react';
import {
  mockProductionJobs,
  getProductionJobsByStatus,
  getProductionStatsByStatus,
  searchProductionJobs,
} from '../data/mockProduction';
import { ProductionJob, ProductionJobStatus, ProductionPriority, JobType } from '../types/production';

const ProductionJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');

  const stats = getProductionStatsByStatus();

  const filteredJobs = useMemo(() => {
    let jobs = searchTerm
      ? searchProductionJobs(searchTerm)
      : statusFilter === 'all'
      ? mockProductionJobs
      : getProductionJobsByStatus(statusFilter);

    if (priorityFilter !== 'all') {
      jobs = jobs.filter(job => job.priority === priorityFilter);
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

    return jobs.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return a.scheduledDate.localeCompare(b.scheduledDate);
    });
  }, [searchTerm, statusFilter, priorityFilter, dateFilter]);

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

    const badge = badges[priority];

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.className}`}>
        {priority === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
        {badge.label}
      </span>
    );
  };

  const getJobTypeBadge = (jobType: JobType) => {
    const badges: Record<JobType, { label: string; className: string }> = {
      internal: { label: 'Internal', className: 'bg-blue-100 text-blue-700' },
      external: { label: 'External', className: 'bg-green-100 text-green-700' }
    };

    const badge = badges[jobType];

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.className}`}>
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Production Jobs</h1>
          <p className="text-gray-600 mt-1">Manage bakery production schedule and batch tracking</p>
        </div>
        <Link
          to="/production/jobs/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Production Job
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Queued</p>
              <p className="text-2xl font-bold text-gray-900">{stats.queued}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-900">{stats.inProgress}</p>
            </div>
            <PlayCircle className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">On Hold</p>
              <p className="text-2xl font-bold text-yellow-900">{stats.onHold}</p>
            </div>
            <Pause className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
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
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by job number, recipe, customer, or order..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="queued">Queued</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
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
            </div>
          </div>
        </div>

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
                  Job Type
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
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">No production jobs found</p>
                    <p className="text-sm">Try adjusting your filters or create a new production job</p>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/production/jobs/${job.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                        {job.jobNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{job.recipeName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getJobTypeBadge(job.jobType)}
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
  );
};

export default ProductionJobs;
