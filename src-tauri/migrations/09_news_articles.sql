CREATE TABLE IF NOT EXISTS news_articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title_en TEXT NOT NULL,
  title_fr TEXT,
  content_en TEXT NOT NULL,
  content_fr TEXT,
  source TEXT NOT NULL,
  category TEXT NOT NULL,
  url TEXT,
  published_at TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);
