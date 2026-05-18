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
    acme: {
      company: 'Acme Corp',
      role: 'Staff Engineer',
      periodStart: '2022',
      description:
        'Pilotage des initiatives plateforme frontend pour 20+ équipes produit. Architecture de la migration monorepo vers Nx, CI raccourcie et builds incrémentaux à grande échelle.',
    },
    buildit: {
      company: 'BuildIt Inc',
      role: 'Senior Frontend Engineer',
      periodStart: '2019',
      periodEnd: '2022',
      description:
        'Design system adopté par huit équipes produit. Module federation pour un déploiement micro-frontends sans perdre la cohérence.',
    },
    startup: {
      company: 'StartupXYZ',
      role: 'Frontend Engineer',
      periodStart: '2017',
      periodEnd: '2019',
      description:
        'Ingénieur précoce sur un SaaS B2B. Migration React, OAuth 2.0 PKCE et patterns encore présents dans le code.',
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Construisons quelque chose de mémorable',
    lead: 'Ouvert à des échanges sérieux sur des rôles staff, du freelancing et des collaborations exigeantes.',
    github: 'Profil GitHub',
    linkedin: 'Profil LinkedIn',
    email: 'E-mail',
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
