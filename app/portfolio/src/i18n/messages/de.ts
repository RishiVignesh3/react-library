import type { Messages } from './en';

export const messagesDe = {
  meta: {
    documentTitle: 'RV · Staff Engineer & Frontend-Plattform',
    documentDescription:
      'Portfolio — Staff Engineer mit Fokus auf Frontend-Plattform, skalatives React und Developer Experience.',
  },
  a11y: {
    mainNav: 'Hauptnavigation',
    workHistory: 'Beruflicher Werdegang',
    contactLinks: 'Kontaktlinks',
    interestsGrid: 'Interessen und Hobbys',
    skillsList: 'Skills und Technologien',
    colorTheme: 'Farbschema',
    language: 'Sprache',
  },
  portfolio: {
    wordmark: 'Portfolio',
  },
  nav: {
    about: 'Über mich',
    companies: 'Unternehmen & Arbeit',
    contact: 'Kontakt',
    random: 'Verschiedenes',
  },
  theme: {
    system: 'System folgen',
    light: 'Helles Design',
    dark: 'Dunkles Design',
  },
  lang: {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    ja: '日本語',
  },
  loading: 'Lädt',
  about: {
    eyebrow: 'Staff Engineer · Portfolio',
    title: 'Ich baue Frontends, die skalieren — und Teams, die liefern.',
    lead: 'Frontend-Plattform, Monorepo-Architektur und Developer Experience. Ruhige Systeme, präzise Umsetzung.',
    bio: 'Ich verantworte technische Richtung dort, wo Produktgeschwindigkeit und Plattform-Gesundheit zusammentreffen. Meine Arbeit liegt im Schnittpunkt aus React-Architektur, Build-Systemen und der menschlichen Seite: Mentoring, Alignment und Standards, die bleiben.',
    skillsTitle: 'Stack & Handwerk',
    stats: {
      impact: 'Wirkung',
      focus: 'Fokus',
      style: 'Stil',
      impactVal: 'Plattform',
      focusVal: 'DX + UX',
      styleVal: 'Pragmatisch',
    },
  },
  skills: {
    typescript: 'TypeScript',
    react: 'React',
    nodejs: 'Node.js',
    systemDesign: 'Systemdesign',
    graphql: 'GraphQL',
    restApis: 'REST-APIs',
    cicd: 'CI/CD',
    nxMonorepo: 'Nx Monorepo',
    testing: 'Testing',
    performance: 'Performance',
  },
  companies: {
    eyebrow: 'Erfahrung',
    title: 'Unternehmen & Arbeit',
    lead: 'Plattform-Entscheidungen, Produktdelivery und Komplexität so gebändigt, dass Teams sie wirklich pflegen können.',
    present: 'Heute',
    acme: {
      company: 'Acme Corp',
      role: 'Staff Engineer',
      periodStart: '2022',
      description:
        'Leitung von Frontend-Plattform-Initiativen für 20+ Produktteams. Architektur der Monorepo-Migration zu Nx, deutlich kürzere CI-Zeiten und inkrementelle Builds im großen Maßstab.',
    },
    buildit: {
      company: 'BuildIt Inc',
      role: 'Senior Frontend Engineer',
      periodStart: '2019',
      periodEnd: '2022',
      description:
        'Aufbau eines Design Systems, das von acht Produktteams übernommen wurde. Einführung von Module Federation für einen gezielten Micro-Frontend-Rollout ohne Kohärenzverlust.',
    },
    startup: {
      company: 'StartupXYZ',
      role: 'Frontend Engineer',
      periodStart: '2017',
      periodEnd: '2019',
      description:
        'Früher Engineer in einem B2B-SaaS-Produkt. React-Migration, OAuth-2.0-PKCE und Architektur-Muster, die der Codebase noch heute zugrunde liegen.',
    },
  },
  contact: {
    eyebrow: 'Kontakt',
    title: 'Lassen Sie etwas Bleibendes entstehen',
    lead: 'Offen für ernsthafte Gespräche zu Staff-Rollen, Contracting und Kooperationen auf Augenhöhe.',
    github: 'GitHub-Profil',
    linkedin: 'LinkedIn-Profil',
    email: 'E-Mail',
  },
  random: {
    eyebrow: 'Abseits des Schreibtischs',
    title: 'Verschiedenes',
    lead: 'Kulturfit zählt. Das inspiriert mich, wenn ich nicht am Terminal sitze.',
    music: {
      title: 'Musik',
      body: 'Math Rock, Post-Rock, ungerade Takte auf Repeat.',
    },
    reading: {
      title: 'Lesen',
      body: '«A Philosophy of Software Design» auf dem Nachttisch; «Staff Engineer» schon angeschlagen.',
    },
    keyboards: {
      title: 'Mechanische Tastaturen',
      body: 'Oil Kings, Tape-Mod, Spiralkabel — ich gestehe.',
    },
    photography: {
      title: 'Street',
      body: 'X100VI. Film-Simulationen schlagen Ein-Klick-Presets.',
    },
    coffee: {
      title: 'Kaffee',
      body: 'Pour-over 1:15, am Wochenende dann ein Flat White.',
    },
    tinkering: {
      title: 'Tüfteln',
      body: 'Hausautomatisierung, Raspberry-Pi-Projekte, kontrolliertes Chaos.',
    },
  },
} satisfies Messages;
