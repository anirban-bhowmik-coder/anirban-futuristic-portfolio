export type SkillCategory = "languages" | "core" | "frontend" | "tools";

export type ProficiencyLevel = "Learning" | "Working Knowledge" | "Project Experience";

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  categoryLabel: string;
  proficiency: ProficiencyLevel;
  summary: string;
  connections: string[]; // IDs of connected skills in the constellation
  highlight?: boolean;
  x: number; // Normalized -100 to 100
  y: number; // Normalized -100 to 100
}

export const skillCategories: { id: SkillCategory; label: string; color: string }[] = [
  { id: "languages", label: "Languages", color: "#00f0ff" },
  { id: "core", label: "Core CS & AI", color: "#a855f7" },
  { id: "frontend", label: "Frontend & Graphics", color: "#10b981" },
  { id: "tools", label: "Tools & Ecosystem", color: "#f59e0b" }
];

export const skillsData: SkillNode[] = [
  // --- Languages ---
  {
    id: "cpp",
    name: "C++",
    category: "languages",
    categoryLabel: "Languages",
    proficiency: "Working Knowledge",
    summary: "Systems programming, pointer mechanics, STL containers, OOP patterns, and algorithmic optimization.",
    connections: ["dsa", "oop", "problem_solving"],
    highlight: true,
    x: -42,
    y: -25
  },
  {
    id: "python",
    name: "Python",
    category: "languages",
    categoryLabel: "Languages",
    proficiency: "Project Experience",
    summary: "AI/ML prototyping, neural networks, data processing, backend automation, and forensic scripts.",
    connections: ["aiml", "genai", "cybersecurity", "cpp"],
    highlight: true,
    x: -8,
    y: -38
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "languages",
    categoryLabel: "Languages",
    proficiency: "Project Experience",
    summary: "Modern ESNext, asynchronous concurrency, DOM mechanics, and dynamic web applications.",
    connections: ["typescript", "react", "html", "css", "nodejs"],
    highlight: true,
    x: 28,
    y: -28
  },
  {
    id: "html",
    name: "HTML",
    category: "languages",
    categoryLabel: "Languages",
    proficiency: "Project Experience",
    summary: "Semantic markup, accessibility (a11y), responsive structures, and modern web document standards.",
    connections: ["css", "javascript", "react"],
    x: 58,
    y: -32
  },
  {
    id: "css",
    name: "CSS",
    category: "languages",
    categoryLabel: "Languages",
    proficiency: "Project Experience",
    summary: "Modern flexbox, grid, CSS custom properties, keyframe animations, and responsive fluid layouts.",
    connections: ["html", "tailwind", "javascript"],
    x: 74,
    y: -14
  },

  // --- Core CS & AI ---
  {
    id: "dsa",
    name: "Data Structures & Algorithms",
    category: "core",
    categoryLabel: "Core CS",
    proficiency: "Working Knowledge",
    summary: "Arrays, linked lists, trees, graphs, sorting, recursion, searching, and algorithmic time/space analysis.",
    connections: ["cpp", "oop", "problem_solving"],
    highlight: true,
    x: -62,
    y: 8
  },
  {
    id: "oop",
    name: "OOP",
    category: "core",
    categoryLabel: "Core CS",
    proficiency: "Working Knowledge",
    summary: "Encapsulation, inheritance, polymorphism, abstraction, and clean modular software architecture.",
    connections: ["cpp", "dsa", "problem_solving"],
    x: -38,
    y: 22
  },
  {
    id: "problem_solving",
    name: "Problem Solving",
    category: "core",
    categoryLabel: "Core CS",
    proficiency: "Working Knowledge",
    summary: "Deconstructing computational challenges, edge-case analysis, and structured algorithmic reasoning.",
    connections: ["dsa", "cpp", "python"],
    highlight: true,
    x: -16,
    y: 5
  },
  {
    id: "aiml",
    name: "AI/ML",
    category: "core",
    categoryLabel: "Core AI",
    proficiency: "Learning",
    summary: "Supervised & unsupervised learning concepts, neural architectures, feature extraction, and model evaluation.",
    connections: ["python", "genai", "problem_solving"],
    highlight: true,
    x: 12,
    y: -48
  },
  {
    id: "genai",
    name: "Generative AI",
    category: "core",
    categoryLabel: "Core AI",
    proficiency: "Working Knowledge",
    summary: "Large language models, embeddings, RAG pipelines, prompt engineering, and agentic workflows.",
    connections: ["aiml", "python"],
    highlight: true,
    x: 42,
    y: -50
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    category: "core",
    categoryLabel: "Core Security",
    proficiency: "Project Experience",
    summary: "Threat modeling, data sanitization standards (NIST 800-88), vulnerability audits, and network defense.",
    connections: ["python", "problem_solving", "git"],
    highlight: true,
    x: -18,
    y: 42
  },

  // --- Frontend ---
  {
    id: "react",
    name: "React",
    category: "frontend",
    categoryLabel: "Frontend",
    proficiency: "Project Experience",
    summary: "Component lifecycles, functional hooks, reactive state flows, virtual DOM reconciliation, and modern SPAs.",
    connections: ["javascript", "typescript", "tailwind", "vite"],
    highlight: true,
    x: 36,
    y: 10
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    categoryLabel: "Frontend",
    proficiency: "Working Knowledge",
    summary: "Type interfaces, generics, strict null checking, static compilation, and robust code refactoring.",
    connections: ["javascript", "react", "nodejs"],
    highlight: true,
    x: 18,
    y: -10
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Frontend",
    proficiency: "Project Experience",
    summary: "Utility-first CSS architecture, responsive design tokens, dark/light variants, and modern micro-interactions.",
    connections: ["css", "react", "html"],
    x: 64,
    y: 18
  },

  // --- Tools & Ecosystem ---
  {
    id: "git",
    name: "Git",
    category: "tools",
    categoryLabel: "Tools",
    proficiency: "Project Experience",
    summary: "Branching strategies, commit provenance, merge conflict resolution, pull requests, and version history.",
    connections: ["github", "cybersecurity"],
    highlight: true,
    x: 5,
    y: 62
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    categoryLabel: "Tools",
    proficiency: "Project Experience",
    summary: "Remote repository synchronization, code reviews, issue tracking, and collaborative open-source workflows.",
    connections: ["git", "pnpm", "vite"],
    highlight: true,
    x: 35,
    y: 65
  },
  {
    id: "vite",
    name: "Vite",
    category: "tools",
    categoryLabel: "Tools",
    proficiency: "Project Experience",
    summary: "Next-gen lightning dev server, Rollup bundling, ESM HMR pipelines, and static build generation.",
    connections: ["react", "typescript", "pnpm"],
    x: 55,
    y: 42
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "tools",
    categoryLabel: "Tools",
    proficiency: "Working Knowledge",
    summary: "Server-side JavaScript runtime, event loops, npm modules, script execution, and filesystem operations.",
    connections: ["javascript", "typescript", "pnpm"],
    x: -5,
    y: 20
  },
  {
    id: "pnpm",
    name: "pnpm",
    category: "tools",
    categoryLabel: "Tools",
    proficiency: "Working Knowledge",
    summary: "Fast, disk space-efficient package manager with content-addressable storage and monorepo workspace support.",
    connections: ["nodejs", "vite", "github"],
    x: 22,
    y: 45
  }
];
