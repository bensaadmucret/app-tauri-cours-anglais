import { motion } from "framer-motion";

interface DailyProgressProps {
  xp: number;
  goal: number;
}

export function DailyProgress({ xp, goal }: DailyProgressProps) {
  const percent = Math.min((xp / goal) * 100, 100);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex justify-between text-sm mb-1 text-slate-300">
        <span>XP quotidien</span>
        <span>
          {xp} / {goal}
        </span>
      </div>
      <div className="h-4 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-400 to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
        />
      </div>
    </div>
  );
}
