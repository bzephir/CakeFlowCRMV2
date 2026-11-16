# Project memory

## Product intent & audience

- Business management application with list/table pages: Quotes, Orders, Inquiries (likely CRM/ERP-adjacent).
- Audience: internal/business users managing records.

## Brand personality & voice

- Professional, utility-focused internal tool aesthetic.

## Visual design & UX direction

- Consistent table layout pattern shared across list pages (Orders, Inquiries set the standard; Quotes must match).
- Standard table row/header padding: `px-4 py-2` (not tighter).
- Standard column gap: `space-x-4` (avoid `space-x-1`).
- Column widths should align across pages: ID columns ~160px, actions columns ~80px (not 128px/32px).
- Tables include checkbox selection columns and clickable ID/link columns.
- Pages should maintain consistent alignment, spacing, and column widths — no page-specific cramped layouts.

## Decisions, constraints & rationale

- Quotes page was inconsistent (tighter padding, narrower columns) and needs to match Orders/Inquiries standard.
- Rationale: visual consistency across all list pages reduces user friction.
- Global `.bolt/prompt` instructions exist for beautiful production-worthy design, JSX + Tailwind, Lucide React icons only.

## Open questions & assumptions

- Assuming standard padding/widths established by Orders & Inquiries apply to all current and future list pages.
- Unknown: full list of pages in the app; exact column-width specification for all shared columns.