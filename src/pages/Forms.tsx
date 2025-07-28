// src/pages/Forms.tsx
import React, { useState, useMemo } from "react";
import { FileSignature, Plus, Trash2, Copy } from "lucide-react";
import Header from "../components/Header";
import { formTemplatesMock, FormTemplate } from "../data/mockData";
import { useNavigate } from "react-router-dom";

export enum FormCategory {
  Contracts = "Contracts",
  Agreements = "Agreements",
  Questionnaires = "Questionnaires",
  Proposals = "Proposals",
  Inquiry = "Inquiry / Lead Capture",
}

const FormsModule: React.FC = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>(formTemplatesMock);

  const [sortBy, setSortBy] = useState<"title" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  const categories = Object.values(FormCategory);

  // Sort all templates globally by selected sortBy/sortOrder
  const sortedTemplates = useMemo(() => {
    return [...templates].sort((a, b) => {
      const compareVal =
        sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.createdAt.localeCompare(b.createdAt);
      return sortOrder === "asc" ? compareVal : -compareVal;
    });
  }, [templates, sortBy, sortOrder]);

  // Group templates by category
  const templatesByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = sortedTemplates.filter(t => t.category === category);
      return acc;
    }, {} as Record<FormCategory, FormTemplate[]>);
  }, [sortedTemplates, categories]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleDuplicate = (id: string) => {
    const toDuplicate = templates.find(t => t.id === id);
    if (!toDuplicate) return;
    const newId = `dup-${Date.now()}`;
    const duplicatedForm: FormTemplate = {
      ...toDuplicate,
      id: newId,
      title: toDuplicate.title + " (Copy)",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, duplicatedForm]);
  };

  const handleFormClick = (id: string) => {
    navigate(`/forms/mock/${id}`);
  };

  const handleNewForm = () => {
    // By default put new forms in first category
    const newId = `new-${Date.now()}`;
    const newTemplate: FormTemplate = {
      id: newId,
      title: `New Form`,
      category: categories[0],
      body: "New form content here...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  // Get max forms count in any category for table row alignment
  const maxFormsCount = Math.max(...categories.map(cat => templatesByCategory[cat].length));

  return (
    <div className="p-6">
      <Header title="Forms" icon={FileSignature} />

      {/* Sorting Controls + New Form Button */}
      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <label>
          Sort by:{" "}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as "title" | "createdAt")}
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
            onChange={e => setSortOrder(e.target.value as "asc" | "desc")}
            className="border px-2 py-1 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>

        <button
          onClick={handleNewForm}
          className="ml-auto inline-flex items-center px-4 py-2 bg-coral-400 hover:bg-coral-500 text-white rounded shadow-sm transition focus:outline-none"
          title="Create new form"
        >
          <Plus className="mr-2" />
          New Form
        </button>
      </div>

      {/* Multi-column Table with category headers and vertical lists */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm table-fixed">
          <thead>
            <tr>
              {categories.map((category, index) => (
                <th
                  key={category}
                  // Rounded top corners only on first and last headers
                  className={`px-6 py-4 border border-transparent text-left align-top font-semibold text-white whitespace-nowrap bg-gradient-to-r from-coral-400 to-pink-400 ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${index === categories.length - 1 ? "rounded-tr-lg" : ""}`}
                  style={{ minWidth: 220, letterSpacing: 0.6 }}
                >
                  {category}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxFormsCount }).map((_, rowIndex) => (
              <tr key={rowIndex} className="bg-white">
                {categories.map((category) => {
                  const formsInCat = templatesByCategory[category];
                  const form = formsInCat[rowIndex];

                  return (
                    <td
                      key={category}
                      className="px-6 py-6 border border-gray-200 align-top text-sm"
                      style={{ minWidth: 220, verticalAlign: "top" }}
                    >
                      {form ? (
                        <div className="flex flex-col space-y-2">
                          <span
                            role="link"
                            tabIndex={0}
                            onClick={() => handleFormClick(form.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleFormClick(form.id);
                              }
                            }}
                            className="cursor-pointer text-coral-600 hover:underline select-none font-semibold"
                            title={`Open ${form.title}`}
                          >
                            {form.title}
                          </span>
                          <div className="flex space-x-3 mt-1">
                            <button
                              onClick={() => handleDuplicate(form.id)}
                              className="text-gray-600 hover:text-coral-600 focus:outline-none"
                              title={`Duplicate ${form.title}`}
                              aria-label={`Duplicate ${form.title}`}
                            >
                              <Copy size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(form.id)}
                              className="text-red-600 hover:text-red-800 focus:outline-none"
                              title={`Delete ${form.title}`}
                              aria-label={`Delete ${form.title}`}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormsModule;
