// src/pages/Forms.tsx
import React, { useState, useMemo } from "react";
import { FileSignature, Plus } from "lucide-react";
import Header from "../components/Header";
// Adjust import paths as needed:
import { formTemplatesMock, FormTemplate } from "../data/mockData";

/**
 * Utility to render templates with {{merge_fields}} and simple | filters (like longDate).
 * (Still included in case you want to preview later or reuse utility)
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

const FormsModule: React.FC = () => {
  // Editable templates state
  const [templates, setTemplates] = useState<FormTemplate[]>(formTemplatesMock);

  // Sorting controls state
  const [sortBy, setSortBy] = useState<"title" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sorted templates, memoized
  const sortedTemplates = useMemo(() => {
    return [...templates].sort((a, b) => {
      const compareVal =
        sortBy === "title"
          ? a.title.localeCompare(b.title)
          : a.createdAt.localeCompare(b.createdAt);
      return sortOrder === "asc" ? compareVal : -compareVal;
    });
  }, [templates, sortBy, sortOrder]);

  // Categories and state for selected category/tab
  const categories = Object.values(FormCategory);
  const [selectedCategory, setSelectedCategory] = useState<FormCategory>(categories[0]);

  // Templates filtered by selected category
  const templatesForCategory = sortedTemplates.filter(t => t.category === selectedCategory);

  // Currently selected template ID
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templatesForCategory[0]?.id || "");

  // Update selectedTemplateId if templatesForCategory changes and no longer contains the current selectedTemplateId
  React.useEffect(() => {
    if (!templatesForCategory.some(t => t.id === selectedTemplateId)) {
      setSelectedTemplateId(templatesForCategory[0]?.id || "");
    }
  }, [templatesForCategory, selectedTemplateId]);

  return (
    <div className="p-6">
      {/* Page Header */}
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
              // Reset selected template on category change:
              const firstTemplate = sortedTemplates.find(t => t.category === category);
              setSelectedTemplateId(firstTemplate?.id || "");
            }}
            className={`text-md font-semibold px-6 py-2 rounded-t-lg transition focus:outline-none ${
              category === selectedCategory
                ? "bg-coral-400 text-white shadow-md border border-b-transparent rounded-t-lg"
                : "bg-gray-100 text-gray-600 hover:bg-coral-100 border border-transparent hover:border-coral-300"
            }`}
            style={{ min
