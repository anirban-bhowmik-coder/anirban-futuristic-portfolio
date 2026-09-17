import { useState, useRef, useEffect, type MouseEvent } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ChevronUp,
  Globe,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Sparkles,
  Github,
  Mail,
  Award,
  Layers,
  Cpu,
  Clock,
  Compass
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { projects } from "../../data/projects";

interface Footer3DProps {
  onOpenResume?: () => void;
}

export function Footer3D({ onOpenResume }: Footer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // 3D Parallax & Specular Tracking for the big 3D Title
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Live Digital Clock
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }) + " IST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!textContainerRef.current) return;
    const rect = textContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const nextRotX = ((y - centerY) / centerY) * -14;
    const nextRotY = ((x - centerX) / centerX) * 14;

    setRotX(nextRotX);
    setRotY(nextRotY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter deployed live projects
  const liveProjects = projects.filter((p) => Boolean(p.liveUrl));

  const allSections = [
    { id: "hero", label: "00 / HERO & ORBIT", desc: "Kinetic WebGL Mesh & Intro" },
    { id: "about", label: "01 / ABOUT PROFILE", desc: "Student Who Builds · 3D Portrait" },
    { id: "work", label: "02 / SELECTED WORK", desc: "Interactive 3D Case Studies" },
    { id: "experience", label: "03 / EXPERIENCE", desc: "YuvaIntern Cybersecurity Audit" },
    { id: "skills", label: "04 / SKILLS MATRIX", desc: "Constellation & Honest Levels" },
    { id: "credentials", label: "05 / CREDENTIALS", desc: "Oracle GenAI OCP & Recognition" },
    { id: "achievements", label: "06 / ACHIEVEMENTS", desc: "SIH 2026 Cleared & CGPA 8.21" },
    { id: "contact", label: "07 / INITIATE CONTACT", desc: "Direct Inbox & Collaboration" }
  ];

  return (
    <footer
      ref={containerRef}
      className="relative bg-[#0a0a0f] text-[#f4f1eb] pt-24 pb-16 px-6 md:px-12 lg:px-20 border-t border-[#20202d] overflow-hidden select-none"
    >
      {/* Background Ambience & Cybernetic Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(0,240,255,0.06),transparent_80%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#141420_1px,transparent_1px),linear-gradient(to_bottom,#141420_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Telemetry & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-16 border-b border-[#1e1e2c] text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]" />
            </span>
            <span className="text-[#00f0ff] font-semibold tracking-wider uppercase">
              SYSTEM ONLINE · ACTIVE BUILDER
            </span>
            <span className="text-[#555566] hidden sm:inline">|</span>
            <span className="text-[#888898] hidden sm:inline flex items-center gap-1.5">
              <Clock size={13} className="text-[#888898]" />
              <span>{currentTime || "LIVE TELEMETRY"}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#888898]">
            <span className="hidden md:inline text-[11px] text-[#00f0ff]/80">
              B.Tech CSE (AI/ML) · 2nd Year · CGPA 8.21
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161622] hover:bg-[#202030] text-[#c0c0d0] hover:text-white border border-[#2b2b3c] transition-all hover:scale-105"
            >
              <span>RETURN TO TOP</span>
              <ChevronUp size={14} className="text-[#00f0ff]" />
            </button>
          </div>
        </div>

        {/* REMARKABLE 3D TYPE BANNER */}
        <div
          ref={textContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1200px" }}
          className="relative py-12 md:py-20 my-4 cursor-pointer text-center group"
        >
          {/* Parallax 3D Tilting Typography Chassis */}
          <div
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${isHovered ? 20 : 0}px)`,
              transformStyle: "preserve-3d",
              transition: "transform 0.18s cubic-bezier(0.2, 0, 0, 1)"
            }}
            className="relative"
          >
            {/* Backplane Shadow Typography (Layer -1 in 3D) */}
            <div
              style={{
                transform: "translateZ(-30px)",
                filter: "blur(8px)"
              }}
              className="absolute inset-0 flex flex-col items-center justify-center opacity-40 select-none pointer-events-none"
            >
              <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] font-extrabold tracking-tighter text-[#00f0ff]/20 font-mono uppercase">
                ANIRBAN
              </span>
              <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] font-extrabold tracking-tighter text-[#7000ff]/20 font-mono uppercase">
                BHOWMIK
              </span>
            </div>

            {/* Middle Specular Highlight Layer */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-3xl"
              style={{
                background: `radial-gradient(circle 500px at ${glare.x}% ${glare.y}%, rgba(0, 240, 255, ${glare.opacity}), transparent 70%)`
              }}
            />

            {/* Front 3D Typography Layer (Layer +30px in 3D) */}
            <div
              style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
              className="flex flex-col items-center justify-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151522] border border-[#2e2e42] text-[#00f0ff] text-xs font-mono mb-4 shadow-lg">
                <Sparkles size={13} className="text-[#00f0ff]" />
                <span className="tracking-widest uppercase">SPATIAL COMPUTING &amp; AI EXPERIMENTER</span>
              </div>

              <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] font-black tracking-tighter uppercase leading-[0.82] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e2e2ec] to-[#88889a] drop-shadow-2xl font-mono">
                ANIRBAN<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#00f0ff]">
                  BHOWMIK
                </span>
              </h2>

              <p className="mt-6 text-sm sm:text-base md:text-lg font-serif italic text-[#a5a5b8] max-w-2xl font-light">
                "{portfolioData.brandStatement}"
              </p>

              <div className="mt-4 flex items-center gap-3 text-xs font-mono text-[#777788] uppercase tracking-wider">
                <span>{portfolioData.secondaryBrandStatement}</span>
                <span>•</span>
                <span>IILM UNIVERSITY</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D DEPLOYED PROJECTS LAUNCH STRIP ("PUT THIS LINK IN DOWN OF RESPECTIVE PROJECTS") */}
        <div className="mt-16 pt-12 border-t border-[#1f1f2e]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block mb-1">
                LIVE PRODUCTION DEPLOYMENTS · ONE-CLICK LAUNCH
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                ACTIVE LIVE APPLICATIONS
              </h3>
            </div>
            <span className="text-xs font-mono text-[#888898]">
              VERIFIED VERCEL HOSTED BUILDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveProjects.map((proj, idx) => (
              <div
                key={proj.id}
                style={{ perspective: "1000px" }}
                className="group h-full"
              >
                <div className="h-full bg-[#12121a] hover:bg-[#161622] border border-[#222232] hover:border-[#00f0ff]/50 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#00f0ff]/10">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-1 rounded-full border border-[#00f0ff]/20">
                        {proj.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#666675]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#00f0ff] transition-colors">
                      {proj.name}
                    </h4>

                    <p className="text-xs text-[#9999a8] leading-relaxed mb-4 line-clamp-2">
                      {proj.tagline}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.stack.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1c1c28] text-[#a0a0b0] border border-[#2b2b3c]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Direct Launch Link Down at bottom of respective project */}
                  <div className="pt-4 border-t border-[#1f1f2d] flex items-center justify-between gap-2">
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00f0ff] hover:bg-[#3bf5ff] text-[#111114] text-xs font-mono font-bold transition-all shadow-md shadow-[#00f0ff]/20 hover:scale-105 active:scale-95"
                      title={`Launch ${proj.name} Live App`}
                    >
                      <ExternalLink size={13} />
                      <span>LAUNCH APP</span>
                    </a>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-[#777788] truncate max-w-[140px]">
                      <Globe size={12} className="text-[#00f0ff] shrink-0" />
                      <span className="truncate" title={proj.liveUrl}>
                        {proj.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "FOR ALL" COMPREHENSIVE PORTALS GRID */}
        <div className="mt-16 pt-12 border-t border-[#1f1f2e]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase block mb-1">
                INDEX FOR ALL VISITORS · RECRUITERS · COLLABORATORS
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                PORTFOLIO DIRECTORY &amp; NAVIGATION
              </h3>
            </div>
            <span className="text-xs font-mono text-[#888898]">
              8 COMPREHENSIVE SECTIONS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allSections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="text-left p-4 rounded-xl bg-[#12121a] hover:bg-[#181824] border border-[#20202e] hover:border-[#00f0ff]/40 transition-all duration-200 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-white group-hover:text-[#00f0ff] transition-colors">
                    {sec.label}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-[#666675] group-hover:text-[#00f0ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </div>
                <span className="text-[11px] text-[#888898] font-mono">
                  {sec.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* QUICK CONNECTIONS & ACTIONS */}
        <div className="mt-16 pt-12 border-t border-[#1f1f2e] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-xl font-bold font-mono tracking-tight text-white">
              CONNECT &amp; EXPLORE FURTHER
            </h4>
            <p className="text-xs sm:text-sm text-[#9999a4] leading-relaxed max-w-xl">
              Always open to discussing AI systems, kinetic UI design, research opportunities,
              and innovative engineering collaborations.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-wrap items-center justify-start lg:justify-end gap-3">
            <a
              href={`mailto:${portfolioData.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161622] hover:bg-[#222232] text-white border border-[#2e2e42] text-xs font-mono font-semibold transition-all hover:border-[#00f0ff]"
            >
              <Mail size={15} className="text-[#00f0ff]" />
              <span>{portfolioData.email}</span>
            </a>

            <a
              href={portfolioData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161622] hover:bg-[#222232] text-white border border-[#2e2e42] text-xs font-mono font-semibold transition-all hover:border-[#00f0ff]"
            >
              <Github size={15} className="text-[#00f0ff]" />
              <span>github.com/anirban-bhowmik-coder</span>
            </a>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00f0ff] hover:bg-[#3bf5ff] text-[#111114] text-xs font-mono font-bold transition-all shadow-lg shadow-[#00f0ff]/20"
              >
                <Award size={15} />
                <span>INSPECT VERIFIED RESUME</span>
              </button>
            )}
          </div>
        </div>

        {/* BOTTOM LEGAL & INTEGRITY ROW */}
        <div className="mt-16 pt-8 border-t border-[#181824] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#666675]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            <span className="text-[#9999a4]">
              Verified Portfolio Identity &middot; Anirban Bhowmik &middot; IILM University Greater Noida
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-[11px]">
            <span className="text-[#888894]">ENGINEERED IN REACT · THREE.JS · TYPESCRIPT</span>
            <span className="px-2.5 py-1 rounded bg-[#1c1c28] text-white border border-[#2e2e42] font-semibold text-emerald-400">
              &copy; {new Date().getFullYear()} ANIRBAN BHOWMIK &middot; ALL RIGHTS RESERVED
            </span>
          </div>
        </div>
        <div className="mt-3 text-center md:text-right text-[10px] font-mono text-[#555564]">
          All intellectual property, project creations, source code, and design architecture belong exclusively to Anirban Bhowmik.
        </div>
      </div>
    </footer>
  );
}
