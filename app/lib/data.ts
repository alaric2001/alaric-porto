import type { PortfolioData } from "@/app/types";

export const portfolioData: PortfolioData = {
  profile: {
    name: "Alaric Rasendriya Aniko",
    location: "Kabupaten Bogor, Jawa Barat",
    phone: "+6281290482972",
    email: "alaric2001ra@gmail.com",
    summary:
      "Fullstack Developer adaptif dengan latar belakang pendidikan S2 Sistem Informasi. Memiliki keahlian mendalam dalam pengembangan aplikasi web dan mobile menggunakan ekosistem JavaScript (React.js, Node.js) dan PHP (Laravel). Berpengalaman dalam membangun solusi digital mulai dari platform e-commerce hingga dashboard monitoring kesehatan berskala riset universitas.",
    summaryEn:
      "Adaptive Fullstack Developer with an M.Sc. background in Information Systems. Proficient in JavaScript (React.js, Node.js) and PHP (Laravel) ecosystems. Experienced in building digital solutions ranging from e-commerce platforms to university-scale health monitoring dashboards backed by peer-reviewed research.",
    links: {
      linkedin: "https://linkedin.com/in/alaric01",
      github: "https://github.com/alaric2001",
      gitlab: "https://gitlab.com/alaric2001ra",
      whatsapp: "https://wa.me/+6281290482972",
    },
  },

  skills: [
    {
      category: "Bahasa Pemrograman",
      categoryEn: "Programming Languages",
      icon: "Code2",
      items: ["JavaScript", "TypeScript", "PHP", "Python"],
    },
    {
      category: "Frontend",
      categoryEn: "Frontend",
      icon: "Monitor",
      items: ["React.js", "Next.js", "React Native", "PWA", "Tailwind CSS", "HTML/CSS"],
    },
    {
      category: "Backend",
      categoryEn: "Backend",
      icon: "Server",
      items: ["Laravel", "Express.js", "Node.js", "RESTful API"],
    },
    {
      category: "Cloud & Tools",
      categoryEn: "Cloud & Tools",
      icon: "Cloud",
      items: [
        "AWS (EC2, Lambda, API Gateway, CloudWatch)",
        "Google Cloud (Run API, Build API)",
        "Claude Code",
        "Git / GitHub / GitLab",
        "MySQL",
        "Cpanel",
        "Jira",
      ],
    },
  ],

  experiences: [
    {
      id: "exp-telkom",
      company: "Telkom University",
      location: "Bandung, Jawa Barat",
      role: "Asisten Dosen & Asisten Praktikum",
      roleEn: "Teaching Assistant & Lab Instructor",
      period: "Maret 2025 – Juni 2025",
      bullets: [
        "Membimbing mahasiswa dalam implementasi teknis pengembangan aplikasi menggunakan framework Laravel.",
        "Mengarahkan mahasiswa dalam manajemen proyek perangkat lunak menggunakan Jira untuk memastikan alur kerja yang terorganisir.",
        "Memastikan seluruh siklus SDLC yang dikerjakan mahasiswa berjalan sesuai standar industri.",
      ],
      bulletsEn: [
        "Guided students through hands-on implementation of web applications using the Laravel framework.",
        "Directed students in software project management using Jira to ensure organized and industry-aligned workflows.",
        "Ensured the full SDLC carried out by students adhered to professional industry standards.",
      ],
    },
    {
      id: "exp-metamata",
      company: "PT Meta Mata Indonesia",
      location: "Kebayoran Lama, Jakarta Selatan",
      role: "Full-stack Developer Intern",
      roleEn: "Full-stack Developer Intern",
      period: "Juli 2022 – Oktober 2022",
      bullets: [
        "Berkontribusi dalam pengembangan fitur aplikasi web menggunakan stack Full-stack untuk mendukung operasional bisnis perusahaan.",
        "Bekerja sama dengan tim pengembang untuk melakukan debugging dan optimasi performa kode.",
        "Mengintegrasikan API frontend dengan database backend untuk memastikan alur data yang sinkron.",
      ],
      bulletsEn: [
        "Contributed to web application feature development using a full-stack approach to support business operations.",
        "Collaborated with the development team on debugging and code performance optimization.",
        "Integrated frontend APIs with the backend database to ensure synchronized data flow.",
      ],
    },
  ],

  projects: [
    {
      id: "flowbeat",
      title: "FlowBeat",
      subtitle: "Sistem Pemantauan BPM & SpO2 Lansia",
      subtitleEn: "Elderly BPM & SpO2 Real-Time Monitoring System",
      role: "Fullstack Mobile Developer",
      roleEn: "Fullstack Mobile Developer",
      period: "Januari 2025 – November 2025",
      bullets: [
        "Membangun sistem pemantauan kesehatan real-time untuk mengukur detak jantung (BPM) dan kadar oksigen (SpO2) bagi pasien lansia.",
        "Mengembangkan aplikasi React Native + Express.js dengan arsitektur microservice dan integrasi sensor IoT via Bluetooth Low Energy.",
        "Melakukan System Usability Scale testing dengan skor SUS rata-rata 82.5 (Grade B — Excellent).",
      ],
      bulletsEn: [
        "Built a real-time health monitoring system measuring heart rate (BPM) and blood oxygen (SpO2) for elderly patients.",
        "Developed a React Native + Express.js application with microservice architecture and IoT sensor integration via Bluetooth Low Energy.",
        "Conducted System Usability Scale (SUS) testing achieving an average score of 82.5 (Grade B — Excellent).",
      ],
      stack: ["React Native", "Express.js", "MySQL", "AWS EC2", "IoT / BLE"],
      docsKey: "flowbeat",
    },
    {
      id: "seteguk-kopi",
      title: "Seteguk Kopi",
      subtitle: "E-Commerce & Progressive Web App",
      subtitleEn: "E-Commerce & Progressive Web App",
      role: "Lead Fullstack Developer",
      roleEn: "Lead Fullstack Developer",
      period: "Februari 2024 – September 2025",
      bullets: [
        "Membangun platform penjualan kopi berbasis Laravel 10 dengan fitur PWA untuk aksesibilitas optimal di perangkat mobile.",
        "Mengembangkan sistem pemesanan end-to-end dengan real-time order tracking dan notifikasi push.",
        "Mengimplementasikan sistem manajemen inventori, laporan penjualan, dan dashboard admin.",
      ],
      bulletsEn: [
        "Built a Laravel 10-based coffee e-commerce platform with PWA features for optimal mobile accessibility.",
        "Developed an end-to-end ordering system with real-time order tracking and push notifications.",
        "Implemented inventory management, sales reporting, and an admin dashboard.",
      ],
      stack: ["Laravel 10", "PWA", "MySQL", "Tailwind CSS", "Caching"],
      url: "https://alaric2001.github.io/deploykopi/",
      docsKey: "seteguk",
    },
    {
      id: "covid-dashboard",
      title: "Dashboard Covid-19",
      subtitle: "Monitoring Pasien Rawat Inap — Riset Telkom University",
      subtitleEn: "Inpatient Monitoring Dashboard — Telkom University Research",
      role: "Front-end Developer",
      roleEn: "Front-end Developer",
      period: "Agustus 2023 – September 2023",
      bullets: [
        "Mengembangkan antarmuka dashboard monitoring untuk pasien rawat inap rumah sakit menggunakan React.js.",
        "Memvisualisasikan data medis (BPM, SpO2, suhu) ke dalam komponen UI intuitif untuk tenaga medis.",
        "Dipublikasikan dalam konferensi internasional INOCON 2024 — terindeks IEEE Scopus.",
      ],
      bulletsEn: [
        "Developed a monitoring dashboard UI for hospital inpatients using React.js.",
        "Visualized medical data (BPM, SpO2, temperature) into intuitive UI components for healthcare staff.",
        "Published in the INOCON 2024 international conference — indexed by IEEE Scopus.",
      ],
      stack: ["React.js", "REST API", "Tailwind CSS", "Chart.js"],
      url: "https://dashboard-monitoring-covid.vercel.app/",
      docsKey: "covid",
    },
  ],

  architectures: {
    flowbeat: {
      title: "FlowBeat — Arsitektur Sistem",
      titleEn: "FlowBeat — System Architecture",
      description:
        "Sistem IoT real-time untuk monitoring detak jantung (BPM) dan kadar oksigen darah (SpO2) lansia berbasis React Native + Express.js.",
      descriptionEn:
        "Real-time IoT system for monitoring elderly heart rate (BPM) and blood oxygen (SpO2) built on React Native + Express.js.",
      layers: [
        {
          label: "IoT Layer",
          labelEn: "IoT Layer",
          tech: ["MAX30102 Sensor", "ESP32 MCU", "Bluetooth Low Energy (BLE)"],
          description:
            "Sensor MAX30102 membaca data BPM & SpO2 kemudian mentransmisikan via BLE ke perangkat mobile.",
          descriptionEn:
            "The MAX30102 sensor reads BPM & SpO2 data and transmits it via BLE to the mobile device.",
        },
        {
          label: "Mobile App Layer",
          labelEn: "Mobile App Layer",
          tech: ["React Native", "BLE Manager", "React Navigation", "AsyncStorage"],
          description:
            "Aplikasi React Native menerima data BLE, menampilkan grafik real-time, dan mengirim ke backend via REST API.",
          descriptionEn:
            "The React Native app receives BLE data, renders real-time graphs, and sends readings to the backend via REST API.",
        },
        {
          label: "Backend API Layer",
          labelEn: "Backend API Layer",
          tech: ["Express.js", "Node.js", "JWT Auth", "Socket.IO"],
          description:
            "REST API Express.js menerima dan menyimpan data sensor, mengelola autentikasi pasien/dokter, dan menyediakan endpoint analytics.",
          descriptionEn:
            "The Express.js REST API receives and stores sensor data, manages patient/doctor authentication, and provides analytics endpoints.",
        },
        {
          label: "Data Layer",
          labelEn: "Data Layer",
          tech: ["MySQL", "AWS EC2/Lightsail", "CloudWatch", "Backup S3"],
          description:
            "Database MySQL di-deploy di AWS EC2, dengan monitoring CloudWatch dan backup otomatis ke S3.",
          descriptionEn:
            "MySQL database deployed on AWS EC2, with CloudWatch monitoring and automated S3 backups.",
        },
      ],
      dataFlow: [
        "Sensor membaca BPM & SpO2 setiap 1 detik",
        "ESP32 mem-broadcast data via BLE Advertisement",
        "React Native menerima & memvalidasi data sensor",
        "App mengirim POST /api/readings ke Express.js",
        "Express.js menyimpan ke MySQL & meng-trigger alert jika abnormal",
        "Dokter menerima notifikasi push real-time",
      ],
      dataFlowEn: [
        "Sensor reads BPM & SpO2 every 1 second",
        "ESP32 broadcasts data via BLE Advertisement",
        "React Native receives & validates sensor data",
        "App sends POST /api/readings to Express.js",
        "Express.js saves to MySQL & triggers alert if abnormal",
        "Doctor receives real-time push notification",
      ],
      highlights: [
        "SUS Score: 82.5 / 100 (Grade B — Excellent)",
        "Latency BLE ke UI: < 200ms",
        "Uptime server AWS: 99.7%",
        "Dipublikasikan di Jurnal Nasional JNTETI (Sinta 2)",
      ],
      highlightsEn: [
        "SUS Score: 82.5 / 100 (Grade B — Excellent)",
        "BLE to UI latency: < 200ms",
        "AWS server uptime: 99.7%",
        "Published in National Journal JNTETI (Sinta 2)",
      ],
    },
    seteguk: {
      title: "Seteguk Kopi — Arsitektur Laravel 10 + PWA",
      titleEn: "Seteguk Kopi — Laravel 10 + PWA Architecture",
      description:
        "Platform e-commerce kopi berbasis Laravel 10 dengan Progressive Web App untuk pengalaman mobile-native tanpa app store.",
      descriptionEn:
        "Laravel 10-based coffee e-commerce platform with Progressive Web App for a native-like mobile experience without an app store.",
      layers: [
        {
          label: "PWA Layer",
          labelEn: "PWA Layer",
          tech: ["Service Worker", "Web App Manifest", "Cache API", "Push API"],
          description:
            "Service Worker mengelola cache strategi, memungkinkan offline browsing dan notifikasi push.",
          descriptionEn:
            "Service Worker manages caching strategies, enabling offline browsing and push notifications.",
        },
        {
          label: "Frontend Layer",
          labelEn: "Frontend Layer",
          tech: ["Blade Templates", "Alpine.js", "Tailwind CSS", "Livewire"],
          description:
            "UI responsif menggunakan Blade dengan Alpine.js untuk reaktivitas ringan dan Livewire untuk komponen dinamis.",
          descriptionEn:
            "Responsive UI using Blade with Alpine.js for lightweight reactivity and Livewire for dynamic components.",
        },
        {
          label: "Backend Layer",
          labelEn: "Backend Layer",
          tech: ["Laravel 10", "Sanctum Auth", "Eloquent ORM", "Queue/Jobs"],
          description:
            "Laravel 10 mengelola autentikasi (Sanctum), manajemen pesanan, pembayaran, dan queue untuk notifikasi.",
          descriptionEn:
            "Laravel 10 handles authentication (Sanctum), order management, payments, and job queues for notifications.",
        },
        {
          label: "Data & Storage Layer",
          labelEn: "Data & Storage Layer",
          tech: ["MySQL", "Laravel Cache", "File Storage", "Cpanel Hosting"],
          description:
            "MySQL dengan Eloquent ORM, Laravel cache untuk performa, dan file storage terkelola untuk gambar produk.",
          descriptionEn:
            "MySQL with Eloquent ORM, Laravel cache for performance, and managed file storage for product images.",
        },
      ],
      dataFlow: [
        "User membuka PWA — Service Worker memeriksa cache",
        "Produk di-load dari cache (offline) atau API (online)",
        "User menambahkan ke cart — Livewire mengupdate tanpa reload",
        "Checkout: validasi stok via Eloquent, buat Order record",
        "Payment gateway dikonfirmasi → status pesanan diupdate",
        "Notifikasi push dikirim via Service Worker ke user",
      ],
      dataFlowEn: [
        "User opens PWA — Service Worker checks cache",
        "Products loaded from cache (offline) or API (online)",
        "User adds to cart — Livewire updates without page reload",
        "Checkout: stock validation via Eloquent, Order record created",
        "Payment gateway confirmed → order status updated",
        "Push notification sent via Service Worker to user",
      ],
      highlights: [
        "Lighthouse PWA Score: 92/100",
        "First Contentful Paint: < 1.2s",
        "Offline-capable browsing dan order tracking",
        "Admin dashboard dengan laporan penjualan real-time",
      ],
      highlightsEn: [
        "Lighthouse PWA Score: 92/100",
        "First Contentful Paint: < 1.2s",
        "Offline-capable browsing and order tracking",
        "Admin dashboard with real-time sales reporting",
      ],
    },
    covid: {
      title: "Dashboard Covid-19 — Arsitektur Monitoring",
      titleEn: "Covid-19 Dashboard — Monitoring Architecture",
      description:
        "Dashboard React.js untuk monitoring pasien rawat inap Covid-19, bagian dari proyek riset Telkom University.",
      descriptionEn:
        "React.js dashboard for monitoring Covid-19 inpatients, part of a Telkom University research project.",
      layers: [
        {
          label: "Visualization Layer",
          labelEn: "Visualization Layer",
          tech: ["React.js", "Chart.js", "Recharts", "Real-time Polling"],
          description:
            "Komponen React menampilkan grafik vital signs dengan polling setiap 5 detik.",
          descriptionEn:
            "React components display vital sign charts with 5-second polling intervals.",
        },
        {
          label: "State & Data Layer",
          labelEn: "State & Data Layer",
          tech: ["React Context", "SWR", "REST API", "JSON"],
          description:
            "SWR untuk data fetching dengan revalidasi otomatis, Context API untuk state pasien aktif.",
          descriptionEn:
            "SWR for data fetching with automatic revalidation, Context API for active patient state.",
        },
        {
          label: "Backend Integration",
          labelEn: "Backend Integration",
          tech: ["REST API", "Node.js", "MySQL", "Express.js"],
          description:
            "Integrasi dengan API backend rumah sakit yang menyediakan data sensor medis per pasien.",
          descriptionEn:
            "Integration with hospital backend API providing per-patient medical sensor data.",
        },
      ],
      dataFlow: [
        "Sensor medis mengirim data ke API backend tiap 5 detik",
        "Dashboard melakukan polling GET /api/patients/:id/vitals",
        "React mengupdate state dan merender ulang grafik",
        "Alert otomatis jika BPM < 50 atau SpO2 < 90",
        "Perawat menerima notifikasi visual/audio di dashboard",
      ],
      dataFlowEn: [
        "Medical sensors send data to backend API every 5 seconds",
        "Dashboard polls GET /api/patients/:id/vitals",
        "React updates state and re-renders charts",
        "Automatic alert if BPM < 50 or SpO2 < 90",
        "Nurse receives visual/audio notification on dashboard",
      ],
      highlights: [
        "Dipublikasikan di INOCON 2024 — IEEE Scopus",
        "Mendukung monitoring 20+ pasien secara simultan",
        "Alert threshold yang dapat dikonfigurasi per pasien",
        "Responsif untuk tablet (digunakan di ruang perawat)",
      ],
      highlightsEn: [
        "Published at INOCON 2024 — IEEE Scopus",
        "Supports simultaneous monitoring of 20+ patients",
        "Configurable alert thresholds per patient",
        "Responsive for tablet use at nurses' stations",
      ],
    },
  },

  publications: [
    {
      id: "pub-1",
      title: "Python-Based Backend Architecture Design for Commercial Medical IoT Device Integration: A Case Study of Omron HEM-7142T1",
      journal: "Indonesian Journal of Electronics, Electromedical Engineering, and Medical Informatics",
      year: 2025,
      indexing: "Sinta 2",
      url: "https://ijeeemi.org/index.php/ijeeemi/article/view/331",
    },
    {
      id: "pub-2",
      title: "User Experience Development in Elderly Heart Patient Monitoring System",
      journal: "Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI) — UGM",
      year: 2025,
      indexing: "Sinta 2",
      url: "https://journal.ugm.ac.id/v3/JNTETI/article/view/18783",
    },
    {
      id: "pub-3",
      title: "A Systematic Review of Smart Grid Information Systems for Integrating Renewable Energy in Urban Environments",
      journal: "2025 International Electronics Symposium (IES)",
      year: 2025,
      indexing: "IEEE Scopus",
      url: "https://ieeexplore.ieee.org/document/11160915",
    },
    {
      id: "pub-4",
      title: "Examining the Role of Fintech Adoption in Driving Growth and Innovation in the Halal Economy: A Systematic Review",
      journal: "2024 International Conference on ICT for Smart Society (ICISS)",
      year: 2024,
      indexing: "IEEE Scopus",
      url: "https://ieeexplore.ieee.org/document/10751516",
    },
    {
      id: "pub-5",
      title: "Application of User Experience Method to Determine User Requirements in Remote Patient Monitoring Systems: Systematic Literature Review",
      journal: "2024 International Conference on ICT for Smart Society (ICISS)",
      year: 2024,
      indexing: "IEEE Scopus",
      url: "https://ieeexplore.ieee.org/document/10751221",
    },
    {
      id: "pub-6",
      title: "Use of the Usability Scale System as a Monitoring Dashboard Test for Inpatient Covid-19 Patients in Hospitals",
      journal: "2024 3rd International Conference for Innovation in Technology (INOCON)",
      year: 2024,
      indexing: "IEEE Scopus",
      url: "https://ieeexplore.ieee.org/document/10511499",
    },
  ],

  certifications: [
    {
      id: "cert-ibm",
      title: "Code Generation and Optimization Using IBM Granite",
      issuer: "IBM",
      date: "Agustus 2025",
      description:
        "Sertifikasi dalam pembuatan dan optimasi kode menggunakan model AI IBM Granite untuk meningkatkan produktivitas pengembangan perangkat lunak.",
      descriptionEn:
        "Certification in code generation and optimization using IBM Granite AI model to improve software development productivity.",
      credentialUrl: "https://drive.google.com/drive/u/1/folders/1cF__vU6buQV8wLu8hd_SB_ecxSDPbEOA",
      badge: "AI",
    },
    {
      id: "cert-react",
      title: "React Js Web Frontend",
      issuer: "Sanbercode Bootcamp",
      date: "Februari 2023",
      description:
        "Pelatihan intensif pengembangan frontend modern menggunakan React.js, mencakup hooks, state management, dan integrasi REST API.",
      descriptionEn:
        "Intensive modern frontend development training using React.js, covering hooks, state management, and REST API integration.",
      credentialUrl: "https://drive.google.com/drive/u/1/folders/1cF__vU6buQV8wLu8hd_SB_ecxSDPbEOA",
      badge: "React",
    },
    {
      id: "cert-bnsp",
      title: "Web Developer",
      issuer: "BNSP / Lembaga Sertifikasi Profesi",
      date: "Desember 2022",
      description:
        "Sertifikasi profesional Web Developer dari BNSP yang mengakui kompetensi pengembangan aplikasi web sesuai standar nasional Indonesia.",
      descriptionEn:
        "Professional Web Developer certification from BNSP (National Professional Certification Board), validating web development competencies against Indonesian national standards.",
      credentialUrl: "https://drive.google.com/drive/u/1/folders/1cF__vU6buQV8wLu8hd_SB_ecxSDPbEOA",
      badge: "BNSP",
    },
    {
      id: "cert-fullstack",
      title: "Fullstack Laravel React JS",
      issuer: "BuildWith Angga",
      date: "Juli 2022",
      description:
        "Kursus fullstack pengembangan aplikasi web menggunakan Laravel sebagai backend REST API dan React.js sebagai frontend.",
      descriptionEn:
        "Fullstack web development course using Laravel as a REST API backend and React.js as the frontend.",
      credentialUrl: "https://drive.google.com/drive/u/1/folders/1cF__vU6buQV8wLu8hd_SB_ecxSDPbEOA",
      badge: "Fullstack",
    },
    {
      id: "cert-laravel",
      title: "Laravel Web Development",
      issuer: "Sanbercode Bootcamp",
      date: "Maret 2022",
      description:
        "Pelatihan pengembangan web menggunakan framework Laravel, mencakup MVC pattern, Eloquent ORM, authentication, dan deployment.",
      descriptionEn:
        "Web development training using the Laravel framework, covering MVC pattern, Eloquent ORM, authentication, and deployment.",
      credentialUrl: "https://drive.google.com/drive/u/1/folders/1cF__vU6buQV8wLu8hd_SB_ecxSDPbEOA",
      badge: "Laravel",
    },
  ],

  education: [
    {
      id: "edu-s2",
      degree: "Magister (S2) Sistem Informasi",
      degreeEn: "Master of Science — Information Systems",
      institution: "Telkom University",
      location: "Bandung, Jawa Barat",
      period: "2023 – 2026",
      gpa: "3.61 / 4.00",
    },
    {
      id: "edu-s1",
      degree: "Sarjana (S1) Sistem Informasi",
      degreeEn: "Bachelor of Science — Information Systems",
      institution: "Telkom University",
      location: "Bandung, Jawa Barat",
      period: "2019 – 2023",
      gpa: "3.56 / 4.00",
    },
  ],
};
