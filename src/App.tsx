import { useState } from "react";
import { FloatingNav } from "./components/ui/FloatingNav";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { WorkSection } from "./components/sections/WorkSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { CredentialsSection } from "./components/sections/CredentialsSection";
import { AchievementsSection } from "./components/sections/AchievementsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { Footer3D } from "./components/sections/Footer3D";
import { ProjectModal } from "./components/ui/ProjectModal";
import { ResumeModal } from "./components/ui/ResumeModal";
import type { Project } from "./data/projects";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#111114] selection:bg-[#00f0ff] selection:text-[#111114]">
      {/* Floating Pill Navigation */}
      <FloatingNav onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Flow of Sections */}
      <main>
        {/* 00 / Hero with real 3D Kinetic Mesh */}
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* 01 / About: A Student Who Builds */}
        <AboutSection />

        {/* 02 / Selected Work: 3D Perspective Experience */}
        <WorkSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 03 / Experience: YuvaIntern Junior Cyber Security Analyst */}
        <ExperienceSection />

        {/* 04 / Skills: Interactive Constellation & Learning Trajectory */}
        <SkillsSection />

        {/* 05 / Credentials & Recognition: Proof of Progress */}
        <CredentialsSection />

        {/* 06 / Achievements: SIH Round 3 & Academic Standing */}
        <AchievementsSection />

        {/* Remarkable 3D Footer for All Visitors */}
        <Footer3D onOpenResume={() => setIsResumeOpen(true)} />

        {/* 07 / INITIATE CONTACT & COLLABORATION: Final Slide with Move to Top Button */}
        <ContactSection />
      </main>

      {/* Interactive Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
