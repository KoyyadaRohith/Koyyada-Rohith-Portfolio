(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=i(a);fetch(a.href,r)}})();const f={defaultTheme:"auto",storageKey:"portfolio-theme",transitionDuration:300,themes:["dark","light"]},L={get(e,t=null){try{const i=localStorage.getItem(e);return i!==null?JSON.parse(i):t}catch(i){return console.warn("Storage read error:",i),t}},set(e,t){try{return localStorage.setItem(e,JSON.stringify(t)),!0}catch(i){return console.warn("Storage write error:",i),!1}},remove(e){try{return localStorage.removeItem(e),!0}catch(t){return console.warn("Storage removal error:",t),!1}}},s=(e,t=document)=>t.querySelector(e),c=(e,t=document)=>Array.from(t.querySelectorAll(e)),n={body:document.body,html:document.documentElement,get navbar(){return s(".navbar")},get themeToggle(){return s(".theme-switch-btn")},get menuToggle(){return s(".menu-toggle-btn")},get drawer(){return s(".nav-drawer")},get drawerClose(){return s(".drawer-close-btn")},get overlay(){return s(".nav-overlay")},get bgCanvas(){return s("#bg-canvas")},get particleContainer(){return s(".bg-particles")},addClass(e,t){e&&e.classList.add(t)},removeClass(e,t){e&&e.classList.remove(t)},toggleClass(e,t){e&&e.classList.toggle(t)},hasClass(e,t){return e?e.classList.contains(t):!1}};class M{constructor(){this.events={}}on(t,i){this.events[t]||(this.events[t]=[]),this.events[t].push(i)}off(t,i){this.events[t]&&(this.events[t]=this.events[t].filter(o=>o!==i))}emit(t,i){this.events[t]&&this.events[t].forEach(o=>{try{o(i)}catch(a){console.error(`Error in event listener for ${t}:`,a)}})}}const S=new M,x={currentTheme:"auto",init(){const e=L.get(f.storageKey,f.defaultTheme);this.setTheme(e,!1),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{this.currentTheme==="auto"&&this.applyThemeToDOM("auto",!0)})},setTheme(e,t=!0){[...f.themes,"auto"].includes(e)||(e="auto"),this.currentTheme=e,L.set(f.storageKey,e),this.applyThemeToDOM(e,t),S.emit("theme:change",{theme:e,resolved:this.getResolvedTheme()})},getResolvedTheme(){return this.currentTheme==="auto"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":this.currentTheme},applyThemeToDOM(e,t){t&&n.addClass(n.html,"theme-transitioning"),n.html.setAttribute("data-theme",e),t&&setTimeout(()=>{n.removeClass(n.html,"theme-transitioning")},f.transitionDuration)},toggle(){let e;this.currentTheme==="auto"?e="dark":this.currentTheme==="dark"?e="light":e="auto",this.setTheme(e,!0)}},u={lenis:{duration:1.2,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,wheelMultiplier:1,touchMultiplier:2,infinite:!1},particles:{maxCount:40,minSize:1,maxSize:3,minSpeed:.1,maxSpeed:.5}},y={lenis:null,canvas:null,ctx:null,particles:[],animationFrameId:null,particleColor:"rgba(56, 189, 248, 0.2)",init(){typeof gsap<"u"&&typeof ScrollTrigger<"u"?(document.body.classList.add("js-animate"),this.initLenis(),this.initGSAP(),this.initParticles(),S.on("theme:change",({resolved:e})=>{this.updateParticleStyle(e)}),this.initScrollIndicator(),this.initHeroAnimations(),this.initMouseParallax(),this.initProjectsAnimations(),this.initAboutAnimations(),this.initSkillsAnimations(),this.initExperienceAnimations(),this.initStartupAnimations(),this.initBlogAnimations(),this.initCertificatesAnimations(),this.initContactAnimations()):document.querySelectorAll(".reveal-fade-up, .reveal-fade-down, .reveal-fade-left, .reveal-fade-right, .reveal-scale, .reveal-blur").forEach(e=>{e.classList.add("is-revealed")}),setTimeout(()=>{document.querySelectorAll(".reveal-fade-up, .reveal-fade-down, .reveal-fade-left, .reveal-fade-right, .reveal-scale, .reveal-blur").forEach(e=>{e.classList.add("is-revealed")})},1200)},initLenis(){typeof Lenis<"u"&&(this.lenis=new Lenis({duration:u.lenis.duration,easing:u.lenis.easing,smoothWheel:u.lenis.smoothWheel,orientation:u.lenis.orientation,gestureOrientation:u.lenis.gestureOrientation,wheelMultiplier:u.lenis.wheelMultiplier,touchMultiplier:u.lenis.touchMultiplier,infinite:u.lenis.infinite}),this.lenis.on("scroll",()=>{typeof ScrollTrigger<"u"&&ScrollTrigger.update()}),typeof gsap<"u"&&(gsap.ticker.add(e=>{this.lenis.raf(e*1e3)}),gsap.ticker.lagSmoothing(0)))},initGSAP(){typeof gsap<"u"&&typeof ScrollTrigger<"u"&&(gsap.registerPlugin(ScrollTrigger),window.matchMedia("(prefers-reduced-motion: reduce)").matches&&(gsap.globalTimeline.timeScale(1e3),ScrollTrigger.defaults({toggleActions:"play none none none"})))},initParticles(){if(this.canvas=s("#particle-canvas"),!this.canvas)return;this.ctx=this.canvas.getContext("2d"),this.resizeCanvas(),window.addEventListener("resize",()=>this.resizeCanvas());const e=u.particles.maxCount;this.particles=[];for(let o=0;o<e;o++)this.particles.push(this.createParticle());const t=document.documentElement.getAttribute("data-theme")||"auto";let i=t;t==="auto"&&(i=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),this.updateParticleStyle(i),this.loop()},createParticle(){const{minSize:e,maxSize:t,minSpeed:i,maxSpeed:o}=u.particles;return{x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,radius:Math.random()*(t-e)+e,speedX:(Math.random()-.5)*(o-i)+i*Math.sign(Math.random()-.5),speedY:(Math.random()-.5)*(o-i)+i*Math.sign(Math.random()-.5),opacity:Math.random()*.4+.1}},resizeCanvas(){this.canvas&&(this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight)},updateParticleStyle(e){e==="light"?this.particleColor="rgba(37, 99, 235, 0.15)":this.particleColor="rgba(56, 189, 248, 0.25)"},loop(){this.ctx&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{e.x+=e.speedX,e.y+=e.speedY,e.x<0&&(e.x=this.canvas.width),e.x>this.canvas.width&&(e.x=0),e.y<0&&(e.y=this.canvas.height),e.y>this.canvas.height&&(e.y=0),this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.radius,0,Math.PI*2),this.ctx.fillStyle=this.particleColor,this.ctx.globalAlpha=e.opacity,this.ctx.fill()}),this.ctx.globalAlpha=1,this.animationFrameId=requestAnimationFrame(()=>this.loop()))},initScrollIndicator(){const e=s(".scroll-indicator");e&&e.addEventListener("click",t=>{t.preventDefault();const i=e.getAttribute("href"),o=s(i);o&&this.lenis&&this.lenis.scrollTo(o)})},initHeroAnimations(){if(typeof gsap>"u")return;const e=gsap.timeline({defaults:{ease:"power3.out",duration:1}});e.to("#particle-canvas",{opacity:1,duration:1.2},0),e.to(".bg-layer--glow",{opacity:1,duration:1.5},0),e.fromTo(".navbar",{y:-40,opacity:0},{y:0,opacity:1,duration:.8},.2),e.fromTo(".hero-badge",{y:20,opacity:0},{y:0,opacity:1,duration:.6},.4),e.fromTo(".hero-line-inner",{yPercent:100},{yPercent:0,duration:.8,stagger:.15},.5),e.fromTo(".hero-subtitle",{y:15,opacity:0},{y:0,opacity:1,duration:.8},.9),e.fromTo(".hero-ctas",{y:15,opacity:0},{y:0,opacity:1,duration:.8},1),e.fromTo(".hero-socials",{y:12,opacity:0},{y:0,opacity:1,duration:.6},1.1),e.fromTo(".metric-card",{y:20,opacity:0},{y:0,opacity:1,duration:.8,stagger:.1},1.2),e.fromTo(".hero-tech-strip",{y:15,opacity:0},{y:0,opacity:1,duration:.8},1.4),e.fromTo(".hero-image-container",{scale:.96,opacity:0},{scale:1,opacity:1,duration:1},1.1),e.fromTo(".visual-glow, .floating-ring",{scale:.92,opacity:0},{scale:1,opacity:(t,i)=>i.classList.contains("ring-1")?.6:i.classList.contains("ring-2")?.4:i.classList.contains("glow-blue")?.8:i.classList.contains("glow-cyan")?.7:1,duration:1.2,stagger:.08},1.3),e.fromTo(".scroll-indicator",{opacity:0},{opacity:.7,duration:1},1.6),this.initCounters()},initCounters(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;c(".metric-card").forEach(t=>{const i=t.querySelector(".metric-val");if(!i)return;const o=parseInt(i.getAttribute("data-target"),10)||0,a=i.getAttribute("data-suffix")||"",r={value:0};gsap.to(r,{value:o,scrollTrigger:{trigger:t,start:"top 95%",toggleActions:"play none none none",once:!0},duration:2,ease:"power3.out",onUpdate:()=>{i.textContent=Math.floor(r.value)+a}})})},initMouseParallax(){const e=s(".hero-grid");!e||typeof gsap>"u"||window.addEventListener("mousemove",t=>{const{clientX:i,clientY:o}=t,a=window.innerWidth,r=window.innerHeight,l=i/a-.5,d=o/r-.5;c("[data-depth]",e).forEach(v=>{const b=parseFloat(v.getAttribute("data-depth"))||0,w=l*b*140,k=d*b*140;gsap.to(v,{x:w,y:k,duration:1.2,ease:"power2.out",overwrite:"auto"})}),c(".blob").forEach((v,b)=>{const w=(b+1)*.04,k=l*w*80,$=d*w*80;gsap.to(v,{x:k,y:$})})})},initProjectsAnimations(){typeof gsap>"u"||typeof ScrollTrigger>"u"||(gsap.fromTo(".project-card--featured",{opacity:0,y:30},{opacity:1,y:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:".projects-section",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".project-card:not(.project-card--featured)",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".projects-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".projects-cta-panel",{opacity:0,y:20},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".projects-cta",start:"top 85%",toggleActions:"play none none none"}}))},initAboutAnimations(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;gsap.fromTo(".profile-showcase",{opacity:0,scale:.96},{opacity:1,scale:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:".about-grid",start:"top 78%",toggleActions:"play none none none"}}),gsap.fromTo(".bio-headline, .bio-block",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".about-grid",start:"top 78%",toggleActions:"play none none none"}}),gsap.fromTo(".timeline-line-progress",{height:"0%"},{height:"100%",ease:"none",scrollTrigger:{trigger:".timeline-container",start:"top 25%",end:"bottom 75%",scrub:!0}}),c(".timeline-item").forEach(i=>{const o=i.querySelector(".timeline-item-inner");o&&gsap.fromTo(o,{opacity:0,x:i.classList.contains("timeline-item--left")?-25:25},{opacity:1,x:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:i,start:"top 80%",toggleActions:"play none none none"}}),ScrollTrigger.create({trigger:i,start:"top 60%",end:"bottom 40%",onEnter:()=>i.classList.add("is-active"),onLeave:()=>{},onEnterBack:()=>i.classList.add("is-active"),onLeaveBack:()=>i.classList.remove("is-active")})}),c(".achievement-card .counter").forEach(i=>{const o=parseInt(i.getAttribute("data-target"),10)||0,a={value:0};gsap.to(a,{value:o,scrollTrigger:{trigger:i,start:"top 88%",toggleActions:"play none none none",once:!0},duration:2,ease:"power3.out",onUpdate:()=>{i.textContent=Math.floor(a.value)}})}),gsap.fromTo(".achievement-card",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".achievements-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".education-card",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:".education-grid",start:"top 80%",toggleActions:"play none none none"}}),gsap.fromTo(".value-card",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".values-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".about-cta-panel",{opacity:0,y:20},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".about-cta",start:"top 85%",toggleActions:"play none none none"}})},initSkillsAnimations(){typeof gsap>"u"||typeof ScrollTrigger>"u"||(gsap.fromTo(".category-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".skills-categories-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".tool-card",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:".tools-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".skills-cta-panel",{opacity:0,y:20},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".skills-cta",start:"top 85%",toggleActions:"play none none none"}}))},initExperienceAnimations(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;c(".career-milestone-card").forEach(i=>{const o=i.closest(".career-milestone-item");if(!o)return;const a=o.classList.contains("career-milestone-item--left");gsap.fromTo(i,{opacity:0,x:a?-25:25},{opacity:1,x:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:i,start:"top 82%",toggleActions:"play none none none"}})}),gsap.fromTo(".experience-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:".experience-cards-grid",start:"top 82%",toggleActions:"play none none none"}}),c(".metric-card .counter").forEach(i=>{const o=parseInt(i.getAttribute("data-target"),10)||0,a={value:0};gsap.to(a,{value:o,scrollTrigger:{trigger:i,start:"top 88%",toggleActions:"play none none none",once:!0},duration:2,ease:"power3.out",onUpdate:()=>{i.textContent=Math.floor(a.value)}})}),gsap.fromTo(".metric-card",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".experience-metrics-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".highlight-card",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".highlights-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".experience-cta-panel",{opacity:0,y:20},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".experience-cta",start:"top 85%",toggleActions:"play none none none"}})},initStartupAnimations(){typeof gsap>"u"||typeof ScrollTrigger>"u"||(gsap.fromTo(".startup-hero-content",{opacity:0,x:-30},{opacity:1,x:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".startup-hero-grid",start:"top 78%",toggleActions:"play none none none"}}),gsap.fromTo(".startup-hero-visual",{opacity:0,scale:.96},{opacity:1,scale:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:".startup-hero-grid",start:"top 78%",toggleActions:"play none none none"}}),gsap.fromTo(".startup-vision-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.15,ease:"power3.out",scrollTrigger:{trigger:".startup-vision-mission",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".startup-product-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.12,ease:"power3.out",scrollTrigger:{trigger:".startup-products-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".startup-innovation-card",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".startup-innovation-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".startup-cta-panel",{opacity:0,y:25},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".startup-cta",start:"top 85%",toggleActions:"play none none none"}}))},initBlogAnimations(){typeof gsap>"u"||typeof ScrollTrigger>"u"||(gsap.fromTo(".blog-featured-split",{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".blog-featured-container",start:"top 82%",toggleActions:"play none none none"}}),gsap.utils.toArray(".blog-statistics-grid .counter-value").forEach(e=>{const t=parseInt(e.getAttribute("data-target"),10)||0;gsap.fromTo(e,{textContent:0},{textContent:t,duration:1.6,ease:"power2.out",snap:{textContent:1},scrollTrigger:{trigger:".blog-statistics-grid",start:"top 82%",toggleActions:"play none none none"}})}),gsap.fromTo("#blog-articles-root .article-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:"#blog-articles-root",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".newsletter-cta-panel",{opacity:0,y:25},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".newsletter-cta",start:"top 85%",toggleActions:"play none none none"}}))},initCertificatesAnimations(){typeof gsap>"u"||typeof ScrollTrigger>"u"||(gsap.fromTo(".featured-credential-split",{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".featured-credential-container",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo("#credentials-grid-root .credential-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".credentials-gallery-section",start:"top 82%",toggleActions:"play none none none"}}),gsap.utils.toArray(".achievement-statistics-grid .counter-value").forEach(e=>{const t=parseInt(e.getAttribute("data-target"),10)||0;gsap.fromTo(e,{textContent:0},{textContent:t,duration:1.6,ease:"power2.out",snap:{textContent:1},scrollTrigger:{trigger:".achievement-statistics-grid",start:"top 82%",toggleActions:"play none none none"}})}),gsap.fromTo(".certificates-cta-panel",{opacity:0,y:25},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".certificates-cta",start:"top 85%",toggleActions:"play none none none"}}))},initContactAnimations(){typeof gsap>"u"||typeof ScrollTrigger>"u"||(gsap.fromTo(".contact-hero-content",{opacity:0,x:-30},{opacity:1,x:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".contact-hero-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".contact-hero-visual",{opacity:0,x:30},{opacity:1,x:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".contact-hero-grid",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo("#contact-methods-root .contact-method-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:".contact-methods-section",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".contact-form-column",{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".contact-form-grid-layout",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".contact-availability-column",{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".contact-form-grid-layout",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo("#contact-social-root .social-card",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:".contact-social-section",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo("#contact-faq-root .faq-item",{opacity:0,y:15},{opacity:1,y:0,duration:.8,stagger:.08,ease:"power3.out",scrollTrigger:{trigger:".contact-faq-section",start:"top 82%",toggleActions:"play none none none"}}),gsap.fromTo(".contact-final-cta-panel",{opacity:0,scale:.96},{opacity:1,scale:1,duration:1,ease:"power3.out",scrollTrigger:{trigger:".contact-final-cta",start:"top 85%",toggleActions:"play none none none"}}),gsap.fromTo(".footer-grid .footer-brand-col, .footer-grid .footer-links-col",{opacity:0,y:20},{opacity:1,y:0,duration:.8,stagger:.1,ease:"power3.out",scrollTrigger:{trigger:".app-footer",start:"top 88%",toggleActions:"play none none none"}}),gsap.fromTo(".footer-social-newsletter-col",{opacity:0,y:25},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".app-footer",start:"top 85%",toggleActions:"play none none none"}}),gsap.fromTo(".footer-bottom-bar",{opacity:0,y:15},{opacity:1,y:0,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".footer-bottom-bar",start:"top 95%",toggleActions:"play none none none"}}))}},C={lastScrollTop:0,scrollThreshold:10,navbarHeight:72,init(){this.bindScroll(),this.bindMobileMenu(),this.bindSmoothScroll()},bindScroll(){window.addEventListener("scroll",()=>{const e=window.pageYOffset||document.documentElement.scrollTop;if(e>30?n.addClass(n.navbar,"navbar--scrolled"):n.removeClass(n.navbar,"navbar--scrolled"),e<0)return;Math.abs(e-this.lastScrollTop)>this.scrollThreshold&&(e>this.lastScrollTop&&e>this.navbarHeight?n.addClass(n.navbar,"navbar--hidden"):n.removeClass(n.navbar,"navbar--hidden")),this.lastScrollTop=e},{passive:!0})},bindMobileMenu(){const e=n.menuToggle,t=n.drawer,i=n.drawerClose,o=n.overlay;!e||!t||!i||!o||(e.addEventListener("click",()=>this.openDrawer()),i.addEventListener("click",()=>this.closeDrawer()),o.addEventListener("click",()=>this.closeDrawer()),window.addEventListener("keydown",a=>{a.key==="Escape"&&n.hasClass(t,"is-open")&&this.closeDrawer()}))},openDrawer(){const e=n.drawer,t=n.overlay,i=n.menuToggle;n.addClass(e,"is-open"),n.addClass(t,"is-visible"),i.setAttribute("aria-expanded","true"),e.setAttribute("aria-hidden","false"),this.trapFocus(e)},closeDrawer(){const e=n.drawer,t=n.overlay,i=n.menuToggle;n.removeClass(e,"is-open"),n.removeClass(t,"is-visible"),i.setAttribute("aria-expanded","false"),e.setAttribute("aria-hidden","true"),i.focus()},trapFocus(e){const t=c('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',e);if(t.length===0)return;const i=t[0],o=t[t.length-1];setTimeout(()=>i.focus(),50),e.addEventListener("keydown",function(a){a.key==="Tab"&&(a.shiftKey?document.activeElement===i&&(o.focus(),a.preventDefault()):document.activeElement===o&&(i.focus(),a.preventDefault()))})},bindSmoothScroll(){document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){const i=this.getAttribute("href");if(i==="#")return;t.preventDefault();const o=n.drawer;o&&n.hasClass(o,"is-open")&&C.closeDrawer();const a=s(i);a&&(y.lenis?y.lenis.scrollTo(a,{offset:-C.navbarHeight,duration:1.2,easing:r=>Math.min(1,1.001-Math.pow(2,-10*r))}):a.scrollIntoView({behavior:"smooth"}))})})}},R={init(){this.setupCursorLayers()},setupCursorLayers(){}},A=[{id:"p1",slug:"cyber-black-sword",title:"Cyber Black Sword",subtitle:"AI-Powered Cybersecurity Protection Engine",category:"cybersecurity",status:"Live",difficulty:"Advanced",technologies:["Python","Linux","Git","React","Node.js","Docker","SOC Telemetry"],overview:"Flagship cybersecurity ecosystem module offering real-time zero-trust validation, AI-assisted threat mitigation, and automated system isolation.",problem:"Traditional security setups lack automated AI-assisted incident response and real-time zero-trust isolation capabilities.",solution:"Cyber Black Sword deploys intelligent monitoring loops and container isolation protocols to stop exploits instantly.",features:["Real-time packet and system log telemetry collection.","AI-assisted vulnerability triage and risk scoring.","Zero-trust credential validation handshakes.","Automated incident isolation and alert dispatch."],github:"https://github.com/KoyyadaRohith",live:"https://github.com/KoyyadaRohith",featured:!0},{id:"p2",slug:"cbtip",title:"Cyber Black Threat Intelligence Platform (CBTIP)",subtitle:"Centralized Threat Intelligence & IOC Tracker",category:"cybersecurity",status:"Beta",difficulty:"Advanced",technologies:["Python","FastAPI","React","PostgreSQL","Threat Feeds"],overview:"High-performance threat intelligence dashboard indexing malware signatures, IP reputation data, and security IOCs.",problem:"Security teams struggle to correlate fragmented threat data streams in real time.",solution:"CBTIP aggregates feeds into a unified dashboard with instant search, threat scoring, and API integrations.",features:["Aggregated multi-feed threat intelligence ingestion.","Real-time IP & Hash reputation lookup.","Automated indicator of compromise (IOC) export."],github:"https://github.com/KoyyadaRohith",live:"https://github.com/KoyyadaRohith",featured:!0},{id:"p3",slug:"cyber-black-squad",title:"Cyber Black Squad Platform",subtitle:"Collaborative SOC Analyst & Security Hub",category:"web",status:"Live",difficulty:"Intermediate",technologies:["React","Node.js","Express","MongoDB","WebSockets"],overview:"Collaboration hub for SOC analysts in training to run simulations, share threat playbooks, and track security operations.",problem:"Junior security analysts lack practical collaborative sandboxes for real-world incident handling.",solution:"Cyber Black Squad provides a shared workspace with live incident feeds and scenario playbooks.",features:["Interactive incident handling playbooks.","Real-time WebSocket communication channels.","Role-based access control and analyst task tracking."],github:"https://github.com/KoyyadaRohith",live:"https://github.com/KoyyadaRohith",featured:!0},{id:"p4",slug:"scholarship-eligibility-checker",title:"Scholarship Eligibility Checker",subtitle:"Automated Student Qualification System",category:"web",status:"Live",difficulty:"Intermediate",technologies:["HTML5","CSS3","JavaScript","LocalStorage"],overview:"Web application calculating student scholarship eligibility based on academic scores and financial criteria.",problem:"Manual scholarship processing is error-prone and slow.",solution:"Automated logic engine evaluating multi-attribute criteria instantly.",features:["Multi-step eligibility wizard.","Instant criteria evaluation with visual report.","Exportable application summary."],github:"https://github.com/KoyyadaRohith",live:"https://github.com/KoyyadaRohith",featured:!1},{id:"p5",slug:"aurora-wifi-connectivity-hub",title:"Aurora Wi-Fi Connectivity Hub",subtitle:"Campus Network Access & Diagnostics Portal",category:"web",status:"Live",difficulty:"Intermediate",technologies:["HTML5","CSS3","JavaScript","Networking"],overview:"Portal for campus network configuration, user authentication guidance, and connection troubleshooting.",problem:"Students experience connectivity issues without clear diagnostic guidance.",solution:"Interactive troubleshooting flow and automated network status checker.",features:["Interactive step-by-step Wi-Fi setup guides.","Self-service connection troubleshooting flow.","Network status updates and reporting."],github:"https://github.com/KoyyadaRohith",live:"https://github.com/KoyyadaRohith",featured:!1}],P={state:{category:"all",search:"",tech:"all",status:"all",difficulty:"all",currentProject:null,currentImageIndex:0,previousFocusedElement:null},dom:{},init(){this.cacheDOM(),this.bindEvents(),this.render()},cacheDOM(){this.dom.search=s("#project-search"),this.dom.searchClear=s("#search-clear-btn"),this.dom.tabs=c(".category-tabs .tab-btn"),this.dom.filterTech=s("#filter-tech"),this.dom.filterStatus=s("#filter-status"),this.dom.filterDifficulty=s("#filter-difficulty"),this.dom.flagshipSlot=s("#flagship-project-slot"),this.dom.gridSlot=s("#grid-projects-slot"),this.dom.emptyState=s("#empty-search-state"),this.dom.resetBtn=s("#reset-filters-btn"),this.dom.modal=s("#project-modal"),this.dom.modal&&(this.dom.modalTitle=this.dom.modal.querySelector("#modal-project-title"),this.dom.modalStatus=this.dom.modal.querySelector("#modal-project-status"),this.dom.modalCloseBtn=this.dom.modal.querySelector(".modal-close-btn"),this.dom.modalMockup=this.dom.modal.querySelector("#modal-mockup-container"),this.dom.modalThumbnails=this.dom.modal.querySelector("#modal-thumbnails"),this.dom.modalOverview=this.dom.modal.querySelector("#modal-project-overview"),this.dom.modalProblem=this.dom.modal.querySelector("#modal-project-problem"),this.dom.modalSolution=this.dom.modal.querySelector("#modal-project-solution"),this.dom.modalFeatures=this.dom.modal.querySelector("#modal-project-features"),this.dom.modalArchitecture=this.dom.modal.querySelector("#modal-project-architecture"),this.dom.modalTech=this.dom.modal.querySelector("#modal-project-tech"),this.dom.modalYear=this.dom.modal.querySelector("#modal-project-year"),this.dom.modalDuration=this.dom.modal.querySelector("#modal-project-duration"),this.dom.modalDifficulty=this.dom.modal.querySelector("#modal-project-difficulty"),this.dom.modalLinkDemo=this.dom.modal.querySelector("#modal-link-demo"),this.dom.modalLinkGithub=this.dom.modal.querySelector("#modal-link-github"),this.dom.modalLinkDocs=this.dom.modal.querySelector("#modal-link-docs")),this.dom.lightbox=s("#gallery-lightbox"),this.dom.lightbox&&(this.dom.lightboxCloseBtn=this.dom.lightbox.querySelector(".lightbox-close-btn"),this.dom.lightboxPrevBtn=this.dom.lightbox.querySelector(".prev-btn"),this.dom.lightboxNextBtn=this.dom.lightbox.querySelector(".next-btn"),this.dom.lightboxPlaceholder=this.dom.lightbox.querySelector("#lightbox-image-placeholder"),this.dom.lightboxCaption=this.dom.lightbox.querySelector("#lightbox-caption"),this.dom.lightboxDots=this.dom.lightbox.querySelector("#lightbox-thumbnails-indicator"))},bindEvents(){this.dom.search&&this.dom.search.addEventListener("input",t=>{this.state.search=t.target.value.trim().toLowerCase(),this.toggleSearchClearButton(),this.render()}),this.dom.searchClear&&this.dom.searchClear.addEventListener("click",()=>{this.dom.search&&(this.dom.search.value="",this.state.search="",this.toggleSearchClearButton(),this.render(),this.dom.search.focus())}),this.dom.tabs.forEach(t=>{t.addEventListener("click",()=>{this.dom.tabs.forEach(i=>{i.classList.remove("is-active"),i.setAttribute("aria-selected","false")}),t.classList.add("is-active"),t.setAttribute("aria-selected","true"),this.state.category=t.getAttribute("data-category"),this.render()})});const e=(t,i)=>{t&&t.addEventListener("change",o=>{this.state[i]=o.target.value,this.render()})};e(this.dom.filterTech,"tech"),e(this.dom.filterStatus,"status"),e(this.dom.filterDifficulty,"difficulty"),this.dom.resetBtn&&this.dom.resetBtn.addEventListener("click",()=>this.resetFilters()),this.dom.modalCloseBtn&&this.dom.modalCloseBtn.addEventListener("click",()=>this.closeModal()),this.dom.modal&&this.dom.modal.addEventListener("click",t=>{t.target===this.dom.modal&&this.closeModal()}),window.addEventListener("keydown",t=>{this.dom.modal&&this.dom.modal.classList.contains("is-open")?(t.key==="Escape"&&(this.dom.lightbox&&this.dom.lightbox.classList.contains("is-open")?this.closeLightbox():this.closeModal()),t.key==="Tab"&&this.trapFocus(t,this.dom.modal)):this.dom.lightbox&&this.dom.lightbox.classList.contains("is-open")&&(t.key==="Escape"&&this.closeLightbox(),t.key==="ArrowLeft"&&this.navigateLightbox(-1),t.key==="ArrowRight"&&this.navigateLightbox(1))}),this.dom.lightboxCloseBtn&&this.dom.lightboxCloseBtn.addEventListener("click",()=>this.closeLightbox()),this.dom.lightboxPrevBtn&&this.dom.lightboxPrevBtn.addEventListener("click",()=>this.navigateLightbox(-1)),this.dom.lightboxNextBtn&&this.dom.lightboxNextBtn.addEventListener("click",()=>this.navigateLightbox(1)),this.dom.lightbox&&this.dom.lightbox.addEventListener("click",t=>{t.target===this.dom.lightbox&&this.closeLightbox()})},toggleSearchClearButton(){this.dom.searchClear&&(this.dom.searchClear.style.display=this.state.search?"block":"none")},resetFilters(){this.state.category="all",this.state.search="",this.state.tech="all",this.state.status="all",this.state.difficulty="all",this.dom.search&&(this.dom.search.value=""),this.toggleSearchClearButton(),this.dom.filterTech&&(this.dom.filterTech.value="all"),this.dom.filterStatus&&(this.dom.filterStatus.value="all"),this.dom.filterDifficulty&&(this.dom.filterDifficulty.value="all"),this.dom.tabs.forEach(e=>{e.classList.remove("is-active"),e.setAttribute("aria-selected","false"),e.getAttribute("data-category")==="all"&&(e.classList.add("is-active"),e.setAttribute("aria-selected","true"))}),this.render()},getFilteredProjects(){return A.filter(e=>{const t=`${e.title} ${e.subtitle} ${e.overview} ${e.technologies.join(" ")}`.toLowerCase();return!(this.state.search&&!t.includes(this.state.search)||this.state.category!=="all"&&e.category.toLowerCase()!==this.state.category||this.state.tech!=="all"&&!e.technologies.map(i=>i.toLowerCase()).includes(this.state.tech)||this.state.status!=="all"&&e.status.toLowerCase()!==this.state.status||this.state.difficulty!=="all"&&e.difficulty.toLowerCase()!==this.state.difficulty)})},render(){const e=this.getFilteredProjects();if(e.length===0){this.dom.flagshipSlot.innerHTML="",this.dom.gridSlot.innerHTML="",this.dom.emptyState.style.display="flex";return}this.dom.emptyState.style.display="none";const t=e[0];this.dom.flagshipSlot.innerHTML=this.createCardHTML(t,!0);const i=e.slice(1);this.dom.gridSlot.innerHTML=i.map(o=>this.createCardHTML(o,!1)).join(""),c(".learn-more-btn").forEach(o=>{o.addEventListener("click",a=>{const r=o.getAttribute("data-id"),l=A.find(d=>d.id===r);l&&this.openModal(l,a.target)})}),typeof lucide<"u"&&lucide.createIcons(),typeof gsap<"u"&&gsap.fromTo(".project-card",{y:30,opacity:0},{y:0,opacity:1,duration:.6,stagger:.08,ease:"power2.out",overwrite:"auto"})},createCardHTML(e,t){const i=e.status.toLowerCase(),o=e.technologies.slice(0,4).map(r=>`<span class="tech-chip">${r}</span>`).join(""),a=this.renderDeviceMockup(e.mockup,e.title,e.slug);return t?`
        <article class="project-card project-card--featured card card-glass reveal-fade-up" data-id="${e.id}">
          <div class="card-image-wrap">
            ${a}
          </div>
          <div class="card-content-wrap">
            <div class="card-meta">
              <span class="card-category">${e.category}</span>
              <span class="card-status-badge ${i}">${e.status}</span>
            </div>
            <h3 class="card-title">${e.title}</h3>
            <p class="card-desc">${e.overview}</p>
            <div class="card-tech-chips">
              ${o}
            </div>
            <div class="card-actions">
              <button class="btn btn-primary learn-more-btn" data-id="${e.id}" type="button">
                <span>Learn More</span>
                <i data-lucide="arrow-right"></i>
              </button>
              ${e.github?`
                <a href="${e.github}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer" aria-label="GitHub Source">
                  <i data-lucide="github"></i>
                </a>
              `:""}
            </div>
          </div>
        </article>
      `:`
      <article class="project-card project-card--grid card card-glass" data-id="${e.id}">
        <div class="card-image-wrap">
          ${a}
        </div>
        <div class="card-content-wrap">
          <div class="card-meta">
            <span class="card-category">${e.category}</span>
            <span class="card-status-badge ${i}">${e.status}</span>
          </div>
          <h3 class="card-title">${e.title}</h3>
          <p class="card-desc">${e.subtitle}</p>
          <div class="card-tech-chips">
            ${o}
          </div>
          <div class="card-actions">
            <button class="btn btn-secondary learn-more-btn" data-id="${e.id}" type="button">
              <span>Learn More</span>
              <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </article>
    `},renderDeviceMockup(e,t,i){return e==="browser"?`
        <div class="mockup-browser">
          <div class="browser-bar">
            <div class="browser-dots">
              <div class="browser-dot browser-dot--close"></div>
              <div class="browser-dot browser-dot--minimize"></div>
              <div class="browser-dot browser-dot--expand"></div>
            </div>
            <div class="browser-address">https://rohith.io/projects/${i}</div>
          </div>
          <div class="browser-body">
            <div class="mockup-image-placeholder">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${t} Browser Frame">
                <rect x="20" y="20" width="60" height="60" rx="6" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="40" cy="40" r="6" stroke="currentColor" stroke-width="1.5"/>
                <path d="M25 75L50 50L75 75" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      `:e==="laptop"?`
        <div class="mockup-laptop">
          <div class="laptop-screen">
            <div class="laptop-content">
              <div class="mockup-image-placeholder">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${t} Laptop Frame">
                  <rect x="15" y="25" width="70" height="50" rx="4" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M22 68L45 45L78 68" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="laptop-body"></div>
        </div>
      `:e==="tablet"?`
        <div class="mockup-tablet">
          <div class="tablet-camera"></div>
          <div class="tablet-content">
            <div class="mockup-image-placeholder">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${t} Tablet Frame">
                <rect x="25" y="15" width="50" height="70" rx="6" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="50" cy="78" r="3" stroke="currentColor" stroke-width="1.5"/>
              </svg>
            </div>
          </div>
        </div>
      `:`
      <div class="mockup-mobile">
        <div class="mobile-notch"></div>
        <div class="mobile-content">
          <div class="mockup-image-placeholder">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="${t} Mobile Frame">
              <rect x="30" y="12" width="40" height="76" rx="6" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="50" cy="80" r="2.5" stroke="currentColor" stroke-width="1.5"/>
            </svg>
          </div>
        </div>
      </div>
    `},openModal(e,t){this.state.currentProject=e,this.state.previousFocusedElement=t,this.dom.modalTitle.textContent=e.title,this.dom.modalStatus.textContent=e.status,this.dom.modalStatus.className=`badge card-status-badge ${e.status.toLowerCase()}`,this.dom.modalOverview.textContent=e.overview,this.dom.modalProblem.textContent=e.problem,this.dom.modalSolution.textContent=e.solution,this.dom.modalArchitecture.textContent=e.architecture,this.dom.modalYear.textContent=e.year,this.dom.modalDuration.textContent=e.duration,this.dom.modalDifficulty.textContent=e.difficulty,this.dom.modalFeatures.innerHTML=e.features.map(a=>`<li>${a}</li>`).join(""),this.dom.modalTech.innerHTML=e.technologies.map(a=>`<span class="tech-chip">${a}</span>`).join(""),this.dom.modalMockup.innerHTML=this.renderDeviceMockup(e.mockup,e.title,e.slug),this.dom.modalThumbnails.innerHTML=e.gallery.map((a,r)=>`
      <button class="gallery-thumb ${r===0?"is-active":""}" data-idx="${r}" aria-label="View screenshot ${r+1}" type="button">
        Thumbnail ${r+1}
      </button>
    `).join("");const i=this.dom.modalThumbnails.querySelectorAll(".gallery-thumb");i.forEach(a=>{a.addEventListener("click",()=>{i.forEach(l=>l.classList.remove("is-active")),a.classList.add("is-active");const r=parseInt(a.getAttribute("data-idx"),10);this.openLightbox(r)})});const o=(a,r)=>{r?(a.href=r,a.style.display="inline-flex"):a.style.display="none"};o(this.dom.modalLinkDemo,e.demo),o(this.dom.modalLinkGithub,e.github),o(this.dom.modalLinkDocs,e.documentation),typeof lucide<"u"&&lucide.createIcons(),this.dom.modal.setAttribute("aria-hidden","false"),this.dom.modal.classList.add("is-open"),document.body.style.overflow="hidden",setTimeout(()=>this.dom.modalCloseBtn.focus(),100)},closeModal(){this.dom.modal&&(this.dom.modal.setAttribute("aria-hidden","true"),this.dom.modal.classList.remove("is-open"),document.body.style.overflow="",this.dom.previousFocusedElement&&this.dom.previousFocusedElement.focus())},trapFocus(e,t){const o=t.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(o.length===0)return;const a=o[0],r=o[o.length-1];e.shiftKey?document.activeElement===a&&(r.focus(),e.preventDefault()):document.activeElement===r&&(a.focus(),e.preventDefault())},openLightbox(e){if(!this.dom.lightbox||!this.state.currentProject)return;this.state.currentImageIndex=e;const t=this.state.currentProject;this.dom.lightboxDots.innerHTML=t.gallery.map((o,a)=>`
      <span class="lightbox-dot ${a===e?"is-active":""}" data-idx="${a}"></span>
    `).join(""),this.dom.lightboxDots.querySelectorAll(".lightbox-dot").forEach(o=>{o.addEventListener("click",()=>{const a=parseInt(o.getAttribute("data-idx"),10);this.openLightbox(a)})}),this.dom.lightboxPlaceholder.textContent=`${t.title} - Screenshot ${e+1}`,this.dom.lightboxCaption.textContent=`Visual display details demonstrating active features of the ${t.title} dashboard.`,this.dom.lightbox.setAttribute("aria-hidden","false"),this.dom.lightbox.classList.add("is-open")},closeLightbox(){if(!this.dom.lightbox)return;this.dom.lightbox.setAttribute("aria-hidden","true"),this.dom.lightbox.classList.remove("is-open");const e=this.dom.modalThumbnails.querySelectorAll(".gallery-thumb");e[this.state.currentImageIndex]&&e[this.state.currentImageIndex].focus()},navigateLightbox(e){if(!this.state.currentProject)return;const t=this.state.currentProject.gallery.length-1;let i=this.state.currentImageIndex+e;i<0&&(i=t),i>t&&(i=0),this.openLightbox(i)}},D=[{id:"frontend",title:"Frontend Engineering",desc:"Architecting low-latency browser rendering systems and premium user interface environments.",icon:"code-2",count:14},{id:"backend",title:"Backend Engineering",desc:"Constructing high-throughput service APIs, WebSockets sync servers, and relational stores.",icon:"server",count:18},{id:"cybersecurity",title:"Cybersecurity Protocol",desc:"Auditing virtualization network parameters, eBPF logs, and cryptographic handshakes.",icon:"shield",count:12},{id:"ai",title:"Artificial Intelligence",desc:"Deploying ONNX execution nodes, PyTorch neural models, and weight cache pipelines.",icon:"cpu",count:8},{id:"cloud",title:"Cloud & DevOps",desc:"Orchestrating container services, edge load-balancers, and static build setups.",icon:"cloud",count:10},{id:"tools",title:"Tools & Software",desc:"Hardening command line shells, local sandbox databases, and profiling interfaces.",icon:"terminal",count:15}],B=[{name:"eBPF Telemetry Tracing",category:"cybersecurity",level:"Expert",icon:"shield-alert",desc:"Probing kernel networking interfaces to trace system calls and intercept logging streams."},{name:"Zero-Trust Handshakes",category:"cybersecurity",level:"Advanced",icon:"key-round",desc:"Securing peer token exchanges using cryptographically encrypted network payloads."},{name:"ONNX Runtime Serialization",category:"ai",level:"Advanced",icon:"binary",desc:"Optimizing neural network weights parsing for hardware-agnostic low-latency edge triggers."},{name:"Distributed Inference Routing",category:"ai",level:"Intermediate",icon:"network",desc:"Balancing transformer model query execution times across modular remote server clusters."},{name:"WebSockets Event Pipelines",category:"backend",level:"Expert",icon:"activity",desc:"Syncing collaborative canvas actions instantly using structured JSON message routing layers."},{name:"Relational Query Optimizers",category:"backend",level:"Advanced",icon:"database",desc:"Refining indexes, joins, and table transactions inside high-concurrency ACID data stores."},{name:"GPU Canvas Kernels",category:"frontend",level:"Advanced",icon:"palette",desc:"Rendering intensive 2D vector elements using hardware-accelerated draw loops."},{name:"Reactive State Managers",category:"frontend",level:"Expert",icon:"blocks",desc:"Coordinating dynamic UI components layout while maintaining zero paint layout shifts."},{name:"Container Mesh Clusters",category:"cloud",level:"Advanced",icon:"boxes",desc:"Deploying micro-service applications inside load-balanced virtual network isolation layers."},{name:"Static Content Pipelines",category:"cloud",level:"Intermediate",icon:"workflow",desc:"Optimizing edge server file delivery and build triggers for worldwide low-latency assets fetch."},{name:"Linux Shell Scripting",category:"tools",level:"Expert",icon:"terminal",desc:"Writing automated firewall monitoring hooks and system diagnostic routines."},{name:"Distributed Version Control",category:"tools",level:"Expert",icon:"git-branch",desc:"Managing code branch releases, tag builds, and parallel merging resolutions."}],H=[{name:"VS Code Editor",category:"IDE Development",icon:"code-2",desc:"Configured sandbox environment matching syntax rules and terminal outputs."},{name:"Git Protocols",category:"Version Control",icon:"git-fork",desc:"Hashing local change branches and resolving parallel patch updates."},{name:"GitHub Platforms",category:"Code Repositories",icon:"github",desc:"Managing open source packages and reviewing automated validation checks."},{name:"Linux Kernel Core",category:"Operating System",icon:"cpu",desc:"Configuring socket limits, process priorities, and firewall netfilters."},{name:"Docker Engine",category:"Virtualization",icon:"container",desc:"Isolating local dependencies inside build environments to ensure build parity."},{name:"Postman Clients",category:"API Testing",icon:"send",desc:"Validating gRPC and REST parameters against structured JSON responses."},{name:"Figma Interfaces",category:"UI Design Prototyping",icon:"figma",desc:"Drafting premium glass layout grids, vector frames, and component states."},{name:"Chrome Browser DevTools",category:"System Profiling",icon:"chrome",desc:"Analyzing visual paint triggers, rendering delays, and CPU runtime profiles."},{name:"Hardware Terminal Console",category:"Shell Operations",icon:"terminal",desc:"Directing server operations via keyboard triggers and text shell buffers."}],q=[{title:"Zero-Knowledge Cryptography",desc:"Investigating zero-knowledge proof structures to validate client transactions without leaking database hashes.",status:"Active Learning",icon:"fingerprint"},{title:"Rust WebAssembly Compilation",desc:"Compiling system-level Rust parsers to native WASM components to run intensive math routines at local speed.",status:"Upcoming Target",icon:"binary"},{title:"eBPF Filtering Extensions",desc:"Writing custom kernel-space network tracing programs to block malicious incoming traffic before it hits routing.",status:"Research Phase",icon:"shield-alert"},{title:"Distributed Memory Caching",desc:"Scaling model weights replication architectures across distributed nodes using memory-backed clusters.",status:"Planned Milestone",icon:"database"},{title:"Browser Painting Performance",desc:"Optimizing DOM layouts and requestAnimationFrame thread priorities to hit constant 120Hz page scroll frame rates.",status:"Scheduled Evaluation",icon:"activity"}],F={state:{activeFilter:"all"},dom:{},init(){this.cacheDOM(),this.bindEvents(),this.render()},cacheDOM(){this.dom.categoriesRoot=s("#skills-categories-root"),this.dom.techRoot=s("#skills-tech-root"),this.dom.toolsRoot=s("#skills-tools-root"),this.dom.roadmapRoot=s("#skills-roadmap-root"),this.dom.filterChips=c(".skills-filter-chips .filter-chip-btn")},bindEvents(){this.dom.filterChips.forEach(t=>{t.addEventListener("click",()=>{this.dom.filterChips.forEach(i=>{i.classList.remove("is-active"),i.setAttribute("aria-selected","false")}),t.classList.add("is-active"),t.setAttribute("aria-selected","true"),this.state.activeFilter=t.getAttribute("data-filter"),this.renderTechnologies()})});let e;window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{this.initRoadmapAnimations()},250)})},render(){this.renderCategories(),this.renderTechnologies(),this.renderTools(),this.renderRoadmap()},renderCategories(){this.dom.categoriesRoot&&(this.dom.categoriesRoot.innerHTML=D.map(e=>`
      <div class="category-card card card-glass">
        <div class="category-card-header">
          <div class="category-icon-wrap">
            <i data-lucide="${e.icon}"></i>
          </div>
          <span class="category-count-badge">${e.count} Technologies</span>
        </div>
        <h4 class="category-title">${e.title}</h4>
        <p class="category-desc">${e.desc}</p>
      </div>
    `).join(""))},renderTechnologies(){if(!this.dom.techRoot)return;const e=B.filter(t=>this.state.activeFilter==="all"?!0:t.category.toLowerCase()===this.state.activeFilter);this.dom.techRoot.innerHTML=e.map(t=>{const i=t.level.toLowerCase();return`
        <div class="tech-card card card-glass">
          <div class="tech-card-header">
            <div class="tech-icon-wrap">
              <i data-lucide="${t.icon}"></i>
            </div>
            <h4 class="tech-name">${t.name}</h4>
          </div>
          <div class="tech-meta">
            <span class="badge-level ${i}">${t.level}</span>
          </div>
          <p class="tech-desc">${t.desc}</p>
        </div>
      `}).join(""),typeof lucide<"u"&&lucide.createIcons(),typeof gsap<"u"&&gsap.fromTo(".tech-card",{y:15,opacity:0},{y:0,opacity:1,duration:.5,stagger:.05,ease:"power2.out",overwrite:"auto"})},renderTools(){this.dom.toolsRoot&&(this.dom.toolsRoot.innerHTML=H.map(e=>`
      <div class="tool-card card card-glass">
        <div class="tool-card-header">
          <div class="tool-icon-wrap">
            <i data-lucide="${e.icon}"></i>
          </div>
          <div>
            <h4 class="tool-name">${e.name}</h4>
            <span class="tool-category">${e.category}</span>
          </div>
        </div>
        <p class="tool-desc">${e.desc}</p>
      </div>
    `).join(""))},renderRoadmap(){if(!this.dom.roadmapRoot)return;let e='<div class="roadmap-progress-bar"></div>';e+=q.map((t,i)=>`
      <div class="roadmap-item ${i===0?"is-active":""}" data-idx="${i}">
        <div class="roadmap-dot-node"></div>
        <div class="roadmap-content-box">
          <div class="roadmap-item-icon">
            <i data-lucide="${t.icon}"></i>
          </div>
          <h4 class="roadmap-item-title">${t.title}</h4>
          <p class="roadmap-item-desc">${t.desc}</p>
          <span class="roadmap-item-status">${t.status}</span>
        </div>
      </div>
    `).join(""),this.dom.roadmapRoot.innerHTML=e,typeof lucide<"u"&&lucide.createIcons(),this.initRoadmapAnimations()},initRoadmapAnimations(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;const e=ScrollTrigger.getById("roadmapProgressDesktop"),t=ScrollTrigger.getById("roadmapProgressMobile");e&&e.kill(),t&&t.kill();const i=c(".roadmap-item"),o=window.innerWidth<=768;o?gsap.fromTo(".roadmap-progress-bar",{height:"0%",width:"2px"},{height:"100%",ease:"none",scrollTrigger:{id:"roadmapProgressMobile",trigger:"#skills-roadmap-root",start:"top 80%",end:"bottom 40%",scrub:!0}}):gsap.fromTo(".roadmap-progress-bar",{width:"0%",height:"2px"},{width:"100%",ease:"none",scrollTrigger:{id:"roadmapProgressDesktop",trigger:"#skills-roadmap-root",start:"top 85%",end:"bottom 55%",scrub:!0}}),i.forEach((a,r)=>{const l=ScrollTrigger.getById(`roadmapItemHighlight-${r}`);l&&l.kill(),ScrollTrigger.create({id:`roadmapItemHighlight-${r}`,trigger:a,start:o?"top 75%":"left 60%",end:o?"bottom 25%":"right 40%",onEnter:()=>a.classList.add("is-active"),onLeave:()=>{},onEnterBack:()=>a.classList.add("is-active"),onLeaveBack:()=>a.classList.remove("is-active")})})}},O=[{year:"2026",role:"Student Initiative / Lead Developer",org:"Cyber Black World",duration:"2026 – Present",status:"Active",desc:"Leading the development of an AI-powered cybersecurity ecosystem including Cyber Black Sword, CBTIP, and Cyber Black Squad.",icon:"shield-alert"},{year:"2026",role:"Cyber Security Intern",org:"Elythra Edufyi Tech Solutions Pvt. Ltd.",duration:"April 2026 – June 2026",status:"Completed",desc:"Executed network security audits, vulnerability scanning, and security protocols assessment.",icon:"key-round"},{year:"2025",role:"Web Development Intern",org:"Micro Information Technology Services (Micro IT)",duration:"June 2025 – July 2025",status:"Completed",desc:"Developed responsive web applications and full-stack client interface solutions.",icon:"code-2"}],z=[{company:"Cyber Black World",role:"Student Initiative / Lead Developer",duration:"2026 – Present",category:"Lead Architecture Role",tags:["Cybersecurity","AI","Python","React","Node.js","SOC Telemetry"],desc:"Architecting the Cyber Black World ecosystem for threat intelligence, automated isolation engines, and AI-assisted defense tools.",actionText:"View Ecosystem"},{company:"Elythra Edufyi Tech Solutions Pvt. Ltd.",role:"Cyber Security Intern",duration:"April 2026 – June 2026",category:"Cybersecurity Internship",tags:["Wireshark","Nmap","Network Defense","Vulnerability Scanning","Linux"],desc:"Conducted network traffic analysis, security audits, vulnerability assessments, and endpoint security hardening.",actionText:"View Internship Details"},{company:"Micro Information Technology Services (Micro IT)",role:"Web Development Intern",duration:"June 2025 – July 2025",category:"Web Development Internship",tags:["HTML5","CSS3","JavaScript","React","REST API","Git"],desc:"Built dynamic front-end interfaces, integrated REST API endpoints, and optimized performance across desktop and mobile browsers.",actionText:"View Web Projects"}],N=[{icon:"shield-check",target:15,title:"Security Projects",desc:"Developed AI cybersecurity tools, threat intelligence dashboards, and SOC playbooks."},{icon:"award",target:10,title:"Certifications",desc:"Earned certifications in Programming, Cybersecurity, Leadership, and Communication."},{icon:"briefcase",target:3,title:"Key Roles",desc:"Cyber Security Intern, Web Dev Intern, and Lead Developer at Cyber Black World."}],j=["Spearheaded Cyber Black World ecosystem design.","Hands-on experience with Wireshark, Nmap, Linux, and network vulnerability tools.","Built full-stack React and Python applications."],W={dom:{},init(){this.cacheDOM(),this.render()},cacheDOM(){this.dom.timelineRoot=s("#career-timeline-root"),this.dom.experienceRoot=s("#experience-cards-root"),this.dom.metricsRoot=s("#experience-metrics-root"),this.dom.highlightsRoot=s("#experience-highlights-root")},render(){this.renderTimeline(),this.renderExperience(),this.renderMetrics(),this.renderHighlights()},renderTimeline(){this.dom.timelineRoot&&(this.dom.timelineRoot.innerHTML=O.map((e,t)=>`
        <div class="career-milestone-item ${t%2===0?"career-milestone-item--left":"career-milestone-item--right"}" data-idx="${t}">
          <div class="career-milestone-dot"></div>
          <div class="career-milestone-card reveal-fade-up">
            <div class="career-milestone-header">
              <div class="career-milestone-meta">
                <span class="career-milestone-year">${e.year}</span>
                <span class="career-milestone-duration">${e.duration}</span>
              </div>
              <div class="career-milestone-icon">
                <i data-lucide="${e.icon}"></i>
              </div>
            </div>
            <div class="career-milestone-body">
              <h4 class="career-milestone-role">${e.role}</h4>
              <span class="career-milestone-org">${e.org}</span>
            </div>
            <p class="career-milestone-desc">${e.desc}</p>
          </div>
        </div>
      `).join(""),typeof lucide<"u"&&lucide.createIcons(),this.initTimelineAnimations())},renderExperience(){this.dom.experienceRoot&&(this.dom.experienceRoot.innerHTML=z.map(e=>`
      <div class="experience-card card card-glass">
        <div class="experience-card-header">
          <div class="experience-card-meta">
            <span class="experience-card-company">${e.company}</span>
            <span class="category-count-badge">${e.category}</span>
          </div>
          <span class="experience-card-role">${e.role}</span>
          <span class="experience-card-duration">${e.duration}</span>
        </div>
        <p class="experience-card-desc">${e.desc}</p>
        <div class="experience-card-tags">
          ${e.tags.map(t=>`<span class="experience-card-tag">${t}</span>`).join("")}
        </div>
        <button class="experience-card-action" type="button">
          <span>${e.actionText}</span>
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderMetrics(){this.dom.metricsRoot&&(this.dom.metricsRoot.innerHTML=N.map(e=>`
      <div class="metric-card card card-glass">
        <div class="metric-header">
          <div class="metric-icon-wrap">
            <i data-lucide="${e.icon}"></i>
          </div>
        </div>
        <span class="metric-number counter" data-target="${e.target}">0</span>
        <h4 class="metric-title">${e.title}</h4>
        <p class="metric-desc">${e.desc}</p>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderHighlights(){this.dom.highlightsRoot&&(this.dom.highlightsRoot.innerHTML=j.map(e=>`
      <div class="highlight-card card card-glass">
        <div class="highlight-card-header">
          <div class="highlight-icon-wrap">
            <i data-lucide="${e.icon}"></i>
          </div>
          <div>
            <h4 class="highlight-title">${e.title}</h4>
            <span class="badge-status completed">${e.status}</span>
          </div>
        </div>
        <p class="highlight-desc">${e.desc}</p>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},initTimelineAnimations(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;gsap.fromTo(".career-timeline-line-progress",{height:"0%"},{height:"100%",ease:"none",scrollTrigger:{trigger:".career-timeline-container",start:"top 30%",end:"bottom 70%",scrub:!0}}),c(".career-milestone-item").forEach(t=>{ScrollTrigger.create({trigger:t,start:"top 55%",end:"bottom 45%",onEnter:()=>t.classList.add("is-active"),onLeave:()=>{},onEnterBack:()=>t.classList.add("is-active"),onLeaveBack:()=>t.classList.remove("is-active")})})}},V=[{type:"vision",title:"AI-Powered Cybersecurity Ecosystem Vision",desc:"Building Cyber Black World — an integrated cybersecurity ecosystem providing intelligent threat protection, automated isolation engines, and privacy-first security tooling.",icon:"eye",accent:"blue"},{type:"mission",title:"Vulnerability Mitigation & SOC Empowerment",desc:"Empowering developers and security analysts with smart telemetry, real-time vulnerability detection, and AI security assistants.",icon:"target",accent:"purple"}],G=[{id:"cbs",name:"Cyber Black Sword",category:"AI Cybersecurity Companion",desc:"Flagship cybersecurity platform combining AI-assisted vulnerability analysis, real-time isolation engines, and threat mitigation.",status:"Active Development",icon:"shield-check",featured:!0},{id:"cbtip",name:"Cyber Black Threat Intelligence Platform (CBTIP)",category:"Threat Intelligence Engine",desc:"Centralized threat intelligence platform collecting and processing real-time telemetry logs, malware IOCs, and network anomaly streams.",status:"Beta Release",icon:"activity",featured:!0},{id:"squad",name:"Cyber Black Squad",category:"Collaborative Security & Defense",desc:"Community and team platform for security researchers, SOC analysts in training, and cyber incident responders.",status:"Active Initiative",icon:"users",featured:!0},{id:"ai-assistant",name:"AI Security Assistant",category:"Neural Intelligence",desc:"Smart NLP-driven assistant aiding SOC analysts in rapid log triage, packet analysis, and security query resolution.",status:"In Progress",icon:"cpu",featured:!1}],K=[{title:"AI Inference Security Nodes",desc:"Integrating local execution logic to evaluate packet safety rules inside edge proxies.",icon:"brain-circuit"},{title:"Zero-Trust Handshakes",desc:"Encrypting communication channels using ephemeral token values compiled per network request.",icon:"key-round"},{title:"eBPF Packet Inspection",desc:"Analyzing socket buffers at kernel level to intercept malicious code sequences on transit.",icon:"shield-alert"},{title:"Relational Query Syncer",desc:"Maintaining consistency across isolated threat intelligence databases using transaction relays.",icon:"database"}],U=[{quarter:"Q1 2026",title:"Cyber Black Sword Engine Hardening",desc:"Refining core memory allocations and AI prompt safety boundaries for threat triage.",status:"Active Sprint"},{quarter:"Q2 2026",title:"CBTIP Beta Dashboard Launch",desc:"Releasing web monitoring dashboard visualizing real-time threat feeds and network alerts.",status:"Under Review"},{quarter:"Q3 2026",title:"Cyber Black Squad Community Launch",desc:"Deploying interactive playbooks and collaborative SOC training sandboxes for students and analysts.",status:"Planned Phase"},{quarter:"Q4 2026",title:"Ecosystem Expansion",desc:"Integrating enterprise API keys, single sign-on (SSO), and cloud proxy extensions.",status:"Planned Phase"}],J={dom:{},init(){this.cacheDOM(),this.bindEvents(),this.render()},cacheDOM(){this.dom.visionRoot=s("#startup-vision-root"),this.dom.productsRoot=s("#startup-products-root"),this.dom.innovationRoot=s("#startup-innovation-root"),this.dom.roadmapRoot=s("#startup-roadmap-root")},bindEvents(){let e;window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{this.initRoadmapAnimations()},250)})},render(){this.renderVisionMission(),this.renderProducts(),this.renderInnovation(),this.renderRoadmap()},renderVisionMission(){this.dom.visionRoot&&(this.dom.visionRoot.innerHTML=V.map(e=>`
        <div class="startup-vision-card card card-glass ${e.type==="mission"?"accent-purple":"accent-blue"}">
          <div class="startup-vision-header">
            <div class="startup-vision-icon">
              <i data-lucide="${e.icon}"></i>
            </div>
            <h4 class="startup-vision-title">${e.title}</h4>
          </div>
          <p class="startup-vision-desc">${e.desc}</p>
        </div>
      `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderProducts(){this.dom.productsRoot&&(this.dom.productsRoot.innerHTML=G.map(e=>`
        <div class="startup-product-card card card-glass ${e.featured?"product-card--featured":""}">
          <div class="startup-product-header">
            <div class="startup-product-meta">
              <div class="startup-product-icon">
                <i data-lucide="${e.icon}"></i>
              </div>
              <div>
                <h4 class="startup-product-name">${e.name}</h4>
                <span class="startup-product-category">${e.category}</span>
              </div>
            </div>
            <span class="badge-status completed">${e.status}</span>
          </div>
          <p class="startup-product-desc">${e.desc}</p>
          <button class="startup-product-action" type="button">
            <span>Learn More</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderInnovation(){this.dom.innovationRoot&&(this.dom.innovationRoot.innerHTML=K.map(e=>`
      <div class="startup-innovation-card card card-glass">
        <div class="startup-innovation-icon">
          <i data-lucide="${e.icon}"></i>
        </div>
        <h4 class="startup-innovation-title">${e.title}</h4>
        <p class="startup-innovation-desc">${e.desc}</p>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderRoadmap(){if(!this.dom.roadmapRoot)return;let e='<div class="startup-roadmap-progress-bar"></div>';e+=U.map((t,i)=>`
      <div class="startup-roadmap-item ${i===0?"is-active":""}" data-idx="${i}">
        <div class="startup-roadmap-dot-node"></div>
        <div class="startup-roadmap-content-box">
          <span class="startup-roadmap-quarter">${t.quarter}</span>
          <h4 class="startup-roadmap-title">${t.title}</h4>
          <p class="startup-roadmap-desc">${t.desc}</p>
          <span class="startup-roadmap-status">${t.status}</span>
        </div>
      </div>
    `).join(""),this.dom.roadmapRoot.innerHTML=e,typeof lucide<"u"&&lucide.createIcons(),this.initRoadmapAnimations()},initRoadmapAnimations(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;const e=ScrollTrigger.getById("startupRoadmapProgressDesktop"),t=ScrollTrigger.getById("startupRoadmapProgressMobile");e&&e.kill(),t&&t.kill();const i=c(".startup-roadmap-item"),o=window.innerWidth<=768;o?gsap.fromTo(".startup-roadmap-progress-bar",{height:"0%",width:"2px"},{height:"100%",ease:"none",scrollTrigger:{id:"startupRoadmapProgressMobile",trigger:"#startup-roadmap-root",start:"top 80%",end:"bottom 40%",scrub:!0}}):gsap.fromTo(".startup-roadmap-progress-bar",{width:"0%",height:"2px"},{width:"100%",ease:"none",scrollTrigger:{id:"startupRoadmapProgressDesktop",trigger:"#startup-roadmap-root",start:"top 85%",end:"bottom 55%",scrub:!0}}),i.forEach((a,r)=>{const l=ScrollTrigger.getById(`startupRoadmapItemHighlight-${r}`);l&&l.kill(),ScrollTrigger.create({id:`startupRoadmapItemHighlight-${r}`,trigger:a,start:o?"top 75%":"left 60%",end:o?"bottom 25%":"right 40%",onEnter:()=>a.classList.add("is-active"),onLeave:()=>{},onEnterBack:()=>a.classList.add("is-active"),onLeaveBack:()=>a.classList.remove("is-active")})})}},h=e=>`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%230d111c'/><circle cx='400' cy='225' r='100' stroke='%23${e}' stroke-width='1.5' stroke-dasharray='4 4' fill='none'/><path d='M250 225 H550 M400 100 V350' stroke='%231e293b' stroke-width='1'/></svg>`,m={category:"Cybersecurity Research",readTime:"8 min read",date:"July 12, 2026",title:"Vulnerability Scanning inside Micro-Kernel Virtual Sandboxes",desc:"An in-depth investigation covering memory page isolation boundaries, virtualized telemetry interrupts, and security protocol mitigations against cache leaks.",cover:h("3b82f6"),actionText:"Read Article Research"},I=[{title:"eBPF Packet Filtering Tracing Models",category:"cybersecurity",readTime:"6 min read",date:"Jun 24, 2026",desc:"Tracing network socket buffers inside virtual container stacks to intercept queries before they reach firewall layers.",thumbnail:h("10b981")},{title:"ONNX Neural Weights Compiler Optimization",category:"ai",readTime:"12 min read",date:"May 18, 2026",desc:"Serializing model inputs and caching layers to run low-latency prediction calculations directly inside web workers.",thumbnail:h("7c3aed")},{title:"WebSockets Collaborative Canvas Synchronization",category:"webdev",readTime:"7 min read",date:"Apr 09, 2026",desc:"Coordinating multi-client layout transformations using structured message routing loops and query managers.",thumbnail:h("f59e0b")},{title:"Container Mesh Network Isolation Handshakes",category:"cloud",readTime:"9 min read",date:"Mar 15, 2026",desc:"Deploying secure inter-service connection routes using short-lived tokens and local cluster proxies.",thumbnail:h("3b82f6")},{title:"Distributed Query Partition Indexing Rules",category:"research",readTime:"11 min read",date:"Feb 02, 2026",desc:"Analyzing table locks and read limits inside high-concurrency relational data warehouses.",thumbnail:h("10b981")},{title:"Automated Host System Telemetry Logging",category:"tutorials",readTime:"5 min read",date:"Jan 12, 2026",desc:"Writing lightweight shell diagnostics pipelines to monitor CPU usage limits and report memory peaks.",thumbnail:h("7c3aed")}],X=[{icon:"book-open",target:24,title:"Articles Published",desc:"Original research notes, design whitepapers, and step-by-step developer tutorials."},{icon:"graduation-cap",target:15,title:"Tutorials Written",desc:"Detailed guides covering kernel routing, proxy deployments, and model serialization."},{icon:"scroll",target:8,title:"Research Notes",desc:"Documented audits covering socket intercepts, cache vulnerabilities, and container limits."},{icon:"clock",target:180,title:"Reading Minutes",desc:"Total duration of drafted materials exploring enterprise virtualization configurations."}],Q={dom:{},init(){this.cacheDOM(),this.bindEvents(),this.render()},cacheDOM(){this.dom.featuredRoot=s("#blog-featured-root"),this.dom.articlesRoot=s("#blog-articles-root"),this.dom.statsRoot=s("#blog-stats-root"),this.dom.filterChips=c(".blog-filter-chips .filter-chip-btn"),this.dom.newsletterForm=s("#newsletter-form-element"),this.dom.newsletterEmail=s("#newsletter-email"),this.dom.newsletterSubmit=s("#newsletter-submit-btn"),this.dom.newsletterFeedback=s("#newsletter-feedback")},bindEvents(){this.dom.filterChips.forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-filter");this.setActiveFilter(e),this.filterArticles(t)})}),this.dom.newsletterForm&&this.dom.newsletterForm.addEventListener("submit",e=>{e.preventDefault(),this.handleNewsletterSubmit()})},render(){this.renderFeatured(),this.renderArticles("all"),this.renderStats()},renderFeatured(){this.dom.featuredRoot&&(this.dom.featuredRoot.innerHTML=`
      <div class="blog-featured-split">
        <div class="blog-featured-image-wrap">
          <img src="${m.cover}" alt="${m.title}" loading="lazy" />
        </div>
        <div class="blog-featured-content">
          <div class="blog-featured-meta">
            <span class="badge-status completed">${m.category}</span>
            <span class="article-duration">${m.readTime}</span>
            <span class="article-duration">&bull;</span>
            <span class="article-duration">${m.date}</span>
          </div>
          <h3 class="blog-featured-title">${m.title}</h3>
          <p class="blog-featured-desc">${m.desc}</p>
          <a href="#blog" class="btn btn-gradient">
            <span>${m.actionText}</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>
    `,typeof lucide<"u"&&lucide.createIcons())},renderArticles(e){if(!this.dom.articlesRoot)return;const t=e==="all"?I:I.filter(i=>i.category===e);if(t.length===0){this.dom.articlesRoot.innerHTML=`
        <div class="empty-state">
          <p class="empty-state-text">No articles found in this category.</p>
        </div>
      `;return}this.dom.articlesRoot.innerHTML=t.map((i,o)=>{let a="article-card--compact";return o===0?a="article-card--hero":(o===1||o===2)&&(a="article-card--medium"),`
        <div class="article-card card card-glass ${a}" data-category="${i.category}">
          <div class="article-thumbnail-wrap">
            <img src="${i.thumbnail}" alt="${i.title}" loading="lazy" />
          </div>
          <div class="article-content">
            <div class="article-meta">
              <span class="badge-status uppercase">${i.category}</span>
              <span class="article-duration">${i.readTime}</span>
            </div>
            <h4 class="article-title">${i.title}</h4>
            <p class="article-desc">${i.desc}</p>
            <button class="article-action" type="button">
              <span>Read Article</span>
              <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      `}).join(""),typeof lucide<"u"&&lucide.createIcons(),typeof gsap<"u"&&gsap.fromTo("#blog-articles-root .article-card",{opacity:0,y:15},{opacity:1,y:0,duration:.5,stagger:.08,ease:"power3.out",overwrite:"auto"})},renderStats(){this.dom.statsRoot&&(this.dom.statsRoot.innerHTML=X.map(e=>`
      <div class="blog-stat-card card card-glass">
        <div class="metric-header">
          <div class="metric-icon-wrap">
            <i data-lucide="${e.icon}"></i>
          </div>
        </div>
        <span class="metric-value counter-value" data-target="${e.target}">0</span>
        <span class="metric-title">${e.title}</span>
        <p class="metric-desc">${e.desc}</p>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},setActiveFilter(e){this.dom.filterChips.forEach(t=>{t.classList.remove("is-active"),t.setAttribute("aria-selected","false")}),e.classList.add("is-active"),e.setAttribute("aria-selected","true")},filterArticles(e){this.renderArticles(e)},handleNewsletterSubmit(){const e=this.dom.newsletterEmail.value.trim(),t=this.dom.newsletterFeedback,i=this.dom.newsletterSubmit;if(t.className="newsletter-feedback-msg",t.textContent="",!e||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){t.classList.add("error"),t.textContent="Please enter a valid email address.";return}t.classList.add("success"),t.textContent="Successfully subscribed to the Engineering Digest!",this.dom.newsletterEmail.value="";const a=i.innerHTML;i.disabled=!0,i.classList.add("disabled"),i.innerHTML='<span>Subscribed</span><i data-lucide="check"></i>',typeof lucide<"u"&&lucide.createIcons(),setTimeout(()=>{i.disabled=!1,i.classList.remove("disabled"),i.innerHTML=a,t.textContent="",typeof lucide<"u"&&lucide.createIcons()},3e3)}},p=e=>`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='550' viewBox='0 0 800 550'><rect width='100%' height='100%' fill='%230d111c'/><circle cx='400' cy='275' r='120' stroke='%23${e}' stroke-width='1.5' stroke-dasharray='4 4' fill='none'/><path d='M300 275 H500 M400 175 V375' stroke='%231e293b' stroke-width='1'/></svg>`,g={title:"Advanced Kernel Architecture & Process Isolation",provider:"Nexus Systems Academy",issueDate:"September 2025",category:"Cybersecurity",desc:"Comprehensive engineering curriculum covering low-level process separation limits, CPU cache isolation boundaries, syscall routing intercepts, and system diagnostics.",cover:p("3b82f6"),credentialId:"CERT-KERNEL-9908X",skillsGained:["Kernel Architecture","Low-level Virtualization","Syscall Intercepts","Cache Security"],verificationUrl:"#certificates"},E=[{title:"Cloud Infrastructure Security & Edge Cryptography",provider:"Apex Cloud Services",issueDate:"July 2025",category:"Cloud",desc:"Implementing zero-trust network handshakes across container node grids and managing cryptographic token lifecycles.",thumbnail:p("10b981"),verificationBadge:!0,credentialId:"CERT-APEX-7762Y",skillsGained:["Zero-Trust","Cryptography","Edge Proxies","Container Mesh"],verificationUrl:"#certificates",featured:!0},{title:"Neural Model Serialization & Compilers",provider:"Open-AI Intelligence Consortium",issueDate:"May 2025",category:"AI",desc:"Optimizing neural weights compilers to target sandbox execution targets and compile lightweight assembly loops.",thumbnail:p("7c3aed"),verificationBadge:!0,credentialId:"CERT-ONNX-5509Z",skillsGained:["ONNX Compilers","Model Weights Optimization","Web Workers Isolation"],verificationUrl:"#certificates",featured:!1},{title:"Socket Telemetry Pipeline Optimization",provider:"Stripe Flow Labs",issueDate:"March 2025",category:"Networking",desc:"Architecting socket traffic monitors using custom transactional buffer loops to inspect incoming queries.",thumbnail:p("f59e0b"),verificationBadge:!1,credentialId:"CERT-SOCKET-3310W",skillsGained:["eBPF Routing","Socket Buffers","Telemetry Pipelines"],verificationUrl:"#certificates",featured:!1},{title:"System Automation & Diagnostics Scripting",provider:"Linear Systems Institute",issueDate:"January 2025",category:"Programming",desc:"Writing automated shell utilities to coordinate local diagnostics pipelines and log CPU parameters.",thumbnail:p("3b82f6"),verificationBadge:!0,credentialId:"CERT-SHELL-1122K",skillsGained:["Shell Automation","Performance Auditing","Syslog Daemons"],verificationUrl:"#certificates",featured:!1},{title:"Dynamic Query Partition Indexing Rules",provider:"Database Research Alliance",issueDate:"November 2024",category:"Programming",desc:"Managing high-concurrency read-write indices across partition arrays without database locks.",thumbnail:p("10b981"),verificationBadge:!0,credentialId:"CERT-DB-9988H",skillsGained:["Relational Partitioning","Index Locking Rules","Transaction Relays"],verificationUrl:"#certificates",featured:!1},{title:"Secure Distributed Compute Protocols",provider:"Framer Labs Academy",issueDate:"September 2024",category:"Networking",desc:"Coordinating decentralized database replication parameters across georedundant compute node meshes.",thumbnail:p("7c3aed"),verificationBadge:!0,credentialId:"CERT-DIST-4402M",skillsGained:["Distributed Compute","Node Consensus","Security Handshakes"],verificationUrl:"#certificates",featured:!1}],Y=[{icon:"award",target:12,title:"Credentials Earned",desc:"Industry-standard qualifications validating kernel architectures, container routing, and AI models."},{icon:"book-open",target:35,title:"Courses Completed",desc:"Structured educational programs completed across low-level optimization and secure cloud routing."},{icon:"clock",target:450,title:"Learning Hours",desc:"Total clock hours spent compiling codebases, debugging virtualization layers, and testing packet routes."},{icon:"milestone",target:8,title:"Technical Milestones",desc:"Successfully deployed system automation programs, proxy controllers, and custom security scripts."}],Z=[{year:"2024",milestone:"Distributed Networking Integration",desc:"Configured multi-region cluster synchronizations and verified secure WebSocket transaction relays.",status:"Completed",icon:"network"},{year:"2025",milestone:"Zero-Trust Edge Proxy Deployment",desc:"Deployed distributed firewall logic analyzing container memory boundaries dynamically.",status:"Completed",icon:"shield-check"},{year:"2025",milestone:"Neural Model Compiler Engineering",desc:"Optimized ONNX compile loops to serialize and load weights inside sandboxed runtime threads.",status:"Completed",icon:"cpu"},{year:"2026",milestone:"Virtual Sandbox Isolation Hardening",desc:"Hardening system virtualization borders against side-channel cache leaks and kernel loops access.",status:"In Progress",icon:"lock"},{year:"2026",milestone:"Autonomous Decentralized Grid Research",desc:"Drafting validation consensus algorithms to authenticate execution logs across remote servers.",status:"Under Review",icon:"binary"}],_={dom:{},init(){this.cacheDOM(),this.bindEvents(),this.render()},cacheDOM(){this.dom.featuredRoot=s("#featured-credential-root"),this.dom.galleryRoot=s("#credentials-grid-root"),this.dom.statsRoot=s("#achievement-stats-root"),this.dom.timelineRoot=s("#learning-timeline-root"),this.dom.filterChips=c(".credentials-filter-chips .filter-chip-btn")},bindEvents(){this.dom.filterChips.forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-filter");this.setActiveFilter(t),this.filterGallery(i)})});let e;window.addEventListener("resize",()=>{clearTimeout(e),e=setTimeout(()=>{this.initTimelineAnimations()},250)})},render(){this.renderFeatured(),this.renderGallery("all"),this.renderStats(),this.renderTimeline()},renderFeatured(){if(!this.dom.featuredRoot)return;const e=g.skillsGained.map(i=>`
      <span class="credential-skill-tag">${i}</span>
    `).join(""),t=`
      <div class="credential-badge-verified">
        <i data-lucide="shield-check"></i>
        <span>Verified Credential</span>
      </div>
    `;this.dom.featuredRoot.innerHTML=`
      <div class="featured-credential-split">
        <div class="featured-credential-image-wrap">
          <img src="${g.cover}" alt="${g.title}" loading="lazy" />
          ${t}
        </div>
        <div class="featured-credential-content">
          <div class="featured-credential-meta">
            <span class="badge-status completed">${g.category}</span>
            <span class="credential-date-text">${g.issueDate}</span>
            ${`<span class="credential-id-text">${g.credentialId}</span>`}
          </div>
          <h3 class="featured-credential-title">${g.title}</h3>
          <span class="credential-provider-text">Issued by ${g.provider}</span>
          <p class="featured-credential-desc">${g.desc}</p>
          <div class="credential-skills-wrap">
            ${e}
          </div>
          <div class="certificates-cta-buttons" style="margin-top: var(--spacing-sm);">
            <a href="${g.verificationUrl}" class="btn btn-gradient">
              <span>Verify Credential</span>
              <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    `,typeof lucide<"u"&&lucide.createIcons()},renderGallery(e){if(!this.dom.galleryRoot)return;const t=e==="all"?E:E.filter(i=>i.category.toLowerCase()===e.toLowerCase());if(t.length===0){this.dom.galleryRoot.innerHTML=`
        <div class="empty-state" style="grid-column: span 6;">
          <p class="empty-state-text">No certificates found in this category.</p>
        </div>
      `;return}this.dom.galleryRoot.innerHTML=t.map(i=>{const o=i.featured?"credential-card--featured":"credential-card--normal",a=i.skillsGained.map(l=>`
        <span class="credential-skill-tag">${l}</span>
      `).join(""),r=i.verificationBadge?`
        <div class="credential-badge-verified">
          <i data-lucide="shield-check"></i>
          <span>Verified</span>
        </div>
      `:"";return`
        <div class="credential-card card card-glass ${o}" data-category="${i.category}">
          <div class="credential-thumbnail-wrap">
            <img src="${i.thumbnail}" alt="${i.title}" loading="lazy" />
            ${r}
          </div>
          <div class="credential-content">
            <div class="credential-meta">
              <div>
                <span class="credential-provider-text">${i.provider}</span>
                <span class="badge-status uppercase" style="display: block; margin-top: 2px;">${i.category}</span>
              </div>
              <div style="text-align: right;">
                <span class="credential-date-text">${i.issueDate}</span>
                ${i.credentialId?`<span class="credential-id-text" style="display: block; margin-top: 2px;">ID: ${i.credentialId}</span>`:""}
              </div>
            </div>
            <h4 class="credential-title-h4">${i.title}</h4>
            <p class="credential-desc-p">${i.desc}</p>
            <div class="credential-skills-wrap">
              ${a}
            </div>
            <a href="${i.verificationUrl}" class="credential-action">
              <span>View Credential</span>
              <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </div>
      `}).join(""),typeof lucide<"u"&&lucide.createIcons(),typeof gsap<"u"&&gsap.fromTo("#credentials-grid-root .credential-card",{opacity:0,y:15},{opacity:1,y:0,duration:.5,stagger:.08,ease:"power3.out",overwrite:"auto"})},renderStats(){this.dom.statsRoot&&(this.dom.statsRoot.innerHTML=Y.map(e=>`
      <div class="blog-stat-card card card-glass">
        <div class="metric-header">
          <div class="metric-icon-wrap">
            <i data-lucide="${e.icon}"></i>
          </div>
        </div>
        <span class="metric-value counter-value" data-target="${e.target}">0</span>
        <span class="metric-title">${e.title}</span>
        <p class="metric-desc">${e.desc}</p>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderTimeline(){if(!this.dom.timelineRoot)return;let e='<div class="learning-timeline-progress-bar"></div>';e+=Z.map((t,i)=>`
      <div class="learning-timeline-item ${i===0?"is-active":""}" data-idx="${i}">
        <div class="learning-timeline-dot-node"></div>
        <div class="learning-timeline-content-box">
          <span class="learning-timeline-year">${t.year}</span>
          <h4 class="learning-timeline-title">${t.milestone}</h4>
          <p class="learning-timeline-desc">${t.desc}</p>
          <span class="learning-timeline-status">${t.status}</span>
        </div>
      </div>
    `).join(""),this.dom.timelineRoot.innerHTML=e,typeof lucide<"u"&&lucide.createIcons(),this.initTimelineAnimations()},setActiveFilter(e){this.dom.filterChips.forEach(t=>{t.classList.remove("is-active"),t.setAttribute("aria-selected","false")}),e.classList.add("is-active"),e.setAttribute("aria-selected","true")},filterGallery(e){this.renderGallery(e)},initTimelineAnimations(){if(typeof gsap>"u"||typeof ScrollTrigger>"u")return;const e=ScrollTrigger.getById("learningTimelineProgressDesktop"),t=ScrollTrigger.getById("learningTimelineProgressMobile");e&&e.kill(),t&&t.kill();const i=c(".learning-timeline-item"),o=window.innerWidth<=768;o?gsap.fromTo(".learning-timeline-progress-bar",{height:"0%",width:"2px"},{height:"100%",ease:"none",scrollTrigger:{id:"learningTimelineProgressMobile",trigger:"#learning-timeline-root",start:"top 80%",end:"bottom 40%",scrub:!0}}):gsap.fromTo(".learning-timeline-progress-bar",{width:"0%",height:"2px"},{width:"100%",ease:"none",scrollTrigger:{id:"learningTimelineProgressDesktop",trigger:"#learning-timeline-root",start:"top 85%",end:"bottom 55%",scrub:!0}}),i.forEach((a,r)=>{const l=ScrollTrigger.getById(`learningTimelineItemHighlight-${r}`);l&&l.kill(),ScrollTrigger.create({id:`learningTimelineItemHighlight-${r}`,trigger:a,start:o?"top 75%":"left 60%",end:o?"bottom 25%":"right 40%",onEnter:()=>a.classList.add("is-active"),onLeave:()=>{},onEnterBack:()=>a.classList.add("is-active"),onLeaveBack:()=>a.classList.remove("is-active")})})}},ee=[{id:"email",title:"Direct Email",value:"koyyadarohith25@gmail.com",href:"mailto:koyyadarohith25@gmail.com",icon:"mail",desc:"Best channel for formal inquiries, security collaborations, and startup discussions."},{id:"github",title:"GitHub Profile",value:"github.com/KoyyadaRohith",href:"https://github.com/KoyyadaRohith",icon:"github",desc:"Explore public repositories, security tools, and open-source contributions."},{id:"linkedin",title:"LinkedIn",value:"linkedin.com/in/koyyada-rohith-72bb82372",href:"https://www.linkedin.com/in/koyyada-rohith-72bb82372/",icon:"linkedin",desc:"Connect for professional networking and career opportunities."},{id:"twitter",title:"X (Twitter)",value:"@Mr_Rohith43",href:"https://x.com/Mr_Rohith43",icon:"twitter",desc:"Real-time updates, cybersecurity insights, and tech discussions."}],te=[{platform:"GitHub",url:"https://github.com/KoyyadaRohith",icon:"github"},{platform:"LinkedIn",url:"https://www.linkedin.com/in/koyyada-rohith-72bb82372/",icon:"linkedin"},{platform:"X (Twitter)",url:"https://x.com/Mr_Rohith43",icon:"twitter"}],T={status:"Available for Internships & Collaborations"},ie=[{q:"What is your primary area of specialization?",a:"I specialize in Cybersecurity, SOC Monitoring, AI-Assisted Threat Intelligence, and Full-Stack Web Development."},{q:"What is Cyber Black World?",a:"Cyber Black World is an AI-powered cybersecurity ecosystem initiative designed to build intelligent security tools like Cyber Black Sword, CBTIP, and Cyber Black Squad."},{q:"Are you open for internship or career opportunities?",a:"Yes! I am actively pursuing SOC analyst training, cybersecurity roles, and software engineering opportunities."}],ae={dom:{},init(){this.cacheDOM(),this.bindEvents(),this.render()},cacheDOM(){this.dom.methodsRoot=s("#contact-methods-root"),this.dom.socialRoot=s("#contact-social-root"),this.dom.availabilityRoot=s("#contact-availability-root"),this.dom.faqRoot=s("#contact-faq-root"),this.dom.form=s("#contact-form-element"),this.dom.nameField=s("#contact-name"),this.dom.emailField=s("#contact-email"),this.dom.subjectField=s("#contact-subject"),this.dom.messageField=s("#contact-message"),this.dom.submitBtn=s("#contact-submit-btn"),this.dom.resetBtn=s("#contact-reset-btn"),this.dom.formFeedback=s("#form-feedback")},bindEvents(){this.dom.form&&(this.dom.form.addEventListener("submit",e=>{e.preventDefault(),this.handleFormSubmit()}),this.dom.form.addEventListener("reset",()=>{this.clearValidationErrors()}))},render(){this.renderMethods(),this.renderAvailability(),this.renderSocials(),this.renderFAQs()},renderMethods(){this.dom.methodsRoot&&(this.dom.methodsRoot.innerHTML=ee.map(e=>`
      <div class="contact-method-card card card-glass">
        <div class="contact-method-icon-wrap">
          <i data-lucide="${e.icon}"></i>
        </div>
        <h4 class="contact-method-title">${e.title}</h4>
        <span class="contact-method-value">${e.placeholder}</span>
        <p class="contact-method-desc">${e.desc}</p>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderAvailability(){if(!this.dom.availabilityRoot)return;const e=T.collaborationTypes.map(t=>`
      <span class="credential-skill-tag">${t}</span>
    `).join("");this.dom.availabilityRoot.innerHTML=`
      <div class="availability-panel card card-glass">
        <div class="availability-header-wrap">
          <div class="availability-pulse-dot"></div>
          <span class="availability-status-label">${T.status}</span>
        </div>
        
        <div class="availability-grid-list">
          <div class="availability-item">
            <span class="availability-item-title">Avg. Response Rate</span>
            <span class="availability-item-value">${T.responseTime}</span>
          </div>
          <div class="availability-item">
            <span class="availability-item-title">Current Timezone</span>
            <span class="availability-item-value">${T.timezone}</span>
          </div>
        </div>

        <div style="margin-top: var(--spacing-sm);">
          <span class="availability-item-title" style="display: block; margin-bottom: var(--spacing-xs); font-weight: 700;">Specialized Focus</span>
          <div class="credential-skills-wrap">
            ${e}
          </div>
        </div>
      </div>
    `,typeof lucide<"u"&&lucide.createIcons()},renderSocials(){this.dom.socialRoot&&(this.dom.socialRoot.innerHTML=te.map(e=>`
      <div class="social-card card card-glass">
        <div class="social-card-header">
          <div class="social-card-icon">
            <i data-lucide="${e.icon}"></i>
          </div>
          <h4 class="social-card-platform">${e.platform}</h4>
        </div>
        <p class="social-card-desc">${e.desc}</p>
        <a href="${e.url}" class="social-card-action">
          <span>Explore Profile</span>
          <i data-lucide="arrow-right"></i>
        </a>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},renderFAQs(){if(!this.dom.faqRoot)return;this.dom.faqRoot.innerHTML=ie.map((t,i)=>`
      <div class="faq-item" data-idx="${i}">
        <button class="faq-header" id="faq-header-${i}" aria-expanded="false" aria-controls="faq-content-${i}" type="button">
          <span class="faq-question">${t.question}</span>
          <div class="faq-toggle-icon">
            <i data-lucide="chevron-down"></i>
          </div>
        </button>
        <div class="faq-content" id="faq-content-${i}" role="region" aria-labelledby="faq-header-${i}">
          <div class="faq-content-inner">
            <p class="faq-answer">${t.answer}</p>
          </div>
        </div>
      </div>
    `).join(""),typeof lucide<"u"&&lucide.createIcons();const e=c(".contact-faq-accordion .faq-item");e.forEach(t=>{const i=t.querySelector(".faq-header"),o=t.querySelector(".faq-content");i.addEventListener("click",()=>{const a=t.classList.contains("is-open");e.forEach(r=>{r!==t&&r.classList.contains("is-open")&&(r.classList.remove("is-open"),r.querySelector(".faq-header").setAttribute("aria-expanded","false"),r.querySelector(".faq-content").style.maxHeight="0")}),a?(t.classList.remove("is-open"),i.setAttribute("aria-expanded","false"),o.style.maxHeight="0"):(t.classList.add("is-open"),i.setAttribute("aria-expanded","true"),o.style.maxHeight=`${o.scrollHeight}px`)}),i.addEventListener("keydown",a=>{if(a.key==="ArrowDown"||a.key==="ArrowUp"){a.preventDefault();const r=Array.from(c(".contact-faq-accordion .faq-header"));let d=r.indexOf(i)+(a.key==="ArrowDown"?1:-1);d>=r.length&&(d=0),d<0&&(d=r.length-1),r[d].focus()}})})},handleFormSubmit(){this.clearValidationErrors();const e=this.dom.nameField.value.trim(),t=this.dom.emailField.value.trim(),i=this.dom.subjectField.value.trim(),o=this.dom.messageField.value.trim();let a=!1;const r=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;if(e||(this.showInputError("name","Name is required."),a=!0),(!t||!r.test(t))&&(this.showInputError("email","A valid email address is required."),a=!0),i||(this.showInputError("subject","Subject is required."),a=!0),o||(this.showInputError("message","Message content is required."),a=!0),a){this.showFormFeedback("error","Please resolve the highlighted validation errors above.");return}this.triggerFormLoadingState()},showInputError(e,t){const i=s(`#error-${e}`),o=s(`#contact-${e}`);i&&(i.textContent=t,i.style.color="#EF4444"),o&&(o.style.borderColor="rgba(239, 68, 68, 0.4)")},clearValidationErrors(){["name","email","subject","message"].forEach(t=>{const i=s(`#error-${t}`),o=s(`#contact-${t}`);i&&(i.textContent=""),o&&(o.style.borderColor="")});const e=this.dom.formFeedback;e&&(e.textContent="",e.className="form-feedback-overlay")},showFormFeedback(e,t){const i=this.dom.formFeedback;i&&(i.className="form-feedback-overlay",i.classList.add(e==="success"?"success":"error"),i.textContent=t,i.style.color=e==="success"?"#10B981":"#EF4444")},triggerFormLoadingState(){const e=this.dom.submitBtn,t=this.dom.resetBtn,i=e.innerHTML;e.disabled=!0,t.disabled=!0,e.innerHTML='<span>Verifying Payload...</span><i class="spinner-loader"></i>',setTimeout(()=>{e.disabled=!1,t.disabled=!1,e.innerHTML=i,this.showFormFeedback("success","Transmission successful! Sandbox request recorded."),this.dom.form&&this.dom.form.reset(),setTimeout(()=>{const o=this.dom.formFeedback;o&&(o.textContent="",o.className="form-feedback-overlay")},3e3)},1500)}},oe=[{name:"Home",url:"#hero"},{name:"Projects",url:"#projects"},{name:"About",url:"#about"},{name:"Skills",url:"#skills"},{name:"Experience",url:"#experience"},{name:"Startup",url:"#startup"},{name:"Blog",url:"#blog"},{name:"Certificates",url:"#certificates"},{name:"Contact",url:"#contact"}],se=[{name:"Resume Profile",url:"#certificates"},{name:"GitHub Registry",url:"#contact"},{name:"API Documentation",url:"#contact"},{name:"Privacy Policy",url:"#contact"},{name:"Terms of Service",url:"#contact"}],re=[{platform:"GitHub",icon:"github",url:"#contact"},{platform:"LinkedIn",icon:"linkedin",url:"#contact"},{platform:"X / Twitter",icon:"twitter",url:"#contact"},{platform:"Instagram",icon:"instagram",url:"#contact"},{platform:"Medium",icon:"book-open",url:"#contact"}],ne={dom:{},init(){this.cacheDOM(),this.bindEvents(),this.render()},cacheDOM(){this.dom.navLinksRoot=s("#footer-nav-links-root"),this.dom.resourcesRoot=s("#footer-resources-links-root"),this.dom.socialRoot=s("#footer-social-links-root"),this.dom.yearSpan=s("#footer-year"),this.dom.themeIndicator=s("#footer-theme-indicator-root"),this.dom.backToTopContainer=s("#back-to-top-container"),this.dom.backToTopBtn=s("#back-to-top-btn"),this.dom.newsletterForm=s("#footer-newsletter-element"),this.dom.newsletterEmail=s("#footer-newsletter-email"),this.dom.newsletterError=s("#newsletter-error")},bindEvents(){this.dom.backToTopBtn&&this.dom.backToTopBtn.addEventListener("click",()=>{this.scrollToTop()}),window.addEventListener("scroll",()=>{this.toggleBackToTopVisibility()}),S.on("theme:change",e=>{this.updateThemeIndicator(e.resolved)}),this.dom.newsletterForm&&this.dom.newsletterForm.addEventListener("submit",e=>{e.preventDefault(),this.handleNewsletterSubmit()})},render(){this.renderYear(),this.renderNavLinks(),this.renderResources(),this.renderSocials(),this.syncInitialThemeIndicator()},renderYear(){this.dom.yearSpan&&(this.dom.yearSpan.textContent=new Date().getFullYear())},renderNavLinks(){this.dom.navLinksRoot&&(this.dom.navLinksRoot.innerHTML=oe.map(e=>`
      <li><a href="${e.url}" class="footer-link">${e.name}</a></li>
    `).join(""))},renderResources(){this.dom.resourcesRoot&&(this.dom.resourcesRoot.innerHTML=se.map(e=>`
      <li><a href="${e.url}" class="footer-link">${e.name}</a></li>
    `).join(""))},renderSocials(){this.dom.socialRoot&&(this.dom.socialRoot.innerHTML=re.map(e=>`
      <a href="${e.url}" class="footer-social-icon-btn" aria-label="${e.platform}">
        <i data-lucide="${e.icon}"></i>
      </a>
    `).join(""),typeof lucide<"u"&&lucide.createIcons())},syncInitialThemeIndicator(){if(!this.dom.themeIndicator)return;const e=x.getResolvedTheme();this.updateThemeIndicator(e)},updateThemeIndicator(e){if(!this.dom.themeIndicator)return;const t=e==="dark"?"moon":"sun";this.dom.themeIndicator.innerHTML=`
      <i data-lucide="${t}"></i>
      <span>Theme: ${e}</span>
    `,typeof lucide<"u"&&lucide.createIcons()},toggleBackToTopVisibility(){if(!this.dom.backToTopContainer)return;const e=s("#home"),t=e?e.offsetHeight:window.innerHeight;window.scrollY>t*.8?this.dom.backToTopContainer.classList.add("is-visible"):this.dom.backToTopContainer.classList.remove("is-visible")},scrollToTop(){y.lenis?y.lenis.scrollTo(0,{duration:1.2,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e))}):window.scrollTo({top:0,behavior:"smooth"})},handleNewsletterSubmit(){if(!this.dom.newsletterEmail||!this.dom.newsletterError)return;const e=this.dom.newsletterEmail.value.trim();if(!e||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)){this.dom.newsletterError.textContent="Please enter a valid email.",this.dom.newsletterEmail.style.borderColor="rgba(239, 68, 68, 0.4)";return}this.dom.newsletterError.textContent="",this.dom.newsletterEmail.style.borderColor="";const i=this.dom.newsletterForm.querySelector(".newsletter-submit-btn"),o=this.dom.newsletterEmail;if(i){i.disabled=!0,o.disabled=!0;const a=i.innerHTML;i.innerHTML='<i class="spinner-loader" style="width: 12px; height: 12px;"></i>',setTimeout(()=>{i.innerHTML='<i data-lucide="check"></i>',typeof lucide<"u"&&lucide.createIcons(),this.dom.newsletterError.style.color="#10B981",this.dom.newsletterError.textContent="Subscription active!",setTimeout(()=>{i.disabled=!1,o.disabled=!1,i.innerHTML=a,typeof lucide<"u"&&lucide.createIcons(),o.value="",this.dom.newsletterError.textContent="",this.dom.newsletterError.style.color=""},2e3)},1200)}}};document.addEventListener("DOMContentLoaded",()=>{x.init(),C.init(),R.init(),P.init(),F.init(),W.init(),J.init(),Q.init(),_.init(),ae.init(),ne.init(),y.init();const e=n.themeToggle;e&&e.addEventListener("click",t=>{t.preventDefault(),x.toggle()}),typeof lucide<"u"&&lucide.createIcons(),setTimeout(()=>{n.addClass(n.body,"loaded")},100)});
