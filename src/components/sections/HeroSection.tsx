import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Github, FileText, Sparkles, Activity, Cpu } from "lucide-react";
import { KineticScene } from "../KineticScene";
import { FloatingWindow } from "../ui/FloatingWindow";
import { MagneticButton } from "../ui/MagneticButton";
import { portfolioData } from "../../data/portfolio";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [meshMode, setMeshMode] = useState<"neural" | "lattice" | "pulse">("neural");

  return (
    <section id="home" className="hero relative min-h-[100svh] overflow-hidden flex items-center pt-20 sm:pt-28 pb-10 sm:pb-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f4f1eb]">
      {/* Subtle Dotted Grid Background */}
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
        {/* Left Editorial Copy (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Subtle Availability / Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#111114]/5 border border-[#111114]/15 text-[#111114] text-[10px] sm:text-[11px] font-mono tracking-widest uppercase mb-4 sm:mb-6 w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span>{portfolioData.statusIndicator}</span>
          </motion.div>

          {/* Academic Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[11px] sm:text-xs md:text-sm font-mono tracking-widest text-[#55555e] uppercase mb-2 sm:mb-4"
          >
            AI/ML BUILDER · CSE UNDERGRADUATE · GREATER NOIDA
          </motion.p>

          {/* Big Editorial Title */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-semibold tracking-tight text-[#111114] leading-[0.92] sm:leading-[0.88] mb-4 sm:mb-6"
          >
            ANIRBAN<br />
            <em className="font-serif italic font-normal tracking-normal text-[#1e1e24]">
              BHOWMIK
            </em>
          </motion.h1>

          {/* Headline Requirement: BUILDING WHAT COMES NEXT. */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mb-5 sm:mb-8"
          >
            <h2 className="text-lg sm:text-2xl md:text-3xl font-mono tracking-tight font-medium text-[#111114]">
              {portfolioData.headline}
            </h2>
            <p className="mt-1.5 sm:mt-2 text-sm sm:text-lg text-[#55555e] font-serif italic max-w-xl">
              {portfolioData.subheadline}
            </p>
          </motion.div>

          {/* Primary Actions: Explore Work, GitHub, Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2"
          >
            <MagneticButton href="#work">
              <span className="font-mono text-xs sm:text-sm">EXPLORE WORK</span>
              <ArrowDown size={14} />
            </MagneticButton>

            <a
              href={portfolioData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-[#111114] text-[#111114] hover:bg-[#111114] hover:text-[#f4f1eb] font-mono text-xs transition-all"
            >
              <span>GITHUB</span>
              <Github size={14} />
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#111114]/10 hover:bg-[#111114]/20 text-[#111114] font-mono text-xs transition-all border border-[#111114]/20"
            >
              <span>RESUME</span>
              <FileText size={14} />
            </button>
          </motion.div>

          {/* 3D Kinetic Mesh Mode Controllers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 sm:mt-10 flex flex-wrap items-center gap-2 text-xs font-mono text-[#555562]"
          >
            <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Cpu size={13} className="text-[#111114]" />
              <span>3D MESH TOPOLOGY:</span>
            </span>
            {(["neural", "lattice", "pulse"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setMeshMode(mode)}
                className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] tracking-wider uppercase border transition-all ${
                  meshMode === mode
                    ? "bg-[#111114] text-[#f4f1eb] border-[#111114] font-bold"
                    : "bg-white/60 text-[#44444e] border-[#111114]/20 hover:border-[#111114]/50"
                }`}
              >
                {mode}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Right 3D Interactive Spatial Mesh (5 cols) */}
        <div className="lg:col-span-5 relative w-full h-[260px] sm:h-[380px] md:h-[480px] lg:h-[620px] flex items-center justify-center">
          {/* Ambient 3D canvas backdrop ring */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#111114]/5 to-transparent border border-[#111114]/5 pointer-events-none" />

          {/* Real 3D Canvas */}
          <div className="w-full h-full">
            <KineticScene mode={meshMode} />
          </div>

          {/* Floating Reference Terminal Window */}
          <div className="absolute -bottom-2 sm:-bottom-4 right-0 sm:right-4 w-52 sm:w-64 md:w-72 pointer-events-auto z-20 scale-90 sm:scale-100 origin-bottom-right">
            <FloatingWindow title="ANIRBAN / KINETIC SYSTEM">
              <div className="text-[10px] sm:text-[11px] font-mono leading-relaxed opacity-90">
                <div className="flex justify-between border-b border-[#333] pb-1 mb-1.5 sm:mb-2 text-[9px] text-[#00f0ff]">
                  <span>GPU ACCELERATED</span>
                  <span>60 FPS ACTIVE</span>
                </div>
                <div className="text-[#888892]">COMPUTATIONAL GRAPH:</div>
                <div className="text-[#f4f1eb] font-semibold">C++ · PYTHON · ML</div>
                <div className="text-[#f59e0b] font-medium">THREE.JS · WEBGL · MOTION</div>
                <div className="text-[9px] sm:text-[10px] text-[#00f0ff] mt-1.5 sm:mt-2 pt-1 border-t border-[#26262e]">
                  BUILD · EXPERIMENT · ITERATE
                </div>
              </div>
            </FloatingWindow>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-2 sm:bottom-6 left-4 sm:left-6 md:left-20 flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono tracking-widest text-[#777782] uppercase">
        <Activity size={12} className="text-[#111114] animate-bounce" />
        <span>SCROLL TO EXPLORE COMPUTATIONAL WORK ↓</span>
      </div>
    </section>
  );
}
