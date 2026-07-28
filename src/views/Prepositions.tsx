import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Link2, Trophy, CheckCircle, XCircle } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useSoundFeedback } from "@/hooks/useSoundFeedback";

interface PrepQuestion {
  sentence: string;
  answer: string;
  options: string[];
  explanation: string;
}

type Mode = "menu" | "playing" | "result";

const PREP_DATA: { sentence: string; answer: string; distractors: string[]; explanation: string }[] = [
  { sentence: "I depend ___ my parents.", answer: "on", distractors: ["of", "from", "in"], explanation: "depend on = dépendre de" },
  { sentence: "She is interested ___ art.", answer: "in", distractors: ["by", "at", "for"], explanation: "interested in = intéressé par" },
  { sentence: "He is afraid ___ spiders.", answer: "of", distractors: ["by", "from", "with"], explanation: "afraid of = avoir peur de" },
  { sentence: "We arrived ___ the airport.", answer: "at", distractors: ["in", "to", "on"], explanation: "arrive at + lieu précis" },
  { sentence: "They arrived ___ Paris.", answer: "in", distractors: ["at", "to", "on"], explanation: "arrive in + ville/pays" },
  { sentence: "I listen ___ music every day.", answer: "to", distractors: ["at", "in", "on"], explanation: "listen to = écouter" },
  { sentence: "She is married ___ a doctor.", answer: "to", distractors: ["with", "by", "for"], explanation: "married to = marié(e) à" },
  { sentence: "He is good ___ math.", answer: "at", distractors: ["in", "for", "with"], explanation: "good at = doué pour" },
  { sentence: "I am tired ___ working.", answer: "of", distractors: ["from", "with", "by"], explanation: "tired of = fatigué de" },
  { sentence: "She is waiting ___ the bus.", answer: "for", distractors: ["at", "on", "to"], explanation: "wait for = attendre" },
  { sentence: "He is looking ___ his keys.", answer: "for", distractors: ["at", "after", "to"], explanation: "look for = chercher" },
  { sentence: "I am thinking ___ you.", answer: "about", distractors: ["of", "to", "at"], explanation: "think about = penser à" },
  { sentence: "She suffers ___ migraines.", answer: "from", distractors: ["of", "with", "by"], explanation: "suffer from = souffrir de" },
  { sentence: "He is responsible ___ the project.", answer: "for", distractors: ["of", "with", "in"], explanation: "responsible for = responsable de" },
  { sentence: "I agree ___ you.", answer: "with", distractors: ["to", "on", "for"], explanation: "agree with = être d'accord avec" },
  { sentence: "She is proud ___ her son.", answer: "of", distractors: ["for", "with", "about"], explanation: "proud of = fier de" },
  { sentence: "He is jealous ___ his brother.", answer: "of", distractors: ["from", "with", "about"], explanation: "jealous of = jaloux de" },
  { sentence: "I am capable ___ doing it.", answer: "of", distractors: ["to", "for", "in"], explanation: "capable of = capable de" },
  { sentence: "She is fond ___ chocolate.", answer: "of", distractors: ["for", "with", "about"], explanation: "fond of = friand de" },
  { sentence: "He is different ___ his sister.", answer: "from", distractors: ["of", "with", "to"], explanation: "different from = différent de" },
  { sentence: "I am angry ___ him.", answer: "with", distractors: ["at", "on", "against"], explanation: "angry with = en colère contre" },
  { sentence: "She is worried ___ her exam.", answer: "about", distractors: ["for", "with", "of"], explanation: "worried about = inquiet pour" },
  { sentence: "He apologised ___ being late.", answer: "for", distractors: ["of", "about", "to"], explanation: "apologise for = s'excuser pour" },
  { sentence: "I belong ___ this club.", answer: "to", distractors: ["in", "at", "with"], explanation: "belong to = appartenir à" },
  { sentence: "She is used ___ getting up early.", answer: "to", distractors: ["at", "for", "in"], explanation: "used to + ing = avoir l'habitude de" },
  { sentence: "He is famous ___ his paintings.", answer: "for", distractors: ["of", "by", "with"], explanation: "famous for = célèbre pour" },
  { sentence: "I am fed up ___ waiting.", answer: "with", distractors: ["of", "for", "about"], explanation: "fed up with = en avoir marre de" },
  { sentence: "She insists ___ coming with us.", answer: "on", distractors: ["for", "to", "about"], explanation: "insist on = insister pour" },
  { sentence: "He is similar ___ his father.", answer: "to", distractors: ["with", "as", "like"], explanation: "similar to = similaire à" },
  { sentence: "I object ___ this proposal.", answer: "to", distractors: ["against", "for", "with"], explanation: "object to = s'opposer à" },
  { sentence: "She is aware ___ the problem.", answer: "of", distractors: ["about", "with", "on"], explanation: "aware of = conscient de" },
  { sentence: "He is full ___ energy.", answer: "of", distractors: ["with", "from", "by"], explanation: "full of = plein de" },
  { sentence: "I am short ___ money.", answer: "of", distractors: ["on", "with", "in"], explanation: "short of = à court de" },
  { sentence: "She is tired ___ her job.", answer: "of", distractors: ["from", "with", "about"], explanation: "tired of = lassé de" },
  { sentence: "He is ashamed ___ his behavior.", answer: "of", distractors: ["for", "with", "about"], explanation: "ashamed of = avoir honte de" },
  { sentence: "I am satisfied ___ the results.", answer: "with", distractors: ["of", "for", "about"], explanation: "satisfied with = satisfait de" },
];

export function Prepositions() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { play } = useSoundFeedback();

  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<PrepQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const startQuiz = useCallback(() => {
    const shuffled = [...PREP_DATA].sort(() => Math.random() - 0.5).slice(0, 15);
    const qs: PrepQuestion[] = shuffled.map((d) => ({
      sentence: d.sentence,
      answer: d.answer,
      options: [...d.distractors, d.answer].sort(() => Math.random() - 0.5),
      explanation: d.explanation,
    }));
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setStreak(0);
    setMode("playing");
  }, []);

  function handleAnswer(option: string) {
    if (showFeedback) return;
    setSelected(option);
    setShowFeedback(true);
    const correct = option === questions[currentIdx].answer;
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

  if (mode === "menu") {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-6 gap-6">
        <button
          onClick={() => setView("dashboard")}
          className="absolute top-4 left-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <Link2 size={48} className="text-teal-400" />
        <h1 className="text-3xl font-bold">Prépositions</h1>
        <p className="text-slate-400 text-center max-w-md">
          Maîtrisez les prépositions en anglais — une difficulté classique pour les francophones. {PREP_DATA.length} questions disponibles.
        </p>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-semibold transition-colors"
        >
          Commencer
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
          <p className="text-slate-400">Score : <span className="text-teal-400 font-bold">{score}</span></p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={startQuiz}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 rounded-xl font-semibold transition-colors"
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
        <h1 className="text-xl font-bold">Prépositions</h1>
        <div className="ml-auto flex items-center gap-4">
          {streak > 1 && <span className="text-orange-400 text-sm font-bold">{streak}x</span>}
          <span className="text-teal-400 font-bold">{score}</span>
          <span className="text-slate-400 text-sm">{currentIdx + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <p className="text-lg font-medium">{q.sentence}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {q.options.map((option) => {
          const isCorrect = option === q.answer;
          const isSelected = selected === option;
          return (
            <motion.button
              key={option}
              whileHover={!showFeedback ? { scale: 1.02 } : undefined}
              whileTap={!showFeedback ? { scale: 0.98 } : undefined}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`px-5 py-4 rounded-xl border font-medium transition-all ${
                showFeedback
                  ? isCorrect
                    ? "bg-emerald-600/20 border-emerald-600"
                    : isSelected
                    ? "bg-rose-600/20 border-rose-600"
                    : "bg-slate-800 border-slate-700 opacity-50"
                  : "bg-slate-800 border-slate-700 hover:border-teal-500"
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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl p-4 bg-slate-800/50 border border-slate-700"
        >
          <p className="text-sm text-slate-400">{q.explanation}</p>
        </motion.div>
      )}

      {showFeedback && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={nextQuestion}
          className="w-full mt-4 px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-xl font-semibold transition-colors"
        >
          {currentIdx + 1 < questions.length ? "Suivant" : "Voir le résultat"}
        </motion.button>
      )}
    </div>
  );
}
