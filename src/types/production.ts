export type ProductionJobStatus = 'queued' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
export type ProductionPriority = 'low' | 'normal' | 'high' | 'urgent';

export interface ProductionJob {
  id: string;
  jobNumber: string;
  recipeId: string;
  recipeName: string;
  recipeCategory: string;
  quantityToProduce: number;
  unit: string;
  status: ProductionJobStatus;
  priority: ProductionPriority;

  scheduledDate: string;
  scheduledStartTime?: string;
  actualStartTime?: string;
  actualEndTime?: string;

  assignedStaffId?: string;
  assignedStaffName?: string;

  linkedOrderId?: string;
  linkedOrderNumber?: string;
  customerName?: string;
  orderDueDate?: string;

  totalIngredientCost: number;
  totalMaterialCost: number;
  totalCost: number;

  ingredients: ProductionJobIngredient[];
  materials: ProductionJobMaterial[];

  batchNumber?: string;
  yieldQuantity?: number;
  wasteQuantity?: number;
  wastePercentage?: number;

  notes?: string;
  qualityNotes?: string;
  photos?: string[];

  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy?: string;
  completedAt?: string;
}

export interface ProductionJobIngredient {
  id: string;
  ingredientId: string;
  ingredientName: string;
  category: string;

  requiredQuantity: number;
  requiredUnit: string;

  actualQuantity?: number;
  actualUnit?: string;

  costPerUnit: number;
  totalCost: number;

  currentStock: number;
  isAvailable: boolean;
  isLowStock: boolean;

  lotNumber?: string;
  expirationDate?: string;

  wasteQuantity?: number;
  wasteReason?: string;

  deductedFromInventory: boolean;
  deductedAt?: string;
  deductedBy?: string;
}

export interface ProductionJobMaterial {
  id: string;
  materialId: string;
  materialName: string;
  category: string;

  requiredQuantity: number;
  actualQuantity?: number;

  costPerItem: number;
  totalCost: number;

  currentStock: number;
  isAvailable: boolean;
  isLowStock: boolean;

  deductedFromInventory: boolean;
  deductedAt?: string;
  deductedBy?: string;
}

export interface ProductionBatch {
  id: string;
  batchNumber: string;
  productionJobId: string;

  recipeId: string;
  recipeName: string;

  quantityProduced: number;
  unit: string;

  productionDate: string;
  expirationDate?: string;

  ingredientsUsed: BatchIngredientTrace[];

  qualityCheckPassed: boolean;
  qualityNotes?: string;

  assignedToOrderId?: string;
  usedDate?: string;

  createdAt: string;
  createdBy: string;
}

export interface BatchIngredientTrace {
  ingredientId: string;
  ingredientName: string;
  lotNumber: string;
  quantityUsed: number;
  unit: string;
  expirationDate?: string;
}

export interface InventoryTransaction {
  id: string;
  transactionType: 'deduction' | 'addition' | 'adjustment' | 'waste';

  itemType: 'ingredient' | 'material';
  itemId: string;
  itemName: string;

  quantity: number;
  unit?: string;

  previousQuantity: number;
  newQuantity: number;

  productionJobId?: string;
  batchNumber?: string;

  reason?: string;
  notes?: string;

  performedBy: string;
  performedAt: string;
}

export interface ProductionRequirements {
  recipeId: string;
  recipeName: string;
  quantityToProduce: number;

  ingredients: ProductionRequirementItem[];
  materials: ProductionRequirementItem[];

  totalIngredientCost: number;
  totalMaterialCost: number;
  totalCost: number;

  hasShortages: boolean;
  shortageItems: string[];

  canProduce: boolean;
}

export interface ProductionRequirementItem {
  id: string;
  name: string;
  category: string;

  required: number;
  unit: string;
  available: number;

  shortage: number;
  hasShortage: boolean;

  costPerUnit: number;
  totalCost: number;
}

export interface ProductionReport {
  periodStart: string;
  periodEnd: string;

  totalJobs: number;
  completedJobs: number;
  cancelledJobs: number;

  totalUnitsProduced: number;
  totalProductionCost: number;
  averageCostPerUnit: number;

  totalWaste: number;
  averageWastePercentage: number;

  ingredientUsage: IngredientUsageReport[];
  materialUsage: MaterialUsageReport[];

  staffProductivity: StaffProductivityReport[];

  orderFulfillment: {
    totalLinkedOrders: number;
    onTimeCompletions: number;
    lateCompletions: number;
    onTimePercentage: number;
  };
}

export interface IngredientUsageReport {
  ingredientId: string;
  ingredientName: string;
  category: string;

  totalQuantityUsed: number;
  unit: string;

  totalCost: number;
  averageCostPerUnit: number;

  timesUsed: number;

  totalWaste: number;
  wastePercentage: number;
}

export interface MaterialUsageReport {
  materialId: string;
  materialName: string;
  category: string;

  totalQuantityUsed: number;
  totalCost: number;

  timesUsed: number;
}

export interface StaffProductivityReport {
  staffId: string;
  staffName: string;

  jobsCompleted: number;
  totalUnitsProduced: number;

  averageCompletionTime: number;
  onTimeCompletions: number;

  totalProductionValue: number;
}
