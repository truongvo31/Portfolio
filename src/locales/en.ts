export default {
  app: {
    title: "Phong's Portfolio",
    home: 'Home',
    resume: 'Resume',
    settings: 'Settings',
    loading: 'Loading application...',
  },

  home: {
    sections: {
      skills: 'Skills',
      workHistory: 'Work History',
      education: 'Education',
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
        items: {
          csharp: 'C# - Proficient',
          typescript: 'TypeScript - Proficient',
          cplusplus: 'C++ - Experienced',
          visualbasic: 'VB - Experienced',
          pascal: 'Pascal - Experienced',
          python: 'Python - Beginner',
        },
      },
      frameworks: {
        items: {
          dotnet: '.NET - Proficient',
          aras: 'Aras - Proficient',
          nuxt: 'Nuxt - Proficient',
          react: 'React - Intermediate',
          winui: 'WinUI - Intermediate',
        },
      },
      databases: {
        items: {
          postgres: 'PostgreSQL - Experienced',
          oracle: 'Oracle - Experienced',
          sqlserver: 'SQL Server - Experienced',
          sqlite: 'SQLite - Intermediate',
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
      card: {
        logoAlt: '{{company}} Logo',
        present: 'Present',
      },
      items: {
        hitachi: {
          company: 'Hitachi High-Tech',
          position: 'Software Engineer',
          description:
            'Worked on projects involving software development and system integration, with a strong focus on Aras Innovator development.',
        },
        fujitec: {
          company: 'Fujitec',
          position: 'Software Engineer',
          description:
            'Worked on software development and system integration projects, mainly focused on PLM system development and maintenance using Nuxt and .NET.',
        },
        usexpress: {
          company: 'US Express',
          position: 'Full Stack Developer',
          description: "Developed and maintained web applications for the company's customers.",
        },
        hoangphuc: {
          company: 'Hoang Phuc International',
          position: 'Web Administrator',
          description: 'Managed the company website and web-related administrative tasks.',
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
