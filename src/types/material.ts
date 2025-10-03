export type MaterialCategory =
  | 'Cake Boards'
  | 'Cake Boxes'
  | 'Cake Drums'
  | 'Cupcake Containers'
  | 'Decorations'
  | 'Toppers'
  | 'Wrapping Materials'
  | 'Straws'
  | 'Bags'
  | 'Miscellaneous';

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  unitQuantity: number;
  packageCost: number;
  costPerItem: number;
  pricePerItem: number;
  profitMargin: number;
  inventoryQuantity: number;
  totalItemsAvailable: number;
  reorderLevel: number;
  vendorId?: string;
  canLinkToRecipe: boolean;
  notes?: string;
  lastPriceUpdate?: string;
  createdAt: string;
  updatedAt: string;
}

export function calculateCostPerItem(packageCost: number, unitQuantity: number): number {
  if (unitQuantity === 0) return 0;
  return packageCost / unitQuantity;
}

export function calculateProfitMargin(pricePerItem: number, costPerItem: number): number {
  if (costPerItem === 0) return 0;
  return ((pricePerItem - costPerItem) / costPerItem) * 100;
}

export function calculateTotalItemsAvailable(inventoryQuantity: number, unitQuantity: number): number {
  return inventoryQuantity * unitQuantity;
}

export function calculateInventoryValue(materials: Material[]): number {
  return materials.reduce((sum, material) => sum + (material.packageCost * material.inventoryQuantity), 0);
}

export function calculatePotentialRevenue(materials: Material[]): number {
  return materials.reduce((sum, material) => {
    const totalItems = material.inventoryQuantity * material.unitQuantity;
    return sum + (material.pricePerItem * totalItems);
  }, 0);
}

export function calculateAverageMargin(materials: Material[]): number {
  if (materials.length === 0) return 0;
  const totalMargin = materials.reduce((sum, material) => sum + material.profitMargin, 0);
  return totalMargin / materials.length;
}
