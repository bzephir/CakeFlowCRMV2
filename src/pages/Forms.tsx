import React, { useState } from "react";
import { FileForm, FileSignature } from 'lucide-react';

// Assuming you have a reusable Header component used on Reports page
import Header from "../components/Header"; // adjust import path accordingly

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
  status: "Draft" | "Active" | "Archived";
}

const sampleTemplates: FormTemplate[] = [
  { id: "1", title: "Standard Contract", category: FormCategory.Contracts, status: "Active" },
  { id: "2", title: "Custom Agreement", category: FormCategory.Agreements, status: "Draft" },
  { id: "3", title: "Customer Questionnaire", category: FormCategory.Questionnaires, status: "Active" },
  { id: "4", title: "Wedding Proposal", category: FormCategory.Proposals, status: "Active" },
  { id: "5", title: "Lead Capture Form", category: FormCategory.Inquiry, status: "Active" },
  // Add more sample forms as needed
];

const FormsModule: React.FC = () => {
  // Organize forms by category for easy column population
  const formsByCategory = Object.values(FormCategory).reduce((acc, category) => {
    acc[category] = sampleTemplates.filter((form) => form.category === category);
    return acc;
  }, {} as Record<FormCategory, FormTemplate[]>);

  // Optional state to track selected form if you want to enable editing on selection
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  return (
    <div style={{ padding: "1rem" }}>
      {/* Page Header */}
           <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        < FileSignature className="w-6 h-6 text-coral-500" />
        Reports
      </h1>
      <Header title="Forms Management" subtitle="Manage all your contracts, agreements, questionnaires, proposals, and lead capture forms" />

      {/* Forms Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            {Object.values(FormCategory).map((category) => (
              <th
                key={category}
                style={{
                  borderBottom: "2px solid #ccc",
                  padding: "0.75rem",
                  textAlign: "left",
                  backgroundColor: "#f9f9f9",
                  verticalAlign: "top",
                }}
              >
                {category}
                <br />
                <button
                  style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}
                  onClick={() => {
                    // Logic to add a new form in this category (expand as needed)
                    alert(`Add new form to ${category}`);
                  }}
                >
                  + New Form
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Calculate max number of forms in any category to define number of rows */}
          {Array.from({
            length: Math.max(
              ...Object.values(formsByCategory).map((forms) => forms.length)
            ),
          }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(FormCategory).map((category) => {
                const form = formsByCategory[category][rowIndex];
                return (
                  <td
                    key={category}
                    style={{
                      borderBottom: "1px solid #eee",
                      padding: "0.5rem",
                      verticalAlign: "top",
                      cursor: form ? "pointer" : "default",
                      backgroundColor:
                        form && form.id === selectedFormId ? "#eef6fc" : "transparent",
                    }}
                    onClick={() => form && setSelectedFormId(form.id)}
                    title={form ? `${form.title} (${form.status})` : ""}
                  >
                    {form ? (
                      <>
                        <strong>{form.title}</strong>
                        <br />
                        <small>Status: {form.status}</small>
                      </>
                    ) : (
                      <em style={{ color: "#aaa" }}>—</em>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Optional: Display details or editor below the table when a form is selected */}
      {selectedFormId && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fafafa",
          }}
        >
          {/* Locate selected form */}
          {(() => {
            const selectedForm = sampleTemplates.find((f) => f.id === selectedFormId);
            if (!selectedForm) return <p>Form not found.</p>;
            return (
              <>
                <h3>Editing: {selectedForm.title}</h3>
                <p>
                  Category: {selectedForm.category} <br />
                  Status: {selectedForm.status}
                </p>
                {/* Placeholder for your form editor UI */}
                <p><i>Form builder/edit UI goes here...</i></p>
                {/* Add buttons for saving, updating status, etc. */}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default FormsModule;
