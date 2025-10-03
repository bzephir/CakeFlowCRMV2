import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import MaterialForm from '../components/MaterialForm';
import VendorModal from '../components/VendorModal';
import { Plus, Search, Filter, Package, DollarSign, AlertTriangle, TrendingUp, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockMaterials, getMaterialCategories, getLowStockMaterials } from '../data/mockMaterials';
import { mockVendors } from '../data/mockVendors';
import { Material, calculateInventoryValue, calculatePotentialRevenue, calculateAverageMargin } from '../types/material';

const Materials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = getMaterialCategories();
  const lowStockItems = getLowStockMaterials();

  const filteredMaterials = useMemo(() => {
    return mockMaterials.filter(mat => {
      const matchesSearch =
        mat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mat.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || mat.category === categoryFilter;

      const matchesStock =
        stockFilter === 'all' ||
        (stockFilter === 'low' && mat.inventoryQuantity <= mat.reorderLevel) ||
        (stockFilter === 'in-stock' && mat.inventoryQuantity > mat.reorderLevel) ||
        (stockFilter === 'out' && mat.inventoryQuantity === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [searchTerm, categoryFilter, stockFilter]);

  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const paginatedMaterials = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredMaterials.slice(startIndex, endIndex);
  }, [filteredMaterials, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
  };

  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const getVendorName = (vendorId?: string) => {
    if (!vendorId) return 'No Vendor';
    const vendor = mockVendors.find(v => v.id === vendorId);
    return vendor?.name || 'Unknown';
  };

  const getStockStatus = (mat: Material) => {
    if (mat.inventoryQuantity === 0) {
      return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    }
    if (mat.inventoryQuantity <= mat.reorderLevel) {
      return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    }
    return { text: 'In Stock', color: 'bg-mint-100 text-mint-800' };
  };

  const getMarginColor = (margin: number) => {
    if (margin < 0) return 'text-red-600';
    if (margin < 20) return 'text-yellow-600';
    if (margin < 50) return 'text-mint-600';
    return 'text-green-600';
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEdit = (material: Material) => {
    setEditingMaterial(material);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (materialData: Partial<Material>) => {
    console.log('Material saved:', materialData);
    alert(`Material "${materialData.name}" saved successfully!`);
    setEditingMaterial(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingMaterial(null);
  };

  const handleVendorSubmit = (vendorData: any) => {
    console.log('Vendor saved:', vendorData);
    alert(`Vendor "${vendorData.name}" added successfully!`);
  };

  const inventoryValue = calculateInventoryValue(filteredMaterials);
  const potentialRevenue = calculatePotentialRevenue(filteredMaterials);
  const averageMargin = calculateAverageMargin(filteredMaterials);

  return (
    <div className="p-6">
      <Header title="Materials Inventory" icon={Package} />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange(); }}
                className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); handleFilterChange(); }}
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
                onChange={(e) => { setStockFilter(e.target.value); handleFilterChange(); }}
                className="block w-full sm:w-40 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Stock Levels</option>
                <option value="in-stock">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Material
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Materials</p>
                <p className="text-lg font-semibold text-gray-900">{mockMaterials.length}</p>
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
                <p className="text-lg font-semibold text-gray-900">${inventoryValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Potential Revenue</p>
                <p className="text-lg font-semibold text-gray-900">${potentialRevenue.toFixed(2)}</p>
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
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg Margin</p>
                <p className="text-lg font-semibold text-gray-900">{averageMargin.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Material Name</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Qty</span>
              </div>
              <div className="w-28 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Package Cost</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Per</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price Per</span>
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

        <div className="space-y-0">
          {paginatedMaterials.map((material) => {
            const status = getStockStatus(material);
            const isExpanded = expandedId === material.id;

            return (
              <div key={material.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer"
                  onClick={() => toggleExpand(material.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{material.name}</h3>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm text-gray-700">{material.unitQuantity}</span>
                    </div>
                    <div className="w-28 text-center">
                      <span className="text-sm font-medium text-gray-900">${material.packageCost.toFixed(2)}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm text-gray-700">${material.costPerItem.toFixed(4)}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm font-medium text-gray-900">${material.pricePerItem.toFixed(2)}</span>
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
                            <dt className="text-xs text-gray-500">Category</dt>
                            <dd className="text-sm text-gray-900">{material.category}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Unit Quantity</dt>
                            <dd className="text-sm text-gray-900">{material.unitQuantity} items per package</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Total Items Available</dt>
                            <dd className="text-sm text-gray-900">{material.totalItemsAvailable} items</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Recipe Linkable</dt>
                            <dd className="text-sm text-gray-900">{material.canLinkToRecipe ? 'Yes' : 'No'}</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Pricing & Margins</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Package Cost</dt>
                            <dd className="text-sm text-gray-900">${material.packageCost.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Cost Per Item</dt>
                            <dd className="text-sm text-gray-900">${material.costPerItem.toFixed(4)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Price Per Item</dt>
                            <dd className="text-sm text-gray-900">${material.pricePerItem.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Profit Margin</dt>
                            <dd className={`text-sm font-semibold ${getMarginColor(material.profitMargin)}`}>
                              {material.profitMargin.toFixed(2)}%
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Last Price Update</dt>
                            <dd className="text-sm text-gray-900">
                              {material.lastPriceUpdate ? new Date(material.lastPriceUpdate).toLocaleDateString() : 'Never'}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Inventory & Vendor</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Packages in Stock</dt>
                            <dd className="text-sm text-gray-900">{material.inventoryQuantity}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Reorder Level</dt>
                            <dd className="text-sm text-gray-900">{material.reorderLevel} packages</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Total Inventory Cost</dt>
                            <dd className="text-sm text-gray-900">${(material.packageCost * material.inventoryQuantity).toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Potential Revenue</dt>
                            <dd className="text-sm text-gray-900">${(material.pricePerItem * material.totalItemsAvailable).toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Vendor</dt>
                            <dd className="text-sm text-gray-900">{getVendorName(material.vendorId)}</dd>
                          </div>
                        </dl>
                      </div>

                      {material.notes && (
                        <div className="md:col-span-2 lg:col-span-3">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Notes</h4>
                          <p className="text-sm text-gray-700">{material.notes}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(material);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        Edit Material
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-gray-500 text-lg">No materials found</div>
              <div className="text-gray-400 text-sm mt-2">
                {searchTerm || categoryFilter !== 'all' || stockFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by adding your first material'}
              </div>
            </div>
          )}
        </div>

        {filteredMaterials.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 rounded-b-lg border border-gray-200 mt-0">
            <div className="flex flex-1 justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, filteredMaterials.length)}
                  </span> of{' '}
                  <span className="font-medium">{filteredMaterials.length}</span> materials
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        page === currentPage
                          ? 'z-10 bg-coral-500 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      <MaterialForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        material={editingMaterial}
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
