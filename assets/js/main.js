/**
 * VOLTSOLAR ENERGY - CORE JAVASCRIPT
 * Modern, Interactive, Fast & Accessible
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initHeader();
  initMobileDrawer();
  initScrollTop();
  initSolarCalculators();
  initProjectFilter();
  initPathSwitcher();
  initForms();
  initScrollAnimations();
  initAnimatedCounters();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('voltsolar_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcons(currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('voltsolar_theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });
}

function updateThemeIcons(theme) {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  themeToggleBtns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
      btn.setAttribute('aria-label', 'Switch to Light Mode');
    } else {
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      btn.setAttribute('aria-label', 'Switch to Dark Mode');
    }
  });
}

/* ==========================================================================
   2. RTL Toggle Support
   ========================================================================== */
function initRTL() {
  const rtlToggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const savedDir = localStorage.getItem('voltsolar_dir') || 'ltr';
  document.documentElement.setAttribute('dir', savedDir);

  rtlToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('voltsolar_dir', newDir);
      btn.setAttribute('aria-label', newDir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
    });
  });
}

/* ==========================================================================
   3. Header & Sticky Scroll
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const checkScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();
}

/* ==========================================================================
   4. Mobile Offcanvas Navigation Drawer
   ========================================================================== */
function initMobileDrawer() {
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.close-drawer-btn');

  if (!hamburger || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   5. Floating Scroll to Top
   ========================================================================== */
function initScrollTop() {
  const scrollTopBtn = document.querySelector('.scroll-top-btn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   6. Solar Savings Calculator (Full & Preview)
   ========================================================================== */
function initSolarCalculators() {
  // Full Page Calculator (calculator.html)
  const fullBillInput = document.getElementById('calc-bill-slider');
  const fullBillDisplay = document.getElementById('calc-bill-val');
  const fullSystemSize = document.getElementById('calc-system-size');
  const fullPanelCount = document.getElementById('calc-panel-count');
  const fullMonthlySavings = document.getElementById('calc-monthly-savings');
  const fullAnnualSavings = document.getElementById('calc-annual-savings');
  const fullLifetimeSavings = document.getElementById('calc-lifetime-savings');
  const fullPayback = document.getElementById('calc-payback');

  const calculateFull = () => {
    if (!fullBillInput) return;
    const bill = parseFloat(fullBillInput.value) || 220;
    if (fullBillDisplay) fullBillDisplay.textContent = `$${bill}`;

    // Calculation models (estimates based on typical Tier 1 solar output)
    const systemSizeKw = ((bill * 12) / (0.28 * 1400)).toFixed(1);
    const panelCount = Math.max(8, Math.ceil((systemSizeKw * 1000) / 420));
    const monthlySave = Math.round(bill * 0.78);
    const annualSave = monthlySave * 12;
    const lifetimeSave = Math.round(annualSave * 25 * 1.03);
    const paybackYears = (5.2 + (bill > 300 ? -0.4 : 0.4)).toFixed(1);

    if (fullSystemSize) fullSystemSize.textContent = `${systemSizeKw} kW`;
    if (fullPanelCount) fullPanelCount.textContent = `${panelCount} Panels`;
    if (fullMonthlySavings) fullMonthlySavings.textContent = `$${monthlySave}`;
    if (fullAnnualSavings) fullAnnualSavings.textContent = `$${annualSave.toLocaleString()}`;
    if (fullLifetimeSavings) fullLifetimeSavings.textContent = `$${lifetimeSave.toLocaleString()}`;
    if (fullPayback) fullPayback.textContent = `${paybackYears} Years`;
  };

  if (fullBillInput) {
    fullBillInput.addEventListener('input', calculateFull);
    calculateFull();
  }

  // Home 2 Preview Calculator
  const h2BillInput = document.getElementById('h2-calc-bill');
  const h2BillDisplay = document.getElementById('h2-calc-bill-display');
  const h2Capacity = document.getElementById('h2-calc-capacity');
  const h2Monthly = document.getElementById('h2-calc-monthly');
  const h2Annual = document.getElementById('h2-calc-annual');
  const h2Payback = document.getElementById('h2-calc-payback');

  const calculateH2 = () => {
    if (!h2BillInput) return;
    const bill = parseFloat(h2BillInput.value) || 250;
    if (h2BillDisplay) h2BillDisplay.textContent = `$${bill}`;

    const capacity = ((bill * 12) / (0.28 * 1400)).toFixed(1);
    const monthlySave = Math.round(bill * 0.76);
    const annualSave = monthlySave * 12;
    const payback = (5.4).toFixed(1);

    if (h2Capacity) h2Capacity.textContent = `${capacity} kW`;
    if (h2Monthly) h2Monthly.textContent = `$${monthlySave}`;
    if (h2Annual) h2Annual.textContent = `$${annualSave.toLocaleString()}`;
    if (h2Payback) h2Payback.textContent = `${payback} Yrs`;
  };

  if (h2BillInput) {
    h2BillInput.addEventListener('input', calculateH2);
    calculateH2();
  }
}

/* ==========================================================================
   7. Project Category Filter
   ========================================================================== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. Solution Two-Path Switcher (Home 2)
   ========================================================================== */
function initPathSwitcher() {
  const tabBtns = document.querySelectorAll('.path-tab-btn');
  const panes = document.querySelectorAll('.path-pane');

  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPath = btn.getAttribute('data-path');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panes.forEach(pane => {
        if (pane.id === `path-${targetPath}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });
}

/* ==========================================================================
   9. Form Validation & Submission Feedback
   ========================================================================== */
function initForms() {
  const forms = document.querySelectorAll('.validate-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Required fields check
      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('is-invalid');
        } else {
          input.classList.remove('is-invalid');
        }

        // Email check
        if (input.type === 'email' && input.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            isValid = false;
            input.classList.add('is-invalid');
          }
        }
      });

      if (isValid) {
        // Show success status
        const statusAlert = form.querySelector('.form-status-alert');
        if (statusAlert) {
          statusAlert.classList.add('success');
          statusAlert.textContent = '✓ Thank you! Your request has been received. Our certified specialist will contact you within 2 hours.';
          form.reset();
          setTimeout(() => {
            statusAlert.classList.remove('success');
          }, 8000);
        } else {
          alert('Thank you! Your inquiry has been submitted successfully.');
          form.reset();
        }
      }
    });

    // Real-time input clearing
    form.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('is-invalid');
        }
      });
    });
  });
}

/* ==========================================================================
   10. Scroll Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================================================
   11. Animated Metric Counters
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 1800;
    const step = target / (duration / 20);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = `${target}${suffix}`;
        clearInterval(timer);
      } else {
        counter.textContent = `${Math.floor(current)}${suffix}`;
      }
    }, 20);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(c => {
      const target = c.getAttribute('data-target');
      const suffix = c.getAttribute('data-suffix') || '';
      c.textContent = `${target}${suffix}`;
    });
  }
}
