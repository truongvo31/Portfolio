export default {
  app: {
    title: 'Phong のポートフォリオ',
    home: 'ホーム',
    resume: '履歴書',
    settings: '設定',
    loading: 'アプリケーションを読み込んでいます...',
  },

  admin: {
    layout: {
      sidebar: {
        title: 'Portfolio Admin',
        navigation: {
          sessions: 'セッション',
        },
      },
    },
    page: {
      sessions: {
        pageTitle: 'セッション',
        description: 'すべてのセッションを管理',
        actions: {
          createSession: 'セッションを作成',
          deleteSessions: 'セッションを削除',
        },
        table: {
          ariaLabel: 'セッション一覧',
          columns: {
            no: 'No.',
            id: 'セッション ID',
            revoked: '取り消し済み',
            expiresAt: '有効期限',
            actions: '操作',
          },
          values: {
            yes: 'はい',
            no: 'いいえ',
          },
        },
        dialog: {
          title: {
            create: 'セッションを作成',
            edit: 'セッションを編集',
          },
          labels: {
            id: 'セッション ID',
            createdAt: '作成日時',
            expiresAt: '有効期限',
            revoked: '取り消し済み',
            revokedAt: '取り消し日時',
            span: 'セッション期間',
            spanUnit: '期間単位',
            description: 'セッション説明',
          },
          placeholders: {
            span: '期間を入力',
            description: '説明を入力',
          },
          units: {
            hours: '時間',
            days: '日',
          },
          buttons: {
            submit: 'OK',
            cancel: 'キャンセル',
          },
        },
        messages: {
          fetchFailed: 'セッションの取得に失敗しました',
          updateSuccess: 'セッションを更新しました',
          deleteTitle: 'セッションを削除',
          deleteBody: '取り消し済みまたは期限切れのセッションをすべて削除します。続行しますか？',
          deleteEmptyTitle: '削除対象のセッションがありません',
          deleteEmptyBody: '取り消し済みまたは期限切れのセッションはありません。',
          deleteFailed: 'セッションの削除に失敗しました',
          deleteSuccess: 'セッションを削除しました',
          sessionNotFoundTitle: 'セッションが見つかりません',
          sessionNotFoundBody: 'ID: {{id}} のセッションは見つかりませんでした',
          invalidTitle: 'セッションが無効です',
          invalidBody: 'セッションは取り消し済みまたは期限切れです。',
          clipboardSuccess: 'セッション URL をクリップボードにコピーしました',
          invalidInputTitle: '入力が無効です',
          invalidInputBody: '期間は 0 より大きい値を入力してください',
          submitErrorTitle: '送信エラー',
          submitErrorBody: 'セッションの送信に失敗しました',
        },
      },
    },
  },

  client: {
    home: {
      tableOfContents: {
        title: '目次',
        ariaLabel: '目次',
        introduction: '自己紹介',
        skills: {
          title: 'スキル',
          programming: 'プログラミング言語',
          frameworks: 'フレームワーク',
          databases: 'データベース',
          languages: '言語',
        },
        workHistory: {
          title: '職務経歴',
          hitachi: '日立ハイテク',
          fujitec: 'フジテック',
          usexpress: 'US Express',
          hoangphuc: 'Hoang Phuc International',
        },
        education: {
          title: '学歴',
          tdtu: 'トン・ドゥック・タング大学',
          futaba: '双葉日本語学校',
        },
        projects: {
          title: 'プロジェクト',
          portfolio: 'ポートフォリオサイト',
          pokedex: 'ポケモン図鑑',
        },
      },
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
          levels: {
            100: '上級',
            75: '実務経験あり',
            50: '中級',
            25: '初級',
          },
          items: {
            csharp: { name: 'C#' },
            typescript: { name: 'TypeScript' },
            cplusplus: { name: 'C++' },
            visualbasic: { name: 'Visual Basic' },
            delphi: { name: 'Pascal' },
            python: { name: 'Python' },
          },
        },
        frameworks: {
          items: {
            dotnet: '.NET',
            aras: 'Aras',
            nuxt: 'Nuxt',
            react: 'React',
            winui: 'WinUI',
          },
        },
        databases: {
          items: {
            postgres: 'PostgreSQL',
            oracle: 'Oracle',
            sqlserver: 'SQL Server',
            sqlite: 'SQLite',
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
        present: '現在',
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
