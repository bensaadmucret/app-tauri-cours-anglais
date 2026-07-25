import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Volume2, VolumeX, Target, Moon, Sun, Flame, Database, CheckCircle } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { backupDatabase } from "@/db/queries";

export function Settings() {
  const { theme, toggleTheme, soundEnabled, toggleSound, dailyGoal, setDailyGoal, streak } = useLearnStore();
  const [backupStatus, setBackupStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleBackup() {
    setBackupStatus("loading");
    try {
      await backupDatabase();
      setBackupStatus("success");
      setTimeout(() => setBackupStatus("idle"), 3000);
    } catch {
      setBackupStatus("error");
      setTimeout(() => setBackupStatus("idle"), 3000);
    }
  }

  return (
    <div className="min-h-full p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon size={28} className="text-slate-400" />
        <h1 className="text-2xl font-bold">Paramètres</h1>
      </div>

      <div className="space-y-4">
        {/* Theme */}
        <SettingsCard title="Apparence" icon={<Moon size={20} />}>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Thème</span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl transition-colors"
            >
              {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
              {theme === "dark" ? "Sombre" : "Clair"}
            </button>
          </div>
        </SettingsCard>

        {/* Sound */}
        <SettingsCard title="Sons" icon={soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Sons de feedback</span>
            <button
              onClick={toggleSound}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? "bg-emerald-500" : "bg-slate-600"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  soundEnabled ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </SettingsCard>

        {/* Daily goal */}
        <SettingsCard title="Objectif quotidien" icon={<Target size={20} />}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">XP par jour</span>
              <span className="font-bold text-emerald-400">{dailyGoal} XP</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>5</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </SettingsCard>

        {/* Streak info */}
        <SettingsCard title="Série (streak)" icon={<Flame size={20} />}>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Jours consécutifs</span>
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-orange-400" />
              <span className="font-bold text-orange-400">{streak} jour{streak > 1 ? "s" : ""}</span>
            </div>
          </div>
        </SettingsCard>

        {/* Backup */}
        <SettingsCard title="Sauvegarde" icon={<Database size={20} />}>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Sauvegarder la base de données</span>
            <button
              onClick={handleBackup}
              disabled={backupStatus === "loading"}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 rounded-xl text-sm font-medium transition-colors"
            >
              {backupStatus === "loading" ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          </div>
          {backupStatus === "success" && (
            <div className="flex items-center gap-2 mt-3 text-sm text-emerald-400">
              <CheckCircle size={16} />
              Sauvegarde créée avec succès !
            </div>
          )}
          {backupStatus === "error" && (
            <p className="mt-3 text-sm text-rose-400">Erreur lors de la sauvegarde</p>
          )}
        </SettingsCard>

        {/* About */}
        <SettingsCard title="À propos" icon={<SettingsIcon size={20} />}>
          <div className="space-y-1 text-sm text-slate-400">
            <p>Mon App Anglais — v0.1.0</p>
            <p>Tauri 2 + React 18 + TailwindCSS</p>
            <p>Algorithme FSRS pour la mémorisation optimale</p>
            <p className="text-slate-500 mt-2">GPL v3 — Copyright (C) 2026 Mohammed Bensaad</p>
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}

function SettingsCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-2xl p-6 border border-slate-700"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-slate-400">{icon}</span>
        <h2 className="font-bold">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
