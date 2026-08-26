/* ==========================================================================
   PORTFOLIO CERTIFICATES & ACHIEVEMENTS DATASET (Placeholder Content Only)
   ========================================================================== */

const baseSvg = (color) => `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='550' viewBox='0 0 800 550'><rect width='100%' height='100%' fill='%230d111c'/><circle cx='400' cy='275' r='120' stroke='%23${color}' stroke-width='1.5' stroke-dasharray='4 4' fill='none'/><path d='M300 275 H500 M400 175 V375' stroke='%231e293b' stroke-width='1'/></svg>`;

export const featuredCertificate = {
  title: "Advanced Kernel Architecture & Process Isolation",
  provider: "Nexus Systems Academy",
  issueDate: "September 2025",
  category: "Cybersecurity",
  desc: "Comprehensive engineering curriculum covering low-level process separation limits, CPU cache isolation boundaries, syscall routing intercepts, and system diagnostics.",
  cover: baseSvg("3b82f6"),
  verificationBadge: true,
  credentialId: "CERT-KERNEL-9908X",
  skillsGained: ["Kernel Architecture", "Low-level Virtualization", "Syscall Intercepts", "Cache Security"],
  verificationUrl: "#certificates"
};

export const certificateGallery = [
  {
    title: "Cloud Infrastructure Security & Edge Cryptography",
    provider: "Apex Cloud Services",
    issueDate: "July 2025",
    category: "Cloud",
    desc: "Implementing zero-trust network handshakes across container node grids and managing cryptographic token lifecycles.",
    thumbnail: baseSvg("10b981"),
    verificationBadge: true,
    credentialId: "CERT-APEX-7762Y",
    skillsGained: ["Zero-Trust", "Cryptography", "Edge Proxies", "Container Mesh"],
    verificationUrl: "#certificates",
    featured: true
  },
  {
    title: "Neural Model Serialization & Compilers",
    provider: "Open-AI Intelligence Consortium",
    issueDate: "May 2025",
    category: "AI",
    desc: "Optimizing neural weights compilers to target sandbox execution targets and compile lightweight assembly loops.",
    thumbnail: baseSvg("7c3aed"),
    verificationBadge: true,
    credentialId: "CERT-ONNX-5509Z",
    skillsGained: ["ONNX Compilers", "Model Weights Optimization", "Web Workers Isolation"],
    verificationUrl: "#certificates",
    featured: false
  },
  {
    title: "Socket Telemetry Pipeline Optimization",
    provider: "Stripe Flow Labs",
    issueDate: "March 2025",
    category: "Networking",
    desc: "Architecting socket traffic monitors using custom transactional buffer loops to inspect incoming queries.",
    thumbnail: baseSvg("f59e0b"),
    verificationBadge: false,
    credentialId: "CERT-SOCKET-3310W",
    skillsGained: ["eBPF Routing", "Socket Buffers", "Telemetry Pipelines"],
    verificationUrl: "#certificates",
    featured: false
  },
  {
    title: "System Automation & Diagnostics Scripting",
    provider: "Linear Systems Institute",
    issueDate: "January 2025",
    category: "Programming",
    desc: "Writing automated shell utilities to coordinate local diagnostics pipelines and log CPU parameters.",
    thumbnail: baseSvg("3b82f6"),
    verificationBadge: true,
    credentialId: "CERT-SHELL-1122K",
    skillsGained: ["Shell Automation", "Performance Auditing", "Syslog Daemons"],
    verificationUrl: "#certificates",
    featured: false
  },
  {
    title: "Dynamic Query Partition Indexing Rules",
    provider: "Database Research Alliance",
    issueDate: "November 2024",
    category: "Programming",
    desc: "Managing high-concurrency read-write indices across partition arrays without database locks.",
    thumbnail: baseSvg("10b981"),
    verificationBadge: true,
    credentialId: "CERT-DB-9988H",
    skillsGained: ["Relational Partitioning", "Index Locking Rules", "Transaction Relays"],
    verificationUrl: "#certificates",
    featured: false
  },
  {
    title: "Secure Distributed Compute Protocols",
    provider: "Framer Labs Academy",
    issueDate: "September 2024",
    category: "Networking",
    desc: "Coordinating decentralized database replication parameters across georedundant compute node meshes.",
    thumbnail: baseSvg("7c3aed"),
    verificationBadge: true,
    credentialId: "CERT-DIST-4402M",
    skillsGained: ["Distributed Compute", "Node Consensus", "Security Handshakes"],
    verificationUrl: "#certificates",
    featured: false
  }
];

export const achievementStatistics = [
  {
    icon: "award",
    target: 12,
    title: "Credentials Earned",
    desc: "Industry-standard qualifications validating kernel architectures, container routing, and AI models."
  },
  {
    icon: "book-open",
    target: 35,
    title: "Courses Completed",
    desc: "Structured educational programs completed across low-level optimization and secure cloud routing."
  },
  {
    icon: "clock",
    target: 450,
    title: "Learning Hours",
    desc: "Total clock hours spent compiling codebases, debugging virtualization layers, and testing packet routes."
  },
  {
    icon: "milestone",
    target: 8,
    title: "Technical Milestones",
    desc: "Successfully deployed system automation programs, proxy controllers, and custom security scripts."
  }
];

export const learningTimeline = [
  {
    year: "2024",
    milestone: "Distributed Networking Integration",
    desc: "Configured multi-region cluster synchronizations and verified secure WebSocket transaction relays.",
    status: "Completed",
    icon: "network"
  },
  {
    year: "2025",
    milestone: "Zero-Trust Edge Proxy Deployment",
    desc: "Deployed distributed firewall logic analyzing container memory boundaries dynamically.",
    status: "Completed",
    icon: "shield-check"
  },
  {
    year: "2025",
    milestone: "Neural Model Compiler Engineering",
    desc: "Optimized ONNX compile loops to serialize and load weights inside sandboxed runtime threads.",
    status: "Completed",
    icon: "cpu"
  },
  {
    year: "2026",
    milestone: "Virtual Sandbox Isolation Hardening",
    desc: "Hardening system virtualization borders against side-channel cache leaks and kernel loops access.",
    status: "In Progress",
    icon: "lock"
  },
  {
    year: "2026",
    milestone: "Autonomous Decentralized Grid Research",
    desc: "Drafting validation consensus algorithms to authenticate execution logs across remote servers.",
    status: "Under Review",
    icon: "binary"
  }
];

export default {
  featuredCertificate,
  certificateGallery,
  achievementStatistics,
  learningTimeline
};
