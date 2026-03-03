import { useState } from "react";
import { useCustomer } from "autumn-js/react";
import { useSession } from "@/lib/auth-client";
import { useLocation, Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useDocumentTitle } from "@/hooks/use-document-title";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Loader2,
  Star,
} from "lucide-react";

interface PlanConfig {
  id: "basic" | "standard" | "premium";
  name: string;
  price: string;
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

export default function Pricing() {
  useDocumentTitle("Pricing Plans", "Affordable subscription plans for Buddhist temples and organizations. Basic, Standard, and Premium tiers starting at $99/month.");
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

  // Determine correct back link based on user role
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

      </main>
    </div>
  );
}
