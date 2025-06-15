import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Filter,
  Download,
  Eye,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { RecipeMarginReport } from '../types/recipe';

const RecipeMarginReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<'name' | 'margin' | 'profit' | 'revenue' | 'timesUsed'>('margin');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [marginFilter, setMarginFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock report data
  const reportData: RecipeMarginReport[] = [
    {
      recipeId: '1',
      name: 'Classic Vanilla Wedding Cake',
      category: 'Wedding Cakes',
      totalCost: 21.20,
      sellingPrice: 450.00,
      marginPercentage: 95.3,
      profitPerUnit: 8.58,
      timesUsed: 15,
      totalRevenue: 6750.00,
      totalProfit: 6428.80
    },
    {
      recipeId: '2',
      name: 'Chocolate Fudge Birthday Cake',
      category: 'Birthday Cakes',
      totalCost: 7.60,
      sellingPrice: 85.00,
      marginPercentage: 91.1,
      profitPerUnit: 6.45,
      timesUsed: 8,
      totalRevenue: 680.00,
      totalProfit: 619.20
    },
    {
      recipeId: '3',
      name: 'Red Velvet Layer Cake',
      category: 'Specialty Cakes',
      totalCost: 12.50,
      sellingPrice: 120.00,
      marginPercentage: 89.6,
      profitPerUnit: 6.72,
      timesUsed: 5,
      totalRevenue: 600.00,
      totalProfit: 537.50
    },
    {
      recipeId: '4',
      name: 'Lemon Drizzle Cupcakes',
      category: 'Cupcakes',
      totalCost: 6.50,
      sellingPrice: 48.00,
      marginPercentage: 86.5,
      profitPerUnit: 1.73,
      timesUsed: 12,
      totalRevenue: 576.00,
      totalProfit: 498.00
    },
    {
      recipeId: '5',
      name: 'Tiramisu Layer Cake',
      category: 'Specialty Cakes',
      totalCost: 22.00,
      sellingPrice: 150.00,
      marginPercentage: 85.3,
      profitPerUnit: 6.40,
      timesUsed: 0,
      totalRevenue: 0.00,
      totalProfit: 0.00
    },
    {
      recipeId: '6',
      name: 'Basic Vanilla Cupcakes',
      category: 'Cupcakes',
      totalCost: 8.00,
      sellingPrice: 24.00,
      marginPercentage: 66.7,
      profitPerUnit: 0.67,
      timesUsed: 25,
      totalRevenue: 600.00,
      totalProfit: 400.00
    },
    {
      recipeId: '7',
      name: 'Simple Sheet Cake',
      category: 'Birthday Cakes',
      totalCost: 15.00,
      sellingPrice: 45.00,
      marginPercentage: 66.7,
      profitPerUnit: 2.00,
      timesUsed: 18,
      totalRevenue: 810.00,
      totalProfit: 540.00
    },
    {
      recipeId: '8',
      name: 'Chocolate Chip Cookies',
      category: 'Cookies',
      totalCost: 12.00,
      sellingPrice: 30.00,
      marginPercentage: 60.0,
      profitPerUnit: 0.75,
      timesUsed: 30,
      totalRevenue: 900.00,
      totalProfit: 540.00
    }
  ];

  const categories = [...new Set(reportData.map(item => item.category))];

  const getMarginColor = (margin: number) => {
    if (margin >= 80) return 'text-mint-600';
    if (margin >= 60) return 'text-aqua-600';
    if (margin >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMarginBadgeColor = (margin: number) => {
    if (margin >= 80) return 'bg-mint-100 text-mint-800';
    if (margin >= 60) return 'bg-aqua-100 text-aqua-800';
    if (margin >= 40) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredData = reportData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesMargin = marginFilter === 'all' || 
                         (marginFilter === 'high' && item.marginPercentage >= 80) ||
                         (marginFilter === 'medium' && item.marginPercentage >= 60 && item.marginPercentage < 80) ||
                         (marginFilter === 'low' && item.marginPercentage < 60);
    
    return matchesSearch && matchesCategory && matchesMargin;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    let aValue: number;
    let bValue: number;

    switch (sortBy) {
      case 'name':
        return sortOrder === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'margin':
        aValue = a.marginPercentage;
        bValue = b.marginPercentage;
        break;
      case 'profit':
        aValue = a.totalProfit;
        bValue = b.totalProfit;
        break;
      case 'revenue':
        aValue = a.totalRevenue;
        bValue = b.totalRevenue;
        break;
      case 'timesUsed':
        aValue = a.timesUsed;
        bValue = b.timesUsed;
        break;
      default:
        aValue = a.marginPercentage;
        bValue = b.marginPercentage;
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const totalRevenue = reportData.reduce((sum, item) => sum + item.totalRevenue, 0);
  const totalProfit = reportData.reduce((sum, item) => sum + item.totalProfit, 0);
  const averageMargin = reportData.reduce((sum, item) => sum + item.marginPercentage, 0) / reportData.length;
  const highMarginRecipes = reportData.filter(item => item.marginPercentage >= 80).length;

  const handleViewRecipe = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  const handleExportReport = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert('Report exported successfully!');
  };

  const SortButton: React.FC<{ field: typeof sortBy; children: React.ReactNode }> = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
    >
      <span>{children}</span>
      {sortBy === field && (
        sortOrder === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
      )}
    </button>
  );

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title="Recipe Margin Report" 
        subtitle="Analyze profitability and performance across all recipes" 
      />
      
      <div className="p-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/recipes')}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Recipes
        </button>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-mint-400 to-mint-500 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalRevenue)}</p>
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
                <p className="text-sm font-medium text-gray-500">Total Profit</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalProfit)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                  <Package className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg Margin</p>
                <p className="text-lg font-semibold text-gray-900">{averageMargin.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">High Margin</p>
                <p className="text-lg font-semibold text-gray-900">{highMarginRecipes} recipes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
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
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={marginFilter}
                onChange={(e) => setMarginFilter(e.target.value)}
                className="block w-full sm:w-40 pr-8 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
              >
                <option value="all">All Margins</option>
                <option value="high">High (80%+)</option>
                <option value="medium">Medium (60-79%)</option>
                <option value="low">Low (&lt;60%)</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={handleExportReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Report Table */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left">
                    <SortButton field="name">Recipe Name</SortButton>
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-3 py-3 text-right">
                    <SortButton field="margin">Margin %</SortButton>
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-3 py-3 text-right">
                    <SortButton field="profit">Total Profit</SortButton>
                  </th>
                  <th className="px-3 py-3 text-right">
                    <SortButton field="revenue">Total Revenue</SortButton>
                  </th>
                  <th className="px-3 py-3 text-center">
                    <SortButton field="timesUsed">Times Used</SortButton>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedData.map((item) => (
                  <tr key={item.recipeId} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </td>
                    <td className="px-3 py-4">
                      <div className="text-sm text-gray-600">{item.category}</div>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMarginBadgeColor(item.marginPercentage)}`}>
                        {item.marginPercentage >= 80 && <TrendingUp className="h-3 w-3 mr-1" />}
                        {item.marginPercentage < 60 && <TrendingDown className="h-3 w-3 mr-1" />}
                        {item.marginPercentage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 text-right">
                      {formatCurrency(item.totalCost)}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 text-right">
                      {formatCurrency(item.sellingPrice)}
                    </td>
                    <td className="px-3 py-4 text-sm font-medium text-right">
                      <span className={getMarginColor(item.marginPercentage)}>
                        {formatCurrency(item.totalProfit)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 text-right">
                      {formatCurrency(item.totalRevenue)}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.timesUsed}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button 
                        onClick={() => handleViewRecipe(item.recipeId)}
                        className="text-coral-600 hover:text-coral-900 transition-colors"
                        title="View Recipe"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sortedData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No recipes found</div>
            <div className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}

        {/* Report Summary */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-900">Recipes Analyzed:</span>
              <span className="ml-2 text-gray-600">{sortedData.length} of {reportData.length}</span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Average Margin:</span>
              <span className={`ml-2 font-medium ${getMarginColor(
                sortedData.reduce((sum, item) => sum + item.marginPercentage, 0) / sortedData.length || 0
              )}`}>
                {sortedData.length > 0 
                  ? (sortedData.reduce((sum, item) => sum + item.marginPercentage, 0) / sortedData.length).toFixed(1)
                  : '0.0'
                }%
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-900">Total Profit:</span>
              <span className="ml-2 text-mint-600 font-medium">
                {formatCurrency(sortedData.reduce((sum, item) => sum + item.totalProfit, 0))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeMarginReportPage;