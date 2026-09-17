import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Printer,
  ExternalLink,
  Mail,
  Github,
  CheckCircle2,
  Award,
  Briefcase,
  GraduationCap,
  FileCheck,
  ShieldCheck,
  Globe
} from "lucide-react";
import { useEffect, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { experiences } from "../../data/experience";
import { credentialsData, leadershipData } from "../../data/credentials";
import { projects } from "../../data/projects";
import { OfferLetterModal } from "./OfferLetterModal";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (showOfferLetterModal) {
          setShowOfferLetterModal(false);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, showOfferLetterModal]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#faf8f5] text-[#111114] rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 z-10 border border-[#ddd6c8]"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-label="Anirban Bhowmik Resume"
            >
              {/* Action Bar (Top) */}
              <div className="flex items-center justify-between pb-6 border-b border-[#ddd6c8]">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#55555e] uppercase">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>OFFICIAL VERIFIED CURRICULUM VITAE</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-[#ece8de] hover:bg-[#dfd9cc] text-[#111114] rounded-lg transition-colors cursor-pointer"
                    title="Print or Save as PDF"
                  >
                    <Printer size={14} />
                    <span>Print / PDF</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 text-[#55555e] hover:text-[#111114] hover:bg-[#ece8de] rounded-lg transition-colors cursor-pointer"
                    aria-label="Close resume"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Resume Header */}
              <div className="mt-8 pb-8 border-b border-[#ddd6c8]">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-serif text-[#111114]">
                      ANIRBAN BHOWMIK
                    </h1>
                    <p className="text-base sm:text-lg text-[#3b3b44] mt-1.5 font-medium">
                      AI/ML Systems Builder · Computer Science &amp; Engineering Undergraduate
                    </p>
                    <p className="text-xs font-mono text-[#666675] mt-1">
                      Specializing in Generative AI, Digital Forensics &amp; High-Performance 3D Web Systems
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 text-xs font-mono text-[#555562]">
                    <a
                      href={`mailto:${portfolioData.email}`}
                      className="flex items-center gap-1.5 hover:text-[#111114] underline decoration-[#bbb5a8]"
                    >
                      <Mail size={13} className="text-[#888894]" />
                      <span>{portfolioData.email}</span>
                    </a>
                    <span className="flex items-center gap-1.5">
                      <span>📍</span>
                      <span>Greater Noida, UP, India</span>
                    </span>
                  </div>
                </div>

                {/* PROMINENT GITHUB PROFILE CARD AT THE VERY TOP */}
                <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#14141a] text-[#f4f1eb] border border-[#2b2b36] shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 border border-white/10">
                      <Github size={24} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono tracking-widest text-[#00f0ff] uppercase font-bold">
                          PRIMARY GITHUB CODEBASE &amp; REPOSITORIES
                        </span>
                        <span className="px-2 py-0.5 text-[9px] font-mono bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                          VERIFIED
                        </span>
                      </div>
                      <a
                        href={portfolioData.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm sm:text-base font-bold text-white hover:text-[#00f0ff] font-mono transition-colors inline-flex items-center gap-1.5 mt-0.5"
                      >
                        <span>{portfolioData.githubUrl.replace("https://", "")}</span>
                        <ExternalLink size={14} className="text-[#00f0ff]" />
                      </a>
                      <p className="text-[11px] text-[#a0a0b0] font-sans mt-0.5">
                        Open-source implementations: ZeroTrace (SIH), Fire Fist (Three.js), Pujo-Elo &amp; AI Pipelines
                      </p>
                    </div>
                  </div>

                  <a
                    href={portfolioData.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00f0ff] hover:bg-[#3bf5ff] text-[#09090c] text-xs font-mono font-bold rounded-xl transition-all shadow-md shadow-[#00f0ff]/20 hover:scale-[1.02] shrink-0 cursor-pointer"
                  >
                    <Github size={15} />
                    <span>LAUNCH GITHUB</span>
                  </a>
                </div>
              </div>

              {/* Education Section */}
              <div className="mt-8 pb-8 border-b border-[#ddd6c8]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666675] mb-4">
                  <GraduationCap size={16} />
                  <span>Education &amp; Academic Standing</span>
                </div>
                <div className="bg-[#f0ebe1] p-5 rounded-xl border border-[#dfd7c7]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-lg font-bold text-[#111114]">
                      B.Tech in Computer Science &amp; Engineering (AI/ML)
                    </h3>
                    <span className="text-xs font-mono text-[#666675]">Session: 2025 – 2029 (2nd Year)</span>
                  </div>
                  <p className="text-sm font-medium text-[#44444e] mt-1">
                    IILM University, Greater Noida
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold bg-[#111114] text-[#f4f1eb] rounded-md">
                      CGPA: 8.21 / 10.0
                    </span>
                    <span className="text-xs text-[#55555e]">
                      Specialization in Artificial Intelligence &amp; Machine Learning
                    </span>
                  </div>
                </div>
              </div>

              {/* Technical Experience with Offer Letter Validation */}
              <div className="mt-8 pb-8 border-b border-[#ddd6c8]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666675]">
                    <Briefcase size={16} />
                    <span>Technical Internship Experience</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                    OFFICIALLY APPOINTED
                  </span>
                </div>

                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-[#f0ebe1] p-5 sm:p-6 rounded-xl border border-[#dfd7c7]">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-[#111114]">{exp.role}</h3>
                        </div>
                        <p className="text-sm font-semibold text-[#8a3311] mt-0.5">
                          {exp.company} — {exp.division}
                        </p>
                        <p className="text-xs text-[#555562] font-mono mt-0.5">
                          In association with NSDC (National Skill Development Corporation) &amp; Henry Harvin Global Network
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-mono font-bold text-[#22222a] block">
                          {exp.period}
                        </span>
                        <span className="text-[10px] font-mono text-[#666675] uppercase">
                          4 Weeks · Remote
                        </span>
                      </div>
                    </div>

                    {/* Official Offer Letter Validation Callout */}
                    <div className="mt-4 p-3.5 rounded-xl bg-[#e6dfd1] border border-[#d2c8b7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <FileCheck size={18} className="text-[#b4410a] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-mono font-bold text-[#111114]">
                            Official Appointment Offer Letter Validated
                          </p>
                          <p className="text-[11px] text-[#44444e] font-sans mt-0.5">
                            Formally appointed via Offer Letter issued September 01, 2026 by{" "}
                            <strong>Kounal Gupta</strong>, Founder, YuvaIntern.com (Official Seal &amp; Certified Stamp).
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowOfferLetterModal(true)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111114] hover:bg-black text-[#f4f1eb] text-xs font-mono font-bold rounded-lg transition-all shrink-0 cursor-pointer shadow-sm"
                      >
                        <ShieldCheck size={13} className="text-orange-400" />
                        <span>VIEW / UPLOAD OFFER LETTER</span>
                      </button>
                    </div>

                    {/* Responsibilities */}
                    <ul className="mt-4 space-y-1.5 text-xs text-[#33333d]">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#b4410a] font-bold">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 text-[10px] font-mono bg-[#dfd8ca] text-[#22222a] rounded font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Technical Projects with Live Vercel URLs */}
              <div className="mt-8 pb-8 border-b border-[#ddd6c8]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666675]">
                    <CheckCircle2 size={16} />
                    <span>Featured Engineering Projects &amp; Live Deployments</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-900 bg-blue-100 border border-blue-300 px-2.5 py-0.5 rounded-full font-bold">
                    3 LIVE VERCEL APPS
                  </span>
                </div>

                <div className="space-y-4">
                  {/* ZeroTrace */}
                  <div className="bg-[#f0ebe1] p-5 rounded-xl border border-[#dfd7c7]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-[#111114]">
                          ZeroTrace — Internal SIH Cleared (Sept 2026)
                        </h4>
                        <span className="text-[9px] font-mono font-bold bg-green-200 text-green-900 px-2 py-0.5 rounded">
                          ROUND 4 ADVANCED
                        </span>
                      </div>
                      <a
                        href="https://zerotrace-three.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#0066cc] hover:underline"
                      >
                        <Globe size={12} />
                        <span>zerotrace-three.vercel.app</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                    <p className="text-xs text-[#44444e] mt-2 leading-relaxed">
                      Cryptographic data erasure and digital forensics system built for the Smart India Hackathon 2026 (Cleared Internal SIH Round). NIST SP 800-88 compliant multi-pass bit-overwriting verification with SHA-256 tamper-evident logs. Led device detection module and team technical coordination.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5 text-[10px] font-mono text-[#555562]">
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">Next.js</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">Forensics</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">NIST SP 800-88</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">Tailwind CSS</span>
                    </div>
                  </div>

                  {/* Fire Fist */}
                  <div className="bg-[#f0ebe1] p-5 rounded-xl border border-[#dfd7c7]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-[#111114]">
                          Fire Fist — Portgas D. Ace 3D Cinematic Tribute
                        </h4>
                        <span className="text-[9px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                          COMPLETED
                        </span>
                      </div>
                      <a
                        href="https://fire-fist-ace-one-piece-ak2t-4ihfnag7h.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#0066cc] hover:underline"
                      >
                        <Globe size={12} />
                        <span>fire-fist-ace-one-piece.vercel.app</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                    <p className="text-xs text-[#44444e] mt-2 leading-relaxed">
                      High-performance WebGL / Three.js 3D tribute featuring custom GPU particle physics for flame simulation, positional Web Audio spatial soundscape, interactive camera orbital physics, and cinematic keyframe choreography.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5 text-[10px] font-mono text-[#555562]">
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">Three.js</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">WebGL Shaders</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">Spatial Audio</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">React 19</span>
                    </div>
                  </div>

                  {/* Pujo-Elo */}
                  <div className="bg-[#f0ebe1] p-5 rounded-xl border border-[#dfd7c7]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-base text-[#111114]">
                          Pujo-Elo — Durga Puja Community &amp; Itinerary Hub
                        </h4>
                        <span className="text-[9px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                          COMPLETED
                        </span>
                      </div>
                      <a
                        href="https://pujo-elo.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#0066cc] hover:underline"
                      >
                        <Globe size={12} />
                        <span>pujo-elo.vercel.app</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                    <p className="text-xs text-[#44444e] mt-2 leading-relaxed">
                      Interactive community web platform cataloging 100+ iconic Kolkata Durga Puja pandals with real-time route planner, zone filtering, historical cultural archives, and crowd density guidance.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-2.5 text-[10px] font-mono text-[#555562]">
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">React</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">GeoJSON Maps</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">Tailwind CSS</span>
                      <span className="bg-[#dfd8ca] px-2 py-0.5 rounded">Vite</span>
                    </div>
                  </div>

                  {/* KineticMesh & DECODE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#f0ebe1] p-4 rounded-xl border border-[#dfd7c7]">
                      <h4 className="font-bold text-sm text-[#111114]">KineticMesh — Spatial 3D System</h4>
                      <p className="text-xs text-[#44444e] mt-1 leading-relaxed">
                        Real-time WebGL / Three.js kinetic network simulating computational synaptic dynamics, vector attractors, and GPU-driven line topologies.
                      </p>
                    </div>

                    <div className="bg-[#f0ebe1] p-4 rounded-xl border border-[#dfd7c7]">
                      <h4 className="font-bold text-sm text-[#111114]">DECODE — Student Academic Platform</h4>
                      <p className="text-xs text-[#44444e] mt-1 leading-relaxed">
                        Hierarchical university previous-year question paper hub with branch taxonomy, AI pattern indexing, and student collaboration.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Credentials & Recognition */}
              <div className="mt-8 pb-8 border-b border-[#ddd6c8]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666675] mb-4">
                  <Award size={16} />
                  <span>Verified Professional Certifications</span>
                </div>
                <div className="space-y-3">
                  {credentialsData.map((cred) => (
                    <div key={cred.id} className="bg-[#f0ebe1] p-4 rounded-xl border border-[#dfd7c7]">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#111114]">{cred.title}</h4>
                          {cred.featured && (
                            <span className="text-[9px] font-mono font-bold bg-[#c74634] text-white px-2 py-0.5 rounded">
                              ORACLE CERTIFIED PROFESSIONAL (OCP)
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-[#666675]">{cred.issueDate}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-[#44444e] mt-1 font-mono">
                        <span><strong>Issuer:</strong> {cred.issuer}</span>
                        {cred.credentialId && <span><strong>ID:</strong> {cred.credentialId}</span>}
                        {cred.validUntil && <span><strong>Valid:</strong> {cred.validUntil}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leadership & Academic Volunteering */}
              <div className="mt-8 pb-8 border-b border-[#ddd6c8]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666675] mb-4">
                  <Award size={16} />
                  <span>Academic Leadership &amp; Volunteering</span>
                </div>
                <div className="bg-[#f0ebe1] p-4 rounded-xl border border-[#dfd7c7]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-bold text-sm text-[#111114]">{leadershipData.role}</h4>
                    <span className="text-xs font-mono text-[#666675]">{leadershipData.dates}</span>
                  </div>
                  <p className="text-xs font-medium text-[#751122] mt-0.5">
                    {leadershipData.fullConference}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#555562] mt-2">
                    <span><strong>Host:</strong> {leadershipData.organization}</span>
                    <span>•</span>
                    <span className="text-amber-800 font-bold">{leadershipData.recognition}</span>
                  </div>
                </div>
              </div>

              {/* Core Technical Skills */}
              <div className="mt-8">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666675] mb-4">
                  <Award size={16} />
                  <span>Core Technical Competencies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#f0ebe1] p-3 rounded-lg border border-[#dfd7c7]">
                    <strong className="block font-mono text-[#111114] mb-1">Languages:</strong>
                    <span className="text-[#44444e]">C++, Python, JavaScript, TypeScript, HTML5, CSS3</span>
                  </div>
                  <div className="bg-[#f0ebe1] p-3 rounded-lg border border-[#dfd7c7]">
                    <strong className="block font-mono text-[#111114] mb-1">Core CS &amp; Systems:</strong>
                    <span className="text-[#44444e]">Data Structures &amp; Algorithms (DSA), OOP, Computer Networking, Operating Systems</span>
                  </div>
                  <div className="bg-[#f0ebe1] p-3 rounded-lg border border-[#dfd7c7]">
                    <strong className="block font-mono text-[#111114] mb-1">AI, ML &amp; Forensics:</strong>
                    <span className="text-[#44444e]">Generative AI, OCI GenAI Architecture, LLMs, RAG, Digital Forensics, NIST SP 800-88</span>
                  </div>
                  <div className="bg-[#f0ebe1] p-3 rounded-lg border border-[#dfd7c7]">
                    <strong className="block font-mono text-[#111114] mb-1">Web, 3D &amp; DevOps:</strong>
                    <span className="text-[#44444e]">React 19, Next.js, Three.js, WebGL, Tailwind CSS, Vite, Git, GitHub, Vercel</span>
                  </div>
                </div>
              </div>

              {/* Close CTA */}
              <div className="mt-10 pt-6 border-t border-[#ddd6c8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#777785] text-center sm:text-left">
                  <span className="font-semibold text-[#33333f]">Anirban Bhowmik · Verified Curriculum Vitae</span>
                  <div className="text-[11px] text-[#555565] mt-0.5">
                    &copy; {new Date().getFullYear()} Anirban Bhowmik &middot; All Rights Reserved.
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#111114] text-[#f4f1eb] hover:bg-black rounded-full text-xs font-medium transition-all cursor-pointer"
                >
                  Close CV Preview
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Offer Letter Lightbox Modal */}
      <OfferLetterModal
        isOpen={showOfferLetterModal}
        onClose={() => setShowOfferLetterModal(false)}
      />
    </>
  );
}
