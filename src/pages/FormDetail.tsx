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

const FormDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const form = formTemplatesMock.find((f) => f.id === id);

  if (!form) return <div>Form not found</div>;

  const filledBody = fillPlaceholders(form.body);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-sm">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-coral-600 hover:text-coral-800 mb-6 focus:outline-none"
        aria-label="Go back"
        type="button"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-6">{form.title}</h1>

      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold my-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-semibold my-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-semibold my-2" {...props} />,
          p: ({ node, ...props }) => <p className="mb-3 leading-relaxed" {...props} />,
          li: ({ node, ...props }) => <li className="ml-6 list-disc mb-1" {...props} />,
          code: ({ node, ...props }) => (
            <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...props} />
          ),
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto" {...props} />
          ),
          strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
          em: ({ node, ...props }) => <em className="italic" {...props} />,
        }}
      >
        {filledBody}
      </ReactMarkdown>
    </div>
  );
};

export default FormDetail;
