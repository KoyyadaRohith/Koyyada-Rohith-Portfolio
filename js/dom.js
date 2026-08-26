/* ==========================================================================
   DOM REFERENCE & MANIPULATION UTILITIES
   ========================================================================== */

import { select } from './helpers.js';

export const dom = {
  // Document Cache
  body: document.body,
  html: document.documentElement,

  // UI Element Lookups (lazily resolved)
  get navbar() { return select('.navbar'); },
  get themeToggle() { return select('.theme-switch-btn'); },
  get menuToggle() { return select('.menu-toggle-btn'); },
  get drawer() { return select('.nav-drawer'); },
  get drawerClose() { return select('.drawer-close-btn'); },
  get overlay() { return select('.nav-overlay'); },
  get bgCanvas() { return select('#bg-canvas'); },
  get particleContainer() { return select('.bg-particles'); },

  /**
   * Safe Class Adder.
   * @param {Element} el 
   * @param {string} className 
   */
  addClass(el, className) {
    if (el) el.classList.add(className);
  },

  /**
   * Safe Class Remover.
   * @param {Element} el 
   * @param {string} className 
   */
  removeClass(el, className) {
    if (el) el.classList.remove(className);
  },

  /**
   * Safe Class Toggler.
   * @param {Element} el 
   * @param {string} className 
   */
  toggleClass(el, className) {
    if (el) el.classList.toggle(className);
  },

  /**
   * Check if element contains class.
   * @param {Element} el 
   * @param {string} className 
   * @returns {boolean}
   */
  hasClass(el, className) {
    return el ? el.classList.contains(className) : false;
  }
};
