import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Wand2, Trophy, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useSoundFeedback } from "@/hooks/useSoundFeedback";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useAllCards } from "@/hooks/useQueries";
import { getDictationSentences } from "@/db/queries";
import type { DictationSentence } from "@/db/schema";

type Mode = "menu" | "playing" | "result";

interface SentenceQuestion {
  text: string;
  translationFr: string | null;
  words: string[];
}

function shuffleWords(text: string): string[] {
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  return [...words].sort(() => Math.random() - 0.5);
}

export function SentenceBuilder() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { speak } = useTextToSpeech();
  const { play } = useSoundFeedback();

  const { data: cards = [] } = useAllCards();
  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<SentenceQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const cardSentences = useMemo(() => {
    return cards
      .filter((c) => c.example && c.example.split(/\s+/).length >= 4)
      .slice(0, 30)
      .map((c) => ({
        text: c.example!,
        translationFr: c.translation_fr,
      }));
  }, [cards]);

  const startGame = useCallback(async () => {
    setLoading(true);
    try {
      const dictation = await getDictationSentences(15);
      const allSentences = [
        ...dictation.map((d: DictationSentence) => ({
          text: d.text,
          translationFr: d.translation_fr,
        })),
        ...cardSentences,
      ];
      const shuffled = allSentences.sort(() => Math.random() - 0.5).slice(0, 10);
      const qs: SentenceQuestion[] = shuffled.map((s) => ({
        text: s.text,
        translationFr: s.translationFr,
        words: shuffleWords(s.text),
      }));
      setQuestions(qs);
      setCurrentIdx(0);
      setAvailableWords(qs[0].words);
      setPlacedWords([]);
      setShowFeedback(false);
      setScore(0);
      setMode("playing");
    } finally {
      setLoading(false);
    }
  }, [cardSentences]);

  function placeWord(word: string, index: number) {
    if (showFeedback) return;
    setPlacedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
  }

  function removeWord(index: number) {
    if (showFeedback) return;
    const word = placedWords[index];
    setPlacedWords((prev) => prev.filter((_, i) => i !== index));
    setAvailableWords((prev) => [...prev, word]);
  }

  function checkAnswer() {
    const q = questions[currentIdx];
    const userAnswer = placedWords.join(" ").trim();
    const correctAnswer = q.text.trim();
    const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    setShowFeedback(true);
    if (isCorrect) {
      setScore((s) => s + 15);
      addXp(4);
      play("success");
    } else {
      play("error");
    }
  }

  function nextQuestion() {
    if (currentIdx + 1 < questions.length) {
      const next = currentIdx + 1;
      setCurrentIdx(next);
      setAvailableWords(questions[next].words);
      setPlacedWords([]);
      setShowFeedback(false);
    } else {
      setMode("result");
    }
  }

  function resetCurrent() {
    setAvailableWords(questions[currentIdx].words);
    setPlacedWords([]);
    setShowFeedback(false);
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
        <Wand2 size={48} className="text-violet-400" />
        <h1 className="text-3xl font-bold">Construction de phrases</h1>
        <p className="text-slate-400 text-center max-w-md">
          Remettez les mots dans le bon ordre pour reconstituer la phrase anglaise.
        </p>
        <button
          onClick={startGame}
          disabled={loading}
          className="px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 rounded-xl font-semibold transition-colors"
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
          <h2 className="text-2xl font-bold mb-2">Bien joué !</h2>
          <p className="text-slate-400">Score : <span className="text-violet-400 font-bold">{score}</span></p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={startGame}
              className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition-colors"
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
  const userAnswer = placedWords.join(" ");
  const isCorrect = userAnswer.toLowerCase().trim() === q.text.toLowerCase().trim();

  return (
    <div className="min-h-full p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setView("dashboard")}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Construction de phrases</h1>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-violet-400 font-bold">{score}</span>
          <span className="text-slate-400 text-sm">{currentIdx + 1}/{questions.length}</span>
        </div>
      </div>

      {q.translationFr && (
        <p className="text-slate-400 text-center mb-6 italic">"{q.translationFr}"</p>
      )}

      <div className="min-h-[80px] bg-slate-800/50 rounded-2xl border border-slate-700 p-4 mb-6 flex flex-wrap gap-2 items-center">
        {placedWords.length === 0 && (
          <p className="text-slate-500 text-sm">Cliquez sur les mots ci-dessous pour construire la phrase...</p>
        )}
        {placedWords.map((word, i) => (
          <motion.button
            key={`placed-${i}`}
            layout
            whileTap={{ scale: 0.95 }}
            onClick={() => removeWord(i)}
            disabled={showFeedback}
            className={`px-3 py-2 rounded-lg font-medium transition-colors ${
              showFeedback
                ? "bg-slate-700 text-slate-300"
                : "bg-violet-600/30 border border-violet-600 hover:bg-violet-600/40"
            }`}
          >
            {word}
          </motion.button>
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-4 mb-6 ${isCorrect ? "bg-emerald-600/20 border border-emerald-600" : "bg-rose-600/20 border border-rose-600"}`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? <CheckCircle size={20} className="text-emerald-400" /> : <XCircle size={20} className="text-rose-400" />}
            <span className={`font-bold ${isCorrect ? "text-emerald-400" : "text-rose-400"}`}>
              {isCorrect ? "Parfait !" : "Pas tout à fait..."}
            </span>
          </div>
          <p className="text-slate-300 text-sm">Réponse : <span className="font-bold text-amber-400">{q.text}</span></p>
          <button
            onClick={() => speak(q.text)}
            className="mt-2 flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            <Wand2 size={12} /> Écouter la phrase
          </button>
        </motion.div>
      )}

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {availableWords.map((word, i) => (
          <motion.button
            key={`avail-${i}`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => placeWord(word, i)}
            disabled={showFeedback}
            className="px-3 py-2 bg-slate-800 border border-slate-600 rounded-lg font-medium hover:border-violet-500 transition-colors"
          >
            {word}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        {!showFeedback && placedWords.length > 0 && (
          <button
            onClick={resetCurrent}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-1"
          >
            <RotateCcw size={16} /> Réinitialiser
          </button>
        )}
        {!showFeedback && placedWords.length > 0 && (
          <button
            onClick={checkAnswer}
            className="px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition-colors"
          >
            Vérifier
          </button>
        )}
        {showFeedback && (
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl font-semibold transition-colors"
          >
            {currentIdx + 1 < questions.length ? "Suivant" : "Résultat"}
          </button>
        )}
      </div>
    </div>
  );
}
