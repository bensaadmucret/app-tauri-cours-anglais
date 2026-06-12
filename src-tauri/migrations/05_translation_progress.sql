CREATE TABLE IF NOT EXISTS translation_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  exercise_id INTEGER NOT NULL UNIQUE,
  score INTEGER CHECK(score >= 1 AND score <= 5),
  user_translation TEXT,
  completed_at INTEGER NOT NULL
);
