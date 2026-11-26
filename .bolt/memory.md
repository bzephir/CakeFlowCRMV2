# Project memory

## Product intent & audience

- Business management application with list/table pages: Quotes, Orders, Inquiries (CRM/ERP-adjacent).
- Includes an email/inbox page with inbox-style message list.
- Audience: internal/business users managing records and communications.

## Brand personality & voice

- Professional, utility-focused internal tool aesthetic.

## Visual design & UX direction

- Table pages (Orders, Inquiries, Quotes): consistent table-grid layout.
  - Row/header padding: `px-4 py-2`; column gap: `space-x-4`.
  - ID columns ~160px; actions columns ~80px.
  - Include checkbox selection columns and clickable ID/link columns.
- Email page: inbox-style list (distinct from table pages).
  - No column header row; select-all checkbox stays at top.
  - Row order: checkbox → star → priority symbol → from name → subject → date → trash.
  - From column: sender/recipient name only (no email address).
  - Subject: subject text only (no customer name); full available width.
  - Date format: "MMM DD" (e.g., "Jan 15").
  - Unread emails rendered in bold.
  - Priority: clickable icon toggles High (red ArrowUp) / Low (gray ArrowDown).
  - Trash icon on far right of each row (per-row delete to Trash folder).
  - Other actions (reply, archive) available in expanded email view, not inline.

## Decisions, constraints & rationale

- Email list simplified to reduce visual clutter: removed email-address subline, customer-name subline, Status column, and column headings.
- Rationale: inbox-style lists read better without header rows and redundant metadata; bold unread + priority icon convey status more compactly than text badges.
- Table-page consistency rationale: shared padding/widths reduce friction.
- Global `.bolt/prompt` instructions exist for beautiful production-worthy design, JSX + Tailwind, Lucide React icons only.

## Open questions & assumptions

- Assuming table-page standards (Orders & Inquiries) apply to all current/future table pages.
- Assuming priority toggle and starring persist per-session (same as current starring behavior).
- Unknown: full page inventory beyond Quotes, Orders, Inquiries, and Email.