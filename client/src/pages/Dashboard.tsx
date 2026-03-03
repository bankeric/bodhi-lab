import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useCustomer } from "autumn-js/react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CreditCard,
  LogOut,
  MessageCircle,
  Globe,
  Loader2,
  RefreshCw,
  ArrowRight,
  Zap,
  Check,
} from "lucide-react";
import {
  getWelcomeMessage,
  getSubscriptionDisplayStatus,
  type SubscriptionInfo,
} from "@/lib/dashboard-utils";

export default function Dashboard() {
  const { data: session } = useSession();
  const { openBillingPortal, attach } = useCustomer();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [onboardingLoading, setOnboardingLoading] = useState(false);

  const {
    data: subscription,
    isLoading: subLoading,
    isError: subError,
    refetch: refetchSub,
  } = useQuery<SubscriptionInfo>({
    queryKey: ["temple-subscription"],
    queryFn: async () => {
      const res = await fetch("/api/temple/subscription", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch subscription");
      const json = await res.json();
      return json.data;
    },
  });

  const displayStatus = subscription
    ? getSubscriptionDisplayStatus(subscription)
    : null;

  const handleManageBilling = async () => {
    try {
      await openBillingPortal({ returnUrl: window.location.href });
    } catch {
      toast({
        title: "Error",
        description: "Unable to open billing portal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setLocation("/login");
    } catch {
      toast({
        title: "Error",
        description: "Sign out failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddOnboarding = async () => {
    setOnboardingLoading(true);
    try {
      await attach({ productId: "onboarding", successUrl: `${window.location.origin}/dashboard` });
    } catch (err: any) {
      toast({
        title: "Checkout Error",
        description: err?.message || "Could not start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setOnboardingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFE0BD]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#8B4513]/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-[#2c2c2c]">
            {getWelcomeMessage(session?.user?.name)}
          </h1>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="outline"
                className="flex items-center gap-2 font-serif text-sm border-[#8B4513]/30 text-[#8B4513] hover:bg-[#8B4513]/5"
              >
                Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center gap-2 font-serif text-sm border-[#8B4513]/30 text-[#8B4513] hover:bg-[#8B4513]/5"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subscription Card */}
          <Card className="bg-white/80 backdrop-blur-md border-[#8B4513]/20 p-6 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-[#991b1b]" />
              <h2 className="font-serif text-lg font-semibold text-[#2c2c2c]">
                Subscription
              </h2>
            </div>

            {subLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#991b1b]" />
              </div>
            ) : subError ? (
              <div className="text-center py-6">
                <p className="font-serif text-sm text-red-600 mb-3">
                  Could not load subscription info.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => refetchSub()}
                  className="font-serif text-sm"
                >
                  <RefreshCw className="w-4 h-4 mr-1" /> Retry
                </Button>
              </div>
            ) : displayStatus?.hasActivePlan ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-sm text-[#8B4513]/60">Current Plan</p>
                    <p className="font-serif text-2xl font-bold text-[#2c2c2c]">
                      {displayStatus.planLabel}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-serif text-sm text-[#8B4513]/60">Renewal Date</p>
                    <p className="font-serif text-base font-medium text-[#2c2c2c]">
                      {displayStatus.renewalLabel}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    onClick={handleManageBilling}
                    className="bg-[#991b1b] text-white hover:bg-[#7a1515] font-serif"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Manage Billing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleManageBilling}
                    className="font-serif border-[#8B4513]/30 text-[#8B4513] hover:bg-[#8B4513]/5"
                  >
                    Download Invoices
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="font-serif text-[#8B4513]/70 mb-4">
                  No active plan. Choose a plan to get started.
                </p>
                <Link href="/pricing">
                  <Button className="bg-[#991b1b] text-white hover:bg-[#7a1515] font-serif">
                    View Plans <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* giac.ngo Space Card */}
          <Card className="bg-white/80 backdrop-blur-md border-[#8B4513]/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-[#991b1b]" />
              <h2 className="font-serif text-lg font-semibold text-[#2c2c2c]">
                giac.ngo Space
              </h2>
            </div>
            <p className="font-serif text-sm text-[#8B4513]/70">
              Coming soon — your Space will be configured shortly.
            </p>
          </Card>

          {/* Support Card */}
          <Card className="bg-white/80 backdrop-blur-md border-[#8B4513]/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-[#991b1b]" />
              <h2 className="font-serif text-lg font-semibold text-[#2c2c2c]">
                Support
              </h2>
            </div>
            <p className="font-serif text-sm text-[#8B4513]/70 mb-4">
              Need help? Reach out to our team.
            </p>
            <Link href="/contact">
              <Button
                variant="outline"
                className="font-serif border-[#8B4513]/30 text-[#8B4513] hover:bg-[#8B4513]/5"
              >
                Contact Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          {/* Onboarding Add-on Card */}
          <Card className="bg-white/80 backdrop-blur-md border-[#8B4513]/20 p-6 col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-[#991b1b]" />
              <h2 className="font-serif text-lg font-semibold text-[#2c2c2c]">
                Onboarding Package
              </h2>
              <span className="ml-auto font-serif text-xl font-bold text-[#2c2c2c]">$899 <span className="text-xs font-normal text-[#8B4513]/60">one-time</span></span>
            </div>
            <p className="font-serif text-sm text-[#8B4513]/70 mb-4">
              A complete, done-for-you setup so your community can go live with confidence.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {[
                "Custom website design & build",
                "Full platform onboarding & configuration",
                "Data migration from existing systems",
                "Staff training sessions",
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 font-serif text-sm text-[#8B4513]/80">
                  <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => handleAddOnboarding()}
              disabled={onboardingLoading}
              className="bg-[#991b1b] text-white hover:bg-[#7a1515] font-serif"
            >
              {onboardingLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Add Onboarding
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}
