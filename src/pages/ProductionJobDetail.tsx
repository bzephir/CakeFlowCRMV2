import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  TrendingUp,
} from 'lucide-react';
import { getProductionJobById, getProductionBatchByNumber } from '../data/mockProduction';
import { ProductionJobStatus } from '../types/production';

const ProductionJobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'materials' | 'batch'>('details');

  const job = id ? getProductionJobById(id) : undefined;
  const batch = job?.batchNumber ? getProductionBatchByNumber(job.batchNumber) : undefined;

  if (!job) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Production Job Not Found</h2>
          <p className="text-gray-600 mb-6">The production job you're looking for doesn't exist.</p>
          <Link
            to="/production"
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
    };

    const badge = badges[priority];

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium ${badge.className}`}>
        {priority === 'high' && <AlertTriangle className="w-4 h-4 mr-2" />}
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

  const calculateDuration = () => {
    if (!job.actualStartTime || !job.actualEndTime) return null;
    const start = new Date(job.actualStartTime);
    const end = new Date(job.actualEndTime);
    const durationMs = end.getTime() - start.getTime();
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          to="/production"
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
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'details'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'ingredients'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Ingredients ({job.ingredients.length})
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === 'materials'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Materials ({job.materials.length})
                </button>
                {job.batchNumber && (
                  <button
                    onClick={() => setActiveTab('batch')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'batch'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Batch Info
                  </button>
                )}
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
                      {job.actualStartTime && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Actual Start</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formatDateTime(job.actualStartTime)}</dd>
                        </div>
                      )}
                      {job.actualEndTime && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Actual End</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formatDateTime(job.actualEndTime)}</dd>
                        </div>
                      )}
                      {calculateDuration() && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Duration</dt>
                          <dd className="mt-1 text-sm text-gray-900">{calculateDuration()}</dd>
                        </div>
                      )}
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

                  {(job.yieldQuantity || job.wasteQuantity) && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Results</h3>
                      <dl className="grid grid-cols-3 gap-4">
                        {job.yieldQuantity && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Yield</dt>
                            <dd className="mt-1 text-sm text-gray-900">{job.yieldQuantity} units</dd>
                          </div>
                        )}
                        {job.wasteQuantity !== undefined && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Waste</dt>
                            <dd className="mt-1 text-sm text-gray-900">{job.wasteQuantity} units</dd>
                          </div>
                        )}
                        {job.wastePercentage !== undefined && (
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Waste %</dt>
                            <dd className="mt-1 text-sm text-gray-900">{job.wastePercentage.toFixed(1)}%</dd>
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

                  {job.qualityNotes && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Notes</h3>
                      <p className="text-sm text-gray-700">{job.qualityNotes}</p>
                    </div>
                  )}
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
                            Stock
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Lot #
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
                              {ingredient.currentStock} {ingredient.requiredUnit}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">
                              {ingredient.lotNumber || '-'}
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
                              ) : ingredient.isAvailable ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                  Available
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Short
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan={4} className="px-4 py-3 text-sm font-medium text-gray-900">
                            Total Ingredient Cost
                          </td>
                          <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-900">
                            ${job.totalIngredientCost.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'materials' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Packaging Materials</h3>
                  {job.materials.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                      No packaging materials required for this production job
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
                              Stock
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
                                <div className="text-xs text-gray-500">{material.category}</div>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900">{material.requiredQuantity}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{material.currentStock}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">
                                ${material.totalCost.toFixed(2)}
                              </td>
                              <td className="px-4 py-3">
                                {material.deductedFromInventory ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Deducted
                                  </span>
                                ) : material.isAvailable ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                    Available
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                    Short
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan={3} className="px-4 py-3 text-sm font-medium text-gray-900">
                              Total Material Cost
                            </td>
                            <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-900">
                              ${job.totalMaterialCost.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'batch' && job.batchNumber && batch && (
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
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Production Date</dt>
                        <dd className="mt-1 text-sm text-gray-900">{formatDate(batch.productionDate)}</dd>
                      </div>
                      {batch.expirationDate && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Expiration Date</dt>
                          <dd className="mt-1 text-sm text-gray-900">{formatDate(batch.expirationDate)}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Quality Check</dt>
                        <dd className="mt-1">
                          {batch.qualityCheckPassed ? (
                            <span className="inline-flex items-center text-sm text-green-600">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Passed
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-sm text-red-600">
                              <XCircle className="w-4 h-4 mr-1" />
                              Failed
                            </span>
                          )}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {batch.qualityNotes && (
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Quality Notes</h3>
                      <p className="text-sm text-gray-700">{batch.qualityNotes}</p>
                    </div>
                  )}

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Ingredient Traceability</h3>
                    <div className="space-y-2">
                      {batch.ingredientsUsed.map((ingredient, index) => (
                        <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ingredient.ingredientName}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              Lot: {ingredient.lotNumber} | {ingredient.quantityUsed} {ingredient.unit}
                            </div>
                          </div>
                          {ingredient.expirationDate && (
                            <div className="text-xs text-gray-500">
                              Exp: {formatDate(ingredient.expirationDate)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
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

export default ProductionJobDetail;
