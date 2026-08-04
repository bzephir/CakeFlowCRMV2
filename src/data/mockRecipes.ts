import { Recipe } from '../types/recipe';

export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-001',
    name: 'Almond Cake',
    description: 'Delicious almond-flavored cake with moist texture',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 10.00,
    costPerUnit: 0.40,
    
    
    createdAt: '2026-08-02',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 12
  },
  {
    id: 'recipe-002',
    name: 'Lemon Cake',
    description: 'Light and tangy lemon cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 10.00,
    costPerUnit: 0.40,
    
    
    createdAt: '2026-08-03',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 18
  },
  {
    id: 'recipe-003',
    name: 'Basic Buttercream',
    description: 'Classic buttercream frosting',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for one 8-inch cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 7.44,
    costPerUnit: 0.31,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 45
  },
  {
    id: 'recipe-004',
    name: 'Red Velvet Cupcakes',
    description: 'Classic red velvet cupcakes with cream cheese frosting',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 18, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 45,
    
    totalCost: 4.68,
    costPerUnit: 0.26,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 24
  },
  {
    id: 'recipe-005',
    name: 'Simple Syrup',
    description: 'Basic simple syrup for moistening cakes',
    category: 'syrup',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 10,
    
    totalCost: 0.50,
    costPerUnit: 0.02,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 67
  },
  {
    id: 'recipe-006',
    name: 'Cut-Out Cookies',
    description: 'Classic sugar cookies for decorating',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 36, unit: 'pieces', description: 'Medium-sized cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 90,
    
    totalCost: 3.24,
    costPerUnit: 0.09,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 38
  },
  {
    id: 'recipe-007',
    name: 'Cut-Out Cookies Icing',
    description: 'Royal icing for decorating cookies',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 36, unit: 'servings', description: 'Enough for 36 cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 0.36,
    costPerUnit: 0.01,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 38
  },
  {
    id: 'recipe-008',
    name: 'Royal Icing',
    description: 'Professional-grade royal icing for decorating',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 3.36,
    costPerUnit: 0.14,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 29
  },
  {
    id: 'recipe-009',
    name: 'Strawberry Filling',
    description: 'Fresh strawberry filling for cakes',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 1.92,
    costPerUnit: 0.08,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 31
  },
  {
    id: 'recipe-010',
    name: 'Cream Cheese Icing',
    description: 'Tangy cream cheese frosting',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 4.25,
    costPerUnit: 0.17,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 42
  },
  {
    id: 'recipe-011',
    name: 'Cream Cheese Cake',
    description: 'Rich cream cheese cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 75,
    
    totalCost: 10.56,
    costPerUnit: 0.44,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 15
  },
  {
    id: 'recipe-012',
    name: 'Raspberry Filling',
    description: 'Sweet raspberry filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 1.92,
    costPerUnit: 0.08,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 28
  },
  {
    id: 'recipe-013',
    name: 'Pina Colada Cupcakes',
    description: 'Tropical coconut and pineapple cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 50,
    
    totalCost: 5.28,
    costPerUnit: 0.22,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 19
  },
  {
    id: 'recipe-014',
    name: 'Vanilla Cake',
    description: 'Classic vanilla layer cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 4.56,
    costPerUnit: 0.19,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 52
  },
  {
    id: 'recipe-015',
    name: 'Lemon Cream Cupcake',
    description: 'Tangy lemon cupcakes with lemon cream filling',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 36, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 55,
    
    totalCost: 7.92,
    costPerUnit: 0.22,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 21
  },
  {
    id: 'recipe-016',
    name: 'Lemon Buttercream',
    description: 'Light lemon buttercream frosting',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 4.00,
    costPerUnit: 0.16,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 26
  },
  {
    id: 'recipe-017',
    name: 'Chocolate Cupcakes',
    description: 'Rich chocolate cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 14, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 45,
    
    totalCost: 3.50,
    costPerUnit: 0.25,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 33
  },
  {
    id: 'recipe-018',
    name: 'Candied Pecans',
    description: 'Sweet candied pecans for topping',
    category: 'garnish',
    status: 'active',
    yield: { quantity: 100, unit: 'servings', description: '5 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 16.00,
    costPerUnit: 0.16,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 14
  },
  {
    id: 'recipe-019',
    name: 'Chocostrawberry Buttercream',
    description: 'Chocolate strawberry buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 8.25,
    costPerUnit: 0.33,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 17
  },
  {
    id: 'recipe-020',
    name: 'Caramel Sauce',
    description: 'Rich homemade caramel sauce',
    category: 'sauce',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 25,
    
    totalCost: 6.00,
    costPerUnit: 0.25,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 22
  },
  {
    id: 'recipe-021',
    name: 'Salted Caramel Sauce',
    description: 'Salted caramel sauce for drizzling',
    category: 'sauce',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 25,
    
    totalCost: 1.44,
    costPerUnit: 0.06,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 28
  },
  {
    id: 'recipe-022',
    name: 'Graham Cracker Crumble',
    description: 'Crunchy graham cracker topping',
    category: 'garnish',
    status: 'active',
    yield: { quantity: 32, unit: 'servings', description: '3 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 10,
    
    totalCost: 1.60,
    costPerUnit: 0.05,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 19
  },
  {
    id: 'recipe-023',
    name: 'Mint Chocolate Chip Cupcakes',
    description: 'Mint chocolate chip cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 50,
    
    totalCost: 5.88,
    costPerUnit: 0.49,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 16
  },
  {
    id: 'recipe-024',
    name: 'Coquito Cupcakes',
    description: 'Puerto Rican coconut rum cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 18, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 55,
    
    totalCost: 5.22,
    costPerUnit: 0.29,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 13
  },
  {
    id: 'recipe-025',
    name: 'Coquito Icing',
    description: 'Coquito-flavored buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for 24 cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 3.12,
    costPerUnit: 0.13,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 13
  },
  {
    id: 'recipe-026',
    name: 'Mint Buttercream',
    description: 'Fresh mint buttercream frosting',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 6.00,
    costPerUnit: 0.24,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 18
  },
  {
    id: 'recipe-027',
    name: 'Chocolate Buttercream',
    description: 'Rich chocolate buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 4.08,
    costPerUnit: 0.17,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 35
  },
  {
    id: 'recipe-028',
    name: 'Strawberry Cake',
    description: 'Fresh strawberry layer cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 65,
    
    totalCost: 8.75,
    costPerUnit: 0.35,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 27
  },
  {
    id: 'recipe-029',
    name: 'Pina Colada Icing',
    description: 'Tropical pina colada frosting',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for 24 cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 3.75,
    costPerUnit: 0.15,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 19
  },
  {
    id: 'recipe-030',
    name: 'Pumpkin Spice Cupcakes',
    description: 'Autumn spiced pumpkin cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 50,
    
    totalCost: 6.72,
    costPerUnit: 0.28,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 23
  },
  {
    id: 'recipe-031',
    name: 'Marshmallow Fondant',
    description: 'Homemade marshmallow fondant',
    category: 'fondant',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '2 pounds' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 5.00,
    costPerUnit: 0.20,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 11
  },
  {
    id: 'recipe-032',
    name: 'Vanilla Cupcake',
    description: 'Classic vanilla cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 45,
    
    totalCost: 4.32,
    costPerUnit: 0.18,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 41
  },
  {
    id: 'recipe-033',
    name: 'Linzer Tart',
    description: 'Austrian raspberry linzer tart',
    category: 'pie',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch tart' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 90,
    
    totalCost: 7.20,
    costPerUnit: 0.30,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-034',
    name: 'Cake Pop Dough',
    description: 'Base dough for cake pops',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: 'Cake pops' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 6.72,
    costPerUnit: 0.56,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 15
  },
  {
    id: 'recipe-035',
    name: 'Lemon Cream & Blueberry Cupcake',
    description: 'Lemon cupcakes with blueberry filling',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 36, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 11.52,
    costPerUnit: 0.32,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 20
  },
  {
    id: 'recipe-036',
    name: 'Gluten Free Lemon Cream Cupcake',
    description: 'Gluten-free lemon cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 55,
    
    totalCost: 9.60,
    costPerUnit: 0.40,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 12
  },
  {
    id: 'recipe-037',
    name: 'Gluten Free Chocolate Cupcakes',
    description: 'Gluten-free chocolate cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 14, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 50,
    
    totalCost: 3.92,
    costPerUnit: 0.28,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 8
  },
  {
    id: 'recipe-038',
    name: 'Gluten Free Vanilla Cupcake',
    description: 'Gluten-free vanilla cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 45,
    
    totalCost: 6.60,
    costPerUnit: 0.55,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 10
  },
  {
    id: 'recipe-039',
    name: 'Beignet',
    description: 'New Orleans style beignets',
    category: 'doughnuts',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Medium beignets' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 120,
    
    totalCost: 2.16,
    costPerUnit: 0.09,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 19
  },
  {
    id: 'recipe-040',
    name: 'Chocolate Ganache',
    description: 'Rich chocolate ganache',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 3.84,
    costPerUnit: 0.16,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 24
  },
  {
    id: 'recipe-041',
    name: 'Modeling Chocolate',
    description: 'Chocolate modeling paste for decorations',
    category: 'decoration',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '1 pound' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 6.75,
    costPerUnit: 0.27,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 16
  },
  {
    id: 'recipe-042',
    name: 'Edible Varnish',
    description: 'Edible glaze for shine',
    category: 'decoration',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '1 cup' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 10,
    
    totalCost: 1.68,
    costPerUnit: 0.07,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 12
  },
  {
    id: 'recipe-043',
    name: 'Dairy Free Chocolate Cake',
    description: 'Chocolate cake without dairy',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 70,
    
    totalCost: 6.25,
    costPerUnit: 0.25,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 14
  },
  {
    id: 'recipe-044',
    name: 'Dairy Free Chocolate Frosting',
    description: 'Chocolate frosting without dairy',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 20, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 4.80,
    costPerUnit: 0.24,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 14
  },
  {
    id: 'recipe-045',
    name: 'Strawberry Filling',
    description: 'Fresh strawberry cake filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 4.08,
    costPerUnit: 0.17,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 18
  },
  {
    id: 'recipe-046',
    name: 'Pecan Pennies',
    description: 'Pecan shortbread cookies',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 30, unit: 'pieces', description: 'Small cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 4.80,
    costPerUnit: 0.16,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 11
  },
  {
    id: 'recipe-047',
    name: 'Raspberry Mousse',
    description: 'Light raspberry mousse',
    category: 'filling',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: '3 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 40,
    
    totalCost: 7.44,
    costPerUnit: 0.62,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 8
  },
  {
    id: 'recipe-048',
    name: 'Gluten Free Velvet Chocolate Cake',
    description: 'Gluten-free chocolate velvet cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 20, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 75,
    
    totalCost: 8.40,
    costPerUnit: 0.42,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 7
  },
  {
    id: 'recipe-049',
    name: 'Red Velvet Cake',
    description: 'Classic red velvet layer cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 70,
    
    totalCost: 4.32,
    costPerUnit: 0.18,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 31
  },
  {
    id: 'recipe-050',
    name: 'Sponge Cake',
    description: 'Light and airy sponge cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 50,
    
    totalCost: 4.80,
    costPerUnit: 0.20,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 19
  },
  {
    id: 'recipe-051',
    name: 'Whipped Cream',
    description: 'Fresh whipped cream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '4 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 10,
    
    totalCost: 3.12,
    costPerUnit: 0.13,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 26
  },
  {
    id: 'recipe-052',
    name: 'Fresh Strawberries',
    description: 'Fresh sliced strawberries for garnish',
    category: 'garnish',
    status: 'active',
    yield: { quantity: 6, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 10,
    
    totalCost: 4.62,
    costPerUnit: 0.77,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 22
  },
  {
    id: 'recipe-053',
    name: 'Fresh Peaches',
    description: 'Fresh peaches for topping',
    category: 'garnish',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '6 peaches sliced' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 2.16,
    costPerUnit: 0.09,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 15
  },
  {
    id: 'recipe-054',
    name: 'Banana Cream Cake',
    description: 'Banana cream layer cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 65,
    
    totalCost: 6.00,
    costPerUnit: 0.24,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 16
  },
  {
    id: 'recipe-055',
    name: 'Carrot Cake',
    description: 'Spiced carrot cake with walnuts',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 70,
    
    totalCost: 9.00,
    costPerUnit: 0.36,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 22
  },
  {
    id: 'recipe-056',
    name: 'Caramel Buttercream',
    description: 'Salted caramel buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 6.00,
    costPerUnit: 0.25,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 19
  },
  {
    id: 'recipe-057',
    name: 'Coconut Filling',
    description: 'Coconut cream filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 25,
    
    totalCost: 4.00,
    costPerUnit: 0.16,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 13
  },
  {
    id: 'recipe-058',
    name: 'Fresh Blueberries',
    description: 'Fresh blueberries for topping',
    category: 'garnish',
    status: 'active',
    yield: { quantity: 4, unit: 'servings', description: '1 cup' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 5,
    
    totalCost: 4.00,
    costPerUnit: 1.00,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 18
  },
  {
    id: 'recipe-059',
    name: 'Dulce de Leche',
    description: 'Homemade dulce de leche',
    category: 'sauce',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: '1.5 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 180,
    
    totalCost: 1.08,
    costPerUnit: 0.09,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 17
  },
  {
    id: 'recipe-060',
    name: 'Fresh Blackberries',
    description: 'Fresh blackberries for garnish',
    category: 'garnish',
    status: 'active',
    yield: { quantity: 6, unit: 'servings', description: '1.5 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 5,
    
    totalCost: 5.00,
    costPerUnit: 0.83,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 14
  },
  {
    id: 'recipe-061',
    name: 'Peanut Butter Buttercream',
    description: 'Creamy peanut butter frosting',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 8.00,
    costPerUnit: 0.32,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 20
  },
  {
    id: 'recipe-062',
    name: 'Fresh Raspberries',
    description: 'Fresh raspberries for topping',
    category: 'garnish',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '3 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 5,
    
    totalCost: 4.56,
    costPerUnit: 0.19,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 21
  },
  {
    id: 'recipe-063',
    name: 'Pineapple Filling',
    description: 'Sweet pineapple filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 25,
    
    totalCost: 2.64,
    costPerUnit: 0.11,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 16
  },
  {
    id: 'recipe-064',
    name: 'Champagne Cake',
    description: 'Elegant champagne-infused cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 70,
    
    totalCost: 16.80,
    costPerUnit: 0.70,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 6
  },
  {
    id: 'recipe-065',
    name: 'Champagne Buttercream',
    description: 'Champagne-flavored buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 8.00,
    costPerUnit: 0.32,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 6
  },
  {
    id: 'recipe-066',
    name: 'Bavarian Cream',
    description: 'Classic Bavarian cream filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '3 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 45,
    
    totalCost: 4.25,
    costPerUnit: 0.17,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 12
  },
  {
    id: 'recipe-067',
    name: 'Chocolate Chunk Cookies',
    description: 'Chunky chocolate chip cookies',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Large cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 3.12,
    costPerUnit: 0.13,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 28
  },
  {
    id: 'recipe-068',
    name: 'Vanilla Bean Cheesecake Bars',
    description: 'Creamy cheesecake bars',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: '9x13 pan' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 90,
    
    totalCost: 11.28,
    costPerUnit: 0.94,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 13
  },
  {
    id: 'recipe-069',
    name: 'Vegan Red Velvet Cake',
    description: 'Vegan red velvet cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: '8-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 75,
    
    totalCost: 6.72,
    costPerUnit: 0.56,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-070',
    name: 'Vegan Buttercream',
    description: 'Dairy-free vegan buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 8.40,
    costPerUnit: 0.35,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-071',
    name: 'Vegan Chocolate Buttercream',
    description: 'Dairy-free chocolate frosting',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: 'Enough for 12 cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 14.04,
    costPerUnit: 1.17,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-072',
    name: 'Candy Apples',
    description: 'Classic candy apples',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 6, unit: 'pieces', description: 'Large apples' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 40,
    
    totalCost: 7.20,
    costPerUnit: 1.20,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 8
  },
  {
    id: 'recipe-073',
    name: 'Lemon Filling',
    description: 'Tangy lemon curd filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 4.50,
    costPerUnit: 0.18,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 23
  },
  {
    id: 'recipe-074',
    name: 'Vegan Coconut Cream Filling',
    description: 'Coconut cream filling without dairy',
    category: 'filling',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 2.64,
    costPerUnit: 0.22,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-075',
    name: 'Vegan Chocolate Ganache',
    description: 'Dairy-free chocolate ganache',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: '1.5 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 25,
    
    totalCost: 2.64,
    costPerUnit: 0.22,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-076',
    name: 'Vegan Chocolate Cake',
    description: 'Dairy-free chocolate cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 70,
    
    totalCost: 5.25,
    costPerUnit: 0.21,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 10
  },
  {
    id: 'recipe-077',
    name: 'GF Vegan Chocolate Cake',
    description: 'Gluten-free and vegan chocolate cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 25, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 75,
    
    totalCost: 10.50,
    costPerUnit: 0.42,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 5
  },
  {
    id: 'recipe-078',
    name: 'Vegan Eggless Chocolate Cake',
    description: 'Eggless vegan chocolate cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 23, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 70,
    
    totalCost: 4.83,
    costPerUnit: 0.21,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 8
  },
  {
    id: 'recipe-079',
    name: 'Pretzel Sticks',
    description: 'Chocolate-dipped pretzel sticks',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: 'Pretzel rods' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 9.84,
    costPerUnit: 0.82,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 7
  },
  {
    id: 'recipe-080',
    name: 'Rice Crispy Treats',
    description: 'Classic rice crispy treats',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: '9x13 pan' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 6.60,
    costPerUnit: 0.55,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 18
  },
  {
    id: 'recipe-081',
    name: 'Vegan Vanilla Cake',
    description: 'Dairy-free vanilla cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 65,
    
    totalCost: 7.68,
    costPerUnit: 0.32,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 10
  },
  {
    id: 'recipe-082',
    name: 'Carribean Rum Cake',
    description: 'Rum-soaked Caribbean cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Bundt cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 80,
    
    totalCost: 6.48,
    costPerUnit: 0.27,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 11
  },
  {
    id: 'recipe-083',
    name: 'Carribean Rum Syrup',
    description: 'Rum syrup for soaking cakes',
    category: 'syrup',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '1.5 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 2.16,
    costPerUnit: 0.09,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 11
  },
  {
    id: 'recipe-084',
    name: 'Carribean Buttercream',
    description: 'Rum-flavored buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 7.68,
    costPerUnit: 0.32,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 11
  },
  {
    id: 'recipe-085',
    name: 'Lemon Cupcake',
    description: 'Light lemon cupcakes',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Standard cupcakes' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 45,
    
    totalCost: 5.04,
    costPerUnit: 0.21,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 25
  },
  {
    id: 'recipe-087',
    name: 'Chocolate Bavarian Cream Filling',
    description: 'Chocolate Bavarian cream',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '3 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 50,
    
    totalCost: 2.88,
    costPerUnit: 0.12,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 10
  },
  {
    id: 'recipe-088',
    name: 'Cream Cheese Filling',
    description: 'Cream cheese filling for cakes',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 4.56,
    costPerUnit: 0.19,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 16
  },
  {
    id: 'recipe-089',
    name: 'Chocolate Drip',
    description: 'Chocolate ganache drip for cakes',
    category: 'decoration',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '1 cup' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 2.88,
    costPerUnit: 0.12,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 22
  },
  {
    id: 'recipe-090',
    name: 'Chocolate Drip Candy Melts',
    description: 'Candy melt drip decoration',
    category: 'decoration',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '1 cup' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 15,
    
    totalCost: 2.64,
    costPerUnit: 0.11,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 18
  },
  {
    id: 'recipe-091',
    name: 'Banana Pudding',
    description: 'Classic banana pudding',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: '9x13 dish' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 40,
    
    totalCost: 5.16,
    costPerUnit: 0.43,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 15
  },
  {
    id: 'recipe-092',
    name: 'Brownie Butter Blondies/Walnuts',
    description: 'Walnut blondie brownies',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: '9x13 pan' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 50,
    
    totalCost: 1.44,
    costPerUnit: 0.12,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 12
  },
  {
    id: 'recipe-093',
    name: 'Peanut Butter Fluff',
    description: 'Peanut butter marshmallow filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '3 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 20,
    
    totalCost: 4.32,
    costPerUnit: 0.18,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 13
  },
  {
    id: 'recipe-094',
    name: 'Strawberry Shortcake',
    description: 'Classic strawberry shortcake',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'servings', description: '8-inch cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 0.00,
    costPerUnit: 0.00,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 14
  },
  {
    id: 'recipe-095',
    name: 'Box Vanilla Cake',
    description: 'Simple boxed vanilla cake',
    category: 'cake',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '9-inch round cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 45,
    
    totalCost: 4.08,
    costPerUnit: 0.17,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 22
  },
  {
    id: 'recipe-096',
    name: 'Cream Puff',
    description: 'Light and airy cream puffs',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: 'Medium puffs' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 5.52,
    costPerUnit: 0.46,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-097',
    name: 'Macaron - PreMade',
    description: 'French macaron shells',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: 'Macaron shells' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 120,
    
    totalCost: 8.64,
    costPerUnit: 0.72,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 6
  },
  {
    id: 'recipe-098',
    name: 'SMBC',
    description: 'Swiss meringue buttercream',
    category: 'frosting',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: 'Enough for one layer cake' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 40,
    
    totalCost: 11.76,
    costPerUnit: 0.49,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 17
  },
  {
    id: 'recipe-099',
    name: 'Macaron',
    description: 'French macaron cookies',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 20, unit: 'pieces', description: 'Filled macarons' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 120,
    
    totalCost: 3.60,
    costPerUnit: 0.18,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 7
  },
  {
    id: 'recipe-100',
    name: 'Chocolate Covered Oreos',
    description: 'Oreos dipped in chocolate',
    category: 'dessert',
    status: 'active',
    yield: { quantity: 12, unit: 'pieces', description: 'Covered cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 30,
    
    totalCost: 7.44,
    costPerUnit: 0.62,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 11
  },
  {
    id: 'recipe-101',
    name: 'Sugar Cookie (Cream Cheese)',
    description: 'Cream cheese sugar cookies',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 36, unit: 'pieces', description: 'Medium cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 75,
    
    totalCost: 4.32,
    costPerUnit: 0.12,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 21
  },
  {
    id: 'recipe-102',
    name: 'Cookies and Cream Cookies',
    description: 'Oreo-studded cookies',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Large cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 60,
    
    totalCost: 5.28,
    costPerUnit: 0.22,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 16
  },
  {
    id: 'recipe-103',
    name: 'Nutella Filling',
    description: 'Chocolate hazelnut filling',
    category: 'filling',
    status: 'active',
    yield: { quantity: 24, unit: 'servings', description: '2 cups' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 10,
    
    totalCost: 6.00,
    costPerUnit: 0.25,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 12
  },
  {
    id: 'recipe-104',
    name: 'Chocolate Cut-Out Cookies Butter Cookies',
    description: 'Chocolate butter cookies',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 36, unit: 'pieces', description: 'Medium cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 90,
    
    totalCost: 8.64,
    costPerUnit: 0.24,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 13
  },
  {
    id: 'recipe-105',
    name: 'Cookies and Cream Cut-Out Cookies Butter Cookies',
    description: 'Oreo butter cookies',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 36, unit: 'pieces', description: 'Medium cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 90,
    
    totalCost: 14.40,
    costPerUnit: 0.40,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 9
  },
  {
    id: 'recipe-106',
    name: 'Cream Cheese Cut-Out Cookies',
    description: 'Cream cheese sugar cookies',
    category: 'cookie',
    status: 'active',
    yield: { quantity: 24, unit: 'pieces', description: 'Medium cookies' },
    ingredients: [],
    preparationSteps: [],
    preparationTime: 85,
    
    totalCost: 4.68,
    costPerUnit: 0.19,
    
    
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    createdBy: 'admin',
    timesUsed: 15
  },
];

export function getRecipeById(id: string): Recipe | undefined {
  return mockRecipes.find(recipe => recipe.id === id);
}

export function getRecipesByCategory(category: string): Recipe[] {
  if (category === 'all') return mockRecipes;
  return mockRecipes.filter(recipe => recipe.category === category);
}

export function searchRecipes(searchTerm: string): Recipe[] {
  const term = searchTerm.toLowerCase();
  return mockRecipes.filter(
    recipe =>
      recipe.name.toLowerCase().includes(term) ||
      recipe.category.toLowerCase().includes(term) ||
      recipe.description.toLowerCase().includes(term)
  );
}

export function getRecipeCategories(): string[] {
  return [
    'cake',
    'filling',
    'frosting',
    'syrup',
    'fondant',
    'cookie',
    'decoration',
    'dessert',
    'garnish',
    'sauce',
    'pie',
    'doughnuts',
    'other'
  ];
}

export function calculateAverageCost(): number {
  if (mockRecipes.length === 0) return 0;
  const totalCost = mockRecipes.reduce((sum, recipe) => sum + recipe.totalCost, 0);
  return totalCost / mockRecipes.length;
}

export function calculateTotalCost(): number {
  return mockRecipes.reduce((sum, recipe) => sum + recipe.totalCost, 0);
}

export function getHighCostRecipes(threshold: number = 10): Recipe[] {
  return mockRecipes.filter(recipe => recipe.totalCost >= threshold);
}
