# BÁO CÁO SẢN PHẨM — BODHI LABS & GIAC.NGO


---

## 1. TỔNG QUAN HỆ SINH THÁI

Chúng ta vận hành hai sản phẩm có quan hệ bổ trợ nhau:

**Bodhi Labs** — website marketing và dịch vụ bán hàng. Tiếp cận chùa, ký hợp đồng, onboard, và chăm sóc khách hàng. Là bộ mặt thương mại của hệ sinh thái.

**giac.ngo** — nền tảng công nghệ thực sự. Nơi các chùa vận hành không gian số của mình: AI trợ lý, thư viện kinh sách, cúng dường, thành viên, và cộng đồng. Là động cơ phía sau.


### Luồng vận hành

```
Bodhi Labs tìm chùa → ký hợp đồng → tạo Space trên giac.ngo cho chùa
                                              ↓
                              Chùa có không gian số riêng trên giac.ngo
                              (ten-chua.giac.ngo hoặc tên miền riêng)
                                              ↓
                              Phật tử đăng ký → chat AI → cúng dường
```

### Tầm nhìn — giac.ngo Marketplace

giac.ngo không chỉ là nền tảng riêng cho từng chùa mà còn là **marketplace AI Phật giáo**:

- Chùa huấn luyện AI trên bài giảng của Thầy trụ trì → xuất bản lên marketplace
- Chùa khác hoặc cá nhân khám phá và sử dụng AI agent đó
- Chùa gốc nhận doanh thu từ việc chia sẻ AI
- Càng nhiều chùa tham gia, nền tảng càng có giá trị

---

## 3. TÍNH NĂNG SẢN PHẨM

### Những gì mỗi chùa nhận được trên giac.ngo

**1. Không gian số riêng (Space)**
Mỗi chùa có không gian độc lập với thương hiệu riêng: logo, màu sắc, tên miền phụ.

**2. Trợ lý AI riêng**
AI huấn luyện trên tài liệu của chính chùa — bài giảng, kinh điển, hỏi đáp, lịch sử chùa. Phật tử hỏi bất kỳ lúc nào, AI trả lời tiếng Việt hoặc tiếng Anh. Hỗ trợ chat văn bản, giọng nói, đọc to câu trả lời, gửi ảnh để AI phân tích.

**3. Thư viện Pháp Bảo**
Bài giảng audio/video, kinh sách đọc trực tiếp, bài thiền có hướng dẫn, phân loại theo tác giả và chủ đề.

**4. Cúng dường**
Nhận cúng dường một lần và định kỳ hàng tháng. Tiền vào thẳng tài khoản ngân hàng chùa. Biên lai tự động gửi email. Chiến dịch gây quỹ có mục tiêu.

**5. Quản lý thành viên**
Phật tử đăng ký tài khoản. Chùa có danh sách thành viên, hồ sơ liên lạc, công cụ gửi thông báo.

**6. Livestream**
Nhúng YouTube Live và Facebook Live. Lịch phát sóng, lưu trữ buổi phát đã qua, thông báo thành viên.

**7. Bảng tin & sự kiện**
Admin chùa đăng bài viết, thông báo, lịch sự kiện.

**8. Bảng điều khiển admin chùa**
Quản lý thành viên, thống kê cúng dường, mức sử dụng AI, nội dung, sự kiện, cài đặt thương hiệu.

**9. Marketplace AI (giai đoạn 2)**
Chùa xuất bản AI agent lên marketplace. Chùa khác hoặc cá nhân mua và sử dụng. Chùa gốc nhận doanh thu chia sẻ.

---

## 4. VAI TRÒ NGƯỜI DÙNG

| Vai trò | Là ai | Làm được gì |
|---------|-------|-------------|
| **Bodhi Admin** | Nhân viên Bodhi Labs | Quản lý tất cả chùa, pipeline bán hàng, doanh thu |
| **Chủ không gian** | Thầy trụ trì / ban quản trị | Toàn quyền quản lý không gian chùa |
| **Nhân viên** | Tình nguyện viên | Đăng nội dung, xem thành viên & cúng dường |
| **Thành viên** | Phật tử | Chat AI, cúng dường, xem nội dung, sự kiện |
| **Khách** | Chưa đăng ký | Xem giới hạn, được mời đăng ký |

---

## 5. GÓI DỊCH VỤ & GIÁ

### Phí chùa trả cho Bodhi Labs (USD)

| Gói | Giá | Tính năng |
|-----|-----|-----------|
| **Phí onboarding** | $500 một lần | Thiết lập toàn bộ, huấn luyện AI lần đầu |
| **Cơ Bản** | $99/tháng | Website + cúng dường + 100 câu AI/tháng + thành viên |
| **Tiêu Chuẩn** | $199/tháng | Cơ Bản + livestream + 500 câu AI/tháng + bảng tin |
| **Cao Cấp** | $299/tháng | Tiêu Chuẩn + AI không giới hạn + tên miền riêng + ưu tiên hỗ trợ |
| **Giảm giá năm** | Trả 10 tháng dùng 12 | ~17% tiết kiệm |

### Luồng tiền

**Flow 1: Phật tử → Chùa (cúng dường)**
Phật tử thanh toán qua giac.ngo → Stripe Connect → tiền vào thẳng tài khoản ngân hàng của chùa. Bodhi Labs thu phí nền tảng 2–3% trên mỗi giao dịch. Hỗ trợ USD và VND.

**Flow 2: Chùa → Bodhi Labs (phí dịch vụ)**
Chùa trả phí SaaS hàng tháng ($99/$199/$299) qua Stripe Subscriptions trên Bodhi Labs. Tự động gia hạn mỗi tháng. Chùa tự nâng/hạ/hủy gói trên tài khoản của mình.

---

## 6. BẢNG ĐIỀU KHIỂN NỘI BỘ BODHI LABS

Bodhi Labs cần bảng điều khiển nội bộ để vận hành kinh doanh. Đây là yêu cầu **hiện tại**, không phải tương lai.

### Pipeline — Quản lý khách hàng tiềm năng

- Danh sách leads đang được tiếp cận
- Trạng thái từng lead: Mới → Đã liên hệ → Đủ điều kiện → Đã ký → Mất
- Ghi chú nội bộ per lead

### Clients — Quản lý chùa đang hoạt động

- Danh sách chùa đang trả tiền
- Gói dịch vụ và số tiền hàng tháng
- **Trạng thái thanh toán tự động** — cập nhật ngay khi Stripe báo:
  - Đã thanh toán → Active
  - Trễ hạn → Overdue
  - Đã hủy → Cancelled
- Ngày gia hạn tiếp theo
- Link không gian giac.ngo của chùa

### Tự quản lý gói dịch vụ (dành cho chùa)

Chùa **tự thực hiện được** trên tài khoản của mình — không cần liên hệ Bodhi:
- Nâng gói (Cơ Bản → Tiêu Chuẩn → Cao Cấp)
- Hạ gói
- Hủy gói
- Xem lịch sử thanh toán và tải hóa đơn

### Tổng quan tài chính

- Tổng MRR (doanh thu định kỳ hàng tháng)
- Số chùa đang active / overdue / cancelled
- Số lead mới trong tháng

---

## 7. CHECKLIST SẢN PHẨM

### GIAC.NGO — Nền tảng

```
│
├── 1. WEBSITE CHÙA (Space)
│   ├── ✅ Không gian số riêng với thương hiệu (logo, màu sắc)
│   ├── ✅ Thư viện bài giảng & kinh sách
│   ├── ✅ Thiền dẫn (Guided Meditation) có bộ đếm giờ & nhạc nền
│   ├── ✅ Cộng đồng (social feed) trong Space
│   ├── ✅ Tên miền phụ riêng (ten-chua.giac.ngo)
│   ├── ✅ Custom domain (chat.chuaviengiac.com → giac.ngo)
│   ├── ✅ Lịch sự kiện của từng Space
│   ├── ✅ Thông tin liên hệ & bản đồ chùa
│   ├── ✅ Lịch Phật giáo (âm lịch, lễ kỳ tự động)
│   └── ⬜ Ứng dụng di động / PWA (iOS & Android)
│
├── 2. TRỢ LÝ AI
│   ├── ✅ Chatbot RAG (upload tài liệu → AI học → trả lời)
│   ├── ✅ Hỗ trợ nhiều mô hình AI (Gemini, GPT-4o, Grok)
│   ├── ✅ Huấn luyện trên tài liệu riêng của chùa
│   ├── ✅ Hỗ trợ tiếng Việt & tiếng Anh
│   ├── ✅ Nhận dạng giọng nói (nói → text)
│   ├── ✅ Đọc to câu trả lời (text → giọng đọc)
│   ├── ✅ Xử lý ảnh & OCR
│   ├── ✅ Dịch tự động nội dung (Auto-translate Việt ↔ Anh)
│   ├── ✅ Lịch sử hội thoại & phản hồi chất lượng AI
│   ├── ✅ Fine-tuning AI theo dữ liệu Q&A
│   ├── ✅ Đo lường sử dụng (token, billing)
│   └── ⬜ Knowledge base Phật giáo cố định (pre-loaded, không cần upload)
│
├── 3. HỆ THỐNG CÚNG DƯỜNG
│   ├── ✅ Cúng dường một lần [Stripe]
│   ├── ✅ Lịch sử giao dịch
│   ├── ⬜ Stripe Connect — chùa kết nối tài khoản ngân hàng [Stripe]
│   ├── ⬜ Cúng dường định kỳ hàng tháng [Stripe]
│   ├── ⬜ Tự động chuyển tiền vào tài khoản chùa (payout) [Stripe]
│   ├── ⬜ Platform fee 2–3% tự động thu [Stripe]
│   ├── ⬜ Biên lai email tự động sau mỗi giao dịch [Stripe]
│   ├── ⬜ Webhook xác nhận trạng thái giao dịch [Stripe]
│   ├── ⬜ Chiến dịch gây quỹ (đặt mục tiêu)
│   ├── ⬜ QR code cúng dường (offline → online)
│   ├── ⬜ Cúng dường qua SMS (text-to-give)
│   ├── ✅ Cúng dường bằng tiền điện tử (Crypto / Koii Network)
│   ├── ⬜ Biên lai thuế đúng chuẩn 501(c)(3) IRS
│   └── ⬜ Báo cáo tổng kết cúng dường hàng năm
│
├── 4. QUẢN LÝ THÀNH VIÊN
│   ├── ✅ Đăng ký / đăng nhập (kể cả Google OAuth)
│   ├── ✅ Hồ sơ thành viên
│   ├── ✅ Danh sách thành viên (admin xem)
│   ├── ✅ Phân quyền chi tiết (RBAC)
│   ├── ⬜ Phân hạng thành viên
│   ├── ⬜ Công cụ liên lạc (email & SMS hàng loạt)
│   └── ⬜ Thông báo đẩy (push notification)
│
├── 5. TRUNG TÂM LIVESTREAM
│   ├── ⬜ Nhúng YouTube Live
│   ├── ⬜ Nhúng Facebook Live
│   ├── ⬜ Lịch phát sóng
│   ├── ⬜ Lưu trữ buổi phát đã qua
│   └── ⬜ Thông báo buổi phát sắp tới
│
├── 6. BẢNG ĐIỀU KHIỂN CHÙA (admin)
│   ├── ✅ Thống kê thành viên & cúng dường
│   ├── ✅ Quản lý tài liệu RAG
│   ├── ✅ Cấu hình AI (prompt, model, nhiệt độ)
│   ├── ✅ Quản lý nội dung & thư viện
│   ├── ✅ Lịch sử giao dịch & billing
│   ├── ✅ Xét duyệt yêu cầu rút tiền (Space Owner withdrawal)
│   ├── ✅ Guest Control (giới hạn tin nhắn vãng lai)
│   ├── ✅ Quản lý API keys cá nhân (Gemini, GPT, Grok)
│   ├── ⬜ Theo dõi điểm danh (sự kiện, khóa tu)
│   ├── ⬜ Tự nâng / hạ / hủy gói ngay trong giac.ngo admin [Stripe]
│   ├── ⬜ Nhận sync plan từ Bodhi Labs → tự mở khóa tính năng tương ứng
│   └── ⬜ Khi nâng từ giac.ngo → đồng bộ ngược về Bodhi Labs CRM
│
└── 7. MARKETPLACE AI
    ├── ✅ Khám phá & kích hoạt AI agent
    ├── ✅ Doanh thu & rút tiền cho Space Owner (chùa gốc)
    ├── ⬜ Chùa xuất bản AI agent lên marketplace
    └── ⬜ Mua / bán AI agent giữa các chùa
```

---

### BODHI LABS — Bán hàng & Vận hành

```
│
├── 1. WEBSITE MARKETING
│   ├── ✅ Landing page, Platform, About, Process, Career
│   ├── ✅ Song ngữ Anh / Việt
│   └── ✅ Thư mục 20 trung tâm Phật giáo
│
├── 2. AUTH & PHÂN QUYỀN
│   ├── ⬜ Bodhi Admin đăng nhập (email + password, thay thế password dùng chung)
│   ├── ⬜ Temple Account đăng nhập (chùa tự đăng nhập xem thông tin của mình)
│   ├── ⬜ Phân quyền: Bodhi Admin thấy tất cả / Temple chỉ thấy của mình
│   └── ⬜ Quản lý phiên đăng nhập (session / JWT)
│
├── 3. FORM & ONBOARDING
│   ├── ✅ Form đăng ký nhiều bước
│   └── ⬜ Fix form onboarding (đang mất dữ liệu khi submit)
│
├── 4. BODHI INTERNAL DASHBOARD  ← chỉ Bodhi Admin thấy
│   │
│   ├── 4a. CRM — PIPELINE LEADS
│   │   ├── ✅ Danh sách leads
│   │   ├── ✅ Cập nhật trạng thái lead (Mới / Liên hệ / Đủ điều kiện / Đã ký / Mất)
│   │   ├── ✅ Email thông báo lead mới
│   │   ├── ⬜ Ghi chú nội bộ per lead
│   │   └── ⬜ Tổng quan pipeline (số lead theo từng giai đoạn)
│   │
│   └── 4b. CRM — CLIENTS (Chùa đang trả tiền)
│       ├── ⬜ Danh sách chùa đang hoạt động
│       ├── ⬜ Gói dịch vụ & số tiền hàng tháng
│       ├── ⬜ Trạng thái thanh toán tự động (Active / Overdue / Cancelled)
│       ├── ⬜ Ngày gia hạn tiếp theo
│       ├── ⬜ Link Space giac.ngo của mỗi chùa
│       ├── ⬜ Tổng MRR + số chùa active / overdue
│       ├── ⬜ Bodhi Admin tạo Space giac.ngo cho chùa mới ký
│       └── ⬜ Gửi email welcome + thông tin đăng nhập cho chùa
│
├── 5. TEMPLE SELF-SERVICE PORTAL  ← chỉ Temple Account thấy
│   ├── ⬜ Xem gói đang dùng & ngày gia hạn tiếp theo
│   ├── ⬜ Nâng / hạ / hủy gói [Stripe]
│   ├── ⬜ Xem & tải hóa đơn PDF [Stripe]
│   ├── ⬜ Link tới Space giac.ngo của mình
│   └── ⬜ Liên hệ support (email / form)
│
└── 6. THANH TOÁN B2B (Chùa → Bodhi Labs)
    ├── ⬜ Chuyển currency sang USD (hiện đang là VND) [Stripe]
    ├── ⬜ Thu phí onboarding $500 một lần [Stripe]
    ├── ⬜ Stripe Subscriptions: tạo 3 gói ($99/$199/$299/tháng) [Stripe]
    ├── ⬜ Chùa nhập thẻ & đăng ký gói khi onboarding [Stripe]
    ├── ⬜ Tự động gia hạn hàng tháng [Stripe]
    ├── ⬜ Webhook → CRM tự cập nhật Active / Overdue / Cancelled [Stripe]
    ├── ⬜ Khi nâng gói → gọi giac.ngo API cập nhật plan cho Space
    └── ⬜ Khi chùa nâng gói từ giac.ngo → nhận callback → cập nhật CRM
```

---

## 8. TỐI ƯU CẤU TRÚC GIAC.NGO

> ⚠️ **Cần Stillen và Windy xác nhận trước khi triển khai.**

### 8.1 URL / Path

Vấn đề hiện tại: slug trùng tên miền tạo URL lỗi (`giac.ngo/giac.ngo/chat`), không có danh sách slug bảo lưu.

| Hiện tại | Đề xuất |
|----------|---------|
| `giac.ngo/{slug}` | `giac.ngo/s/{slug}` |
| Không có reserved list | Bảo lưu: `giac`, `admin`, `marketplace`, `login`, `explore`... |
| `giac.ngo/{slug}/chat` | `giac.ngo/s/{slug}/chat` |


## 9. CÁC VẤN ĐỀ CẦN DEFINE TRƯỚC KHI BÁN

### 9.1 White-label depth — Phật tử có thấy "giac.ngo" không? 

Nếu chùa muốn thương hiệu riêng hoàn toàn, Phật tử không nên thấy "giac.ngo" ở bất kỳ đâu: footer, email gửi đi, tab trình duyệt, push notification. Nếu white-label chưa đủ sâu, Phật tử nhầm lẫn → chùa mất tin tưởng vào Bodhi Labs.

| Điểm cần kiểm tra | Trạng thái |
|--------------------|-----------|
| Tab trình duyệt hiển thị tên chùa (không phải giac.ngo) | ⬜ Cần confirm |
| Email gửi đi từ domain chùa (không phải @giac.ngo) | ⬜ Cần confirm |
| Footer không có logo / link giac.ngo | ⬜ Cần confirm |
| Push notification hiện tên chùa | ⬜ Cần confirm |

### 9.2 AI limit enforcement — Hết hạn mức thì xử lý thế nào?

Khi chùa Basic dùng hết 100 câu AI/tháng, cần có flow rõ ràng:

```
Câu 80/100  → Cảnh báo nhẹ cho admin chùa
Câu 95/100  → Cảnh báo rõ + gợi ý nâng gói
Câu 100/100 → Phật tử thấy thông báo lịch sự, không bị hard stop
Admin       → Thấy upsell prompt ngay trong dashboard
```

Hard stop (AI từ chối trả lời) = trải nghiệm tệ cho Phật tử và làm xấu hình ảnh chùa. Cần define behavior trước khi launch.

### 9.3 Data ownership — Nếu chùa muốn rời đi?

Chùa sẽ hỏi câu này. Cần có câu trả lời rõ:

| Dữ liệu | Chùa có thể export không? |
|---------|--------------------------|
| Danh sách thành viên (tên, email, SĐT) | ⬜ Cần define |
| Lịch sử cúng dường | ⬜ Cần define |
| Tài liệu AI training (PDF, bài giảng) | ⬜ Cần define |
| Nội dung thư viện đã đăng | ⬜ Cần define |





