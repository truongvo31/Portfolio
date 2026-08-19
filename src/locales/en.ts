export default {
  app: {
    title: "Phong's Portfolio",
    home: 'Home',
    resume: 'Resume',
    settings: 'Settings',
    loading: 'Loading application...',
  },

  admin: {
    layout: {
      sidebar: {
        title: 'Portfolio Admin',
        navigation: {
          sessions: 'Sessions',
        },
      },
    },
    page: {
      sessions: {
        pageTitle: 'Sessions',
        description: 'Manage all sessions',
        actions: {
          createSession: 'Create Session',
          deleteSessions: 'Delete Sessions',
        },
        table: {
          ariaLabel: 'Sessions table',
          columns: {
            no: 'No.',
            id: 'Session ID',
            revoked: 'Revoked',
            expiresAt: 'Expires At',
            actions: 'Actions',
          },
          values: {
            yes: 'Yes',
            no: 'No',
          },
        },
        dialog: {
          title: {
            create: 'Create Session',
            edit: 'Edit Session',
          },
          labels: {
            id: 'Session ID',
            createdAt: 'Created At',
            expiresAt: 'Expires At',
            revoked: 'Revoked',
            revokedAt: 'Revoked At',
            span: 'Session Span',
            spanUnit: 'Span Unit',
            description: 'Session Description',
          },
          placeholders: {
            span: 'Enter span',
            description: 'Enter description',
          },
          units: {
            hours: 'Hour',
            days: 'Day',
          },
          buttons: {
            submit: 'OK',
            cancel: 'Cancel',
          },
        },
        messages: {
          fetchFailed: 'Failed to fetch sessions',
          updateSuccess: 'Session updated successfully',
          deleteTitle: 'Delete Sessions',
          deleteBody:
            'This action will delete all revoked and expired sessions. Are you sure you want to proceed?',
          deleteEmptyTitle: 'No sessions to delete',
          deleteEmptyBody: 'There are no revoked or expired sessions to delete.',
          deleteFailed: 'Failed to delete sessions',
          deleteSuccess: 'Sessions deleted successfully',
          sessionNotFoundTitle: 'Session not found',
          sessionNotFoundBody: 'No session found with ID: {{id}}',
          invalidTitle: 'Session is invalid',
          invalidBody: 'The session is either revoked or expired.',
          clipboardSuccess: 'Session URL copied to clipboard',
          invalidInputTitle: 'Invalid input',
          invalidInputBody: 'Timespan must be greater than 0',
          submitErrorTitle: 'Submit error',
          submitErrorBody: 'Failed to submit session',
        },
      },
    },
  },

  client: {
    home: {
      tableOfContents: {
        title: 'Table of Contents',
        ariaLabel: 'Table of contents',
        introduction: 'Introduction',
        skills: {
          title: 'Skills',
          programming: 'Programming Languages',
          frameworks: 'Frameworks',
          databases: 'Databases',
          languages: 'Languages',
        },
        workHistory: {
          title: 'Work Experience',
          hitachi: 'Hitachi High-Tech',
          fujitec: 'Fujitec',
          usexpress: 'US Express',
          hoangphuc: 'Hoang Phuc International',
        },
        education: {
          title: 'Education',
          tdtu: 'Ton Duc Thang University',
          futaba: 'Futaba Japanese Language School',
        },
        projects: {
          title: 'Projects',
          portfolio: 'Portfolio Website',
          pokedex: 'Pokedex',
        },
      },
      sections: {
        skills: 'Skills',
        workHistory: 'Work History',
        educations: 'Educations',
      },
      education: {
        labels: {
          department: 'Dept',
          field: 'Field',
          degree: 'Degree',
          duration: 'Duration',
          present: 'Present',
        },
        items: {
          futaba: {
            school: 'Futaba Japanese School',
            department: 'Japanese',
            degree: 'JLPT N3',
          },
          tdtu: {
            school: 'Ton Duc Thang University',
            department: 'Faculty of Mathematics and Statistics',
            field: 'Applied Mathematics',
            degree: 'Bachelor of Science',
            url: 'https://tdtu.edu.vn/',
          },
        },
      },
      introduction: {
        heading: "Hello, I'm Phong Nguyen",
        description:
          "I'm a curious designer and developer based in Ibaraki, Japan. I love learning new things and exploring new technologies.",
        cta: 'Feel free to check out my GitHub and Facebook profiles or send me an email below.',
        social: {
          github: 'GitHub',
          facebook: 'Facebook',
          email: 'Email',
        },
        avatarAlt: 'Portrait of Phong Nguyen',
      },
      skills: {
        tabs: {
          programming: {
            name: 'Programming',
          },
          frameworks: {
            name: 'Frameworks',
          },
          databases: {
            name: 'Databases',
          },
          languages: {
            name: 'Languages',
          },
        },
        programming: {
          levels: {
            100: 'Proficient',
            75: 'Experienced',
            50: 'Intermediate',
            25: 'Beginner',
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
            vietnamese: 'Vietnamese - Native',
            english: 'English - TOEIC 770',
            japanese: 'Japanese - JLPT N3',
          },
        },
      },
      workHistory: {
        warning: {
          multipleCurrent:
            'There are multiple current work history items. Only the first one will be displayed.',
        },
        disclaimer: {
          label: 'Important:',
          text: 'All trademarks and logos are the property of their respective owners.',
        },
        present: 'Present',
        card: {
          logoAlt: '{{company}} Logo',
          present: 'Present',
        },
        items: {
          hitachi: {
            company: 'Hitachi High-Tech',
            position: 'Software Engineer',
          },
          fujitec: {
            company: 'Fujitec',
            position: 'Software Engineer',
          },
          usexpress: {
            company: 'US Express',
            position: 'Full Stack Developer',
          },
          hoangphuc: {
            company: 'Hoang Phuc International',
            position: 'Web Administrator',
          },
        },
      },
    },
  },

  settings: {
    title: 'Settings',
    description: 'Manage your application settings',
    appearance: 'Appearance',
    theme: 'Theme',
    themeDescription: 'Choose a light or dark theme for the application interface.',
    themeOptions: {
      light: 'Light',
      dark: 'Dark',
      system: 'System Default',
    },
    language: 'Language',
    languageDescription: 'Choose your preferred language for the application interface.',
    languageOptions: {
      en: 'English',
      ja: 'Japanese',
      vi: 'Vietnamese',
    },
  },
};
