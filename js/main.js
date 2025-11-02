/* ========================================
   CRE 2026 Tokyo - Main JavaScript
   Elegant interactions and animations
   ======================================== */

// ========================================
// 1. DOM Ready & Initialization
// ========================================
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollEffects();
  initScrollReveal();
  initScrollToTop();
  initMobileMenu();
  initDropdowns();
  initSmoothScroll();
  initFormValidation();
});

// ========================================
// 2. Navigation - Scroll Effects
// ========================================
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Add scrolled class on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Set active link based on scroll position
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ========================================
// 3. Scroll Effects - Navbar Shadow
// ========================================
function initScrollEffects() {
  let lastScroll = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add shadow on scroll
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });
}

// ========================================
// 4. Scroll Reveal - Fade In Animations
// ========================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 100;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
}

// ========================================
// 5. Scroll to Top Button
// ========================================
function initScrollToTop() {
  const scrollTopBtn = document.querySelector('.scroll-top');
  
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========================================
// 6. Mobile Menu Toggle
// ========================================
function initMobileMenu() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (!navToggle || !navMenu) return;
  
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========================================
// 7. Dropdown Menus
// ========================================
function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (!toggle || !menu) return;
    
    // For mobile - toggle on click
    if (window.innerWidth <= 768) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    }
  });
  
  // Update on resize
  window.addEventListener('resize', () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      if (window.innerWidth > 768) {
        dropdown.classList.remove('active');
      }
    });
  });
}

// ========================================
// 8. Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip empty hash or just "#"
      if (href === '#' || href === '') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ========================================
// 9. Form Validation
// ========================================
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // Form is valid - you can submit here
        showNotification('Form submitted successfully!', 'success');
        form.reset();
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateInput(input);
      });
      
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateInput(input);
        }
      });
    });
  });
}

function validateInput(input) {
  const value = input.value.trim();
  const type = input.type;
  let isValid = true;
  let errorMessage = '';
  
  // Check if required
  if (input.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  
  // Email validation
  if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Show/hide error
  if (!isValid) {
    showInputError(input, errorMessage);
  } else {
    clearInputError(input);
  }
  
  return isValid;
}

function showInputError(input, message) {
  input.classList.add('error');
  
  // Remove existing error message
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add new error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = '#E86C5C';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  input.parentElement.appendChild(errorDiv);
  
  // Add error border
  input.style.borderColor = '#E86C5C';
}

function clearInputError(input) {
  input.classList.remove('error');
  input.style.borderColor = '';
  
  const errorMessage = input.parentElement.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// ========================================
// 10. Notification System
// ========================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '1rem 1.5rem',
    background: type === 'success' ? '#6BA368' : '#E86C5C',
    color: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    zIndex: '10000',
    animation: 'slideInRight 0.3s ease',
    maxWidth: '400px'
  });
  
  document.body.appendChild(notification);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// ========================================
// 11. Countdown Timer (if needed)
// ========================================
function initCountdown(targetDate) {
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
      countdownElement.innerHTML = '<p>The conference has begun!</p>';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    countdownElement.innerHTML = `
      <div class="countdown-grid">
        <div class="countdown-item">
          <span class="countdown-value">${days}</span>
          <span class="countdown-label">Days</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${hours}</span>
          <span class="countdown-label">Hours</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${minutes}</span>
          <span class="countdown-label">Minutes</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-value">${seconds}</span>
          <span class="countdown-label">Seconds</span>
        </div>
      </div>
    `;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ========================================
// 12. Image Lazy Loading
// ========================================
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// ========================================
// 13. Accordion Functionality
// ========================================
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion-header');
  
  accordions.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains('active');
      
      // Close all accordions
      document.querySelectorAll('.accordion-header').forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.style.maxHeight = null;
      });
      
      // Open clicked accordion if it was closed
      if (!isOpen) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

// ========================================
// 14. Tab Functionality
// ========================================
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;
      const tabGroup = button.closest('.tabs');
      
      // Remove active class from all buttons and contents in this group
      tabGroup.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      tabGroup.querySelector(`[data-tab-content="${targetTab}"]`).classList.add('active');
    });
  });
}

// ========================================
// 15. Copy to Clipboard
// ========================================
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showNotification('Copied to clipboard!', 'success');
  }).catch(err => {
    showNotification('Failed to copy', 'error');
  });
}

// ========================================
// 16. Modal Functionality
// ========================================
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modalTrigger;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========================================
// 17. Animation on Scroll (AOS-like)
// ========================================
function initAnimateOnScroll() {
  const elements = document.querySelectorAll('[data-aos]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// Initialize AOS on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimateOnScroll);
} else {
  initAnimateOnScroll();
}

// ========================================
// 18. Loading Animation
// ========================================
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 300);
  }
});

// ========================================
// 19. Utility Functions
// ========================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// 20. Console Welcome Message
// ========================================
console.log('%c CRE 2026 Tokyo ', 'background: #E86C5C; color: white; font-size: 20px; padding: 10px;');
console.log('%c Current Research in Egyptology ', 'color: #3A3A3A; font-size: 14px;');
console.log('%c July 11-15, 2026 | University of Tsukuba Tokyo Campus ', 'color: #8B8B8B; font-size: 12px;');
