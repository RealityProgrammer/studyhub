# StudyHub — Toàn bộ dự án

Tổng quan ngắn gọn: dự án StudyHub gồm một backend Spring Boot (Java/Maven) và nhiều frontend (Next.js cho client, TailAdmin cho admin, và một app React cho chức năng video). README này tóm tắt cấu trúc, công nghệ chính và lệnh chạy nhanh.

## Cấu trúc thư mục chính
- [backend](backend/) — mã nguồn Spring Boot
  - [`pom.xml`](backend/pom.xml)
  - [`.env`](backend/.env)
- [frontends](frontends/)
  - [client](frontends/client/) — Next.js site (public site)
    - [`README.md`](frontends/client/README.md)
    - [`next.config.mjs`](frontends/client/next.config.mjs)
    - Trang chính: [`pages/index.js`](frontends/client/pages/index.js)
    - Module trang chủ: [`HomeTwoModule`](frontends/client/src/modules/HomeTwo/index.js)
    - Header/ Footer: [`Header`](frontends/client/src/layout/Header/index.js), [`Footer`](frontends/client/src/layout/Footer/index.js)
    - Một số module tiêu biểu: [`PricingModule`](frontends/client/src/modules/Pricing/index.js), [`CourseFourModule`](frontends/client/src/modules/Course/Four.js)
  - [admin](frontends/admin/) — TailAdmin React (Dashboard)
    - [`README.md`](frontends/admin/README.md)
    - Một số trang: [admin App imports (`App.tsx`)](frontends/admin/src/App.tsx)
  - [video](frontends/video/) — sample/SDK React cho meeting
    - [`README.md`](frontends/video/README.md)

## Công nghệ chính
- Backend: Spring Boot (Java 17), JPA, Spring Security, WebFlux, MapStruct, Hazelcast, MySQL. Tham khảo: [`pom.xml`](backend/pom.xml)
- Frontend client: Next.js (React), nhiều module component-based. Tham khảo: [`frontends/client/README.md`](frontends/client/README.md) và cấu hình: [`next.config.mjs`](frontends/client/next.config.mjs)
- Frontend admin: React + Tailwind (TailAdmin). Tham khảo: [`frontends/admin/README.md`](frontends/admin/README.md)
- Video / RTC: sample React SDK trong `frontends/video` — xem: [`frontends/video/README.md`](frontends/video/README.md)

## Các entrypoint / module quan trọng (ví dụ)
- Trang chủ client: [`HomeTwoModule`](frontends/client/src/modules/HomeTwo/index.js)
- Header component: [`Header`](frontends/client/src/layout/Header/index.js)
- Footer component: [`Footer`](frontends/client/src/layout/Footer/index.js)
- Trang Pricing: [`PricingModule`](frontends/client/src/modules/Pricing/index.js)
- Course list (ví dụ): [`CourseFourModule`](frontends/client/src/modules/Course/Four.js)
- Counter component (sử dụng ở nhiều nơi): [`Counter`](frontends/client/src/components/Counter/index.js)

## Cách chạy (quick start)
1. Backend
   - Cấu hình biến môi trường trong `backend/.env` (database, mail, cloudinary, jwt, ...).
   - Build & chạy:
     - mvn: `cd backend && ./mvnw spring-boot:run` hoặc `mvn spring-boot:run`
     - (hoặc build jar) `./mvnw clean package` → chạy jar trong `target/`.
   - Kiểm tra cấu hình phụ thuộc trong: [`backend/pom.xml`](backend/pom.xml)

2. Frontend client (Next.js)
   - Cài dependencies và chạy dev:
     - `cd frontends/client && npm install`
     - `npm run dev`
   - Cấu hình host/URL và domains: [`frontends/client/next.config.mjs`](frontends/client/next.config.mjs)

3. Frontend admin
   - `cd frontends/admin && npm install`
   - Xem hướng dẫn trong: [`frontends/admin/README.md`](frontends/admin/README.md)

4. Video / SDK sample
   - `cd frontends/video && npm install && npm run start`
   - Xem hướng dẫn chi tiết trong: [`frontends/video/README.md`](frontends/video/README.md)

## Gợi ý deploy nhanh
- Backend: deploy jar lên server hoặc container, kết nối tới MySQL production.
- Frontend client: build Next.js (Vercel hoặc `npm run build` + `npm start`).
- Frontend admin: `npm run build` → phục vụ static.

## Tài liệu & nơi bắt đầu đọc mã
- Bắt đầu từ backend: mở [`backend/pom.xml`](backend/pom.xml) để biết thư viện và plugin chính.
- Bắt đầu frontend client: mở [`frontends/client/README.md`](frontends/client/README.md) rồi xem [`pages/index.js`](frontends/client/pages/index.js) và module chính [`HomeTwoModule`](frontends/client/src/modules/HomeTwo/index.js).
- Admin: [`frontends/admin/README.md`](frontends/admin/README.md)
- Video: [`frontends/video/README.md`](frontends/video/README.md)

Nếu cần, có thể tạo README chi tiết hơn cho từng phần (Backend, Client, Admin, Video) — cho biết muốn ưu tiên phần nào.// filepath: README.md
# StudyHub — Toàn bộ dự án

Tổng quan ngắn gọn: dự án StudyHub gồm một backend Spring Boot (Java/Maven) và nhiều frontend (Next.js cho client, TailAdmin cho admin, và một app React cho chức năng video). README này tóm tắt cấu trúc, công nghệ chính và lệnh chạy nhanh.

## Cấu trúc thư mục chính
- [backend](backend/) — mã nguồn Spring Boot
  - [`pom.xml`](backend/pom.xml)
  - [`.env`](backend/.env)
- [frontends](frontends/)
  - [client](frontends/client/) — Next.js site (public site)
    - [`README.md`](frontends/client/README.md)
    - [`next.config.mjs`](frontends/client/next.config.mjs)
    - Trang chính: [`pages/index.js`](frontends/client/pages/index.js)
    - Module trang chủ: [`HomeTwoModule`](frontends/client/src/modules/HomeTwo/index.js)
    - Header/ Footer: [`Header`](frontends/client/src/layout/Header/index.js), [`Footer`](frontends/client/src/layout/Footer/index.js)
    - Một số module tiêu biểu: [`PricingModule`](frontends/client/src/modules/Pricing/index.js), [`CourseFourModule`](frontends/client/src/modules/Course/Four.js)
  - [admin](frontends/admin/) — TailAdmin React (Dashboard)
    - [`README.md`](frontends/admin/README.md)
    - Một số trang: [admin App imports (`App.tsx`)](frontends/admin/src/App.tsx)
  - [video](frontends/video/) — sample/SDK React cho meeting
    - [`README.md`](frontends/video/README.md)

## Công nghệ chính
- Backend: Spring Boot (Java 17), JPA, Spring Security, WebFlux, MapStruct, Hazelcast, MySQL. Tham khảo: [`pom.xml`](backend/pom.xml)
- Frontend client: Next.js (React), nhiều module component-based. Tham khảo: [`frontends/client/README.md`](frontends/client/README.md) và cấu hình: [`next.config.mjs`](frontends/client/next.config.mjs)
- Frontend admin: React + Tailwind (TailAdmin). Tham khảo: [`frontends/admin/README.md`](frontends/admin/README.md)
- Video / RTC: sample React SDK trong `frontends/video` — xem: [`frontends/video/README.md`](frontends/video/README.md)

## Các entrypoint / module quan trọng (ví dụ)
- Trang chủ client: [`HomeTwoModule`](frontends/client/src/modules/HomeTwo/index.js)
- Header component: [`Header`](frontends/client/src/layout/Header/index.js)
- Footer component: [`Footer`](frontends/client/src/layout/Footer/index.js)
- Trang Pricing: [`PricingModule`](frontends/client/src/modules/Pricing/index.js)
- Course list (ví dụ): [`CourseFourModule`](frontends/client/src/modules/Course/Four.js)
- Counter component (sử dụng ở nhiều nơi): [`Counter`](frontends/client/src/components/Counter/index.js)

## Cách chạy (quick start)
1. Backend
   - Cấu hình biến môi trường trong `backend/.env` (database, mail, cloudinary, jwt, ...).
   - Build & chạy:
     - mvn: `cd backend && ./mvnw spring-boot:run` hoặc `mvn spring-boot:run`
     - (hoặc build jar) `./mvnw clean package` → chạy jar trong `target/`.
   - Kiểm tra cấu hình phụ thuộc trong: [`backend/pom.xml`](backend/pom.xml)

2. Frontend client (Next.js)
   - Cài dependencies và chạy dev:
     - `cd frontends/client && npm install`
     - `npm run dev`
   - Cấu hình host/URL và domains: [`frontends/client/next.config.mjs`](frontends/client/next.config.mjs)

3. Frontend admin
   - `cd frontends/admin && npm install`
   - Xem hướng dẫn trong: [`frontends/admin/README.md`](frontends/admin/README.md)

4. Video / SDK sample
   - `cd frontends/video && npm install && npm run start`
   - Xem hướng dẫn chi tiết trong: [`frontends/video/README.md`](frontends/video/README.md)

## Gợi ý deploy nhanh
- Backend: deploy jar lên server hoặc container, kết nối tới MySQL production.
- Frontend client: build Next.js (Vercel hoặc `npm run build` + `npm start`).
- Frontend admin: `npm run build` → phục vụ static.

## Tài liệu & nơi bắt đầu đọc mã
- Bắt đầu từ backend: mở [`backend/pom.xml`](backend/pom.xml) để biết thư viện và plugin chính.
- Bắt đầu frontend client: mở [`frontends/client/README.md`](frontends/client/README.md) rồi xem [`pages/index.js`](frontends/client/pages/index.js) và module chính [`HomeTwoModule`](frontends/client/src/modules/HomeTwo/index.js).
- Admin: [`frontends/admin/README.md`](frontends/admin/README.md)
- Video: [`frontends/video/README.md`](frontends/video/README.md)

Nếu cần, có thể tạo README chi tiết hơn cho từng phần (Backend, Client, Admin, Video) — cho biết muốn ưu tiên phần nào.