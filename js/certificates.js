/* ==========================================================================
   PORTFOLIO CERTIFICATES CONTROLLER
   ========================================================================== */

import { featuredCertificate, certificateGallery, achievementStatistics, learningTimeline } from '../data/certificates.js';
import { select, selectAll } from './helpers.js';

export const certificatesManager = {
  // DOM Elements cache
  dom: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  cacheDOM() {
    this.dom.featuredRoot = select('#featured-credential-root');
    this.dom.galleryRoot = select('#credentials-grid-root');
    this.dom.statsRoot = select('#achievement-stats-root');
    this.dom.timelineRoot = select('#learning-timeline-root');
    this.dom.filterChips = selectAll('.credentials-filter-chips .filter-chip-btn');
  },

  bindEvents() {
    // Filter click listeners
    this.dom.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.getAttribute('data-filter');
        this.setActiveFilter(chip);
        this.filterGallery(filter);
      });
    });

    // Resize observer to re-trigger timeline progress bar calculations on swap
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.initTimelineAnimations();
      }, 250);
    });
  },

  render() {
    this.renderFeatured();
    this.renderGallery('all');
    this.renderStats();
    this.renderTimeline();
  },

  renderFeatured() {
    if (!this.dom.featuredRoot) return;

    const skillsHtml = featuredCertificate.skillsGained.map(skill => `
      <span class="credential-skill-tag">${skill}</span>
    `).join('');

    const badgeHtml = featuredCertificate.verificationBadge ? `
      <div class="credential-badge-verified">
        <i data-lucide="shield-check"></i>
        <span>Verified Credential</span>
      </div>
    ` : '';

    this.dom.featuredRoot.innerHTML = `
      <div class="featured-credential-split">
        <div class="featured-credential-image-wrap">
          <img src="${featuredCertificate.cover}" alt="${featuredCertificate.title}" loading="lazy" />
          ${badgeHtml}
        </div>
        <div class="featured-credential-content">
          <div class="featured-credential-meta">
            <span class="badge-status completed">${featuredCertificate.category}</span>
            <span class="credential-date-text">${featuredCertificate.issueDate}</span>
            ${featuredCertificate.credentialId ? `<span class="credential-id-text">${featuredCertificate.credentialId}</span>` : ''}
          </div>
          <h3 class="featured-credential-title">${featuredCertificate.title}</h3>
          <span class="credential-provider-text">Issued by ${featuredCertificate.provider}</span>
          <p class="featured-credential-desc">${featuredCertificate.desc}</p>
          <div class="credential-skills-wrap">
            ${skillsHtml}
          </div>
          <div class="certificates-cta-buttons" style="margin-top: var(--spacing-sm);">
            <a href="${featuredCertificate.verificationUrl}" class="btn btn-gradient">
              <span>Verify Credential</span>
              <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderGallery(filterCategory) {
    if (!this.dom.galleryRoot) return;

    // Filter items array
    const filtered = filterCategory === 'all'
      ? certificateGallery
      : certificateGallery.filter(cert => cert.category.toLowerCase() === filterCategory.toLowerCase());

    if (filtered.length === 0) {
      this.dom.galleryRoot.innerHTML = `
        <div class="empty-state" style="grid-column: span 6;">
          <p class="empty-state-text">No certificates found in this category.</p>
        </div>
      `;
      return;
    }

    this.dom.galleryRoot.innerHTML = filtered.map(cert => {
      const cardTypeClass = cert.featured ? 'credential-card--featured' : 'credential-card--normal';
      const skillsHtml = cert.skillsGained.map(skill => `
        <span class="credential-skill-tag">${skill}</span>
      `).join('');

      const badgeHtml = cert.verificationBadge ? `
        <div class="credential-badge-verified">
          <i data-lucide="shield-check"></i>
          <span>Verified</span>
        </div>
      ` : '';

      return `
        <div class="credential-card card card-glass ${cardTypeClass}" data-category="${cert.category}">
          <div class="credential-thumbnail-wrap">
            <img src="${cert.thumbnail}" alt="${cert.title}" loading="lazy" />
            ${badgeHtml}
          </div>
          <div class="credential-content">
            <div class="credential-meta">
              <div>
                <span class="credential-provider-text">${cert.provider}</span>
                <span class="badge-status uppercase" style="display: block; margin-top: 2px;">${cert.category}</span>
              </div>
              <div style="text-align: right;">
                <span class="credential-date-text">${cert.issueDate}</span>
                ${cert.credentialId ? `<span class="credential-id-text" style="display: block; margin-top: 2px;">ID: ${cert.credentialId}</span>` : ''}
              </div>
            </div>
            <h4 class="credential-title-h4">${cert.title}</h4>
            <p class="credential-desc-p">${cert.desc}</p>
            <div class="credential-skills-wrap">
              ${skillsHtml}
            </div>
            <a href="${cert.verificationUrl}" class="credential-action">
              <span>View Credential</span>
              <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Trigger GSAP fade-in stagger animation for gallery items
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('#credentials-grid-root .credential-card',
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }
  },

  renderStats() {
    if (!this.dom.statsRoot) return;

    this.dom.statsRoot.innerHTML = achievementStatistics.map(stat => `
      <div class="blog-stat-card card card-glass">
        <div class="metric-header">
          <div class="metric-icon-wrap">
            <i data-lucide="${stat.icon}"></i>
          </div>
        </div>
        <span class="metric-value counter-value" data-target="${stat.target}">0</span>
        <span class="metric-title">${stat.title}</span>
        <p class="metric-desc">${stat.desc}</p>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderTimeline() {
    if (!this.dom.timelineRoot) return;

    let html = `<div class="learning-timeline-progress-bar"></div>`;

    html += learningTimeline.map((item, idx) => `
      <div class="learning-timeline-item ${idx === 0 ? 'is-active' : ''}" data-idx="${idx}">
        <div class="learning-timeline-dot-node"></div>
        <div class="learning-timeline-content-box">
          <span class="learning-timeline-year">${item.year}</span>
          <h4 class="learning-timeline-title">${item.milestone}</h4>
          <p class="learning-timeline-desc">${item.desc}</p>
          <span class="learning-timeline-status">${item.status}</span>
        </div>
      </div>
    `).join('');

    this.dom.timelineRoot.innerHTML = html;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    this.initTimelineAnimations();
  },

  setActiveFilter(activeChip) {
    this.dom.filterChips.forEach(chip => {
      chip.classList.remove('is-active');
      chip.setAttribute('aria-selected', 'false');
    });
    activeChip.classList.add('is-active');
    activeChip.setAttribute('aria-selected', 'true');
  },

  filterGallery(category) {
    this.renderGallery(category);
  },

  initTimelineAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Reset existing triggers to avoid memory leaks
    const existingTrigger1 = ScrollTrigger.getById('learningTimelineProgressDesktop');
    const existingTrigger2 = ScrollTrigger.getById('learningTimelineProgressMobile');
    if (existingTrigger1) existingTrigger1.kill();
    if (existingTrigger2) existingTrigger2.kill();

    const items = selectAll('.learning-timeline-item');
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Desktop horizontal progress bar scroll drawing
      gsap.fromTo('.learning-timeline-progress-bar',
        { width: '0%', height: '2px' },
        {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            id: 'learningTimelineProgressDesktop',
            trigger: '#learning-timeline-root',
            start: 'top 85%',
            end: 'bottom 55%',
            scrub: true
          }
        }
      );
    } else {
      // Mobile vertical progress bar scroll drawing
      gsap.fromTo('.learning-timeline-progress-bar',
        { height: '0%', width: '2px' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            id: 'learningTimelineProgressMobile',
            trigger: '#learning-timeline-root',
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: true
          }
        }
      );
    }

    // Highlight dot nodes as they cross the scroll thresholds
    items.forEach((item, idx) => {
      const existingTriggerItem = ScrollTrigger.getById(`learningTimelineItemHighlight-${idx}`);
      if (existingTriggerItem) existingTriggerItem.kill();

      ScrollTrigger.create({
        id: `learningTimelineItemHighlight-${idx}`,
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
export default certificatesManager;
