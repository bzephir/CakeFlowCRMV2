import { ProductionJob, ProductionJobIngredient, ProductionJobMaterial, ProductionBatch } from '../types/production';
import { mockRecipes } from './mockRecipes';
import { mockIngredients } from './mockIngredients';
import { mockMaterials } from './mockMaterials';

const createProductionJobIngredient = (
  ingredientId: string,
  requiredQuantity: number,
  requiredUnit: string,
  deducted: boolean = false
): ProductionJobIngredient => {
  const ingredient = mockIngredients.find(i => i.id === ingredientId);
  if (!ingredient) {
    throw new Error(`Ingredient ${ingredientId} not found`);
  }

  const totalCost = ingredient.costPerUnit * requiredQuantity;

  return {
    id: `pji-${Math.random().toString(36).substr(2, 9)}`,
    ingredientId: ingredient.id,
    ingredientName: ingredient.name,
    category: ingredient.category,
    requiredQuantity,
    requiredUnit,
    costPerUnit: ingredient.costPerUnit,
    totalCost,
    currentStock: ingredient.quantityOnHand,
    isAvailable: ingredient.quantityOnHand >= requiredQuantity,
    isLowStock: ingredient.quantityOnHand <= (ingredient.reorderLevel || 0),
    lotNumber: ingredient.lotNumber,
    expirationDate: ingredient.expirationDate,
    deductedFromInventory: deducted,
    deductedAt: deducted ? new Date().toISOString() : undefined,
    deductedBy: deducted ? 'admin' : undefined,
  };
};

const createProductionJobMaterial = (
  materialId: string,
  requiredQuantity: number,
  deducted: boolean = false
): ProductionJobMaterial => {
  const material = mockMaterials.find(m => m.id === materialId);
  if (!material) {
    throw new Error(`Material ${materialId} not found`);
  }

  const totalCost = material.costPerItem * requiredQuantity;

  return {
    id: `pjm-${Math.random().toString(36).substr(2, 9)}`,
    materialId: material.id,
    materialName: material.name,
    category: material.category,
    requiredQuantity,
    costPerItem: material.costPerItem,
    totalCost,
    currentStock: material.totalItemsAvailable,
    isAvailable: material.totalItemsAvailable >= requiredQuantity,
    isLowStock: material.inventoryQuantity <= material.reorderLevel,
    deductedFromInventory: deducted,
    deductedAt: deducted ? new Date().toISOString() : undefined,
    deductedBy: deducted ? 'admin' : undefined,
  };
};

export const mockProductionJobs: ProductionJob[] = [
  {
    id: 'pj-001',
    jobNumber: 'PJ-2024-001',
    recipeId: 'recipe-014',
    recipeName: 'Vanilla Cake',
    recipeCategory: 'cake',
    quantityToProduce: 3,
    unit: 'cakes',
    status: 'completed',
    priority: 'high',
    jobType: 'external',
    scheduledDate: '2024-10-25',
    scheduledStartTime: '08:00',
    actualStartTime: '2024-10-25T08:15:00Z',
    actualEndTime: '2024-10-25T11:45:00Z',
    assignedStaffId: 'staff-001',
    assignedStaffName: 'Maria Garcia',
    linkedOrderId: 'order-001',
    linkedOrderNumber: 'ORD-1001',
    customerName: 'Sarah Johnson',
    orderDueDate: '2024-10-26',
    totalIngredientCost: 13.68,
    totalMaterialCost: 12.85,
    totalCost: 26.53,
    ingredients: [
      createProductionJobIngredient('ing-001', 6, 'lb', true),
      createProductionJobIngredient('ing-005', 4.5, 'lb', true),
      createProductionJobIngredient('ing-009', 3, 'lb', true),
    ],
    materials: [
      createProductionJobMaterial('2', 3, true),
      createProductionJobMaterial('10', 3, true),
    ],
    batchNumber: 'BATCH-2024-1025-001',
    yieldQuantity: 72,
    wasteQuantity: 2,
    wastePercentage: 2.7,
    notes: 'Wedding order - white vanilla cake with buttercream',
    qualityNotes: 'Excellent texture, proper rise',
    createdAt: '2024-10-24T14:30:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-25T11:45:00Z',
    updatedBy: 'staff-001',
    completedAt: '2024-10-25T11:45:00Z',
  },
  {
    id: 'pj-002',
    jobNumber: 'PJ-2024-002',
    recipeId: 'recipe-003',
    recipeName: 'Basic Buttercream',
    recipeCategory: 'frosting',
    quantityToProduce: 5,
    unit: 'batches',
    status: 'completed',
    priority: 'medium',
    jobType: 'internal',
    scheduledDate: '2024-10-26',
    scheduledStartTime: '09:00',
    actualStartTime: '2024-10-26T09:10:00Z',
    actualEndTime: '2024-10-26T10:30:00Z',
    assignedStaffId: 'staff-002',
    assignedStaffName: 'John Smith',
    totalIngredientCost: 37.20,
    totalMaterialCost: 0,
    totalCost: 37.20,
    ingredients: [
      createProductionJobIngredient('ing-009', 12.5, 'lb', true),
      createProductionJobIngredient('ing-006', 15, 'lb', true),
      createProductionJobIngredient('ing-020', 2, 'oz', true),
    ],
    materials: [],
    batchNumber: 'BATCH-2024-1026-001',
    yieldQuantity: 120,
    wasteQuantity: 1,
    wastePercentage: 0.8,
    notes: 'Stock production for upcoming orders',
    qualityNotes: 'Perfect consistency',
    createdAt: '2024-10-25T16:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-26T10:30:00Z',
    updatedBy: 'staff-002',
    completedAt: '2024-10-26T10:30:00Z',
  },
  {
    id: 'pj-003',
    jobNumber: 'PJ-2024-003',
    recipeId: 'recipe-032',
    recipeName: 'Vanilla Cupcake',
    recipeCategory: 'dessert',
    quantityToProduce: 48,
    unit: 'cupcakes',
    status: 'in_progress',
    priority: 'high',
    jobType: 'external',
    scheduledDate: '2024-10-28',
    scheduledStartTime: '07:00',
    actualStartTime: '2024-10-28T07:05:00Z',
    assignedStaffId: 'staff-001',
    assignedStaffName: 'Maria Garcia',
    linkedOrderId: 'order-003',
    linkedOrderNumber: 'ORD-1003',
    customerName: 'Michael Chen',
    orderDueDate: '2024-10-28',
    totalIngredientCost: 8.64,
    totalMaterialCost: 2.80,
    totalCost: 11.44,
    ingredients: [
      createProductionJobIngredient('ing-001', 2, 'lb', true),
      createProductionJobIngredient('ing-005', 1.5, 'lb', true),
      createProductionJobIngredient('ing-013', 8, 'piece', true),
      createProductionJobIngredient('ing-015', 0.5, 'gal', true),
    ],
    materials: [
      createProductionJobMaterial('25', 4, true),
    ],
    notes: 'Birthday party order - needs to be ready by 2pm',
    createdAt: '2024-10-27T10:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-28T07:05:00Z',
    updatedBy: 'staff-001',
  },
  {
    id: 'pj-004',
    jobNumber: 'PJ-2024-004',
    recipeId: 'recipe-017',
    recipeName: 'Chocolate Cupcakes',
    recipeCategory: 'dessert',
    quantityToProduce: 24,
    unit: 'cupcakes',
    status: 'queued',
    priority: 'medium',
    jobType: 'external',
    scheduledDate: '2024-10-29',
    scheduledStartTime: '08:00',
    assignedStaffId: 'staff-003',
    assignedStaffName: 'Emily Rodriguez',
    linkedOrderId: 'order-005',
    linkedOrderNumber: 'ORD-1005',
    customerName: 'Jennifer White',
    orderDueDate: '2024-10-30',
    totalIngredientCost: 6.00,
    totalMaterialCost: 2.54,
    totalCost: 8.54,
    ingredients: [
      createProductionJobIngredient('ing-001', 1.5, 'lb'),
      createProductionJobIngredient('ing-023', 0.5, 'lb'),
      createProductionJobIngredient('ing-005', 1, 'lb'),
      createProductionJobIngredient('ing-013', 6, 'piece'),
    ],
    materials: [
      createProductionJobMaterial('25', 2),
    ],
    notes: 'Office party order',
    createdAt: '2024-10-27T14:30:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-27T14:30:00Z',
  },
  {
    id: 'pj-005',
    jobNumber: 'PJ-2024-005',
    recipeId: 'recipe-004',
    recipeName: 'Red Velvet Cupcakes',
    recipeCategory: 'dessert',
    quantityToProduce: 36,
    unit: 'cupcakes',
    status: 'queued',
    priority: 'high',
    jobType: 'external',
    scheduledDate: '2024-10-29',
    scheduledStartTime: '06:00',
    assignedStaffId: 'staff-001',
    assignedStaffName: 'Maria Garcia',
    linkedOrderId: 'order-007',
    linkedOrderNumber: 'ORD-1007',
    customerName: 'David Martinez',
    orderDueDate: '2024-10-29',
    totalIngredientCost: 9.36,
    totalMaterialCost: 3.81,
    totalCost: 13.17,
    ingredients: [
      createProductionJobIngredient('ing-001', 2, 'lb'),
      createProductionJobIngredient('ing-005', 1.5, 'lb'),
      createProductionJobIngredient('ing-023', 0.3, 'lb'),
      createProductionJobIngredient('ing-019', 0.3, 'gal'),
    ],
    materials: [
      createProductionJobMaterial('25', 3),
    ],
    notes: 'RUSH ORDER - Wedding anniversary, customer picking up at 3pm',
    createdAt: '2024-10-28T08:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-28T08:00:00Z',
  },
  {
    id: 'pj-006',
    jobNumber: 'PJ-2024-006',
    recipeId: 'recipe-027',
    recipeName: 'Chocolate Buttercream',
    recipeCategory: 'frosting',
    quantityToProduce: 2,
    unit: 'batches',
    status: 'in_progress',
    priority: 'medium',
    jobType: 'internal',
    scheduledDate: '2024-10-28',
    scheduledStartTime: '10:00',
    actualStartTime: '2024-10-28T10:15:00Z',
    assignedStaffId: 'staff-002',
    assignedStaffName: 'John Smith',
    totalIngredientCost: 8.16,
    totalMaterialCost: 0,
    totalCost: 8.16,
    ingredients: [
      createProductionJobIngredient('ing-009', 4, 'lb', true),
      createProductionJobIngredient('ing-006', 5, 'lb', true),
      createProductionJobIngredient('ing-023', 0.8, 'lb', true),
    ],
    materials: [],
    notes: 'For tomorrow\'s chocolate cupcake orders',
    createdAt: '2024-10-28T09:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-28T10:15:00Z',
    updatedBy: 'staff-002',
  },
  {
    id: 'pj-007',
    jobNumber: 'PJ-2024-007',
    recipeId: 'recipe-055',
    recipeName: 'Carrot Cake',
    recipeCategory: 'cake',
    quantityToProduce: 2,
    unit: 'cakes',
    status: 'completed',
    priority: 'medium',
    jobType: 'external',
    scheduledDate: '2024-10-27',
    scheduledStartTime: '09:00',
    actualStartTime: '2024-10-27T09:20:00Z',
    actualEndTime: '2024-10-27T12:10:00Z',
    assignedStaffId: 'staff-003',
    assignedStaffName: 'Emily Rodriguez',
    linkedOrderId: 'order-002',
    linkedOrderNumber: 'ORD-1002',
    customerName: 'Robert Anderson',
    orderDueDate: '2024-10-28',
    totalIngredientCost: 18.00,
    totalMaterialCost: 7.40,
    totalCost: 25.40,
    ingredients: [
      createProductionJobIngredient('ing-001', 3, 'lb', true),
      createProductionJobIngredient('ing-005', 2, 'lb', true),
      createProductionJobIngredient('ing-013', 8, 'piece', true),
      createProductionJobIngredient('ing-032', 1, 'lb', true),
    ],
    materials: [
      createProductionJobMaterial('2', 2, true),
      createProductionJobMaterial('10', 2, true),
    ],
    batchNumber: 'BATCH-2024-1027-001',
    yieldQuantity: 50,
    wasteQuantity: 1,
    wastePercentage: 2.0,
    notes: 'Customer requested extra walnuts',
    qualityNotes: 'Moist texture, great flavor',
    createdAt: '2024-10-26T15:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-27T12:10:00Z',
    updatedBy: 'staff-003',
    completedAt: '2024-10-27T12:10:00Z',
  },
  {
    id: 'pj-008',
    jobNumber: 'PJ-2024-008',
    recipeId: 'recipe-006',
    recipeName: 'Cut-Out Cookies',
    recipeCategory: 'cookie',
    quantityToProduce: 72,
    unit: 'cookies',
    status: 'queued',
    priority: 'medium',
    jobType: 'external',
    scheduledDate: '2024-10-30',
    scheduledStartTime: '07:00',
    assignedStaffId: 'staff-003',
    assignedStaffName: 'Emily Rodriguez',
    linkedOrderId: 'order-008',
    linkedOrderNumber: 'ORD-1008',
    customerName: 'Lisa Thompson',
    orderDueDate: '2024-10-31',
    totalIngredientCost: 6.48,
    totalMaterialCost: 0.88,
    totalCost: 7.36,
    ingredients: [
      createProductionJobIngredient('ing-001', 2, 'lb'),
      createProductionJobIngredient('ing-005', 1, 'lb'),
      createProductionJobIngredient('ing-009', 1, 'lb'),
      createProductionJobIngredient('ing-013', 4, 'piece'),
    ],
    materials: [
      createProductionJobMaterial('57', 6),
    ],
    notes: 'Halloween themed cookies - customer will decorate at home',
    createdAt: '2024-10-28T11:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-28T11:00:00Z',
  },
  {
    id: 'pj-009',
    jobNumber: 'PJ-2024-009',
    recipeId: 'recipe-049',
    recipeName: 'Red Velvet Cake',
    recipeCategory: 'cake',
    quantityToProduce: 1,
    unit: 'cake',
    status: 'on_hold',
    priority: 'low',
    jobType: 'external',
    scheduledDate: '2024-10-31',
    scheduledStartTime: '10:00',
    assignedStaffId: 'staff-002',
    assignedStaffName: 'John Smith',
    linkedOrderId: 'order-010',
    linkedOrderNumber: 'ORD-1010',
    customerName: 'Patricia Williams',
    orderDueDate: '2024-11-01',
    totalIngredientCost: 4.32,
    totalMaterialCost: 5.40,
    totalCost: 9.72,
    ingredients: [
      createProductionJobIngredient('ing-001', 1.5, 'lb'),
      createProductionJobIngredient('ing-005', 1, 'lb'),
      createProductionJobIngredient('ing-023', 0.2, 'lb'),
      createProductionJobIngredient('ing-019', 0.2, 'gal'),
    ],
    materials: [
      createProductionJobMaterial('2', 1),
      createProductionJobMaterial('10', 1),
    ],
    notes: 'On hold - customer requested to postpone delivery',
    createdAt: '2024-10-28T13:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-28T15:30:00Z',
    updatedBy: 'admin',
  },
  {
    id: 'pj-010',
    jobNumber: 'PJ-2024-010',
    recipeId: 'recipe-067',
    recipeName: 'Chocolate Chunk Cookies',
    recipeCategory: 'cookie',
    quantityToProduce: 48,
    unit: 'cookies',
    status: 'completed',
    priority: 'medium',
    jobType: 'external',
    scheduledDate: '2024-10-26',
    scheduledStartTime: '13:00',
    actualStartTime: '2024-10-26T13:15:00Z',
    actualEndTime: '2024-10-26T15:00:00Z',
    assignedStaffId: 'staff-003',
    assignedStaffName: 'Emily Rodriguez',
    totalIngredientCost: 6.24,
    totalMaterialCost: 1.44,
    totalCost: 7.68,
    ingredients: [
      createProductionJobIngredient('ing-001', 2, 'lb', true),
      createProductionJobIngredient('ing-007', 0.5, 'lb', true),
      createProductionJobIngredient('ing-024', 0.5, 'lb', true),
      createProductionJobIngredient('ing-009', 0.5, 'lb', true),
    ],
    materials: [
      createProductionJobMaterial('57', 12),
    ],
    batchNumber: 'BATCH-2024-1026-002',
    yieldQuantity: 48,
    wasteQuantity: 0,
    wastePercentage: 0,
    notes: 'Stock production - retail display',
    qualityNotes: 'Perfect texture and chips distribution',
    createdAt: '2024-10-26T10:00:00Z',
    createdBy: 'admin',
    updatedAt: '2024-10-26T15:00:00Z',
    updatedBy: 'staff-003',
    completedAt: '2024-10-26T15:00:00Z',
  },
];

export const mockProductionBatches: ProductionBatch[] = [
  {
    id: 'pb-001',
    batchNumber: 'BATCH-2024-1025-001',
    productionJobId: 'pj-001',
    recipeId: 'recipe-014',
    recipeName: 'Vanilla Cake',
    quantityProduced: 72,
    unit: 'servings',
    productionDate: '2024-10-25',
    expirationDate: '2024-10-29',
    ingredientsUsed: [
      {
        ingredientId: 'ing-001',
        ingredientName: 'All-Purpose Flour',
        lotNumber: 'LOT-2024-001',
        quantityUsed: 6,
        unit: 'lb',
        expirationDate: '2025-01-10',
      },
      {
        ingredientId: 'ing-005',
        ingredientName: 'Granulated Sugar',
        lotNumber: 'LOT-2024-005',
        quantityUsed: 4.5,
        unit: 'lb',
      },
      {
        ingredientId: 'ing-009',
        ingredientName: 'Unsalted Butter',
        lotNumber: 'LOT-2024-009',
        quantityUsed: 3,
        unit: 'lb',
        expirationDate: '2024-02-14',
      },
    ],
    qualityCheckPassed: true,
    qualityNotes: 'Excellent quality, proper rise and texture',
    assignedToOrderId: 'order-001',
    createdAt: '2024-10-25T11:45:00Z',
    createdBy: 'staff-001',
  },
  {
    id: 'pb-002',
    batchNumber: 'BATCH-2024-1026-001',
    productionJobId: 'pj-002',
    recipeId: 'recipe-003',
    recipeName: 'Basic Buttercream',
    quantityProduced: 120,
    unit: 'servings',
    productionDate: '2024-10-26',
    expirationDate: '2024-11-02',
    ingredientsUsed: [
      {
        ingredientId: 'ing-009',
        ingredientName: 'Unsalted Butter',
        lotNumber: 'LOT-2024-009',
        quantityUsed: 12.5,
        unit: 'lb',
        expirationDate: '2024-02-14',
      },
      {
        ingredientId: 'ing-006',
        ingredientName: 'Powdered Sugar',
        lotNumber: 'LOT-2024-006',
        quantityUsed: 15,
        unit: 'lb',
      },
      {
        ingredientId: 'ing-020',
        ingredientName: 'Pure Vanilla Extract',
        lotNumber: 'LOT-2024-020',
        quantityUsed: 2,
        unit: 'oz',
        expirationDate: '2026-01-05',
      },
    ],
    qualityCheckPassed: true,
    qualityNotes: 'Perfect consistency and flavor',
    createdAt: '2024-10-26T10:30:00Z',
    createdBy: 'staff-002',
  },
  {
    id: 'pb-003',
    batchNumber: 'BATCH-2024-1027-001',
    productionJobId: 'pj-007',
    recipeId: 'recipe-055',
    recipeName: 'Carrot Cake',
    quantityProduced: 50,
    unit: 'servings',
    productionDate: '2024-10-27',
    expirationDate: '2024-10-31',
    ingredientsUsed: [
      {
        ingredientId: 'ing-001',
        ingredientName: 'All-Purpose Flour',
        lotNumber: 'LOT-2024-001',
        quantityUsed: 3,
        unit: 'lb',
        expirationDate: '2025-01-10',
      },
      {
        ingredientId: 'ing-005',
        ingredientName: 'Granulated Sugar',
        lotNumber: 'LOT-2024-005',
        quantityUsed: 2,
        unit: 'lb',
      },
      {
        ingredientId: 'ing-032',
        ingredientName: 'Chopped Walnuts',
        lotNumber: 'LOT-2024-032',
        quantityUsed: 1,
        unit: 'lb',
      },
    ],
    qualityCheckPassed: true,
    qualityNotes: 'Moist texture, excellent flavor profile',
    assignedToOrderId: 'order-002',
    createdAt: '2024-10-27T12:10:00Z',
    createdBy: 'staff-003',
  },
  {
    id: 'pb-004',
    batchNumber: 'BATCH-2024-1026-002',
    productionJobId: 'pj-010',
    recipeId: 'recipe-067',
    recipeName: 'Chocolate Chunk Cookies',
    quantityProduced: 48,
    unit: 'cookies',
    productionDate: '2024-10-26',
    expirationDate: '2024-11-09',
    ingredientsUsed: [
      {
        ingredientId: 'ing-001',
        ingredientName: 'All-Purpose Flour',
        lotNumber: 'LOT-2024-001',
        quantityUsed: 2,
        unit: 'lb',
        expirationDate: '2025-01-10',
      },
      {
        ingredientId: 'ing-007',
        ingredientName: 'Light Brown Sugar',
        lotNumber: 'LOT-2024-007',
        quantityUsed: 0.5,
        unit: 'lb',
      },
      {
        ingredientId: 'ing-024',
        ingredientName: 'Dark Chocolate Chips (60%)',
        lotNumber: 'LOT-2024-024',
        quantityUsed: 0.5,
        unit: 'lb',
        expirationDate: '2025-07-11',
      },
    ],
    qualityCheckPassed: true,
    qualityNotes: 'Perfect bake, excellent chocolate distribution',
    createdAt: '2024-10-26T15:00:00Z',
    createdBy: 'staff-003',
  },
];

export function getProductionJobById(id: string): ProductionJob | undefined {
  return mockProductionJobs.find(job => job.id === id);
}

export function getProductionJobsByStatus(status: string): ProductionJob[] {
  if (status === 'all') return mockProductionJobs;
  return mockProductionJobs.filter(job => job.status === status);
}

export function getProductionJobsByDateRange(startDate: string, endDate: string): ProductionJob[] {
  return mockProductionJobs.filter(job => {
    const jobDate = job.scheduledDate;
    return jobDate >= startDate && jobDate <= endDate;
  });
}

export function getProductionJobsByStaff(staffId: string): ProductionJob[] {
  return mockProductionJobs.filter(job => job.assignedStaffId === staffId);
}

export function getProductionJobsByPriority(priority: string): ProductionJob[] {
  return mockProductionJobs.filter(job => job.priority === priority);
}

export function getProductionJobsByOrder(orderId: string): ProductionJob[] {
  return mockProductionJobs.filter(job => job.linkedOrderId === orderId);
}

export function getProductionBatchByNumber(batchNumber: string): ProductionBatch | undefined {
  return mockProductionBatches.find(batch => batch.batchNumber === batchNumber);
}

export function getProductionBatchesByRecipe(recipeId: string): ProductionBatch[] {
  return mockProductionBatches.filter(batch => batch.recipeId === recipeId);
}

export function searchProductionJobs(searchTerm: string): ProductionJob[] {
  const term = searchTerm.toLowerCase();
  return mockProductionJobs.filter(
    job =>
      job.jobNumber.toLowerCase().includes(term) ||
      job.recipeName.toLowerCase().includes(term) ||
      job.customerName?.toLowerCase().includes(term) ||
      job.linkedOrderNumber?.toLowerCase().includes(term) ||
      job.batchNumber?.toLowerCase().includes(term)
  );
}

export function getUpcomingProductionJobs(): ProductionJob[] {
  const today = new Date().toISOString().split('T')[0];
  return mockProductionJobs
    .filter(job => job.scheduledDate >= today && (job.status === 'queued' || job.status === 'in_progress'))
    .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate));
}

export function getOverdueProductionJobs(): ProductionJob[] {
  const today = new Date().toISOString().split('T')[0];
  return mockProductionJobs.filter(
    job =>
      job.orderDueDate &&
      job.orderDueDate < today &&
      job.status !== 'completed' &&
      job.status !== 'cancelled'
  );
}

export function calculateTotalProductionCost(jobs: ProductionJob[] = mockProductionJobs): number {
  return jobs.reduce((sum, job) => sum + job.totalCost, 0);
}

export function getProductionStatsByStatus() {
  return {
    queued: mockProductionJobs.filter(j => j.status === 'queued').length,
    inProgress: mockProductionJobs.filter(j => j.status === 'in_progress').length,
    completed: mockProductionJobs.filter(j => j.status === 'completed').length,
    cancelled: mockProductionJobs.filter(j => j.status === 'cancelled').length,
    onHold: mockProductionJobs.filter(j => j.status === 'on_hold').length,
  };
}
