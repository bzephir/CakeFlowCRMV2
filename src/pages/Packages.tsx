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
        action={{
          label: 'New Package',
          onClick: handleAddPackage,
          icon: Plus
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Packages</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.totalPackages}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <PackageIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Packages</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{summary.activePackages}</p>
            </div>
            <div className="w-12 h-12 bg-mint-100 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-mint-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Margin</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {summary.averageMargin.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Most Popular</p>
              <p className="text-sm font-semibold text-gray-900 mt-1 truncate">
                {summary.mostPopularPackage?.name || 'N/A'}
              </p>
              <p className="text-xs text-gray-500">
                {summary.mostPopularPackage?.timesOrdered || 0} orders
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

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

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search packages..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value as PackageCategory | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryDisplay(category)}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="cost">Cost</option>
              <option value="price">Price</option>
              <option value="margin">Margin</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Margin
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedPackages.map(pkg => (
                <React.Fragment key={pkg.id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleExpand(pkg.id)}
                          className="mr-2 text-gray-400 hover:text-gray-600"
                        >
                          {expandedId === pkg.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{pkg.name}</p>
                          {pkg.isTemplate && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                              Template
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{getCategoryDisplay(pkg.category)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(pkg.status)}`}>
                        {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-gray-900">${pkg.totalCost.toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-medium text-gray-900">
                        {pkg.sellingPrice ? `$${pkg.sellingPrice.toFixed(2)}` : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className={`text-sm font-semibold ${getMarginColor(pkg.profitMargin)}`}>
                        {pkg.profitMargin ? `${pkg.profitMargin.toFixed(1)}%` : '-'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm text-gray-600">{pkg.timesOrdered}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewPackage(pkg)}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(pkg)}
                          className="text-gray-400 hover:text-mint-600 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="text-gray-400 hover:text-yellow-600 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === pkg.id && (
                    <tr>
                      <td colSpan={8} className="px-4 py-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                            <p className="text-sm text-gray-600">{pkg.description || 'No description'}</p>

                            <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
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
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">
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
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {sortedPackages.length === 0 && (
          <div className="text-center py-12">
            <PackageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No packages found</p>
            <button
              onClick={handleAddPackage}
              className="mt-4 inline-flex items-center px-4 py-2 bg-mint-500 text-white rounded-lg hover:bg-mint-600 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Package
            </button>
          </div>
        )}

        {sortedPackages.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1} to {Math.min(endIndex, sortedPackages.length)} of{' '}
                {sortedPackages.length} packages
              </span>
              <select
                value={itemsPerPage}
                onChange={e => handleItemsPerPageChange(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-mint-500 focus:border-transparent"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  page =>
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                )
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-3 py-1">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 border rounded-lg text-sm ${
                        currentPage === page
                          ? 'bg-mint-500 text-white border-mint-500'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
