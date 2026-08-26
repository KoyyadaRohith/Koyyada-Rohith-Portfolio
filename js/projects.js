/* ==========================================================================
   PORTFOLIO FEATURED PROJECTS CONTROLLER
   ========================================================================== */

import { projectsData } from '../data/projects.js';
import { select, selectAll } from './helpers.js';

export const projectsManager = {
  // Filters State
  state: {
    category: 'all',
    search: '',
    tech: 'all',
    status: 'all',
    difficulty: 'all',
    currentProject: null,
    currentImageIndex: 0,
    previousFocusedElement: null
  },

  // DOM Cache
  dom: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  cacheDOM() {
    this.dom.search = select('#project-search');
    this.dom.searchClear = select('#search-clear-btn');
    this.dom.tabs = selectAll('.category-tabs .tab-btn');
    this.dom.filterTech = select('#filter-tech');
    this.dom.filterStatus = select('#filter-status');
    this.dom.filterDifficulty = select('#filter-difficulty');
    this.dom.flagshipSlot = select('#flagship-project-slot');
    this.dom.gridSlot = select('#grid-projects-slot');
    this.dom.emptyState = select('#empty-search-state');
    this.dom.resetBtn = select('#reset-filters-btn');
    
    // Modal cache
    this.dom.modal = select('#project-modal');
    if (this.dom.modal) {
      this.dom.modalTitle = this.dom.modal.querySelector('#modal-project-title');
      this.dom.modalStatus = this.dom.modal.querySelector('#modal-project-status');
      this.dom.modalCloseBtn = this.dom.modal.querySelector('.modal-close-btn');
      this.dom.modalMockup = this.dom.modal.querySelector('#modal-mockup-container');
      this.dom.modalThumbnails = this.dom.modal.querySelector('#modal-thumbnails');
      this.dom.modalOverview = this.dom.modal.querySelector('#modal-project-overview');
      this.dom.modalProblem = this.dom.modal.querySelector('#modal-project-problem');
      this.dom.modalSolution = this.dom.modal.querySelector('#modal-project-solution');
      this.dom.modalFeatures = this.dom.modal.querySelector('#modal-project-features');
      this.dom.modalArchitecture = this.dom.modal.querySelector('#modal-project-architecture');
      this.dom.modalTech = this.dom.modal.querySelector('#modal-project-tech');
      this.dom.modalYear = this.dom.modal.querySelector('#modal-project-year');
      this.dom.modalDuration = this.dom.modal.querySelector('#modal-project-duration');
      this.dom.modalDifficulty = this.dom.modal.querySelector('#modal-project-difficulty');
      
      // Modal links
      this.dom.modalLinkDemo = this.dom.modal.querySelector('#modal-link-demo');
      this.dom.modalLinkGithub = this.dom.modal.querySelector('#modal-link-github');
      this.dom.modalLinkDocs = this.dom.modal.querySelector('#modal-link-docs');
    }

    // Lightbox cache
    this.dom.lightbox = select('#gallery-lightbox');
    if (this.dom.lightbox) {
      this.dom.lightboxCloseBtn = this.dom.lightbox.querySelector('.lightbox-close-btn');
      this.dom.lightboxPrevBtn = this.dom.lightbox.querySelector('.prev-btn');
      this.dom.lightboxNextBtn = this.dom.lightbox.querySelector('.next-btn');
      this.dom.lightboxPlaceholder = this.dom.lightbox.querySelector('#lightbox-image-placeholder');
      this.dom.lightboxCaption = this.dom.lightbox.querySelector('#lightbox-caption');
      this.dom.lightboxDots = this.dom.lightbox.querySelector('#lightbox-thumbnails-indicator');
    }
  },

  bindEvents() {
    // Search Box Input & Clear
    if (this.dom.search) {
      this.dom.search.addEventListener('input', (e) => {
        this.state.search = e.target.value.trim().toLowerCase();
        this.toggleSearchClearButton();
        this.render();
      });
    }

    if (this.dom.searchClear) {
      this.dom.searchClear.addEventListener('click', () => {
        if (this.dom.search) {
          this.dom.search.value = '';
          this.state.search = '';
          this.toggleSearchClearButton();
          this.render();
          this.dom.search.focus();
        }
      });
    }

    // Category Tabs Switching
    this.dom.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.dom.tabs.forEach(t => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        this.state.category = tab.getAttribute('data-category');
        this.render();
      });
    });

    // Advanced Dropdowns Selection
    const bindDropdown = (el, key) => {
      if (el) {
        el.addEventListener('change', (e) => {
          this.state[key] = e.target.value;
          this.render();
        });
      }
    };
    bindDropdown(this.dom.filterTech, 'tech');
    bindDropdown(this.dom.filterStatus, 'status');
    bindDropdown(this.dom.filterDifficulty, 'difficulty');

    // Reset Filters Button
    if (this.dom.resetBtn) {
      this.dom.resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // Modal Close Triggers
    if (this.dom.modalCloseBtn) {
      this.dom.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }
    if (this.dom.modal) {
      this.dom.modal.addEventListener('click', (e) => {
        if (e.target === this.dom.modal) this.closeModal();
      });
    }

    // Modal Accessibility Keydown Hooks
    window.addEventListener('keydown', (e) => {
      if (this.dom.modal && this.dom.modal.classList.contains('is-open')) {
        if (e.key === 'Escape') {
          if (this.dom.lightbox && this.dom.lightbox.classList.contains('is-open')) {
            this.closeLightbox();
          } else {
            this.closeModal();
          }
        }
        if (e.key === 'Tab') {
          this.trapFocus(e, this.dom.modal);
        }
      } else if (this.dom.lightbox && this.dom.lightbox.classList.contains('is-open')) {
        if (e.key === 'Escape') this.closeLightbox();
        if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
        if (e.key === 'ArrowRight') this.navigateLightbox(1);
      }
    });

    // Lightbox Close & Nav Buttons
    if (this.dom.lightboxCloseBtn) {
      this.dom.lightboxCloseBtn.addEventListener('click', () => this.closeLightbox());
    }
    if (this.dom.lightboxPrevBtn) {
      this.dom.lightboxPrevBtn.addEventListener('click', () => this.navigateLightbox(-1));
    }
    if (this.dom.lightboxNextBtn) {
      this.dom.lightboxNextBtn.addEventListener('click', () => this.navigateLightbox(1));
    }
    if (this.dom.lightbox) {
      this.dom.lightbox.addEventListener('click', (e) => {
        if (e.target === this.dom.lightbox) this.closeLightbox();
      });
    }
  },

  toggleSearchClearButton() {
    if (this.dom.searchClear) {
      this.dom.searchClear.style.display = this.state.search ? 'block' : 'none';
    }
  },

  resetFilters() {
    this.state.category = 'all';
    this.state.search = '';
    this.state.tech = 'all';
    this.state.status = 'all';
    this.state.difficulty = 'all';

    if (this.dom.search) this.dom.search.value = '';
    this.toggleSearchClearButton();

    if (this.dom.filterTech) this.dom.filterTech.value = 'all';
    if (this.dom.filterStatus) this.dom.filterStatus.value = 'all';
    if (this.dom.filterDifficulty) this.dom.filterDifficulty.value = 'all';

    this.dom.tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
      if (t.getAttribute('data-category') === 'all') {
        t.classList.add('is-active');
        t.setAttribute('aria-selected', 'true');
      }
    });

    this.render();
  },

  getFilteredProjects() {
    return projectsData.filter(proj => {
      // 1. Search Query mapping
      const searchStr = `${proj.title} ${proj.subtitle} ${proj.overview} ${proj.technologies.join(' ')}`.toLowerCase();
      if (this.state.search && !searchStr.includes(this.state.search)) return false;

      // 2. Category tab filter
      if (this.state.category !== 'all' && proj.category.toLowerCase() !== this.state.category) return false;

      // 3. Technology tag filter
      if (this.state.tech !== 'all' && !proj.technologies.map(t => t.toLowerCase()).includes(this.state.tech)) return false;

      // 4. Status filter
      if (this.state.status !== 'all' && proj.status.toLowerCase() !== this.state.status) return false;

      // 5. Difficulty filter
      if (this.state.difficulty !== 'all' && proj.difficulty.toLowerCase() !== this.state.difficulty) return false;

      return true;
    });
  },

  render() {
    const list = this.getFilteredProjects();

    if (list.length === 0) {
      this.dom.flagshipSlot.innerHTML = '';
      this.dom.gridSlot.innerHTML = '';
      this.dom.emptyState.style.display = 'flex';
      return;
    }

    this.dom.emptyState.style.display = 'none';

    // First card: Flagship Layout
    const flagship = list[0];
    this.dom.flagshipSlot.innerHTML = this.createCardHTML(flagship, true);

    // Remaining cards: Grid layout
    const gridItems = list.slice(1);
    this.dom.gridSlot.innerHTML = gridItems.map(proj => this.createCardHTML(proj, false)).join('');

    // Rebind Learn More Buttons
    selectAll('.learn-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        const project = projectsData.find(p => p.id === id);
        if (project) this.openModal(project, e.target);
      });
    });

    // Refresh Lucide Icons inside dynamic cards
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Trigger GSAP Reveal staggers on cards if gsap is loaded
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.project-card', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  },

  createCardHTML(proj, isFeatured) {
    const statusClass = proj.status.toLowerCase();
    const techChips = proj.technologies.slice(0, 4).map(t => `<span class="tech-chip">${t}</span>`).join('');
    
    // Mockup visual representation
    const mockupVisual = this.renderDeviceMockup(proj.mockup, proj.title, proj.slug);

    if (isFeatured) {
      return `
        <article class="project-card project-card--featured card card-glass reveal-fade-up" data-id="${proj.id}">
          <div class="card-image-wrap">
            ${mockupVisual}
          </div>
          <div class="card-content-wrap">
            <div class="card-meta">
              <span class="card-category">${proj.category}</span>
              <span class="card-status-badge ${statusClass}">${proj.status}</span>
            </div>
            <h3 class="card-title">${proj.title}</h3>
            <p class="card-desc">${proj.overview}</p>
            <div class="card-tech-chips">
              ${techChips}
            </div>
            <div class="card-actions">
              <button class="btn btn-primary learn-more-btn" data-id="${proj.id}" type="button">
                <span>Learn More</span>
                <i data-lucide="arrow-right"></i>
              </button>
              ${proj.github ? `
                <a href="${proj.github}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer" aria-label="GitHub Source">
                  <i data-lucide="github"></i>
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    }

    return `
      <article class="project-card project-card--grid card card-glass" data-id="${proj.id}">
        <div class="card-image-wrap">
          ${mockupVisual}
        </div>
        <div class="card-content-wrap">
          <div class="card-meta">
            <span class="card-category">${proj.category}</span>
            <span class="card-status-badge ${statusClass}">${proj.status}</span>
          </div>
          <h3 class="card-title">${proj.title}</h3>
          <p class="card-desc">${proj.subtitle}</p>
          <div class="card-tech-chips">
            ${techChips}
          </div>
          <div class="card-actions">
            <button class="btn btn-secondary learn-more-btn" data-id="${proj.id}" type="button">
              <span>Learn More</span>
              <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  },

  renderDeviceMockup(type, title, slug) {
    if (type === 'browser') {
      return `
        <div class="mockup-browser">
          <div class="browser-bar">
            <div class="browser-dots">
              <div class="browser-dot browser-dot--close"></div>
              <div class="browser-dot browser-dot--minimize"></div>
              <div class="browser-dot browser-dot--expand"></div>
            </div>
            <div class="browser-address">https://rohith.io/projects/${slug}</div>
          </div>
          <div class="browser-body">
            <div class="mockup-image-placeholder">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${title} Browser Frame">
                <rect x="20" y="20" width="60" height="60" rx="6" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="40" cy="40" r="6" stroke="currentColor" stroke-width="1.5"/>
                <path d="M25 75L50 50L75 75" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }

    if (type === 'laptop') {
      return `
        <div class="mockup-laptop">
          <div class="laptop-screen">
            <div class="laptop-content">
              <div class="mockup-image-placeholder">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${title} Laptop Frame">
                  <rect x="15" y="25" width="70" height="50" rx="4" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M22 68L45 45L78 68" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="laptop-body"></div>
        </div>
      `;
    }

    if (type === 'tablet') {
      return `
        <div class="mockup-tablet">
          <div class="tablet-camera"></div>
          <div class="tablet-content">
            <div class="mockup-image-placeholder">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${title} Tablet Frame">
                <rect x="25" y="15" width="50" height="70" rx="6" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="50" cy="78" r="3" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }

    // Default to Mobile
    return `
      <div class="mockup-mobile">
        <div class="mobile-notch"></div>
        <div class="mobile-content">
          <div class="mockup-image-placeholder">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${title} Mobile Frame">
              <rect x="30" y="12" width="40" height="76" rx="6" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="50" cy="80" r="2.5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  },

  openModal(project, triggerEl) {
    this.state.currentProject = project;
    this.state.previousFocusedElement = triggerEl;

    // 1. Text populations
    this.dom.modalTitle.textContent = project.title;
    this.dom.modalStatus.textContent = project.status;
    this.dom.modalStatus.className = `badge card-status-badge ${project.status.toLowerCase()}`;
    
    this.dom.modalOverview.textContent = project.overview;
    this.dom.modalProblem.textContent = project.problem;
    this.dom.modalSolution.textContent = project.solution;
    this.dom.modalArchitecture.textContent = project.architecture;
    
    this.dom.modalYear.textContent = project.year;
    this.dom.modalDuration.textContent = project.duration;
    this.dom.modalDifficulty.textContent = project.difficulty;

    // 2. Features list
    this.dom.modalFeatures.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');

    // 3. Technologies
    this.dom.modalTech.innerHTML = project.technologies.map(t => `<span class="tech-chip">${t}</span>`).join('');

    // 4. Preview Mockup
    this.dom.modalMockup.innerHTML = this.renderDeviceMockup(project.mockup, project.title, project.slug);

    // 5. Thumbnails Gallery
    this.dom.modalThumbnails.innerHTML = project.gallery.map((img, idx) => `
      <button class="gallery-thumb ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}" aria-label="View screenshot ${idx + 1}" type="button">
        Thumbnail ${idx + 1}
      </button>
    `).join('');

    // Gallery Click binding
    const thumbs = this.dom.modalThumbnails.querySelectorAll('.gallery-thumb');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
        const idx = parseInt(thumb.getAttribute('data-idx'), 10);
        this.openLightbox(idx);
      });
    });

    // 6. Action CTAs
    const setLink = (el, val) => {
      if (val) {
        el.href = val;
        el.style.display = 'inline-flex';
      } else {
        el.style.display = 'none';
      }
    };
    setLink(this.dom.modalLinkDemo, project.demo);
    setLink(this.dom.modalLinkGithub, project.github);
    setLink(this.dom.modalLinkDocs, project.documentation);

    // Refresh Lucide Icons in Modal
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // 7. Show Modal Overlay
    this.dom.modal.setAttribute('aria-hidden', 'false');
    this.dom.modal.classList.add('is-open');
    document.body.style.overflow = 'hidden'; // Freeze viewport scrolling

    // Focus Close button first
    setTimeout(() => this.dom.modalCloseBtn.focus(), 100);
  },

  closeModal() {
    if (!this.dom.modal) return;
    this.dom.modal.setAttribute('aria-hidden', 'true');
    this.dom.modal.classList.remove('is-open');
    document.body.style.overflow = ''; // Unfreeze viewport scrolling

    if (this.dom.previousFocusedElement) {
      this.dom.previousFocusedElement.focus();
    }
  },

  trapFocus(e, container) {
    const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusables = container.querySelectorAll(focusableSelector);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  },

  // --- Lightbox Functions ---
  openLightbox(index) {
    if (!this.dom.lightbox || !this.state.currentProject) return;

    this.state.currentImageIndex = index;
    const project = this.state.currentProject;

    // Load indicator dots
    this.dom.lightboxDots.innerHTML = project.gallery.map((_, idx) => `
      <span class="lightbox-dot ${idx === index ? 'is-active' : ''}" data-idx="${idx}"></span>
    `).join('');

    const dots = this.dom.lightboxDots.querySelectorAll('.lightbox-dot');
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-idx'), 10);
        this.openLightbox(idx);
      });
    });

    // Populate placeholder description
    this.dom.lightboxPlaceholder.textContent = `${project.title} - Screenshot ${index + 1}`;
    this.dom.lightboxCaption.textContent = `Visual display details demonstrating active features of the ${project.title} dashboard.`;

    this.dom.lightbox.setAttribute('aria-hidden', 'false');
    this.dom.lightbox.classList.add('is-open');
  },

  closeLightbox() {
    if (!this.dom.lightbox) return;
    this.dom.lightbox.setAttribute('aria-hidden', 'true');
    this.dom.lightbox.classList.remove('is-open');

    // Return focus to active thumbnail selector
    const thumbs = this.dom.modalThumbnails.querySelectorAll('.gallery-thumb');
    if (thumbs[this.state.currentImageIndex]) {
      thumbs[this.state.currentImageIndex].focus();
    }
  },

  navigateLightbox(dir) {
    if (!this.state.currentProject) return;
    const maxIdx = this.state.currentProject.gallery.length - 1;
    let newIdx = this.state.currentImageIndex + dir;

    if (newIdx < 0) newIdx = maxIdx;
    if (newIdx > maxIdx) newIdx = 0;

    this.openLightbox(newIdx);
  }
};
