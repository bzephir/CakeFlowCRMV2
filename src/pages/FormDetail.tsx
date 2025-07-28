// src/components/FormDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { clientDataByFormId } from "../data/clientInfo";
import { adminInfo } from "../data/adminInfo";
import SignatureBlock from "./SignatureBlock";
import { formTemplatesMock } from "../data/mockData";

interface RouteParams {
  id: string;
}

// Helper: Replace placeholders in the contract body with actual data
function fillPlaceholders(template: string, clientName: string): string {
  return template
    .replace(/{{client.name}}/g, clientName)
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

  // Find form by id
  const form = formTemplatesMock.find((f) => f.id === id);
  if (!form) {
    return <div className="p-6 text-red-600">Form not found</div>;
  }
const client = clientDataByFormId[form.id] || { firstName: "", lastName: "", fullName: "" };
const owner = adminInfo;
 
  // Fill placeholders in contract body before rendering markdown
  const clientFullName = `${client.firstName || ""} ${client.lastName || ""}`.trim() || client.name || "";
  const filledBody = fillPlaceholders(form.body, clientFullName);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-sm">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-coral-600 hover:text-coral-800 mb-6 focus:outline-none"
        aria-label="Go back"
        type="button"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back</span>
      </button>

      {/* Contract Title */}
      <h1 className="text-3xl font-bold mb-6">{form.title}</h1>

      {/* Contract Body rendered with Markdown */}
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

      {/* Signature Section */}
      <div className="mt-10">
        <SignatureBlock
          role="Client"
          firstName={client.firstName}
          lastName={client.lastName}
        />
        <SignatureBlock
          role="Owner"
          showAdminNote
          firstName={owner.firstName}
          lastName={owner.lastName}
        />
      </div>
    </div>
  );
};

export default FormDetail;
