/**
 * PT SKILL NUSA INFOTAMA - Official Website Interactive Logic
 * High-performance, zero-dependency Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initSolutionAdvisor();
  initTcoCalculator();
  initPortfolioFilter();
  initContactForm();
  initModal();
  initLanguageToggle();
});

/* ===================================================================
   1. NAVBAR & MOBILE DRAWER
   =================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-drawer .nav-link');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

  // Mobile Drawer Open/Close
  if (mobileToggle && drawer) {
    mobileToggle.addEventListener('click', () => {
      drawer.classList.add('open');
    });
  }

  if (drawerClose && drawer) {
    drawerClose.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  // Close drawer on link click & smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (drawer) drawer.classList.remove('open');
    });
  });

  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  }
}

/* ===================================================================
   2. THEME SWITCHER (DARK / LIGHT MODE)
   =================================================================== */
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('skillnusa_theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('skillnusa_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Mode ${newTheme === 'dark' ? 'Gelap (Dark)' : 'Terang (Light)'} diaktifkan.`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    if (theme === 'light') {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      themeToggle.setAttribute('title', 'Ganti ke Mode Gelap');
    } else {
      themeToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
      themeToggle.setAttribute('title', 'Ganti ke Mode Terang');
    }
  }
}

/* ===================================================================
   3. COMPREHENSIVE BILINGUAL TRANSLATION ENGINE (ID / EN)
   =================================================================== */
const translations = {
  id: {
    // Navigation & Drawer
    nav_home: "Beranda",
    nav_solutions: "Produk & Solusi",
    nav_advisor: "Solution Finder",
    nav_calculator: "Kalkulator TCO",
    nav_portfolio: "Portofolio",
    nav_about: "Tentang Kami",
    nav_contact: "Kontak",
    nav_consult_btn: "Konsultasi IT",
    drawer_quote_btn: "Minta Penawaran",
    drawer_wa_btn: "Hubungi via WhatsApp",
    lang_select_label: "Pilih Bahasa:",

    // Hero
    hero_pill: "🚀 Solusi Total IT & System Network Integration Sejak 1999",
    hero_title: 'Transformasi <span class="gradient-text">Infrastruktur Digital</span> & Solusi IT Total Perusahaan Anda',
    hero_desc: "PT Skill Nusa Infotama menghadirkan System Network Integration, Managed IT Services, Hardware Procurement & Software Architecture berstandar enterprise dengan keandalan tanpa kompromi.",
    hero_btn_explore: "Jelajahi Solusi Kami",
    hero_btn_consult: "Konsultasi Kebutuhan IT",
    stat_years: "Tahun Pengalaman (Est. 1999)",
    stat_projects: "Proyek Enterprise & BUMN",
    stat_uptime: "Jaminan Uptime SLA Jaringan",
    stat_warranty: "Garansi Prinsipal & Spare Part",
    hero_live_title: "Enterprise Core Network",
    hero_live_sub: "Bandung NOC Active • 0.8ms Latency",
    hero_live_sla: "SLA 24/7 Verified",

    // Partners
    partners_title: "Didukung oleh Prinsipal Teknologi Global",

    // Solution Advisor
    advisor_badge: "⚡ Smart Recommendation Engine",
    advisor_title: 'Interactive Enterprise <span class="gradient-text">Solution Advisor</span>',
    advisor_desc: "Pilih sektor industri dan kebutuhan spesifik Anda untuk mendapatkan gambaran arsitektur jaringan, rekomendasi perangkat keras, serta skema layanan yang paling optimal.",
    advisor_step1: "1. Sektor Organisasi",
    advisor_step2: "2. Kebutuhan Utama",
    advisor_step3: "3. Skala Infrastruktur",
    advisor_opt_bumn: "BUMN & Lembaga Pemerintah",
    advisor_opt_hospital: "Rumah Sakit & Fasilitas Kesehatan",
    advisor_opt_edu: "Universitas & Lembaga Pendidikan",
    advisor_opt_manufacturing: "Pabrik & Manufaktur Industri",
    advisor_opt_corporate: "Korporasi Swasta & Finansial",
    advisor_opt_network: "Infrastruktur Jaringan & Data Center",
    advisor_opt_security: "Sistem Keamanan Siber & CCTV AI",
    advisor_opt_managed: "Managed Device Rental & PC Fleet",
    advisor_opt_software: "Software Kustom & Cloud Virtualization",
    advisor_opt_enterprise: "Skala Enterprise Multi-Gedung / Kampus",
    advisor_opt_large: "Skala Menengah (100 - 500 Pengguna)",
    advisor_opt_medium: "Skala Kantor Cabang / Regional ( < 100 User)",
    advisor_rec_title: "Rekomendasi Arsitektur Siap Implementasi",
    advisor_rec_hw: "Rekomendasi Perangkat Utama:",
    advisor_btn_quote: "Ajukan Penawaran Spesifikasi Ini",
    advisor_sla_label: "Standar Layanan:",

    // Solutions
    solutions_badge: "💼 Layanan Komprehensif",
    solutions_title: 'Solusi Teknologi & <span class="gradient-text">Layanan Unggulan</span>',
    solutions_desc: "Kombinasi komprehensif antara perangkat keras bergaransi, integrasi jaringan terstandardisasi, perlindungan siber mutakhir, serta layanan managed services.",
    sol_1_title: "System & Network Integration",
    sol_1_badge: "Core Foundation",
    sol_1_desc: "Perancangan dan penggelaran infrastruktur jaringan end-to-end dengan performa tinggi, zero packet-loss, dan skalabilitas jangka panjang untuk instansi pemerintahan dan korporasi.",
    sol_1_f1: "Pembangunan Data Center & Server Room Terstandar",
    sol_1_f2: "Structured Cabling & Fiber Optic Backbone Terpadu",
    sol_1_f3: "Core Routing, Switching & SD-WAN Inter-Branch",
    sol_1_f4: "High-Density Enterprise Wireless (WiFi 6/7)",
    sol_1_btn: "Minta Proposal",

    sol_2_title: "Hardware Procurement & Rental Fleet",
    sol_2_badge: "Zero CapEx Solution",
    sol_2_desc: "Penyediaan perangkat komputasi enterprise seperti server rackmount, SAN/NAS storage, laptop & PC workstation kantor melalui skema beli langsung atau sewa terkelola.",
    sol_2_f1: "Server Enterprise Rackmount & Tower Bergaransi",
    sol_2_f2: "Sewa Laptop & PC Fleksibel (12 - 36 Bulan) Tanpa CapEx",
    sol_2_f3: "Backup Replacement Unit Siap Pasang Onsite",
    sol_2_f4: "Sistem Penyimpanan Terpusat (SAN/NAS) & Backup Disaster",
    sol_2_btn: "Katalog Hardware",

    sol_3_title: "Cybersecurity, AI CCTV & Access Control",
    sol_3_badge: "Enterprise Security",
    sol_3_desc: "Perlindungan multi-layer terhadap ancaman siber, perimeter keamanan fisik pintar dengan analitik kecerdasan buatan, dan kontrol akses fasilitas terintegrasi.",
    sol_3_f1: "Next-Generation Firewall (NGFW) & Proteksi Malware",
    sol_3_f2: "Kamera CCTV Pintar dengan Pengenalan Wajah & Objek AI",
    sol_3_f3: "Access Door RFID/Biometrik & Absensi Karyawan Terpusat",
    sol_3_f4: "Security Audit & Penetrasi Jaringan Komprehensif",
    sol_3_btn: "Konsultasi Keamanan",

    sol_4_title: "Software Architecture & SLA Maintenance",
    sol_4_badge: "Continuous Operation",
    sol_4_desc: "Pengembangan perangkat lunak kustom berorientasi bisnis, virtualisasi server, serta kontrak pemeliharaan teknis berkala (Maintenance Contract) untuk kelangsungan sistem tanpa downtime.",
    sol_4_f1: "Kontrak Pemeliharaan SLA Rutin (Responsif < 2 Jam)",
    sol_4_f2: "Virtualisasi Server (VMware / Proxmox Enterprise)",
    sol_4_f3: "Pemantauan Jaringan Proaktif 24/7 dari NOC Bandung",
    sol_4_f4: "Kustomisasi Aplikasi ERP, CRM & Integrasi API Bisnis",
    sol_4_btn: "Konsultasi SLA",

    // Calculator
    calc_badge: "💰 Simulasi Finansial Enterprise",
    calc_title: 'Kalkulator Perbandingan <span class="gradient-text">CapEx vs Managed Rental</span>',
    calc_desc: "Bandingkan biaya beli langsung (CapEx) dengan skema Managed IT Device Rental dari PT Skill Nusa Infotama. Nikmati peremajaan unit rutin, garansi penggantian instan, dan efisiensi arus kas.",
    calc_lbl_devices: "Jumlah Armada Perangkat (Laptop/PC Workstation):",
    calc_lbl_duration: "Durasi Kontrak Kerjasama:",
    calc_adv_title: "Keuntungan Managed Rental Skill Nusa:",
    calc_adv_1: "✓ Bebas depresiasi nilai buku & asset management yang rumit.",
    calc_adv_2: "✓ Unit pengganti (backup unit) selalu siap onsite.",
    calc_adv_3: "✓ Sudah termasuk lisensi, software antivirus & SLA teknisi standby.",
    calc_capex_title: "Estimasi Biaya Beli Sendiri (CapEx)",
    calc_capex_note: "(Beli unit + sparepart + staff IT internal)",
    calc_rental_title: "Skema Managed Service Skill Nusa",
    calc_rental_note: "(All-in monthly rental + Full Support SLA)",
    calc_btn_quote: "Minta Simulasi untuk Perusahaan Anda",
    unit_word: "Unit",
    month_word: "Bulan",
    savings_prefix: "Hemat ± ",
    savings_suffix: " (Efisiensi Modal & Cashflow)",
    savings_zero_capex: "Bebas Biaya Modal Awal (Zero CapEx) & Perlindungan Kerusakan Total",

    // Portfolio
    portfolio_badge: "🏆 Rekam Jejak Teruji",
    portfolio_title: 'Studi Kasus & <span class="gradient-text">Proyek Implementasi</span>',
    portfolio_desc: "Bukti nyata keahlian tim engineer PT Skill Nusa Infotama dalam mengawal keandalan sistem jaringan dan teknologi di berbagai instansi prestisius.",
    filter_all: "Semua Proyek",
    filter_network: "Jaringan & Data Center",
    filter_hardware: "Hardware & Fleet Rental",
    filter_security: "Keamanan Siber & CCTV",
    filter_software: "Software & Managed Service",

    // About Us
    about_badge: "🏢 Profil Perusahaan",
    about_title: 'Dedikasi Lebih Dari <span class="gradient-text">25 Tahun</span> di Industri IT',
    about_p1: '<strong>PT Skill Nusa Infotama</strong> didirikan pada tahun 1999 di Bandung dengan visi menjadi mitra teknologi nomor satu bagi korporasi dan institusi publik di Indonesia.',
    about_p2: 'Dengan filosofi <em>"Total Solution for Customer"</em>, kami mengintegrasikan hardware, software, konektivitas jaringan, serta keamanan siber untuk menciptakan ekosistem kerja yang aman, cepat, dan berkinerja tinggi.',
    about_feat_1_t: "📍 Tim Teknis Lokal Bandung",
    about_feat_1_d: "Dukungan teknisi onsite yang cepat untuk area Bandung, Jawa Barat, dan sekitarnya.",
    about_feat_2_t: "📜 Legalitas & Kepatuhan Penuh",
    about_feat_2_d: "Terdaftar di LPSE, PaDi UMKM, dan memenuhi syarat pengadaan BUMN/Pemerintah.",
    about_feat_3_t: "🤝 Sertifikasi Prinsipal",
    about_feat_3_d: "Engineer tersertifikasi Cisco, Aruba, Fortinet, Mikrotik, dan VMware.",
    about_feat_4_t: "⚡ Komitmen Garansi SLA",
    about_feat_4_d: "Respons cepat, unit pengganti darurat, dan jaminan sparepart orisinal.",
    timeline_heading: "Perjalanan & Transformasi Skill Nusa",
    timeline_1_t: "Pendirian PT Skill Nusa Infotama",
    timeline_1_d: "Mengawali kiprah sebagai konsultan perangkat lunak dan penyedia perangkat keras IT di Bandung.",
    timeline_2_t: "Ekspansi ke System & Network Integration",
    timeline_2_d: "Memperluas layanan pada instalasi infrastruktur fiber optic, data center, dan jaringan enterprise.",
    timeline_3_t: "Peluncuran Managed IT Service & Rental Fleet",
    timeline_3_d: "Membantu korporasi memangkas CapEx melalui skema sewa perangkat komputasi lengkap dengan SLA.",
    timeline_4_year: "KINI & Masa Depan",
    timeline_4_t: "Smart Cyber Defense & AI Infrastructure",
    timeline_4_d: "Mengintegrasikan sistem keamanan siber mutakhir, AI CCTV surveillance, dan otomasi cloud.",

    // Contact
    contact_badge: "📞 Hubungi Tim Ahli Kami",
    contact_title: 'Konsultasikan Solusi IT <span class="gradient-text">Sekarang Juga</span>',
    contact_desc: "Diskusikan rencana pengadaan perangkat, peremajaan jaringan, atau kebutuhan kontrak pemeliharaan bersama konsultan kami.",
    contact_card_office: "Kantor",
    contact_card_phone: "Telepon",
    contact_card_hours: "Senin - Jumat: 08.30 - 17.00 WIB",
    contact_card_email: "Email",
    form_title: "Formulir Permintaan Penawaran",
    form_subtitle: "Lengkapi formulir di bawah ini, tim kami akan merespons dalam waktu 1x24 jam kerja.",
    form_lbl_name: "Nama Lengkap *",
    form_lbl_company: "Instansi / Perusahaan",
    form_lbl_email: "Alamat Email *",
    form_lbl_phone: "Nomor Telepon / WhatsApp *",
    form_lbl_service: "Kategori Solusi yang Dibutuhkan",
    form_lbl_message: "Deskripsi Kebutuhan & Estimasi Volume",
    form_placeholder_name: "Contoh: Budi Santoso",
    form_placeholder_company: "Contoh: PT Industri Bersama",
    form_placeholder_email: "budi@perusahaan.co.id",
    form_placeholder_phone: "Contoh: 08123456789",
    form_placeholder_message: "Ceritakan kebutuhan spesifik Anda, jumlah perangkat, atau lokasi implementasi...",
    form_submit_btn: "Kirim Permintaan & Terhubung ke WhatsApp",

    // Footer
    footer_strip_title: "Solusi Total Infrastruktur IT & System Integration",
    footer_strip_desc: "Didukung tim engineer tersertifikasi sejak 1999 di Bandung. Siap melayani kebutuhan enterprise dan instansi Anda.",
    footer_strip_consult: "Konsultasi Sekarang",
    footer_brand_desc: 'PT Skill Nusa Infotama adalah penyedia solusi <strong>System Network Integration</strong>, <strong>Technology Solution Provider</strong>, dan <strong>Software Consultant</strong> terpercaya di Bandung sejak 1999 dengan komitmen <em>Total Solution for Customer</em>.',
    footer_heading_solutions: "Solusi Unggulan",
    footer_heading_nav: "Navigasi Cepat",
    footer_heading_contact: "Kontak",
    footer_contact_office_lbl: "Kantor Utama:",
    footer_contact_phone_lbl: "Telepon Kantor:",
    footer_contact_wa_lbl: "WhatsApp CS:",
    footer_contact_email_lbl: "Email:",
    footer_copyright: "© 1999 - 2026 PT Skill Nusa Infotama. Seluruh Hak Cipta Dilindungi.",
    footer_privacy: "Kebijakan Privasi",
    footer_terms: "Syarat Layanan",
    footer_top: "Kembali ke Atas ↑",
    toast_lang_switched: "Bahasa diubah ke Indonesia",

    // Modal
    modal_title: "Konsultasi Teknis & Penawaran",
    modal_desc: "Diskusikan langsung kebutuhan arsitektur sistem bersama konsultan senior PT Skill Nusa Infotama.",
    modal_lbl_solution: "Solusi Terpilih",
    modal_lbl_name: "Nama Lengkap *",
    modal_lbl_company: "Perusahaan / Instansi",
    modal_lbl_email: "Email Perusahaan *",
    modal_lbl_phone: "Nomor WhatsApp *",
    modal_lbl_message: "Kebutuhan Spesifik / Pertanyaan",
    modal_placeholder_name: "Nama Anda",
    modal_placeholder_company: "Nama Instansi",
    modal_placeholder_email: "email@perusahaan.co.id",
    modal_placeholder_phone: "08xxxxxxxxxx",
    modal_placeholder_message: "Tuliskan spesifikasi yang Anda cari, estimasi waktu implementasi, atau pertanyaan teknis...",
    modal_submit_btn: "Hubungi Tim Konsultan via WhatsApp"
  },
  en: {
    // Navigation & Drawer
    nav_home: "Home",
    nav_solutions: "Products & Solutions",
    nav_advisor: "Solution Finder",
    nav_calculator: "TCO Calculator",
    nav_portfolio: "Portfolio",
    nav_about: "About Us",
    nav_contact: "Contact",
    nav_consult_btn: "IT Consultation",
    drawer_quote_btn: "Request Quote",
    drawer_wa_btn: "Contact via WhatsApp",
    lang_select_label: "Select Language:",

    // Hero
    hero_pill: "🚀 Total IT Solutions & System Network Integration Since 1999",
    hero_title: 'Transform Your <span class="gradient-text">Digital Infrastructure</span> with Enterprise IT Solutions',
    hero_desc: "PT Skill Nusa Infotama delivers enterprise-grade System Network Integration, Managed IT Services, Hardware Procurement & Software Architecture with uncompromising reliability.",
    hero_btn_explore: "Explore Our Solutions",
    hero_btn_consult: "Consult Your IT Needs",
    stat_years: "Years of Experience (Est. 1999)",
    stat_projects: "Enterprise & Gov Projects",
    stat_uptime: "Guaranteed Network SLA Uptime",
    stat_warranty: "Principal & Spare Part Warranty",
    hero_live_title: "Enterprise Core Network",
    hero_live_sub: "Bandung NOC Active • 0.8ms Latency",
    hero_live_sla: "SLA 24/7 Verified",

    // Partners
    partners_title: "Supported by Global Technology Principals",

    // Solution Advisor
    advisor_badge: "⚡ Smart Recommendation Engine",
    advisor_title: 'Interactive Enterprise <span class="gradient-text">Solution Advisor</span>',
    advisor_desc: "Select your industry sector and specific requirements to get tailored network architecture overviews, hardware recommendations, and optimal service schemes.",
    advisor_step1: "1. Organization Sector",
    advisor_step2: "2. Primary Needs",
    advisor_step3: "3. Infrastructure Scale",
    advisor_opt_bumn: "State-Owned & Government Institutions",
    advisor_opt_hospital: "Hospitals & Healthcare Facilities",
    advisor_opt_edu: "Universities & Educational Institutions",
    advisor_opt_manufacturing: "Factories & Industrial Manufacturing",
    advisor_opt_corporate: "Private Corporations & Financial Services",
    advisor_opt_network: "Network & Data Center Infrastructure",
    advisor_opt_security: "Cybersecurity Systems & AI CCTV",
    advisor_opt_managed: "Managed Device Rental & PC Fleet",
    advisor_opt_software: "Custom Software & Cloud Virtualization",
    advisor_opt_enterprise: "Enterprise Multi-Building / Campus Scale",
    advisor_opt_large: "Medium Scale (100 - 500 Users)",
    advisor_opt_medium: "Branch / Regional Office Scale (< 100 Users)",
    advisor_rec_title: "Ready-to-Deploy Architecture Recommendation",
    advisor_rec_hw: "Recommended Core Hardware:",
    advisor_btn_quote: "Request Quote for this Specification",
    advisor_sla_label: "Service SLA Standard:",

    // Solutions
    solutions_badge: "💼 Comprehensive Services",
    solutions_title: 'Technology Solutions & <span class="gradient-text">Flagship Services</span>',
    solutions_desc: "A comprehensive combination of enterprise hardware with warranty, standardized network integration, advanced cyber defense, and managed services.",
    sol_1_title: "System & Network Integration",
    sol_1_badge: "Core Foundation",
    sol_1_desc: "End-to-end network infrastructure design and deployment featuring high performance, zero packet-loss, and long-term scalability for government agencies and enterprise corporations.",
    sol_1_f1: "Standardized Data Center & Server Room Construction",
    sol_1_f2: "Integrated Structured Cabling & Fiber Optic Backbone",
    sol_1_f3: "Core Routing, Switching & Inter-Branch SD-WAN",
    sol_1_f4: "High-Density Enterprise Wireless (WiFi 6/7)",
    sol_1_btn: "Request Proposal",

    sol_2_title: "Hardware Procurement & Rental Fleet",
    sol_2_badge: "Zero CapEx Solution",
    sol_2_desc: "Provisioning of enterprise computing hardware including rackmount servers, SAN/NAS storage, laptops & workstation PCs through direct purchase or managed rental schemes.",
    sol_2_f1: "Enterprise Rackmount & Tower Servers with Warranty",
    sol_2_f2: "Flexible Laptop & PC Fleet Rental (12 - 36 Mos) Zero CapEx",
    sol_2_f3: "Hot-Standby Onsite Replacement Units Ready",
    sol_2_f4: "Centralized Storage Systems (SAN/NAS) & Disaster Recovery",
    sol_2_btn: "Hardware Catalog",

    sol_3_title: "Cybersecurity, AI CCTV & Access Control",
    sol_3_badge: "Enterprise Security",
    sol_3_desc: "Multi-layered cyber threat protection, smart perimeter physical security with artificial intelligence analytics, and integrated access control.",
    sol_3_f1: "Next-Generation Firewall (NGFW) & Malware Protection",
    sol_3_f2: "Smart AI CCTV Cameras with Face & Object Recognition",
    sol_3_f3: "RFID/Biometric Access Doors & Centralized Attendance",
    sol_3_f4: "Comprehensive Security Audits & Network Penetration Testing",
    sol_3_btn: "Security Consultation",

    sol_4_title: "Software Architecture & SLA Maintenance",
    sol_4_badge: "Continuous Operation",
    sol_4_desc: "Custom business-oriented software engineering, server virtualization, and regular technical maintenance contracts (SLA) ensuring zero-downtime operations.",
    sol_4_f1: "Routine SLA Maintenance Contracts (Fast Response < 2 Hrs)",
    sol_4_f2: "Enterprise Server Virtualization (VMware / Proxmox)",
    sol_4_f3: "24/7 Proactive Network Monitoring from Bandung NOC",
    sol_4_f4: "ERP, CRM Customization & Business API Integration",
    sol_4_btn: "SLA Consultation",

    // Calculator
    calc_badge: "💰 Financial Enterprise Simulation",
    calc_title: 'Comparative Calculator: <span class="gradient-text">CapEx vs Managed Rental</span>',
    calc_desc: "Compare upfront purchasing costs (CapEx) against the Managed IT Device Rental scheme from PT Skill Nusa Infotama. Enjoy routine hardware refreshes, instant swap warranty, and optimized cash flow.",
    calc_lbl_devices: "Fleet Device Count (Laptops/Workstation PCs):",
    calc_lbl_duration: "Contract Duration:",
    calc_adv_title: "Skill Nusa Managed Rental Advantages:",
    calc_adv_1: "✓ Free from book value depreciation & complex asset management.",
    calc_adv_2: "✓ Hot-standby onsite replacement units always ready.",
    calc_adv_3: "✓ Includes genuine OS licenses, antivirus & standby SLA technicians.",
    calc_capex_title: "Estimated Purchase Cost (CapEx)",
    calc_capex_note: "(Hardware purchase + spare parts + internal IT staff)",
    calc_rental_title: "Skill Nusa Managed Service Scheme",
    calc_rental_note: "(All-in monthly rental + Full Support SLA)",
    calc_btn_quote: "Request Simulation for Your Organization",
    unit_word: "Units",
    month_word: "Months",
    savings_prefix: "Save approx ± ",
    savings_suffix: " (Capital & Cash Flow Efficiency)",
    savings_zero_capex: "Zero Upfront Capital Cost (Zero CapEx) & Complete Damage Protection",

    // Portfolio
    portfolio_badge: "🏆 Proven Track Record",
    portfolio_title: 'Case Studies & <span class="gradient-text">Implemented Projects</span>',
    portfolio_desc: "Tangible proof of PT Skill Nusa Infotama engineering expertise in maintaining network system reliability and technology across prestigious institutions.",
    filter_all: "All Projects",
    filter_network: "Network & Data Center",
    filter_hardware: "Hardware & Fleet Rental",
    filter_security: "Cybersecurity & CCTV",
    filter_software: "Software & Managed Service",

    // About Us
    about_badge: "🏢 Company Profile",
    about_title: 'Over <span class="gradient-text">25 Years</span> of Dedication in the IT Industry',
    about_p1: '<strong>PT Skill Nusa Infotama</strong> was founded in 1999 in Bandung with the vision to become the premier technology partner for corporations and public institutions across Indonesia.',
    about_p2: 'With the philosophy <em>"Total Solution for Customer"</em>, we integrate hardware, software, network connectivity, and cybersecurity into safe, fast, and high-performance business ecosystems.',
    about_feat_1_t: "📍 Local Bandung Engineering Team",
    about_feat_1_d: "Rapid onsite technician support for Bandung, West Java, and surrounding regions.",
    about_feat_2_t: "📜 Full Legality & Compliance",
    about_feat_2_d: "Registered on LPSE, PaDi UMKM, meeting all state and enterprise procurement standards.",
    about_feat_3_t: "🤝 Principal Certifications",
    about_feat_3_d: "Certified engineers across Cisco, Aruba, Fortinet, MikroTik, and VMware.",
    about_feat_4_t: "⚡ SLA Warranty Commitment",
    about_feat_4_d: "Rapid response times, emergency swap units, and genuine original spare parts guarantees.",
    timeline_heading: "Skill Nusa Heritage & Evolution",
    timeline_1_t: "Founding of PT Skill Nusa Infotama",
    timeline_1_d: "Started as a software consultancy and IT hardware provider in Bandung.",
    timeline_2_t: "Expansion into System & Network Integration",
    timeline_2_d: "Expanded services into fiber optic infrastructure, data centers, and enterprise networking.",
    timeline_3_t: "Launch of Managed IT Services & Rental Fleet",
    timeline_3_d: "Empowering enterprises to cut CapEx through managed computing device leases backed by SLA.",
    timeline_4_year: "NOW & Future",
    timeline_4_t: "Smart Cyber Defense & AI Infrastructure",
    timeline_4_d: "Integrating advanced cybersecurity defense, AI CCTV surveillance, and cloud automation.",

    // Contact
    contact_badge: "📞 Connect with Our Experts",
    contact_title: 'Consult Your IT Solutions <span class="gradient-text">Right Now</span>',
    contact_desc: "Discuss hardware procurement plans, network overhauls, or routine maintenance contracts with our senior consultants.",
    contact_card_office: "Office",
    contact_card_phone: "Telephone",
    contact_card_hours: "Monday - Friday: 08:30 - 17:00 WIB",
    contact_card_email: "Email",
    form_title: "Quotation & Consultation Request Form",
    form_subtitle: "Complete the form below and our team will get back to you within 1 business day.",
    form_lbl_name: "Full Name *",
    form_lbl_company: "Organization / Company",
    form_lbl_email: "Email Address *",
    form_lbl_phone: "Phone / WhatsApp Number *",
    form_lbl_service: "Required Solution Category",
    form_lbl_message: "Requirements & Estimated Scope",
    form_placeholder_name: "Example: John Doe",
    form_placeholder_company: "Example: Acme Corporation",
    form_placeholder_email: "john@company.com",
    form_placeholder_phone: "Example: +62 812 3456 789",
    form_placeholder_message: "Describe your specific requirements, number of devices, or implementation location...",
    form_submit_btn: "Submit Request & Connect via WhatsApp",

    // Footer
    footer_strip_title: "Total IT Infrastructure & System Integration Solutions",
    footer_strip_desc: "Backed by certified engineers since 1999 in Bandung. Ready to serve your enterprise and institutional needs.",
    footer_strip_consult: "Consult Now",
    footer_brand_desc: 'PT Skill Nusa Infotama is a trusted <strong>System Network Integration</strong>, <strong>Technology Solution Provider</strong>, and <strong>Software Consultant</strong> in Bandung since 1999 with the commitment <em>Total Solution for Customer</em>.',
    footer_heading_solutions: "Featured Solutions",
    footer_heading_nav: "Quick Navigation",
    footer_heading_contact: "Contact",
    footer_contact_office_lbl: "Headquarters:",
    footer_contact_phone_lbl: "Office Phone:",
    footer_contact_wa_lbl: "WhatsApp CS:",
    footer_contact_email_lbl: "Email:",
    footer_copyright: "© 1999 - 2026 PT Skill Nusa Infotama. All Rights Reserved.",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Service",
    footer_top: "Back to Top ↑",
    toast_lang_switched: "Language switched to English",

    // Modal
    modal_title: "Technical Consultation & Quote",
    modal_desc: "Discuss system architecture requirements directly with senior consultants at PT Skill Nusa Infotama.",
    modal_lbl_solution: "Selected Solution",
    modal_lbl_name: "Full Name *",
    modal_lbl_company: "Company / Institution",
    modal_lbl_email: "Corporate Email *",
    modal_lbl_phone: "WhatsApp Number *",
    modal_lbl_message: "Specific Requirements / Questions",
    modal_placeholder_name: "Your Name",
    modal_placeholder_company: "Organization Name",
    modal_placeholder_email: "email@company.com",
    modal_placeholder_phone: "+62 8xxxxxxxxxx",
    modal_placeholder_message: "Specify the requirements you are looking for, estimated deployment timeline, or technical queries...",
    modal_submit_btn: "Connect with Consulting Team via WhatsApp"
  }
};

let currentLang = localStorage.getItem('skillnusa_lang') || 'id';
let refreshSolutionAdvisor = null;
let refreshTcoCalculator = null;

function initLanguageToggle() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selected = btn.getAttribute('data-lang');
      if (!selected) return;

      const isSwitch = (selected !== currentLang);
      currentLang = selected;
      localStorage.setItem('skillnusa_lang', currentLang);
      applyTranslations(currentLang);

      const t = translations[currentLang] || translations.id;
      if (isSwitch) {
        showToast(t.toast_lang_switched || (currentLang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language switched to English'));
      }
    });
  });

  // Apply initially saved or default language
  applyTranslations(currentLang);
}

function applyTranslations(lang) {
  const t = translations[lang] || translations.id;
  if (!t) return;

  document.documentElement.setAttribute('lang', lang);

  // Update plain textContent elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // Update innerHTML elements (elements containing styled HTML spans)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) {
      el.placeholder = t[key];
    }
  });

  // Sync active states on all language buttons across page (desktop & mobile)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  // Refresh reactive calculators and advisor
  if (typeof refreshSolutionAdvisor === 'function') {
    refreshSolutionAdvisor();
  }
  if (typeof refreshTcoCalculator === 'function') {
    refreshTcoCalculator();
  }
}

/* ===================================================================
   4. INTERACTIVE SOLUTION ADVISOR / FINDER
   =================================================================== */
const solutionDatabase = {
  "bumn-network-enterprise": {
    id: {
      title: "Enterprise Backbone & Redundant Data Center Integration",
      desc: "Arsitektur jaringan multi-site berkecepatan tinggi dengan dual-backbone fiber optic, Core Routing Cisco/Aruba, sistem failover 99.99%, dan audit kepatuhan keamanan data sektor publik.",
      tags: ["Cisco / Aruba Core", "Data Center Tier-3 Spec", "Dual-Link Redundancy", "SLA 24/7 Priority"],
      recHardware: "Cisco Catalyst 9500, FortiGate 200F, Server Rack Dell PowerEdge R750",
      sla: "SLA Response < 2 Jam, 99.98% Uptime"
    },
    en: {
      title: "Enterprise Backbone & Redundant Data Center Integration",
      desc: "High-speed multi-site network architecture with dual-backbone fiber optics, Cisco/Aruba Core Routing, 99.99% failover system, and public sector data security compliance audit.",
      tags: ["Cisco / Aruba Core", "Tier-3 Data Center Spec", "Dual-Link Redundancy", "24/7 Priority SLA"],
      recHardware: "Cisco Catalyst 9500, FortiGate 200F, Dell PowerEdge R750 Rack Server",
      sla: "SLA Response < 2 Hours, 99.98% Uptime"
    }
  },
  "hospital-security-enterprise": {
    id: {
      title: "Healthcare Smart Surveillance & Hi-Security Network Tier",
      desc: "Integrasi sistem CCTV analitik pintar (AI Face/Thermal/Crowd Detection), isolasi jaringan rekam medis (SIMRS), dan backup daya uninterruptible (UPS Industrial) untuk ruangan kritis.",
      tags: ["AI Surveillance CCTV", "HIPAA/Data Privacy Ready", "Medical Grade UPS", "Isolated VLAN"],
      recHardware: "Hikvision AI DeepinView, APC Galaxy UPS, HP Aruba Secure Switch",
      sla: "SLA Response 24/7 On-Site Support"
    },
    en: {
      title: "Healthcare Smart Surveillance & Hi-Security Network Tier",
      desc: "Smart AI analytical CCTV integration (AI Face/Thermal/Crowd Detection), medical record network isolation (SIMRS/EMR), and uninterruptible industrial UPS power backup for critical units.",
      tags: ["AI Surveillance CCTV", "HIPAA/Data Privacy Ready", "Medical Grade UPS", "Isolated VLAN"],
      recHardware: "Hikvision AI DeepinView, APC Galaxy UPS, HP Aruba Secure Switch",
      sla: "24/7 On-Site Support SLA Response"
    }
  },
  "edu-managed-medium": {
    id: {
      title: "Campus WiFi 6 Coverage & Fleet Managed Laptops",
      desc: "Cakupan jaringan nirkabel kepadatan tinggi untuk ribuan mahasiswa & dosen, laboratorium komputer lengkap dengan skema sewa perangkat laptop/PC terkelola tanpa biaya modal awal.",
      tags: ["WiFi 6 High Density", "Fleet Rental Laptops", "Bandwidth Management", "Zero Capex"],
      recHardware: "Aruba Instant-On AP25, Lenovo ThinkPad Managed Fleet, MikroTik CCR",
      sla: "Maintenance & Onsite Replacement Garansi 1x24 Jam"
    },
    en: {
      title: "Campus WiFi 6 Coverage & Fleet Managed Laptops",
      desc: "High-density wireless network coverage for thousands of students and faculty, computer labs with zero-upfront managed laptop/PC fleet leasing schemes.",
      tags: ["High-Density WiFi 6", "Fleet Rental Laptops", "Bandwidth Management", "Zero CapEx"],
      recHardware: "Aruba Instant-On AP25, Lenovo ThinkPad Managed Fleet, MikroTik CCR",
      sla: "Maintenance & Onsite Replacement 1x24 Hr Guarantee"
    }
  },
  "manufacturing-network-large": {
    id: {
      title: "Industrial IoT Network & Ruggedized Infrastructure",
      desc: "Jaringan pabrik terproteksi getaran dan suhu ekstrem, sistem pemantauan lini produksi terpusat, dan integrasi konektivitas ERP gudang dengan latensi ultra-rendah.",
      tags: ["Industrial Switches", "Perimeter Security", "Wireless Point-to-Point", "Redundant PDU"],
      recHardware: "Moxa/Cisco Industrial, Fortinet Firewall, Ubiquiti AirFiber",
      sla: "Zero Downtime Production SLA Guarantee"
    },
    en: {
      title: "Industrial IoT Network & Ruggedized Infrastructure",
      desc: "Ruggedized plant network protected against extreme temperatures and vibration, centralized production line monitoring, and ultra-low latency warehouse ERP connectivity.",
      tags: ["Industrial Switches", "Perimeter Security", "Wireless Point-to-Point", "Redundant PDU"],
      recHardware: "Moxa/Cisco Industrial, Fortinet Firewall, Ubiquiti AirFiber",
      sla: "Zero Downtime Production SLA Guarantee"
    }
  },
  "default": {
    id: {
      title: "Custom Integrated IT Solution & Managed Architecture",
      desc: "Solusi terpadu mencakup pengadaan perangkat keras enterprise, konfigurasi jaringan terpusat, firewall proteksi siber, dan kontrak pemeliharaan berkala bergaransi.",
      tags: ["Network Integration", "Enterprise Hardware", "Cyber Security", "Full Managed Service"],
      recHardware: "Dell/Lenovo Enterprise, Cisco/Fortinet, Schneider APC",
      sla: "Standar Layanan SLA Responsif < 4 Jam"
    },
    en: {
      title: "Custom Integrated IT Solution & Managed Architecture",
      desc: "Comprehensive solutions encompassing enterprise hardware procurement, centralized network integration, cyber defense firewall, and guaranteed routine maintenance contracts.",
      tags: ["Network Integration", "Enterprise Hardware", "Cyber Security", "Full Managed Service"],
      recHardware: "Dell/Lenovo Enterprise, Cisco/Fortinet, Schneider APC",
      sla: "Responsive SLA Standard < 4 Hours"
    }
  }
};

function initSolutionAdvisor() {
  const sectorSelect = document.getElementById('advisor-sector');
  const needSelect = document.getElementById('advisor-need');
  const scaleSelect = document.getElementById('advisor-scale');

  const titleEl = document.getElementById('advisor-result-title');
  const descEl = document.getElementById('advisor-result-desc');
  const tagsEl = document.getElementById('advisor-result-tags');
  const slaEl = document.getElementById('advisor-result-sla');
  const quoteBtn = document.getElementById('advisor-quote-btn');

  function updateRecommendation() {
    if (!sectorSelect || !needSelect || !scaleSelect) return;
    const key = `${sectorSelect.value}-${needSelect.value}-${scaleSelect.value}`;
    const entry = solutionDatabase[key] || solutionDatabase["default"];
    const data = entry[currentLang] || entry["id"] || entry;
    const t = translations[currentLang] || translations.id;

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (slaEl) slaEl.textContent = `⚡ ${t.advisor_sla_label || 'Standar Layanan:'} ${data.sla}`;

    if (tagsEl) {
      tagsEl.innerHTML = data.tags.map(tag => `<span class="advisor-tag">${tag}</span>`).join('');
    }

    if (quoteBtn) {
      quoteBtn.onclick = () => {
        openModalWithPrefill(data.title, sectorSelect.options[sectorSelect.selectedIndex].text);
      };
    }
  }

  refreshSolutionAdvisor = updateRecommendation;

  [sectorSelect, needSelect, scaleSelect].forEach(sel => {
    if (sel) sel.addEventListener('change', updateRecommendation);
  });

  updateRecommendation();
}

/* ===================================================================
   5. TCO / ROI CALCULATOR (RENTAL VS CAPEX)
   =================================================================== */
function initTcoCalculator() {
  const deviceSlider = document.getElementById('slider-devices');
  const durationSlider = document.getElementById('slider-duration');
  const valDevices = document.getElementById('val-devices');
  const valDuration = document.getElementById('val-duration');

  const capexTotalEl = document.getElementById('calc-capex-total');
  const rentalTotalEl = document.getElementById('calc-rental-total');
  const savingsEl = document.getElementById('calc-savings-total');

  function calculateTCO() {
    if (!deviceSlider || !durationSlider) return;
    const units = parseInt(deviceSlider.value, 10);
    const months = parseInt(durationSlider.value, 10);
    const t = translations[currentLang] || translations.id;

    if (valDevices) valDevices.textContent = `${units} ${t.unit_word || 'Unit'}`;
    if (valDuration) valDuration.textContent = `${months} ${t.month_word || 'Bulan'}`;

    // CapEx calculations:
    // Device purchase ~ Rp 14.500.000 / unit (Enterprise Laptop + OS + Bag)
    // Upfront Warranty extension + Spare parts ~ Rp 2.500.000 / unit
    // IT Technician / overhead ~ Rp 4.500.000 per month
    const hardwarePurchase = units * 14500000;
    const warrantyAndDepreciation = units * 2500000;
    const itOverhead = (months / 12) * 54000000; // Rp 4.5M/mo
    const totalCapex = hardwarePurchase + warrantyAndDepreciation + itOverhead;

    // Managed Service (Rental) calculations:
    // Monthly rental ~ Rp 650.000 / unit / month (Includes brand-new laptop, antivirus, replacement unit, support)
    const monthlyRate = 650000;
    const totalRental = units * monthlyRate * months;

    // Savings & Cashflow optimization
    const diff = totalCapex - totalRental;

    if (capexTotalEl) capexTotalEl.textContent = formatRupiah(totalCapex);
    if (rentalTotalEl) rentalTotalEl.textContent = formatRupiah(totalRental);
    if (savingsEl) {
      if (diff > 0) {
        savingsEl.textContent = `${t.savings_prefix || 'Hemat ± '}${formatRupiah(diff)}${t.savings_suffix || ' (Efisiensi Modal & Cashflow)'}`;
      } else {
        savingsEl.textContent = t.savings_zero_capex || 'Bebas Biaya Modal Awal (Zero CapEx) & Perlindungan Kerusakan Total';
      }
    }
  }

  refreshTcoCalculator = calculateTCO;

  if (deviceSlider && durationSlider) {
    deviceSlider.addEventListener('input', calculateTCO);
    durationSlider.addEventListener('input', calculateTCO);
    calculateTCO();
  }

  function formatRupiah(number) {
    return 'Rp ' + Math.round(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}

/* ===================================================================
   6. PORTFOLIO FILTER
   =================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
    });
  });
}

/* ===================================================================
   7. MODAL SYSTEM
   =================================================================== */
function initModal() {
  const overlay = document.getElementById('quoteModal');
  const closeBtn = document.querySelector('.modal-close');
  const openBtns = document.querySelectorAll('[data-open-modal]');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (overlay) overlay.classList.add('active');
    });
  });

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  }
}

function openModalWithPrefill(solutionTitle, sectorName) {
  const overlay = document.getElementById('quoteModal');
  const solutionInput = document.getElementById('modal-solution-input');
  if (solutionInput) {
    solutionInput.value = `${solutionTitle} (Sektor: ${sectorName})`;
  }
  if (overlay) overlay.classList.add('active');
}

/* ===================================================================
   8. CONTACT FORM & WHATSAPP GENERATION
   =================================================================== */
function initContactForm() {
  const mainForm = document.getElementById('mainContactForm');
  const modalForm = document.getElementById('modalQuoteForm');

  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(mainForm, false);
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(modalForm, true);
    });
  }

  function handleFormSubmit(form, isModal) {
    const name = form.querySelector('[name="fullName"]')?.value.trim();
    const company = form.querySelector('[name="company"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const phone = form.querySelector('[name="phone"]')?.value.trim();
    const service = form.querySelector('[name="service"]')?.value || 'Konsultasi Umum IT';
    const message = form.querySelector('[name="message"]')?.value.trim() || 'Saya ingin informasi lebih lanjut mengenai solusi IT PT Skill Nusa Infotama.';

    if (!name || !email || !phone) {
      showToast('Mohon lengkapi Nama, Email, dan Nomor WhatsApp Anda.');
      return;
    }

    // Prepare WhatsApp Message
    const textMsg = `Halo PT Skill Nusa Infotama,%0A%0ASaya ingin berkonsultasi mengenai solusi IT:%0A- Nama: ${encodeURIComponent(name)}%0A- Instansi/Perusahaan: ${encodeURIComponent(company || '-')}%0A- Email: ${encodeURIComponent(email)}%0A- No. WhatsApp: ${encodeURIComponent(phone)}%0A- Kebutuhan Solusi: ${encodeURIComponent(service)}%0A- Catatan: ${encodeURIComponent(message)}%0A%0AMohon informasi dan jadwal diskusi teknis lebih lanjut. Terima kasih!`;
    
    // Official Skill Nusa WhatsApp line
    const waNumber = '62811206820'; // Official CS WhatsApp: +62 811-206-820
    const waUrl = `https://wa.me/62811206820?text=${textMsg}`;

    showToast('Terima kasih! Permintaan Anda telah diterima. Membuka WhatsApp CS...', 4000);

    form.reset();
    if (isModal) {
      const overlay = document.getElementById('quoteModal');
      if (overlay) overlay.classList.remove('active');
    }

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1200);
  }
}

/* ===================================================================
   9. TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message, duration = 3000) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}
