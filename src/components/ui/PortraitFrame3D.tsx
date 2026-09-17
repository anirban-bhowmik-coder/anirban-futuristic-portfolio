import React, { useState, useRef, useEffect, type MouseEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Camera,
  Sparkles,
  ShieldCheck,
  Upload,
  RotateCcw,
  User,
  Lock,
  Unlock,
  Download,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { portfolioData } from "../../data/portfolio";
import { useOwnerAuth } from "../../utils/ownerAuth";
import { OwnerAuthModal } from "./OwnerAuthModal";

interface PortraitFrame3DProps {
  className?: string;
  showControls?: boolean;
}

export function PortraitFrame3D({ className = "", showControls = true }: PortraitFrame3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isOwner, logout } = useOwnerAuth();
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Fallback candidates to test automatically
  const [imageSrc, setImageSrc] = useState<string>(() => {
    return localStorage.getItem("anirban_portrait_image") || "/images/portrait.png";
  });
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // 3D Tilt & Parallax Physics State
  const [rotX, setRotX] = useState<number>(0);
  const [rotY, setRotY] = useState<number>(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50, intensity: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Check if saved image or default exists
  useEffect(() => {
    const testImg = new Image();
    testImg.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    testImg.onerror = () => {
      if (imageSrc === "/images/portrait.png") {
        const altImg = new Image();
        altImg.onload = () => {
          setImageSrc("/images/portrait.jpg");
          setImageLoaded(true);
          setImageError(false);
        };
        altImg.onerror = () => {
          setImageLoaded(false);
          setImageError(true);
        };
        altImg.src = "/images/portrait.jpg";
      } else {
        setImageLoaded(false);
        setImageError(true);
      }
    };
    testImg.src = imageSrc;
  }, [imageSrc]);

  // Handle Mouse Move for 3D Parallax & Specular Highlight
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const nextRotX = ((y - centerY) / centerY) * -12;
    const nextRotY = ((x - centerX) / centerX) * 12;

    setRotX(nextRotX);
    setRotY(nextRotY);

    setLightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      intensity: 0.22
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setLightPos((prev) => ({ ...prev, intensity: 0 }));
  };

  // Upload custom portrait handler (Protected by Owner Passkey)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isOwner) {
      setFeedback("Security alert: Only Anirban Bhowmik can upload or edit the portfolio portrait.");
      setShowAuthModal(true);
      if (e.target) e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImageSrc(dataUrl);
        setImageLoaded(true);
        setImageError(false);
        try {
          localStorage.setItem("anirban_portrait_image", dataUrl);
          setFeedback("Portrait updated and saved successfully in Owner Mode!");
          setTimeout(() => setFeedback(null), 4000);
        } catch {
          setFeedback("Portrait updated in memory!");
        }
      }
    };
    reader.readAsDataURL(file);
    if (e.target) e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!isOwner) {
      setFeedback("Security alert: Passkey required to upload or replace portfolio photo.");
      setShowAuthModal(true);
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setImageSrc(dataUrl);
          setImageLoaded(true);
          setImageError(false);
          try {
            localStorage.setItem("anirban_portrait_image", dataUrl);
            setFeedback("Portrait photo saved in Owner Mode!");
            setTimeout(() => setFeedback(null), 4000);
          } catch (err) {
            console.warn(err);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const resetToDefault = () => {
    if (!isOwner) {
      setShowAuthModal(true);
      return;
    }
    localStorage.removeItem("anirban_portrait_image");
    setImageSrc("/images/portrait.png");
    setFeedback("Portrait reset to default system file.");
    setTimeout(() => setFeedback(null), 3000);
  };

  const downloadForVercel = () => {
    if (!imageSrc) return;
    const a = document.createElement("a");
    a.href = imageSrc;
    a.download = "portrait.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setFeedback("Downloaded portrait.png! Place it in public/images/portrait.png in your repo for global Vercel hosting.");
    setTimeout(() => setFeedback(null), 5000);
  };

  const hasCustomUpload = typeof window !== "undefined" && !!localStorage.getItem("anirban_portrait_image");

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Hidden File Input for uploading authentic photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 3D Perspective Viewport */}
      <div
        style={{ perspective: "1400px" }}
        className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Layer 0: Depth Ambient Shadow (Backdrop) */}
        <div
          className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-[#00f0ff]/15 via-[#7000ff]/10 to-[#f59e0b]/10 blur-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.8 : 0.4,
            transform: `translate(${rotY * -1.5}px, ${rotX * 1.5}px)`
          }}
        />

        {/* Drag Overlay Hint */}
        {isDragging && (
          <div className="absolute inset-0 z-50 rounded-2xl bg-[#0c0c14]/90 border-2 border-dashed border-orange-400 backdrop-blur-sm flex flex-col items-center justify-center p-6 pointer-events-none">
            <Upload size={38} className="text-orange-400 animate-bounce mb-2" />
            <p className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              {isOwner ? "Drop New Portrait Image Here" : "Passkey Required to Drop Image"}
            </p>
            <p className="text-[10px] font-mono text-[#888898] mt-1">
              {isOwner ? "Accepts PNG, JPG, WEBP" : "Only Anirban Bhowmik can edit photo"}
            </p>
          </div>
        )}

        {/* Layer 1: The Main 3D Tilting Chassis */}
        <div
          ref={containerRef}
          style={{
            transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${isHovered ? 16 : 0}px)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.16s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease"
          }}
          className="relative w-full h-full rounded-2xl bg-[#111116] border border-[#2a2a36] shadow-2xl overflow-hidden p-2 sm:p-2.5 flex flex-col justify-between"
        >
          {/* Specular Glare */}
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-200 rounded-2xl"
            style={{
              background: `radial-gradient(circle 380px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, ${lightPos.intensity}), transparent 70%)`
            }}
          />

          {/* Holographic Scanline Overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

          {/* Tech Brackets */}
          <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] z-30" />
          <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] z-30" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff] z-30" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] z-30" />

          {/* Top HUD Status Bar */}
          <div
            style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
            className="flex items-center justify-between px-3 py-2 z-30 border-b border-[#22222d] bg-[#14141d]/90 backdrop-blur-md rounded-t-xl"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {isOwner ? (
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold flex items-center gap-1">
                  <Unlock size={10} />
                  <span>OWNER UNLOCKED</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck size={11} />
                  <span>AUTHENTIC PORTRAIT</span>
                </span>
              )}
            </div>

            <span className="text-[9px] font-mono text-[#777785] tracking-wider uppercase">
              STUDENT PROFILE
            </span>
          </div>

          {/* Image Display Surface */}
          <div
            style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
            className="relative flex-1 my-2 rounded-xl overflow-hidden bg-[#0c0c10] flex items-center justify-center border border-[#1e1e26]"
          >
            {imageLoaded && !imageError ? (
              <img
                src={imageSrc}
                alt="Anirban Bhowmik — CSE Undergraduate & AI/ML Researcher"
                className="w-full h-full object-cover object-top transition-transform duration-500"
                style={{
                  transform: `scale(${isHovered ? 1.04 : 1}) translate(${rotY * 0.4}px, ${rotX * -0.4}px)`
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#14141c] to-[#0c0c12]">
                <div className="relative mb-4 p-5 rounded-full bg-[#181822] border border-[#2b2b3b] shadow-inner">
                  <User size={56} className="text-[#00f0ff]" />
                  <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-[#00f0ff] text-[#111114]">
                    <Sparkles size={14} />
                  </div>
                </div>

                <h4 className="text-xl font-bold font-mono tracking-tight text-white mb-1">
                  ANIRBAN BHOWMIK
                </h4>
                <p className="text-xs font-mono text-[#00f0ff] mb-2">
                  Computer Science &amp; Engineering (AI/ML)
                </p>
                <p className="text-[11px] text-[#888894] max-w-xs leading-relaxed mb-4">
                  2nd Year Undergrad · IILM University Greater Noida · 8.21 CGPA
                </p>

                {isOwner ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-orange-500/20 cursor-pointer"
                  >
                    <Upload size={14} />
                    <span>Attach Portrait Image</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1c1c28] hover:bg-[#252536] text-[#c0c0d2] hover:text-white font-mono text-xs font-semibold border border-[#303046] transition-colors cursor-pointer"
                    title="Authenticate as Anirban Bhowmik"
                  >
                    <Lock size={13} className="text-orange-400" />
                    <span>Owner Unlock to Upload</span>
                  </button>
                )}
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111116] via-[#111116]/60 to-transparent z-10" />
          </div>

          {/* Bottom HUD Metadata Panel */}
          <div
            style={{ transform: "translateZ(45px)", transformStyle: "preserve-3d" }}
            className="px-3.5 py-3 z-30 bg-[#151520]/95 backdrop-blur-md rounded-b-xl border-t border-[#252533]"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                Anirban Bhowmik
              </span>
              <span className="text-[10px] font-mono text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-0.5 rounded border border-[#00f0ff]/20">
                CGPA 8.21
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#9999a4]">
              <span>B.Tech CSE (AI &amp; ML)</span>
              <span className="text-[#c0c0cc]">2nd Year / 3rd Sem</span>
            </div>

            <div className="mt-2 pt-2 border-t border-[#21212c] flex items-center justify-between text-[10px] font-mono text-[#666675]">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck size={12} />
                <span>Verified Identity</span>
              </span>
              <span>IILM University</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Banner */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2 max-w-sm text-center"
          >
            <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
            <span className="flex-1">{feedback}</span>
            <button
              onClick={() => setFeedback(null)}
              className="text-emerald-400 hover:text-white text-sm cursor-pointer ml-1"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Controls below 3D portrait frame */}
      {showControls && (
        <div className="mt-4">
          {isOwner ? (
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white border border-emerald-500/40 transition-all font-semibold cursor-pointer shadow-sm"
                title="Upload or replace your portrait photo"
              >
                <Upload size={13} />
                <span>Upload / Replace Photo</span>
              </button>

              {imageLoaded && (
                <button
                  type="button"
                  onClick={downloadForVercel}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1c1c28] hover:bg-[#252538] text-[#00f0ff] hover:text-white border border-[#00f0ff]/30 transition-all cursor-pointer"
                  title="Download as portrait.png to paste into public/images/ for permanent Vercel deployment"
                >
                  <Download size={13} />
                  <span>Export portrait.png</span>
                </button>
              )}

              {hasCustomUpload && (
                <button
                  type="button"
                  onClick={resetToDefault}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#1b1b26] text-[#9090a2] hover:text-white border border-[#2b2b3a] transition-colors cursor-pointer"
                  title="Reset custom portrait photo"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              )}

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#181822] hover:bg-[#20202e] text-[#a0a0b2] hover:text-white border border-[#2e2e40] transition-colors cursor-pointer"
                title="Exit Owner Mode and return to public read-only inspection"
              >
                <Lock size={12} className="text-orange-400" />
                <span>Lock</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 text-xs font-mono">
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#13131c] border border-[#232332] text-[#888898]">
                <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
                <span>Tamper-Proof Portrait · Anirban Bhowmik</span>
              </div>

              <button
                type="button"
                onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#181824] hover:bg-[#222232] text-[#a0a0b8] hover:text-white border border-[#29293d] transition-all cursor-pointer"
                title="Enter secret owner passkey to edit or upload portrait"
              >
                <Lock size={12} className="text-orange-400" />
                <span>Owner Unlock</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Owner Security Gate Modal */}
      <OwnerAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}