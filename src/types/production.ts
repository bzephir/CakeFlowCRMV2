export type ProductionJobStatus = 'queued' | 'in_progress' | 'completed' | 'cancelled' | 'on_hold';
export type ProductionPriority = 'low' | 'medium' | 'high' | 'urgent';
export type WorkflowStageStatus = 'pending' | 'in_progress' | 'completed' | 'skipped' | 'blocked';
export type ApprovalStatus = 'not_required' | 'pending' | 'approved' | 'rejected' | 'revision_requested';
export type CustomizationType = 'ingredient_override' | 'flavor_change' | 'size_adjustment' | 'decoration_change' | 'other';

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

  scalingFactor?: number;
  clientSpecifications?: string;
  designNotes?: string;
  requiresClientApproval?: boolean;
  approvalStatus?: ApprovalStatus;

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

export interface SubRecipe {
  id: string;
  recipeId?: string;
  name: string;
  category: string;
  description?: string;
  yieldQuantity: number;
  yieldUnit: string;
  shelfLifeDays: number;
  storageLocation: 'dry' | 'fridge' | 'freezer';
  costPerUnit: number;
  laborCost: number;
  totalCost: number;
  currentStock: number;
  unit: string;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RecipeSubRecipe {
  id: string;
  recipeId: string;
  subRecipeId: string;
  subRecipeName?: string;
  quantityRequired: number;
  unit: string;
  isOptional: boolean;
  notes?: string;
}

export interface ProductionWorkflowStage {
  id: string;
  productionJobId: string;
  stageName: string;
  stageOrder: number;
  status: WorkflowStageStatus;
  estimatedDurationMinutes?: number;
  actualDurationMinutes?: number;
  assignedStaffId?: string;
  assignedStaffName?: string;
  startedAt?: string;
  completedAt?: string;
  notes?: string;
  qualityCheckPassed?: boolean;
  qualityNotes?: string;
  createdAt: string;
}

export interface ProductionJobAttachment {
  id: string;
  productionJobId: string;
  fileName: string;
  fileType: 'photo' | 'design' | 'reference' | 'approval' | 'other';
  fileUrl: string;
  fileSize?: number;
  description?: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ProductionJobCustomization {
  id: string;
  productionJobId: string;
  customizationType: CustomizationType;
  fieldName: string;
  originalValue?: string;
  customValue: string;
  notes?: string;
  createdAt: string;
}

export interface ClientApproval {
  id: string;
  productionJobId: string;
  approvalType: 'design' | 'flavor' | 'specifications' | 'final_product';
  status: ApprovalStatus;
  approvedByName?: string;
  approvedAt?: string;
  notes?: string;
  createdAt: string;
}

export interface SubRecipeBatch {
  id: string;
  batchNumber: string;
  subRecipeId: string;
  subRecipeName: string;
  quantityProduced: number;
  unit: string;
  productionDate: string;
  expirationDate?: string;
  producedBy: string;
  producedByName?: string;
  qualityCheckPassed: boolean;
  qualityNotes?: string;
  costPerUnit: number;
  totalCost: number;
  createdAt: string;
}

export interface ProductionJobWithDetails extends ProductionJob {
  workflowStages?: ProductionWorkflowStage[];
  attachments?: ProductionJobAttachment[];
  customizations?: ProductionJobCustomization[];
  approvals?: ClientApproval[];
  subRecipeRequirements?: RecipeSubRecipe[];
}

export interface ProductionSchedule {
  date: string;
  jobs: ProductionJob[];
  totalJobs: number;
  staffAssignments: {
    staffId: string;
    staffName: string;
    assignedJobs: number;
  }[];
}

export interface IngredientRequirement {
  ingredientId: string;
  ingredientName: string;
  category: string;
  requiredQuantity: number;
  unit: string;
  currentStock: number;
  isAvailable: boolean;
  shortage?: number;
  estimatedCost: number;
}

export interface SubRecipeRequirement {
  subRecipeId: string;
  subRecipeName: string;
  requiredQuantity: number;
  unit: string;
  currentStock: number;
  isAvailable: boolean;
  shortage?: number;
  estimatedCost: number;
  shelfLifeDays: number;
  needsProduction: boolean;
}
