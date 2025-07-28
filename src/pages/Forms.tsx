// src/pages/Forms.tsx
import React, { useState } from "react";
import { FileSignature, Plus } from "lucide-react";
import Header from "../components/Header";
import { formTemplatesMock, FormTemplate } from "../data/mockData";

// Optional: helper to format ISO dates nicely
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const FormsModule: React.FC = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>(formTemplatesMock);

  // Track the selected form (for now just highlighting)
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  // Handler to create a new form
  const handleNewForm = () => {
    const newId = `new-${Date.now()}`;
    const newForm: FormTemplate = {
      id: newId,
      title: "Untitled Form",
      category: "Contracts", // default category, adjust as needed
      body: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates((prev) => [...prev, newForm]);
    setSelectedFormId(newId);
  };

  return (
    <div className="p-6">
      <Header title="Forms" icon={FileSignature} />

      <div className="flex justify-between items-center my-4">
        <h2 className="text-lg font-semibold text-gray-800">Forms List</h2>
        <button
          onClick={handleNewForm}
          className="inline-flex items-center px-4 py-2 bg-coral-400 hover:bg-coral-500 text-white rounded shadow-sm transition focus:outline-none"
          title="Create New Form"
        >
          <Plus className="mr-2" />
          New Form
        </button>
      </div>

      <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Created
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {templates.map((form) => (
            <tr
              key={form.id}
              onClick={() => setSelectedFormId(form.id)}
              className={`cursor-pointer ${
                form.id === selectedFormId ? "bg-coral-50" : "hover:bg-gray-100"
              }`}
              title={`Click to select ${form.title}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {form.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {form.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(form.createdAt)}
              </td>
            </tr>
          ))}
          {templates.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center py-6 text-gray-400 italic">
                No forms found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FormsModule;
