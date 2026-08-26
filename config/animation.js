export const animationConfig = {
  lenis: {
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  },
  scrollTrigger: {
    startOffset: "top 85%",
    toggleActions: "play none none reverse",
  },
  blobs: {
    speedMultiplier: 0.5,
    count: 3,
  },
  particles: {
    maxCount: 40,
    minSize: 1,
    maxSize: 3,
    minSpeed: 0.1,
    maxSpeed: 0.5,
  }
};
