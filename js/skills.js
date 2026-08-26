/* ==========================================================================
   PORTFOLIO SKILLS & TECHNOLOGY CONTROLLER
   ========================================================================== */

import { skillsCategories, technologiesData, developmentTools, learningRoadmap } from '../data/skills.js';
import { select, selectAll } from './helpers.js';

export const skillsManager = {
  // Active Filter state
  state: {
    activeFilter: 'all'
  },
  
  // DOM Elements cache
  dom: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  cacheDOM() {
    this.dom.categoriesRoot = select('#skills-categories-root');
    this.dom.techRoot = select('#skills-tech-root');
    this.dom.toolsRoot = select('#skills-tools-root');
    this.dom.roadmapRoot = select('#skills-roadmap-root');
    this.dom.filterChips = selectAll('.skills-filter-chips .filter-chip-btn');
  },

  bindEvents() {
    // Dynamic Filter Chips Click observe
    this.dom.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.dom.filterChips.forEach(c => {
          c.classList.remove('is-active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-selected', 'true');
        this.state.activeFilter = chip.getAttribute('data-filter');
        this.renderTechnologies();
      });
    });

    // Resize observer to re-trigger roadmap progress bar calculations on swap
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.initRoadmapAnimations();
      }, 250);
    });
  },

  render() {
    this.renderCategories();
    this.renderTechnologies();
    this.renderTools();
    this.renderRoadmap();
  },

  renderCategories() {
    if (!this.dom.categoriesRoot) return;
    this.dom.categoriesRoot.innerHTML = skillsCategories.map(cat => `
      <div class="category-card card card-glass">
        <div class="category-card-header">
          <div class="category-icon-wrap">
            <i data-lucide="${cat.icon}"></i>
          </div>
          <span class="category-count-badge">${cat.count} Technologies</span>
        </div>
        <h4 class="category-title">${cat.title}</h4>
        <p class="category-desc">${cat.desc}</p>
      </div>
    `).join('');
  },

  renderTechnologies() {
    if (!this.dom.techRoot) return;
    
    const filtered = technologiesData.filter(tech => {
      if (this.state.activeFilter === 'all') return true;
      return tech.category.toLowerCase() === this.state.activeFilter;
    });

    this.dom.techRoot.innerHTML = filtered.map(tech => {
      const levelClass = tech.level.toLowerCase();
      return `
        <div class="tech-card card card-glass">
          <div class="tech-card-header">
            <div class="tech-icon-wrap">
              <i data-lucide="${tech.icon}"></i>
            </div>
            <h4 class="tech-name">${tech.name}</h4>
          </div>
          <div class="tech-meta">
            <span class="badge-level ${levelClass}">${tech.level}</span>
          </div>
          <p class="tech-desc">${tech.desc}</p>
        </div>
      `;
    }).join('');

    // Refresh icons inside technology slots
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // GSAP Reveal staggers on dynamic tech cards
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('.tech-card',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
      );
    }
  },

  renderTools() {
    if (!this.dom.toolsRoot) return;
    this.dom.toolsRoot.innerHTML = developmentTools.map(tool => `
      <div class="tool-card card card-glass">
        <div class="tool-card-header">
          <div class="tool-icon-wrap">
            <i data-lucide="${tool.icon}"></i>
          </div>
          <div>
            <h4 class="tool-name">${tool.name}</h4>
            <span class="tool-category">${tool.category}</span>
          </div>
        </div>
        <p class="tool-desc">${tool.desc}</p>
      </div>
    `).join('');
  },

  renderRoadmap() {
    if (!this.dom.roadmapRoot) return;
    
    // Add the progress bar connector div first
    let html = `<div class="roadmap-progress-bar"></div>`;
    
    html += learningRoadmap.map((item, idx) => `
      <div class="roadmap-item ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}">
        <div class="roadmap-dot-node"></div>
        <div class="roadmap-content-box">
          <div class="roadmap-item-icon">
            <i data-lucide="${item.icon}"></i>
          </div>
          <h4 class="roadmap-item-title">${item.title}</h4>
          <p class="roadmap-item-desc">${item.desc}</p>
          <span class="roadmap-item-status">${item.status}</span>
        </div>
      </div>
    `).join('');

    this.dom.roadmapRoot.innerHTML = html;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Initialize ScrollTrigger highlighting and drawing
    this.initRoadmapAnimations();
  },

  initRoadmapAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Reset existing timelines if they exist to prevent leaks
    const existingTrigger1 = ScrollTrigger.getById('roadmapProgressDesktop');
    const existingTrigger2 = ScrollTrigger.getById('roadmapProgressMobile');
    if (existingTrigger1) existingTrigger1.kill();
    if (existingTrigger2) existingTrigger2.kill();

    const items = selectAll('.roadmap-item');
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Desktop horizontal progress bar scroll drawing
      gsap.fromTo('.roadmap-progress-bar',
        { width: '0%', height: '2px' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            id: 'roadmapProgressDesktop',
            trigger: '#skills-roadmap-root',
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: true
          }
        }
      );
    } else {
      // Mobile vertical progress bar scroll drawing
      gsap.fromTo('.roadmap-progress-bar',
        { height: '0%', width: '2px' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            id: 'roadmapProgressMobile',
            trigger: '#skills-roadmap-root',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true
          }
        }
      );
    }

    // Highlight dot nodes as they cross the scroll thresholds
    items.forEach((item, idx) => {
      const existingTriggerItem = ScrollTrigger.getById(`roadmapItemHighlight-${idx}`);
      if (existingTriggerItem) existingTriggerItem.kill();

      ScrollTrigger.create({
        id: `roadmapItemHighlight-${idx}`,
        trigger: item,
        start: isMobile ? 'top 75%' : 'left 60%',
        end: isMobile ? 'bottom 25%' : 'right 40%',
        onEnter: () => item.classList.add('is-active'),
        onLeave: () => {},
        onEnterBack: () => item.classList.add('is-active'),
        onLeaveBack: () => item.classList.remove('is-active')
      });
    });
  }
};
