import React, { useState } from "react";
import { renderTemplate } from "../utils/mergeFields";
import { FormTemplate } from "../types/FormTemplate";

const exampleData = {
  client: { name: "Alexa Client" },
  curDate: new Date().toISOString(),
  designDescription: "3-tier rose gold cake with floral accents",
  flavors: "Vanilla, Chocolate",
  guestCount: 100,
  job: { start: "2025-10-04T16:00:00Z" },
  dueDate: "2025-09-15T00:00:00Z",
  bakery: { website: "www.cakecutiesbakery.com" },
};

interface Props {
  template: FormTemplate;
  onChange: (newBody: string) => void;
}

export const ContractEditorPreview: React.FC<Props> = ({ template, onChange }) => {
  const [editValue, setEditValue] = useState(template.body);

  // When edit changes, propagate up to parent for save
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex gap-8 mt-6 w-full">
      {/* Editor */}
      <div className="flex-1">
        <div className="text-md font-semibold mb-2 text-coral-600">Contract Template Editor</div>
        <textarea
          className="w-full min-h-[340px] p-4 border border-gray-300 rounded-lg font-mono text-gray-800 shadow-sm focus:outline-coral-400"
          value={editValue}
          onChange={handleChange}
          spellCheck={false}
        />
      </div>
      {/* Preview */}
      <div className="flex-1">
        <div className="text-md font-semibold mb-2 text-coral-600">Preview with Sample Data</div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200 font-mono whitespace-pre-line text-gray-800 min-h-[340px]">
          {renderTemplate(editValue, exampleData)}
        </div>
      </div>
    </div>
  );
};
