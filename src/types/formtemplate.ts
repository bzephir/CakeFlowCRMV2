export type FormCategory = 'Contracts' | 'Agreements' | 'Questionnaires' | 'Proposals' | 'Inquiry / Lead Capture';

export interface FormTemplate {
  id: string;
  title: string;
  category: string;         // e.g., 'Contracts', 'Agreements', etc.
  body: string;             // Template text with {{merge_fields}}
  createdAt: string;
  updatedAt: string;
}
