import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github, Cpu, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "../../data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Dialog */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111114] text-[#f4f1eb] border border-[#2b2b32] rounded-2xl shadow-2xl p-6 md:p-10 z-10"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#26262e]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 rounded-full">
                  {project.status}
                </span>
                <span className="text-xs font-mono tracking-wider uppercase text-[#888892]">
                  {project.type}
                </span>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00f0ff] hover:bg-[#3bf5ff] text-[#111114] text-[10px] font-mono font-bold rounded-full transition-all shadow-md shadow-[#00f0ff]/20"
                  >
                    <ExternalLink size={11} />
                    <span>LIVE DEMO</span>
                  </a>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#888892] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Header Content */}
            <div className="mt-6">
              <h2 id="modal-project-title" className="text-3xl md:text-5xl font-semibold tracking-tight">
                {project.name}
              </h2>
              <p className="mt-3 text-lg text-[#00f0ff]/90 font-light leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Main Description */}
            <div className="mt-6 text-[#b5b5bc] text-base leading-relaxed">
              <p>{project.description}</p>
            </div>

            {/* System Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
              {project.systemSpecs.map((spec) => (
                <div
                  key={spec.label}
                  className="bg-[#18181d] border border-[#26262e] rounded-xl p-4 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#777782]">
                    {spec.label}
                  </span>
                  <span className="text-sm font-semibold text-white mt-1">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Architecture Notes */}
            <div className="bg-[#16161b] border border-[#2b2b34] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#f59e0b] mb-2">
                <Cpu size={15} />
                <span>Architecture & Engineering Design</span>
              </div>
              <p className="text-sm text-[#c5c5ce] leading-relaxed">
                {project.architectureNotes}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#888892] mb-3">
                <Sparkles size={14} className="text-[#00f0ff]" />
                <span>Core Technical Capabilities</span>
              </div>
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#b0b0b8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] mt-2 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#888892] mb-3">
                <Layers size={14} />
                <span>Applied Technologies</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 text-xs font-mono bg-[#1b1b22] border border-[#30303b] text-[#e0e0e8] rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="pt-6 border-t border-[#26262e] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#777782]">
                <ShieldCheck size={14} className="text-green-400" />
                <span>Verified Repository Source</span>
              </div>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00f0ff] hover:bg-[#3bf5ff] text-[#111114] text-xs font-mono font-bold rounded-full transition-all shadow-lg hover:shadow-[#00f0ff]/20"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink size={15} />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f4f1eb] text-[#111114] hover:bg-white text-xs font-medium rounded-full transition-all"
                  >
                    <span>View Repository</span>
                    <Github size={15} />
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#202028] hover:bg-[#282832] text-xs font-medium rounded-full transition-all text-[#e0e0e8]"
                >
                  Close Case Study
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
