/**
 * PT SKILL NUSA INFOTAMA - Official Website Interactive Logic
 * High-performance, zero-dependency Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initLanguageToggle();
  initSolutionAdvisor();
  initTcoCalculator();
  initPortfolioFilter();
  initContactForm();
  initModal();
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
   3. LANGUAGE TOGGLE (INDONESIA / ENGLISH)
   =================================================================== */
const translations = {
  id: {
    heroPill: "🚀 Mitra Terpercaya Solusi IT & Network Integration Sejak 1999",
    heroTitle: 'Transformasi <span class="gradient-text">Infrastruktur Digital</span> & Solusi IT Total Perusahaan Anda',
    heroDesc: "PT Skill Nusa Infotama menghadirkan System Network Integration, Managed IT Services, Hardware & Software Solution berstandar enterprise dengan keandalan tanpa kompromi.",
    ctaExplore: "Jelajahi Solusi Kami",
    ctaConsult: "Konsultasi Kebutuhan IT",
    statsExp: "Tahun Pengalaman",
    statsProjects: "Proyek Selesai",
    statsSla: "SLA Uptime Jaringan",
    statsClients: "Mitra Korporasi & BUMN",
    advisorTitle: "Interactive Solution Advisor",
    advisorDesc: "Dapatkan rekomendasi arsitektur dan estimasi paket IT sesuai sektor dan skala kebutuhan organisasi Anda."
  },
  en: {
    heroPill: "🚀 Trusted IT Solutions & Network Integration Partner Since 1999",
    heroTitle: 'Transform Your <span class="gradient-text">Digital Infrastructure</span> with Total IT Solutions',
    heroDesc: "PT Skill Nusa Infotama delivers enterprise-grade System Network Integration, Managed IT Services, Hardware & Software Solutions with uncompromising reliability.",
    ctaExplore: "Explore Our Solutions",
    ctaConsult: "Consult Your IT Needs",
    statsExp: "Years of Excellence",
    statsProjects: "Completed Projects",
    statsSla: "Network SLA Uptime",
    statsClients: "Enterprise & Gov Partners",
    advisorTitle: "Interactive Solution Advisor",
    advisorDesc: "Get tailored architecture recommendations and IT package estimations based on your industry and scale."
  }
};

let currentLang = 'id';

function initLanguageToggle() {
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.target.getAttribute('data-lang');
      if (selected && selected !== currentLang) {
        currentLang = selected;
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyTranslations(currentLang);
        showToast(currentLang === 'id' ? 'Bahasa diubah ke Indonesia' : 'Language switched to English');
      }
    });
  });
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;
  const heroPillEl = document.querySelector('.hero-pill-text');
  if (heroPillEl) heroPillEl.textContent = t.heroPill;
  const heroTitleEl = document.querySelector('.hero-title');
  if (heroTitleEl) heroTitleEl.innerHTML = t.heroTitle;
  const heroDescEl = document.querySelector('.hero-desc');
  if (heroDescEl) heroDescEl.textContent = t.heroDesc;
  const ctaExpEl = document.querySelector('#cta-explore-btn');
  if (ctaExpEl) ctaExpEl.textContent = t.ctaExplore;
  const ctaConsEl = document.querySelector('#cta-consult-btn');
  if (ctaConsEl) ctaConsEl.textContent = t.ctaConsult;
}

/* ===================================================================
   4. INTERACTIVE SOLUTION ADVISOR / FINDER
   =================================================================== */
const solutionDatabase = {
  "bumn-network-enterprise": {
    title: "Enterprise Backbone & Redundant Data Center Integration",
    desc: "Arsitektur jaringan multi-site berkecepatan tinggi dengan dual-backbone fiber optic, Core Routing Cisco/Aruba, sistem failover 99.99%, dan audit kepatuhan keamanan data sektor publik.",
    tags: ["Cisco / Aruba Core", "Data Center Tier-3 Spec", "Dual-Link Redundancy", "SLA 24/7 Priority"],
    recHardware: "Cisco Catalyst 9500, FortiGate 200F, Server Rack Dell PowerEdge R750",
    sla: "SLA Response < 2 Jam, 99.98% Uptime"
  },
  "hospital-security-enterprise": {
    title: "Healthcare Smart Surveillance & Hi-Security Network Tier",
    desc: "Integrasi sistem CCTV analitik pintar (AI Face/Thermal/Crowd Detection), isolasi jaringan rekam medis (SIMRS), dan backup daya uninterruptible (UPS Industrial) untuk ruangan kritis.",
    tags: ["AI Surveillance CCTV", "HIPAA/Data Privacy Ready", "Medical Grade UPS", "Isolated VLAN"],
    recHardware: "Hikvision AI DeepinView, APC Galaxy UPS, HP Aruba Secure Switch",
    sla: "SLA Response 24/7 On-Site Support"
  },
  "edu-managed-medium": {
    title: "Campus WiFi 6 Coverage & Fleet Managed Laptops",
    desc: "Cakupan jaringan nirkabel kepadatan tinggi untuk ribuan mahasiswa & dosen, laboratorium komputer lengkap dengan skema sewa perangkat laptop/PC terkelola tanpa biaya modal awal.",
    tags: ["WiFi 6 High Density", "Fleet Rental Laptops", "Bandwidth Management", "Zero Capex"],
    recHardware: "Aruba Instant-On AP25, Lenovo ThinkPad Managed Fleet, MikroTik CCR",
    sla: "Maintenance & Onsite Replacement Garansi 1x24 Jam"
  },
  "manufacturing-network-large": {
    title: "Industrial IoT Network & Ruggedized Infrastructure",
    desc: "Jaringan pabrik terproteksi getaran dan suhu ekstrem, sistem pemantauan lini produksi terpusat, dan integrasi konektivitas ERP gudang dengan latensi ultra-rendah.",
    tags: ["Industrial Switches", "Perimeter Security", "Wireless Point-to-Point", "Redundant PDU"],
    recHardware: "Moxa/Cisco Industrial, Fortinet Firewall, Ubiquiti AirFiber",
    sla: "Zero Downtime Production SLA Guarantee"
  },
  "default": {
    title: "Custom Integrated IT Solution & Managed Architecture",
    desc: "Solusi terpadu mencakup pengadaan perangkat keras enterprise, konfigurasi jaringan terpusat, firewall proteksi siber, dan kontrak pemeliharaan berkala bergaransi resmi.",
    tags: ["Network Integration", "Enterprise Hardware", "Cyber Security", "Full Managed Service"],
    recHardware: "Dell/Lenovo Enterprise, Cisco/Fortinet, Schneider APC",
    sla: "Standar Layanan SLA Responsif < 4 Jam"
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
    const data = solutionDatabase[key] || solutionDatabase["default"];

    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (slaEl) slaEl.textContent = `⚡ Standar Layanan: ${data.sla}`;

    if (tagsEl) {
      tagsEl.innerHTML = data.tags.map(tag => `<span class="advisor-tag">${tag}</span>`).join('');
    }

    if (quoteBtn) {
      quoteBtn.onclick = () => {
        openModalWithPrefill(data.title, sectorSelect.options[sectorSelect.selectedIndex].text);
      };
    }
  }

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

    if (valDevices) valDevices.textContent = `${units} Unit`;
    if (valDuration) valDuration.textContent = `${months} Bulan`;

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
        savingsEl.textContent = `Hemat ± ${formatRupiah(diff)} (${Math.round((diff / totalCapex) * 100)}% Efisiensi Modal & Bebas Resiko Depresiasi)`;
      } else {
        savingsEl.textContent = `Bebas Biaya Modal Awal (Zero CapEx) & Perlindungan Kerusakan Total`;
      }
    }
  }

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
