import Database from "@tauri-apps/plugin-sql";
import type { Card, CardInput, Deck, ReviewLog, IrregularVerb, PhrasalVerb, TranslationExercise, TranslationProgress, GrammarLesson, GrammarExercise, GrammarProgress, LongTranslationExercise, ExtendedTranslationExercise, NumberExercise, DictationSentence, ThematicVocabulary } from "./schema";

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
      translation_fr TEXT,
      tags TEXT,
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

  // Migration: add tags column if it doesn't exist
  try {
    await db.execute("ALTER TABLE cards ADD COLUMN tags TEXT");
  } catch {
    // Column already exists
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
    `INSERT INTO cards (deck_id, word, phonetic, definition, example, audio_url, translation_fr, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [card.deck_id, card.word, card.phonetic, card.definition, card.example, card.audio_url, card.translation_fr ?? null, card.tags ?? null]
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

export async function getGrammarLessons(level?: string, category?: string): Promise<GrammarLesson[]> {
  const db = await getDb();
  if (level && category) {
    return db.select<GrammarLesson[]>(
      "SELECT * FROM grammar_lessons WHERE level = ? AND category = ? ORDER BY order_index ASC",
      [level, category]
    );
  }
  if (level) {
    return db.select<GrammarLesson[]>(
      "SELECT * FROM grammar_lessons WHERE level = ? ORDER BY order_index ASC",
      [level]
    );
  }
  if (category) {
    return db.select<GrammarLesson[]>(
      "SELECT * FROM grammar_lessons WHERE category = ? ORDER BY order_index ASC",
      [category]
    );
  }
  return db.select<GrammarLesson[]>("SELECT * FROM grammar_lessons ORDER BY order_index ASC");
}

export async function getGrammarLessonBySlug(slug: string): Promise<GrammarLesson | null> {
  const db = await getDb();
  const results = await db.select<GrammarLesson[]>("SELECT * FROM grammar_lessons WHERE slug = ?", [slug]);
  return results[0] ?? null;
}

export async function getGrammarLessonById(id: number): Promise<GrammarLesson | null> {
  const db = await getDb();
  const results = await db.select<GrammarLesson[]>("SELECT * FROM grammar_lessons WHERE id = ?", [id]);
  return results[0] ?? null;
}

export async function getGrammarExercises(lessonId: number): Promise<GrammarExercise[]> {
  const db = await getDb();
  return db.select<GrammarExercise[]>(
    "SELECT * FROM grammar_exercises WHERE lesson_id = ? ORDER BY order_index ASC",
    [lessonId]
  );
}

export async function getGrammarProgress(): Promise<GrammarProgress[]> {
  const db = await getDb();
  return db.select<GrammarProgress[]>("SELECT * FROM grammar_progress ORDER BY completed_at DESC");
}

export async function getGrammarProgressByLesson(lessonId: number): Promise<GrammarProgress | null> {
  const db = await getDb();
  const results = await db.select<GrammarProgress[]>(
    "SELECT * FROM grammar_progress WHERE lesson_id = ?",
    [lessonId]
  );
  return results[0] ?? null;
}

export async function saveGrammarProgress(
  lessonId: number,
  score: number,
  total: number,
  lastExerciseId: number
): Promise<void> {
  const db = await getDb();
  const now = Date.now();
  const completed = score === total ? 1 : 0;
  await db.execute(
    "INSERT OR REPLACE INTO grammar_progress (lesson_id, completed, score, total, last_exercise_id, completed_at) VALUES (?, ?, ?, ?, ?, ?)",
    [lessonId, completed, score, total, lastExerciseId, now]
  );
}

// Long Translation Exercises
export async function getLongTranslationExercises(): Promise<LongTranslationExercise[]> {
  const db = await getDb();
  return db.select<LongTranslationExercise[]>("SELECT * FROM long_translation_exercises ORDER BY RANDOM()");
}

export async function getLongTranslationExercisesByCategory(category: string): Promise<LongTranslationExercise[]> {
  const db = await getDb();
  return db.select<LongTranslationExercise[]>(
    "SELECT * FROM long_translation_exercises WHERE category = ? ORDER BY RANDOM()",
    [category]
  );
}

export async function getLongTranslationExerciseById(id: number): Promise<LongTranslationExercise | null> {
  const db = await getDb();
  const results = await db.select<LongTranslationExercise[]>(
    "SELECT * FROM long_translation_exercises WHERE id = ?",
    [id]
  );
  return results[0] ?? null;
}

export async function getExtendedTranslationExercises(category?: string): Promise<ExtendedTranslationExercise[]> {
  const db = await getDb();
  if (category) {
    return db.select<ExtendedTranslationExercise[]>(
      "SELECT * FROM extended_translation_exercises WHERE category = ? ORDER BY id",
      [category]
    );
  }
  return db.select<ExtendedTranslationExercise[]>("SELECT * FROM extended_translation_exercises ORDER BY id");
}

export async function getExtendedTranslationExerciseById(id: number): Promise<ExtendedTranslationExercise | null> {
  const db = await getDb();
  const results = await db.select<ExtendedTranslationExercise[]>(
    "SELECT * FROM extended_translation_exercises WHERE id = ?",
    [id]
  );
  return results[0] ?? null;
}

export async function getNumberExercises(type?: string, difficulty?: string): Promise<NumberExercise[]> {
  const db = await getDb();
  if (type && difficulty) {
    return db.select<NumberExercise[]>(
      "SELECT * FROM number_exercises WHERE type = ? AND difficulty = ? ORDER BY id",
      [type, difficulty]
    );
  }
  if (type) {
    return db.select<NumberExercise[]>(
      "SELECT * FROM number_exercises WHERE type = ? ORDER BY id",
      [type]
    );
  }
  if (difficulty) {
    return db.select<NumberExercise[]>(
      "SELECT * FROM number_exercises WHERE difficulty = ? ORDER BY id",
      [difficulty]
    );
  }
  return db.select<NumberExercise[]>("SELECT * FROM number_exercises ORDER BY id");
}

export async function getNumberExerciseTypes(): Promise<string[]> {
  const db = await getDb();
  const results = await db.select<{ type: string }[]>(
    "SELECT DISTINCT type FROM number_exercises ORDER BY type"
  );
  return results.map((r) => r.type);
}

export async function getDictationSentences(count: number, difficulty?: string): Promise<DictationSentence[]> {
  const db = await getDb();
  if (difficulty) {
    return db.select<DictationSentence[]>(
      "SELECT * FROM dictation_sentences WHERE difficulty = ? ORDER BY RANDOM() LIMIT ?",
      [difficulty, count]
    );
  }
  return db.select<DictationSentence[]>(
    "SELECT * FROM dictation_sentences ORDER BY RANDOM() LIMIT ?",
    [count]
  );
}

export async function getDictationDifficulties(): Promise<string[]> {
  const db = await getDb();
  const results = await db.select<{ difficulty: string }[]>(
    "SELECT DISTINCT difficulty FROM dictation_sentences ORDER BY difficulty"
  );
  return results.map((r) => r.difficulty);
}

export async function getReviewHistory(days: number): Promise<{ date: string; count: number; avg_rating: number }[]> {
  const db = await getDb();
  const now = Math.floor(Date.now() / 1000);
  const start = now - days * 86400;
  return db.select<{ date: string; count: number; avg_rating: number }[]>(
    `SELECT strftime('%Y-%m-%d', review, 'unixepoch') as date, COUNT(*) as count, AVG(rating) as avg_rating FROM review_logs WHERE review >= ? GROUP BY date ORDER BY date ASC`,
    [start]
  );
}

export async function getRetentionRate(): Promise<{ retention: number; totalReviews: number; againCount: number }> {
  const db = await getDb();
  const results = await db.select<{ total: number; again: number }[]>(
    "SELECT COUNT(*) as total, SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as again FROM review_logs"
  );
  const total = results[0]?.total ?? 0;
  const again = results[0]?.again ?? 0;
  return {
    retention: total > 0 ? Math.round(((total - again) / total) * 100) : 0,
    totalReviews: total,
    againCount: again,
  };
}

export async function getActivityHeatmap(days: number): Promise<{ date: string; count: number }[]> {
  const db = await getDb();
  const now = Math.floor(Date.now() / 1000);
  const start = now - days * 86400;
  return db.select<{ date: string; count: number }[]>(
    `SELECT strftime('%Y-%m-%d', review, 'unixepoch') as date, COUNT(*) as count FROM review_logs WHERE review >= ? GROUP BY date ORDER BY date ASC`,
    [start]
  );
}

export async function getAllCards(): Promise<Card[]> {
  const db = await getDb();
  return db.select<Card[]>("SELECT * FROM cards ORDER BY created_at DESC");
}

export async function getCardsByTag(tag: string): Promise<Card[]> {
  const db = await getDb();
  return db.select<Card[]>(
    "SELECT * FROM cards WHERE tags LIKE ? ORDER BY created_at DESC",
    [`%${tag}%`]
  );
}

export async function getAllTags(): Promise<string[]> {
  const db = await getDb();
  const results = await db.select<{ tags: string | null }[]>(
    "SELECT DISTINCT tags FROM cards WHERE tags IS NOT NULL AND tags != ''"
  );
  const tagSet = new Set<string>();
  results.forEach((r) => {
    if (r.tags) {
      r.tags.split(",").forEach((t) => tagSet.add(t.trim().toLowerCase()));
    }
  });
  return Array.from(tagSet).sort();
}

export async function updateCardTags(cardId: number, tags: string): Promise<void> {
  const db = await getDb();
  await db.execute("UPDATE cards SET tags = ? WHERE id = ?", [tags, cardId]);
}

export async function deleteCard(id: number): Promise<void> {
  const db = await getDb();
  await db.execute("DELETE FROM cards WHERE id = ?", [id]);
  await db.execute("DELETE FROM review_logs WHERE card_id = ?", [id]);
}

export async function searchAll(query: string): Promise<{ type: string; id: number; label: string; sublabel: string }[]> {
  const db = await getDb();
  const q = `%${query.toLowerCase()}%`;
  const results: { type: string; id: number; label: string; sublabel: string }[] = [];

  const cards = await db.select<{ id: number; word: string; definition: string }[]>(
    "SELECT id, word, definition FROM cards WHERE LOWER(word) LIKE ? OR LOWER(definition) LIKE ? LIMIT 10",
    [q, q]
  );
  cards.forEach((c) => results.push({ type: "card", id: c.id, label: c.word, sublabel: c.definition.slice(0, 60) }));

  const verbs = await db.select<{ id: number; base: string; meaning: string }[]>(
    "SELECT id, base, meaning FROM irregular_verbs WHERE LOWER(base) LIKE ? OR LOWER(meaning) LIKE ? LIMIT 10",
    [q, q]
  );
  verbs.forEach((v) => results.push({ type: "verb", id: v.id, label: v.base, sublabel: v.meaning }));

  const lessons = await db.select<{ id: number; title: string; category: string }[]>(
    "SELECT id, title, category FROM grammar_lessons WHERE LOWER(title) LIKE ? OR LOWER(category) LIKE ? LIMIT 10",
    [q, q]
  );
  lessons.forEach((l) => results.push({ type: "lesson", id: l.id, label: l.title, sublabel: l.category }));

  return results;
}

export async function backupDatabase(): Promise<string> {
  const db = await getDb();
  const result = await db.select<{ backup_path: string }[]>(
    "SELECT file_path FROM pragma_database_list WHERE name = 'main'"
  );
  const dbPath = result[0]?.backup_path;
  if (!dbPath) throw new Error("Cannot determine database path");

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = dbPath.replace(/\.db$/, `-backup-${timestamp}.db`);
  await db.execute(`VACUUM INTO '${backupPath}'`);
  return backupPath;
}

export async function getThematicVocabularyThemes(): Promise<{ theme_id: number; theme_fr: string; count: number }[]> {
  const db = await getDb();
  return db.select<{ theme_id: number; theme_fr: string; count: number }[]>(
    "SELECT theme_id, theme_fr, COUNT(*) as count FROM thematic_vocabulary GROUP BY theme_id ORDER BY theme_id ASC"
  );
}

export async function getThematicVocabularyByTheme(themeId: number): Promise<ThematicVocabulary[]> {
  const db = await getDb();
  return db.select<ThematicVocabulary[]>(
    "SELECT * FROM thematic_vocabulary WHERE theme_id = ? ORDER BY id ASC",
    [themeId]
  );
}

export async function getAllThematicVocabulary(): Promise<ThematicVocabulary[]> {
  const db = await getDb();
  return db.select<ThematicVocabulary[]>("SELECT * FROM thematic_vocabulary ORDER BY theme_id ASC, id ASC");
}
