import React, { useState, useEffect } from 'react';
import { X, Package, DollarSign, TrendingUp, Tag, FileText, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Material, MaterialCategory } from '../types';
import { mockVendors } from '../data/mockVendors';
import { supabase, DatabasePriceHistory } from '../lib/supabaseClient';

interface MaterialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (materialData: Partial<Material>) => void;
  material?: Material | null;
}

interface PriceChange {
  packageCostChanged: boolean;
  pricePerItemChanged: boolean;
  oldPackageCost?: number;
  oldPricePerItem?: number;
}

const MaterialForm: React.FC<MaterialFormProps> = ({ isOpen, onClose, onSubmit, material }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Cake Boards' as MaterialCategory,
    unitQuantity: 1,
    packageCost: 0,
    pricePerItem: 0,
    inventoryQuantity: 0,
    reorderLevel: 5,
    vendorId: '',
    canLinkToRecipe: false,
    notes: ''
  });

  const [priceChangeReason, setPriceChangeReason] = useState('');
  const [priceHistory, setPriceHistory] = useState<DatabasePriceHistory[]>([]);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priceChange, setPriceChange] = useState<PriceChange>({
    packageCostChanged: false,
    pricePerItemChanged: false
  });

  const categories: MaterialCategory[] = [
    'Cake Boards',
    'Cake Boxes',
    'Cake Drums',
    'Cupcake Containers',
    'Decorations',
    'Toppers',
    'Wrapping Materials',
    'Straws',
    'Bags',
    'Miscellaneous'
  ];

  useEffect(() => {
    if (material && isOpen) {
      setFormData({
        name: material.name,
        category: material.category,
        unitQuantity: material.unitQuantity,
        packageCost: material.packageCost,
        pricePerItem: material.pricePerItem,
        inventoryQuantity: material.inventoryQuantity,
        reorderLevel: material.reorderLevel,
        vendorId: material.supplierId || material.vendorId || '',
        canLinkToRecipe: material.canLinkToRecipe,
        notes: material.notes || ''
      });
      setPriceChange({
        packageCostChanged: false,
        pricePerItemChanged: false,
        oldPackageCost: material.packageCost,
        oldPricePerItem: material.pricePerItem
      });
      loadPriceHistory(material.id);
    } else if (!material && isOpen) {
      resetForm();
    }
  }, [material, isOpen]);

  const loadPriceHistory = async (materialId: string) => {
    try {
      const { data, error } = await supabase
        .from('material_price_history')
        .select('*')
        .eq('material_id', materialId)
        .order('changed_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setPriceHistory(data || []);
    } catch (error) {
      console.error('Error loading price history:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'Cake Boards',
      unitQuantity: 1,
      packageCost: 0,
      pricePerItem: 0,
      inventoryQuantity: 0,
      reorderLevel: 5,
      vendorId: '',
      canLinkToRecipe: false,
      notes: ''
    });
    setPriceChangeReason('');
    setPriceHistory([]);
    setShowPriceHistory(false);
    setErrors({});
    setIsDirty(false);
    setPriceChange({
      packageCostChanged: false,
      pricePerItemChanged: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else if (name === 'unitQuantity' || name === 'inventoryQuantity' || name === 'reorderLevel') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else if (name === 'packageCost' || name === 'pricePerItem') {
      const numValue = parseFloat(value) || 0;
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));

      if (material && name === 'packageCost' && numValue !== material.packageCost) {
        setPriceChange(prev => ({
          ...prev,
          packageCostChanged: true,
          oldPackageCost: material.packageCost
        }));
      } else if (material && name === 'pricePerItem' && numValue !== material.pricePerItem) {
        setPriceChange(prev => ({
          ...prev,
          pricePerItemChanged: true,
          oldPricePerItem: material.pricePerItem
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    setIsDirty(true);

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const costPerItem = formData.unitQuantity > 0 ? formData.packageCost / formData.unitQuantity : 0;
  const profitMargin = costPerItem > 0 ? ((formData.pricePerItem - costPerItem) / costPerItem) * 100 : 0;
  const totalItemsAvailable = formData.inventoryQuantity * formData.unitQuantity;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Material name is required';
    }
    if (formData.unitQuantity <= 0) {
      newErrors.unitQuantity = 'Unit quantity must be greater than 0';
    }
    if (formData.packageCost <= 0) {
      newErrors.packageCost = 'Package cost must be greater than 0';
    }
    if (formData.pricePerItem < 0) {
      newErrors.pricePerItem = 'Price per item cannot be negative';
    }
    if (formData.inventoryQuantity < 0) {
      newErrors.inventoryQuantity = 'Inventory quantity cannot be negative';
    }
    if (formData.reorderLevel < 0) {
      newErrors.reorderLevel = 'Reorder level cannot be negative';
    }

    if ((priceChange.packageCostChanged || priceChange.pricePerItemChanged) && !priceChangeReason.trim()) {
      newErrors.priceChangeReason = 'Please provide a reason for the price change';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const materialData: Partial<Material> = {
        ...formData,
        supplierId: formData.vendorId || undefined,
        vendorId: formData.vendorId || undefined,
        costPerItem,
        profitMargin,
        totalItemsAvailable,
        updatedAt: new Date().toISOString()
      };

      if (material) {
        materialData.id = material.id;
        materialData.createdAt = material.createdAt;
      } else {
        materialData.id = `mat-${Date.now()}`;
        materialData.createdAt = new Date().toISOString();
      }

      await onSubmit(materialData);
      handleClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to save material. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to close?')) {
      return;
    }
    resetForm();
    onClose();
  };

  const getProfitMarginColor = (margin: number) => {
    if (margin < 0) return 'text-red-600';
    if (margin < 50) return 'text-yellow-600';
    if (margin < 100) return 'text-mint-600';
    return 'text-green-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleClose} />

        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {material ? 'Edit Material' : 'Add New Material'}
                </h3>
                <p className="text-sm text-gray-500">
                  {material ? 'Update material information' : 'Create a new material entry'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-6 max-h-[70vh] overflow-y-auto">
              {errors.submit && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-sm text-red-800">{errors.submit}</p>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Package className="h-4 w-4 mr-2 text-coral-500" />
                  Basic Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Material Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                      placeholder="e.g., 6 inch Round Cake Board"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Quantity *
                    </label>
                    <input
                      type="number"
                      name="unitQuantity"
                      min="1"
                      value={formData.unitQuantity}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.unitQuantity
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                      placeholder="Items per package"
                    />
                    {errors.unitQuantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.unitQuantity}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">Number of items per package</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-mint-500" />
                  Pricing Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Package Cost *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="packageCost"
                        step="0.01"
                        min="0"
                        value={formData.packageCost}
                        onChange={handleInputChange}
                        className={`w-full pl-7 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                          errors.packageCost
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                        }`}
                      />
                    </div>
                    {errors.packageCost && (
                      <p className="mt-1 text-sm text-red-600">{errors.packageCost}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cost Per Item (Calculated)
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                      ${costPerItem.toFixed(4)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price Per Item *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        name="pricePerItem"
                        step="0.01"
                        min="0"
                        value={formData.pricePerItem}
                        onChange={handleInputChange}
                        className={`w-full pl-7 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                          errors.pricePerItem
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                        }`}
                      />
                    </div>
                    {errors.pricePerItem && (
                      <p className="mt-1 text-sm text-red-600">{errors.pricePerItem}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profit Margin (Calculated)
                    </label>
                    <div className={`px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-semibold ${getProfitMarginColor(profitMargin)}`}>
                      {profitMargin.toFixed(1)}%
                    </div>
                  </div>
                </div>

                {(priceChange.packageCostChanged || priceChange.pricePerItemChanged) && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800 mb-2">
                          Price Change Detected
                        </p>
                        {priceChange.packageCostChanged && (
                          <p className="text-sm text-yellow-700">
                            Package cost: {formatCurrency(priceChange.oldPackageCost!)} → {formatCurrency(formData.packageCost)}
                          </p>
                        )}
                        {priceChange.pricePerItemChanged && (
                          <p className="text-sm text-yellow-700">
                            Price per item: {formatCurrency(priceChange.oldPricePerItem!)} → {formatCurrency(formData.pricePerItem)}
                          </p>
                        )}
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reason for Price Change *
                          </label>
                          <input
                            type="text"
                            value={priceChangeReason}
                            onChange={(e) => setPriceChangeReason(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                              errors.priceChangeReason
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                            }`}
                            placeholder="e.g., Supplier price increase, Adjusted for market rates"
                          />
                          {errors.priceChangeReason && (
                            <p className="mt-1 text-sm text-red-600">{errors.priceChangeReason}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-aqua-500" />
                  Inventory Management
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity on Hand *
                    </label>
                    <input
                      type="number"
                      name="inventoryQuantity"
                      min="0"
                      value={formData.inventoryQuantity}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.inventoryQuantity
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                    />
                    {errors.inventoryQuantity && (
                      <p className="mt-1 text-sm text-red-600">{errors.inventoryQuantity}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">Number of packages in stock</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reorder Level *
                    </label>
                    <input
                      type="number"
                      name="reorderLevel"
                      min="0"
                      value={formData.reorderLevel}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 transition-colors ${
                        errors.reorderLevel
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                      }`}
                    />
                    {errors.reorderLevel && (
                      <p className="mt-1 text-sm text-red-600">{errors.reorderLevel}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">Low stock alert threshold</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Items Available
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                      {totalItemsAvailable} items
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <Tag className="h-4 w-4 mr-2 text-pink-500" />
                  Supplier Information
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supplier Name
                    </label>
                    <select
                      name="vendorId"
                      value={formData.vendorId}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    >
                      <option value="">Select Supplier</option>
                      {mockVendors.map(vendor => (
                        <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  Additional Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="canLinkToRecipe"
                        checked={formData.canLinkToRecipe}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Can be linked to recipes</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                      placeholder="Additional notes about this material..."
                    />
                  </div>
                </div>
              </div>

              {material && priceHistory.length > 0 && (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowPriceHistory(!showPriceHistory)}
                    className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-900 mb-3"
                  >
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-gray-500" />
                      Price History ({priceHistory.length})
                    </span>
                    {showPriceHistory ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>

                  {showPriceHistory && (
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Package Cost
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price Per Item
                              </th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Reason
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {priceHistory.map((history) => (
                              <tr key={history.id}>
                                <td className="px-4 py-2 text-sm text-gray-900 whitespace-nowrap">
                                  {formatDate(history.changed_at)}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">
                                  {history.old_package_cost !== null && history.new_package_cost !== null ? (
                                    <div>
                                      <div className="text-gray-500">{formatCurrency(history.old_package_cost)} → {formatCurrency(history.new_package_cost)}</div>
                                      <div className={`text-xs ${history.cost_change_amount! >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        {formatPercentage(history.cost_change_percentage!)}
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                                <td className="px-4 py-2 text-sm whitespace-nowrap">
                                  {history.old_price_per_item !== null && history.new_price_per_item !== null ? (
                                    <div>
                                      <div className="text-gray-500">{formatCurrency(history.old_price_per_item)} → {formatCurrency(history.new_price_per_item)}</div>
                                      <div className={`text-xs ${history.price_change_amount! >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatPercentage(history.price_change_percentage!)}
                                      </div>
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">
                                  {history.reason || '-'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 rounded-md hover:from-coral-500 hover:to-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : material ? 'Update Material' : 'Add Material'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MaterialForm;
