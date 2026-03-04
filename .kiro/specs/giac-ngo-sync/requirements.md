# Tài liệu Yêu cầu — Đồng bộ Subscription Bodhi → Giác Ngộ

## Giới thiệu

Tính năng đồng bộ subscription một chiều từ Bodhi sang hệ thống đối tác Giác Ngộ. Khi subscription của người dùng thay đổi trên Bodhi (qua Autumn webhook), hệ thống sẽ gọi REST API của Giác Ngộ để cập nhật trạng thái tương ứng. Mọi lần đồng bộ đều được ghi log vào bảng `sync_log` để theo dõi và debug.

## Thuật ngữ

- **Sync_Service**: Module xử lý đồng bộ subscription từ Bodhi sang Giác Ngộ, nằm tại `server/services/giac-ngo-sync.ts`
- **Autumn_Webhook_Handler**: Route handler hiện tại xử lý webhook từ Autumn tại `/api/webhooks/autumn` trong `server/routes.ts`
- **Giac_Ngo_API**: REST API của hệ thống Giác Ngộ, URL và API key được cấu hình qua biến môi trường
- **Sync_Log**: Bảng trong database PostgreSQL lưu trữ lịch sử các lần đồng bộ
- **Sync_Payload**: Object JSON gửi đến Giác Ngộ API với cấu trúc `{ user_id, email, plan, status }`
- **Subscription_Event**: Sự kiện thay đổi subscription từ Autumn webhook (new, upgrade, downgrade, cancel, expired, renew, past_due, scheduled)

## Yêu cầu

### Yêu cầu 1: Gọi Giác Ngộ API khi subscription thay đổi

**User Story:** Là quản trị viên Bodhi, tôi muốn hệ thống tự động đồng bộ thay đổi subscription sang Giác Ngộ, để hai hệ thống luôn nhất quán về trạng thái người dùng.

#### Tiêu chí chấp nhận

1. WHEN Autumn_Webhook_Handler nhận được sự kiện `customer.products.updated`, THE Sync_Service SHALL gửi một HTTP POST request đến Giac_Ngo_API với Sync_Payload chứa `user_id`, `email`, `plan`, và `status` của người dùng tương ứng.
2. THE Sync_Payload SHALL có cấu trúc JSON: `{ user_id: string, email: string, plan: string, status: string }`.
3. WHEN scenario là "cancel" hoặc status là "cancelled", THE Sync_Service SHALL gửi Sync_Payload với `status` có giá trị `"unsubscribe"`.
4. WHEN scenario là "upgrade" hoặc "downgrade" hoặc "scheduled", THE Sync_Service SHALL gửi Sync_Payload với `plan` là product ID mới và `status` có giá trị `"active"`.
5. WHEN scenario là "new" hoặc "renew", THE Sync_Service SHALL gửi Sync_Payload với `plan` là product ID hiện tại và `status` có giá trị `"active"`.
6. WHEN scenario là "expired", THE Sync_Service SHALL gửi Sync_Payload với `status` có giá trị `"unsubscribe"`.
7. WHEN scenario là "past_due", THE Sync_Service SHALL gửi Sync_Payload với `status` có giá trị `"past_due"`.

### Yêu cầu 2: Cấu hình API qua biến môi trường

**User Story:** Là developer, tôi muốn cấu hình Giác Ngộ API URL và API key qua biến môi trường, để dễ dàng thay đổi giữa các môi trường (dev/staging/production) mà không cần sửa code.

#### Tiêu chí chấp nhận

1. THE Sync_Service SHALL đọc URL của Giac_Ngo_API từ biến môi trường `GIAC_NGO_API_URL`.
2. THE Sync_Service SHALL đọc API key từ biến môi trường `GIAC_NGO_API_KEY`.
3. THE Sync_Service SHALL gửi API key trong header `Authorization: Bearer <GIAC_NGO_API_KEY>` của mỗi request đến Giac_Ngo_API.
4. WHEN biến môi trường `GIAC_NGO_API_URL` hoặc `GIAC_NGO_API_KEY` chưa được cấu hình, THE Sync_Service SHALL bỏ qua việc đồng bộ và ghi log cảnh báo "Giác Ngộ sync skipped: missing configuration".

### Yêu cầu 3: Xử lý lỗi không ảnh hưởng Autumn webhook

**User Story:** Là quản trị viên Bodhi, tôi muốn lỗi đồng bộ Giác Ngộ không làm gián đoạn xử lý webhook Autumn, để subscription trên Bodhi luôn được cập nhật đúng dù Giác Ngộ gặp sự cố.

#### Tiêu chí chấp nhận

1. IF Giac_Ngo_API trả về lỗi HTTP (status code >= 400), THEN THE Sync_Service SHALL ghi log lỗi với status code và response body, và tiếp tục xử lý mà không throw exception.
2. IF Giac_Ngo_API không phản hồi trong vòng 10 giây, THEN THE Sync_Service SHALL timeout request, ghi log lỗi timeout, và tiếp tục xử lý mà không throw exception.
3. IF xảy ra lỗi mạng (network error) khi gọi Giac_Ngo_API, THEN THE Sync_Service SHALL ghi log lỗi mạng và tiếp tục xử lý mà không throw exception.
4. THE Autumn_Webhook_Handler SHALL gọi Sync_Service theo kiểu fire-and-forget (không await), để thời gian phản hồi webhook không bị ảnh hưởng bởi Giac_Ngo_API.

### Yêu cầu 4: Lấy email người dùng từ database

**User Story:** Là developer, tôi muốn hệ thống tự động lấy email người dùng từ database Bodhi, để gửi đầy đủ thông tin cho Giác Ngộ mà không phụ thuộc vào dữ liệu webhook.

#### Tiêu chí chấp nhận

1. WHEN Sync_Service chuẩn bị Sync_Payload, THE Sync_Service SHALL truy vấn bảng `user` trong database để lấy email dựa trên `user_id` từ Autumn webhook.
2. IF không tìm thấy user với `user_id` tương ứng trong database, THEN THE Sync_Service SHALL ghi log cảnh báo và bỏ qua việc đồng bộ cho sự kiện đó.

### Yêu cầu 5: Ghi log đồng bộ vào bảng sync_log

**User Story:** Là quản trị viên Bodhi, tôi muốn mọi lần đồng bộ đều được ghi log vào database, để có thể theo dõi lịch sử và debug khi cần.

#### Tiêu chí chấp nhận

1. THE Sync_Service SHALL ghi một bản ghi vào bảng Sync_Log cho mỗi lần gọi Giac_Ngo_API.
2. THE Sync_Log SHALL lưu trữ các trường: `id`, `user_id`, `event_type` (scenario từ Autumn), `payload` (JSON đã gửi), `response_ok` (true/false từ Giac_Ngo_API), `response_status` (HTTP status code), `error_message` (nếu có lỗi), và `created_at`.
3. WHEN Giac_Ngo_API trả về response thành công, THE Sync_Service SHALL ghi Sync_Log với `response_ok` là `true` và `response_status` là HTTP status code.
4. WHEN Giac_Ngo_API trả về lỗi hoặc timeout, THE Sync_Service SHALL ghi Sync_Log với `response_ok` là `false` và `error_message` mô tả lỗi.
5. IF việc ghi Sync_Log gặp lỗi database, THEN THE Sync_Service SHALL ghi log lỗi ra console và tiếp tục xử lý mà không throw exception.

### Yêu cầu 6: Bảng sync_log trong database

**User Story:** Là developer, tôi muốn có bảng sync_log trong database schema, để lưu trữ lịch sử đồng bộ một cách có cấu trúc.

#### Tiêu chí chấp nhận

1. THE Database_Schema SHALL định nghĩa bảng `giac_ngo_sync_log` trong `shared/schema.ts` với các cột: `id` (varchar, primary key), `user_id` (text, foreign key đến bảng user), `event_type` (text), `payload` (text, JSON string), `response_ok` (boolean), `response_status` (integer, nullable), `error_message` (text, nullable), và `created_at` (timestamp).
2. THE Database_Schema SHALL tạo index trên cột `user_id` của bảng `giac_ngo_sync_log`.
3. THE Database_Schema SHALL tạo index trên cột `created_at` của bảng `giac_ngo_sync_log`.
