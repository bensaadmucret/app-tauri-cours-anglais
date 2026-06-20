export interface Deck {
  id: number;
  name: string;
  description: string | null;
  created_at: number;
}

export interface Card {
  id: number;
  deck_id: number;
  word: string;
  phonetic: string | null;
  definition: string;
  example: string | null;
  audio_url: string | null;
  translation_fr: string | null;
  due: number;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: number;
  last_review: number | null;
  created_at: number;
}

export interface ReviewLog {
  id: number;
  card_id: number;
  rating: number;
  state: number;
  due: number;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  last_elapsed_days: number;
  scheduled_days: number;
  review: number;
  created_at: number;
}

export type CardInput = Omit<Card, "id" | "created_at" | "due" | "stability" | "difficulty" | "elapsed_days" | "scheduled_days" | "reps" | "lapses" | "state" | "last_review"> & {
  translation_fr?: string | null;
};

export interface IrregularVerb {
  id: number;
  base: string;
  past: string;
  past_participle: string;
  meaning: string;
  example_base: string | null;
  example_past: string | null;
  example_participle: string | null;
  level: string;
  created_at: number;
}

export interface PhrasalVerb {
  id: number;
  verb: string;
  particle: string;
  meaning: string;
  example: string | null;
  level: string;
  created_at: number;
}

export interface TranslationExercise {
  id: number;
  title: string;
  source: string;
  translation: string;
  difficulty: string;
  category: string;
  word_count: number;
  created_at: number;
}

export interface TranslationProgress {
  id: number;
  exercise_id: number;
  score: number;
  user_translation: string | null;
  completed_at: number;
}

export interface GrammarLesson {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  category: string;
  level: string;
  order_index: number;
  created_at: number;
}

export interface GrammarExercise {
  id: number;
  lesson_id: number;
  type: "qcm" | "fill_blank" | "reorder" | "match";
  question: string;
  options: string | null;
  correct_answer: string;
  explanation: string | null;
  points: number;
  order_index: number;
}

export interface GrammarProgress {
  id: number;
  lesson_id: number;
  completed: number;
  score: number;
  total: number;
  last_exercise_id: number | null;
  completed_at: number | null;
}

export interface LongTranslationExercise {
  id: number;
  title: string;
  source: string;
  translation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  word_count: number;
}

export interface ExtendedTranslationExercise {
  id: number;
  title: string;
  source_en: string;
  source_fr: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  word_count: number;
}

export interface NumberExercise {
  id: number;
  question: string;
  answer: string;
  type: 'digit_to_word' | 'word_to_digit' | 'ordinal' | 'time' | 'date' | 'large_number' | 'fraction' | 'percentage' | 'decimal' | 'mixed';
  hint: string | null;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface DictationSentence {
  id: number;
  text: string;
  translation_fr: string | null;
  difficulty: string;
  category: string | null;
  audio_url: string | null;
  created_at: number;
}
