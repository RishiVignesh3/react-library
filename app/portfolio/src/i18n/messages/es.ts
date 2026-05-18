import type { Messages } from './en';

export const messagesEs = {
  meta: {
    documentTitle: 'Rishi Vignesh K · Ingeniero de software',
    documentDescription:
      'Portafolio de Rishi Vignesh K — ingeniero de software con energía por stacks y organizaciones diversas, con experiencia desde equipos de producto hasta entrega orientada al cliente.',
  },
  a11y: {
    mainNav: 'Navegación principal',
    workHistory: 'Historial laboral',
    contactLinks: 'Enlaces de contacto',
    interestsGrid: 'Intereses y aficiones',
    skillsList: 'Etiquetas del stack tecnológico',
    skillsWellKnown: 'Tecnologías muy conocidas',
    skillsWorkedOn: 'También usadas en proyectos',
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
    eyebrow: 'Rishi Vignesh K · Ingeniero de software',
    title: 'Software fiable — y con energía por nuevos stacks y contextos organizativos.',
    lead: 'Graduado en informática con experiencia práctica en distintos encargos: desde funciones nuevas hasta sistemas en producción. La variedad me motiva de verdad: organizaciones, dominios y herramientas distintas; adapto la arquitectura a los objetivos de cada iniciativa.',
    bio: "Soy Rishi Vignesh K. Terminé la etapa preuniversitaria en 2016 y me gradué en Ingeniería en Ciencias de la Computación en 2020 — una base sólida en algoritmos, sistemas e ingeniería de software disciplinada.\n\nSoy ingeniero de software profesional desde noviembre de 2020. Mi trabajo abarca organizaciones de servicios y de producto y múltiples iniciativas: análisis y diseño, implementación, pruebas, lanzamientos y seguimiento con interesados y compañeros. Me gusta el contraste entre esos mundos — la propiedad dentro de una hoja de ruta de producto frente al ritmo y la claridad en la entrega al cliente — y aprendo rápido en cada contexto.\n\nMe entusiasma trabajar con distintos stacks tecnológicos: frontends, backends, APIs, persistencia y herramientas de entrega. Los nuevos lenguajes, marcos y restricciones me interesan; elijo lo que encaja con mantenibilidad, rendimiento y plazos sin atarme a un único kit predeterminado.",
    skillsTitle: 'Stacks tecnológicos',
    skillsWellKnownHeading: 'Muy conocidas',
    skillsWorkedOnHeading: 'También usadas',
    stats: {
      impact: 'Formación',
      focus: 'Trayectoria',
      style: 'Actitud',
      impactVal: 'Grado en Ing. en Ciencias de la Computación (2020)',
      focusVal: 'Ingeniero de software desde nov. 2020',
      styleVal: 'Entusiasmo por stacks y organizaciones variadas',
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
      more: '…y más',
    },
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
