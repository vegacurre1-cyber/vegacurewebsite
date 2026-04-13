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

  // Close when a nav link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
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
// 3. SCROLL REVEAL ANIMATION
// ──────────────────────────────────────────────────────────────
function runReveal() {
  const threshold = 80;
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - threshold) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', runReveal, { passive: true });
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

  window.addEventListener('scroll', updateSubnav, { passive: true });
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

// Auto-run when ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initChatbot();
    initBookingPopup();
  });
} else {
  initChatbot();
  initBookingPopup();
}
