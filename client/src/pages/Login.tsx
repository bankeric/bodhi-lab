import { useState } from "react";
import { useSession, signIn } from "@/lib/auth-client";
import { Redirect, Link, useLocation } from "wouter";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";

export default function Login() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Redirect authenticated users based on role
  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#991b1b] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (session) {
    const role = (session.user as any).role;
    if (role === "bodhi_admin") return <Redirect to="/admin" />;
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await signIn.email({ email, password });

      if (result.error) {
        setError("Invalid email or password. Please try again.");
      } else {
        // Redirect based on role after login
        const userRole = (result.data?.user as any)?.role;
        if (userRole === "bodhi_admin") {
          setLocation("/admin");
        } else {
          setLocation("/");
        }
      }
    } catch {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#8B4513]/20">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#991b1b]/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#991b1b]" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2c2c2c]">
            Sign In
          </h1>
          <p className="font-serif text-sm text-[#8B4513]/70 mt-2">
            Enter your credentials to access your dashboard
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
              htmlFor="email"
              className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
              required
              autoComplete="current-password"
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#8B4513]/20" />
          <span className="font-serif text-xs text-[#8B4513]/50">or</span>
          <div className="flex-1 h-px bg-[#8B4513]/20" />
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          className="w-full px-6 py-3 bg-white border border-[#8B4513]/30 rounded-xl font-serif font-semibold text-[#2c2c2c] hover:bg-[#8B4513]/5 transition-all duration-300 shadow-sm disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isGoogleLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 mt-6 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors font-serif text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
