import { useState } from "react";
import { useCustomer } from "autumn-js/react";
import { useSession } from "@/lib/auth-client";
import { useLocation, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useDocumentTitle } from "@/hooks/use-document-title";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  Star,
  ArrowDown,
  ArrowUp,
  Clock,
} from "lucide-react";

interface PlanConfig {
  id: "basic" | "standard" | "premium";
  name: string;
  price: string;
  priceValue: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

const PLANS: PlanConfig[] = [
  {
    id: "basic",
    name: "Lay Practitioner",
    price: "$79",
    priceValue: 79,
    period: "/month",
    description: "Perfect for small to medium temples getting started with digital transformation",
    features: [
      "Shared website template & resource library",
      "2.5% + $0.20 per card donation (0.8% + $0.20 bank transfer)",
      "1,000 user limit",
      "2 admin seats",
      "Shared domain",
      "Email support",
      "Basic backup & logs",
    ],
    highlighted: false,
  },
  {
    id: "standard",
    name: "Devoted Practitioner",
    price: "$199",
    priceValue: 199,
    period: "/month",
    description: "Ideal for growing communities ready to expand their digital presence",
    features: [
      "Shared website template & resource library",
      "1.5% + $0.20 per card donation (0.8% + $0.20 bank transfer)",
      "AI Dharma Agent (standard usage)",
      "5,000 user limit",
      "5 admin seats",
      "Included mobile app",
      "Custom domain",
      "Limited API access",
      "Email + product updates",
      "Daily backup, 7-day logs",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Sangha Community",
    price: "$499+",
    priceValue: 499,
    period: "/month",
    description: "Comprehensive solution for large monasteries and temple networks",
    features: [
      "Shared website template & resource library",
      "Free donation processing",
      "AI Dharma Agent (fine-tuned, multi-instance)",
      "10,000+ user limit",
      "10+ admin seats",
      "White-label native mobile app",
      "Full brand suite (custom domain, logo, styling)",
      "Full API & developer dashboard",
      "Dedicated success manager + 24/7 support",
      "Custom SLAs, security onboarding",
    ],
    highlighted: false,
  },
];

interface SubscriptionData {
  productId: string | null;
  productName: string | null;
  status: string | null;
  renewalDate: string | null;
  cancelAtPeriodEnd: boolean;
  scheduledProductId: string | null;
  scheduledProductName: string | null;
}

export default function Pricing() {
  useDocumentTitle("Pricing Plans", "Affordable subscription plans for Buddhist temples and organizations.");
  const { data: session } = useSession();
  const { attach, cancel, openBillingPortal } = useCustomer();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  // Fetch current subscription
  const { data: subscription, refetch: refetchSub } = useQuery<SubscriptionData>({
    queryKey: ["temple-subscription"],
    queryFn: async () => {
      const res = await fetch("/api/temple/subscription", { credentials: "include" });
      if (!res.ok) return null;
      const json = await res.json();
      return json.data;
    },
    enabled: !!session,
  });

  const currentPlanId = subscription?.productId;
  const currentPlanPrice = PLANS.find(p => p.id === currentPlanId)?.priceValue || 0;

  const getPlanAction = (plan: PlanConfig): { action: "subscribe" | "upgrade" | "downgrade" | "current" | "scheduled"; label: string } => {
    if (!currentPlanId) return { action: "subscribe", label: "Subscribe" };
    if (plan.id === currentPlanId) return { action: "current", label: "Current Plan" };
    if (subscription?.scheduledProductId === plan.id) return { action: "scheduled", label: "Scheduled" };
    if (plan.priceValue > currentPlanPrice) return { action: "upgrade", label: "Upgrade" };
    return { action: "downgrade", label: "Downgrade" };
  };

  const handlePlanAction = async (plan: PlanConfig) => {
    if (!session) {
      setLocation("/login");
      return;
    }

    const { action } = getPlanAction(plan);
    if (action === "current" || action === "scheduled") return;

    setLoadingPlan(plan.id);
    try {
      await attach({ productId: plan.id, successUrl: `${window.location.origin}/dashboard` });
      // Refetch subscription after action
      setTimeout(() => refetchSub(), 2000);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Could not process request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentPlanId) return;
    
    setLoadingPlan("cancel");
    try {
      await cancel({ productId: currentPlanId });
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription will end at the end of the current billing period.",
      });
      refetchSub();
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Could not cancel subscription.",
        variant: "destructive",
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleManageBilling = async () => {
    try {
      await openBillingPortal({ returnUrl: window.location.href });
    } catch (err: any) {
      toast({
        title: "Billing Portal Error",
        description: err?.message || "Could not open billing portal.",
        variant: "destructive",
      });
    }
  };

  const userRole = (session?.user as any)?.role;
  const backHref = !session ? "/" : userRole === "bodhi_admin" ? "/admin" : "/dashboard";

  return (
    <div className="min-h-screen bg-[#EFE0BD]">
      <header className="bg-white/80 backdrop-blur-md border-b border-[#8B4513]/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-serif text-xl font-bold text-[#2c2c2c]">Pricing</h1>
          <div className="flex items-center gap-3">
            {session && (
              <button
                onClick={handleManageBilling}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#8B4513] hover:bg-[#8B4513]/5 transition-all"
              >
                <CreditCard className="w-4 h-4" /> Manage Billing
              </button>
            )}
            <Link
              href={backHref}
              className="flex items-center gap-2 px-4 py-2 bg-[#991b1b] text-white rounded-lg font-serif text-sm hover:bg-[#7a1515] transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-[#2c2c2c] mb-3">
            Choose Your Plan
          </h2>
          <p className="font-serif text-[#8B4513]/70 max-w-lg mx-auto">
            Empower your temple community with the right tools. All plans include a 14-day free trial.
          </p>
          {subscription?.cancelAtPeriodEnd && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-serif text-sm">
              <Clock className="w-4 h-4" />
              Your subscription will end on {subscription.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString() : "the end of the billing period"}
            </div>
          )}
          {subscription?.scheduledProductId && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-serif text-sm">
              <Clock className="w-4 h-4" />
              Switching to {subscription.scheduledProductName} on {subscription.renewalDate ? new Date(subscription.renewalDate).toLocaleDateString() : "next billing cycle"}
            </div>
          )}
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {PLANS.map((plan) => {
            const { action, label } = getPlanAction(plan);
            const isCurrentPlan = action === "current";
            const isScheduled = action === "scheduled";
            const isUpgrade = action === "upgrade";
            const isDowngrade = action === "downgrade";

            return (
              <div
                key={plan.id}
                className={`relative bg-white/80 backdrop-blur-md rounded-2xl border p-6 flex flex-col transition-all hover:shadow-lg ${
                  plan.highlighted
                    ? "border-[#991b1b] shadow-md ring-2 ring-[#991b1b]/20"
                    : isCurrentPlan
                    ? "border-green-500 ring-2 ring-green-500/20"
                    : "border-[#8B4513]/20"
                }`}
              >
                {plan.highlighted && !isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-[#991b1b] text-white rounded-full text-xs font-serif font-medium">
                    <Star className="w-3 h-3" /> Recommended
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-full text-xs font-serif font-medium">
                    <Check className="w-3 h-3" /> Current Plan
                  </div>
                )}
                {isScheduled && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-serif font-medium">
                    <Clock className="w-3 h-3" /> Scheduled
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-serif text-lg font-semibold text-[#2c2c2c]">
                    {plan.name}
                  </h3>
                  <p className="font-serif text-xs text-[#8B4513]/60 mt-1 mb-2">
                    {plan.description}
                  </p>
                  <div className="mt-2">
                    <span className="font-serif text-3xl font-bold text-[#2c2c2c]">
                      {plan.price}
                    </span>
                    <span className="font-serif text-sm text-[#8B4513]/60">
                      {plan.period}
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 font-serif text-sm text-[#8B4513]/80">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanAction(plan)}
                  disabled={loadingPlan === plan.id || isCurrentPlan || isScheduled}
                  className={`w-full py-3 rounded-xl font-serif font-semibold transition-all flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? "bg-green-100 text-green-800 cursor-default"
                      : isScheduled
                      ? "bg-blue-100 text-blue-800 cursor-default"
                      : isUpgrade
                      ? "bg-[#991b1b] text-white hover:bg-[#7a1515] shadow-md"
                      : isDowngrade
                      ? "bg-amber-500 text-white hover:bg-amber-600"
                      : plan.highlighted
                      ? "bg-[#991b1b] text-white hover:bg-[#7a1515] shadow-md"
                      : "bg-white border-2 border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b] hover:text-white"
                  } disabled:opacity-50`}
                >
                  {loadingPlan === plan.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      {isUpgrade && <ArrowUp className="w-4 h-4" />}
                      {isDowngrade && <ArrowDown className="w-4 h-4" />}
                      {label}
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Cancel Subscription */}
        {currentPlanId && !subscription?.cancelAtPeriodEnd && (
          <div className="text-center">
            <button
              onClick={handleCancelSubscription}
              disabled={loadingPlan === "cancel"}
              className="font-serif text-sm text-[#8B4513]/60 hover:text-red-600 transition-colors underline"
            >
              {loadingPlan === "cancel" ? "Cancelling..." : "Cancel Subscription"}
            </button>
            <p className="font-serif text-xs text-[#8B4513]/40 mt-1">
              You'll keep access until the end of your billing period
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
