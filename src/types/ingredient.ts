export type MeasurementUnit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'l'
  | 'tsp'
  | 'tbsp'
  | 'cup'
  | 'lb'
  | 'oz'
  | 'gal'
  | 'piece';

export type IngredientCategory =
  | 'Flour'
  | 'Sugar'
  | 'Dairy'
  | 'Eggs'
  | 'Fats & Oils'
  | 'Leavening Agents'
  | 'Flavorings'
  | 'Chocolate'
  | 'Nuts & Seeds'
  | 'Fruits'
  | 'Spices'
  | 'Other';

export type StorageLocation = 'dry' | 'fridge' | 'freezer';

export interface Vendor {
  id: string;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  paymentTerms?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MasterIngredient {
  id: string;
  name: string;
  category: IngredientCategory;
  packageSize: number;
  packageUnit: MeasurementUnit;
  packageDescription?: string;
  inventoryQuantity: number;
  purchasePrice: number;
  costPerUnit: number;
  baseUnit: MeasurementUnit;
  location: StorageLocation;
  vendorId?: string;
  vendor?: Vendor;
  lastPriceUpdate?: string;
  reorderLevel?: number;
  brand?: string;
  dateReceived?: string;
  lotNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IngredientRecipeLink {
  ingredientId: string;
  recipeId: string;
  recipeName: string;
  quantityUsed: number;
  unit: MeasurementUnit;
}

export interface MeasurementConversion {
  from: MeasurementUnit;
  to: MeasurementUnit;
  factor: number;
}

export interface PriceHistory {
  id: string;
  ingredientId: string;
  price: number;
  updatedBy: string;
  updatedAt: string;
  reason?: string;
}

export const unitConversions: Record<string, Record<string, number>> = {
  g: { g: 1, kg: 0.001, oz: 0.035274, lb: 0.00220462 },
  kg: { g: 1000, kg: 1, oz: 35.274, lb: 2.20462 },
  oz: { g: 28.3495, kg: 0.0283495, oz: 1, lb: 0.0625 },
  lb: { g: 453.592, kg: 0.453592, oz: 16, lb: 1 },
  ml: { ml: 1, l: 0.001, tsp: 0.202884, tbsp: 0.067628, cup: 0.00422675, gal: 0.000264172 },
  l: { ml: 1000, l: 1, tsp: 202.884, tbsp: 67.628, cup: 4.22675, gal: 0.264172 },
  tsp: { ml: 4.92892, l: 0.00492892, tsp: 1, tbsp: 0.333333, cup: 0.0208333 },
  tbsp: { ml: 14.7868, l: 0.0147868, tsp: 3, tbsp: 1, cup: 0.0625 },
  cup: { ml: 236.588, l: 0.236588, tsp: 48, tbsp: 16, cup: 1 },
  gal: { ml: 3785.41, l: 3.78541, cup: 16, gal: 1 },
  piece: { piece: 1 }
};

export function convertUnit(
  value: number,
  fromUnit: MeasurementUnit,
  toUnit: MeasurementUnit
): number | null {
  if (fromUnit === toUnit) return value;

  const conversionMap = unitConversions[fromUnit];
  if (!conversionMap || !(toUnit in conversionMap)) {
    return null;
  }

  return value * conversionMap[toUnit];
}

export function calculateCostPerUnit(
  purchasePrice: number,
  packageSize: number,
  packageUnit: MeasurementUnit,
  baseUnit: MeasurementUnit
): number {
  const converted = convertUnit(packageSize, packageUnit, baseUnit);
  if (converted === null || converted === 0) return 0;
  return purchasePrice / converted;
}

export function calculatePriceForQuantity(
  costPerUnit: number,
  quantity: number,
  quantityUnit: MeasurementUnit,
  baseUnit: MeasurementUnit
): number {
  const converted = convertUnit(quantity, quantityUnit, baseUnit);
  if (converted === null) return 0;
  return costPerUnit * converted;
}
