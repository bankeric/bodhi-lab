# Implementation Plan: Frontend Billing & Contact

## Overview

Triển khai 4 phần frontend cho Bodhi Labs: Pricing Page với Autumn SDK checkout, Contact Page với form validation, Google OAuth button trên Login Page, và cập nhật navigation/routes. Tất cả sử dụng TypeScript + React 18 + Shadcn/ui + Tailwind CSS. Backend đã có sẵn.

## Tasks

- [x] 1. Create contact form validation utility
  - [x] 1.1 Create `client/src/lib/contact-utils.ts` with `validateContactForm` function
    - Define `ContactFormData` and `ValidationResult` interfaces
    - Implement validation: `firstName` and `lastName` must be non-empty/non-whitespace, `email` must match valid email format
    - Return `{ valid: boolean, errors: Record<string, string> }` with field-specific error messages
    - _Requirements: 3.8, 3.1_

  - [ ]* 1.2 Write property test: validation rejects invalid input
    - **Property 1: Contact form validation rejects invalid input**
    - **Validates: Requirements 3.8**
    - Create `client/src/__tests__/contact-validation.test.ts`
    - Use `fast-check` to generate empty/whitespace-only strings for firstName/lastName and invalid email strings
    - Assert `validateContactForm` returns `{ valid: false }` with appropriate error keys

  - [ ]* 1.3 Write property test: validation accepts valid input
    - **Property 2: Contact form validation accepts valid input**
    - **Validates: Requirements 3.8, 3.3**
    - Use `fast-check` to generate non-empty names and valid-format emails with arbitrary optional fields
    - Assert `validateContactForm` returns `{ valid: true, errors: {} }`

- [x] 2. Implement Pricing Page
  - [x] 2.1 Create `client/src/pages/Pricing.tsx` with subscription plan cards
    - Import `useCustomer` from `autumn-js/react`, `useSession` from `@/lib/auth-client`, `useLocation` from `wouter`
    - Define hardcoded `PLANS` array (basic $99, standard $199, premium $299) and `ONBOARDING_ADDON` config
    - Render 3 Shadcn/ui Card components with plan name, price, features list, and "Subscribe" button
    - Render Onboarding Addon section ($500 one-time) below plan cards
    - Apply design system: font-serif, #991b1b primary, #EFE0BD background, #8B4513 accents
    - _Requirements: 1.1, 1.2, 1.6_

  - [x] 2.2 Add checkout and auth-gated subscribe logic to Pricing Page
    - When logged-in user clicks "Subscribe", call `attach(productId)` from `useCustomer` hook
    - When unauthenticated user clicks "Subscribe", redirect to `/login` via `useLocation`
    - Show "Manage Billing" button for logged-in users that calls `openBillingPortal({ returnUrl: window.location.href })`
    - Hide "Manage Billing" button for unauthenticated users
    - Handle errors from `attach()` and `openBillingPortal()` with toast notifications
    - _Requirements: 1.3, 1.4, 2.1, 2.2, 2.3_

- [x] 3. Implement Contact Page
  - [x] 3.1 Create `client/src/pages/Contact.tsx` with contact form
    - Import Shadcn/ui components: Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea, Button, Label
    - Import `useToast` from `@/hooks/use-toast` and `validateContactForm` from `@/lib/contact-utils`
    - Build form with fields: firstName (required), lastName (required), email (required), organizationName, role, organizationType (Select), communitySize (Select), message (Textarea)
    - Implement form state with `useState` for `ContactFormData`
    - Display inline validation errors from `validateContactForm` under each field
    - Apply design system styling consistent with existing pages
    - _Requirements: 3.1, 3.2, 3.8_

  - [x] 3.2 Add form submission with loading state, toast notifications, and form reset
    - POST form data as JSON to `/api/contact` on valid submission
    - Show loading spinner on Submit button and disable it while request is in-flight
    - On success (200): show success toast and reset all form fields to empty strings
    - On error (4xx/5xx): show error toast with descriptive message, keep form fields unchanged
    - On network error: show error toast "Lỗi mạng, vui lòng thử lại"
    - _Requirements: 3.3, 3.4, 3.5, 3.6_

  - [ ]* 3.3 Write property test: successful submission resets form fields
    - **Property 3: Successful contact submission resets all form fields**
    - **Validates: Requirements 3.4**
    - Use `fast-check` to generate valid `ContactFormData`, mock successful fetch response
    - Assert all form fields reset to initial empty values after submission

  - [ ]* 3.4 Write property test: error response produces error notification
    - **Property 4: Error response produces error notification**
    - **Validates: Requirements 3.5**
    - Use `fast-check` to generate error status codes (400-599), mock fetch with error response
    - Assert error toast is triggered and form fields remain unchanged

- [x] 4. Checkpoint - Ensure pricing and contact pages work correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Add Google OAuth button to Login Page
  - [x] 5.1 Modify `client/src/pages/Login.tsx` to add Google OAuth sign-in
    - Add a divider with "or" text below the existing email/password form
    - Add Google OAuth button with Google icon (SVG) and text "Sign in with Google"
    - On click, call `signIn.social({ provider: "google", callbackURL: "/" })` from `@/lib/auth-client`
    - Add loading state (`isGoogleLoading`) to disable button and show spinner during OAuth flow
    - On error, display error message in the existing error area (`setError(...)`)
    - Style button consistent with existing Login page design (font-serif, border, rounded-xl)
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 6. Update routes and navigation
  - [x] 6.1 Register new routes in `client/src/App.tsx`
    - Import `Pricing` from `@/pages/Pricing` and `Contact` from `@/pages/Contact`
    - Add `<Route path="/pricing" component={Pricing} />` and `<Route path="/contact" component={Contact} />` to the Switch block
    - _Requirements: 5.1_

  - [x] 6.2 Add navigation links to Landing page
    - Add links to `/pricing` and `/contact` in appropriate positions (header nav or CTA sections) on `client/src/pages/Landing.tsx`
    - _Requirements: 5.2_

- [x] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using `fast-check`
- All backend endpoints (`/api/contact`, `/api/autumn`) are already available — no server changes needed
- AutumnProvider is already wrapping the app in `main.tsx` with `includeCredentials: true`
- `signIn.social` is already exported from `@/lib/auth-client`
