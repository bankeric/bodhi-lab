import { Switch, Route } from "wouter";
import { Suspense, lazy } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy load all pages for code splitting
const Landing = lazy(() => import("@/pages/Landing"));
const Platform = lazy(() => import("@/pages/Platform"));
const Discovery = lazy(() => import("@/pages/Discovery"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const Process = lazy(() => import("@/pages/Process"));
const CenterDetail = lazy(() => import("@/pages/CenterDetail"));
const About = lazy(() => import("@/pages/About"));
const Career = lazy(() => import("@/pages/Career"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Admin = lazy(() => import("@/pages/Admin"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Contact = lazy(() => import("@/pages/Contact"));
const Settings = lazy(() => import("@/pages/Settings"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Docs pages
const DocsLayout = lazy(() => import("@/components/DocsLayout").then(m => ({ default: m.DocsLayout })));
const Manifesto = lazy(() => import("@/pages/Manifesto"));
const MandalaMerit = lazy(() => import("@/pages/MandalaMerit"));
const MeritTokenomics = lazy(() => import("@/pages/MeritTokenomics"));
const PathOfUnraveling = lazy(() => import("@/pages/PathOfUnraveling"));
const TechStack = lazy(() => import("@/pages/TechStack"));
const Overview = lazy(() => import("@/pages/Overview"));
const AgentModels = lazy(() => import("@/pages/AgentModels"));
const QuickStart = lazy(() => import("@/pages/QuickStart"));
const TokenPricing = lazy(() => import("@/pages/TokenPricing"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#991b1b] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="font-serif text-[#8B4513]/70">Loading...</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/platform" component={Platform} />
        <Route path="/discovery" component={Discovery} />
        <Route path="/onboarding" component={Onboarding} />
        <Route path="/process" component={Process} />
        <Route path="/center/:id" component={CenterDetail} />
        <Route path="/about" component={About} />
        <Route path="/career" component={Career} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/admin">
          <ProtectedRoute requiredRole="bodhi_admin">
            <Admin />
          </ProtectedRoute>
        </Route>
        <Route path="/dashboard">
          <ProtectedRoute requiredRole="temple_admin">
            <Dashboard />
          </ProtectedRoute>
        </Route>
        <Route path="/settings">
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        <Route path="/docs/manifesto">
          <DocsLayout>
            <Manifesto />
          </DocsLayout>
        </Route>
        <Route path="/docs/mandala-merit">
          <DocsLayout>
            <MandalaMerit />
          </DocsLayout>
        </Route>
        <Route path="/docs/merit-tokenomics">
          <DocsLayout>
            <MeritTokenomics />
          </DocsLayout>
        </Route>
        <Route path="/docs/path-of-unraveling">
          <DocsLayout>
            <PathOfUnraveling />
          </DocsLayout>
        </Route>
        <Route path="/docs/tech-stack">
          <DocsLayout>
            <TechStack />
          </DocsLayout>
        </Route>
        <Route path="/docs/overview">
          <DocsLayout>
            <Overview />
          </DocsLayout>
        </Route>
        <Route path="/docs/models">
          <DocsLayout>
            <AgentModels />
          </DocsLayout>
        </Route>
        <Route path="/docs/quick-start">
          <DocsLayout>
            <QuickStart />
          </DocsLayout>
        </Route>
        <Route path="/docs/pricing">
          <DocsLayout>
            <TokenPricing />
          </DocsLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
