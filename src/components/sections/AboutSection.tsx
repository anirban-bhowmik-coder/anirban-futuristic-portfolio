import { motion } from "motion/react";
import { GraduationCap, Award, MapPin, Sparkles, Terminal, ArrowUpRight, ShieldCheck, Quote } from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { PortraitFrame3D } from "../ui/PortraitFrame3D";

export function AboutSection() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-28 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#111114] text-[#f4f1eb]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block mb-2 sm:mb-3">
            01 / ABOUT
          </span>
          <div className="h-[1px] w-12 bg-[#00f0ff]/40 mb-3 sm:mb-4" />
          <p className="text-xs font-mono text-[#777782] uppercase leading-relaxed">
            BACKGROUND · STUDENT PROFILE · CORE ETHOS
          </p>
        </div>

        {/* 3D Portrait & Bio Integration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-16 md:mb-20 items-center">
          {/* Left: 3D Holographic Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <PortraitFrame3D />
          </div>

          {/* Right: Bio & Positioning (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono mb-3 sm:mb-4">
                <ShieldCheck size={14} />
                <span>AUTHENTIC STUDENT POSITIONING</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[0.92] mb-4 sm:mb-6">
                A STUDENT<br />
                <em className="font-serif italic font-normal text-[#00f0ff]">WHO BUILDS.</em>
              </h2>

              {/* Primary Brand Statement */}
              <div className="p-3.5 sm:p-5 rounded-2xl bg-[#181822] border-l-4 border-l-[#00f0ff] border-y border-r border-[#272736] mb-4 sm:mb-6">
                <Quote size={18} className="text-[#00f0ff] mb-1.5 sm:mb-2 opacity-60" />
                <p className="text-base sm:text-xl font-mono font-medium text-white tracking-tight">
                  "{portfolioData.brandStatement}"
                </p>
                <p className="text-xs sm:text-sm font-sans text-[#a0a0b0] mt-1.5 sm:mt-2 font-light">
                  {portfolioData.secondaryBrandStatement}
                </p>
              </div>

              <p className="text-sm sm:text-lg text-[#c4c4cc] font-light leading-relaxed mb-4 sm:mb-6">
                Computer Science &amp; Engineering undergraduate specializing in Artificial Intelligence
                &amp; Machine Learning at IILM University, Greater Noida. Focused on turning algorithmic intuition,
                kinetic 3D visual computing, and digital systems security into robust interactive technology.
              </p>

              <div className="text-xs font-mono text-[#888894] flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 pt-2 border-t border-[#22222c]">
                <span>• 2ND YEAR / 3RD SEMESTER</span>
                <span>• CGPA: 8.21</span>
                <span>• GREATER NOIDA, INDIA</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Key Academic Facts Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mb-10 sm:mb-16 md:mb-20">
          <div className="bg-[#18181f] border border-[#262630] rounded-2xl p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
            <div className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#777782] mb-2 sm:mb-3 flex items-center gap-1.5">
              <Award size={13} className="text-[#f59e0b]" />
              <span>ACADEMIC CGPA</span>
            </div>
            <div>
              <span className="text-2xl sm:text-4xl md:text-5xl font-bold font-mono tracking-tight text-white">
                {portfolioData.cgpa}
              </span>
              <p className="text-[11px] sm:text-xs text-[#888892] mt-0.5 sm:mt-1">High distinction</p>
            </div>
          </div>

          <div className="bg-[#18181f] border border-[#262630] rounded-2xl p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
            <div className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#777782] mb-2 sm:mb-3 flex items-center gap-1.5">
              <GraduationCap size={13} className="text-[#00f0ff]" />
              <span>UNDERGRADUATE</span>
            </div>
            <div>
              <span className="text-2xl sm:text-4xl md:text-5xl font-bold font-mono tracking-tight text-white">
                02<span className="text-xs sm:text-sm font-sans font-normal text-[#888892] ml-1">nd</span>
              </span>
              <p className="text-[11px] sm:text-xs text-[#888892] mt-0.5 sm:mt-1">Session 2025–2029</p>
            </div>
          </div>

          <div className="bg-[#18181f] border border-[#262630] rounded-2xl p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
            <div className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#777782] mb-2 sm:mb-3 flex items-center gap-1.5">
              <Terminal size={13} className="text-[#a855f7]" />
              <span>SPECIALIZATION</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold font-mono tracking-tight text-[#00f0ff]">
                AI / ML
              </span>
              <p className="text-[11px] sm:text-xs text-[#888892] mt-0.5 sm:mt-1">CSE Applied Intelligence</p>
            </div>
          </div>

          <div className="bg-[#18181f] border border-[#262630] rounded-2xl p-3.5 sm:p-5 md:p-6 flex flex-col justify-between">
            <div className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-[#777782] mb-2 sm:mb-3 flex items-center gap-1.5">
              <MapPin size={13} className="text-emerald-400" />
              <span>INSTITUTION</span>
            </div>
            <div>
              <span className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-white block">
                {portfolioData.university}
              </span>
              <p className="text-[11px] sm:text-xs text-[#888892] mt-0.5 sm:mt-1">{portfolioData.location}</p>
            </div>
          </div>
        </div>

        {/* Currently Building Showcase */}
        <div className="pt-8 sm:pt-12 border-t border-[#24242e]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#f59e0b] block mb-1">
                ACTIVE LAB INITIATIVES
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                CURRENTLY BUILDING
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-[#777782]">
              LIVE REPOSITORIES · REAL ITERATIONS · ZERO FABRICATED METRICS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {portfolioData.currentlyBuilding.map((item) => (
              <div
                key={item.name}
                className="bg-[#15151c] border border-[#262630] hover:border-[#383848] rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white">
                      {item.name}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded-full border ${
                        item.status === "BUILDING"
                          ? "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30"
                          : "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#a5a5b0] leading-relaxed mb-3 sm:mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 border-t border-[#202028]">
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#777785] uppercase tracking-wider block mb-1">
                    FOCUS STACK
                  </span>
                  <span className="text-xs font-mono text-[#c5c5d0]">
                    {item.focus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
