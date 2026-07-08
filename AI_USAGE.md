% AI_USAGE — SaleTrack AI

Mục đích: file này trình bày cách ứng viên đã sử dụng AI trong quá trình phát triển SaleTrack AI, những phần AI hỗ trợ, các prompt quan trọng (đã tùy chỉnh cho dự án), các lỗi do AI sinh ra và cách debug. Tài liệu viết bằng tiếng Việt, rõ ràng để nhà tuyển dụng nắm được quy trình tư duy kỹ thuật và cách kiểm soát AI.

Tóm tắt: tôi sử dụng trợ lý AI để tăng tốc phân tích yêu cầu, scaffolding backend và hỗ trợ viết/việt hóa frontend. Mọi output do AI đề xuất được tôi rà tay, hiệu chỉnh và test trước khi đưa vào codebase.

---

## 1) Công cụ AI đã dùng

- ChatGPT: phân tích đề bài, chia nhỏ tác vụ, tạo prompt, gợi ý cấu trúc code, đề xuất fix.
- OpenAI Codex (VS Code): hỗ trợ generate/complete code snippets, refactor nhanh các component và controller.
- Google Stitch: nguồn ý tưởng layout ban đầu (được chuyển thành React components sau đó).

Ghi chú: AI được dùng như công cụ tăng tốc — tôi chịu trách nhiệm kiểm tra, chỉnh sửa, chạy build/test và đảm bảo tính đúng đắn.

---

## 2) AI được dùng cho phần nào trong project (cụ thể)

2.1 Phân tích yêu cầu

- Dùng ChatGPT để tách yêu cầu thành các phần nhỏ, xác định 3 entity chính (`Sale`, `Agency`, `TrackRecord`) và 4 trang cần demo (Dashboard, Sales, Agencies, Track Records).

2.2 Thiết kế dữ liệu

- AI đề xuất Prisma models ban đầu; tôi chỉnh lại và xác nhận khóa liên kết `saleId` và `agencyId` hoạt động đúng trong schema (`prisma/schema.prisma`).

2.3 Backend (scaffolding & logic)

- Dùng AI để tạo cấu trúc routes/controllers/services, mẫu response format và validator skeletons. API chính đã triển khai:
	- `GET /api/sales`, `POST /api/sales`, `PUT /api/sales/:id`, `DELETE /api/sales/:id`
	- `GET /api/agencies`, `POST /api/agencies`, `PUT /api/agencies/:id`, `DELETE /api/agencies/:id`
	- `GET /api/track-records`, `POST /api/track-records`, `PUT /api/track-records/:id`, `DELETE /api/track-records/:id`
	- `GET /api/dashboard` (thống kê)

2.4 Frontend (UI & tích hợp)

- Dùng Stitch làm phác thảo, AI giúp chuyển một số markup/logic; tôi viết lại components React + TypeScript, hooks và `services/api.ts` để gọi API thực.
- Việt hóa các chuỗi người dùng, giữ thuật ngữ kỹ thuật cần thiết (ví dụ: `Dashboard`, `Track Record`).

2.5 Test & docs

- AI hỗ trợ soạn `README.md`, bản nháp `AI_USAGE.md`, và script Playwright mẫu để chụp screenshots; tôi thực thi seed, build, và kiểm tra thủ công các flows.

---

## 3) Prompt hiệu quả nhất (đã tùy chỉnh cho SaleTrack AI)

Ghi chú: dưới đây là 2 prompt chính tôi dùng — đã được tinh chỉnh để đúng endpoints, model names và ràng buộc của đề bài.

### Prompt 1 — Phân tích yêu cầu & thiết kế database

```text
You are a senior full-stack developer. Analyze this intern coding test (SaleTrack AI).

The system workflow: Sale -> Agency -> TrackRecord -> Dashboard statistics.

Please produce:
1) A concise list of entities and Prisma model names.
2) Recommended fields for each model (including types) and foreign keys (saleId, agencyId).
3) Minimal API endpoints to implement the core workflow (list, create, update, delete for each entity, plus dashboard stats).
4) Suggested validation rules for create/update requests.
5) Keep scope limited for a 1–2 day implementation (do NOT add authentication/roles).

Return results as clear bullet points and a sample Prisma model schema for each entity.
```

How it helped: prompt này nhanh chóng xác định phạm vi và tránh các phụ tính năng không cần thiết (auth, permissions). Kết quả đầu ra được tôi chỉnh để khớp tên trường/casing hiện có (`saleId`, `agencyId`).

### Prompt 2 — Tạo backend API scaffold (chính xác với project)

```text
You are a senior backend developer. Generate a clean Express + TypeScript project structure and sample controller/service code for SaleTrack AI.

Context:
- Prisma models: Sale, Agency, TrackRecord (foreign keys: saleId, agencyId)
- DB: SQLite via Prisma

Requirements:
1) Create route/controller/service examples for:
	 - GET /api/sales (supports ?page=&limit=&search=)
	 - POST /api/sales
	 - GET /api/agencies (supports ?page=&limit=&search=)
	 - POST /api/agencies
	 - GET /api/track-records (supports ?page=&limit=&search=)
	 - POST /api/track-records
	 - GET /api/dashboard (returns counts and expectedRevenue sum grouped by status)
2) Use a consistent JSON response: { success, message, data }
3) Add basic Zod-based request validation examples
4) Do NOT add authentication or role management

Return: file-level snippets for routes, controller functions and a sample service that uses `prisma` client.
```

How it helped: prompt 2 tạo được scaffold rất sát với cấu trúc repo hiện tại; tôi chỉ cần chỉnh logic nhỏ, thêm validation và test bằng Postman/Thunder Client.

---

## 4) AI gây lỗi gì và cách debug (thực tế, chọn ví dụ thể hiện tư duy)

Nhà tuyển dụng quan tâm bạn có kiểm soát AI hay không — nên mô tả rõ quy trình debug.

### Vấn đề A — trường payload không khớp (`sale_id` vs `saleId`)

- Mô tả: AI gợi ý một số ví dụ payload dùng `sale_id` (snake_case) trong khi backend/Prisma dùng `saleId` (camelCase). Khi gửi request tạo Agency, backend không nhận đúng và quan hệ không được thiết lập.

Debug & fix:
1. Kiểm tra request body trong browser devtools / Thunder Client.
2. So sánh với Prisma schema (`backend/prisma/schema.prisma`).
3. Sửa frontend `services/agenciesService` để gửi `saleId` thay vì `sale_id`.
4. Chạy lại `POST /api/agencies` và kiểm tra DB / API response.

### Vấn đề B — Dashboard thiếu các trạng thái (status) khi count

- Mô tả: API `GET /api/dashboard` group by status chỉ trả các status có bản ghi. Nếu một status không có bản ghi, frontend không hiển thị cột/ô tương ứng.

Debug & fix:
1. Kiểm tra response của API và so sánh với enum của Prisma (`TrackStatus`).
2. Điều chỉnh service để đảm bảo luôn trả đủ các keys: NEW, CONTACTED, POTENTIAL, CLOSED, LOST — giá trị 0 nếu không có.
3. Cập nhật frontend render logic để đọc keys cố định.

### Vấn đề C — Automation Unicode / Playwright

- Mô tả: script PowerShell dùng Playwright gặp vấn đề encoding khi fill placeholder có dấu tiếng Việt, dẫn tới test tự động không tìm được selector.

Fix: sử dụng selector bằng `input[type="search"]` hoặc normalize input (loại bỏ dấu) khi cần test không dấu; test thủ công để xác nhận behavior với dữ liệu có dấu.

Quy trình chung debug: reproduce => inspect request/response and logs => compare with schema/types => apply minimal fix => run unit/manual checks => commit small patch.

---

## 5) Link chia sẻ đoạn chat / copy prompt (bắt buộc)

- Tôi KHÔNG đính kèm link chat công khai (nhiều phiên và privacy). Thay vào đó, tôi sao chép các prompt quan trọng ở phần 3 (bên trên). Các prompt này đủ để reviewer hiểu cách tôi điều hướng AI.

Nếu reviewer cần, tôi có thể cung cấp transcript phiên làm việc (cần xin phép access) hoặc export đoạn chat cụ thể.

---

## Phụ lục: runbook ngắn (để reviewer có thể tái tạo)

1) Cài đặt và seed database:

```bash
npm install
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
cd ..
npm run dev
```

2) Test API bằng Thunder Client/Postman: kiểm tra luồng Create Sale → Create Agency → Create TrackRecord → GET /api/dashboard

3) Tự động chụp screenshots (Playwright): script mẫu có trong repository (xem `AI_USAGE.md` hoặc README).

---

Nếu bạn muốn, mình có thể:
- (A) tinh chỉnh giọng văn thêm trang trọng cho CV/portfolio; hoặc
- (B) tách phần kỹ thuật (design + prompts + debug) sang `docs/report.md` để nộp kèm.

Kết: file này trình bày rõ ràng 5 mục theo yêu cầu đề bài, với prompt đã chỉnh sát dự án. Hãy đọc kỹ trước khi nộp — và chuẩn bị giải thích ngắn gọn 3 điểm: (1) requirement breakdown, (2) data model trade-offs, (3) ví dụ debug từ phần 4.
Mục đích: tài liệu này trình bày cách ứng viên đã dùng trợ lý AI trong quá trình phát triển, những phần AI hỗ trợ, cách kiểm chứng và các quyết định kỹ thuật quan trọng. Văn bản viết bằng tiếng Việt để dễ đọc với nhà tuyển dụng; thuật ngữ kỹ thuật giữ tiếng Anh khi cần.

Tóm tắt ngắn (1 câu): tôi đã sử dụng trợ lý AI để tăng tốc thiết kế schema, scaffolding API và UI, sau đó kiểm tra, chỉnh sửa và xác thực mọi output trước khi merge vào codebase.

1) Công cụ AI đã sử dụng

- Chat-based coding assistant (hỗ trợ viết/gợi ý code, tư vấn kiến trúc, soạn prompt). Không dùng output AI như bản chính thức — mọi đoạn code/đề xuất đều được rà tay và chạy build/test.

2) Phạm vi AI hỗ trợ (cụ thể)

- Phân tích nhanh repo và liệt kê file cấu hình quan trọng.
- Thiết kế sơ bộ Prisma models và sinh seed data tiếng Việt.
- Sinh scaffolding cho REST API (routes/controllers/services) và validator schemas.
- Chuyển layout HTML thành React + TypeScript components; viết hooks và `services/api.ts`.
- Việt hóa UI visible strings (menu, labels, placeholders, tooltips) và thêm tính năng "Tìm nhanh" trên Dashboard.

3) 1–2 prompt quan trọng nhất (có thể cung cấp cho reviewer)

- Prompt A (repo review + runbook):

	Bạn là developer, hãy duyệt repo SaleTrack AI và liệt kê các file cấu hình quan trọng, điểm bất đồng, và các bước cần làm để chạy project local (Prisma, seed, run frontend/backend).

- Prompt B (UI + search):

	Hãy Việt hóa giao diện: chuyển các chuỗi người dùng nhìn thấy sang Tiếng Việt (giữ thuật ngữ kỹ thuật bằng tiếng Anh khi phù hợp), và biến thanh tìm kiếm Dashboard thành chức năng "Tìm nhanh" (gọi các API list có `search` và deep-link sang trang đích với `?search=`).

4) Các lỗi/nhược điểm do AI gây ra và cách tôi sửa

- Tài liệu bất đồng: `docs/api-documentation.md` ghi port `4000` trong khi backend chạy mặc định `5000` — tôi sửa document thủ công.
- Naming conventions: Prisma model dùng camelCase (`saleId`, `agencyId`). Nếu cần snake_case cho DB table/column thì phải thêm `@map`/`@@map` và chạy migrate — tôi để nguyên camelCase để tránh thay đổi schema không cần thiết cho demo.
- Automation fragility: script PowerShell ban đầu gặp vấn đề Unicode khi điều khiển Playwright — tôi chuyển selector và kiểm tra bằng input ASCII/non-accented hoặc normalize trước khi capture.
- Patch drift: khi làm nhiều thay đổi, một số patch lớn bị lệch context — tôi chia nhỏ commit, build và test sau mỗi cụm thay đổi.

Mọi sửa đổi quan trọng đều được kiểm tra bằng: `npm run build` (frontend), `npm run build` (backend), và seed + manual sanity check trên UI.

5) Cách tái tạo kết quả (runbook ngắn)

- Cài đặt & seed (từ thư mục gốc):

```bash
npm install
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
cd ..
npm run dev
```

- Tự động chụp screenshot (Playwright), đảm bảo `127.0.0.1:5173` hoạt động:

```bash
# cài playwright nếu cần
npm i -D playwright
node capture-screenshots.js
```

`capture-screenshots.js` (ví dụ có trong `AI_USAGE.md`): script tạo `dashboard.png`, `sales-page.png`, `agencies-page.png`, `track-records-page.png`.

6) Những điều ứng viên nên giải thích trong buổi phỏng vấn

- Cách phân tích yêu cầu và tách tính năng (CRUD, Dashboard, Search).
- Lý do thiết kế dữ liệu (models/relations) và trade-offs (camelCase vs snake_case).
- Cách dùng AI: phạm vi, prompts, kiểm soát chất lượng đầu ra.
- Các lỗi gặp phải và cách khắc phục (ví dụ port mismatch, encoding, patch drift).
- Đề xuất nâng cấp (tests, lint, CI, auth, production hardening).

7) Cam kết tính chính xác & đạo đức

- Tôi cam kết mọi đoạn mã do AI gợi ý đều được tôi rà tay, điều chỉnh và kiểm thử. Mọi nội dung nhạy cảm hoặc không phù hợp đều bị loại bỏ.

8) Liên kết & file tham chiếu

- File chính: `AI_USAGE.md` (this file)
- Hướng dẫn chạy: `README.md`
- Screenshots: thư mục `screenshots/` (bốn file yêu cầu)

Nếu bạn muốn, tôi sẽ: (A) tinh chỉnh văn phong thêm trang trọng nữa, (B) tạo `docs/report.md` chi tiết hơn cho reviewer, hoặc (C) commit + push các thay đổi và mở PR.

