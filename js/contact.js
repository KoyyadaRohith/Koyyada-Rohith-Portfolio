/* ==========================================================================
   PORTFOLIO CONTACT CONTROLLER
   ========================================================================== */

import { contactMethods, socialProfiles, availabilityDetails, faqItems } from '../data/contact.js';
import { select, selectAll } from './helpers.js';

export const contactManager = {
  // DOM Elements cache
  dom: {},

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  cacheDOM() {
    this.dom.methodsRoot = select('#contact-methods-root');
    this.dom.socialRoot = select('#contact-social-root');
    this.dom.availabilityRoot = select('#contact-availability-root');
    this.dom.faqRoot = select('#contact-faq-root');
    this.dom.form = select('#contact-form-element');
    this.dom.nameField = select('#contact-name');
    this.dom.emailField = select('#contact-email');
    this.dom.subjectField = select('#contact-subject');
    this.dom.messageField = select('#contact-message');
    this.dom.submitBtn = select('#contact-submit-btn');
    this.dom.resetBtn = select('#contact-reset-btn');
    this.dom.formFeedback = select('#form-feedback');
  },

  bindEvents() {
    // Form submit validation handler
    if (this.dom.form) {
      this.dom.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFormSubmit();
      });

      this.dom.form.addEventListener('reset', () => {
        this.clearValidationErrors();
      });
    }
  },

  render() {
    this.renderMethods();
    this.renderAvailability();
    this.renderSocials();
    this.renderFAQs();
  },

  renderMethods() {
    if (!this.dom.methodsRoot) return;
    this.dom.methodsRoot.innerHTML = contactMethods.map(method => `
      <div class="contact-method-card card card-glass">
        <div class="contact-method-icon-wrap">
          <i data-lucide="${method.icon}"></i>
        </div>
        <h4 class="contact-method-title">${method.title}</h4>
        <span class="contact-method-value">${method.placeholder}</span>
        <p class="contact-method-desc">${method.desc}</p>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderAvailability() {
    if (!this.dom.availabilityRoot) return;

    const collabHtml = availabilityDetails.collaborationTypes.map(type => `
      <span class="credential-skill-tag">${type}</span>
    `).join('');

    this.dom.availabilityRoot.innerHTML = `
      <div class="availability-panel card card-glass">
        <div class="availability-header-wrap">
          <div class="availability-pulse-dot"></div>
          <span class="availability-status-label">${availabilityDetails.status}</span>
        </div>
        
        <div class="availability-grid-list">
          <div class="availability-item">
            <span class="availability-item-title">Avg. Response Rate</span>
            <span class="availability-item-value">${availabilityDetails.responseTime}</span>
          </div>
          <div class="availability-item">
            <span class="availability-item-title">Current Timezone</span>
            <span class="availability-item-value">${availabilityDetails.timezone}</span>
          </div>
        </div>

        <div style="margin-top: var(--spacing-sm);">
          <span class="availability-item-title" style="display: block; margin-bottom: var(--spacing-xs); font-weight: 700;">Specialized Focus</span>
          <div class="credential-skills-wrap">
            ${collabHtml}
          </div>
        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderSocials() {
    if (!this.dom.socialRoot) return;
    this.dom.socialRoot.innerHTML = socialProfiles.map(social => `
      <div class="social-card card card-glass">
        <div class="social-card-header">
          <div class="social-card-icon">
            <i data-lucide="${social.icon}"></i>
          </div>
          <h4 class="social-card-platform">${social.platform}</h4>
        </div>
        <p class="social-card-desc">${social.desc}</p>
        <a href="${social.url}" class="social-card-action">
          <span>Explore Profile</span>
          <i data-lucide="arrow-right"></i>
        </a>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },

  renderFAQs() {
    if (!this.dom.faqRoot) return;
    this.dom.faqRoot.innerHTML = faqItems.map((faq, idx) => `
      <div class="faq-item" data-idx="${idx}">
        <button class="faq-header" id="faq-header-${idx}" aria-expanded="false" aria-controls="faq-content-${idx}" type="button">
          <span class="faq-question">${faq.question}</span>
          <div class="faq-toggle-icon">
            <i data-lucide="chevron-down"></i>
          </div>
        </button>
        <div class="faq-content" id="faq-content-${idx}" role="region" aria-labelledby="faq-header-${idx}">
          <div class="faq-content-inner">
            <p class="faq-answer">${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join('');

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Set up accordion click listeners
    const faqBlocks = selectAll('.contact-faq-accordion .faq-item');
    faqBlocks.forEach(item => {
      const headerBtn = item.querySelector('.faq-header');
      const content = item.querySelector('.faq-content');

      headerBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other FAQ items for a clean accordion user experience
        faqBlocks.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('is-open')) {
            otherItem.classList.remove('is-open');
            otherItem.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.faq-content').style.maxHeight = '0';
          }
        });

        if (!isOpen) {
          item.classList.add('is-open');
          headerBtn.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = `${content.scrollHeight}px`;
        } else {
          item.classList.remove('is-open');
          headerBtn.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = '0';
        }
      });

      // Keyboard accessibility (Arrow keys support)
      headerBtn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const headers = Array.from(selectAll('.contact-faq-accordion .faq-header'));
          const currentIdx = headers.indexOf(headerBtn);
          let targetIdx = currentIdx + (e.key === 'ArrowDown' ? 1 : -1);
          if (targetIdx >= headers.length) targetIdx = 0;
          if (targetIdx < 0) targetIdx = headers.length - 1;
          headers[targetIdx].focus();
        }
      });
    });
  },

  handleFormSubmit() {
    this.clearValidationErrors();

    const name = this.dom.nameField.value.trim();
    const email = this.dom.emailField.value.trim();
    const subject = this.dom.subjectField.value.trim();
    const message = this.dom.messageField.value.trim();

    let hasErrors = false;

    // Local Regex email checking
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      this.showInputError('name', 'Name is required.');
      hasErrors = true;
    }
    if (!email || !emailRegex.test(email)) {
      this.showInputError('email', 'A valid email address is required.');
      hasErrors = true;
    }
    if (!subject) {
      this.showInputError('subject', 'Subject is required.');
      hasErrors = true;
    }
    if (!message) {
      this.showInputError('message', 'Message content is required.');
      hasErrors = true;
    }

    if (hasErrors) {
      this.showFormFeedback('error', 'Please resolve the highlighted validation errors above.');
      return;
    }

    // Success State Transitions
    this.triggerFormLoadingState();
  },

  showInputError(fieldId, errorMsg) {
    const errorLabel = select(`#error-${fieldId}`);
    const inputElement = select(`#contact-${fieldId}`);
    if (errorLabel) {
      errorLabel.textContent = errorMsg;
      errorLabel.style.color = '#EF4444';
    }
    if (inputElement) {
      inputElement.style.borderColor = 'rgba(239, 68, 68, 0.4)';
    }
  },

  clearValidationErrors() {
    ['name', 'email', 'subject', 'message'].forEach(fieldId => {
      const errorLabel = select(`#error-${fieldId}`);
      const inputElement = select(`#contact-${fieldId}`);
      if (errorLabel) {
        errorLabel.textContent = '';
      }
      if (inputElement) {
        inputElement.style.borderColor = '';
      }
    });
    const feedback = this.dom.formFeedback;
    if (feedback) {
      feedback.textContent = '';
      feedback.className = 'form-feedback-overlay';
    }
  },

  showFormFeedback(status, message) {
    const feedback = this.dom.formFeedback;
    if (!feedback) return;
    feedback.className = 'form-feedback-overlay';
    feedback.classList.add(status === 'success' ? 'success' : 'error');
    feedback.textContent = message;
    feedback.style.color = status === 'success' ? '#10B981' : '#EF4444';
  },

  triggerFormLoadingState() {
    const submitBtn = this.dom.submitBtn;
    const resetBtn = this.dom.resetBtn;
    const originalContent = submitBtn.innerHTML;

    // Lock controls
    submitBtn.disabled = true;
    resetBtn.disabled = true;
    submitBtn.innerHTML = '<span>Verifying Payload...</span><i class="spinner-loader"></i>';

    setTimeout(() => {
      // Release locks and trigger success overlays
      submitBtn.disabled = false;
      resetBtn.disabled = false;
      submitBtn.innerHTML = originalContent;

      this.showFormFeedback('success', 'Transmission successful! Sandbox request recorded.');
      
      // Clear inputs
      if (this.dom.form) {
        this.dom.form.reset();
      }

      setTimeout(() => {
        const feedback = this.dom.formFeedback;
        if (feedback) {
          feedback.textContent = '';
          feedback.className = 'form-feedback-overlay';
        }
      }, 3000);

    }, 1500);
  }
};
export default contactManager;
