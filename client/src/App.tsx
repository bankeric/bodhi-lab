import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DocsLayout } from "@/components/DocsLayout";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Landing from "@/pages/Landing";
import Platform from "@/pages/Platform";
import Discovery from "@/pages/Discovery";
import Onboarding from "@/pages/Onboarding";
import CenterDetail from "@/pages/CenterDetail";
import Manifesto from "@/pages/Manifesto";
import MandalaMerit from "@/pages/MandalaMerit";
import MeritTokenomics from "@/pages/MeritTokenomics";
import PathOfUnraveling from "@/pages/PathOfUnraveling";
import TechStack from "@/pages/TechStack";
import Overview from "@/pages/Overview";
import AgentModels from "@/pages/AgentModels";
import QuickStart from "@/pages/QuickStart";
import TokenPricing from "@/pages/TokenPricing";
import About from "@/pages/About";
import Career from "@/pages/Career";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/platform" component={Platform} />
      <Route path="/discovery" component={Discovery} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/center/:id" component={CenterDetail} />
      <Route path="/about" component={About} />
      <Route path="/career" component={Career} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/admin" component={Admin} />
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
