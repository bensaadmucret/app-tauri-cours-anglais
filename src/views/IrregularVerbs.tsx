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
import { getIrregularVerbs } from "@/db/queries";
import type { IrregularVerb } from "@/db/schema";

type Mode = "list" | "learn" | "quiz" | "flashcard";

export function IrregularVerbs() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);

  const [verbs, setVerbs] = useState<IrregularVerb[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("list");
  const [filter, setFilter] = useState("all");

  const [pool, setPool] = useState<IrregularVerb[]>([]);
  const [idx, setIdx] = useState(0);

  const [pastIn, setPastIn] = useState("");
  const [partIn, setPartIn] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ ok: 0, total: 0 });
  const [done, setDone] = useState(false);
  const [pastOk, setPastOk] = useState<boolean | null>(null);
  const [partOk, setPartOk] = useState<boolean | null>(null);

  const [fcRev, setFcRev] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      setVerbs(await getIrregularVerbs());
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
    setPastIn("");
    setPartIn("");
    setRevealed(false);
    setScore({ ok: 0, total: 0 });
    setDone(false);
    setPastOk(null);
    setPartOk(null);
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
    const p = matches(pastIn, v.past);
    const pr = matches(partIn, v.past_participle);
    setPastOk(p);
    setPartOk(pr);
    setScore((s) => ({ ok: s.ok + (p && pr ? 1 : 0), total: s.total + 1 }));
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= pool.length) {
      setDone(true);
      addXp(score.ok + (pastOk && partOk ? 1 : 0));
    } else {
      setIdx((i) => i + 1);
      setPastIn("");
      setPartIn("");
      setRevealed(false);
      setPastOk(null);
      setPartOk(null);
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
    return m && (vb.base.toLowerCase().includes(q) || vb.meaning.toLowerCase().includes(q));
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Verbes Irréguliers
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
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-sky-500 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-lg font-bold text-sky-400">{vb.base}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-rose-400 font-semibold">{vb.past}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-emerald-400 font-semibold">{vb.past_participle}</span>
                        <button
                          onClick={() =>
                            speak(`${vb.base}, ${vb.past}, ${vb.past_participle}`)
                          }
                          className="ml-1 text-slate-500 hover:text-sky-400"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{vb.meaning}</p>
                      <div className="space-y-1 text-sm text-slate-300">
                        {vb.example_base && (
                          <p>
                            <span className="text-sky-400 font-medium">Base:</span>{" "}
                            {vb.example_base}
                          </p>
                        )}
                        {vb.example_past && (
                          <p>
                            <span className="text-rose-400 font-medium">Past:</span>{" "}
                            {vb.example_past}
                          </p>
                        )}
                        {vb.example_participle && (
                          <p>
                            <span className="text-emerald-400 font-medium">
                              Participle:
                            </span>{" "}
                            {vb.example_participle}
                          </p>
                        )}
                      </div>
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
              <h2 className="text-3xl font-bold text-sky-400 mb-1">{v.base}</h2>
              <p className="text-slate-400 mb-6">{v.meaning}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-slate-900 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">Base</p>
                  <p className="font-bold text-sky-400">{v.base}</p>
                </div>
                <div className="bg-slate-900 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">Past</p>
                  <p className="font-bold text-rose-400">{v.past}</p>
                </div>
                <div className="bg-slate-900 rounded-xl p-3">
                  <p className="text-xs text-slate-400 mb-1">Participle</p>
                  <p className="font-bold text-emerald-400">{v.past_participle}</p>
                </div>
              </div>
              <button
                onClick={() => speak(`${v.base}, ${v.past}, ${v.past_participle}`)}
                className="mb-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm"
              >
                <Volume2 size={16} className="inline mr-1" /> Écouter
              </button>
              <div className="space-y-1 text-sm text-slate-300 text-left">
                {v.example_base && (
                  <p>
                    <span className="text-sky-400 font-medium">Base:</span>{" "}
                    {v.example_base}
                  </p>
                )}
                {v.example_past && (
                  <p>
                    <span className="text-rose-400 font-medium">Past:</span>{" "}
                    {v.example_past}
                  </p>
                )}
                {v.example_participle && (
                  <p>
                    <span className="text-emerald-400 font-medium">
                      Participle:
                    </span>{" "}
                    {v.example_participle}
                  </p>
                )}
              </div>
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
                    Complète la conjugaison
                  </p>
                  <div className="flex items-center justify-center gap-3 text-lg mb-6">
                    <span className="text-sky-400 font-bold">{v.base}</span>
                    <span className="text-slate-500">({v.meaning})</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                    <div className="bg-slate-700/50 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-1">Base</p>
                      <p className="font-bold">{v.base}</p>
                    </div>
                    <div
                      className={`rounded-xl p-3 border ${
                        revealed
                          ? pastOk
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-rose-500 bg-rose-500/10"
                          : "border-sky-500 bg-sky-500/10"
                      }`}
                    >
                      <p className="text-xs text-slate-400 mb-1">Past</p>
                      {revealed ? (
                        <p
                          className={`font-bold ${
                            pastOk ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {v.past}
                        </p>
                      ) : (
                        <p className="font-bold text-slate-600">?</p>
                      )}
                    </div>
                    <div
                      className={`rounded-xl p-3 border ${
                        revealed
                          ? partOk
                            ? "border-emerald-500 bg-emerald-500/10"
                            : "border-rose-500 bg-rose-500/10"
                          : "border-sky-500 bg-sky-500/10"
                      }`}
                    >
                      <p className="text-xs text-slate-400 mb-1">Participle</p>
                      {revealed ? (
                        <p
                          className={`font-bold ${
                            partOk ? "text-emerald-400" : "text-rose-400"
                          }`}
                        >
                          {v.past_participle}
                        </p>
                      ) : (
                        <p className="font-bold text-slate-600">?</p>
                      )}
                    </div>
                  </div>

                  {!revealed && (
                    <div className="space-y-3">
                      <input
                        value={pastIn}
                        onChange={(e) => setPastIn(e.target.value)}
                        placeholder="Prétérit..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-center focus:outline-none focus:border-sky-500"
                        autoFocus
                      />
                      <input
                        value={partIn}
                        onChange={(e) => setPartIn(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && check()}
                        placeholder="Participe passé..."
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-center focus:outline-none focus:border-sky-500"
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
                      {pastOk && partOk ? (
                        <p className="text-emerald-400 font-bold mb-2">Parfait !</p>
                      ) : (
                        <p className="text-rose-400 font-bold mb-2">
                          {pastOk
                            ? "Participle faux"
                            : partOk
                            ? "Prétérit faux"
                            : "Les deux sont faux"}
                        </p>
                      )}
                      <div className="space-y-1 text-sm text-slate-400 italic mb-4">
                        {v.example_past && <p>{v.example_past}</p>}
                        {v.example_participle && <p>{v.example_participle}</p>}
                      </div>
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
                  className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-center cursor-pointer select-none min-h-[300px] flex flex-col justify-center"
                  onClick={() => setFcRev((r) => !r)}
                >
                  {!fcRev ? (
                    <>
                      <p className="text-sm text-slate-400 mb-2">
                        Devine les formes
                      </p>
                      <h2 className="text-3xl font-bold text-sky-400 mb-2">
                        {pool[idx].base}
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
                          {pool[idx].base}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speak(
                              `${pool[idx].base}, ${pool[idx].past}, ${pool[idx].past_participle}`
                            );
                          }}
                        >
                          <Volume2
                            size={18}
                            className="text-slate-500 hover:text-sky-400"
                          />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-rose-400 mb-1">Past</p>
                          <p className="font-bold text-lg">{pool[idx].past}</p>
                        </div>
                        <div>
                          <p className="text-xs text-emerald-400 mb-1">
                            Participle
                          </p>
                          <p className="font-bold text-lg">
                            {pool[idx].past_participle}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-slate-300">
                        {pool[idx].example_base && <p>{pool[idx].example_base}</p>}
                        {pool[idx].example_past && <p>{pool[idx].example_past}</p>}
                        {pool[idx].example_participle && (
                          <p>{pool[idx].example_participle}</p>
                        )}
                      </div>
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
                    setIdx((i) =>
                      i + 1 >= pool.length ? 0 : i + 1
                    );
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
