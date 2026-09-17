export interface Project {
  id: string;
  name: string;
  type: string;
  status: "BUILDING" | "COMPLETED / TEAM" | "PROTOTYPING" | "PROJECT" | "COMPLETED";
  tagline: string;
  description: string;
  stack: string[];
  role: string;
  featured?: boolean;
  architectureNotes: string;
  highlights: string[];
  systemSpecs: { label: string; value: string }[];
  repoUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "zerotrace",
    name: "ZeroTrace",
    type: "CYBERSECURITY / FORENSICS (SIH 2026)",
    status: "COMPLETED / TEAM",
    tagline: "Smart India Hackathon (SIH 2026 - Aug) · Cleared Internal SIH & Advanced Through Round 4",
    description:
      "A collaborative team cybersecurity project developed for the Smart India Hackathon (SIH 2026, August). Focuses on verifiable cryptographic data erasure, forensic recovery prevention, and secure hardware storage sanitation. (Collaborative team project: my core contributions included device detection subsystems, integration guidance, and team technical leadership).",
    stack: ["Cybersecurity", "Python", "Digital Forensics", "Device Detection", "Linux / POSIX"],
    role: "Team Leadership · Device Detection & Integration Guidance",
    featured: true,
    architectureNotes:
      "Engineered multi-stage pseudo-random bit-overwriting verification routines and low-level storage peripheral detection algorithms, ensuring irrecoverable file and block-level partition sanitization.",
    highlights: [
      "Smart India Hackathon (SIH 2026, August): Successfully cleared the Internal SIH and advanced through Round 4 evaluation.",
      "Engineered peripheral device detection modules for identifying connected external block devices and storage volumes.",
      "Provided end-to-end integration guidance across data sanitization and forensic verification routines.",
      "Coordinated team milestones, technical documentation, and presentation for evaluation panels."
    ],
    systemSpecs: [
      { label: "Hackathon", value: "Smart India Hackathon (SIH 2026)" },
      { label: "Milestone", value: "Internal SIH Cleared · Round 4 Advanced" },
      { label: "Live App", value: "zerotrace-three.vercel.app" },
      { label: "Role", value: "Device Detection & Team Coordination" }
    ],
    repoUrl: "https://github.com/anirban-bhowmik-coder",
    liveUrl: "https://zerotrace-three.vercel.app/"
  },
  {
    id: "kineticmesh",
    name: "KineticMesh",
    type: "AI / SPATIAL INTERACTIVE SYSTEM",
    status: "BUILDING",
    tagline: "Autonomous spatial graph dynamics, kinetic visual computing, and agentic experimentation.",
    description:
      "A futuristic interactive computing project focused on kinetic visual systems, real-time node interconnectedness, dynamic mathematical meshes, and autonomous agentic experimentation in 3D space. (Formerly explored under the research designation KIRO, now unified as KineticMesh).",
    stack: ["Three.js", "React Three Fiber", "WebGL", "Autonomous Agents", "TypeScript"],
    role: "Creator & Graphics Engineer",
    featured: true,
    architectureNotes:
      "Driven by custom GPU buffer geometries, distance-based synaptic line tessellations, and interactive kinetic attractors simulating network cognition.",
    highlights: [
      "Real-time node-to-node proximity evaluation generating neural network synaptic lines dynamically.",
      "Gyro-stabilized orbital data rings with precision numeric indexing and mathematical rotation rates.",
      "Pointer vector projection and momentum dampening for organic human-computer kinetic interaction.",
      "Hardware-adaptive fallback modes scaling geometry and vertex count seamlessly on mobile devices."
    ],
    systemSpecs: [
      { label: "Renderer", value: "WebGL / Three.js R3F" },
      { label: "Performance", value: "Targeted 60 FPS Engine" },
      { label: "Kinematics", value: "Pointer Vector Projection" }
    ],
    repoUrl: "https://github.com/anirban-bhowmik-coder"
  },
  {
    id: "decode",
    name: "DECODE",
    type: "STUDENT LEARNING PLATFORM (IN PROGRESS)",
    status: "BUILDING",
    tagline: "Student academic repository & intelligent previous-year question (PYQ) learning platform.",
    description:
      "A student-centric academic repository engineered around university previous-year question papers (PYQs). Currently under active development, featuring hierarchical Year → Branch → Subject navigation, syllabus notes, question paper solutions, student discussions, and future AI-assisted learning modules.",
    stack: ["React", "TypeScript", "Python", "AI/ML Exploration", "Tailwind CSS"],
    role: "Lead Architecture & Development",
    featured: true,
    architectureNotes:
      "Engineered with a hierarchical relational schema to categorize multi-year university syllabus resources, with instant search indexing and clean modular paper review interfaces.",
    highlights: [
      "Hierarchical taxonomy routing: Year → Department Branch → Semester → Subject Module.",
      "Comprehensive syllabus bank and previous-year question paper (PYQ) archive.",
      "Collaborative student discussion layer for peer solution verification and notes exchange.",
      "In-progress architecture exploring AI pattern recognition to highlight high-frequency exam concepts."
    ],
    systemSpecs: [
      { label: "Status", value: "In Progress / Active Student Build" },
      { label: "Navigation", value: "Year → Branch → Subject" },
      { label: "Resources", value: "PYQs, Syllabus & Solutions" }
    ],
    repoUrl: "https://github.com/anirban-bhowmik-coder"
  },
  {
    id: "fire-fist",
    name: "Fire Fist",
    type: "IMMERSIVE 3D WEB EXPERIENCE",
    status: "COMPLETED",
    tagline: "Cinematic One Piece Portgas D. Ace tribute with 3D particles, audio, and visual storytelling.",
    description:
      "A cinematic interactive tribute web experience inspired by One Piece's Portgas D. Ace. Features dynamic motion graphics, particle flame simulations, spatial audio, and an editorial anime aesthetic.",
    stack: ["React", "Three.js", "Motion", "Audio Web API", "Creative WebGL"],
    role: "Creator & Creative Technologist",
    featured: true,
    architectureNotes:
      "Combines scroll-driven parallax planes, particle flame systems, chromatic aberration, and audio integration for a high-impact narrative experience.",
    highlights: [
      "Dynamic layer separation creating high-depth 2.5D visual parallax on cursor tilt.",
      "Stylized shader effects capturing atmospheric embers, fluid particle trails, and fiery typography.",
      "Fluid choreography executed through fine-tuned cubic bezier physics curves.",
      "Live production deployment on Vercel with open-source GitHub repository."
    ],
    systemSpecs: [
      { label: "Live App", value: "fire-fist-ace-one-piece-ak2t-4ihfnag7h.vercel.app" },
      { label: "Aesthetic", value: "Cinematic Anime / Manga" },
      { label: "Motion", value: "Three.js Particles + Motion" }
    ],
    repoUrl: "https://github.com/anirban-bhowmik-coder/Fire-FistAce-one-piece",
    liveUrl: "https://fire-fist-ace-one-piece-ak2t-4ihfnag7h.vercel.app/"
  },
  {
    id: "chopper",
    name: "Chopper",
    type: "ANDROID AI COMPANION",
    status: "PROTOTYPING",
    tagline: "Experimental privacy-first AI companion for Android with local-first on-device interaction.",
    description:
      "An experimental privacy-first AI companion concept for Android, designed around local-first interaction, quantized mobile model inference, and an expressive, playful anime-inspired persona.",
    stack: ["Android", "Kotlin", "On-Device AI", "Privacy-First", "Jetpack Compose"],
    role: "Mobile Systems & AI Prototyper",
    featured: false,
    architectureNotes:
      "Architected with offline-first memory storage, ensuring zero telemetry or user private conversations are transmitted off the device.",
    highlights: [
      "Designed for quantized small language model execution strictly on client mobile hardware.",
      "Contextual awareness module utilizing on-device sensor cues and calendar events.",
      "Custom responsive companion UI with animated mood indicators and interactive haptic responses.",
      "Zero-cloud dependency privacy architecture preserving full user ownership of logs and queries."
    ],
    systemSpecs: [
      { label: "Platform", value: "Android (Kotlin / Compose)" },
      { label: "Privacy", value: "100% Local Inference" },
      { label: "Status", value: "Prototype Phase" }
    ],
    repoUrl: "https://github.com/anirban-bhowmik-coder"
  },
  {
    id: "pujo-elo",
    name: "Pujo-Elo",
    type: "COMMUNITY WEB APPLICATION",
    status: "COMPLETED",
    tagline: "Durga Puja cultural guide and interactive community navigation experience.",
    description:
      "A dedicated web application providing live pandal mapping, crowd insights, and cultural celebration guides for Kolkata Durga Puja.",
    stack: ["React", "Web", "Interactive Maps", "UI/UX", "Tailwind CSS"],
    role: "Full-Stack Developer",
    featured: true,
    architectureNotes:
      "Structured to handle peak concurrent browsing with pre-rendered static content, offline cached routes, and location-indexed directory items.",
    highlights: [
      "Curated cultural directory detailing crowd density indicators, historical pandal themes, and route maps.",
      "Lightweight responsive interface optimized for mobile networks during high-density celebrations.",
      "Intuitive bookmarks and itinerary generation for friends and family groups.",
      "Deployed and accessible live on Vercel with responsive mobile web support."
    ],
    systemSpecs: [
      { label: "Live App", value: "pujo-elo.vercel.app" },
      { label: "Stack", value: "React + Modern CSS" },
      { label: "Focus", value: "Community Navigation & Speed" }
    ],
    repoUrl: "https://github.com/anirban-bhowmik-coder",
    liveUrl: "https://pujo-elo.vercel.app/"
  },
  {
    id: "egov-risk-assessment",
    name: "E-Governance Cybersecurity Risk Assessment",
    type: "INTERNSHIP WORK",
    status: "COMPLETED",
    tagline: "Technical cybersecurity analysis, risk mitigation matrices, and e-governance security audit.",
    description:
      "Technical cybersecurity audit and assessment completed during the YuvaIntern tenure. Covered public digital services vulnerability analysis, threat modeling, and compliance documentation.",
    stack: ["Cybersecurity", "Risk Assessment", "E-Governance", "Vulnerability Audit", "Documentation"],
    role: "Junior Cyber Security Analyst Intern",
    featured: false,
    architectureNotes:
      "Structured around international security evaluation frameworks to assess authentication resilience, session vulnerability, and citizen data confidentiality.",
    highlights: [
      "Documented potential breach surfaces across public administrative citizen portal architectures.",
      "Produced structured threat mitigation matrix scoring risk severity and remediation priority.",
      "Delivered comprehensive audit reports for internal security reviews."
    ],
    systemSpecs: [
      { label: "Context", value: "YuvaIntern 2026 Internship" },
      { label: "Domain", value: "E-Governance Threat Modeling" },
      { label: "Status", value: "Completed Internship Record" }
    ]
  }
];
