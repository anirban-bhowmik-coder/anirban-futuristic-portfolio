import { motion } from "motion/react";
import { BookOpen, Sparkles, Code2, ArrowRight } from "lucide-react";
import { SkillConstellation } from "../ui/SkillConstellation";
import { portfolioData } from "../../data/portfolio";

export function SkillsSection() {
  return (
    <section id="skills" className="py-12 sm:py-16 md:py-28 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#f4f1eb] text-[#111114]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 pb-6 sm:pb-8 border-b border-[#c8c1b3]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#111114] uppercase block mb-2 sm:mb-3 font-semibold">
              04 / TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[0.92] sm:leading-[0.88]">
              SKILLS &<br />
              <em className="font-serif italic font-normal text-[#33333e]">CONSTELLATION.</em>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm md:text-base text-[#44444e] leading-relaxed">
              Synthesizing algorithmic foundations (C++, DSA, OOP) with modern artificial intelligence
              and spatial WebGL computing. Evaluated through architectural synergy rather than arbitrary percentages.
            </p>
          </div>
        </div>

        {/* Interactive Skill Constellation */}
        <SkillConstellation />

        {/* Categorized Honest Proficiency Matrix */}
        <div className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-[#c8c1b3]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#55555e] block mb-1">
                HONEST PROFICIENCY PROFILES · ZERO FABRICATED PERCENTAGES
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                VERIFIED TECHNICAL SPECTRUM
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded bg-green-500/15 text-green-800 border border-green-500/30">
                • Project Experience
              </span>
              <span className="px-2.5 py-1 rounded bg-blue-500/15 text-blue-800 border border-blue-500/30">
                • Working Knowledge
              </span>
              <span className="px-2.5 py-1 rounded bg-amber-500/15 text-amber-800 border border-amber-500/30">
                • Learning
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Languages */}
            <div className="bg-[#eae4d6] border border-[#d2cbbe] rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111114] block pb-2 mb-3 border-b border-[#c8c1b3]">
                  LANGUAGES
                </span>
                <div className="space-y-2.5">
                  {[
                    { name: "C++", level: "Working Knowledge", desc: "Systems & DSA optimization" },
                    { name: "Python", level: "Project Experience", desc: "AI/ML, scripts & forensics" },
                    { name: "JavaScript", level: "Project Experience", desc: "Modern ESNext & DOM" },
                    { name: "HTML", level: "Project Experience", desc: "Semantic & accessible markup" },
                    { name: "CSS", level: "Project Experience", desc: "Modern layouts & keyframes" }
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-[#f4f1eb]/80 border border-[#d8d0c2]">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#111114] block">{s.name}</span>
                        <span className="text-[10px] text-[#555562]">{s.desc}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                        s.level === "Project Experience"
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-blue-100 text-blue-800 font-semibold"
                      }`}>
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Core CS & AI */}
            <div className="bg-[#eae4d6] border border-[#d2cbbe] rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111114] block pb-2 mb-3 border-b border-[#c8c1b3]">
                  CORE CS &amp; AI
                </span>
                <div className="space-y-2.5">
                  {[
                    { name: "Data Structures & Algorithms", level: "Working Knowledge", desc: "Complexity, trees & graphs" },
                    { name: "OOP", level: "Working Knowledge", desc: "Modular software design" },
                    { name: "Problem Solving", level: "Working Knowledge", desc: "Algorithmic thinking" },
                    { name: "AI/ML", level: "Learning", desc: "Neural models & training" },
                    { name: "Generative AI", level: "Working Knowledge", desc: "LLMs, RAG & prompt pipelines" },
                    { name: "Cybersecurity", level: "Project Experience", desc: "NIST 800-88 & risk audits" }
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-[#f4f1eb]/80 border border-[#d8d0c2]">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#111114] block">{s.name}</span>
                        <span className="text-[10px] text-[#555562]">{s.desc}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded whitespace-nowrap ml-1 ${
                        s.level === "Project Experience"
                          ? "bg-green-100 text-green-800 font-semibold"
                          : s.level === "Working Knowledge"
                          ? "bg-blue-100 text-blue-800 font-semibold"
                          : "bg-amber-100 text-amber-800 font-semibold"
                      }`}>
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Frontend & Graphics */}
            <div className="bg-[#eae4d6] border border-[#d2cbbe] rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111114] block pb-2 mb-3 border-b border-[#c8c1b3]">
                  FRONTEND &amp; GRAPHICS
                </span>
                <div className="space-y-2.5">
                  {[
                    { name: "React", level: "Project Experience", desc: "Modern SPA & component states" },
                    { name: "TypeScript", level: "Working Knowledge", desc: "Static typing & strict interfaces" },
                    { name: "Tailwind CSS", level: "Project Experience", desc: "Responsive utility styling" },
                    { name: "Three.js / WebGL", level: "Project Experience", desc: "3D scene graphs & shaders" },
                    { name: "Motion (Framer)", level: "Project Experience", desc: "Physics transitions & choreography" }
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-[#f4f1eb]/80 border border-[#d8d0c2]">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#111114] block">{s.name}</span>
                        <span className="text-[10px] text-[#555562]">{s.desc}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                        s.level === "Project Experience"
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-blue-100 text-blue-800 font-semibold"
                      }`}>
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools & Ecosystem */}
            <div className="bg-[#eae4d6] border border-[#d2cbbe] rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#111114] block pb-2 mb-3 border-b border-[#c8c1b3]">
                  TOOLS &amp; ECOSYSTEM
                </span>
                <div className="space-y-2.5">
                  {[
                    { name: "Git", level: "Project Experience", desc: "Branching, rebase & commit provenance" },
                    { name: "GitHub", level: "Project Experience", desc: "Open-source PRs & repository sync" },
                    { name: "Vite", level: "Project Experience", desc: "Modern bundle orchestration" },
                    { name: "Node.js", level: "Working Knowledge", desc: "Runtime, npm packages & scripts" },
                    { name: "pnpm", level: "Working Knowledge", desc: "Fast disk-efficient workspace tooling" }
                  ].map((s) => (
                    <div key={s.name} className="flex items-center justify-between p-2 rounded-lg bg-[#f4f1eb]/80 border border-[#d8d0c2]">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#111114] block">{s.name}</span>
                        <span className="text-[10px] text-[#555562]">{s.desc}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                        s.level === "Project Experience"
                          ? "bg-green-100 text-green-800 font-semibold"
                          : "bg-blue-100 text-blue-800 font-semibold"
                      }`}>
                        {s.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Currently Learning Section */}
        <div className="mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-[#c8c1b3]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest uppercase text-[#55555e] block mb-1">
                ACTIVE RIGOR · DEEP CURRICULUM
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
                CONTINUOUS LEARNING TRAJECTORY
              </h3>
            </div>
            <span className="text-xs font-mono text-[#666675]">
              9 DOMAINS IN ACTIVE PURSUIT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
            {portfolioData.currentlyLearning.map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-[#eae4d6] border border-[#d2cbbe] hover:border-[#111114] rounded-xl p-3 sm:p-4 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#111114] group-hover:bg-[#00f0ff] transition-colors" />
                  <span className="text-xs sm:text-sm font-mono font-medium text-[#22222a]">
                    {topic}
                  </span>
                </div>
                <Code2 size={14} className="text-[#888892] group-hover:text-[#111114] transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
