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
  category: FormCategory;  // enum type
  body: string;
  createdAt: string;
  updatedAt: string;
}