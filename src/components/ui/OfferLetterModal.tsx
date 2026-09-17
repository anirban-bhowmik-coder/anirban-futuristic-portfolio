import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Award,
  Maximize2,
  Minimize2,
  FileCheck2,
  Download,
  Building,
  CheckCircle2,
  Upload,
  FileText,
  Trash2,
  Sparkles,
  RefreshCw,
  File,
  Eye,
  Lock,
  Unlock,
  KeyRound
} from "lucide-react";
import { YuvaInternOfferLetterDocument } from "../certificates/AuthenticDocuments";
import { experiences } from "../../data/experience";
import {
  getStoredOfferLetter,
  setStoredOfferLetter,
  removeStoredOfferLetter,
  getStoredOfferLetterMeta,
  setStoredOfferLetterMeta,
  removeStoredOfferLetterMeta,
  type OfferLetterMeta,
  CANDIDATE_OFFER_LETTER_PATHS
} from "../../utils/certificateStorage";
import { useOwnerAuth } from "../../utils/ownerAuth";
import { OwnerAuthModal } from "./OwnerAuthModal";

function dataUrlToBlob(dataUrl: string): Blob | null {
  try {
    const parts = dataUrl.split(";base64,");
    if (parts.length < 2) return null;
    const contentType = parts[0].replace("data:", "") || "application/octet-stream";
    const byteCharacters = atob(parts[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  } catch {
    return null;
  }
}

function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

interface OfferLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OfferLetterModal({ isOpen, onClose }: OfferLetterModalProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeTab, setActiveTab] = useState<"uploaded" | "digital" | "metadata">("uploaded");
  const [customFileUrl, setCustomFileUrl] = useState<string | null>(null);
  const [fileMeta, setFileMeta] = useState<OfferLetterMeta | null>(null);
  const [serverFileUrl, setServerFileUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isOwner, logout } = useOwnerAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exp = experiences[0];
  const offer = exp?.offerLetter;

  // Load uploaded file from storage or candidate paths
  useEffect(() => {
    if (!isOpen) return;

    // 1. Check local storage
    const stored = getStoredOfferLetter();
    const storedMeta = getStoredOfferLetterMeta();
    if (stored) {
      setCustomFileUrl(stored);
      setFileMeta(storedMeta);
      setActiveTab("uploaded");
    } else {
      setCustomFileUrl(null);
      setFileMeta(null);
      // If no custom upload yet, default to digital vector canvas
      setActiveTab("digital");
    }

    // 2. Check candidate server paths
    let found = false;
    for (const path of CANDIDATE_OFFER_LETTER_PATHS) {
      if (!path.endsWith(".svg")) {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          if (!found) {
            found = true;
            setServerFileUrl(path);
            if (!stored) {
              setActiveTab("uploaded");
            }
          }
        };
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (!isOwner) {
      setUploadFeedback("Restricted: Only Anirban Bhowmik is authorized to upload or edit portfolio documents.");
      setShowAuthModal(true);
      return;
    }

    // Check size limit (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadFeedback("File exceeds 10MB limit. Please upload a smaller scan.");
      return;
    }

    const meta: OfferLetterMeta = {
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream"
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setStoredOfferLetter(result);
        setStoredOfferLetterMeta(meta);
        setCustomFileUrl(result);
        setFileMeta(meta);
        setActiveTab("uploaded");
        setUploadFeedback(`Successfully loaded "${file.name}"!`);
        setTimeout(() => setUploadFeedback(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!isOwner) {
      setUploadFeedback("Restricted: Document modification is locked. Authenticate as Anirban Bhowmik to upload.");
      setShowAuthModal(true);
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isOwner) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveCustom = () => {
    if (!isOwner) {
      setUploadFeedback("Restricted: Only Anirban Bhowmik can remove this document.");
      setShowAuthModal(true);
      return;
    }
    removeStoredOfferLetter();
    removeStoredOfferLetterMeta();
    setCustomFileUrl(null);
    setFileMeta(null);
    setActiveTab("digital");
    setUploadFeedback("Uploaded document removed.");
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  const activeOriginalUrl = customFileUrl || serverFileUrl;
  const isPdf =
    fileMeta?.type === "application/pdf" ||
    activeOriginalUrl?.startsWith("data:application/pdf") ||
    activeOriginalUrl?.endsWith(".pdf");

  const handleOpenPdf = () => {
    if (!activeOriginalUrl) return;
    if (activeOriginalUrl.startsWith("data:")) {
      const blob = dataUrlToBlob(activeOriginalUrl);
      if (blob) {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      }
    } else {
      window.open(activeOriginalUrl, "_blank");
    }
  };

  const handleSafeDownload = () => {
    if (!activeOriginalUrl) {
      const a = document.createElement("a");
      a.href = "/certificates/yuvaintern-offer-letter.svg";
      a.download = "Anirban_Bhowmik_YuvaIntern_Offer_Letter.svg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    if (activeOriginalUrl.startsWith("data:")) {
      const blob = dataUrlToBlob(activeOriginalUrl);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = isPdf
          ? (fileMeta?.name || "Anirban_Bhowmik_Offer_Letter.pdf")
          : (fileMeta?.name || "Anirban_Bhowmik_Offer_Letter.png");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        return;
      }
    }

    const a = document.createElement("a");
    a.href = activeOriginalUrl;
    a.download = fileMeta?.name || "Anirban_Bhowmik_YuvaIntern_Offer_Letter";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#060609]/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf,.svg"
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.28 }}
          className={`relative z-10 w-full ${
            isZoomed ? "max-w-6xl" : "max-w-4xl"
          } bg-[#0d0d14] text-[#f4f1eb] rounded-2xl border border-[#2c2c3e] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-all duration-300`}
        >
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[#222232] flex items-center justify-between gap-4 bg-[#12121a]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold text-orange-400 tracking-wider uppercase">
                    OFFICIAL APPOINTMENT VALIDATION
                  </span>
                  {isOwner ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
                      <Unlock size={11} />
                      <span>OWNER MODE ACTIVE (ANIRBAN BHOWMIK)</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                      <Lock size={10} />
                      <span>PUBLIC INSPECTION (READ-ONLY)</span>
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white font-mono mt-0.5">
                  YuvaIntern · Junior Cyber Security Analyst (Sept 2026)
                </h3>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              {isOwner ? (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:scale-105"
                    title="Upload or replace offer letter document"
                  >
                    <Upload size={13} />
                    <span>Upload Scan</span>
                  </button>
                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202030] hover:bg-[#2b2b40] text-xs font-mono text-[#a0a0b2] hover:text-white border border-[#35354a] transition-all cursor-pointer"
                    title="Lock and return to public read-only mode"
                  >
                    <Lock size={12} className="text-orange-400" />
                    <span className="hidden sm:inline">Lock Mode</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a26] hover:bg-[#252538] text-xs font-mono text-[#c0c0d2] hover:text-white border border-[#2e2e42] transition-all cursor-pointer"
                  title="Authenticate as Anirban Bhowmik to edit or upload"
                >
                  <Lock size={12} className="text-orange-400" />
                  <span className="hidden sm:inline">Owner Unlock</span>
                </button>
              )}

              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1a1a26] hover:bg-[#252538] text-xs font-mono text-[#a0a0b2] border border-[#2b2b3c] transition-colors cursor-pointer"
                title={isZoomed ? "Exit zoom" : "Expand document"}
              >
                {isZoomed ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                <span>{isZoomed ? "Standard" : "Expand"}</span>
              </button>

              <button
                onClick={handleSafeDownload}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                title="Download Offer Letter"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#888898] hover:text-white hover:bg-[#202030] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Subheader / Tabs */}
          <div className="px-4 py-2.5 bg-[#0f0f16] border-b border-[#1f1f2e] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#888898]">
            <div className="flex items-center gap-1 sm:gap-2">
              {activeOriginalUrl && (
                <button
                  onClick={() => setActiveTab("uploaded")}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    activeTab === "uploaded"
                      ? "bg-[#1f1f30] text-orange-400 font-bold border border-orange-500/30"
                      : "hover:text-white"
                  }`}
                >
                  Uploaded Document Scan
                </button>
              )}

              <button
                onClick={() => setActiveTab("digital")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === "digital"
                    ? "bg-[#1f1f30] text-orange-400 font-bold border border-orange-500/30"
                    : "hover:text-white"
                }`}
              >
                Institutional Vector Canvas
              </button>

              <button
                onClick={() => setActiveTab("metadata")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  activeTab === "metadata"
                    ? "bg-[#1f1f30] text-orange-400 font-bold border border-orange-500/30"
                    : "hover:text-white"
                }`}
              >
                Verification Details &amp; Terms
              </button>
            </div>

            <div className="flex items-center gap-3">
              {isOwner && activeOriginalUrl ? (
                <button
                  onClick={handleRemoveCustom}
                  className="text-[11px] text-red-400/80 hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Remove uploaded document"
                >
                  <Trash2 size={11} />
                  <span>Remove Scan</span>
                </button>
              ) : (
                <span className="text-[11px] text-[#777788] hidden md:inline flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  <span>Verified Recruiter Inspection · Anirban Bhowmik</span>
                </span>
              )}
              <span className="text-[11px] text-[#777788] hidden md:inline">
                Issued: Sept 01, 2026 · Founder: Kounal Gupta
              </span>
            </div>
          </div>

          {/* Feedback alert banner */}
          {uploadFeedback && (
            <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                <span>{uploadFeedback}</span>
              </span>
              <button
                onClick={() => setUploadFeedback(null)}
                className="text-emerald-400 hover:text-emerald-200"
              >
                ×
              </button>
            </div>
          )}

          {/* Body Content */}
          <div className="p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#0a0a0f] flex-1">
            {/* TAB: UPLOADED SCAN */}
            {activeTab === "uploaded" && activeOriginalUrl && (
              <div className="space-y-4">
                <div className="p-3 bg-[#13131c] rounded-xl border border-[#242436] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={15} />
                    <span>Displaying authentic appointment document scan</span>
                  </div>
                  {isOwner && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw size={12} />
                        <span>Replace Scan</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 p-4 sm:p-8 rounded-2xl border border-white/10 flex justify-center items-center min-h-[420px] overflow-hidden">
                  {isPdf ? (
                    <div className="w-full max-w-2xl py-6 px-4 sm:px-8 flex flex-col items-center text-center space-y-5">
                      <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-xl shadow-red-500/5">
                        <FileText size={44} />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/25 uppercase tracking-wider flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            <span>OFFICIAL APPOINTMENT PDF LOADED</span>
                          </span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight">
                          {fileMeta?.name || "YuvaIntern_Appointment_Offer_Letter.pdf"}
                        </h4>
                        <p className="text-xs font-mono text-[#888898]">
                          {fileMeta?.size ? formatBytes(fileMeta.size) : "PDF Document"} · Verified YuvaIntern Appointment Offer Scan
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <button
                          onClick={handleOpenPdf}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-orange-500/20 cursor-pointer hover:scale-105"
                        >
                          <Eye size={15} />
                          <span>OPEN PDF IN FULL VIEWER</span>
                          <ExternalLink size={13} className="opacity-70" />
                        </button>

                        <button
                          onClick={handleSafeDownload}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#202030] hover:bg-[#2c2c40] text-white font-mono text-xs font-semibold border border-[#35354a] transition-all cursor-pointer hover:scale-105"
                        >
                          <Download size={15} className="text-orange-400" />
                          <span>DOWNLOAD ORIGINAL PDF</span>
                        </button>

                        <button
                          onClick={() => setActiveTab("digital")}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#161622] hover:bg-[#1e1e2c] text-[#a0a0b8] hover:text-white font-mono text-xs transition-all border border-[#262638] cursor-pointer"
                        >
                          <span>VIEW INSTANT VECTOR CANVAS</span>
                        </button>
                      </div>

                      {/* Edge-safe explanatory notice */}
                      <div className="pt-4 border-t border-white/5 text-[11px] font-mono text-[#777788] max-w-lg leading-relaxed">
                        <span>Protected by Edge and Chromium sandbox security. In-modal nested PDF iframes are restricted by browser policies. Use the buttons above to open the full PDF or view the exact </span>
                        <button
                          onClick={() => setActiveTab("digital")}
                          className="text-orange-400 underline font-semibold cursor-pointer"
                        >
                          Institutional Vector Canvas
                        </button>
                        <span> representation. (Image scans in PNG or JPG format render directly on-screen).</span>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={activeOriginalUrl}
                      alt="YuvaIntern Appointment Offer Letter Scan"
                      className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                    />
                  )}
                </div>
              </div>
            )}

            {/* TAB: DIGITAL VECTOR CANVAS */}
            {activeTab === "digital" && (
              <div className="space-y-4">
                <YuvaInternOfferLetterDocument />

                {/* Additional Note */}
                <div className="p-4 rounded-xl bg-[#14141d] border border-[#242432] text-xs font-mono text-[#888898] flex items-start gap-3 max-w-4xl mx-auto">
                  <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-semibold">Institutional Validation: </strong>
                    This offer letter confirms Anirban Bhowmik's appointment as Junior Cyber Security Analyst (E-Governance &amp; Digital Services) at YuvaIntern, certified with corporate presence in Dover (USA), Noida (India), and Dubai (UAE).
                  </p>
                </div>
              </div>
            )}

            {/* TAB: METADATA & TERMS */}
            {activeTab === "metadata" && (
              <div className="max-w-3xl mx-auto space-y-6">
                {/* Meta Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#13131c] border border-[#222230]">
                    <span className="text-xs font-mono text-[#888894] block mb-1">CANDIDATE</span>
                    <h4 className="text-lg font-bold text-white">Anirban Bhowmik</h4>
                    <p className="text-xs text-[#a0a0ae] mt-1 font-mono">
                      B.Tech CSE (AI/ML) · IILM University Greater Noida
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#13131c] border border-[#222230]">
                    <span className="text-xs font-mono text-[#888894] block mb-1">ROLE &amp; DIVISION</span>
                    <h4 className="text-lg font-bold text-orange-400">
                      Junior Cyber Security Analyst
                    </h4>
                    <p className="text-xs text-[#a0a0ae] mt-1 font-mono">
                      E-Governance &amp; Digital Services
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#13131c] border border-[#222230]">
                    <span className="text-xs font-mono text-[#888894] block mb-1">TENURE &amp; DURATION</span>
                    <h4 className="text-base font-bold text-white">
                      Sept 01, 2026 – Sept 29, 2026 (4 Weeks)
                    </h4>
                    <p className="text-xs text-[#a0a0ae] mt-1 font-mono">
                      Location: Remote · Status: COMPLETED
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#13131c] border border-[#222230]">
                    <span className="text-xs font-mono text-[#888894] block mb-1">AUTHORIZING SIGNATORY</span>
                    <h4 className="text-base font-bold text-white">Kounal Gupta</h4>
                    <p className="text-xs text-[#a0a0ae] mt-1 font-mono">
                      Founder, YuvaIntern.com (Official Seal &amp; Certified Stamp)
                    </p>
                  </div>
                </div>

                {/* Scope & Responsibilities */}
                <div className="p-5 rounded-xl bg-[#13131c] border border-[#222230]">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileCheck2 size={16} className="text-orange-400" />
                    <span>Charter &amp; Government Operations Scope</span>
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#b0b0be] leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Ensuring the security of digital platforms and services used in government operations.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Conducting structured vulnerability and access-control security assessments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Implementing defensive security measures and responding to cybersecurity incidents.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>Data integrity verification and compliance with e-governance cybersecurity regulations.</span>
                    </li>
                  </ul>
                </div>

                {/* Global Offices */}
                <div className="p-5 rounded-xl bg-[#13131c] border border-[#222230]">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Building size={16} className="text-orange-400" />
                    <span>Affiliated Entities &amp; Global Head Offices</span>
                  </h4>
                  <div className="space-y-2 text-xs font-mono text-[#9999a8]">
                    <p>• <strong>NSDC:</strong> National Skill Development Corporation · Re-Imagine Future</p>
                    <p>• <strong>USA:</strong> Henry Harvin Inc., 8 The Green, #19614 Dover, DE 19901</p>
                    <p>• <strong>India:</strong> Henry Harvin House, B-12, Sector-6, Noida(UP) 201301</p>
                    <p>• <strong>UAE:</strong> 2703, Blue Matrix, Prime Tower, Business Bay, Dubai</p>
                  </div>
                </div>
              </div>
            )}

            {/* INTEGRATED DRAG & DROP UPLOAD ZONE (Only active in Owner Mode) */}
            <div className="mt-8 pt-6 border-t border-[#1f1f2e]">
              {isOwner ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
                    isDragging
                      ? "border-orange-400 bg-orange-500/10 scale-[1.01]"
                      : "border-orange-500/40 hover:border-orange-400/80 bg-[#12121a]/70 hover:bg-[#151522]"
                  }`}
                >
                  <div className="max-w-md mx-auto flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-400 flex items-center justify-center mb-3 border border-orange-500/30">
                      <Upload size={22} />
                    </div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                        OWNER UPLOAD ACCESS UNLOCKED
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-white font-mono">
                      {activeOriginalUrl ? "Replace Appointment Letter (PDF/Image)" : "Upload Your Scanned Appointment Letter / PDF"}
                    </h4>
                    <p className="text-xs text-[#888898] mt-1 font-sans">
                      Drag and drop your file here, or click to browse.
                    </p>
                    <div className="mt-3 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-[#666675]">
                      <span className="px-2 py-0.5 rounded bg-[#1c1c28] text-[#a0a0b2]">PDF (Recommended)</span>
                      <span className="px-2 py-0.5 rounded bg-[#1c1c28] text-[#a0a0b2]">PNG / JPG</span>
                      <span className="px-2 py-0.5 rounded bg-[#1c1c28] text-[#a0a0b2]">Max 10MB</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#12121a] border border-[#242436] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Certified Tamper-Proof Portfolio Document
                        </span>
                        <span className="px-2 py-0.2 rounded text-[9px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          READ-ONLY
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#888898] mt-1 leading-relaxed">
                        Published by Anirban Bhowmik. Document modification and replacement privileges are strictly locked for public visitors.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-4 py-2 rounded-xl bg-[#1c1c2a] hover:bg-[#252538] text-xs font-mono text-[#a0a0b8] hover:text-white border border-[#2d2d42] flex items-center gap-2 transition-all cursor-pointer shrink-0"
                    title="Authenticate as Anirban Bhowmik"
                  >
                    <Lock size={13} className="text-orange-400" />
                    <span>Owner Unlock</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-[#12121a] border-t border-[#222232] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-[#888898] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Validated Document · Issue Date: September 01, 2026 · YuvaIntern</span>
            </span>

            <div className="flex items-center gap-2">
              {isOwner ? (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 font-mono text-xs font-semibold border border-orange-500/40 transition-colors cursor-pointer"
                  >
                    Upload / Replace Document
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 rounded-xl bg-[#202030] hover:bg-[#2b2b40] text-[#a0a0b2] hover:text-white font-mono text-xs border border-[#35354a] transition-colors cursor-pointer"
                  >
                    Exit Owner Mode
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSafeDownload}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                >
                  <Download size={13} />
                  <span>Download Document</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl bg-[#202030] hover:bg-[#2c2c40] text-white font-medium transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </motion.div>

        {/* Owner Security Gate Modal */}
        <OwnerAuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    </AnimatePresence>
  );
}
