// src/pages/Forms.tsx
import React, { useState, useMemo } from "react";
import { FileSignature, Plus, Trash2, Copy } from "lucide-react";
import Header from "../components/Header";
// Adjust import paths as needed:
import { formTemplatesMock, FormTemplate } from "../data/mockData";
import { useNavigate } from "react-router-dom"; // If you use react-router for navigation

/**
 * Utility to render templates with {{merge_fields}} and simple | filters (like longDate).
 * (Still included for future preview or utility use)
 */
function renderTemplate(
  template: string,
  data: Record<string, any>
): string {
  return template.replace(/{{\s*([\w.]+)(\s*\|\s*[\w]+)?\s*}}/g, (_m, path, filterWithPipe) => {
    const value = path.split('.').reduce((o, k) => (o ? o[k] : undefined), data);
    if (filterWithPipe) {
      const [, filter] = filterWithPipe.split('|').map(s => s.trim());
      return applyFilter(value, filter);
    }
    return value ?? "";
  });
}

function applyFilter(value: any, filter?: string) {
  if (!filter) return value ?? "";
  if (filter === "longDate" && value)
    return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  if (filter === "mediumDate" && value)
    return new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  return value ?? "";
}

export enum FormCategory {
  Contracts = "Contracts",
  Agreements = "Agreements",
  Questionnaires = "Questionnaires",
  Proposals = "Proposals",
  Inquiry = "Inquiry / Lead Capture",
}

// Helper to format ISO string dates nicely
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const FormsModule: React.FC = () => {
  const [templates, setTemplates] = useState<FormTemplate[]>(formTemplatesMock);

  const [sortBy, setSortBy] = useState<"title" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  const sortedTemplates = useMemo(() => {
    return [...templates].sort((a, b) => {
      const compareVal =
        sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.createdAt.localeCompare(b.createdAt);
      return sortOrder === "asc" ? compareVal : -compareVal;
    });
  }, [templates, sortBy, sortOrder]);

  const categories = Object.values(FormCategory);
  const [selectedCategory, setSelectedCategory] = useState<FormCategory>(categories[0]);

  const templatesForCategory = sortedTemplates.filter(t => t.category === selectedCategory);

  // Reset selected template ID if none or category changes (optional; not currently used in UI)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      setTemplates(prev => prev.filter(t => t.id !== id));
      if (selectedTemplateId === id) setSelectedTemplateId(null);
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
    const newId = `new-${Date.now()}`;
    const newTemplate: FormTemplate = {
      id: newId,
      title: `New ${selectedCategory} Form`,
      category: selectedCategory,
      body: `New form content here...`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
    setSelectedTemplateId(newId);
  };

  return (
    <div className="p-6">
      <Header title="Forms" icon={FileSignature} />

      {/* Sorting Controls */}
      <div className="flex gap-4 mb-4">
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
      </div>

      {/* Category Tabs */}
      <div className="flex gap-12 mb-8 border-b border-gray-300">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedTemplateId(null);
            }}
            className={`text-md font-semibold px-6 py-2 rounded-t-lg transition focus:outline-none ${
              category === selectedCategory
                ? "bg-coral-400 text-white shadow-md border border-b-transparent rounded-t-lg"
                : "bg-gray-100 text-gray-600 hover:bg-coral-100 border border-transparent hover:border-coral-300"
            }`}
            style={{ minWidth: 160, letterSpacing: 0.6 }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* New Form Button */}
      <div className="flex justify-end mb-4">
        <button
          className="inline-flex items-center px-4 py-2 bg-coral-400 hover:bg-coral-500 text-white rounded shadow-sm transition focus:outline-none"
          title={`Add new form to ${selectedCategory}`}
          onClick={handleNewForm}
        >
          <Plus className="mr-2" />
          New {selectedCategory.split(" ")[0]}
        </button>
      </div>

      {/* Table listing forms under the selected category */}
      <div>
        {templatesForCategory.length === 0 ? (
          <div className="italic text-gray-500">No forms in this category</div>
        ) : (
          <table className="min-w-full border border-gray-200 rounded-md shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2 border-b border-gray-200 text-gray-700 font-medium">
                  Form Name
                </th>
                <th className="text-left px-4 py-2 border-b border-gray-200 text-gray-700 font-medium w-36">
                  Created Date
                </th>
                <th className="text-center px-4 py-2 border-b border-gray-200 text-gray-700 font-medium w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {templatesForCategory.map(form => (
                <tr key={form.id} className="hover:bg-coral-50">
                  <td className="px-4 py-3 border-b border-gray-200">
                    <span
                      onClick={() => handleFormClick(form.id)}
                      role="link"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleFormClick(form.id);
                        }
                      }}
                      className="text-coral-600 hover:underline cursor-pointer select-none"
                      title={`Open ${form.title}`}
                    >
                      {form.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-600">
                    {formatDate(form.createdAt)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-center space-x-3">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FormsModule;
