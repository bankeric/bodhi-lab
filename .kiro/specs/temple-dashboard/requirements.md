# Tài liệu Yêu cầu — Temple Admin Dashboard

## Giới thiệu

Tính năng Temple Admin Dashboard cung cấp cho người dùng có vai trò `temple_admin` một trang dashboard riêng tại route `/dashboard`. Hiện tại, sau khi đăng nhập, `temple_admin` bị chuyển hướng về trang chủ (`/`) và không có giao diện quản lý nào. Dashboard này cho phép quản trị viên chùa xem thông tin gói dịch vụ, quản lý thanh toán qua Autumn Customer Portal, tải hóa đơn, truy cập giac.ngo Space, và liên hệ hỗ trợ.

## Thuật ngữ

- **Dashboard**: Trang quản trị dành cho `temple_admin` tại route `/dashboard`
- **Temple_Admin**: Người dùng có vai trò `temple_admin` trong hệ thống Better Auth
- **Autumn_Customer_Portal**: Cổng tự phục vụ thanh toán của Autumn cho phép nâng cấp, hạ cấp, hủy gói, và tải hóa đơn
- **Billing_Portal_Hook**: Hook `useCustomer` từ thư viện `autumn-js/react` cung cấp hàm `openBillingPortal()`
- **ProtectedRoute**: Component React hiện có dùng để bảo vệ route theo vai trò người dùng
- **Auth_Session**: Phiên đăng nhập của Better Auth chứa thông tin người dùng bao gồm `role` và `name`
- **Giac_Ngo_Space**: Không gian số trên nền tảng giac.ngo dành cho mỗi chùa (placeholder, sẽ cấu hình sau)

## Yêu cầu

### Yêu cầu 1: Chuyển hướng sau đăng nhập cho Temple Admin

**User Story:** Là một temple_admin, tôi muốn được chuyển hướng đến `/dashboard` sau khi đăng nhập, để tôi có thể truy cập ngay trang quản trị của mình.

#### Tiêu chí chấp nhận

1. WHEN một Temple_Admin đăng nhập thành công qua email/password, THE Login_Page SHALL chuyển hướng Temple_Admin đến route `/dashboard`
2. WHEN một Temple_Admin đã có phiên đăng nhập truy cập trang `/login`, THE Login_Page SHALL chuyển hướng Temple_Admin đến route `/dashboard`
3. WHEN một Temple_Admin đăng nhập thành công qua Google OAuth, THE Login_Page SHALL đặt `callbackURL` thành `/dashboard`

### Yêu cầu 2: Bảo vệ route Dashboard

**User Story:** Là một quản trị viên hệ thống, tôi muốn route `/dashboard` chỉ cho phép `temple_admin` truy cập, để đảm bảo an toàn dữ liệu.

#### Tiêu chí chấp nhận

1. WHEN một người dùng chưa đăng nhập truy cập `/dashboard`, THE ProtectedRoute SHALL chuyển hướng người dùng đến trang `/login`
2. WHEN một người dùng có vai trò khác `temple_admin` truy cập `/dashboard`, THE ProtectedRoute SHALL hiển thị thông báo "Access Denied"
3. THE Dashboard SHALL chỉ hiển thị khi Auth_Session xác nhận người dùng có vai trò `temple_admin`

### Yêu cầu 3: Hiển thị lời chào với tên chùa

**User Story:** Là một temple_admin, tôi muốn thấy lời chào cá nhân hóa với tên của tôi trên dashboard, để tôi cảm thấy được chào đón.

#### Tiêu chí chấp nhận

1. THE Dashboard SHALL hiển thị lời chào chứa tên người dùng từ Auth_Session (trường `name`)
2. IF tên người dùng không tồn tại trong Auth_Session, THEN THE Dashboard SHALL hiển thị lời chào mặc định "Welcome to your Dashboard"

### Yêu cầu 4: Xem thông tin gói dịch vụ hiện tại

**User Story:** Là một temple_admin, tôi muốn xem gói dịch vụ hiện tại và ngày gia hạn, để tôi nắm được tình trạng đăng ký của mình.

#### Tiêu chí chấp nhận

1. THE Dashboard SHALL hiển thị tên gói dịch vụ hiện tại của Temple_Admin (basic, standard, hoặc premium)
2. THE Dashboard SHALL hiển thị ngày gia hạn tiếp theo của gói dịch vụ
3. IF Temple_Admin chưa có gói dịch vụ nào, THEN THE Dashboard SHALL hiển thị trạng thái "No active plan" kèm nút dẫn đến trang `/pricing`

### Yêu cầu 5: Quản lý thanh toán qua Autumn Customer Portal

**User Story:** Là một temple_admin, tôi muốn quản lý gói dịch vụ (nâng cấp, hạ cấp, hủy) và tải hóa đơn, để tôi có thể tự phục vụ mà không cần liên hệ hỗ trợ.

#### Tiêu chí chấp nhận

1. THE Dashboard SHALL hiển thị nút "Manage Billing" để mở Autumn_Customer_Portal
2. WHEN Temple_Admin nhấn nút "Manage Billing", THE Dashboard SHALL gọi hàm `openBillingPortal()` từ Billing_Portal_Hook với `returnUrl` trỏ về `/dashboard`
3. THE Dashboard SHALL hiển thị nút "Download Invoices" để mở Autumn_Customer_Portal (nơi Temple_Admin có thể tải hóa đơn)

### Yêu cầu 6: Liên kết đến giac.ngo Space

**User Story:** Là một temple_admin, tôi muốn có liên kết trực tiếp đến giac.ngo Space của chùa, để tôi có thể truy cập nhanh không gian số của mình.

#### Tiêu chí chấp nhận

1. THE Dashboard SHALL hiển thị card "giac.ngo Space" với liên kết placeholder
2. THE Dashboard SHALL hiển thị thông báo "Coming soon — your Space will be configured shortly" trên card giac.ngo Space
3. WHEN liên kết giac.ngo Space được cấu hình trong tương lai, THE Dashboard SHALL mở liên kết trong tab mới

### Yêu cầu 7: Liên hệ hỗ trợ

**User Story:** Là một temple_admin, tôi muốn có cách liên hệ hỗ trợ nhanh chóng từ dashboard, để tôi có thể nhận trợ giúp khi cần.

#### Tiêu chí chấp nhận

1. THE Dashboard SHALL hiển thị card "Support" với liên kết dẫn đến trang `/contact`
2. WHEN Temple_Admin nhấn vào liên kết hỗ trợ, THE Dashboard SHALL điều hướng Temple_Admin đến trang `/contact`

### Yêu cầu 8: Đăng xuất từ Dashboard

**User Story:** Là một temple_admin, tôi muốn có thể đăng xuất từ dashboard, để tôi có thể kết thúc phiên làm việc an toàn.

#### Tiêu chí chấp nhận

1. THE Dashboard SHALL hiển thị nút "Sign Out" trong header
2. WHEN Temple_Admin nhấn nút "Sign Out", THE Dashboard SHALL kết thúc Auth_Session và chuyển hướng Temple_Admin đến trang `/login`

### Yêu cầu 9: Backend API cho thông tin gói dịch vụ

**User Story:** Là một hệ thống, tôi muốn có API endpoint trả về thông tin gói dịch vụ của temple_admin, để frontend có thể hiển thị dữ liệu chính xác.

#### Tiêu chí chấp nhận

1. THE Server SHALL cung cấp endpoint `GET /api/temple/subscription` trả về thông tin gói dịch vụ của Temple_Admin đang đăng nhập
2. WHEN một người dùng chưa đăng nhập gọi endpoint, THE Server SHALL trả về HTTP 401
3. WHEN một người dùng không có vai trò `temple_admin` gọi endpoint, THE Server SHALL trả về HTTP 403
4. THE Server SHALL chỉ trả về dữ liệu gói dịch vụ thuộc về Temple_Admin đang đăng nhập (data isolation)
