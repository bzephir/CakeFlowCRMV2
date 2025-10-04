import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RecipeForm from '../components/RecipeForm';
import {
  Plus,
  Search,
  Filter,
  ChefHat,
  TrendingUp,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  CreditCard as Edit,
  Eye,
  Copy
} from 'lucide-react';
import { mockRecipes, getRecipeCategories, calculateAverageMargin } from '../data/mockRecipes';
import type { Recipe } from '../types/recipe';

const Recipes: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const categories = getRecipeCategories();

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || recipe.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  const sortedRecipes = useMemo(() => {
    return [...filteredRecipes].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'margin':
          return b.marginPercentage - a.marginPercentage;
        case 'cost':
          return a.totalCost - b.totalCost;
        case 'price':
          return b.sellingPrice - a.sellingPrice;
        case 'popularity':
          return b.timesUsed - a.timesUsed;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [filteredRecipes, sortBy]);

  const totalPages = Math.ceil(sortedRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecipes = sortedRecipes.slice(startIndex, endIndex);

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
      case 'active': return 'bg-mint-100 text-mint-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMarginColor = (margin: number) => {
    if (margin < 0) return 'text-red-600';
    if (margin < 10) return 'text-yellow-600';
    if (margin < 50) return 'text-mint-600';
    return 'text-green-600';
  };

  const getCategoryDisplay = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleViewRecipe = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  const handleDuplicateRecipe = (recipe: Recipe) => {
    const duplicatedRecipe = {
      ...recipe,
      id: `${recipe.id}-copy`,
      name: `${recipe.name} (Copy)`,
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timesUsed: 0
    };
    setEditingRecipe(duplicatedRecipe);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (recipeData: any) => {
    console.log('Recipe saved:', recipeData);
    alert(`Recipe "${recipeData.name}" saved successfully!`);
    setEditingRecipe(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingRecipe(null);
  };

  const averageMargin = calculateAverageMargin();
  const lowMarginRecipes = mockRecipes.filter(r => r.marginPercentage < 10).length;
  const mostPopularRecipe = [...mockRecipes].sort((a, b) => b.timesUsed - a.timesUsed)[0];

  return (
    <div className="p-6">
      <Header title="Recipes" icon={ChefHat} />

      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search recipes..."
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
                  <option key={category} value={category}>{getCategoryDisplay(category)}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full sm:w-40 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="margin">Sort by Margin</option>
                <option value="cost">Sort by Cost</option>
                <option value="price">Sort by Price</option>
                <option value="popularity">Sort by Popularity</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/recipes/margin-report')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Margin Report
            </button>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Recipe
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <ChefHat className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Recipes</p>
                <p className="text-lg font-semibold text-gray-900">{mockRecipes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg Margin</p>
                <p className="text-lg font-semibold text-gray-900">
                  {averageMargin.toFixed(1)}%
                </p>
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
                <p className="text-sm font-medium text-gray-500">Low Margin</p>
                <p className="text-lg font-semibold text-gray-900">
                  {lowMarginRecipes}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <ChefHat className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Most Popular</p>
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {mostPopularRecipe?.name.split(' ')[0] || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Recipe Name</span>
              </div>
              <div className="w-32 text-left">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</span>
              </div>
              <div className="w-24 text-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</span>
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
          {paginatedRecipes.map((recipe) => {
            const isExpanded = expandedId === recipe.id;

            return (
              <div key={recipe.id} className="bg-white border-l border-r border-b border-gray-200 shadow-sm overflow-hidden hover:bg-gray-50 transition-colors">
                <div
                  className="flex items-center justify-between px-4 py-2 cursor-pointer"
                  onClick={() => toggleExpand(recipe.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{recipe.name}</h3>
                    </div>
                    <div className="w-32 text-left">
                      <span className="text-sm text-gray-700">{getCategoryDisplay(recipe.category)}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm text-gray-700">{recipe.yield.quantity} {recipe.yield.unit}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm font-medium text-gray-900">${recipe.totalCost.toFixed(2)}</span>
                    </div>
                    <div className="w-24 text-center">
                      <span className={`text-sm font-semibold ${getMarginColor(recipe.marginPercentage)}`}>
                        {recipe.marginPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-24 text-center">
                      <span className="text-sm font-medium text-gray-900">${recipe.sellingPrice.toFixed(2)}</span>
                    </div>
                    <div className="w-28 flex justify-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(recipe.status)}`}>
                        {recipe.status}
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
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Recipe Details</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Description</dt>
                            <dd className="text-sm text-gray-900">{recipe.description}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Yield</dt>
                            <dd className="text-sm text-gray-900">
                              {recipe.yield.quantity} {recipe.yield.unit}
                              {recipe.yield.description && ` (${recipe.yield.description})`}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Preparation Time</dt>
                            <dd className="text-sm text-gray-900">{recipe.preparationTime} minutes</dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Financial Summary</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Total Cost</dt>
                            <dd className="text-sm text-gray-900">${recipe.totalCost.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Cost Per Unit</dt>
                            <dd className="text-sm text-gray-900">${recipe.costPerUnit.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Selling Price</dt>
                            <dd className="text-sm text-gray-900">${recipe.sellingPrice.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Profit Per Unit</dt>
                            <dd className="text-sm text-gray-900">${recipe.profitPerUnit.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Profit Margin</dt>
                            <dd className={`text-sm font-semibold ${getMarginColor(recipe.marginPercentage)}`}>
                              {recipe.marginPercentage.toFixed(1)}%
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Usage & History</h4>
                        <dl className="space-y-1.5">
                          <div>
                            <dt className="text-xs text-gray-500">Times Used</dt>
                            <dd className="text-sm text-gray-900">{recipe.timesUsed}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Created</dt>
                            <dd className="text-sm text-gray-900">{new Date(recipe.createdAt).toLocaleDateString()}</dd>
                          </div>
                          <div>
                            <dt className="text-xs text-gray-500">Last Updated</dt>
                            <dd className="text-sm text-gray-900">{new Date(recipe.updatedAt).toLocaleDateString()}</dd>
                          </div>
                          {recipe.lastUsed && (
                            <div>
                              <dt className="text-xs text-gray-500">Last Used</dt>
                              <dd className="text-sm text-gray-900">{new Date(recipe.lastUsed).toLocaleDateString()}</dd>
                            </div>
                          )}
                          <div>
                            <dt className="text-xs text-gray-500">Created By</dt>
                            <dd className="text-sm text-gray-900">{recipe.createdBy}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewRecipe(recipe.id);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-1.5" />
                        View Full Recipe
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRecipe(recipe);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Edit className="h-4 w-4 mr-1.5" />
                        Edit Recipe
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateRecipe(recipe);
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <Copy className="h-4 w-4 mr-1.5" />
                        Duplicate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="text-gray-500 text-lg">No recipes found</div>
              <div className="text-gray-400 text-sm mt-2">
                {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by adding your first recipe'}
              </div>
            </div>
          )}
        </div>

        {filteredRecipes.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredRecipes.length)} of {filteredRecipes.length} recipes
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

      <RecipeForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        recipe={editingRecipe}
      />
    </div>
  );
};

export default Recipes;
