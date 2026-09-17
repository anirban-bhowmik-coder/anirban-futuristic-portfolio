export interface OfferLetterDetails {
  dateOfIssue: string;
  position: string;
  startDate: string;
  endDate: string;
  duration: string;
  location: string;
  signatoryName: string;
  signatoryTitle: string;
  affiliations: string[];
  documentPath: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  status: "COMPLETED" | "ACTIVE";
  completionNote: string;
  division: string;
  type: string;
  location: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  evidenceAvailable: boolean;
  offerLetter?: OfferLetterDetails;
}

export const experiences: ExperienceItem[] = [
  {
    id: "yuvaintern-2026",
    role: "Junior Cyber Security Analyst",
    company: "YuvaIntern",
    period: "September 01, 2026 – September 29, 2026",
    status: "COMPLETED",
    completionNote: "Formally appointed via Official Offer Letter (Issue Date: Sept 01, 2026) signed by Kounal Gupta, Founder, YuvaIntern.com. Completed e-governance cybersecurity analysis before expected end period.",
    division: "E-Governance & Digital Services",
    type: "Technical Internship (Remote)",
    location: "Remote",
    summary:
      "Formally engaged as Junior Cyber Security Analyst ensuring the security of digital platforms and services utilized in government operations, conducting vulnerability risk assessments, implementing preventive security measures, and analyzing cybersecurity incident response protocols.",
    highlights: [
      "Secured digital platforms and services used in government operations through structured threat audits.",
      "Conducted rigorous security assessments and evaluated public workflow access-control compliance.",
      "Implemented security measures and incident response procedures aligned with e-governance data protection guidelines.",
      "Evaluated cryptographic data retention protocols, integrity verification, and zero-trace secure information disposal."
    ],
    techStack: [
      "Cybersecurity Analysis",
      "E-Governance Platforms",
      "Security Assessments",
      "Incident Response",
      "Access Control Hardening",
      "Risk Mitigation"
    ],
    evidenceAvailable: true,
    offerLetter: {
      dateOfIssue: "September 01, 2026",
      position: "Junior Cyber Security Analyst - E-Governance & Digital Services",
      startDate: "September 01, 2026",
      endDate: "September 29, 2026",
      duration: "4 weeks",
      location: "Remote",
      signatoryName: "Kounal Gupta",
      signatoryTitle: "Founder, YuvaIntern.com",
      affiliations: [
        "YuvaIntern",
        "NSDC (National Skill Development Corporation · Re-Imagine Future)",
        "Henry Harvin Global Offices (USA, India, UAE)"
      ],
      documentPath: "/certificates/yuvaintern-offer-letter.svg"
    }
  }
];
