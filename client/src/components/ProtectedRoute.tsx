import { useSession } from "@/lib/auth-client";
import { Redirect } from "wouter";

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
          <h1 className="font-serif text-2xl font-bold text-[#991b1b] mb-2">
            Access Denied
          </h1>
          <p className="font-serif text-sm text-[#8B4513]/70">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
