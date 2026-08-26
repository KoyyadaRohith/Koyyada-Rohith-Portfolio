/* ==========================================================================
   NAVIGATION MANAGER (Scroll hiding, Mobile menu, Focus trapping)
   ========================================================================== */

import { dom } from './dom.js';
import { select, selectAll } from './helpers.js';
import { animationManager } from './animations.js';

export const navigationManager = {
  lastScrollTop: 0,
  scrollThreshold: 10,
  navbarHeight: 72,

  init() {
    this.bindScroll();
    this.bindMobileMenu();
    this.bindSmoothScroll();
    this.bindActiveLinkObserver();
  },

  /**
   * Observe active section to position underline beneath active page word.
   */
  bindActiveLinkObserver() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  },

  /**
   * Hide/Show navbar on scroll and apply transparent/scrolled states.
   */
  bindScroll() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Toggle scrolled background state
      if (scrollTop > 30) {
        dom.addClass(dom.navbar, 'navbar--scrolled');
      } else {
        dom.removeClass(dom.navbar, 'navbar--scrolled');
      }

      // Ignore bounce scroll on iOS
      if (scrollTop < 0) return;

      const delta = Math.abs(scrollTop - this.lastScrollTop);
      
      if (delta > this.scrollThreshold) {
        if (scrollTop > this.lastScrollTop && scrollTop > this.navbarHeight) {
          // Scrolling down - hide navbar
          dom.addClass(dom.navbar, 'navbar--hidden');
        } else {
          // Scrolling up - show navbar
          dom.removeClass(dom.navbar, 'navbar--hidden');
        }
      }
      this.lastScrollTop = scrollTop;
    }, { passive: true });
  },

  /**
   * Mobile menu drawer handlers.
   */
  bindMobileMenu() {
    const menuToggle = dom.menuToggle;
    const drawer = dom.drawer;
    const drawerClose = dom.drawerClose;
    const overlay = dom.overlay;

    if (!menuToggle || !drawer || !drawerClose || !overlay) return;

    // Toggle menu
    menuToggle.addEventListener('click', () => this.openDrawer());
    
    // Close menu buttons
    drawerClose.addEventListener('click', () => this.closeDrawer());
    overlay.addEventListener('click', () => this.closeDrawer());

    // Esc key close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.hasClass(drawer, 'is-open')) {
        this.closeDrawer();
      }
    });
  },

  openDrawer() {
    const drawer = dom.drawer;
    const overlay = dom.overlay;
    const menuToggle = dom.menuToggle;

    dom.addClass(drawer, 'is-open');
    dom.addClass(overlay, 'is-visible');
    
    // Set accessibility states
    menuToggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    
    // Trap focus in drawer
    this.trapFocus(drawer);
  },

  closeDrawer() {
    const drawer = dom.drawer;
    const overlay = dom.overlay;
    const menuToggle = dom.menuToggle;

    dom.removeClass(drawer, 'is-open');
    dom.removeClass(overlay, 'is-visible');

    // Restore accessibility states
    menuToggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    
    // Restore focus to menu toggle button
    menuToggle.focus();
  },

  /**
   * Traps the keyboard focus within a given container (A11y).
   * @param {Element} element 
   */
  trapFocus(element) {
    const focusableEls = selectAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', element);
    if (focusableEls.length === 0) return;

    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];

    // Set focus to the first element
    setTimeout(() => firstFocusable.focus(), 50);

    element.addEventListener('keydown', function(e) {
      const isTabPressed = e.key === 'Tab';

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    });
  },

  bindSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        e.preventDefault();

        // Close mobile drawer if open
        const drawer = dom.drawer;
        if (drawer && dom.hasClass(drawer, 'is-open')) {
          navigationManager.closeDrawer();
        }

        const targetEl = select(targetId);
        if (targetEl) {
          if (animationManager.lenis) {
            animationManager.lenis.scrollTo(targetEl, {
              offset: -navigationManager.navbarHeight,
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
          } else {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
};
