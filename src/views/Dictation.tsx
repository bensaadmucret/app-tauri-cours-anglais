import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mic,
  Play,
  Trophy,
  RotateCcw,
  Volume2,
  ChevronRight,
} from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { getDictationSentences, getDictationDifficulties } from "@/db/queries";
import type { DictationSentence } from "@/db/schema";

type Mode = "menu" | "playing" | "result";

export function Dictation() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);

  const [mode, setMode] = useState<Mode>("menu");
  const [sentences, setSentences] = useState<DictationSentence[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [input, setInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("all");
  const [count, setCount] = useState(10);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDifficulties();
  }, []);

  async function loadDifficulties() {
    try {
      const diffs = await getDictationDifficulties();
      setDifficulties(diffs);
    } catch (e) {
      console.error(e);
    }
  }

  async function start() {
    setLoading(true);
    try {
      const dif = difficulty === "all" ? undefined : difficulty;
      const data = await getDictationSentences(count, dif);
      setSentences(data);
      setCurrentIdx(0);
      setInput("");
      setRevealed(false);
      setScore(0);
      setMode("playing");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const speak = useCallback((text: string, slow = false) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = slow ? 0.5 : 0.85;
      window.speechSynthesis.speak(u);
    }
  }, []);

  const current = sentences[currentIdx];

  function check() {
    if (!current || revealed) return;
    const targetWords = current.text.toLowerCase().split(/\s+/);
    const inputWords = input.trim().toLowerCase().split(/\s+/);
    let correct = 0;
    const maxLen = Math.max(targetWords.length, inputWords.length);
    for (let i = 0; i < maxLen; i++) {
      if (targetWords[i] && inputWords[i] && targetWords[i] === inputWords[i]) {
        correct++;
      }
    }
    const phraseScore = Math.round((correct / targetWords.length) * 10);
    setScore((s) => s + phraseScore);
    setRevealed(true);
  }

  function next() {
    if (currentIdx + 1 >= sentences.length) {
      setMode("result");
      addXp(Math.round(score / 2));
    } else {
      setCurrentIdx((i) => i + 1);
      setInput("");
      setRevealed(false);
    }
  }

  function renderComparison() {
    if (!current) return null;
    const targetWords = current.text.split(/\s+/);
    const inputWords = input.trim().split(/\s+/);
    const maxLen = Math.max(targetWords.length, inputWords.length);
    const elements: JSX.Element[] = [];
    for (let i = 0; i < maxLen; i++) {
      const target = targetWords[i] || "";
      const typed = inputWords[i] || "";
      const isCorrect = target.toLowerCase() === typed.toLowerCase() && target !== "";
      const isWrong = typed !== "" && !isCorrect;
      const isMissing = typed === "" && target !== "";
      let className = "inline-block px-1.5 py-0.5 rounded ";
      if (isCorrect) className += "bg-emerald-900/50 text-emerald-300";
      else if (isWrong) className += "bg-rose-900/50 text-rose-300 line-through";
      else if (isMissing) className += "bg-slate-700 text-slate-400 italic";
      else className += "text-slate-300";
      elements.push(
        <span key={i} className={className}>
          {target || typed}
        </span>
      );
      if (i < maxLen - 1) {
        elements.push(<span key={`s${i}`}>&nbsp;</span>);
      }
    }
    return <div className="flex flex-wrap gap-1 justify-center">{elements}</div>;
  }

  if (mode === "menu") {
    return (
      <div className="min-h-screen flex flex-col p-6 max-w-3xl mx-auto">
        <button
          onClick={() => setView("dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          Retour
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Mic size={28} className="text-rose-400" />
            <h2 className="text-2xl font-bold">Dictée</h2>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
            <p className="text-slate-300 mb-6">
              Écoutez la phrase en anglais, tapez ce que vous entendez, puis vérifiez votre réponse.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 block mb-2">Nombre de phrases</label>
                <div className="flex gap-2">
                  {[5, 10, 20].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCount(c)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        count === c
                          ? "bg-rose-600 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-2">Difficulté</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-rose-500"
                >
                  <option value="all">Toutes</option>
                  {difficulties.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={start}
              disabled={loading}
              className="mt-6 w-full py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Play size={18} />
              {loading ? "Chargement..." : "Commencer"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (mode === "result") {
    const maxScore = sentences.length * 10;
    const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-slate-800 rounded-3xl p-10 flex flex-col items-center border border-slate-700 shadow-2xl max-w-md w-full"
        >
          <Trophy size={64} className="text-amber-400 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Dictée terminée !</h2>
          <p className="text-4xl font-bold text-emerald-400 mb-2">
            {score} / {maxScore}
          </p>
          <p className="text-slate-400 mb-6">Précision : {pct}%</p>
          <div className="flex gap-3">
            <button
              onClick={() => setMode("menu")}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-semibold"
            >
              <RotateCcw size={18} className="inline mr-1" />
              Rejouer
            </button>
            <button
              onClick={() => setView("dashboard")}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold"
            >
              Retour
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Aucune phrase disponible</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setMode("menu")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Quitter
        </button>
        <span className="text-sm text-slate-400">
          {currentIdx + 1} / {sentences.length}
        </span>
      </div>

      <div className="h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-rose-500 rounded-full transition-all"
          style={{ width: `${((currentIdx) / sentences.length) * 100}%` }}
        />
      </div>

      <motion.div
        key={currentIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center gap-6"
      >
        <div className="flex gap-3">
          <button
            onClick={() => speak(current.text)}
            className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors"
          >
            <Volume2 size={20} />
            Écouter
          </button>
          <button
            onClick={() => speak(current.text, true)}
            className="flex items-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium transition-colors text-sm"
          >
            <Volume2 size={16} />
            Lentement
          </button>
        </div>

        <div className="w-full max-w-lg">
          {!revealed ? (
            <>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && check()}
                placeholder="Tapez ce que vous entendez..."
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-center text-lg focus:outline-none focus:border-rose-500"
                autoFocus
              />
              <button
                onClick={check}
                disabled={!input.trim()}
                className="mt-3 w-full py-3 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-700 rounded-xl font-semibold transition-colors"
              >
                Vérifier
              </button>
            </>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-4"
              >
                <p className="text-center text-lg text-slate-100 font-medium">
                  {current.text}
                </p>

                {renderComparison()}

                {current.translation_fr && (
                  <p className="text-center text-emerald-400 italic border-t border-slate-700 pt-3">
                    {current.translation_fr}
                  </p>
                )}

                <button
                  onClick={next}
                  className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors flex items-center justify-center gap-1"
                >
                  {currentIdx + 1 >= sentences.length ? "Voir les résultats" : "Suivant"}
                  <ChevronRight size={18} />
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
}
