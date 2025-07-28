// src/pages/Forms.tsx
import React, { useState, useMemo } from "react";
import { FileSignature, Plus } from "lucide-react";
import Header from "../components/Header";
// Adjust import paths as needed:
import { formTemplatesMock, FormTemplate } from "../data/mockData";

/**
 * Utility to render templates with {{merge_fields}} and simple | filters (like longDate).
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

const exampleMergeData = {
  client: { name: "Alexa Client" },
  curDate: new Date().toISOString(),
  designDescription: "3-tier rose gold cake with floral accents",
  flavors: "Vanilla, Chocolate",
  guestCount: 100,
  job: { start: "2025-10-04T16:00:00Z" },
  dueDate: "2025-09-15T00:00:00Z",
  bakery: { website: "www.cakecutiesbakery.com" },
};

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

  // Currently selected template for editing/preview
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templatesForCategory[0]?.id || "");

  // Find the selected template object
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);

  // Editor textarea state synced with selected template body
  // Initialize local state when selected template changes
  const [editBody, setEditBody] = useState(selectedTemplate?.body || "");

  // Keep editBody synced when selectedTemplate changes
  React.useEffect(() => {
    setEditBody(selectedTemplate?.body || "");
  }, [selectedTemplateId, selectedTemplate]);

  // Handle edit changes and update main templates state
  function handleBodyChange(value: string) {
    setEditBody(value);
    setTemplates(oldTemplates =>
      oldTemplates.map(t =>
        t.id === selectedTemplateId ? { ...t, body: value } : t
      )
    );
  }

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
          onClick={() => {
            // Create new form template with temporary id
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
          }}
        >
          <Plus className="mr-2" />
          New {selectedCategory.split(" ")[0]}
        </button>
      </div>

      {/* Template Selection Buttons */}
      <div className="flex gap-3 mb-6 overflow-x-auto">
        {templatesForCategory.length === 0 && (
          <div className="italic text-gray-500">No forms in this category</div>
        )}
        {templatesForCategory.map(template => (
          <button
            key={template.id}
            className={`px-4 py-2 rounded-lg border transition whitespace-nowrap ${
              template.id === selectedTemplateId
                ? "bg-coral-400 text-white border-coral-500"
                : "bg-white border-gray-300 hover:bg-coral-50"
            }`}
            onClick={() => setSelectedTemplateId(template.id)}
          >
            {template.title}
          </button>
        ))}
      </div>

      {/* Editor & Preview */}
      {selectedTemplate ? (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Editor */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2 text-coral-600">Edit Contract Template</h2>
            <textarea
              spellCheck={false}
              className="w-full min-h-[320px] p-4 border border-gray-300 rounded-lg font-mono text-gray-800 shadow-sm focus:outline-coral-400 resize-y"
              value={editBody}
              onChange={e => handleBodyChange(e.target.value)}
            />
          </div>
          {/* Live Preview */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold mb-2 text-coral-600">Live Preview</h2>
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 font-mono whitespace-pre-line text-gray-800 min-h-[320px] overflow-auto">
              {renderTemplate(editBody, exampleMergeData)}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500 italic">Select or create a form to edit</div>
      )}
    </div>
  );
};

export default FormsModule;
