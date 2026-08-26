/* ==========================================================================
   PORTFOLIO EXPERIENCE CONTROLLER
   ========================================================================== */

import { careerMilestones, featuredExperience, achievementMetrics, professionalHighlights } from '../data/experience.js';
import { select, selectAll } from './helpers.js';

export const experienceManager = {
  // DOM Elements cache
  dom: {},

  init() {
    this.cacheDOM();
    this.render();
  },

  cacheDOM() {
    this.dom.timelineRoot = select('#career-timeline-root');
    this.dom.experienceRoot = select('#experience-cards-root');
    this.dom.metricsRoot = select('#experience-metrics-root');
    this.dom.highlightsRoot = select('#experience-highlights-root');
  },

  render() {
    this.renderTimeline();
    this.renderExperience();
    this.renderMetrics();
    this.renderHighlights();
  },

  renderTimeline() {
    if (!this.dom.timelineRoot) return;
    this.dom.timelineRoot.innerHTML = careerMilestones.map((ms, idx) => {
      // Alternate left/right columns
      const alignClass = idx % 2 === 0 ? 'career-milestone-item--left' : 'career-milestone-item--right';
      return `
        <div class="career-milestone-item ${alignClass}" data-idx="${idx}">
          <div class="career-milestone-dot"></div>
          <div class="career-milestone-card reveal-fade-up">
            <div class="career-milestone-header">
              <div class="career-milestone-meta">
                <span class="career-milestone-year">${ms.year}</span>
                <span class="career-milestone-duration">${ms.duration}</span>
              </div>
              <div class="career-milestone-icon">
                <i data-lucide="${ms.icon}"></i>
              </div>
            </div>
            <div class="career-milestone-body">
              <h4 class="career-milestone-role">${ms.role}</h4>
              <span class="career-milestone-org">${ms.org}</span>
            </div>
            <p class="career-milestone-desc">${ms.desc}</p>
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    this.initTimelineAnimations();
  },

  renderExperience() {
    if (!this.dom.experienceRoot) return;
    this.dom.experienceRoot.innerHTML = featuredExperience.map(exp => `
      <div class="experience-card card card-glass">
        <div class="experience-card-header">
          <div class="experience-card-meta">
            <span class="experience-card-company">${exp.company}</span>
            <span class="category-count-badge">${exp.category}</span>
          </div>
          <span class="experience-card-role">${exp.role}</span>
          <span class="experience-card-duration">${exp.duration}</span>
        </div>
        <p class="experience-card-desc">${exp.desc}</p>
        <div class="experience-card-tags">
          ${exp.tags.map(tag => `<span class="experience-card-tag">${tag}</span>`).join('')}
        </div>
        <button class="experience-card-action" type="button">
          <span>${exp.actionText}</span>
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderMetrics() {
    if (!this.dom.metricsRoot) return;
    this.dom.metricsRoot.innerHTML = achievementMetrics.map(met => `
      <div class="metric-card card card-glass">
        <div class="metric-header">
          <div class="metric-icon-wrap">
            <i data-lucide="${met.icon}"></i>
          </div>
        </div>
        <span class="metric-number counter" data-target="${met.target}">0</span>
        <h4 class="metric-title">${met.title}</h4>
        <p class="metric-desc">${met.desc}</p>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderHighlights() {
    if (!this.dom.highlightsRoot) return;
    this.dom.highlightsRoot.innerHTML = professionalHighlights.map(hi => `
      <div class="highlight-card card card-glass">
        <div class="highlight-card-header">
          <div class="highlight-icon-wrap">
            <i data-lucide="${hi.icon}"></i>
          </div>
          <div>
            <h4 class="highlight-title">${hi.title}</h4>
            <span class="badge-status completed">${hi.status}</span>
          </div>
        </div>
        <p class="highlight-desc">${hi.desc}</p>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  initTimelineAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Vertical drawing progress line scrubbing
    gsap.fromTo('.career-timeline-line-progress',
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.career-timeline-container',
          start: 'top 30%',
          end: 'bottom 70%',
          scrub: true
        }
      }
    );

    // 2. Active highlights on milestones
    const items = selectAll('.career-milestone-item');
    items.forEach(item => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => item.classList.add('is-active'),
        onLeave: () => {},
        onEnterBack: () => item.classList.add('is-active'),
        onLeaveBack: () => item.classList.remove('is-active')
      });
    });
  }
};
