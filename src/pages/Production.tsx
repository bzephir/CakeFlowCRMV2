import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  User,
  Package,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  PlayCircle,
  Factory,
  DollarSign
} from 'lucide-react';
import Header from '../components/Header';
import ProductionFilters from '../components/ProductionFilters';
import ProductionPagination from '../components/ProductionPagination';
import ProductionStats from '../components/ProductionStats';
import {
  mockProductionJobs,
  searchProductionJobs,
} from '../data/mockProduction';
import { ProductionJob, ProductionJobStatus, ProductionPriority } from '../types/production';

const Production: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('external');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const allJobs = mockProductionJobs;
  const tabFilteredJobs = allJobs.filter(job => job.jobType === activeTab);

  const stats = useMemo(() => {
    const queued = tabFilteredJobs.filter(j => j.status === 'queued').length;
    const inProgress = tabFilteredJobs.filter(j => j.status === 'in_progress').length;
    const completed = tabFilteredJobs.filter(j => j.status === 'completed').length;
    const onHold = tabFilteredJobs.filter(j => j.status === 'on_hold').length;
    const totalCost = tabFilteredJobs.reduce((sum, job) => sum + job.totalCost, 0);

    return [
      {
        label: 'Total Jobs',
        value: tabFilteredJobs.length,
        icon: Factory,
        gradient: 'from-coral-400 to-coral-500'
      },
      {
        label: 'In Progress',
        value: inProgress,
        icon: PlayCircle,
        gradient: 'from-blue-400 to-blue-500'
      },
      {
        label: 'Queued',
        value: queued,
        icon: Clock,
        gradient: 'from-yellow-400 to-yellow-500'
      },
      {
        label: 'Completed',
        value: completed,
        icon: CheckCircle,
        gradient: 'from-mint-400 to-mint-500'
      },
      {
        label: 'Total Cost',
        value: `$${totalCost.toFixed(2)}`,
        icon: DollarSign,
        gradient: 'from-aqua-400 to-aqua-500'
      }
    ];
  }, [tabFilteredJobs]);

  const filteredJobs = useMemo(() => {
    let jobs = searchTerm
      ? searchProductionJobs(searchTerm).filter(job => job.jobType === activeTab)
      : statusFilter === 'all'
      ? tabFilteredJobs
      : tabFilteredJobs.filter(job => job.status === statusFilter);

    if (priorityFilter !== 'all') {
      jobs = jobs.filter(job => job.priority === priorityFilter);
    }

    return jobs;
  }, [searchTerm, statusFilter, priorityFilter, activeTab, tabFilteredJobs]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

  const handleTabChange = (tab: 'internal' | 'external') => {
    setActiveTab(tab);
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, priorityFilter]);

  const getStatusBadge = (status: ProductionJobStatus) => {
    const badges: Record<ProductionJobStatus, { label: string; className: string; icon: any }> = {
      queued: { label: 'Queued', className: 'bg-gray-100 text-gray-700', icon: Clock },
      in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700', icon: PlayCircle },
      completed: { label: 'Completed', className: 'bg-mint-100 text-mint-700', icon: CheckCircle },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700', icon: XCircle },
      on_hold: { label: 'On Hold', className: 'bg-yellow-100 text-yellow-700', icon: Pause },
    };

    const badge = badges[status];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
        <Icon className="w-3 h-3 mr-1" />
        {badge.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: ProductionPriority) => {
    const badges: Record<ProductionPriority, { label: string; className: string }> = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-600' },
      medium: { label: 'Medium', className: 'bg-orange-100 text-orange-600' },
      high: { label: 'High', className: 'bg-red-100 text-red-600' }
    };

    const badge = badges[priority] || badges.medium;

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badge.className}`}>
        {priority === 'high' && <AlertTriangle className="w-3 h-3 mr-1" />}
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
    <div className="p-6">
      <Header title="Production" icon={Factory} />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <ProductionFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            searchPlaceholder="Search by job number, recipe, customer..."
          />

          <Link
            to="/production/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Production Job
          </Link>
        </div>

        <div className="mb-6">
          <ProductionStats stats={stats} />
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => handleTabChange('external')}
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
                </div>
              </button>
              <button
                onClick={() => handleTabChange('internal')}
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
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
              <div className="flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-32">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Job Number</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Product/Recipe</span>
                  </div>
                  <div className="w-28 text-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</span>
                  </div>
                  <div className="w-32 text-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Scheduled</span>
                  </div>
                  <div className="w-32 text-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</span>
                  </div>
                  <div className="w-28 text-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</span>
                  </div>
                  <div className="w-32 text-center">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
                  </div>
                </div>
                <div className="w-10"></div>
              </div>
            </div>

            <div className="space-y-0">
              <div>
              {paginatedJobs.map((job) => {
                return (
                  <div key={job.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
                    <Link
                      to={`/production/${job.id}`}
                      className="flex items-center px-4 py-2 block"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-32">
                          <span className="text-sm font-medium text-blue-600 hover:text-blue-700">{job.jobNumber}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{job.recipeName}</h3>
                          {job.customerName && (
                            <p className="text-xs text-gray-500">{job.customerName}</p>
                          )}
                        </div>
                        <div className="w-28 text-center">
                          <span className="text-sm text-gray-700">{job.quantityToProduce} {job.unit}</span>
                        </div>
                        <div className="w-32 text-center">
                          <div className="flex items-center justify-center text-sm">
                            {isOverdue(job) && (
                              <AlertTriangle className="w-4 h-4 mr-1 text-red-600" />
                            )}
                            <span className={isOverdue(job) ? 'text-red-600 font-medium' : 'text-gray-700'}>
                              {formatDate(job.scheduledDate)}
                            </span>
                          </div>
                        </div>
                        <div className="w-32 text-center">
                          {job.assignedStaffName ? (
                            <span className="text-sm text-gray-700">{job.assignedStaffName}</span>
                          ) : (
                            <span className="text-sm text-gray-400">Unassigned</span>
                          )}
                        </div>
                        <div className="w-28 flex justify-center">
                          {getPriorityBadge(job.priority)}
                        </div>
                        <div className="w-32 flex justify-center">
                          {getStatusBadge(job.status)}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}

                {filteredJobs.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-gray-500 text-lg">No production jobs found</div>
                    <div className="text-gray-400 text-sm mt-2">
                      {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all'
                        ? 'Try adjusting your search or filter criteria'
                        : 'Get started by creating your first production job'}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ProductionPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredJobs.length}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Production;
