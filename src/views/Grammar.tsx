import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  XCircle,
  Star,
  Filter,
  ChevronRight,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useLearnStore } from "@/store/useLearnStore";
import { useGrammarLessons, useGrammarProgress } from "@/hooks/useQueries";
import { getGrammarExercises, saveGrammarProgress } from "@/db/queries";
import { useQueryClient } from "@tanstack/react-query";
import type { GrammarLesson, GrammarExercise, GrammarProgress } from "@/db/schema";

export function Grammar() {
  const setView = useLearnStore((s) => s.setView);
  const addXp = useLearnStore((s) => s.addXp);

  const [mode, setMode] = useState<"list" | "lesson" | "exercise" | "result">("list");
  const [currentLesson, setCurrentLesson] = useState<GrammarLesson | null>(null);
  const [exercises, setExercises] = useState<GrammarExercise[]>([]);
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [matchSelectedLeft, setMatchSelectedLeft] = useState<string | null>(null);
  const [matchPairs, setMatchPairs] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [levelFilter, setLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { speak } = useTextToSpeech();
  const lessonContentRef = useRef<HTMLDivElement>(null);

  const { data: lessons = [], isLoading: loading } = useGrammarLessons(
    levelFilter === "all" ? undefined : levelFilter,
    categoryFilter === "all" ? undefined : categoryFilter
  );
  const { data: progress = [] } = useGrammarProgress();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode !== "lesson" || !lessonContentRef.current) return;
    const container = lessonContentRef.current;
    const buttons = container.querySelectorAll<HTMLButtonElement>(".grammar-speak-btn");
    const onClick = (e: Event) => {
      e.stopPropagation();
      const btn = e.currentTarget as HTMLButtonElement;
      const text = btn.getAttribute("data-text");
      if (text) speak(text);
    };
    buttons.forEach((btn) => btn.addEventListener("click", onClick));
    return () => buttons.forEach((btn) => btn.removeEventListener("click", onClick));
  }, [mode, currentLesson?.content, speak]);

  async function startLesson(lesson: GrammarLesson) {
    setCurrentLesson(lesson);
    setMode("lesson");
  }

  async function startExercises(lesson: GrammarLesson) {
    setCurrentLesson(lesson);
    const exs = await getGrammarExercises(lesson.id);
    setExercises(exs);
    setCurrentExIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setMatchSelectedLeft(null);
    setMatchPairs({});
    setMode("exercise");
  }

  function handleAnswer(answer: string) {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    const currentEx = exercises[currentExIndex];
    if (answer.trim().toLowerCase() === currentEx.correct_answer.trim().toLowerCase()) {
      setScore((s) => s + currentEx.points);
    }
  }

  async function nextExercise() {
    if (currentExIndex + 1 < exercises.length) {
      setCurrentExIndex((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setMatchSelectedLeft(null);
      setMatchPairs({});
    } else {
      // Finished
      if (currentLesson) {
        await saveGrammarProgress(currentLesson.id, score, exercises.length, exercises[exercises.length - 1].id);
        await queryClient.invalidateQueries({ queryKey: ["grammarProgress"] });
      }
      addXp(score);
      setMode("result");
    }
  }

  function getCategories() {
    const cats = new Set(lessons.map((l) => l.category));
    return Array.from(cats).sort();
  }

  function getProgressForLesson(lessonId: number): GrammarProgress | undefined {
    return progress.find((p) => p.lesson_id === lessonId);
  }

  const filtered = lessons.filter((l) => {
    const s = search.toLowerCase();
    return (
      l.title.toLowerCase().includes(s) ||
      l.description?.toLowerCase().includes(s) ||
      l.category.toLowerCase().includes(s)
    );
  });

  const currentEx = exercises[currentExIndex];

  const levels = ["A1", "A2", "B1", "B2", "C1"];

  return (
    <div className="min-h-full flex flex-col p-6 max-w-3xl mx-auto">
      <button
        onClick={() => mode === "list" ? setView("dashboard") : setMode("list")}
        className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors mb-4"
      >
        <ArrowLeft size={20} />
        Retour
      </button>

      {mode === "list" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen size={28} className="text-emerald-400" />
              <h2 className="text-2xl font-bold">Grammaire</h2>
            </div>
            <div className="text-sm text-slate-400">
              {progress.filter((p) => p.completed).length} / {lessons.length} complétés
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-2">
              <Filter size={20} className="text-slate-500 mt-2" />
              <select
                value={levelFilter}
                onChange={(e) => { setLevelFilter(e.target.value); }}
                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Niveau</option>
                {levels.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); }}
                className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Catégorie</option>
                {getCategories().map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une leçon..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400">Chargement...</div>
          ) : (
            <div className="space-y-3">
              {filtered.map((lesson) => {
                const prog = getProgressForLesson(lesson.id);
                const completed = prog?.completed;
                const pct = prog ? Math.round((prog.score / prog.total) * 100) : 0;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => startLesson(lesson)}
                    className="w-full text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl p-4 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          lesson.level === "A1" ? "bg-green-900 text-green-300" :
                          lesson.level === "A2" ? "bg-blue-900 text-blue-300" :
                          lesson.level === "B1" ? "bg-yellow-900 text-yellow-300" :
                          lesson.level === "B2" ? "bg-orange-900 text-orange-300" :
                          "bg-red-900 text-red-300"
                        }`}>{lesson.level}</span>
                        <span className="text-xs text-slate-500 capitalize">{lesson.category}</span>
                        {completed && <Star size={14} className="text-amber-400 fill-amber-400" />}
                      </div>
                      <h3 className="font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                        {lesson.title}
                      </h3>
                      {lesson.description && (
                        <p className="text-sm text-slate-400 mt-1">{lesson.description}</p>
                      )}
                      {prog && (
                        <div className="mt-2">
                          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{prog.score} / {prog.total} ({pct}%)</p>
                        </div>
                      )}
                    </div>
                    <ChevronRight size={20} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </button>
                );
              })}
            </div>
          )}
        </motion.div>
      )}

      {mode === "lesson" && currentLesson && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                currentLesson.level === "A1" ? "bg-green-900 text-green-300" :
                currentLesson.level === "A2" ? "bg-blue-900 text-blue-300" :
                currentLesson.level === "B1" ? "bg-yellow-900 text-yellow-300" :
                currentLesson.level === "B2" ? "bg-orange-900 text-orange-300" :
                "bg-red-900 text-red-300"
              }`}>{currentLesson.level}</span>
              <span className="text-xs text-slate-500 ml-2 capitalize">{currentLesson.category}</span>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">{currentLesson.title}</h2>
          <div
            ref={lessonContentRef}
            className="prose prose-invert prose-sm max-w-none bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6"
            dangerouslySetInnerHTML={{
              __html: currentLesson.content.replace(
                /<i>([\s\S]*?)<\/i>/g,
                (match, inner) => {
                  const clean = inner.replace(/<[^>]*>/g, "");
                  if (!clean.trim()) return match;
                  return `<span class="inline-flex items-center gap-1 flex-wrap"><i>${inner}</i><button type="button" class="grammar-speak-btn inline-flex items-center justify-center w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 hover:bg-sky-500/40 transition-colors shrink-0" data-text="${clean.replace(/"/g, "&quot;")}" title="Écouter">🔊</button></span>`;
                }
              ),
            }}
          />
          <div className="flex gap-3">
            <button
              onClick={() => startExercises(currentLesson)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold"
            >
              <CheckCircle size={18} className="inline mr-1" />
              Faire les exercices
            </button>
            <button
              onClick={() => setMode("list")}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
            >
              Retour
            </button>
          </div>
        </motion.div>
      )}

      {mode === "exercise" && currentEx && currentLesson && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">{currentLesson.title}</h2>
            <span className="text-sm text-slate-400">
              {currentExIndex + 1} / {exercises.length}
            </span>
          </div>

          <div className="h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${((currentExIndex) / exercises.length) * 100}%` }}
            />
          </div>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
            <p className="text-lg mb-4">{currentEx.question}</p>

            {currentEx.type === "qcm" && currentEx.options && (
              <div className="space-y-2">
                {JSON.parse(currentEx.options).map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    disabled={showFeedback}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                      showFeedback
                        ? opt === currentEx.correct_answer
                          ? "bg-emerald-900/50 border-emerald-500 text-emerald-300"
                          : opt === selectedAnswer
                          ? "bg-rose-900/50 border-rose-500 text-rose-300"
                          : "bg-slate-700 border-slate-600 opacity-50"
                        : "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-emerald-500"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {currentEx.type === "fill_blank" && (
              <div>
                <input
                  type="text"
                  value={selectedAnswer ?? ""}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && selectedAnswer && handleAnswer(selectedAnswer)}
                  disabled={showFeedback}
                  placeholder="Ta réponse..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500"
                  autoFocus
                />
                {!showFeedback && (
                  <button
                    onClick={() => selectedAnswer && handleAnswer(selectedAnswer)}
                    disabled={!selectedAnswer}
                    className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 rounded-lg text-sm"
                  >
                    Valider
                  </button>
                )}
              </div>
            )}

            {currentEx.type === "reorder" && currentEx.options && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {JSON.parse(currentEx.options)
                    .filter((w: string) => !(selectedAnswer ?? "").split(" ").includes(w))
                    .map((word: string, i: number) => (
                      <button
                        key={`${word}-${i}`}
                        onClick={() => setSelectedAnswer(prev => prev ? `${prev} ${word}` : word)}
                        disabled={showFeedback}
                        className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg hover:bg-slate-600 hover:border-emerald-500 transition-colors"
                      >
                        {word}
                      </button>
                    ))}
                </div>
                <div className="min-h-[60px] bg-slate-900 border border-slate-600 rounded-lg p-3 mb-3">
                  {selectedAnswer ? (
                    <p className="text-slate-200">{selectedAnswer}</p>
                  ) : (
                    <p className="text-slate-500 italic">Cliquez sur les mots dans l'ordre...</p>
                  )}
                </div>
                {!showFeedback && selectedAnswer && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedAnswer(null)}
                      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                    >
                      ↺ Réinitialiser
                    </button>
                    <button
                      onClick={() => handleAnswer(selectedAnswer)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm"
                    >
                      Valider
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentEx.type === "match" && currentEx.options && (() => {
              const opts = JSON.parse(currentEx.options);
              const leftItems: string[] = opts.left;
              const rightItems: string[] = opts.right;
              const allMatched = Object.keys(matchPairs).length === leftItems.length;
              const buildAnswer = () =>
                Object.entries(matchPairs)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([k, v]) => `${k}=${v}`)
                  .join("|");
              return (
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 mb-1">Anglais</p>
                      {leftItems.map((item) => (
                        <button
                          key={item}
                          onClick={() => !showFeedback && setMatchSelectedLeft(item)}
                          disabled={showFeedback || !!matchPairs[item]}
                          className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${
                            matchPairs[item]
                              ? "bg-emerald-900/30 border-emerald-700 text-slate-400 line-through"
                              : matchSelectedLeft === item
                              ? "bg-emerald-600 border-emerald-500 text-white"
                              : "bg-slate-700 border-slate-600 hover:bg-slate-600"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500 mb-1">Français</p>
                      {rightItems.map((item) => {
                        const matchedWith = Object.entries(matchPairs).find(([, v]) => v === item);
                        return (
                          <button
                            key={item}
                            onClick={() => {
                              if (!showFeedback && matchSelectedLeft && !matchedWith) {
                                setMatchPairs(prev => ({ ...prev, [matchSelectedLeft]: item }));
                                setMatchSelectedLeft(null);
                              }
                            }}
                            disabled={showFeedback || !!matchedWith || !matchSelectedLeft}
                            className={`w-full px-3 py-2 rounded-lg border transition-colors text-sm ${
                              matchedWith
                                ? "bg-emerald-900/30 border-emerald-700 text-slate-400"
                                : matchSelectedLeft
                                ? "bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-emerald-500 cursor-pointer"
                                : "bg-slate-700 border-slate-600 opacity-50 cursor-not-allowed"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {!showFeedback && (
                    <div className="flex gap-2">
                      {Object.keys(matchPairs).length > 0 && (
                        <button
                          onClick={() => { setMatchPairs({}); setMatchSelectedLeft(null); }}
                          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                        >
                          ↺ Réinitialiser
                        </button>
                      )}
                      {allMatched && (
                        <button
                          onClick={() => handleAnswer(buildAnswer())}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm"
                        >
                          Valider
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`rounded-xl p-4 border mb-6 ${
                  selectedAnswer?.trim().toLowerCase() === currentEx.correct_answer.trim().toLowerCase()
                    ? "bg-emerald-900/30 border-emerald-500/50"
                    : "bg-rose-900/30 border-rose-500/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {selectedAnswer?.trim().toLowerCase() === currentEx.correct_answer.trim().toLowerCase() ? (
                    <CheckCircle size={20} className="text-emerald-400" />
                  ) : (
                    <XCircle size={20} className="text-rose-400" />
                  )}
                  <span className="font-bold">
                    {selectedAnswer?.trim().toLowerCase() === currentEx.correct_answer.trim().toLowerCase()
                      ? "Bonne réponse !"
                      : "Mauvaise réponse"}
                  </span>
                </div>
                {!selectedAnswer?.trim().toLowerCase().includes(currentEx.correct_answer.trim().toLowerCase()) && (
                  <p className="text-sm text-slate-300 mb-1">
                    Réponse : <span className="text-emerald-400 font-semibold">
                      {currentEx.type === "match"
                        ? currentEx.correct_answer.split("|").map((p, i) => (
                            <span key={i}>{i > 0 && "  |  "}{p.replace("=", " → ")}</span>
                          ))
                        : currentEx.correct_answer}
                    </span>
                  </p>
                )}
                {currentEx.explanation && (
                  <p className="text-sm text-slate-400">{currentEx.explanation}</p>
                )}
                <button
                  onClick={nextExercise}
                  className="mt-3 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                >
                  {currentExIndex + 1 < exercises.length ? "Suivant →" : "Voir les résultats"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {mode === "result" && currentLesson && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
          <Trophy size={64} className="text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Résultats</h2>
          <p className="text-slate-400 mb-6">{currentLesson.title}</p>
          <div className="text-4xl font-bold text-emerald-400 mb-2">
            {score} / {exercises.length}
          </div>
          <p className="text-slate-500 mb-8">
            {score === exercises.length
              ? "Parfait ! Toutes les réponses sont justes."
              : score >= exercises.length / 2
              ? "Bien joué ! Continue à réviser."
              : "Révise la leçon et réessaie !"}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startExercises(currentLesson)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-semibold"
            >
              <RotateCcw size={18} className="inline mr-1" />
              Réessayer
            </button>
            <button
              onClick={() => setMode("list")}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl"
            >
              Retour à la liste
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
