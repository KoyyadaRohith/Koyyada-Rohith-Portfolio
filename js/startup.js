/* ==========================================================================
   PORTFOLIO STARTUP CONTROLLER
   ========================================================================== */

import { visionMission, productEcosystem, innovationHighlights, startupRoadmap } from '../data/startup.js';
import { select, selectAll } from './helpers.js';

export const startupManager = {
  // DOM Elements cache
  dom: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  cacheDOM() {
    this.dom.visionRoot = select('#startup-vision-root');
    this.dom.productsRoot = select('#startup-products-root');
    this.dom.innovationRoot = select('#startup-innovation-root');
    this.dom.roadmapRoot = select('#startup-roadmap-root');
  },

  bindEvents() {
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
    this.renderVisionMission();
    this.renderProducts();
    this.renderInnovation();
    this.renderRoadmap();
  },

  renderVisionMission() {
    if (!this.dom.visionRoot) return;
    this.dom.visionRoot.innerHTML = visionMission.map(vm => {
      const typeClass = vm.type === 'mission' ? 'accent-purple' : 'accent-blue';
      return `
        <div class="startup-vision-card card card-glass ${typeClass}">
          <div class="startup-vision-header">
            <div class="startup-vision-icon">
              <i data-lucide="${vm.icon}"></i>
            </div>
            <h4 class="startup-vision-title">${vm.title}</h4>
          </div>
          <p class="startup-vision-desc">${vm.desc}</p>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderProducts() {
    if (!this.dom.productsRoot) return;
    this.dom.productsRoot.innerHTML = productEcosystem.map(prod => {
      const featuredClass = prod.featured ? 'product-card--featured' : '';
      return `
        <div class="startup-product-card card card-glass ${featuredClass}">
          <div class="startup-product-header">
            <div class="startup-product-meta">
              <div class="startup-product-icon">
                <i data-lucide="${prod.icon}"></i>
              </div>
              <div>
                <h4 class="startup-product-name">${prod.name}</h4>
                <span class="startup-product-category">${prod.category}</span>
              </div>
            </div>
            <span class="badge-status completed">${prod.status}</span>
          </div>
          <p class="startup-product-desc">${prod.desc}</p>
          <button class="startup-product-action" type="button">
            <span>Learn More</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderInnovation() {
    if (!this.dom.innovationRoot) return;
    this.dom.innovationRoot.innerHTML = innovationHighlights.map(hi => `
      <div class="startup-innovation-card card card-glass">
        <div class="startup-innovation-icon">
          <i data-lucide="${hi.icon}"></i>
        </div>
        <h4 class="startup-innovation-title">${hi.title}</h4>
        <p class="startup-innovation-desc">${hi.desc}</p>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderRoadmap() {
    if (!this.dom.roadmapRoot) return;
    
    // Add the progress bar connector div first
    let html = `<div class="startup-roadmap-progress-bar"></div>`;
    
    html += startupRoadmap.map((item, idx) => `
      <div class="startup-roadmap-item ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}">
        <div class="startup-roadmap-dot-node"></div>
        <div class="startup-roadmap-content-box">
          <span class="startup-roadmap-quarter">${item.quarter}</span>
          <h4 class="startup-roadmap-title">${item.title}</h4>
          <p class="startup-roadmap-desc">${item.desc}</p>
          <span class="startup-roadmap-status">${item.status}</span>
        </div>
      </div>
    `).join('');

    this.dom.roadmapRoot.innerHTML = html;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Set up GSAP ScrollTrigger to highlight roadmap items and draw progress lines
    this.initRoadmapAnimations();
  },

  initRoadmapAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Reset existing triggers to avoid memory leaks
    const existingTrigger1 = ScrollTrigger.getById('startupRoadmapProgressDesktop');
    const existingTrigger2 = ScrollTrigger.getById('startupRoadmapProgressMobile');
    if (existingTrigger1) existingTrigger1.kill();
    if (existingTrigger2) existingTrigger2.kill();

    const items = selectAll('.startup-roadmap-item');
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Desktop horizontal progress bar scroll drawing
      gsap.fromTo('.startup-roadmap-progress-bar',
        { width: '0%', height: '2px' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            id: 'startupRoadmapProgressDesktop',
            trigger: '#startup-roadmap-root',
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: true
          }
        }
      );
    } else {
      // Mobile vertical progress bar scroll drawing
      gsap.fromTo('.startup-roadmap-progress-bar',
        { height: '0%', width: '2px' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            id: 'startupRoadmapProgressMobile',
            trigger: '#startup-roadmap-root',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true
          }
        }
      );
    }

    // Highlight dot nodes as they cross the scroll thresholds
    items.forEach((item, idx) => {
      const existingTriggerItem = ScrollTrigger.getById(`startupRoadmapItemHighlight-${idx}`);
      if (existingTriggerItem) existingTriggerItem.kill();

      ScrollTrigger.create({
        id: `startupRoadmapItemHighlight-${idx}`,
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
