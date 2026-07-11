-- Vocabulary flashcards from Vocable Anglais (Juin 2025)
-- Themes: Technology, Environment, Health, Society, Travel, Business

INSERT OR IGNORE INTO cards (deck_id, word, phonetic, definition, example, translation_fr) VALUES
-- p39: Environment & Sustainability
(1, 'biodegradable', '/ˌbaɪəʊdɪˈɡreɪdəbl/', 'capable of being decomposed naturally', 'We should use biodegradable packaging to reduce waste.', 'biodégradable'),
(1, 'conservation', '/ˌkɒnsəˈveɪʃən/', 'the protection and preservation of the environment', 'Wildlife conservation is essential for maintaining biodiversity.', 'conservation, préservation'),
(1, 'ecosystem', '/ˈiːkəʊsɪstəm/', 'a community of living organisms and their environment', 'The marine ecosystem is threatened by plastic pollution.', 'écosystème'),
(1, 'footprint', '/ˈfʊtprɪnt/', 'the impact left by human activity on the environment', 'We must reduce our carbon footprint to fight climate change.', 'empreinte (écologique)'),
(1, 'renewable', '/rɪˈnjuːəbl/', 'capable of being replenished naturally', 'Renewable energy sources include wind and solar power.', 'renouvelable'),
(1, 'upcycling', '/ˈʌpˌsaɪklɪŋ/', 'the process of transforming waste materials into new products', 'Upcycling old clothes is a creative way to reduce waste.', 'surcyclage (recyclage valorisant)'),
(1, 'zero-waste', '/ˈzɪərəʊ weɪst/', 'a lifestyle aimed at eliminating all waste', 'She adopted a zero-waste lifestyle to help the planet.', 'zéro déchet'),
-- p40: Business & Technology
(1, 'algorithm', '/ˈælɡərɪðəm/', 'a set of rules for solving a problem, used by computers', 'The search algorithm determines which results appear first.', 'algorithme'),
(1, 'benchmark', '/ˈbentʃmɑːk/', 'a standard against which things can be measured', 'Our performance exceeds the industry benchmark.', 'référence, critère de comparaison'),
(1, 'disruptive', '/dɪsˈrʌptɪv/', 'causing significant change to an industry or market', 'Disruptive technologies create new markets and value networks.', 'de rupture (qui bouleverse le marché)'),
(1, 'leverage', '/ˈliːvərɪdʒ/', 'to use something to maximum advantage', 'We should leverage our expertise to win the contract.', 'exploiter, tirer parti de'),
(1, 'outsourcing', '/ˈaʊtsɔːsɪŋ/', 'contracting work to an external party', 'Outsourcing IT services can reduce operational costs.', 'externalisation'),
(1, 'scalable', '/ˈskeɪləbl/', 'capable of being expanded to handle increased demand', 'The cloud platform is highly scalable and cost-effective.', 'évolutif, scalable'),
(1, 'startup', '/ˈstɑːtʌp/', 'a newly established business', 'The tech startup raised ten million in funding.', 'jeune pousse (entreprise naissante)'),
(1, 'streamline', '/ˈstriːmlaɪn/', 'to make a process more efficient', 'We need to streamline our operations to stay competitive.', 'rationaliser, simplifier'),
-- p43: Travel & Culture
(1, 'boutique', '/buːˈtiːk/', 'a small, specialised shop or hotel', 'We stayed at a charming boutique hotel in the old town.', 'boutique (petit commerce chic)'),
(1, 'commute', '/kəˈmjuːt/', 'the regular journey between home and work', 'My daily commute takes about forty-five minutes.', 'trajet domicile-travail'),
(1, 'expedition', '/ˌekspəˈdɪʃən/', 'an organised journey for a specific purpose', 'The expedition to the North Pole took six weeks.', 'expédition'),
(1, 'heritage', '/ˈherɪtɪdʒ/', 'cultural or historical traditions passed down', 'The city is a UNESCO World Heritage site.', 'patrimoine'),
(1, 'metropolis', '/məˈtrɒpəlɪs/', 'a very large and busy city', 'London is a bustling metropolis with over eight million people.', 'métropole'),
(1, 'picturesque', '/ˌpɪktʃəˈresk/', 'visually attractive, especially in a quaint style', 'The picturesque village attracted many artists.', 'pittoresque'),
(1, 'quaint', '/kweɪnt/', 'attractively unusual or old-fashioned', 'They stayed in a quaint cottage in the countryside.', 'pittoresque, charmant (ancien)'),
(1, 'wanderlust', '/ˈwɒndəlʌst/', 'a strong desire to travel and explore', 'Her wanderlust took her to over fifty countries.', 'soif de voyager (envie d''explorer)'),
-- p44: Idioms & Expressions (Juin 2025)
(1, 'a blessing in disguise', '/ə ˈblesɪŋ ɪn ˌdɪsɡaɪz/', 'something that seems bad but turns out to be good', 'Losing that job was a blessing in disguise; I found a better one.', 'une bénédiction déguisée (un mal pour un bien)'),
(1, 'a drop in the ocean', '/ə drɒp ɪn ði ˈəʊʃən/', 'a very small amount compared to what is needed', 'My donation is just a drop in the ocean.', 'une goutte d''eau dans l''océan'),
(1, 'burn the midnight oil', '/bɜːn ðə ˈmɪdnaɪt ɔɪl/', 'to work late into the night', 'She burned the midnight oil to finish the report on time.', 'travailler tard dans la nuit (faire une nuit blanche)'),
(1, 'cut corners', '/kʌt ˈkɔːnəz/', 'to do something poorly to save time or money', 'Don''t cut corners when it comes to safety.', 'rogner sur la qualité (faire des économies douteuses)'),
(1, 'hit the nail on the head', '/hɪt ðə neɪl ɒn ðə hed/', 'to describe exactly what is right', 'You hit the nail on the head with your analysis.', 'mettre dans le mille (trouver exactement le mot juste)'),
(1, 'let sleeping dogs lie', '/let ˈsliːpɪŋ dɒɡz laɪ/', 'to avoid interfering in a situation that is not causing problems', 'I decided to let sleeping dogs lie and not bring up the issue.', 'ne pas réveiller le chat qui dort (ne pas créer de problèmes)'),
(1, 'on thin ice', '/ɒn θɪn aɪs/', 'in a risky or precarious situation', 'He''s on thin ice after missing another deadline.', 'sur la glace mince (en situation délicate)'),
(1, 'the elephant in the room', '/ði ˈelɪfənt ɪn ðə ruːm/', 'an obvious problem that people avoid discussing', 'Climate change is the elephant in the room at the conference.', 'le sujet qui fâche (le problème évident qu''on évite)'),
-- p47: Business English Expressions
(1, 'back to the drawing board', '/bæk tə ðə ˈdrɔːɪŋ bɔːd/', 'to start again because a plan has failed', 'The project was rejected, so it''s back to the drawing board.', 'repartir de zéro (tout reprendre)'),
(1, 'ballpark figure', '/ˈbɔːlpɑːk ˈfɪɡə/', 'an approximate estimate', 'Can you give me a ballpark figure for the renovation costs?', 'estimation approximative (ordre de grandeur)'),
(1, 'get the ball rolling', '/ɡet ðə bɔːl ˈrəʊlɪŋ/', 'to start a process or activity', 'Let''s get the ball rolling on the new marketing campaign.', 'lancer la machine (démarrer le processus)'),
(1, 'in the red', '/ɪn ðə red/', 'operating at a loss, owing money', 'The company has been in the red for three quarters.', 'être dans le rouge (être en déficit)'),
(1, 'raise the bar', '/reɪz ðə bɑː/', 'to set a higher standard', 'The new product raises the bar for the entire industry.', 'relever le niveau d''exigence (hausser les standards)'),
(1, 'touch base', '/tʌtʃ beɪs/', 'to make contact or communicate briefly', 'Let''s touch base next week to discuss the progress.', 'se mettre en contact (faire le point)'),
-- p48: Health & Wellbeing
(1, 'mindfulness', '/ˈmaɪndflnəs/', 'the practice of being aware of the present moment', 'Mindfulness meditation can reduce stress and anxiety.', 'pleine conscience (attention au moment présent)'),
(1, 'wellbeing', '/ˈwelˈbiːɪŋ/', 'the state of being comfortable, healthy, and happy', 'Employee wellbeing should be a priority for every company.', 'bien-être'),
(1, 'sedentary', '/ˈsedəntəri/', 'involving little physical activity', 'A sedentary lifestyle can lead to health problems.', 'sédentaire'),
(1, 'burnout', '/ˈbɜːnaʊt/', 'physical or mental exhaustion from overwork', 'She experienced burnout after months of excessive overtime.', 'épuisement professionnel (burn-out)'),
(1, 'resilience', '/rɪˈzɪliəns/', 'the ability to recover quickly from difficulties', 'Resilience is key to overcoming setbacks in life.', 'résilience (capacité à rebondir)'),
(1, 'endorphins', '/enˈdɔːfɪnz/', 'hormones that reduce pain and boost mood', 'Exercise releases endorphins, making you feel happier.', 'endorphines'),
-- p49: Society & Culture
(1, 'cultural diversity', '/ˈkʌltʃərəl daɪˈvɜːsəti/', 'the coexistence of different cultures in a society', 'Cultural diversity enriches our communities.', 'diversité culturelle'),
(1, 'stereotype', '/ˈsteriətaɪp/', 'a widely held but oversimplified image of a group', 'We should challenge stereotypes about different nationalities.', 'stéréotype'),
(1, 'integration', '/ˌɪntɪˈɡreɪʃən/', 'the process of becoming part of a community', 'Successful integration requires effort from both sides.', 'intégration'),
(1, 'multiculturalism', '/ˌmʌltiˈkʌltʃərəlɪzəm/', 'the coexistence of multiple cultures in one society', 'Multiculturalism is a defining feature of modern cities.', 'multiculturalisme'),
(1, 'social cohesion', '/ˈsəʊʃəl kəʊˈhiːʒən/', 'the bonds that hold a society together', 'Education plays a vital role in promoting social cohesion.', 'cohésion sociale'),
(1, 'empowerment', '/ɪmˈpaʊəmənt/', 'the process of gaining confidence and control', 'Education is a tool for the empowerment of women.', 'autonomisation (prise de pouvoir)'),
-- p51: Science & Innovation
(1, 'breakthrough', '/ˈbreɪkθruː/', 'an important discovery or development', 'Scientists have made a breakthrough in cancer treatment.', 'percée (avancée majeure)'),
(1, 'cutting-edge', '/ˌkʌtɪŋˈedʒ/', 'at the forefront of innovation', 'The lab uses cutting-edge technology for its research.', 'à la pointe de la technologie (de pointe)'),
(1, 'innovation', '/ˌɪnəˈveɪʃən/', 'a new idea, method, or product', 'Innovation drives economic growth and competitiveness.', 'innovation'),
(1, 'nanotechnology', '/ˌnænəʊtekˈnɒlədʒi/', 'the manipulation of matter at the atomic scale', 'Nanotechnology has applications in medicine and electronics.', 'nanotechnologie'),
(1, 'patent', '/ˈpeɪtənt/', 'a legal right to an invention', 'The company filed a patent for its new battery design.', 'brevet'),
(1, 'prototype', '/ˈprəʊtətaɪp/', 'an early sample or model of a product', 'They built a prototype to test the new engine design.', 'prototype');
