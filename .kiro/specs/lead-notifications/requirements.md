# Requirements: Lead Notifications

## Overview
Thay thế hệ thống thông báo hiện tại (Nodemailer + LarkSuite SMTP) bằng Resend cho email và Telegram Bot API cho tin nhắn tức thời khi có lead mới hoặc contact form submission.

## Actors
- **Visitor**: Người dùng gửi form liên hệ hoặc đăng ký gói dịch vụ
- **Bodhi Admin**: Nhận thông báo qua email (Resend) và Telegram khi có lead/contact mới

## User Stories

### US-1: Gửi email thông báo qua Resend khi có lead mới
**As a** Bodhi Admin  
**I want** nhận email thông báo qua Resend khi có lead mới submit  
**So that** tôi có thể theo dõi và phản hồi nhanh chóng

**Acceptance Criteria:**
- [x] AC-1.1: Khi visitor submit form đăng ký (`POST /api/leads`), hệ thống gửi email qua Resend API thay vì Nodemailer/LarkSuite SMTP
- [x] AC-1.2: Email chứa đầy đủ thông tin lead: tên, phone, email, gói dịch vụ, interests
- [x] AC-1.3: Email gửi đến địa chỉ `ADMIN_EMAIL` từ environment variable
- [x] AC-1.4: Nếu Resend API key chưa cấu hình, log warning và tiếp tục xử lý lead bình thường (không block)

### US-2: Gửi thông báo Telegram khi có lead mới
**As a** Bodhi Admin  
**I want** nhận tin nhắn Telegram khi có lead mới  
**So that** tôi được thông báo tức thời trên điện thoại

**Acceptance Criteria:**
- [x] AC-2.1: Khi visitor submit form đăng ký, hệ thống gửi tin nhắn Telegram qua Bot API
- [x] AC-2.2: Tin nhắn chứa thông tin lead: tên, email, phone, gói dịch vụ
- [x] AC-2.3: Sử dụng `TELEGRAM_BOT_TOKEN` và `TELEGRAM_CHAT_ID` từ environment variable
- [x] AC-2.4: Nếu Telegram credentials chưa cấu hình, log warning và tiếp tục (không block)

### US-3: Gửi email thông báo qua Resend khi có contact form submission
**As a** Bodhi Admin  
**I want** nhận email thông báo qua Resend khi có contact form mới  
**So that** tôi có thể phản hồi liên hệ từ khách hàng tiềm năng

**Acceptance Criteria:**
- [x] AC-3.1: Khi visitor submit contact form (`POST /api/contact`), hệ thống gửi email qua Resend thay vì Nodemailer
- [x] AC-3.2: Email chứa đầy đủ thông tin: tên, email, role, organization, community size, message
- [x] AC-3.3: Email có reply-to là email của visitor
- [x] AC-3.4: Nếu Resend chưa cấu hình, trả về 503 (giữ behavior hiện tại)

### US-4: Gửi thông báo Telegram khi có contact form submission
**As a** Bodhi Admin  
**I want** nhận tin nhắn Telegram khi có contact form mới  
**So that** tôi được thông báo tức thời

**Acceptance Criteria:**
- [x] AC-4.1: Khi visitor submit contact form, hệ thống gửi tin nhắn Telegram
- [x] AC-4.2: Tin nhắn chứa tên, email, organization, message (tóm tắt)
- [x] AC-4.3: Telegram notification là fire-and-forget (không block response)

### US-5: Loại bỏ Nodemailer và LarkSuite SMTP
**As a** developer  
**I want** loại bỏ hoàn toàn Nodemailer và LarkSuite SMTP  
**So that** codebase sạch hơn và không phụ thuộc vào dịch vụ cũ

**Acceptance Criteria:**
- [x] AC-5.1: Xóa `nodemailer` và `@types/nodemailer` khỏi package.json
- [x] AC-5.2: Xóa tất cả import và sử dụng nodemailer trong routes.ts
- [x] AC-5.3: Xóa `SMTP_PASSWORD` khỏi .env template
- [x] AC-5.4: Cập nhật .env với `RESEND_API_KEY` placeholder

## Non-Functional Requirements
- NFR-1: Email và Telegram notification không được block API response (fire-and-forget cho lead, blocking cho contact nếu Resend chưa cấu hình)
- NFR-2: Tất cả notification failures phải được log chi tiết
- NFR-3: Không thay đổi API response format hiện tại
