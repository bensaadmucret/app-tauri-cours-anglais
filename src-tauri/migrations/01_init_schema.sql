-- Decks (catégories de cartes)
CREATE TABLE IF NOT EXISTS decks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Cards (mots à apprendre + métadonnées FSRS)
CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deck_id INTEGER NOT NULL REFERENCES decks(id) ON DELETE CASCADE,
    word TEXT NOT NULL,
    phonetic TEXT,
    definition TEXT NOT NULL,
    example TEXT,
    audio_url TEXT,
    -- FSRS fields
    due INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    stability REAL NOT NULL DEFAULT 0,
    difficulty REAL NOT NULL DEFAULT 0,
    elapsed_days INTEGER NOT NULL DEFAULT 0,
    scheduled_days INTEGER NOT NULL DEFAULT 0,
    reps INTEGER NOT NULL DEFAULT 0,
    lapses INTEGER NOT NULL DEFAULT 0,
    state INTEGER NOT NULL DEFAULT 0, -- 0:New, 1:Learning, 2:Review, 3:Relearning
    last_review INTEGER,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- ReviewLogs (historique FSRS pour optimisation de l'algorithme)
CREATE TABLE IF NOT EXISTS review_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    card_id INTEGER NOT NULL REFERENCES cards(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL, -- 1:Again, 2:Hard, 3:Good, 4:Easy
    state INTEGER NOT NULL,
    due INTEGER NOT NULL,
    stability REAL NOT NULL,
    difficulty REAL NOT NULL,
    elapsed_days INTEGER NOT NULL,
    last_elapsed_days INTEGER NOT NULL,
    scheduled_days INTEGER NOT NULL,
    review INTEGER NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
);

-- Insertion d'un deck par défaut
INSERT OR IGNORE INTO decks (name, description) VALUES ('Général', 'Deck par défaut');
