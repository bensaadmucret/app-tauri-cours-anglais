import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Search,
  Shuffle,
  Trophy,
  Volume2,
} from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { getPhrasalVerbs } from "@/db/queries";
import type { PhrasalVerb } from "@/db/schema";

type Mode = "list" | "learn" | "quiz" | "flashcard";

export function PhrasalVerbs() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);

  const [verbs, setVerbs] = useState<PhrasalVerb[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("list");
  const [filter, setFilter] = useState("all");

  const [pool, setPool] = useState<PhrasalVerb[]>([]);
  const [idx, setIdx] = useState(0);

  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const [done, setDone] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const [fcRev, setFcRev] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      setVerbs(await getPhrasalVerbs());
    } finally {
      setLoading(false);
    }
  }

  function pick(count?: number) {
    const src = filter === "all" ? verbs : verbs.filter((v) => v.level === filter);
    const shuffled = [...src].sort(() => Math.random() - 0.5);
    return count ? shuffled.slice(0, count) : shuffled;
  }

  function startLearn() {
    setPool(pick());
    setIdx(0);
    setMode("learn");
  }

  function startQuiz() {
    setPool(pick(10));
    setIdx(0);
    setInput("");
    setRevealed(false);
    setScore({ ok: 0, total: 0 });
    setDone(false);
    setCorrect(null);
    setMode("quiz");
  }

  function startFc() {
    setPool(pick());
    setIdx(0);
    setFcRev(false);
    setMode("flashcard");
  }

  function matches(input: string, target: string) {
    const norm = input.trim().toLowerCase();
    return target
      .toLowerCase()
      .split("/")
      .map((s) => s.trim())
      .some((a) => norm === a || a.includes(norm) || norm.includes(a));
  }

  function check() {
    const v = pool[idx];
    if (!v) return;
    const ok = matches(input, v.particle);
    setCorrect(ok);
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }));
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= pool.length) {
      setDone(true);
      addXp(score.ok + (correct ? 1 : 0));
    } else {
      setIdx((i) => i + 1);
      setInput("");
      setRevealed(false);
      setCorrect(null);
    }
  }

  function speak(text: string) {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  }

  const v = pool[idx];
  const listVerbs = verbs.filter((vb) => {
    const m = filter === "all" || vb.level === filter;
    const q = search.toLowerCase();
    const full = `${vb.verb} ${vb.particle}`.toLowerCase();
    return m && (full.includes(q) || vb.meaning.toLowerCase().includes(q));
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setView("dashboard")}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
            Phrasal Verbs
          </h1>
        </div>

        {mode === "list" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-sky-500"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500"
              >
                <option value="all">Tous niveaux</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
              <button
                onClick={startLearn}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition-colors"
              >
                <GraduationCap size={18} className="inline mr-1" />
                Apprendre
              </button>
              <button
                onClick={startQuiz}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold transition-colors"
              >
                <Trophy size={18} className="inline mr-1" />
                Quiz
              </button>
              <button
                onClick={startFc}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors"
              >
                <BookOpen size={18} className="inline mr-1" />
                Flashcards
              </button>
            </div>

            <div className="grid gap-3">
              {listVerbs.map((vb) => (
                <div
                  key={vb.id}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-amber-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-lg font-bold text-sky-400">{vb.verb}</span>
                        <span className="text-amber-400 font-semibold">{vb.particle}</span>
                        <button
                          onClick={() => speak(`${vb.verb} ${vb.particle}`)}
                          className="ml-1 text-slate-500 hover:text-sky-400"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{vb.meaning}</p>
                      {vb.example && (
                        <p className="text-sm text-slate-300 italic">{vb.example}</p>
                      )}
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-400 capitalize">
                      {vb.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {mode === "learn" && v && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="text-slate-400 mb-4">
              {idx + 1} / {pool.length}
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 w-full max-w-md text-center">
              <h2 className="text-3xl font-bold text-sky-400 mb-1">
                {v.verb} <span className="text-amber-400">{v.particle}</span>
              </h2>
              <p className="text-slate-400 mb-6">{v.meaning}</p>
              <button
                onClick={() => speak(`${v.verb} ${v.particle}`)}
                className="mb-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm"
              >
                <Volume2 size={16} className="inline mr-1" /> Écouter
              </button>
              {v.example && (
                <p className="text-sm text-slate-300 italic">{v.example}</p>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIdx((i) => Math.max(0, i - 1))}
                disabled={idx === 0}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded-xl"
              >
                Précédent
              </button>
              <button
                onClick={() => {
                  if (idx + 1 >= pool.length) setMode("list");
                  else setIdx((i) => i + 1);
                }}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold"
              >
                {idx + 1 >= pool.length ? "Terminer" : "Suivant"}
              </button>
            </div>
            <button
              onClick={() => setMode("list")}
              className="mt-4 text-slate-400 hover:text-white text-sm underline"
            >
              Retour
            </button>
          </motion.div>
        )}

        {mode === "quiz" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {done ? (
              <div className="text-center mt-10">
                <Trophy size={64} className="mx-auto text-yellow-400 mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quiz terminé !</h2>
                <p className="text-xl text-slate-300 mb-6">
                  Score: {score.ok} / {score.total}
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={startQuiz}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold"
                  >
                    Rejouer
                  </button>
                  <button
                    onClick={() => setMode("list")}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold"
                  >
                    Retour
                  </button>
                </div>
              </div>
            ) : v ? (
              <div className="w-full max-w-lg">
                <div className="flex justify-between items-center mb-4 text-slate-400">
                  <span>
                    {idx + 1} / {pool.length}
                  </span>
                  <span>
                    Score: {score.ok} / {score.total}
                  </span>
                </div>
                <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-4">
                  <p className="text-slate-400 text-sm mb-2 text-center">
                    Quelle particule complète ce phrasal verb ?
                  </p>
                  <div className="text-center text-2xl font-bold mb-6">
                    <span className="text-sky-400">{v.verb}</span>
                    <span className="text-slate-600 mx-2">_____</span>
                    <span className="text-slate-500 text-base">({v.meaning})</span>
                  </div>

                  {!revealed && (
                    <div className="space-y-3">
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && check()}
                        placeholder="Particule..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-center focus:outline-none focus:border-sky-500"
                        autoFocus
                      />
                      <button
                        onClick={check}
                        className="w-full py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold"
                      >
                        Vérifier
                      </button>
                    </div>
                  )}

                  {revealed && (
                    <div className="text-center">
                      {correct ? (
                        <p className="text-emerald-400 font-bold mb-2">Bonne réponse !</p>
                      ) : (
                        <p className="text-rose-400 font-bold mb-2">
                          Mauvaise réponse — c''était <span className="text-amber-400">{v.particle}</span>
                        </p>
                      )}
                      {v.example && (
                        <p className="text-sm text-slate-400 italic mb-4">{v.example}</p>
                      )}
                      <button
                        onClick={next}
                        className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold"
                      >
                        Suivant
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setMode("list")}
                  className="text-slate-400 hover:text-white text-sm underline"
                >
                  Quitter
                </button>
              </div>
            ) : null}
          </motion.div>
        )}

        {mode === "flashcard" && pool.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center mt-6"
          >
            <div className="text-slate-400 text-sm mb-4">
              {idx + 1} / {pool.length}
            </div>
            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx + (fcRev ? "-r" : "")}
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center cursor-pointer select-none min-h-[260px] flex flex-col justify-center"
                  onClick={() => setFcRev((r) => !r)}
                >
                  {!fcRev ? (
                    <>
                      <p className="text-sm text-slate-400 mb-2">
                        Quelle particule ?
                      </p>
                      <h2 className="text-3xl font-bold text-sky-400 mb-2">
                        {pool[idx].verb} <span className="text-slate-600">_____</span>
                      </h2>
                      <p className="text-slate-400">{pool[idx].meaning}</p>
                      <p className="text-xs text-slate-500 mt-6">
                        Clique pour révéler
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-sky-400 font-bold text-xl">
                          {pool[idx].verb}
                        </span>
                        <span className="text-amber-400 font-bold text-xl">
                          {pool[idx].particle}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(`${pool[idx].verb} ${pool[idx].particle}`);
                          }}
                        >
                          <Volume2
                            size={18}
                            className="text-slate-500 hover:text-sky-400"
                          />
                        </button>
                      </div>
                      <p className="text-slate-400 mb-3">{pool[idx].meaning}</p>
                      {pool[idx].example && (
                        <p className="text-sm text-slate-300 italic">
                          {pool[idx].example}
                        </p>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-3 justify-center mt-6">
                <button
                  onClick={() => {
                    setIdx((i) => Math.max(0, i - 1));
                    setFcRev(false);
                  }}
                  disabled={idx === 0}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded-xl"
                >
                  Précédent
                </button>
                <button
                  onClick={() => setFcRev((r) => !r)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-xl"
                >
                  {fcRev ? (
                    <EyeOff size={18} className="inline mr-1" />
                  ) : (
                    <Eye size={18} className="inline mr-1" />
                  )}
                  {fcRev ? "Cacher" : "Révéler"}
                </button>
                <button
                  onClick={() => {
                    setIdx((i) => (i + 1 >= pool.length ? 0 : i + 1));
                    setFcRev(false);
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl"
                >
                  <Shuffle size={18} className="inline mr-1" />
                  Suivant
                </button>
              </div>
              <button
                onClick={() => setMode("list")}
                className="block mx-auto mt-4 text-slate-400 hover:text-white text-sm underline"
              >
                Retour
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
