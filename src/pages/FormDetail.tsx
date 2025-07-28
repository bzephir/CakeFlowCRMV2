// src/components/FormDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formTemplatesMock } from "../data/mockData";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react"; // Back arrow icon

interface RouteParams {
  id: string;
}

// Simple function to replace placeholders with sample data
function fillPlaceholders(template: string): string {
  return template
    .replace(/{{client.name}}/g, "Jane Smith")
    .replace(
      /{{curDate \| longDate}}/g,
      new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    )
    .replace(/{{job.start \| mediumDate}}/g, "August 15, 2025")
    .replace(/{{job.invoice.title}}/g, "Invoice #12345")
    .replace(/{{job.invoice \| packageItems:true}}/g, "- Cake Design\n- Delivery Fee")
    .replace(/{{job.invoice \| total}}/g, "$1,250")
    .replace(/{{paymentSchedule \| paymentScheduleFilter}}/g, "- 20% Deposit (non-refundable)\n- 80% Final Payment");
}

// ... other imports remain the same
const FormDetail: React.FC = () => {
  // ... existing code
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-sm">
      {/* Back button as before */}
      {/* ... existing back button and title */}

      <ReactMarkdown /* ...existing props */>
        {filledBody}
      </ReactMarkdown>

      {/* Signature inputs below */}
      <div className="mt-8 space-y-8">
        <div>
          <h2 className="font-semibold mb-2">Client Signature</h2>
          <div className="flex space-x-4 max-w-md">
            <label className="flex flex-col flex-1">
              First Name
              <input
                type="text"
                name="clientFirstName"
                placeholder="First Name"
                className="border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </label>
            <label className="flex flex-col flex-1">
              Last Name
              <input
                type="text"
                name="clientLastName"
                placeholder="Last Name"
                className="border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </label>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Owner Signature</h2>
          <div className="flex space-x-4 max-w-md">
            <label className="flex flex-col flex-1">
              First Name
              <input
                type="text"
                name="ownerFirstName"
                placeholder="First Name"
                className="border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </label>
            <label className="flex flex-col flex-1">
              Last Name
              <input
                type="text"
                name="ownerLastName"
                placeholder="Last Name"
                className="border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
