import type { Project } from '../types';

/** Source : Recapitulatif_Projets_Annee.docx §5. */
export const mnistAutoencoders: Project = {
  slug: 'mnist-autoencoders',
  kind: 'academic',
  featured: true,
  stack: ['Python', 'TensorFlow / Keras 3', 'scikit-learn', 'NumPy', 'pandas', 'SciPy', 'Matplotlib', 'Seaborn', 'Google Colab', 'Kaggle (GPU T4)'],
  links: [],
  chart: 'mnist-accuracy',
  content: {
    fr: {
      title: 'Auto-encodeurs & réduction de dimension (MNIST)',
      shortTitle: 'Auto-encodeurs MNIST',
      summary:
        "Comparer ACP, t-SNE, auto-encodeur convolutif et auto-encodeur variationnel, puis mesurer ce que chaque représentation apporte à la classification d'images de chiffres manuscrits.",
      category: 'Deep Learning',
      context: 'Workshop Deep Learning (TensorFlow) · CESI',
      cardResult: 'SVM : 0,982 d’accuracy sur 32 variables apprises, contre 0,962 sur les 784 pixels',
      problem:
        "Comment représenter des données de très grande dimension de façon plus compacte sans perdre l'information utile ? Une image MNIST de 28 × 28 pixels compte 784 variables, dont beaucoup sont redondantes : l'information porteuse de sens tient dans bien moins de dimensions.",
      objectives: [
        'Comparer des méthodes classiques de réduction de dimension (ACP, t-SNE) à des représentations apprises par des réseaux de neurones (AE et VAE).',
        'Mesurer concrètement ce que chaque représentation apporte à une tâche de classification supervisée.',
        'Au-delà du sujet : corriger le code fourni, ajouter une recherche d’hyperparamètres et construire un protocole de comparaison équitable.',
      ],
      data: [
        'Un fichier CSV de 10 000 images MNIST pour l’exploration et les modèles de machine learning classiques.',
        'La version intégrée à Keras (54 000 images d’entraînement, 6 000 de validation, 10 000 de test) pour entraîner les auto-encodeurs.',
        'Contrôles avant modélisation : dimensions, plage des pixels, valeurs manquantes, doublons, équilibre des classes. 116 pixels sur 784, en bord d’image, sont noirs sur toutes les images.',
        'Normalisation des intensités entre 0 et 1, cohérente avec la perte de reconstruction utilisée ensuite.',
      ],
      approach: [
        {
          title: '1. Réduction de dimension classique',
          points: [
            'ACP sur un sous-ensemble de trois chiffres : 34, 70 et 123 composantes suffisent pour conserver 80 %, 90 % et 95 % de la variance.',
            'Projections 2D et 3D : l’ACP, linéaire, sépare partiellement les chiffres mais laisse d’importants recouvrements.',
            't-SNE réglé sur une grille de 9 configurations (perplexité 5 / 30 / 50 × taux d’apprentissage auto / 200 / 500) : structure stable à partir d’une perplexité de 30, pas de gain réel en 3D.',
          ],
        },
        {
          title: '2. Classification de référence',
          points: [
            'Découpage stratifié et figé (8 000 images d’entraînement, 2 000 de test), réutilisé à l’identique pour toutes les méthodes.',
            'Trois familles de modèles : Naive Bayes gaussien, SVM à noyau RBF et Random Forest, sur pixels bruts puis sur composantes ACP.',
            'ACP intégrée dans un pipeline scikit-learn, apprise uniquement sur l’entraînement.',
            'Évaluation par accuracy, precision, recall et F1 par classe, matrices de confusion et temps d’entraînement.',
          ],
        },
        {
          title: '3. Auto-encodeur convolutif (AE)',
          points: [
            'Encodeur Conv2D (pas de 2), couche dense formant l’espace latent, décodeur symétrique en Conv2DTranspose avec sortie sigmoïde.',
            'Perte : entropie croisée binaire sommée sur les 784 pixels.',
            'Recherche aléatoire (ParameterSampler) : 12 essais dans un espace de 240 combinaisons, EarlyStopping, sélection sur le jeu de validation.',
            'Deux versions pour mesurer l’effet du volume : un grand modèle (54 000 images) et un petit (7 200). Configuration gagnante identique : 1 bloc de 32 filtres, noyau 3 × 3, latent de dimension 32, taux 0,005, batch 256 — 417 569 paramètres.',
          ],
        },
        {
          title: '4. Auto-encodeur variationnel (VAE)',
          points: [
            'Chaque image est associée à une zone de l’espace latent (moyenne et variance) ; la divergence KL pousse ces zones vers une loi normale, ce qui rend l’espace continu et génératif.',
            'Correction de l’implémentation fournie : reparamétrisation z = μ + σ·ε avec σ = exp(0,5 × log-variance), et perte KL ajoutée dans une couche personnalisée compatible Keras 3.',
            'Génération de chiffres plausibles par échantillonnage, et parcours de l’espace latent (quantiles de la loi normale) montrant des transitions progressives d’un chiffre à l’autre.',
          ],
        },
        {
          title: '5. Classification sur les représentations apprises',
          points: [
            'Extraction des codes latents (la moyenne μ pour le VAE) des 10 000 images du CSV, puis mêmes classifieurs, même découpage.',
            'Références équitables : une ACP de même dimension (32), apprise sur les mêmes images que les auto-encodeurs, et les 784 pixels bruts.',
            'Synthèse sous forme de cartes de chaleur croisant classifieurs et représentations.',
          ],
        },
      ],
      results: [
        'Le SVM atteint 0,982 d’accuracy sur les codes du VAE et 0,979 sur ceux de l’AE, contre 0,967 avec l’ACP à 32 composantes et 0,962 sur les pixels bruts : mieux que les pixels avec 24 fois moins de variables.',
        'Le temps d’entraînement du SVM passe sous la seconde sur les codes latents, contre 5,42 s sur les pixels bruts.',
        'Reconstruction (AE) : perte de 56,47 sur le jeu de test pour le grand modèle ; sur les 2 000 images d’évaluation communes, 56,34 pour le grand modèle contre 62,76 pour le petit, qui surapprend légèrement.',
        'VAE : perte de reconstruction de 64,85 et divergence KL de 26,14 sur le test — reconstruction un peu moins fine que l’AE, prix attendu de la régularisation. Grand modèle 64,80 contre 71,48 pour le petit.',
        'Les auto-encodeurs entraînés sur le grand jeu dominent systématiquement leurs équivalents « petit jeu », alors que l’ACP est peu sensible au volume de données.',
        'Les erreurs de classification se concentrent sur des chiffres visuellement proches : 4 et 9, ainsi que 3, 5 et 8.',
      ],
      keyFigures: [
        { value: '784 → 32', label: 'variables par image' },
        { value: '0,982', label: 'accuracy SVM sur codes VAE' },
        { value: '< 1 s', label: 'entraînement SVM (vs 5,42 s)' },
        { value: '417 569', label: 'paramètres de l’AE retenu' },
      ],
      challenges: [
        {
          problem: 'Le code fourni était incompatible avec Keras 3 et l’implémentation du VAE comportait des erreurs.',
          solution: 'Migration vers Keras 3 (pertes personnalisées, couches sérialisables, sauvegarde au format .keras) et correction de la reparamétrisation et de la perte KL.',
        },
        {
          problem: 'Le t-SNE ne sait pas projeter de nouvelles données : l’utiliser avant un classifieur créerait une fuite du test vers l’entraînement.',
          solution: 'Le t-SNE a été cantonné à la visualisation ; seules des méthodes capables de transformer de nouvelles données alimentent les classifieurs.',
        },
        {
          problem: 'Comparer des méthodes évaluées sur des données ou des dimensions différentes aurait faussé les conclusions.',
          solution: 'Découpage figé commun, ACP de même dimension que les espaces latents, apprise sur les mêmes images, graines fixées et sélection sur validation uniquement.',
        },
      ],
      learnings: [
        'Une représentation apprise par un réseau de neurones gagne nettement à être nourrie de nombreux exemples, contrairement à l’ACP.',
        'Un protocole équitable (mêmes données, même dimension, pas de fuite) compte autant que le choix du modèle pour tirer des conclusions fiables.',
        'Des visualisations lisibles, y compris pour les personnes daltoniennes, et une interprétation écrite après chaque étape rendent l’analyse transmissible.',
      ],
      limits: [
        'Un seul découpage entraînement / test : une validation croisée confirmerait la robustesse des écarts.',
        'Le paramétrage hérité du Random Forest limite le nombre de variables testées à chaque division ; une reprise avec max_features="sqrt" et un score out-of-bag est prévue.',
        'La dimension latente retenue (32) est en bordure de l’espace de recherche, qu’il faudrait élargir.',
        'En cours : tête de classification neuronale sur le goulot d’étranglement, fine-tuning de l’encodeur et comparaison avec un CNN entraîné de zéro.',
        'Extensions : auto-encodeur débruitant, images plus complexes que MNIST.',
      ],
      skills:
        "Prétraitement et contrôle qualité de données d'images, réduction de dimension linéaire et non linéaire, réseaux convolutifs et modèles génératifs (AE, VAE) avec TensorFlow / Keras, optimisation d'hyperparamètres, classification et évaluation multi-métriques, protocoles expérimentaux équitables, débogage de code de deep learning, visualisation et restitution écrite.",
    },
    en: {
      title: 'Autoencoders & dimensionality reduction (MNIST)',
      shortTitle: 'MNIST autoencoders',
      summary:
        'Comparing PCA, t-SNE, a convolutional autoencoder and a variational autoencoder, then measuring what each representation brings to handwritten digit classification.',
      category: 'Deep learning',
      context: 'Deep learning workshop (TensorFlow) · CESI',
      cardResult: 'SVM: 0.982 accuracy on 32 learned features vs 0.962 on all 784 pixels',
      problem:
        'How can very high-dimensional data be represented more compactly without losing useful information? A 28 × 28 MNIST image has 784 features, many of them redundant: the meaningful information lives in far fewer dimensions.',
      objectives: [
        'Compare classical dimensionality reduction (PCA, t-SNE) with representations learned by neural networks (AE and VAE).',
        'Measure concretely what each representation contributes to a supervised classification task.',
        'Beyond the brief: fix the provided code, add a hyperparameter search and build a fair comparison protocol.',
      ],
      data: [
        'A CSV file of 10,000 MNIST images for exploration and classical machine learning models.',
        'The Keras built-in version (54,000 training, 6,000 validation and 10,000 test images) to train the autoencoders.',
        'Pre-modelling checks: shapes, pixel range, missing values, duplicates, class balance. 116 of the 784 pixels, along the image borders, are black in every image.',
        'Pixel intensities scaled to [0, 1], consistent with the reconstruction loss used later.',
      ],
      approach: [
        {
          title: '1. Classical dimensionality reduction',
          points: [
            'PCA on a three-digit subset: 34, 70 and 123 components retain 80%, 90% and 95% of the variance.',
            '2D and 3D projections: PCA, being linear, only partly separates the digits and leaves large overlaps.',
            't-SNE tuned over a grid of 9 configurations (perplexity 5 / 30 / 50 × learning rate auto / 200 / 500): clusters stabilise from perplexity 30, and 3D brings no real gain.',
          ],
        },
        {
          title: '2. Baseline classification',
          points: [
            'Fixed stratified split (8,000 training, 2,000 test images), reused identically for every method.',
            'Three model families: Gaussian Naive Bayes, RBF-kernel SVM and random forest, on raw pixels and on PCA components.',
            'PCA embedded in a scikit-learn pipeline so it is fitted on training data only.',
            'Evaluation with accuracy, per-class precision, recall and F1, confusion matrices and training times.',
          ],
        },
        {
          title: '3. Convolutional autoencoder (AE)',
          points: [
            'Conv2D encoder (stride 2), a dense latent layer, and a symmetric Conv2DTranspose decoder with a sigmoid output.',
            'Loss: binary cross-entropy summed over the 784 pixels.',
            'Random search (ParameterSampler): 12 trials drawn from 240 combinations, with early stopping and selection on the validation set.',
            'Two versions to measure the effect of data volume: a large model (54,000 images) and a small one (7,200). The same configuration won both times: 1 block of 32 filters, 3 × 3 kernel, 32-d latent space, learning rate 0.005, batch size 256 — 417,569 parameters.',
          ],
        },
        {
          title: '4. Variational autoencoder (VAE)',
          points: [
            'Each image maps to a region of latent space (mean and variance); a KL-divergence term pulls these regions towards a normal distribution, making the space continuous and generative.',
            'Fixed the provided implementation: reparameterisation z = μ + σ·ε with σ = exp(0.5 × log-variance), and KL loss added inside a custom Keras 3-compatible layer.',
            'Random sampling produces plausible digits, and walking the latent space (along normal quantiles) shows smooth transitions between digits.',
          ],
        },
        {
          title: '5. Classification on learned representations',
          points: [
            'Latent codes (the mean μ for the VAE) extracted for the 10,000 CSV images, then the same classifiers on the same split.',
            'Fair baselines: a PCA with the same dimension (32), fitted on the same images as the autoencoders, and the 784 raw pixels.',
            'Results summarised as heatmaps crossing classifiers and representations.',
          ],
        },
      ],
      results: [
        'The SVM reaches 0.982 accuracy on VAE codes and 0.979 on AE codes, versus 0.967 with 32-component PCA and 0.962 on raw pixels: better than pixels with 24 times fewer features.',
        'SVM training time drops below one second on latent codes, versus 5.42 s on raw pixels.',
        'Reconstruction (AE): test loss of 56.47 for the large model; on the 2,000 shared evaluation images, 56.34 for the large model versus 62.76 for the small one, which slightly overfits.',
        'VAE: reconstruction loss of 64.85 and KL divergence of 26.14 on the test set — slightly blurrier than the AE, the expected cost of regularisation. Large model 64.80 versus 71.48 for the small one.',
        'Autoencoders trained on the large set consistently beat their small-set counterparts, whereas PCA is barely affected by data volume.',
        'Misclassifications cluster on visually similar digits: 4 and 9, and 3, 5 and 8.',
      ],
      keyFigures: [
        { value: '784 → 32', label: 'features per image' },
        { value: '0.982', label: 'SVM accuracy on VAE codes' },
        { value: '< 1 s', label: 'SVM training (vs 5.42 s)' },
        { value: '417,569', label: 'parameters in the chosen AE' },
      ],
      challenges: [
        {
          problem: 'The provided code was incompatible with Keras 3 and the VAE implementation contained errors.',
          solution: 'Migrated to Keras 3 (custom losses, serialisable layers, .keras model saving) and fixed the reparameterisation and KL loss.',
        },
        {
          problem: 't-SNE cannot project new data: using it before a classifier would leak test information into training.',
          solution: 'Kept t-SNE for visualisation only; only methods that can transform unseen data feed the classifiers.',
        },
        {
          problem: 'Comparing methods evaluated on different data or dimensions would have skewed the conclusions.',
          solution: 'A shared fixed split, a PCA with the same dimension as the latent spaces fitted on the same images, fixed seeds and model selection on validation data only.',
        },
      ],
      learnings: [
        'A representation learned by a neural network benefits greatly from more training examples, unlike PCA.',
        'A fair protocol (same data, same dimension, no leakage) matters as much as model choice for drawing reliable conclusions.',
        'Readable, colour-blind-friendly charts and a written interpretation after each step make the analysis easy to hand over.',
      ],
      limits: [
        'A single train/test split: cross-validation would confirm the gaps are robust.',
        'The inherited random forest settings limit the features tried at each split; a rerun with max_features="sqrt" and an out-of-bag score is planned.',
        'The chosen latent size (32) sits at the edge of the search space, which should be widened.',
        'In progress: a neural classification head on the bottleneck, fine-tuning the full encoder, and a comparison with a CNN trained from scratch.',
        'Extensions: a denoising autoencoder and images more complex than MNIST.',
      ],
      skills:
        'Image data preprocessing and quality checks, linear and non-linear dimensionality reduction, convolutional and generative models (AE, VAE) with TensorFlow / Keras, hyperparameter optimisation, classification and multi-metric evaluation, fair experimental design, debugging deep learning code, visualisation and written reporting.',
    },
  },
};
