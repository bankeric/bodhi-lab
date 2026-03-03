# Tài liệu Yêu cầu — Billing Admin Upgrade

## Giới thiệu

Tính năng này nâng cấp hệ thống billing và trang quản trị của Bodhi Labs. Bao gồm 4 phần chính: (1) tích hợp Autumn cho subscription billing, (2) mở rộng schema bảng leads, (3) xác minh contact form hiện tại, và (4) nâng cấp Admin Dashboard với thống kê MRR, biểu đồ pipeline, và quản lý lead nâng cao.

## Thuật ngữ

- **Autumn_Handler**: Module xử lý backend của Autumn SDK, mount trên Express tại `/api/autumn/*`, chịu trách nhiệm checkout, feature gating, và billing portal
- **Autumn_Provider**: React context provider từ `autumn-js/react`, cung cấp hook `useCustomer` cho frontend
- **Admin_Dashboard**: Trang quản trị tại `client/src/pages/Admin.tsx`, chỉ truy cập được bởi người dùng có role `bodhi_admin`
- **Lead**: Bản ghi trong bảng `leads` đại diện cho một khách hàng tiềm năng hoặc đang hoạt động
- **Storage_Layer**: Tầng truy cập dữ liệu (Drizzle ORM) xử lý CRUD cho bảng leads
- **MRR**: Monthly Recurring Revenue — doanh thu định kỳ hàng tháng từ các subscription đang hoạt động
- **Pipeline_Funnel**: Biểu đồ phễu hiển thị phân bố lead theo trạng thái (new → contacted → qualified → converted → lost)
- **Contact_Form**: Form liên hệ hiện có trong Landing.tsx, gửi dữ liệu qua POST `/api/contact`
- **Stripe_Donation_Route**: Route POST `/api/create-payment-intent` hiện có, xử lý thanh toán một lần bằng VND qua Stripe
- **Notification_Service**: Dịch vụ gửi thông báo qua email (Resend) và Telegram khi có lead mới hoặc contact mới

## Yêu cầu

### Yêu cầu 1: Tích hợp Autumn Backend Handler

**User Story:** Là quản trị viên Bodhi, tôi muốn tích hợp Autumn SDK vào Express backend, để hệ thống có thể xử lý checkout subscription, feature gating, và billing portal cho khách hàng.

#### Tiêu chí chấp nhận

1. THE Autumn_Handler SHALL được mount trên Express tại đường dẫn `/api/autumn/*` sử dụng hàm `autumnHandler` từ package `autumn-js/express`
2. WHEN một request đến `/api/autumn/*`, THE Autumn_Handler SHALL xác định khách hàng bằng cách lấy session từ Better Auth middleware và trả về `customerId` cùng `customerData` (name, email)
3. IF session Better Auth không tồn tại khi gọi `/api/autumn/*`, THEN THE Autumn_Handler SHALL trả về HTTP 401 với thông báo lỗi "Unauthorized"
4. THE Stripe_Donation_Route tại POST `/api/create-payment-intent` SHALL tiếp tục hoạt động độc lập và không bị ảnh hưởng bởi việc tích hợp Autumn
5. WHEN cài đặt package, THE hệ thống SHALL thêm `autumn-js` vào dependencies của dự án

### Yêu cầu 2: Tích hợp Autumn Frontend Provider

**User Story:** Là quản trị viên Bodhi, tôi muốn tích hợp Autumn Provider vào React app, để frontend có thể sử dụng các hook checkout, feature gating, và billing portal.

#### Tiêu chí chấp nhận

1. THE Autumn_Provider SHALL được wrap quanh React app trong `main.tsx` với `backendUrl` trỏ đến backend URL và `includeCredentials` được đặt thành `true`
2. WHEN người dùng đã đăng nhập gọi hàm `attach` từ hook `useCustomer` với một product ID hợp lệ (basic, standard, hoặc premium), THE Autumn_Provider SHALL khởi tạo quy trình checkout cho sản phẩm tương ứng
3. WHEN người dùng đã đăng nhập gọi hàm `check` từ hook `useCustomer`, THE Autumn_Provider SHALL trả về trạng thái subscription hiện tại của khách hàng
4. WHEN người dùng đã đăng nhập yêu cầu mở billing portal, THE Autumn_Provider SHALL mở trang quản lý billing của Autumn cho khách hàng đó

### Yêu cầu 3: Cấu hình sản phẩm Autumn

**User Story:** Là quản trị viên Bodhi, tôi muốn có các gói subscription rõ ràng, để khách hàng có thể chọn gói phù hợp với nhu cầu.

#### Tiêu chí chấp nhận

1. THE hệ thống SHALL hỗ trợ 4 sản phẩm Autumn: `basic` ($99/tháng), `standard` ($199/tháng), `premium` ($299/tháng), và `onboarding` ($500 một lần)
2. WHEN khách hàng chọn gói `basic`, `standard`, hoặc `premium`, THE hệ thống SHALL tạo subscription định kỳ hàng tháng với số tiền tương ứng
3. WHEN khách hàng chọn gói `onboarding`, THE hệ thống SHALL tạo thanh toán một lần $500

### Yêu cầu 4: Mở rộng Schema bảng Leads

**User Story:** Là quản trị viên Bodhi, tôi muốn bảng leads lưu trữ thêm thông tin billing và ghi chú, để có thể theo dõi trạng thái thanh toán và quản lý khách hàng hiệu quả hơn.

#### Tiêu chí chấp nhận

1. THE Storage_Layer SHALL thêm cột `payment_status` kiểu text vào bảng leads với giá trị mặc định `unpaid` và chỉ chấp nhận các giá trị: `unpaid`, `active`, `overdue`, `cancelled`
2. THE Storage_Layer SHALL thêm cột `plan_tier` kiểu text vào bảng leads, chỉ chấp nhận các giá trị: `basic`, `standard`, `premium`
3. THE Storage_Layer SHALL thêm cột `monthly_amount` kiểu integer vào bảng leads để lưu số tiền subscription hàng tháng
4. THE Storage_Layer SHALL thêm cột `next_billing_date` kiểu timestamp vào bảng leads để lưu ngày thanh toán tiếp theo
5. THE Storage_Layer SHALL thêm cột `stripe_customer_id` kiểu text vào bảng leads để lưu ID khách hàng Stripe (dùng cho donation tracking)
6. THE Storage_Layer SHALL thêm cột `stripe_subscription_id` kiểu text vào bảng leads để lưu ID subscription Stripe
7. THE Storage_Layer SHALL thêm cột `notes` kiểu text vào bảng leads để lưu ghi chú của quản trị viên
8. WHEN các cột mới được thêm, THE Storage_Layer SHALL đảm bảo tất cả cột mới đều nullable để không ảnh hưởng đến dữ liệu hiện có
9. THE insertLeadSchema SHALL được cập nhật để bao gồm các trường mới với validation phù hợp (payment_status enum, plan_tier enum, monthly_amount số nguyên dương)

### Yêu cầu 5: Cập nhật Storage Layer cho Lead mới

**User Story:** Là quản trị viên Bodhi, tôi muốn API quản lý lead hỗ trợ các trường mới, để có thể cập nhật thông tin billing và ghi chú từ Admin Dashboard.

#### Tiêu chí chấp nhận

1. WHEN quản trị viên gửi PATCH request đến `/api/leads/:id`, THE Storage_Layer SHALL chấp nhận và cập nhật các trường mới: `payment_status`, `plan_tier`, `monthly_amount`, `next_billing_date`, `stripe_customer_id`, `stripe_subscription_id`, và `notes`
2. WHEN giá trị `payment_status` không nằm trong danh sách hợp lệ (unpaid, active, overdue, cancelled), THE Storage_Layer SHALL trả về HTTP 400 với thông báo lỗi mô tả
3. WHEN giá trị `plan_tier` không nằm trong danh sách hợp lệ (basic, standard, premium), THE Storage_Layer SHALL trả về HTTP 400 với thông báo lỗi mô tả
4. THE route PATCH `/api/leads/:id` SHALL yêu cầu xác thực qua Better Auth và role `bodhi_admin`

### Yêu cầu 6: Xác minh Contact Form

**User Story:** Là quản trị viên Bodhi, tôi muốn đảm bảo contact form hiện tại hoạt động chính xác với notification service, để không bỏ lỡ liên hệ từ khách hàng tiềm năng.

#### Tiêu chí chấp nhận

1. WHEN người dùng gửi contact form với đầy đủ thông tin bắt buộc (firstName, lastName, email), THE Contact_Form SHALL gửi POST request đến `/api/contact` và nhận phản hồi thành công
2. WHEN POST `/api/contact` nhận dữ liệu hợp lệ, THE Notification_Service SHALL gửi email thông báo qua Resend đến địa chỉ admin
3. IF Resend chưa được cấu hình (thiếu API key), THEN THE hệ thống SHALL trả về HTTP 503 với thông báo "Email service is not configured"
4. IF dữ liệu contact form thiếu trường bắt buộc, THEN THE hệ thống SHALL trả về HTTP 400 với thông báo lỗi cụ thể

### Yêu cầu 7: Thống kê MRR trên Admin Dashboard

**User Story:** Là quản trị viên Bodhi, tôi muốn xem tổng quan doanh thu và hoạt động lead ngay trên đầu trang Admin, để nắm bắt nhanh tình hình kinh doanh.

#### Tiêu chí chấp nhận

1. THE Admin_Dashboard SHALL hiển thị tổng MRR (tổng `monthly_amount` của tất cả lead có `payment_status` là `active`) ở phần đầu trang
2. THE Admin_Dashboard SHALL hiển thị số lượng subscription đang hoạt động (lead có `payment_status` là `active`)
3. THE Admin_Dashboard SHALL hiển thị số lượng lead mới trong tháng hiện tại (lead có `createdAt` trong tháng hiện tại)
4. WHEN dữ liệu lead thay đổi, THE Admin_Dashboard SHALL cập nhật các thống kê MRR sau khi refetch dữ liệu

### Yêu cầu 8: Biểu đồ Pipeline Funnel

**User Story:** Là quản trị viên Bodhi, tôi muốn xem biểu đồ phễu pipeline, để hiểu rõ phân bố lead qua các giai đoạn bán hàng.

#### Tiêu chí chấp nhận

1. THE Admin_Dashboard SHALL hiển thị biểu đồ phễu (funnel chart) sử dụng thư viện Recharts, thể hiện số lượng lead ở mỗi trạng thái: new, contacted, qualified, converted, lost
2. THE biểu đồ phễu SHALL sắp xếp các trạng thái theo thứ tự pipeline: new → contacted → qualified → converted → lost
3. WHEN số lượng lead ở một trạng thái là 0, THE biểu đồ phễu SHALL hiển thị trạng thái đó với giá trị 0

### Yêu cầu 9: Biểu đồ Subscription Status

**User Story:** Là quản trị viên Bodhi, tôi muốn xem biểu đồ phân bố trạng thái subscription, để theo dõi tỷ lệ khách hàng đang hoạt động, quá hạn, và đã hủy.

#### Tiêu chí chấp nhận

1. THE Admin_Dashboard SHALL hiển thị biểu đồ phân bố trạng thái subscription (pie chart hoặc bar chart) sử dụng Recharts, thể hiện số lượng lead theo `payment_status`: unpaid, active, overdue, cancelled
2. WHEN không có lead nào có `payment_status` khác `unpaid`, THE biểu đồ SHALL hiển thị trạng thái trống với thông báo phù hợp

### Yêu cầu 10: Chỉnh sửa ghi chú Lead

**User Story:** Là quản trị viên Bodhi, tôi muốn thêm và chỉnh sửa ghi chú cho từng lead, để ghi lại thông tin quan trọng trong quá trình theo dõi khách hàng.

#### Tiêu chí chấp nhận

1. WHEN quản trị viên click vào vùng ghi chú của một lead, THE Admin_Dashboard SHALL hiển thị giao diện chỉnh sửa (inline textarea hoặc modal) cho phép nhập và lưu ghi chú
2. WHEN quản trị viên lưu ghi chú, THE Admin_Dashboard SHALL gửi PATCH request đến `/api/leads/:id` với trường `notes` và cập nhật giao diện sau khi lưu thành công
3. IF lưu ghi chú thất bại, THEN THE Admin_Dashboard SHALL hiển thị thông báo lỗi cho quản trị viên
4. THE Admin_Dashboard SHALL hiển thị ghi chú hiện có của mỗi lead trong danh sách lead

### Yêu cầu 11: Tìm kiếm và Lọc Lead

**User Story:** Là quản trị viên Bodhi, tôi muốn tìm kiếm và lọc danh sách lead, để nhanh chóng tìm được lead cần quản lý.

#### Tiêu chí chấp nhận

1. THE Admin_Dashboard SHALL cung cấp ô tìm kiếm cho phép tìm lead theo tên, email, hoặc số điện thoại
2. THE Admin_Dashboard SHALL cung cấp bộ lọc theo trạng thái lead (new, contacted, qualified, converted, lost)
3. THE Admin_Dashboard SHALL cung cấp bộ lọc theo trạng thái thanh toán (unpaid, active, overdue, cancelled)
4. WHEN quản trị viên nhập từ khóa tìm kiếm, THE Admin_Dashboard SHALL lọc danh sách lead phía client và hiển thị kết quả phù hợp ngay lập tức
5. WHEN quản trị viên chọn bộ lọc, THE Admin_Dashboard SHALL kết hợp bộ lọc với từ khóa tìm kiếm để hiển thị kết quả chính xác

### Yêu cầu 12: Hiển thị trường mới trên Admin Dashboard

**User Story:** Là quản trị viên Bodhi, tôi muốn xem các thông tin billing mới (payment_status, plan_tier, notes) trên mỗi lead card, để có cái nhìn toàn diện về từng khách hàng.

#### Tiêu chí chấp nhận

1. THE Admin_Dashboard SHALL hiển thị `payment_status` của mỗi lead dưới dạng badge có màu phân biệt (active: xanh lá, overdue: cam, cancelled: đỏ, unpaid: xám)
2. THE Admin_Dashboard SHALL hiển thị `plan_tier` của mỗi lead khi có giá trị (basic, standard, premium)
3. THE Admin_Dashboard SHALL hiển thị `notes` của mỗi lead khi có giá trị, dưới dạng đoạn text có thể mở rộng
4. WHEN một lead chưa có `plan_tier` hoặc `payment_status`, THE Admin_Dashboard SHALL hiển thị giá trị mặc định phù hợp (ví dụ: "Chưa có gói" cho plan_tier trống)
