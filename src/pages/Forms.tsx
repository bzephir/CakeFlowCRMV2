// src/pages/Forms.tsx
import React, { useState, useMemo } from "react";
import { FileSignature, Plus, Trash2, Copy } from "lucide-react";
import Header from "../components/Header";
import { formTemplatesMock, FormTemplate } from "../data/mockData";
import { useNavigate } from "react-router-dom"; // If you use react-router for navigation

export enum FormCategory {
  Contracts = "Contracts",
  Agreements = "Agreements",
  Questionnaires = "Questionnaires",
  Proposals = "Proposals",
  Inquiry = "Inquiry / Lead Capture",
}

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

  // Sort all templates once globally by selected sorting options
  const sortedTemplates = useMemo(() => {
    return [...templates].sort((a, b) => {
      const compareVal =
        sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.createdAt.localeCompare(b.createdAt);
      return sortOrder === "asc" ? compareVal : -compareVal;
    });
  }, [templates, sortBy, sortOrder]);

  // Group sorted templates by category
  const templatesByCategory = useMemo(() => {
    return Object.values(FormCategory).reduce((acc, category) => {
      acc[category] = sortedTemplates.filter(t => t.category === category);
      return acc;
    }, {} as Record<FormCategory, FormTemplate[]>);
  }, [sortedTemplates]);

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
    const newId = `new-${Date.now()}`;
    const newTemplate: FormTemplate = {
      id: newId,
      title: "New Form",
      category: FormCategory.Contracts,
      body: "New form content here...",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTemplates(prev => [...prev, newTemplate]);
  };

  return (
    <div className="p-6">
      <Header title="Forms" icon={FileSignature} />

      {/* Sorting Controls */}
      <div className="flex gap-4 mb-6 items-center flex-wrap">
        <label>
          <span className="mr-2 text-gray-700 font-semibold">Sort by:</span>
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
          <span className="mr-2 text-gray-700 font-semibold">Order:</span>
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

      {/* Forms tables grouped by category */}
      {Object.values(FormCategory).map(category => {
        const forms = templatesByCategory[category];
        return (
          <section key={category} className="mb-10 last:mb-0">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{category}</h3>
            {forms.length === 0 ? (
              <p className="italic text-gray-500">No forms in this category.</p>
            ) : (
              <table className="w-full border border-gray-200 rounded-t-lg rounded-b-lg shadow-sm">
                <thead className="bg-gray-50 rounded-t-lg">
                  <tr>
                    <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-700 font-medium rounded-tl-lg">
                      Form Name
                    </th>
                    <th className="text-left px-6 py-3 border-b border-gray-200 text-gray-700 font-medium w-36">
                      Created Date
                    </th>
                    <th className="text-center px-6 py-3 border-b border-gray-200 text-gray-700 font-medium w-28 rounded-tr-lg">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map(form => (
                    <tr key={form.id} className="hover:bg-coral-50">
                      <td className="px-6 py-4 border-b border-gray-200">
                        <span
                          role="link"
                          tabIndex={0}
                          onClick={() => handleFormClick(form.id)}
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
                      <td className="px-6 py-4 border-b border-gray-200 text-gray-600">
                        {formatDate(form.createdAt)}
                      </td>
                      <td className="px-6 py-4 border-b border-gray-200 text-center space-x-3">
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
          </section>
        );
      })}
    </div>
  );
};

export default FormsModule;
