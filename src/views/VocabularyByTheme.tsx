import { useState, useCallback } from "react";
import { ArrowLeft, BookOpen, CheckCircle, XCircle, Trophy, Shuffle, Volume2 } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useThematicVocabularyThemes, useAllThematicVocabulary } from "@/hooks/useQueries";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSoundFeedback } from "@/hooks/useSoundFeedback";

type Mode = "menu" | "theme_select" | "quiz" | "result";
type QuizDirection = "en_to_fr" | "fr_to_en";

interface QuizQuestion {
  word_en: string;
  word_fr: string;
  options: string[];
  direction: QuizDirection;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function VocabularyByTheme() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { play } = useSoundFeedback();
  const { speak } = useTextToSpeech();

  const { data: themes = [], isLoading: themesLoading } = useThematicVocabularyThemes();
  const { data: allVocab = [], isLoading: vocabLoading } = useAllThematicVocabulary();
  const loading = themesLoading || vocabLoading;

  const [mode, setMode] = useState<Mode>("menu");
  const [selectedTheme, setSelectedTheme] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = useCallback(
    (themeId: number) => {
      const vocab = allVocab.filter((v) => v.theme_id === themeId);
      if (vocab.length < 4) return;

      const pool = shuffleArray(vocab).slice(0, Math.min(15, vocab.length));
      const dirs: QuizDirection[] = ["en_to_fr", "fr_to_en"];
      const qs: QuizQuestion[] = pool.map((item) => {
        const dir = dirs[Math.floor(Math.random() * dirs.length)];
        const correct = dir === "en_to_fr" ? item.word_fr : item.word_en;
        const distractors = shuffleArray(
          vocab.filter((v) => v.id !== item.id)
        )
          .slice(0, 3)
          .map((v) => (dir === "en_to_fr" ? v.word_fr : v.word_en));
        return {
          word_en: item.word_en,
          word_fr: item.word_fr,
          options: shuffleArray([correct, ...distractors]),
          direction: dir,
        };
      });

      setSelectedTheme(themeId);
      setQuestions(qs);
      setCurrentIdx(0);
      setSelected(null);
      setShowFeedback(false);
      setScore(0);
      setMode("quiz");
    },
    [allVocab]
  );

  const startMixedQuiz = useCallback(() => {
    if (allVocab.length < 4) return;
    const pool = shuffleArray(allVocab).slice(0, Math.min(20, allVocab.length));
    const dirs: QuizDirection[] = ["en_to_fr", "fr_to_en"];
    const qs: QuizQuestion[] = pool.map((item) => {
      const dir = dirs[Math.floor(Math.random() * dirs.length)];
      const correct = dir === "en_to_fr" ? item.word_fr : item.word_en;
      const distractors = shuffleArray(
        allVocab.filter((v) => v.id !== item.id)
      )
        .slice(0, 3)
        .map((v) => (dir === "en_to_fr" ? v.word_fr : v.word_en));
      return {
        word_en: item.word_en,
        word_fr: item.word_fr,
        options: shuffleArray([correct, ...distractors]),
        direction: dir,
      };
    });

    setSelectedTheme(null);
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setMode("quiz");
  }, [allVocab]);

  const handleAnswer = (option: string) => {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);

    const q = questions[currentIdx];
    const correct = q.direction === "en_to_fr" ? q.word_fr : q.word_en;
    if (option === correct) {
      setScore((s) => s + 1);
      play("success");
    } else {
      play("error");
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 >= questions.length) {
      addXp(score * 10);
      setMode("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setShowFeedback(false);
    }
  };

  // --- MENU ---
  if (mode === "menu") {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 gap-6">
        <button
          onClick={() => setView("dashboard")}
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center">
          <BookOpen size={48} className="text-emerald-400 mx-auto mb-3" />
          <h1 className="text-3xl font-extrabold">Vocabulaire thématique</h1>
          <p className="text-slate-400 mt-2 max-w-md">
            {loading
              ? "Chargement..."
              : `${themes.length} thèmes, ${allVocab.length} mots au total`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
          <button
            onClick={() => setMode("theme_select")}
            disabled={loading || themes.length === 0}
            className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-emerald-500 transition-all disabled:opacity-50"
          >
            <BookOpen size={32} className="text-emerald-400" />
            <span className="font-semibold">Quiz par thème</span>
            <span className="text-sm text-slate-400">Choisissez un thème spécifique</span>
          </button>

          <button
            onClick={startMixedQuiz}
            disabled={loading || allVocab.length < 4}
            className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-slate-800 border border-slate-700 hover:border-amber-500 transition-all disabled:opacity-50"
          >
            <Shuffle size={32} className="text-amber-400" />
            <span className="font-semibold">Quiz mixte</span>
            <span className="text-sm text-slate-400">Tous les thèmes mélangés</span>
          </button>
        </div>
      </div>
    );
  }

  // --- THEME SELECT ---
  if (mode === "theme_select") {
    return (
      <div className="min-h-full flex flex-col p-6 gap-4">
        <button
          onClick={() => setMode("menu")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors self-start"
        >
          <ArrowLeft size={20} />
          Retour
        </button>

        <h2 className="text-2xl font-bold">Choisir un thème</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.theme_id}
              onClick={() => startQuiz(t.theme_id)}
              disabled={t.count < 4}
              className="flex items-center justify-between p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 transition-all disabled:opacity-40 text-left"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400">Ch.{t.theme_id}</span>
                <p className="font-medium">{t.theme_fr}</p>
              </div>
              <span className="text-sm text-slate-500 shrink-0 ml-2">{t.count} mots</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // --- QUIZ ---
  if (mode === "quiz" && questions.length > 0) {
    const q = questions[currentIdx];
    const correct = q.direction === "en_to_fr" ? q.word_fr : q.word_en;
    const prompt = q.direction === "en_to_fr" ? q.word_en : q.word_fr;

    return (
      <div className="min-h-full flex flex-col p-6 gap-4 max-w-2xl mx-auto">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMode("menu")}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={20} />
            Quitter
          </button>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-400">
              {currentIdx + 1} / {questions.length}
            </span>
            <span className="font-bold text-emerald-400">{score} pts</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div key={currentIdx} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase text-emerald-400">
              {q.direction === "en_to_fr" ? "Anglais → Français" : "Français → Anglais"}
            </span>
            {q.direction === "en_to_fr" && (
              <button
                onClick={() => speak(q.word_en)}
                className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
              >
                <Volume2 size={18} className="text-sky-400" />
              </button>
            )}
          </div>
          <p className="text-2xl font-bold text-center">{prompt}</p>
        </div>

        {/* Options */}
        <div key={`opts-${currentIdx}`} className="grid grid-cols-1 gap-3">
          {q.options.map((option) => {
            const isCorrect = option === correct;
            const isSelected = selected === option;
            return (
              <button
                key={`${currentIdx}-${option}`}
                onClick={() => handleAnswer(option)}
                disabled={showFeedback}
                className={`px-5 py-4 rounded-xl border font-medium transition-all text-left ${
                  showFeedback
                    ? isCorrect
                      ? "bg-emerald-600/20 border-emerald-600"
                      : isSelected
                      ? "bg-rose-600/20 border-rose-600"
                      : "bg-slate-800 border-slate-700 opacity-50"
                    : "bg-slate-800 border-slate-700 hover:border-emerald-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  {showFeedback && isCorrect && <CheckCircle size={18} className="text-emerald-400" />}
                  {showFeedback && isSelected && !isCorrect && <XCircle size={18} className="text-rose-400" />}
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        {showFeedback && (
          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold transition-colors"
          >
            {currentIdx + 1 >= questions.length ? "Voir le résultat" : "Question suivante"}
          </button>
        )}
      </div>
    );
  }

  // --- RESULT ---
  if (mode === "result") {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);

    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 gap-6">
        <Trophy size={56} className={pct >= 70 ? "text-amber-400" : "text-slate-500"} />
        <h2 className="text-3xl font-extrabold">Quiz terminé !</h2>
        <div className="text-center">
          <p className="text-5xl font-bold text-emerald-400">
            {score}/{total}
          </p>
          <p className="text-slate-400 mt-2">{pct}% de réussite</p>
          <p className="text-sm text-slate-500 mt-1">+{score * 10} XP</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setMode("menu")}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition-colors"
          >
            Menu principal
          </button>
          <button
            onClick={() => {
              if (selectedTheme !== null) {
                startQuiz(selectedTheme);
              } else {
                startMixedQuiz();
              }
            }}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold transition-colors"
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return null;
}
