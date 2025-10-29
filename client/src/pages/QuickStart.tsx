import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Key, User, Settings, Zap } from "lucide-react";

export default function QuickStart() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="font-serif text-4xl font-semibold text-foreground" data-testid="heading-quick-start">
          Quick Start
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Get started with the API Key System. Learn how to configure and use System Keys and Personal Keys for seamless AI integration.
        </p>
      </div>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <Settings className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-serif text-2xl font-semibold">Understanding the Key System</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          The platform uses a two-tier API key system to ensure flexibility, cost control, and seamless user experience. There are two types of keys that work together to power the platform.
        </p>
      </Card>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10">
            <Key className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="font-serif text-xl font-semibold">System Keys</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            System Keys are API keys configured by platform administrators to ensure the system works for all users, even those without their own keys.
          </p>
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Key Features</h4>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Badge variant="secondary" className="mt-0.5">Admin Only</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Configuration</p>
                  <p className="text-sm text-muted-foreground">Only administrators with settings permission can configure System Keys in Admin → Settings → System Settings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Badge variant="secondary" className="mt-0.5">Default</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Fallback for All Users</p>
                  <p className="text-sm text-muted-foreground">Enables guest users and new registered users to start chatting immediately without configuration</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Badge variant="secondary" className="mt-0.5">Cost</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Platform Pays</p>
                  <p className="text-sm text-muted-foreground">All costs from System Key usage are billed to the platform owner's Google AI Studio or OpenAI account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/10">
            <User className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="font-serif text-xl font-semibold">Personal Keys</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Personal Keys are API keys that individual users configure for their own accounts, giving them full control over their API usage and costs.
          </p>
          
          <div>
            <h4 className="text-sm font-semibold mb-3">Key Features</h4>
            <div className="grid gap-3">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Badge variant="secondary" className="mt-0.5">Any User</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Self-Configuration</p>
                  <p className="text-sm text-muted-foreground">Any user can set up their own keys in Admin → Settings → Personal Settings</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Badge variant="secondary" className="mt-0.5">Your Quota</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Use Your Own API Quota</p>
                  <p className="text-sm text-muted-foreground">Access beta models, avoid platform limits, and use your personal Google/OpenAI quota</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Badge variant="secondary" className="mt-0.5">Cost</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">User Pays</p>
                  <p className="text-sm text-muted-foreground">Costs are billed directly to the user's Google/OpenAI account, reducing platform expenses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10">
            <Zap className="w-5 h-5 text-purple-500" />
          </div>
          <h3 className="font-serif text-xl font-semibold">Priority Flow</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          When a request requires an API call, the system selects which key to use based on this priority order:
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-4 p-5 rounded-lg bg-muted/50 border-l-4 border-green-500">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-semibold text-sm shrink-0">
              1
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-2">Current User's Personal Key</p>
              <p className="text-sm text-muted-foreground">
                If the logged-in user has configured a Personal Key for the required provider (e.g., Gemini, GPT), the system uses it first. This takes absolute priority.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-muted/50 border-l-4 border-blue-500">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-semibold text-sm shrink-0">
              2
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-2">AI Owner's Personal Key</p>
              <p className="text-sm text-muted-foreground">
                If the current user doesn't have a key, check if the AI creator has configured a Personal Key. This is especially important for vector synchronization tasks.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-muted/50 border-l-4 border-orange-500">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-semibold text-sm shrink-0">
              3
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-2">System Key</p>
              <p className="text-sm text-muted-foreground">
                If neither the user nor the AI owner has a key, fall back to the System Key configured by the admin. This is the final fallback.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-lg bg-muted/50 border-l-4 border-red-500">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white font-semibold text-sm shrink-0">
              ✕
            </div>
            <div className="flex-1">
              <p className="font-semibold mb-2">Error: No Key Available</p>
              <p className="text-sm text-muted-foreground">
                If no key is found at any level, the system returns an error: "API Key not configured"
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 space-y-6">
        <div>
          <h3 className="font-serif text-xl font-semibold mb-4">Key Features Using This System</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-sm font-semibold mb-2">Regular Chat Interactions</h4>
              <p className="text-sm text-muted-foreground mb-3">
                When users send messages in ChatPage or Test Chat, the system follows the 3-tier priority flow to determine which key to use.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Guest Users</Badge>
                <Badge variant="outline">Registered Users</Badge>
                <Badge variant="outline">Power Users</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-sm font-semibold mb-2">Weaviate Vector Sync (Koii Task)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                When submitting data for training, the system uses the AI owner's Personal Key to ensure vectorization costs are attributed correctly.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">AI Owner Key</Badge>
                <Badge variant="outline">Training Data</Badge>
                <Badge variant="outline">Vector Storage</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-sm font-semibold mb-2">Model List Loading</h4>
              <p className="text-sm text-muted-foreground mb-3">
                When managing AI and selecting providers like GPT, the system calls the API to fetch available models using the admin's Personal Key.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Admin Only</Badge>
                <Badge variant="outline">Personal Key Required</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-sm font-semibold mb-2">Live Chat (Gemini)</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Two-way audio streaming feature requires users to have their own Gemini Personal Key. No fallback to System Key or AI owner key due to high streaming costs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Personal Key Mandatory</Badge>
                <Badge variant="outline">No Fallback</Badge>
                <Badge variant="outline">Streaming</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8 space-y-6">
        <div>
          <h3 className="font-serif text-xl font-semibold mb-4">Quick Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Aspect</th>
                  <th className="text-left py-3 px-4 font-semibold">System Key</th>
                  <th className="text-left py-3 px-4 font-semibold">Personal Key</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="hover-elevate">
                  <td className="py-3 px-4 font-medium">Who Configures</td>
                  <td className="py-3 px-4 text-muted-foreground">Admin only</td>
                  <td className="py-3 px-4 text-muted-foreground">Any user</td>
                </tr>
                <tr className="hover-elevate">
                  <td className="py-3 px-4 font-medium">Configuration Location</td>
                  <td className="py-3 px-4 text-muted-foreground">System Settings</td>
                  <td className="py-3 px-4 text-muted-foreground">Personal Settings</td>
                </tr>
                <tr className="hover-elevate">
                  <td className="py-3 px-4 font-medium">Who Pays</td>
                  <td className="py-3 px-4 text-muted-foreground">Platform owner</td>
                  <td className="py-3 px-4 text-muted-foreground">Individual user</td>
                </tr>
                <tr className="hover-elevate">
                  <td className="py-3 px-4 font-medium">Scope</td>
                  <td className="py-3 px-4 text-muted-foreground">All users without personal keys</td>
                  <td className="py-3 px-4 text-muted-foreground">Only that user</td>
                </tr>
                <tr className="hover-elevate">
                  <td className="py-3 px-4 font-medium">Priority</td>
                  <td className="py-3 px-4 text-muted-foreground">Lowest (fallback)</td>
                  <td className="py-3 px-4 text-muted-foreground">Highest</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
