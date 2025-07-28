import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formTemplatesMock } from "../data/mockData";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";

interface RouteParams {
  id: string;
}

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

      {/* Signature blocks */}
      <div className="mt-10 space-y-10">
        {/* Intro text above client signature */}
        <p className="mb-4 text-gray-700">
          Please provide your full legal name in the fields below to serve as your formal signature on this contract.
        </p>

        {/* Client Signature */}
        <section>
          <h1 className="font-semibold mb-4 text-center">Signatures</h1>
          <h2 className="font-semibold mb-3">Client</h2>
          <div className="flex space-x-6 max-w-md">
            <label className="flex flex-col flex-1">
              <span className="mb-1 font-medium">First Name</span>
              <input
                type="text"
                name="clientFirstName"
                placeholder="Enter first name"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </label>
            <label className="flex flex-col flex-1">
              <span className="mb-1 font-medium">Last Name</span>
              <input
                type="text"
                name="clientLastName"
                placeholder="Enter last name"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </label>
          </div>
        </section>

        {/* Owner Signature */}
        <section>
          <h2 className="font-semibold mb-3">Owner</h2>
          <div className="flex space-x-6 max-w-md">
            <label className="flex flex-col flex-1">
              <span className="mb-1 font-medium">First Name</span>
              <input
                type="text"
                name="ownerFirstName"
                placeholder="Enter first name"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </label>
            <label className="flex flex-col flex-1">
              <span className="mb-1 font-medium">Last Name</span>
              <input
                type="text"
                name="ownerLastName"
                placeholder="Enter last name"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </label>
          </div>

          {/* Text below owner signature */}
          <p className="mt-4 text-gray-700">
            By signing above, the owner agrees to the terms and conditions outlined in this contract.
          </p>
        </section>
      </div>
    </div>
  );
};

export default FormDetail;
