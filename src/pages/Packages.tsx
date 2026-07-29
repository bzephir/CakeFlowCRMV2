import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Plus, Search, Filter, Package as PackageIcon, DollarSign, TrendingUp, AlertTriangle, ChevronDown, ChevronUp, Eye, Copy, CreditCard as Edit, Trash2, Tag } from 'lucide-react';
import {
  mockPackages,
  getPackageCategories,
  getPackageSummary,
  getLowMarginPackages
} from '../data/mockPackages';
import type { Package, PackageCategory } from '../types/package';

const Packages: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<PackageCategory | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const categories = getPackageCategories();
  const summary = getPackageSummary();
  const lowMarginPackages = getLowMarginPackages();

  const filteredPackages = useMemo(() => {
    return mockPackages.filter(pkg => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || pkg.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || pkg.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const sortedPackages = useMemo(() => {
    return [...filteredPackages].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'cost':
          return a.totalCost - b.totalCost;
        case 'price':
          return (a.sellingPrice || 0) - (b.sellingPrice || 0);
        case 'margin':
          return (b.profitMargin || 0) - (a.profitMargin || 0);
        case 'popularity':
          return b.timesOrdered - a.timesOrdered;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [filteredPackages, sortBy]);

  const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPackages = sortedPackages.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedId(null);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setExpandedId(null);
  };

  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-mint-100 text-mint-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryDisplay = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getMarginColor = (margin: number | undefined) => {
    if (!margin) return 'text-gray-600';
    if (margin < 100) return 'text-red-600';
    if (margin < 150) return 'text-yellow-600';
    if (margin < 200) return 'text-mint-600';
    return 'text-green-600';
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleViewPackage = (pkg: Package) => {
    navigate(`/packages/${pkg.id}`);
  };

  const handleDuplicate = (pkg: Package) => {
    alert(`Duplicate package: ${pkg.name}`);
  };

  const handleEdit = (pkg: Package) => {
    alert(`Edit package: ${pkg.name}`);
  };

  const handleDelete = (pkg: Package) => {
    if (confirm(`Are you sure you want to delete "${pkg.name}"?`)) {
      alert(`Delete package: ${pkg.name}`);
    }
  };

  const handleAddPackage = () => {
    alert('Add Package form would open here');
  };

  return (
    <div className="p-6">
      <Header
        title="Packages"
        icon={PackageIcon}
      />

      <div className="p-6">
        {lowMarginPackages.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-800">Low Margin Alert</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  {lowMarginPackages.length} package(s) have profit margins below 150%. Consider
                  adjusting pricing.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lowMarginPackages.slice(0, 3).map(pkg => (
                    <span
                      key={pkg.id}
                      className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                    >
                      {pkg.name} ({pkg.profitMargin?.toFixed(1)}%)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value as PackageCategory | 'all')}
              className="block w-full sm:w-48 pl-10 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryDisplay(category)}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="block w-full sm:w-32 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="block w-full sm:w-40 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="cost">Sort by Cost</option>
              <option value="price">Sort by Price</option>
              <option value="margin">Sort by Margin</option>
              <option value="popularity">Sort by Popularity</option>
            </select>
          </div>
        </div>

          <div className="flex space-x-3">
            <button
              onClick={handleAddPackage}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Package
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <PackageIcon className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Packages</p>
                <p className="text-lg font-semibold text-gray-900">{summary.totalPackages}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <Tag className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Active Packages</p>
                <p className="text-lg font-semibold text-gray-900">{summary.activePackages}</p>
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
                <p className="text-sm font-medium text-gray-500">Avg. Margin</p>
                <p className="text-lg font-semibold text-gray-900">{summary.averageMargin.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Most Popular</p>
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {summary.mostPopularPackage?.name.split(' ')[0] || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Package Name</span>
            </div>
            <div className="w-32 text-left">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</span>
            </div>
            <div className="w-24 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</span>
            </div>
            <div className="w-24 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</span>
            </div>
            <div className="w-24 text-center">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</span>
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
        {paginatedPackages.map(pkg => {
          const isExpanded = expandedId === pkg.id;

          return (
            <div key={pkg.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
              <div
                className="flex items-center justify-between px-4 py-2 cursor-pointer"
                onClick={() => toggleExpand(pkg.id)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{pkg.name}</h3>
                  </div>
                  <div className="w-32 text-left">
                    <span className="text-sm text-gray-700">{getCategoryDisplay(pkg.category)}</span>
                  </div>
                  <div className="w-24 text-center">
                    <span className="text-sm font-medium text-gray-900">${pkg.totalCost.toFixed(2)}</span>
                  </div>
                  <div className="w-24 text-center">
                    <span className="text-sm font-medium text-gray-900">
                      {pkg.sellingPrice ? `$${pkg.sellingPrice.toFixed(2)}` : '-'}
                    </span>
                  </div>
                  <div className="w-24 text-center">
                    <span className={`text-sm font-semibold ${getMarginColor(pkg.profitMargin)}`}>
                      {pkg.profitMargin ? `${pkg.profitMargin.toFixed(1)}%` : '-'}
                    </span>
                  </div>
                  <div className="w-28 flex justify-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                      {pkg.status}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{pkg.description || 'No description'}</p>

                      <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">
                        Recipes ({pkg.recipes.length})
                      </h4>
                      <div className="space-y-1">
                        {pkg.recipes.map(recipe => (
                          <div key={recipe.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              {recipe.recipeName} ({recipe.quantityMultiplier}x)
                            </span>
                            <span className="text-gray-600">${recipe.costContribution.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Materials ({pkg.materials.length})
                      </h4>
                      <div className="space-y-1">
                        {pkg.materials.map(material => (
                          <div key={material.id} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              {material.materialName} (x{material.quantity})
                            </span>
                            <span className="text-gray-600">${material.totalCost.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-700">Total Cost:</span>
                          <span className="font-semibold text-gray-900">${pkg.totalCost.toFixed(2)}</span>
                        </div>
                        {pkg.sellingPrice && (
                          <>
                            <div className="flex justify-between text-sm mt-2">
                              <span className="font-semibold text-gray-700">Selling Price:</span>
                              <span className="font-semibold text-gray-900">${pkg.sellingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                              <span className="font-semibold text-gray-700">Profit:</span>
                              <span className="font-semibold text-green-600">
                                ${(pkg.sellingPrice - pkg.totalCost).toFixed(2)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewPackage(pkg);
                      }}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1.5" />
                      View Details
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(pkg);
                      }}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="h-4 w-4 mr-1.5" />
                      Edit Package
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicate(pkg);
                      }}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Copy className="h-4 w-4 mr-1.5" />
                      Duplicate
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(pkg);
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

        {filteredPackages.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <PackageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">No packages found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first package'}
            </div>
          </div>
        )}
      </div>

      {filteredPackages.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredPackages.length)} of {filteredPackages.length} packages
              </span>
              <div className="flex items-center space-x-2">
                <label htmlFor="itemsPerPage" className="text-sm text-gray-700">
                  Show:
                </label>
                <select
                  id="itemsPerPage"
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="block w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? 'bg-coral-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Packages;
