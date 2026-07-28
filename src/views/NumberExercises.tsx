import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, XCircle, Lightbulb, Shuffle, Volume2 } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useNumberExercises } from "@/hooks/useQueries";
import type { NumberExercise } from "@/db/schema";

const TYPE_LABELS: Record<string, string> = {
  digit_to_word: "Chiffres en lettres",
  word_to_digit: "Lettres en chiffres",
  ordinal: "Ordinaux",
  time: "L'heure",
  date: "Dates",
  large_number: "Grands nombres",
  fraction: "Fractions",
  percentage: "Pourcentages",
  decimal: "Décimaux",
  mixed: "Mélange",
};

export function NumberExercises() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { speak } = useTextToSpeech();

  const { data: allExercises = [], isLoading: loading } = useNumberExercises();
  const [mode, setMode] = useState<"list" | "quiz">("list");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

  const [queue, setQueue] = useState<NumberExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const filtered = allExercises.filter((e) => {
    const t = typeFilter === null || e.type === typeFilter;
    const d = difficultyFilter === "all" || e.difficulty === difficultyFilter;
    return t && d;
  });

  function getTypes() {
    const types = new Set(allExercises.map((e) => e.type));
    return Array.from(types).sort();
  }

  function startQuiz() {
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setCurrentIndex(0);
    setUserAnswer("");
    setSubmitted(false);
    setCorrect(false);
    setStreak(0);
    setBestStreak(0);
    setTotalCorrect(0);
    setTotalAnswered(0);
    setShowHint(false);
    setMode("quiz");
  }

  const current = queue[currentIndex];

  function normalizeAnswer(s: string): string {
    return s
      .toLowerCase()
      .replace(/[']/g, "'")
      .replace(/\s+/g, " ")
      .trim();
  }

  function checkAnswer() {
    if (!current || !userAnswer.trim()) return;
    const normalizedUser = normalizeAnswer(userAnswer);
    const answers = current.answer.split("/").map((a) => normalizeAnswer(a.trim()));
    const isCorrect = answers.some((a) => normalizedUser === a || normalizedUser.includes(a));
    setCorrect(isCorrect);
    setSubmitted(true);
    setTotalAnswered((p) => p + 1);
    if (isCorrect) {
      setStreak((p) => {
        const ns = p + 1;
        setBestStreak((b) => Math.max(b, ns));
        return ns;
      });
      setTotalCorrect((p) => p + 1);
      addXp(5);
    } else {
      setStreak(0);
    }
  }

  function nextQuestion() {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex((p) => p + 1);
      setUserAnswer("");
      setSubmitted(false);
      setCorrect(false);
      setShowHint(false);
    } else {
      setMode("list");
    }
  }

  function skipQuestion() {
    setSubmitted(true);
    setCorrect(false);
    setStreak(0);
    setTotalAnswered((p) => p + 1);
  }

  const progressPercent = queue.length > 0 ? ((currentIndex + (submitted ? 1 : 0)) / queue.length) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center text-slate-400">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-900 text-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setView("dashboard")}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Chiffres & Nombres
          </h1>
        </div>

        {mode === "list" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
              <button
                onClick={() => setTypeFilter(null)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  typeFilter === null ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Tous ({allExercises.length})
              </button>
              {getTypes().map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                    typeFilter === t ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {TYPE_LABELS[t] || t}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-6">
              {["all", "easy", "medium", "hard"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficultyFilter(d)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    difficultyFilter === d
                      ? "bg-sky-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {d === "all" ? "Toutes" : d === "easy" ? "Facile" : d === "medium" ? "Moyen" : "Difficile"}
                </button>
              ))}
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Exercices filtrés</p>
                  <p className="text-3xl font-bold">{filtered.length}</p>
                </div>
                <button
                  onClick={startQuiz}
                  disabled={filtered.length === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold shadow-lg transition-colors"
                >
                  <Shuffle size={18} />
                  Démarrer le quiz
                </button>
              </div>
            </div>

            <div className="grid gap-2 max-h-[500px] overflow-y-auto pr-1">
              {filtered.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-slate-800 rounded-xl p-3 border border-slate-700 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <span className="text-amber-400 font-bold mr-2">{ex.question}</span>
                    <span className="text-slate-400 text-sm">= {ex.answer}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        const firstAnswer = ex.answer.split("/")[0].trim();
                        speak(firstAnswer, "en-GB");
                      }}
                      className="p-1.5 rounded-lg bg-slate-700 hover:bg-amber-600 text-slate-400 hover:text-slate-100 transition-colors"
                      title="Écouter"
                    >
                      <Volume2 size={16} />
                    </button>
                    <span className="text-xs text-slate-500 capitalize">{TYPE_LABELS[ex.type] || ex.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {mode === "quiz" && current && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setMode("list")}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-center text-xs text-slate-400 mt-1">
                  {currentIndex + 1} / {queue.length}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className="text-amber-400 font-bold">{streak} série</p>
                <p className="text-slate-500 text-xs">Record: {bestStreak}</p>
                <p className="text-slate-400">{totalCorrect}/{totalAnswered}</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 mb-6 text-center">
              <p className="text-slate-400 text-sm mb-2">{TYPE_LABELS[current.type]}</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <h2 className="text-4xl font-bold text-amber-400">{current.question}</h2>
                <button
                  onClick={() => speak(current.question, "en-GB")}
                  className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-400 transition-colors"
                  title="Écouter la prononciation"
                >
                  <Volume2 size={24} />
                </button>
              </div>
              {current.hint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-amber-400 transition-colors mx-auto"
                >
                  <Lightbulb size={12} />
                  {showHint ? current.hint : "Indice"}
                </button>
              )}
            </div>

            {!submitted ? (
              <>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && checkAnswer()}
                  placeholder="Ta réponse en anglais..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-4 text-xl text-center focus:outline-none focus:border-amber-500 mb-4"
                  autoFocus
                />
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={checkAnswer}
                    disabled={!userAnswer.trim()}
                    className="px-8 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-semibold"
                  >
                    <CheckCircle size={18} className="inline mr-1" />
                    Valider
                  </button>
                  <button
                    onClick={skipQuestion}
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
                  >
                    Passer
                  </button>
                </div>
              </>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + "-result"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div
                    className={`rounded-2xl p-6 border mb-6 ${
                      correct
                        ? "bg-emerald-900/30 border-emerald-700/50"
                        : "bg-rose-900/30 border-rose-700/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {correct ? (
                        <CheckCircle size={24} className="text-emerald-400" />
                      ) : (
                        <XCircle size={24} className="text-rose-400" />
                      )}
                      <span className={`font-bold text-lg ${correct ? "text-emerald-400" : "text-rose-400"}`}>
                        {correct ? "Correct !" : "Incorrect"}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-1">
                      Ta réponse : <span className="font-mono">{userAnswer.trim() || "(vide)"}</span>
                    </p>
                    <p className="text-slate-200">
                      Réponse{current.answer.includes("/") ? "s" : ""} attendue :{" "}
                      <span className="font-bold text-amber-400">{current.answer}</span>
                    </p>
                    <button
                      onClick={() => {
                        const firstAnswer = current.answer.split("/")[0].trim();
                        speak(firstAnswer, "en-GB");
                      }}
                      className="flex items-center gap-1 mt-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      <Volume2 size={14} />
                      Écouter la prononciation
                    </button>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={nextQuestion}
                      className="px-8 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-semibold"
                    >
                      {currentIndex < queue.length - 1 ? "Suivant" : "Terminer"}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
