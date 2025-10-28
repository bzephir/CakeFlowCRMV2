import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Package,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Edit,
  Trash2,
  Play,
  Pause,
  XCircle,
  FileText,
  Image,
  Download,
  DollarSign,
  ListChecks,
  MessageSquare
} from 'lucide-react';
import { getProductionJobById, getProductionBatchByNumber } from '../data/mockProduction';
import { ProductionJobStatus, ProductionWorkflowStage, ClientApproval } from '../types/production';
import WorkflowStageTracker from '../components/WorkflowStageTracker';

const EnhancedProductionJobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'details' | 'workflow' | 'ingredients' | 'materials' | 'batch' | 'approvals' | 'attachments'>('details');

  const job = id ? getProductionJobById(id) : undefined;
  const batch = job?.batchNumber ? getProductionBatchByNumber(job.batchNumber) : undefined;

  const mockWorkflowStages: ProductionWorkflowStage[] = job ? [
    {
      id: '1',
      productionJobId: job.id,
      stageName: 'Preparation',
      stageOrder: 1,
      status: 'completed',
      estimatedDurationMinutes: 30,
      actualDurationMinutes: 28,
      assignedStaffName: 'Maria Garcia',
      startedAt: '2024-10-25T08:15:00Z',
      completedAt: '2024-10-25T08:43:00Z',
      qualityCheckPassed: true,
      createdAt: '2024-10-25T08:00:00Z'
    },
    {
      id: '2',
      productionJobId: job.id,
      stageName: 'Baking',
      stageOrder: 2,
      status: 'completed',
      estimatedDurationMinutes: 45,
      actualDurationMinutes: 47,
      assignedStaffName: 'Maria Garcia',
      startedAt: '2024-10-25T08:43:00Z',
      completedAt: '2024-10-25T09:30:00Z',
      qualityCheckPassed: true,
      createdAt: '2024-10-25T08:00:00Z'
    },
    {
      id: '3',
      productionJobId: job.id,
      stageName: 'Cooling',
      stageOrder: 3,
      status: 'completed',
      estimatedDurationMinutes: 60,
      actualDurationMinutes: 65,
      assignedStaffName: 'Maria Garcia',
      startedAt: '2024-10-25T09:30:00Z',
      completedAt: '2024-10-25T10:35:00Z',
      createdAt: '2024-10-25T08:00:00Z'
    },
    {
      id: '4',
      productionJobId: job.id,
      stageName: 'Decorating',
      stageOrder: 4,
      status: 'completed',
      estimatedDurationMinutes: 90,
      actualDurationMinutes: 85,
      assignedStaffName: 'Maria Garcia',
      startedAt: '2024-10-25T10:35:00Z',
      completedAt: '2024-10-25T11:30:00Z',
      qualityCheckPassed: true,
      qualityNotes: 'Excellent piping work',
      createdAt: '2024-10-25T08:00:00Z'
    },
    {
      id: '5',
      productionJobId: job.id,
      stageName: 'Packaging',
      stageOrder: 5,
      status: 'completed',
      estimatedDurationMinutes: 15,
      actualDurationMinutes: 15,
      assignedStaffName: 'Maria Garcia',
      startedAt: '2024-10-25T11:30:00Z',
      completedAt: '2024-10-25T11:45:00Z',
      createdAt: '2024-10-25T08:00:00Z'
    }
  ] : [];

  const mockApprovals: ClientApproval[] = job ? [
    {
      id: '1',
      productionJobId: job.id,
      approvalType: 'design',
      status: 'approved',
      approvedByName: 'Sarah Johnson',
      approvedAt: '2024-10-24T15:00:00Z',
      notes: 'Design looks perfect, proceed with production',
      createdAt: '2024-10-24T14:00:00Z'
    },
    {
      id: '2',
      productionJobId: job.id,
      approvalType: 'flavor',
      status: 'approved',
      approvedByName: 'Sarah Johnson',
      approvedAt: '2024-10-24T15:00:00Z',
      notes: 'Vanilla with buttercream confirmed',
      createdAt: '2024-10-24T14:00:00Z'
    }
  ] : [];

  const mockAttachments = job ? [
    {
      id: '1',
      fileName: 'design-reference.jpg',
      fileType: 'design' as const,
      fileUrl: '/attachments/design-reference.jpg',
      fileSize: 1024000,
      description: 'Client provided design reference',
      uploadedBy: 'admin',
      uploadedAt: '2024-10-24T14:00:00Z'
    },
    {
      id: '2',
      fileName: 'final-product.jpg',
      fileType: 'photo' as const,
      fileUrl: '/attachments/final-product.jpg',
      fileSize: 2048000,
      description: 'Final product photo',
      uploadedBy: 'staff-001',
      uploadedAt: '2024-10-25T11:45:00Z'
    }
  ] : [];

  if (!job) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Production Job Not Found</h2>
          <p className="text-gray-600 mb-6">The production job you're looking for doesn't exist.</p>
          <Link
            to="/production/jobs"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Production Jobs
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: ProductionJobStatus) => {
    const badges: Record<ProductionJobStatus, { label: string; className: string; icon: any }> = {
      queued: { label: 'Queued', className: 'bg-gray-100 text-gray-700', icon: Clock },
      in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-700', icon: Play },
      completed: { label: 'Completed', className: 'bg-green-100 text-green-700', icon: CheckCircle },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-700', icon: XCircle },
      on_hold: { label: 'On Hold', className: 'bg-yellow-100 text-yellow-700', icon: Pause },
    };

    const badge = badges[status];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${badge.className}`}>
        <Icon className="w-4 h-4 mr-2" />
        {badge.label}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const badges: Record<string, { label: string; className: string }> = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-600' },
      medium: { label: 'Medium', className: 'bg-orange-100 text-orange-600' },
      high: { label: 'High', className: 'bg-red-100 text-red-600' },
      urgent: { label: 'Urgent', className: 'bg-red-200 text-red-800' }
    };

    const badge = badges[priority] || badges.medium;

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${badge.className}`}>
        {(priority === 'high' || priority === 'urgent') && <AlertTriangle className="w-4 h-4 mr-2" />}
        {badge.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleStageUpdate = (stageId: string, updates: any) => {
    console.log('Update stage:', stageId, updates);
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'workflow', label: 'Workflow', icon: ListChecks },
    { id: 'ingredients', label: `Ingredients (${job.ingredients.length})`, icon: Package },
    { id: 'materials', label: `Materials (${job.materials.length})`, icon: Package },
    { id: 'approvals', label: `Approvals (${mockApprovals.length})`, icon: CheckCircle },
    { id: 'attachments', label: `Files (${mockAttachments.length})`, icon: Image },
  ];

  if (job.batchNumber) {
    tabs.push({ id: 'batch', label: 'Batch Info', icon: FileText });
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          to="/production/jobs"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Production Jobs
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{job.jobNumber}</h1>
            <p className="text-gray-600 mt-1">{job.recipeName}</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button className="flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Status</div>
          {getStatusBadge(job.status)}
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Priority</div>
          {getPriorityBadge(job.priority)}
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Quantity</div>
          <div className="text-xl font-bold text-gray-900">
            {job.quantityToProduce} {job.unit}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Cost</div>
          <div className="text-xl font-bold text-gray-900">${job.totalCost.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-6 py-3 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Information</h3>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Recipe</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          <Link to={`/recipes/${job.recipeId}`} className="text-blue-600 hover:text-blue-800">
                            {job.recipeName}
                          </Link>
                          <span className="ml-2 text-gray-500">({job.recipeCategory})</span>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Quantity to Produce</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {job.quantityToProduce} {job.unit}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Scheduled Date</dt>
                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {formatDate(job.scheduledDate)}
                          {job.scheduledStartTime && ` at ${job.scheduledStartTime}`}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Assigned Staff</dt>
                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                          <User className="w-4 h-4 mr-2 text-gray-400" />
                          {job.assignedStaffName || 'Unassigned'}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {job.linkedOrderNumber && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Linked Order</h3>
                      <dl className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Order Number</dt>
                          <dd className="mt-1 text-sm">
                            <Link
                              to={`/orders/${job.linkedOrderId}`}
                              className="text-blue-600 hover:text-blue-800 flex items-center"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {job.linkedOrderNumber}
                            </Link>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Customer</dt>
                          <dd className="mt-1 text-sm text-gray-900">{job.customerName}</dd>
                        </div>
                        {job.orderDueDate && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Order Due Date</dt>
                            <dd className="mt-1 text-sm text-gray-900">{formatDate(job.orderDueDate)}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  )}

                  {job.notes && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
                      <p className="text-sm text-gray-700">{job.notes}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'workflow' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Workflow</h3>
                  <WorkflowStageTracker
                    stages={mockWorkflowStages}
                    onStageUpdate={handleStageUpdate}
                    readOnly={job.status === 'completed' || job.status === 'cancelled'}
                  />
                </div>
              )}

              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Ingredients</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Ingredient
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Required
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Cost
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {job.ingredients.map((ingredient) => (
                          <tr key={ingredient.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-gray-900">{ingredient.ingredientName}</div>
                              <div className="text-xs text-gray-500">{ingredient.category}</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              {ingredient.requiredQuantity} {ingredient.requiredUnit}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">
                              ${ingredient.totalCost.toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              {ingredient.deductedFromInventory ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Deducted
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  Available
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Packaging Materials</h3>
                  {job.materials.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                      No packaging materials required
                    </p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Material
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Required
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Cost
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {job.materials.map((material) => (
                            <tr key={material.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3">
                                <div className="text-sm font-medium text-gray-900">{material.materialName}</div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{material.requiredQuantity}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                ${material.totalCost.toFixed(2)}
                              </td>
                              <td className="px-4 py-3">
                                {material.deductedFromInventory ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Deducted
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                    Available
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'approvals' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Approvals</h3>
                  <div className="space-y-4">
                    {mockApprovals.map((approval) => (
                      <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-sm font-semibold text-gray-900 capitalize">
                                {approval.approvalType} Approval
                              </h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                approval.status === 'approved'
                                  ? 'bg-green-100 text-green-700'
                                  : approval.status === 'rejected'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {approval.status}
                              </span>
                            </div>
                            {approval.notes && (
                              <p className="text-sm text-gray-600 mb-2">{approval.notes}</p>
                            )}
                            <div className="text-xs text-gray-500">
                              {approval.approvedByName && `Approved by ${approval.approvedByName} • `}
                              {approval.approvedAt && formatDateTime(approval.approvedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'attachments' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Files & Photos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAttachments.map((attachment) => (
                      <div key={attachment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            {attachment.fileType === 'photo' || attachment.fileType === 'design' ? (
                              <Image className="w-10 h-10 text-blue-600" />
                            ) : (
                              <FileText className="w-10 h-10 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {attachment.fileName}
                            </h4>
                            {attachment.description && (
                              <p className="text-xs text-gray-500 mt-1">{attachment.description}</p>
                            )}
                            <div className="text-xs text-gray-500 mt-1">
                              {formatFileSize(attachment.fileSize || 0)} • {formatDateTime(attachment.uploadedAt)}
                            </div>
                            <button className="mt-2 flex items-center text-xs text-blue-600 hover:text-blue-800">
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'batch' && batch && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Batch Information</h3>
                    <dl className="grid grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Batch Number</dt>
                        <dd className="mt-1 text-sm font-mono text-gray-900">{batch.batchNumber}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Quantity Produced</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {batch.quantityProduced} {batch.unit}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ingredients</span>
                <span className="text-sm font-medium text-gray-900">
                  ${job.totalIngredientCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Materials</span>
                <span className="text-sm font-medium text-gray-900">
                  ${job.totalMaterialCost.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">Total Cost</span>
                  <span className="text-lg font-bold text-gray-900">${job.totalCost.toFixed(2)}</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Cost per {job.unit.replace(/s$/, '')}</span>
                  <span className="font-medium text-gray-900">
                    ${(job.totalCost / job.quantityToProduce).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-px h-full bg-gray-200"></div>
                </div>
                <div className="pb-4">
                  <p className="text-sm font-medium text-gray-900">Created</p>
                  <p className="text-xs text-gray-500">{formatDateTime(job.createdAt)}</p>
                  <p className="text-xs text-gray-500">by {job.createdBy}</p>
                </div>
              </div>

              {job.actualStartTime && (
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-px h-full bg-gray-200"></div>
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-gray-900">Started</p>
                    <p className="text-xs text-gray-500">{formatDateTime(job.actualStartTime)}</p>
                  </div>
                </div>
              )}

              {job.completedAt && (
                <div className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Completed</p>
                    <p className="text-xs text-gray-500">{formatDateTime(job.completedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductionJobDetail;
