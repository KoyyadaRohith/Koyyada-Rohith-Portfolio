/* ==========================================================================
   CUSTOM EVENT BUS (Publish-Subscribe Pattern)
   ========================================================================== */

class EventEmitter {
  constructor() {
    this.events = {};
  }

  /**
   * Listen for an event.
   * @param {string} eventName 
   * @param {Function} callback 
   */
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} eventName 
   * @param {Function} callback 
   */
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      cb => cb !== callback
    );
  }

  /**
   * Emit/Trigger an event with data.
   * @param {string} eventName 
   * @param {*} data 
   */
  emit(eventName, data) {
    if (!this.events[eventName]) return;
    this.events[eventName].forEach(callback => {
      try {
        callback(data);
      } catch (e) {
        console.error(`Error in event listener for ${eventName}:`, e);
      }
    });
  }
}

export const events = new EventEmitter();
export default events;
