import React, { useState, useRef, useEffect, type MouseEvent, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { Camera, Sparkles, ShieldCheck, Upload, RotateCcw, User, Eye } from "lucide-react";
import { portfolioData } from "../../data/portfolio";

interface PortraitFrame3DProps {
  className?: string;
  showControls?: boolean;
}

export function PortraitFrame3D({ className = "", showControls = true }: PortraitFrame3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      // If default /images/portrait.png fails, try alternative paths
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

    // Angle limit: -14 to +14 deg
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

  // Upload custom portrait handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setImageSrc(dataUrl);
        setImageLoaded(true);
        setImageError(false);
        try {
          localStorage.setItem("anirban_portrait_image", dataUrl);
        } catch (err) {
          console.warn("Could not save to localStorage due to size limit", err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const resetToDefault = () => {
    localStorage.removeItem("anirban_portrait_image");
    setImageSrc("/images/portrait.png");
  };

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
      >
        {/* Layer 0: Depth Ambient Shadow (Backdrop) */}
        <div
          className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-[#00f0ff]/15 via-[#7000ff]/10 to-[#f59e0b]/10 blur-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.8 : 0.4,
            transform: `translate(${rotY * -1.5}px, ${rotX * 1.5}px)`
          }}
        />

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
          {/* Real Specular Glare & Lighting Plane */}
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-200 rounded-2xl"
            style={{
              background: `radial-gradient(circle 380px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, ${lightPos.intensity}), transparent 70%)`
            }}
          />

          {/* Holographic Scanline Overlay */}
          <div className="pointer-events-none absolute inset-0 z-20 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

          {/* Holographic Corner Tech Brackets */}
          <div className="pointer-events-none absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff] z-30" />
          <div className="pointer-events-none absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff] z-30" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff] z-30" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff] z-30" />

          {/* Top HUD Status Bar (Elevated in 3D: Z = 35px) */}
          <div
            style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
            className="flex items-center justify-between px-3 py-2 z-30 border-b border-[#22222d] bg-[#14141d]/90 backdrop-blur-md rounded-t-xl"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-semibold">
                AUTHENTIC PORTRAIT
              </span>
            </div>

            <span className="text-[9px] font-mono text-[#777785] tracking-wider uppercase">
              STUDENT PROFILE
            </span>
          </div>

          {/* Image Display Surface (Z = 20px) */}
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
              /* High-Tech Student Avatar Placeholder if image not loaded yet */
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

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00f0ff] hover:bg-[#38f8ff] text-[#111114] font-mono text-xs font-bold transition-colors shadow-lg shadow-[#00f0ff]/20"
                >
                  <Upload size={14} />
                  <span>Attach Portrait Image</span>
                </button>
              </div>
            )}

            {/* Depth Ambient Rim Light (Gradient from bottom) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#111116] via-[#111116]/60 to-transparent z-10" />
          </div>

          {/* Bottom HUD Metadata Panel (Elevated in 3D: Z = 45px) */}
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

      {/* Interactive Controls below 3D portrait frame */}
      {showControls && (
        <div className="mt-4 flex items-center gap-3 text-xs font-mono">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181822] hover:bg-[#222230] text-[#c0c0cc] hover:text-white border border-[#2b2b3b] transition-colors"
          >
            <Upload size={13} />
            <span>Select / Update Portrait</span>
          </button>

          {imageLoaded && (
            <button
              type="button"
              onClick={resetToDefault}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[#777785] hover:text-[#c0c0cc] transition-colors text-[11px]"
              title="Reset to default image"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
