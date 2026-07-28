import { motion } from "framer-motion";
import {
  Home,
  Brain,
  Plus,
  List,
  Shuffle,
  Languages,
  GraduationCap,
  Hash,
  Mic,
  BarChart3,
  Settings,
  Flame,
  Headphones,
  Layers,
  Wand2,
  Clock,
  Link2,
} from "lucide-react";
import { useLearnStore, type View } from "@/store/useLearnStore";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlobalSearch } from "@/components/GlobalSearch";

const NAV_ITEMS: { view: View; label: string; icon: React.ReactNode; color: string }[] = [
  { view: "dashboard", label: "Accueil", icon: <Home size={20} />, color: "text-sky-400" },
  { view: "study", label: "Révision", icon: <Brain size={20} />, color: "text-rose-400" },
  { view: "builder", label: "Ajouter mot", icon: <Plus size={20} />, color: "text-slate-300" },
  { view: "verbs", label: "Verbes irrég.", icon: <List size={20} />, color: "text-emerald-400" },
  { view: "phrasal", label: "Phrasal Verbs", icon: <Shuffle size={20} />, color: "text-amber-400" },
  { view: "translation", label: "Traduction", icon: <Languages size={20} />, color: "text-rose-400" },
  { view: "grammar", label: "Grammaire", icon: <GraduationCap size={20} />, color: "text-indigo-400" },
  { view: "numbers", label: "Nombres", icon: <Hash size={20} />, color: "text-amber-400" },
  { view: "dictation", label: "Dictée", icon: <Mic size={20} />, color: "text-rose-400" },
  { view: "matching", label: "Association", icon: <Shuffle size={20} />, color: "text-emerald-400" },
  { view: "listening", label: "Audio Quiz", icon: <Headphones size={20} />, color: "text-sky-400" },
  { view: "mixed", label: "Mélange", icon: <Layers size={20} />, color: "text-amber-400" },
  { view: "builder-sentences", label: "Phrases", icon: <Wand2 size={20} />, color: "text-violet-400" },
  { view: "tenses", label: "Conjugaison", icon: <Clock size={20} />, color: "text-indigo-400" },
  { view: "prepositions", label: "Prépositions", icon: <Link2 size={20} />, color: "text-teal-400" },
  { view: "stats", label: "Statistiques", icon: <BarChart3 size={20} />, color: "text-violet-400" },
  { view: "settings", label: "Paramètres", icon: <Settings size={20} />, color: "text-slate-400" },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const currentView = useLearnStore((s) => s.currentView);
  const setView = useLearnStore((s) => s.setView);
  const streak = useLearnStore((s) => s.streak);

  return (
    <div className="h-full flex flex-col bg-slate-800/50 border-r border-slate-700 w-60 shrink-0">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-lg font-extrabold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Mon App Anglais
        </h1>
        {streak > 0 && (
          <div className="flex items-center gap-1 mt-2 text-sm">
            <Flame size={16} className="text-orange-400" />
            <span className="text-orange-400 font-bold">{streak}</span>
            <span className="text-slate-500">jour{streak > 1 ? "s" : ""}</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => {
                setView(item.view);
                onNavigate?.();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-slate-700 text-slate-100"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
              }`}
            >
              <span className={active ? item.color : ""}>{item.icon}</span>
              {item.label}
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400"
                />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-700 flex flex-col gap-2">
        <GlobalSearch />
        <ThemeToggle />
      </div>
    </div>
  );
}
