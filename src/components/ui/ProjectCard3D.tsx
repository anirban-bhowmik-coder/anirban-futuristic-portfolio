import { useState, useRef, type MouseEvent } from "react";
import { ArrowUpRight, Cpu, Layers, ExternalLink, Globe } from "lucide-react";
import type { Project } from "../../data/projects";

interface ProjectCard3DProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectCard3D({ project, index, onSelect }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation limits (-8 to +8 deg)
    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const statusColors = {
    BUILDING: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30",
    "COMPLETED / TEAM": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    PROTOTYPING: "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30",
    PROJECT: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    COMPLETED: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
  };

  return (
    <div
      style={{ perspective: "1200px" }}
      className="w-full h-full cursor-pointer group"
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View case study for ${project.name}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.18s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease"
        }}
        className="relative h-full bg-[#121217] border border-[#26262e] group-hover:border-[#3d3d4a] rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300"
      >
        {/* Dynamic Specular Glare */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}), transparent 70%)`
          }}
        />

        {/* Ambient Subtle Accent Glow on Hover */}
        <div className="absolute -right-20 -bottom-20 w-48 h-48 bg-[#00f0ff]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00f0ff]/10 transition-colors" />

        {/* Top Header Row (Elevated in 3D) */}
        <div
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          className="flex items-center justify-between gap-4 pb-4 border-b border-[#212128]"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono text-[#666672] font-semibold">
              0{index + 1}
            </span>
            <span
              className={`px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase border rounded-full ${
                statusColors[project.status] || "bg-gray-800 text-gray-300"
              }`}
            >
              {project.status}
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-widest text-[#777785]">
            {project.type}
          </span>
        </div>

        {/* Middle Body (Elevated in 3D) */}
        <div
          style={{ transform: "translateZ(42px)", transformStyle: "preserve-3d" }}
          className="my-6"
        >
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#f4f1eb] group-hover:text-white transition-colors">
            {project.name}
          </h3>
          <p className="mt-2 text-sm text-[#00f0ff]/80 font-light line-clamp-1">
            {project.tagline}
          </p>
          <p className="mt-3 text-sm text-[#9b9ba4] leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Architecture Spec Snippet */}
        <div
          style={{ transform: "translateZ(25px)" }}
          className="bg-[#181820] border border-[#24242d] rounded-xl p-3 mb-6"
        >
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#f59e0b] mb-1">
            <Cpu size={12} />
            <span>Core Architecture</span>
          </div>
          <p className="text-xs text-[#b5b5be] line-clamp-2">
            {project.architectureNotes}
          </p>
        </div>

        {/* Bottom Stack & CTA (Elevated in 3D) */}
        <div
          style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
          className="pt-4 border-t border-[#212128] flex items-center justify-between gap-2"
        >
          <div className="flex flex-wrap gap-1.5 max-w-[75%]">
            {project.stack.slice(0, 3).map((s) => (
              <span
                key={s}
                className="px-2 py-0.5 text-[10px] font-mono bg-[#1c1c24] text-[#a0a0aa] rounded-md border border-[#2b2b36]"
              >
                {s}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#666672]">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-mono tracking-wider text-[#00f0ff] group-hover:translate-x-1 transition-transform">
            <span>DETAILS</span>
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* Live Project Deployment Bar (Down at bottom of respective projects) */}
        {project.liveUrl && (
          <div
            style={{ transform: "translateZ(42px)", transformStyle: "preserve-3d" }}
            className="mt-3 pt-3 border-t border-[#252532] flex items-center justify-between gap-2"
          >
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#00f0ff] hover:bg-[#3bf5ff] text-[#111114] text-[11px] font-mono font-bold rounded-lg transition-all shadow-md shadow-[#00f0ff]/20 hover:scale-[1.03] active:scale-[0.98]"
              title={`Open Live Demo: ${project.liveUrl}`}
            >
              <ExternalLink size={12} />
              <span>LAUNCH LIVE APP</span>
            </a>

            <div className="flex items-center gap-1 text-[10px] font-mono text-[#888898] truncate max-w-[150px]">
              <Globe size={11} className="text-[#00f0ff] shrink-0" />
              <span className="truncate" title={project.liveUrl}>
                {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
