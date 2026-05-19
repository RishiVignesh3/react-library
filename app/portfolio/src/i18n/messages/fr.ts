import type { Messages } from './en';

export const messagesFr = {
  meta: {
    documentTitle: 'Rishi Vignesh K · Ingénieur logiciel',
    documentDescription:
      'Portfolio de Rishi Vignesh K — ingénieur logiciel stimulé par des stacks et des organisations variés, avec une expérience des équipes produit à la livraison côté client.',
  },
  a11y: {
    mainNav: 'Navigation principale',
    workHistory: 'Parcours professionnel',
    contactLinks: 'Liens de contact',
    interestsGrid: 'Centres d’intérêt',
    skillsList: 'Technologies du stack',
    skillsWellKnown: 'Technologies bien maîtrisées',
    skillsWorkedOn: 'Également utilisées en projet',
    colorTheme: 'Thème de couleur',
    language: 'Langue',
  },
  portfolio: {
    wordmark: 'Portfolio',
  },
  nav: {
    about: 'À propos',
    companies: 'Entreprises & travail',
    contact: 'Contact',
    random: 'Divers',
  },
  theme: {
    system: 'Comme le système',
    light: 'Thème clair',
    dark: 'Thème sombre',
  },
  lang: {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    ja: '日本語',
  },
  loading: 'Chargement',
  about: {
    eyebrow: 'Rishi Vignesh K · Ingénieur logiciel',
    title: 'Construire des logiciels fiables — et rester motivé par de nouveaux stacks et contextes organisationnels.',
    lead: 'Diplômé en informatique avec une expérience concrète sur des missions variées — des fonctionnalités greenfield aux systèmes en production. La diversité me motive vraiment : organisations, domaines et outils différents ; j\'aligne l\'architecture sur les objectifs de chaque initiative.',
    bio: "Je m'appelle Rishi Vignesh K. J'ai terminé mes études préuniversitaires en 2016, puis obtenu un Bachelor of Engineering en informatique (Computer Science and Engineering) en 2020 — une base solide en algorithmes, systèmes et pratique d'ingénierie logicielle disciplinée.\n\nJe suis ingénieur logiciel professionnel depuis novembre 2020. Mon travail couvre des organisations de services et de produit ainsi que plusieurs initiatives : analyse et conception, implémentation, tests, mises en production et suivi avec les parties prenantes et l'équipe. J'apprécie le contraste entre ces univers — la responsabilité sur une feuille de route produit face au rythme et à la clarté en livraison client — et j'apprends vite dans chaque contexte.\n\nJe suis enthousiaste à l'idée de travailler sur différentes piles technologiques — frontends, backends, APIs, persistance et outils de livraison. Les nouveaux langages, frameworks et contraintes m'intéressent ; je choisis ce qui sert la maintenabilité, la performance et le calendrier sans être enfermé dans une boîte à outils unique.",
    skillsTitle: 'Stacks techniques',
    skillsWellKnownHeading: 'Bien maîtrisées',
    skillsWorkedOnHeading: 'Également utilisées',
    stats: {
      impact: 'Formation',
      focus: 'Parcours',
      style: 'État d\'esprit',
      impactVal: 'B.E., Computer Science & Engineering (2020)',
      focusVal: 'Ingénieur logiciel depuis nov. 2020',
      styleVal: 'Soif de variété (stacks & organisations)',
    },
  },
  skills: {
    wellKnown: {
      react: 'React',
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      reactTestingLibrary: 'React Testing Library',
      redux: 'Redux',
      html: 'HTML',
      css: 'CSS',
      git: 'Git',
    },
    workedOn: {
      java: 'Java',
      springBoot: 'Spring Boot',
      lambda: 'AWS Lambda',
      solidjs: 'SolidJS',
      dynamodb: 'DynamoDB',
      cicd: 'CI/CD',
      more: '…et plus',
    },
  },
  companies: {
    eyebrow: 'Expérience',
    title: 'Entreprises & travail',
    lead: 'Des engagements plateforme, une livraison produit et une complexité rendue maintenable par les équipes.',
    present: "Aujourd'hui",
    productLabel: 'Produit',
    cognizant: {
      company: 'Cognizant Technology Solutions',
      role: 'Programmer Analyst',
      periodStart: '2020',
      periodEnd: '2022',
      product: 'USB Corporate & Services',
      bullets: {
        scope:
          'Offres financières pour grands comptes—livraison dans des environnements réglementés et à forte exigence de montée en charge.',
        engineering:
          'React pour interfaces centrées utilisateur ; Node.js pour les services. Correctifs production, évolutions UI cadrées et itération continue avec l’équipe.',
        observability:
          'Kibana pour recherche de journaux, tableaux de bord et surveillance—triage accéléré et meilleure visibilité opérationnelle.',
      },
    },
    anthology: {
      company: 'Anthology Inc',
      role: 'Software Engineer',
      periodStart: '2022',
      periodEnd: '2024',
      product: 'Blackboard Learn LMS',
      bullets: {
        mission:
          'Blackboard Learn modernise la formation des instructeurs : apprentissage accessible à la demande—React et Angular pour des interfaces centrées utilisateur ; Java et Spring Boot pour des services backend fiables.',
        features:
          'Avec le produit : conception et livraison de capacités LMS avancées—création de cours, évaluations, notation et knowledge checks.',
        react:
          'React : nouvelles fonctionnalités et composants réutilisables, patterns clairs et exigence de qualité élevée.',
        migration:
          'Angular vers React : pilotage et participation aux migrations—refactorisation avec parité fonctionnelle rigoureuse.',
        reviews:
          'Revues de code pour renforcer qualité, cohérence et standards d’ingénierie partagés.',
      },
    },
    trimble: {
      company: 'Trimble',
      role: 'Software Engineer',
      periodStart: '2024',
      product: 'Trimble Connect',
      bullets: {
        mission:
          'Trimble Connect est une plateforme cloud de collaboration pour la conception et le construction : maquettes, plans, documents et données projet dans un espace unique pour bureau, chantier et partenaires—relecture, tâches et alignement du concept à la livraison.',
        delivery:
          'Contributeur individuel : correctifs production et fonctionnalités de bout en bout—cadrage jusqu’au release—souvent en autonomie.',
        stackUpgrades:
          'Modernisation du client par étapes : React Router v5 vers v6 et React 16 vers 18, en protégeant les parcours sensibles.',
        testing:
          'Remplacement d’Enzyme par React Testing Library—tests plus proches de l’usage et plus durables.',
        webComponents:
          'Composants web SolidJS pour mutualiser l’UI et l’intégrer de façon agnostique au framework.',
        reviews:
          'Revues de code pour qualité, cohérence et performance avant fusion.',
      },
    },
    buildit: {
      company: 'BuildIt Inc',
      role: 'Senior Frontend Engineer',
      periodStart: '2019',
      periodEnd: '2022',
      product: 'Plateforme de composants partagés',
      bullets: {
        designSystem:
          'Design system adopté par huit équipes—tokens, documentation et gouvernance pour une UX cohérente.',
        architecture:
          'Module federation pour micro-frontends sans fracturer le parcours client.',
        collaboration:
          'Partenariat design et plateforme sur releases, adoption et maintenabilité.',
      },
    },
    startup: {
      company: 'StartupXYZ',
      role: 'Frontend Engineer',
      periodStart: '2017',
      periodEnd: '2019',
      product: 'SaaS B2B',
      bullets: {
        foundation:
          'Ingénieur précoce sur le produit revenu : ownership des flux critiques du design à la production.',
        modernization:
          'Pilotage migration React et intégration OAuth 2.0 PKCE—sécurité et maintenabilité pour la croissance.',
        craft:
          'Patterns composants, chargement de données et tests durables au-delà de chaque release.',
      },
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Construisons quelque chose de mémorable',
    lead: 'Ouvert à des échanges sérieux sur des rôles staff, du freelancing et des collaborations exigeantes.',
    github: 'Profil GitHub',
    linkedin: 'Profil LinkedIn',
    email: 'E-mail',
    phone: 'Téléphone',
  },
  random: {
    eyebrow: 'Hors du bureau',
    title: 'Divers',
    lead: 'L’adéquation culturelle compte. Voici ce qui éveille ma curiosité loin du terminal.',
    music: {
      title: 'Musique',
      body: 'Math rock, post-rock, mesures impaires en boucle.',
    },
    reading: {
      title: 'Lecture',
      body: 'A Philosophy of Software Design sur la table de nuit ; Staff Engineer déjà corné.',
    },
    keyboards: {
      title: 'Claviers mécaniques',
      body: 'Oil Kings, tape mod, câble en spirale — coupable.',
    },
    photography: {
      title: 'Rue',
      body: 'X100VI. Les simulations film battent les presets en un clic.',
    },
    coffee: {
      title: 'Café',
      body: 'Pour-over à 1:15, puis un flat white le week-end.',
    },
    tinkering: {
      title: 'Bricolage',
      body: 'Domotique, projets Raspberry Pi, chaos maîtrisé.',
    },
  },
} satisfies Messages;
