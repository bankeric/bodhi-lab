# Kế hoạch Triển khai: Đồng bộ Subscription Bodhi → Giác Ngộ

## Tổng quan

Triển khai module đồng bộ fire-and-forget gửi trạng thái subscription từ Bodhi sang Giác Ngộ API khi Autumn webhook được xử lý. Bao gồm schema DB, sync service, tích hợp webhook handler, và ghi log.

## Tasks

- [x] 1. Thêm bảng `giac_ngo_sync_log` vào schema
  - [x] 1.1 Định nghĩa bảng `giac_ngo_sync_log` trong `shared/schema.ts` với Drizzle ORM
    - Thêm bảng với các cột: `id` (varchar, PK, gen_random_uuid), `user_id` (text, FK → user.id, onDelete cascade), `event_type` (text, not null), `payload` (text, not null), `response_ok` (boolean, not null), `response_status` (integer, nullable), `error_message` (text, nullable), `created_at` (timestamp, default now)
    - Tạo index trên `user_id` và `created_at`
    - Export type `GiacNgoSyncLog` và `InsertGiacNgoSyncLog`
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 1.2 Chạy `npx drizzle-kit generate` để tạo migration
    - Đảm bảo migration file được tạo đúng cho bảng mới
    - _Requirements: 6.1_

- [x] 2. Tạo Sync Service (`server/services/giac-ngo-sync.ts`)
  - [x] 2.1 Implement hàm `mapScenarioToStatus` và `mapScenarioToPlan`
    - `mapScenarioToStatus`: map scenario → status theo bảng mapping trong design (new/renew/upgrade/downgrade/scheduled → "active", cancel/expired → "unsubscribe", past_due → "past_due")
    - `mapScenarioToPlan`: trả về productId cho mọi scenario
    - _Requirements: 1.3, 1.4, 1.5, 1.6, 1.7_

  - [ ]* 2.2 Viết property test cho scenario mapping (Property 1)
    - **Property 1: Scenario mapping trả về đúng status**
    - Generate random scenario từ tập hợp lệ, verify output khớp bảng mapping
    - **Validates: Requirements 1.3, 1.4, 1.5, 1.6, 1.7**

  - [x] 2.3 Implement hàm chính `syncToGiacNgo`
    - Đọc `GIAC_NGO_API_URL` và `GIAC_NGO_API_KEY` từ env, return sớm nếu thiếu với console.warn
    - Query user email từ DB bằng user_id, return sớm nếu không tìm thấy user
    - Tạo SyncPayload với `user_id`, `email`, `plan`, `status`
    - Gọi HTTP POST đến Giác Ngộ API với `Authorization: Bearer <key>` và timeout 10s (AbortController)
    - Ghi sync_log vào DB sau mỗi lần gọi API (thành công hoặc lỗi)
    - Wrap toàn bộ trong try/catch, không bao giờ throw exception ra ngoài
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 2.4 Viết property test cho payload structure (Property 2)
    - **Property 2: Payload luôn có đủ 4 trường bắt buộc**
    - Mock DB query trả về user, verify payload có đúng 4 trường `user_id`, `email`, `plan`, `status`
    - **Validates: Requirements 1.1, 1.2, 4.1**

  - [ ]* 2.5 Viết property test cho error handling (Property 3)
    - **Property 3: Sync service không bao giờ throw exception**
    - Mock các lỗi HTTP error, timeout, network error, DB write error → verify `syncToGiacNgo` luôn resolve
    - **Validates: Requirements 3.1, 3.2, 3.3, 5.5**

  - [ ]* 2.6 Viết property test cho log correctness (Property 4)
    - **Property 4: Log entry phản ánh đúng kết quả API call**
    - Mock API responses (2xx → response_ok=true, error → response_ok=false với error_message)
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**

  - [ ]* 2.7 Viết property test cho auth header (Property 5)
    - **Property 5: Authorization header luôn có mặt**
    - Generate random API key, verify header format `Bearer <key>`
    - **Validates: Requirements 2.3**

- [x] 3. Checkpoint — Đảm bảo sync service hoạt động đúng
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Tích hợp vào Webhook Handler
  - [x] 4.1 Thêm fire-and-forget call trong `server/routes.ts`
    - Import `syncToGiacNgo` từ `server/services/giac-ngo-sync.ts`
    - Thêm `syncToGiacNgo({ userId, scenario, productId: updated_product.id }).catch(err => console.error("[Giác Ngộ Sync] Unexpected error:", err))` sau `storage.upsertSubscription(...)` trong handler `customer.products.updated`
    - Không `await` — fire-and-forget để không block webhook response
    - _Requirements: 3.4, 1.1_

  - [ ]* 4.2 Viết unit test cho webhook integration
    - Verify sync được gọi fire-and-forget (không await)
    - Verify webhook vẫn trả về 200 OK ngay cả khi sync lỗi
    - _Requirements: 3.4_

- [x] 5. Final checkpoint — Đảm bảo toàn bộ tính năng hoạt động
  - Ensure all tests pass, ask the user if questions arise.

## Ghi chú

- Tasks đánh dấu `*` là optional, có thể bỏ qua để build nhanh hơn
- Mỗi task tham chiếu requirements cụ thể để truy vết
- Property tests sử dụng fast-check với Vitest
- Checkpoints đảm bảo kiểm tra tăng dần
