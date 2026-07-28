import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, Trophy, Volume2, CheckCircle, XCircle } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSoundFeedback } from "@/hooks/useSoundFeedback";
import { useAllCards, useIrregularVerbs, usePhrasalVerbs, useNumberExercises, useGrammarLessons } from "@/hooks/useQueries";
import { getGrammarExercises } from "@/db/queries";
import type { GrammarExercise } from "@/db/schema";

type Mode = "menu" | "playing" | "result";

interface MixedQuestion {
  type: "verb" | "phrasal" | "number" | "card" | "grammar";
  prompt: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
}

export function MixedReview() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { speak } = useTextToSpeech();
  const { play } = useSoundFeedback();

  const { data: cards = [] } = useAllCards();
  const { data: verbs = [] } = useIrregularVerbs();
  const { data: phrasal = [] } = usePhrasalVerbs();
  const { data: numbers = [] } = useNumberExercises();
  const { data: lessons = [] } = useGrammarLessons();

  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<MixedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);

  const allQuestions = useMemo<MixedQuestion[]>(() => {
    const qs: MixedQuestion[] = [];

    for (const v of verbs.slice(0, 30)) {
      const wrongs = verbs.filter((x) => x.id !== v.id).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.past);
      qs.push({
        type: "verb",
        prompt: `Past simple de "${v.base}"`,
        correctAnswer: v.past,
        options: [...wrongs, v.past].sort(() => Math.random() - 0.5),
        audioText: v.base,
      });
    }

    for (const v of phrasal.slice(0, 30)) {
      const wrongs = phrasal.filter((x) => x.id !== v.id).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.particle);
      qs.push({
        type: "phrasal",
        prompt: `Complétez : "${v.verb} ___" (${v.meaning})`,
        correctAnswer: v.particle,
        options: [...wrongs, v.particle].sort(() => Math.random() - 0.5),
      });
    }

    for (const n of numbers.slice(0, 30)) {
      const wrongs = numbers.filter((x) => x.id !== n.id).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.answer);
      qs.push({
        type: "number",
        prompt: n.question,
        correctAnswer: n.answer,
        options: [...wrongs, n.answer].sort(() => Math.random() - 0.5),
        audioText: n.question,
      });
    }

    for (const c of cards.filter((c) => c.translation_fr).slice(0, 30)) {
      const wrongs = cards.filter((x) => x.id !== c.id && x.translation_fr).sort(() => Math.random() - 0.5).slice(0, 3).map((x) => x.translation_fr!);
      qs.push({
        type: "card",
        prompt: `Que veut dire "${c.word}" ?`,
        correctAnswer: c.translation_fr!,
        options: [...wrongs, c.translation_fr!].sort(() => Math.random() - 0.5),
        audioText: c.word,
      });
    }

    return qs;
  }, [verbs, phrasal, numbers, cards]);

  const startQuiz = useCallback(async () => {
    setLoading(true);
    try {
      let qs = [...allQuestions];

      if (lessons.length > 0) {
        const lesson = lessons[Math.floor(Math.random() * lessons.length)];
        try {
          const exs = await getGrammarExercises(lesson.id);
          for (const ex of exs.filter((e: GrammarExercise) => e.type === "qcm").slice(0, 10)) {
            const opts = ex.options ? JSON.parse(ex.options) : [ex.correct_answer];
            qs.push({
              type: "grammar",
              prompt: ex.question,
              correctAnswer: ex.correct_answer,
              options: Array.isArray(opts) ? [...opts].sort(() => Math.random() - 0.5) : [ex.correct_answer],
            });
          }
        } catch { /* ignore */ }
      }

      qs = qs.sort(() => Math.random() - 0.5).slice(0, 15);
      setQuestions(qs);
      setCurrentIdx(0);
      setSelected(null);
      setShowFeedback(false);
      setScore(0);
      setStreak(0);
      setMode("playing");
    } finally {
      setLoading(false);
    }
  }, [allQuestions, lessons]);

  function handleAnswer(option: string) {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);
    const correct = option === questions[currentIdx].correctAnswer;
    if (correct) {
      setScore((s) => s + 10 + streak * 2);
      setStreak((s) => s + 1);
      addXp(3);
      play("success");
    } else {
      setStreak(0);
      play("error");
    }
  }

  function nextQuestion() {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setMode("result");
    }
  }

  const typeLabels: Record<string, string> = {
    verb: "Verbe",
    phrasal: "Phrasal Verb",
    number: "Nombre",
    card: "Vocabulaire",
    grammar: "Grammaire",
  };

  const typeColors: Record<string, string> = {
    verb: "text-emerald-400",
    phrasal: "text-amber-400",
    number: "text-sky-400",
    card: "text-violet-400",
    grammar: "text-indigo-400",
  };

  if (mode === "menu") {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 gap-6">
        <button
          onClick={() => setView("dashboard")}
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <Layers size={48} className="text-amber-400" />
        <h1 className="text-3xl font-bold">Mélange général</h1>
        <p className="text-slate-400 text-center max-w-md">
          Un mélange de questions de tous les modules : verbes, phrasal verbs, nombres, vocabulaire et grammaire. {allQuestions.length} questions disponibles.
        </p>
        <button
          onClick={startQuiz}
          disabled={loading || allQuestions.length < 4}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 rounded-xl font-semibold transition-colors"
        >
          {loading ? "Chargement..." : "Commencer"}
        </button>
      </div>
    );
  }

  if (mode === "result") {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-slate-800 rounded-3xl p-10 flex flex-col items-center border border-slate-700"
        >
          <Trophy size={48} className="text-amber-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Quiz terminé !</h2>
          <p className="text-slate-400">Score : <span className="text-amber-400 font-bold">{score}</span></p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={startQuiz}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 rounded-xl font-semibold transition-colors"
            >
              Rejouer
            </button>
            <button
              onClick={() => setView("dashboard")}
              className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold transition-colors"
            >
              Accueil
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="min-h-full p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setView("dashboard")}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Mélange</h1>
        <div className="ml-auto flex items-center gap-4">
          {streak > 1 && <span className="text-orange-400 text-sm font-bold">{streak}x</span>}
          <span className="text-amber-400 font-bold">{score}</span>
          <span className="text-slate-400 text-sm">{currentIdx + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-xs font-bold uppercase ${typeColors[q.type]}`}>{typeLabels[q.type]}</span>
          {q.audioText && (
            <button
              onClick={() => speak(q.audioText!)}
              className="ml-auto p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
            >
              <Volume2 size={16} />
            </button>
          )}
        </div>
        <p className="text-lg font-medium">{q.prompt}</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {q.options.map((option) => {
          const isCorrect = option === q.correctAnswer;
          const isSelected = selected === option;
          return (
            <motion.button
              key={option}
              whileHover={!showFeedback ? { scale: 1.02 } : undefined}
              whileTap={!showFeedback ? { scale: 0.98 } : undefined}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`w-full px-5 py-4 rounded-xl border text-left font-medium transition-all ${
                showFeedback
                  ? isCorrect
                    ? "bg-emerald-600/20 border-emerald-600"
                    : isSelected
                    ? "bg-rose-600/20 border-rose-600"
                    : "bg-slate-800 border-slate-700 opacity-50"
                  : "bg-slate-800 border-slate-700 hover:border-amber-500"
              }`}
            >
              <div className="flex items-center gap-2">
                {showFeedback && isCorrect && <CheckCircle size={18} className="text-emerald-400" />}
                {showFeedback && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400" />}
                {option}
              </div>
            </motion.button>
          );
        })}
      </div>

      {showFeedback && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={nextQuestion}
          className="w-full mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-semibold transition-colors"
        >
          {currentIdx + 1 < questions.length ? "Suivant" : "Voir le résultat"}
        </motion.button>
      )}
    </div>
  );
}
