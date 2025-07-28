export interface formtemplate {
  id: string;
  title: string;
  category: string;         // e.g., 'Contracts', 'Agreements', etc.
  body: string;             // Template text with {{merge_fields}}
  createdAt: string;
  updatedAt: string;
}
