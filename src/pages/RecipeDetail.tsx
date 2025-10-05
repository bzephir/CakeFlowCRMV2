import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ArrowLeft, CreditCard as Edit, Clock, DollarSign, Package, ChefHat, AlertTriangle, CheckCircle2, Printer } from 'lucide-react';
import type { Recipe } from '../types/recipe';

const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'preparation' | 'costing'>('overview');

  // Mock recipe data - in a real app, fetch based on ID
  const recipe: Recipe = {
    id: '1',
    name: 'Classic Vanilla Cake',
    category: 'Cake',
    image: 'https://www.pexels.com/photo/baker-putting-icing-on-a-cake-8477755/',
    description: 'A timeless classic featuring moist, fluffy layers of vanilla cake. Perfect for weddings, birthdays, and special celebrations. This recipe produces a tender crumb with a delicate vanilla flavor that pairs beautifully with buttercream frosting.',
    status: 'active',
    yield: {
      quantity: 25,
      unit: 'servings',
      description: 'vanilla cake'
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
    preparationTime: 35,
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
    updatedBy: 'Sarah Mitchell',
    lastUsed: '2024-01-10',
    timesUsed: 15,
    laborRate: 25.00
  };


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

  const ingredientsCost = recipe.ingredients.reduce((sum, ing) => sum + ing.totalCost, 0);
  const laborCost = (recipe.preparationTime / 60) * (recipe.laborRate || 25.00);
  const totalCostWithLabor = ingredientsCost + laborCost;

  return (
    <div className="flex-1 overflow-hidden">
      <Header title={recipe.name} />
      
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
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-semibold text-gray-900">{recipe.name}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(recipe.preparationTime)}`}>
                {getDifficultyLabel(recipe.preparationTime)}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(recipe.status)}`}>
                {recipe.status}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Recipe
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Tabs with seamless content integration */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', name: 'Overview', icon: ChefHat },
                { id: 'ingredients', name: 'Ingredients', icon: Package, count: recipe.ingredients.length },
                { id: 'preparation', name: 'Preparation', icon: Clock, count: recipe.preparationSteps.length },
                { id: 'costing', name: 'Cost Analysis', icon: DollarSign }
              ].map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-4 font-medium text-sm transition-all relative ${
                    activeTab === tab.id
                      ? 'text-coral-600 bg-gradient-to-b from-coral-50 to-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  } ${index === 0 ? 'rounded-tl-lg' : ''}`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                  {tab.count !== undefined && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${
                      activeTab === tab.id
                        ? 'bg-coral-100 text-coral-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral-500"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content - Overview */}
          {activeTab === 'overview' && (
            <div className="p-6">
              {/* Key Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-coral-50 to-coral-100 rounded-lg p-4 border border-coral-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-coral-600 uppercase tracking-wide">Total Cost</p>
                      <p className="text-2xl font-bold text-coral-900 mt-1">{formatCurrency(recipe.totalCost)}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-coral-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-mint-50 to-mint-100 rounded-lg p-4 border border-mint-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-mint-600 uppercase tracking-wide">Yield</p>
                      <p className="text-2xl font-bold text-mint-900 mt-1">{recipe.yield.quantity} <span className="text-sm font-normal">{recipe.yield.unit}</span></p>
                    </div>
                    <Package className="h-8 w-8 text-mint-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-aqua-50 to-aqua-100 rounded-lg p-4 border border-aqua-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-aqua-600 uppercase tracking-wide">Prep Time</p>
                      <p className="text-2xl font-bold text-aqua-900 mt-1">{recipe.preparationTime} <span className="text-sm font-normal">min</span></p>
                    </div>
                    <Clock className="h-8 w-8 text-aqua-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-pink-600 uppercase tracking-wide">Per Serving</p>
                      <p className="text-2xl font-bold text-pink-900 mt-1">{formatCurrency(recipe.costPerUnit)}</p>
                    </div>
                    <ChefHat className="h-8 w-8 text-pink-400" />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="mb-6 bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Description</h4>
                <p className="text-gray-900 leading-relaxed">{recipe.description}</p>
              </div>

              {/* Two Column Layout for Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Recipe Details */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">Recipe Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">Category</span>
                        <span className="text-sm text-gray-900 font-medium">{recipe.category}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">Yield</span>
                        <span className="text-sm text-gray-900 font-medium">
                          {recipe.yield.quantity} {recipe.yield.unit}
                          {recipe.yield.description && (
                            <span className="text-gray-500 ml-1">({recipe.yield.description})</span>
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">Times Used</span>
                        <span className="text-sm text-gray-900 font-medium">{recipe.timesUsed} orders</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-600">Last Used</span>
                        <span className="text-sm text-gray-900 font-medium">{formatDate(recipe.lastUsed || recipe.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">Cost Breakdown</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Ingredients</span>
                        <span className="text-sm text-gray-900 font-medium">{formatCurrency(ingredientsCost)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Labor Cost</span>
                        <span className="text-sm text-gray-900 font-medium">{formatCurrency(laborCost)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-sm font-semibold text-gray-900">Total Cost</span>
                        <span className="text-sm font-bold text-gray-900">{formatCurrency(totalCostWithLabor)}</span>
                      </div>
                      {recipe.sellingPrice && (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-600">Selling Price</span>
                            <span className="text-sm text-gray-900 font-medium">{formatCurrency(recipe.sellingPrice)}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                            <span className="text-sm font-semibold text-mint-700">Profit Margin</span>
                            <span className="text-sm font-bold text-mint-700">{recipe.marginPercentage?.toFixed(1)}%</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Metadata & History */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">History</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Created</span>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatDate(recipe.createdAt)}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">by {recipe.createdBy}</p>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Updated</span>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatDate(recipe.updatedAt)}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">by {recipe.updatedBy}</p>
                      </div>
                    </div>
                  </div>

                  {recipe.packaging && recipe.packaging.length > 0 && (
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4 pb-2 border-b border-gray-200">Packaging</h4>
                      <div className="space-y-2">
                        {recipe.packaging.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <div>
                              <span className="text-gray-900">{item.name}</span>
                              <span className="text-gray-500 ml-2">×{item.quantity}</span>
                            </div>
                            <span className="text-gray-900 font-medium">{formatCurrency(item.totalCost)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-sm font-medium">
                          <span className="text-gray-700">Packaging Total</span>
                          <span className="text-gray-900">{formatCurrency(recipe.packaging.reduce((sum, item) => sum + item.totalCost, 0))}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingredient
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recipe.ingredients.map((ingredient) => (
                      <tr key={ingredient.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">
                          {ingredient.quantity}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900 text-center">
                          {ingredient.unit}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900">
                          {ingredient.name}
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
                      <td colSpan={3} className="px-3 py-3 text-sm font-medium text-gray-900 text-right">
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
          )}

          {activeTab === 'preparation' && (
            <div className="p-6">
              <div className="space-y-3">
                {recipe.preparationSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-coral-300 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-br from-coral-400 to-coral-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                        {step.stepNumber}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 leading-relaxed">{step.instruction}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-2">
                        {step.duration && (
                          <div className="flex items-center bg-white px-2 py-1 rounded border border-gray-200">
                            <Clock className="h-3 w-3 mr-1 text-aqua-600" />
                            <span className="font-medium">{step.duration} min</span>
                          </div>
                        )}
                        {step.temperature && (
                          <div className="flex items-center bg-white px-2 py-1 rounded border border-gray-200">
                            <span className="mr-1">🌡️</span>
                            <span className="font-medium">{step.temperature}</span>
                          </div>
                        )}
                      </div>
                      {step.notes && (
                        <p className="text-xs text-gray-600 mt-2 italic bg-yellow-50 p-2 rounded border border-yellow-200">{step.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total time summary */}
              <div className="mt-6 p-4 bg-gradient-to-r from-aqua-50 to-mint-50 rounded-lg border border-aqua-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-aqua-600 mr-2" />
                    <span className="text-sm font-semibold text-gray-700">Total Preparation Time</span>
                  </div>
                  <span className="text-lg font-bold text-aqua-900">
                    {recipe.preparationSteps.reduce((sum, step) => sum + (step.duration || 0), 0)} minutes
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'costing' && (
            <div className="p-6">
              {/* Cost Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-coral-50 to-coral-100 rounded-lg p-5 border border-coral-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-coral-600 uppercase tracking-wide mb-1">Ingredients</p>
                      <p className="text-3xl font-bold text-coral-900">{formatCurrency(ingredientsCost)}</p>
                      <p className="text-xs text-coral-700 mt-1">{recipe.ingredients.length} items</p>
                    </div>
                    <Package className="h-8 w-8 text-coral-400" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-aqua-50 to-aqua-100 rounded-lg p-5 border border-aqua-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-aqua-600 uppercase tracking-wide mb-1">Labor</p>
                      <p className="text-3xl font-bold text-aqua-900">{formatCurrency(laborCost)}</p>
                      <p className="text-xs text-aqua-700 mt-1">{recipe.preparationTime} min @ {formatCurrency(recipe.laborRate || 25.00)}/hr</p>
                    </div>
                    <Clock className="h-8 w-8 text-aqua-400" />
                  </div>
                </div>

                {recipe.packaging && recipe.packaging.length > 0 && (
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-5 border border-pink-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold text-pink-600 uppercase tracking-wide mb-1">Packaging</p>
                        <p className="text-3xl font-bold text-pink-900">
                          {formatCurrency(recipe.packaging.reduce((sum, item) => sum + item.totalCost, 0))}
                        </p>
                        <p className="text-xs text-pink-700 mt-1">{recipe.packaging.length} items</p>
                      </div>
                      <Package className="h-8 w-8 text-pink-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Cost Analysis */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Cost Summary</h4>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Total Production Cost</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(totalCostWithLabor)}</span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-600">Cost per {recipe.yield.unit.slice(0, -1)}</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(totalCostWithLabor / recipe.yield.quantity)}
                    </span>
                  </div>

                  {recipe.sellingPrice && (
                    <>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Selling Price</span>
                        <span className="text-lg font-bold text-gray-900">{formatCurrency(recipe.sellingPrice)}</span>
                      </div>

                      <div className="flex justify-between items-center py-3 bg-mint-50 rounded-lg px-4 border border-mint-200">
                        <div>
                          <span className="text-sm font-semibold text-mint-700">Profit Margin</span>
                          <p className="text-xs text-mint-600 mt-0.5">
                            {formatCurrency(recipe.sellingPrice - totalCostWithLabor)} profit
                          </p>
                        </div>
                        <span className="text-2xl font-bold text-mint-700">{recipe.marginPercentage?.toFixed(1)}%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Pricing Recommendations */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-5 border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Pricing Guide</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">2x Markup (50% margin)</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(totalCostWithLabor * 2)}</p>
                  </div>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">3x Markup (66% margin)</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(totalCostWithLabor * 3)}</p>
                  </div>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">4x Markup (75% margin)</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(totalCostWithLabor * 4)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default RecipeDetail;