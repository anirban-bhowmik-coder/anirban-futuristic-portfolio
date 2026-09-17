export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  milestone: string;
  year: string;
  description: string;
  impact: string;
  tags: string[];
}

export const achievements: AchievementItem[] = [
  {
    id: "sih-zerotrace",
    title: "Smart India Hackathon (SIH 2026)",
    organization: "Ministry of Education / AICTE / IILM University",
    milestone: "Internal SIH Cleared · Advanced Through Round 4",
    year: "September 2026",
    description:
      "Team ZeroTrace successfully cleared the Internal Smart India Hackathon (SIH) in September 2026 and advanced through Round 4 evaluation with our verifiable data erasure and forensic recovery prevention framework. (Team Project: my key contributions centered on peripheral device detection modules, end-to-end integration guidance, and team coordination).",
    impact:
      "Demonstrated reliable cryptographic and multi-pass bit-overwriting verification for secure digital hardware disposal and anti-forensic data shredding.",
    tags: ["Internal SIH 2026", "Round 4 Advanced", "Digital Forensics", "Device Detection", "Team Leadership", "Cybersecurity"]
  },
  {
    id: "academic-standing",
    title: "Academic Standing — 8.21 CGPA",
    organization: "IILM University, Greater Noida",
    milestone: "2nd Year, 3rd Semester · AI/ML Specialization",
    year: "2025 – 2029 Session",
    description:
      "Consistent academic performance in Computer Science & Engineering with Artificial Intelligence and Machine Learning specialization at IILM University.",
    impact: "Strong foundational coursework across C++, Data Structures & Algorithms, Object-Oriented Programming, and discrete systems.",
    tags: ["Academic Standing", "8.21 CGPA", "AI/ML Specialization", "2nd Year CSE"]
  }
];
