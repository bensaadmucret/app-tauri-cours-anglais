import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Flame, Brain, BookOpen, CheckCircle } from "lucide-react";
import { getStats, getReviewHistory, getRetentionRate, getActivityHeatmap } from "@/db/queries";
import { useLearnStore } from "@/store/useLearnStore";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { Badges } from "@/components/Badges";

export function Stats() {
  const streak = useLearnStore((s) => s.streak);
  const xp = useLearnStore((s) => s.xp);
  const dailyGoal = useLearnStore((s) => s.dailyGoal);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({ totalCards: 0, dueCards: 0, reviewedToday: 0 });
  const [history, setHistory] = useState<{ date: string; count: number; avg_rating: number }[]>([]);
  const [retention, setRetention] = useState({ retention: 0, totalReviews: 0, againCount: 0 });
  const [heatmap, setHeatmap] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [s, h, r, hm] = await Promise.all([
          getStats(),
          getReviewHistory(30),
          getRetentionRate(),
          getActivityHeatmap(84),
        ]);
        setStats(s);
        setHistory(h);
        setRetention(r);
        setHeatmap(hm);
      } catch (e: any) {
        setError(e?.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const maxCount = Math.max(...history.map((h) => h.count), 1);

  return (
    <div className="min-h-full p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BarChart3 size={28} className="text-violet-400" />
        <h1 className="text-2xl font-bold">Statistiques</h1>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatBox icon={<Flame size={20} />} label="Série" value={`${streak}j`} color="text-orange-400" />
        <StatBox icon={<Target size={20} />} label="XP aujourd'hui" value={`${xp}`} color="text-emerald-400" />
        <StatBox icon={<Brain size={20} />} label="Rétention" value={`${retention.retention}%`} color="text-sky-400" />
        <StatBox icon={<BookOpen size={20} />} label="Total cartes" value={`${stats.totalCards}`} color="text-violet-400" />
      </div>

      {/* Review history chart */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-sky-400" />
          <h2 className="font-bold">Révisions (30 derniers jours)</h2>
        </div>
        {history.length === 0 ? (
          <p className="text-slate-500 text-center py-8">Aucune révision pour le moment</p>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {history.map((h) => (
              <div
                key={h.date}
                className="flex-1 flex flex-col items-center gap-1 group relative"
              >
                <div
                  className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded-t transition-all hover:from-sky-500 hover:to-sky-300"
                  style={{ height: `${(h.count / maxCount) * 100}%`, minHeight: "4px" }}
                />
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 bg-slate-900 text-xs px-2 py-1 rounded pointer-events-none whitespace-nowrap transition-opacity">
                  {h.date}: {h.count}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity heatmap */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
        <h2 className="font-bold mb-4">Activité (12 dernières semaines)</h2>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 84 }, (_, i) => {
            const d = new Date(Date.now() - (83 - i) * 86400000);
            const dateStr = d.toISOString().slice(0, 10);
            const entry = heatmap.find((h) => h.date === dateStr);
            const count = entry?.count ?? 0;
            const intensity = count === 0 ? 0 : Math.min(Math.ceil(count / 5), 4);
            const colors = ["bg-slate-700", "bg-emerald-900", "bg-emerald-700", "bg-emerald-500", "bg-emerald-400"];
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm ${colors[intensity]} hover:ring-2 hover:ring-sky-400 transition-all`}
                title={`${dateStr}: ${count} révision${count > 1 ? "s" : ""}`}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
          <span>Moins</span>
          <div className="w-3 h-3 rounded-sm bg-slate-700" />
          <div className="w-3 h-3 rounded-sm bg-emerald-900" />
          <div className="w-3 h-3 rounded-sm bg-emerald-700" />
          <div className="w-3 h-3 rounded-sm bg-emerald-500" />
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          <span>Plus</span>
        </div>
      </div>

      {/* Detailed stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="font-bold mb-3">Détails des révisions</h3>
          <div className="space-y-2 text-sm">
            <Row label="Révisions aujourd'hui" value={stats.reviewedToday} />
            <Row label="Cartes à réviser" value={stats.dueCards} />
            <Row label="Total révisions" value={retention.totalReviews} />
            <Row label="Cartes oubliées" value={retention.againCount} />
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h3 className="font-bold mb-3">Objectifs</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Objectif quotidien</span>
                <span className={xp >= dailyGoal ? "text-emerald-400" : "text-slate-300"}>
                  {xp} / {dailyGoal} XP
                </span>
              </div>
              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((xp / dailyGoal) * 100, 100)}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className={xp >= dailyGoal ? "text-emerald-400" : "text-slate-600"} />
              <span className={xp >= dailyGoal ? "text-emerald-400" : "text-slate-500"}>
                {xp >= dailyGoal ? "Objectif atteint !" : "Continue tes révisions !"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-6">
        <Badges />
      </div>
    </div>
  );
}

function StatBox({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col items-center text-center">
      <div className={`${color} mb-2`}>{icon}</div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-slate-400 text-xs">{label}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
