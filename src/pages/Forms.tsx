// src/pages/Forms.tsx
import React, { useState } from "react";
import { FileSignature, Plus } from "lucide-react"; // Icons
import { mockOrdersList } from '../data/mockData';
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
  createdAt: string;
}

// Sample static data (replace or fetch from API/backend)
const sampleTemplates: FormTemplate[] = [
  { id: "1", title: "Standard Contract", category: FormCategory.Contracts, createdAt: '2024-01-01T10:00:00Z' },
  { id: "2", title: "Custom Agreement", category: FormCategory.Agreements, createdAt: "Draft" },
  { id: "3", title: "Customer Questionnaire", category: FormCategory.Questionnaires, createdAt: "Active" },
  { id: "4", title: "Wedding Proposal", category: FormCategory.Proposals, createdAt: "Active" },
  { id: "5", title: "Lead Capture Form", category: FormCategory.Inquiry, createdAt: "Active" },
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
              {Object.values(FormCategory).map((category, index) => (
                <th
                  key={category}
                  className={`mr-6 px-4 py-6 text-md text-bold font-medium text-white uppercase tracking-wider bg-gradient-to-r from-coral-400 to-pink-400 rounded-t-lg border-t border-x border-b-0 relative z-10 ${index < Object.values(FormCategory).length - 1 ? 'mr-6' : ''}`}
                >
                 <div className="flex items-center justify-between pt-4">
                   <span>{category}</span>
                   <Plus className="h-4 w-4 text-white" />
                 </div>
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
                {Object.values(FormCategory).map((category, index) => {
                  const form = formsByCategory[category][rowIndex];
                  return (
                    <td
                      key={category}
                      className={`px-6 py-6 whitespace-nowrap align-top ${
                        form ? "cursor-pointer" : ""
                      } ${form && form.id === selectedFormId ? "bg-coral-50" : ""} ${index < Object.values(FormCategory).length - 1 ? 'mr-6' : ''}`}
                      onClick={() => form && setSelectedFormId(form.id)}
                      title={form ? `${form.title} (${form.status})` : ""}
                    >
                      {form ? (
                        <>
                          <strong className="font-medium text-gray-900">{form.title}</strong>
                          <br />
                          
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
