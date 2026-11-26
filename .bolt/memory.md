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
  - Row order: checkbox → star → priority marker → from name → subject → date → trash.
  - From column: sender/recipient name only (no email address).
  - Subject: subject text only (no customer name); full available width.
  - Date format: "MMM DD" (e.g., "Jan 15").
  - Unread emails rendered in bold.
  - Priority marker: fat greater-than arrow that cycles on click through four color states:
    - No color / gray = low/no priority
    - Green = normal
    - Yellow = high
    - Red = urgent
  - Dropdown next to select-all checkbox has two stacked sections:
    - **Select:** All, None (bulk selection)
    - **Show priority:** four colored markers (no color, green, yellow, red) — selecting one filters the list to emails at that priority; includes "All" to clear filter
  - Menu marker colors match row marker colors exactly.
  - Trash icon on far right of each row (per-row delete to Trash folder).
  - Other actions (reply, archive) available in expanded email view, not inline.
  - Removed "Starred Only" / "Unread Only" checkboxes from bar above search (selection dropdown covers those).

## Decisions, constraints & rationale

- Email list simplified to reduce visual clutter: removed email-address subline, customer-name subline, Status column, and column headings.
- Priority system uses color-cycling arrow (4 states) instead of text labels/badges — conveys status compactly and visually.
- "Starred Only" / "Unread Only" checkboxes removed because the Select dropdown section handles those filters.
- Table-page consistency rationale: shared padding/widths reduce friction.
- Global `.bolt/prompt` instructions exist for beautiful production-worthy design, JSX + Tailwind, Lucide React icons only.

## Open questions & assumptions

- Assuming table-page standards (Orders & Inquiries) apply to all current/future table pages.
- Assuming priority toggle and starring persist per-session (same as current starring behavior).
- Unknown: full page inventory beyond Quotes, Orders, Inquiries, and Email.