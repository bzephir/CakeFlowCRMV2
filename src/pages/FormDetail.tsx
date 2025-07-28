const FormDetail: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  const form = formTemplatesMock.find((f) => f.id === id);
  if (!form) return <div className="p-6 text-red-600">Form not found</div>;

  const client = clientDataByFormId[form.id] || { firstName: "", lastName: "", fullName: "" };
  const owner = adminInfo;

  const isAttachedToClient = client.firstName !== "" && client.lastName !== "";
  const readOnly = isAttachedToClient;

  const filledBody = fillPlaceholders(form.body, client.fullName);

  const handleSubmit = () => {
    // TODO: Implement submission logic here (e.g. form validation, API call)
    alert("Form submitted!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-sm">
      {/* Back Button */}
      {/* ...existing back button code... */}

      {/* Contract Title */}
      <h1 className="text-3xl font-bold mb-6">{form.title}</h1>

      {/* Contract Body */}
      <ReactMarkdown components={{/* your markdown components */}}>
        {filledBody}
      </ReactMarkdown>

      {/* Signature blocks, pass readOnly prop */}
      <div className="mt-10">
        <SignatureBlock
          role="Client"
          firstName={client.firstName}
          lastName={client.lastName}
          readOnly={readOnly}
        />
        <SignatureBlock
          role="Owner"
          showAdminNote
          firstName={owner.firstName}
          lastName={owner.lastName}
          readOnly={readOnly}
        />
      </div>

      {/* Conditionally render the Agree and Submit button if client attached */}
      {isAttachedToClient && (
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

      {/* Optional: When no client is attached, you can render an editable info message */}
      {!isAttachedToClient && (
        <p className="mt-6 text-gray-600 italic">
          This form is in internal preparation mode. Client information is not attached yet.
        </p>
      )}
    </div>
  );
};
