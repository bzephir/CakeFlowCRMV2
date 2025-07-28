export function renderTemplate(
  template: string,
  data: Record<string, any>
): string {
  // Replace {{field}} and {{object.field}}, with basic | filters
  return template.replace(/{{\s*([\w.]+)(\s*\|\s*[\w]+)?\s*}}/g, (_m, path, filterWithPipe) => {
    const value = path.split('.').reduce((o, k) => o?.[k], data);
    if (filterWithPipe) {
      const [, filter] = filterWithPipe.split('|').map((s: string) => s.trim());
      return applyFilter(value, filter);
    }
    return value ?? "";
  });
}

function applyFilter(value: any, filter?: string) {
  if (!filter) return value ?? "";
  if (filter === "longDate" && value) return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  if (filter === "mediumDate" && value) return new Date(value).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  return value ?? "";
}
