-- Additional grammar exercises inspired by Bescherelle exercise formats
-- Uses new exercise types: reorder (word ordering) and match (matching pairs)
-- Also adds more fill_blank transformation and translation exercises

-- ===== REORDER exercises (remettre les mots dans l'ordre) =====

-- Lesson: besch-present-simple-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre pour former une phrase correcte :', '["she","every","walks","morning","park","the","in"]', 'she walks in the park every morning', 'Sujet + verbe + lieu + temps', 2, 10 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une question correcte :', '["does","she","where","live"]', 'where does she live', 'WH- + auxiliaire + sujet + base verbale', 2, 11 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';

-- Lesson: besch-present-continuous-usage
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre :', '["is","she","a","reading","book"]', 'she is reading a book', 'Sujet + be + V-ing + objet', 2, 10 FROM grammar_lessons WHERE slug = 'besch-present-continuous-usage';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une phrase au présent continu :', '["they","are","their","doing","homework"]', 'they are doing their homework', 'Sujet + be + V-ing + objet', 2, 11 FROM grammar_lessons WHERE slug = 'besch-present-continuous-usage';

-- Lesson: besch-past-simple-formation
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (prétérit) :', '["yesterday","went","she","to","cinema","the"]', 'she went to the cinema yesterday', 'Sujet + verbe irrégulier + lieu + temps', 2, 10 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une question au prétérit :', '["did","you","what","do","weekend","last"]', 'what did you do last weekend', 'WH- + did + sujet + base verbale + temps', 2, 11 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';

-- Lesson: besch-past-continuous
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (past continuous) :', '["was","he","when","cooking","arrived","I"]', 'he was cooking when I arrived', 'Sujet + was + V-ing + when + sujet + prétérit', 2, 10 FROM grammar_lessons WHERE slug = 'besch-past-continuous';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une phrase au past continuous :', '["were","they","when","playing","started","it","rain","to"]', 'they were playing when it started to rain', 'Sujet + were + V-ing + when + sujet + prétérit', 2, 11 FROM grammar_lessons WHERE slug = 'besch-past-continuous';

-- Lesson: besch-present-perfect-uses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (present perfect) :', '["have","I","to","been","Japan","never"]', 'I have never been to Japan', 'Sujet + have + never + been + lieu', 2, 10 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une question au present perfect :', '["have","you","ever","sushi","eaten"]', 'have you ever eaten sushi', 'Have + sujet + ever + participe passé', 2, 11 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';

-- Lesson: besch-passive-all-tenses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (voix passive) :', '["was","the","built","house","in","1990"]', 'the house was built in 1990', 'Sujet + was + participe passé + temps', 2, 10 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une phrase passive au futur :', '["will","be","the","announced","results","tomorrow"]', 'the results will be announced tomorrow', 'Sujet + will be + participe passé + temps', 2, 11 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';

-- Lesson: besch-conditionals-all-types
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (conditionnel type 1) :', '["if","rains","it","will","we","stay","home"]', 'if it rains we will stay home', 'If + présent, will + base', 2, 10 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez un conditionnel type 2 :', '["if","won","I","would","lottery","travel","the","I"]', 'if I won the lottery I would travel', 'If + past, would + base', 2, 11 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez un conditionnel type 3 :', '["if","had","I","would","studied","have","passed","I"]', 'if I had studied I would have passed', 'If + past perfect, would have + participe passé', 2, 12 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';

-- Lesson:besch-reported-speech-tenses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (reported speech) :', '["said","she","she","that","liked","tea"]', 'she said that she liked tea', 'Sujet + said + that + sujet + prétérit', 2, 10 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une phrase au reported speech :', '["he","me","told","would","he","he","call","that","later"]', 'he told me that he would call later', 'Sujet + told + objet + that + sujet + would + base', 2, 11 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';

-- Lesson: besch-future-forms
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (futur) :', '["going","it","is","to","rain"]', 'it is going to rain', 'Sujet + be + going to + base', 2, 10 FROM grammar_lessons WHERE slug = 'besch-future-forms';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une phrase au future continuous :', '["this","I","flying","be","will","Tokyo","time","to","tomorrow"]', 'this time tomorrow I will be flying to Tokyo', 'Temps + sujet + will be + V-ing', 2, 11 FROM grammar_lessons WHERE slug = 'besch-future-forms';

-- Lesson: besch-gerund-infinitive-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (gérondif) :', '["enjoys","she","novels","reading"]', 'she enjoys reading novels', 'Sujet + enjoy + gérondif + objet', 2, 10 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une phrase avec infinitif :', '["decided","she","leave","to","early"]', 'she decided to leave early', 'Sujet + decide + to + base', 2, 11 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';

-- Lesson: besch-questions-types
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez un question tag correct :', '["French","you","aren''t","are","you"]', 'you are French aren''t you', 'Affirmation + auxiliaire opposé + pronom', 2, 10 FROM grammar_lessons WHERE slug = 'besch-questions-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une question indirecte :', '["where","you","she","lives","know","do"]', 'do you know where she lives', 'Question + WH- + sujet + verbe (pas d''inversion)', 2, 11 FROM grammar_lessons WHERE slug = 'besch-questions-types';

-- Lesson: besch-inversion-emphasis
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Remettez ces mots dans l''ordre (inversion) :', '["have","I","such","never","place","a","seen","beautiful"]', 'never have I seen such a beautiful place', 'Never + have + sujet + participe passé', 2, 10 FROM grammar_lessons WHERE slug = 'besch-inversion-emphasis';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'reorder', 'Formez une phrase avec inversion :', '["I","had","hardly","when","arrived","phone","the","rang"]', 'hardly had I arrived when the phone rang', 'Hardly + had + sujet + participe passé + when', 2, 11 FROM grammar_lessons WHERE slug = 'besch-inversion-emphasis';

-- ===== MATCH exercises (associer les paires) =====

-- Lesson: besch-present-simple-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque phrase à sa traduction française :', '{"left":["She walks to school.","He plays football.","They study English.","We live in Paris."],"right":["Elle marche à l''école.","Il joue au football.","Ils étudient l''anglais.","Nous vivons à Paris."]}', 'She walks to school.=Elle marche à l''école.|He plays football.=Il joue au football.|They study English.=Ils étudient l''anglais.|We live in Paris.=Nous vivons à Paris.', 'Présent simple : sujet + base verbale (+s à la 3e personne)', 3, 12 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';

-- Lesson: besch-past-simple-formation
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque verbe à son prétérit :', '{"left":["go","see","buy","eat","drink"],"right":["went","saw","bought","ate","drank"]}', 'buy=bought|drink=drank|eat=ate|go=went|see=saw', 'Verbes irréguliers au prétérit', 3, 12 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';

-- Lesson:besch-present-perfect-uses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque phrase à son usage du present perfect :', '{"left":["I have lost my keys.","She has lived here since 2015.","Have you ever been to Italy?","He has just finished."],"right":["Résultat présent","Continuité depuis le passé","Expérience de vie","Action récente"]}', 'Have you ever been to Italy?=Expérience de vie|He has just finished.=Action récente|I have lost my keys.=Résultat présent|She has lived here since 2015.=Continuité depuis le passé', 'Le present perfect exprime résultat, continuité, expérience, action récente', 3, 12 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';

-- Lesson: besch-modals-past
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque modal du passé à son sens :', '{"left":["must have","should have","could have","might have"],"right":["Déduction quasi-certaine","Regret / conseil non suivi","Possibilité non réalisée","Probabilité faible"]}', 'could have=Possibilité non réalisée|might have=Probabilité faible|must have=Déduction quasi-certaine|should have=Regret / conseil non suivi', 'Modaux du passé : must have (déduction), should have (regret), could have (possibilité), might have (probabilité)', 3, 10 FROM grammar_lessons WHERE slug = 'besch-modals-past';

-- Lesson: besch-passive-all-tenses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque phrase passive à son temps :', '{"left":["English is spoken here.","The house was built in 1990.","The results will be announced.","The work has been finished."],"right":["Présent simple passif","Prétérit passif","Futur passif","Present perfect passif"]}', 'English is spoken here.=Présent simple passif|The house was built in 1990.=Prétérit passif|The results will be announced.=Futur passif|The work has been finished.=Present perfect passif', 'La voix passive utilise be + participe passé à tous les temps', 3, 12 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';

-- Lesson: besch-conditionals-all-types
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque conditionnel à son type :', '{"left":["If you heat ice, it melts.","If it rains, we will stay home.","If I won the lottery, I would travel.","If I had studied, I would have passed."],"right":["Type 0 (vérité générale)","Type 1 (réel possible)","Type 2 (irréel/hypothèse)","Type 3 (irréel du passé)"]}', 'If I had studied, I would have passed.=Type 3 (irréel du passé)|If I won the lottery, I would travel.=Type 2 (irréel/hypothèse)|If it rains, we will stay home.=Type 1 (réel possible)|If you heat ice, it melts.=Type 0 (vérité générale)', 'Conditionnels : 0 = vérité, 1 = possible, 2 = hypothèse, 3 = passé irréel', 3, 13 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';

-- Lesson: besch-future-forms
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque phrase à la forme de futur utilisée :', '{"left":["I will help you.","Look! It is going to rain.","The train leaves at 10 AM.","This time tomorrow, I will be flying."],"right":["Décision spontanée (will)","Prédiction avec preuves (be going to)","Horaires officiels (présent simple)","Action en cours dans le futur (future continuous)"]}', 'I will help you.=Décision spontanée (will)|Look! It is going to rain.=Prédiction avec preuves (be going to)|The train leaves at 10 AM.=Horaires officiels (présent simple)|This time tomorrow, I will be flying.=Action en cours dans le futur (future continuous)', 'Le futur s''exprime avec will, be going to, présent simple (horaires) ou future continuous', 3, 12 FROM grammar_lessons WHERE slug = 'besch-future-forms';

-- Lesson: besch-reported-speech-tenses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque discours direct à sa version rapportée :', '{"left":[""I like tea."",""I will call you."",""I can swim."",""I went home.""],"right":["She said she liked tea.","She said she would call me.","She said she could swim.","She said she had gone home."]}', '"I can swim."=She said she could swim.|"I like tea."=She said she liked tea.|"I went home."=She said she had gone home.|"I will call you."=She said she would call me.', 'Reported speech : présent→prétérit, will→would, can→could, past simple→past perfect', 3, 12 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';

-- Lesson: besch-relative-pronouns
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque pronom relatif à son usage :', '{"left":["who","which","whose","where"],"right":["Personne (sujet)","Chose ou animal","Possession","Lieu"]}', 'where=Lieu|which=Chose ou animal|who=Personne (sujet)|whose=Possession', 'Pronoms relatifs : who (personne), which (chose), whose (possession), where (lieu)', 3, 10 FROM grammar_lessons WHERE slug = 'besch-relative-pronouns';

-- Lesson: besch-quantifiers-detailed
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque quantifieur à son usage :', '{"left":["some","any","much","many","a few","a little"],"right":["Affirmatif (dénombrable/indénombrable)","Interrogatif ou négatif","Indénombrable (quantité)","Dénombrable (nombre)","Dénombrable (sens positif)","Indénombrable (sens positif)"]}', 'a few=Dénombrable (sens positif)|a little=Indénombrable (sens positif)|any=Interrogatif ou négatif|many=Dénombrable (nombre)|much=Indénombrable (quantité)|some=Affirmatif (dénombrable/indénombrable)', 'Quantifieurs : some (affirmatif), any (négatif/interro), much (indénombrable), many (dénombrable), a few (dénombrable +), a little (indénombrable +)', 3, 10 FROM grammar_lessons WHERE slug = 'besch-quantifiers-detailed';

-- Lesson: besch-gerund-infinitive-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque verbe à la forme qui suit (gérondif ou infinitif) :', '{"left":["enjoy","decide","avoid","want","mind","promise"],"right":["gérondif (-ing)","infinitif (to + base)","gérondif (-ing)","infinitif (to + base)","gérondif (-ing)","infinitif (to + base)"]}', 'avoid=gérondif (-ing)|decide=infinitif (to + base)|enjoy=gérondif (-ing)|mind=gérondif (-ing)|promise=infinitif (to + base)|want=infinitif (to + base)', 'Verbes + gérondif : enjoy, avoid, mind. Verbes + infinitif : decide, want, promise', 3, 12 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';

-- Lesson: besch-articles-complete
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque phrase à l''article correct :', '{"left":["___ apple","___ university","___ sun","___ dogs are loyal"],"right":["an (son voyelle)","a (son consonne)","the (unique)","article zéro (pluriel général)"]}', '___ apple=an (son voyelle)|___ dogs are loyal=article zéro (pluriel général)|___ sun=the (unique)|___ university=a (son consonne)', 'Articles : a (consonne), an (voyelle), the (unique/défini), zéro (général)', 3, 10 FROM grammar_lessons WHERE slug = 'besch-articles-complete';

-- Lesson:besch-comparatives-superlatives
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque adjectif à sa forme comparative et superlative :', '{"left":["good","tall","expensive","happy"],"right":["better / the best","taller / the tallest","more expensive / the most expensive","happier / the happiest"]}', 'expensive=more expensive / the most expensive|good=better / the best|happy=happier / the happiest|tall=taller / the tallest', 'Comparatifs : court +er, long more +, irrégulier good→better→best, y→ier', 3, 10 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';

-- Lesson: besch-prepositions-complete
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque préposition à son contexte :', '{"left":["in","at","on","through","for"],"right":["Ville ou pays","Heure précise","Surface ou jour","Mouvement à travers","Durée"]}', 'at=Heure précise|for=Durée|in=Ville ou pays|on=Surface ou jour|through=Mouvement à travers', 'Prépositions : in (ville/pays), at (heure), on (surface/jour), through (travers), for (durée)', 3, 10 FROM grammar_lessons WHERE slug = 'besch-prepositions-complete';

-- Lesson: besch-subordinate-clauses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'match', 'Associez chaque conjonction à son type de subordonnée :', '{"left":["when","because","although","unless","if"],"right":["Temps","Cause","Concession","Condition négative","Condition"]}', 'although=Concession|because=Cause|if=Condition|unless=Condition négative|when=Temps', 'Conjonctions : when (temps), because (cause), although (concession), unless (si non), if (condition)', 3, 10 FROM grammar_lessons WHERE slug = 'besch-subordinate-clauses';

-- ===== Additional fill_blank: transformation exercises =====

-- Lesson: besch-passive-all-tenses (transformation active → passive)
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Transformez en voix passive : "They build houses." → Houses ___', NULL, 'are built', 'Passive présent : is/are + participe passé', 2, 13 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Transformez en voix passive : "She wrote a letter." → A letter ___', NULL, 'was written', 'Passive prétérit : was/were + participe passé', 2, 14 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Transformez en voix passive : "They will publish the book." → The book ___', NULL, 'will be published', 'Passive futur : will be + participe passé', 2, 15 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';

-- Lesson: besch-reported-speech-tenses (transformation discours direct → indirect)
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Reported speech : "I am happy." → She said she ___ happy.', NULL, 'was', 'Reported speech : présent → prétérit', 2, 13 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Reported speech : "I have finished." → He said he ___ finished.', NULL, 'had', 'Reported speech : present perfect → past perfect', 2, 14 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Reported speech : "I will come." → She said she ___ come.', NULL, 'would', 'Reported speech : will → would', 2, 15 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';

-- Lesson: besch-conditionals-all-types (transformation)
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Conditionnel type 2 : If I ___ (be) you, I would accept.', NULL, 'were', 'Conditionnel type 2 : if + past, would + base. Avec "be" → were à toutes les personnes', 2, 14 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Conditionnel type 3 : If she ___ (study) harder, she would have passed.', NULL, 'had studied', 'Conditionnel type 3 : if + past perfect, would have + participe passé', 2, 15 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';

-- ===== Additional fill_blank: translation exercises (FR → EN) =====

-- Lesson: besch-present-simple-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "Elle va à l''école tous les jours." → She ___ to school every day.', NULL, 'goes', '3e personne du singulier → +s', 2, 13 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';

-- Lesson: besch-past-simple-formation
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "Nous avons vu un film hier." → We ___ a film yesterday.', NULL, 'saw', 'Verbe irrégulier : see → saw', 2, 13 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';

-- Lesson: besch-present-perfect-uses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "Je n''ai jamais mangé de sushi." → I have ___ eaten sushi.', NULL, 'never', 'Present perfect + never pour une expérience de vie', 2, 13 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';

-- Lesson: besch-future-forms
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "Il va pleuvoir." (prédiction avec nuages) → It ___ to rain.', NULL, 'is going', 'Prédiction basée sur des preuves visuelles → be going to', 2, 13 FROM grammar_lessons WHERE slug = 'besch-future-forms';

-- Lesson: besch-gerund-infinitive-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "J''évite de conduire la nuit." → I avoid ___ at night.', NULL, 'driving', 'Verbe avoid → gérondif', 2, 13 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';

-- Lesson: besch-comparatives-superlatives
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "C''est le meilleur livre que j''aie lu." → This is the ___ book I have ever read.', NULL, 'best', 'Superlatif irrégulier : good → the best', 2, 12 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';

-- Lesson: besch-prepositions-complete
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "Je vis à Londres depuis 2010." → I have lived in London ___ 2010.', NULL, 'since', 'Point de départ → since (durée avec from → for)', 2, 12 FROM grammar_lessons WHERE slug = 'besch-prepositions-complete';

-- Lesson: besch-articles-complete
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Traduisez : "Le soleil se lève à l''est." → ___ sun rises in ___ east.', NULL, 'The / the', 'Objets uniques → the', 2, 12 FROM grammar_lessons WHERE slug = 'besch-articles-complete';

-- ===== Additional QCM: error correction exercises =====

-- Lesson: besch-present-simple-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "She don''t like coffee."', '["She doesn''t likes coffee.","She doesn''t like coffee.","She don''t likes coffee.","She isn''t like coffee."]', 'She doesn''t like coffee', '3e personne du singulier : does not + base verbale (sans -s)', 2, 14 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';

-- Lesson: besch-past-simple-formation
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "I goed to school yesterday."', '["I gone to school yesterday.","I went to school yesterday.","I going to school yesterday.","I go to school yesterday."]', 'I went to school yesterday', 'Verbe irrégulier : go → went (pas goed)', 2, 14 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';

-- Lesson: besch-present-perfect-uses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "I have saw this movie."', '["I have see this movie.","I have seen this movie.","I has seen this movie.","I had saw this movie."]', 'I have seen this movie', 'Present perfect : have + participe passé (seen, pas saw)', 2, 14 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';

-- Lesson: besch-conditionals-all-types
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "If I will rain, we stay home."', '["If it rains, we will stay home.","If it will rain, we will stay home.","If it rain, we stay home.","If it raining, we will stay home."]', 'If it rains, we will stay home', 'Conditionnel type 1 : if + présent (pas will), will + base', 2, 16 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';

-- Lesson: besch-passive-all-tenses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "The book was wrote by him."', '["The book was written by him.","The book was write by him.","The book is wrote by him.","The book were written by him."]', 'The book was written by him', 'Passive : was + participe passé (written, pas wrote)', 2, 16 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';

-- Lesson: besch-gerund-infinitive-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "I enjoy to read books."', '["I enjoy read books.","I enjoy reading books.","I enjoy to reading books.","I enjoys reading books."]', 'I enjoy reading books', 'Verbe enjoy → gérondif (reading, pas to read)', 2, 14 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';

-- Lesson: besch-articles-complete
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "I have a umbrella."', '["I have an umbrella.","I have a umbrella.","I have the umbrella.","I have umbrella."]', 'I have an umbrella', 'Umbrella commence par son voyelle → an', 2, 13 FROM grammar_lessons WHERE slug = 'besch-articles-complete';

-- Lesson: besch-comparatives-superlatives
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Corrigez l''erreur : "She is more tall than him."', '["She is taller than him.","She is more taller than him.","She is tallest than him.","She is tall than him."]', 'She is taller than him', 'Adjectif court → comparatif en -er (pas more + adj)', 2, 13 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';
