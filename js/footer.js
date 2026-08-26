/* ==========================================================================
   PORTFOLIO FOOTER CONTROLLER
   ========================================================================== */

import { navigationLinks, resourceLinks, socialLinks, footerMetadata } from '../data/footer.js';
import { select, selectAll } from './helpers.js';
import { animationManager } from './animations.js';
import { themeManager } from './theme.js';
import { events } from './events.js';

export const footerManager = {
  // DOM Elements cache
  dom: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  cacheDOM() {
    this.dom.navLinksRoot = select('#footer-nav-links-root');
    this.dom.resourcesRoot = select('#footer-resources-links-root');
    this.dom.socialRoot = select('#footer-social-links-root');
    this.dom.yearSpan = select('#footer-year');
    this.dom.themeIndicator = select('#footer-theme-indicator-root');
    this.dom.backToTopContainer = select('#back-to-top-container');
    this.dom.backToTopBtn = select('#back-to-top-btn');
    this.dom.newsletterForm = select('#footer-newsletter-element');
    this.dom.newsletterEmail = select('#footer-newsletter-email');
    this.dom.newsletterError = select('#newsletter-error');
  },

  bindEvents() {
    // Back to top click listener
    if (this.dom.backToTopBtn) {
      this.dom.backToTopBtn.addEventListener('click', () => {
        this.scrollToTop();
      });
    }

    // Scroll listener for floating back to top visibility
    window.addEventListener('scroll', () => {
      this.toggleBackToTopVisibility();
    });

    // Theme changes events listener
    events.on('theme:change', (data) => {
      this.updateThemeIndicator(data.resolved);
    });

    // Newsletter submit listener
    if (this.dom.newsletterForm) {
      this.dom.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSubmit();
      });
    }
  },

  render() {
    this.renderYear();
    this.renderNavLinks();
    this.renderResources();
    this.renderSocials();
    this.syncInitialThemeIndicator();
  },

  renderYear() {
    if (this.dom.yearSpan) {
      this.dom.yearSpan.textContent = new Date().getFullYear();
    }
  },

  renderNavLinks() {
    if (!this.dom.navLinksRoot) return;
    this.dom.navLinksRoot.innerHTML = navigationLinks.map(link => `
      <li><a href="${link.url}" class="footer-link">${link.name}</a></li>
    `).join('');
  },

  renderResources() {
    if (!this.dom.resourcesRoot) return;
    this.dom.resourcesRoot.innerHTML = resourceLinks.map(link => `
      <li><a href="${link.url}" class="footer-link">${link.name}</a></li>
    `).join('');
  },

  renderSocials() {
    if (!this.dom.socialRoot) return;
    this.dom.socialRoot.innerHTML = socialLinks.map(social => `
      <a href="${social.url}" class="footer-social-icon-btn" aria-label="${social.platform}">
        <i data-lucide="${social.icon}"></i>
      </a>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  syncInitialThemeIndicator() {
    if (!this.dom.themeIndicator) return;
    const resolvedTheme = themeManager.getResolvedTheme();
    this.updateThemeIndicator(resolvedTheme);
  },

  updateThemeIndicator(theme) {
    if (!this.dom.themeIndicator) return;
    const iconName = theme === 'dark' ? 'moon' : 'sun';
    this.dom.themeIndicator.innerHTML = `
      <i data-lucide="${iconName}"></i>
      <span>Theme: ${theme}</span>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  toggleBackToTopVisibility() {
    if (!this.dom.backToTopContainer) return;
    const heroSection = select('#home');
    const heroHeight = heroSection ? heroSection.offsetHeight : window.innerHeight;
    
    if (window.scrollY > heroHeight * 0.8) {
      this.dom.backToTopContainer.classList.add('is-visible');
    } else {
      this.dom.backToTopContainer.classList.remove('is-visible');
    }
  },

  scrollToTop() {
    if (animationManager.lenis) {
      animationManager.lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Easing config out expo
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  },

  handleNewsletterSubmit() {
    if (!this.dom.newsletterEmail || !this.dom.newsletterError) return;

    const email = this.dom.newsletterEmail.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      this.dom.newsletterError.textContent = 'Please enter a valid email.';
      this.dom.newsletterEmail.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      return;
    }

    // Reset warnings
    this.dom.newsletterError.textContent = '';
    this.dom.newsletterEmail.style.borderColor = '';

    // Simulate validation feedback
    const submitBtn = this.dom.newsletterForm.querySelector('.newsletter-submit-btn');
    const inputField = this.dom.newsletterEmail;
    
    if (submitBtn) {
      submitBtn.disabled = true;
      inputField.disabled = true;
      const originalInner = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="spinner-loader" style="width: 12px; height: 12px;"></i>';

      setTimeout(() => {
        submitBtn.innerHTML = '<i data-lucide="check"></i>';
        if (typeof lucide !== 'undefined') lucide.createIcons();

        this.dom.newsletterError.style.color = '#10B981';
        this.dom.newsletterError.textContent = 'Subscription active!';

        setTimeout(() => {
          submitBtn.disabled = false;
          inputField.disabled = false;
          submitBtn.innerHTML = originalInner;
          if (typeof lucide !== 'undefined') lucide.createIcons();
          inputField.value = '';
          this.dom.newsletterError.textContent = '';
          this.dom.newsletterError.style.color = '';
        }, 2000);
      }, 1200);
    }
  }
};
export default footerManager;
