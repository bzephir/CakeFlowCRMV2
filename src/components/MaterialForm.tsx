import React, { useState, useEffect } from 'react';
import { X, DollarSign, Package, TrendingUp } from 'lucide-react';
import { Material, MaterialCategory, calculateCostPerItem, calculateProfitMargin } from '../types/material';
import { mockVendors } from '../data/mockVendors';

interface MaterialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (materialData: Partial<Material>) => void;
  material?: Material | null;
  onAddVendor?: () => void;
}

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
  'Miscellaneous',
];

const MaterialForm: React.FC<MaterialFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  material,
  onAddVendor,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Miscellaneous' as MaterialCategory,
    unitQuantity: 1,
    packageCost: 0,
    pricePerItem: 0,
    inventoryQuantity: 0,
    reorderLevel: 5,
    vendorId: '',
    canLinkToRecipe: false,
    notes: '',
  });

  const [calculatedCostPerItem, setCalculatedCostPerItem] = useState(0);
  const [calculatedProfitMargin, setCalculatedProfitMargin] = useState(0);

  useEffect(() => {
    if (material) {
      setFormData({
        name: material.name,
        category: material.category,
        unitQuantity: material.unitQuantity,
        packageCost: material.packageCost,
        pricePerItem: material.pricePerItem,
        inventoryQuantity: material.inventoryQuantity,
        reorderLevel: material.reorderLevel,
        vendorId: material.vendorId || '',
        canLinkToRecipe: material.canLinkToRecipe,
        notes: material.notes || '',
      });
    } else {
      setFormData({
        name: '',
        category: 'Miscellaneous',
        unitQuantity: 1,
        packageCost: 0,
        pricePerItem: 0,
        inventoryQuantity: 0,
        reorderLevel: 5,
        vendorId: '',
        canLinkToRecipe: false,
        notes: '',
      });
    }
  }, [material]);

  useEffect(() => {
    const costPer = calculateCostPerItem(formData.packageCost, formData.unitQuantity);
    setCalculatedCostPerItem(costPer);

    const margin = calculateProfitMargin(formData.pricePerItem, costPer);
    setCalculatedProfitMargin(margin);
  }, [formData.packageCost, formData.unitQuantity, formData.pricePerItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.pricePerItem < calculatedCostPerItem) {
      alert('Warning: Price per item is less than cost per item. This will result in a loss!');
    }

    onSubmit({
      ...formData,
      costPerItem: calculatedCostPerItem,
      profitMargin: calculatedProfitMargin,
    });
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const getMarginColor = (margin: number) => {
    if (margin < 0) return 'text-red-600';
    if (margin < 20) return 'text-yellow-600';
    if (margin < 50) return 'text-mint-600';
    return 'text-green-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-full max-w-3xl shadow-lg rounded-lg bg-white mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {material ? 'Edit Material' : 'Add New Material'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="e.g., 1/2 Sheet Cake Board"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor
              </label>
              <div className="flex gap-2">
                <select
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                >
                  <option value="">Select vendor...</option>
                  {mockVendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
                {onAddVendor && (
                  <button
                    type="button"
                    onClick={onAddVendor}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Package className="h-5 w-5 mr-2 text-coral-500" />
              Package Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Quantity (items per package) *
                </label>
                <input
                  type="number"
                  name="unitQuantity"
                  value={formData.unitQuantity}
                  onChange={handleChange}
                  required
                  min="1"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                  placeholder="e.g., 25"
                />
                <p className="mt-1 text-xs text-gray-500">How many items come in one package</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Package Cost (total cost) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="packageCost"
                    value={formData.packageCost}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">What you pay for the whole package</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Per Item (calculated)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={calculatedCostPerItem.toFixed(4)}
                    readOnly
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Your cost per individual item</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Per Item (customer price) *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="pricePerItem"
                    value={formData.pricePerItem}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                    placeholder="0.00"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">What you charge customers per item</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-coral-500" />
                  <span className="text-sm font-medium text-gray-700">Profit Margin:</span>
                </div>
                <span className={`text-lg font-bold ${getMarginColor(calculatedProfitMargin)}`}>
                  {calculatedProfitMargin.toFixed(2)}%
                </span>
              </div>
              {calculatedProfitMargin < 0 && (
                <p className="mt-2 text-xs text-red-600">
                  Warning: Negative margin - you're selling at a loss!
                </p>
              )}
              {calculatedProfitMargin >= 0 && calculatedProfitMargin < 20 && (
                <p className="mt-2 text-xs text-yellow-600">
                  Low margin - consider increasing customer price
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Inventory</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Inventory (packages) *
                </label>
                <input
                  type="number"
                  name="inventoryQuantity"
                  value={formData.inventoryQuantity}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                  placeholder="0"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Total items: {formData.inventoryQuantity * formData.unitQuantity}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reorder Level *
                </label>
                <input
                  type="number"
                  name="reorderLevel"
                  value={formData.reorderLevel}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                  placeholder="5"
                />
                <p className="mt-1 text-xs text-gray-500">Alert when inventory reaches this level</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="canLinkToRecipe"
                  checked={formData.canLinkToRecipe}
                  onChange={handleChange}
                  className="h-4 w-4 text-coral-600 focus:ring-coral-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Can be linked to recipes (e.g., sprinkles, decorations)
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral-500"
                placeholder="Additional notes or instructions..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500"
            >
              {material ? 'Update Material' : 'Add Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialForm;
