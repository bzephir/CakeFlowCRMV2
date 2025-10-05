import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { MasterIngredient, IngredientCategory, MeasurementUnit } from '../types/ingredient';
import { calculateCostPerUnit } from '../types/ingredient';
import { mockVendors } from '../data/mockVendors';

interface IngredientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ingredient: Partial<MasterIngredient>) => void;
  ingredient?: MasterIngredient | null;
  onAddVendor?: () => void;
}

const IngredientForm: React.FC<IngredientFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  ingredient,
  onAddVendor
}) => {
  const [formData, setFormData] = useState({
    name: ingredient?.name || '',
    category: ingredient?.category || ('Flour' as IngredientCategory),
    packageSize: ingredient?.packageSize || 0,
    packageUnit: ingredient?.packageUnit || ('lb' as MeasurementUnit),
    packageDescription: ingredient?.packageDescription || '',
    inventoryQuantity: ingredient?.inventoryQuantity || 0,
    purchasePrice: ingredient?.purchasePrice || 0,
    baseUnit: ingredient?.baseUnit || ('lb' as MeasurementUnit),
    vendorId: ingredient?.vendorId || '',
    reorderLevel: ingredient?.reorderLevel || 5,
    notes: ingredient?.notes || ''
  });

  const categories: IngredientCategory[] = [
    'Flour',
    'Sugar',
    'Dairy',
    'Eggs',
    'Fats & Oils',
    'Leavening Agents',
    'Flavorings',
    'Chocolate',
    'Nuts & Seeds',
    'Fruits',
    'Spices',
    'Other'
  ];

  const units: MeasurementUnit[] = ['g', 'kg', 'ml', 'l', 'tsp', 'tbsp', 'cup', 'lb', 'oz', 'gal', 'piece'];

  const costPerUnit = calculateCostPerUnit(
    formData.purchasePrice,
    formData.packageSize,
    formData.packageUnit,
    formData.baseUnit
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      costPerUnit,
      id: ingredient?.id || `ing-${Date.now()}`,
      createdAt: ingredient?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastPriceUpdate: new Date().toISOString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {ingredient ? 'Edit Ingredient' : 'Add New Ingredient'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ingredient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as IngredientCategory })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vendor
                  </label>
                  <div className="flex space-x-2">
                    <select
                      value={formData.vendorId}
                      onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    >
                      <option value="">Select Vendor</option>
                      {mockVendors.map(vendor => (
                        <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                      ))}
                    </select>
                    {onAddVendor && (
                      <button
                        type="button"
                        onClick={onAddVendor}
                        className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        title="Add New Vendor"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Size
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.packageSize}
                      onChange={(e) => setFormData({ ...formData, packageSize: parseFloat(e.target.value) })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                    <select
                      value={formData.packageUnit}
                      onChange={(e) => setFormData({ ...formData, packageUnit: e.target.value as MeasurementUnit })}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Package Description
                  </label>
                  <input
                    type="text"
                    value={formData.packageDescription}
                    onChange={(e) => setFormData({ ...formData, packageDescription: e.target.value })}
                    placeholder="e.g., 25 lb bag"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purchase Price
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) })}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Base Unit
                  </label>
                  <select
                    value={formData.baseUnit}
                    onChange={(e) => setFormData({ ...formData, baseUnit: e.target.value as MeasurementUnit })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cost Per Unit (Calculated)
                  </label>
                  <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-900">
                    ${costPerUnit.toFixed(4)} per {formData.baseUnit}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inventory Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.inventoryQuantity}
                    onChange={(e) => setFormData({ ...formData, inventoryQuantity: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reorder Level
                  </label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 rounded-md hover:from-coral-500 hover:to-pink-500 transition-all"
              >
                {ingredient ? 'Update Ingredient' : 'Add Ingredient'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;
