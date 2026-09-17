export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: "Cybersecurity" | "AI & Systems" | "Computer Science";
  status: "VERIFIED" | "COURSEWORK COMPLETED" | "ACTIVE PURSUIT";
  credentialNote: string;
  skillsCovered: string[];
}

export const certifications: CertificationItem[] = [
  {
    id: "cert-cyber-analyst",
    title: "Cyber Security Analyst Practice & Assessment",
    issuer: "YuvaIntern / E-Governance Training",
    year: "2026",
    category: "Cybersecurity",
    status: "VERIFIED",
    credentialNote: "Practical internship certification in vulnerability analysis, e-governance threat vectors, and risk assessment protocols.",
    skillsCovered: ["Threat Assessment", "Risk Mitigation", "E-Governance Compliance", "Network Security"]
  }
];
