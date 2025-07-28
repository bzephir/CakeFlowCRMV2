import { FormCategory, FormTemplate } from "./types-or-path";

export const mockForms: FormTemplate[] = [
  {
    id: "standard-cake-contract-001",
    title: "Standard Cake Contract",
    category: FormCategory.Contracts,
    body: `
...your lengthy contract text here...
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "wedding-cake-contract-001",
    title: "Wedding Cake Contract - Cake Cuties Bakery",
    category: FormCategory.Contracts,
    body: `
...another lengthy contract text...
    `,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // Add more forms here...
];
