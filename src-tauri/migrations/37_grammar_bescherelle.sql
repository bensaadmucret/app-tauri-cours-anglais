-- Grammar lessons from Bescherelle "Maîtriser la grammaire anglaise"
-- Extracted from the book's chapters on tenses, modals, passive voice, conditionals, etc.

INSERT OR IGNORE INTO grammar_lessons (title, slug, description, content, category, level, order_index, created_at)
VALUES
(
  'Le présent simple - Règles et exceptions',
  'besch-present-simple-rules',
  'Formation du présent simple, règles d''orthographe et exceptions tirées du Bescherelle.',
  '<h3>Formation</h3><p>On ajoute <i>-s</i> à la 3e personne du singulier.</p><h3>Règles d''orthographe</h3><ul><li>Verbes en <i>-ch, -sh, -ss, -x, -o</i> : on ajoute <i>-es</i> → <i>watch → watches, go → goes</i></li><li>Verbes en consonne + <i>-y</i> : <i>y</i> devient <i>i</i> + <i>-es</i> → <i>study → studies</i></li><li>Verbes en voyelle + <i>-y</i> : on ajoute <i>-s</i> → <i>play → plays</i></li></ul><h3>Exceptions</h3><p><i>Have → has, be → is/am/are, do → does</i></p><h3>Usage</h3><ul><li>Habitudes et routines : <i>She walks to work every day.</i> <span style="color:#94a3b8">— Elle va au travail à pied tous les jours.</span></li><li>Vérités générales : <i>Water boils at 100°C.</i> <span style="color:#94a3b8">— L''eau bout à 100°C.</span></li><li>Horaires fixes : <i>The train leaves at 6 PM.</i> <span style="color:#94a3b8">— Le train part à 18h.</span></li></ul><h3>Mots-clés</h3><p>always, usually, often, sometimes, never, every day, on Mondays</p>',
  'temps',
  'A1',
  200,
  strftime('%s', 'now')
),
(
  'Le présent continu - Formation et usages spécifiques',
  'besch-present-continuous-usage',
  'Formation du présent continu, usages spécifiques et contraste avec le présent simple.',
  '<h3>Formation</h3><p>Sujet + <i>be</i> (am/is/are) + verbe + <i>-ing</i>.</p><h3>Règles d''orthographe du gérondif</h3><ul><li>Verbes en <i>-e</i> : on supprime le <i>e</i> → <i>make → making</i></li><li>Verbes en <i>-ie</i> : <i>y</i> + <i>-ing</i> → <i>lie → lying</i></li><li>Monosyllabes CVC : on double la consonne finale → <i>run → running, sit → sitting</i></li></ul><h3>Usage</h3><ul><li>Action en cours : <i>I am reading a book right now.</i> <span style="color:#94a3b8">— Je suis en train de lire un livre.</span></li><li>Situation temporaire : <i>She is living with her parents this month.</i> <span style="color:#94a3b8">— Elle vit chez ses parents ce mois-ci.</span></li><li>Futur planifié : <i>We are meeting them tomorrow.</i> <span style="color:#94a3b8">— Nous les rencontrons demain.</span></li></ul><h3>Verbes d''état (stative verbs)</h3><p>Ces verbes ne se mettent généralement pas au présent continu : <i>know, believe, like, love, hate, want, need, belong, seem, understand</i>.</p>',
  'temps',
  'A2',
  201,
  strftime('%s', 'now')
),
(
  'Le prétérit simple - Verbes réguliers et irréguliers',
  'besch-past-simple-formation',
  'Formation du prétérit simple, règles d''orthographe pour les verbes réguliers et verbes irréguliers courants.',
  '<h3>Formation - Verbes réguliers</h3><p>On ajoute <i>-ed</i> à la base verbale.</p><h3>Règles d''orthographe</h3><ul><li>Verbes en <i>-e</i> : on ajoute <i>-d</i> → <i>arrive → arrived</i></li><li>Verbes en consonne + <i>-y</i> : <i>y</i> → <i>i</i> + <i>-ed</i> → <i>study → studied</i></li><li>Monosyllabes CVC : on double la consonne → <i>stop → stopped, plan → planned</i></li></ul><h3>Verbes irréguliers courants</h3><p><i>go → went, see → saw, buy → bought, think → thought, bring → brought, teach → taught, catch → caught, fight → fought</i></p><h3>Usage</h3><ul><li>Action terminée dans le passé : <i>I visited London last year.</i> <span style="color:#94a3b8">— J''ai visité Londres l''an dernier.</span></li><li>Suite d''actions : <i>He woke up, had breakfast and left.</i> <span style="color:#94a3b8">— Il s''est réveillé, a pris son petit-déjeuner et est parti.</span></li></ul><h3>Mots-clés</h3><p>yesterday, last week, in 2020, two days ago, when I was young</p>',
  'temps',
  'A2',
  202,
  strftime('%s', 'now')
),
(
  'Le prétérit continu - Actions en cours dans le passé',
  'besch-past-continuous',
  'Formation et usages du prétérit continu, contraste avec le prétérit simple.',
  '<h3>Formation</h3><p>Sujet + <i>was/were</i> + verbe + <i>-ing</i>.</p><h3>Usage</h3><ul><li>Action en cours à un moment du passé : <i>At 8 PM, I was watching TV.</i> <span style="color:#94a3b8">— À 20h, je regardais la télé.</span></li><li>Action interrompue : <i>I was cooking when the phone rang.</i> <span style="color:#94a3b8">— Je cuisinais quand le téléphone a sonné.</span></li><li>Deux actions simultanées : <i>While she was reading, he was working.</i> <span style="color:#94a3b8">— Pendant qu''elle lisait, il travaillait.</span></li></ul><h3>Contraste prétérit simple / continu</h3><p>Le prétérit simple décrit une action terminée ; le prétérit continu décrit une action en cours.</p><p><i>I read a book</i> (j''ai lu un livre — action terminée) vs <i>I was reading a book</i> (j''étais en train de lire — action en cours).</p>',
  'temps',
  'B1',
  203,
  strftime('%s', 'now')
),
(
  'Le present perfect - Expérience, résultat et continuité',
  'besch-present-perfect-uses',
  'Les trois usages principaux du present perfect : expérience, résultat présent, continuité jusqu''au présent.',
  '<h3>Formation</h3><p>Sujet + <i>have/has</i> + participe passé.</p><h3>Usage 1 - Expérience</h3><p>On s''intéresse à l''expérience de vie, sans préciser quand.</p><p><i>Have you ever been to Japan?</i> <span style="color:#94a3b8">— Es-tu déjà allé au Japon ?</span></p><p><i>I have never eaten sushi.</i> <span style="color:#94a3b8">— Je n''ai jamais mangé de sushi.</span></p><h3>Usage 2 - Résultat présent</h3><p>Une action passée a un résultat visible maintenant.</p><p><i>I have lost my keys.</i> <span style="color:#94a3b8">— J''ai perdu mes clés (et je ne les ai toujours pas).</span></p><h3>Usage 3 - Continuité</h3><p>Avec <i>since</i> et <i>for</i>, l''action continue jusqu''au présent.</p><p><i>She has lived here since 2015.</i> <span style="color:#94a3b8">— Elle vit ici depuis 2015.</span></p><h3>Mots-clés</h3><p>ever, never, already, yet, just, since, for, recently, so far</p>',
  'temps',
  'B1',
  204,
  strftime('%s', 'now')
),
(
  'Le present perfect continu - Insistance sur la durée',
  'besch-present-perfect-continuous',
  'Formation et usage du present perfect continu pour insister sur la durée d''une action.',
  '<h3>Formation</h3><p>Sujet + <i>have/has been</i> + verbe + <i>-ing</i>.</p><h3>Usage</h3><p>On insiste sur la durée ou le processus d''une action qui a commencé dans le passé et continue (ou vient de s''arrêter).</p><ul><li><i>I have been studying English for five years.</i> <span style="color:#94a3b8">— J''étudie l''anglais depuis cinq ans.</span></li><li><i>It has been raining all day.</i> <span style="color:#94a3b8">— Il pleut toute la journée.</span></li><li><i>She has been working since 8 AM.</i> <span style="color:#94a3b8">— Elle travaille depuis 8h.</span></li></ul><h3>Contraste avec le present perfect simple</h3><p><i>I have read three books</i> (résultat : 3 livres lus) vs <i>I have been reading all afternoon</i> (processus : l''action a duré tout l''après-midi).</p><h3>Verbes d''état</h3><p>Avec les verbes d''état (<i>know, like, believe</i>), on utilise le present perfect simple, pas le continu.</p>',
  'temps',
  'B2',
  205,
  strftime('%s', 'now')
),
(
  'Le past perfect - L''antériorité dans le passé',
  'besch-past-perfect',
  'Formation et usage du past perfect pour exprimer l''antériorité par rapport à une autre action passée.',
  '<h3>Formation</h3><p>Sujet + <i>had</i> + participe passé.</p><h3>Usage</h3><p>Le past perfect exprime une action qui s''est terminée avant une autre action dans le passé.</p><ul><li><i>When I arrived, the train had already left.</i> <span style="color:#94a3b8">— Quand je suis arrivé, le train était déjà parti.</span></li><li><i>She had finished her homework before dinner.</i> <span style="color:#94a3b8">— Elle avait fini ses devoirs avant le dîner.</span></li><li><i>I had never seen such a beautiful sunset before.</i> <span style="color:#94a3b8">— Je n''avais jamais vu un tel coucher de soleil avant.</span></li></ul><h3>Contraste avec le prétérit simple</h3><p>Le prétérit simple décrit des actions successives ; le past perfect établit une relation d''antériorité.</p><p><i>I ate dinner, then I watched TV</i> (succession) vs <i>I had eaten dinner before I watched TV</i> (antériorité).</p>',
  'temps',
  'B2',
  206,
  strftime('%s', 'now')
),
(
  'Les modaux du passé - Must have, should have, could have',
  'besch-modals-past',
  'Les modaux au passé pour exprimer la déduction, le regret, la possibilité ou la critique.',
  '<h3>Formation</h3><p>Modal + <i>have</i> + participe passé.</p><h3>Déduction</h3><ul><li><i>He must have forgotten.</i> <span style="color:#94a3b8">— Il a dû oublier.</span> (quasi-certitude)</li><li><i>She can''t have done that.</i> <span style="color:#94a3b8">— Elle n''a pas pu faire ça.</span> (impossibilité)</li></ul><h3>Regret / critique</h3><ul><li><i>You should have told me.</i> <span style="color:#94a3b8">— Tu aurais dû me le dire.</span> (regret/critique)</li><li><i>I shouldn''t have eaten so much.</i> <span style="color:#94a3b8">— Je n''aurais pas dû autant manger.</span></li></ul><h3>Possibilité</h3><ul><li><i>She could have taken the bus.</i> <span style="color:#94a3b8">— Elle aurait pu prendre le bus.</span></li><li><i>He might have missed the train.</i> <span style="color:#94a3b8">— Il a peut-être raté le train.</span></li></ul>',
  'modaux',
  'B2',
  207,
  strftime('%s', 'now')
),
(
  'La voix passive - Tous les temps',
  'besch-passive-all-tenses',
  'Formation de la voix passive aux principaux temps : présent, passé, futur, present perfect et avec modaux.',
  '<h3>Formation</h3><p>Sujet + <i>be</i> (au temps voulu) + participe passé (+ <i>by</i> + agent).</p><h3>Passive aux différents temps</h3><ul><li>Présent simple : <i>English is spoken here.</i> <span style="color:#94a3b8">— On parle anglais ici.</span></li><li>Passé simple : <i>The house was built in 1990.</i> <span style="color:#94a3b8">— La maison a été construite en 1990.</span></li><li>Futur : <i>The results will be announced tomorrow.</i> <span style="color:#94a3b8">— Les résultats seront annoncés demain.</span></li><li>Present perfect : <i>The work has been finished.</i> <span style="color:#94a3b8">— Le travail a été terminé.</span></li><li>Avec modal : <i>It must be done immediately.</i> <span style="color:#94a3b8">— Cela doit être fait immédiatement.</span></li></ul><h3>Quand utiliser la voix passive ?</h3><ul><li>Quand l''agent est inconnu ou sans importance</li><li>Quand on veut mettre l''accent sur l''action plutôt que sur l''agent</li><li>Dans les contextes formels ou scientifiques</li></ul>',
  'voix-passive',
  'B1',
  208,
  strftime('%s', 'now')
),
(
  'Les conditionnels - Type 0, 1, 2, 3 et mixtes',
  'besch-conditionals-all-types',
  'Révision complète des conditionnels : type 0 (vérité générale), type 1 (réel), type 2 (hypothétique), type 3 (irréel du passé) et mixtes.',
  '<h3>Type 0 - Vérité générale</h3><p><i>If + present simple, present simple</i></p><p><i>If you heat ice, it melts.</i> <span style="color:#94a3b8">— Si on chauffe la glace, elle fond.</span></p><h3>Type 1 - Réel / possible</h3><p><i>If + present simple, will + base</i></p><p><i>If it rains, we will stay home.</i> <span style="color:#94a3b8">— S''il pleut, nous resterons à la maison.</span></p><h3>Type 2 - Hypothétique</h3><p><i>If + past simple, would + base</i></p><p><i>If I won the lottery, I would travel the world.</i> <span style="color:#94a3b8">— Si je gagnais au loto, je voyagerais dans le monde entier.</span></p><h3>Type 3 - Irréel du passé</h3><p><i>If + past perfect, would have + participe passé</i></p><p><i>If I had studied harder, I would have passed the exam.</i> <span style="color:#94a3b8">— Si j''avais étudié plus dur, j''aurais réussi l''examen.</span></p><h3>Conditionnel mixte</h3><p><i>If I had saved money, I would be rich now.</i> <span style="color:#94a3b8">— Si j''avais économisé, je serais riche maintenant.</span></p>',
  'conditionnels',
  'B2',
  209,
  strftime('%s', 'now')
),
(
  'Le futur - Will, be going to, present continuous',
  'besch-future-forms',
  'Les différentes façons d''exprimer le futur : will, be going to, present continuous, present simple et future continuous.',
  '<h3>Will</h3><p>Décision spontanée, prédiction, promesse.</p><p><i>I''ll help you with that.</i> <span style="color:#94a3b8">— Je vais t''aider.</span></p><p><i>It will rain tomorrow.</i> <span style="color:#94a3b8">— Il pleuvra demain.</span></p><h3>Be going to</h3><p>Intention, projet, prédiction basée sur des preuves.</p><p><i>I''m going to visit my grandparents this weekend.</i> <span style="color:#94a3b8">— Je vais rendre visite à mes grands-parents ce week-end.</span></p><p><i>Look at those clouds! It''s going to rain.</i> <span style="color:#94a3b8">— Regarde ces nuages ! Il va pleuvoir.</span></p><h3>Present continuous</h3><p>Futur planifié / arrangement fixé.</p><p><i>We are meeting them at 7 PM.</i> <span style="color:#94a3b8">— Nous les rencontrons à 19h.</span></p><h3>Present simple</h3><p>Horaires officiels, programmes.</p><p><i>The flight leaves at 10 AM.</i> <span style="color:#94a3b8">— Le vol part à 10h.</span></p><h3>Future continuous</h3><p>Action en cours à un moment du futur.</p><p><i>This time tomorrow, I will be flying to Tokyo.</i> <span style="color:#94a3b8">— Demain à cette heure, je volerai vers Tokyo.</span></p>',
  'temps',
  'B1',
  210,
  strftime('%s', 'now')
),
(
  'Le reported speech - Règles de concordance des temps',
  'besch-reported-speech-tenses',
  'Transformation des temps et mots-clés dans le reported speech, avec cas particuliers.',
  '<h3>Règle générale</h3><p>Quand le verbe introducteur est au passé, on décale les temps :</p><ul><li>Present simple → Past simple : <i>"I like tea" → She said she liked tea.</i></li><li>Present continuous → Past continuous : <i>"I''m reading" → He said he was reading.</i></li><li>Past simple → Past perfect : <i>"I went" → She said she had gone.</i></li><li>Will → Would : <i>"I''ll call" → He said he would call.</i></li><li>Can → Could : <i>"I can swim" → She said she could swim.</i></li><li>Must → Had to : <i>"I must go" → He said he had to go.</i></li></ul><h3>Transformation des mots-clés</h3><ul><li>now → then</li><li>today → that day</li><li>tomorrow → the next day / the following day</li><li>yesterday → the day before / the previous day</li><li>this → that</li><li>here → there</li></ul><h3>Cas particuliers</h3><p>Pas de décalage si la situation est toujours vraie : <i>"The earth is round" → He said the earth is round.</i></p>',
  'discours-indirect',
  'B2',
  211,
  strftime('%s', 'now')
),
(
  'Les pronoms relatifs - Who, which, that, whose, whom',
  'besch-relative-pronouns',
  'Usage des pronoms relatifs en anglais : who, which, that, whose, whom, where, when, why.',
  '<h3>Who</h3><p>Pour les personnes (sujet).</p><p><i>The man who lives next door is a doctor.</i> <span style="color:#94a3b8">— L''homme qui vit à côté est médecin.</span></p><h3>Whom</h3><p>Pour les personnes (complément), formel.</p><p><i>The woman whom I met yesterday is a lawyer.</i> <span style="color:#94a3b8">— La femme que j''ai rencontrée hier est avocate.</span></p><h3>Which</h3><p>Pour les choses et les animaux.</p><p><i>The book which I bought is excellent.</i> <span style="color:#94a3b8">— Le livre que j''ai acheté est excellent.</span></p><h3>That</h3><p>Remplace who/which dans les propositions restrictives (informel).</p><p><i>The man that lives next door is a doctor.</i></p><h3>Whose</h3><p>Pour la possession (personnes, choses, animaux).</p><p><i>The girl whose father is a teacher is my friend.</i> <span style="color:#94a3b8">— La fille dont le père est professeur est mon amie.</span></p><h3>Where / When / Why</h3><p><i>This is the city where I was born.</i> <span style="color:#94a3b8">— C''est la ville où je suis né.</span></p><p><i>I remember the day when we first met.</i> <span style="color:#94a3b8">— Je me souviens du jour où nous nous sommes rencontrés.</span></p><p><i>That is the reason why I left.</i> <span style="color:#94a3b8">— C''est la raison pour laquelle je suis parti.</span></p>',
  'pronoms',
  'B1',
  212,
  strftime('%s', 'now')
),
(
  'Les déterminants et quantifieurs - Some, any, much, many, (a) few, (a) little',
  'besch-quantifiers-detailed',
  'Usage détaillé des quantifieurs avec noms dénombrables et indénombrables.',
  '<h3>Some / Any</h3><p><i>Some</i> en affirmative et propositions polies ; <i>any</i> en négative et interrogative.</p><p><i>I have some friends in Paris.</i> <span style="color:#94a3b8">— J''ai des amis à Paris.</span></p><p><i>Do you have any questions?</i> <span style="color:#94a3b8">— As-tu des questions ?</span></p><p><i>I don''t have any money.</i> <span style="color:#94a3b8">— Je n''ai pas d''argent.</span></p><h3>Much / Many / A lot of</h3><p><i>Much</i> + indénombrable (négative/interrogative) ; <i>many</i> + dénombrable ; <i>a lot of</i> + les deux (affirmative).</p><p><i>How much water do you drink?</i> — <i>How many books do you have?</i></p><p><i>She has a lot of friends.</i></p><h3>(A) few / (A) little</h3><p><i>A few</i> + dénombrable = quelques-uns (positif) ; <i>few</i> = peu (négatif).</p><p><i>A little</i> + indénombrable = un peu (positif) ; <i>little</i> = peu (négatif).</p><p><i>I have a few friends.</i> (quelques-uns) vs <i>I have few friends.</i> (presque aucun)</p><p><i>There is a little milk left.</i> (un peu) vs <i>There is little milk left.</i> (presque plus)</p>',
  'determinants',
  'A2',
  213,
  strftime('%s', 'now')
),
(
  'Les propositions subordonnées - Conjonctions de temps, cause, condition',
  'besch-subordinate-clauses',
  'Les propositions subordonnées avec when, while, because, although, if, unless, as soon as.',
  '<h3>Subordonnées de temps</h3><ul><li><i>When I arrived, the meeting had started.</i> <span style="color:#94a3b8">— Quand je suis arrivé, la réunion avait commencé.</span></li><li><i>While she was cooking, he was cleaning.</i> <span style="color:#94a3b8">— Pendant qu''elle cuisinait, il nettoyait.</span></li><li><i>As soon as I finish, I''ll call you.</i> <span style="color:#94a3b8">— Dès que j''aurai fini, je t''appellerai.</span></li><li><i>Until you apologise, I won''t speak to you.</i> <span style="color:#94a3b8">— Tant que tu ne t''excuseras pas, je ne te parlerai pas.</span></li></ul><h3>Subordonnées de cause</h3><ul><li><i>Because it was raining, we stayed indoors.</i> <span style="color:#94a3b8">— Parce qu''il pleuvait, nous sommes restés à l''intérieur.</span></li><li><i>Since you''re here, help me with this.</i> <span style="color:#94a3b8">— Puisque tu es là, aide-moi avec ça.</span></li><li><i>As it was late, we went home.</i> <span style="color:#94a3b8">— Comme il était tard, nous sommes rentrés.</span></li></ul><h3>Subordonnées de concession</h3><ul><li><i>Although he was tired, he kept working.</i> <span style="color:#94a3b8">— Bien qu''il fût fatigué, il a continué à travailler.</span></li><li><i>Even though it was expensive, she bought it.</i> <span style="color:#94a3b8">— Même si c''était cher, elle l''a acheté.</span></li></ul><h3>Subordonnées de condition</h3><ul><li><i>If you study hard, you''ll pass.</i> <span style="color:#94a3b8">— Si tu étudies dur, tu réussiras.</span></li><li><i>Unless you leave now, you''ll be late.</i> <span style="color:#94a3b8">— À moins que tu ne partes maintenant, tu seras en retard.</span></li></ul>',
  'phrases-complexes',
  'B2',
  214,
  strftime('%s', 'now')
),
(
  'L''inversion pour l''emphase et les structures négatives',
  'besch-inversion-emphasis',
  'L''inversion du sujet après expressions négatives, conditionnels sans if et pour l''emphase.',
  '<h3>Après expressions négatives en tête de phrase</h3><p>Quand une expression négative commence la phrase, le sujet et l''auxiliaire s''inversent.</p><ul><li><i>Never have I seen such a beautiful place.</i> <span style="color:#94a3b8">— Jamais je n''ai vu un endroit aussi beau.</span></li><li><i>Rarely does she go out at night.</i> <span style="color:#94a3b8">— Rarement sort-elle la nuit.</span></li><li><i>Not only did he apologise, but he also offered compensation.</i> <span style="color:#94a3b8">— Non seulement il s''est excusé, mais il a aussi offert une compensation.</span></li><li><i>Hardly had I arrived when the phone rang.</i> <span style="color:#94a3b8">— J''à peine étais arrivé que le téléphone a sonné.</span></li></ul><h3>Conditionnels sans "if"</h3><ul><li><i>Were I you, I would accept the offer.</i> = If I were you...</li><li><i>Had I known, I would have stayed home.</i> = If I had known...</li><li><i>Should you need help, call me.</i> = If you should need help...</li></ul><h3>Après "so" et "such"</h3><ul><li><i>So beautiful was the scenery that we stopped.</i> <span style="color:#94a3b8">— Le paysage était si beau que nous nous sommes arrêtés.</span></li></ul>',
  'phrases-complexes',
  'C1',
  215,
  strftime('%s', 'now')
),
(
  'Le gérondif et l''infinitif - Règles d''emploi',
  'besch-gerund-infinitive-rules',
  'Quand utiliser le gérondif ou l''infinitif après certains verbes, adjectifs et prépositions.',
  '<h3>Verbes suivis du gérondif (-ing)</h3><p>enjoy, avoid, finish, suggest, mind, postpone, practise, consider, deny, admit, imagine, miss, risk, can''t help</p><p><i>I enjoy reading novels.</i> <span style="color:#94a3b8">— J''aime lire des romans.</span></p><p><i>She avoided talking to him.</i> <span style="color:#94a3b8">— Elle a évité de lui parler.</span></p><h3>Verbes suivis de l''infinitif (to + base)</h3><p>want, decide, hope, expect, promise, agree, plan, learn, refuse, manage, offer, threaten, seem, appear</p><p><i>I decided to leave early.</i> <span style="color:#94a3b8">— J''ai décidé de partir tôt.</span></p><p><i>She hopes to become a doctor.</i> <span style="color:#94a3b8">— Elle espère devenir médecin.</span></p><h3>Verbes suivis des deux (sens différent)</h3><ul><li><i>remember</i> : <i>I remember locking the door</i> (je me souviens l''avoir fait) vs <i>Remember to lock the door</i> (n''oublie pas de le faire)</li><li><i>stop</i> : <i>He stopped smoking</i> (il a arrêté de fumer) vs <i>He stopped to smoke</i> (il s''est arrêté pour fumer)</li><li><i>try</i> : <i>Try calling him</i> (essaie de l''appeler) vs <i>Try to call him</i> (tente de l''appeler)</li></ul><h3>Après prépositions</h3><p>On utilise toujours le gérondif après une préposition.</p><p><i>I''m good at swimming.</i> <span style="color:#94a3b8">— Je suis bon en natation.</span></p><p><i>She left without saying goodbye.</i> <span style="color:#94a3b8">— Elle est partie sans dire au revoir.</span></p>',
  'verbes',
  'B1',
  216,
  strftime('%s', 'now')
),
(
  'Les articles - A/An, The, article zéro',
  'besch-articles-complete',
  'Règles complètes d''utilisation des articles en anglais : indéfini, défini et article zéro.',
  '<h3>A / An (article indéfini)</h3><p>Devant un nom singulier dénombrable, non spécifique.</p><p><i>A</i> devant un son consonne, <i>an</i> devant un son voyelle.</p><ul><li><i>A dog, a university</i> (son /ju/)</li><li><i>An apple, an hour</i> (son /a/)</li></ul><h3>The (article défini)</h3><p>Devant un nom spécifique ou déjà mentionné.</p><ul><li><i>The sun, the moon, the Earth</i> (unique)</li><li><i>The book I bought</i> (spécifique)</li><li><i>The rich, the poor</i> (catégorie de personnes)</li><li><i>The piano, the guitar</i> (instruments de musique)</li></ul><h3>Article zéro</h3><p>Pas d''article devant :</p><ul><li>Noms pluriels et indénombrables généraux : <i>Dogs are loyal. Water is essential.</i></li><li>Noms propres : <i>Paris, France, John</i></li><li>Repas, jours, mois : <i>I have breakfast on Monday.</i></li><li>Matières scolaires et langues : <i>I study English and maths.</i></li><li>Devant certaines expressions : <i>at home, at school, in bed, by car</i></li></ul>',
  'determinants',
  'A2',
  217,
  strftime('%s', 'now')
),
(
  'Les comparatifs et superlatifs - Règles et irréguliers',
  'besch-comparatives-superlatives',
  'Formation des comparatifs et superlatifs : règles d''orthographe, adjectifs courts et longs, formes irrégulières.',
  '<h3>Adjectifs courts (1 syllabe)</h3><p>Comparatif : <i>adj + -er</i> → <i>tall → taller</i></p><p>Superlatif : <i>the + adj + -est</i> → <i>tall → the tallest</i></p><p>Règles : <i>big → bigger → the biggest</i> (double consonne), <i>happy → happier → the happiest</i> (y → i).</p><h3>Adjectifs longs (2+ syllabes)</h3><p>Comparatif : <i>more + adj</i> → <i>beautiful → more beautiful</i></p><p>Superlatif : <i>the most + adj</i> → <i>beautiful → the most beautiful</i></p><h3>Formes irrégulières</h3><ul><li><i>good → better → the best</i></li><li><i>bad → worse → the worst</i></li><li><i>far → farther/further → the farthest/furthest</i></li><li><i>little → less → the least</i></li><li><i>much/many → more → the most</i></li></ul><h3>Comparatifs d''égalité et d''infériorité</h3><p><i>as + adj + as</i> → <i>She is as tall as her brother.</i></p><p><i>not as/so + adj + as</i> → <i>He is not as old as he looks.</i></p><p><i>less + adj + than</i> → <i>This book is less interesting than the other.</i></p>',
  'adjectifs',
  'A2',
  218,
  strftime('%s', 'now')
),
(
  'Les questions en anglais - Ouvertes, fermées et question tags',
  'besch-questions-types',
  'Formation des questions en anglais : YES/NO questions, WH- questions, questions indirectes et question tags.',
  '<h3>YES/NO questions</h3><p>Auxiliaire + sujet + verbe.</p><p><i>Do you like coffee? Are you coming? Have you seen it?</i></p><h3>WH- questions</h3><p>Mot interrogatif + auxiliaire + sujet + verbe.</p><ul><li><i>Where do you live?</i> <span style="color:#94a3b8">— Où habites-tu ?</span></li><li><i>What are you doing?</i> <span style="color:#94a3b8">— Que fais-tu ?</span></li><li><i>Why did she leave?</i> <span style="color:#94a3b8">— Pourquoi est-elle partie ?</span></li><li><i>How long have you been waiting?</i> <span style="color:#94a3b8">— Depuis combien de temps attends-tu ?</span></li></ul><h3>Questions indirectes</h3><p>Pas d''inversion, pas de point d''interrogation.</p><p><i>Do you know where she lives?</i> (pas : <i>where does she live</i>)</p><p><i>Can you tell me what time it is?</i></p><h3>Question tags</h3><p>Auxiliaire opposé pour confirmer.</p><ul><li><i>You''re French, aren''t you?</i></li><li><i>She doesn''t like fish, does she?</i></li><li><i>Let''s go, shall we?</i></li><li><i>You''ve never been there, have you?</i></li></ul>',
  'phrases',
  'B1',
  219,
  strftime('%s', 'now')
),
(
  'Les prépositions - Lieu, temps, mouvement',
  'besch-prepositions-complete',
  'Guide complet des prépositions de lieu (in/on/at), de temps et de mouvement.',
  '<h3>Prépositions de lieu</h3><ul><li><i>in</i> : dans un espace fermé/ville/pays → <i>in the room, in Paris, in France</i></li><li><i>on</i> : sur une surface → <i>on the table, on the wall, on the floor</i></li><li><i>at</i> : un point précis → <i>at the door, at the bus stop, at school</i></li><li><i>above / below</i> : au-dessus / au-dessous</li><li><i>in front of / behind</i> : devant / derrière</li><li><i>between / among</i> : entre (deux) / parmi (plusieurs)</li><li><i>next to / beside</i> : à côté de</li></ul><h3>Prépositions de temps</h3><ul><li><i>at</i> : heures précises → <i>at 3 PM, at noon, at night</i></li><li><i>on</i> : jours et dates → <i>on Monday, on July 4th</i></li><li><i>in</i> : mois, années, saisons → <i>in January, in 2024, in summer</i></li><li><i>by</i> : limite → <i>by Friday</i> (au plus tard vendredi)</li><li><i>until</i> : continuité → <i>until Friday</i> (jusqu''à vendredi)</li><li><i>for</i> : durée → <i>for three hours</i></li><li><i>since</i> : point de départ → <i>since 2020</i></li></ul><h3>Prépositions de mouvement</h3><ul><li><i>to</i> : direction → <i>go to school</i></li><li><i>into</i> : entrer dans → <i>come into the room</i></li><li><i>out of</i> : sortir de → <i>get out of the car</i></li><li><i>through</i> : à travers → <i>walk through the park</i></li><li><i>across</i> : d''un bout à l''autre → <i>swim across the river</i></li><li><i>along</i> : le long de → <i>walk along the street</i></li></ul>',
  'prepositions',
  'A2',
  220,
  strftime('%s', 'now')
);
