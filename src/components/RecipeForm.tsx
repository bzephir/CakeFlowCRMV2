import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, ChefHat, DollarSign, Package, Clock, Users, AlertTriangle } from 'lucide-react';
import type { Recipe, RecipeIngredient, PreparationStep, PackagingItem } from '../types/recipe';

interface RecipeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (recipeData: Partial<Recipe>) => void;
  recipe?: Recipe | null;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ isOpen, onClose, onSubmit, recipe }) => {
  const [formData, setFormData] = useState<Partial<Recipe>>({
    name: '',
    description: '',
    category: '',
    status: 'draft',
    yield: {
      quantity: 1,
      unit: 'servings',
      description: ''
    },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    packaging: [],
    sellingPrice: 0,
    totalCost: 0,
    costPerUnit: 0,
    marginPercentage: 0,
    profitPerUnit: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [descriptionWordCount, setDescriptionWordCount] = useState<number>(0);

  // Mock ingredients database
  const availableIngredients = [
    { id: 'flour-001', name: 'All-Purpose Flour', unit: 'cups', costPerUnit: 0.25, inStock: 50 },
    { id: 'sugar-001', name: 'Granulated Sugar', unit: 'cups', costPerUnit: 0.30, inStock: 25 },
    { id: 'butter-001', name: 'Unsalted Butter', unit: 'lbs', costPerUnit: 4.50, inStock: 10 },
    { id: 'eggs-001', name: 'Large Eggs', unit: 'pieces', costPerUnit: 0.25, inStock: 48 },
    { id: 'vanilla-001', name: 'Pure Vanilla Extract', unit: 'tbsp', costPerUnit: 0.50, inStock: 2 },
    { id: 'cocoa-001', name: 'Unsweetened Cocoa Powder', unit: 'cups', costPerUnit: 2.00, inStock: 5 },
    { id: 'chocolate-001', name: 'Dark Chocolate Chips', unit: 'cups', costPerUnit: 3.50, inStock: 0 },
    { id: 'cream-cheese-001', name: 'Cream Cheese', unit: 'oz', costPerUnit: 0.25, inStock: 32 },
    { id: 'mascarpone-001', name: 'Mascarpone Cheese', unit: 'oz', costPerUnit: 0.75, inStock: 0 },
    { id: 'lemon-001', name: 'Fresh Lemons', unit: 'pieces', costPerUnit: 0.50, inStock: 12 }
  ];

  const availablePackaging = [
    { id: 'box-001', name: 'Cake Box (Large)', unit: 'piece', costPerUnit: 2.50 },
    { id: 'box-002', name: 'Cake Box (Medium)', unit: 'piece', costPerUnit: 1.50 },
    { id: 'ribbon-001', name: 'Decorative Ribbon', unit: 'yards', costPerUnit: 1.25 }
  ];

  const categories = ['Wedding Cakes', 'Birthday Cakes', 'Specialty Cakes', 'Cupcakes', 'Cookies', 'Pastries'];
  const yieldUnits = ['servings', 'pieces', 'portions', 'slices'];

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
      setDescriptionWordCount(countWords(recipe.description || ''));
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        status: 'draft',
        yield: {
          quantity: 1,
          unit: 'servings',
          description: ''
        },
        ingredients: [],
        preparationSteps: [],
        preparationTime: 60,
        packaging: [],
        sellingPrice: 0,
        totalCost: 0,
        costPerUnit: 0,
        marginPercentage: 0,
        profitPerUnit: 0
      });
      setDescriptionWordCount(0);
    }
  }, [recipe]);

  // Calculate costs and margins whenever ingredients, packaging, or selling price changes
  useEffect(() => {
    calculateCosts();
  }, [formData.ingredients, formData.packaging, formData.sellingPrice, formData.yield]);

  const calculateCosts = () => {
    const ingredientsCost = (formData.ingredients || []).reduce((sum, ing) => sum + ing.totalCost, 0);
    const packagingCost = (formData.packaging || []).reduce((sum, pkg) => sum + pkg.totalCost, 0);
    const totalCost = ingredientsCost + packagingCost;
    const costPerUnit = formData.yield?.quantity ? totalCost / formData.yield.quantity : 0;
    const sellingPrice = formData.sellingPrice || 0;
    const profitPerUnit = (sellingPrice / (formData.yield?.quantity || 1)) - costPerUnit;
    const marginPercentage = sellingPrice > 0 ? ((sellingPrice - totalCost) / sellingPrice) * 100 : 0;

    setFormData(prev => ({
      ...prev,
      totalCost,
      costPerUnit,
      marginPercentage,
      profitPerUnit
    }));
  };

  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'description') {
      const wordCount = countWords(value);
      setDescriptionWordCount(wordCount);
    }

    if (name.startsWith('yield.')) {
      const yieldField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        yield: {
          ...prev.yield!,
          [yieldField]: yieldField === 'quantity' ? parseInt(value) || 1 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'preparationTime' || name === 'sellingPrice' ? parseFloat(value) || 0 : value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addIngredient = () => {
    const newIngredient: RecipeIngredient = {
      id: `ing-${Date.now()}`,
      ingredientId: '',
      name: '',
      quantity: 1,
      unit: '',
      costPerUnit: 0,
      totalCost: 0,
      inStock: 0,
      isLowStock: false,
      isOutOfStock: false
    };

    setFormData(prev => ({
      ...prev,
      ingredients: [...(prev.ingredients || []), newIngredient]
    }));
  };

  const updateIngredient = (index: number, field: string, value: any) => {
    const ingredients = [...(formData.ingredients || [])];
    const ingredient = { ...ingredients[index] };

    if (field === 'ingredientId') {
      const selectedIngredient = availableIngredients.find(ing => ing.id === value);
      if (selectedIngredient) {
        ingredient.ingredientId = value;
        ingredient.name = selectedIngredient.name;
        ingredient.unit = selectedIngredient.unit;
        ingredient.costPerUnit = selectedIngredient.costPerUnit;
        ingredient.inStock = selectedIngredient.inStock;
        ingredient.isLowStock = selectedIngredient.inStock < 5;
        ingredient.isOutOfStock = selectedIngredient.inStock === 0;
      }
    } else {
      ingredient[field as keyof RecipeIngredient] = value;
    }

    // Recalculate total cost for this ingredient
    if (field === 'quantity' || field === 'costPerUnit') {
      ingredient.totalCost = ingredient.quantity * ingredient.costPerUnit;
    }

    ingredients[index] = ingredient;
    setFormData(prev => ({ ...prev, ingredients }));
  };

  const removeIngredient = (index: number) => {
    const ingredients = [...(formData.ingredients || [])];
    ingredients.splice(index, 1);
    setFormData(prev => ({ ...prev, ingredients }));
  };

  const addPreparationStep = () => {
    const newStep: PreparationStep = {
      id: `step-${Date.now()}`,
      stepNumber: (formData.preparationSteps?.length || 0) + 1,
      instruction: '',
      duration: 0
    };

    setFormData(prev => ({
      ...prev,
      preparationSteps: [...(prev.preparationSteps || []), newStep]
    }));
  };

  const updatePreparationStep = (index: number, field: string, value: any) => {
    const steps = [...(formData.preparationSteps || [])];
    steps[index] = {
      ...steps[index],
      [field]: field === 'duration' ? parseInt(value) || 0 : value
    };
    setFormData(prev => ({ ...prev, preparationSteps: steps }));
  };

  const removePreparationStep = (index: number) => {
    const steps = [...(formData.preparationSteps || [])];
    steps.splice(index, 1);
    // Renumber steps
    steps.forEach((step, i) => {
      step.stepNumber = i + 1;
    });
    setFormData(prev => ({ ...prev, preparationSteps: steps }));
  };

  const addPackagingItem = () => {
    const newItem: PackagingItem = {
      id: `pkg-${Date.now()}`,
      itemId: '',
      name: '',
      quantity: 1,
      unit: '',
      costPerUnit: 0,
      totalCost: 0
    };

    setFormData(prev => ({
      ...prev,
      packaging: [...(prev.packaging || []), newItem]
    }));
  };

  const updatePackagingItem = (index: number, field: string, value: any) => {
    const packaging = [...(formData.packaging || [])];
    const item = { ...packaging[index] };

    if (field === 'itemId') {
      const selectedItem = availablePackaging.find(pkg => pkg.id === value);
      if (selectedItem) {
        item.itemId = value;
        item.name = selectedItem.name;
        item.unit = selectedItem.unit;
        item.costPerUnit = selectedItem.costPerUnit;
      }
    } else {
      item[field as keyof PackagingItem] = value;
    }

    // Recalculate total cost for this item
    if (field === 'quantity' || field === 'costPerUnit') {
      item.totalCost = item.quantity * item.costPerUnit;
    }

    packaging[index] = item;
    setFormData(prev => ({ ...prev, packaging }));
  };

  const removePackagingItem = (index: number) => {
    const packaging = [...(formData.packaging || [])];
    packaging.splice(index, 1);
    setFormData(prev => ({ ...prev, packaging }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Recipe name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    const descWordCount = countWords(formData.description || '');
    if (descWordCount > 15) {
      newErrors.description = `Description must be 15 words or less (currently ${descWordCount} words)`;
    }
    if (!formData.yield?.quantity || formData.yield.quantity < 1) {
      newErrors['yield.quantity'] = 'Yield quantity must be at least 1';
    }
    if (!formData.ingredients?.length) {
      newErrors.ingredients = 'At least one ingredient is required';
    }
    if (!formData.preparationSteps?.length) {
      newErrors.preparationSteps = 'At least one preparation step is required';
    }
    if (!formData.sellingPrice || formData.sellingPrice <= 0) {
      newErrors.sellingPrice = 'Selling price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const recipeData = {
        ...formData,
        updatedAt: new Date().toISOString(),
        createdAt: recipe?.createdAt || new Date().toISOString(),
        createdBy: recipe?.createdBy || 'admin',
        timesUsed: recipe?.timesUsed || 0
      };
      
      onSubmit(recipeData);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      status: 'draft',
      yield: {
        quantity: 1,
        unit: 'servings',
        description: ''
      },
      ingredients: [],
      preparationSteps: [],
      preparationTime: 60,
      packaging: [],
      sellingPrice: 0,
      totalCost: 0,
      costPerUnit: 0,
      marginPercentage: 0,
      profitPerUnit: 0
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-coral-400 to-pink-400 rounded-full flex items-center justify-center">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {recipe ? 'Edit Recipe' : 'Create New Recipe'}
              </h2>
              <p className="text-sm text-gray-500">
                {recipe ? 'Update recipe details and pricing' : 'Add a new recipe with ingredients and pricing'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Recipe Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                  placeholder="Enter recipe name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.category
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status || 'draft'}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                  <span className="text-xs text-gray-500 ml-2">(15 words maximum)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={2}
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors.description
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : descriptionWordCount > 15
                      ? 'border-yellow-400 focus:ring-yellow-500 focus:border-yellow-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                  placeholder="Brief description of the recipe (15 words max)..."
                />
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    {errors.description && (
                      <p className="text-sm text-red-600">{errors.description}</p>
                    )}
                  </div>
                  <p className={`text-xs ${
                    descriptionWordCount > 15
                      ? 'text-red-600 font-medium'
                      : descriptionWordCount > 12
                      ? 'text-yellow-600'
                      : 'text-gray-500'
                  }`}>
                    {descriptionWordCount}/15 words
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Yield Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-coral-500" />
              Yield Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="yield.quantity" className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  id="yield.quantity"
                  name="yield.quantity"
                  min="1"
                  value={formData.yield?.quantity || 1}
                  onChange={handleInputChange}
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                    errors['yield.quantity']
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                  }`}
                />
                {errors['yield.quantity'] && (
                  <p className="mt-1 text-sm text-red-600">{errors['yield.quantity']}</p>
                )}
              </div>

              <div>
                <label htmlFor="yield.unit" className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  id="yield.unit"
                  name="yield.unit"
                  value={formData.yield?.unit || 'servings'}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                >
                  {yieldUnits.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="preparationTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Prep Time (minutes)
                </label>
                <input
                  type="number"
                  id="preparationTime"
                  name="preparationTime"
                  min="1"
                  value={formData.preparationTime || 60}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                />
              </div>

              <div className="md:col-span-3">
                <label htmlFor="yield.description" className="block text-sm font-medium text-gray-700 mb-1">
                  Yield Description
                </label>
                <input
                  type="text"
                  id="yield.description"
                  name="yield.description"
                  value={formData.yield?.description || ''}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500"
                  placeholder="e.g., 8-inch round cake, standard cupcakes"
                />
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Package className="h-5 w-5 mr-2 text-aqua-500" />
                Ingredients
              </h3>
              <button
                type="button"
                onClick={addIngredient}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-aqua-400 to-aqua-500 hover:from-aqua-500 hover:to-aqua-600 transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </button>
            </div>

            {errors.ingredients && (
              <p className="mb-4 text-sm text-red-600">{errors.ingredients}</p>
            )}

            <div className="space-y-4">
              {(formData.ingredients || []).map((ingredient, index) => (
                <div key={ingredient.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ingredient
                      </label>
                      <select
                        value={ingredient.ingredientId}
                        onChange={(e) => updateIngredient(index, 'ingredientId', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                      >
                        <option value="">Select ingredient</option>
                        {availableIngredients.map(ing => (
                          <option key={ing.id} value={ing.id}>
                            {ing.name} ({ing.inStock} {ing.unit} available)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={ingredient.quantity}
                        onChange={(e) => updateIngredient(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <input
                        type="text"
                        value={ingredient.unit}
                        readOnly
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost/Unit
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={ingredient.costPerUnit}
                        onChange={(e) => updateIngredient(index, 'costPerUnit', parseFloat(e.target.value) || 0)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                      />
                    </div>

                    <div className="flex items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Cost
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-medium">
                          ${ingredient.totalCost.toFixed(2)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="ml-2 p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inventory warnings */}
                  {ingredient.isOutOfStock && (
                    <div className="mt-2 flex items-center text-sm text-red-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Out of stock
                    </div>
                  )}
                  {ingredient.isLowStock && !ingredient.isOutOfStock && (
                    <div className="mt-2 flex items-center text-sm text-yellow-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Low stock ({ingredient.inStock} remaining)
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preparation Steps */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-mint-500" />
                Preparation Steps
              </h3>
              <button
                type="button"
                onClick={addPreparationStep}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-mint-400 to-mint-500 hover:from-mint-500 hover:to-mint-600 transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Step
              </button>
            </div>

            {errors.preparationSteps && (
              <p className="mb-4 text-sm text-red-600">{errors.preparationSteps}</p>
            )}

            <div className="space-y-4">
              {(formData.preparationSteps || []).map((step, index) => (
                <div key={step.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Step
                      </label>
                      <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-medium text-center">
                        {step.stepNumber}
                      </div>
                    </div>

                    <div className="md:col-span-7">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instruction
                      </label>
                      <textarea
                        rows={2}
                        value={step.instruction}
                        onChange={(e) => updatePreparationStep(index, 'instruction', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                        placeholder="Describe this preparation step..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (min)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={step.duration || ''}
                        onChange={(e) => updatePreparationStep(index, 'duration', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                      />
                    </div>

                    <div className="md:col-span-2 flex items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Temperature
                        </label>
                        <input
                          type="text"
                          value={step.temperature || ''}
                          onChange={(e) => updatePreparationStep(index, 'temperature', e.target.value)}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                          placeholder="e.g., 350°F"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removePreparationStep(index)}
                        className="ml-2 p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Packaging (Optional) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Package className="h-5 w-5 mr-2 text-pink-500" />
                Packaging & Materials (Optional)
              </h3>
              <button
                type="button"
                onClick={addPackagingItem}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 transition-all"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
            </div>

            <div className="space-y-4">
              {(formData.packaging || []).map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Packaging Item
                      </label>
                      <select
                        value={item.itemId}
                        onChange={(e) => updatePackagingItem(index, 'itemId', e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                      >
                        <option value="">Select item</option>
                        {availablePackaging.map(pkg => (
                          <option key={pkg.id} value={pkg.id}>
                            {pkg.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => updatePackagingItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <input
                        type="text"
                        value={item.unit}
                        readOnly
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost/Unit
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.costPerUnit}
                        onChange={(e) => updatePackagingItem(index, 'costPerUnit', parseFloat(e.target.value) || 0)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-coral-500 focus:border-coral-500 text-sm"
                      />
                    </div>

                    <div className="flex items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Cost
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-medium">
                          ${item.totalCost.toFixed(2)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removePackagingItem(index)}
                        className="ml-2 p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-coral-500" />
              Pricing & Margins
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Selling Price *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="sellingPrice"
                    name="sellingPrice"
                    step="0.01"
                    min="0"
                    value={formData.sellingPrice || ''}
                    onChange={handleInputChange}
                    className={`block w-full pl-7 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors ${
                      errors.sellingPrice
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-coral-500 focus:border-coral-500'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.sellingPrice && (
                  <p className="mt-1 text-sm text-red-600">{errors.sellingPrice}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Cost Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ingredients:</span>
                      <span className="font-medium">
                        ${((formData.ingredients || []).reduce((sum, ing) => sum + ing.totalCost, 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Packaging:</span>
                      <span className="font-medium">
                        ${((formData.packaging || []).reduce((sum, pkg) => sum + pkg.totalCost, 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-2">
                      <span className="font-medium text-gray-900">Total Cost:</span>
                      <span className="font-semibold">${(formData.totalCost || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-coral-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Profitability</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost per unit:</span>
                      <span className="font-medium">${(formData.costPerUnit || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Profit per unit:</span>
                      <span className="font-medium">${(formData.profitPerUnit || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-coral-200 pt-2">
                      <span className="font-medium text-gray-900">Margin:</span>
                      <span className={`font-semibold ${
                        (formData.marginPercentage || 0) >= 50 ? 'text-mint-600' : 
                        (formData.marginPercentage || 0) >= 30 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {(formData.marginPercentage || 0).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-coral-400 to-pink-400 hover:from-coral-500 hover:to-pink-500 transition-all shadow-sm"
            >
              {recipe ? 'Update Recipe' : 'Create Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;