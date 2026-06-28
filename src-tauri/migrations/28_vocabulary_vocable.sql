-- Vocabulary flashcards from Vocable Anglais (Mars & Juillet 2025)
-- Themes: Environment, Travel, Business, Technology

INSERT INTO cards (deck_id, word, phonetic, definition, example, translation_fr) VALUES
-- Deck: Environnement (deck_id = 1, Général)
(1, 'sustainable', '/səˈsteɪnəbl/', 'that can be maintained over time without causing damage', 'We need to find sustainable sources of energy.', 'durable, soutenable'),
(1, 'renewable', '/rɪˈnjuːəbl/', 'that can be replaced naturally', 'Renewable energy includes solar and wind power.', 'renouvelable'),
(1, 'carbon footprint', '/ˈkɑːbən ˈfʊtprɪnt/', 'the amount of greenhouse gases produced', 'We should reduce our carbon footprint.', 'empreinte carbone'),
(1, 'biodiversity', '/ˌbaɪəʊdaɪˈvɜːsəti/', 'the variety of plant and animal life', 'Loss of biodiversity is a major concern.', 'biodiversité'),
(1, 'emissions', '/ɪˈmɪʃənz/', 'gases released into the atmosphere', 'Carbon emissions must be reduced.', 'émissions'),
(1, 'deforestation', '/diːˌfɒrɪˈsteɪʃən/', 'the clearing of forests', 'Deforestation threatens many species.', 'déforestation'),
(1, 'ecosystem', '/ˈiːkəʊsɪstəm/', 'a community of living organisms and their environment', 'The ecosystem is fragile.', 'écosystème'),
(1, 'pollution', '/pəˈluːʃən/', 'harmful substances in the environment', 'Air pollution is a serious problem in cities.', 'pollution'),
(1, 'recycle', '/riːˈsaɪkl/', 'to process waste for reuse', 'We recycle all our plastic and glass.', 'recycler'),
(1, 'global warming', '/ˈɡləʊbəl ˈwɔːmɪŋ/', 'the gradual rise in Earth''s temperature', 'Global warming affects weather patterns.', 'réchauffement climatique'),
-- Deck: Voyage
(1, 'itinerary', '/aɪˈtɪnərəri/', 'a planned route or journey', 'We planned our itinerary for the trip to Italy.', 'itinéraire'),
(1, 'destination', '/ˌdestɪˈneɪʃən/', 'the place where someone is going', 'Paris is a popular tourist destination.', 'destination'),
(1, 'souvenir', '/ˈsuːvənɪə/', 'something kept as a reminder', 'I bought a souvenir from the gift shop.', 'souvenir'),
(1, 'layover', '/ˈleɪəʊvə/', 'a stop between flights', 'We have a three-hour layover in Dubai.', 'escale'),
(1, 'boarding pass', '/ˈbɔːdɪŋ pɑːs/', 'a card allowing you to board a plane', 'Please show your boarding pass at the gate.', 'carte d''embarquement'),
(1, 'accommodation', '/əˌkɒməˈdeɪʃən/', 'a place to stay', 'We need to book accommodation for the weekend.', 'hébergement'),
(1, 'departure', '/dɪˈpɑːtʃə/', 'the act of leaving', 'The departure time has been changed.', 'départ'),
(1, 'arrival', '/əˈraɪvəl/', 'the act of reaching a destination', 'Our arrival is scheduled for six o''clock.', 'arrivée'),
(1, 'currency', '/ˈkʌrənsi/', 'the money used in a country', 'You need to exchange your currency at the bank.', 'monnaie, devise'),
(1, 'jet lag', '/ˈdʒet læɡ/', 'tiredness after a long flight', 'I always suffer from jet lag when I travel east.', 'décalage horaire'),
-- Deck: Business
(1, 'shareholder', '/ˈʃeəhəʊldə/', 'someone who owns shares in a company', 'Shareholders will vote on the merger.', 'actionnaire'),
(1, 'turnover', '/ˈtɜːnəʊvə/', 'the total revenue of a business', 'The company has a turnover of five million pounds.', 'chiffre d''affaires'),
(1, 'merger', '/ˈmɜːdʒə/', 'the joining of two companies', 'The merger was approved by the board.', 'fusion'),
(1, 'stakeholder', '/ˈsteɪkhəʊldə/', 'a person with an interest in a business', 'All stakeholders must be consulted.', 'partie prenante'),
(1, 'revenue', '/ˈrevənjuː/', 'income from business activities', 'Revenue increased by ten percent this year.', 'revenu, chiffre d''affaires'),
(1, 'bankruptcy', '/ˈbæŋkrʌptsi/', 'the state of being unable to pay debts', 'The company filed for bankruptcy.', 'faillite'),
(1, 'negotiate', '/nɪˈɡəʊʃieɪt/', 'to discuss to reach an agreement', 'We need to negotiate a better deal.', 'négocier'),
(1, 'entrepreneur', '/ˌɒntrəprəˈnɜː/', 'someone who starts a business', 'She is a successful entrepreneur.', 'entrepreneur'),
(1, 'investment', '/ɪnˈvestmənt/', 'money put into something for profit', 'The investment paid off after three years.', 'investissement'),
(1, 'profit margin', '/ˈprɒfɪt ˌmɑːdʒɪn/', 'the difference between cost and selling price', 'We need to improve our profit margin.', 'marge bénéficiaire'),
-- Idioms & Expressions (Mars 2025, p11: Common English Sayings)
(1, 'a piece of cake', '/ə piːs əv keɪk/', 'something very easy to do', 'The exam was a piece of cake.', 'c''est de la tarte (très facile)'),
(1, 'break a leg', '/breɪk ə leɡ/', 'good luck (said to a performer)', 'Break a leg in your performance tonight!', 'merde ! (bonne chance)'),
(1, 'hit the books', '/hɪt ðə bʊks/', 'to study hard', 'I need to hit the books for my final exams.', 'bûcher, réviser dur'),
(1, 'under the weather', '/ˈʌndə ðə ˈweðə/', 'feeling slightly ill', 'I''m feeling a bit under the weather today.', 'être patraque, se sentir malade'),
(1, 'cost an arm and a leg', '/kɒst ən ɑːm ənd ə leɡ/', 'very expensive', 'That car cost an arm and a leg.', 'coûter les yeux de la tête'),
(1, 'once in a blue moon', '/wʌns ɪn ə bluː muːn/', 'very rarely', 'We see them once in a blue moon.', 'tous les trente-six du mois (très rarement)'),
(1, 'spill the beans', '/spɪl ðə biːnz/', 'to reveal a secret', 'Come on, spill the beans! What happened?', 'révéler le pot aux roses (divulguer un secret)'),
(1, 'bite the bullet', '/baɪt ðə ˈbʊlɪt/', 'to endure a painful situation', 'I had to bite the bullet and tell her the truth.', 'faire contre mauvaise fortune bon cœur (accepter une situation difficile)'),
-- Idioms & Expressions (Juillet 2025, p11: Travel Idioms)
(1, 'hit the road', '/hɪt ðə rəʊd/', 'to leave, to start a journey', 'It''s getting late, we should hit the road.', 'prendre la route (partir)'),
(1, 'travel light', '/ˈtrævl laɪt/', 'to travel with very little luggage', 'I prefer to travel light when I fly.', 'voyager léger (avec peu de bagages)'),
(1, 'off the beaten track', '/ɒf ðə ˈbiːtən træk/', 'away from tourist areas', 'They found a lovely village off the beaten track.', 'hors des sentiers battus (loin des circuits touristiques)'),
(1, 'itchy feet', '/ˈɪtʃi fiːt/', 'a strong desire to travel', 'I''ve got itchy feet again, I need a holiday.', 'la bougeotte (envie de voyager)'),
(1, 'on a shoestring', '/ɒn ə ˈʃuːstrɪŋ/', 'with a very small budget', 'We travelled through Asia on a shoestring.', 'avec des moyens limités (petit budget)');
