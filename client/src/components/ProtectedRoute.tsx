import { useSession } from "@/lib/auth-client";
import { Redirect, Link } from "wouter";
import { ArrowLeft, ShieldX } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#991b1b] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return <Redirect to="/login" />;
  }

  if (requiredRole && (session.user as any).role !== requiredRole) {
    return (
      <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#8B4513]/20 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#991b1b]/10 rounded-full flex items-center justify-center">
            <ShieldX className="w-8 h-8 text-[#991b1b]" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#991b1b] mb-2">
            Access Denied
          </h1>
          <p className="font-serif text-sm text-[#8B4513]/70 mb-6">
            You don't have permission to access this page.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/dashboard"
              className="font-serif text-sm text-[#8B4513]/60 hover:text-[#991b1b] transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
