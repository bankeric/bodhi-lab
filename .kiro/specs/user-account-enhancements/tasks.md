# Implementation Plan: User Account Enhancements

## Overview

This implementation plan covers email verification enforcement, temple admin onboarding workflows, a user settings page with profile/security/sessions management, and session security controls. The implementation leverages Better Auth's built-in capabilities and extends the existing Resend email integration.

## Tasks

- [x] 1. Enable email verification in Better Auth configuration
  - [x] 1.1 Update auth.ts to enable requireEmailVerification
    - Set `requireEmailVerification: true` in emailAndPassword config
    - Set `autoSignIn: false` to require verification before sign-in
    - Set `sendOnSignUp: true` in emailVerification config
    - Set `expiresIn: 86400` (24 hours) for verification tokens
    - _Requirements: 1.1, 1.2, 1.3_

  - [ ]* 1.2 Write property test for sign-up triggers verification email
    - **Property 1: Sign-up triggers verification email**
    - **Validates: Requirements 1.1**

  - [ ]* 1.3 Write property test for unverified users cannot sign in
    - **Property 2: Unverified users cannot sign in**
    - **Validates: Requirements 1.2**

  - [ ]* 1.4 Write property test for verification token expiration
    - **Property 3: Verification token expiration**
    - **Validates: Requirements 1.3**

  - [ ]* 1.5 Write property test for valid verification marks email verified
    - **Property 4: Valid verification marks email verified**
    - **Validates: Requirements 1.4**

- [x] 2. Implement resend verification email with rate limiting
  - [x] 2.1 Add rate limiting logic to server
    - Create in-memory rate limit tracking Map in routes.ts
    - Implement `checkRateLimit(email)` function (max 3 per 15 minutes)
    - _Requirements: 2.4_

  - [x] 2.2 Create POST /api/auth/resend-verification endpoint
    - Accept email in request body
    - Check rate limit before sending
    - Call Better Auth's sendVerificationEmail
    - Return appropriate success/error responses
    - _Requirements: 2.2, 2.3, 2.5_

  - [x] 2.3 Update Login.tsx with resend verification UI
    - Add state for showResendVerification, resendEmail, resendLoading, resendCooldown
    - Display "Resend verification email" button when sign-in fails due to unverified email
    - Show confirmation message on successful resend
    - Display rate limit message when exceeded
    - _Requirements: 2.1, 2.3, 2.5_

  - [ ]* 2.4 Write property test for resend verification sends email
    - **Property 5: Resend verification sends email**
    - **Validates: Requirements 2.2**

  - [ ]* 2.5 Write property test for verification email rate limiting
    - **Property 6: Verification email rate limiting**
    - **Validates: Requirements 2.4**

- [x] 3. Checkpoint - Verify email verification flow
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement welcome and invitation email templates
  - [x] 4.1 Add sendWelcomeEmail function to notifications.ts
    - Create welcome email template with user's name
    - Include dashboard link and getting-started information
    - Use platform design system (serif font, #991b1b accent color)
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 4.2 Add sendInvitationEmail function to notifications.ts
    - Create invitation email template with inviter context
    - Include password-set link with 72-hour expiration
    - Use platform design system
    - _Requirements: 4.4, 4.5_

  - [x] 4.3 Trigger welcome email on temple admin verification
    - Hook into Better Auth's verification success callback
    - Check if user has temple_admin role
    - Call sendWelcomeEmail, log errors without blocking
    - _Requirements: 3.1, 3.4_

  - [ ]* 4.4 Write property test for welcome email for temple admins
    - **Property 7: Welcome email for temple admins**
    - **Validates: Requirements 3.1, 3.2, 3.3**

- [x] 5. Implement invite temple admin functionality
  - [x] 5.1 Create POST /api/admin/invite-temple-admin endpoint
    - Accept name and email in request body
    - Verify requester has bodhi_admin role
    - Check if email already exists (return 409 if duplicate)
    - Create user with temple_admin role and emailVerified=false
    - Generate password reset token with 72-hour expiration
    - Call sendInvitationEmail
    - _Requirements: 4.3, 4.4, 4.5, 4.6_

  - [x] 5.2 Add invite modal to Admin.tsx
    - Add "Invite Temple Admin" button in header area
    - Create modal with name and email input fields
    - Handle form submission and error display
    - Show success message on successful invite
    - _Requirements: 4.1, 4.2, 4.6_

  - [ ]* 5.3 Write property test for invite creates temple admin user
    - **Property 8: Invite creates temple admin user**
    - **Validates: Requirements 4.3**

  - [ ]* 5.4 Write property test for invitation email sent with correct content
    - **Property 9: Invitation email sent with correct content**
    - **Validates: Requirements 4.4, 4.5**

- [x] 6. Checkpoint - Verify email templates and invite flow
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Create Settings page with Profile tab
  - [x] 7.1 Export additional auth client methods
    - Add updateUser, listSessions, revokeSession, revokeSessions, changeEmail to auth-client.ts exports
    - _Requirements: 5.3, 6.2, 8.1, 9.2, 9.5_

  - [x] 7.2 Create Settings.tsx page component
    - Create new page at client/src/pages/Settings.tsx
    - Implement tabbed layout with Profile, Security, Sessions tabs
    - Add route at /settings in App.tsx (protected for authenticated users)
    - Use platform design system consistent with Dashboard and Admin pages
    - _Requirements: 5.1, 5.5_

  - [x] 7.3 Implement Profile tab
    - Display current name (editable input), email (read-only), role (read-only)
    - Add name update form with save button
    - Call authClient.updateUser on save
    - Display success/error messages
    - Add navigation back to dashboard based on role
    - _Requirements: 5.2, 5.3, 5.4_

  - [ ]* 7.4 Write property test for settings page accessible to authenticated users
    - **Property 10: Settings page accessible to authenticated users**
    - **Validates: Requirements 5.1**

  - [ ]* 7.5 Write property test for settings displays user data
    - **Property 11: Settings displays user data**
    - **Validates: Requirements 5.2**

  - [ ]* 7.6 Write property test for name update persists
    - **Property 12: Name update persists**
    - **Validates: Requirements 5.3**

- [x] 8. Implement Change Email functionality
  - [x] 8.1 Add Change Email section to Profile tab
    - Add input field for new email address
    - Add submit button to trigger email change
    - Call authClient.changeEmail on submit
    - Display pending verification message
    - Handle duplicate email error (409)
    - _Requirements: 6.1, 6.2, 6.5_

  - [ ]* 8.2 Write property test for email change triggers verification
    - **Property 13: Email change triggers verification**
    - **Validates: Requirements 6.2**

  - [ ]* 8.3 Write property test for email change round-trip
    - **Property 14: Email change round-trip**
    - **Validates: Requirements 6.3, 6.4**

- [x] 9. Implement Security tab with Change Password
  - [x] 9.1 Add Security tab to Settings page
    - Create Change Password section
    - Add fields for current password, new password, confirm new password
    - Add password requirements display (min 8 characters)
    - Implement client-side validation for password match
    - Call authClient.changePassword on submit
    - Display generic error for wrong current password (no field hint)
    - Display success message on successful change
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 9.2 Write property test for password change requires current password
    - **Property 15: Password change requires current password**
    - **Validates: Requirements 7.2**

  - [ ]* 9.3 Write property test for password minimum length validation
    - **Property 16: Password minimum length validation**
    - **Validates: Requirements 7.4**

- [x] 10. Checkpoint - Verify Settings page Profile and Security tabs
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Implement Sessions tab with session management
  - [x] 11.1 Add Sessions tab to Settings page
    - Call authClient.listSessions to fetch active sessions
    - Display loading indicator while fetching
    - Display error message with retry option on failure
    - _Requirements: 8.1, 8.4, 8.5_

  - [x] 11.2 Implement session list display
    - Parse userAgent to extract device type and browser name
    - Display device type, browser name, last active timestamp, approximate location (from IP)
    - Visually distinguish current session from other sessions
    - _Requirements: 8.2, 8.3_

  - [x] 11.3 Implement session revocation
    - Add "Revoke" button for each non-current session
    - Call authClient.revokeSession on click
    - Remove session from list and show confirmation on success
    - Display error message on failure
    - _Requirements: 9.1, 9.2, 9.3, 9.6_

  - [x] 11.4 Implement bulk session revocation
    - Add "Sign out all other devices" button
    - Call authClient.revokeSessions on click
    - Update session list to show only current session
    - Display confirmation message
    - _Requirements: 9.4, 9.5_

  - [ ]* 11.5 Write property test for session list contains required info
    - **Property 17: Session list contains required info**
    - **Validates: Requirements 8.2**

  - [ ]* 11.6 Write property test for non-current sessions have revoke option
    - **Property 18: Non-current sessions have revoke option**
    - **Validates: Requirements 9.1**

  - [ ]* 11.7 Write property test for session revocation invalidates session
    - **Property 19: Session revocation invalidates session**
    - **Validates: Requirements 9.2**

  - [ ]* 11.8 Write property test for bulk session revocation
    - **Property 20: Bulk session revocation**
    - **Validates: Requirements 9.5**

- [x] 12. Ensure account deletion prevention
  - [x] 12.1 Verify no deletion UI or API exists
    - Confirm Settings page has no delete account option
    - Confirm no account deletion endpoint exists in routes.ts
    - Optionally add support contact info to Settings page
    - _Requirements: 10.1, 10.2, 10.3_

- [x] 13. Final checkpoint - Complete integration testing
  - Ensure all tests pass, ask the user if questions arise.
  - Verify complete sign-up → verification → sign-in flow
  - Verify invite → set password → sign-in flow
  - Verify all Settings page operations work correctly

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using fast-check
- Better Auth handles most authentication logic; implementation focuses on UI and custom email templates
