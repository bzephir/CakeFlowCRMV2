import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { 
  ArrowLeft,
  Edit,
  Copy,
  Archive,
  Clock,
  Users,
  DollarSign,
  Package,
  ChefHat,
  AlertTriangle,
  CheckCircle2,
  Star,
  TrendingUp,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import type { Recipe } from '../types/recipe';

const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'preparation' | 'costing' | 'usage'>('overview');

  // Mock recipe data - in a real app, fetch based on ID
  const recipe: Recipe = {
    id: '1',
    name: 'Classic Vanilla Wedding Cake',
    description: 'Three-layer vanilla sponge with buttercream frosting, perfect for weddings and special occasions',
    category: 'Wedding Cakes',
    image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=600',
    status: 'active',
    yield: {
      quantity: 50,
      unit: 'servings',
      description: '3-tier cake (6", 8", 10")'
    },
    ingredients: [
      {
        id: '1',
        ingredientId: 'flour-001',
        name: 'All-Purpose Flour',
        quantity: 6,
        unit: 'cups',
        costPerUnit: 0.25,
        totalCost: 1.50,
        inStock: 50,
        isLowStock: false,
        isOutOfStock: false
      },
      {
        id: '2',
        ingredientId: 'sugar-001',
        name: 'Granulated Sugar',
        quantity: 4,
        unit: 'cups',
        costPerUnit: 0.30,
        totalCost: 1.20,
        inStock: 25,
        isLowStock: false,
        isOutOfStock: false
      },
      {
        id: '3',
        ingredientId: 'butter-001',
        name: 'Unsalted Butter',
        quantity: 2,
        unit: 'lbs',
        costPerUnit: 4.50,
        totalCost: 9.00,
        inStock: 10,
        isLowStock: true,
        isOutOfStock: false
      },
      {
        id: '4',
        ingredientId: 'eggs-001',
        name: 'Large Eggs',
        quantity: 12,
        unit: 'pieces',
        costPerUnit: 0.25,
        totalCost: 3.00,
        inStock: 48,
        isLowStock: false,
        isOutOfStock: false
      },
      {
        id: '5',
        ingredientId: 'vanilla-001',
        name: 'Pure Vanilla Extract',
        quantity: 3,
        unit: 'tbsp',
        costPerUnit: 0.50,
        totalCost: 1.50,
        inStock: 2,
        isLowStock: true,
        isOutOfStock: false
      }
    ],
    preparationSteps: [
      {
        id: '1',
        stepNumber: 1,
        instruction: 'Preheat oven to 350°F (175°C). Grease and flour three cake pans (6", 8", 10").',
        duration: 10,
        temperature: '350°F'
      },
      {
        id: '2',
        stepNumber: 2,
        instruction: 'In a large bowl, cream butter and sugar until light and fluffy, about 4-5 minutes.',
        duration: 5
      },
      {
        id: '3',
        stepNumber: 3,
        instruction: 'Add eggs one at a time, beating well after each addition. Mix in vanilla extract.',
        duration: 3
      },
      {
        id: '4',
        stepNumber: 4,
        instruction: 'In a separate bowl, whisk together flour, baking powder, and salt.',
        duration: 2
      },
      {
        id: '5',
        stepNumber: 5,
        instruction: 'Alternately add flour mixture and milk to butter mixture, beginning and ending with flour.',
        duration: 5
      },
      {
        id: '6',
        stepNumber: 6,
        instruction: 'Divide batter between prepared pans and bake according to size: 6" (25 min), 8" (30 min), 10" (35 min).',
        duration: 35,
        temperature: '350°F'
      },
      {
        id: '7',
        stepNumber: 7,
        instruction: 'Cool in pans for 10 minutes, then turn out onto wire racks to cool completely.',
        duration: 60
      },
      {
        id: '8',
        stepNumber: 8,
        instruction: 'Prepare buttercream frosting and assemble the tiered cake.',
        duration: 45
      }
    ],
    preparationTime: 180,
    packaging: [
      {
        id: '1',
        itemId: 'box-001',
        name: 'Cake Box (Large)',
        quantity: 1,
        unit: 'piece',
        costPerUnit: 2.50,
        totalCost: 2.50
      },
      {
        id: '2',
        itemId: 'ribbon-001',
        name: 'Decorative Ribbon',
        quantity: 2,
        unit: 'yards',
        costPerUnit: 1.25,
        totalCost: 2.50
      }
    ],
    sellingPrice: 450.00,
    totalCost: 21.20,
    costPerUnit: 0.42,
    marginPercentage: 95.3,
    profitPerUnit: 8.58,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    lastUsed: '2024-01-10',
    timesUsed: 15
  };

  // Mock usage history
  const usageHistory = [
    {
      id: '1',
      orderId: 'O-202501-0001',
      customerName: 'Sarah Johnson',
      eventDate: '2025-01-15',
      quantity: 1,
      revenue: 450.00,
      profit: 428.80,
      usedAt: '2025-01-10'
    },
    {
      id: '2',
      orderId: 'O-202412-0025',
      customerName: 'Michael & Lisa',
      eventDate: '2024-12-20',
      quantity: 1,
      revenue: 450.00,
      profit: 428.80,
      usedAt: '2024-12-15'
    },
    {
      id: '3',
      orderId: 'O-202412-0018',
      customerName: 'Corporate Event Co.',
      eventDate: '2024-12-10',
      quantity: 2,
      revenue: 900.00,
      profit: 857.60,
      usedAt: '2024-12-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-mint-100 text-mint-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (preparationTime: number) => {
    if (preparationTime <= 60) return 'bg-mint-100 text-mint-800';
    if (preparationTime <= 120) return 'bg-aqua-100 text-aqua-800';
    return 'bg-coral-100 text-coral-800';
  };

  const getDifficultyLabel = (preparationTime: number) => {
    if (preparationTime <= 60) return 'Easy';
    if (preparationTime <= 120) return 'Medium';
    return 'Hard';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleEdit = () => {
    navigate(`/recipes/${id}/edit`);
  };

  const handleDuplicate = () => {
    navigate('/recipes/new', { state: { duplicateFrom: recipe } });
  };

  const handleArchive = () => {
    console.log('Archive recipe:', id);
    alert('Recipe archived successfully!');
  };

  const handleUseInOrder = () => {
    navigate('/orders/new', { state: { selectedRecipe: recipe } });
  };

  const totalRevenue = usageHistory.reduce((sum, usage) => sum + usage.revenue, 0);
  const totalProfit = usageHistory.reduce((sum, usage) => sum + usage.profit, 0);
  const ingredientsCost = recipe.ingredients.reduce((sum, ing) => sum + ing.totalCost, 0);
  const packagingCost = (recipe.packaging || []).reduce((sum, pkg) => sum + pkg.totalCost, 0);

  return (
    <div className="flex-1 overflow-hidden">
      <Header 
        title={recipe.name} 
        subtitle={`${recipe.category} • ${recipe.yield.quantity} ${recipe.yield.unit}`} 
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

        {/* Recipe Header */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-semibold text-gray-900">{recipe.name}</h1>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(recipe.status)}`}>
                      {recipe.status}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(recipe.preparationTime)}`}>
                      {getDifficultyLabel(recipe.preparationTime)}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{recipe.description}</p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <div>
                        <div className="font-medium">{recipe.yield.quantity} {recipe.yield.unit}</div>
                        <div className="text-xs text-gray-500">{recipe.yield.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      <div>
                        <div className="font-medium">{recipe.preparationTime} min</div>
                        <div className="text-xs text-gray-500">Prep time</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 mr-2 text-yellow-400 fill-current" />
                      <div>
                        <div className="font-medium">{recipe.timesUsed} times</div>
                        <div className="text-xs text-gray-500">Used</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <div>
                        <div className="font-medium">{formatDate(recipe.lastUsed || recipe.createdAt)}</div>
                        <div className="text-xs text-gray-500">Last used</div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{formatCurrency(recipe.totalCost)}</div>
                        <div className="text-xs text-gray-500">Total Cost</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-coral-600">{formatCurrency(recipe.sellingPrice)}</div>
                        <div className="text-xs text-gray-500">Selling Price</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-mint-600">{recipe.marginPercentage.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500">Margin</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-aqua-600">{formatCurrency(recipe.profitPerUnit * recipe.yield.quantity)}</div>
                        <div className="text-xs text-gray-500">Profit</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 ml-4">
                  <button 
                    onClick={handleUseInOrder}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Use in Order
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Recipe
                  </button>
                  <div className="relative">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <MoreHorizontal className="h-4 w-4 mr-2" />
                      More
                    </button>
                    {/* Dropdown menu would go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: ChefHat },
                { id: 'ingredients', name: 'Ingredients', icon: Package, count: recipe.ingredients.length },
                { id: 'preparation', name: 'Preparation', icon: Clock, count: recipe.preparationSteps.length },
                { id: 'costing', name: 'Cost Analysis', icon: DollarSign },
                { id: 'usage', name: 'Usage History', icon: TrendingUp, count: usageHistory.length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-coral-500 text-coral-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                  {tab.count !== undefined && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recipe Information */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipe Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{recipe.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Yield</label>
                    <p className="text-sm text-gray-900">
                      {recipe.yield.quantity} {recipe.yield.unit}
                      {recipe.yield.description && (
                        <span className="text-gray-500"> ({recipe.yield.description})</span>
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
                    <p className="text-sm text-gray-900">{recipe.preparationTime} minutes</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created</label>
                    <p className="text-sm text-gray-900">
                      {formatDate(recipe.createdAt)} by {recipe.createdBy}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                    <p className="text-sm text-gray-900">{formatDate(recipe.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Status */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Status</h3>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{ingredient.name}</p>
                        <p className="text-xs text-gray-500">
                          Need: {ingredient.quantity} {ingredient.unit}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {ingredient.inStock} {ingredient.unit}
                        </span>
                        {ingredient.isOutOfStock ? (
                          <div className="flex items-center text-red-600">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            <span className="text-xs">Out of Stock</span>
                          </div>
                        ) : ingredient.isLowStock ? (
                          <div className="flex items-center text-yellow-600">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            <span className="text-xs">Low Stock</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-mint-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">Available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ingredients' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingredient
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cost/Unit
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Cost
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recipe.ingredients.map((ingredient) => (
                      <tr key={ingredient.id}>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900">
                          {ingredient.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">
                          {ingredient.quantity}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">
                          {ingredient.unit}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-right">
                          {formatCurrency(ingredient.costPerUnit)}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(ingredient.totalCost)}
                        </td>
                        <td className="px-3 py-4 text-center">
                          {ingredient.isOutOfStock ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Out of Stock
                            </span>
                          ) : ingredient.isLowStock ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-mint-100 text-mint-800">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Available
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={4} className="px-3 py-3 text-sm font-medium text-gray-900 text-right">
                        Total Ingredients Cost:
                      </td>
                      <td className="px-3 py-3 text-sm font-semibold text-gray-900 text-right">
                        {formatCurrency(ingredientsCost)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preparation' && (
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparation Steps</h3>
              <div className="space-y-4">
                {recipe.preparationSteps.map((step) => (
                  <div key={step.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-coral-100 text-coral-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {step.stepNumber}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-2">{step.instruction}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          {step.duration && (
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.duration} minutes
                            </div>
                          )}
                          {step.temperature && (
                            <div className="flex items-center">
                              <span className="mr-1">🌡️</span>
                              {step.temperature}
                            </div>
                          )}
                        </div>
                        {step.notes && (
                          <p className="text-xs text-gray-600 mt-2 italic">{step.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'costing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Breakdown */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Ingredients</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(ingredientsCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Packaging & Materials</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(packagingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-base font-medium text-gray-900">Total Cost</span>
                    <span className="text-base font-semibold text-gray-900">
                      {formatCurrency(recipe.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Cost per {recipe.yield.unit.slice(0, -1)}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(recipe.costPerUnit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profitability Analysis */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profitability Analysis</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Selling Price</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(recipe.sellingPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Total Cost</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(recipe.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-base font-medium text-gray-900">Gross Profit</span>
                    <span className="text-base font-semibold text-mint-600">
                      {formatCurrency(recipe.sellingPrice - recipe.totalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Profit Margin</span>
                    <span className={`text-sm font-medium ${
                      recipe.marginPercentage >= 50 ? 'text-mint-600' : 
                      recipe.marginPercentage >= 30 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {recipe.marginPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Profit per {recipe.yield.unit.slice(0, -1)}</span>
                    <span className="text-sm font-medium text-mint-600">
                      {formatCurrency(recipe.profitPerUnit)}
                    </span>
                  </div>
                </div>

                {/* Margin Health Indicator */}
                <div className="mt-6 p-4 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Margin Health</span>
                    <span className={`text-sm font-medium ${
                      recipe.marginPercentage >= 50 ? 'text-mint-600' : 
                      recipe.marginPercentage >= 30 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {recipe.marginPercentage >= 50 ? 'Excellent' : 
                       recipe.marginPercentage >= 30 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        recipe.marginPercentage >= 50 ? 'bg-mint-500' : 
                        recipe.marginPercentage >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(recipe.marginPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-6">
            {/* Usage Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-coral-400 to-coral-500 rounded-full flex items-center justify-center">
                      <Package className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Times Used</p>
                    <p className="text-lg font-semibold text-gray-900">{recipe.timesUsed}</p>
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
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-500">Last Used</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatDate(recipe.lastUsed || recipe.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage History Table */}
            <div className="bg-white shadow-sm rounded-lg border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage History</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event Date
                        </th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Profit
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Used Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {usageHistory.map((usage) => (
                        <tr key={usage.id} className="hover:bg-gray-50">
                          <td className="px-3 py-4 text-sm font-medium text-coral-600 hover:text-coral-700 cursor-pointer">
                            {usage.orderId}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900">
                            {usage.customerName}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900 text-center">
                            {usage.quantity}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900">
                            {formatDate(usage.eventDate)}
                          </td>
                          <td className="px-3 py-4 text-sm font-medium text-gray-900 text-right">
                            {formatCurrency(usage.revenue)}
                          </td>
                          <td className="px-3 py-4 text-sm font-medium text-mint-600 text-right">
                            {formatCurrency(usage.profit)}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900">
                            {formatDate(usage.usedAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;