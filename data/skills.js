/* ==========================================================================
   PORTFOLIO SKILLS & TECHNOLOGY DATASET
   ========================================================================== */

export const skillsCategories = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    desc: "Architecting low-latency browser rendering systems and premium user interface environments.",
    icon: "code-2",
    count: 14
  },
  {
    id: "backend",
    title: "Backend Engineering",
    desc: "Constructing high-throughput service APIs, WebSockets sync servers, and relational stores.",
    icon: "server",
    count: 18
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Protocol",
    desc: "Auditing virtualization network parameters, eBPF logs, and cryptographic handshakes.",
    icon: "shield",
    count: 12
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    desc: "Deploying ONNX execution nodes, PyTorch neural models, and weight cache pipelines.",
    icon: "cpu",
    count: 8
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    desc: "Orchestrating container services, edge load-balancers, and static build setups.",
    icon: "cloud",
    count: 10
  },
  {
    id: "tools",
    title: "Tools & Software",
    desc: "Hardening command line shells, local sandbox databases, and profiling interfaces.",
    icon: "terminal",
    count: 15
  }
];

export const technologiesData = [
  // Cybersecurity (Advanced / Expert placeholders)
  {
    name: "eBPF Telemetry Tracing",
    category: "cybersecurity",
    level: "Expert",
    icon: "shield-alert",
    desc: "Probing kernel networking interfaces to trace system calls and intercept logging streams."
  },
  {
    name: "Zero-Trust Handshakes",
    category: "cybersecurity",
    level: "Advanced",
    icon: "key-round",
    desc: "Securing peer token exchanges using cryptographically encrypted network payloads."
  },
  // AI
  {
    name: "ONNX Runtime Serialization",
    category: "ai",
    level: "Advanced",
    icon: "binary",
    desc: "Optimizing neural network weights parsing for hardware-agnostic low-latency edge triggers."
  },
  {
    name: "Distributed Inference Routing",
    category: "ai",
    level: "Intermediate",
    icon: "network",
    desc: "Balancing transformer model query execution times across modular remote server clusters."
  },
  // Backend
  {
    name: "WebSockets Event Pipelines",
    category: "backend",
    level: "Expert",
    icon: "activity",
    desc: "Syncing collaborative canvas actions instantly using structured JSON message routing layers."
  },
  {
    name: "Relational Query Optimizers",
    category: "backend",
    level: "Advanced",
    icon: "database",
    desc: "Refining indexes, joins, and table transactions inside high-concurrency ACID data stores."
  },
  // Frontend
  {
    name: "GPU Canvas Kernels",
    category: "frontend",
    level: "Advanced",
    icon: "palette",
    desc: "Rendering intensive 2D vector elements using hardware-accelerated draw loops."
  },
  {
    name: "Reactive State Managers",
    category: "frontend",
    level: "Expert",
    icon: "blocks",
    desc: "Coordinating dynamic UI components layout while maintaining zero paint layout shifts."
  },
  // Cloud
  {
    name: "Container Mesh Clusters",
    category: "cloud",
    level: "Advanced",
    icon: "boxes",
    desc: "Deploying micro-service applications inside load-balanced virtual network isolation layers."
  },
  {
    name: "Static Content Pipelines",
    category: "cloud",
    level: "Intermediate",
    icon: "workflow",
    desc: "Optimizing edge server file delivery and build triggers for worldwide low-latency assets fetch."
  },
  // Tools
  {
    name: "Linux Shell Scripting",
    category: "tools",
    level: "Expert",
    icon: "terminal",
    desc: "Writing automated firewall monitoring hooks and system diagnostic routines."
  },
  {
    name: "Distributed Version Control",
    category: "tools",
    level: "Expert",
    icon: "git-branch",
    desc: "Managing code branch releases, tag builds, and parallel merging resolutions."
  }
];

export const developmentTools = [
  {
    name: "VS Code Editor",
    category: "IDE Development",
    icon: "code-2",
    desc: "Configured sandbox environment matching syntax rules and terminal outputs."
  },
  {
    name: "Git Protocols",
    category: "Version Control",
    icon: "git-fork",
    desc: "Hashing local change branches and resolving parallel patch updates."
  },
  {
    name: "GitHub Platforms",
    category: "Code Repositories",
    icon: "github",
    desc: "Managing open source packages and reviewing automated validation checks."
  },
  {
    name: "Linux Kernel Core",
    category: "Operating System",
    icon: "cpu",
    desc: "Configuring socket limits, process priorities, and firewall netfilters."
  },
  {
    name: "Docker Engine",
    category: "Virtualization",
    icon: "container",
    desc: "Isolating local dependencies inside build environments to ensure build parity."
  },
  {
    name: "Postman Clients",
    category: "API Testing",
    icon: "send",
    desc: "Validating gRPC and REST parameters against structured JSON responses."
  },
  {
    name: "Figma Interfaces",
    category: "UI Design Prototyping",
    icon: "figma",
    desc: "Drafting premium glass layout grids, vector frames, and component states."
  },
  {
    name: "Chrome Browser DevTools",
    category: "System Profiling",
    icon: "chrome",
    desc: "Analyzing visual paint triggers, rendering delays, and CPU runtime profiles."
  },
  {
    name: "Hardware Terminal Console",
    category: "Shell Operations",
    icon: "terminal",
    desc: "Directing server operations via keyboard triggers and text shell buffers."
  }
];

export const learningRoadmap = [
  {
    title: "Zero-Knowledge Cryptography",
    desc: "Investigating zero-knowledge proof structures to validate client transactions without leaking database hashes.",
    status: "Active Learning",
    icon: "fingerprint"
  },
  {
    title: "Rust WebAssembly Compilation",
    desc: "Compiling system-level Rust parsers to native WASM components to run intensive math routines at local speed.",
    status: "Upcoming Target",
    icon: "binary"
  },
  {
    title: "eBPF Filtering Extensions",
    desc: "Writing custom kernel-space network tracing programs to block malicious incoming traffic before it hits routing.",
    status: "Research Phase",
    icon: "shield-alert"
  },
  {
    title: "Distributed Memory Caching",
    desc: "Scaling model weights replication architectures across distributed nodes using memory-backed clusters.",
    status: "Planned Milestone",
    icon: "database"
  },
  {
    title: "Browser Painting Performance",
    desc: "Optimizing DOM layouts and requestAnimationFrame thread priorities to hit constant 120Hz page scroll frame rates.",
    status: "Scheduled Evaluation",
    icon: "activity"
  }
];

export default {
  skillsCategories,
  technologiesData,
  developmentTools,
  learningRoadmap
};
