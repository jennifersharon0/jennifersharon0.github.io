import type { Project } from '../types';

/** Source : Recapitulatif_Projets_Annee.docx §3 (année : CV). */
export const hrAttrition: Project = {
  slug: 'hr-attrition',
  year: '2025',
  kind: 'academic',
  featured: true,
  stack: ['Python', 'Random Forest', 'Logistic Regression', 'Decision Tree', 'KNN Imputer', 'PCA', 'Chi²', 'VIF'],
  links: [],
  content: {
    fr: {
      title: 'Prédire et expliquer les départs d’employés chez HumanForYou',
      shortTitle: 'Attrition RH',
      summary:
        "Croiser données RH, enquêtes et badgeuses pour prédire les départs, puis traduire le modèle en leviers d'action concrets pour les ressources humaines.",
      category: 'Machine Learning · IA explicable',
      context: 'Projet IA académique · cas d’entreprise HumanForYou',
      cardResult: 'Un Random Forest optimisé, retenu pour son meilleur compromis entre precision et recall, et les principaux facteurs de départ identifiés pour les équipes RH.',
      highlights: [
        'Fusion de 4 sources RH et 8 variables dérivées des badgeuses (heures travaillées, retards, absences).',
        'Régression logistique, arbre de décision et Random Forest optimisé comparés sur accuracy, precision, recall, F1 et ROC AUC.',
        'Explicabilité par importance des variables, recommandations RH et livrable éthique (7 exigences UE).',
      ],
      problem:
        "HumanForYou, entreprise pharmaceutique indienne d'environ 4 000 employés, perd environ 15 % de ses effectifs chaque année. La direction voulait comprendre les facteurs de ce turn-over, disposer de modèles prédictifs et obtenir des pistes concrètes pour améliorer la rétention.",
      objectives: [
        'Identifier les facteurs qui expliquent les départs.',
        'Construire et comparer des modèles de classification prédisant l’attrition.',
        'Rendre le modèle explicable pour les RH et formuler des recommandations.',
        'Mener la démarche de façon éthique et documentée.',
      ],
      data: [
        'Quatre sources : données RH générales, enquête de satisfaction des employés, évaluation managériale et horaires de badgeuse (arrivées / départs).',
        '8 variables dérivées des badgeuses : heures moyennes travaillées, variabilité des horaires, jours d’absence, retards, etc.',
        'Fusion sur la clé EmployeeID ; suppression des variables constantes ou non pertinentes (EmployeeCount, Over18, StandardHours) et de la variable sensible Gender, dans une démarche éthique explicite.',
      ],
      approach: [
        {
          title: '1. Exploration et préparation',
          points: [
            'Analyse exploratoire : distributions, valeurs manquantes, statistiques descriptives, déséquilibre des classes.',
            'Imputation KNN des valeurs manquantes numériques et imputation par le mode pour les catégorielles.',
            'Normalisation des variables numériques, encodage des catégorielles, découpage stratifié 80 % / 20 %.',
          ],
        },
        {
          title: '2. Analyses statistiques',
          points: [
            'Analyses univariées et bivariées (chaque variable croisée avec l’attrition).',
            'Test du Chi² et V de Cramer entre variables catégorielles, ACP, matrice de corrélation.',
            'Calcul du VIF pour écarter tout risque de multicolinéarité.',
          ],
        },
        {
          title: '3. Modélisation',
          points: [
            'Trois modèles de classification supervisée comparés : régression logistique, arbre de décision et Random Forest (avec optimisation des hyperparamètres).',
            'Évaluation par accuracy, precision, recall, F1-score, matrices de confusion et courbes ROC / AUC.',
          ],
        },
        {
          title: '4. Explicabilité et restitution',
          points: [
            'Importance des variables (feature importance) pour dépasser la prédiction en « boîte noire » et identifier des leviers d’action.',
            'Interprétation métier et recommandations pour les RH.',
            'Livrable éthique analysant le projet selon les 7 exigences de la Commission européenne pour une IA digne de confiance, et bibliographie associée.',
          ],
        },
      ],
      results: [
        'Le Random Forest optimisé obtient les meilleures performances sur le meilleur compromis entre precision et recall.',
        "L'attrition apparaît liée à un cumul de signaux faibles : charge de travail excessive, relation managériale instable, manque de perspectives de carrière, reconnaissance salariale ou promotion insuffisante, et signaux comportementaux comme les absences ou les retards.",
        'Ces facteurs ont été traduits en recommandations concrètes pour les équipes RH.',
      ],
      keyFigures: [
        { value: '4', label: 'sources de données RH fusionnées' },
        { value: '8', label: 'variables créées à partir des badgeuses' },
        { value: '7', label: 'exigences éthiques de l’UE analysées' },
      ],
      challenges: [
        {
          problem: 'Des données dispersées entre quatre sources, dont des horaires bruts de badgeuse difficiles à exploiter tels quels.',
          solution: 'Création de variables de comportement de présence, puis fusion de toutes les sources sur l’identifiant employé.',
        },
        {
          problem: 'Valeurs manquantes et risque de multicolinéarité entre variables.',
          solution: 'Imputation KNN (numériques) et par le mode (catégorielles) ; contrôle par matrice de corrélation et VIF.',
        },
        {
          problem: 'Un modèle prédictif seul ne dit pas aux RH sur quoi agir, et certaines variables posent un problème éthique.',
          solution: 'Suppression de la variable Gender, explicabilité par importance des variables et analyse selon les exigences européennes sur l’IA.',
        },
      ],
      learnings: [
        'La valeur d’un modèle RH tient autant à son explicabilité qu’à sa performance : ce sont les facteurs identifiés qui permettent d’agir.',
        'Le choix des variables est aussi une décision éthique, à justifier explicitement.',
      ],
      skills:
        'Fusion de sources hétérogènes, feature engineering, imputation, tests statistiques (Chi², V de Cramer, VIF), classification supervisée, évaluation multi-métriques, explicabilité, éthique de l’IA et restitution à un public non technique.',
    },
    en: {
      title: 'Predicting and explaining employee attrition at HumanForYou',
      shortTitle: 'HR attrition',
      summary:
        'Combining HR records, surveys and badge data to predict departures, then turning the model into concrete levers for HR.',
      category: 'Machine learning · Explainable AI',
      context: 'Academic AI project · HumanForYou business case',
      cardResult: 'A tuned random forest, chosen for its best balance between precision and recall, and the main drivers of attrition identified for HR teams.',
      highlights: [
        'Merged 4 HR sources and engineered 8 features from badge data (hours worked, late arrivals, absences).',
        'Logistic regression, decision tree and tuned random forest compared on accuracy, precision, recall, F1 and ROC AUC.',
        'Explainability through feature importance, HR recommendations and an ethics deliverable (7 EU requirements).',
      ],
      problem:
        'HumanForYou, an Indian pharmaceutical company with around 4,000 employees, loses about 15% of its workforce every year. Management wanted to understand what drives this turnover, have predictive models, and get concrete ideas to improve retention.',
      objectives: [
        'Identify the factors behind employee departures.',
        'Build and compare classification models that predict attrition.',
        'Make the model explainable for HR and turn it into recommendations.',
        'Carry out the work ethically and document it.',
      ],
      data: [
        'Four sources: general HR data, an employee satisfaction survey, manager evaluations and badge-in/badge-out times.',
        '8 features derived from badge data: average hours worked, schedule variability, days absent, late arrivals, etc.',
        'Merged on EmployeeID; constant or irrelevant variables (EmployeeCount, Over18, StandardHours) dropped, along with the sensitive Gender variable as an explicit ethical choice.',
      ],
      approach: [
        {
          title: '1. Exploration and preparation',
          points: [
            'Exploratory analysis: distributions, missing values, descriptive statistics, class imbalance.',
            'KNN imputation for numeric missing values and mode imputation for categorical ones.',
            'Numeric scaling, categorical encoding and a stratified 80/20 split.',
          ],
        },
        {
          title: '2. Statistical analysis',
          points: [
            'Univariate and bivariate analysis (each variable against attrition).',
            "Chi-squared tests and Cramér's V between categorical variables, PCA and a correlation matrix.",
            'VIF computed to rule out multicollinearity.',
          ],
        },
        {
          title: '3. Modelling',
          points: [
            'Three supervised classifiers compared: logistic regression, decision tree and random forest (with hyperparameter tuning).',
            'Evaluated with accuracy, precision, recall, F1-score, confusion matrices and ROC / AUC curves.',
          ],
        },
        {
          title: '4. Explainability and reporting',
          points: [
            'Feature importance to move beyond a black-box prediction and pinpoint actionable levers.',
            'Business interpretation and recommendations for HR.',
            "An ethics deliverable assessing the project against the European Commission's 7 requirements for trustworthy AI, plus a bibliography.",
          ],
        },
      ],
      results: [
        'The tuned random forest performed best, offering the best balance between precision and recall.',
        'Attrition turned out to be driven by an accumulation of weak signals: excessive workload, unstable relationships with managers, lack of career prospects, insufficient pay recognition or promotion, and behavioural signals such as absences and late arrivals.',
        'These factors were turned into concrete recommendations for HR teams.',
      ],
      keyFigures: [
        { value: '4', label: 'HR data sources merged' },
        { value: '8', label: 'features created from badge data' },
        { value: '7', label: 'EU ethics requirements analysed' },
      ],
      challenges: [
        {
          problem: 'Data spread across four sources, including raw badge times that are hard to use as-is.',
          solution: 'Engineered attendance-behaviour features, then merged every source on the employee ID.',
        },
        {
          problem: 'Missing values and a risk of multicollinearity.',
          solution: 'KNN imputation (numeric) and mode imputation (categorical); checks with a correlation matrix and VIF.',
        },
        {
          problem: "A prediction alone doesn't tell HR what to act on, and some variables raise ethical concerns.",
          solution: 'Dropped the Gender variable, explained the model through feature importance and assessed it against the EU requirements for AI.',
        },
      ],
      learnings: [
        'An HR model is only as useful as it is explainable: the identified drivers are what make action possible.',
        'Feature selection is also an ethical decision, and it needs to be justified explicitly.',
      ],
      skills:
        "Merging heterogeneous sources, feature engineering, imputation, statistical tests (chi-squared, Cramér's V, VIF), supervised classification, multi-metric evaluation, explainability, AI ethics and reporting to a non-technical audience.",
    },
  },
};
