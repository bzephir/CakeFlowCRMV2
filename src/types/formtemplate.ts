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
  category: FormCategory;  // use the enum here for better type safety
  body: string;
  createdAt: string;
  updatedAt: string;
}

