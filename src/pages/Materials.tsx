import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import IngredientForm from '../components/IngredientForm';
import MeasurementConverter from '../components/MeasurementConverter';
import VendorModal from '../components/VendorModal';
import { Plus, Search, Filter, Package, DollarSign, AlertTriangle, CreditCard as Edit, TrendingUp, Calculator, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { mockIngredients, getIngredientCategories, getLowStockIngredients } from '../data/mockIngredients';
import { mockVendors } from '../data/mockVendors';
import type { MasterIngredient } from '../types/ingredient';

const Ingredients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<MasterIngredient | null>(null);

  const categories = getIngredientCategories();
  const lowStockItems = getLowStockIngredients();

  const filteredIngredients = useMemo(() => {
    return mockIngredients.filter(ing => {
      const matchesSearch =
        ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ing.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || ing.category === categoryFilter;

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'low' && ing.inventoryQuantity <= (ing.reorderLevel || 0)) ||
        (stockFilter === 'in-stock' && ing.inventoryQuantity > (ing.reorderLevel || 0));

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchTerm, categoryFilter, stockFilter]);

  const getVendorName = (vendorId?: string) => {
    if (!vendorId) return 'No Vendor';
    const vendor = mockVendors.find(v => v.id === vendorId);
    return vendor?.name || 'Unknown';
  };

  const getStockStatus = (ing: MasterIngredient) => {
    if (ing.inventoryQuantity === 0) {
      return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    }
    if (ing.inventoryQuantity <= (ing.reorderLevel || 0)) {
      return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { text: 'In Stock', color: 'bg-mint-100 text-mint-800' };
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (ingredient: MasterIngredient) => {
    setEditingIngredient(ingredient);
    setIsFormOpen(true);
  };

  const handleUpdatePrice = (ingredient: MasterIngredient) => {
    alert(`Updating price for ${ingredient.name} from external source...`);
  };

  const handleUpdateAllPrices = () => {
    alert('Updating all ingredient prices from external market data source...');
  };

  const handleFormSubmit = (ingredientData: Partial<MasterIngredient>) => {
    console.log('Ingredient saved:', ingredientData);
    alert(`Ingredient "${ingredientData.name}" saved successfully!`);
    setEditingIngredient(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingIngredient(null);
  };

  const handleVendorSubmit = (vendorData: any) => {
    console.log('Vendor saved:', vendorData);
    alert(`Vendor "${vendorData.name}" added successfully!`);
  };

  const totalValue = filteredIngredients.reduce(
    (sum, ing) => sum + ing.purchasePrice * ing.inventoryQuantity,
    0
  );

  const mockRecipesUsingIngredient = (ingredientId: string) => {
    return [
      { id: '1', name: 'Classic Vanilla Wedding Cake', quantityUsed: 6, unit: 'cups' },
      { id: '2', name: 'Chocolate Fudge Birthday Cake', quantityUsed: 2, unit: 'cups' },
    ];
  };

  return (
    <div className="p-6">
      <Header title="Master Ingredients" icon={Package} />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search ingredients..."
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="block w-full sm:w-40 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Stock Levels</option>
                <option value="in-stock">In Stock</option>
                <option value="low">Low Stock</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleUpdateAllPrices}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Update All Prices
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Ingredients</p>
                <p className="text-lg font-semibold text-gray-900">{mockIngredients.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Inventory Value</p>
                <p className="text-lg font-semibold text-gray-900">${totalValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Low Stock Items</p>
                <p className="text-lg font-semibold text-gray-900">{lowStockItems.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <Filter className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Categories</p>
                <p className="text-lg font-semibold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column Headers */}
        <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredient Name</span>
              </div>
              <div className="w-32 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Package Size</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</span>
              </div>
              <div className="w-28 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</span>
              </div>
              <div className="w-28 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
              </div>
            </div>
            <div className="w-10">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider"></span>
            </div>
          </div>
        </div>

        <div className="space-y-0 mb-6">
          {filteredIngredients.map((ingredient) => {
            const status = getStockStatus(ingredient);
            const isExpanded = expandedId === ingredient.id;
            const recipesUsing = mockRecipesUsingIngredient(ingredient.id);

            return (
              <div key={ingredient.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer"
                  onClick={() => toggleExpand(ingredient.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{ingredient.name}</h3>
                    </div>
                    <div className="w-32 text-center">
                      <span className="text-sm text-gray-700">{ingredient.packageSize} {ingredient.packageUnit}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm font-medium text-gray-900">${ingredient.purchasePrice.toFixed(2)}</span>
                    </div>
                    <div className="w-28 text-center">
                      <span className="text-sm text-gray-700">{ingredient.inventoryQuantity}</span>
                    </div>
                    <div className="w-28 flex justify-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                        {status.text}
                      </span>
                    </div>
                  </div>
                  <div className="w-10 flex justify-center">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Ingredient Details</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Category</dt>
                            <dd className="text-sm text-gray-900">{ingredient.category}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Package Description</dt>
                            <dd className="text-sm text-gray-900">{ingredient.packageDescription}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Base Unit</dt>
                            <dd className="text-sm text-gray-900">{ingredient.baseUnit}</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Pricing & Cost</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Purchase Price</dt>
                            <dd className="text-sm text-gray-900">${ingredient.purchasePrice.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Cost Per Unit</dt>
                            <dd className="text-sm text-gray-900">${ingredient.costPerUnit.toFixed(4)} per {ingredient.baseUnit}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Last Price Update</dt>
                            <dd className="text-sm text-gray-900">
                              {ingredient.lastPriceUpdate ? new Date(ingredient.lastPriceUpdate).toLocaleDateString() : 'Never'}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Inventory & Vendor</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Inventory Quantity</dt>
                            <dd className="text-sm text-gray-900">{ingredient.inventoryQuantity} units</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Reorder Level</dt>
                            <dd className="text-sm text-gray-900">{ingredient.reorderLevel} units</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Vendor</dt>
                            <dd className="text-sm text-gray-900">{getVendorName(ingredient.vendorId)}</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="md:col-span-2 lg:col-span-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recipes Using This Ingredient</h4>
                        {recipesUsing.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {recipesUsing.map(recipe => (
                              <div
                                key={recipe.id}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-aqua-100 text-aqua-800"
                              >
                                {recipe.name} ({recipe.quantityUsed} {recipe.unit})
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No recipes using this ingredient yet</p>
                        )}
                      </div>

                      {ingredient.notes && (
                        <div className="md:col-span-2 lg:col-span-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                          <p className="text-sm text-gray-700">{ingredient.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(ingredient);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" />
                        Edit Ingredient
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdatePrice(ingredient);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <TrendingUp className="h-4 w-4 mr-1.5" />
                        Update Price
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredIngredients.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-gray-500 text-lg">No ingredients found</div>
              <div className="text-gray-400 text-sm mt-2">
                {searchTerm || categoryFilter !== 'all' || stockFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by adding your first ingredient'}
              </div>
            </div>
          )}
        </div>

        <MeasurementConverter ingredients={mockIngredients} />
      </div>

      <IngredientForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        ingredient={editingIngredient}
        onAddVendor={() => setIsVendorModalOpen(true)}
      />

      <VendorModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onSubmit={handleVendorSubmit}
      />
    </div>
  );
};

export default Materials;
