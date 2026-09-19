import { useState, useEffect } from "react";
import { Menu, X, FileText, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingNavProps {
  onOpenResume: () => void;
}

const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "skills", label: "SKILLS" },
  { id: "credentials", label: "CREDENTIALS" },
  { id: "achievements", label: "ACHIEVEMENTS" },
  { id: "contact", label: "CONTACT" }
];

export function FloatingNav({ onOpenResume }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionElements = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-4 md:px-8 py-2.5 sm:py-4 pointer-events-none flex justify-center">
      <nav
        className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-[#111114]/90 backdrop-blur-md border border-[#2b2b36] shadow-xl text-[#f4f1eb]"
            : "bg-[#111114]/80 backdrop-blur-sm border border-[#2b2b36]/60 text-[#f4f1eb]"
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand */}
        <button
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-1.5 font-bold tracking-tight text-xs sm:text-sm font-mono text-white group cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] group-hover:scale-125 transition-transform" />
          <span>AB</span>
          <span className="text-[#00f0ff]">.</span>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1.5 text-[11px] font-mono tracking-wider transition-colors rounded-full cursor-pointer ${
                  isActive
                    ? "text-[#00f0ff] font-semibold"
                    : "text-[#a0a0aa] hover:text-[#f4f1eb]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Actions: Resume Button & Status indicator */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#f4f1eb] hover:bg-white text-[#111114] text-xs font-mono font-medium rounded-full transition-all hover:scale-105 cursor-pointer"
          >
            <FileText size={13} />
            <span>RESUME</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 sm:p-1.5 text-[#b0b0b8] hover:text-white rounded-md cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto fixed top-16 sm:top-20 left-3 right-3 sm:left-4 sm:right-4 bg-[#111114] border border-[#2b2b36] rounded-2xl p-4 sm:p-6 shadow-2xl z-50 text-[#f4f1eb] lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono tracking-wider rounded-xl transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? "bg-[#00f0ff]/10 text-[#00f0ff] font-bold"
                      : "text-[#c0c0ca] hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 mt-1.5 border-t border-[#22222b] flex items-center justify-between">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 sm:py-3 bg-[#f4f1eb] text-[#111114] rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer hover:bg-white transition-colors"
                >
                  <FileText size={15} />
                  <span>VIEW FULL RESUME</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
