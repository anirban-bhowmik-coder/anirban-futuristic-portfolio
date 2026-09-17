export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  issuerBadge?: string;
  organizationType: "Industry Leader" | "Global Foundation" | "Professional Services" | "Enterprise Group" | "Academic & Industry";
  type: string;
  issueDate: string;
  validUntil?: string;
  credentialId?: string;
  serialNumber?: string;
  featured?: boolean;
  category: "Generative AI" | "AI Strategy" | "Data Analytics" | "Cybersecurity";
  summary: string;
  verificationBadge: string;
  skills: string[];
  themeColor: string;
  accentColor: string;
  certificatePath?: string;
  certificateData: {
    recipient: string;
    certificateTitle: string;
    subtitle?: string;
    bodyText: string;
    presentedDate: string;
    validityNote?: string;
    serialOrId?: string;
    signatoryName?: string;
    signatoryTitle?: string;
    extraLogos?: string[];
  };
}

export interface LeadershipItem {
  id: string;
  role: string;
  event: string;
  fullConference: string;
  organization: string;
  dates: string;
  recognition: string;
  type: string;
  category: string;
  description: string;
  keyContributions: string[];
  signatories: {
    name: string;
    title: string;
    institution: string;
  }[];
  certificatePath?: string;
}

export const credentialsData: CredentialItem[] = [
  {
    id: "oracle-genai-professional",
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University / Oracle",
    issuerBadge: "Oracle Certified Professional (OCP)",
    organizationType: "Industry Leader",
    type: "Professional Certification",
    issueDate: "October 28, 2025",
    validUntil: "October 28, 2027",
    credentialId: "103008434OCI25GAIOCP",
    featured: true,
    category: "Generative AI",
    summary:
      "Enterprise-grade certification demonstrating deep technical competence in OCI Generative AI architecture, LLM fine-tuning, RAG semantic search pipelines, Vector Databases, and generative agent pipelines.",
    verificationBadge: "ORACLE CERTIFIED PROFESSIONAL",
    skills: [
      "Generative AI Architecture",
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Vector Databases & Embeddings",
      "OCI AI Services & SDKs",
      "Fine-Tuning & Prompt Optimization"
    ],
    themeColor: "#c74634", // Oracle Red
    accentColor: "#f59e0b", // Gold badge accent
    certificatePath: "/certificates/oracle-genai.svg",
    certificateData: {
      recipient: "Anirban Bhowmik",
      certificateTitle: "Oracle Certified Professional Certificate of Recognition",
      subtitle: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
      bodyText:
        "This certifies that the above named is recognized by Oracle Corporation as Oracle Certified.",
      presentedDate: "October 28, 2025",
      validityNote: "This eCertificate is valid until October 28, 2027",
      serialOrId: "103008434OCI25GAIOCP",
      signatoryName: "Gary N Miller",
      signatoryTitle: "Customer Success Officer, EVP CSS",
      extraLogos: ["Oracle University", "Oracle Certified Professional"]
    }
  },
  {
    id: "hp-life-strategic-ai",
    title: "Strategic Planning in the AI Age",
    issuer: "HP LIFE / HP Foundation",
    issuerBadge: "HP Foundation Global",
    organizationType: "Global Foundation",
    type: "Certificate of Completion",
    issueDate: "September 13, 2026",
    serialNumber: "fc29e5c9-44f2-4ecc-a174-22161fdf07d0",
    featured: false,
    category: "AI Strategy",
    summary:
      "Strategic evaluation and practical planning frameworks for leveraging artificial intelligence tooling, algorithmic decision modeling, and high-impact organizational planning.",
    verificationBadge: "HP FOUNDATION VERIFIED",
    skills: [
      "AI Strategic Planning",
      "Algorithmic Decision Frameworks",
      "AI Tools in Modern Business",
      "Operational Evaluation"
    ],
    themeColor: "#0096d6", // HP Cyan Blue
    accentColor: "#005a9c",
    certificatePath: "/certificates/hp-life-ai.svg",
    certificateData: {
      recipient: "Anirban Bhowmik",
      certificateTitle: "Certificate of Completion",
      subtitle: "has successfully completed the HP LIFE online course Strategic Planning in the AI Age",
      bodyText:
        "By completing this course, the above-named student has learned how to use strategic planning to make better business decisions in an AI-driven world. They have learned about the core components of a strategic plan, discovered how to evaluate practical planning frameworks, and developed the skills to use AI tools to support strategic thinking.",
      presentedDate: "September 13, 2026",
      serialOrId: "fc29e5c9-44f2-4ecc-a174-22161fdf07d0",
      signatoryName: "Michele Malejki",
      signatoryTitle: "Executive Director, HP Foundation"
    }
  },
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia / Forage",
    issuerBadge: "Deloitte Australia",
    organizationType: "Professional Services",
    type: "Certificate of Completion",
    issueDate: "October 22, 2025",
    featured: false,
    category: "Data Analytics",
    summary:
      "Hands-on simulated client engagement covering forensic data analysis, telemetry exploration, business intelligence dashboarding, and executive briefing synthesis.",
    verificationBadge: "FORAGE & DELOITTE VERIFIED",
    skills: [
      "Data Analytics & Hygiene",
      "Forensic Telemetry Analysis",
      "Dashboard Visualisation",
      "Executive Communication"
    ],
    themeColor: "#86bc25", // Deloitte Green
    accentColor: "#000000",
    certificatePath: "/certificates/deloitte-analytics.svg",
    certificateData: {
      recipient: "Anirban Bhowmik",
      certificateTitle: "Certificate of Completion",
      subtitle: "Deloitte Australia Data Analytics Job Simulation",
      bodyText:
        "Successfully completed practical tasks involving data exploration, dashboard architecture, forensic data insights, and communicating analytical findings to senior client leadership.",
      presentedDate: "October 22, 2025",
      serialOrId: "Deloitte-Forage-DA-2025",
      signatoryName: "Deloitte Australia Practice Leaders",
      signatoryTitle: "Forage Virtual Experience Programs"
    }
  },
  {
    id: "tata-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Tata Group / Forage",
    issuerBadge: "Tata Insights & Quants",
    organizationType: "Enterprise Group",
    type: "Certificate of Completion",
    issueDate: "October 2025",
    featured: false,
    category: "Data Analytics",
    summary:
      "Enterprise data analytics job simulation focused on exploratory data modeling, business metric analysis, visual communication, and strategic executive scenario planning.",
    verificationBadge: "FORAGE & TATA VERIFIED",
    skills: [
      "Exploratory Data Analysis",
      "Visual Data Storytelling",
      "Metric Modeling",
      "Senior Stakeholder Reporting"
    ],
    themeColor: "#1a5b8c", // Tata Blue
    accentColor: "#00a3e0",
    certificatePath: "/certificates/tata-analytics.svg",
    certificateData: {
      recipient: "Anirban Bhowmik",
      certificateTitle: "Certificate of Completion",
      subtitle: "Tata Group Data Visualisation: Empowering Business with Effective Insights",
      bodyText:
        "Completed practical tasks in exploratory data analysis, visual storytelling for C-level executives, scenario-based business metrics, and presentation design.",
      presentedDate: "October 2025",
      serialOrId: "Tata-Forage-EDA-2025",
      signatoryName: "Tata Group Leadership",
      signatoryTitle: "Forage Virtual Experience Programs"
    }
  }
];

export const leadershipData: LeadershipItem = {
  id: "icissesc-2026-volunteer",
  role: "Student Volunteer — ICISESSC-2026",
  event: "ICISESSC-2026 International Conference",
  fullConference:
    "International Conference on Intelligent Systems in Engineering, Communications, Secured Systems and Cybersecurity (ICISESSC-2026)",
  organization: "IILM University, Greater Noida",
  dates: "April 9–10, 2026",
  recognition: "Technically Co-Sponsored by IEEE UP Section (India)",
  type: "Certificate of Appreciation / Conference Leadership",
  category: "Leadership & Academic Service",
  description:
    "Actively contributed as a Student Volunteer in organizing the International Conference on Intelligent Systems in Engineering, Communications, Secured Systems and Cybersecurity (ICISESSC-2026), hosted at IILM University, Greater Noida and technically co-sponsored by the IEEE UP Section (India). Managed technical session operations, secured system checkpoints, speaker facilitation, and delegate registration.",
  keyContributions: [
    "Technical session logistics and presentation system coordination for keynote speakers.",
    "Participant registration, secured lab access checkpoints, and conference cyber assets management.",
    "Liaison with IEEE UP Section technical committee and university faculty chairs.",
    "Live problem-solving and IT operations across 2 days of rigorous research paper presentations."
  ],
  signatories: [
    {
      name: "Dr. Swati Vashisht",
      title: "Organizing Co-Chair, ICISESSC-2026",
      institution: "School of Computer Science & Engineering, IILM University"
    },
    {
      name: "Dr. Deependra Rastogi",
      title: "Organizing Co-Chair, ICISESSC-2026",
      institution: "School of Computer Science & Engineering, IILM University"
    },
    {
      name: "Prof. (Dr.) Alok Aggarwal",
      title: "General Chair, Dean",
      institution: "School of Computer Science & Engineering, IILM University"
    },
    {
      name: "Dr. Munish Sabharwal",
      title: "General Chair, Director",
      institution: "School of Computer Science & Engineering, IILM University"
    }
  ],
  certificatePath: "/certificates/icisesc-2026.svg"
};
