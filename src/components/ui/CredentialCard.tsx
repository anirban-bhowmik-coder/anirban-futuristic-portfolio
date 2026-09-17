import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  Eye,
  Award,
  Layers,
  CheckCircle2
} from "lucide-react";
import type { CredentialItem } from "../../data/credentials";

interface CredentialCardProps {
  credential: CredentialItem;
  onSelect: (credential: CredentialItem) => void;
  index: number;
}

export function CredentialCard({ credential, onSelect, index }: CredentialCardProps) {
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

    const rX = ((y - centerY) / centerY) * -7; // tilt max 7 deg
    const rY = ((x - centerX) / centerX) * 7;

    setRotX(rX);
    setRotY(rY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: 0.15 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const isFeatured = credential.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative perspective-1000 ${
        isFeatured ? "col-span-1 md:col-span-2 lg:col-span-2" : "col-span-1"
      }`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(credential)}
        style={{
          transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${
            isHovered ? "12px" : "0px"
          })`,
          transition: "transform 0.15s ease-out"
        }}
        className={`relative h-full rounded-2xl p-6 sm:p-8 cursor-pointer transition-colors duration-300 overflow-hidden flex flex-col justify-between ${
          isFeatured
            ? "bg-gradient-to-br from-[#1b1724] via-[#14141e] to-[#121218] border-2 border-[#c74634]/50 hover:border-[#f59e0b] shadow-2xl shadow-[#c74634]/10"
            : "bg-[#14141b] border border-[#272736] hover:border-[#3d3d52] shadow-xl"
        }`}
      >
        {/* Dynamic Specular Glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`
          }}
        />

        {/* Ambient Top Glow for Featured Card */}
        {isFeatured && (
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#c74634]/20 rounded-full blur-3xl pointer-events-none" />
        )}

        {/* Card Header */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#232330]">
            <div className="flex items-center gap-2">
              {isFeatured ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest uppercase font-bold text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
                  <Sparkles size={13} className="text-amber-400 animate-pulse" />
                  <span>FEATURED CREDENTIAL</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-0.5 rounded-full border border-[#00f0ff]/20">
                  {credential.category}
                </span>
              )}

              <span className="text-[10px] font-mono text-[#888896] uppercase hidden sm:inline">
                {credential.type}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-[#777785]">
              <Calendar size={13} className="text-[#888896]" />
              <span>{credential.issueDate}</span>
            </div>
          </div>

          {/* Issuer Branding */}
          <div className="mt-5 flex items-center justify-between">
            <span
              className={`text-xs font-mono font-semibold tracking-wider uppercase ${
                isFeatured ? "text-[#f59e0b]" : "text-[#00f0ff]"
              }`}
            >
              {credential.issuer}
            </span>

            {credential.credentialId && (
              <span className="text-[10px] font-mono text-[#888896] bg-[#1a1a24] px-2 py-0.5 rounded border border-[#2c2c3c] hidden sm:block">
                ID: {credential.credentialId}
              </span>
            )}
            {credential.serialNumber && (
              <span className="text-[10px] font-mono text-[#888896] bg-[#1a1a24] px-2 py-0.5 rounded border border-[#2c2c3c] hidden sm:block">
                Serial: {credential.serialNumber.slice(0, 12)}...
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            className={`font-semibold tracking-tight text-white mt-2 transition-colors ${
              isFeatured ? "text-2xl sm:text-3xl leading-snug" : "text-xl sm:text-2xl"
            }`}
          >
            {credential.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#b0b0be] font-light leading-relaxed mt-3">
            {credential.summary}
          </p>

          {/* Extra Highlights for Featured Card */}
          {isFeatured && (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#1e1b29]/70 border border-[#3b2a38]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#888898] block">
                  AUTHORITY LEVEL
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  Oracle Certified Professional (OCP)
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#888898] block">
                  VALIDITY TERM
                </span>
                <span className="text-xs font-mono text-emerald-400 mt-0.5 block">
                  Active (Through Oct 28, 2027)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="mt-8 pt-5 border-t border-[#232330]">
          {/* Skills Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {credential.skills.slice(0, isFeatured ? 6 : 4).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 text-[10px] font-mono bg-[#1d1d28] text-[#c2c2cf] rounded border border-[#2c2c3e]"
              >
                {skill}
              </span>
            ))}
            {!isFeatured && credential.skills.length > 4 && (
              <span className="px-2 py-1 text-[10px] font-mono text-[#777785]">
                +{credential.skills.length - 4} more
              </span>
            )}
          </div>

          {/* Action Trigger */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck size={14} />
              <span>{credential.verificationBadge}</span>
            </span>

            <div className="flex items-center gap-1 text-[#00f0ff] group-hover:translate-x-1 transition-transform">
              <Eye size={13} />
              <span className="underline underline-offset-4">Inspect Certificate</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
