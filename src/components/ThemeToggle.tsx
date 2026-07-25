import { Moon, Sun } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";

export function ThemeToggle() {
  const theme = useLearnStore((s) => s.theme);
  const toggleTheme = useLearnStore((s) => s.toggleTheme);

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-slate-300"
      title="Changer le thème"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      <span className="hidden lg:inline">{theme === "dark" ? "Clair" : "Sombre"}</span>
    </button>
  );
}
