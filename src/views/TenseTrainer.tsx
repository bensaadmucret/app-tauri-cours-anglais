import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Trophy, CheckCircle, XCircle } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useSoundFeedback } from "@/hooks/useSoundFeedback";

interface TenseQuestion {
  verb: string;
  tense: string;
  sentence: string;
  answer: string;
  options: string[];
}

type Mode = "menu" | "playing" | "result";

const TENSE_DATA: { verb: string; tense: string; sentence: string; answer: string; distractors: string[] }[] = [
  { verb: "go", tense: "Past Simple", sentence: "I ___ to school yesterday.", answer: "went", distractors: ["go", "gone", "going"] },
  { verb: "go", tense: "Present Perfect", sentence: "She has ___ to Paris.", answer: "gone", distractors: ["went", "go", "going"] },
  { verb: "go", tense: "Present Simple", sentence: "They ___ to work every day.", answer: "go", distractors: ["goes", "went", "going"] },
  { verb: "go", tense: "Present Continuous", sentence: "We are ___ to the cinema.", answer: "going", distractors: ["go", "gone", "went"] },
  { verb: "eat", tense: "Past Simple", sentence: "He ___ a pizza last night.", answer: "ate", distractors: ["eat", "eaten", "eating"] },
  { verb: "eat", tense: "Present Perfect", sentence: "I have ___ all the cake.", answer: "eaten", distractors: ["ate", "eat", "eating"] },
  { verb: "eat", tense: "Present Simple", sentence: "She ___ sushi on Fridays.", answer: "eats", distractors: ["eat", "ate", "eating"] },
  { verb: "see", tense: "Past Simple", sentence: "I ___ a movie yesterday.", answer: "saw", distractors: ["see", "seen", "seeing"] },
  { verb: "see", tense: "Present Perfect", sentence: "Have you ___ the new film?", answer: "seen", distractors: ["saw", "see", "seeing"] },
  { verb: "take", tense: "Past Simple", sentence: "He ___ a taxi last night.", answer: "took", distractors: ["take", "taken", "taking"] },
  { verb: "take", tense: "Present Perfect", sentence: "She has ___ the bus.", answer: "taken", distractors: ["took", "take", "taking"] },
  { verb: "write", tense: "Past Simple", sentence: "I ___ a letter yesterday.", answer: "wrote", distractors: ["write", "written", "writing"] },
  { verb: "write", tense: "Present Perfect", sentence: "He has ___ three books.", answer: "written", distractors: ["wrote", "write", "writing"] },
  { verb: "speak", tense: "Past Simple", sentence: "She ___ to me yesterday.", answer: "spoke", distractors: ["speak", "spoken", "speaking"] },
  { verb: "speak", tense: "Present Perfect", sentence: "They have ___ about it.", answer: "spoken", distractors: ["spoke", "speak", "speaking"] },
  { verb: "break", tense: "Past Simple", sentence: "He ___ the window.", answer: "broke", distractors: ["break", "broken", "breaking"] },
  { verb: "break", tense: "Present Perfect", sentence: "The vase has been ___.", answer: "broken", distractors: ["broke", "break", "breaking"] },
  { verb: "drink", tense: "Past Simple", sentence: "I ___ all the juice.", answer: "drank", distractors: ["drink", "drunk", "drinking"] },
  { verb: "drink", tense: "Present Perfect", sentence: "She has ___ the tea.", answer: "drunk", distractors: ["drank", "drink", "drinking"] },
  { verb: "begin", tense: "Past Simple", sentence: "The movie ___ at 8pm.", answer: "began", distractors: ["begin", "begun", "beginning"] },
  { verb: "begin", tense: "Present Perfect", sentence: "It has ___ to rain.", answer: "begun", distractors: ["began", "begin", "beginning"] },
  { verb: "drive", tense: "Past Simple", sentence: "He ___ to London.", answer: "drove", distractors: ["drive", "driven", "driving"] },
  { verb: "drive", tense: "Present Perfect", sentence: "She has ___ a Ferrari.", answer: "driven", distractors: ["drove", "drive", "driving"] },
  { verb: "fly", tense: "Past Simple", sentence: "They ___ to New York.", answer: "flew", distractors: ["fly", "flown", "flying"] },
  { verb: "fly", tense: "Present Perfect", sentence: "I have never ___.", answer: "flown", distractors: ["flew", "fly", "flying"] },
  { verb: "swim", tense: "Past Simple", sentence: "We ___ in the sea.", answer: "swam", distractors: ["swim", "swum", "swimming"] },
  { verb: "swim", tense: "Present Perfect", sentence: "He has ___ 10 km.", answer: "swum", distractors: ["swam", "swim", "swimming"] },
  { verb: "wear", tense: "Past Simple", sentence: "She ___ a red dress.", answer: "wore", distractors: ["wear", "worn", "wearing"] },
  { verb: "wear", tense: "Present Perfect", sentence: "I have ___ this coat for years.", answer: "worn", distractors: ["wore", "wear", "wearing"] },
  { verb: "teach", tense: "Past Simple", sentence: "He ___ us English.", answer: "taught", distractors: ["teach", "taught", "teaching"] },
  { verb: "teach", tense: "Present Perfect", sentence: "She has ___ for 20 years.", answer: "taught", distractors: ["teach", "teaching", "teaches"] },
  { verb: "think", tense: "Past Simple", sentence: "I ___ about it.", answer: "thought", distractors: ["think", "thinking", "thinks"] },
  { verb: "think", tense: "Present Perfect", sentence: "She has ___ about it.", answer: "thought", distractors: ["think", "thinking", "thinks"] },
  { verb: "catch", tense: "Past Simple", sentence: "He ___ the ball.", answer: "caught", distractors: ["catch", "catching", "catches"] },
  { verb: "catch", tense: "Present Perfect", sentence: "I have ___ a cold.", answer: "caught", distractors: ["catch", "catching", "catches"] },
  { verb: "choose", tense: "Past Simple", sentence: "She ___ the blue one.", answer: "chose", distractors: ["choose", "chosen", "choosing"] },
  { verb: "choose", tense: "Present Perfect", sentence: "He has ___ wisely.", answer: "chosen", distractors: ["chose", "choose", "choosing"] },
  { verb: "forget", tense: "Past Simple", sentence: "I ___ my keys.", answer: "forgot", distractors: ["forget", "forgotten", "forgetting"] },
  { verb: "forget", tense: "Present Perfect", sentence: "She has ___ the password.", answer: "forgotten", distractors: ["forgot", "forget", "forgetting"] },
  { verb: "give", tense: "Past Simple", sentence: "He ___ me a gift.", answer: "gave", distractors: ["give", "given", "giving"] },
  { verb: "give", tense: "Present Perfect", sentence: "I have ___ him advice.", answer: "given", distractors: ["gave", "give", "giving"] },
];

export function TenseTrainer() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { play } = useSoundFeedback();

  const [mode, setMode] = useState<Mode>("menu");
  const [questions, setQuestions] = useState<TenseQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [tenseFilter, setTenseFilter] = useState<string>("all");

  const availableTenses = useMemo(() => {
    const tenses = new Set(TENSE_DATA.map((d) => d.tense));
    return Array.from(tenses).sort();
  }, []);

  const filteredData = useMemo(() => {
    if (tenseFilter === "all") return TENSE_DATA;
    return TENSE_DATA.filter((d) => d.tense === tenseFilter);
  }, [tenseFilter]);

  const startQuiz = useCallback(() => {
    const shuffled = [...filteredData].sort(() => Math.random() - 0.5).slice(0, 15);
    const qs: TenseQuestion[] = shuffled.map((d) => ({
      verb: d.verb,
      tense: d.tense,
      sentence: d.sentence,
      answer: d.answer,
      options: [...d.distractors, d.answer].sort(() => Math.random() - 0.5),
    }));
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setShowFeedback(false);
    setScore(0);
    setStreak(0);
    setMode("playing");
  }, [filteredData]);

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
        <Clock size={48} className="text-indigo-400" />
        <h1 className="text-3xl font-bold">Conjugaison</h1>
        <p className="text-slate-400 text-center max-w-md">
          Conjuguez les verbes au bon temps. Past Simple, Present Perfect, Present Simple et plus.
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setTenseFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tenseFilter === "all" ? "bg-indigo-600" : "bg-slate-800 hover:bg-slate-700"}`}
          >
            Tous
          </button>
          {availableTenses.map((t) => (
            <button
              key={t}
              onClick={() => setTenseFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tenseFilter === t ? "bg-indigo-600" : "bg-slate-800 hover:bg-slate-700"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          onClick={startQuiz}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
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
          <p className="text-slate-400">Score : <span className="text-indigo-400 font-bold">{score}</span></p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={startQuiz}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
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
        <h1 className="text-xl font-bold">Conjugaison</h1>
        <div className="ml-auto flex items-center gap-4">
          {streak > 1 && <span className="text-orange-400 text-sm font-bold">{streak}x</span>}
          <span className="text-indigo-400 font-bold">{score}</span>
          <span className="text-slate-400 text-sm">{currentIdx + 1}/{questions.length}</span>
        </div>
      </div>

      <div key={currentIdx} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <span className="text-xs font-bold uppercase text-indigo-400 mb-2 block">{q.tense} — "{q.verb}"</span>
        <p className="text-lg font-medium">{q.sentence}</p>
      </div>

      <div key={`opts-${currentIdx}`} className="grid grid-cols-2 gap-3">
        {q.options.map((option) => {
          const isCorrect = option === q.answer;
          const isSelected = selected === option;
          return (
            <button
              key={`${currentIdx}-${option}`}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              className={`px-5 py-4 rounded-xl border font-medium transition-all ${
                showFeedback
                  ? isCorrect
                    ? "bg-emerald-600/20 border-emerald-600"
                    : isSelected
                    ? "bg-rose-600/20 border-rose-600"
                    : "bg-slate-800 border-slate-700 opacity-50"
                  : "bg-slate-800 border-slate-700 hover:border-indigo-500"
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

      {showFeedback && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={nextQuestion}
          className="w-full mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-colors"
        >
          {currentIdx + 1 < questions.length ? "Suivant" : "Voir le résultat"}
        </motion.button>
      )}
    </div>
  );
}
