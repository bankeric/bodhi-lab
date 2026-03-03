import { useState } from "react";
import { useSession, signIn, signUp } from "@/lib/auth-client";
import { Redirect, Link, useLocation } from "wouter";
import { Lock, ArrowLeft, Loader2, UserPlus } from "lucide-react";

export default function Login() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");

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
    return <Redirect to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const result = await signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
        });
        if (result.error) {
          setError(
            result.error.message ||
              "Could not create account. Please try again."
          );
        } else {
          setLocation("/dashboard");
        }
      } else {
        const result = await signIn.email({ email, password });

        if (result.error) {
          setError("Invalid email or password. Please try again.");
        } else {
          const userRole = (result.data?.user as any)?.role;
          if (userRole === "bodhi_admin") {
            setLocation("/admin");
          } else {
            setLocation("/dashboard");
          }
        }
      }
    } catch {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#8B4513]/20">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#991b1b]/10 rounded-full flex items-center justify-center">
            {mode === "signin" ? (
              <Lock className="w-8 h-8 text-[#991b1b]" />
            ) : (
              <UserPlus className="w-8 h-8 text-[#991b1b]" />
            )}
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2c2c2c]">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </h1>
          <p className="font-serif text-sm text-[#8B4513]/70 mt-2">
            {mode === "signin"
              ? "Enter your credentials to access your dashboard"
              : "Create a new account to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 text-red-800 rounded-lg font-serif text-sm border border-red-200">
              {error}
            </div>
          )}

          {mode === "signup" && (
            <div>
              <label
                htmlFor="name"
                className="block font-serif text-sm font-medium text-[#2c2c2c] mb-1"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
                autoComplete="name"
              />
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
              placeholder={
                mode === "signup" ? "Create a password" : "Enter your password"
              }
              className="w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
              required
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              minLength={mode === "signup" ? 8 : undefined}
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
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </>
            ) : mode === "signin" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-[#8B4513]/20" />
          <span className="font-serif text-xs text-[#8B4513]/50">
            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <div className="flex-1 h-px bg-[#8B4513]/20" />
        </div>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError("");
          }}
          className="w-full px-6 py-3 bg-white border border-[#8B4513]/30 rounded-xl font-serif font-semibold text-[#2c2c2c] hover:bg-[#8B4513]/5 transition-all duration-300 shadow-sm"
        >
          {mode === "signin" ? "Create Account" : "Sign In Instead"}
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
