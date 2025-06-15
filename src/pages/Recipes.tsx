import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RecipeForm from '../components/RecipeForm';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Clock,
  Users,
  DollarSign,
  ChefHat,
  Star,
  Copy,
  Archive,
  AlertTriangle,
  TrendingUp,
  Package,
  MoreHorizontal
} from 'lucide-react';
import type { Recipe } from '../types/recipe';

const Recipes: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Mock recipes data with comprehensive information
  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Classic Vanilla Wedding Cake',
      description: 'Three-layer vanilla sponge with buttercream frosting',
      category: 'Wedding Cakes',
      image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
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
          instruction: 'Preheat oven to 350°F. Grease and flour cake pans.',
          duration: 10,
          temperature: '350°F'
        },
        {
          id: '2',
          stepNumber: 2,
          instruction: 'Cream butter and sugar until light and fluffy.',
          duration: 5
        },
        {
          id: '3',
          stepNumber: 3,
          instruction: 'Add eggs one at a time, then vanilla extract.',
          duration: 3
        },
        {
          id: '4',
          stepNumber: 4,
          instruction: 'Alternately add flour and milk, beginning and ending with flour.',
          duration: 5
        },
        {
          id: '5',
          stepNumber: 5,
          instruction: 'Divide batter between prepared pans and bake.',
          duration: 35,
          temperature: '350°F'
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
    },
    {
      id: '2',
      name: 'Chocolate Fudge Birthday Cake',
      description: 'Rich chocolate cake with fudge frosting',
      category: 'Birthday Cakes',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      yield: {
        quantity: 12,
        unit: 'servings',
        description: '8-inch round cake'
      },
      ingredients: [
        {
          id: '1',
          ingredientId: 'flour-001',
          name: 'All-Purpose Flour',
          quantity: 2,
          unit: 'cups',
          costPerUnit: 0.25,
          totalCost: 0.50,
          inStock: 50,
          isLowStock: false,
          isOutOfStock: false
        },
        {
          id: '2',
          ingredientId: 'cocoa-001',
          name: 'Unsweetened Cocoa Powder',
          quantity: 0.75,
          unit: 'cups',
          costPerUnit: 2.00,
          totalCost: 1.50,
          inStock: 5,
          isLowStock: false,
          isOutOfStock: false
        },
        {
          id: '3',
          ingredientId: 'sugar-001',
          name: 'Granulated Sugar',
          quantity: 2,
          unit: 'cups',
          costPerUnit: 0.30,
          totalCost: 0.60,
          inStock: 25,
          isLowStock: false,
          isOutOfStock: false
        },
        {
          id: '4',
          ingredientId: 'chocolate-001',
          name: 'Dark Chocolate Chips',
          quantity: 1,
          unit: 'cup',
          costPerUnit: 3.50,
          totalCost: 3.50,
          inStock: 0,
          isLowStock: false,
          isOutOfStock: true
        }
      ],
      preparationSteps: [
        {
          id: '1',
          stepNumber: 1,
          instruction: 'Preheat oven to 350°F. Prepare 8-inch round pan.',
          duration: 5,
          temperature: '350°F'
        },
        {
          id: '2',
          stepNumber: 2,
          instruction: 'Mix dry ingredients in large bowl.',
          duration: 3
        },
        {
          id: '3',
          stepNumber: 3,
          instruction: 'Combine wet ingredients and add to dry mixture.',
          duration: 5
        },
        {
          id: '4',
          stepNumber: 4,
          instruction: 'Pour into prepared pan and bake.',
          duration: 30,
          temperature: '350°F'
        }
      ],
      preparationTime: 90,
      packaging: [
        {
          id: '1',
          itemId: 'box-002',
          name: 'Cake Box (Medium)',
          quantity: 1,
          unit: 'piece',
          costPerUnit: 1.50,
          totalCost: 1.50
        }
      ],
      sellingPrice: 85.00,
      totalCost: 7.60,
      costPerUnit: 0.63,
      marginPercentage: 91.1,
      profitPerUnit: 6.45,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-12',
      createdBy: 'admin',
      lastUsed: '2024-01-08',
      timesUsed: 8
    },
    {
      id: '3',
      name: 'Red Velvet Layer Cake',
      description: 'Classic red velvet with cream cheese frosting',
      category: 'Specialty Cakes',
      image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      yield: {
        quantity: 16,
        unit: 'servings',
        description: '2-layer 9-inch cake'
      },
      ingredients: [
        {
          id: '1',
          ingredientId: 'flour-001',
          name: 'All-Purpose Flour',
          quantity: 2.5,
          unit: 'cups',
          costPerUnit: 0.25,
          totalCost: 0.63,
          inStock: 50,
          isLowStock: false,
          isOutOfStock: false
        },
        {
          id: '2',
          ingredientId: 'food-coloring-001',
          name: 'Red Food Coloring',
          quantity: 2,
          unit: 'tbsp',
          costPerUnit: 0.75,
          totalCost: 1.50,
          inStock: 8,
          isLowStock: false,
          isOutOfStock: false
        },
        {
          id: '3',
          ingredientId: 'cream-cheese-001',
          name: 'Cream Cheese',
          quantity: 16,
          unit: 'oz',
          costPerUnit: 0.25,
          totalCost: 4.00,
          inStock: 32,
          isLowStock: false,
          isOutOfStock: false
        }
      ],
      preparationSteps: [
        {
          id: '1',
          stepNumber: 1,
          instruction: 'Preheat oven to 350°F. Prepare two 9-inch round pans.',
          duration: 10,
          temperature: '350°F'
        },
        {
          id: '2',
          stepNumber: 2,
          instruction: 'Mix cake batter with red food coloring.',
          duration: 15
        },
        {
          id: '3',
          stepNumber: 3,
          instruction: 'Bake layers and prepare cream cheese frosting.',
          duration: 45,
          temperature: '350°F'
        }
      ],
      preparationTime: 120,
      sellingPrice: 120.00,
      totalCost: 12.50,
      costPerUnit: 0.78,
      marginPercentage: 89.6,
      profitPerUnit: 6.72,
      createdAt: '2024-01-03',
      updatedAt: '2024-01-14',
      createdBy: 'admin',
      lastUsed: '2024-01-12',
      timesUsed: 5
    },
    {
      id: '4',
      name: 'Lemon Drizzle Cupcakes',
      description: 'Light lemon cupcakes with lemon glaze',
      category: 'Cupcakes',
      image: 'https://images.pexels.com/photos/1721934/pexels-photo-1721934.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'active',
      yield: {
        quantity: 24,
        unit: 'pieces',
        description: 'Standard cupcakes'
      },
      ingredients: [
        {
          id: '1',
          ingredientId: 'flour-001',
          name: 'All-Purpose Flour',
          quantity: 2,
          unit: 'cups',
          costPerUnit: 0.25,
          totalCost: 0.50,
          inStock: 50,
          isLowStock: false,
          isOutOfStock: false
        },
        {
          id: '2',
          ingredientId: 'lemon-001',
          name: 'Fresh Lemons',
          quantity: 4,
          unit: 'pieces',
          costPerUnit: 0.50,
          totalCost: 2.00,
          inStock: 12,
          isLowStock: false,
          isOutOfStock: false
        }
      ],
      preparationSteps: [
        {
          id: '1',
          stepNumber: 1,
          instruction: 'Preheat oven to 375°F. Line cupcake tins.',
          duration: 5,
          temperature: '375°F'
        },
        {
          id: '2',
          stepNumber: 2,
          instruction: 'Mix batter and fill cupcake liners.',
          duration: 10
        },
        {
          id: '3',
          stepNumber: 3,
          instruction: 'Bake and prepare lemon drizzle.',
          duration: 25,
          temperature: '375°F'
        }
      ],
      preparationTime: 60,
      sellingPrice: 48.00,
      totalCost: 6.50,
      costPerUnit: 0.27,
      marginPercentage: 86.5,
      profitPerUnit: 1.73,
      createdAt: '2024-01-02',
      updatedAt: '2024-01-11',
      createdBy: 'admin',
      lastUsed: '2024-01-09',
      timesUsed: 12
    },
    {
      id: '5',
      name: 'Tiramisu Layer Cake',
      description: 'Coffee-soaked layers with mascarpone cream',
      category: 'Specialty Cakes',
      image: 'https://images.pexels.com/photos/1702373/pexels-photo-1702373.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'draft',
      yield: {
        quantity: 20,
        unit: 'servings',
        description: '3-layer 8-inch cake'
      },
      ingredients: [
        {
          id: '1',
          ingredientId: 'mascarpone-001',
          name: 'Mascarpone Cheese',
          quantity: 16,
          unit: 'oz',
          costPerUnit: 0.75,
          totalCost: 12.00,
          inStock: 0,
          isLowStock: false,
          isOutOfStock: true
        },
        {
          id: '2',
          ingredientId: 'coffee-001',
          name: 'Espresso Coffee',
          quantity: 2,
          unit: 'cups',
          costPerUnit: 1.50,
          totalCost: 3.00,
          inStock: 5,
          isLowStock: true,
          isOutOfStock: false
        }
      ],
      preparationSteps: [
        {
          id: '1',
          stepNumber: 1,
          instruction: 'Prepare coffee mixture and let cool.',
          duration: 15
        },
        {
          id: '2',
          stepNumber: 2,
          instruction: 'Make mascarpone cream filling.',
          duration: 20
        }
      ],
      preparationTime: 240,
      sellingPrice: 150.00,
      totalCost: 22.00,
      costPerUnit: 1.10,
      marginPercentage: 85.3,
      profitPerUnit: 6.40,
      createdAt: '2024-01-06',
      updatedAt: '2024-01-13',
      createdBy: 'admin',
      timesUsed: 0
    }
  ];

  const categories = [...new Set(recipes.map(recipe => recipe.category))];

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-mint-100 text-mint-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'archived': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const hasInventoryIssues = (recipe: Recipe) => {
    return recipe.ingredients.some(ing => ing.isLowStock || ing.isOutOfStock);
  };

  const getInventoryStatus = (recipe: Recipe) => {
    const outOfStock = recipe.ingredients.filter(ing => ing.isOutOfStock).length;
    const lowStock = recipe.ingredients.filter(ing => ing.isLowStock).length;
    
    if (outOfStock > 0) return { type: 'error', message: `${outOfStock} ingredient(s) out of stock` };
    if (lowStock > 0) return { type: 'warning', message: `${lowStock} ingredient(s) low stock` };
    return { type: 'success', message: 'All ingredients available' };
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || recipe.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || recipe.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
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

  const handleArchiveRecipe = (recipeId: string) => {
    console.log('Archive recipe:', recipeId);
    alert('Recipe archived successfully!');
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

  return (
    <div className="flex-1 overflow-hidden">
      <Header title="Recipes" subtitle="Manage your cake recipes, costs, and pricing strategies" />
      
      <div className="p-6">
        {/* Actions Bar */}
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

        {/* Summary Stats */}
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
                <p className="text-lg font-semibold text-gray-900">{recipes.length}</p>
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
                  {(recipes.reduce((sum, r) => sum + r.marginPercentage, 0) / recipes.length).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-aqua-400 to-aqua-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Inventory Issues</p>
                <p className="text-lg font-semibold text-gray-900">
                  {recipes.filter(hasInventoryIssues).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Most Popular</p>
                <p className="text-lg font-semibold text-gray-900 truncate">
                  {recipes.sort((a, b) => b.timesUsed - a.timesUsed)[0]?.name.split(' ')[0] || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRecipes.map((recipe) => {
            const inventoryStatus = getInventoryStatus(recipe);
            
            return (
              <div key={recipe.id} className="bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(recipe.status)}`}>
                      {recipe.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(recipe.preparationTime)}`}>
                      {getDifficultyLabel(recipe.preparationTime)}
                    </span>
                  </div>
                  {hasInventoryIssues(recipe) && (
                    <div className="absolute bottom-3 left-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        inventoryStatus.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {inventoryStatus.type === 'error' ? 'Out of Stock' : 'Low Stock'}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  {/* Recipe Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{recipe.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{recipe.category}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{recipe.timesUsed} uses</span>
                      </div>
                    </div>
                  </div>

                  {/* Recipe Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      {recipe.yield.quantity} {recipe.yield.unit}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {recipe.preparationTime}m prep
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">${recipe.totalCost.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">Cost</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-mint-600">{recipe.marginPercentage.toFixed(1)}%</div>
                        <div className="text-xs text-gray-500">Margin</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-coral-600">${recipe.sellingPrice.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">Price</div>
                      </div>
                    </div>
                  </div>

                  {/* Inventory Status */}
                  <div className={`text-xs p-2 rounded-md mb-4 ${
                    inventoryStatus.type === 'success' ? 'bg-mint-50 text-mint-700' :
                    inventoryStatus.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {inventoryStatus.message}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleViewRecipe(recipe.id)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <button 
                      onClick={() => handleEditRecipe(recipe)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <div className="relative">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {/* Dropdown menu would go here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedRecipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <div className="text-gray-500 text-lg">No recipes found</div>
            <div className="text-gray-400 text-sm mt-2">
              {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first recipe'
              }
            </div>
          </div>
        )}
      </div>

      {/* Recipe Form Modal */}
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