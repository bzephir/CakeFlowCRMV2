import type { Package, PackageCategory } from '../types/package';

export const mockPackages: Package[] = [
  {
    id: 'pkg-001',
    name: '8" Vanilla Birthday Cake',
    description: 'Classic 8-inch vanilla cake with buttercream frosting, perfect for small birthday celebrations',
    category: 'cakes',
    status: 'active',
    servings: 12,
    totalCost: 18.42,
    basePrice: 45.00,
    sellingPrice: 55.00,
    profitMargin: 198.59,
    laborCost: 0,
    timesOrdered: 47,
    lastOrdered: '2024-09-28T14:30:00Z',
    isTemplate: true,
    notes: 'Most popular birthday cake package',
    createdBy: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-09-28T14:30:00Z',
    recipes: [
      {
        id: 'pkgr-001',
        packageId: 'pkg-001',
        recipeId: 'recipe-014',
        recipeName: 'Vanilla Cake',
        quantityMultiplier: 1,
        costContribution: 4.56,
        sortOrder: 0
      },
      {
        id: 'pkgr-002',
        packageId: 'pkg-001',
        recipeId: 'recipe-003',
        recipeName: 'Basic Buttercream',
        quantityMultiplier: 0.5,
        costContribution: 3.72,
        sortOrder: 1
      }
    ],
    materials: [
      {
        id: 'pkgm-001',
        packageId: 'pkg-001',
        materialId: '2',
        materialName: '8" Round Cake Board',
        quantity: 1,
        costPerItem: 0.36,
        totalCost: 0.36,
        sortOrder: 0
      },
      {
        id: 'pkgm-002',
        packageId: 'pkg-001',
        materialId: '10',
        materialName: '8" Round White Cake Box',
        quantity: 1,
        costPerItem: 1.50,
        totalCost: 1.50,
        sortOrder: 1
      },
      {
        id: 'pkgm-003',
        packageId: 'pkg-001',
        materialId: '35',
        materialName: 'Birthday Candles (pack of 24)',
        quantity: 1,
        costPerItem: 0.17,
        totalCost: 0.17,
        sortOrder: 2
      }
    ]
  },
  {
    id: 'pkg-002',
    name: 'Dozen Vanilla Cupcakes',
    description: 'One dozen vanilla cupcakes with buttercream frosting and sprinkles',
    category: 'cupcakes',
    status: 'active',
    servings: 12,
    totalCost: 5.72,
    basePrice: 18.00,
    sellingPrice: 24.00,
    profitMargin: 319.58,
    laborCost: 0,
    timesOrdered: 89,
    lastOrdered: '2024-10-02T10:15:00Z',
    isTemplate: true,
    createdBy: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-10-02T10:15:00Z',
    recipes: [
      {
        id: 'pkgr-003',
        packageId: 'pkg-002',
        recipeId: 'recipe-032',
        recipeName: 'Vanilla Cupcake',
        quantityMultiplier: 0.5,
        costContribution: 2.16,
        sortOrder: 0
      },
      {
        id: 'pkgr-004',
        packageId: 'pkg-002',
        recipeId: 'recipe-003',
        recipeName: 'Basic Buttercream',
        quantityMultiplier: 0.5,
        costContribution: 3.72,
        sortOrder: 1
      }
    ],
    materials: [
      {
        id: 'pkgm-004',
        packageId: 'pkg-002',
        materialId: '25',
        materialName: 'Standard Cupcake Box (holds 12)',
        quantity: 1,
        costPerItem: 1.27,
        totalCost: 1.27,
        sortOrder: 0
      },
      {
        id: 'pkgm-005',
        packageId: 'pkg-002',
        materialId: '29',
        materialName: 'Rainbow Sprinkles (10 oz jar)',
        quantity: 0.15,
        costPerItem: 4.99,
        totalCost: 0.75,
        notes: 'Estimated usage per dozen',
        sortOrder: 1
      }
    ]
  },
  {
    id: 'pkg-003',
    name: '10" Red Velvet Celebration Cake',
    description: 'Elegant 10-inch red velvet cake with cream cheese frosting',
    category: 'cakes',
    status: 'active',
    servings: 20,
    totalCost: 23.67,
    basePrice: 65.00,
    sellingPrice: 75.00,
    profitMargin: 216.86,
    laborCost: 5.00,
    timesOrdered: 32,
    lastOrdered: '2024-09-25T16:45:00Z',
    isTemplate: false,
    createdBy: 'admin',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-09-25T16:45:00Z',
    recipes: [
      {
        id: 'pkgr-005',
        packageId: 'pkg-003',
        recipeId: 'recipe-049',
        recipeName: 'Red Velvet Cake',
        quantityMultiplier: 1.25,
        costContribution: 5.40,
        notes: 'Scaled for 10-inch size',
        sortOrder: 0
      },
      {
        id: 'pkgr-006',
        packageId: 'pkg-003',
        recipeId: 'recipe-010',
        recipeName: 'Cream Cheese Icing',
        quantityMultiplier: 1,
        costContribution: 4.25,
        sortOrder: 1
      }
    ],
    materials: [
      {
        id: 'pkgm-006',
        packageId: 'pkg-003',
        materialId: '3',
        materialName: '10" Round Cake Board',
        quantity: 1,
        costPerItem: 0.50,
        totalCost: 0.50,
        sortOrder: 0
      },
      {
        id: 'pkgm-007',
        packageId: 'pkg-003',
        materialId: '11',
        materialName: '10" Round White Cake Box',
        quantity: 1,
        costPerItem: 1.90,
        totalCost: 1.90,
        sortOrder: 1
      },
      {
        id: 'pkgm-008',
        packageId: 'pkg-003',
        materialId: '18',
        materialName: '10" Round Cake Drum (Silver)',
        quantity: 1,
        costPerItem: 3.00,
        totalCost: 3.00,
        sortOrder: 2
      }
    ]
  },
  {
    id: 'pkg-004',
    name: 'Cookie Dozen - Cut-Out Cookies',
    description: 'Dozen decorated cut-out sugar cookies with royal icing',
    category: 'cookies',
    status: 'active',
    servings: 12,
    totalCost: 2.30,
    basePrice: 12.00,
    sellingPrice: 18.00,
    profitMargin: 682.61,
    laborCost: 8.00,
    timesOrdered: 64,
    lastOrdered: '2024-10-01T09:20:00Z',
    isTemplate: true,
    notes: 'Labor-intensive decorating included in labor cost',
    createdBy: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-10-01T09:20:00Z',
    recipes: [
      {
        id: 'pkgr-007',
        packageId: 'pkg-004',
        recipeId: 'recipe-006',
        recipeName: 'Cut-Out Cookies',
        quantityMultiplier: 0.33,
        costContribution: 1.07,
        notes: '12 cookies from 36-cookie batch',
        sortOrder: 0
      },
      {
        id: 'pkgr-008',
        packageId: 'pkg-004',
        recipeId: 'recipe-007',
        recipeName: 'Cut-Out Cookies Icing',
        quantityMultiplier: 0.33,
        costContribution: 0.12,
        sortOrder: 1
      }
    ],
    materials: [
      {
        id: 'pkgm-009',
        packageId: 'pkg-004',
        materialId: '57',
        materialName: 'Clear Plastic Bags (6" x 9")',
        quantity: 12,
        costPerItem: 0.08,
        totalCost: 0.96,
        sortOrder: 0
      },
      {
        id: 'pkgm-010',
        packageId: 'pkg-004',
        materialId: '46',
        materialName: 'Ribbon Spool - Satin (50 yards)',
        quantity: 0.15,
        costPerItem: 6.99,
        totalCost: 1.05,
        notes: 'Estimated ribbon usage',
        sortOrder: 1
      }
    ]
  },
  {
    id: 'pkg-005',
    name: 'Chocolate Cupcake Six-Pack',
    description: 'Half dozen chocolate cupcakes with chocolate buttercream',
    category: 'cupcakes',
    status: 'active',
    servings: 6,
    totalCost: 3.42,
    basePrice: 12.00,
    sellingPrice: 14.00,
    profitMargin: 309.36,
    laborCost: 0,
    timesOrdered: 52,
    lastOrdered: '2024-09-30T13:10:00Z',
    isTemplate: false,
    createdBy: 'admin',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-09-30T13:10:00Z',
    recipes: [
      {
        id: 'pkgr-009',
        packageId: 'pkg-005',
        recipeId: 'recipe-017',
        recipeName: 'Chocolate Cupcakes',
        quantityMultiplier: 0.43,
        costContribution: 1.51,
        notes: '6 cupcakes from 14-cupcake batch',
        sortOrder: 0
      },
      {
        id: 'pkgr-010',
        packageId: 'pkg-005',
        recipeId: 'recipe-027',
        recipeName: 'Chocolate Buttercream',
        quantityMultiplier: 0.25,
        costContribution: 1.02,
        sortOrder: 1
      }
    ],
    materials: [
      {
        id: 'pkgm-011',
        packageId: 'pkg-005',
        materialId: '24',
        materialName: 'Standard Cupcake Box (holds 6)',
        quantity: 1,
        costPerItem: 0.80,
        totalCost: 0.80,
        sortOrder: 0
      }
    ]
  },
  {
    id: 'pkg-006',
    name: '6" Lemon Layer Cake',
    description: 'Small 6-inch lemon cake with lemon buttercream, perfect for intimate celebrations',
    category: 'cakes',
    status: 'active',
    servings: 8,
    totalCost: 12.78,
    basePrice: 30.00,
    sellingPrice: 38.00,
    profitMargin: 197.34,
    laborCost: 0,
    timesOrdered: 28,
    lastOrdered: '2024-09-22T11:30:00Z',
    isTemplate: false,
    createdBy: 'admin',
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-09-22T11:30:00Z',
    recipes: [
      {
        id: 'pkgr-011',
        packageId: 'pkg-006',
        recipeId: 'recipe-002',
        recipeName: 'Lemon Cake',
        quantityMultiplier: 0.6,
        costContribution: 6.00,
        notes: 'Scaled for 6-inch size',
        sortOrder: 0
      },
      {
        id: 'pkgr-012',
        packageId: 'pkg-006',
        recipeId: 'recipe-016',
        recipeName: 'Lemon Buttercream',
        quantityMultiplier: 0.6,
        costContribution: 2.40,
        sortOrder: 1
      }
    ],
    materials: [
      {
        id: 'pkgm-012',
        packageId: 'pkg-006',
        materialId: '1',
        materialName: '6" Round Cake Board',
        quantity: 1,
        costPerItem: 0.28,
        totalCost: 0.28,
        sortOrder: 0
      },
      {
        id: 'pkgm-013',
        packageId: 'pkg-006',
        materialId: '9',
        materialName: '6" Round White Cake Box',
        quantity: 1,
        costPerItem: 1.30,
        totalCost: 1.30,
        sortOrder: 1
      }
    ]
  },
  {
    id: 'pkg-007',
    name: 'Wedding Tier Sample Box',
    description: 'Four cupcakes with different flavors for wedding cake tasting',
    category: 'cupcakes',
    status: 'active',
    servings: 4,
    totalCost: 4.86,
    basePrice: 15.00,
    sellingPrice: 20.00,
    profitMargin: 311.52,
    laborCost: 0,
    timesOrdered: 18,
    lastOrdered: '2024-09-18T14:00:00Z',
    isTemplate: false,
    notes: 'Includes vanilla, chocolate, lemon, and red velvet',
    createdBy: 'admin',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-09-18T14:00:00Z',
    recipes: [
      {
        id: 'pkgr-013',
        packageId: 'pkg-007',
        recipeId: 'recipe-032',
        recipeName: 'Vanilla Cupcake',
        quantityMultiplier: 0.04,
        costContribution: 0.17,
        notes: '1 cupcake',
        sortOrder: 0
      },
      {
        id: 'pkgr-014',
        packageId: 'pkg-007',
        recipeId: 'recipe-017',
        recipeName: 'Chocolate Cupcakes',
        quantityMultiplier: 0.07,
        costContribution: 0.25,
        notes: '1 cupcake',
        sortOrder: 1
      },
      {
        id: 'pkgr-015',
        packageId: 'pkg-007',
        recipeId: 'recipe-085',
        recipeName: 'Lemon Cupcake',
        quantityMultiplier: 0.04,
        costContribution: 0.21,
        notes: '1 cupcake',
        sortOrder: 2
      },
      {
        id: 'pkgr-016',
        packageId: 'pkg-007',
        recipeId: 'recipe-004',
        recipeName: 'Red Velvet Cupcakes',
        quantityMultiplier: 0.06,
        costContribution: 0.28,
        notes: '1 cupcake',
        sortOrder: 3
      },
      {
        id: 'pkgr-017',
        packageId: 'pkg-007',
        recipeId: 'recipe-003',
        recipeName: 'Basic Buttercream',
        quantityMultiplier: 0.17,
        costContribution: 1.26,
        notes: 'Mixed frosting for 4 cupcakes',
        sortOrder: 4
      }
    ],
    materials: [
      {
        id: 'pkgm-014',
        packageId: 'pkg-007',
        materialId: '26',
        materialName: 'Window Cupcake Box (holds 4)',
        quantity: 1,
        costPerItem: 0.68,
        totalCost: 0.68,
        sortOrder: 0
      }
    ]
  },
  {
    id: 'pkg-008',
    name: 'Birthday Party Box - Serves 20',
    description: 'Complete party package with cake and cupcakes',
    category: 'party-packages',
    status: 'active',
    servings: 20,
    totalCost: 32.84,
    basePrice: 85.00,
    sellingPrice: 95.00,
    profitMargin: 189.29,
    laborCost: 10.00,
    timesOrdered: 15,
    lastOrdered: '2024-09-15T10:30:00Z',
    isTemplate: true,
    notes: 'Includes 8" cake plus 12 cupcakes',
    createdBy: 'admin',
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-09-15T10:30:00Z',
    recipes: [
      {
        id: 'pkgr-018',
        packageId: 'pkg-008',
        recipeId: 'recipe-014',
        recipeName: 'Vanilla Cake',
        quantityMultiplier: 1,
        costContribution: 4.56,
        sortOrder: 0
      },
      {
        id: 'pkgr-019',
        packageId: 'pkg-008',
        recipeId: 'recipe-032',
        recipeName: 'Vanilla Cupcake',
        quantityMultiplier: 0.5,
        costContribution: 2.16,
        notes: '12 cupcakes',
        sortOrder: 1
      },
      {
        id: 'pkgr-020',
        packageId: 'pkg-008',
        recipeId: 'recipe-003',
        recipeName: 'Basic Buttercream',
        quantityMultiplier: 1.5,
        costContribution: 11.16,
        notes: 'Frosting for cake and cupcakes',
        sortOrder: 2
      }
    ],
    materials: [
      {
        id: 'pkgm-015',
        packageId: 'pkg-008',
        materialId: '2',
        materialName: '8" Round Cake Board',
        quantity: 1,
        costPerItem: 0.36,
        totalCost: 0.36,
        sortOrder: 0
      },
      {
        id: 'pkgm-016',
        packageId: 'pkg-008',
        materialId: '10',
        materialName: '8" Round White Cake Box',
        quantity: 1,
        costPerItem: 1.50,
        totalCost: 1.50,
        sortOrder: 1
      },
      {
        id: 'pkgm-017',
        packageId: 'pkg-008',
        materialId: '25',
        materialName: 'Standard Cupcake Box (holds 12)',
        quantity: 1,
        costPerItem: 1.27,
        totalCost: 1.27,
        sortOrder: 2
      },
      {
        id: 'pkgm-018',
        packageId: 'pkg-008',
        materialId: '35',
        materialName: 'Birthday Candles (pack of 24)',
        quantity: 1,
        costPerItem: 0.17,
        totalCost: 0.17,
        sortOrder: 3
      },
      {
        id: 'pkgm-019',
        packageId: 'pkg-008',
        materialId: '29',
        materialName: 'Rainbow Sprinkles (10 oz jar)',
        quantity: 0.2,
        costPerItem: 4.99,
        totalCost: 1.00,
        notes: 'For cupcake decoration',
        sortOrder: 4
      }
    ]
  },
  {
    id: 'pkg-009',
    name: 'Gluten-Free Chocolate Cupcakes (6)',
    description: 'Half dozen gluten-free chocolate cupcakes with chocolate buttercream',
    category: 'cupcakes',
    status: 'active',
    servings: 6,
    totalCost: 4.52,
    basePrice: 16.00,
    sellingPrice: 20.00,
    profitMargin: 342.48,
    laborCost: 0,
    timesOrdered: 21,
    lastOrdered: '2024-09-20T15:45:00Z',
    isTemplate: false,
    notes: 'Higher cost due to specialty ingredients',
    createdBy: 'admin',
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-09-20T15:45:00Z',
    recipes: [
      {
        id: 'pkgr-021',
        packageId: 'pkg-009',
        recipeId: 'recipe-037',
        recipeName: 'Gluten Free Chocolate Cupcakes',
        quantityMultiplier: 0.43,
        costContribution: 1.69,
        notes: '6 cupcakes from 14-cupcake batch',
        sortOrder: 0
      },
      {
        id: 'pkgr-022',
        packageId: 'pkg-009',
        recipeId: 'recipe-027',
        recipeName: 'Chocolate Buttercream',
        quantityMultiplier: 0.25,
        costContribution: 1.02,
        sortOrder: 1
      }
    ],
    materials: [
      {
        id: 'pkgm-020',
        packageId: 'pkg-009',
        materialId: '24',
        materialName: 'Standard Cupcake Box (holds 6)',
        quantity: 1,
        costPerItem: 0.80,
        totalCost: 0.80,
        sortOrder: 0
      }
    ]
  },
  {
    id: 'pkg-010',
    name: 'Strawberry Shortcake Special',
    description: '8-inch strawberry cake with fresh strawberries and whipped cream',
    category: 'cakes',
    status: 'draft',
    servings: 12,
    totalCost: 21.65,
    basePrice: 0,
    sellingPrice: 0,
    profitMargin: 0,
    laborCost: 0,
    timesOrdered: 0,
    isTemplate: false,
    notes: 'Seasonal summer special - pricing TBD',
    createdBy: 'admin',
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z',
    recipes: [
      {
        id: 'pkgr-023',
        packageId: 'pkg-010',
        recipeId: 'recipe-028',
        recipeName: 'Strawberry Cake',
        quantityMultiplier: 0.8,
        costContribution: 7.00,
        notes: 'Scaled for 8-inch size',
        sortOrder: 0
      },
      {
        id: 'pkgr-024',
        packageId: 'pkg-010',
        recipeId: 'recipe-051',
        recipeName: 'Whipped Cream',
        quantityMultiplier: 0.5,
        costContribution: 1.56,
        sortOrder: 1
      },
      {
        id: 'pkgr-025',
        packageId: 'pkg-010',
        recipeId: 'recipe-052',
        recipeName: 'Fresh Strawberries',
        quantityMultiplier: 2,
        costContribution: 9.24,
        notes: 'Extra fresh strawberries for layers and topping',
        sortOrder: 2
      }
    ],
    materials: [
      {
        id: 'pkgm-021',
        packageId: 'pkg-010',
        materialId: '2',
        materialName: '8" Round Cake Board',
        quantity: 1,
        costPerItem: 0.36,
        totalCost: 0.36,
        sortOrder: 0
      },
      {
        id: 'pkgm-022',
        packageId: 'pkg-010',
        materialId: '10',
        materialName: '8" Round White Cake Box',
        quantity: 1,
        costPerItem: 1.50,
        totalCost: 1.50,
        sortOrder: 1
      }
    ]
  }
];

export function getPackageById(id: string): Package | undefined {
  return mockPackages.find(pkg => pkg.id === id);
}

export function getPackagesByCategory(category: PackageCategory | 'all'): Package[] {
  if (category === 'all') return mockPackages;
  return mockPackages.filter(pkg => pkg.category === category);
}

export function getPackagesByStatus(status: string): Package[] {
  if (status === 'all') return mockPackages;
  return mockPackages.filter(pkg => pkg.status === status);
}

export function searchPackages(searchTerm: string): Package[] {
  const term = searchTerm.toLowerCase();
  return mockPackages.filter(
    pkg =>
      pkg.name.toLowerCase().includes(term) ||
      pkg.category.toLowerCase().includes(term) ||
      pkg.description?.toLowerCase().includes(term) ||
      pkg.recipes.some(r => r.recipeName.toLowerCase().includes(term)) ||
      pkg.materials.some(m => m.materialName.toLowerCase().includes(term))
  );
}

export function getPackageCategories(): PackageCategory[] {
  return ['cakes', 'cupcakes', 'cookies', 'desserts', 'party-packages', 'custom'];
}

export function getActivePackages(): Package[] {
  return mockPackages.filter(pkg => pkg.status === 'active');
}

export function getTemplatePackages(): Package[] {
  return mockPackages.filter(pkg => pkg.isTemplate);
}

export function getMostPopularPackage(): Package | undefined {
  return mockPackages.reduce((prev, current) =>
    current.timesOrdered > prev.timesOrdered ? current : prev
  );
}

export function getLowMarginPackages(threshold: number = 150): Package[] {
  return mockPackages.filter(
    pkg => pkg.profitMargin !== undefined && pkg.profitMargin < threshold && pkg.status === 'active'
  );
}

export function calculateAverageMargin(): number {
  const activePackages = getActivePackages();
  if (activePackages.length === 0) return 0;
  const totalMargin = activePackages.reduce((sum, pkg) => sum + (pkg.profitMargin || 0), 0);
  return totalMargin / activePackages.length;
}

export function calculateTotalRevenuePotential(): number {
  return getActivePackages().reduce((sum, pkg) => sum + (pkg.sellingPrice || 0), 0);
}

export function getPackageSummary() {
  const allPackages = mockPackages;
  const activePackages = getActivePackages();
  const mostPopular = getMostPopularPackage();
  const lowMarginPackages = getLowMarginPackages();

  return {
    totalPackages: allPackages.length,
    activePackages: activePackages.length,
    averageMargin: calculateAverageMargin(),
    totalRevenuePotential: calculateTotalRevenuePotential(),
    mostPopularPackage: mostPopular,
    lowMarginPackages: lowMarginPackages
  };
}
