export default {
  app: {
    title: 'Phong のポートフォリオ',
    home: 'ホーム',
    resume: '履歴書',
    settings: '設定',
    loading: 'アプリケーションを読み込んでいます...',
  },

  home: {
    sections: {
      skills: 'スキル',
      workHistory: '職務経歴',
      education: '学歴',
    },
    education: {
      labels: {
        department: '学科',
        field: '専攻',
        degree: '学位',
        duration: '期間',
        present: '現在',
      },
      items: {
        futaba: {
          school: '双葉日本語学校',
          department: '日本語',
          degree: 'JLPT N3',
        },
        tdtu: {
          school: 'トン・ドゥック・タング大学',
          department: '数学・統計学部',
          field: '応用数学',
          degree: '理学士',
          url: 'https://tdtu.edu.vn/en/',
        },
      },
    },
    introduction: {
      heading: 'こんにちは、Phong Nguyen です',
      description:
        '私は日本の茨城県を拠点に活動する、好奇心旺盛なデザイナー兼開発者です。新しいことを学び、新しい技術を探求するのが好きです。',
      cta: '以下の GitHub と Facebook のプロフィールをご覧いただくか、メールでお気軽にご連絡ください。',
      social: {
        github: 'GitHub',
        facebook: 'Facebook',
        email: 'メール',
      },
      avatarAlt: 'Phong Nguyen のポートレート',
    },
    skills: {
      tabs: {
        programming: {
          name: 'プログラミング',
        },
        frameworks: {
          name: 'フレームワーク',
        },
        databases: {
          name: 'データベース',
        },
        languages: {
          name: '言語',
        },
      },
      programming: {
        items: {
          csharp: 'C# - 上級',
          typescript: 'TypeScript - 上級',
          cplusplus: 'C++ - 実務経験あり',
          visualbasic: 'VB - 実務経験あり',
          pascal: 'Pascal - 実務経験あり',
          python: 'Python - 初級',
        },
      },
      frameworks: {
        items: {
          dotnet: '.NET - 上級',
          aras: 'Aras - 上級',
          nuxt: 'Nuxt - 上級',
          react: 'React - 中級',
          winui: 'WinUI - 中級',
        },
      },
      databases: {
        items: {
          postgres: 'PostgreSQL - 実務経験あり',
          oracle: 'Oracle - 実務経験あり',
          sqlserver: 'SQL Server - 実務経験あり',
          sqlite: 'SQLite - 中級',
        },
      },
      languages: {
        items: {
          vietnamese: 'ベトナム語 - 母語',
          english: '英語 - TOEIC 770',
          japanese: '日本語 - JLPT N3',
        },
      },
    },
    workHistory: {
      warning: {
        multipleCurrent: '現在の職務経歴が複数あります。最初の1件のみを表示します。',
      },
      disclaimer: {
        label: '重要:',
        text: 'すべての商標およびロゴは、それぞれの所有者に帰属します。',
      },
      card: {
        logoAlt: '{{company}} のロゴ',
        present: '現在',
      },
      items: {
        hitachi: {
          company: '日立ハイテク',
          position: 'ソフトウェアエンジニア',
          description:
            'ソフトウェア開発とシステム統合に関わるプロジェクトに従事し、特に Aras Innovator 開発に注力しました。',
        },
        fujitec: {
          company: 'フジテック',
          position: 'ソフトウェアエンジニア',
          description:
            'ソフトウェア開発とシステム統合のプロジェクトに従事し、主に Nuxt と .NET を用いた PLM システムの開発・保守を担当しました。',
        },
        usexpress: {
          company: 'US Express',
          position: 'フルスタック開発者',
          description: '顧客向け Web アプリケーションの開発と保守を担当しました。',
        },
        hoangphuc: {
          company: 'Hoang Phuc International',
          position: 'Web 管理者',
          description: '企業サイトの運用および Web 関連の管理業務を担当しました。',
        },
      },
    },
  },

  settings: {
    title: '設定',
    description: 'アプリケーションの設定を管理します',
    appearance: '表示',
    theme: 'テーマ',
    themeDescription: 'アプリケーションの表示テーマをライトまたはダークから選択します。',
    themeOptions: {
      light: 'ライト',
      dark: 'ダーク',
      system: 'システム設定',
    },
    language: '言語',
    languageDescription: 'アプリケーションの表示言語を選択します。',
    languageOptions: {
      en: '英語',
      ja: '日本語',
      vi: 'ベトナム語',
    },
  },
};
