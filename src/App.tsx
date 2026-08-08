import { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLearnStore } from "@/store/useLearnStore";
import { AppLayout } from "@/components/AppLayout";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const Dashboard = lazy(() => import("@/views/Dashboard").then((m) => ({ default: m.Dashboard })));
const StudySession = lazy(() => import("@/views/StudySession").then((m) => ({ default: m.StudySession })));
const CardBuilder = lazy(() => import("@/views/CardBuilder").then((m) => ({ default: m.CardBuilder })));
const IrregularVerbs = lazy(() => import("@/views/IrregularVerbs").then((m) => ({ default: m.IrregularVerbs })));
const PhrasalVerbs = lazy(() => import("@/views/PhrasalVerbs").then((m) => ({ default: m.PhrasalVerbs })));
const TranslationExercises = lazy(() => import("@/views/TranslationExercises").then((m) => ({ default: m.TranslationExercises })));
const Grammar = lazy(() => import("@/views/Grammar").then((m) => ({ default: m.Grammar })));
const NumberExercises = lazy(() => import("@/views/NumberExercises").then((m) => ({ default: m.NumberExercises })));
const Dictation = lazy(() => import("@/views/Dictation").then((m) => ({ default: m.Dictation })));
const Stats = lazy(() => import("@/views/Stats").then((m) => ({ default: m.Stats })));
const Settings = lazy(() => import("@/views/Settings").then((m) => ({ default: m.Settings })));
const WordMatching = lazy(() => import("@/views/WordMatching").then((m) => ({ default: m.WordMatching })));
const ListeningQuiz = lazy(() => import("@/views/ListeningQuiz").then((m) => ({ default: m.ListeningQuiz })));
const MixedReview = lazy(() => import("@/views/MixedReview").then((m) => ({ default: m.MixedReview })));
const SentenceBuilder = lazy(() => import("@/views/SentenceBuilder").then((m) => ({ default: m.SentenceBuilder })));
const TenseTrainer = lazy(() => import("@/views/TenseTrainer").then((m) => ({ default: m.TenseTrainer })));
const Prepositions = lazy(() => import("@/views/Prepositions").then((m) => ({ default: m.Prepositions })));
const VocabularyByTheme = lazy(() => import("@/views/VocabularyByTheme").then((m) => ({ default: m.VocabularyByTheme })));

export default function App() {
  const currentView = useLearnStore((s) => s.currentView);

  return (
    <ErrorBoundary>
      <AppLayout>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-full"
          >
            <Suspense fallback={<LoadingSpinner />}>
              {currentView === "dashboard" && <Dashboard />}
              {currentView === "study" && <StudySession />}
              {currentView === "builder" && <CardBuilder />}
              {currentView === "verbs" && <IrregularVerbs />}
              {currentView === "phrasal" && <PhrasalVerbs />}
              {currentView === "translation" && <TranslationExercises />}
              {currentView === "grammar" && <Grammar />}
              {currentView === "numbers" && <NumberExercises />}
              {currentView === "dictation" && <Dictation />}
              {currentView === "stats" && <Stats />}
              {currentView === "settings" && <Settings />}
              {currentView === "matching" && <WordMatching />}
              {currentView === "listening" && <ListeningQuiz />}
              {currentView === "mixed" && <MixedReview />}
              {currentView === "builder-sentences" && <SentenceBuilder />}
              {currentView === "tenses" && <TenseTrainer />}
              {currentView === "prepositions" && <Prepositions />}
              {currentView === "vocabulary" && <VocabularyByTheme />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </AppLayout>
    </ErrorBoundary>
  );
}
