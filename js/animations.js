/* ==========================================================================
   ANIMATION & SCROLL CONTROLLER (GSAP, ScrollTrigger, Lenis, Canvas Particles)
   ========================================================================== */

import { animationConfig } from '../config/animation.js';
import { events } from './events.js';
import { select, selectAll } from './helpers.js';

export const animationManager = {
  lenis: null,
  canvas: null,
  ctx: null,
  particles: [],
  animationFrameId: null,
  particleColor: 'rgba(56, 189, 248, 0.2)', // Default sky blue

  init() {
    this.initLenis();
    this.initGSAP();
    this.initParticles();
    
    // Bind to theme events to swap colors on theme update
    events.on('theme:change', ({ resolved }) => {
      this.updateParticleStyle(resolved);
    });

    // Initialize Hero Interactivity & Cinematic Timeline Reveal
    this.initScrollIndicator();
    this.initHeroAnimations();
    this.initMouseParallax();

    // Initialize Projects Section ScrollTriggers
    this.initProjectsAnimations();

    // Initialize About Me Section ScrollTriggers
    this.initAboutAnimations();

    // Initialize Skills Section ScrollTriggers
    this.initSkillsAnimations();

    // Initialize Experience Section ScrollTriggers
    this.initExperienceAnimations();

    // Initialize Startup Section ScrollTriggers
    this.initStartupAnimations();

    // Initialize Blog Section ScrollTriggers
    this.initBlogAnimations();

    // Initialize Certificates Section ScrollTriggers
    this.initCertificatesAnimations();

    // Initialize Contact Section ScrollTriggers
    this.initContactAnimations();
  },

  /**
   * Initializes Lenis smooth scrolling.
   */
  initLenis() {
    if (typeof Lenis !== 'undefined') {
      this.lenis = new Lenis({
        duration: animationConfig.lenis.duration,
        easing: animationConfig.lenis.easing,
        smoothWheel: animationConfig.lenis.smoothWheel,
        orientation: animationConfig.lenis.orientation,
        gestureOrientation: animationConfig.lenis.gestureOrientation,
        wheelMultiplier: animationConfig.lenis.wheelMultiplier,
        touchMultiplier: animationConfig.lenis.touchMultiplier,
        infinite: animationConfig.lenis.infinite,
      });

      // Integrate Lenis scroll updates with ScrollTrigger
      this.lenis.on('scroll', () => {
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.update();
        }
      });

      // Core animation tick link to GSAP ticker
      if (typeof gsap !== 'undefined') {
        gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    }
  },

  /**
   * Registers GSAP ScrollTrigger plugins and respects prefers-reduced-motion.
   */
  initGSAP() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Respect system reduced-motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(1000); // Fast-forward all tweens instantly
        ScrollTrigger.defaults({ toggleActions: 'play none none none' });
      }
    }
  },

  /**
   * High performance 2D Canvas background particle engine setup.
   */
  initParticles() {
    this.canvas = select('#particle-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    
    // Resize observer debounced resize listener
    window.addEventListener('resize', () => this.resizeCanvas());

    // Generate initial particle structures
    const count = animationConfig.particles.maxCount;
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }

    // Resolve starting style
    const initialTheme = document.documentElement.getAttribute('data-theme') || 'auto';
    let resolvedTheme = initialTheme;
    if (initialTheme === 'auto') {
      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    this.updateParticleStyle(resolvedTheme);

    // Bootstrap engine loop
    this.loop();
  },

  createParticle() {
    const { minSize, maxSize, minSpeed, maxSpeed } = animationConfig.particles;
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + (minSpeed * Math.sign(Math.random() - 0.5)),
      speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + (minSpeed * Math.sign(Math.random() - 0.5)),
      opacity: Math.random() * 0.4 + 0.1,
    };
  },

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },

  updateParticleStyle(resolvedTheme) {
    if (resolvedTheme === 'light') {
      this.particleColor = 'rgba(37, 99, 235, 0.15)'; // Deep blue
    } else {
      this.particleColor = 'rgba(56, 189, 248, 0.25)'; // Sky blue glowing
    }
  },

  /**
   * Engine update loop.
   */
  loop() {
    if (!this.ctx) return;
    
    // Clear and redraw
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      // Update coordinates
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap coordinate boundaries
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      // Draw circle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.particleColor;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1.0;
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  },

  /**
   * Bind scroll indicator smooth scroll.
   */
  initScrollIndicator() {
    const indicator = select('.scroll-indicator');
    if (!indicator) return;
    
    indicator.addEventListener('click', (e) => {
      e.preventDefault();
      const targetHash = indicator.getAttribute('href');
      const target = select(targetHash);
      
      if (target && this.lenis) {
        this.lenis.scrollTo(target);
      }
    });
  },

  /**
   * GSAP Cinematic Reveal Timeline
   */
  initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    // Create a precise non-bouncing, premium easing timeline
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
        duration: 0.8
      }
    });

    // 1. Background elements fade in
    tl.to('#particle-canvas', { opacity: 1, duration: 1.2 }, 0);
    tl.to('.bg-layer--glow', { opacity: 1, duration: 1.5 }, 0);

    // 2. Sticky Navbar slides down
    tl.fromTo('.navbar', 
      { y: -40, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 }, 
      0.1
    );

    // 3. Small badge fades up
    tl.fromTo('.hero-badge', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 },
      0.2
    );

    // 4. Main Title
    tl.fromTo('.hero-title', 
      { y: 25, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      0.3
    );

    // 5. Subtitle details
    tl.fromTo('.hero-subtitle', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      0.4
    );

    // 6. Startup Banner
    tl.fromTo('.hero-startup', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      0.5
    );

    // 7. Action buttons
    tl.fromTo('.hero-ctas', 
      { y: 15, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 },
      0.6
    );

    // 8. Social Links
    tl.fromTo('.hero-socials',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      0.7
    );

    // 9. Hero Visual (Profile photo + rotating animation + orbiting labels)
    tl.fromTo('.hero-visual', 
      { scale: 0.95, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.0 },
      0.4
    );

    // 10. Scroll chevron indicator fade in
    tl.fromTo('.scroll-indicator', 
      { opacity: 0 }, 
      { opacity: 0.8, duration: 0.8 },
      0.8
    );
  },

    // Initialize ScrollTrigger counters
    this.initCounters();
  },

  /**
   * GSAP ScrollTrigger numeric metric animation counters
   */
  initCounters() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const cards = selectAll('.metric-card');
    cards.forEach(card => {
      const valueEl = card.querySelector('.metric-val');
      if (!valueEl) return;

      const targetValue = parseInt(valueEl.getAttribute('data-target'), 10) || 0;
      const suffix = valueEl.getAttribute('data-suffix') || '';

      const counterObj = { value: 0 };

      gsap.to(counterObj, {
        value: targetValue,
        scrollTrigger: {
          trigger: card,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true
        },
        duration: 2.0,
        ease: 'power3.out',
        onUpdate: () => {
          valueEl.textContent = Math.floor(counterObj.value) + suffix;
        }
      });
    });
  },

  /**
   * Mouse interactive Parallax visual layer translator
   */
  initMouseParallax() {
    const heroGrid = select('.hero-grid');
    if (!heroGrid || typeof gsap === 'undefined') return;

    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Center coords (-0.5 to 0.5)
      const x = (clientX / width) - 0.5;
      const y = (clientY / height) - 0.5;

      // Parallax portrait frame layers
      const parallaxEls = selectAll('[data-depth]', heroGrid);
      parallaxEls.forEach(el => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0;
        const moveX = x * depth * 140; // max displacement px
        const moveY = y * depth * 140;
        
        gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      // Subtle background blob floating shifts linked to cursor
      const blobs = selectAll('.blob');
      blobs.forEach((blob, idx) => {
        const factor = (idx + 1) * 0.04;
        const moveX = x * factor * 80;
        const moveY = y * factor * 80;

        gsap.to(blob, {
          x: moveX,
          y: moveY,
        });
      });
    });
  },

  /**
   * GSAP ScrollTrigger timelines for Projects grid cards
   */
  initProjectsAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Featured project card reveal
    gsap.fromTo('.project-card--featured',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Standard project cards stagger
    gsap.fromTo('.project-card:not(.project-card--featured)',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Projects CTA panel
    gsap.fromTo('.projects-cta-panel',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * GSAP ScrollTrigger timelines for biography story, timeline tracks, and metrics counters
   */
  initAboutAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Profile image showcase reveal
    gsap.fromTo('.profile-showcase', 
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Biography Content text block staggers
    gsap.fromTo('.bio-headline, .bio-block',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Journey Timeline Connector Line drawing progress track
    gsap.fromTo('.timeline-line-progress', 
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 25%',
          end: 'bottom 75%',
          scrub: true
        }
      }
    );

    // 4. Milestone card entries and active indicator highlights
    const timelineItems = selectAll('.timeline-item');
    timelineItems.forEach(item => {
      // Reveal the card
      const innerCard = item.querySelector('.timeline-item-inner');
      if (innerCard) {
        gsap.fromTo(innerCard,
          { opacity: 0, x: item.classList.contains('timeline-item--left') ? -25 : 25 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Highlight the dot year as active
      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => item.classList.add('is-active'),
        onLeave: () => {},
        onEnterBack: () => item.classList.add('is-active'),
        onLeaveBack: () => item.classList.remove('is-active')
      });
    });

    // 5. Achievement numbers roll-up counters
    const counters = selectAll('.achievement-card .counter');
    counters.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const counterObj = { value: 0 };
      
      gsap.to(counterObj, {
        value: targetVal,
        scrollTrigger: {
          trigger: counter,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        },
        duration: 2.0,
        ease: 'power3.out',
        onUpdate: () => {
          counter.textContent = Math.floor(counterObj.value);
        }
      });
    });

    // 6. Achievements Cards Reveal
    gsap.fromTo('.achievement-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.achievements-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 7. Academic credentials timeline cards
    gsap.fromTo('.education-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.education-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 8. Core values card splits
    gsap.fromTo('.value-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.values-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 9. About CTA Glass Pane
    gsap.fromTo('.about-cta-panel',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * GSAP ScrollTrigger timelines for Skills categories grids, tools grids, and CTA panels
   */
  initSkillsAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Categories Cards reveal
    gsap.fromTo('.category-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-categories-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Tools Grid reveal
    gsap.fromTo('.tool-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.tools-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Skills CTA Glass panel
    gsap.fromTo('.skills-cta-panel',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * GSAP ScrollTrigger timelines for Experience Section milestones, counters, and grids
   */
  initExperienceAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Career Timeline Milestone Cards Reveal (Staggers entry)
    const milestoneCards = selectAll('.career-milestone-card');
    milestoneCards.forEach(card => {
      const item = card.closest('.career-milestone-item');
      if (!item) return;
      const isLeft = item.classList.contains('career-milestone-item--left');
      
      gsap.fromTo(card,
        { opacity: 0, x: isLeft ? -25 : 25 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 2. Experience Cards Grid reveal
    gsap.fromTo('.experience-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-cards-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Achievement Metrics Counter Roll-ups
    const counters = selectAll('.metric-card .counter');
    counters.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const counterObj = { value: 0 };
      
      gsap.to(counterObj, {
        value: targetVal,
        scrollTrigger: {
          trigger: counter,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true
        },
        duration: 2.0,
        ease: 'power3.out',
        onUpdate: () => {
          counter.textContent = Math.floor(counterObj.value);
        }
      });
    });

    // 4. Achievement Metrics Cards Reveal
    gsap.fromTo('.metric-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-metrics-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 5. Professional Highlights Cards Reveal
    gsap.fromTo('.highlight-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.highlights-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 6. Experience CTA Glass Panel
    gsap.fromTo('.experience-cta-panel',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * GSAP ScrollTrigger timelines for Startup landing page components
   */
  initStartupAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Startup Hero Content & Visual splits
    gsap.fromTo('.startup-hero-content',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.startup-hero-grid',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.startup-hero-visual',
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.startup-hero-grid',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Vision & Mission Cards Reveal
    gsap.fromTo('.startup-vision-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.startup-vision-mission',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Product Ecosystem Cards Grid Reveal
    gsap.fromTo('.startup-product-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.startup-products-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 4. Innovation Highlights Cards Reveal
    gsap.fromTo('.startup-innovation-card',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.startup-innovation-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 5. Startup CTA Glass Panel
    gsap.fromTo('.startup-cta-panel',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.startup-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * GSAP ScrollTrigger timelines for Blog & Research components
   */
  initBlogAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Featured Article Split Panel
    gsap.fromTo('.blog-featured-split',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.blog-featured-container',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Reading Statistics counter animations
    gsap.utils.toArray('.blog-statistics-grid .counter-value').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      gsap.fromTo(counter,
        { textContent: 0 },
        {
          textContent: target,
          duration: 1.6,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: '.blog-statistics-grid',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 3. Article cards grid stagger
    gsap.fromTo('#blog-articles-root .article-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#blog-articles-root',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 4. Newsletter CTA Glass Panel entry
    gsap.fromTo('.newsletter-cta-panel',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.newsletter-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * GSAP ScrollTrigger timelines for Certificates & Achievements components
   */
  initCertificatesAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Featured Credential Split
    gsap.fromTo('.featured-credential-split',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.featured-credential-container',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Gallery Grid stagger
    gsap.fromTo('#credentials-grid-root .credential-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.credentials-gallery-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Achievement statistics counter animations (Once)
    gsap.utils.toArray('.achievement-statistics-grid .counter-value').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      gsap.fromTo(counter,
        { textContent: 0 },
        {
          textContent: target,
          duration: 1.6,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: '.achievement-statistics-grid',
            start: 'top 82%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // 4. Certificates CTA Glass Panel
    gsap.fromTo('.certificates-cta-panel',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.certificates-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  },

  /**
   * GSAP ScrollTrigger timelines for Contact & Footer components
   */
  initContactAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // 1. Contact Hero content & visual columns
    gsap.fromTo('.contact-hero-content',
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-hero-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.contact-hero-visual',
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-hero-grid',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 2. Contact Methods stagger
    gsap.fromTo('#contact-methods-root .contact-method-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-methods-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 3. Form and Availability side-by-side panels
    gsap.fromTo('.contact-form-column',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form-grid-layout',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.contact-availability-column',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form-grid-layout',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 4. Social profiles registry cards stagger
    gsap.fromTo('#contact-social-root .social-card',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-social-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 5. Expandable FAQs Accordion items stagger
    gsap.fromTo('#contact-faq-root .faq-item',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-faq-section',
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 6. Final Closing CTA Panel
    gsap.fromTo('.contact-final-cta-panel',
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-final-cta',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 7. Footer columns and newsletter panel reveals
    gsap.fromTo('.footer-grid .footer-brand-col, .footer-grid .footer-links-col',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.app-footer',
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo('.footer-social-newsletter-col',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.app-footer',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // 8. Footer Bottom bar metadata reveal
    gsap.fromTo('.footer-bottom-bar',
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer-bottom-bar',
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      }
    );
  }
};
