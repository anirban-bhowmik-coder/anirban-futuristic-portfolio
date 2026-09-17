import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Award, ExternalLink, FileCheck } from "lucide-react";
import { certifications } from "../../data/certifications";

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-[#111114] text-[#f4f1eb]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-3">
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block mb-3">
              05 / CREDENTIALS & AUDIT
            </span>
            <div className="h-[1px] w-12 bg-[#00f0ff]/40 mb-4" />
            <p className="text-xs font-mono text-[#777782] uppercase leading-relaxed">
              VERIFIED CURRICULUM · ZERO FABRICATION
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
              PROOF OF<br />
              <em className="font-serif italic font-normal text-[#00f0ff]">
                PROGRESS.
              </em>
            </motion.h2>

            <p className="text-lg sm:text-xl text-[#b5b5be] font-light leading-relaxed max-w-2xl">
              Strict truth-in-engineering policy. Only officially verified academic and technical
              milestones are published. No fabricated credentials or unverified badges.
            </p>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#16161e] border border-[#2a2a36] hover:border-[#3d3d50] rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#242430]">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-0.5 rounded-full border border-[#00f0ff]/20">
                    {cert.status}
                  </span>
                  <span className="text-xs font-mono text-[#777785]">{cert.year}</span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mt-5">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-[#f59e0b] mt-1.5 font-medium">
                  {cert.issuer}
                </p>

                <p className="text-xs sm:text-sm text-[#a8a8b2] leading-relaxed mt-4">
                  {cert.credentialNote}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#242430]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#666675] block mb-2">
                  COVERED DOMAINS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsCovered.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-[10px] font-mono bg-[#20202c] text-[#c0c0ca] rounded border border-[#2e2e3e]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Institutional Verification Standard Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#14141c] border border-dashed border-[#2f2f3d] rounded-2xl p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#242430]">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#888898] bg-[#1c1c24] px-2.5 py-0.5 rounded-full border border-[#2c2c38]">
                  VERIFICATION POLICY
                </span>
                <span className="text-xs font-mono text-[#777785]">STRICT PROTOCOL</span>
              </div>

              <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight mt-5">
                Official Credential Registry
              </h3>
              <p className="text-xs font-mono text-[#777785] mt-1.5 font-medium">
                Issuance Verification & Transparency
              </p>

              <p className="text-xs sm:text-sm text-[#9b9ba4] leading-relaxed mt-4">
                Only formally awarded, institution-verified certificates and internship audits are published.
                Self-directed coursework and informal study modules are classified under academic learning trajectories rather than claimed as certified credentials.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#242430] flex items-center justify-between text-xs font-mono text-[#777785]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={13} />
                <span>Zero Fabricated Certifications</span>
              </span>
              <span>100% Verified Audit</span>
            </div>
          </motion.div>
        </div>

        {/* Verification banner */}
        <div className="mt-12 p-5 bg-[#14141b] border border-[#262634] rounded-xl flex items-center justify-between gap-4 text-xs font-mono text-[#888898]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Authenticated against university registry & YuvaIntern digital compliance logs.</span>
          </div>
          <span className="hidden sm:inline-block text-[#666675]">INTEGRITY FIRST</span>
        </div>
      </div>
    </section>
  );
}
