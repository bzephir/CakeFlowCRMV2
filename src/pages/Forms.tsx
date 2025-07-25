// FormsModule.tsx
import React, { useState, useEffect } from "react";

// Define the form categories
export enum FormCategory {
  Contracts = "Contracts",
  Agreements = "Agreements",
  Questionnaires = "Questionnaires",
  Proposals = "Proposals",
  Inquiry = "Inquiry / Lead Capture",
}

interface FormTemplate {
  id: string;
  title: string;
  category: FormCategory;
  createdAt: Date;
  updatedAt: Date;
  status: "Draft" | "Active" | "Archived";
  data: any; // JSON schema or fields for the form
}

const sampleTemplates: FormTemplate[] = [
  {
    id: "template1",
    title: "Standard Contract",
    category: FormCategory.Contracts,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "Active",
    data: {} // template structure here
  },
  // add other sample templates as needed
];

export const FormsModule: React.FC = () => {
  const [forms, setForms] = useState<FormTemplate[]>(sampleTemplates);
  const [selectedCategory, setSelectedCategory] = useState<FormCategory>(FormCategory.Contracts);
  const [selectedForm, setSelectedForm] = useState<FormTemplate | null>(null);

  // Filter forms by category
  const filteredForms = forms.filter((f) => f.category === selectedCategory);

  // Handle form selection
  const handleSelectForm = (form: FormTemplate) => {
    setSelectedForm(form);
  };

  // Placeholder: Form editor UI component (could be a drag-drop builder)
  const FormEditor: React.FC<{ form: FormTemplate }> = ({ form }) => {
    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
        <h3>Editing: {form.title}</h3>
        {/* Render form fields for editing here */}
        <p><i>(Form builder UI goes here)</i></p>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Sidebar navigation for categories */}
      <nav style={{ width: 200, borderRight: "1px solid #ddd", padding: "1rem" }}>
        <h2>Forms</h2>
        {Object.values(FormCategory).map((category) => (
          <div
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedForm(null);
            }}
            style={{
              cursor: "pointer",
              fontWeight: category === selectedCategory ? "bold" : "normal",
              marginBottom: "0.5rem",
            }}
          >
            {category}
          </div>
        ))}
      </nav>

      {/* List of forms for selected category */}
      <section style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        <h2>{selectedCategory}</h2>
        {filteredForms.length === 0 && <p>No forms in this category.</p>}
        <ul>
          {filteredForms.map((form) => (
            <li
              key={form.id}
              onClick={() => handleSelectForm(form)}
              style={{
                cursor: "pointer",
                backgroundColor: form.id === selectedForm?.id ? "#eef" : "transparent",
                padding: "0.5rem",
                marginBottom: "0.25rem",
              }}
            >
              {form.title} - <small>{form.status}</small>
            </li>
          ))}
        </ul>
        {/* Button to add new form */}
        <button
          onClick={() => {
            const newForm: FormTemplate = {
              id: `form_${Date.now()}`,
              title: "New Form",
              category: selectedCategory,
              createdAt: new Date(),
              updatedAt: new Date(),
              status: "Draft",
              data: {},
            };
            setForms([...forms, newForm]);
            setSelectedForm(newForm);
          }}
        >
          + New {selectedCategory} Form
        </button>

        {/* Form Editor */}
        {selectedForm && <FormEditor form={selectedForm} />}
      </section>
    </div>
  );
};
