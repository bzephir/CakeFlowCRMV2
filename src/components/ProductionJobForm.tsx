import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Package,
  AlertCircle,
  Plus,
  X,
  Upload,
  FileText,
  CheckCircle,
  Save
} from 'lucide-react';
import { ProductionPriority, ProductionWorkflowStage, ProductionJobCustomization, JobType } from '../types/production';
import { Order } from '../types';

interface ProductionJobFormProps {
  orderId?: string;
  recipeId?: string;
  onSubmit: (jobData: any) => void;
  onCancel: () => void;
}

const ProductionJobForm: React.FC<ProductionJobFormProps> = ({
  orderId,
  recipeId,
  onSubmit,
  onCancel
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipeName: '',
    recipeId: recipeId || '',
    recipeCategory: '',
    quantityToProduce: 1,
    unit: 'pieces',
    priority: 'medium' as ProductionPriority,
    jobType: (orderId ? 'external' : 'internal') as JobType,
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledStartTime: '08:00',
    assignedStaffId: '',
    assignedStaffName: '',
    linkedOrderId: orderId || '',
    linkedOrderNumber: '',
    customerName: '',
    orderDueDate: '',
    scalingFactor: 1,
    clientSpecifications: '',
    designNotes: '',
    requiresClientApproval: false,
    notes: ''
  });

  const [workflowStages, setWorkflowStages] = useState<Partial<ProductionWorkflowStage>[]>([
    { stageName: 'Preparation', stageOrder: 1, estimatedDurationMinutes: 30, status: 'pending' },
    { stageName: 'Baking', stageOrder: 2, estimatedDurationMinutes: 45, status: 'pending' },
    { stageName: 'Cooling', stageOrder: 3, estimatedDurationMinutes: 60, status: 'pending' },
    { stageName: 'Decorating', stageOrder: 4, estimatedDurationMinutes: 90, status: 'pending' },
    { stageName: 'Packaging', stageOrder: 5, estimatedDurationMinutes: 15, status: 'pending' }
  ]);

  const [customizations, setCustomizations] = useState<Partial<ProductionJobCustomization>[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addWorkflowStage = () => {
    setWorkflowStages([
      ...workflowStages,
      {
        stageName: '',
        stageOrder: workflowStages.length + 1,
        estimatedDurationMinutes: 30,
        status: 'pending'
      }
    ]);
  };

  const updateWorkflowStage = (index: number, field: string, value: any) => {
    const updated = [...workflowStages];
    updated[index] = { ...updated[index], [field]: value };
    setWorkflowStages(updated);
  };

  const removeWorkflowStage = (index: number) => {
    const updated = workflowStages.filter((_, i) => i !== index);
    const reordered = updated.map((stage, i) => ({ ...stage, stageOrder: i + 1 }));
    setWorkflowStages(reordered);
  };

  const addCustomization = () => {
    setCustomizations([
      ...customizations,
      {
        customizationType: 'other',
        fieldName: '',
        originalValue: '',
        customValue: '',
        notes: ''
      }
    ]);
  };

  const updateCustomization = (index: number, field: string, value: any) => {
    const updated = [...customizations];
    updated[index] = { ...updated[index], [field]: value };
    setCustomizations(updated);
  };

  const removeCustomization = (index: number) => {
    setCustomizations(customizations.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      workflowStages,
      customizations,
      attachments
    };

    onSubmit(jobData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Category <span className="text-red-500">*</span>
            </label>
            <select
              name="recipeCategory"
              value={formData.recipeCategory}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="cake">Cake</option>
              <option value="cupcake">Cupcake</option>
              <option value="cookie">Cookie</option>
              <option value="pastry">Pastry</option>
              <option value="dessert">Dessert</option>
              <option value="frosting">Frosting</option>
              <option value="filling">Filling</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity to Produce <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="quantityToProduce"
                value={formData.quantityToProduce}
                onChange={handleInputChange}
                min="1"
                required
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                placeholder="unit"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scaling Factor
            </label>
            <input
              type="number"
              name="scalingFactor"
              value={formData.scalingFactor}
              onChange={handleInputChange}
              step="0.1"
              min="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Recipe multiplier (1.0 = normal, 2.0 = double)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="internal">Internal (Components)</option>
              <option value="external">External (Customer Orders/Retail)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Internal: recipe components (buttercream, flowers). External: customer orders or retail items.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scheduled Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              name="scheduledStartTime"
              value={formData.scheduledStartTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assigned Staff
            </label>
            <input
              type="text"
              name="assignedStaffName"
              value={formData.assignedStaffName}
              onChange={handleInputChange}
              placeholder="Staff member name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="requiresClientApproval"
              checked={formData.requiresClientApproval}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Requires client approval</span>
          </label>
        </div>
      </div>

      {orderId && (
        <div className="bg-blue-50 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Order Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
              <input
                type="text"
                name="linkedOrderNumber"
                value={formData.linkedOrderNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Due Date</label>
              <input
                type="date"
                name="orderDueDate"
                value={formData.orderDueDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Specifications & Design</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Specifications
            </label>
            <textarea
              name="clientSpecifications"
              value={formData.clientSpecifications}
              onChange={handleInputChange}
              rows={3}
              placeholder="Customer requirements, preferences, and special instructions..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Design Notes
            </label>
            <textarea
              name="designNotes"
              value={formData.designNotes}
              onChange={handleInputChange}
              rows={3}
              placeholder="Design details, colors, decorations, themes..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reference Photos & Design Files
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept="image/*,.pdf"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Click to upload files</span>
                <span className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</span>
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Workflow Stages</h3>
          <button
            type="button"
            onClick={addWorkflowStage}
            className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Stage
          </button>
        </div>

        <div className="space-y-3">
          {workflowStages.map((stage, index) => (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
              <span className="text-sm font-medium text-gray-500 w-6">{stage.stageOrder}</span>

              <input
                type="text"
                value={stage.stageName}
                onChange={(e) => updateWorkflowStage(index, 'stageName', e.target.value)}
                placeholder="Stage name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={stage.estimatedDurationMinutes}
                  onChange={(e) => updateWorkflowStage(index, 'estimatedDurationMinutes', parseInt(e.target.value))}
                  placeholder="mins"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="button"
                onClick={() => removeWorkflowStage(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recipe Customizations</h3>
          <button
            type="button"
            onClick={addCustomization}
            className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Customization
          </button>
        </div>

        {customizations.length > 0 ? (
          <div className="space-y-3">
            {customizations.map((custom, index) => (
              <div key={index} className="p-3 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <select
                    value={custom.customizationType}
                    onChange={(e) => updateCustomization(index, 'customizationType', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="ingredient_override">Ingredient Override</option>
                    <option value="flavor_change">Flavor Change</option>
                    <option value="size_adjustment">Size Adjustment</option>
                    <option value="decoration_change">Decoration Change</option>
                    <option value="other">Other</option>
                  </select>

                  <input
                    type="text"
                    value={custom.fieldName}
                    onChange={(e) => updateCustomization(index, 'fieldName', e.target.value)}
                    placeholder="Field name"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <input
                    type="text"
                    value={custom.customValue}
                    onChange={(e) => updateCustomization(index, 'customValue', e.target.value)}
                    placeholder="Custom value"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <button
                    type="button"
                    onClick={() => removeCustomization(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No customizations added</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={4}
          placeholder="Any additional notes or instructions..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Create Production Job
        </button>
      </div>
    </form>
  );
};

export default ProductionJobForm;
