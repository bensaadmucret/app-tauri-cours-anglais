-- Vocabulary flashcards from Vocable Anglais Juillet 2025 (pages 13-20)
-- Themes: Food & Agriculture, Public Speaking, Mindfulness, Gig Economy

INSERT OR IGNORE INTO cards (deck_id, word, phonetic, definition, example, translation_fr) VALUES
-- Food & Agriculture (Juillet 2025, p13-14)
(1, 'lab-grown meat', '/læb ɡrəʊn miːt/', 'meat produced from animal cells in a laboratory', 'Lab-grown meat could reduce the environmental impact of farming.', 'viande cultivée en laboratoire'),
(1, 'plant-based diet', '/plɑːnt beɪst ˈdaɪət/', 'a diet consisting mostly or entirely of plant foods', 'She switched to a plant-based diet for health reasons.', 'régime à base de plantes'),
(1, 'vertical farming', '/ˈvɜːtɪkəl ˈfɑːmɪŋ/', 'growing crops in vertically stacked layers indoors', 'Vertical farming uses less land than traditional agriculture.', 'agriculture verticale'),
(1, 'food waste', '/fuːd weɪst/', 'food that is discarded or lost uneaten', 'Reducing food waste is essential for the environment.', 'gaspillage alimentaire'),
(1, 'carbon footprint', '/ˈkɑːbən ˈfʊtprɪnt/', 'the amount of greenhouse gases produced by human activities', 'Local sourcing helps reduce our carbon footprint.', 'empreinte carbone'),
(1, 'sustainable', '/səˈsteɪnəbəl/', 'able to be maintained without depleting natural resources', 'We need sustainable farming practices to feed the world.', 'durable, soutenable'),
(1, 'cultured meat', '/ˈkʌltʃərd miːt/', 'meat grown from cells in a lab, same as lab-grown meat', 'Cultured meat may soon be available in supermarkets.', 'viande de culture'),
(1, 'livestock farming', '/ˈlaɪvstɒk ˈfɑːmɪŋ/', 'the raising of animals for food or other products', 'Livestock farming has a significant environmental impact.', 'élevage'),
(1, 'locally sourced', '/ˈləʊkəli sɔːst/', 'obtained from nearby producers or suppliers', 'The restaurant uses locally sourced ingredients.', 'd''origine locale'),
(1, 'yield', '/jiːld/', 'the amount of food produced from farming', 'Vertical farming produces higher yields per square metre.', 'rendement'),
-- Public Speaking (Juillet 2025, p16-17)
(1, 'public speaking', '/ˈpʌblɪk ˈspiːkɪŋ/', 'the act of giving a speech or presentation to an audience', 'Public speaking is a valuable professional skill.', 'prise de parole en public'),
(1, 'speech', '/spiːtʃ/', 'a formal talk given to an audience', 'She delivered an inspiring speech at the conference.', 'discours'),
(1, 'audience', '/ˈɔːdiəns/', 'the group of people listening to or watching a performance', 'The audience applauded after the presentation.', 'public, auditoire'),
(1, 'delivery', '/dɪˈlɪvəri/', 'the way a speech or presentation is given', 'Her delivery was confident and engaging.', 'delivery, façon de s''exprimer'),
(1, 'voice projection', '/vɔɪs prəˈdʒekʃən/', 'the ability to make your voice carry clearly to an audience', 'Good voice projection is essential for public speaking.', 'projection de la voix'),
(1, 'anecdote', '/ˈænɪkdəʊt/', 'a short, amusing or interesting story', 'He used an anecdote to illustrate his point.', 'anecdote'),
(1, 'engaging', '/ɪnˈɡeɪdʒɪŋ/', 'interesting and holding attention', 'The speaker was very engaging and kept the audience interested.', 'captivant'),
(1, 'relatable', '/rɪˈleɪtəbəl/', 'easy to understand and connect with', 'Using examples makes your presentation more relatable.', 'accessible, à qui on peut s''identifier'),
(1, 'channel', '/ˈtʃænl/', 'to direct energy or emotion in a particular way', 'She channelled her nervousness into enthusiasm.', 'canaliser'),
(1, 'memorable', '/ˈmemərəbəl/', 'worth remembering, easily remembered', 'The conclusion of his speech was memorable.', 'mémorable'),
-- Mindfulness (Juillet 2025, p18-19)
(1, 'mindfulness', '/ˈmaɪndfəlnəs/', 'the practice of being aware of the present moment', 'Mindfulness can help reduce stress and anxiety.', 'pleine conscience'),
(1, 'meditation', '/ˌmedɪˈteɪʃən/', 'the practice of focusing the mind for relaxation', 'She starts every morning with ten minutes of meditation.', 'méditation'),
(1, 'wellbeing', '/ˌwelˈbiːɪŋ/', 'the state of being comfortable, healthy and happy', 'The company promotes employee wellbeing.', 'bien-être'),
(1, 'deep breathing', '/diːp ˈbriːðɪŋ/', 'breathing slowly and deeply to relax', 'Deep breathing exercises can calm your nerves.', 'respiration profonde'),
(1, 'body scan', '/ˈbɒdi skæn/', 'a mindfulness technique of focusing on each part of the body', 'A body scan helps you become aware of physical sensations.', 'scan corporel'),
(1, 'present moment', '/ˈprezənt ˈməʊmənt/', 'the current instant, here and now', 'Mindfulness teaches us to live in the present moment.', 'instant présent'),
(1, 'emotional regulation', '/ɪˈməʊʃənl ˌreɡjuˈleɪʃən/', 'the ability to manage and respond to emotions', 'Meditation improves emotional regulation.', 'régulation émotionnelle'),
(1, 'observe', '/əbˈzɜːv/', 'to watch carefully without interfering', 'In mindfulness, you observe your thoughts without judgement.', 'observer'),
(1, 'judgement', '/ˈdʒʌdʒmənt/', 'the act of forming an opinion or conclusion', 'Mindfulness encourages awareness without judgement.', 'jugement'),
(1, 'focus', '/ˈfəʊkəs/', 'concentration on a particular subject', 'Regular meditation can improve your focus at work.', 'concentration'),
-- Gig Economy (Juillet 2025, p20)
(1, 'gig economy', '/ɡɪɡ ɪˈkɒnəmi/', 'a labour market of short-term contracts and freelance work', 'The gig economy has grown rapidly in recent years.', 'économie des missions'),
(1, 'freelancer', '/ˈfriːlɑːnsə/', 'a self-employed person who works for different clients', 'As a freelancer, she enjoys flexible working hours.', 'freelance, travailleur indépendant'),
(1, 'independent contractor', '/ˌɪndɪˈpendənt ˈkɒntræktə/', 'a person who works for themselves on a contract basis', 'Independent contractors are responsible for their own taxes.', 'entrepreneur indépendant'),
(1, 'flexibility', '/ˌfleksəˈbɪləti/', 'the ability to change or adapt easily', 'The gig economy offers flexibility but little security.', 'flexibilité'),
(1, 'job security', '/dʒɒb sɪˈkjʊərəti/', 'the probability that a person will keep their job', 'Freelancers often lack job security and benefits.', 'sécurité de l''emploi'),
(1, 'ride-sharing', '/raɪd ˈʃeərɪŋ/', 'a service where drivers use their own cars to transport passengers', 'Ride-sharing apps have changed urban transport.', 'covoiturage (payant)'),
(1, 'food delivery', '/fuːd dɪˈlɪvəri/', 'the service of delivering meals to customers', 'Food delivery apps employ millions of workers worldwide.', 'livraison de repas'),
(1, 'regulate', '/ˈreɡjuleɪt/', 'to control or supervise by means of rules', 'Governments are trying to regulate the gig economy.', 'réglementer'),
(1, 'labour market', '/ˈleɪbə ˈmɑːkɪt/', 'the supply and demand for work and workers', 'The gig economy has transformed the labour market.', 'marché du travail'),
(1, 'benefits', '/ˈbenɪfɪts/', 'extra advantages provided by an employer besides salary', 'Full-time employees receive benefits that freelancers do not.', 'avantages sociaux');
