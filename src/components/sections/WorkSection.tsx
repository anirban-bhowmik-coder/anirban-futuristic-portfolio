import { useState } from "react";
import { motion } from "motion/react";
import { Layers, Sparkles, Filter } from "lucide-react";
import { projects, type Project } from "../../data/projects";
import { ProjectCard3D } from "../ui/ProjectCard3D";

interface WorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export function WorkSection({ onSelectProject }: WorkSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const liveCount = projects.filter((p) => Boolean(p.liveUrl)).length;

  const filterCategories = [
    { id: "all", label: `ALL WORK (${projects.length})` },
    { id: "live", label: `LIVE APPS (${liveCount})` },
    { id: "featured", label: "FEATURED CORE" },
    { id: "ai", label: "AI & SYSTEMS" },
    { id: "security", label: "CYBERSECURITY" },
    { id: "web", label: "WEB & GRAPHICS" }
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "live") return Boolean(p.liveUrl);
    if (activeFilter === "featured") return p.featured;
    if (activeFilter === "ai") return p.stack.some((s) => s.includes("AI") || s.includes("Three") || s.includes("Agents") || s.includes("Autonomous"));
    if (activeFilter === "security") return p.stack.some((s) => s.includes("Cybersecurity") || s.includes("Forensics") || s.includes("Risk"));
    if (activeFilter === "web") return p.stack.some((s) => s.includes("React") || s.includes("WebGL") || s.includes("Motion") || s.includes("Android"));
    return true;
  });

  return (
    <section id="work" className="py-12 sm:py-16 md:py-28 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-20 bg-[#eae6de] text-[#111114]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 pb-6 sm:pb-8 border-b border-[#c8c1b3]">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#111114] uppercase block mb-2 sm:mb-3 font-semibold">
              02 / SELECTED WORK & CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[0.92] sm:leading-[0.88]">
              SPATIAL<br />
              <em className="font-serif italic font-normal text-[#33333e]">COMPUTING.</em>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm md:text-base text-[#44444e] leading-relaxed mb-3 sm:mb-4">
              Real engineering implementations across AI/ML pipelines, verifiable forensic algorithms,
              kinetic WebGL shaders, and high-performance frontend architectures.
            </p>
            {/* Filter Tabs with horizontal swipe on mobile */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar flex-nowrap sm:flex-wrap">
              {filterCategories.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-3 py-1.5 text-xs font-mono rounded-full border whitespace-nowrap transition-all cursor-pointer ${
                    activeFilter === filter.id
                      ? "bg-[#111114] text-[#f4f1eb] border-[#111114] font-medium"
                      : "bg-[#ded8cc] text-[#33333e] border-[#c4bdae] hover:border-[#111114]"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <ProjectCard3D
                project={project}
                index={index}
                onSelect={onSelectProject}
              />
            </motion.div>
          ))}
        </div>

        {/* Notice on KIRO & Authenticity */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-[#c8c1b3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#666672]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111114]" />
            <span>KINETICMESH: CURRENT SYSTEM DESIGNATION</span>
          </span>
          <span>CLICK ANY CARD TO INSPECT ARCHITECTURE SPECIFICATIONS</span>
        </div>
      </div>
    </section>
  );
}
