import React from "react";

interface SignatureBlockProps {
  role: "Client" | "Owner";
  showAdminNote?: boolean; // For Owner block to show admin note box
}

const SignatureBlock: React.FC<SignatureBlockProps> = ({ role, showAdminNote = false }) => {
  return (
    <section className="mb-10">
      <h2 className="font-semibold mb-2">{role}:</h2>
      <p className="mb-4 italic">I agree to the terms and conditions of this contract.</p>

      {showAdminNote && (
        <div
          className="bg-yellow-100 border border-yellow-300 rounded p-4 text-gray-800 max-w-md mb-4"
          role="note"
          aria-label="Administrative note"
        >
          <strong>Administrative note:</strong> The field is for you to countersign. Don’t worry your client won’t see this.
        </div>
      )}

      <div className="max-w-md grid grid-cols-[1fr_1fr] gap-x-6 gap-y-1 items-center">
        <label className="flex flex-col">
          <span className="mb-1 font-medium">First Name</span>
          <input
            type="text"
            name={`${role.toLowerCase()}FirstName`}
            placeholder="First Name"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1 font-medium">Last Name</span>
          <input
            type="text"
            name={`${role.toLowerCase()}LastName`}
            placeholder="Last Name"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </label>

        {/* Signature box spanning both columns */}
        <label className="col-span-2 flex flex-col mt-2">
          <span className="mb-1 font-medium">Signature</span>
          <input
            type="text"
            name={`${role.toLowerCase()}Signature`}
            placeholder="Sign here"
            className="border border-gray-300 rounded px-3 py-2"
          />
        </label>
      </div>

      <p className="mt-4 italic text-gray-600 max-w-md">
        *The date will be recorded once the form is submitted.*
      </p>
    </section>
  );
};

export default SignatureBlock;
