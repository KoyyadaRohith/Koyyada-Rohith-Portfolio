/* ==========================================================================
   PORTFOLIO BLOG CONTROLLER
   ========================================================================== */

import { featuredArticle, latestArticles, readingStatistics } from '../data/blog.js';
import { select, selectAll } from './helpers.js';

export const blogManager = {
  // DOM Elements cache
  dom: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  cacheDOM() {
    this.dom.featuredRoot = select('#blog-featured-root');
    this.dom.articlesRoot = select('#blog-articles-root');
    this.dom.statsRoot = select('#blog-stats-root');
    this.dom.filterChips = selectAll('.blog-filter-chips .filter-chip-btn');
    this.dom.newsletterForm = select('#newsletter-form-element');
    this.dom.newsletterEmail = select('#newsletter-email');
    this.dom.newsletterSubmit = select('#newsletter-submit-btn');
    this.dom.newsletterFeedback = select('#newsletter-feedback');
  },

  bindEvents() {
    // Filter click listeners
    this.dom.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const filter = chip.getAttribute('data-filter');
        this.setActiveFilter(chip);
        this.filterArticles(filter);
      });
    });

    // Newsletter submit listener
    if (this.dom.newsletterForm) {
      this.dom.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleNewsletterSubmit();
      });
    }
  },

  render() {
    this.renderFeatured();
    this.renderArticles('all');
    this.renderStats();
  },

  renderFeatured() {
    if (!this.dom.featuredRoot) return;
    this.dom.featuredRoot.innerHTML = `
      <div class="blog-featured-split">
        <div class="blog-featured-image-wrap">
          <img src="${featuredArticle.cover}" alt="${featuredArticle.title}" loading="lazy" />
        </div>
        <div class="blog-featured-content">
          <div class="blog-featured-meta">
            <span class="badge-status completed">${featuredArticle.category}</span>
            <span class="article-duration">${featuredArticle.readTime}</span>
            <span class="article-duration">&bull;</span>
            <span class="article-duration">${featuredArticle.date}</span>
          </div>
          <h3 class="blog-featured-title">${featuredArticle.title}</h3>
          <p class="blog-featured-desc">${featuredArticle.desc}</p>
          <a href="#blog" class="btn btn-gradient">
            <span>${featuredArticle.actionText}</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderArticles(filterCategory) {
    if (!this.dom.articlesRoot) return;

    // Filter items array
    const filtered = filterCategory === 'all'
      ? latestArticles
      : latestArticles.filter(art => art.category === filterCategory);

    if (filtered.length === 0) {
      this.dom.articlesRoot.innerHTML = `
        <div class="empty-state">
          <p class="empty-state-text">No articles found in this category.</p>
        </div>
      `;
      return;
    }

    this.dom.articlesRoot.innerHTML = filtered.map((art, idx) => {
      let sizeClass = 'article-card--compact';
      if (idx === 0) {
        sizeClass = 'article-card--hero';
      } else if (idx === 1 || idx === 2) {
        sizeClass = 'article-card--medium';
      }

      return `
        <div class="article-card card card-glass ${sizeClass}" data-category="${art.category}">
          <div class="article-thumbnail-wrap">
            <img src="${art.thumbnail}" alt="${art.title}" loading="lazy" />
          </div>
          <div class="article-content">
            <div class="article-meta">
              <span class="badge-status uppercase">${art.category}</span>
              <span class="article-duration">${art.readTime}</span>
            </div>
            <h4 class="article-title">${art.title}</h4>
            <p class="article-desc">${art.desc}</p>
            <button class="article-action" type="button">
              <span>Read Article</span>
              <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Trigger GSAP fade-in stagger animation for rendered items
    if (typeof gsap !== 'undefined') {
      gsap.fromTo('#blog-articles-root .article-card',
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

    this.dom.statsRoot.innerHTML = readingStatistics.map(stat => `
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

  setActiveFilter(activeChip) {
    this.dom.filterChips.forEach(chip => {
      chip.classList.remove('is-active');
      chip.setAttribute('aria-selected', 'false');
    });
    activeChip.classList.add('is-active');
    activeChip.setAttribute('aria-selected', 'true');
  },

  filterArticles(category) {
    this.renderArticles(category);
  },

  handleNewsletterSubmit() {
    const email = this.dom.newsletterEmail.value.trim();
    const feedback = this.dom.newsletterFeedback;
    const submitBtn = this.dom.newsletterSubmit;

    // Reset feedback states
    feedback.className = 'newsletter-feedback-msg';
    feedback.textContent = '';

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      feedback.classList.add('error');
      feedback.textContent = 'Please enter a valid email address.';
      return;
    }

    // Success State Transitions
    feedback.classList.add('success');
    feedback.textContent = 'Successfully subscribed to the Engineering Digest!';
    this.dom.newsletterEmail.value = '';
    
    // Temporarily update button text & disable it
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    submitBtn.innerHTML = '<span>Subscribed</span><i data-lucide="check"></i>';
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.classList.remove('disabled');
      submitBtn.innerHTML = originalText;
      feedback.textContent = '';
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 3000);
  }
};
export default blogManager;
