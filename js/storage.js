/* ==========================================================================
   LOCALSTORAGE WRAPPER UTILITY
   ========================================================================== */

export const storage = {
  /**
   * Get an item from localStorage.
   * @param {string} key 
   * @param {*} defaultValue 
   * @returns {*}
   */
  get(key, defaultValue = null) {
    try {
      const val = localStorage.getItem(key);
      return val !== null ? JSON.parse(val) : defaultValue;
    } catch (e) {
      console.warn("Storage read error:", e);
      return defaultValue;
    }
  },

  /**
   * Set an item in localStorage.
   * @param {string} key 
   * @param {*} value 
   * @returns {boolean}
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Storage write error:", e);
      return false;
    }
  },

  /**
   * Remove an item from localStorage.
   * @param {string} key 
   * @returns {boolean}
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn("Storage removal error:", e);
      return false;
    }
  }
};
