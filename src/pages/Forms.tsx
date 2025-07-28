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
  Questionnaires =
