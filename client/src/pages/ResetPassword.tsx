import { useState, useEffect } from "react";
import { resetPassword } from "@/lib/auth-client";
import { Link, useLocation } from "wouter";
import { Lock, ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function ResetPassword() {
  const [location] = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    // Parse token from URL query params
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");
    const urlError = params.get("error");
    
    if (urlError === "INVALID_TOKEN") {
      setTokenError(true);
    } else if (urlToken) {
      setToken(urlToken);
    } else {
      setTokenError(true);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({
        newPassword: password,
        token,
      }, {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: (ctx) => {
          setError(ctx.error.message || "Failed to reset password. Please try again.");
        },
      });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (tokenError) {
    return (
      <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#8B4513]/20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">
            Invalid or Expired Link
          </h1>
          <p className="font-serif text-[#8B4513]/70 mb-6">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#8B4513]/20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">
            Password Reset Successfully
          </h1>
          <p className="font-serif text-[#8B4513]/70 mb-6">
            Your password has been updated. You can now sign in with your new password.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#8B4513]/20">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#991b1b]/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#991b1b]" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2c2c2c]">
            Reset Your Password
          </h1>
          <p className="font-serif text-sm text-[#8B4513]/70 mt-2">
            Enter your new password below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg font-serif text-sm border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1"
            >
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (min 8 characters)"
              className="w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 mt-6 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors font-serif text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
