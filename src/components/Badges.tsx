import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, Brain, Trophy, Star, Target, BookOpen, Zap, Award } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { getStats, getRetentionRate } from "@/db/queries";

interface Badge {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
}

export function Badges() {
  const { streak, xp, dailyGoal } = useLearnStore();
  const [stats, setStats] = useState({ totalCards: 0, dueCards: 0, reviewedToday: 0 });
  const [retention, setRetention] = useState({ retention: 0, totalReviews: 0, againCount: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [s, r] = await Promise.all([getStats(), getRetentionRate()]);
        setStats(s);
        setRetention(r);
      } catch {
        // ignore
      }
    }
    load();
  }, []);

  const badges: Badge[] = [
    {
      id: "first-card",
      label: "Premier mot",
      description: "Ajouter ton premier mot",
      icon: <BookOpen size={24} />,
      color: "text-sky-400",
      unlocked: stats.totalCards >= 1,
    },
    {
      id: "ten-cards",
      label: "Collectionneur",
      description: "Posséder 10 cartes",
      icon: <BookOpen size={24} />,
      color: "text-sky-400",
      unlocked: stats.totalCards >= 10,
    },
    {
      id: "fifty-cards",
      label: "Bibliothécaire",
      description: "Posséder 50 cartes",
      icon: <BookOpen size={24} />,
      color: "text-indigo-400",
      unlocked: stats.totalCards >= 50,
    },
    {
      id: "streak-3",
      label: "Régulier",
      description: "3 jours de série",
      icon: <Flame size={24} />,
      color: "text-orange-400",
      unlocked: streak >= 3,
    },
    {
      id: "streak-7",
      label: "Assidu",
      description: "7 jours de série",
      icon: <Flame size={24} />,
      color: "text-orange-400",
      unlocked: streak >= 7,
    },
    {
      id: "streak-30",
      label: "Inébranlable",
      description: "30 jours de série",
      icon: <Flame size={24} />,
      color: "text-rose-400",
      unlocked: streak >= 30,
    },
    {
      id: "daily-goal",
      label: "Objectif atteint",
      description: "Atteindre ton objectif XP",
      icon: <Target size={24} />,
      color: "text-emerald-400",
      unlocked: xp >= dailyGoal,
    },
    {
      id: "review-50",
      label: "Apprenti",
      description: "50 révisions au total",
      icon: <Brain size={24} />,
      color: "text-violet-400",
      unlocked: retention.totalReviews >= 50,
    },
    {
      id: "review-200",
      label: "Étudiant",
      description: "200 révisions au total",
      icon: <Brain size={24} />,
      color: "text-violet-400",
      unlocked: retention.totalReviews >= 200,
    },
    {
      id: "retention-80",
      label: "Mémoire d'éléphant",
      description: "Taux de rétention ≥ 80%",
      icon: <Trophy size={24} />,
      color: "text-amber-400",
      unlocked: retention.retention >= 80,
    },
    {
      id: "xp-100",
      label: "Centurion",
      description: "100 XP cumulés",
      icon: <Zap size={24} />,
      color: "text-yellow-400",
      unlocked: xp >= 100,
    },
    {
      id: "xp-500",
      label: "Maître XP",
      description: "500 XP cumulés",
      icon: <Award size={24} />,
      color: "text-yellow-400",
      unlocked: xp >= 500,
    },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star size={20} className="text-amber-400" />
          <h2 className="font-bold">Badges</h2>
        </div>
        <span className="text-sm text-slate-400">{unlockedCount} / {badges.length}</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
              badge.unlocked
                ? "bg-slate-700/50 border-slate-600"
                : "bg-slate-900/50 border-slate-800 opacity-40"
            }`}
            title={badge.description}
          >
            <div className={badge.unlocked ? badge.color : "text-slate-600"}>
              {badge.icon}
            </div>
            <p className="text-xs font-medium mt-2 text-slate-300">{badge.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
