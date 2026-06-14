/* ===================================
   CRE 2026 Tokyo - Main JavaScript
   =================================== */

// ===================================
// Core Initialization
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('CRE 2026 Tokyo Website Initialized');
    
    // Core functionality
    initBackgroundSlideshow();
    initMobileMenu();
    initStickyHeader();
    initScrollToTop();
    initLanguageSwitcher();
    
    console.log('All modules loaded');
});

// ===================================
// Language Switcher Logic (Google Translate Hybrid)
// ===================================
function initLanguageSwitcher() {
    // 1. Inject Google Translate Script
    if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
        
        // Create hidden element for Google Translate (Must be renderable)
        const hiddenDiv = document.createElement('div');
        hiddenDiv.id = 'google_translate_element';
        hiddenDiv.style.position = 'absolute';
        hiddenDiv.style.top = '-9999px';
        hiddenDiv.style.left = '-9999px';
        hiddenDiv.style.visibility = 'hidden';
        document.body.appendChild(hiddenDiv);
    }

    // 2. Create Custom Switcher UI (AR -> EN -> JP)
    const switcher = document.createElement('div');
    switcher.className = 'lang-switch';
    switcher.innerHTML = `
        <button class="lang-btn" data-lang="ar">العربية</button>
        <button class="lang-btn" data-lang="en">English</button>
        <button class="lang-btn" data-lang="ja">日本語</button>
    `;
    document.body.appendChild(switcher);

    // 3. Handle Click
    const buttons = switcher.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            applyLanguage(lang);
        });
    });

    // 4. Load Saved Language or Default
    // Wait for Google Translate to be ready if possible, but apply UI changes immediately
    const savedLang = localStorage.getItem('cre26_lang') || 'en';
    // Delay slightly to allow Google Translate to load
    setTimeout(() => applyLanguage(savedLang), 500);
}

function applyLanguage(lang) {
    console.log('Applying language:', lang);

    // 1. Update HTML Attributes (Font & Direction)
    document.documentElement.lang = lang;
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
    } else {
        document.documentElement.dir = 'ltr';
    }

    // 2. Update Active Button
    document.querySelectorAll('.lang-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });

    // 3. Apply Translations from translations.js
    if (typeof translations !== 'undefined' && translations[lang]) {
        const dict = translations[lang];
        
        // Find all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });

        // Find all elements with data-i18n-html attribute (for HTML content)
        const htmlElements = document.querySelectorAll('[data-i18n-html]');
        htmlElements.forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (dict[key]) {
                el.innerHTML = dict[key];
            }
        });
    }

    // 4. Trigger Google Translate (Fallback for body content)
    triggerGoogleTranslate(lang);

    // Save Preference
    localStorage.setItem('cre26_lang', lang);
}

// Global function for Google Translate Callback
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'ar,en,ja',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
    }, 'google_translate_element');
};

function triggerGoogleTranslate(langCode) {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
    }
}

// Helper to read cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
}

// ===================================
// Other Functions
// ===================================
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const dropdownParents = document.querySelectorAll('nav ul li.has-dropdown');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            if (!nav.classList.contains('active')) {
                dropdownParents.forEach(parent => parent.classList.remove('active'));
            }
        });

        dropdownParents.forEach(parent => {
            const link = parent.querySelector('a');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 900) {
                        e.preventDefault();
                        parent.classList.toggle('active');
                    }
                });
            }
        });
    }
}

function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function initScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.display = 'flex';
            setTimeout(() => scrollBtn.style.opacity = '1', 10);
        } else {
            scrollBtn.style.opacity = '0';
            setTimeout(() => scrollBtn.style.display = 'none', 300);
        }
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

function initBackgroundSlideshow() {
    const slides = document.querySelectorAll('.bg-slide');
    if (slides.length <= 1) return;
    // Random first slide
    slides[0].classList.remove('active');
    let currentSlide = Math.floor(Math.random() * slides.length);
    slides[currentSlide].classList.add('active');
    setInterval(() => {
        let nextSlide;
        do {
            nextSlide = Math.floor(Math.random() * slides.length);
        } while (nextSlide === currentSlide);
        slides[currentSlide].classList.remove('active');
        slides[nextSlide].classList.add('active');
        currentSlide = nextSlide;
    }, 8000);
}

// ===================================
// Social Share Buttons (Facebook, X, Instagram, LinkedIn)
// ===================================
function initShareButtons() {
    const footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.footer-share')) return;

    const pageUrl = window.location.href;
    const wrap = document.createElement('div');
    wrap.className = 'footer-share';
    wrap.innerHTML = `
        <span class="footer-share-label" data-i18n="share_label">Share this page</span>
        <div class="footer-share-btns">
            <a class="share-btn share-fb" href="#" rel="noopener" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></a>
            <a class="share-btn share-x" href="#" rel="noopener" aria-label="Share on X"><i class="fab fa-x-twitter"></i></a>
            <a class="share-btn share-ig" href="#" rel="noopener" aria-label="Share on Instagram"><i class="fab fa-instagram"></i></a>
            <a class="share-btn share-in" href="#" rel="noopener" aria-label="Share on LinkedIn"><i class="fab fa-linkedin-in"></i></a>
        </div>`;

    const bottom = footer.querySelector('.footer-bottom');
    if (bottom) footer.insertBefore(wrap, bottom);
    else footer.appendChild(wrap);

    const u = encodeURIComponent(pageUrl);
    const t = encodeURIComponent(document.title);
    const popup = (shareUrl) => window.open(shareUrl, 'cre26share', 'noopener,noreferrer,width=600,height=540');

    wrap.querySelector('.share-fb').addEventListener('click', function (e) {
        e.preventDefault();
        popup('https://www.facebook.com/sharer/sharer.php?u=' + u);
    });
    wrap.querySelector('.share-x').addEventListener('click', function (e) {
        e.preventDefault();
        popup('https://twitter.com/intent/tweet?url=' + u + '&text=' + t);
    });
    wrap.querySelector('.share-in').addEventListener('click', function (e) {
        e.preventDefault();
        popup('https://www.linkedin.com/sharing/share-offsite/?url=' + u);
    });
    // Instagram has no web share-by-URL; copy the link so the user can paste it.
    wrap.querySelector('.share-ig').addEventListener('click', function (e) {
        e.preventDefault();
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(pageUrl).then(showShareToast).catch(function () {
                window.open('https://www.instagram.com/', '_blank', 'noopener');
            });
        } else {
            window.open('https://www.instagram.com/', '_blank', 'noopener');
        }
    });
}

function showShareToast() {
    let toast = document.getElementById('share-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'share-toast';
        toast.className = 'share-toast';
        document.body.appendChild(toast);
    }
    let msg = 'Link copied! Paste it into Instagram.';
    if (typeof translations !== 'undefined') {
        const lang = localStorage.getItem('cre26_lang') || 'en';
        if (translations[lang] && translations[lang].share_copied) msg = translations[lang].share_copied;
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
}

// Placeholder functions for safety
function initNewsletterForm() {}
function initSearch() {}
function initBackButton() {}
function initPrintButton() {}
function initAccordions() {}
function initLazyLoading() {}
function initCopyButtons() {}
function initExternalLinks() {}
function initFormValidation() {}
