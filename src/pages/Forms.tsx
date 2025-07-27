// src/pages/Forms.tsx
import React, { useState, useMemo } from "react";
import { FileSignature, Plus } from "lucide-react";
import Header from "../components/Header";
// Adjust import paths as needed:
import { formTemplatesMock, FormTemplate } from "../data/mockData";

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

  const categories = Object.values(FormCategory);

  // State for selected category tab
  const [selectedCategory, setSelectedCategory] = useState<FormCategory>(categories[0]);

  // Forms in the selected category
  const formsForCategory = useMemo(
    () => sortedTemplates.filter((form) => form.category === selectedCategory),
    [sortedTemplates, selectedCategory]
  );

  // Selected form for detail panel
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
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border px-2 py-1 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Category tabs */}
      <div className="flex gap-12 mb-8 border-b border-gray-300">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedFormId(null);
            }}
            className={`text-md font-semibold px-6 py-2 rounded-t-lg transition focus:outline-none ${
              category === selectedCategory
                ? "bg-coral-400 text-white shadow-sm border border-b-transparent rounded-t-lg"
                : "bg-gray-100 text-gray-600 hover:bg-coral-100 border border-transparent hover:border-coral-300"
            }`}
            style={{ minWidth: 160, letterSpacing: 0.6 }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* New Form Button for selected category */}
      <div className="flex justify-end mb-4">
        <button
          className="inline-flex items-center px-4 py-2 bg-coral-400 hover:bg-coral-500 text-white rounded shadow-sm transition focus:outline-none"
          onClick={() => {
            // TODO: open the form creation modal or logic here
          }}
          title={`Add new form to ${selectedCategory}`}
        >
          <Plus className="mr-2" />
          New {selectedCategory.split(" ")[0]} Form
        </button>
      </div>

      {/* List of forms for the selected category */}
      <div>
        {formsForCategory.length === 0 ? (
          <div className="text-gray-400 py-12 text-center text-sm italic">
            No forms in this category yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {formsForCategory.map((form) => (
              <li key={form.id}>
                <button
                  className={`w-full text-left px-5 py-3 rounded-lg shadow-sm bg-white hover:bg-coral-50 border border-gray-200 flex justify-between items-center ${
                    form.id === selectedFormId ? "ring-2 ring-coral-400" : ""
                  }`}
                  onClick={() => setSelectedFormId(form.id)}
                  title={form.title}
                >
                  <span className="font-medium text-gray-800">{form.title}</span>
                  {/* Add icons or other minimal info here if desired */}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected form panel (details/editor placeholder) */}
      {selectedFormId && (
        <div className="mt-8 max-w-lg mx-auto p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
          {(() => {
            const selectedForm = templates.find((f) => f.id === selectedFormId);
            if (!selectedForm)
              return <p className="text-sm text-gray-600">Form not found.</p>;
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-coral-600">{selectedForm.title}</h3>
                  {/* Optional: add edit/delete buttons here */}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Category: {selectedForm.category}
                </div>
                {/* Insert your form builder/editor component here */}
                <div className="text-xs text-gray-400 italic">Form builder/edit UI goes here…</div>
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default FormsModule;
