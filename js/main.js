/* ================================================================
   VEGA CURRE — main.js
   Mobile Nav · Scroll Effects · Reveal · Counter · FAQ · Subnav
   ================================================================ */

// ──────────────────────────────────────────────────────────────
// 1. MOBILE NAVIGATION
// ──────────────────────────────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks      = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    const icon = mobileMenuBtn.querySelector('i');
    icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }
  });

  // Handle nav items (including dropdown parents)
  const allLinks = navLinks.querySelectorAll('.nav-link, .dropdown-item');
  
  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const isMobile = window.innerWidth <= 768;
      
      // Top-level dropdown parent?
      const parentDropdown = link.closest('.nav-item-dropdown');
      const isTopLevelToggle = parentDropdown && link.classList.contains('nav-link') && parentDropdown.querySelector('.dropdown-menu');
      
      // Nested dropdown parent?
      const submenuParent = link.closest('.dropdown-submenu');
      const isSubmenuToggle = submenuParent && link.classList.contains('dropdown-item') && submenuParent.querySelector('.submenu');

      if (isMobile && (isTopLevelToggle || isSubmenuToggle)) {
        const toggleTarget = isTopLevelToggle ? parentDropdown : submenuParent;
        
        if (!toggleTarget.classList.contains('open')) {
          e.preventDefault();
          e.stopPropagation();
          
          // Close siblings at the same level
          const siblings = toggleTarget.parentElement.querySelectorAll(isTopLevelToggle ? '.nav-item-dropdown.open' : '.dropdown-submenu.open');
          siblings.forEach(s => {
            if (s !== toggleTarget) s.classList.remove('open');
          });
          
          toggleTarget.classList.add('open');
        } else {
          // Already open - let it navigate
          if (link.classList.contains('nav-link')) {
            // Top level nav-link closure handled by page reload, 
            // but for smooth UX we can just let it go.
          }
        }
      } else {
        // Normal link behavior
        if (!link.closest('.nav-item-dropdown') || !isMobile) {
          navLinks.classList.remove('open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          const icon = mobileMenuBtn.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }
      }
    });
  });

  // Handle dropdown internal links (prevent bubble-up that closes the menu incorrectly)
  navLinks.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
      // Remove 'open' class from parent dropdown so it's fresh next time
      const dropdown = item.closest('.nav-item-dropdown');
      if (dropdown) dropdown.classList.remove('open');
    });
  });
}

// ──────────────────────────────────────────────────────────────
// 2. NAVBAR SCROLL SHADOW
// ──────────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ──────────────────────────────────────────────────────────────
// 3. SCROLL REVEAL ANIMATION (Optimized for Mobile Speed)
// ──────────────────────────────────────────────────────────────
let revealTicking = false;

function runReveal() {
  const threshold = 80;
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - threshold) {
      el.classList.add('active');
    }
  });
  revealTicking = false;
}

const onScrollReveal = () => {
  if (!revealTicking) {
    requestAnimationFrame(runReveal);
    revealTicking = true;
  }
};

window.addEventListener('scroll', onScrollReveal, { passive: true });
window.addEventListener('load', runReveal);

// ──────────────────────────────────────────────────────────────
// 4. ANIMATED COUNTER
// ──────────────────────────────────────────────────────────────
function animateCounter(el, target, duration = 1800) {
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  }
  requestAnimationFrame(step);
}

// Observe counter elements and fire when in view
const counterEls = document.querySelectorAll('.counter');
if (counterEls.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = '1';
        const target = parseInt(entry.target.dataset.target, 10);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));
}

// ──────────────────────────────────────────────────────────────
// 5. FAQ ACCORDION
// ──────────────────────────────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item     = btn.closest('.faq-item');
    const isActive = item.classList.contains('active');

    // Close all open items in same list
    const list = item.closest('.faq-list');
    if (list) {
      list.querySelectorAll('.faq-item.active').forEach(openItem => {
        openItem.classList.remove('active');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
    }

    // Toggle this one (unless it was already open)
    if (!isActive) {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ──────────────────────────────────────────────────────────────
// 6. TREATMENTS SUB-NAV — active state on scroll
// ──────────────────────────────────────────────────────────────
const subnavLinks = document.querySelectorAll('.subnav-link[data-section]');
if (subnavLinks.length) {
  const sectionIds = Array.from(subnavLinks).map(l => l.dataset.section);

  function updateSubnav() {
    let current = sectionIds[0];
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) {
        const top = section.getBoundingClientRect().top;
        if (top <= 160) current = id;
      }
    });
    subnavLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  let subnavTicking = false;
  function onScrollSubnav() {
    if (!subnavTicking) {
      requestAnimationFrame(() => {
        updateSubnav();
        subnavTicking = false;
      });
      subnavTicking = true;
    }
  }

  window.addEventListener('scroll', onScrollSubnav, { passive: true });
  updateSubnav();
}

// ──────────────────────────────────────────────────────────────
// 7. SMOOTH SCROLL for hash links
// ──────────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').slice(1);
    const target   = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      const navH    = navbar ? navbar.offsetHeight : 80;
      const subnavEl = document.querySelector('.treatment-subnav');
      const subnavH = subnavEl ? subnavEl.offsetHeight : 0;
      const offset  = target.getBoundingClientRect().top + window.scrollY - navH - subnavH - 16;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ──────────────────────────────────────────────────────────────
// 8. SET TODAY AS MINIMUM DATE for booking form
// ──────────────────────────────────────────────────────────────
const dateField = document.getElementById('date');
if (dateField && !dateField.min) {
  const t    = new Date();
  const yyyy = t.getFullYear();
  const mm   = String(t.getMonth() + 1).padStart(2, '0');
  const dd   = String(t.getDate()).padStart(2, '0');
  dateField.min = `${yyyy}-${mm}-${dd}`;
}

// ──────────────────────────────────────────────────────────────
// 9. RULE-BASED STATIC CHATBOT
// ──────────────────────────────────────────────────────────────
function initChatbot() {
  const chatHTML = `
    <div id="vc-chatbot-container">
      <button id="vc-chatbot-toggle" aria-label="Open Chat Help"><i class="fas fa-comment-dots"></i></button>
      <div id="vc-chatbot-window" class="chat-hidden">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar"><i class="fas fa-robot"></i></div>
            <div>
              <strong>Vega Curre Assistant</strong>
              <span>Online</span>
            </div>
          </div>
          <button id="vc-chatbot-close"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-body" id="vc-chat-body">
          <div class="chat-message bot-msg">
            Hello! Welcome to Vega Curre. How can I assist you today?
          </div>
          <div class="chat-options" id="vc-chat-options">
            <button class="chat-opt-btn" data-query="book">Book Appointment</button>
            <button class="chat-opt-btn" data-query="treatments">View Treatments</button>
            <button class="chat-opt-btn" data-query="location">Location & Hours</button>
            <button class="chat-opt-btn" data-query="contact">Talk to Human (WhatsApp)</button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const toggleBtn = document.getElementById('vc-chatbot-toggle');
  const closeBtn = document.getElementById('vc-chatbot-close');
  const chatWindow = document.getElementById('vc-chatbot-window');
  const chatBody = document.getElementById('vc-chat-body');
  const chatOptions = document.getElementById('vc-chat-options');

  toggleBtn.addEventListener('click', () => {
    chatWindow.classList.remove('chat-hidden');
    toggleBtn.style.transform = 'scale(0)';
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.classList.add('chat-hidden');
    toggleBtn.style.transform = 'scale(1)';
  });

  function appendUserMsg(text) {
    const msg = document.createElement('div');
    msg.className = 'chat-message user-msg';
    msg.textContent = text;
    chatOptions.before(msg);
  }

  function appendBotMsg(text, html = false) {
    const msg = document.createElement('div');
    msg.className = 'chat-message bot-msg';
    if (html) msg.innerHTML = text;
    else msg.textContent = text;
    chatOptions.before(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  document.querySelectorAll('.chat-opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.dataset.query;
      appendUserMsg(e.target.textContent);

      setTimeout(() => {
        if (type === 'book') {
          appendBotMsg('Great! You can book an appointment online or easily message our desk via WhatsApp.<br><br><a href="/booking.html" class="chat-link-btn" style="margin-top: 10px;">Book Online</a>', true);
        } else if (type === 'treatments') {
          appendBotMsg('We offer expert Orthopedic, Dental, Pediatrics, and more.<br><br><a href="/treatments.html" class="chat-link-btn" style="margin-top: 10px;">See All Treatments</a>', true);
        } else if (type === 'location') {
          appendBotMsg('We are located at Hebbal Kempapura, Bengaluru.<br><b>Hours:</b> Mon-Sat: 10AM - 8PM.<br><a href="/contact.html" class="chat-link-btn" style="margin-top: 10px;">View Map</a>', true);
        } else if (type === 'contact') {
          appendBotMsg('Click below to chat with our clinic reception directly on WhatsApp!<br><br><a href="https://wa.me/916364123431" target="_blank" class="chat-link-btn chat-wa" style="margin-top: 10px;"><i class="fab fa-whatsapp"></i> WhatsApp Desk</a>', true);
        }
      }, 500);
    });
  });
}

// ──────────────────────────────────────────────────────────────
// 10. DELAYED BOOKING POPUP
// ──────────────────────────────────────────────────────────────
function initBookingPopup() {
  const popupHTML = `
    <div id="vc-popup-overlay">
      <div id="vc-booking-popup" class="modal-mode">
        <button class="popup-close" id="vc-popup-close" aria-label="Close"><i class="fas fa-times"></i></button>
        <div class="popup-modal-grid">
          <div class="popup-image">
            <img src="./expert-consultation.png" alt="Expert Consultation">
          </div>
          <div class="popup-content">
            <span class="popup-tag">Limited Time Offer</span>
            <h4>Start Your Journey to Recovery Today</h4>
            <p>Get a personalized consultation with our expert specialists. We help you find the root cause and provide state-of-the-art regenerative treatments.</p>
            <ul class="popup-benefits">
              <li><i class="fas fa-check-circle"></i> Board-Certified Specialists</li>
              <li><i class="fas fa-check-circle"></i> Advanced Diagnostic Tools</li>
              <li><i class="fas fa-check-circle"></i> Evidence-Based Care</li>
            </ul>
            <div class="popup-actions-vertical">
              <a href="/booking.html" class="btn btn-primary btn-block">Book Your Consultation Now</a>
              <a href="https://wa.me/916364123431" target="_blank" class="btn btn-outline btn-block"><i class="fab fa-whatsapp"></i> Inquiry via WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Only show if not dismissed and NOT on booking page
  if (localStorage.getItem('vc-popup-dismissed')) return;
  if (window.location.pathname.includes('booking.html')) return;

  document.body.insertAdjacentHTML('beforeend', popupHTML);
  const overlay = document.getElementById('vc-popup-overlay');
  const popup = document.getElementById('vc-booking-popup');
  const close = document.getElementById('vc-popup-close');

  setTimeout(() => {
    if (overlay) overlay.classList.add('visible');
    if (popup) popup.classList.add('visible');
  }, 5000);

  const dismissPopup = () => {
    overlay.classList.remove('visible');
    popup.classList.remove('visible');
    localStorage.setItem('vc-popup-dismissed', 'true');
    setTimeout(() => overlay.remove(), 800);
  };

  if (close) close.addEventListener('click', dismissPopup);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismissPopup();
    });
  }
}

// ──────────────────────────────────────────────────────────────
// 11. PREMIUM HERO SLIDER (Swiper Initialization)
// ──────────────────────────────────────────────────────────────
function initHeroSlider() {
  const sliderEl = document.querySelector('.hero-slider');
  if (sliderEl && typeof Swiper !== 'undefined') {
    new Swiper('.hero-slider', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

// ──────────────────────────────────────────────────────────────
// 12. SPECIALTY CARD SLIDER (Aster-style carousel)
// ──────────────────────────────────────────────────────────────
function initSpecSlider() {
  const el = document.querySelector('.spec-slider');
  if (!el || typeof Swiper === 'undefined') return;
  new Swiper('.spec-slider', {
    slidesPerView: 3,
    spaceBetween: 28,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 700,
    navigation: {
      nextEl: '.spec-btn-next',
      prevEl: '.spec-btn-prev',
    },
    breakpoints: {
      0:    { slidesPerView: 1.15, spaceBetween: 16 },
      640:  { slidesPerView: 2.1,  spaceBetween: 20 },
      1024: { slidesPerView: 3,    spaceBetween: 28 },
    },
  });
}

// ──────────────────────────────────────────────────────────────
// 13. CLINICAL VIDEO SLIDER
// ──────────────────────────────────────────────────────────────
function initVideoSlider() {
  const el = document.querySelector('.video-slider');
  if (!el || typeof Swiper === 'undefined') return;
  new Swiper('.video-slider', {
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    speed: 800,
    centeredSlides: false,
    grabCursor: true,
    navigation: {
      nextEl: '.video-btn-next',
      prevEl: '.video-btn-prev',
    },
    pagination: {
      el: '.video-pagination',
      clickable: true,
    },
    breakpoints: {
      0:    { slidesPerView: 1.1, spaceBetween: 16 },
      768:  { slidesPerView: 2.1, spaceBetween: 20 },
      1024: { slidesPerView: 3,   spaceBetween: 24 },
    },
  });
}

// ──────────────────────────────────────────────────────────────
// 13. DYNAMIC SERVICE & DOCTOR FILTERING
// ──────────────────────────────────────────────────────────────
function initServiceFilter() {
  const urlParams = new URLSearchParams(window.location.search);
  const service = urlParams.get('service');
  const dept = urlParams.get('dept');
  
  if (service || dept) {
    document.body.classList.add('filtered-view');
    
    // Mapping for display names
    const names = {
      'ortho': 'Orthopedics & Sports Medicine',
      'orthopedics': 'Orthopedics & Sports Medicine',
      'dental': 'Advanced Dental Care',
      'pediatrics': 'Pediatrics & Child Health',
      'peds': 'Pediatrics & Child Health',
      'obgyn': 'Obstetrics & Gynaecology',
      'gynecology': 'Obstetrics & Gynaecology',
      'gynaecology': 'Obstetrics & Gynaecology',
      'physio': 'Physiotherapy & Rehab',
      'physiotherapy': 'Physiotherapy & Rehab',
      'surgery': 'General & Laparoscopic Surgery',
      'neurology': 'Neurology & Nerve Care',
      'neuro': 'Neurology & Nerve Care',
      'ent': 'Ear, Nose & Throat (ENT)',
      'other': 'Specialized Medical Services'
    };

    // Mapping for focus areas (subtitle)
    const focus = {
      'ortho': 'musculoskeletal',
      'orthopedics': 'musculoskeletal',
      'dental': 'oral health',
      'peds': 'child development',
      'pediatrics': 'child development',
      'obgyn': 'women\'s health',
      'gynecology': 'women\'s health',
      'gynaecology': 'women\'s health',
      'neuro': 'neurological',
      'neurology': 'neurological',
      'surgery': 'surgical',
      'ent': 'ENT',
      'physio': 'rehabilitative',
      'physiotherapy': 'rehabilitative'
    };

    // Handle Treatments Filtering
    if (service) {
      const activeServiceName = document.getElementById('active-dept-tag');
      const sections = document.querySelectorAll('section[data-service]');
      const activeSections = document.querySelectorAll(`section[data-service="${service}"]`);
      
      if (activeSections.length > 0) {
        sections.forEach(s => s.classList.remove('active-service'));
        activeSections.forEach(s => s.classList.add('active-service'));
        if (activeServiceName) activeServiceName.textContent = names[service] || service.toUpperCase();
        
        scrollToFirst(activeSections[0]);
      }
    }

    // Handle Doctor Filtering (About Page)
    if (dept) {
      // Normalize slug for internal consistency
      const slugMap = {
        'peds': 'pediatrics',
        'neuro': 'neurology',
        'physio': 'physio',
        'physiotherapy': 'physio',
        'gynaecology': 'obgyn',
        'gynecology': 'obgyn'
      };
      const normalizedDept = slugMap[dept] || dept;

      const docCards = document.querySelectorAll('.doctor-card[data-dept]');
      const activeDocs = document.querySelectorAll(`.doctor-card[data-dept="${normalizedDept}"]`);
      const activeDeptTag = document.getElementById('active-dept-tag');
      
      if (activeDocs.length > 0) {
        docCards.forEach(c => c.classList.remove('active-dept'));
        activeDocs.forEach(c => c.classList.add('active-dept'));
        if (activeDeptTag) activeDeptTag.textContent = names[dept] || dept.toUpperCase();
        
        // Premium Landing View Logic
        const deptHeroSection = document.getElementById('dept-hero-section');
        const deptHeroImg = document.getElementById('dept-hero-img');
        const deptHeroTitle = document.getElementById('dept-hero-title');
        const allDocsHeader = document.getElementById('all-doctors-header');
        const deptDocsHeader = document.getElementById('dept-doctors-header');
        const foundersHeader = document.getElementById('founders-header');
        const visitingHeader = document.getElementById('visiting-header');
        const deptNameInline = document.getElementById('dept-name-inline');
        const deptFocusInline = document.getElementById('dept-focus-inline');

        if (deptHeroSection) {
          deptHeroSection.style.display = 'block';
          if (deptHeroTitle) deptHeroTitle.textContent = names[dept] || `Department of ${dept.toUpperCase()}`;
          if (deptHeroImg) {
            // Use normalized slug for image naming to ensure they exist
            deptHeroImg.src = `./images/dept-${normalizedDept}.png`;
            deptHeroImg.onerror = () => { deptHeroSection.style.display = 'none'; };
          }
        }

        if (allDocsHeader) allDocsHeader.style.display = 'none';
        if (foundersHeader) foundersHeader.style.display = 'none';
        if (visitingHeader) visitingHeader.style.display = 'none';
        
        if (deptDocsHeader) {
          deptDocsHeader.style.display = 'block';
          if (deptNameInline) deptNameInline.textContent = names[dept] || dept.toUpperCase();
          if (deptFocusInline) deptFocusInline.textContent = focus[dept] || 'specialized';
        }

        scrollToFirst(activeDocs[0]);
      }
    }
  }
}

function scrollToFirst(element) {
  if (!element) return;
  setTimeout(() => {
    const navH = 80;
    const bannerH = 60;
    const offset = element.getBoundingClientRect().top + window.pageYOffset - navH - bannerH - 20;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }, 400);
}

// ──────────────────────────────────────────────────────────────
// 14. DOCTOR SPECIALIST SLIDER
// ──────────────────────────────────────────────────────────────
function initDocSlider() {
  const el = document.querySelector('.doc-slider');
  if (!el || typeof Swiper === 'undefined') return;
  new Swiper('.doc-slider', {
    slidesPerView: 3,
    spaceBetween: 28,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 700,
    navigation: {
      nextEl: '.doc-btn-next',
      prevEl: '.doc-btn-prev',
    },
    breakpoints: {
      0:    { slidesPerView: 1.15, spaceBetween: 16 },
      640:  { slidesPerView: 2.1,  spaceBetween: 20 },
      1024: { slidesPerView: 3,    spaceBetween: 28 },
    },
  });
}

// ──────────────────────────────────────────────────────────────
// 15. BACK TO TOP BUTTON
// ──────────────────────────────────────────────────────────────
function initBackToTop() {
  const btnHTML = `<button id="backToTop" class="back-to-top" aria-label="Scroll to top"><i class="fas fa-chevron-up"></i></button>`;
  document.body.insertAdjacentHTML('beforeend', btnHTML);
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ──────────────────────────────────────────────────────────────
// 16. ELITE CUSTOM CURSOR & MAGNETIC BUTTONS
// ──────────────────────────────────────────────────────────────
function initEliteInteractions() {
  if (window.innerWidth <= 1024) return; // Disable on touch devices

  const cursor = document.createElement('div');
  const cursorFollower = document.createElement('div');
  cursor.id = 'elite-cursor';
  cursorFollower.id = 'elite-cursor-follower';
  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    cursorFollower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
    requestAnimationFrame(animateFollower);
  };
  animateFollower();

  // Interaction States
  const interactiveEls = document.querySelectorAll('a, button, .swiper-button-next, .swiper-button-prev, .chat-opt-btn, .hub-card, .specialty-card');
  
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorFollower.classList.add('active');
      cursor.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursorFollower.classList.remove('active');
      cursor.classList.remove('active');
    });
  });

  // Magnetic Effect
  const magneticButtons = document.querySelectorAll('.btn-primary, .btn-nav, .mobile-menu-btn');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0, 0)`;
    });
  });
}

// Update initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
    initBookingPopup();
    initHeroSlider();
    initSpecSlider();
    initDocSlider();
    initVideoSlider();
    initServiceFilter();
    initBackToTop();
    initEliteInteractions();
  });
} else {
  initChatbot();
  initBookingPopup();
  initHeroSlider();
  initSpecSlider();
  initDocSlider();
  initVideoSlider();
  initServiceFilter();
  initBackToTop();
  initEliteInteractions();
}

