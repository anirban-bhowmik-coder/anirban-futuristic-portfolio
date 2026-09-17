import { useState } from "react";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Lock,
  FileCheck
} from "lucide-react";
import { credentialsData, leadershipData, type CredentialItem, type LeadershipItem } from "../../data/credentials";
import { CredentialCard } from "../ui/CredentialCard";
import { LeadershipCard } from "../ui/LeadershipCard";
import { CertificateModal } from "../ui/CertificateModal";

export function CredentialsSection() {
  const [selectedItem, setSelectedItem] = useState<CredentialItem | LeadershipItem | null>(null);

  return (
    <section
      id="credentials"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-[#0f0f13] text-[#f4f1eb] relative overflow-hidden"
    >
      {/* Anchor for backwards compatibility with #certifications links */}
      <span id="certifications" className="absolute -top-24" />

      {/* Background Kinetic Ambient Mesh Accents */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#c74634]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block mb-3 font-semibold">
              05 / CREDENTIALS &amp; RECOGNITION
            </span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-[#00f0ff] to-transparent mb-4" />
            <p className="text-xs font-mono text-[#888896] uppercase leading-relaxed">
              VERIFIED ACCREDITATIONS · ZERO FABRICATION
            </p>
          </div>

          <div className="lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[0.9] mb-6"
            >
              PROOF OF<br />
              <em className="font-serif italic font-normal text-[#00f0ff]">
                COMPETENCE.
              </em>
            </motion.h2>

            <p className="text-base sm:text-lg text-[#b0b0be] font-light leading-relaxed max-w-2xl">
              Strict truth-in-engineering standards. Every listed professional certification,
              enterprise simulation, and academic leadership appointment is backed by authentic,
              verifiable credentials and institutional records.
            </p>
          </div>
        </div>

        {/* Credentials Grid: Oracle is Featured (visually larger) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 items-stretch">
          {credentialsData.map((cred, index) => (
            <CredentialCard
              key={cred.id}
              credential={cred}
              onSelect={(item) => setSelectedItem(item)}
              index={index}
            />
          ))}
        </div>

        {/* Separate Leadership & Volunteering Section */}
        <div className="mt-20 pt-16 border-t border-[#22222d]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
            <div>
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase block mb-2 font-semibold">
                ACADEMIC SERVICE &amp; COMMUNITY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Leadership &amp; Volunteering
              </h3>
            </div>
            <span className="text-xs font-mono text-[#888896]">
              Co-Sponsored by IEEE UP Section (India)
            </span>
          </div>

          <LeadershipCard
            item={leadershipData}
            onSelect={(item) => setSelectedItem(item)}
          />
        </div>

        {/* Audit & Authenticity Footer Banner */}
        <div className="mt-16 p-5 sm:p-6 bg-[#14141c] border border-[#262636] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9999a8]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <span className="text-white font-medium block">
                Cryptographically &amp; Institutionally Verified
              </span>
              <span className="text-[11px] text-[#777785]">
                Oracle University (OCP) · HP Foundation · Deloitte Australia · Tata Group · IEEE UP Section
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#00f0ff] font-mono text-[11px]">
            <CheckCircle2 size={13} />
            <span>Click any credential card to inspect certificate documents</span>
          </div>
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      <CertificateModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </section>
  );
}
