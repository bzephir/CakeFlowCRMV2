// src/types/formcategory.ts or in your formtemplate.ts file
export enum FormCategory {
  Contracts = "Contracts",
  Agreements = "Agreements",
  Questionnaires = "Questionnaires",
  Proposals = "Proposals",
  Inquiry = "Inquiry / Lead Capture",
}

export interface FormTemplate {
  id: string;
  title: string;
  category: string;         // e.g., 'Contracts', 'Agreements', etc.
  body: string;             // Template text with {{merge_fields}}
  createdAt: string;
  updatedAt: string;
}
