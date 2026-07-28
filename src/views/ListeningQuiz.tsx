import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Headphones, Trophy, Volume2, CheckCircle, XCircle } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSoundFeedback } from "@/hooks/useSoundFeedback";
import { useAllCards, useIrregularVerbs, usePhrasalVerbs } from "@/hooks/useQueries";

interface QuizQuestion {
  audioText: string;
  correctAnswer: string;
  options: string[];
}

type Mode = "menu" | "playing" | "result";

export function ListeningQuiz() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { speak } = useTextToSpeech();
  const { play } = useSoundFeedback();

  const { data: cards = [], isLoading: cardsLoading } = useAllCards();
  const { data: verbs = [], isLoading: verbsLoading } = useIrregularVerbs();
  const { data: phrasal = [], isLoading: phrasalLoading } = usePhrasalVerbs();
  const loading = cardsLoading || verbsLoading || phrasalLoading;

  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const pool = useMemo(() => {
    const fromCards = cards
      .filter((c) => c.translation_fr)
      .map((c) => ({ audioText: c.word, answer: c.translation_fr! }));
    const fromVerbs = verbs.map((v) => ({
      audioText: v.base,
      answer: v.meaning,
    }));
    const fromPhrasal = phrasal.map((v) => ({
      audioText: `${v.verb} ${v.particle}`,
      answer: v.meaning,
    }));
    return [...fromCards, ...fromVerbs, ...fromPhrasal];
  }, [cards, verbs, phrasal]);

  const startQuiz = useCallback(() => {
    if (pool.length < 4) return;
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    const qs: QuizQuestion[] = shuffled.map((item) => {
      const wrongs = pool
        .filter((p) => p.answer !== item.answer)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((p) => p.answer);
      return {
        audioText: item.audioText,
        correctAnswer: item.answer,
        options: [...wrongs, item.answer].sort(() => Math.random() - 0.5),
      };
    });
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setStreak(0);
    setMode("playing");
    setTimeout(() => speak(qs[0].audioText), 300);
  }, [pool, speak]);

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
      const next = questions[currentIdx + 1];
      setTimeout(() => speak(next.audioText), 300);
    } else {
      setMode("result");
    }
  }

  if (mode === "menu") {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 gap-6">
        <button
          onClick={() => setView("dashboard")}
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <Headphones size={48} className="text-sky-400" />
        <h1 className="text-3xl font-bold">Quiz d'écoute</h1>
        <p className="text-slate-400 text-center max-w-md">
          {loading ? "Chargement..." : "Écoutez le mot ou l'expression en anglais, puis choisissez la bonne traduction française parmi 4 options."}
        </p>
        <button
          onClick={startQuiz}
          disabled={loading || pool.length < 4}
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 rounded-xl font-semibold transition-colors"
        >
          Commencer
        </button>
        {pool.length < 4 && (
          <p className="text-slate-500 text-sm">Ajoutez plus de mots pour jouer.</p>
        )}
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
          <p className="text-slate-400">Score : <span className="text-sky-400 font-bold">{score}</span></p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={startQuiz}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors"
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
        <h1 className="text-xl font-bold">Quiz d'écoute</h1>
        <div className="ml-auto flex items-center gap-4">
          {streak > 1 && <span className="text-orange-400 text-sm font-bold">{streak}x</span>}
          <span className="text-sky-400 font-bold">{score}</span>
          <span className="text-slate-400 text-sm">{currentIdx + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => speak(q.audioText)}
          className="w-24 h-24 rounded-full bg-sky-600 hover:bg-sky-500 flex items-center justify-center shadow-lg transition-colors"
        >
          <Volume2 size={36} />
        </motion.button>
        <p className="text-slate-400 text-sm">Cliquez pour réécouter</p>

        <div className="w-full grid grid-cols-1 gap-3">
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
                    : "bg-slate-800 border-slate-700 hover:border-sky-500"
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
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 rounded-xl font-semibold transition-colors"
          >
            {currentIdx + 1 < questions.length ? "Suivant" : "Voir le résultat"}
          </motion.button>
        )}
      </div>
    </div>
  );
}
