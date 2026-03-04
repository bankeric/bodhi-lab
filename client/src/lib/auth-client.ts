import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || "",
  plugins: [organizationClient()],
  fetchOptions: {
    credentials: "include",
  },
});

// Export auth methods - note: forgetPassword was renamed to requestPasswordReset in Better Auth 1.4
export const { 
  useSession, 
  signIn, 
  signUp, 
  signOut,
  requestPasswordReset,
  resetPassword,
  sendVerificationEmail,
  changePassword,
  updateUser,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  changeEmail,
} = authClient;

// Alias for backward compatibility with existing code
export const forgetPassword = requestPasswordReset;
