import type { Messages } from './en';

export const messagesJa = {
  meta: {
    documentTitle: 'RV · スタッフエンジニア／フロントエンドプラットフォーム',
    documentDescription:
      'ポートフォリオ — フロントエンドプラットフォーム、スケールする React、開発者体験に取り組むスタッフエンジニア。',
  },
  a11y: {
    mainNav: 'メインナビゲーション',
    workHistory: '職歴',
    contactLinks: '連絡先リンク',
    interestsGrid: '興味・趣味',
    skillsList: 'スキルと技術',
    colorTheme: 'カラーテーマ',
    language: '言語',
  },
  portfolio: {
    wordmark: 'ポートフォリオ',
  },
  nav: {
    about: '自己紹介',
    companies: '企業・仕事',
    contact: '連絡先',
    random: 'その他',
  },
  theme: {
    system: 'システムに合わせる',
    light: 'ライトテーマ',
    dark: 'ダークテーマ',
  },
  lang: {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    ja: '日本語',
  },
  loading: '読み込み中',
  about: {
    eyebrow: 'スタッフエンジニア · ポートフォリオ',
    title: 'スケールするフロントエンドと、出荷できるチームをつくります。',
    lead: 'フロントエンドプラットフォーム、モノレポ、アーキテクチャと開発者体験。落ち着いた設計と、尖った実行。',
    bio: 'プロダクトのスピードとプラットフォームの健全性が交わるところで、技術方針を引き受けます。React アーキテクチャ、ビルド基盤、そしてメンタリングやアラインメント、定着する標準といった「人の側面」までが仕事の範囲です。',
    skillsTitle: 'スタックと職能',
    stats: {
      impact: 'インパクト',
      focus: 'フォーカス',
      style: 'スタイル',
      impactVal: 'プラットフォーム',
      focusVal: 'DX + UX',
      styleVal: '実用的',
    },
  },
  skills: {
    typescript: 'TypeScript',
    react: 'React',
    nodejs: 'Node.js',
    systemDesign: 'システム設計',
    graphql: 'GraphQL',
    restApis: 'REST API',
    cicd: 'CI/CD',
    nxMonorepo: 'Nx モノレポ',
    testing: 'テスト',
    performance: 'パフォーマンス',
  },
  companies: {
    eyebrow: '経験',
    title: '企業・仕事',
    lead: 'プラットフォームへの打ち手、プロダクト開発、チームが長く保てるように複雑さを整えること。',
    present: '現在',
    acme: {
      company: 'Acme Corp',
      role: 'スタッフエンジニア',
      periodStart: '2022',
      description:
        '20 以上のプロダクトチーム向けフロントエンドプラットフォーム施策をリード。Nx へのモノレポ移行を設計し、CI 時間の大幅短縮と大規模なインクリメンタルビルドを実現。',
    },
    buildit: {
      company: 'BuildIt Inc',
      role: 'シニアフロントエンドエンジニア',
      periodStart: '2019',
      periodEnd: '2022',
      description:
        '8 チームに採用されたデザインシステムを構築。一貫性を損なわずマイクロフロントを展開するためのモジュール連携を導入。',
    },
    startup: {
      company: 'StartupXYZ',
      role: 'フロントエンドエンジニア',
      periodStart: '2017',
      periodEnd: '2019',
      description:
        'B2B SaaS の初期メンバー。React 移行、OAuth 2.0 PKCE 実装、いまもコードベースに残るパターン設計。',
    },
  },
  contact: {
    eyebrow: '連絡先',
    title: '一緒に記憶に残るものを',
    lead: 'スタッフレベルの役割、契約、信頼に基づく協業など、丁寧な対話にはいつでも開かれています。',
    github: 'GitHub プロフィール',
    linkedin: 'LinkedIn プロフィール',
    email: 'メール',
  },
  random: {
    eyebrow: 'デスクの外',
    title: 'その他',
    lead: 'カルチャーフィットは大切です。ターミナルから離れたときの好奇心の源です。',
    music: {
      title: '音楽',
      body: 'マスロック、ポストロック、変拍子をリピート。',
    },
    reading: {
      title: '読書',
      body: '枕元は A Philosophy of Software Design。Staff Engineer はすでに角が折れ気味。',
    },
    keyboards: {
      title: 'メカニカルキーボード',
      body: 'Oil Kings、テープモッド、コイルケーブル——お約束。',
    },
    photography: {
      title: 'ストリート',
      body: 'X100VI。フィルムシミュはワンクリックプリセットに勝つ。',
    },
    coffee: {
      title: 'コーヒー',
      body: '1:15 のハンドドリップ、週末はフラットホワイト。',
    },
    tinkering: {
      title: 'いじり',
      body: 'ホームオートメーション、Raspberry Pi、制御されたカオス。',
    },
  },
} satisfies Messages;
