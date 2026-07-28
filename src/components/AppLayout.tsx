import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { useLearnStore } from "@/store/useLearnStore";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useLearnStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-900 text-slate-100">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-100"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 p-4 border-b border-slate-700 bg-slate-800/50">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-sm font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Mon App Anglais
          </h1>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
