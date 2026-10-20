import type { Project } from '../types';

/**
 * Source : Recapitulatif_Projets_Annee.docx §2.
 * Le document précise que ce projet a été reconstitué à partir de l'énoncé de la mission
 * (aucun livrable final fourni) : le contenu décrit donc le périmètre de travail.
 */
export const greenresoInfrastructure: Project = {
  slug: 'greenreso-infrastructure',
  kind: 'academic',
  featured: false,
  stack: ['Active Directory', 'GPO', 'PowerShell', 'NTFS', 'DNS', 'Virtualisation'],
  links: [],
  content: {
    fr: {
      title: 'Infrastructure du système d’information de GreenReso',
      shortTitle: 'GreenReso',
      summary:
        "Concevoir une infrastructure SI plus sûre et mieux structurée pour une PME d'IoT énergétique victime d'une fuite de données, en intégrant la sobriété numérique.",
      category: 'Systèmes d’information · Cybersécurité',
      context: 'Projet académique · cas d’entreprise GreenReso',
      note:
        "Ce projet est présenté à partir de l'énoncé de la mission : les points ci-dessous décrivent le périmètre de travail demandé, et non des livrables finaux publiés.",
      problem:
        "GreenReso, PME nantaise de capteurs IoT pour l'optimisation énergétique des bâtiments (plateforme GreenPilot), utilisait des outils Google de façon non structurée, sans gestion centralisée des utilisateurs, et a été victime d'une fuite de données.",
      objectives: [
        'Concevoir une infrastructure SI plus sûre et mieux structurée.',
        'Automatiser la gestion des comptes et des droits.',
        'Sensibiliser les collaborateurs à la cybersécurité.',
        'Aligner l’infrastructure avec des principes de sobriété numérique.',
      ],
      data: [
        'État des lieux : 40 collaborateurs répartis en 5 services, aucune politique de mots de passe, droits gérés manuellement, sauvegardes non centralisées, clés USB personnelles, parc partiellement sous Windows 8.',
      ],
      approach: [
        {
          title: 'Périmètre de la mission',
          points: [
            'Analyse des besoins et des contraintes de l’entreprise.',
            'Schéma d’infrastructure réseau logique : serveurs principaux (Active Directory, fichiers, DNS), segmentation des réseaux, répartition des postes par service.',
            'Organisation Active Directory cible : unités d’organisation par service, groupes de sécurité, GPO de verrouillage des postes et de politique de mots de passe.',
            'Scripts PowerShell permettant aux RH de créer des comptes et générant l’arborescence de dossiers avec les droits NTFS associés (espaces par service et espace personnel).',
            'Document de sensibilisation à la cybersécurité pour des collaborateurs non informaticiens.',
            'Sobriété numérique : virtualisation des serveurs, limitation des impressions, interdiction des supports de stockage non sécurisés.',
          ],
        },
      ],
      results: [
        'Le document source ne décrit pas de livrable final : le périmètre ci-dessus correspond au travail demandé pour ce projet.',
      ],
      skills:
        'Analyse de besoins, architecture réseau, annuaire Active Directory et stratégies de groupe, automatisation PowerShell, sensibilisation à la cybersécurité et numérique responsable.',
    },
    en: {
      title: 'GreenReso’s information system infrastructure',
      shortTitle: 'GreenReso',
      summary:
        'Designing a safer, better-structured IT infrastructure for an energy IoT SME after a data leak, with digital sobriety in mind.',
      category: 'Information systems · Cybersecurity',
      context: 'Academic project · GreenReso business case',
      note:
        'This project is presented from the mission brief: the points below describe the requested scope of work, not published final deliverables.',
      problem:
        'GreenReso, a Nantes-based SME making IoT sensors for building energy optimisation (GreenPilot platform), used Google tools in an unstructured way, had no centralised user management, and had suffered a data leak.',
      objectives: [
        'Design a safer, better-structured IT infrastructure.',
        'Automate account and permission management.',
        'Raise staff awareness of cybersecurity.',
        'Align the infrastructure with digital sobriety principles.',
      ],
      data: [
        'Starting point: 40 employees across 5 departments, no password policy, manually managed permissions, decentralised backups, personal USB drives, and machines partly running Windows 8.',
      ],
      approach: [
        {
          title: 'Scope of the mission',
          points: [
            "Analysis of the company's needs and constraints.",
            'Logical network diagram: main servers (Active Directory, file server, DNS), network segmentation and workstation layout by department.',
            'Target Active Directory design: organisational units per department, security groups, and GPOs for workstation locking and password policy.',
            'PowerShell scripts letting HR create accounts and generating the folder tree with matching NTFS permissions (department shares and personal folders).',
            'A cybersecurity awareness guide for non-technical staff.',
            'Digital sobriety: server virtualisation, fewer printouts, and a ban on unsecured storage media.',
          ],
        },
      ],
      results: [
        'The source document does not describe a final deliverable: the scope above reflects the work requested for this project.',
      ],
      skills:
        'Needs analysis, network architecture, Active Directory and group policies, PowerShell automation, cybersecurity awareness and sustainable IT.',
    },
  },
};
