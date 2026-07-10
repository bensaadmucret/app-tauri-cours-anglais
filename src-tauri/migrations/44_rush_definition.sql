-- Fix 'rush' definition: was botanical (plant), now common meaning
UPDATE cards
SET definition = 'Se dépêcher, se précipiter; urgence, affluence soudaine',
    example = 'Don''t rush me, I need time to think.',
    translation_fr = NULL
WHERE word = 'rush'
  AND definition LIKE '%Juncus%';
