import { useState } from "react";
import { Mail, Github, ArrowUpRight, Copy, Check, Send, Sparkles, ArrowUp } from "lucide-react";
import { portfolioData } from "../../data/portfolio";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [senderSubject, setSenderSubject] = useState("");
  const [senderMessage, setSenderMessage] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${portfolioData.email}?subject=${encodeURIComponent(
      senderSubject || "Collaboration Inquiry with Anirban Bhowmik"
    )}&body=${encodeURIComponent(senderMessage)}`;
    window.location.href = mailtoUrl;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="contact" className="py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-[#d8ff42] text-[#111114] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Quick Move To Top in Header */}
        <div className="mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-xs font-mono tracking-widest text-[#111114] uppercase font-semibold">
              07 / INITIATE CONTACT &amp; COLLABORATION · FINAL SLIDE
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#111114] hover:bg-black text-[#d8ff42] hover:text-white rounded-full text-xs font-mono font-bold transition-all hover:scale-105 shadow-md shadow-black/10 cursor-pointer group"
              title="Return to top of portfolio"
            >
              <span>MOVE TO TOP</span>
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-9xl font-semibold tracking-tight leading-[0.82] max-w-5xl">
            LET’S BUILD<br />
            <em className="font-serif italic font-normal text-[#111114]/85">
              SOMETHING.
            </em>
          </h2>
        </div>

        {/* Contact Links & Quick Composer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-8 border-t border-[#111114]/20">
          {/* Left Column: Direct Links (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg md:text-xl text-[#111114]/90 font-medium max-w-xl leading-relaxed">
              Available for high-impact AI/ML research, computational graphics exploration,
              cybersecurity engineering, and ambitious software builds.
            </p>

            {/* Email Line with Copy Option */}
            <div className="bg-[#111114] text-[#f4f1eb] p-6 md:p-8 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#888894] block mb-1">
                  DIRECT EMAIL INBOX
                </span>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="text-lg sm:text-2xl font-mono font-semibold text-white hover:text-[#00f0ff] transition-colors break-all"
                >
                  {portfolioData.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyEmail}
                  className="px-4 py-2.5 bg-[#22222a] hover:bg-[#2e2e38] text-xs font-mono text-[#e0e0e8] rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy email address"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="p-2.5 bg-[#00f0ff] hover:bg-[#33f3ff] text-[#111114] rounded-xl transition-colors cursor-pointer"
                  aria-label="Send email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            {/* GitHub Line */}
            <a
              href={portfolioData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="group bg-[#111114] text-[#f4f1eb] p-6 md:p-8 rounded-2xl flex items-center justify-between gap-4 shadow-xl hover:bg-black transition-all cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#888894] block mb-1">
                  OPEN SOURCE &amp; EXPERIMENTS
                </span>
                <span className="text-lg sm:text-2xl font-mono font-semibold text-white group-hover:text-[#d8ff42] transition-colors">
                  github.com/anirban-bhowmik-coder
                </span>
              </div>
              <div className="p-2.5 bg-[#22222a] text-[#f4f1eb] group-hover:bg-[#d8ff42] group-hover:text-[#111114] rounded-xl transition-colors">
                <ArrowUpRight size={20} />
              </div>
            </a>
          </div>

          {/* Right Column: Direct Dispatch Composer (5 cols) */}
          <div className="lg:col-span-5 bg-[#111114] text-[#f4f1eb] p-6 md:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#d8ff42] mb-4">
              <Sparkles size={15} />
              <span>QUICK DISPATCH PROMPT</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Send a Message</h3>
            <p className="text-xs text-[#888894] mb-6">
              Pre-formats an email directly into your default email client.
            </p>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#a0a0aa] mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={senderSubject}
                  onChange={(e) => setSenderSubject(e.target.value)}
                  placeholder="e.g. AI/ML Engineering Collaboration"
                  className="w-full bg-[#1c1c24] border border-[#2b2b36] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#555562] focus:outline-none focus:border-[#d8ff42]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-[#a0a0aa] mb-1.5">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Describe your vision, inquiry, or engineering challenge..."
                  className="w-full bg-[#1c1c24] border border-[#2b2b36] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#555562] focus:outline-none focus:border-[#d8ff42] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#d8ff42] hover:bg-[#cbf731] text-[#111114] font-mono font-bold text-xs uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>OPEN DISPATCH CLIENT</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* GRAND FINALE SLIDE FOOTER & PROMINENT MOVE TO TOP BUTTON */}
        <div className="mt-20 pt-10 border-t border-[#111114]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#111114] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#111114]">
                END OF SLIDES · PORTFOLIO COMPLETED
              </span>
            </div>
            <span className="hidden sm:inline text-[#111114]/40 font-mono">|</span>
            <span className="text-xs font-mono font-semibold text-[#111114]">
              &copy; {new Date().getFullYear()} ANIRBAN BHOWMIK · ALL RIGHTS RESERVED
            </span>
          </div>

          {/* Prominent Move to Top Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#111114] hover:bg-black text-[#d8ff42] rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer group"
            title="Scroll all the way back to the top of the portfolio"
          >
            <span>MOVE TO TOP</span>
            <div className="w-7 h-7 rounded-full bg-[#d8ff42]/20 flex items-center justify-center group-hover:bg-[#d8ff42] group-hover:text-[#111114] transition-colors text-[#d8ff42]">
              <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>

        <div className="mt-4 text-center md:text-left text-[11px] font-mono text-[#111114]/75">
          All Rights Reserved to Anirban Bhowmik · B.Tech CSE (AI/ML) · IILM University, Greater Noida · No unauthorized replication permitted.
        </div>
      </div>
    </section>
  );
}
