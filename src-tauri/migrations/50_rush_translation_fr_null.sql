-- Clear translation_fr for 'rush' since the definition was updated to common meaning
UPDATE cards
SET translation_fr = NULL
WHERE word = 'rush'
  AND definition LIKE '%Se dépêcher%';
