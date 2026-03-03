import { useState } from "react";
import { useCustomer } from "autumn-js/react";
import { useSession } from "@/lib/auth-client";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  Star,
  Zap,
} from "lucide-react";

interface PlanConfig {
  id: "basic" | "standard" | "premium";
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
}

const PLANS: PlanConfig[] = [
  {
    id: "basic",
    name: "Basic",
    price: 99,
    period: "/month",
    features: [
      "Temple website & landing page",
      "Event calendar management",
      "Basic community features",
      "Email support",
    ],
    highlighted: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: 199,
    period: "/month",
    features: [
      "Everything in Basic",
      "Donation management system",
      "Member directory",
      "Push notifications",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 299,
    period: "/month",
    features: [
      "Everything in Standard",
      "AI-powered content tools",
      "Advanced analytics dashboard",
      "Multi-language support",
      "Custom integrations",
      "Dedicated account manager",
    ],
    highlighted: false,
  },
];

const ONBOARDING = {
  id: "onboarding" as const,
  name: "Onboarding Service",
  price: 500,
  description: "One-time setup and migration assistance",
  features: [
    "Data migration from existing systems",
    "Custom branding & theme setup",
    "Staff training sessions",
    "30-day post-launch support",
  ],
};

export default function Pricing() {
  const { data: session } = useSession();
  const { attach, openBillingPortal } = useCustomer();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (productId: string) => {
    if (!session) {
      setLocation("/login");
      return;
    }
    setLoadingPlan(productId);
    try {
      await attach({ productId, successUrl: `${window.location.origin}/dashboard` });
    } catch (err: any) {
      toast({
        title: "Checkout Error",
        description: err?.message || "Could not start checkout. Please try again.",
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
              href="/"
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
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/80 backdrop-blur-md rounded-2xl border p-6 flex flex-col transition-all hover:shadow-lg ${
                plan.highlighted
                  ? "border-[#991b1b] shadow-md ring-2 ring-[#991b1b]/20"
                  : "border-[#8B4513]/20"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-[#991b1b] text-white rounded-full text-xs font-serif font-medium">
                  <Star className="w-3 h-3" /> Recommended
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-serif text-lg font-semibold text-[#2c2c2c]">
                  {plan.name}
                </h3>
                <div className="mt-2">
                  <span className="font-serif text-3xl font-bold text-[#2c2c2c]">
                    ${plan.price}
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
                onClick={() => handleSubscribe(plan.id)}
                disabled={loadingPlan === plan.id}
                className={`w-full py-3 rounded-xl font-serif font-semibold transition-all flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-[#991b1b] text-white hover:bg-[#7a1515] shadow-md"
                    : "bg-white border-2 border-[#991b1b] text-[#991b1b] hover:bg-[#991b1b] hover:text-white"
                } disabled:opacity-50`}
              >
                {loadingPlan === plan.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Onboarding Add-on */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#8B4513]/20 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-[#991b1b]" />
                  <h3 className="font-serif text-lg font-semibold text-[#2c2c2c]">
                    {ONBOARDING.name}
                  </h3>
                </div>
                <p className="font-serif text-sm text-[#8B4513]/70 mb-4">
                  {ONBOARDING.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ONBOARDING.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 font-serif text-sm text-[#8B4513]/80">
                      <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right">
                <div className="font-serif text-3xl font-bold text-[#2c2c2c] mb-1">
                  ${ONBOARDING.price}
                </div>
                <p className="font-serif text-xs text-[#8B4513]/60 mb-4">one-time</p>
                <button
                  onClick={() => handleSubscribe(ONBOARDING.id)}
                  disabled={loadingPlan === ONBOARDING.id}
                  className="px-6 py-3 bg-white border-2 border-[#991b1b] text-[#991b1b] rounded-xl font-serif font-semibold hover:bg-[#991b1b] hover:text-white transition-all disabled:opacity-50 flex items-center gap-2 mx-auto md:mx-0"
                >
                  {loadingPlan === ONBOARDING.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Add Onboarding"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
