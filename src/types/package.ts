export interface Package {
  id: string;
  name: string;
  description?: string;
  category: PackageCategory;
  status: PackageStatus;
  totalCost: number;
  basePrice?: number;
  sellingPrice?: number;
  profitMargin?: number;
  laborCost?: number;
  timesOrdered: number;
  lastOrdered?: string;
  isTemplate: boolean;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;

  recipes: PackageRecipe[];
  materials: PackageMaterial[];
}

export interface PackageRecipe {
  id: string;
  packageId: string;
  recipeId?: string;
  recipeName: string;
  quantityMultiplier: number;
  costContribution: number;
  notes?: string;
  sortOrder: number;
}

export interface PackageMaterial {
  id: string;
  packageId: string;
  materialId?: string;
  materialName: string;
  quantity: number;
  costPerItem: number;
  totalCost: number;
  notes?: string;
  sortOrder: number;
}

export type PackageCategory =
  | 'cakes'
  | 'cupcakes'
  | 'cookies'
  | 'desserts'
  | 'party-packages'
  | 'custom';

export type PackageStatus = 'active' | 'draft' | 'archived';

export interface PackageFormData {
  name: string;
  description?: string;
  category: PackageCategory;
  status: PackageStatus;
  basePrice?: number;
  sellingPrice?: number;
  laborCost?: number;
  notes?: string;
  isTemplate: boolean;
  recipes: {
    recipeId: string;
    recipeName: string;
    quantityMultiplier: number;
    costContribution: number;
    notes?: string;
  }[];
  materials: {
    materialId: string;
    materialName: string;
    quantity: number;
    costPerItem: number;
    totalCost: number;
    notes?: string;
  }[];
}

export interface PackageSummary {
  totalPackages: number;
  activePackages: number;
  averageMargin: number;
  totalRevenuePotential: number;
  mostPopularPackage?: Package;
  lowMarginPackages: Package[];
}
