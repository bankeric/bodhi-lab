# Tài liệu Yêu cầu — Frontend Billing & Contact

## Giới thiệu

Tính năng này triển khai hai phần frontend cho ứng dụng Bodhi Labs: (1) Hệ thống billing với Autumn SDK bao gồm bảng giá subscription, checkout flow, và billing portal tự phục vụ; (2) Form liên hệ riêng biệt sử dụng Shadcn/ui components. Ngoài ra, trang Login sẽ được bổ sung nút đăng nhập Google OAuth. Tất cả backend đã được tích hợp sẵn — spec này chỉ tập trung vào frontend.

## Thuật ngữ

- **Pricing_Page**: Trang hiển thị bảng giá 3 gói subscription (basic, standard, premium) và add-on onboarding, cho phép khách hàng chọn gói và bắt đầu checkout
- **Autumn_Checkout**: Quy trình thanh toán do Autumn SDK xử lý, được kích hoạt qua hook `useCustomer` từ `autumn-js/react` khi người dùng chọn một gói
- **Billing_Portal**: Trang quản lý billing tự phục vụ của Autumn, cho phép khách hàng xem hóa đơn, nâng cấp, hạ cấp, hoặc hủy subscription
- **Contact_Form**: Form liên hệ React sử dụng Shadcn/ui components, gửi dữ liệu đến endpoint POST `/api/contact` đã có sẵn
- **Contact_Page**: Trang `/contact` chứa Contact_Form, là route riêng biệt trong ứng dụng
- **Login_Page**: Trang đăng nhập tại `/login`, hiện hỗ trợ email/password, sẽ được bổ sung nút Google OAuth
- **Google_OAuth_Button**: Nút đăng nhập bằng Google trên Login_Page, sử dụng hàm `signIn.social` từ Better Auth client
- **useCustomer_Hook**: Hook React từ `autumn-js/react` cung cấp các hàm `attach` (checkout), `check` (kiểm tra subscription), và `openBillingPortal` (mở portal)
- **Toast_Notification**: Thông báo popup sử dụng Shadcn/ui Toaster component, hiển thị kết quả thành công hoặc lỗi sau khi submit form
- **Subscription_Plan**: Một trong 3 gói subscription: basic ($99/tháng), standard ($199/tháng), premium ($299/tháng)
- **Onboarding_Addon**: Gói dịch vụ onboarding một lần $500, hiển thị như add-on trên Pricing_Page

## Yêu cầu

### Yêu cầu 1: Trang Bảng giá Subscription

**User Story:** Là khách hàng tiềm năng, tôi muốn xem bảng giá các gói subscription rõ ràng, để tôi có thể so sánh và chọn gói phù hợp với nhu cầu của tổ chức.

#### Tiêu chí chấp nhận

1. THE Pricing_Page SHALL hiển thị 3 thẻ gói subscription: basic ($99/tháng), standard ($199/tháng), và premium ($299/tháng), mỗi thẻ bao gồm tên gói, giá, và danh sách tính năng
2. THE Pricing_Page SHALL hiển thị gói Onboarding_Addon ($500 một lần) như một phần riêng biệt bên dưới các gói subscription
3. WHEN người dùng đã đăng nhập nhấn nút "Subscribe" trên một thẻ gói, THE Pricing_Page SHALL gọi hàm `attach` từ useCustomer_Hook với product ID tương ứng (basic, standard, hoặc premium) để khởi tạo Autumn_Checkout
4. WHEN người dùng chưa đăng nhập nhấn nút "Subscribe" trên một thẻ gói, THE Pricing_Page SHALL chuyển hướng người dùng đến Login_Page
5. THE Pricing_Page SHALL được truy cập qua route `/pricing` trong ứng dụng
6. THE Pricing_Page SHALL sử dụng Shadcn/ui Card component cho mỗi thẻ gói và tuân thủ design system hiện tại (font serif, màu primary #991b1b, background #EFE0BD)

### Yêu cầu 2: Billing Portal tự phục vụ

**User Story:** Là khách hàng đang có subscription, tôi muốn quản lý billing của mình (xem hóa đơn, nâng cấp, hạ cấp, hủy), để tôi có thể tự chủ trong việc quản lý tài khoản.

#### Tiêu chí chấp nhận

1. WHEN người dùng đã đăng nhập và có subscription nhấn nút "Manage Billing", THE ứng dụng SHALL gọi hàm `openBillingPortal` từ useCustomer_Hook với `returnUrl` là URL trang hiện tại
2. THE nút "Manage Billing" SHALL được hiển thị trên Pricing_Page cho người dùng đã đăng nhập
3. WHILE người dùng chưa đăng nhập, THE nút "Manage Billing" SHALL không được hiển thị trên Pricing_Page

### Yêu cầu 3: Trang Liên hệ (Contact Form)

**User Story:** Là khách hàng tiềm năng, tôi muốn gửi thông tin liên hệ và câu hỏi đến Bodhi Labs, để tôi có thể nhận được tư vấn phù hợp.

#### Tiêu chí chấp nhận

1. THE Contact_Page SHALL hiển thị Contact_Form với các trường sau: firstName (bắt buộc), lastName (bắt buộc), email (bắt buộc), organizationName (tùy chọn), role (tùy chọn), organizationType (tùy chọn), communitySize (tùy chọn), và message (tùy chọn)
2. THE Contact_Form SHALL sử dụng Shadcn/ui components: Input cho text fields, Select cho organizationType và communitySize, Textarea cho message, Button cho submit, và Label cho nhãn trường
3. WHEN người dùng nhấn nút "Submit" với các trường bắt buộc (firstName, lastName, email) đã được điền hợp lệ, THE Contact_Form SHALL gửi dữ liệu qua POST request đến endpoint `/api/contact` với Content-Type `application/json`
4. WHEN endpoint `/api/contact` trả về response thành công (status 200), THE Contact_Form SHALL hiển thị Toast_Notification thành công và reset tất cả các trường về giá trị rỗng
5. IF endpoint `/api/contact` trả về response lỗi (status 4xx hoặc 5xx), THEN THE Contact_Form SHALL hiển thị Toast_Notification lỗi với thông báo mô tả lỗi
6. WHILE Contact_Form đang gửi request, THE nút Submit SHALL hiển thị trạng thái loading (spinner icon) và bị vô hiệu hóa để ngăn gửi trùng lặp
7. THE Contact_Page SHALL được truy cập qua route `/contact` trong ứng dụng
8. THE Contact_Form SHALL thực hiện validation phía client: trường email phải có định dạng email hợp lệ, các trường firstName và lastName không được để trống

### Yêu cầu 4: Nút đăng nhập Google OAuth trên Login Page

**User Story:** Là người dùng, tôi muốn đăng nhập bằng tài khoản Google, để tôi có thể truy cập nhanh hơn mà không cần nhớ mật khẩu riêng.

#### Tiêu chí chấp nhận

1. THE Login_Page SHALL hiển thị Google_OAuth_Button với biểu tượng Google và text "Sign in with Google", được đặt bên dưới form đăng nhập email/password hiện tại, ngăn cách bởi một divider "or"
2. WHEN người dùng nhấn Google_OAuth_Button, THE Login_Page SHALL gọi hàm `signIn.social` từ Better Auth client với provider `google` và `callbackURL` trỏ đến trang chủ
3. IF quá trình đăng nhập Google thất bại, THEN THE Login_Page SHALL hiển thị thông báo lỗi trong khu vực error message hiện có
4. WHILE quá trình đăng nhập Google đang xử lý, THE Google_OAuth_Button SHALL hiển thị trạng thái loading và bị vô hiệu hóa

### Yêu cầu 5: Điều hướng ứng dụng

**User Story:** Là người dùng, tôi muốn truy cập dễ dàng đến các trang Pricing và Contact, để tôi có thể tìm thông tin cần thiết nhanh chóng.

#### Tiêu chí chấp nhận

1. THE ứng dụng SHALL đăng ký route `/pricing` trỏ đến Pricing_Page và route `/contact` trỏ đến Contact_Page trong App.tsx
2. THE trang Landing hiện tại SHALL chứa liên kết điều hướng đến Pricing_Page và Contact_Page tại các vị trí phù hợp (header navigation hoặc CTA sections)
