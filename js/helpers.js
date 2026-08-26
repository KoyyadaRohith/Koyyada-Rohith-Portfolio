/* ==========================================================================
   PERFORMANCE UTILITY FUNCTIONS
   ========================================================================== */

/**
 * Debounce function to limit execution rate of a call.
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(func, wait) {
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

/**
 * Throttle function to throttle event triggers.
 * @param {Function} func 
 * @param {number} limit 
 * @returns {Function}
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Shorthand querySelector wrapper.
 * @param {string} selector 
 * @param {Element|Document} parent 
 * @returns {Element|null}
 */
export const select = (selector, parent = document) => parent.querySelector(selector);

/**
 * Shorthand querySelectorAll wrapper.
 * @param {string} selector 
 * @param {Element|Document} parent 
 * @returns {Array<Element>}
 */
export const selectAll = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
