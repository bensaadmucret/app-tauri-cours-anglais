import { AnimatePresence, motion } from "framer-motion";
import { useLearnStore } from "@/store/useLearnStore";
import { Dashboard } from "@/views/Dashboard";
import { StudySession } from "@/views/StudySession";
import { CardBuilder } from "@/views/CardBuilder";
import { IrregularVerbs } from "@/views/IrregularVerbs";
import { PhrasalVerbs } from "@/views/PhrasalVerbs";
import { TranslationExercises } from "@/views/TranslationExercises";

export default function App() {
  const currentView = useLearnStore((s) => s.currentView);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "study" && <StudySession />}
        {currentView === "builder" && <CardBuilder />}
        {currentView === "verbs" && <IrregularVerbs />}
        {currentView === "phrasal" && <PhrasalVerbs />}
        {currentView === "translation" && <TranslationExercises />}
      </motion.div>
    </AnimatePresence>
  );
}
