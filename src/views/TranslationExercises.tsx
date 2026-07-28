import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Languages, CheckCircle, AlertCircle, Search, FileText, Star } from "lucide-react";
import { useLearnStore } from "@/store/useLearnStore";
import { useTranslationExercises, useTranslationProgress, useExtendedTranslationExercises, useLongTranslationExercises } from "@/hooks/useQueries";
import { saveTranslationProgress } from "@/db/queries";
import type { TranslationExercise, ExtendedTranslationExercise, LongTranslationExercise } from "@/db/schema";

export function TranslationExercises() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);

  const [tab, setTab] = useState<"short" | "medium" | "long">("short");
  const [mode, setMode] = useState<"list" | "exercise" | "result" | "long_exercise" | "medium_exercise">("list");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [currentEx, setCurrentEx] = useState<TranslationExercise | null>(null);
  const [currentLong, setCurrentLong] = useState<ExtendedTranslationExercise | null>(null);
  const [currentMedium, setCurrentMedium] = useState<LongTranslationExercise | null>(null);
  const [userTranslation, setUserTranslation] = useState("");
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const { data: exercises = [], isLoading: loading } = useTranslationExercises(
    difficultyFilter === "all" ? undefined : difficultyFilter,
    categoryFilter === "all" ? undefined : categoryFilter
  );
  const { data: progress = [] } = useTranslationProgress();
  const { data: longExercises = [] } = useExtendedTranslationExercises();
  const { data: mediumExercises = [] } = useLongTranslationExercises();
  const queryClient = useQueryClient();

  async function startExercise(ex: TranslationExercise) {
    setCurrentEx(ex);
    setCurrentLong(null);
    const prev = progress.find((p) => p.exercise_id === ex.id);
    setUserTranslation(prev?.user_translation ?? "");
    setScore(prev?.score ?? 0);
    setRevealed(false);
    setMode("exercise");
  }

  function startLongExercise(ex: ExtendedTranslationExercise) {
    setCurrentLong(ex);
    setCurrentEx(null);
    setCurrentMedium(null);
    setUserTranslation("");
    setRevealed(false);
    setMode("long_exercise");
  }

  function startMediumExercise(ex: LongTranslationExercise) {
    setCurrentMedium(ex);
    setCurrentEx(null);
    setCurrentLong(null);
    setUserTranslation("");
    setRevealed(false);
    setMode("medium_exercise");
  }

  async function submitExercise() {
    if (!currentEx) return;
    setMode("result");
  }

  async function saveAndExit() {
    if (!currentEx) return;
    await saveTranslationProgress(currentEx.id, score, userTranslation);
    addXp(score);
    await queryClient.invalidateQueries({ queryKey: ["translationProgress"] });
    setMode("list");
  }

  function getCategories() {
    const cats = new Set(exercises.map((e) => e.category));
    return Array.from(cats).sort();
  }

  const filtered = exercises.filter((e) => {
    const d = difficultyFilter === "all" || e.difficulty === difficultyFilter;
    const c = categoryFilter === "all" || e.category === categoryFilter;
    const q = search.toLowerCase();
    const s = e.title.toLowerCase().includes(q) || e.source.toLowerCase().includes(q);
    return d && c && s;
  });

  const difficultyColor = (d: string) => {
    switch (d) {
      case "easy": return "text-emerald-400";
      case "medium": return "text-amber-400";
      case "hard": return "text-rose-400";
      default: return "text-slate-400";
    }
  };

  const difficultyLabel = (d: string) => {
    switch (d) {
      case "easy": return "Facile";
      case "medium": return "Moyen";
      case "hard": return "Difficile";
      default: return d;
    }
  };

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center text-slate-400">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-full bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setView("dashboard")}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
            Exercices de Traduction
          </h1>
        </div>

        {mode === "list" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTab("short")}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  tab === "short" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Exercices courts
              </button>
              <button
                onClick={() => setTab("medium")}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  tab === "medium" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Textes moyens ({mediumExercises.length})
              </button>
              <button
                onClick={() => setTab("long")}
                className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                  tab === "long" ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                Textes longs ({longExercises.length})
              </button>
            </div>

            {tab === "short" && (
              <>
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Rechercher..."
                      className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <select
                    value={difficultyFilter}
                    onChange={(e) => { setDifficultyFilter(e.target.value); }}
                    className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500"
                  >
                    <option value="all">Toutes difficultés</option>
                    <option value="easy">Facile</option>
                    <option value="medium">Moyen</option>
                    <option value="hard">Difficile</option>
                  </select>
                  <select
                    value={categoryFilter}
                    onChange={(e) => { setCategoryFilter(e.target.value); }}
                    className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500"
                  >
                    <option value="all">Toutes catégories</option>
                    {getCategories().map((cat) => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-3">
                  {filtered.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => startExercise(ex)}
                      className="text-left bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-rose-500 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText size={18} className="text-rose-400" />
                            <span className="text-lg font-bold">{ex.title}</span>
                          </div>
                          <p className="text-sm text-slate-400 line-clamp-2">{ex.source}</p>
                          <div className="flex gap-3 mt-2 text-xs">
                            <span className={`font-medium ${difficultyColor(ex.difficulty)}`}>
                              {difficultyLabel(ex.difficulty)}
                            </span>
                            <span className="text-slate-500 capitalize">{ex.category}</span>
                            <span className="text-slate-500">{ex.word_count} mots</span>
                            {progress.find((p) => p.exercise_id === ex.id) && (
                              <span className="flex items-center gap-1 text-amber-400">
                                <Star size={12} fill="currentColor" />
                                {progress.find((p) => p.exercise_id === ex.id)?.score}/5
                              </span>
                            )}
                          </div>
                        </div>
                        <Languages size={20} className="text-slate-500" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {tab === "medium" && (
              <div className="grid gap-3">
                {mediumExercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => startMediumExercise(ex)}
                    className="text-left bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-rose-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText size={18} className="text-amber-400" />
                          <span className="text-lg font-bold">{ex.title}</span>
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-2">{ex.source}</p>
                        <div className="flex gap-3 mt-2 text-xs">
                          <span className={`font-medium ${difficultyColor(ex.difficulty)}`}>
                            {difficultyLabel(ex.difficulty)}
                          </span>
                          <span className="text-slate-500 capitalize">{ex.category}</span>
                          <span className="text-slate-500">{ex.word_count} mots</span>
                        </div>
                      </div>
                      <Languages size={20} className="text-slate-500" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {tab === "long" && (
              <div className="grid gap-3">
                {longExercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => startLongExercise(ex)}
                    className="text-left bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-rose-500 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FileText size={18} className="text-orange-400" />
                          <span className="text-lg font-bold">{ex.title}</span>
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-2">{ex.source_en}</p>
                        <div className="flex gap-3 mt-2 text-xs">
                          <span className="text-slate-500 capitalize">{ex.category}</span>
                          <span className="text-slate-500">{ex.word_count} mots</span>
                        </div>
                      </div>
                      <Languages size={20} className="text-slate-500" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {mode === "exercise" && currentEx && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{currentEx.title}</h2>
              <div className="flex gap-2 text-sm">
                <span className={`px-2 py-1 rounded bg-slate-800 ${difficultyColor(currentEx.difficulty)}`}>
                  {difficultyLabel(currentEx.difficulty)}
                </span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 capitalize">
                  {currentEx.category}
                </span>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-4">
              <p className="text-sm text-slate-400 mb-1">Texte à traduire :</p>
              <p className="text-lg leading-relaxed">{currentEx.source}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-2">Ta traduction (français) :</p>
              <textarea
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                placeholder="Écris ta traduction ici..."
                rows={8}
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 resize-y"
                autoFocus
              />
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={submitExercise}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-semibold"
              >
                <CheckCircle size={18} className="inline mr-1" />
                Voir la correction
              </button>
              <button
                onClick={() => setMode("list")}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
              >
                Abandonner
              </button>
            </div>
          </motion.div>
        )}

        {mode === "result" && currentEx && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={24} className="text-rose-400" />
              Correction
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Texte original (anglais)</p>
                <p className="leading-relaxed">{currentEx.source}</p>
              </div>
              <div className="bg-slate-800 rounded-xl p-4 border border-rose-500/50">
                <p className="text-sm text-rose-400 mb-2">Corrigé (français)</p>
                <p className="leading-relaxed">{currentEx.translation}</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
              <p className="text-sm text-slate-400 mb-2">Ta traduction :</p>
              <p className="leading-relaxed text-slate-300">{userTranslation || "(vide)"}</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-6">
              <p className="text-sm text-slate-400 mb-2">Auto-évaluation :</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setScore(n)}
                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                      score >= n
                        ? "bg-rose-500 text-white"
                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                1 = Très éloigné — 5 = Parfait
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveAndExit}
                className="px-6 py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-semibold"
              >
                Sauvegarder et quitter
              </button>
              <button
                onClick={() => startExercise(currentEx)}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
              >
                Réessayer
              </button>
            </div>
          </motion.div>
        )}

        {mode === "medium_exercise" && currentMedium && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setMode("list")}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">{currentMedium.title}</h2>
              <div className="flex gap-2 text-sm ml-auto">
                <span className={`px-2 py-1 rounded bg-slate-800 ${difficultyColor(currentMedium.difficulty)}`}>
                  {difficultyLabel(currentMedium.difficulty)}
                </span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 capitalize">
                  {currentMedium.category}
                </span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">
                  {currentMedium.word_count} mots
                </span>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-4">
              <p className="text-sm text-slate-400 mb-1">Texte à traduire :</p>
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{currentMedium.source}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-2">Ta traduction (français) :</p>
              <textarea
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                placeholder="Écris ta traduction ici..."
                rows={10}
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 resize-y"
                autoFocus
              />
            </div>

            {!revealed ? (
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setRevealed(true)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold"
                >
                  <CheckCircle size={18} className="inline mr-1" />
                  Voir la traduction de référence
                </button>
                <button
                  onClick={() => setMode("list")}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
                >
                  Abandonner
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-900/30 border border-emerald-700/50 rounded-2xl p-6 mb-6"
              >
                <h3 className="text-emerald-400 font-semibold mb-2">Traduction de référence</h3>
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{currentMedium.translation}</p>
              </motion.div>
            )}

            {revealed && (
              <div className="flex gap-3">
                <button
                  onClick={() => setMode("list")}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-semibold"
                >
                  Terminer
                </button>
                <button
                  onClick={() => startMediumExercise(currentMedium)}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
                >
                  Réessayer
                </button>
              </div>
            )}
          </motion.div>
        )}

        {mode === "long_exercise" && currentLong && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setMode("list")}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">{currentLong.title}</h2>
              <div className="flex gap-2 text-sm ml-auto">
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 capitalize">
                  {currentLong.category}
                </span>
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400">
                  {currentLong.word_count} mots
                </span>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 mb-4">
              <p className="text-sm text-slate-400 mb-1">Texte à traduire :</p>
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{currentLong.source_en}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-2">Ta traduction (français) :</p>
              <textarea
                value={userTranslation}
                onChange={(e) => setUserTranslation(e.target.value)}
                placeholder="Écris ta traduction ici..."
                rows={12}
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 resize-y"
                autoFocus
              />
            </div>

            {!revealed ? (
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setRevealed(true)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold"
                >
                  <CheckCircle size={18} className="inline mr-1" />
                  Voir la traduction de référence
                </button>
                <button
                  onClick={() => setMode("list")}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
                >
                  Abandonner
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-900/30 border border-emerald-700/50 rounded-2xl p-6 mb-6"
              >
                <h3 className="text-emerald-400 font-semibold mb-2">Traduction de référence</h3>
                <p className="text-slate-200 leading-relaxed whitespace-pre-wrap">{currentLong.source_fr}</p>
              </motion.div>
            )}

            {revealed && (
              <div className="flex gap-3">
                <button
                  onClick={() => setMode("list")}
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-semibold"
                >
                  Terminer
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
