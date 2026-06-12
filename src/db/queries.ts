import Database from "@tauri-apps/plugin-sql";
import type { Card, CardInput, Deck, ReviewLog, IrregularVerb, PhrasalVerb, TranslationExercise, TranslationProgress } from "./schema";

let db: Database | null = null;

async function getDb(): Promise<Database> {
  if (!db) {
    db = await Database.load("sqlite:cours-anglais.db");
  }
  return db;
}

export async function initDatabase(): Promise<void> {
  const db = await getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at INTEGER NOT NULL
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      deck_id INTEGER NOT NULL,
      word TEXT NOT NULL,
      phonetic TEXT,
      definition TEXT NOT NULL,
      example TEXT,
      audio_url TEXT,
      due INTEGER NOT NULL DEFAULT 0,
      stability REAL NOT NULL DEFAULT 0,
      difficulty REAL NOT NULL DEFAULT 0,
      elapsed_days INTEGER NOT NULL DEFAULT 0,
      scheduled_days INTEGER NOT NULL DEFAULT 0,
      reps INTEGER NOT NULL DEFAULT 0,
      lapses INTEGER NOT NULL DEFAULT 0,
      state INTEGER NOT NULL DEFAULT 0,
      last_review INTEGER,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    )
  `);
  await db.execute(`
    CREATE TABLE IF NOT EXISTS review_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      card_id INTEGER NOT NULL,
      rating INTEGER NOT NULL,
      state INTEGER NOT NULL,
      due INTEGER NOT NULL,
      stability REAL NOT NULL,
      difficulty REAL NOT NULL,
      elapsed_days INTEGER NOT NULL,
      last_elapsed_days INTEGER NOT NULL,
      scheduled_days INTEGER NOT NULL,
      review INTEGER NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    )
  `);
  const decks = await db.select<Deck[]>("SELECT * FROM decks WHERE id = 1");
  if (decks.length === 0) {
    await db.execute(
      "INSERT INTO decks (id, name, description, created_at) VALUES (1, 'Default Deck', 'Mon deck principal', ?)",
      [Math.floor(Date.now() / 1000)]
    );
  }
}

export async function getDecks(): Promise<Deck[]> {
  const db = await getDb();
  return db.select<Deck[]>("SELECT * FROM decks ORDER BY created_at DESC");
}

export async function getDueCards(deckId?: number): Promise<Card[]> {
  const db = await getDb();
  const now = Math.floor(Date.now() / 1000);
  if (deckId) {
    return db.select<Card[]>(
      "SELECT * FROM cards WHERE deck_id = ? AND due <= ? ORDER BY due ASC",
      [deckId, now]
    );
  }
  return db.select<Card[]>(
    "SELECT * FROM cards WHERE due <= ? ORDER BY due ASC",
    [now]
  );
}

export async function getCardById(id: number): Promise<Card | null> {
  const db = await getDb();
  const results = await db.select<Card[]>("SELECT * FROM cards WHERE id = ?", [id]);
  return results[0] ?? null;
}

export async function insertCard(card: CardInput): Promise<number> {
  const db = await getDb();
  const result = await db.execute(
    `INSERT INTO cards (deck_id, word, phonetic, definition, example, audio_url) VALUES (?, ?, ?, ?, ?, ?)`,
    [card.deck_id, card.word, card.phonetic, card.definition, card.example, card.audio_url]
  );
  return result.lastInsertId ?? 0;
}

export async function updateCardFsrs(
  cardId: number,
  fields: {
    due: number;
    stability: number;
    difficulty: number;
    elapsed_days: number;
    scheduled_days: number;
    reps: number;
    lapses: number;
    state: number;
    last_review: number;
  }
): Promise<void> {
  const db = await getDb();
  await db.execute(
    `UPDATE cards SET due = ?, stability = ?, difficulty = ?, elapsed_days = ?, scheduled_days = ?, reps = ?, lapses = ?, state = ?, last_review = ? WHERE id = ?`,
    [
      fields.due,
      fields.stability,
      fields.difficulty,
      fields.elapsed_days,
      fields.scheduled_days,
      fields.reps,
      fields.lapses,
      fields.state,
      fields.last_review,
      cardId,
    ]
  );
}

export async function insertReviewLog(log: Omit<ReviewLog, "id" | "created_at">): Promise<void> {
  const db = await getDb();
  await db.execute(
    `INSERT INTO review_logs (card_id, rating, state, due, stability, difficulty, elapsed_days, last_elapsed_days, scheduled_days, review) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      log.card_id,
      log.rating,
      log.state,
      log.due,
      log.stability,
      log.difficulty,
      log.elapsed_days,
      log.last_elapsed_days,
      log.scheduled_days,
      log.review,
    ]
  );
}

export async function getReviewLogs(cardId: number): Promise<ReviewLog[]> {
  const db = await getDb();
  return db.select<ReviewLog[]>(
    "SELECT * FROM review_logs WHERE card_id = ? ORDER BY review ASC",
    [cardId]
  );
}

export async function getStats(): Promise<{
  totalCards: number;
  dueCards: number;
  reviewedToday: number;
}> {
  const db = await getDb();
  const now = Math.floor(Date.now() / 1000);
  const startOfDay = now - (now % 86400);

  const totalResult = await db.select<{ totalCards: number }[]>("SELECT COUNT(*) as totalCards FROM cards");
  const dueResult = await db.select<{ dueCards: number }[]>(
    "SELECT COUNT(*) as dueCards FROM cards WHERE due <= ?",
    [now]
  );
  const reviewedResult = await db.select<{ reviewedToday: number }[]>(
    "SELECT COUNT(*) as reviewedToday FROM review_logs WHERE review >= ?",
    [startOfDay]
  );

  return {
    totalCards: totalResult[0]?.totalCards ?? 0,
    dueCards: dueResult[0]?.dueCards ?? 0,
    reviewedToday: reviewedResult[0]?.reviewedToday ?? 0,
  };
}

export async function getIrregularVerbs(level?: string): Promise<IrregularVerb[]> {
  const db = await getDb();
  if (level) {
    return db.select<IrregularVerb[]>(
      "SELECT * FROM irregular_verbs WHERE level = ? ORDER BY base ASC",
      [level]
    );
  }
  return db.select<IrregularVerb[]>("SELECT * FROM irregular_verbs ORDER BY base ASC");
}

export async function getIrregularVerbById(id: number): Promise<IrregularVerb | null> {
  const db = await getDb();
  const results = await db.select<IrregularVerb[]>("SELECT * FROM irregular_verbs WHERE id = ?", [id]);
  return results[0] ?? null;
}

export async function getPhrasalVerbs(level?: string): Promise<PhrasalVerb[]> {
  const db = await getDb();
  if (level) {
    return db.select<PhrasalVerb[]>(
      "SELECT * FROM phrasal_verbs WHERE level = ? ORDER BY verb ASC",
      [level]
    );
  }
  return db.select<PhrasalVerb[]>("SELECT * FROM phrasal_verbs ORDER BY verb ASC");
}

export async function getPhrasalVerbById(id: number): Promise<PhrasalVerb | null> {
  const db = await getDb();
  const results = await db.select<PhrasalVerb[]>("SELECT * FROM phrasal_verbs WHERE id = ?", [id]);
  return results[0] ?? null;
}

export async function getTranslationExercises(difficulty?: string, category?: string): Promise<TranslationExercise[]> {
  const db = await getDb();
  if (difficulty && category) {
    return db.select<TranslationExercise[]>(
      "SELECT * FROM translation_exercises WHERE difficulty = ? AND category = ? ORDER BY id ASC",
      [difficulty, category]
    );
  }
  if (difficulty) {
    return db.select<TranslationExercise[]>(
      "SELECT * FROM translation_exercises WHERE difficulty = ? ORDER BY id ASC",
      [difficulty]
    );
  }
  if (category) {
    return db.select<TranslationExercise[]>(
      "SELECT * FROM translation_exercises WHERE category = ? ORDER BY id ASC",
      [category]
    );
  }
  return db.select<TranslationExercise[]>("SELECT * FROM translation_exercises ORDER BY id ASC");
}

export async function getTranslationExerciseById(id: number): Promise<TranslationExercise | null> {
  const db = await getDb();
  const results = await db.select<TranslationExercise[]>("SELECT * FROM translation_exercises WHERE id = ?", [id]);
  return results[0] ?? null;
}

export async function getTranslationProgress(): Promise<TranslationProgress[]> {
  const db = await getDb();
  return db.select<TranslationProgress[]>("SELECT * FROM translation_progress ORDER BY completed_at DESC");
}

export async function getTranslationProgressByExerciseId(exerciseId: number): Promise<TranslationProgress | null> {
  const db = await getDb();
  const results = await db.select<TranslationProgress[]>(
    "SELECT * FROM translation_progress WHERE exercise_id = ?",
    [exerciseId]
  );
  return results[0] ?? null;
}

export async function saveTranslationProgress(
  exerciseId: number,
  score: number,
  userTranslation: string
): Promise<void> {
  const db = await getDb();
  const now = Date.now();
  await db.execute(
    "INSERT OR REPLACE INTO translation_progress (exercise_id, score, user_translation, completed_at) VALUES (?, ?, ?, ?)",
    [exerciseId, score, userTranslation, now]
  );
}
