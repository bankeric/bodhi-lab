# PRD — BODHI LABS

**Ngày:** 02/03/2026
**Deadline:** 31/03/2026

---

## 1. MỤC TIÊU SẢN PHẨM

Bodhi Labs là công cụ bán hàng và vận hành nội bộ cho team Bodhi. Cho phép:
- Tiếp cận và theo dõi chùa tiềm năng (leads)
- Onboard chùa mới vào nền tảng giac.ngo
- Thu phí SaaS hàng tháng tự động
- Cho phép chùa tự quản lý gói dịch vụ của mình

**Thành công khi:** 1 chùa có thể đi từ "điền form" → ký hợp đồng → thanh toán → Space live trên giac.ngo trong vòng 14 ngày, không cần Bodhi can thiệp thủ công.

---

## 2. NGƯỜI DÙNG

| Role | Là ai | Mục tiêu chính |
|------|-------|----------------|
| **Bodhi Admin** | Nhân viên nội bộ Bodhi Labs | Quản lý leads, onboard chùa, theo dõi doanh thu |
| **Temple Admin** | Thầy trụ trì / ban quản trị chùa | Quản lý gói dịch vụ, truy cập Space giac.ngo |
| **Visitor** | Đại diện chùa chưa ký | Tìm hiểu dịch vụ, liên hệ Bodhi |

---

## 3. USER STORIES

### VISITOR — Khám phá & Liên hệ

---

**VS-01**
> Là một đại diện chùa, tôi muốn xem website Bodhi Labs để hiểu dịch vụ cung cấp là gì trước khi liên hệ.

**Acceptance Criteria:**
- Trang chủ mô tả rõ Bodhi Labs làm gì cho chùa
- Có trang giá (Basic / Standard / Premium)
- Có nút CTA dẫn đến form liên hệ

---

**VS-02**
> Là một đại diện chùa, tôi muốn điền form đăng ký để Bodhi Labs biết tôi quan tâm và liên hệ lại.

**Acceptance Criteria:**
- Form thu thập: tên, số điện thoại, email, tên chùa, gói quan tâm
- Sau khi submit, dữ liệu lưu vào database (không mất)
- Bodhi Admin nhận email thông báo ngay
- Visitor thấy trang cảm ơn sau khi submit

---

### BODHI ADMIN — Quản lý leads

---

**BA-01**
> Là Bodhi Admin, tôi muốn đăng nhập vào dashboard bằng email và password để chỉ tôi có quyền truy cập.

**Acceptance Criteria:**
- Trang đăng nhập riêng cho Bodhi Admin
- Sai password → báo lỗi, không cho vào
- Đăng nhập thành công → vào dashboard
- Session giữ nguyên khi refresh trang

---

**BA-02**
> Là Bodhi Admin, tôi muốn xem danh sách tất cả leads để biết đang có bao nhiêu chùa tiềm năng.

**Acceptance Criteria:**
- Danh sách hiển thị: tên, email, SĐT, gói quan tâm, trạng thái, ngày tạo
- Sắp xếp theo ngày tạo mới nhất trước
- Temple Admin không thể truy cập trang này

---

**BA-03**
> Là Bodhi Admin, tôi muốn cập nhật trạng thái của lead để theo dõi tiến độ pipeline.

**Acceptance Criteria:**
- Các trạng thái: Mới → Đã liên hệ → Đủ điều kiện → Đã ký → Mất
- Thay đổi trạng thái lưu ngay lập tức
- Hiển thị trạng thái bằng màu sắc khác nhau

---

**BA-04**
> Là Bodhi Admin, tôi muốn thêm ghi chú nội bộ cho từng lead để ghi nhớ ngữ cảnh khi follow up.

**Acceptance Criteria:**
- Mỗi lead có ô ghi chú tự do
- Ghi chú lưu và hiển thị lại khi xem lead
- Chỉ Bodhi Admin thấy ghi chú này

---

**BA-05**
> Là Bodhi Admin, tôi muốn xem tổng quan pipeline để biết đang có bao nhiêu lead ở mỗi giai đoạn.

**Acceptance Criteria:**
- Hiển thị số lượng lead theo từng trạng thái
- Có tổng số lead trong tháng hiện tại

---

### BODHI ADMIN — Quản lý clients

---

**BA-06**
> Là Bodhi Admin, tôi muốn xem danh sách chùa đang trả tiền để biết tình trạng kinh doanh.

**Acceptance Criteria:**
- Danh sách hiển thị: tên chùa, gói, số tiền/tháng, trạng thái thanh toán, ngày gia hạn
- Màu trạng thái: Active (xanh) / Overdue (đỏ) / Cancelled (xám)

---

**BA-07**
> Là Bodhi Admin, tôi muốn trạng thái thanh toán tự động cập nhật khi Stripe báo sự kiện để không phải check thủ công.

**Acceptance Criteria:**
- Khi chùa thanh toán thành công → status: Active
- Khi thanh toán thất bại → status: Overdue
- Khi chùa hủy gói → status: Cancelled
- Không cần Bodhi Admin làm gì thủ công

---

**BA-08**
> Là Bodhi Admin, tôi muốn xem tổng MRR và số chùa theo từng trạng thái để đánh giá sức khỏe tài chính.

**Acceptance Criteria:**
- Hiển thị: Tổng MRR (USD), số chùa Active, số chùa Overdue, số chùa Cancelled
- Tính toán tự động từ database

---

**BA-09**
> Là Bodhi Admin, tôi muốn tạo Space giac.ngo cho chùa vừa ký hợp đồng để họ có thể bắt đầu sử dụng.

**Acceptance Criteria:**
- Bodhi Admin nhập thông tin Space (tên chùa, slug)
- Hệ thống gọi giac.ngo API tạo Space
- Space URL lưu vào record của chùa trong CRM
- Bodhi Admin thấy link Space ngay sau khi tạo

---

**BA-10**
> Là Bodhi Admin, tôi muốn gửi email welcome cho chùa sau khi tạo Space để họ biết cách đăng nhập và bắt đầu.

**Acceptance Criteria:**
- Email chứa: link Space giac.ngo, thông tin đăng nhập, hướng dẫn bước tiếp theo
- Gửi tự động sau khi Space được tạo
- Bodhi Admin có thể gửi lại nếu cần

---

### TEMPLE ADMIN — Tài khoản & Gói dịch vụ

---

**TA-01**
> Là Temple Admin, tôi muốn đăng nhập vào portal Bodhi Labs để quản lý gói dịch vụ của chùa mình.

**Acceptance Criteria:**
- Trang đăng nhập riêng cho Temple Admin
- Chỉ thấy thông tin của chùa mình, không thấy chùa khác
- Không thấy CRM leads hay dữ liệu nội bộ Bodhi

---

**TA-02**
> Là Temple Admin, tôi muốn xem gói đang dùng và ngày gia hạn tiếp theo để biết mình đang trả bao nhiêu.

**Acceptance Criteria:**
- Hiển thị: tên gói, giá/tháng, ngày gia hạn tiếp theo
- Hiển thị trạng thái thanh toán hiện tại

---

**TA-03**
> Là Temple Admin, tôi muốn tự nâng hoặc hạ gói dịch vụ mà không cần liên hệ Bodhi Labs.

**Acceptance Criteria:**
- Nút "Quản lý gói" dẫn đến Stripe Customer Portal
- Trong Stripe Customer Portal: chùa tự nâng/hạ/hủy
- Thay đổi có hiệu lực ngay hoặc từ kỳ billing tiếp theo

---

**TA-04**
> Là Temple Admin, tôi muốn xem và tải hóa đơn PDF hàng tháng để lưu hồ sơ kế toán.

**Acceptance Criteria:**
- Danh sách hóa đơn theo tháng
- Tải được PDF cho mỗi hóa đơn
- Xử lý qua Stripe Customer Portal

---

**TA-05**
> Là Temple Admin, tôi muốn có link trực tiếp đến Space giac.ngo của chùa để truy cập nhanh.

**Acceptance Criteria:**
- Portal hiển thị URL Space giac.ngo của chùa
- Click → mở giac.ngo Space trong tab mới

---

**TA-06**
> Là Temple Admin, tôi muốn liên hệ support khi gặp vấn đề mà không cần tìm email ở đâu.

**Acceptance Criteria:**
- Có nút / form liên hệ support trong portal
- Gửi request → Bodhi Admin nhận được email

---

### BILLING — Thanh toán tự động

---

**BL-01**
> Là Temple Admin, tôi muốn đăng ký gói và nhập thẻ tín dụng trong lúc onboarding để bắt đầu sử dụng dịch vụ.

**Acceptance Criteria:**
- Checkout flow qua Stripe (không tự build form thẻ)
- Thu phí onboarding $500 một lần + subscription tháng đầu cùng lúc
- Thanh toán thành công → Bodhi Admin thấy status Active

---

**BL-02**
> Là Temple Admin, tôi muốn được tự động gia hạn hàng tháng để không bị gián đoạn dịch vụ.

**Acceptance Criteria:**
- Stripe tự động charge mỗi tháng
- Nếu thành công → status Active
- Nếu thất bại → status Overdue, Temple Admin nhận email cảnh báo từ Stripe

---

**BL-03**
> Là Temple Admin, tôi muốn hủy gói bất cứ lúc nào và không bị tính phí sau kỳ hiện tại.

**Acceptance Criteria:**
- Hủy qua Stripe Customer Portal
- Dịch vụ vẫn chạy đến hết kỳ đã trả
- Sau kỳ đó → status Cancelled, Space giac.ngo bị suspend

---

## 4. OUT OF SCOPE (Không làm trong Phase 1)

- Mobile app
- Tính năng demo booking / lịch hẹn tự động
- Contract ký điện tử
- Referral program
- Multi-language admin portal

---

## 5. THỨ TỰ ƯU TIÊN

| Sprint | Stories | Mục tiêu |
|--------|---------|----------|
| **Sprint 1** | VS-02, BA-01, BA-02, BA-03 | Form hoạt động + Bodhi Admin login + xem leads |
| **Sprint 2** | BA-06, BA-07, BA-08, BL-01 | Clients + payment status tự động + Stripe Subscriptions |
| **Sprint 3** | TA-01, TA-02, TA-03, TA-04 | Temple Account + Stripe Customer Portal |
| **Sprint 4** | BA-09, BA-10, TA-05, TA-06, BL-02, BL-03 | Space creation + welcome email + polish |

---

*PRD — Bodhi Labs — 02/03/2026*
