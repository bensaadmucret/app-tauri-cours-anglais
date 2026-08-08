import { useQuery } from "@tanstack/react-query";
import {
  getStats,
  getDueCards,
  getAllCards,
  getIrregularVerbs,
  getPhrasalVerbs,
  getTranslationExercises,
  getTranslationProgress,
  getExtendedTranslationExercises,
  getLongTranslationExercises,
  getGrammarLessons,
  getGrammarProgress,
  getNumberExercises,
  getDictationDifficulties,
  getReviewHistory,
  getRetentionRate,
  getActivityHeatmap,
  getThematicVocabularyThemes,
  getThematicVocabularyByTheme,
  getAllThematicVocabulary,
} from "@/db/queries";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}

export function useDueCards() {
  return useQuery({
    queryKey: ["dueCards"],
    queryFn: () => getDueCards(1),
  });
}

export function useAllCards() {
  return useQuery({
    queryKey: ["allCards"],
    queryFn: getAllCards,
  });
}

export function useIrregularVerbs() {
  return useQuery({
    queryKey: ["irregularVerbs"],
    queryFn: () => getIrregularVerbs(),
  });
}

export function usePhrasalVerbs() {
  return useQuery({
    queryKey: ["phrasalVerbs"],
    queryFn: () => getPhrasalVerbs(),
  });
}

export function useTranslationExercises(difficulty?: string, category?: string) {
  return useQuery({
    queryKey: ["translationExercises", difficulty, category],
    queryFn: () => getTranslationExercises(difficulty, category),
  });
}

export function useTranslationProgress() {
  return useQuery({
    queryKey: ["translationProgress"],
    queryFn: getTranslationProgress,
  });
}

export function useExtendedTranslationExercises() {
  return useQuery({
    queryKey: ["extendedTranslationExercises"],
    queryFn: () => getExtendedTranslationExercises(),
  });
}

export function useLongTranslationExercises() {
  return useQuery({
    queryKey: ["longTranslationExercises"],
    queryFn: () => getLongTranslationExercises(),
  });
}

export function useGrammarLessons(level?: string, category?: string) {
  return useQuery({
    queryKey: ["grammarLessons", level, category],
    queryFn: () => getGrammarLessons(level, category),
  });
}

export function useGrammarProgress() {
  return useQuery({
    queryKey: ["grammarProgress"],
    queryFn: getGrammarProgress,
  });
}

export function useNumberExercises() {
  return useQuery({
    queryKey: ["numberExercises"],
    queryFn: () => getNumberExercises(),
  });
}

export function useDictationDifficulties() {
  return useQuery({
    queryKey: ["dictationDifficulties"],
    queryFn: getDictationDifficulties,
  });
}

export function useReviewHistory(days: number) {
  return useQuery({
    queryKey: ["reviewHistory", days],
    queryFn: () => getReviewHistory(days),
  });
}

export function useRetentionRate() {
  return useQuery({
    queryKey: ["retentionRate"],
    queryFn: getRetentionRate,
  });
}

export function useActivityHeatmap(days: number) {
  return useQuery({
    queryKey: ["activityHeatmap", days],
    queryFn: () => getActivityHeatmap(days),
  });
}

export function useThematicVocabularyThemes() {
  return useQuery({
    queryKey: ["thematicVocabThemes"],
    queryFn: getThematicVocabularyThemes,
  });
}

export function useThematicVocabularyByTheme(themeId: number | null) {
  return useQuery({
    queryKey: ["thematicVocab", themeId],
    queryFn: () => getThematicVocabularyByTheme(themeId!),
    enabled: themeId !== null,
  });
}

export function useAllThematicVocabulary() {
  return useQuery({
    queryKey: ["allThematicVocab"],
    queryFn: getAllThematicVocabulary,
  });
}
