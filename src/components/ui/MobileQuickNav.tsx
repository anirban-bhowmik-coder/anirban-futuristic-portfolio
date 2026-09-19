import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  User,
  Layers,
  Sparkles,
  ShieldCheck,
  Mail,
  FileText,
  ArrowUp,
  Award
} from "lucide-react";

interface MobileQuickNavProps {
  onOpenResume: () => void;
}

const quickNavItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "work", label: "Work", icon: Layers },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "credentials", label: "Proof", icon: ShieldCheck },
  { id: "achievements", label: "Awards", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

export function MobileQuickNav({ onOpenResume }: MobileQuickNavProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 350);

      const sectionElements = quickNavItems.map((item) => document.getElementById(item.id));
      const scrollPosition = scrollY + 220;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(quickNavItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-3 z-40 pointer-events-none flex flex-col items-center">
      {/* Floating Scroll-to-Top Mini Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onClick={scrollToTop}
            className="pointer-events-auto mb-2 px-3 py-1.5 rounded-full bg-[#111116]/95 border border-[#333345] text-[#f4f1eb] text-[10px] font-mono font-bold shadow-xl flex items-center gap-1.5 hover:border-[#00f0ff] cursor-pointer backdrop-blur-md"
            title="Scroll back to top"
          >
            <ArrowUp size={12} className="text-[#00f0ff]" />
            <span>TOP</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Mobile Dock Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="pointer-events-auto w-full max-w-md bg-[#111116]/95 border border-[#2b2b3a] rounded-2xl shadow-2xl backdrop-blur-xl p-1.5 flex items-center justify-between gap-1 text-[#f4f1eb]"
      >
        {/* Navigation Item Icons */}
        <div className="flex items-center justify-around flex-1">
          {quickNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all min-w-[40px] min-h-[44px] cursor-pointer ${
                  isActive
                    ? "text-[#00f0ff] font-bold"
                    : "text-[#888898] hover:text-[#f4f1eb]"
                }`}
                title={item.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobileNavIndicator"
                    className="absolute inset-0 bg-[#00f0ff]/10 rounded-xl border border-[#00f0ff]/30 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <Icon size={16} />
                <span className="text-[9px] font-mono tracking-tight mt-0.5 leading-none">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-[#272736] mx-0.5 shrink-0" />

        {/* Quick Resume Button */}
        <button
          onClick={onOpenResume}
          className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-mono font-bold flex flex-col items-center justify-center min-h-[44px] shrink-0 shadow-sm cursor-pointer"
          title="Open Anirban's Verified Resume"
        >
          <FileText size={14} />
          <span className="leading-none mt-0.5">CV</span>
        </button>
      </nav>
    </div>
  );
}
