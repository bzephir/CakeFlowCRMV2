export interface Recipe {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  status: 'active' | 'archived' | 'draft';
  
  // Yield information
  yield: {
    quantity: number;
    unit: string; // 'servings', 'pieces', 'portions'
    description?: string; // e.g., "8-inch round cake"
  };
  
  // Ingredients
  ingredients: RecipeIngredient[];
  
  // Preparation
  preparationSteps: PreparationStep[];
  preparationTime: number; // minutes
  
  // Packaging/Materials (optional)
  packaging?: PackagingItem[];

  // Cost fields
  totalCost: number;
  costPerUnit: number;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastUsed?: string;
  timesUsed: number;
}

export interface RecipeIngredient {
  id: string;
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  notes?: string;
  isOptional?: boolean;
  // Inventory status
  inStock: number;
  isLowStock: boolean;
  isOutOfStock: boolean;
}

export interface PreparationStep {
  id: string;
  stepNumber: number;
  instruction: string;
  duration?: number; // minutes
  temperature?: string;
  notes?: string;
}

export interface PackagingItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  unit: string;
  costPerUnit: number;
  supplier?: string;
  inStock: number;
  reorderLevel: number;
  lastUpdated: string;
}

export interface RecipeUsage {
  id: string;
  recipeId: string;
  orderId: string;
  quantity: number;
  usedAt: string;
  ingredientsDeducted: {
    ingredientId: string;
    quantityUsed: number;
  }[];
}

export interface RecipeCostReport {
  recipeId: string;
  name: string;
  category: string;
  totalCost: number;
  costPerUnit: number;
  timesUsed: number;
  yield: {
    quantity: number;
    unit: string;
  };
}