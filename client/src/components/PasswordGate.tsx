import { useState } from "react";
import { Lock } from "lucide-react";

interface PasswordGateProps {
  children: React.ReactNode;
  title?: string;
}

const SERVICE_PASSWORD = import.meta.env.VITE_SERVICE_PASSWORD || "bodhi";
const STORAGE_KEY = "bodhi-service-access";

export function PasswordGate({ children, title = "Private Access" }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(() => {
    return window.localStorage.getItem(STORAGE_KEY) === SERVICE_PASSWORD;
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === SERVICE_PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, SERVICE_PASSWORD);
      setUnlocked(true);
      setError("");
      return;
    }

    setError("Incorrect password.");
  };

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#EFE0BD] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-[#8B4513]/20 rounded-2xl p-8 shadow-lg"
      >
        <div className="w-12 h-12 rounded-xl bg-[#991b1b]/10 flex items-center justify-center mb-6">
          <Lock className="w-6 h-6 text-[#991b1b]" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-[#2c2c2c] mb-2">{title}</h1>
        <p className="font-serif text-sm text-[#8B4513]/70 mb-6">
          This page is shared privately with people who need service details.
        </p>
        <label htmlFor="service-password" className="font-serif text-sm font-medium text-[#2c2c2c]">
          Password
        </label>
        <input
          id="service-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full px-4 py-3 bg-white border border-[#8B4513]/30 rounded-xl font-serif text-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-[#991b1b]/50"
          autoComplete="current-password"
          autoFocus
        />
        {error && <p className="mt-3 font-serif text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full px-4 py-3 bg-[#991b1b] text-white rounded-xl font-serif font-semibold hover:bg-[#7a1515] transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
