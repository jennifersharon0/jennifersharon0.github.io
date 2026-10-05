import type { Project } from '../types';

/** Source : Recapitulatif_Projets_Annee.docx §6 et CV. */
export const datalearn: Project = {
  slug: 'datalearn',
  year: '2026',
  kind: 'personal',
  teamSize: 1,
  featured: true,
  stack: ['Python', 'FastAPI', 'Pydantic', 'PostgreSQL', 'Supabase', 'Llama 3.3 70B (Groq)', 'React', 'TypeScript', 'Vite', 'pytest', 'Render', 'Vercel'],
  links: [],
  content: {
    fr: {
      title: 'DataLearn',
      shortTitle: 'DataLearn',
      summary:
        "Application web d'apprentissage de la data science avec assistant IA : 190 notions, leçons et quiz générés par LLM puis contrôlés automatiquement, tableau de bord de progression. Conçue et mise en ligne seule.",
      category: 'IA générative · Application data',
      context: 'Projet personnel mené seule, de la conception à la mise en production',
      cardResult: '190 quiz conformes à tous les contrôles qualité · 49 tests automatisés',
      problem:
        "En cours, en stage ou dans les offres d'emploi, j'entendais régulièrement parler de web scraping, d'embeddings, de RAG ou de MLOps sans toujours savoir ce que ces notions recouvraient ni par où commencer. Les ressources existent, mais elles sont dispersées, de niveaux inégaux, et rarement accompagnées d'un moyen de vérifier ce que l'on a vraiment retenu.",
      objectives: [
        "Couvrir de façon structurée l'ensemble du domaine : 190 notions en 16 catégories, des fondamentaux statistiques aux LLM.",
        'Proposer pour chaque notion une leçon et un quiz, et un assistant IA à qui poser ses questions pendant la lecture.',
        "Suivre la progression de l'utilisateur dans le temps avec un tableau de bord lisible.",
        'Livrer une application réellement en ligne, sécurisée et testée.',
      ],
      data: [
        'Base de connaissances construite par un pipeline Python : recherche de sources sur le web, extraction du texte des pages, rédaction par le LLM d’une leçon structurée et d’un quiz de 8 questions à 4 choix.',
        'Contenu stocké dans une base JSON versionnée avec le code.',
        "Données de progression modélisées comme un journal d'événements dans PostgreSQL : chaque leçon ouverte et chaque quiz terminé ajoute une ligne (utilisateur, sujet, type d'événement, score, horodatage).",
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
          title: '2. Base de connaissances et contrôle qualité',
          points: [
            'Génération automatisée avec gestion des contraintes de l’API : nouvelles tentatives à délai croissant, arrêt propre si le quota journalier est épuisé, reprise là où le traitement s’était arrêté.',
            'Script de contrôle des 190 quiz : quiz vide, nombre de questions ou d’options incorrect, bonne réponse inexistante, options en double, notation LaTeX mal affichée (détectée par expression régulière).',
            'Correction ciblée des seuls quiz défectueux, avec sauvegarde datée de la base, régénération puis revérification ; un quiz encore défectueux est refusé et l’ancien conservé.',
          ],
        },
        {
          title: '3. API REST (FastAPI)',
          points: [
            'Logique métier (correction, statistiques) séparée du code HTTP, donc testable sans serveur.',
            'Correction des quiz exclusivement côté serveur : le navigateur ne reçoit jamais les bonnes réponses.',
            'Validation de toutes les entrées avec Pydantic (longueurs, nombre de réponses, format des identifiants).',
            'Limiteur de débit à fenêtre glissante écrit sans bibliothèque : 30 questions et 60 définitions par heure et par utilisateur, réponse 429 au-delà.',
            'Pannes du LLM distinguées (quota épuisé → 503, erreur fournisseur → 502) avec un message clair et sans exposer le détail technique ; définitions mises en cache.',
          ],
        },
        {
          title: '4. Données de progression et SQL',
          points: [
            "Requêtes d'agrégation (GROUP BY, BOOL_OR, MAX, COUNT … FILTER) produisant en une seule lecture l'état de chaque sujet, l'activité jour par jour sur douze semaines et l'historique des quiz.",
            'Requêtes paramétrées, ce qui écarte le risque d’injection SQL.',
            'Indicateurs : série de jours consécutifs, part des notions étudiées, part des quiz réussis (seuil 70 %), score moyen et son évolution.',
          ],
        },
        {
          title: '5. Sécurité et données personnelles',
          points: [
            "Authentification déléguée à Supabase ; l'API vérifie la signature de chaque jeton avec les clés publiques du fournisseur (JWKS), son expiration et son usage prévu.",
            "L'identité est toujours tirée du jeton vérifié ; chaque requête SQL filtre sur l'utilisateur connecté.",
            'Row Level Security activée sans règle d’accès et droits des rôles publics retirés : seul le serveur peut lire et écrire les données.',
            'Secrets uniquement dans des variables d’environnement ; origines autorisées restreintes (CORS).',
          ],
        },
        {
          title: '6. Assistant pédagogique',
          points: [
            'Llama 3.3 70B via l’API Groq, choisi au démarrage dans une liste de préférences avec repli automatique ; clé d’API côté serveur.',
            'Réponses ancrées dans la leçon ouverte, transmise comme contexte, pour limiter le hors-sujet et les inventions.',
            'Prompt retravaillé à partir de tests réels : il distingue quatre cas (simple annonce, question précise, demande d’approfondissement, hors sujet).',
            '« Notion du jour » : une notion jamais étudiée, avec une définition courte générée et mise en cache.',
          ],
        },
        {
          title: '7. Interface et visualisation',
          points: [
            'Interface React / TypeScript : accueil, catalogue par catégorie, leçon avec quiz et assistant, tableau de bord, historique filtrable, profil.',
            'Tableau de bord : quatre indicateurs clés, activité hebdomadaire, courbe des scores avec seuil de réussite, avancement par catégorie.',
            'Graphiques en SVG sans bibliothèque : infobulles, navigation au clavier, adaptation à la largeur ; palette vérifiée par script pour les personnes daltoniennes, en clair comme en sombre.',
          ],
        },
        {
          title: '8. Tests et mise en production',
          points: [
            '49 tests pytest exécutés en moins d’une seconde, dans un environnement isolé (base et LLM simulés).',
            'Tests de sécurité : jetons expirés, signés par une autre clé, prévus pour un autre usage ou modifiés — tous refusés.',
            'Tests de bout en bout dont un scénario garantissant qu’un utilisateur ne voit jamais l’activité d’un autre ; tests des vraies requêtes SQL sur une base PostgreSQL de test.',
            'Déploiement de l’API sur Render (avec route de santé) et de l’interface sur Vercel, redéployées à chaque mise à jour du dépôt.',
          ],
        },
      ],
      results: [
        'Application web complète, déployée et accessible en ligne.',
        'Les 190 quiz passent tous les contrôles qualité après la correction ciblée.',
        '49 tests automatisés, exécutés en moins d’une seconde ; leur efficacité a été vérifiée en retirant volontairement le filtre par utilisateur d’une requête : les tests détectent l’erreur.',
      ],
      keyFigures: [
        { value: '190', label: 'notions en 16 catégories' },
        { value: '8 × 4', label: 'questions × choix par quiz' },
        { value: '49', label: 'tests pytest, < 1 s' },
        { value: '30 / h', label: 'questions par utilisateur (limiteur)' },
      ],
      challenges: [
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
        'La leçon entière est envoyée à chaque question : ne transmettre que les passages pertinents (approche RAG) réduirait le coût et améliorerait la précision.',
        "L'hébergement gratuit met le serveur en veille : la première requête prend environ une minute de plus.",
        'Pistes : audit de sécurité par un tiers, rubrique de veille, analyse des données d’apprentissage pour personnaliser les recommandations.',
      ],
      skills:
        "Conception produit à partir d'un besoin réel, NLP (TF-IDF, embeddings, LLM), prompt engineering, contrôle qualité automatisé d'un jeu de données, modélisation de données et SQL d'agrégation, API REST avec FastAPI, sécurité applicative, conception de tableau de bord, React et TypeScript, tests avec pytest, Git et mise en production.",
    },
    en: {
      title: 'DataLearn',
      shortTitle: 'DataLearn',
      summary:
        'A web app for learning data science with an AI assistant: 190 topics, LLM-generated lessons and quizzes with automated quality checks, and a progress dashboard. Designed and shipped on my own.',
      category: 'Generative AI · Data application',
      context: 'Solo personal project, from design to production',
      cardResult: 'All 190 quizzes pass every quality check · 49 automated tests',
      problem:
        "In class, during my internship and in job ads, I kept hearing about web scraping, embeddings, RAG or MLOps without always knowing what they meant or where to start. Resources exist, but they are scattered, uneven in quality and rarely come with a way to check what you've actually understood.",
      objectives: [
        'Cover the whole field in a structured way: 190 topics across 16 categories, from statistical foundations to LLMs.',
        'Offer a lesson and a quiz for every topic, plus an AI assistant to ask questions while reading.',
        "Track the user's progress over time with a clear dashboard.",
        'Ship an application that is actually online, secure and tested.',
      ],
      data: [
        'Knowledge base built by a Python pipeline: web source search, page text extraction, then an LLM writes a structured lesson and an 8-question, 4-option quiz.',
        'Content stored in a JSON knowledge base versioned alongside the code.',
        'Progress data modelled as an event log in PostgreSQL: every opened lesson and completed quiz appends a row (user, topic, event type, score, timestamp).',
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
          title: '2. Knowledge base and quality control',
          points: [
            'Automated generation that respects API limits: retries with increasing back-off, clean stop when the daily quota runs out, and resumption where processing left off.',
            'A checker for all 190 quizzes: empty quiz, wrong number of questions or options, answer pointing to a missing option, duplicate options, and LaTeX notation that renders badly (caught with a regular expression).',
            'Targeted fixes for faulty quizzes only: timestamped backup, regeneration, re-check; a regenerated quiz that still fails is rejected and the old one kept.',
          ],
        },
        {
          title: '3. REST API (FastAPI)',
          points: [
            'Business logic (grading, statistics) separated from HTTP code, so it can be tested without a server.',
            'Quizzes graded server-side only: the browser never receives the correct answers.',
            'All inputs validated with Pydantic (lengths, number of answers, identifier format).',
            'Sliding-window rate limiter written from scratch: 30 questions and 60 definitions per hour per user, HTTP 429 beyond that.',
            'LLM failures handled explicitly (quota exhausted → 503, provider error → 502) with clear messages and no technical details exposed; definitions are cached.',
          ],
        },
        {
          title: '4. Progress data and SQL',
          points: [
            'Aggregation queries (GROUP BY, BOOL_OR, MAX, COUNT … FILTER) that return, in a single table scan, each topic’s status, twelve weeks of daily activity and quiz history.',
            'Parameterised queries throughout, ruling out SQL injection.',
            'Metrics: streak of active days, share of topics studied, share of quizzes passed (70% threshold), average score and its trend.',
          ],
        },
        {
          title: '5. Security and personal data',
          points: [
            "Authentication delegated to Supabase; the API verifies each token's signature with the provider's public keys (JWKS), its expiry and its intended audience.",
            'User identity always comes from the verified token; every SQL query filters on the signed-in user.',
            'Row Level Security enabled with no access policy and public role privileges revoked, so only the application server can read or write data.',
            'Secrets kept in environment variables only; allowed origins restricted (CORS).',
          ],
        },
        {
          title: '6. Teaching assistant',
          points: [
            "Llama 3.3 70B through Groq's API, selected at startup from a preference list with automatic fallback; the API key stays server-side.",
            'Answers grounded in the open lesson, passed as context, to limit off-topic replies and hallucinations.',
            'Prompt refined through real tests: it now distinguishes four cases (simple statement, specific question, request to go deeper, off-topic message).',
            '"Topic of the day": a topic the user has not studied yet, with a short generated and cached definition.',
          ],
        },
        {
          title: '7. Interface and data visualisation',
          points: [
            'React / TypeScript front end: home, catalogue by category, lesson page with quiz and assistant, dashboard, filterable quiz history, profile.',
            'Dashboard: four KPIs, weekly activity, score trend with the pass threshold, and progress by category.',
            'Charts drawn in raw SVG with no library: tooltips, keyboard navigation, responsive width; palette checked by script for colour-blind readers in both light and dark themes.',
          ],
        },
        {
          title: '8. Testing and production',
          points: [
            '49 pytest tests running in under a second in a fully isolated environment (database and LLM mocked).',
            'Security tests: expired tokens, tokens signed by another key, issued for another audience or tampered with to impersonate another user — all rejected.',
            "End-to-end API tests, including one ensuring a user never sees another user's activity, and tests of the real SQL queries against a test PostgreSQL database.",
            'API deployed on Render (with a health-check route) and front end on Vercel, both redeployed on every push.',
          ],
        },
      ],
      results: [
        'A complete web application, deployed and available online.',
        'All 190 quizzes pass every quality check after the targeted fixes.',
        '49 automated tests running in under a second; I checked they actually catch bugs by deliberately removing the per-user filter from a query — the tests flagged it.',
      ],
      keyFigures: [
        { value: '190', label: 'topics in 16 categories' },
        { value: '8 × 4', label: 'questions × options per quiz' },
        { value: '49', label: 'pytest tests, < 1 s' },
        { value: '30 / h', label: 'questions per user (rate limit)' },
      ],
      challenges: [
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
        'The whole lesson is sent with every question: sending only relevant passages via semantic search (a RAG approach) would cut costs and sharpen answers.',
        'Free hosting puts the server to sleep, adding about a minute to the first request.',
        'Next ideas: a third-party security audit, a data science news section, and analysing learning data to personalise recommendations.',
      ],
      skills:
        'Product design from a real need, NLP (TF-IDF, embeddings, LLMs), prompt engineering, automated dataset quality control, data modelling and SQL aggregation, REST APIs with FastAPI, application security, dashboard design, React and TypeScript, testing with pytest, Git and production deployment.',
    },
  },
};
