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
'L''ambassade souhaite exprimer sa gratitude pour la coopération témoignée lors des récentes négociations. Nous espérons renforcer davantage notre partenariat dans les années à venir.', 'easy', 'diplomatie', 30),

('Rapport environnemental', 'Climate change represents one of the most pressing challenges of our time. Urgent action is required to reduce greenhouse gas emissions and transition towards a low-carbon economy.',
'Le changement climatique représente l''un des défis les plus pressants de notre époque. Une action urgente est nécessaire pour réduire les émissions de gaz à effet de serre et passer à une économie sobre en carbone.', 'medium', 'environnement', 30),

('Texte sanitaire', 'The public health agency has issued new guidelines regarding the prevention of infectious diseases. Healthcare professionals are urged to follow the updated protocols strictly.',
'L''agence de santé publique a publié de nouvelles directives concernant la prévention des maladies infectieuses. Les professionnels de santé sont priés de suivre strictement les protocoles mis à jour.', 'medium', 'sante', 28),

('Discours éducatif', 'Education is the cornerstone of any prosperous society. We must invest in our schools and universities to ensure that every child has access to quality learning opportunities.',
'L''éducation est la pierre angulaire de toute société prospère. Nous devons investir dans nos écoles et universités pour garantir que chaque enfant ait accès à des opportunités d''apprentissage de qualité.', 'easy', 'education', 31),

('Texte défense', 'The armed forces have been deployed to assist in humanitarian relief efforts following the natural disaster. Their mission includes providing medical aid and securing supply routes.',
'Les forces armées ont été déployées pour participer aux efforts d''aide humanitaire suite à la catastrophe naturelle. Leur mission comprend la fourniture d''aide médicale et la sécurisation des routes d''approvisionnement.', 'medium', 'defense', 32),

('Déclaration économique', 'The central bank has decided to maintain interest rates at their current level in order to support economic recovery. Inflation remains within the target range set by the monetary policy committee.',
'La banque centrale a décidé de maintenir les taux d''intérêt à leur niveau actuel afin de soutenir la reprise économique. L''inflation reste dans la fourchette cible fixée par le comité de politique monétaire.', 'medium', 'economie', 35),

('Rapport parlementaire', 'The parliamentary inquiry committee has concluded its investigation into the alleged misconduct. Its final report recommends disciplinary proceedings against the officials concerned.',
'La commission d''enquête parlementaire a conclu son investigation sur les allégations de faute. Son rapport final recommande des procédures disciplinaires à l''encontre des fonctionnaires concernés.', 'hard', 'politique', 32),

('Texte social', 'Social cohesion is essential for the stability of our democracy. We must address inequalities and ensure that the benefits of economic growth are shared equitably among all citizens.',
'La cohésion sociale est essentielle à la stabilité de notre démocratie. Nous devons nous attaquer aux inégalités et veiller à ce que les bénéfices de la croissance économique soient partagés équitablement entre tous les citoyens.', 'medium', 'social', 33),

('Communiqué de presse', 'The ministry regrets to announce the postponement of the international summit due to unforeseen logistical constraints. A new date will be communicated in due course.',
'Le ministère regrette d''annoncer le report du sommet international en raison de contraintes logistiques imprévues. Une nouvelle date sera communiquée en temps voulu.', 'easy', 'communication', 28),

('Texte juridique avancé', 'Notwithstanding any provision to the contrary, the contracting parties hereby agree that any dispute arising out of or in connection with this agreement shall be subject to binding arbitration in accordance with the rules of the International Chamber of Commerce.',
'Nonobstant toute disposition contraire, les parties contractantes conviennent par la présente que tout différend découlant de ou en relation avec le présent accord sera soumis à un arbitrage exécutoire conformément aux règles de la Chambre de commerce internationale.', 'hard', 'juridique', 42),

('Discours sur l''innovation', 'Artificial intelligence holds tremendous potential to transform public services. However, its deployment must be accompanied by robust ethical frameworks and transparency mechanisms.',
'L''intelligence artificielle offre un potentiel considérable pour transformer les services publics. Cependant, son déploiement doit s''accompagner de cadres éthiques solides et de mécanismes de transparence.', 'medium', 'technologie', 28),

('Rapport sur l''énergie', 'The transition to renewable energy sources is no longer optional but imperative. Our national strategy aims to achieve carbon neutrality by 2050 through a combination of wind, solar and nuclear power.',
'La transition vers les sources d''énergie renouvelables n''est plus optionnelle mais impérative. Notre stratégie nationale vise à atteindre la neutralité carbone d''ici 2050 grâce à une combinaison d''énergie éolienne, solaire et nucléaire.', 'medium', 'environnement', 33),

('Texte sur l''immigration', 'Our immigration policy seeks to attract skilled workers while ensuring the fair treatment of asylum seekers. We are committed to upholding our international obligations under the Geneva Convention.',
'Notre politique d''immigration vise à attirer des travailleurs qualifiés tout en assurant un traitement équitable des demandeurs d''asile. Nous nous engageons à respecter nos obligations internationales en vertu de la Convention de Genève.', 'medium', 'immigration', 33),

('Discours sur la laïcité', 'Freedom of conscience and freedom of religion are fundamental principles of our Republic. These liberties must be exercised within the framework of the law and with respect for public order.',
'La liberté de conscience et la liberté de religion sont des principes fondamentaux de notre République. Ces libertés doivent s''exercer dans le cadre de la loi et dans le respect de l''ordre public.', 'easy', 'institutionnel', 31),

('Rapport sur les transports', 'The modernization of our transport infrastructure requires substantial public investment. High-speed rail connections and sustainable urban mobility are priority areas for the next decade.',
'La modernisation de notre infrastructure de transport nécessite des investissements publics considérables. Les liaisons ferroviaires à grande vitesse et la mobilité urbaine durable sont des domaines prioritaires pour la prochaine décennie.', 'medium', 'infrastructure', 34),

('Texte sur la culture', 'Cultural heritage is a vital component of our national identity. The preservation of monuments, museums and archives requires sustained funding and expertise from heritage professionals.',
'Le patrimoine culturel est une composante essentielle de notre identité nationale. La préservation des monuments, musées et archives nécessite un financement soutenu et l''expertise des professionnels du patrimoine.', 'easy', 'culture', 31),

('Déclaration sur les droits', 'Human rights are universal and inalienable. Every individual is entitled to dignity, liberty and equality before the law, regardless of origin, gender or belief.',
'Les droits de l''homme sont universels et inaliénables. Chaque individu a droit à la dignité, à la liberté et à l''égalité devant la loi, indépendamment de son origine, de son genre ou de ses convictions.', 'easy', 'droits', 29),

('Texte sur la fiscalité', 'Tax reform is essential to ensure the sustainability of our social model. Broadening the tax base and combating fraud will generate additional revenue for public services.',
'La réforme fiscale est essentielle pour assurer la viabilité de notre modèle social. L''élargissement de l''assiette fiscale et la lutte contre la fraude généreront des recettes supplémentaires pour les services publics.', 'medium', 'economie', 29),

('Rapport sur l''agriculture', 'Sustainable agriculture is key to food security and environmental protection. We support our farmers in transitioning to organic farming and reducing pesticide use.',
'L''agriculture durable est essentielle pour la sécurité alimentaire et la protection de l''environnement. Nous soutenons nos agriculteurs dans leur transition vers l''agriculture biologique et la réduction de l''usage des pesticides.', 'easy', 'agriculture', 28),

('Discours sur la sécurité', 'The fight against terrorism and organized crime requires enhanced cooperation between law enforcement agencies. Intelligence sharing and cross-border operations are critical to our collective security.',
'La lutte contre le terrorisme et la criminalité organisée nécessite une coopération renforcée entre les forces de l''ordre. Le partage des renseignements et les opérations transfrontalières sont essentiels à notre sécurité collective.', 'medium', 'securite', 33),

('Texte sur l''urbanisme', 'Urban planning must reconcile economic development with environmental preservation. Smart city technologies can optimize resource management and improve the quality of life for residents.',
'L''urbanisme doit concilier le développement économique avec la préservation de l''environnement. Les technologies de la ville intelligente peuvent optimiser la gestion des ressources et améliorer la qualité de vie des habitants.', 'medium', 'urbanisme', 29),

('Rapport sur la recherche', 'Investment in research and development is a driver of competitiveness. We aim to increase public and private R&D spending to three percent of gross domestic product.',
'L''investissement dans la recherche et le développement est un moteur de compétitivité. Nous visons à augmenter les dépenses publiques et privées de R&D à trois pour cent du produit intérieur brut.', 'medium', 'recherche', 31),

('Texte sur le travail', 'The labour market is undergoing profound transformation due to automation and digitalization. Continuous training and professional development are essential to adapt to these changes.',
'Le marché du travail connaît une transformation profonde due à l''automatisation et à la numérisation. La formation continue et le développement professionnel sont essentiels pour s''adapter à ces changements.', 'medium', 'travail', 30),

('Discours sur l''Europe', 'European integration remains our strategic compass. We advocate for a more sovereign, democratic and efficient Union capable of meeting the challenges of the twenty-first century.',
'L''intégration européenne reste notre boussole stratégique. Nous prônons une Union plus souveraine, plus démocratique et plus efficace, capable de relever les défis du vingt-et-unième siècle.', 'medium', 'politique', 30),

('Texte sur la jeunesse', 'Young people are the future of our nation. We must provide them with quality education, decent employment and affordable housing to enable their full participation in society.',
'Les jeunes sont l''avenir de notre nation. Nous devons leur offrir une éducation de qualité, un emploi décent et un logement abordable pour leur permettre de participer pleinement à la société.', 'easy', 'social', 31),

('Rapport sur la justice', 'Access to justice is a fundamental right. The reform of our judicial system aims to reduce delays, modernize procedures and strengthen the independence of magistrates.',
'L''accès à la justice est un droit fondamental. La réforme de notre système judiciaire vise à réduire les délais, moderniser les procédures et renforcer l''indépendance des magistrats.', 'medium', 'justice', 30),

('Texte sur le numérique', 'Cybersecurity has become a national priority. Protecting our critical infrastructure against cyberattacks requires constant vigilance and collaboration between public and private actors.',
'La cybersécurité est devenue une priorité nationale. La protection de nos infrastructures critiques contre les cyberattaques nécessite une vigilance constante et une collaboration entre acteurs publics et privés.', 'medium', 'technologie', 30),

('Discours sur le handicap', 'The inclusion of persons with disabilities is a measure of our society''s progress. Accessibility, employment and autonomy must be at the heart of our public policies.',
'L''inclusion des personnes handicapées est une mesure du progrès de notre société. L''accessibilité, l''emploi et l''autonomie doivent être au cœur de nos politiques publiques.', 'easy', 'social', 29),

('Texte sur la francophonie', 'The French language is a vector of cultural diversity and international influence. We are committed to promoting Francophonie and teaching French worldwide.',
'La langue française est un vecteur de diversité culturelle et d''influence internationale. Nous nous engageons à promouvoir la Francophonie et l''enseignement du français dans le monde.', 'easy', 'culture', 28),

('Rapport sur l''eau', 'Water resource management is becoming increasingly critical due to climate change. Rational use, infrastructure maintenance and pollution prevention are priority actions.',
'La gestion des ressources en eau devient de plus en plus critique en raison du changement climatique. L''utilisation rationnelle, l''entretien des infrastructures et la prévention de la pollution sont des actions prioritaires.', 'medium', 'environnement', 30),

('Texte sur l''égalité', 'Gender equality is not merely a moral imperative but also an economic necessity. Closing the wage gap and combating discrimination require concrete and measurable commitments.',
'L''égalité entre les femmes et les hommes n''est pas seulement une impératif moral mais aussi une nécessité économique. La réduction des écarts de rémunération et la lutte contre les discriminations nécessitent des engagements concrets et mesurables.', 'medium', 'droits', 32),

('Discours sur le patrimoine', 'Our architectural and natural heritage is an invaluable asset that we hold in trust for future generations. Its preservation requires both legal protection and public awareness.',
'Notre patrimoine architectural et naturel est un atout inestimable que nous détenons en fiducie pour les générations futures. Sa préservation nécessite à la fois une protection juridique et une sensibilisation du public.', 'medium', 'culture', 32),

('Texte sur la décentralisation', 'Local authorities play a key role in the implementation of public policies. Decentralization must be accompanied by adequate resources and genuine autonomy in decision-making.',
'Les collectivités territoriales jouent un rôle clé dans la mise en œuvre des politiques publiques. La décentralisation doit s''accompagner de ressources adéquates et d''une véritable autonomie de décision.', 'medium', 'institutionnel', 30),

('Rapport sur la mer', 'Maritime policy encompasses economic, environmental and security dimensions. The sustainable exploitation of marine resources and the protection of marine ecosystems are complementary objectives.',
'La politique maritime englobe des dimensions économiques, environnementales et de sécurité. L''exploitation durable des ressources marines et la protection des écosystèmes marins sont des objectifs complémentaires.', 'hard', 'environnement', 31),

('Texte sur l''enseignement supérieur', 'Universities and research institutes are pillars of our knowledge society. International attractiveness, academic excellence and openness to society are the foundations of our strategy.',
'Les universités et instituts de recherche sont des piliers de notre société de la connaissance. L''attractivité internationale, l''excellence académique et l''ouverture sur la société sont les fondements de notre stratégie.', 'medium', 'education', 31),

('Discours sur le logement', 'Access to decent housing is a fundamental right enshrined in our Constitution. Combating precariousness and promoting social diversity in neighborhoods are priorities for housing policy.',
'L''accès à un logement décent est un droit fondamental inscrit dans notre Constitution. La lutte contre la précarité et la promotion de la mixité sociale dans les quartiers sont des priorités de la politique du logement.', 'easy', 'social', 33),

('Texte sur la fonction publique', 'Civil servants embody the values of the Republic. Their recruitment, training and career management must guarantee competence, integrity and impartiality in the service of citizens.',
'Les fonctionnaires incarnent les valeurs de la République. Leur recrutement, leur formation et la gestion de leur carrière doivent garantir la compétence, l''intégrité et l''impartialité au service des citoyens.', 'medium', 'administrative', 32),

('Rapport sur l''aide au développement', 'Official development assistance contributes to poverty reduction and sustainable development in partner countries. Its effectiveness depends on alignment with local priorities and transparent governance.',
'L''aide publique au développement contribue à la réduction de la pauvreté et au développement durable dans les pays partenaires. Son efficacité dépend de l''alignement sur les priorités locales et d''une gouvernance transparente.', 'hard', 'politique', 33),

('Texte sur la diversité', 'Cultural and ethnic diversity enriches our society. Integration policies must reject communitarianism while respecting identities and promoting shared values.',
'La diversité culturelle et ethnique enrichit notre société. Les politiques d''intégration doivent rejeter le communautarisme tout en respectant les identités et en promouvant les valeurs communes.', 'medium', 'social', 29),

('Discours sur l''innovation publique', 'Public innovation transforms the relationship between the administration and citizens. Digital services, participatory approaches and agile methods improve the efficiency and responsiveness of public action.',
'L''innovation publique transforme la relation entre l''administration et les citoyens. Les services numériques, les démarches participatives et les méthodes agiles améliorent l''efficacité et la réactivité de l''action publique.', 'medium', 'administrative', 31),

('Texte sur la diplomatie économique', 'Economic diplomacy aims to promote our companies abroad and attract foreign investment. Trade agreements, commercial missions and bilateral partnerships are essential instruments.',
'La diplomatie économique vise à promouvoir nos entreprises à l''étranger et à attirer les investissements étrangers. Les accords commerciaux, les missions économiques et les partenariats bilatéraux sont des instruments essentiels.', 'medium', 'diplomatie', 30),

('Rapport sur la gouvernance', 'Good governance is based on transparency, accountability and citizen participation. The fight against corruption and the promotion of ethics are prerequisites for the legitimacy of public institutions.',
'La bonne gouvernance repose sur la transparence, la responsabilité et la participation citoyenne. La lutte contre la corruption et la promotion de l''éthique sont des préalables à la légitimité des institutions publiques.', 'hard', 'institutionnel', 33),

('Texte sur la solidarité', 'International solidarity is a founding value of our foreign policy. Development aid, humanitarian action and crisis response demonstrate our commitment to a fairer world.',
'La solidarité internationale est une valeur fondatrice de notre politique étrangère. L''aide au développement, l''action humanitaire et la réponse aux crises témoignent de notre engagement en faveur d''un monde plus juste.', 'easy', 'politique', 30),

('Discours sur la transition écologique', 'The ecological transition requires a profound transformation of our production and consumption patterns. Every sector of the economy must contribute to the objective of carbon neutrality.',
'La transition écologique nécessite une transformation profonde de nos modes de production et de consommation. Chaque secteur de l''économie doit contribuer à l''objectif de neutralité carbone.', 'medium', 'environnement', 30),

('Texte sur la réforme territoriale', 'The reform of territorial organization aims to simplify administrative structures and improve public service delivery. Greater cooperation between local authorities is encouraged.',
'La réforme de l''organisation territoriale vise à simplifier les structures administratives et à améliorer la délivrance des services publics. Une plus grande coopération entre les collectivités territoriales est encouragée.', 'medium', 'institutionnel', 30),

('Rapport sur le patrimoine numérique', 'Digital data constitutes a strategic asset for the state. Its protection, governance and valorization require a clear legal framework and secure technical infrastructure.',
'Les données numériques constituent un atout stratégique pour l''État. Leur protection, leur gouvernance et leur valorisation nécessitent un cadre juridique clair et une infrastructure technique sécurisée.', 'hard', 'technologie', 30),

('Texte sur la formation professionnelle', 'Lifelong learning is essential to maintain employability in a rapidly changing economy. The professional training system must be flexible, accessible and aligned with business needs.',
'La formation tout au long de la vie est essentielle pour maintenir l''employabilité dans une économie en mutation rapide. Le système de formation professionnelle doit être flexible, accessible et aligné sur les besoins des entreprises.', 'medium', 'travail', 32),

('Discours sur la citoyenneté', 'Citizenship implies both rights and duties. Participation in public life, respect for the law and solidarity with fellow citizens are the foundations of our republican pact.',
'La citoyenneté implique à la fois des droits et des devoirs. La participation à la vie publique, le respect de la loi et la solidarité envers ses concitoyens sont les fondements de notre pacte républicain.', 'easy', 'institutionnel', 30),

('Texte sur le commerce international', 'Free trade agreements open new markets for our exporters while ensuring fair competition. Environmental and social clauses are systematically integrated into our negotiating mandate.',
'Les accords de libre-échange ouvrent de nouveaux marchés pour nos exportateurs tout en assurant une concurrence loyale. Les clauses environnementales et sociales sont systématiquement intégrées à notre mandat de négociation.', 'medium', 'economie', 31);
