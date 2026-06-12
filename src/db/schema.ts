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

export type CardInput = Omit<Card, "id" | "created_at" | "due" | "stability" | "difficulty" | "elapsed_days" | "scheduled_days" | "reps" | "lapses" | "state" | "last_review">;

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
