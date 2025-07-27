// src/pages/Forms.tsx
import React, { useState, useMemo } from "react";
import { FileSignature, Plus } from "lucide-react";
import Header from "../components/Header";
// Adjust import paths as needed:
import { formTemplatesMock, FormTemplate } from "../data/mockdata";

// Move your enum to a shared location if you want to, but here's the local setup again for clarity
export enum FormCategory {
  Contracts = "Contracts",
  Agreements = "Agreements",
  Questionnaires = "Questionnaires",
  Proposals = "Proposals",
  Inquiry = "Inquiry / Lead Capture",
}

const FormsModule: React.FC = () => {
  // Use state for templates so you can add/edit later
  const [templates, setTemplates] = useState<FormTemplate[]>(formTemplatesMock);

  // Sorting states
  const [sortBy, setSortBy] = useState<"title" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // UseMemo for efficient sorting on state change
  const sortedTemplates = useMemo(() => {
    return [...templates].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "title") {
        cmp = a.title.localeCompare(b.title);
      } else if (sortBy === "createdAt") {
        cmp = a.createdAt.localeCompare(b.createdAt);
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [templates, sortBy, sortOrder]);

  // Group forms by category for table columns
  const formsByCategory = useMemo(
    () =>
      Object.values(FormCategory).reduce<Record<FormCategory, FormTemplate[]>>(
        (acc, category) => {
          acc[category] = sortedTemplates.filter(
            (form) => form.category === category
          );
          return acc;
        },
        {} as Record<FormCategory, FormTemplate[]>
      ),
    [sortedTemplates]
  );

  // Example selection state (prepare for 'create/view/edit' modal logic)
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  return (
    <div className="p-6">
      {/* Unified Header */}
      <Header title="Forms" icon={FileSignature} />

      {/* Sorting controls */}
      <div className="flex gap-4 mb-4">
        <label>
          Sort by:{" "}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "title" | "createdAt")}
            className="border px-2 py-1 rounded"
          >
            <option value="title">Title</option>
            <option value="createdAt">Created At</option>
          </select>
        </label>
        <label>
          Order:{" "}
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "asc" | "desc")
            }
            className="border px-2 py-1 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Forms Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {Object.values(FormCategory).map((category, index) => (
                <th
                  key={category}
                  className={`mr-6 px-4 py-6 text-md text-bold font-medium text-white uppercase tracking-wider bg-gradient-to-r from-coral-400 to-pink-400 rounded-t-lg border-t border-x border-b-0 relative z-10 ${
                    index < Object.values(FormCategory).length - 1 ? "mr-6" : ""
                  }`}
                >
                  <div className="flex items-center justify-between pt-4">
                    <span>{category}</span>
                    <Plus
                      className="h-4 w-4 text-white cursor-pointer"
                      title="Add New Form"
                      onClick={() => {
                        // e.g. open modal, set new form state, etc
                      }}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({
              length: Math.max(
                ...Object.values(formsByCategory).map(
                  (forms) => forms.length
                )
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
                      } ${
                        form && form.id === selectedFormId
                          ? "bg-coral-50"
                          : ""
                      } ${index < Object.values(FormCategory).length - 1 ? "mr-6" : ""}`}
                      onClick={() => form && setSelectedFormId(form.id)}
                      title={form ? form.title : ""}
                    >
                      {form ? (
                        <>
                          <strong className="font-medium text-gray-900">
                            {form.title}
                          </strong>
                          <br />
                          <span className="text-xs text-gray-400">
                            {new Date(form.createdAt).toLocaleDateString()}
                          </span>
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

      {/* Example selected form panel / placeholder */}
      {selectedFormId && (
        <div className="mt-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          {(() => {
            const selectedForm = templates.find(
              (f) => f.id === selectedFormId
            );
            if (!selectedForm)
              return (
                <p className="text-sm text-gray-600">Form not found.</p>
              );
            return (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedForm.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Category: {selectedForm.category}
                  <br />
                  Created: {new Date(selectedForm.createdAt).toLocaleString()}
                </p>
                {/* Replace with real form builder/editor */}
                <p className="text-sm text-gray-500 italic">
                  <i>Form builder/edit UI goes here…</i>
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
