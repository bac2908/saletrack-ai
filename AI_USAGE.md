# AI Usage

## 1. AI tools used

- ChatGPT / Codex was used as the main coding assistant.

## 2. What AI helped with

- Breaking down the test requirements.
- Designing the Prisma schema and entity relations.
- Creating Express API structure: routes, controllers, services, validators, middlewares.
- Creating Vietnamese seed data for Sales, Agencies, and TrackRecords.
- Converting Stitch HTML layouts into React + TypeScript + Tailwind pages.
- Connecting frontend pages to the backend API.
- Adding CRUD interactions and a light/dark theme toggle.
- Debugging TypeScript build issues and validating the app with local builds/screenshots.

## 3. Effective prompts

Prompt 1:

```text
Bạn là senior backend developer. Hãy giúp tôi tạo phần database cho dự án SaleTrack AI dùng Node.js, Express, TypeScript, SQLite và Prisma.
```

Prompt 2:

```text
Tôi đã tạo frontend layout từ Stitch, hãy chuyển các file HTML thành giao diện React hoàn chỉnh theo stack React + TypeScript + Vite + Tailwind CSS.
```

## 4. AI mistakes/debug notes

- Some initial frontend types still described an older sales opportunity model instead of the final Prisma models. This was corrected by aligning `Sale`, `Agency`, and `TrackRecord` frontend types with the database schema.
- Some Stitch-derived text/icons were static. The final version connects pages to API data and uses pagination from the backend.
- A PowerShell DOCX extraction command initially printed Vietnamese text with encoding issues. It was rerun with UTF-8 output to read the assignment correctly.

## 5. Chat link or important prompt copy

No public chat link is included. Key prompts are copied above, and the project files document the AI-assisted implementation decisions.
