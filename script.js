// ========== DARK MODE TOGGLE WITH SUN/MOON ICONS ==========
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
  
  // Load saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  updateThemeIcon();
  
  // Toggle theme on button click
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      updateThemeIcon();
    });
  }
})();

// ========== HOMEPAGE SLIDESHOW ==========
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
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
    updateDots();
    resetInterval();
  }
  
  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      if (i === currentSlide) dot.classList.add('active-dot');
      else dot.classList.remove('active-dot');
    });
  }
  
  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }
  
  function resetInterval() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  createDots();
  resetInterval();
  
  const sliderDiv = document.querySelector('.hero-slider');
  if (sliderDiv) {
    sliderDiv.addEventListener('mouseenter', () => clearInterval(slideInterval));
    sliderDiv.addEventListener('mouseleave', resetInterval);
  }
})();

// ========== HAMBURGER MENU ==========
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }
})();

// ========== SMOOTH SCROLL FOR NAVIGATION ==========
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

// ========== WORKBOOK DOWNLOAD ==========
(function initWorkbookDownload() {
  const workbookBtn = document.getElementById('downloadWorkbookBtn');
  if (workbookBtn) {
    workbookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const msgSpan = document.getElementById('wbMsg');
      if (msgSpan) {
        msgSpan.innerHTML = '✅ Workbook download started! (PDF simulation)';
        setTimeout(() => {
          if (msgSpan) msgSpan.innerHTML = '';
        }, 3000);
      }
    });
  }
})();

// ========== SCROLL TO TOP BUTTON ==========
(function initScrollTop() {
  const scrollTop = document.getElementById('scrollTop');
  if (scrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTop.classList.add('show');
      } else {
        scrollTop.classList.remove('show');
      }
    });
    
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

// ========== AUTH FORM LOGIC (Login/Sign Up) ==========
(function initAuthForm() {
  const authForm = document.getElementById('authForm');
  const toggleLink = document.getElementById('toggleText');
  const formTitle = document.getElementById('formTitle');
  const submitBtn = document.getElementById('submitBtn');
  const msgDiv = document.getElementById('formMessage');
  
  if (authForm && toggleLink) {
    let isLogin = true;
    
    function switchMode() {
      isLogin = !isLogin;
      if (formTitle) formTitle.innerText = isLogin ? 'Login' : 'Sign Up';
      if (submitBtn) submitBtn.innerText = isLogin ? 'Login' : 'Create Account';
      if (toggleLink) toggleLink.innerText = isLogin ? "Don't have an account? Sign up" : "Already have an account? Login";
      if (msgDiv) msgDiv.innerHTML = '';
    }
    
    toggleLink.addEventListener('click', switchMode);
    
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email')?.value;
      const password = document.getElementById('password')?.value;
      
      if (!email || !password) {
        if (msgDiv) msgDiv.innerText = '❌ Please fill all fields.';
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        if (msgDiv) msgDiv.innerText = '❌ Please enter a valid email address.';
        return;
      }
      
      if (password.length < 4) {
        if (msgDiv) msgDiv.innerText = '❌ Password must be at least 4 characters.';
        return;
      }
      
      if (isLogin) {
        if (msgDiv) msgDiv.innerHTML = `✅ Welcome back! <strong>${email}</strong> logged in successfully.`;
      } else {
        if (msgDiv) msgDiv.innerHTML = `🎉 Account created for ${email}! You can now login.`;
      }
      
      authForm.reset();
      setTimeout(() => { if (msgDiv) msgDiv.innerHTML = ''; }, 4000);
    });
  }
})();

console.log('Excellence with a Soul™ — All systems ready.');