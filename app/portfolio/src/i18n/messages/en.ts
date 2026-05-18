/**
 * English — canonical message tree. Other locales must match this shape exactly.
 */
export const messagesEn = {
  meta: {
    documentTitle: 'RV · Staff Engineer & Frontend Platform',
    documentDescription:
      'Portfolio — Staff engineer focused on frontend platform, scalable React, and developer experience.',
  },
  a11y: {
    mainNav: 'Main navigation',
    workHistory: 'Work history',
    contactLinks: 'Contact links',
    interestsGrid: 'Interests and hobbies',
    skillsList: 'Skills and technologies',
    colorTheme: 'Color theme',
    language: 'Language',
  },
  portfolio: {
    wordmark: 'Portfolio',
  },
  nav: {
    about: 'About Me',
    companies: 'Companies & Work',
    contact: 'Contact',
    random: 'Random Stuff',
  },
  theme: {
    system: 'Match system',
    light: 'Light theme',
    dark: 'Dark theme',
  },
  lang: {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    ja: '日本語',
  },
  loading: 'Loading',
  about: {
    eyebrow: 'Staff engineer · portfolio',
    title: 'I craft frontends that scale—and teams that ship.',
    lead: 'Frontend platform, monorepo architecture, and developer experience. Calm systems, sharp execution.',
    bio: 'I lead technical direction where product velocity and platform health meet. My work sits at the intersection of React architecture, build systems, and the human side of engineering: mentoring, alignment, and standards that stick.',
    skillsTitle: 'Stack & craft',
    stats: {
      impact: 'Impact',
      focus: 'Focus',
      style: 'Style',
      impactVal: 'Platform',
      focusVal: 'DX + UX',
      styleVal: 'Pragmatic',
    },
  },
  skills: {
    typescript: 'TypeScript',
    react: 'React',
    nodejs: 'Node.js',
    systemDesign: 'System Design',
    graphql: 'GraphQL',
    restApis: 'REST APIs',
    cicd: 'CI/CD',
    nxMonorepo: 'Nx Monorepo',
    testing: 'Testing',
    performance: 'Performance',
  },
  companies: {
    eyebrow: 'Experience',
    title: 'Companies & work',
    lead: 'A track record of platform bets, product delivery, and turning complexity into something teams can actually maintain.',
    present: 'Present',
    acme: {
      company: 'Acme Corp',
      role: 'Staff Engineer',
      periodStart: '2022',
      description:
        'Leading frontend platform initiatives across 20+ product squads. Architected the monorepo migration to Nx, cutting CI time dramatically and enabling incremental builds at scale.',
    },
    buildit: {
      company: 'BuildIt Inc',
      role: 'Senior Frontend Engineer',
      periodStart: '2019',
      periodEnd: '2022',
      description:
        'Built a design system adopted by eight product teams. Introduced module federation to support a deliberate micro-frontend rollout without sacrificing coherence.',
    },
    startup: {
      company: 'StartupXYZ',
      role: 'Frontend Engineer',
      periodStart: '2017',
      periodEnd: '2019',
      description:
        'Early engineer on a B2B SaaS product. Led the React migration, implemented OAuth 2.0 PKCE, and set patterns the codebase still follows today.',
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build something memorable",
    lead: "I'm open to thoughtful conversations about staff-level roles, contract work, and high-trust collaborations.",
    github: 'GitHub profile',
    linkedin: 'LinkedIn profile',
    email: 'Email',
  },
  random: {
    eyebrow: 'Beyond the desk',
    title: 'Random stuff',
    lead: "Culture-fit matters. Here's what keeps me curious when I'm away from the terminal.",
    music: {
      title: 'Music',
      body: 'Math rock, post-rock, odd meters on repeat.',
    },
    reading: {
      title: 'Reading',
      body: 'Philosophy of Software Design on the nightstand; Staff Engineer already dog-eared.',
    },
    keyboards: {
      title: 'Mechanical keyboards',
      body: 'Oil Kings, tape mod, coiled cable—guilty as charged.',
    },
    photography: {
      title: 'Street',
      body: 'X100VI. Film sims beat one-click presets.',
    },
    coffee: {
      title: 'Coffee',
      body: 'Pour-over at 1:15, then a flat white on weekends.',
    },
    tinkering: {
      title: 'Tinkering',
      body: 'Home automation, Pi projects, controlled chaos.',
    },
  },
};

export type Messages = typeof messagesEn;
