import React, { useState } from "react";
import { FilePen, FileSignature, Plus } from 'lucide-react'; // Import Plus icon

// Assuming you have a reusable Header component used on Reports page
import Header from "../components/Header"; // adjust import path accordingly

export enum FormCategory  {
  Contracts: "Contracts",
  Agreements: "Agreements",
  Questionnaires: "Questionnaires",
  Proposals: "Proposals",
  Inquiry: "Inquiry / Lead Capture",
};


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
  <div className="p-6">
    {/* Page Header */}
    <Header title="Forms" icon={FileSignature} />

    {/* Forms Table */}
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Object.values(FormCategory).map((category) => (
              <th
                key={category}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider align-top"
              >
                {category}
                <button
                  className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-coral-400 hover:bg-coral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all mt-2"
                  onClick={() => {
                    alert(`Add new form to ${category}`);
                  }}
                >
                  <Plus className="h-3 w-3 mr-1" /> {/* Plus icon */}
                  New Form
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
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
                    className={`px-6 py-4 whitespace-nowrap align-top ${
                      form ? "cursor-pointer" : ""
                    } ${form && form.id === selectedFormId ? "bg-coral-50" : ""}`}
                    onClick={() => form && setSelectedFormId(form.id)}
                    title={form ? `${form.title} (${form.status})` : ""}
                  >
                    {form ? (
                      <>
                        <strong className="font-medium text-gray-900">{form.title}</strong>
                        <br />
                        <small className="text-xs text-gray-500">Status: {form.status}</small>
                      </>
                    ) : (
                      <em className="text-gray-400">—</em>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Optional: Display details or editor below the table when a form is selected */}
    {selectedFormId && (
      <div className="mt-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
        {(() => {
          const selectedForm = sampleTemplates.find((f) => f.id === selectedFormId);
          if (!selectedForm)
            return <p className="text-sm text-gray-600">Form not found.</p>;
          return (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Editing: {selectedForm.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Category: {selectedForm.category} <br />
                Status: {selectedForm.status}
              </p>
              {/* Placeholder for your form editor UI */}
              <p className="text-sm text-gray-500 italic">
                <i>Form builder/edit UI goes here...</i>
              </p>
            </>
          );
        })()}
      </div>
    )}
  </div>
);

export default FormsModule;