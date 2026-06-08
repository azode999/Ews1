// ========== DARK MODE TOGGLE ==========
  (function initDarkMode() {
    const toggleBtn = document.getElementById('darkmodeToggle');
    function updateThemeIcon() {
      if (!toggleBtn) return;
      if (document.body.classList.contains('dark')) {
        toggleBtn.innerHTML = '🌙 Dark';
      } else {
        toggleBtn.innerHTML = '🌞 Light';
      }
    }
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
    }
    updateThemeIcon();
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        updateThemeIcon();
      });
    }
  })();

  //  WHATSAPP COMMUNITY BUTTONS 
  // CHANGE THIS LINK TO YOUR WHATSAPP COMMUNITY INVITE LINK
  const WHATSAPP_LINK = "https://chat.whatsapp.com/YOUR_COMMUNITY_INVITE_LINK";
  
  const whatsappButtons = document.querySelectorAll('#whatsappBtn, #whatsappStoryBtn, .whatsapp-footer, .whatsapp-book, .whatsapp-social');
  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(WHATSAPP_LINK, '_blank');
    });
  });

  // SLIDESHOW
  (function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    if (!slides.length) return;
    let currentSlide = 0;
    let slideInterval;
    const dotsContainer = document.getElementById('sliderDots');
    function createDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === currentSlide) dot.classList.add('active-dot');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }
    function goToSlide(index) {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      currentSlide = index;
      updateDots();
      resetInterval();
    }
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, i) => dot.classList.toggle('active-dot', i === currentSlide));
    }
    function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
    function resetInterval() {
      if (slideInterval) clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 3000);
    }
    createDots();
    resetInterval();
    const sliderDiv = document.querySelector('.hero-slider');
    if (sliderDiv) {
      sliderDiv.addEventListener('mouseenter', () => clearInterval(slideInterval));
      sliderDiv.addEventListener('mouseleave', resetInterval);
    }
  })();

  //  HAMBURGER MENU 
  (function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });
      navLinks.querySelectorAll('a, button').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });
    }
  })();

  //  SMOOTH SCROLL 
  (function initSmoothScroll() {
    const allLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    allLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#') {
          e.preventDefault();
          const targetId = href.substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  })();

  //  WORKBOOK DOWNLOAD 
  (function initWorkbookDownload() {
    const workbookBtn = document.getElementById('downloadWorkbookBtn');
    if (workbookBtn) {
      workbookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const msgSpan = document.getElementById('wbMsg');
        if (msgSpan) {
          msgSpan.innerHTML = '✅ Workbook download started! (PDF simulation)';
          setTimeout(() => { if (msgSpan) msgSpan.innerHTML = ''; }, 3000);
        }
      });
    }
  })();

  // ========== SCROLL REVEAL ANIMATION ==========
  (function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    function checkReveal() {
      const windowHeight = window.innerHeight;
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', checkReveal);
    checkReveal();
  })();

  //  SCROLL TO TOP 
  (function initScrollTop() {
    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollTop.classList.add('show');
        else scrollTop.classList.remove('show');
      });
      scrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  })();

  //  FOOTER NEWSLETTER 
  (function initNewsletter() {
    const subscribeBtn = document.getElementById('footerSubscribeBtn');
    const emailInput = document.getElementById('footerEmail');
    const msgSpan = document.getElementById('footerMsg');
    if (subscribeBtn) {
      subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (!email || !email.includes('@')) {
          msgSpan.innerHTML = '❌ Please enter a valid email.';
          return;
        }
        msgSpan.innerHTML = '✅ Subscribed! Check your inbox.';
        emailInput.value = '';
        setTimeout(() => { msgSpan.innerHTML = ''; }, 3000);
      });
    }
  })();
