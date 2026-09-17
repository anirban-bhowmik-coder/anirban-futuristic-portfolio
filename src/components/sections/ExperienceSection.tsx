import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Briefcase, FileCheck, CheckCircle2, Award, ExternalLink, FileText } from "lucide-react";
import { experiences } from "../../data/experience";
import { OfferLetterModal } from "../ui/OfferLetterModal";

export function ExperienceSection() {
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false);

  return (
    <section id="experience" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-[#111114] text-[#f4f1eb]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-3">
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block mb-3">
              03 / TECHNICAL EXPERIENCE
            </span>
            <div className="h-[1px] w-12 bg-[#00f0ff]/40 mb-4" />
            <p className="text-xs font-mono text-[#777782] uppercase leading-relaxed">
              VERIFIED APPOINTMENT · E-GOVERNANCE
            </p>
          </div>

          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.88] mb-6"
            >
              JUNIOR CYBER<br />
              <em className="font-serif italic font-normal text-[#00f0ff]">
                SECURITY ANALYST.
              </em>
            </motion.h2>

            <p className="text-lg sm:text-xl text-[#b5b5be] font-light leading-relaxed max-w-2xl">
              Professional internship track specializing in e-governance infrastructure security audits,
              threat analysis, risk prioritization matrices, and compliance verification.
            </p>
          </div>
        </div>

        {/* Experience Timeline Card */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#16161d] border border-[#2b2b36] rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#242430]">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="px-3 py-1 text-xs font-mono font-bold bg-green-500/15 text-green-400 border border-green-500/30 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span>INTERNSHIP COMPLETED</span>
                    </span>
                    <span className="text-xs font-mono text-[#888894] uppercase tracking-wider">
                      {exp.period} · {exp.division}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-semibold text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="text-sm md:text-base text-[#c0c0c8] mt-1 font-medium">
                    {exp.company} — {exp.location} (Remote)
                  </p>
                  <p className="text-xs font-mono text-[#888898] mt-1">
                    Partner Network: NSDC (National Skill Development Corporation) · Henry Harvin Global Offices
                  </p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowOfferLetterModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-mono font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:scale-[1.02] cursor-pointer"
                    >
                      <FileText size={15} />
                      <span>VIEW OFFICIAL APPOINTMENT LETTER</span>
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <ShieldCheck size={12} />
                    <span>Official Letter Issued Sept 01, 2026 · Verified &amp; Tamper-Proof</span>
                  </span>
                </div>
              </div>

              {/* Completion Note Banner */}
              {exp.completionNote && (
                <div className="my-5 p-4 rounded-xl bg-[#1a1a24] border border-[#2e2e40] text-xs font-mono text-[#b0b0be] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <FileCheck size={16} className="text-[#00f0ff] mt-0.5 shrink-0" />
                    <p className="leading-relaxed">
                      <strong className="text-white font-semibold">Verification Transparency: </strong>
                      {exp.completionNote}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowOfferLetterModal(true)}
                    className="text-xs text-[#00f0ff] hover:underline font-mono shrink-0 cursor-pointer self-start sm:self-center"
                  >
                    Open Document →
                  </button>
                </div>
              )}

              {/* Summary */}
              <p className="mt-6 text-sm md:text-base text-[#b0b0b8] leading-relaxed">
                {exp.summary}
              </p>

              {/* Key Technical Highlights */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {exp.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-start gap-3 bg-[#111116] p-4 rounded-xl border border-[#22222c]"
                  >
                    <CheckCircle2 size={16} className="text-[#00f0ff] mt-0.5 shrink-0" />
                    <span className="text-xs md:text-sm text-[#c8c8d0] leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="mt-8 pt-6 border-t border-[#242430] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-mono bg-[#1f1f2a] border border-[#2e2e3d] text-[#d0d0d8] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setShowOfferLetterModal(true)}
                  className="text-xs font-mono text-[#a0a0b2] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Award size={14} className="text-orange-400" />
                  <span>View Appointment &amp; Certified Stamp</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Offer Letter Lightbox Modal */}
      <OfferLetterModal
        isOpen={showOfferLetterModal}
        onClose={() => setShowOfferLetterModal(false)}
      />
    </section>
  );
}
