import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Shuffle, Trophy, CheckCircle, XCircle } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useAllCards, useIrregularVerbs, usePhrasalVerbs } from "@/hooks/useQueries";
import { useSoundFeedback } from "@/hooks/useSoundFeedback";

interface MatchPair {
  id: number;
  en: string;
  fr: string;
}

type Mode = "menu" | "playing" | "result";

export function WordMatching() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);
  const { play } = useSoundFeedback();

  const { data: cards = [], isLoading: cardsLoading } = useAllCards();
  const { data: verbs = [], isLoading: verbsLoading } = useIrregularVerbs();
  const { data: phrasal = [], isLoading: phrasalLoading } = usePhrasalVerbs();
  const loading = cardsLoading || verbsLoading || phrasalLoading;

  const [mode, setMode] = useState<Mode>("menu");
  const [pairs, setPairs] = useState<MatchPair[]>([]);
  const [selectedEn, setSelectedEn] = useState<number | null>(null);
  const [selectedFr, setSelectedFr] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);

  const source = useMemo(() => {
    const fromCards: MatchPair[] = cards
      .filter((c) => c.translation_fr)
      .slice(0, 20)
      .map((c) => ({ id: c.id, en: c.word, fr: c.translation_fr! }));
    const fromVerbs: MatchPair[] = verbs.slice(0, 20).map((v) => ({
      id: 1000 + v.id,
      en: v.base,
      fr: v.meaning,
    }));
    const fromPhrasal: MatchPair[] = phrasal.slice(0, 20).map((v) => ({
      id: 2000 + v.id,
      en: `${v.verb} ${v.particle}`,
      fr: v.meaning,
    }));
    return [...fromCards, ...fromVerbs, ...fromPhrasal];
  }, [cards, verbs, phrasal]);

  const startGame = useCallback(() => {
    const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, 8);
    setPairs(shuffled);
    setMatched(new Set());
    setSelectedEn(null);
    setSelectedFr(null);
    setWrongPair(null);
    setScore(0);
    setMode("playing");
  }, [source]);

  const frShuffled = useMemo(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  }, [pairs]);

  function handleSelectEn(id: number) {
    if (matched.has(id)) return;
    setSelectedEn(id);
    if (selectedFr !== null) checkMatch(id, selectedFr);
  }

  function handleSelectFr(id: number) {
    if (matched.has(id)) return;
    setSelectedFr(id);
    if (selectedEn !== null) checkMatch(selectedEn, id);
  }

  function checkMatch(enId: number, frId: number) {
    if (enId === frId) {
      const newMatched = new Set(matched);
      newMatched.add(enId);
      setMatched(newMatched);
      setScore((s) => s + 10);
      addXp(2);
      play("success");
      setSelectedEn(null);
      setSelectedFr(null);
      if (newMatched.size === pairs.length) {
        setMode("result");
      }
    } else {
      setWrongPair([enId, frId]);
      play("error");
      setTimeout(() => {
        setWrongPair(null);
        setSelectedEn(null);
        setSelectedFr(null);
      }, 800);
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
        <Shuffle size={48} className="text-emerald-400" />
        <h1 className="text-3xl font-bold">Association de mots</h1>
        <p className="text-slate-400 text-center max-w-md">
          Associez chaque mot anglais à sa traduction française. {loading ? "Chargement..." : `${source.length} paires disponibles.`}
        </p>
        <button
          onClick={startGame}
          disabled={loading || source.length < 4}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 rounded-xl font-semibold transition-colors"
        >
          Commencer
        </button>
        {source.length < 4 && (
          <p className="text-slate-500 text-sm">Ajoutez plus de mots ou verbes pour jouer.</p>
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
          <h2 className="text-2xl font-bold mb-2">Bravo !</h2>
          <p className="text-slate-400">Score : <span className="text-emerald-400 font-bold">{score}</span></p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={startGame}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold transition-colors"
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

  return (
    <div className="min-h-full p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setView("dashboard")}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Association</h1>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-emerald-400 font-bold">{score} pts</span>
          <span className="text-slate-400 text-sm">{matched.size}/{pairs.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-400 mb-2">Anglais</h2>
          {pairs.map((p) => {
            const isMatched = matched.has(p.id);
            const isSelected = selectedEn === p.id;
            const isWrong = wrongPair?.[0] === p.id;
            return (
              <motion.button
                key={`en-${p.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : undefined}
                whileTap={!isMatched ? { scale: 0.98 } : undefined}
                onClick={() => handleSelectEn(p.id)}
                disabled={isMatched}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  isMatched
                    ? "bg-emerald-600/20 border-emerald-600 text-slate-500 line-through"
                    : isWrong
                    ? "bg-rose-600/20 border-rose-600"
                    : isSelected
                    ? "bg-sky-600/20 border-sky-500"
                    : "bg-slate-800 border-slate-700 hover:border-slate-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isMatched && <CheckCircle size={16} className="text-emerald-400" />}
                  {isWrong && <XCircle size={16} className="text-rose-400" />}
                  <span className="font-medium">{p.en}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-400 mb-2">Français</h2>
          {frShuffled.map((p) => {
            const isMatched = matched.has(p.id);
            const isSelected = selectedFr === p.id;
            const isWrong = wrongPair?.[1] === p.id;
            return (
              <motion.button
                key={`fr-${p.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : undefined}
                whileTap={!isMatched ? { scale: 0.98 } : undefined}
                onClick={() => handleSelectFr(p.id)}
                disabled={isMatched}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  isMatched
                    ? "bg-emerald-600/20 border-emerald-600 text-slate-500 line-through"
                    : isWrong
                    ? "bg-rose-600/20 border-rose-600"
                    : isSelected
                    ? "bg-sky-600/20 border-sky-500"
                    : "bg-slate-800 border-slate-700 hover:border-slate-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isMatched && <CheckCircle size={16} className="text-emerald-400" />}
                  {isWrong && <XCircle size={16} className="text-rose-400" />}
                  <span className="font-medium">{p.fr}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
