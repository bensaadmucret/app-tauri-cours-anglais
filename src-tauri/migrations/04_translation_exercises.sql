CREATE TABLE IF NOT EXISTS translation_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  translation TEXT NOT NULL,
  difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  category TEXT DEFAULT 'administrative',
  word_count INTEGER DEFAULT 0
);

INSERT INTO translation_exercises (title, source, translation, difficulty, category, word_count) VALUES
('Discours officiel', 'The government has announced a series of measures aimed at strengthening public services and improving the efficiency of administrative procedures. These reforms will be implemented over the next twelve months.', 
'Le gouvernement a annoncé une série de mesures visant à renforcer les services publics et à améliorer l''efficacité des procédures administratives. Ces réformes seront mises en œuvre au cours des douze prochains mois.', 'easy', 'administrative', 32),

('Déclaration de politique', 'Our policy framework is designed to promote sustainable development while ensuring economic growth. We remain committed to international cooperation and multilateral dialogue.',
'Notre cadre politique est conçu pour promouvoir le développement durable tout en assurant la croissance économique. Nous restons attachés à la coopération internationale et au dialogue multilatéral.', 'easy', 'politique', 28),

('Rapport administratif', 'The committee has reviewed the preliminary findings of the investigation and recommends that further inquiries be conducted. The matter will be referred to the appropriate authorities for further action.',
'Le comité a examiné les conclusions préliminaires de l''enquête et recommande que des investigations supplémentaires soient menées. La question sera transmise aux autorités compétentes pour des mesures ultérieures.', 'medium', 'administrative', 35),

('Article de presse', 'In light of recent developments, the European Union has reaffirmed its commitment to regional stability. Member states are expected to align their national policies with the broader strategic objectives defined by the Council.',
'À la lumière des événements récents, l''Union européenne a réaffirmé son engagement en faveur de la stabilité régionale. Les États membres devraient aligner leurs politiques nationales sur les objectifs stratégiques plus larges définis par le Conseil.', 'medium', 'politique', 36),

('Document juridique', 'Pursuant to the provisions set forth in Article 12 of the aforementioned regulation, the applicant shall submit all relevant documentation within a period not exceeding thirty calendar days from the date of receipt of the notification.',
'Conformément aux dispositions énoncées à l''article 12 du règlement susmentionné, le demandeur devra soumettre tous les documents pertinents dans un délai n''excédant pas trente jours calendaires à compter de la date de réception de la notification.', 'hard', 'juridique', 38),

('Déclaration ministérielle', 'It is imperative that we address the structural challenges facing our public administration. The reform agenda must be pursued with determination, ensuring that citizen-centric services remain at the forefront of our priorities.',
'Il est impératif que nous abordions les défis structurels auxquels fait face notre administration publique. Le programme de réformes doit être poursuivi avec détermination, en veillant à ce que les services centrés sur le citoyen restent au premier plan de nos priorités.', 'medium', 'administrative', 36),

('Texte économique', 'The fiscal consolidation plan aims to reduce the budget deficit while maintaining essential public investments. Structural reforms in the labour market are expected to enhance competitiveness and stimulate job creation.',
'Le plan de consolidation budgétaire vise à réduire le déficit tout en maintenant les investissements publics essentiels. Les réformes structurelles du marché du travail devraient améliorer la compétitivité et stimuler la création d''emplois.', 'medium', 'economie', 31),

('Discours international', 'The bilateral agreement signed yesterday represents a milestone in our diplomatic relations. Both parties have pledged to uphold the principles of mutual respect and non-interference in internal affairs.',
'L''accord bilatéral signé hier représente une étape importante dans nos relations diplomatiques. Les deux parties se sont engagées à respecter les principes du respect mutuel et de la non-ingérence dans les affaires intérieures.', 'easy', 'politique', 33),

('Rapport d''audit', 'The oversight body has identified several irregularities in the procurement process. corrective measures have been mandated, and the relevant departments have been instructed to ensure compliance with established guidelines.',
'L''organe de supervision a identifié plusieurs irrégularités dans le processus d''achat public. Des mesures correctives ont été ordonnées, et les services concernés ont été instruits d''assurer la conformité avec les directives établies.', 'hard', 'administrative', 33),

('Texte institutionnel', 'The European Commission has adopted a new directive concerning environmental standards. Member states are required to transpose this legislation into national law within a period of two years.',
'La Commission européenne a adopté une nouvelle directive concernant les normes environnementales. Les États membres sont tenus de transposer cette législation en droit national dans un délai de deux ans.', 'easy', 'institutionnel', 33),

('Discours de circonstance', 'On the occasion of this solemn ceremony, I would like to pay tribute to the men and women who have dedicated their lives to the service of our nation. Their commitment and sacrifice continue to inspire future generations.',
'À l''occasion de cette cérémonie solennelle, je souhaite rendre hommage aux hommes et aux femmes qui ont consacré leur vie au service de notre nation. Leur engagement et leur sacrifice continuent d''inspirer les générations futures.', 'easy', 'ceremonial', 34),

('Texte technique', 'The implementation of the digital transformation strategy requires a comprehensive overhaul of existing IT infrastructure. Interoperability standards must be established to ensure seamless data exchange between agencies.',
'La mise en œuvre de la stratégie de transformation numérique nécessite une refonte complète de l''infrastructure informatique existante. Des normes d''interopérabilité doivent être établies pour garantir un échange fluide de données entre les services.', 'hard', 'technologie', 34),

('Note diplomatique', 'The embassy wishes to convey its gratitude for the cooperation extended during the recent negotiations. We look forward to further strengthening our partnership in the years to come.',
'L''ambassade souhaite exprimer sa gratitude pour la coopération témoignée lors des récentes négociations. Nous espérons renforcer davantage notre partenariat dans les années à venir.', 'easy', 'diplomatie', 30);
