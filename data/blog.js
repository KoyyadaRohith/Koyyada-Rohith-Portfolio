/* ==========================================================================
   PORTFOLIO BLOG DATASET (Placeholder Content Only)
   ========================================================================== */

// Reusable SVG placeholder thumbnails encoded as data URIs (matching clean dark mode)
const baseSvg = (color) => `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%230d111c'/><circle cx='400' cy='225' r='100' stroke='%23${color}' stroke-width='1.5' stroke-dasharray='4 4' fill='none'/><path d='M250 225 H550 M400 100 V350' stroke='%231e293b' stroke-width='1'/></svg>`;

export const featuredArticle = {
  category: "Cybersecurity Research",
  readTime: "8 min read",
  date: "July 12, 2026",
  title: "Vulnerability Scanning inside Micro-Kernel Virtual Sandboxes",
  desc: "An in-depth investigation covering memory page isolation boundaries, virtualized telemetry interrupts, and security protocol mitigations against cache leaks.",
  cover: baseSvg("3b82f6"),
  actionText: "Read Article Research"
};

export const latestArticles = [
  {
    title: "eBPF Packet Filtering Tracing Models",
    category: "cybersecurity",
    readTime: "6 min read",
    date: "Jun 24, 2026",
    desc: "Tracing network socket buffers inside virtual container stacks to intercept queries before they reach firewall layers.",
    thumbnail: baseSvg("10b981")
  },
  {
    title: "ONNX Neural Weights Compiler Optimization",
    category: "ai",
    readTime: "12 min read",
    date: "May 18, 2026",
    desc: "Serializing model inputs and caching layers to run low-latency prediction calculations directly inside web workers.",
    thumbnail: baseSvg("7c3aed")
  },
  {
    title: "WebSockets Collaborative Canvas Synchronization",
    category: "webdev",
    readTime: "7 min read",
    date: "Apr 09, 2026",
    desc: "Coordinating multi-client layout transformations using structured message routing loops and query managers.",
    thumbnail: baseSvg("f59e0b")
  },
  {
    title: "Container Mesh Network Isolation Handshakes",
    category: "cloud",
    readTime: "9 min read",
    date: "Mar 15, 2026",
    desc: "Deploying secure inter-service connection routes using short-lived tokens and local cluster proxies.",
    thumbnail: baseSvg("3b82f6")
  },
  {
    title: "Distributed Query Partition Indexing Rules",
    category: "research",
    readTime: "11 min read",
    date: "Feb 02, 2026",
    desc: "Analyzing table locks and read limits inside high-concurrency relational data warehouses.",
    thumbnail: baseSvg("10b981")
  },
  {
    title: "Automated Host System Telemetry Logging",
    category: "tutorials",
    readTime: "5 min read",
    date: "Jan 12, 2026",
    desc: "Writing lightweight shell diagnostics pipelines to monitor CPU usage limits and report memory peaks.",
    thumbnail: baseSvg("7c3aed")
  }
];

export const readingStatistics = [
  {
    icon: "book-open",
    target: 24,
    title: "Articles Published",
    desc: "Original research notes, design whitepapers, and step-by-step developer tutorials."
  },
  {
    icon: "graduation-cap",
    target: 15,
    title: "Tutorials Written",
    desc: "Detailed guides covering kernel routing, proxy deployments, and model serialization."
  },
  {
    icon: "scroll",
    target: 8,
    title: "Research Notes",
    desc: "Documented audits covering socket intercepts, cache vulnerabilities, and container limits."
  },
  {
    icon: "clock",
    target: 180,
    title: "Reading Minutes",
    desc: "Total duration of drafted materials exploring enterprise virtualization configurations."
  }
];

export default {
  featuredArticle,
  latestArticles,
  readingStatistics
};
