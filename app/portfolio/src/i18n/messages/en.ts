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
    productLabel: 'Product',
    cognizant: {
      company: 'Cognizant Technology Solutions',
      role: 'Programmer Analyst',
      periodStart: '2020',
      periodEnd: '2022',
      product: 'USB Corporate & Services',
      bullets: {
        scope:
          'Financial-services programs for corporate clients—delivery at scale with accessibility and reliability expectations typical of regulated environments.',
        engineering:
          'React for user-focused interfaces; Node.js for services. Production defect resolution, scoped UI enhancements, and steady iteration with the team.',
        observability:
          'Kibana for log search, dashboards, and monitoring—shortening triage and strengthening operational visibility.',
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
          'Blackboard Learn modernizes instructor training: accessible learning experiences on demand—React and Angular for responsive, user-centric interfaces; Java and Spring Boot for reliable backend services.',
        features:
          'Partnered with product to design and ship advanced LMS areas—course creation, assessments, grading workflows, and knowledge checks.',
        react:
          'React: delivered new features and reusable components with clear patterns and a high bar for code quality.',
        migration:
          'Angular to React: led and contributed to migrations—refactoring with disciplined feature equivalence.',
        reviews:
          'Code reviews to strengthen quality, consistency, and shared engineering standards.',
      },
    },
    trimble: {
      company: 'Trimble',
      role: 'Software Engineer',
      periodStart: '2024',
      product: 'Trimble Connect',
      bullets: {
        mission:
          'Trimble Connect is a cloud collaboration hub for design and construction: models, drawings, documents, and project data in one workspace so office, field, and partner teams review work, track issues, and stay aligned from design through delivery.',
        delivery:
          'Individual contributor: production bug fixes and product features owned end to end—from clarification through release—often delivered single-handedly.',
        stackUpgrades:
          'Modernized the client stack with staged rollouts: React Router v5 to v6 and React 16 to 18, reducing risk to high-traffic workflows.',
        testing:
          'Replaced Enzyme with React Testing Library for tests that reflect real usage and are easier to sustain.',
        webComponents:
          'Built SolidJS-powered web components so shared UI can be authored once and embedded across host applications in a framework-agnostic way.',
        reviews:
          'Peer code reviews to uphold quality, consistency, and performance before merge.',
      },
    },
    buildit: {
      company: 'BuildIt Inc',
      role: 'Senior Frontend Engineer',
      periodStart: '2019',
      periodEnd: '2022',
      product: 'Shared component platform',
      bullets: {
        designSystem:
          'Scaled a design system adopted across eight product teams—tokens, documentation, and governance that kept UX coherent.',
        architecture:
          'Module federation to roll out micro-frontends deliberately without fragmenting the customer experience.',
        collaboration:
          'Partnered with design and platform engineering to align releases, adoption, and long-term maintainability.',
      },
    },
    startup: {
      company: 'StartupXYZ',
      role: 'Frontend Engineer',
      periodStart: '2017',
      periodEnd: '2019',
      product: 'B2B SaaS',
      bullets: {
        foundation:
          'Early engineer on a revenue product: ownership of critical flows from sketch to production.',
        modernization:
          'Led a React migration and introduced OAuth 2.0 PKCE—raising security and maintainability for the next growth phase.',
        craft:
          'Established patterns for components, data loading, and testing that outlasted individual ship cycles.',
      },
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's build something memorable",
    lead: "I'm open to thoughtful conversations about staff-level roles, contract work, and high-trust collaborations.",
    github: 'GitHub profile',
    linkedin: 'LinkedIn profile',
    email: 'Email',
    phone: 'Phone',
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
