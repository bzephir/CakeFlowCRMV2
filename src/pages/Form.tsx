import React, { useState } from "react";
import { FileSignature, Plus } from "lucide-react";
import Header from "../components/Header";
import { formTemplatesMock, FormTemplate } from "../mockdata";
import { FormCategory } from "../mockdata"; // or from your types file

const FormsModule: React.FC = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>(formTemplatesMock);
  const categories = Object.values(FormCategory);

  // State for which tab/category is selected
  const [selectedCategory, setSelectedCategory] = useState<FormCategory>(categories[0]);
  // For focusing create/edit modal logic later
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  // Get forms for selected category
  const formsForCategory = templates.filter(f => f.category === selectedCategory);

  return (
    <div className="p-6">
      <Header title="Forms" icon={FileSignature} />

      {/* Top Tabs/Categories */}
      <div className="flex gap-12 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedFormId(null);
            }}
            className={`text-lg font-semibold px-6 py-2 rounded-t-lg transition 
              ${
                category === selectedCategory
                ? "bg-coral-400 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-coral-100"
              }`}
            style={{ minWidth: 180, letterSpacing: 0.8, marginRight: 32 }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* New Form Button for Current Category */}
      <div className="flex justify-end mb-4">
        <button
          className="inline-flex items-center px-4 py-2 bg-coral-400 hover:bg-coral-500 text-white rounded shadow-sm transition"
          onClick={() => {
            // Open modal/logic for new form; pre-fill category = selectedCategory
          }}
        >
          <Plus className="mr-2" /> New {selectedCategory.split(' ')[0]} Form
        </button>
      </div>

      {/* List of forms under selected category */}
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
                  className={`w-full text-left px-5 py-3 rounded-lg shadow-sm bg-white hover:bg-coral-50 border border-gray-200 flex justify-between items-center 
                    ${form.id === selectedFormId ? "ring-2 ring-coral-400" : ""}
                  `}
                  onClick={() => setSelectedFormId(form.id)}
                >
                  <span className="font-medium text-gray-800">{form.title}</span>
                  {/* Add icons or minimal info if desired */}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Example selected form details panel (keep minimal, or modal/pop-in as desired) */}
      {selectedFormId && (
        <div className="mt-8 mx-auto max-w-lg p-6 border border-gray-200 rounded-lg shadow bg-white">
          {(() => {
            const selectedForm = templates.find(f => f.id === selectedFormId);
            if (!selectedForm)
              return <p className="text-sm text-gray-600">Form not found.</p>;
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-coral-600">{selectedForm.title}</h3>
                  {/* Add edit/delete buttons */}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Category: {selectedForm.category}
                </div>
                {/* Insert form builder/editor here */}
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
