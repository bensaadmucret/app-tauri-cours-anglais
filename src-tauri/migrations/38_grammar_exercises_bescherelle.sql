-- Grammar exercises from Bescherelle "Maîtriser la grammaire anglaise"
-- QCM and fill_blank exercises linked to Bescherelle grammar lessons (migration 37)

-- Lesson: besch-present-simple-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She ___ to the gym every morning.', '["go", "goes", "going", "gone"]', 'goes', '3e personne du singulier → +s', 1, 1 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'My brother ___ football on Saturdays.', '["play", "plays", "playing", "is playing"]', 'plays', '3e personne du singulier → +s', 1, 2 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'The train ___ (leave) at 8 PM every day.', NULL, 'leaves', 'Horaires fixes → présent simple, 3e personne +s', 1, 3 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Water ___ at 100 degrees Celsius.', '["boil", "boils", "is boiling", "boiled"]', 'boils', 'Vérité générale → présent simple', 1, 4 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'She ___ (study) English at university.', NULL, 'studies', 'Verbe en consonne + y → y devient i + es', 1, 5 FROM grammar_lessons WHERE slug = 'besch-present-simple-rules';

-- Lesson: besch-present-continuous-usage
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Look! The baby ___.', '["sleep", "sleeps", "is sleeping", "sleeping"]', 'is sleeping', 'Action en cours → présent continu', 1, 1 FROM grammar_lessons WHERE slug = 'besch-present-continuous-usage';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'I ___ (read) a great book right now.', NULL, 'am reading', 'Action en cours → be + -ing', 1, 2 FROM grammar_lessons WHERE slug = 'besch-present-continuous-usage';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She ___ with her parents this month.', '["lives", "is living", "live", "living"]', 'is living', 'Situation temporaire → présent continu', 1, 3 FROM grammar_lessons WHERE slug = 'besch-present-continuous-usage';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'They ___ (meet) us tomorrow at 7 PM.', NULL, 'are meeting', 'Futur planifié → présent continu', 1, 4 FROM grammar_lessons WHERE slug = 'besch-present-continuous-usage';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I ___ this soup. It tastes delicious!', '["am loving", "love", "loves", "loving"]', 'love', 'Verbe d''état → pas de continu', 1, 5 FROM grammar_lessons WHERE slug = 'besch-present-continuous-usage';

-- Lesson: besch-past-simple-formation
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'We ___ London last summer.', '["visit", "visited", "visiting", "have visited"]', 'visited', 'Action terminée → prétérit simple +ed', 1, 1 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'She ___ (stop) the car at the red light.', NULL, 'stopped', 'Monosyllabe CVC → double consonne + ed', 1, 2 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'He ___ a new car yesterday.', '["buy", "bought", "buys", "buyed"]', 'bought', 'Verbe irrégulier : buy → bought', 1, 3 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'They ___ (study) all night for the exam.', NULL, 'studied', 'Consonne + y → y devient i + ed', 1, 4 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I ___ him at the party last night.', '["see", "saw", "seen", "seeing"]', 'saw', 'Verbe irrégulier : see → saw', 1, 5 FROM grammar_lessons WHERE slug = 'besch-past-simple-formation';

-- Lesson: besch-past-continuous
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'At 8 PM, I ___ TV.', '["watch", "watched", "was watching", "am watching"]', 'was watching', 'Action en cours à un moment du passé → past continuous', 1, 1 FROM grammar_lessons WHERE slug = 'besch-past-continuous';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'I ___ (cook) when the phone rang.', NULL, 'was cooking', 'Action en cours interrompue → past continuous', 1, 2 FROM grammar_lessons WHERE slug = 'besch-past-continuous';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'While she ___ a book, he ___ dinner.', '["read / cooked", "was reading / was cooking", "reads / cooks", "reading / cooking"]', 'was reading / was cooking', 'Deux actions simultanées → past continuous', 1, 3 FROM grammar_lessons WHERE slug = 'besch-past-continuous';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'They ___ (play) tennis when it started to rain.', NULL, 'were playing', 'Action en cours interrompue → past continuous', 1, 4 FROM grammar_lessons WHERE slug = 'besch-past-continuous';

-- Lesson: besch-present-perfect-uses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', '___ you ever ___ to Japan?', '["Did / go", "Have / been", "Have / gone", "Do / go"]', 'Have / been', 'Expérience de vie → present perfect + ever + been', 1, 1 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'I ___ (lose) my keys. I can''t find them.', NULL, 'have lost', 'Résultat présent → present perfect', 1, 2 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She ___ here since 2015.', '["lives", "has lived", "is living", "lived"]', 'has lived', 'Continuité depuis le passé → present perfect + since', 1, 3 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'We ___ (just / finish) the project.', NULL, 'have just finished', 'Action récente → present perfect + just', 1, 4 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I ___ sushi in my life.', '["never ate", "have never eaten", "don''t eat", "never eat"]', 'have never eaten', 'Expérience → present perfect + never', 1, 5 FROM grammar_lessons WHERE slug = 'besch-present-perfect-uses';

-- Lesson: besch-present-perfect-continuous
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I ___ English for five years.', '["study", "have been studying", "have studied", "am studying"]', 'have been studying', 'Insistance sur la durée → present perfect continuous', 1, 1 FROM grammar_lessons WHERE slug = 'besch-present-perfect-continuous';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'It ___ (rain) all day.', NULL, 'has been raining', 'Processus en cours → present perfect continuous', 1, 2 FROM grammar_lessons WHERE slug = 'besch-present-perfect-continuous';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She ___ since 8 AM.', '["works", "has been working", "is working", "worked"]', 'has been working', 'Durée d''une action qui continue → present perfect continuous', 1, 3 FROM grammar_lessons WHERE slug = 'besch-present-perfect-continuous';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'They ___ (wait) for two hours when the bus arrived.', NULL, 'had been waiting', 'Durée avant une autre action → past perfect continuous (attention au contexte)', 1, 4 FROM grammar_lessons WHERE slug = 'besch-present-perfect-continuous';

-- Lesson: besch-past-perfect
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'When I arrived, the train ___.', '["left", "had left", "has left", "leaves"]', 'had left', 'Antériorité → past perfect', 1, 1 FROM grammar_lessons WHERE slug = 'besch-past-perfect';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'She ___ (finish) her homework before dinner.', NULL, 'had finished', 'Action antérieure à une autre → past perfect', 1, 2 FROM grammar_lessons WHERE slug = 'besch-past-perfect';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I ___ such a beautiful sunset before.', '["never saw", "had never seen", "have never seen", "never see"]', 'had never seen', 'Antériorité avec never → past perfect', 1, 3 FROM grammar_lessons WHERE slug = 'besch-past-perfect';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'By the time we got there, they ___ (eat) everything.', NULL, 'had eaten', 'Action antérieure → past perfect', 1, 4 FROM grammar_lessons WHERE slug = 'besch-past-perfect';

-- Lesson: besch-modals-past
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'He ___ forgotten the meeting.', '["must have", "must has", "must", "must to have"]', 'must have', 'Déduction au passé → must + have + participe passé', 1, 1 FROM grammar_lessons WHERE slug = 'besch-modals-past';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'You ___ (should / tell) me earlier.', NULL, 'should have told', 'Regret/critique au passé → should + have + participe passé', 1, 2 FROM grammar_lessons WHERE slug = 'besch-modals-past';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She ___ taken the bus instead.', '["could have", "could has", "could", "could to have"]', 'could have', 'Possibilité au passé → could + have + participe passé', 1, 3 FROM grammar_lessons WHERE slug = 'besch-modals-past';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'I ___ (should / not / eat) so much cake.', NULL, 'shouldn''t have eaten', 'Critique au passé → shouldn''t + have + participe passé', 1, 4 FROM grammar_lessons WHERE slug = 'besch-modals-past';

-- Lesson: besch-passive-all-tenses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'English ___ here.', '["speaks", "is spoken", "is speaking", "spoken"]', 'is spoken', 'Passive présent simple → is + participe passé', 1, 1 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'The house ___ (build) in 1990.', NULL, 'was built', 'Passive prétérit → was + participe passé', 1, 2 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'The results ___ tomorrow.', '["will announce", "will be announced", "are announced", "will announced"]', 'will be announced', 'Passive futur → will be + participe passé', 1, 3 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'The work ___ (finish) recently.', NULL, 'has been finished', 'Passive present perfect → has been + participe passé', 1, 4 FROM grammar_lessons WHERE slug = 'besch-passive-all-tenses';

-- Lesson: besch-conditionals-all-types
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'If you heat ice, it ___.', '["melts", "melted", "will melt", "would melt"]', 'melts', 'Conditionnel type 0 → présent + présent', 1, 1 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'If it rains, we ___ (stay) home.', NULL, 'will stay', 'Conditionnel type 1 → if + présent, will + base', 1, 2 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'If I won the lottery, I ___ the world.', '["travel", "will travel", "would travel", "would have traveled"]', 'would travel', 'Conditionnel type 2 → if + past, would + base', 1, 3 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'If I had studied harder, I ___ (pass) the exam.', NULL, 'would have passed', 'Conditionnel type 3 → if + past perfect, would have + participe passé', 1, 4 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'If I ___ money, I would be rich now.', '["saved", "had saved", "save", "have saved"]', 'had saved', 'Conditionnel mixte → if + past perfect, would + base', 1, 5 FROM grammar_lessons WHERE slug = 'besch-conditionals-all-types';

-- Lesson: besch-future-forms
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Look at those clouds! It ___ rain.', '["will", "is going to", "goes to", "rains"]', 'is going to', 'Prédiction basée sur des preuves → be going to', 1, 1 FROM grammar_lessons WHERE slug = 'besch-future-forms';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'I ___ (help) you with that.', NULL, 'will help', 'Décision spontanée → will', 1, 2 FROM grammar_lessons WHERE slug = 'besch-future-forms';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'The flight ___ at 10 AM.', '["leaves", "is leaving", "will leave", "leave"]', 'leaves', 'Horaires officiels → présent simple', 1, 3 FROM grammar_lessons WHERE slug = 'besch-future-forms';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'This time tomorrow, I ___ (fly) to Tokyo.', NULL, 'will be flying', 'Action en cours dans le futur → future continuous', 1, 4 FROM grammar_lessons WHERE slug = 'besch-future-forms';

-- Lesson: besch-reported-speech-tenses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She said she ___ tea.', '["likes", "liked", "like", "has liked"]', 'liked', 'Reported speech : présent → prétérit', 1, 1 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'He said he ___ (call) me the next day.', NULL, 'would call', 'Reported speech : will → would', 1, 2 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She said she ___ swim.', '["can", "could", "cans", "will"]', 'could', 'Reported speech : can → could', 1, 3 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'They said they ___ (go) to the cinema the day before.', NULL, 'had gone', 'Reported speech : past simple → past perfect', 1, 4 FROM grammar_lessons WHERE slug = 'besch-reported-speech-tenses';

-- Lesson: besch-relative-pronouns
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'The man ___ lives next door is a doctor.', '["which", "who", "whose", "whom"]', 'who', 'Personne (sujet) → who', 1, 1 FROM grammar_lessons WHERE slug = 'besch-relative-pronouns';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'The book ___ I bought is excellent. (which/who)', NULL, 'which', 'Chose → which', 1, 2 FROM grammar_lessons WHERE slug = 'besch-relative-pronouns';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'The girl ___ father is a teacher is my friend.', '["who", "which", "whose", "whom"]', 'whose', 'Possession → whose', 1, 3 FROM grammar_lessons WHERE slug = 'besch-relative-pronouns';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'This is the city ___ I was born. (where/which)', NULL, 'where', 'Lieu → where', 1, 4 FROM grammar_lessons WHERE slug = 'besch-relative-pronouns';

-- Lesson: besch-quantifiers-detailed
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Do you have ___ questions?', '["some", "any", "much", "little"]', 'any', 'Interrogative → any', 1, 1 FROM grammar_lessons WHERE slug = 'besch-quantifiers-detailed';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'How ___ water do you drink every day? (much/many)', NULL, 'much', 'Indénombrable → much', 1, 2 FROM grammar_lessons WHERE slug = 'besch-quantifiers-detailed';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I have ___ friends. (presque aucun)', '["a few", "few", "a little", "little"]', 'few', 'Dénombrable + sens négatif → few', 1, 3 FROM grammar_lessons WHERE slug = 'besch-quantifiers-detailed';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'There is ___ milk left. (un peu, positif)', NULL, 'a little', 'Indénombrable + sens positif → a little', 1, 4 FROM grammar_lessons WHERE slug = 'besch-quantifiers-detailed';

-- Lesson: besch-subordinate-clauses
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', '___ I arrived, the meeting had started.', '["When", "While", "As soon as", "Until"]', 'When', 'Subordonnée de temps → when', 1, 1 FROM grammar_lessons WHERE slug = 'besch-subordinate-clauses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', '___ it was raining, we stayed indoors. (Because/While)', NULL, 'Because', 'Subordonnée de cause → because', 1, 2 FROM grammar_lessons WHERE slug = 'besch-subordinate-clauses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', '___ he was tired, he kept working.', '["Because", "Although", "If", "When"]', 'Although', 'Subordonnée de concession → although', 1, 3 FROM grammar_lessons WHERE slug = 'besch-subordinate-clauses';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', '___ you leave now, you''ll be late. (Unless/If)', NULL, 'Unless', 'Subordonnée de condition → unless = if not', 1, 4 FROM grammar_lessons WHERE slug = 'besch-subordinate-clauses';

-- Lesson: besch-inversion-emphasis
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Never ___ such a beautiful place.', '["I have seen", "have I seen", "I saw", "did I see"]', 'have I seen', 'Inversion après never en tête → have + sujet + participe passé', 1, 1 FROM grammar_lessons WHERE slug = 'besch-inversion-emphasis';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Hardly ___ I arrived when the phone rang. (had/I)', NULL, 'had', 'Inversion après hardly → had + sujet', 1, 2 FROM grammar_lessons WHERE slug = 'besch-inversion-emphasis';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', '___ I you, I would accept the offer.', '["Were", "Was", "If", "Had"]', 'Were', 'Conditionnel sans if → inversion avec were', 1, 3 FROM grammar_lessons WHERE slug = 'besch-inversion-emphasis';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Not only ___ he apologise, but he also offered compensation. (did)', NULL, 'did', 'Inversion après not only → did + sujet', 1, 4 FROM grammar_lessons WHERE slug = 'besch-inversion-emphasis';

-- Lesson: besch-gerund-infinitive-rules
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I enjoy ___ novels.', '["read", "reading", "to read", "reads"]', 'reading', 'Verbe enjoy → gérondif', 1, 1 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'She decided ___ (leave) early.', NULL, 'to leave', 'Verbe decide → infinitif', 1, 2 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She avoided ___ to him.', '["talk", "to talk", "talking", "talked"]', 'talking', 'Verbe avoid → gérondif', 1, 3 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'He stopped ___ (smoke) last year. (arrêter de)', NULL, 'smoking', 'Stop + gérondif = arrêter une activité', 1, 4 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'Remember ___ the door before you leave.', '["locking", "to lock", "lock", "locked"]', 'to lock', 'Remember + infinitif = ne pas oublier de faire', 1, 5 FROM grammar_lessons WHERE slug = 'besch-gerund-infinitive-rules';

-- Lesson: besch-articles-complete
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I have ___ apple and ___ banana.', '["a / a", "an / a", "a / an", "an / an"]', 'an / a', 'Apple commence par son voyelle → an ; banana par son consonne → a', 1, 1 FROM grammar_lessons WHERE slug = 'besch-articles-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'She is ___ university student. (a/an)', NULL, 'a', 'University commence par son /ju/ → a', 1, 2 FROM grammar_lessons WHERE slug = 'besch-articles-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', '___ sun rises in ___ east.', '["The / the", "A / an", "The / an", "- / the"]', 'The / the', 'Objets uniques → the', 1, 3 FROM grammar_lessons WHERE slug = 'besch-articles-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I have breakfast on ___ Monday.', '["the", "a", "an", "-"]', '-', 'Pas d''article devant les jours et repas', 1, 4 FROM grammar_lessons WHERE slug = 'besch-articles-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', '___ dogs are loyal animals.', '["The", "A", "An", "-"]', '-', 'Pluriel général → article zéro', 1, 5 FROM grammar_lessons WHERE slug = 'besch-articles-complete';

-- Lesson: besch-comparatives-superlatives
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She is ___ than her brother.', '["tall", "taller", "tallest", "more tall"]', 'taller', 'Adjectif court → +er', 1, 1 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'This is the ___ (beautiful) painting I have ever seen.', NULL, 'most beautiful', 'Adjectif long → the most + adj', 1, 2 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'He is the ___ student in the class.', '["good", "better", "best", "goodest"]', 'best', 'Irrégulier : good → better → the best', 1, 3 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'My phone is ___ (expensive) than yours.', NULL, 'more expensive', 'Adjectif long → more + adj', 1, 4 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She is ___ tall ___ her sister.', '["as / as", "so / as", "as / than", "so / than"]', 'as / as', 'Comparatif d''égalité → as + adj + as', 1, 5 FROM grammar_lessons WHERE slug = 'besch-comparatives-superlatives';

-- Lesson: besch-questions-types
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', '___ you like coffee?', '["Do", "Does", "Are", "Is"]', 'Do', 'YES/NO question avec you → Do', 1, 1 FROM grammar_lessons WHERE slug = 'besch-questions-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', '___ does she live? (Where/What)', NULL, 'Where', 'WH- question sur un lieu → where', 1, 2 FROM grammar_lessons WHERE slug = 'besch-questions-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'You''re French, ___?', '["are you", "aren''t you", "do you", "don''t you"]', 'aren''t you', 'Question tag : affirmation → auxiliaire opposé', 1, 3 FROM grammar_lessons WHERE slug = 'besch-questions-types';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'Do you know where ___? (she lives / does she live)', NULL, 'she lives', 'Question indirecte → pas d''inversion', 1, 4 FROM grammar_lessons WHERE slug = 'besch-questions-types';

-- Lesson: besch-prepositions-complete
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'I live ___ Paris.', '["in", "on", "at", "to"]', 'in', 'Ville → in', 1, 1 FROM grammar_lessons WHERE slug = 'besch-prepositions-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'The meeting is ___ 3 PM. (at/on)', NULL, 'at', 'Heure précise → at', 1, 2 FROM grammar_lessons WHERE slug = 'besch-prepositions-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'She walked ___ the park to get home.', '["through", "at", "on", "in"]', 'through', 'Mouvement à travers → through', 1, 3 FROM grammar_lessons WHERE slug = 'besch-prepositions-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'fill_blank', 'I have been waiting ___ two hours. (for/since)', NULL, 'for', 'Durée → for', 1, 4 FROM grammar_lessons WHERE slug = 'besch-prepositions-complete';
INSERT OR IGNORE INTO grammar_exercises (lesson_id, type, question, options, correct_answer, explanation, points, order_index)
SELECT id, 'qcm', 'The book is ___ the table.', '["in", "on", "at", "to"]', 'on', 'Sur une surface → on', 1, 5 FROM grammar_lessons WHERE slug = 'besch-prepositions-complete';
