// ========== DARK MODE TOGGLE with localStorage ==========
(function initDarkMode() {
  const toggleBtn = document.getElementById('darkmodeToggle');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
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

// ========== WORKBOOK DOWNLOAD FUNCTIONALITY ==========
(function initWorkbookDownload() {
  const workbookBtn = document.getElementById('downloadWorkbookBtn');
  if (workbookBtn) {
    workbookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const msgSpan = document.getElementById('wbMsg');
      if (msgSpan) {
        msgSpan.innerHTML = '✅ Workbook download started! (PDF simulation) — <a href="#" style="color:var(--gold);">Click again to simulate</a>';
        setTimeout(() => {
          if (msgSpan) msgSpan.innerHTML = '';
        }, 3000);
      } else {
        alert('📘 Workbook download: The Genesis & Extraordinary workbooks are ready.');
      }
    });
  }
})();

// ========== SMOOTH SCROLL FOR WORKBOOK CTA ==========
(function initSmoothScroll() {
  const ctaLinks = document.querySelectorAll('a[href*="workbook-cta"]');
  ctaLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('workbook-cta');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

// ========== REGISTER/LOGIN FORM FUNCTIONALITY ==========
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
      
      if (isLogin) {
        if (msgDiv) msgDiv.innerHTML = `✅ Welcome back! <strong>${email}</strong> logged in successfully.`;
      } else {
        if (msgDiv) msgDiv.innerHTML = `🎉 Account created for ${email}! You can now login.`;
      }
      
      authForm.reset();
      setTimeout(() => { if (msgDiv) msgDiv.innerHTML = ''; }, 3000);
    });
  }
})();

console.log('Excellence with a Soul™ — All systems ready.');