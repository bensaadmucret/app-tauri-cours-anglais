-- Merge HR meaning into the existing turnover card (id=22) and remove the duplicate
UPDATE cards
SET definition = '1. the total revenue of a business  2. the rotation of employees who leave and are replaced in a company',
    example = 'The company has a turnover of five million pounds. — High turnover in this company creates continuity problems.',
    translation_fr = '1. chiffre d''affaires  2. rotation du personnel, turnover'
WHERE id = 22;

DELETE FROM cards WHERE id = 218;
