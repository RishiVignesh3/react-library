import type { Messages } from './en';

export const messagesFr = {
  meta: {
    documentTitle: 'RV · Staff engineer & plateforme frontend',
    documentDescription:
      'Portfolio — Staff engineer axé plateforme frontend, React à l’échelle et expérience développeur.',
  },
  a11y: {
    mainNav: 'Navigation principale',
    workHistory: 'Parcours professionnel',
    contactLinks: 'Liens de contact',
    interestsGrid: 'Centres d’intérêt',
    skillsList: 'Compétences et technologies',
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
    eyebrow: 'Staff engineer · portfolio',
    title: 'Je crée des frontends qui passent à l’échelle — et des équipes qui livrent.',
    lead: 'Plateforme frontend, architecture monorepo et expérience développeur. Systèmes calmes, exécution nette.',
    bio: 'Je porte la direction technique là où vitesse produit et santé plateforme se rencontrent. Mon travail se situe au croisement de l’architecture React, des build systems et de l’humain : mentorat, alignement et standards qui durent.',
    skillsTitle: 'Stack & savoir-faire',
    stats: {
      impact: 'Impact',
      focus: 'Focus',
      style: 'Style',
      impactVal: 'Plateforme',
      focusVal: 'DX + UX',
      styleVal: 'Pragmatique',
    },
  },
  skills: {
    typescript: 'TypeScript',
    react: 'React',
    nodejs: 'Node.js',
    systemDesign: 'Architecture système',
    graphql: 'GraphQL',
    restApis: 'APIs REST',
    cicd: 'CI/CD',
    nxMonorepo: 'Monorepo Nx',
    testing: 'Tests',
    performance: 'Performance',
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
