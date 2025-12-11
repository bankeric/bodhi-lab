import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Lock, Users, Phone, Mail, Calendar, Tag, MessageSquare, RefreshCw, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Lead } from "@shared/schema";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
  qualified: "bg-purple-100 text-purple-800 border-purple-200",
  converted: "bg-green-100 text-green-800 border-green-200",
  lost: "bg-gray-100 text-gray-800 border-gray-200"
};

const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  converted: "Converted",
  lost: "Lost"
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [storedPassword, setStoredPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      if (response.ok) {
        setStoredPassword(password);
        setIsAuthenticated(true);
      } else {
        setAuthError("Invalid password");
      }
    } catch {
      setAuthError("Authentication failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-md w-full border border-[#8B4513]/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#991b1b]/10 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#991b1b]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#2c2c2c]">Admin CRM</h1>
            <p className="font-serif text-sm text-[#8B4513]/70 mt-2">Enter password to access lead management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-red-100 text-red-800 rounded-lg font-serif text-sm border border-red-200">
                {authError}
              </div>
            )}
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-[#2c2c2c] placeholder:text-[#8B4513]/40 focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50 focus:border-[#991b1b] transition-all"
              data-testid="input-admin-password"
              required
            />

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-all duration-300 shadow-md"
              data-testid="button-admin-login"
            >
              Access CRM
            </button>
          </form>

          <Link href="/" className="flex items-center justify-center gap-2 mt-6 text-[#8B4513]/60 hover:text-[#991b1b] transition-colors font-serif text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return <LeadsDashboard password={storedPassword} />;
}

function LeadsDashboard({ password }: { password: string }) {
  const { data: leads = [], isLoading, refetch } = useQuery<Lead[]>({
    queryKey: ['/api/leads'],
    queryFn: async () => {
      const response = await fetch("/api/leads", {
        headers: { "X-Admin-Password": password }
      });
      if (!response.ok) throw new Error("Failed to fetch leads");
      return response.json();
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "X-Admin-Password": password 
        },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
    }
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#EFE0BD]">
      <header className="bg-white/80 backdrop-blur-md border-b border-[#8B4513]/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#991b1b]/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-[#991b1b]" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-bold text-[#2c2c2c]">Lead Management</h1>
              <p className="font-serif text-xs text-[#8B4513]/70">{leads.length} total leads</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#8B4513]/30 rounded-lg font-serif text-sm text-[#8B4513] hover:bg-[#8B4513]/5 transition-all"
              data-testid="button-refresh-leads"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 bg-[#991b1b] text-white rounded-lg font-serif text-sm hover:bg-[#7a1515] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-[#991b1b] border-t-transparent rounded-full" />
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12 bg-white/50 backdrop-blur-md rounded-2xl border border-[#8B4513]/20">
            <Users className="w-12 h-12 mx-auto mb-4 text-[#8B4513]/30" />
            <h2 className="font-serif text-xl font-semibold text-[#8B4513]/60">No leads yet</h2>
            <p className="font-serif text-sm text-[#8B4513]/40 mt-2">New subscription requests will appear here</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <div 
                key={lead.id} 
                className="bg-white/80 backdrop-blur-md rounded-xl border border-[#8B4513]/20 p-6 hover:shadow-lg transition-all"
                data-testid={`card-lead-${lead.id}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#2c2c2c]" data-testid={`text-lead-name-${lead.id}`}>
                          {lead.name}
                        </h3>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mt-2 ${statusColors[lead.status] || statusColors.new}`}>
                          {statusLabels[lead.status] || lead.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#991b1b]/10 rounded-full">
                        <Tag className="w-3 h-3 text-[#991b1b]" />
                        <span className="font-serif text-xs font-medium text-[#991b1b]">{lead.package}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-[#8B4513]/70">
                        <Phone className="w-4 h-4 text-[#991b1b]" />
                        <a href={`tel:${lead.phone}`} className="font-serif hover:text-[#991b1b] transition-colors">
                          {lead.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-[#8B4513]/70">
                        <Mail className="w-4 h-4 text-[#991b1b]" />
                        <a href={`mailto:${lead.email}`} className="font-serif hover:text-[#991b1b] transition-colors truncate">
                          {lead.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-[#8B4513]/70">
                        <Calendar className="w-4 h-4 text-[#991b1b]" />
                        <span className="font-serif">{formatDate(lead.createdAt)}</span>
                      </div>
                    </div>

                    {lead.interests && (
                      <div className="flex items-start gap-2 mt-3 p-3 bg-[#8B4513]/5 rounded-lg">
                        <MessageSquare className="w-4 h-4 text-[#991b1b] flex-shrink-0 mt-0.5" />
                        <p className="font-serif text-sm text-[#8B4513]/80">{lead.interests}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 lg:flex-col">
                    {Object.keys(statusLabels).map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatusMutation.mutate({ id: lead.id, status })}
                        disabled={lead.status === status || updateStatusMutation.isPending}
                        className={`px-3 py-1.5 rounded-lg font-serif text-xs transition-all ${
                          lead.status === status
                            ? 'bg-[#991b1b] text-white cursor-default'
                            : 'bg-white border border-[#8B4513]/20 text-[#8B4513]/70 hover:border-[#991b1b] hover:text-[#991b1b]'
                        } disabled:opacity-50`}
                        data-testid={`button-status-${status}-${lead.id}`}
                      >
                        {statusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
