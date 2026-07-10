-- Fix 'channel' definition: was only verbal meaning, now includes common noun meanings
UPDATE cards
SET definition = 'Canal, chaine (TV/Radio); canal de communication; détroit. (verbe) canaliser, orienter',
    translation_fr = NULL
WHERE word = 'channel'
  AND definition = 'to direct energy or emotion in a particular way';
