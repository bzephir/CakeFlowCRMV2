import { Material, MaterialCategory, calculateCostPerItem, calculateProfitMargin, calculateTotalItemsAvailable } from '../types/material';

const createMaterial = (
  id: string,
  name: string,
  category: MaterialCategory,
  unitQuantity: number,
  packageCost: number,
  pricePerItem: number,
  vendorId: string,
  inventoryQuantity: number = 10,
  reorderLevel: number = 5,
  canLinkToRecipe: boolean = false,
  notes?: string
): Material => {
  const costPerItem = calculateCostPerItem(packageCost, unitQuantity);
  const profitMargin = calculateProfitMargin(pricePerItem, costPerItem);
  const totalItemsAvailable = calculateTotalItemsAvailable(inventoryQuantity, unitQuantity);

  return {
    id,
    name,
    category,
    unitQuantity,
    packageCost,
    costPerItem,
    pricePerItem,
    profitMargin,
    inventoryQuantity,
    totalItemsAvailable,
    reorderLevel,
    vendorId,
    canLinkToRecipe,
    notes,
    lastPriceUpdate: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  };
};

export const mockMaterials: Material[] = [
  createMaterial('mat-001', '1/4 Sheet Cake Board', 'Cake Boards', 25, 6.99, 0.50, 'vendor-001', 15, 5),
  createMaterial('mat-002', '1/2 Sheet Cake Board', 'Cake Boards', 25, 8.99, 0.65, 'vendor-001', 20, 5),
  createMaterial('mat-003', 'Full Sheet Cake Board', 'Cake Boards', 15, 12.99, 1.25, 'vendor-001', 10, 3),
  createMaterial('mat-004', '6" Round Cake Board', 'Cake Boards', 50, 9.99, 0.35, 'vendor-001', 12, 4),
  createMaterial('mat-005', '8" Round Cake Board', 'Cake Boards', 50, 11.99, 0.40, 'vendor-001', 18, 5),
  createMaterial('mat-006', '10" Round Cake Board', 'Cake Boards', 30, 10.99, 0.60, 'vendor-001', 15, 4),
  createMaterial('mat-007', '12" Round Cake Board', 'Cake Boards', 25, 12.99, 0.80, 'vendor-001', 10, 3),
  createMaterial('mat-008', '14" Round Cake Board', 'Cake Boards', 20, 14.99, 1.10, 'vendor-001', 8, 3),
  createMaterial('mat-009', '16" Round Cake Board', 'Cake Boards', 15, 15.99, 1.50, 'vendor-001', 6, 2),
  createMaterial('mat-010', '6" Square Cake Board', 'Cake Boards', 50, 10.99, 0.38, 'vendor-001', 10, 4),

  createMaterial('mat-011', '8" Square Cake Board', 'Cake Boards', 40, 12.99, 0.55, 'vendor-001', 12, 4),
  createMaterial('mat-012', '10" Square Cake Board', 'Cake Boards', 30, 13.99, 0.75, 'vendor-001', 10, 3),
  createMaterial('mat-013', '12" Square Cake Board', 'Cake Boards', 25, 15.99, 0.95, 'vendor-001', 8, 3),
  createMaterial('mat-014', 'Heart-Shaped Cake Board 10"', 'Cake Boards', 20, 16.99, 1.25, 'vendor-001', 5, 2),
  createMaterial('mat-015', 'Heart-Shaped Cake Board 12"', 'Cake Boards', 15, 18.99, 1.75, 'vendor-001', 4, 2),

  createMaterial('mat-016', '1/4 Sheet Cake Box (14x10x4)', 'Cake Boxes', 15, 18.99, 1.75, 'vendor-001', 12, 4),
  createMaterial('mat-017', '1/2 Sheet Cake Box (19x14x4)', 'Cake Boxes', 10, 22.99, 3.25, 'vendor-001', 10, 3),
  createMaterial('mat-018', 'Full Sheet Cake Box (26x18x4)', 'Cake Boxes', 10, 32.99, 4.50, 'vendor-001', 8, 2),
  createMaterial('mat-019', '8" Round Cake Box', 'Cake Boxes', 25, 24.99, 1.45, 'vendor-001', 15, 5),
  createMaterial('mat-020', '10" Round Cake Box', 'Cake Boxes', 20, 26.99, 1.95, 'vendor-001', 12, 4),
  createMaterial('mat-021', '12" Round Cake Box', 'Cake Boxes', 15, 28.99, 2.75, 'vendor-001', 10, 3),
  createMaterial('mat-022', '14" Round Cake Box', 'Cake Boxes', 12, 32.99, 3.75, 'vendor-001', 8, 3),
  createMaterial('mat-023', '6" Tall Cake Box (6x6x8)', 'Cake Boxes', 20, 29.99, 2.25, 'vendor-001', 6, 2),
  createMaterial('mat-024', '8" Tall Cake Box (8x8x10)', 'Cake Boxes', 15, 34.99, 3.25, 'vendor-001', 8, 2),
  createMaterial('mat-025', '10" Tall Cake Box (10x10x12)', 'Cake Boxes', 12, 39.99, 4.50, 'vendor-001', 6, 2),

  createMaterial('mat-026', '8" Round Cake Drum (1/2" thick)', 'Cake Drums', 12, 15.99, 2.25, 'vendor-001', 10, 3),
  createMaterial('mat-027', '10" Round Cake Drum (1/2" thick)', 'Cake Drums', 10, 17.99, 2.75, 'vendor-001', 12, 3),
  createMaterial('mat-028', '12" Round Cake Drum (1/2" thick)', 'Cake Drums', 8, 19.99, 3.50, 'vendor-001', 10, 3),
  createMaterial('mat-029', '14" Round Cake Drum (1/2" thick)', 'Cake Drums', 6, 21.99, 4.75, 'vendor-001', 8, 2),
  createMaterial('mat-030', '16" Round Cake Drum (1/2" thick)', 'Cake Drums', 5, 24.99, 6.25, 'vendor-001', 6, 2),
  createMaterial('mat-031', '10" Square Cake Drum', 'Cake Drums', 8, 19.99, 3.50, 'vendor-001', 8, 2),
  createMaterial('mat-032', '12" Square Cake Drum', 'Cake Drums', 6, 22.99, 4.75, 'vendor-001', 6, 2),
  createMaterial('mat-033', '14" Square Cake Drum', 'Cake Drums', 5, 26.99, 6.50, 'vendor-001', 5, 2),

  createMaterial('mat-034', 'Standard Cupcake Box (holds 6)', 'Cupcake Containers', 50, 29.99, 0.95, 'vendor-001', 20, 5),
  createMaterial('mat-035', 'Standard Cupcake Box (holds 12)', 'Cupcake Containers', 30, 34.99, 1.75, 'vendor-001', 18, 5),
  createMaterial('mat-036', 'Standard Cupcake Box (holds 24)', 'Cupcake Containers', 20, 42.99, 3.25, 'vendor-001', 12, 4),
  createMaterial('mat-037', 'Clear Cupcake Container (single)', 'Cupcake Containers', 100, 19.99, 0.35, 'vendor-001', 25, 8),
  createMaterial('mat-038', 'Clear Cupcake Container (4-pack)', 'Cupcake Containers', 50, 24.99, 0.75, 'vendor-001', 15, 5),
  createMaterial('mat-039', 'Mini Cupcake Box (holds 12)', 'Cupcake Containers', 40, 29.99, 1.15, 'vendor-001', 10, 4),
  createMaterial('mat-040', 'Windowed Cupcake Box (holds 6)', 'Cupcake Containers', 40, 34.99, 1.25, 'vendor-001', 12, 4),

  createMaterial('mat-041', 'Rainbow Sprinkles', 'Decorations', 1, 12.99, 18.99, 'vendor-002', 15, 5, true, 'Can be used in recipes and packages'),
  createMaterial('mat-042', 'Chocolate Sprinkles', 'Decorations', 1, 11.99, 17.99, 'vendor-002', 12, 4, true, 'Can be used in recipes and packages'),
  createMaterial('mat-043', 'Pearl Sugar (White)', 'Decorations', 1, 8.99, 14.99, 'vendor-002', 10, 3, true),
  createMaterial('mat-044', 'Pearl Sugar (Gold)', 'Decorations', 1, 14.99, 24.99, 'vendor-002', 8, 3, true),
  createMaterial('mat-045', 'Pearl Sugar (Silver)', 'Decorations', 1, 14.99, 24.99, 'vendor-002', 8, 3, true),
  createMaterial('mat-046', 'Edible Gold Leaf Sheets', 'Decorations', 10, 24.99, 4.50, 'vendor-002', 5, 2, true),
  createMaterial('mat-047', 'Edible Silver Leaf Sheets', 'Decorations', 10, 22.99, 4.25, 'vendor-002', 5, 2, true),
  createMaterial('mat-048', 'Gold Luster Dust', 'Decorations', 1, 9.99, 16.99, 'vendor-002', 6, 2, true),
  createMaterial('mat-049', 'Silver Luster Dust', 'Decorations', 1, 9.99, 16.99, 'vendor-002', 6, 2, true),
  createMaterial('mat-050', 'Rose Gold Luster Dust', 'Decorations', 1, 11.99, 19.99, 'vendor-002', 4, 2, true),
  createMaterial('mat-051', 'Disco Dust (Assorted Colors)', 'Decorations', 6, 18.99, 4.99, 'vendor-002', 8, 3, true),
  createMaterial('mat-052', 'Sanding Sugar (White)', 'Decorations', 1, 6.99, 11.99, 'vendor-002', 10, 3, true),
  createMaterial('mat-053', 'Sanding Sugar (Colored 6-pack)', 'Decorations', 6, 14.99, 3.99, 'vendor-002', 12, 4, true),
  createMaterial('mat-054', 'Nonpareils (Assorted)', 'Decorations', 1, 7.99, 13.99, 'vendor-002', 10, 3, true),
  createMaterial('mat-055', 'Star Confetti Sprinkles', 'Decorations', 1, 9.99, 16.99, 'vendor-002', 8, 3, true),
  createMaterial('mat-056', 'Heart Confetti Sprinkles', 'Decorations', 1, 9.99, 16.99, 'vendor-002', 8, 3, true),
  createMaterial('mat-057', 'Flower Sprinkle Mix', 'Decorations', 1, 11.99, 19.99, 'vendor-002', 6, 2, true),
  createMaterial('mat-058', 'Butterfly Sprinkle Mix', 'Decorations', 1, 11.99, 19.99, 'vendor-002', 6, 2, true),

  createMaterial('mat-059', 'Happy Birthday Topper (Acrylic)', 'Toppers', 12, 14.99, 2.50, 'vendor-003', 10, 3),
  createMaterial('mat-060', 'Number Candle Toppers (0-9 set)', 'Toppers', 10, 12.99, 2.25, 'vendor-003', 8, 3),
  createMaterial('mat-061', 'Gold Star Cake Topper', 'Toppers', 20, 16.99, 1.45, 'vendor-003', 12, 4),
  createMaterial('mat-062', 'Silver Star Cake Topper', 'Toppers', 20, 16.99, 1.45, 'vendor-003', 10, 3),
  createMaterial('mat-063', 'Love/Heart Cake Topper', 'Toppers', 15, 18.99, 2.15, 'vendor-003', 8, 3),
  createMaterial('mat-064', 'Mr & Mrs Cake Topper', 'Toppers', 10, 24.99, 3.99, 'vendor-003', 6, 2),
  createMaterial('mat-065', 'Baby Shower Topper (Boy)', 'Toppers', 12, 19.99, 2.75, 'vendor-003', 5, 2),
  createMaterial('mat-066', 'Baby Shower Topper (Girl)', 'Toppers', 12, 19.99, 2.75, 'vendor-003', 5, 2),
  createMaterial('mat-067', 'Graduation Cap Topper', 'Toppers', 15, 17.99, 2.25, 'vendor-003', 6, 2),
  createMaterial('mat-068', 'Balloon Garland Topper Kit', 'Toppers', 8, 22.99, 4.50, 'vendor-003', 4, 2),
  createMaterial('mat-069', 'Fresh Flower Picks (plastic)', 'Toppers', 50, 12.99, 0.45, 'vendor-003', 15, 5),
  createMaterial('mat-070', 'Sparkler Candles (6")', 'Toppers', 24, 18.99, 1.25, 'vendor-003', 10, 3),

  createMaterial('mat-071', 'Clear Cellophane Wrap (30" x 100ft)', 'Wrapping Materials', 1, 14.99, 24.99, 'vendor-004', 8, 2),
  createMaterial('mat-072', 'Pink Cellophane Wrap (30" x 100ft)', 'Wrapping Materials', 1, 15.99, 26.99, 'vendor-004', 6, 2),
  createMaterial('mat-073', 'Blue Cellophane Wrap (30" x 100ft)', 'Wrapping Materials', 1, 15.99, 26.99, 'vendor-004', 6, 2),
  createMaterial('mat-074', 'Gold Cellophane Wrap (30" x 100ft)', 'Wrapping Materials', 1, 17.99, 29.99, 'vendor-004', 5, 2),
  createMaterial('mat-075', 'Silver Cellophane Wrap (30" x 100ft)', 'Wrapping Materials', 1, 17.99, 29.99, 'vendor-004', 5, 2),
  createMaterial('mat-076', 'Tissue Paper (White, 20x30, 480 sheets)', 'Wrapping Materials', 480, 22.99, 0.10, 'vendor-004', 10, 3),
  createMaterial('mat-077', 'Tissue Paper (Colored, 20x30, 480 sheets)', 'Wrapping Materials', 480, 26.99, 0.12, 'vendor-004', 8, 3),
  createMaterial('mat-078', 'Satin Ribbon 1/4" (100 yards)', 'Wrapping Materials', 1, 8.99, 14.99, 'vendor-004', 12, 4),
  createMaterial('mat-079', 'Satin Ribbon 5/8" (100 yards)', 'Wrapping Materials', 1, 12.99, 21.99, 'vendor-004', 10, 3),
  createMaterial('mat-080', 'Grosgrain Ribbon 7/8" (50 yards)', 'Wrapping Materials', 1, 11.99, 19.99, 'vendor-004', 8, 3),
  createMaterial('mat-081', 'Organza Ribbon 1.5" (25 yards)', 'Wrapping Materials', 1, 9.99, 16.99, 'vendor-004', 6, 2),
  createMaterial('mat-082', 'Curling Ribbon (500 yards)', 'Wrapping Materials', 1, 7.99, 12.99, 'vendor-004', 10, 3),
  createMaterial('mat-083', 'Thank You Stickers (500 count)', 'Wrapping Materials', 500, 14.99, 0.06, 'vendor-004', 12, 4),
  createMaterial('mat-084', 'Custom Logo Stickers (250 count)', 'Wrapping Materials', 250, 49.99, 0.35, 'vendor-004', 5, 2),
  createMaterial('mat-085', 'Gift Tags (assorted, 100 count)', 'Wrapping Materials', 100, 9.99, 0.20, 'vendor-004', 8, 3),

  createMaterial('mat-086', 'Paper Straws (White, 200 count)', 'Straws', 200, 12.99, 0.12, 'vendor-005', 15, 5),
  createMaterial('mat-087', 'Paper Straws (Striped, 200 count)', 'Straws', 200, 13.99, 0.14, 'vendor-005', 12, 4),
  createMaterial('mat-088', 'Paper Straws (Polka Dot, 200 count)', 'Straws', 200, 13.99, 0.14, 'vendor-005', 10, 3),
  createMaterial('mat-089', 'Paper Straws (Gold Foil, 200 count)', 'Straws', 200, 16.99, 0.16, 'vendor-005', 8, 3),
  createMaterial('mat-090', 'Paper Straws (Rainbow, 200 count)', 'Straws', 200, 14.99, 0.15, 'vendor-005', 10, 3),
  createMaterial('mat-091', 'Plastic Spoons (clear, 100 count)', 'Straws', 100, 6.99, 0.12, 'vendor-005', 15, 5),
  createMaterial('mat-092', 'Plastic Forks (clear, 100 count)', 'Straws', 100, 6.99, 0.12, 'vendor-005', 15, 5),

  createMaterial('mat-093', 'White Paper Bags (8x4.5x10.5, 100 count)', 'Bags', 100, 18.99, 0.32, 'vendor-004', 12, 4),
  createMaterial('mat-094', 'Kraft Paper Bags (8x4.5x10.5, 100 count)', 'Bags', 100, 19.99, 0.35, 'vendor-004', 10, 3),
  createMaterial('mat-095', 'Pink Paper Bags (8x4.5x10.5, 100 count)', 'Bags', 100, 21.99, 0.38, 'vendor-004', 8, 3),
  createMaterial('mat-096', 'Small Gift Bags (5x3x8, 100 count)', 'Bags', 100, 14.99, 0.25, 'vendor-004', 10, 3),
  createMaterial('mat-097', 'Large Gift Bags (12x6x15, 50 count)', 'Bags', 50, 22.99, 0.75, 'vendor-004', 8, 3),
  createMaterial('mat-098', 'Clear Treat Bags (4x6, 200 count)', 'Bags', 200, 11.99, 0.10, 'vendor-004', 15, 5),
  createMaterial('mat-099', 'Clear Treat Bags (6x9, 100 count)', 'Bags', 100, 9.99, 0.18, 'vendor-004', 12, 4),

  createMaterial('mat-100', 'Piping Bags (disposable, 12", 100 count)', 'Miscellaneous', 100, 14.99, 0.25, 'vendor-005', 20, 6),
  createMaterial('mat-101', 'Parchment Paper Sheets (16x24, 1000 count)', 'Miscellaneous', 1000, 42.99, 0.08, 'vendor-005', 15, 5),
  createMaterial('mat-102', 'Cake Dowels (plastic, 12", 100 count)', 'Miscellaneous', 100, 16.99, 0.28, 'vendor-005', 10, 3),
  createMaterial('mat-103', 'Cake Dowels (wooden, 12", 100 count)', 'Miscellaneous', 100, 12.99, 0.22, 'vendor-005', 12, 4),
  createMaterial('mat-104', 'Cake Circles (6", 100 count)', 'Miscellaneous', 100, 11.99, 0.20, 'vendor-005', 15, 5),
  createMaterial('mat-105', 'Cake Circles (8", 100 count)', 'Miscellaneous', 100, 13.99, 0.23, 'vendor-005', 12, 4),
  createMaterial('mat-106', 'Cake Circles (10", 50 count)', 'Miscellaneous', 50, 12.99, 0.42, 'vendor-005', 10, 3),
  createMaterial('mat-107', 'Bubble Tea Straws (wide, 100 count)', 'Miscellaneous', 100, 8.99, 0.16, 'vendor-005', 10, 3),
  createMaterial('mat-108', 'Bakery String/Twine (500 ft)', 'Miscellaneous', 1, 9.99, 16.99, 'vendor-004', 8, 2),
  createMaterial('mat-109', 'Food Safe Gloves (latex-free, 100 count)', 'Miscellaneous', 100, 12.99, 0.22, 'vendor-005', 20, 6),
  createMaterial('mat-110', 'Cake Combs (decorating set of 6)', 'Miscellaneous', 6, 16.99, 4.50, 'vendor-005', 8, 2),
];

export function getMaterialById(id: string): Material | undefined {
  return mockMaterials.find(mat => mat.id === id);
}

export function getMaterialsByCategory(category: string): Material[] {
  if (category === 'all') return mockMaterials;
  return mockMaterials.filter(mat => mat.category === category);
}

export function searchMaterials(searchTerm: string): Material[] {
  const term = searchTerm.toLowerCase();
  return mockMaterials.filter(
    mat =>
      mat.name.toLowerCase().includes(term) ||
      mat.category.toLowerCase().includes(term)
  );
}

export function getLowStockMaterials(): Material[] {
  return mockMaterials.filter(
    mat => mat.inventoryQuantity <= mat.reorderLevel
  );
}

export function getMaterialCategories(): string[] {
  return Array.from(new Set(mockMaterials.map(mat => mat.category)));
}
