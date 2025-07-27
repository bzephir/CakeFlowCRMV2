// src/pages/Forms.tsx
import React, { useState } from "react";
import { FileSignature, Plus } from "lucide-react"; // Icons
import Header from "../components/Header"; // Adjust path as needed

// Enum for form categories
export enum FormCategory {
  Contracts = "Contracts",
  Agreements = "Agreements",
  Questionnaires = "Questionnaires",
  Proposals = "Proposals",
  Inquiry = "Inquiry / Lead Capture",
}

// Interface defining the shape of a form template
interface FormTemplate {
  id: string;
  title: string;
  category: FormCategory;
  status: "Draft" | "Active" | "Archived";
}

// Sample static data (replace or fetch from API/backend)
const sampleTemplates: FormTemplate[] = [
  { id: "1", title: "Standard Contract", category: FormCategory.Contracts, status: "Active" },
  { id: "2", title: "Custom Agreement", category: FormCategory.Agreements, status: "Draft" },
  { id: "3", title: "Customer Questionnaire", category: FormCategory.Questionnaires, status: "Active" },
  { id: "4", title: "Wedding Proposal", category: FormCategory.Proposals, status: "Active" },
  { id: "5", title: "Lead Capture Form", category: FormCategory.Inquiry, status: "Active" },
];

const FormsModule: React.FC = () => {
  // Group forms by category for populating columns
  const formsByCategory = Object.values(FormCategory).reduce<Record<FormCategory, FormTemplate[]>>((acc, category) => {
    acc[category] = sampleTemplates.filter((form) => form.category === category);
    return acc;
  }, {} as Record<FormCategory, FormTemplate[]>);

  // Track which form is currently selected
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  return (
    <div className="p-6">
      {/* Page Header - reusing the same Header from reports */}
      <Header title="Forms" icon={FileSignature} />

      {/* Forms Table Box */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mt-6">   
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {Object.values(FormCategory).map((category) => (
                <th
                  key={category}
                  className="px-6 py-3 px-4 pt-4 pb-2 text-left text-xs font-medium text-gray-900 uppercase tracking-wider align-top bg-gradient-to-r from-coral-400 to-pink-400 rounded-t-lg border-t border-x border-coral-200 border-b-0 relative z-10 "
                >
                  {category}
                  <button
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-coral-400 hover:bg-coral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-all mt-2"
                    onClick={() => {
                      // Replace with your Add New Form UI flow
                      alert(`Add new form to ${category}`);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    New Form
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Calculate max rows dynamically */}
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

      {/* Selected Form Details / Editor Placeholder */}
      {selectedFormId && (
        <div className="mt-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          {(() => {
            const selectedForm = sampleTemplates.find((f) => f.id === selectedFormId);
            if (!selectedForm) return <p className="text-sm text-gray-600">Form not found.</p>;
            return (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Editing: {selectedForm.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {selectedForm.category}
                  <br />
                  Status: {selectedForm.status}
                </p>
                {/* Insert your real form builder or editor here */}
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
};

export default FormsModule;
