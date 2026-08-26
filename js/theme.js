/* ==========================================================================
   THEME SYSTEM MANAGER (Auto, Dark, Light)
   ========================================================================== */

import { themeConfig } from '../config/theme.js';
import { storage } from './storage.js';
import { dom } from './dom.js';
import { events } from './events.js';

let isBound = false;

export const themeManager = {
  currentTheme: 'dark',

  init() {
    // Retrieve theme preference from storage, defaulting to 'dark'
    const savedTheme = storage.get(themeConfig.storageKey, 'dark');
    const validTheme = savedTheme === 'light' ? 'light' : 'dark';
    this.setTheme(validTheme, false);

    // Bind document-level delegated click listener once
    if (!isBound) {
      isBound = true;
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-switch-btn');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();
          this.toggle();
        }
      });
    }
  },

  /**
   * Set theme.
   * @param {string} theme - 'dark' | 'light'
   * @param {boolean} triggerTransition 
   */
  setTheme(theme, triggerTransition = true) {
    const validTheme = theme === 'light' ? 'light' : 'dark';
    this.currentTheme = validTheme;
    storage.set(themeConfig.storageKey, validTheme);
    this.applyThemeToDOM(validTheme, triggerTransition);
    
    // Broadcast theme change to modules (e.g. background engine)
    events.emit('theme:change', {
      theme: validTheme,
      resolved: validTheme
    });
  },

  /**
   * Resolve active theme ('dark' or 'light').
   * @returns {string}
   */
  getResolvedTheme() {
    return this.currentTheme === 'light' ? 'light' : 'dark';
  },

  /**
   * Applies the theme settings to the document node.
   * @param {string} resolved 
   * @param {boolean} transition 
   */
  applyThemeToDOM(resolved, transition) {
    dom.html.setAttribute('data-theme', resolved);
    
    // Update theme switcher icon SVGs across all buttons
    document.querySelectorAll('.theme-switch-btn').forEach(btn => {
      if (resolved === 'light') {
        btn.setAttribute('title', 'Switch to Dark Theme');
        btn.setAttribute('aria-label', 'Switch to Dark Theme');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      } else {
        btn.setAttribute('title', 'Switch to Light Theme');
        btn.setAttribute('aria-label', 'Switch to Light Theme');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`;
      }
    });

    if (transition) {
      dom.addClass(dom.html, 'theme-transitioning');
      setTimeout(() => {
        dom.removeClass(dom.html, 'theme-transitioning');
      }, themeConfig.transitionDuration);
    }
  },

  /**
   * Cycles theme state directly between light and dark.
   */
  toggle() {
    const current = dom.html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme, true);
  }
};
