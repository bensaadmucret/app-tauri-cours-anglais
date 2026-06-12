import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, Brain, List, Shuffle } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { getDueCards, getStats } from "@/db/queries";
import { DailyProgress } from "@/components/game/DailyProgress";

export function Dashboard() {
  const { setView, xp, dailyGoal, setSessionCards, resetSession } = useLearnStore();
  const [dueCount, setDueCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [reviewedToday, setReviewedToday] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const stats = await getStats();
        setTotalCards(stats.totalCards);
        setReviewedToday(stats.reviewedToday);

        const due = await getDueCards();
        setDueCount(due.length);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function startStudy() {
    resetSession();
    const cards = await getDueCards();
    setSessionCards(cards);
    setView("study");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
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

      {loading ? (
        <p className="text-slate-500">Chargement...</p>
      ) : (
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
      )}

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
          onClick={() => setView("builder")}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-semibold shadow-lg transition-colors"
        >
          <Plus size={20} />
          Ajouter un mot
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("verbs")}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold shadow-lg transition-colors"
        >
          <List size={20} />
          Verbes irréguliers
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView("phrasal")}
          className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-semibold shadow-lg transition-colors"
        >
          <Shuffle size={20} />
          Phrasal Verbs
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
