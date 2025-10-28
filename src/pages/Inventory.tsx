import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import InventoryStats from '../components/InventoryStats';
import InventoryFilters from '../components/InventoryFilters';
import InventoryPagination from '../components/InventoryPagination';
import IngredientForm from '../components/IngredientForm';
import MaterialForm from '../components/MaterialForm';
import VendorModal from '../components/VendorModal';
import {
  Package,
  Box,
  DollarSign,
  AlertTriangle,
  Filter,
  Plus,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Edit,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { mockIngredients, getIngredientCategories, getLowStockIngredients } from '../data/mockIngredients';
import {
  mockMaterials,
  getMaterialCategories,
  getLowStockMaterials,
  calculateTotalInventoryValue
} from '../data/mockMaterials';
import { mockVendors } from '../data/mockVendors';
import type { MasterIngredient } from '../types/ingredient';
import type { Material } from '../types';

type TabType = 'ingredients' | 'materials';

const Inventory: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('ingredients');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [isIngredientFormOpen, setIsIngredientFormOpen] = useState(false);
  const [isMaterialFormOpen, setIsMaterialFormOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<MasterIngredient | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);

  const ingredientCategories = getIngredientCategories();
  const materialCategories = getMaterialCategories();
  const lowStockIngredients = getLowStockIngredients();
  const lowStockMaterials = getLowStockMaterials();

  const filteredIngredients = useMemo(() => {
    return mockIngredients.filter(ing => {
      const matchesSearch =
        ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ing.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || ing.category === categoryFilter;

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'out-of-stock' && ing.quantityOnHand === 0) ||
        (stockFilter === 'low' && ing.quantityOnHand > 0 && ing.quantityOnHand <= (ing.reorderLevel || 0)) ||
        (stockFilter === 'in-stock' && ing.quantityOnHand > (ing.reorderLevel || 0));

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchTerm, categoryFilter, stockFilter]);

  const filteredMaterials = useMemo(() => {
    return mockMaterials.filter(material => {
      const matchesSearch =
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.vendorName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || material.category === categoryFilter;

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'in-stock' && material.inventoryQuantity > material.reorderLevel) ||
        (stockFilter === 'low' && material.inventoryQuantity <= material.reorderLevel && material.inventoryQuantity > 0) ||
        (stockFilter === 'out-of-stock' && material.inventoryQuantity === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchTerm, categoryFilter, stockFilter]);

  const currentItems = activeTab === 'ingredients' ? filteredIngredients : filteredMaterials;
  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = currentItems.slice(startIndex, endIndex);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchTerm('');
    setCategoryFilter('all');
    setStockFilter('all');
    setExpandedId(null);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setExpandedId(null);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, stockFilter]);

  const ingredientInventoryValue = mockIngredients.reduce(
    (sum, ing) => sum + ing.purchasePrice * ing.quantityOnHand,
    0
  );

  const materialInventoryValue = calculateTotalInventoryValue();
  const totalInventoryValue = ingredientInventoryValue + materialInventoryValue;
  const totalLowStock = lowStockIngredients.length + lowStockMaterials.length;

  const unifiedStats = [
    {
      label: 'Total Inventory Value',
      value: `$${totalInventoryValue.toFixed(2)}`,
      icon: DollarSign,
      gradient: 'from-mint-400 to-mint-500'
    },
    {
      label: 'Total Ingredients',
      value: mockIngredients.length,
      icon: Package,
      gradient: 'from-coral-400 to-coral-500'
    },
    {
      label: 'Total Materials',
      value: mockMaterials.length,
      icon: Box,
      gradient: 'from-aqua-400 to-aqua-500'
    },
    {
      label: 'Low Stock Items',
      value: totalLowStock,
      icon: AlertTriangle,
      gradient: 'from-yellow-400 to-yellow-500'
    },
    {
      label: 'Total Categories',
      value: ingredientCategories.length + materialCategories.length,
      icon: Filter,
      gradient: 'from-pink-400 to-pink-500'
    }
  ];

  const getSupplierName = (supplierId?: string, vendorId?: string) => {
    const id = supplierId || vendorId;
    if (!id) return 'No Supplier';
    const supplier = mockVendors.find(v => v.id === id);
    return supplier?.name || 'Unknown';
  };

  const getIngredientStockStatus = (ing: MasterIngredient) => {
    if (ing.quantityOnHand === 0) {
      return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    }
    if (ing.quantityOnHand <= (ing.reorderLevel || 0)) {
      return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { text: 'In Stock', color: 'bg-mint-100 text-mint-800' };
  };

  const getMaterialStockStatus = (material: Material) => {
    if (material.inventoryQuantity === 0) {
      return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    }
    if (material.inventoryQuantity <= material.reorderLevel) {
      return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { text: 'In Stock', color: 'bg-mint-100 text-mint-800' };
  };

  const getMarginColor = (margin: number) => {
    if (margin < 0) return 'text-red-600';
    if (margin < 50) return 'text-yellow-600';
    if (margin < 100) return 'text-mint-600';
    return 'text-green-600';
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleAddItem = () => {
    if (activeTab === 'ingredients') {
      setEditingIngredient(null);
      setIsIngredientFormOpen(true);
    } else {
      setEditingMaterial(null);
      setIsMaterialFormOpen(true);
    }
  };

  const handleEditIngredient = (ingredient: MasterIngredient) => {
    setEditingIngredient(ingredient);
    setIsIngredientFormOpen(true);
  };

  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
    setIsMaterialFormOpen(true);
  };

  const handleDeleteIngredient = (ingredient: MasterIngredient) => {
    if (window.confirm(`Are you sure you want to delete "${ingredient.name}"? This action cannot be undone.`)) {
      console.log('Delete ingredient:', ingredient.id);
      alert(`Ingredient "${ingredient.name}" has been deleted.`);
    }
  };

  const handleDeleteMaterial = (material: Material) => {
    if (window.confirm(`Are you sure you want to delete "${material.name}"? This action cannot be undone.`)) {
      console.log('Delete material:', material.id);
      alert(`Material "${material.name}" has been deleted.`);
    }
  };

  const handleIngredientSubmit = (ingredientData: Partial<MasterIngredient>) => {
    console.log('Ingredient saved:', ingredientData);
    alert(`Ingredient "${ingredientData.name}" saved successfully!`);
    setEditingIngredient(null);
  };

  const handleMaterialSubmit = (materialData: Partial<Material>) => {
    console.log('Material saved:', materialData);
    alert(`Material "${materialData.name}" saved successfully!`);
    setEditingMaterial(null);
  };

  const handleVendorSubmit = (vendorData: { name: string; [key: string]: unknown }) => {
    console.log('Vendor saved:', vendorData);
    alert(`Vendor "${vendorData.name}" added successfully!`);
  };

  const handleUpdatePrice = (item: MasterIngredient | Material) => {
    alert(`Updating price for ${item.name} from external source...`);
  };

  return (
    <div className="p-6">
      <Header title="Inventory Management" icon={Package} />

      <div className="p-6">
        <InventoryStats stats={unifiedStats} />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => handleTabChange('ingredients')}
                className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-sm font-semibold text-center focus:z-10 transition-all ${
                  activeTab === 'ingredients'
                    ? 'text-coral-700 bg-coral-50 border-b-4 border-coral-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-4 border-transparent'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Ingredients</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === 'ingredients'
                      ? 'bg-coral-100 text-coral-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {mockIngredients.length}
                  </span>
                  {lowStockIngredients.length > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {lowStockIngredients.length} low
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => handleTabChange('materials')}
                className={`group relative min-w-0 flex-1 overflow-hidden py-4 px-6 text-sm font-semibold text-center focus:z-10 transition-all ${
                  activeTab === 'materials'
                    ? 'text-coral-700 bg-coral-50 border-b-4 border-coral-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border-b-4 border-transparent'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Box className="h-5 w-5" />
                  <span>Materials</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    activeTab === 'materials'
                      ? 'bg-coral-100 text-coral-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {mockMaterials.length}
                  </span>
                  {lowStockMaterials.length > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {lowStockMaterials.length} low
                    </span>
                  )}
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <InventoryFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                categoryFilter={categoryFilter}
                onCategoryChange={setCategoryFilter}
                stockFilter={stockFilter}
                onStockChange={setStockFilter}
                categories={activeTab === 'ingredients' ? ingredientCategories : materialCategories}
                searchPlaceholder={`Search ${activeTab}...`}
              />

              <button
                onClick={handleAddItem}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {activeTab === 'ingredients' ? 'Ingredient' : 'Material'}
              </button>
            </div>

            {activeTab === 'ingredients' ? (
              <>
                <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ingredient Name</span>
                      </div>
                      <div className="w-32 text-left">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</span>
                      </div>
                      <div className="w-28 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Qty on Hand</span>
                      </div>
                      <div className="w-24 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</span>
                      </div>
                      <div className="w-28 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</span>
                      </div>
                      <div className="w-32 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
                      </div>
                      <div className="w-28 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</span>
                      </div>
                    </div>
                    <div className="w-10"></div>
                  </div>
                </div>

                <div className="space-y-0">
                  {paginatedItems.map((ingredient) => {
                    const ing = ingredient as MasterIngredient;
                    const status = getIngredientStockStatus(ing);
                    const isExpanded = expandedId === ing.id;

                    return (
                      <div key={ing.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
                        <div
                          className="flex items-center justify-between px-4 py-2 cursor-pointer"
                          onClick={() => toggleExpand(ing.id)}
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-gray-900">{ing.name}</h3>
                            </div>
                            <div className="w-32 text-left">
                              <span className="text-sm text-gray-700">{ing.category}</span>
                            </div>
                            <div className="w-28 text-center">
                              <span className="text-sm text-gray-700">{ing.quantityOnHand}</span>
                            </div>
                            <div className="w-24 text-center">
                              <span className="text-sm text-gray-700">{ing.baseUnit}</span>
                            </div>
                            <div className="w-28 text-center">
                              <span className="text-sm font-medium text-gray-900">${ing.costPerUnit.toFixed(4)}</span>
                            </div>
                            <div className="w-32 flex justify-center">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                                {status.text}
                              </span>
                            </div>
                            <div className="w-28 text-center">
                              <span className="text-sm text-gray-700 capitalize">{ing.location}</span>
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
                                    <dt className="text-xs text-gray-500">Package Description</dt>
                                    <dd className="text-sm text-gray-900">{ing.packageDescription}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Package Size</dt>
                                    <dd className="text-sm text-gray-900">{ing.packageSize} {ing.packageUnit}</dd>
                                  </div>
                                  {ing.brand && (
                                    <div>
                                      <dt className="text-xs text-gray-500">Brand</dt>
                                      <dd className="text-sm text-gray-900">{ing.brand}</dd>
                                    </div>
                                  )}
                                  {ing.lotNumber && (
                                    <div>
                                      <dt className="text-xs text-gray-500">Lot Number</dt>
                                      <dd className="text-sm text-gray-900">{ing.lotNumber}</dd>
                                    </div>
                                  )}
                                </dl>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Pricing & Cost</h4>
                                <dl className="space-y-1.5">
                                  <div>
                                    <dt className="text-xs text-gray-500">Purchase Price</dt>
                                    <dd className="text-sm text-gray-900">${ing.purchasePrice.toFixed(2)}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Cost Per Unit</dt>
                                    <dd className="text-sm text-gray-900">${ing.costPerUnit.toFixed(4)} per {ing.baseUnit}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Total Value</dt>
                                    <dd className="text-sm text-gray-900">${(ing.purchasePrice * ing.quantityOnHand).toFixed(2)}</dd>
                                  </div>
                                </dl>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Inventory & Supplier</h4>
                                <dl className="space-y-1.5">
                                  <div>
                                    <dt className="text-xs text-gray-500">Reorder Level</dt>
                                    <dd className="text-sm text-gray-900">{ing.reorderLevel} units</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Storage Location</dt>
                                    <dd className="text-sm text-gray-900 capitalize">{ing.location}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Supplier Name</dt>
                                    <dd className="text-sm text-gray-900">
                                      {(ing.supplierId || ing.vendorId) ? (
                                        <Link
                                          to={`/suppliers/${ing.supplierId || ing.vendorId}`}
                                          className="text-coral-600 hover:text-coral-700 hover:underline"
                                        >
                                          {getSupplierName(ing.supplierId, ing.vendorId)}
                                        </Link>
                                      ) : (
                                        <span className="text-gray-500">No Supplier</span>
                                      )}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>

                            <div className="mt-3 flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditIngredient(ing);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                <Edit className="h-4 w-4 mr-1.5" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdatePrice(ing);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                <RefreshCw className="h-4 w-4 mr-1.5" />
                                Update Price
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteIngredient(ing);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-4 w-4 mr-1.5" />
                                Delete
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
              </>
            ) : (
              <>
                <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Material Name</span>
                      </div>
                      <div className="w-32 text-left">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</span>
                      </div>
                      <div className="w-24 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Pkg Cost</span>
                      </div>
                      <div className="w-24 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Per</span>
                      </div>
                      <div className="w-24 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per</span>
                      </div>
                      <div className="w-24 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Margin %</span>
                      </div>
                      <div className="w-24 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</span>
                      </div>
                      <div className="w-28 text-center">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
                      </div>
                    </div>
                    <div className="w-10"></div>
                  </div>
                </div>

                <div className="space-y-0">
                  {paginatedItems.map((material) => {
                    const mat = material as Material;
                    const status = getMaterialStockStatus(mat);
                    const isExpanded = expandedId === mat.id;

                    return (
                      <div key={mat.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
                        <div
                          className="flex items-center justify-between px-4 py-2 cursor-pointer"
                          onClick={() => toggleExpand(mat.id)}
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex-1">
                              <h3 className="text-sm font-medium text-gray-900">{mat.name}</h3>
                            </div>
                            <div className="w-32 text-left">
                              <span className="text-sm text-gray-700">{mat.category}</span>
                            </div>
                            <div className="w-24 text-center">
                              <span className="text-sm font-medium text-gray-900">${mat.packageCost.toFixed(2)}</span>
                            </div>
                            <div className="w-24 text-center">
                              <span className="text-sm text-gray-700">${mat.costPerItem.toFixed(2)}</span>
                            </div>
                            <div className="w-24 text-center">
                              <span className="text-sm text-gray-700">${mat.pricePerItem.toFixed(2)}</span>
                            </div>
                            <div className="w-24 text-center">
                              <span className={`text-sm font-semibold ${getMarginColor(mat.profitMargin)}`}>
                                {mat.profitMargin.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-24 text-center">
                              <span className="text-sm text-gray-700">{mat.inventoryQuantity}</span>
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
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Material Details</h4>
                                <dl className="space-y-1.5">
                                  <div>
                                    <dt className="text-xs text-gray-500">Unit Quantity</dt>
                                    <dd className="text-sm text-gray-900">{mat.unitQuantity} items per package</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Total Items Available</dt>
                                    <dd className="text-sm text-gray-900">{mat.totalItemsAvailable} items</dd>
                                  </div>
                                  {mat.canLinkToRecipe && (
                                    <div>
                                      <dt className="text-xs text-gray-500">Recipe Linkable</dt>
                                      <dd className="text-sm text-mint-600 font-medium">Yes</dd>
                                    </div>
                                  )}
                                </dl>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Pricing & Margins</h4>
                                <dl className="space-y-1.5">
                                  <div>
                                    <dt className="text-xs text-gray-500">Package Cost</dt>
                                    <dd className="text-sm text-gray-900">${mat.packageCost.toFixed(2)}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Profit Per Item</dt>
                                    <dd className="text-sm text-gray-900">${(mat.pricePerItem - mat.costPerItem).toFixed(2)}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Profit Margin</dt>
                                    <dd className={`text-sm font-semibold ${getMarginColor(mat.profitMargin)}`}>
                                      {mat.profitMargin.toFixed(1)}%
                                    </dd>
                                  </div>
                                </dl>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Inventory & Supplier</h4>
                                <dl className="space-y-1.5">
                                  <div>
                                    <dt className="text-xs text-gray-500">Reorder Level</dt>
                                    <dd className="text-sm text-gray-900">{mat.reorderLevel} packages</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Potential Revenue</dt>
                                    <dd className="text-sm text-gray-900">${(mat.pricePerItem * mat.totalItemsAvailable).toFixed(2)}</dd>
                                  </div>
                                  <div>
                                    <dt className="text-xs text-gray-500">Supplier Name</dt>
                                    <dd className="text-sm text-gray-900">
                                      {(mat.supplierId || mat.vendorId) ? (
                                        <Link
                                          to={`/suppliers/${mat.supplierId || mat.vendorId}`}
                                          className="text-coral-600 hover:text-coral-700 hover:underline"
                                        >
                                          {getSupplierName(mat.supplierId, mat.vendorId)}
                                        </Link>
                                      ) : (
                                        <span className="text-gray-500">No Supplier</span>
                                      )}
                                    </dd>
                                  </div>
                                </dl>
                              </div>
                            </div>

                            {mat.notes && (
                              <div className="mt-4">
                                <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                                <p className="text-sm text-gray-700">{mat.notes}</p>
                              </div>
                            )}

                            <div className="mt-3 flex space-x-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditMaterial(mat);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                <Edit className="h-4 w-4 mr-1.5" />
                                Edit
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdatePrice(mat);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                <TrendingUp className="h-4 w-4 mr-1.5" />
                                Update Pricing
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteMaterial(mat);
                                }}
                                className="inline-flex items-center px-3 py-1.5 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="h-4 w-4 mr-1.5" />
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredMaterials.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                      <Box className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <div className="text-gray-500 text-lg">No materials found</div>
                      <div className="text-gray-400 text-sm mt-2">
                        {searchTerm || categoryFilter !== 'all' || stockFilter !== 'all'
                          ? 'Try adjusting your search or filter criteria'
                          : 'Get started by adding your first material'}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <InventoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={currentItems.length}
              startIndex={startIndex}
              endIndex={endIndex}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>

      <IngredientForm
        isOpen={isIngredientFormOpen}
        onClose={() => {
          setIsIngredientFormOpen(false);
          setEditingIngredient(null);
        }}
        onSubmit={handleIngredientSubmit}
        ingredient={editingIngredient}
        onAddVendor={() => setIsVendorModalOpen(true)}
      />

      <MaterialForm
        isOpen={isMaterialFormOpen}
        onClose={() => {
          setIsMaterialFormOpen(false);
          setEditingMaterial(null);
        }}
        onSubmit={handleMaterialSubmit}
        material={editingMaterial}
      />

      <VendorModal
        isOpen={isVendorModalOpen}
        onClose={() => setIsVendorModalOpen(false)}
        onSubmit={handleVendorSubmit}
      />
    </div>
  );
};

export default Inventory;
