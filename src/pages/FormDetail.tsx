// src/components/FormDetail.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import SignatureBlock from "../components/SignatureBlock";
import {formTemplatesMock} from "../data/mockForms"; // adjust if needed
import { clientDataByFormId } from "../data/clientInfo"; // update per your data files
import { adminInfo } from "../data/adminInfo";

interface RouteParams {
  id: string;
}

function fillPlaceholders(template: string, clientFullName: string): string {
  return template
    .replace(/{{client.name}}/g, clientFullName)
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

interface FormDetailProps {
  isAdminView: boolean;
}

const FormDetail: React.FC<FormDetailProps> = ({ isAdminView }) => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const form = formTemplatesMock.find((f) => f.id === id);
  if (!form) {
    return <div className="p-6 text-red-600">Form not found</div>;
  }

  // Lookup client and owner info
 const client = clientDataByFormId[form.id] || { firstName: "", lastName: "", fullName: "" };
  const owner = adminInfo;

  const isAttachedToClient = client.firstName !== "" && client.lastName !== "";

  // Determine input editability:
  // Admin can always edit
  // Client can only edit their signature box, first/last names read-only
  // When form unassigned (no client attached), admin editing only, client view won't apply
  const inputsReadOnly = !(isAdminView) && isAttachedToClient; // true if client view with attached form

  // Submit button appears only for client view with attached form
  const showSubmitButton = !isAdminView && isAttachedToClient;

  const filledBody = fillPlaceholders(form.body, client.fullName);

  const handleSubmit = () => {
    // TODO: your submission logic
    alert("Form submitted!");
  };

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

      {/* Form Title */}
      <h1 className="text-3xl font-bold mb-6">{form.title}</h1>

      {/* Contract content rendered with markdown */}
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

      {/* Signature blocks */}
      <div className="mt-10">
        <SignatureBlock
          role="Client"
          firstName={client.firstName}
          lastName={client.lastName}
          readOnly={inputsReadOnly}
          clientCanSignOnly={true} // client can sign only signature box when readOnly
        />
        <SignatureBlock
          role="Owner"
          showAdminNote
          firstName={owner.firstName}
          lastName={owner.lastName}
          readOnly={inputsReadOnly}
        />
      </div>

      {/* Agree and Submit button for client */}
      {showSubmitButton && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-coral-600 text-white px-6 py-3 rounded hover:bg-coral-700 focus:outline-none focus:ring-2 focus:ring-coral-500"
          >
            Agree and Submit
          </button>
        </div>
      )}

      {/* Internal preparation info message for client view with no client attached */}
      {!isAdminView && !isAttachedToClient && (
        <p className="mt-6 text-gray-600 italic">
          This form is in internal preparation mode. Client information is not attached yet.
        </p>
      )}
    </div>
  );
};

export default FormDetail;
