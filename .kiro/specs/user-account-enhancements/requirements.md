# Requirements Document

## Introduction

This feature enhances user account management for the Bodhi Technology Lab platform. It addresses four key gaps: email verification enforcement, temple admin onboarding workflows, user profile/settings management, and session security controls. These enhancements apply to both `bodhi_admin` and `temple_admin` user roles.

## Glossary

- **Auth_System**: The Better Auth authentication system handling user sign-up, sign-in, email verification, and session management
- **Email_Service**: The Resend email delivery service used for sending verification and welcome emails
- **Settings_Page**: A new user-facing page at `/settings` for managing account details and security
- **Session**: An authenticated user login instance with associated device, browser, and location metadata
- **Temple_Admin**: A user with `temple_admin` role who manages a temple organization
- **Bodhi_Admin**: An internal staff user with `bodhi_admin` role who manages the platform via `/admin`
- **Verification_Email**: An email containing a unique link to confirm ownership of an email address
- **Welcome_Email**: An onboarding email sent to new temple admins after successful sign-up

## Requirements

### Requirement 1: Email Verification on Sign-Up

**User Story:** As a platform operator, I want users to verify their email addresses, so that I can ensure account ownership and enable reliable communication.

#### Acceptance Criteria

1. WHEN a user completes sign-up, THE Auth_System SHALL send a Verification_Email to the provided email address
2. WHILE a user's email is unverified, THE Auth_System SHALL prevent sign-in and display a message indicating verification is required
3. THE Verification_Email SHALL contain a unique verification link that expires after 24 hours
4. WHEN a user clicks a valid verification link, THE Auth_System SHALL mark the email as verified and redirect to the login page with a success message
5. IF a verification link has expired, THEN THE Auth_System SHALL display an error message and prompt the user to request a new verification email

### Requirement 2: Resend Verification Email

**User Story:** As a user who hasn't received or has lost my verification email, I want to request a new verification email, so that I can complete my account setup.

#### Acceptance Criteria

1. WHEN an unverified user attempts to sign in, THE Login_Page SHALL display a "Resend verification email" button
2. WHEN the user clicks "Resend verification email", THE Auth_System SHALL send a new Verification_Email to the user's registered email address
3. WHEN a new Verification_Email is sent successfully, THE Login_Page SHALL display a confirmation message indicating the email was sent
4. THE Auth_System SHALL rate-limit verification email requests to a maximum of 3 requests per 15 minutes per email address
5. IF the rate limit is exceeded, THEN THE Login_Page SHALL display a message indicating the user must wait before requesting another email

### Requirement 3: Welcome Email for Temple Admins

**User Story:** As a new temple admin, I want to receive a welcome email after signing up, so that I understand how to get started with the platform.

#### Acceptance Criteria

1. WHEN a user with `temple_admin` role completes email verification, THE Email_Service SHALL send a Welcome_Email to the user
2. THE Welcome_Email SHALL include the user's name, a link to the dashboard, and basic getting-started information
3. THE Welcome_Email SHALL use the platform's design system (serif font, #991b1b accent color)
4. IF the Welcome_Email fails to send, THEN THE Auth_System SHALL log the error without blocking the user's access

### Requirement 4: Bodhi Admin Invite Temple Admin

**User Story:** As a Bodhi admin, I want to invite new temple admins from the admin dashboard, so that I can onboard temple clients without them self-registering.

#### Acceptance Criteria

1. THE Admin_Page SHALL display an "Invite Temple Admin" button in the header area
2. WHEN a Bodhi admin clicks "Invite Temple Admin", THE Admin_Page SHALL display a modal form requesting name and email address
3. WHEN the Bodhi admin submits the invite form, THE Auth_System SHALL create a new user account with `temple_admin` role and unverified email status
4. WHEN a new temple admin account is created via invite, THE Email_Service SHALL send an invitation email with a link to set their password
5. THE invitation email SHALL include the inviting admin's context and a link that expires after 72 hours
6. IF the invited email already exists in the system, THEN THE Admin_Page SHALL display an error message indicating the email is already registered

### Requirement 5: User Profile Settings Page

**User Story:** As a logged-in user, I want to view and edit my account details, so that I can keep my information current.

#### Acceptance Criteria

1. THE Settings_Page SHALL be accessible at `/settings` for authenticated users
2. THE Settings_Page SHALL display the user's current name, email, and role (read-only for role)
3. WHEN a user updates their name and clicks save, THE Auth_System SHALL update the user's name and display a success message
4. THE Settings_Page SHALL provide navigation back to the user's dashboard (based on role)
5. THE Settings_Page SHALL use the platform's design system consistent with Dashboard and Admin pages

### Requirement 6: Change Email with Verification

**User Story:** As a user, I want to change my email address with verification, so that I can update my contact information securely.

#### Acceptance Criteria

1. THE Settings_Page SHALL display a "Change Email" section with an input field for the new email address
2. WHEN a user submits a new email address, THE Auth_System SHALL send a Verification_Email to the new address
3. WHILE the new email is unverified, THE Auth_System SHALL retain the original email as the active email
4. WHEN the user verifies the new email address, THE Auth_System SHALL update the user's email to the new address
5. IF the new email address is already registered to another account, THEN THE Settings_Page SHALL display an error message

### Requirement 7: Change Password

**User Story:** As a user, I want to change my password, so that I can maintain account security.

#### Acceptance Criteria

1. THE Settings_Page SHALL display a "Change Password" section with fields for current password, new password, and confirm new password
2. WHEN a user submits a password change request, THE Auth_System SHALL verify the current password matches before updating
3. IF the current password is incorrect, THEN THE Settings_Page SHALL display an error message without revealing which field was wrong
4. THE new password SHALL meet the minimum length requirement of 8 characters
5. IF the new password and confirmation do not match, THEN THE Settings_Page SHALL display an error message
6. WHEN the password is changed successfully, THE Settings_Page SHALL display a success message

### Requirement 8: Session Management View

**User Story:** As a user, I want to view all my active sessions, so that I can monitor where my account is logged in.

#### Acceptance Criteria

1. THE Settings_Page SHALL include a "Security" section displaying all active sessions for the user
2. FOR EACH active session, THE Settings_Page SHALL display device type, browser name, last active timestamp, and approximate location (city/country)
3. THE Settings_Page SHALL visually distinguish the current session from other sessions
4. WHEN session data is loading, THE Settings_Page SHALL display a loading indicator
5. IF session data fails to load, THEN THE Settings_Page SHALL display an error message with a retry option

### Requirement 9: Revoke Sessions

**User Story:** As a user, I want to sign out from other devices, so that I can secure my account if a device is lost or compromised.

#### Acceptance Criteria

1. FOR EACH session that is not the current session, THE Settings_Page SHALL display a "Revoke" button
2. WHEN a user clicks "Revoke" on a session, THE Auth_System SHALL invalidate that session immediately
3. WHEN a session is revoked successfully, THE Settings_Page SHALL remove that session from the list and display a confirmation
4. THE Settings_Page SHALL provide a "Sign out all other devices" button to revoke all sessions except the current one
5. WHEN "Sign out all other devices" is clicked, THE Auth_System SHALL invalidate all sessions except the current session
6. IF session revocation fails, THEN THE Settings_Page SHALL display an error message

### Requirement 10: Account Deletion Prevention

**User Story:** As a platform operator, I want to prevent users from deleting their accounts, so that data integrity and audit trails are maintained.

#### Acceptance Criteria

1. THE Settings_Page SHALL NOT display any account deletion option or button
2. THE Auth_System SHALL NOT expose any API endpoint for account self-deletion
3. IF a user inquires about account deletion, THE Settings_Page MAY display contact information for support
