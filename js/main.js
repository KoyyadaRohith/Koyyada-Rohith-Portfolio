/* ==========================================================================
   ENTRY BOOTSTRAP MODULE (Core Coordinator)
   ========================================================================== */

import { themeManager } from './theme.js';
import { navigationManager } from './navigation.js';
import { cursorManager } from './cursor.js';
import { animationManager } from './animations.js';
import { projectsManager } from './projects.js';
import { skillsManager } from './skills.js';
import { experienceManager } from './experience.js';
import { startupManager } from './startup.js';
import { blogManager } from './blog.js';
import { certificatesManager } from './certificates.js';
import { contactManager } from './contact.js';
import { footerManager } from './footer.js';
import { dom } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme System first to prevent flash of styling
  themeManager.init();

  // Initialize Layout & Shell Navigation
  navigationManager.init();

  // Initialize Custom Cursor hooks
  cursorManager.init();

  // Initialize Projects Section controller (Dynamic rendering & search filters)
  projectsManager.init();

  // Initialize Skills Section controller (Dynamic rendering & category filters)
  skillsManager.init();

  // Initialize Experience Section controller (Dynamic rendering & timeline indicator)
  experienceManager.init();

  // Initialize Startup Section controller (Dynamic rendering & visual animations)
  startupManager.init();

  // Initialize Blog Section controller (Dynamic rendering & category filters)
  blogManager.init();

  // Initialize Certificates Section controller (Dynamic rendering & timeline progress)
  certificatesManager.init();

  // Initialize Contact Section controller (Dynamic rendering & form validations)
  contactManager.init();

  // Initialize Footer Section controller (Copyright dates & theme indicators)
  footerManager.init();

  // Initialize Animation (Scroll, Particles, GSAP)
  animationManager.init();

  // Trigger Lucide Icon Replacement
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Dispatch fully-loaded state to eliminate initial transition flashes
  setTimeout(() => {
    dom.addClass(dom.body, 'loaded');
  }, 100);
});
