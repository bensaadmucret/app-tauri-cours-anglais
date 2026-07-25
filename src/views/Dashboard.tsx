import { motion } from "framer-motion";
import { BookOpen, Brain, Flame, Zap } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { getDueCards, getAllCards } from "@/db/queries";
import { useStats } from "@/hooks/useQueries";
import { DailyProgress } from "@/components/game/DailyProgress";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

export function Dashboard() {
  const { setView, xp, dailyGoal, setSessionCards, resetSession, streak, setCramMode } = useLearnStore();
  const { data: stats, isLoading } = useStats();

  async function startStudy() {
    resetSession();
    const cards = await getDueCards();
    setSessionCards(cards);
    setView("study");
  }

  async function startCram() {
    resetSession();
    setCramMode(true);
    const cards = await getAllCards();
    setSessionCards(cards);
    setView("study");
  }

  if (isLoading) return <LoadingSpinner />;

  const dueCount = stats?.dueCards ?? 0;
  const totalCards = stats?.totalCards ?? 0;
  const reviewedToday = stats?.reviewedToday ?? 0;

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-6 gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
          Mon App Anglais
        </h1>
        <p className="text-slate-400 mt-2">Apprends l'anglais comme un jeu</p>
      </motion.div>

      <DailyProgress xp={xp + reviewedToday} goal={dailyGoal} />

      {streak > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 rounded-xl border border-orange-500/30"
        >
          <Flame size={20} className="text-orange-400" />
          <span className="text-orange-400 font-bold">{streak} jour{streak > 1 ? "s" : ""} de série !</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
      >
        <StatCard
          icon={<Brain size={24} />}
          label="Cartes à réviser"
          value={dueCount}
          color="text-rose-400"
        />
        <StatCard
          icon={<BookOpen size={24} />}
          label="Total cartes"
          value={totalCards}
          color="text-sky-400"
        />
        <StatCard
          icon={<BookOpen size={24} />}
          label="Révisées auj."
          value={reviewedToday}
          color="text-emerald-400"
        />
      </motion.div>

      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startStudy}
          disabled={dueCount === 0}
          className="flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl font-semibold shadow-lg transition-colors"
        >
          <Brain size={20} />
          {dueCount === 0 ? "Aucune carte à réviser" : "Commencer la session"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startCram}
          disabled={totalCards === 0}
          className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-xl font-semibold shadow-lg transition-colors"
        >
          <Zap size={20} />
          Mode Cram
        </motion.button>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex flex-col items-center border border-slate-700 shadow">
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-slate-400 text-sm">{label}</p>
    </div>
  );
}
