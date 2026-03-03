# TECH STACK — BODHI LABS

**Ngày:** 02/03/2026
**Triết lý:** Third-party services tối đa — không tự build những gì đã có sẵn.

---

## Stack hiện tại — Giữ nguyên

| Thành phần | Công nghệ |
|-----------|-----------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + Shadcn/ui |
| Backend | Express.js (Node.js) |
| ORM | Drizzle ORM |
| Deployment | Vercel |

---

## Third-party services — Thêm vào

### Auth → Clerk

Thay toàn bộ password dùng chung (`bodhi2024`) hiện tại.

- Login UI: có sẵn, không cần build
- Session management: tự động
- 2 roles: `bodhi_admin` / `temple_admin` qua Clerk metadata
- Express middleware: 1 npm install + 4 dòng code
- **Free tier:** 10,000 MAU

### Database → Neon (giữ, fix driver)

Không cần migrate. Chỉ cần đổi driver cho đúng với Vercel serverless:

```
Hiện tại:  drizzle-orm/node-postgres + pg.Pool  ← sai với serverless
Đổi sang:  @neondatabase/serverless              ← package đã có sẵn, chưa dùng
```

Drizzle ORM, schema, migrations — giữ nguyên 100%.

### Email → Resend

Thay toàn bộ Nodemailer + LarkSuite SMTP.

- API: `resend.emails.send()` — đơn giản hơn nhiều
- Template: viết bằng React (React Email) — cùng stack
- **Free tier:** 3,000 emails/tháng

### Payment → Stripe (mở rộng)

Giữ Stripe, setup thêm:

| Cần làm | Stripe lo |
|---------|----------|
| Subscription $99/$199/$299/tháng | Stripe Billing |
| Thu phí onboarding $500 một lần | Stripe Checkout |
| Tự động gia hạn hàng tháng | Stripe Billing |
| Chùa tự nâng / hạ / hủy gói | **Stripe Customer Portal** |
| Chùa xem & tải hóa đơn | **Stripe Customer Portal** |
| Auto-update payment status | Stripe Webhooks |

→ Temple Self-Service Portal = **zero UI code**, chỉ redirect đến Stripe Customer Portal.

### Internal Dashboard → Custom React (không dùng Retool)

Bodhi Admin dashboard chỉ cần 3 trang: leads, clients, MRR. Tất cả pieces đã có sẵn:
- Shadcn/ui DataTable
- Recharts (đã có trong package.json)
- React Query
- Clerk role gate

Không cần Retool — thêm vendor dependency không đáng với 3 trang đơn giản.

### File Storage → Cloudflare R2 *(defer)*

Chưa cần. Add sau khi có use case cụ thể.
- **Free tier:** 10 GB, không tính phí egress

---

## Schema — Bổ sung cột vào `leads` table

```
+ payment_status          (unpaid / active / overdue / cancelled)
+ plan_tier               (basic / standard / premium)
+ monthly_amount
+ next_billing_date
+ stripe_customer_id
+ stripe_subscription_id
+ giac_ngo_space_id
+ giac_ngo_space_url
+ notes
```

---

## Tổng hợp

| Vấn đề | Hiện tại | Giải pháp | Setup |
|--------|---------|-----------|-------|
| Auth | Password dùng chung | **Clerk** | 2–4 giờ |
| Database | Neon (sai driver) | **Neon** (fix driver) | 1 giờ |
| Email | LarkSuite SMTP | **Resend** | 1–2 giờ |
| Payment | Stripe VND one-time | **Stripe Billing + Portal** | 6–8 giờ |
| Temple Portal | Không có | **Stripe Customer Portal** | 0 giờ |
| Admin Dashboard | Không có | **Custom React** (Clerk-gated) | 4–8 giờ |

**Tổng ước tính:** 16–25 giờ dev — đạt được trước 31/3/2026.

---

## Thứ tự làm (theo độ ưu tiên)

```
1. Fix form onboarding (mất dữ liệu khi submit)       ← bug, làm trước
2. Fix Neon driver (node-postgres → neon-serverless)   ← 1 giờ
3. Tích hợp Clerk (thay password dùng chung)          ← security critical
4. Thay LarkSuite SMTP bằng Resend                    ← 1 ngày
5. Stripe Billing + Webhooks + Customer Portal        ← 1 tuần
6. Bodhi Admin dashboard (leads + clients + MRR)      ← 1 tuần
```

---

*Tech Stack — Bodhi Labs — 02/03/2026*
