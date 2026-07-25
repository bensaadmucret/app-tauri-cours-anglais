import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, BookOpen, List, GraduationCap } from "lucide-react";
import { searchAll } from "@/db/queries";
import { useLearnStore } from "@/store/useLearnStore";

interface SearchResult {
  type: string;
  id: number;
  label: string;
  sublabel: string;
}

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const setView = useLearnStore((s) => s.setView);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const r = await searchAll(query);
        setResults(r);
      } catch {
        setResults([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  function handleResultClick(result: SearchResult) {
    setOpen(false);
    setQuery("");
    if (result.type === "card") setView("study");
    else if (result.type === "verb") setView("verbs");
    else if (result.type === "lesson") setView("grammar");
  }

  const iconForType = (type: string) => {
    switch (type) {
      case "card": return <BookOpen size={16} className="text-sky-400" />;
      case "verb": return <List size={16} className="text-emerald-400" />;
      case "lesson": return <GraduationCap size={16} className="text-indigo-400" />;
      default: return <Search size={16} className="text-slate-400" />;
    }
  };

  return (
    <>
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors text-sm text-slate-400"
        title="Rechercher (Cmd+K)"
      >
        <Search size={16} />
        <span className="hidden lg:inline">Rechercher...</span>
        <kbd className="hidden lg:inline text-xs bg-slate-700 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              className="relative w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4 border-b border-slate-700">
                <Search size={20} className="text-slate-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un mot, verbe, leçon..."
                  className="flex-1 bg-transparent outline-none text-slate-100 placeholder-slate-500"
                  autoFocus
                />
                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300">
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {results.length === 0 && query.trim().length >= 2 && (
                  <p className="text-center text-slate-500 py-8 text-sm">Aucun résultat</p>
                )}
                {results.map((r) => (
                  <button
                    key={`${r.type}-${r.id}`}
                    onClick={() => handleResultClick(r)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors text-left"
                  >
                    {iconForType(r.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-100 truncate">{r.label}</p>
                      <p className="text-xs text-slate-500 truncate">{r.sublabel}</p>
                    </div>
                  </button>
                ))}
                {query.trim().length < 2 && (
                  <p className="text-center text-slate-500 py-8 text-sm">Tape au moins 2 caractères</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
