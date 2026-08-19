export default {
  app: {
    title: 'Portfolio của Phong',
    home: 'Trang chủ',
    resume: 'Hồ sơ',
    settings: 'Cài đặt',
    loading: 'Đang tải ứng dụng...',
  },

  admin: {
    layout: {
      sidebar: {
        title: 'Quản trị Portfolio',
        navigation: {
          sessions: 'Phiên làm việc',
        },
      },
    },
    page: {
      sessions: {
        pageTitle: 'Phiên làm việc',
        description: 'Quản lý tất cả phiên làm việc',
        actions: {
          createSession: 'Tạo phiên làm việc',
          deleteSessions: 'Xóa phiên làm việc',
        },
        table: {
          ariaLabel: 'Bảng phiên làm việc',
          columns: {
            no: 'STT',
            id: 'ID phiên',
            revoked: 'Đã thu hồi',
            expiresAt: 'Hết hạn',
            actions: 'Hành động',
          },
          values: {
            yes: 'Có',
            no: 'Không',
          },
        },
        dialog: {
          title: {
            create: 'Tạo phiên làm việc',
            edit: 'Chỉnh sửa phiên làm việc',
          },
          labels: {
            id: 'ID phiên',
            createdAt: 'Ngày tạo',
            expiresAt: 'Ngày hết hạn',
            revoked: 'Đã thu hồi',
            revokedAt: 'Ngày thu hồi',
            span: 'Khoảng thời gian',
            spanUnit: 'Đơn vị thời gian',
            description: 'Mô tả phiên',
          },
          placeholders: {
            span: 'Nhập khoảng thời gian',
            description: 'Nhập mô tả',
          },
          units: {
            hours: 'Giờ',
            days: 'Ngày',
          },
          buttons: {
            submit: 'OK',
            cancel: 'Hủy',
          },
        },
        messages: {
          fetchFailed: 'Không thể tải phiên làm việc',
          updateSuccess: 'Cập nhật phiên làm việc thành công',
          deleteTitle: 'Xóa phiên làm việc',
          deleteBody:
            'Hành động này sẽ xóa tất cả các phiên đã thu hồi và hết hạn. Bạn có chắc chắn muốn tiếp tục không?',
          deleteEmptyTitle: 'Không có phiên nào để xóa',
          deleteEmptyBody: 'Không có phiên nào đã thu hồi hoặc hết hạn để xóa.',
          deleteFailed: 'Không thể xóa phiên làm việc',
          deleteSuccess: 'Xóa phiên làm việc thành công',
          sessionNotFoundTitle: 'Không tìm thấy phiên',
          sessionNotFoundBody: 'Không tìm thấy phiên với ID: {{id}}',
          invalidTitle: 'Phiên không hợp lệ',
          invalidBody: 'Phiên này đã bị thu hồi hoặc hết hạn.',
          clipboardSuccess: 'URL phiên đã được sao chép vào clipboard',
          invalidInputTitle: 'Dữ liệu không hợp lệ',
          invalidInputBody: 'Khoảng thời gian phải lớn hơn 0',
          submitErrorTitle: 'Lỗi gửi dữ liệu',
          submitErrorBody: 'Không thể gửi phiên làm việc',
        },
      },
    },
  },

  client: {
    home: {
      tableOfContents: {
        title: 'Mục lục',
        ariaLabel: 'Mục lục',
        introduction: 'Giới thiệu',
        skills: {
          title: 'Kỹ năng',
          programming: 'Ngôn ngữ lập trình',
          frameworks: 'Framework',
          databases: 'Cơ sở dữ liệu',
          languages: 'Ngôn ngữ',
        },
        workHistory: {
          title: 'Kinh nghiệm làm việc',
          hitachi: 'Hitachi High-Tech',
          fujitec: 'Fujitec',
          usexpress: 'US Express',
          hoangphuc: 'Hoang Phuc International',
        },
        education: {
          title: 'Học vấn',
          tdtu: 'Đại học Tôn Đức Thắng',
          futaba: 'Trường Nhật ngữ Futaba',
        },
        projects: {
          title: 'Dự án',
          portfolio: 'Portfolio',
          pokedex: 'Pokedex',
        },
      },
      sections: {
        skills: 'Kỹ năng',
        workHistory: 'Kinh nghiệm làm việc',
        educations: 'Học vấn',
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
          levels: {
            100: 'Thành thạo',
            75: 'Có kinh nghiệm',
            50: 'Khá',
            25: 'Cơ bản',
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
        present: 'Hiện tại',
        card: {
          logoAlt: 'Logo của {{company}}',
          present: 'Hiện tại',
        },
        items: {
          hitachi: {
            company: 'Hitachi High-Tech',
            position: 'Kỹ sư phần mềm',
          },
          fujitec: {
            company: 'Fujitec',
            position: 'Kỹ sư phần mềm',
          },
          usexpress: {
            company: 'US Express',
            position: 'Lập trình viên Full Stack',
          },
          hoangphuc: {
            company: 'Hoang Phuc International',
            position: 'Quản trị viên Web',
          },
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
