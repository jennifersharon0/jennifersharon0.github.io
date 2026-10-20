import type { Project } from '../types';

/** Source : Recapitulatif_Projets_Annee.docx §4. */
export const diabetesDeepLearning: Project = {
  slug: 'diabetes-deep-learning',
  year: '2025',
  kind: 'academic',
  teamSize: 4,
  featured: true,
  stack: ['PyTorch', 'scikit-learn', 'MLflow', 'Optuna', 'CodeCarbon', 'DVC', 'Docker', 'GitHub Actions', 'FastAPI'],
  links: [],
  content: {
    fr: {
      title: 'Prédiction du diabète avec un pipeline de deep learning complet',
      shortTitle: 'Prédiction du diabète',
      summary:
        "Du prétraitement des données de santé au service du modèle : réseaux de neurones en PyTorch, suivi d'expériences, analyse des biais, mesure de l'empreinte carbone et industrialisation.",
      category: 'Deep Learning · MLOps',
      context: 'Projet académique · CESI · groupe de 4 étudiants',
      cardResult: 'ROC AUC de 0,82, avec une analyse des biais sur 5 attributs sensibles.',
      highlights: [
        'Préparation sans fuite : ColumnTransformer + RobustScaler, découpage stratifié 70 / 15 / 15, pondération des classes.',
        'MLP PyTorch optimisé avec Optuna et suivi dans MLflow, comparé à une régression logistique de référence.',
        'Audit des biais sur 5 attributs sensibles, empreinte carbone (CodeCarbon), DVC, CI/CD, Docker et API FastAPI.',
      ],
      problem:
        "Prédire l'apparition du diabète à partir de données de santé, en construisant un pipeline complet, du prétraitement jusqu'au déploiement, tout en examinant les biais du modèle et son empreinte carbone.",
      objectives: [
        'Préparer les données sans fuite entre les jeux d’entraînement, de validation et de test.',
        'Construire et optimiser des réseaux de neurones en PyTorch, avec un suivi d’expériences reproductible.',
        'Évaluer le modèle au-delà de la performance globale : classe minoritaire, équité entre groupes, coût énergétique.',
        'Industrialiser le projet : versionnement des données, tests, CI/CD, conteneurs et API.',
      ],
      data: [
        'Jeu de données de santé aux variables encodées (ex. HighBP, BMI, tranches d’âge de 1 à 13), avec des variables apparemment numériques qui sont en réalité catégorielles.',
        'Classes déséquilibrées : les patients diabétiques sont minoritaires.',
        'Variables peu liées à la cible (ex. MentHlth, Fruits, Veggies, Sex, AnyHealthcare, NoDocbcCost) retirées du jeu final.',
      ],
      approach: [
        {
          title: '1. Exploration et analyse statistique',
          points: [
            'Identification des fausses variables numériques, statistiques descriptives et détection des valeurs aberrantes.',
            'Analyses univariées et bivariées : le diabète est surtout associé à l’âge avancé, à l’obésité (BMI élevé) et à une santé physique dégradée.',
            'Analyse multivariée par matrice de corrélation et matrice de V de Cramer pour repérer les variables peu liées à la cible.',
          ],
        },
        {
          title: '2. Préparation sans fuite',
          points: [
            'Découpage stratifié en trois jeux : 70 % entraînement, 15 % validation, 15 % test.',
            'Pipeline de transformation (ColumnTransformer + RobustScaler) appris sur l’entraînement uniquement.',
            'Export des données prétraitées en CSV pour figer les expérimentations.',
          ],
        },
        {
          title: '3. Modélisation et optimisation',
          points: [
            'Modèle de référence simple (régression logistique) puis perceptron multicouche : couches denses, BatchNorm, activation SELU et dropout.',
            'Déséquilibre des classes traité par pondération de la fonction de coût.',
            'Suivi des expériences avec MLflow (courbes de perte, matrices de confusion, modèles enregistrés).',
            'Optimisation des hyperparamètres avec Optuna sur plusieurs campagnes d’essais, comparées par leurs courbes ROC / AUC.',
          ],
        },
        {
          title: '4. Évaluation responsable',
          points: [
            'Rapport de classification détaillé, centré sur le compromis precision / recall de la classe minoritaire.',
            'Analyse des biais selon le sexe, l’âge, l’éducation, le revenu et l’état de santé général : matrices de confusion par groupe, impact disparate, equalized odds, rapport global d’alertes.',
            "Mesure de l'empreinte carbone de l'inférence avec CodeCarbon, mise en perspective avec des usages courants (recherche web, streaming, e-mail).",
          ],
        },
        {
          title: '5. Industrialisation',
          points: [
            'Gestion des données avec DVC.',
            'Tests unitaires sur les modèles, les données et l’API.',
            'Pipelines CI/CD avec GitHub Actions.',
            'Dockerfiles distincts pour l’entraînement et le service, et amorce d’une API de prédiction en FastAPI.',
          ],
        },
      ],
      results: [
        'Meilleur modèle : ROC AUC autour de 0,82.',
        'Le rapport de classification met en évidence le compromis precision / recall sur la classe minoritaire (patients diabétiques).',
        'Un rapport de biais couvrant cinq attributs sensibles et une estimation chiffrée du coût carbone de l’inférence accompagnent le modèle.',
      ],
      keyFigures: [
        { value: '0,82', label: 'de ROC AUC pour le meilleur modèle' },
        { value: '70 / 15 / 15', label: 'découpage stratifié (%)' },
        { value: '5', label: 'attributs sensibles audités' },
      ],
      challenges: [
        {
          problem: 'Des valeurs aberrantes sur les variables quantitatives auraient faussé une standardisation classique.',
          solution: 'Standardisation robuste (RobustScaler), fondée sur la médiane et l’écart interquartile.',
        },
        {
          problem: 'Classes déséquilibrées : un modèle naïf aurait ignoré les patients diabétiques.',
          solution: 'Pondération de la fonction de coût plutôt que génération de données synthétiques, et lecture attentive du recall de la classe minoritaire.',
        },
        {
          problem: 'Risque de fuite de données entre les jeux lors du prétraitement.',
          solution: 'Transformations apprises sur l’entraînement uniquement via un ColumnTransformer, et données prétraitées figées en CSV.',
        },
      ],
      learnings: [
        'Une bonne AUC globale ne suffit pas : il faut examiner la classe minoritaire et le comportement du modèle selon les groupes.',
        'Le suivi d’expériences (MLflow) et le versionnement des données (DVC) rendent les comparaisons entre essais traçables.',
        'Mesurer l’empreinte carbone de l’inférence permet de discuter du coût réel d’un modèle en production.',
      ],
      skills:
        'Analyse statistique exploratoire, prétraitement sans fuite, réseaux de neurones avec PyTorch, optimisation d’hyperparamètres (Optuna), suivi d’expériences (MLflow), évaluation de l’équité, mesure d’impact environnemental, MLOps (DVC, tests, GitHub Actions, Docker, FastAPI) et travail en équipe.',
    },
    en: {
      title: 'Predicting diabetes with an end-to-end deep learning pipeline',
      shortTitle: 'Diabetes prediction',
      summary:
        'From health data preprocessing to model serving: PyTorch neural networks, experiment tracking, bias analysis, carbon footprint measurement and MLOps.',
      category: 'Deep learning · MLOps',
      context: 'Academic project · CESI · team of 4 students',
      cardResult: 'ROC AUC of 0.82, with a bias audit across 5 sensitive attributes.',
      highlights: [
        'Leak-free preparation: ColumnTransformer + RobustScaler, stratified 70/15/15 split, class weighting.',
        'A PyTorch MLP tuned with Optuna and tracked in MLflow, compared with a logistic regression baseline.',
        'Bias audit across 5 sensitive attributes, carbon footprint (CodeCarbon), DVC, CI/CD, Docker and a FastAPI service.',
      ],
      problem:
        'Predict the onset of diabetes from health data by building a complete pipeline, from preprocessing to deployment, while examining model bias and carbon footprint.',
      objectives: [
        'Prepare the data with no leakage between training, validation and test sets.',
        'Build and tune neural networks in PyTorch with reproducible experiment tracking.',
        'Evaluate the model beyond overall performance: minority class, fairness across groups, energy cost.',
        'Industrialise the project: data versioning, tests, CI/CD, containers and an API.',
      ],
      data: [
        'A health dataset with encoded variables (e.g. HighBP, BMI, age brackets 1 to 13), including seemingly numeric variables that are actually categorical.',
        'Imbalanced classes: diabetic patients are the minority.',
        'Variables weakly related to the target (e.g. MentHlth, Fruits, Veggies, Sex, AnyHealthcare, NoDocbcCost) dropped from the final dataset.',
      ],
      approach: [
        {
          title: '1. Exploration and statistical analysis',
          points: [
            'Identified pseudo-numeric variables, computed descriptive statistics and detected outliers.',
            'Univariate and bivariate analysis: diabetes is mostly associated with older age, obesity (high BMI) and poor physical health.',
            "Multivariate analysis with a correlation matrix and a Cramér's V matrix to flag variables weakly related to the target.",
          ],
        },
        {
          title: '2. Leak-free preparation',
          points: [
            'Stratified three-way split: 70% training, 15% validation, 15% test.',
            'A transformation pipeline (ColumnTransformer + RobustScaler) fitted on training data only.',
            'Preprocessed data exported to CSV to freeze the experiments.',
          ],
        },
        {
          title: '3. Modelling and tuning',
          points: [
            'A simple baseline (logistic regression), then a multilayer perceptron: dense layers, BatchNorm, SELU activation and dropout.',
            'Class imbalance handled by weighting the loss function.',
            'Experiments tracked in MLflow (loss curves, confusion matrices, saved models).',
            'Hyperparameters tuned with Optuna over several trial campaigns, compared through their ROC / AUC curves.',
          ],
        },
        {
          title: '4. Responsible evaluation',
          points: [
            'Detailed classification report focused on the precision / recall trade-off for the minority class.',
            'Bias analysis by sex, age, education, income and general health: per-group confusion matrices, disparate impact, equalized odds and an overall bias alert report.',
            'Inference carbon footprint measured with CodeCarbon and compared with everyday digital activities (web search, streaming, email).',
          ],
        },
        {
          title: '5. Industrialisation',
          points: [
            'Data management with DVC.',
            'Unit tests for models, data and the API.',
            'CI/CD pipelines with GitHub Actions.',
            'Separate Dockerfiles for training and serving, and a first prediction API in FastAPI.',
          ],
        },
      ],
      results: [
        'Best model: ROC AUC of around 0.82.',
        'The classification report highlights the precision / recall trade-off on the minority class (diabetic patients).',
        'The model ships with a bias report covering five sensitive attributes and a quantified estimate of its inference carbon cost.',
      ],
      keyFigures: [
        { value: '0.82', label: 'ROC AUC for the best model' },
        { value: '70 / 15 / 15', label: 'stratified split (%)' },
        { value: '5', label: 'sensitive attributes audited' },
      ],
      challenges: [
        {
          problem: 'Outliers in the quantitative variables would have distorted standard scaling.',
          solution: 'Robust scaling (RobustScaler), based on the median and interquartile range.',
        },
        {
          problem: 'Imbalanced classes: a naive model would have ignored diabetic patients.',
          solution: 'Loss weighting rather than synthetic oversampling, and close attention to minority-class recall.',
        },
        {
          problem: 'Risk of data leakage between sets during preprocessing.',
          solution: 'Transformations fitted on training data only through a ColumnTransformer, with preprocessed data frozen to CSV.',
        },
      ],
      learnings: [
        'A good overall AUC is not enough: the minority class and the model’s behaviour across groups need to be examined.',
        'Experiment tracking (MLflow) and data versioning (DVC) make comparisons between runs traceable.',
        'Measuring inference carbon footprint grounds the discussion about a model’s real cost in production.',
      ],
      skills:
        'Exploratory statistics, leak-free preprocessing, neural networks with PyTorch, hyperparameter tuning (Optuna), experiment tracking (MLflow), fairness evaluation, environmental impact measurement, MLOps (DVC, tests, GitHub Actions, Docker, FastAPI) and teamwork.',
    },
  },
};
