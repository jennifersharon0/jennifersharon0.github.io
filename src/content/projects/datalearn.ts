import type { Project } from '../types';

/** Source : Recapitulatif_Projets_Annee.docx §6 et CV. */
export const datalearn: Project = {
  slug: 'datalearn',
  year: '2026',
  kind: 'personal',
  teamSize: 1,
  featured: true,
  stack: ['Python', 'FastAPI', 'Pydantic', 'PostgreSQL', 'Supabase', 'gpt-oss-120b (Groq)', 'BM25', 'scikit-learn', 'sentence-transformers', 'React', 'TypeScript', 'Vite', 'pytest', 'GitHub Actions', 'Render', 'Vercel'],
  links: [
    { label: { fr: 'Code', en: 'Code' }, url: 'https://github.com/jennifersharon0/DataLearn' },
    { label: { fr: 'Démo', en: 'Demo' }, url: 'https://datalearn-ten.vercel.app/login' },
  ],
  figures: [
    {
      name: 'accueil',
      width: 1891,
      height: 619,
      placement: 'overview',
      alt: {
        fr: 'Page d’accueil de DataLearn en thème sombre : menu latéral (Accueil, Mes cours, Notion du jour, Ma progression, Mon profil), message « Bonjour Sharon » avec 7 sujets consultés sur 190, cartes « Reprendre » et « Notion du jour », et l’assistant DataLearn ouvert à droite, qui répond à la question « C’est quoi un embedding ? ».',
        en: 'DataLearn home page in dark theme: side menu (Home, My courses, Topic of the day, My progress, My profile), a “Bonjour Sharon” greeting with 7 of 190 topics viewed, “Resume” and “Topic of the day” cards, and the DataLearn assistant open on the right, answering the question “What is an embedding?”.',
      },
      caption: {
        fr: 'L’accueil de DataLearn : reprise de la dernière leçon, notion du jour et suivi des sujets consultés, avec l’assistant accessible depuis toutes les pages.',
        en: 'The DataLearn home page: resume the last lesson, topic of the day and topics viewed, with the assistant available from every page (interface in French).',
      },
    },
  ],
  content: {
    fr: {
      title: 'DataLearn',
      shortTitle: 'DataLearn',
      summary:
        "Application web d'apprentissage de la data science, conçue et mise en ligne seule : 190 notions avec leçons et quiz contrôlés automatiquement, un tableau de bord de progression, et un assistant RAG évalué sur un jeu de test annoté, qui répond à partir du cours en citant ses sources.",
      category: 'IA générative · RAG · Application data',
      context: 'Projet personnel mené seule, de la conception à la mise en production',
      cardResult: 'La bonne leçon figure parmi les passages transmis au LLM pour 92 % des questions de test, et chaque réponse cite des sources vérifiées.',
      highlights: [
        'Évaluation de TF-IDF, des embeddings et d’un LLM sur 96 questions annotées : précision, hors sujet, robustesse aux fautes, latence et coût.',
        'Assistant RAG : 190 leçons découpées en 810 passages, recherche BM25 avec correcteur de fautes, sources vérifiées par le serveur et garde-fous.',
        'API FastAPI sécurisée, tableau de bord React en SVG, 49 tests pytest et intégration continue avec une évaluation de non-régression du LLM.',
      ],
      problem:
        "En cours, en stage ou dans les offres d'emploi, j'entendais régulièrement parler de web scraping, d'embeddings, de RAG ou de MLOps sans toujours savoir ce que ces notions recouvraient ni par où commencer. Les ressources existent, mais elles sont dispersées, de niveaux inégaux, et rarement accompagnées d'un moyen de vérifier ce que l'on a vraiment retenu.",
      objectives: [
        "Couvrir de façon structurée l'ensemble du domaine : 190 notions en 16 catégories, des fondamentaux statistiques aux LLM.",
        'Proposer pour chaque notion une leçon et un quiz, et un assistant IA qui répond à partir du cours pendant la lecture.',
        'Choisir l’architecture de l’assistant à partir de mesures plutôt que d’intuitions.',
        "Suivre la progression de l'utilisateur dans le temps avec un tableau de bord lisible.",
        'Livrer une application réellement en ligne, sécurisée et testée.',
      ],
      data: [
        'Base de connaissances construite par un pipeline Python : recherche de sources sur le web, extraction du texte des pages, rédaction par le LLM d’une leçon structurée et d’un quiz de 8 questions à 4 choix.',
        'Contenu stocké dans une base JSON versionnée avec le code.',
        "Données de progression modélisées comme un journal d'événements dans PostgreSQL : chaque leçon ouverte et chaque quiz terminé ajoute une ligne (utilisateur, sujet, type d'événement, score, horodatage).",
        'Jeu d’évaluation de 96 questions annotées avec la leçon attendue : questions directes, reformulations, questions avec fautes de frappe et questions hors sujet.',
      ],
      approach: [
        {
          title: '1. Une démarche itérative : de la détection d’intention au LLM',
          points: [
            'Première version : un chatbot en terminal comparant les messages à des phrases d’exemple par TF-IDF.',
            'Les reformulations n’étant pas reconnues, passage aux embeddings (sentence-transformers), qui représentent le sens des phrases.',
            'Avec 190 sujets souvent proches, les scores de similarité devenaient trop serrés : la compréhension du message a été confiée à un LLM recevant le catalogue complet des sujets.',
            "Passage à une application web où l'utilisateur choisit sa leçon : la détection d'intention devient inutile et l'assistant se concentre sur la leçon ouverte. Chaque version est archivée et documentée.",
          ],
        },
        {
          title: '2. Évaluation comparative sur un jeu de test annoté',
          points: [
            'Constitution de 96 questions annotées, chacune associée à la leçon attendue : questions directes, reformulations, fautes de frappe et questions hors sujet.',
            'Trois approches comparées pour retrouver la bonne leçon (TF-IDF, embeddings, LLM), selon cinq critères mesurés sur le même jeu : précision, détection du hors sujet, robustesse aux fautes de frappe, latence et coût.',
            'LLM : la bonne leçon figure dans ses trois premières propositions pour 100 % des questions, et toutes les questions hors sujet sont détectées, pour un coût de 0,52 $ les 1 000 questions.',
            'Résultat moins attendu : TF-IDF classe mieux les questions que les embeddings, mais s’effondre dès qu’elles contiennent des fautes de frappe ; les embeddings repèrent mieux le hors sujet.',
            'Conséquence sur l’architecture : une recherche lexicale complétée par un correcteur de fautes. Ce choix répond aussi à une contrainte de production, car les embeddings auraient demandé plusieurs centaines de Mo de mémoire sur un serveur gratuit limité à 512 Mo.',
          ],
        },
        {
          title: '3. Assistant RAG et garde-fous',
          points: [
            'Découpage des 190 leçons en 810 passages, pour ne transmettre au LLM que les extraits utiles plutôt que la leçon entière.',
            'Recherche des passages par BM25, une variante de TF-IDF utilisée par des moteurs comme Elasticsearch, précédée d’un correcteur qui ramène chaque mot inconnu vers le mot du cours le plus proche : la bonne leçon figure parmi les passages transmis dans 92 % des questions de test.',
            'Réponse rédigée par le LLM à partir de ces seuls passages, avec citation des sources utilisées.',
            'Garde-fous : chaque source citée doit correspondre à un passage réellement transmis, les réponses sans source sont rejetées, les refus hors sujet sont rédigés à l’avance et le prompt est protégé contre les tentatives de détournement.',
          ],
        },
        {
          title: '4. Base de connaissances et contrôle qualité',
          points: [
            'Génération automatisée avec gestion des contraintes de l’API : nouvelles tentatives à délai croissant, arrêt propre si le quota journalier est épuisé, reprise là où le traitement s’était arrêté.',
            'Script de contrôle des 190 quiz : quiz vide, nombre de questions ou d’options incorrect, bonne réponse inexistante, options en double, notation LaTeX mal affichée (détectée par expression régulière).',
            'Correction ciblée des seuls quiz défectueux, avec sauvegarde datée de la base, régénération puis revérification ; un quiz encore défectueux est refusé et l’ancien conservé.',
          ],
        },
        {
          title: '5. API REST (FastAPI)',
          points: [
            'Logique métier (correction, statistiques) séparée du code HTTP, donc testable sans serveur.',
            'Correction des quiz exclusivement côté serveur : le navigateur ne reçoit jamais les bonnes réponses.',
            'Validation de toutes les entrées avec Pydantic (longueurs, nombre de réponses, format des identifiants).',
            'Limiteur de débit à fenêtre glissante écrit sans bibliothèque : 30 questions et 60 définitions par heure et par utilisateur, réponse 429 au-delà.',
            'Pannes du LLM traitées séparément : un quota épuisé renvoie une erreur 503 et une panne du fournisseur une erreur 502, avec un message clair qui n’expose jamais le détail technique. Les définitions déjà générées sont gardées en cache.',
          ],
        },
        {
          title: '6. Données de progression et SQL',
          points: [
            "Requêtes SQL d'agrégation qui calculent en une seule lecture de la table l'état de chaque sujet, l'activité jour par jour sur douze semaines et l'historique des quiz.",
            'Requêtes paramétrées, ce qui écarte le risque d’injection SQL.',
            'Indicateurs : série de jours consécutifs, part des notions étudiées, part des quiz réussis (seuil 70 %), score moyen et son évolution.',
          ],
        },
        {
          title: '7. Sécurité et données personnelles',
          points: [
            "Authentification déléguée à Supabase ; l'API vérifie la signature de chaque jeton avec les clés publiques du fournisseur (JWKS), son expiration et son usage prévu.",
            "L'identité est toujours tirée du jeton vérifié ; chaque requête SQL filtre sur l'utilisateur connecté.",
            'Row Level Security activée sans règle d’accès et droits des rôles publics retirés : seul le serveur peut lire et écrire les données.',
            'Secrets uniquement dans des variables d’environnement ; origines autorisées restreintes (CORS).',
          ],
        },
        {
          title: '8. Assistant pédagogique',
          points: [
            'gpt-oss-120b, un modèle open-weight d’OpenAI, via l’API Groq, choisi au démarrage dans une liste de préférences avec repli automatique ; clé d’API côté serveur.',
            'Changement de modèle détecté pendant l’évaluation : Llama 3.3 70B, utilisé jusque-là, avait été retiré de Groq (erreur « model_not_found »). L’évaluation des 96 questions et le test de qualité de l’intégration continue ont été menés avec gpt-oss-120b.',
            'Réglage du raisonnement : passer le paramètre reasoning_effort à « low » a divisé par deux à quatre le nombre de tokens générés, et donc le coût de chaque réponse.',
            'Prompt retravaillé à partir de tests réels : il distingue quatre cas (simple annonce, question précise, demande d’approfondissement, hors sujet).',
            '« Notion du jour » : une notion jamais étudiée, avec une définition courte générée et mise en cache.',
          ],
        },
        {
          title: '9. Interface et visualisation',
          points: [
            'Interface React / TypeScript : accueil, catalogue par catégorie, leçon avec quiz et assistant, tableau de bord, historique filtrable, profil.',
            'Tableau de bord : quatre indicateurs clés, activité hebdomadaire, courbe des scores avec seuil de réussite, avancement par catégorie.',
            'Graphiques en SVG sans bibliothèque : infobulles, navigation au clavier, adaptation à la largeur ; palette vérifiée par script pour les personnes daltoniennes, en clair comme en sombre.',
          ],
        },
        {
          title: '10. Tests, intégration continue et mise en production',
          points: [
            '49 tests pytest exécutés en moins d’une seconde, dans un environnement isolé (base et LLM simulés).',
            'Tests de sécurité : jetons expirés, signés par une autre clé, prévus pour un autre usage ou modifiés : tous sont refusés.',
            'Tests de bout en bout dont un scénario garantissant qu’un utilisateur ne voit jamais l’activité d’un autre ; tests des vraies requêtes SQL sur une base PostgreSQL de test.',
            'Intégration continue avec GitHub Actions à chaque push, sur une base PostgreSQL éphémère créée puis supprimée à chaque exécution.',
            'Évaluation de non-régression du LLM : une partie du jeu de test est rejouée avec des seuils minimaux, et l’évaluation échoue si un changement de prompt ou de modèle fait baisser la qualité.',
            'Déploiement de l’API sur Render (avec route de santé) et de l’interface sur Vercel, redéployées à chaque mise à jour du dépôt.',
          ],
        },
      ],
      results: [
        'Application web complète, déployée et accessible en ligne.',
        'Assistant RAG : la bonne leçon figure parmi les passages transmis au LLM dans 92 % des questions de test, et chaque source citée est vérifiée par le serveur.',
        'Évaluation : le LLM place la bonne leçon dans ses trois premières propositions pour 100 % des questions et détecte toutes les questions hors sujet, pour 0,52 $ les 1 000 questions.',
        'Le réglage du raisonnement divise par deux à quatre le nombre de tokens générés, donc le coût de chaque réponse.',
        'Les 190 quiz passent tous les contrôles qualité après la correction ciblée.',
        '49 tests automatisés, exécutés en moins d’une seconde ; leur efficacité a été vérifiée en retirant volontairement le filtre par utilisateur d’une requête : les tests détectent l’erreur.',
      ],
      keyFigures: [
        { value: '92 %', label: 'des questions de test où la bonne leçon figure parmi les passages transmis' },
        { value: '96', label: 'questions annotées pour comparer TF-IDF, embeddings et LLM' },
        { value: '810', label: 'passages issus de 190 leçons, indexés pour la recherche' },
        { value: '49', label: 'tests pytest, < 1 s, et une évaluation du LLM en intégration continue' },
      ],
      challenges: [
        {
          problem: 'TF-IDF classait mieux les questions que les embeddings mais s’effondrait sur les fautes de frappe, et les embeddings ne tenaient pas dans les 512 Mo du serveur gratuit.',
          solution: 'Recherche lexicale BM25 précédée d’un correcteur qui ramène chaque mot inconnu vers le mot du cours le plus proche.',
        },
        {
          problem: 'Un LLM peut inventer une réponse ou citer une source qu’il n’a pas reçue.',
          solution: 'Vérification des sources par le serveur, rejet des réponses sans source, refus hors sujet rédigés à l’avance et protection contre le détournement du prompt.',
        },
        {
          problem: 'Avec 190 sujets proches, les scores de similarité (TF-IDF puis embeddings) devenaient trop serrés pour identifier le bon sujet.',
          solution: 'Confier la compréhension du message à un LLM disposant du catalogue complet, puis supprimer le besoin en laissant l’utilisateur choisir sa leçon dans l’interface.',
        },
        {
          problem: "Biais temporel : les horodatages en UTC faisaient compter une activité réalisée à 0 h 30 en France pour la veille.",
          solution: 'Calcul des jours dans le fuseau Europe/Paris et dates transmises à l’interface avec leur fuseau explicite.',
        },
        {
          problem: "À la mise en ligne, l'interface affichait « serveur injoignable » alors que l'API répondait.",
          solution: "Analyse des journaux : aucune requête du site n'arrivait. Une variable de configuration n'était pas prise en compte à la construction du site ; elle a été corrigée et le site reconstruit.",
        },
        {
          problem: "Face à « peux-tu développer ? », l'assistant reformulait simplement la leçon que l'utilisateur venait de lire.",
          solution: "Prompt distinguant quatre types de demandes ; pour un approfondissement, il impose d'apporter ce que la leçon ne dit pas : intuition, exemple chiffré, cas d'usage, erreurs fréquentes.",
        },
      ],
      limits: [
        'Profondeur inégale des leçons : une seconde version est prévue avec un prompt de rédaction plus exigeant, testé sur quelques notions avant une régénération par catégorie.',
        "L'assistant n'a pas de mémoire de la conversation : transmettre l'historique des échanges est la prochaine amélioration.",
        'La recherche laisse encore échapper la bonne leçon dans 8 % des questions de test ; le gain du correcteur de fautes n’a pas été mesuré séparément, et BM25 n’a pas été comparé directement à TF-IDF.',
        'Le jeu d’évaluation compte 96 questions : un jeu plus large, annoté par plusieurs personnes, rendrait les comparaisons entre méthodes plus fiables.',
        "L'hébergement gratuit met le serveur en veille : la première requête prend environ une minute de plus.",
        'Pistes : audit de sécurité par un tiers, rubrique de veille, analyse des données d’apprentissage pour personnaliser les recommandations.',
      ],
      skills:
        "Conception d'un produit à partir d'un besoin réel, NLP (TF-IDF, embeddings, LLM), conception d'un assistant RAG (découpage en passages, recherche BM25, citation des sources), évaluation comparative de modèles sur un jeu de test annoté (précision, robustesse, latence, coût), garde-fous pour un LLM, prompt engineering, contrôle qualité automatisé d'un jeu de données, modélisation de données et SQL d'agrégation, API REST avec FastAPI, sécurité applicative, visualisation de données et tableau de bord, React et TypeScript, tests avec pytest, intégration continue et tests de non-régression avec GitHub Actions, optimisation sous contrainte de mémoire et de coût, Git et mise en production.",
    },
    en: {
      title: 'DataLearn',
      shortTitle: 'DataLearn',
      summary:
        'A web app for learning data science, designed and shipped on my own: 190 topics with automatically checked lessons and quizzes, a progress dashboard, and a RAG assistant evaluated on an annotated test set, which answers from the course material and cites its sources.',
      category: 'Generative AI · RAG · Data application',
      context: 'Solo personal project, from design to production',
      cardResult: 'The right lesson is among the passages sent to the LLM for 92% of test questions, and every answer cites verified sources.',
      highlights: [
        'TF-IDF, embeddings and an LLM evaluated on 96 annotated questions: accuracy, off-topic detection, robustness to typos, latency and cost.',
        'A RAG assistant: 190 lessons split into 810 passages, BM25 search with a typo corrector, sources verified by the server, and guardrails.',
        'A secure FastAPI backend, a React dashboard in raw SVG, 49 pytest tests and continuous integration with an LLM regression evaluation.',
      ],
      problem:
        "In class, during my internship and in job ads, I kept hearing about web scraping, embeddings, RAG or MLOps without always knowing what they meant or where to start. Resources exist, but they are scattered, uneven in quality and rarely come with a way to check what you've actually understood.",
      objectives: [
        'Cover the whole field in a structured way: 190 topics across 16 categories, from statistical foundations to LLMs.',
        'Offer a lesson and a quiz for every topic, plus an AI assistant that answers from the course material while reading.',
        'Choose the assistant’s architecture based on measurements rather than intuition.',
        "Track the user's progress over time with a clear dashboard.",
        'Ship an application that is actually online, secure and tested.',
      ],
      data: [
        'Knowledge base built by a Python pipeline: web source search, page text extraction, then an LLM writes a structured lesson and an 8-question, 4-option quiz.',
        'Content stored in a JSON knowledge base versioned alongside the code.',
        'Progress data modelled as an event log in PostgreSQL: every opened lesson and completed quiz appends a row (user, topic, event type, score, timestamp).',
        'An evaluation set of 96 questions annotated with the expected lesson: direct questions, paraphrases, questions with typos and off-topic questions.',
      ],
      approach: [
        {
          title: '1. An iterative path: from intent detection to an LLM',
          points: [
            'First version: a terminal chatbot matching messages against example sentences with TF-IDF.',
            'Paraphrases were missed, so I moved to embeddings (sentence-transformers), which capture sentence meaning.',
            'With 190 closely related topics, similarity scores became too tight to call reliably, so message understanding was handed to an LLM given the full topic catalogue.',
            'Moving to a web app where users pick their lesson made intent detection unnecessary, letting the assistant focus on the open lesson. Each version is archived and documented.',
          ],
        },
        {
          title: '2. Comparative evaluation on an annotated test set',
          points: [
            'Built 96 annotated questions, each linked to the expected lesson: direct questions, paraphrases, typos and off-topic questions.',
            'Three approaches compared for finding the right lesson (TF-IDF, embeddings, LLM) on five criteria measured on the same set: accuracy, off-topic detection, robustness to typos, latency and cost.',
            'The LLM puts the right lesson in its top three suggestions for 100% of questions and detects every off-topic question, at a cost of $0.52 per 1,000 questions.',
            'A less expected result: TF-IDF ranks questions better than embeddings but collapses as soon as they contain typos, while embeddings are better at spotting off-topic questions.',
            'What it meant for the architecture: lexical search backed by a typo corrector. This also fits a production constraint, since embeddings would have needed several hundred MB of memory on a free server limited to 512 MB.',
          ],
        },
        {
          title: '3. RAG assistant and guardrails',
          points: [
            'The 190 lessons split into 810 passages, so only the useful excerpts are sent to the LLM rather than the whole lesson.',
            'Passage retrieval with BM25, a variant of TF-IDF used by search engines such as Elasticsearch, preceded by a corrector that maps each unknown word to the closest word in the course: the right lesson is among the passages sent in 92% of test questions.',
            'The LLM writes its answer from those passages only, citing the sources it used.',
            'Guardrails: every cited source must match a passage actually sent, answers without a source are rejected, off-topic refusals are written in advance, and the prompt is protected against injection attempts.',
          ],
        },
        {
          title: '4. Knowledge base and quality control',
          points: [
            'Automated generation that respects API limits: retries with increasing back-off, clean stop when the daily quota runs out, and resumption where processing left off.',
            'A checker for all 190 quizzes: empty quiz, wrong number of questions or options, answer pointing to a missing option, duplicate options, and LaTeX notation that renders badly (caught with a regular expression).',
            'Targeted fixes for faulty quizzes only: timestamped backup, regeneration, re-check; a regenerated quiz that still fails is rejected and the old one kept.',
          ],
        },
        {
          title: '5. REST API (FastAPI)',
          points: [
            'Business logic (grading, statistics) separated from HTTP code, so it can be tested without a server.',
            'Quizzes graded server-side only: the browser never receives the correct answers.',
            'All inputs validated with Pydantic (lengths, number of answers, identifier format).',
            'Sliding-window rate limiter written from scratch: 30 questions and 60 definitions per hour per user, HTTP 429 beyond that.',
            'LLM failures handled separately: an exhausted quota returns a 503 and a provider outage a 502, each with a clear message that never exposes technical details. Definitions already generated are cached.',
          ],
        },
        {
          title: '6. Progress data and SQL',
          points: [
            'SQL aggregation queries that compute, in a single pass over the table, each topic’s status, twelve weeks of daily activity and the quiz history.',
            'Parameterised queries throughout, ruling out SQL injection.',
            'Metrics: streak of active days, share of topics studied, share of quizzes passed (70% threshold), average score and its trend.',
          ],
        },
        {
          title: '7. Security and personal data',
          points: [
            "Authentication delegated to Supabase; the API verifies each token's signature with the provider's public keys (JWKS), its expiry and its intended audience.",
            'User identity always comes from the verified token; every SQL query filters on the signed-in user.',
            'Row Level Security enabled with no access policy and public role privileges revoked, so only the application server can read or write data.',
            'Secrets kept in environment variables only; allowed origins restricted (CORS).',
          ],
        },
        {
          title: '8. Teaching assistant',
          points: [
            "gpt-oss-120b, an open-weight model from OpenAI, through Groq's API, selected at startup from a preference list with automatic fallback; the API key stays server-side.",
            'A model change caught during the evaluation: Llama 3.3 70B, used until then, had been retired from Groq (a “model_not_found” error). The 96-question evaluation and the continuous integration quality test were both run with gpt-oss-120b.',
            'Reasoning tuning: setting reasoning_effort to “low” cut the number of generated tokens by a factor of two to four, and with it the cost of each answer.',
            'Prompt refined through real tests: it now distinguishes four cases (simple statement, specific question, request to go deeper, off-topic message).',
            '"Topic of the day": a topic the user has not studied yet, with a short generated and cached definition.',
          ],
        },
        {
          title: '9. Interface and data visualisation',
          points: [
            'React / TypeScript front end: home, catalogue by category, lesson page with quiz and assistant, dashboard, filterable quiz history, profile.',
            'Dashboard: four KPIs, weekly activity, score trend with the pass threshold, and progress by category.',
            'Charts drawn in raw SVG with no library: tooltips, keyboard navigation, responsive width; palette checked by script for colour-blind readers in both light and dark themes.',
          ],
        },
        {
          title: '10. Testing, continuous integration and production',
          points: [
            '49 pytest tests running in under a second in a fully isolated environment (database and LLM mocked).',
            'Security tests: expired tokens, tokens signed by another key, issued for another audience or tampered with to impersonate another user are all rejected.',
            "End-to-end API tests, including one ensuring a user never sees another user's activity, and tests of the real SQL queries against a test PostgreSQL database.",
            'Continuous integration with GitHub Actions on every push, against a throwaway PostgreSQL database created and deleted for each run.',
            'LLM regression evaluation: part of the test set is replayed against minimum thresholds, and the check fails if a prompt or model change lowers quality.',
            'API deployed on Render (with a health-check route) and front end on Vercel, both redeployed on every push.',
          ],
        },
      ],
      results: [
        'A complete web application, deployed and available online.',
        'RAG assistant: the right lesson is among the passages sent to the LLM in 92% of test questions, and every cited source is checked by the server.',
        'Evaluation: the LLM puts the right lesson in its top three for 100% of questions and detects every off-topic question, at $0.52 per 1,000 questions.',
        'Reasoning tuning cuts generated tokens by a factor of two to four, and with them the cost of each answer.',
        'All 190 quizzes pass every quality check after the targeted fixes.',
        '49 automated tests running in under a second; I checked they actually catch bugs by deliberately removing the per-user filter from a query, and the tests caught it.',
      ],
      keyFigures: [
        { value: '92%', label: 'of test questions where the right lesson is among the passages sent' },
        { value: '96', label: 'annotated questions to compare TF-IDF, embeddings and an LLM' },
        { value: '810', label: 'passages from 190 lessons, indexed for search' },
        { value: '49', label: 'pytest tests, < 1 s, plus an LLM evaluation in continuous integration' },
      ],
      challenges: [
        {
          problem: 'TF-IDF ranked questions better than embeddings but collapsed on typos, and embeddings did not fit in the 512 MB of the free server.',
          solution: 'BM25 lexical search preceded by a corrector that maps each unknown word to the closest word in the course.',
        },
        {
          problem: 'An LLM can make up an answer or cite a source it never received.',
          solution: 'Sources checked by the server, answers without a source rejected, off-topic refusals written in advance and protection against prompt injection.',
        },
        {
          problem: 'With 190 closely related topics, similarity scores (TF-IDF, then embeddings) became too tight to pick the right topic.',
          solution: 'Hand message understanding to an LLM with the full catalogue, then remove the need altogether by letting users choose their lesson in the UI.',
        },
        {
          problem: 'A time-zone bias: timestamps stored in UTC meant activity at 00:30 in France was counted for the previous day.',
          solution: 'Days are now computed in the Europe/Paris time zone, and dates sent to the UI carry an explicit offset.',
        },
        {
          problem: 'At launch, the UI showed "server unreachable" while the API was responding.',
          solution: 'Server logs showed no request from the site was arriving. A configuration variable was not being picked up at build time; I fixed it and rebuilt the site.',
        },
        {
          problem: 'Asked "can you elaborate?", the assistant simply restated the lesson the user had just read.',
          solution: 'A prompt that distinguishes four request types; when asked to go deeper, it must add what the lesson does not say: intuition, a worked example, use cases, common mistakes.',
        },
      ],
      limits: [
        'Lesson depth is uneven: a second version is planned with a stricter writing prompt, tested on a few topics before regenerating category by category.',
        'The assistant has no conversation memory: passing the chat history is the next planned improvement.',
        'Retrieval still misses the right lesson in 8% of test questions; the typo corrector’s gain was not measured separately, and BM25 was not compared directly with TF-IDF.',
        'The evaluation set has 96 questions: a larger set annotated by several people would make the comparisons between methods more reliable.',
        'Free hosting puts the server to sleep, adding about a minute to the first request.',
        'Next ideas: a third-party security audit, a data science news section, and analysing learning data to personalise recommendations.',
      ],
      skills:
        'Product design from a real need, NLP (TF-IDF, embeddings, LLMs), RAG assistant design (passage chunking, BM25 retrieval, source citation), comparative model evaluation on an annotated test set (accuracy, robustness, latency, cost), LLM guardrails, prompt engineering, automated dataset quality control, data modelling and SQL aggregation, REST APIs with FastAPI, application security, data visualisation and dashboard design, React and TypeScript, testing with pytest, continuous integration and regression testing with GitHub Actions, optimisation under memory and cost constraints, Git and production deployment.',
    },
  },
};
