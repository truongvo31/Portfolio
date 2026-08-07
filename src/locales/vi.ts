export default {
  app: {
    title: 'Portfolio của Phong',
    home: 'Trang chủ',
    resume: 'Hồ sơ',
    settings: 'Cài đặt',
    loading: 'Đang tải ứng dụng...',
  },

  home: {
    sections: {
      skills: 'Kỹ năng',
      workHistory: 'Kinh nghiệm làm việc',
      education: 'Học vấn',
    },
    education: {
      labels: {
        department: 'Khoa',
        field: 'Chuyên ngành',
        degree: 'Bằng cấp',
        duration: 'Thời gian',
        present: 'Hiện tại',
      },
      items: {
        futaba: {
          school: 'Trường Nhật ngữ Futaba',
          department: 'Tiếng Nhật',
          degree: 'JLPT N3',
        },
        tdtu: {
          school: 'Đại học Tôn Đức Thắng',
          department: 'Khoa Toán và Thống kê',
          field: 'Toán ứng dụng',
          degree: 'Cử nhân Khoa học',
          url: 'https://tdtu.edu.vn/',
        },
      },
    },
    introduction: {
      heading: 'Xin chào, tôi là Phong Nguyen',
      description:
        'Tôi là một nhà thiết kế và lập trình viên ham học hỏi, hiện sống tại Ibaraki, Nhật Bản. Tôi thích học những điều mới và khám phá công nghệ mới.',
      cta: 'Bạn có thể xem hồ sơ GitHub, Facebook hoặc gửi email cho tôi ở bên dưới.',
      social: {
        github: 'GitHub',
        facebook: 'Facebook',
        email: 'Email',
      },
      avatarAlt: 'Ảnh chân dung của Phong Nguyen',
    },
    skills: {
      tabs: {
        programming: {
          name: 'Lập trình',
        },
        frameworks: {
          name: 'Framework',
        },
        databases: {
          name: 'Cơ sở dữ liệu',
        },
        languages: {
          name: 'Ngôn ngữ',
        },
      },
      programming: {
        items: {
          csharp: 'C# - Thành thạo',
          typescript: 'TypeScript - Thành thạo',
          cplusplus: 'C++ - Có kinh nghiệm',
          visualbasic: 'VB - Có kinh nghiệm',
          pascal: 'Pascal - Có kinh nghiệm',
          python: 'Python - Cơ bản',
        },
      },
      frameworks: {
        items: {
          dotnet: '.NET - Thành thạo',
          aras: 'Aras - Thành thạo',
          nuxt: 'Nuxt - Thành thạo',
          react: 'React - Khá',
          winui: 'WinUI - Khá',
        },
      },
      databases: {
        items: {
          postgres: 'PostgreSQL - Có kinh nghiệm',
          oracle: 'Oracle - Có kinh nghiệm',
          sqlserver: 'SQL Server - Có kinh nghiệm',
          sqlite: 'SQLite - Khá',
        },
      },
      languages: {
        items: {
          vietnamese: 'Tiếng Việt - Bản ngữ',
          english: 'Tiếng Anh - TOEIC 770',
          japanese: 'Tiếng Nhật - JLPT N3',
        },
      },
    },
    workHistory: {
      warning: {
        multipleCurrent: 'Có nhiều mục công việc hiện tại. Chỉ mục đầu tiên sẽ được hiển thị.',
      },
      disclaimer: {
        label: 'Chú ý:',
        text: 'Tất cả thương hiệu và logo là tài sản của chủ sở hữu tương ứng.',
      },
      card: {
        logoAlt: 'Logo của {{company}}',
        present: 'Hiện tại',
      },
      items: {
        hitachi: {
          company: 'Hitachi High-Tech',
          position: 'Kỹ sư phần mềm',
          description:
            'Tham gia các dự án phát triển phần mềm và tích hợp hệ thống, đặc biệt tập trung vào phát triển Aras Innovator.',
        },
        fujitec: {
          company: 'Fujitec',
          position: 'Kỹ sư phần mềm',
          description:
            'Tham gia các dự án phát triển phần mềm và tích hợp hệ thống, chủ yếu tập trung vào phát triển và bảo trì hệ thống PLM bằng Nuxt và .NET.',
        },
        usexpress: {
          company: 'US Express',
          position: 'Lập trình viên Full Stack',
          description: 'Phát triển và bảo trì các ứng dụng web phục vụ khách hàng của công ty.',
        },
        hoangphuc: {
          company: 'Hoang Phuc International',
          position: 'Quản trị viên Web',
          description: 'Quản lý website công ty và các công việc quản trị liên quan đến web.',
        },
      },
    },
  },

  settings: {
    title: 'Cài đặt',
    description: 'Quản lý cài đặt ứng dụng của bạn',
    appearance: 'Giao diện',
    theme: 'Chủ đề',
    themeDescription: 'Chọn giao diện sáng hoặc tối cho ứng dụng.',
    themeOptions: {
      light: 'Sáng',
      dark: 'Tối',
      system: 'Theo hệ thống',
    },
    language: 'Ngôn ngữ',
    languageDescription: 'Chọn ngôn ngữ hiển thị bạn muốn dùng cho ứng dụng.',
    languageOptions: {
      en: 'Tiếng Anh',
      ja: 'Tiếng Nhật',
      vi: 'Tiếng Việt',
    },
  },
};
