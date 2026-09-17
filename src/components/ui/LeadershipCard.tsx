import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Award,
  Users,
  Eye,
  CheckCircle2,
  FileText,
  Sparkles
} from "lucide-react";
import type { LeadershipItem } from "../../data/credentials";

interface LeadershipCardProps {
  item: LeadershipItem;
  onSelect: (item: LeadershipItem) => void;
}

export function LeadershipCard({ item, onSelect }: LeadershipCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;

    setRotX(rX);
    setRotY(rY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: 0.12 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative perspective-1000 mt-12"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(item)}
        style={{
          transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${
            isHovered ? "8px" : "0px"
          })`,
          transition: "transform 0.15s ease-out"
        }}
        className="relative rounded-2xl p-6 sm:p-10 bg-gradient-to-br from-[#1c141a] via-[#14141e] to-[#121218] border-2 border-[#8c1d2e]/40 hover:border-amber-400/80 shadow-2xl cursor-pointer overflow-hidden transition-colors"
      >
        {/* Specular glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`
          }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#8c1d2e]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left Column: Role & Conference Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  LEADERSHIP &amp; VOLUNTEERING
                </span>
                <span className="text-[11px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/20">
                  {item.recognition}
                </span>
              </div>

              {/* Exact Role Designation */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mt-2">
                {item.role}
              </h3>

              {/* Full Conference Name */}
              <p className="text-sm sm:text-base text-[#fef08a] font-medium mt-2 leading-snug">
                {item.fullConference}
              </p>

              {/* Institution and Dates */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#9e9ea8] mt-4 pt-4 border-t border-[#262634]">
                <div className="flex items-center gap-1.5 text-white">
                  <MapPin size={14} className="text-emerald-400 shrink-0" />
                  <span>{item.organization}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#00f0ff]">
                  <Calendar size={14} className="shrink-0" />
                  <span>{item.dates}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#b8b8c4] leading-relaxed mt-4 font-light">
                {item.description}
              </p>
            </div>

            {/* Action prompt */}
            <div className="mt-8 flex items-center justify-between text-xs font-mono pt-4 border-t border-[#262634]">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={14} />
                <span>Certificate of Appreciation Issued &amp; Verified</span>
              </span>

              <div className="flex items-center gap-1.5 text-amber-300 group-hover:translate-x-1 transition-transform">
                <Eye size={14} />
                <span className="underline underline-offset-4">Inspect Certificate Document</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Operational Contributions & Signatories */}
          <div className="lg:col-span-5 bg-[#171722]/80 border border-[#2b2b3d] rounded-xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#888898] uppercase block mb-3 font-semibold">
                KEY RESPONSIBILITIES &amp; IMPACT
              </span>
              <ul className="space-y-2 text-xs text-[#c0c0cc]">
                {item.keyContributions.map((contrib, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#00f0ff] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Signatory Endorsements */}
            <div className="mt-6 pt-4 border-t border-[#242436]">
              <span className="text-[10px] font-mono tracking-widest text-[#888898] uppercase block mb-2">
                OFFICIAL FACULTY CHAIRS
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#9999a4]">
                <div>
                  <span className="text-white block font-medium">Dr. Swati Vashisht</span>
                  <span className="text-[10px] text-[#777785]">Organizing Co-Chair</span>
                </div>
                <div>
                  <span className="text-white block font-medium">Dr. Deependra Rastogi</span>
                  <span className="text-[10px] text-[#777785]">Organizing Co-Chair</span>
                </div>
                <div className="mt-1">
                  <span className="text-white block font-medium">Prof. (Dr.) Alok Aggarwal</span>
                  <span className="text-[10px] text-[#777785]">Dean CSE, General Chair</span>
                </div>
                <div className="mt-1">
                  <span className="text-white block font-medium">Dr. Munish Sabharwal</span>
                  <span className="text-[10px] text-[#777785]">Director CSE, General Chair</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
