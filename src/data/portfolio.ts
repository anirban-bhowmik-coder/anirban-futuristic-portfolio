export interface PortfolioProfile {
  name: string;
  pronouns: string;
  role: string;
  headline: string;
  subheadline: string;
  brandStatement: string;
  secondaryBrandStatement: string;
  university: string;
  location: string;
  year: string;
  semester: string;
  session: string;
  cgpa: string;
  specialization: string;
  statusIndicator: string;
  availability: string;
  githubUrl: string;
  email: string;
  summary: string;
  currentlyBuilding: {
    name: string;
    status: "BUILDING" | "PROTOTYPING" | "ITERATING";
    description: string;
    focus: string;
  }[];
  currentlyLearning: string[];
}

export const portfolioData: PortfolioProfile = {
  name: "Anirban Bhowmik",
  pronouns: "He/Him",
  role: "Computer Science & Engineering Student (AI/ML)",
  headline: "I don't just learn technology. I build with it.",
  subheadline: "Building, learning and experimenting with AI/ML, software development, cybersecurity and interactive digital experiences.",
  brandStatement: "I don't just learn technology. I build with it.",
  secondaryBrandStatement: "Build. Learn. Innovate. Repeat.",
  university: "IILM University",
  location: "Greater Noida, India",
  year: "2nd Year",
  semester: "3rd Semester",
  session: "2025 – 2029",
  cgpa: "8.21",
  specialization: "Artificial Intelligence & Machine Learning",
  statusIndicator: "STUDENT DEVELOPER · 2ND YEAR CSE (AI/ML) · ACTIVE BUILDER",
  availability: "Active Student · Building & Open for Collaborative Learning",
  githubUrl: "https://github.com/anirban-bhowmik-coder",
  email: "anirbanboy905@gmail.com",
  summary:
    "Computer Science & Engineering undergraduate student specializing in Artificial Intelligence & Machine Learning at IILM University, Greater Noida. Focused on turning algorithmic foundations, kinetic 3D computing, and digital systems security into hands-on interactive projects.",
  currentlyBuilding: [
    {
      name: "DECODE",
      status: "BUILDING",
      description: "Next-gen student academic resource & previous-year questions (PYQ) intelligence platform.",
      focus: "React · TypeScript · Python · AI Study"
    },
    {
      name: "KineticMesh",
      status: "BUILDING",
      description: "Autonomous kinetic visual system exploring dynamic graph mechanics, 3D WebGL meshes, and agentic interactions.",
      focus: "Three.js · WebGL · Spatial Shaders"
    },
    {
      name: "Chopper",
      status: "PROTOTYPING",
      description: "Local-first Android companion agent exploring on-device intelligence and responsive interactions.",
      focus: "Android · Kotlin · On-Device AI"
    }
  ],
  currentlyLearning: [
    "Data Structures & Algorithms (DSA)",
    "Modern C++ (Systems Architecture)",
    "Python (AI/ML Prototyping & PyTorch)",
    "Artificial Intelligence & Machine Learning",
    "Generative AI & LLM Pipelines",
    "Cybersecurity & Threat Modeling",
    "Data Visualization & Mathematical Graph Layouts",
    "Computer Networking & Protocol Internals",
    "Modern Web & Spatial Graphics (Three.js / React 19 / Vite)"
  ]
};
