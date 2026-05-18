import type { Messages } from './en';

export const messagesEs = {
  meta: {
    documentTitle: 'RV · Staff Engineer y plataforma frontend',
    documentDescription:
      'Portafolio — Staff engineer enfocado en plataforma frontend, React a escala y experiencia de desarrollo.',
  },
  a11y: {
    mainNav: 'Navegación principal',
    workHistory: 'Historial laboral',
    contactLinks: 'Enlaces de contacto',
    interestsGrid: 'Intereses y aficiones',
    skillsList: 'Habilidades y tecnologías',
    colorTheme: 'Tema de color',
    language: 'Idioma',
  },
  portfolio: {
    wordmark: 'Portafolio',
  },
  nav: {
    about: 'Sobre mí',
    companies: 'Empresas y trabajo',
    contact: 'Contacto',
    random: 'Cosas variadas',
  },
  theme: {
    system: 'Seguir el sistema',
    light: 'Tema claro',
    dark: 'Tema oscuro',
  },
  lang: {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    ja: '日本語',
  },
  loading: 'Cargando',
  about: {
    eyebrow: 'Staff engineer · portafolio',
    title: 'Construyo frontends que escalan — y equipos que entregan.',
    lead: 'Plataforma frontend, arquitectura monorepo y experiencia de desarrollo. Sistemas serenos, ejecución precisa.',
    bio: 'Lidero la dirección técnica donde se cruzan la velocidad de producto y la salud de la plataforma. Mi trabajo está en la intersección de la arquitectura React, los sistemas de build y el lado humano: mentoría, alineación y estándares que perduran.',
    skillsTitle: 'Stack y oficio',
    stats: {
      impact: 'Impacto',
      focus: 'Enfoque',
      style: 'Estilo',
      impactVal: 'Plataforma',
      focusVal: 'DX + UX',
      styleVal: 'Pragmático',
    },
  },
  skills: {
    typescript: 'TypeScript',
    react: 'React',
    nodejs: 'Node.js',
    systemDesign: 'Diseño de sistemas',
    graphql: 'GraphQL',
    restApis: 'APIs REST',
    cicd: 'CI/CD',
    nxMonorepo: 'Monorepo Nx',
    testing: 'Pruebas',
    performance: 'Rendimiento',
  },
  companies: {
    eyebrow: 'Experiencia',
    title: 'Empresas y trabajo',
    lead: 'Apuestas de plataforma, entrega de producto y complejidad convertida en algo que los equipos pueden mantener de verdad.',
    present: 'Actualidad',
    acme: {
      company: 'Acme Corp',
      role: 'Staff Engineer',
      periodStart: '2022',
      description:
        'Liderazgo de iniciativas de plataforma frontend en más de 20 equipos de producto. Arquitectura de la migración monorepo a Nx, con CI mucho más rápida y builds incrementales a escala.',
    },
    buildit: {
      company: 'BuildIt Inc',
      role: 'Senior Frontend Engineer',
      periodStart: '2019',
      periodEnd: '2022',
      description:
        'Diseño de sistema adoptado por ocho equipos de producto. Module federation para un despliegue deliberado de micro-frontends sin perder coherencia.',
    },
    startup: {
      company: 'StartupXYZ',
      role: 'Frontend Engineer',
      periodStart: '2017',
      periodEnd: '2019',
      description:
        'Ingeniero temprano en un SaaS B2B. Migración a React, OAuth 2.0 PKCE y patrones que el código sigue hoy.',
    },
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Construyamos algo memorable',
    lead: 'Abierto a conversaciones serias sobre roles staff, trabajo por contrato y colaboraciones de alta confianza.',
    github: 'Perfil de GitHub',
    linkedin: 'Perfil de LinkedIn',
    email: 'Correo',
  },
  random: {
    eyebrow: 'Más allá del escritorio',
    title: 'Cosas variadas',
    lead: 'El encaje cultural importa. Esto me mantiene curioso cuando no estoy en la terminal.',
    music: {
      title: 'Música',
      body: 'Math rock, post-rock, compases raros en bucle.',
    },
    reading: {
      title: 'Lectura',
      body: 'A Philosophy of Software Design en la mesilla; Staff Engineer ya bien usado.',
    },
    keyboards: {
      title: 'Teclados mecánicos',
      body: 'Oil Kings, mod de cinta, cable en espiral — culpable.',
    },
    photography: {
      title: 'Calle',
      body: 'X100VI. Las simulaciones de película ganan a los presets de un clic.',
    },
    coffee: {
      title: 'Café',
      body: 'Pour-over 1:15, y un flat white los fines de semana.',
    },
    tinkering: {
      title: 'Experimentos',
      body: 'Domótica, proyectos con Raspberry Pi, caos controlado.',
    },
  },
} satisfies Messages;
