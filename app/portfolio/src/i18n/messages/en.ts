/**
 * English — canonical message tree. Other locales must match this shape exactly.
 */
export const messagesEn = {
  meta: {
    documentTitle: 'Rishi Vignesh K · Software Engineer',
    documentDescription:
      'Portfolio of Rishi Vignesh K — software engineer energized by diverse stacks and organizations, with experience from product teams to client-facing delivery.',
  },
  a11y: {
    mainNav: 'Main navigation',
    workHistory: 'Work history',
    contactLinks: 'Contact links',
    interestsGrid: 'Interests and hobbies',
    skillsList: 'Tech stack tags',
    skillsWellKnown: 'Well-known technologies',
    skillsWorkedOn: 'Also used in projects',
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
    eyebrow: 'Rishi Vignesh K · Software engineer',
    title: 'Building reliable software—and energized by new stacks and org contexts.',
    lead: 'Computer science graduate with hands-on experience across engagements—from greenfield features to production systems. I stay genuinely motivated by variety: different organizations, domains, and tools, and I match architecture to each initiative\'s goals.',
    bio: "I'm Rishi Vignesh K. I completed my pre-university schooling in 2016, then earned a Bachelor of Engineering in Computer Science and Engineering in 2020—a solid base in algorithms, systems, and disciplined software engineering.\n\nI have been a professional software engineer since November 2020. My work spans service-based and product-based organizations and multiple initiatives: analysis and design, implementation, testing, releases, and follow-up with stakeholders and teammates. I like the contrast between those worlds—ownership inside a product roadmap versus pace and clarity in client delivery—and I learn quickly in each setting.\n\nI'm enthusiastic about working across technology stacks—frontends, backends, APIs, persistence, and delivery tooling. New languages, frameworks, and constraints interest me; I pick what fits maintainability, performance, and timelines without being tied to one default toolkit.",
    skillsTitle: 'Tech stacks',
    skillsWellKnownHeading: 'Well known',
    skillsWorkedOnHeading: 'Worked on',
    stats: {
      impact: 'Education',
      focus: 'Tenure',
      style: 'Mindset',
      impactVal: 'B.E., Computer Science & Engineering (2020)',
      focusVal: 'Software engineer since Nov 2020',
      styleVal: 'Eager for stacks & org variety',
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
      more: '…and more',
    },
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
