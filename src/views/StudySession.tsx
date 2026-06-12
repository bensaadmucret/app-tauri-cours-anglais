import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, Check, RotateCcw, Zap, Trophy, Mic, MicOff } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { Flashcard } from "@/components/game/Flashcard";
import { ShadowingMic } from "@/components/game/ShadowingMic";
import { DailyProgress } from "@/components/game/DailyProgress";
import { updateCardFsrs, insertReviewLog } from "@/db/queries";
import { rateCard, Rating } from "@/services/fsrs/scheduler";

export function StudySession() {
  const { setView, currentCard, nextCard, addXp, xp, dailyGoal, sessionComplete } =
    useLearnStore();
  const [shake, setShake] = useState(false);
  const [showShadowing, setShowShadowing] = useState(true);

  const handleRate = useCallback(
    async (rating: Rating) => {
      if (!currentCard) return;

      const { updated, log } = rateCard(currentCard, rating);
      await updateCardFsrs(currentCard.id, updated);
      await insertReviewLog(log);

      if (rating === Rating.Again) {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }

      addXp(rating === Rating.Easy ? 15 : rating === Rating.Good ? 10 : rating === Rating.Hard ? 5 : 1);
      nextCard();
    },
    [currentCard, nextCard, addXp]
  );

  if (sessionComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="bg-slate-800 rounded-3xl p-10 flex flex-col items-center border border-slate-700 shadow-2xl"
        >
          <Trophy size={64} className="text-amber-400 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Session terminée !</h2>
          <p className="text-slate-400 mb-6">
            Vous avez gagné <span className="text-emerald-400 font-bold">{xp}</span> XP aujourd'hui.
          </p>
          <DailyProgress xp={xp} goal={dailyGoal} />
          <button
            onClick={() => setView("dashboard")}
            className="mt-8 px-6 py-3 bg-sky-500 hover:bg-sky-400 rounded-xl font-semibold shadow-lg transition-colors"
          >
            Retour au tableau de bord
          </button>
        </motion.div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Aucune carte à réviser</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setView("dashboard")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Quitter
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowShadowing((s) => !s)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showShadowing
                ? "bg-sky-500/20 text-sky-400 hover:bg-sky-500/30"
                : "bg-slate-700 text-slate-400 hover:bg-slate-600"
            }`}
          >
            {showShadowing ? <Mic size={16} /> : <MicOff size={16} />}
            Shadowing
          </button>
          <DailyProgress xp={xp} goal={dailyGoal} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentCard.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 flex flex-col items-center justify-center gap-8 ${shake ? "animate-shake" : ""}`}
        >
          <Flashcard card={currentCard} />

          {showShadowing && (
            <ShadowingMic
              targetWord={currentCard.word}
              onResult={(t) => console.log("shadowing:", t)}
            />
          )}

          <div className="flex gap-3 w-full max-w-md">
            <RateButton
              label="Again"
              color="bg-rose-600 hover:bg-rose-500"
              onClick={() => handleRate(Rating.Again)}
              icon={<X size={18} />}
            />
            <RateButton
              label="Hard"
              color="bg-amber-600 hover:bg-amber-500"
              onClick={() => handleRate(Rating.Hard)}
              icon={<RotateCcw size={18} />}
            />
            <RateButton
              label="Good"
              color="bg-sky-600 hover:bg-sky-500"
              onClick={() => handleRate(Rating.Good)}
              icon={<Check size={18} />}
            />
            <RateButton
              label="Easy"
              color="bg-emerald-600 hover:bg-emerald-500"
              onClick={() => handleRate(Rating.Easy)}
              icon={<Zap size={18} />}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function RateButton({
  label,
  color,
  onClick,
  icon,
}: {
  label: string;
  color: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl font-semibold text-white shadow transition-colors ${color}`}
    >
      {icon}
      <span className="text-xs uppercase tracking-wide">{label}</span>
    </motion.button>
  );
}
