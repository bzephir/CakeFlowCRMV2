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

        {/* Tabs */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', name: 'Overview', icon: ChefHat },
                { id: 'ingredients', name: 'Ingredients', icon: Package, count: recipe.ingredients.length },
                { id: 'preparation', name: 'Preparation', icon: Clock, count: recipe.preparationSteps.length },
                { id: 'costing', name: 'Cost Analysis', icon: DollarSign }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center py-3 px-4 font-medium text-sm transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-coral-500 text-coral-600 bg-coral-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                  {tab.count !== undefined && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-coral-100 text-coral-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className={`p-6 transition-colors ${
            activeTab === 'overview' ? 'bg-coral-50/30' :
            activeTab === 'ingredients' ? 'bg-coral-50/30' :
            activeTab === 'preparation' ? 'bg-coral-50/30' :
            activeTab === 'costing' ? 'bg-coral-50/30' : ''
          }`}>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Description</h3>
                  <p className="text-base text-gray-900 leading-relaxed">{recipe.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <ChefHat className="h-5 w-5 text-coral-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Yield</p>
                          <p className="text-sm font-medium text-gray-900">
                            {recipe.yield.quantity} {recipe.yield.unit}
                            {recipe.yield.description && (
                              <span className="text-gray-500 font-normal"> ({recipe.yield.description})</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-coral-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Preparation Time</p>
                          <p className="text-sm font-medium text-gray-900">{recipe.preparationTime} minutes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Package className="h-5 w-5 text-coral-500 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Category</p>
                          <p className="text-sm font-medium text-gray-900">{recipe.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Cost Breakdown</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-mint-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Total Cost</p>
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(recipe.totalCost)}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-mint-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Cost Per Serving</p>
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(recipe.costPerUnit)}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-mint-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Selling Price</p>
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(recipe.sellingPrice)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">History & Usage</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(recipe.createdAt)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">by {recipe.createdBy}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Last Updated</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(recipe.updatedAt)}</p>
                        <p className="text-xs text-gray-500 mt-0.5">by {recipe.updatedBy}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingredients</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ingredient
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recipe.ingredients.map((ingredient) => (
                      <tr key={ingredient.id}>
                        <td className="px-3 py-4 text-sm text-gray-900">
                          {ingredient.quantity}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-900">
                          {ingredient.unit}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900">
                          {ingredient.name}
                        </td>
                        <td className="px-3 py-4 text-sm font-medium text-gray-900 text-right">
                          {formatCurrency(ingredient.totalCost)}
                        </td>
                        <td className="px-3 py-4">
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
              <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preparation Steps</h3>
              <div className="space-y-2">
                {recipe.preparationSteps.map((step) => (
                  <div key={step.id} className="flex items-start space-x-3 py-2">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-coral-100 text-coral-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {step.stepNumber}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{step.instruction}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
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
                        <p className="text-xs text-gray-600 mt-1 italic">{step.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              </div>
            )}

            {activeTab === 'costing' && (
              <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Ingredients Cost</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(ingredientsCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <span className="text-sm text-gray-600">Labor Cost</span>
                    <p className="text-xs text-gray-500">
                      {recipe.preparationTime} min @ {formatCurrency(recipe.laborRate || 25.00)}/hr
                    </p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(laborCost)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-base font-medium text-gray-900">Total Cost</span>
                  <span className="text-base font-semibold text-gray-900">
                    {formatCurrency(totalCostWithLabor)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Cost per {recipe.yield.unit.slice(0, -1)}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(totalCostWithLabor / recipe.yield.quantity)}
                  </span>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;