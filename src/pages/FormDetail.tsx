// src/components/FormDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { formTemplatesMock } from "../data/mockData";
import ReactMarkdown from "react-markdown"; // optional

const FormDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const form = formTemplatesMock.find(f => f.id === id);
  if (!form) return <div>Form not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <ReactMarkdown>{form.body}</ReactMarkdown>
    </div>
  );
};

export default FormDetail;
