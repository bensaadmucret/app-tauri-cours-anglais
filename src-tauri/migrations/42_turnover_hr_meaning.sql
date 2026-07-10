-- Add HR meaning of 'turnover' (staff turnover, employee turnover)
-- This complements the existing business/finance meaning in migration 28.

INSERT OR IGNORE INTO cards (deck_id, word, phonetic, definition, example, translation_fr)
VALUES
(1, 'turnover', '/ˈtɜːnəʊvə/', 'the rotation of employees who leave and are replaced in a company', 'High turnover in this company creates continuity problems.', 'rotation du personnel, turnover'),
(1, 'turnover rate', '/ˈtɜːnəʊvə reɪt/', 'a measure that calculates the percentage of employees replaced over a period', 'The manager monitors the monthly turnover rate of his team.', 'taux de turnover, taux de rotation du personnel');
