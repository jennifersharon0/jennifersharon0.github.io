import type { Project } from '../types';

/** Source : Recapitulatif_Projets_Annee.docx §7 et CV. */
export const leyendaComputerVision: Project = {
  slug: 'leyenda-computer-vision',
  year: '2026',
  kind: 'academic',
  teamSize: 4,
  featured: true,
  stack: ['TensorFlow / Keras', 'Keras Tuner', 'Optuna', 'CNN', 'UNet', 'EfficientNetB0', 'GRU + attention', 'tf.data', 'scikit-learn', 'OpenCV', 'Pillow', 'NLTK', 'Gradio'],
  links: [],
  content: {
    fr: {
      title: 'Leyenda — pipeline de computer vision : tri, restauration et légendage d’images',
      shortTitle: 'Computer vision Leyenda',
      summary:
        "Trois modèles enchaînés en un pipeline réutilisable : un CNN qui trie 41 000 images numérisées à 92,8 %, un UNet qui gagne 6,3 dB de PSNR sans image de référence, et un modèle de légendage avec attention entraîné sur les 123 000 images de MS COCO.",
      category: 'Deep Learning · Computer vision · NLP',
      context: 'Projet académique · CESI · équipe de 4 · fin septembre – octobre 2026 · client fictif TouNum',
      cardResult: 'CNN 92,8 % (5 classes) · UNet +6,3 dB de PSNR · BLEU-4 de 0,271',
      highlights: [
        'Tri de 41 000 images en 5 classes par un CNN entraîné de zéro, avec un seuil de confiance qui automatise 84 % des cas.',
        'Restauration d’images sans version propre de référence : dégradation synthétique réaliste, UNet optimisé avec Optuna.',
        'Légendage automatique (EfficientNetB0, attention de Bahdanau, GRU) sur MS COCO, intégré dans un pipeline réutilisable.',
      ],
      problem:
        "TouNum, entreprise de numérisation de documents, reçoit des archives de toutes natures. Elle veut ne garder que les photographies, les nettoyer, puis leur associer automatiquement une légende pour les rendre faciles à rechercher. Chaque livrable construit un maillon de cette chaîne : tri (Livrable 1), restauration (Livrable 2), légendage (Livrable 3), ce dernier réutilisant les deux premiers modèles.",
      objectives: [
        'Classer automatiquement des images numérisées hétérogènes et isoler les photographies.',
        'Restaurer des photos dégradées (bruit, flou, compression) alors qu’aucune version propre n’existe.',
        'Générer une légende en anglais pour chaque photo et livrer une chaîne complète, réutilisable sans le notebook.',
        'Respecter une contrainte forte pour les Livrables 1 et 2 : aucun modèle préentraîné ni transfert d’apprentissage, chaque réseau étant construit couche par couche.',
      ],
      data: [
        'Livrable 1 : 41 399 images en cinq classes très déséquilibrées (Photo, Painting, Schematics, Sketch, Text), aux formats, modes couleur et tailles très hétérogènes (de 1 pixel à plus de 10 000 pixels de côté), avec doublons et images mal rangées.',
        'Livrable 2 : seulement 148 photos, déjà dégradées, sans version propre de référence ; bruit faible pour la plupart mais fort sur quelques-unes, et pas parfaitement gaussien.',
        'Livrable 3 : toutes les images légendées de MS COCO 2014, soit 123 287 images et 616 767 légendes, redécoupées par image en 80 / 10 / 10 (93 202, 11 650 et 11 651 images).',
      ],
      approach: [
        {
          title: '1. Livrable 1 — classification d’images numérisées',
          points: [
            'Analyse exploratoire fichier par fichier (vrai format, mode couleur, dimensions, empreinte MD5, contraste des bords) : 25 fichiers dont l’extension ne correspondait pas au format réel, qui auraient interrompu l’entraînement.',
            'Prétraitement conçu contre les raccourcis : mise au carré par marges blanches plutôt que par étirement, pour que la forme de l’image ne trahisse pas sa classe, et rognage automatique des bandes de scan.',
            'Détection de 3 371 paires de quasi-doublons et retrait de 501 copies pour éviter toute fuite entre entraînement et test : 39 716 images saines, découpage stratifié 70 / 15 / 15.',
            'Classification binaire photo / non-photo : CNN optimisé par Keras Tuner, 93,1 % d’accuracy, F1 de 0,933 et AUC de 0,983 avec seulement 28 257 paramètres ; avantage sur un autoencodeur supervisé confirmé par un test de McNemar (p ≈ 0,02).',
            'Classification en cinq catégories : quatre modèles comparés à conditions identiques (CNN de référence, CNN optimisé par recherche aléatoire sur 8 hyperparamètres, classifieur sur encodeur figé, autoencodeur supervisé).',
            'Règle de décision par seuil de confiance, repérage d’images probablement mal étiquetées, estimation de l’empreinte carbone et démonstrateur Gradio.',
          ],
        },
        {
          title: '2. Livrable 2 — restauration par autoencodeurs convolutifs',
          points: [
            'Mesure des défauts jusqu’au pixel (canaux RGB et YCbCr, analyse de Fourier) ; estimation du bruit par deux méthodes indépendantes (ondelettes de Donoho et méthode d’Immerkaer, corrélation de Spearman de 0,81) et de la netteté par variance du Laplacien.',
            'Les 111 images les plus propres servent de références ; les 37 plus bruitées forment une étude de cas jamais vue à l’entraînement.',
            'Création de paires d’entraînement par dégradation synthétique réaliste (flou gaussien ou de bougé, bruit d’intensité aléatoire, compression JPEG), patchs 128 × 128, augmentation de données et pipeline tf.data généré à la volée.',
            'Sept réseaux comparés à une référence par filtres classiques (gaussien, médian, bilatéral, NL-Means) : autoencodeur convolutif, UNet résiduel, UNet léger, chaîne débruiteur puis défloueur.',
            'Trois recherches d’hyperparamètres avec Optuna (TPE, élagage, confirmation sur un budget plus long, importance par fANOVA), learning rate en cosinus avec chauffe, pertes MSE, MAE et L1 + SSIM ; choix final sur la validation par une règle de parcimonie.',
          ],
        },
        {
          title: '3. Livrable 3 — légendage automatique sur MS COCO 2014',
          points: [
            'Pipeline de bout en bout : vérification de chaque fichier avec Pillow, tri par le CNN du Livrable 1 (116 503 photos gardées, 6 784 écartées), puis débruitage par l’autoencodeur du Livrable 2 (UNet résiduel « aveugle », environ 29 dB à σ = 0,1, qui modifie très peu les images déjà propres).',
            'Prétraitement du texte : minuscules, suppression de la ponctuation, des chiffres, des légendes trop courtes et des doublons (582 531 légendes gardées) ; vocabulaire de 9 127 mots construit sur l’entraînement uniquement ; longueur maximale de 21 mots couvrant 99 % des légendes.',
            'Extraction de caractéristiques par EfficientNetB0 préentraîné sur ImageNet et figé (49 zones de 1 280 caractéristiques), choisi face à InceptionV3 : même BLEU-4 avec 4 fois moins de paramètres et des caractéristiques 2 fois moins lourdes ; stockage en float16 (14,6 Go) avec un calcul reprenable.',
            'Architecture encodeur-décodeur : encodeur CNN (Dense 256), attention de Bahdanau qui choisit à chaque mot les zones de l’image à regarder, décodeur GRU (512 unités) préféré au LSTM pour ses 25 % de paramètres en moins à performance égale — environ 9,6 millions de paramètres.',
            'Entraînement par teacher forcing, perte d’entropie croisée masquée sur le padding, Adam avec gradient clipping, dropout, early stopping avec retour aux meilleurs poids et sauvegarde à chaque epoch (466 025 paires image-légende).',
            'Beam search (k = 3) implémenté, et visualisation des cartes d’attention mot par mot pour vérifier où le modèle regarde.',
          ],
        },
        {
          title: '4. Industrialisation',
          points: [
            'Chaîne complète Livrable 1 → 2 → 3 sauvegardée et réutilisable sans le notebook : classe PipelineCaptioning, fichier pipeline_captioning.py généré automatiquement à partir des cellules du notebook (une seule version du code), configuration et poids.',
            'Rechargement des modèles Keras 3 sous TensorFlow 2.10 par reconstruction de l’architecture, avec un écart inférieur à 10⁻⁶.',
            'Tests de robustesse : photo bruitée, schéma, page de texte, fichier texte renommé en .jpg, image tronquée et images test2014 jamais vues.',
          ],
        },
      ],
      results: [
        'Classification en cinq catégories : CNN optimisé retenu, 92,8 % d’accuracy sur le test (intervalle de confiance à 95 % de 91,2 à 94,3 % par bootstrap), 90,5 % sur des images jamais vues, pour un modèle de 1,6 Mo.',
        'Avec un seuil de confiance à 80 %, 84 % des images sont classées automatiquement avec environ 98 % de réussite ; le reste part en vérification humaine.',
        'Restauration : UNet optimisé, +6,3 dB de PSNR moyen sur l’image dégradée et +3 dB sur le meilleur filtre classique, avec 4 fois moins de paramètres que sa version de base et le temps d’inférence le plus court des meilleurs modèles ; +10 à 12 dB en débruitage.',
        'Légendage : BLEU-1 de 0,689 et BLEU-4 de 0,255 en génération gloutonne sur le test ; BLEU-4 de 0,271 avec le beam search, soit +1,6 point.',
        'Plus de 80 % des émissions carbone estimées du Livrable 1 proviennent de la recherche d’hyperparamètres.',
      ],
      keyFigures: [
        { value: '92,8 %', label: 'accuracy en 5 classes (IC 95 % : 91,2–94,3)' },
        { value: '84 %', label: 'des images classées automatiquement à ~98 % de réussite' },
        { value: '+6,3 dB', label: 'de PSNR avec un UNet 4 fois plus léger' },
        { value: '0,271', label: 'BLEU-4 en beam search sur MS COCO' },
      ],
      contribution: [
        'Livrable 1 : préparation des données de la classe Sketch dans le prétraitement commun, puis conception et réalisation complète de la classification en cinq catégories — quatre modèles, recherche d’hyperparamètres, évaluation, analyse des erreurs et règle de décision par seuil de confiance.',
        'Livrable 2 : conception de l’approche A (CAE et UNet, versions de base et optimisées avec Optuna), construction du notebook final fusionné avec l’approche d’une autre membre du groupe, prétraitement commun, comparaison de tous les modèles et interprétation des résultats appuyée sur la littérature.',
        'Livrable 3 : réalisé collectivement par les quatre membres du groupe — conception du pipeline, prétraitement des images et du texte, modèle de légendage avec attention, entraînement, évaluation et industrialisation.',
      ],
      challenges: [
        {
          problem: 'Un modèle peut réussir pour de mauvaises raisons : la forme de l’image ou les bandes de scan suffisaient à trahir certaines classes.',
          solution: 'Mise au carré par marges blanches plutôt que par étirement, rognage automatique des bandes de scan, choix appuyé sur la littérature.',
        },
        {
          problem: 'Des quasi-doublons répartis entre entraînement et test auraient gonflé artificiellement les scores.',
          solution: 'Détection de 3 371 paires de quasi-doublons par empreinte et retrait de 501 copies avant le découpage.',
        },
        {
          problem: 'Pour la restauration, aucune image propre de référence et seulement 148 photos déjà dégradées.',
          solution: 'Estimation du bruit par deux méthodes indépendantes, sélection des 111 images les plus propres comme références et fabrication de paires par dégradation synthétique réaliste.',
        },
        {
          problem: 'Les caractéristiques de tout COCO représentaient un volume considérable et un calcul long, exposé aux interruptions.',
          solution: 'EfficientNetB0 plutôt qu’InceptionV3 (caractéristiques 2 fois moins lourdes), stockage en float16 et calcul reprenable.',
        },
        {
          problem: 'Les modèles entraînés sous Keras 3 devaient être rechargés sous TensorFlow 2.10 (GPU sous Windows).',
          solution: 'Reconstruction de l’architecture puis chargement des poids, avec un écart vérifié inférieur à 10⁻⁶.',
        },
      ],
      learnings: [
        'La qualité des données compte plus que la complexité du modèle : les erreurs restantes viennent surtout d’images ambiguës ou mal rangées.',
        'Un modèle peut obtenir un bon score pour de mauvaises raisons (forme de l’image, bandes de scan) : il faut traquer ces raccourcis avant l’entraînement.',
        'Plus gros n’est pas forcément meilleur : un CNN de 28 000 paramètres bat un autoencodeur quatre fois plus grand, et Optuna a rendu le UNet 4 fois plus léger tout en l’améliorant.',
      ],
      limits: [
        'Le CNN d’extraction est figé : un fine-tuning de ses dernières couches pourrait améliorer les caractéristiques.',
        'Remplacer le GRU par un Transformer, ou utiliser un encodeur plus récent (ViT, CLIP), et compléter l’évaluation par CIDEr ou METEOR.',
        'Le classifieur du Livrable 1 se trompe sur environ 7 % des images ; les erreurs les plus coûteuses sont les photos rejetées à tort, qui ne seront jamais légendées.',
        'Le débruiteur ne traite ni le bruit impulsionnel (sel et poivre) ni le flou fort, et le défloutage reste limité (+1 à 3 dB) : les détails effacés ne peuvent pas être recréés exactement.',
      ],
      skills:
        'Computer vision et deep learning (CNN, autoencodeurs, UNet, attention, RNN/GRU), NLP (nettoyage de texte, tokenisation, génération de séquences, beam search), transfer learning (EfficientNetB0), classification d’images sur données déséquilibrées, restauration d’images, image captioning, optimisation d’hyperparamètres (Keras Tuner, Optuna), évaluation statistique (bootstrap, test de McNemar, PSNR, SSIM, BLEU), prévention des fuites de données, traitement de gros volumes (tf.data, memmap, calculs reprenables), industrialisation d’un pipeline ML, travail en équipe et fusion de travaux.',
    },
    en: {
      title: 'Leyenda — a computer vision pipeline: sorting, restoring and captioning images',
      shortTitle: 'Leyenda computer vision',
      summary:
        'Three models chained into a reusable pipeline: a CNN that sorts 41,000 scanned images at 92.8% accuracy, a UNet that gains 6.3 dB of PSNR with no clean reference images, and an attention-based captioning model trained on the 123,000 images of MS COCO.',
      category: 'Deep learning · Computer vision · NLP',
      context: 'Academic project · CESI · team of 4 · late September – October 2026 · fictional client TouNum',
      cardResult: 'CNN 92.8% (5 classes) · UNet +6.3 dB PSNR · BLEU-4 of 0.271',
      highlights: [
        'Sorting 41,000 images into 5 classes with a CNN trained from scratch, with a confidence threshold that automates 84% of cases.',
        'Restoring images with no clean reference: realistic synthetic degradation and a UNet tuned with Optuna.',
        'Automatic captioning (EfficientNetB0, Bahdanau attention, GRU) on MS COCO, wired into a reusable pipeline.',
      ],
      problem:
        'TouNum, a document digitisation company, receives archives of every kind. It wants to keep only the photographs, clean them up, then caption them automatically so they are easy to search. Each deliverable builds one link of that chain: sorting (Deliverable 1), restoration (Deliverable 2) and captioning (Deliverable 3), which reuses the first two models.',
      objectives: [
        'Automatically classify heterogeneous scanned images and isolate the photographs.',
        'Restore degraded photos (noise, blur, compression) when no clean version exists.',
        'Generate an English caption for each photo and deliver a complete pipeline that runs without the notebook.',
        'Meet a strict constraint for Deliverables 1 and 2: no pretrained models or transfer learning — every network built layer by layer.',
      ],
      data: [
        'Deliverable 1: 41,399 images in five highly imbalanced classes (Photo, Painting, Schematics, Sketch, Text), with very mixed formats, colour modes and sizes (from 1 pixel to over 10,000 pixels per side), plus duplicates and misfiled images.',
        'Deliverable 2: only 148 photos, already degraded, with no clean reference; mostly light noise but heavy on a few, and not perfectly Gaussian.',
        'Deliverable 3: every captioned image in MS COCO 2014 — 123,287 images and 616,767 captions — re-split by image into 80/10/10 (93,202, 11,650 and 11,651 images).',
      ],
      approach: [
        {
          title: '1. Deliverable 1 — classifying scanned images',
          points: [
            'File-by-file exploratory analysis (true format, colour mode, dimensions, MD5 hash, edge contrast): 25 files whose extension did not match their real format and would have crashed training.',
            'Preprocessing designed against shortcuts: squaring images with white padding instead of stretching, so that image shape cannot give away the class, and automatic cropping of scanner borders.',
            'Detected 3,371 near-duplicate pairs and removed 501 copies to prevent leakage between training and test: 39,716 clean images, stratified 70/15/15 split.',
            'Binary photo vs non-photo classification: a CNN tuned with Keras Tuner reached 93.1% accuracy, an F1 of 0.933 and an AUC of 0.983 with only 28,257 parameters; its edge over a supervised autoencoder was confirmed with a McNemar test (p ≈ 0.02).',
            'Five-class classification: four models compared under identical conditions (baseline CNN, CNN tuned by random search over 8 hyperparameters, classifier on a frozen encoder, supervised autoencoder).',
            'Confidence-threshold decision rule, flagging of likely mislabelled images, carbon footprint estimate and a Gradio demo.',
          ],
        },
        {
          title: '2. Deliverable 2 — restoration with convolutional autoencoders',
          points: [
            'Measured defects down to the pixel (RGB and YCbCr channels, Fourier analysis); estimated noise with two independent methods (Donoho wavelets and Immerkaer’s method, Spearman correlation of 0.81) and sharpness via Laplacian variance.',
            'The 111 cleanest images serve as references; the 37 noisiest form a case study never seen in training.',
            'Built training pairs through realistic synthetic degradation (Gaussian or motion blur, random-strength noise, JPEG compression), 128 × 128 patches, data augmentation and an on-the-fly tf.data pipeline.',
            'Seven networks compared with a classical-filter baseline (Gaussian, median, bilateral, NL-Means): convolutional autoencoder, residual UNet, lightweight UNet, and a denoiser-then-deblurrer chain.',
            'Three Optuna hyperparameter searches (TPE, pruning, confirmation on a longer budget, fANOVA importance), cosine learning rate with warm-up, MSE, MAE and L1 + SSIM losses; final pick on validation data using a parsimony rule.',
          ],
        },
        {
          title: '3. Deliverable 3 — automatic captioning on MS COCO 2014',
          points: [
            'End-to-end pipeline: every file checked with Pillow, sorted by the Deliverable 1 CNN (116,503 photos kept, 6,784 rejected), then denoised by the Deliverable 2 model (a “blind” residual UNet, about 29 dB at σ = 0.1, which barely alters images that are already clean).',
            'Text preprocessing: lower-casing, removing punctuation, digits, overly short captions and duplicates (582,531 captions kept); a 9,127-word vocabulary built on training data only; a 21-word maximum length covering 99% of captions.',
            'Feature extraction with a frozen ImageNet-pretrained EfficientNetB0 (49 regions × 1,280 features), chosen over InceptionV3: same BLEU-4 with 4× fewer parameters and features half the size; stored as float16 (14.6 GB) with resumable computation.',
            'Encoder-decoder architecture: CNN encoder (Dense 256), Bahdanau attention choosing which image regions to look at for each word, and a GRU decoder (512 units) preferred to an LSTM for 25% fewer parameters at equal performance — about 9.6 million parameters.',
            'Training with teacher forcing, cross-entropy masked on padding, Adam with gradient clipping, dropout, early stopping restoring the best weights and a checkpoint every epoch (466,025 image-caption pairs).',
            'Implemented beam search (k = 3) and visualised word-by-word attention maps to check where the model looks.',
          ],
        },
        {
          title: '4. Industrialisation',
          points: [
            'The full Deliverable 1 → 2 → 3 chain is saved and reusable without the notebook: a PipelineCaptioning class, a pipeline_captioning.py file generated automatically from the notebook cells (a single source of truth), configuration and weights.',
            'Keras 3 models reloaded under TensorFlow 2.10 by rebuilding the architecture, with a difference below 10⁻⁶.',
            'Robustness tests: noisy photo, diagram, text page, a text file renamed to .jpg, a truncated image and unseen test2014 images.',
          ],
        },
      ],
      results: [
        'Five-class classification: the tuned CNN reached 92.8% test accuracy (95% bootstrap confidence interval 91.2–94.3%) and 90.5% on never-seen images, in a 1.6 MB model.',
        'With an 80% confidence threshold, 84% of images are classified automatically with about 98% accuracy; the rest go to human review.',
        'Restoration: the tuned UNet adds 6.3 dB of average PSNR over the degraded image and 3 dB over the best classical filter, with 4× fewer parameters than its base version and the fastest inference among the top models; +10 to 12 dB for denoising.',
        'Captioning: BLEU-1 of 0.689 and BLEU-4 of 0.255 with greedy decoding on the test set; BLEU-4 of 0.271 with beam search, a 1.6-point gain.',
        'Over 80% of Deliverable 1’s estimated carbon emissions came from the hyperparameter search.',
      ],
      keyFigures: [
        { value: '92.8%', label: '5-class accuracy (95% CI: 91.2–94.3)' },
        { value: '84%', label: 'of images classified automatically at ~98% accuracy' },
        { value: '+6.3 dB', label: 'PSNR gain with a UNet 4× lighter' },
        { value: '0.271', label: 'BLEU-4 with beam search on MS COCO' },
      ],
      contribution: [
        'Deliverable 1: prepared the Sketch-class data within the shared preprocessing, then designed and delivered the entire five-class classification — four models, hyperparameter search, evaluation, error analysis and the confidence-threshold decision rule.',
        'Deliverable 2: designed approach A (CAE and UNet, base and Optuna-tuned versions), built the final notebook merging it with another team member’s approach, shared preprocessing, comparison of all models and a literature-backed interpretation of the results.',
        'Deliverable 3: built collectively by all four team members — pipeline design, image and text preprocessing, the attention-based captioning model, training, evaluation and industrialisation.',
      ],
      challenges: [
        {
          problem: 'A model can score well for the wrong reasons: image shape or scanner borders were enough to give away some classes.',
          solution: 'Squared images with white padding instead of stretching and automatically cropped scanner borders, following the literature.',
        },
        {
          problem: 'Near-duplicates split across training and test would have inflated scores.',
          solution: 'Detected 3,371 near-duplicate pairs by hashing and removed 501 copies before splitting.',
        },
        {
          problem: 'For restoration, there were no clean reference images and only 148 already-degraded photos.',
          solution: 'Estimated noise with two independent methods, kept the 111 cleanest images as references and created training pairs through realistic synthetic degradation.',
        },
        {
          problem: 'Features for all of COCO meant a huge volume and a long computation, vulnerable to interruptions.',
          solution: 'EfficientNetB0 rather than InceptionV3 (features half the size), float16 storage and resumable computation.',
        },
        {
          problem: 'Models trained under Keras 3 had to be reloaded under TensorFlow 2.10 (GPU on Windows).',
          solution: 'Rebuilt the architecture and loaded the weights, with a verified difference below 10⁻⁶.',
        },
      ],
      learnings: [
        'Data quality matters more than model complexity: most remaining errors come from ambiguous or misfiled images.',
        'A model can score well for the wrong reasons (image shape, scanner borders): those shortcuts have to be hunted down before training.',
        'Bigger is not always better: a 28,000-parameter CNN beats an autoencoder four times its size, and Optuna made the UNet 4× lighter while improving it.',
      ],
      limits: [
        'The feature-extraction CNN is frozen: fine-tuning its last layers could improve the features.',
        'Swap the GRU for a Transformer or use a newer encoder (ViT, CLIP), and add metrics such as CIDEr or METEOR.',
        'The Deliverable 1 classifier is wrong on about 7% of images; the costliest errors are photos wrongly rejected, which will never be captioned.',
        'The denoiser handles neither impulse noise (salt and pepper) nor heavy blur, and deblurring stays limited (+1 to 3 dB): erased details cannot be recreated exactly.',
      ],
      skills:
        'Computer vision and deep learning (CNNs, autoencoders, UNet, attention, RNN/GRU), NLP (text cleaning, tokenisation, sequence generation, beam search), transfer learning (EfficientNetB0), image classification on imbalanced data, image restoration, image captioning, hyperparameter tuning (Keras Tuner, Optuna), statistical evaluation (bootstrap, McNemar test, PSNR, SSIM, BLEU), data leakage prevention, large-scale processing (tf.data, memmap, resumable jobs), ML pipeline industrialisation, teamwork and merging work.',
    },
  },
};
