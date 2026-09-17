import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Award,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Upload,
  FileImage,
  RefreshCw,
  FileCheck2,
  Download,
  FileText,
  Lock,
  Unlock
} from "lucide-react";
import type { CredentialItem, LeadershipItem } from "../../data/credentials";
import {
  getStoredCertificate,
  setStoredCertificate,
  removeStoredCertificate,
  dataUrlToBlob,
  CANDIDATE_ASSET_PATHS
} from "../../utils/certificateStorage";
import { useOwnerAuth } from "../../utils/ownerAuth";
import { OwnerAuthModal } from "./OwnerAuthModal";
import {
  OracleDocument,
  HpLifeDocument,
  IcisescDocument,
  DeloitteDocument,
  TataDocument
} from "../certificates/AuthenticDocuments";

interface CertificateModalProps {
  item: CredentialItem | LeadershipItem | null;
  onClose: () => void;
}

export function CertificateModal({ item, onClose }: CertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [customFileUrl, setCustomFileUrl] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"original" | "digital">("original");
  const [isDragging, setIsDragging] = useState(false);
  const [serverFileUrl, setServerFileUrl] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { isOwner, logout } = useOwnerAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isCredential = item ? "credentialId" in item || "issueDate" in item : false;
  const credential = isCredential ? (item as CredentialItem) : null;
  const leadership = !isCredential && item ? (item as LeadershipItem) : null;

  const itemId = item?.id || "";
  const identifier = credential?.credentialId || credential?.serialNumber || leadership?.dates;

  // Check storage and candidate server paths on item change
  useEffect(() => {
    if (!itemId) return;

    // 1. Check local browser storage for user-uploaded genuine file
    const stored = getStoredCertificate(itemId);
    if (stored) {
      setCustomFileUrl(stored);
      setViewMode("original");
    } else {
      setCustomFileUrl(null);
    }

    // 2. Check candidate server file paths (e.g., if user placed image.png in public/certificates/)
    const candidates = CANDIDATE_ASSET_PATHS[itemId] || [];
    let found = false;

    for (const path of candidates) {
      if (!path.endsWith(".svg")) {
        const img = new Image();
        img.src = path;
        img.onload = () => {
          if (!found) {
            found = true;
            setServerFileUrl(path);
            setViewMode("original");
          }
        };
      }
    }
  }, [itemId]);

  if (!item) return null;

  const handleCopyId = () => {
    if (identifier) {
      navigator.clipboard.writeText(identifier);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    if (!isOwner) {
      setFeedback("Only Anirban Bhowmik is authorized to upload or edit certificates.");
      setShowAuthModal(true);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setStoredCertificate(itemId, result);
        setCustomFileUrl(result);
        setViewMode("original");
        setFeedback("Certificate file attached successfully!");
        setTimeout(() => setFeedback(null), 3000);
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
      setFeedback("Certificate modifications locked. Authenticate as Anirban Bhowmik to modify.");
      setShowAuthModal(true);
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleRemoveCustom = () => {
    if (!isOwner) {
      setFeedback("Only Anirban Bhowmik is authorized to remove certificates.");
      setShowAuthModal(true);
      return;
    }
    removeStoredCertificate(itemId);
    setCustomFileUrl(null);
    setViewMode("digital");
    setFeedback("Custom attachment removed.");
    setTimeout(() => setFeedback(null), 3000);
  };

  // Determine active visual document
  const activeOriginalUrl = customFileUrl || serverFileUrl;

  const renderDigitalDocument = () => {
    switch (itemId) {
      case "oracle-genai-professional":
        return <OracleDocument />;
      case "hp-life-strategic-ai":
        return <HpLifeDocument />;
      case "icissesc-2026-volunteer":
        return <IcisescDocument />;
      case "deloitte-data-analytics":
        return <DeloitteDocument />;
      case "tata-data-analytics":
        return <TataDocument />;
      default:
        return item.certificatePath ? (
          <img
            src={item.certificatePath}
            alt={credential?.title || leadership?.role}
            className="w-full h-auto rounded shadow-xl"
          />
        ) : null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050508]/92 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#111116] border border-[#262635] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto text-[#f4f1eb]"
        >
          {/* Top Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-[#20202c] bg-[#15151e]">
            <div className="flex items-center gap-3">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#00f0ff]">
                    GENUINE ACCREDITATION RECORD
                  </span>
                  {isOwner ? (
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                      <Unlock size={10} />
                      <span>OWNER MODE ACTIVE</span>
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-bold bg-[#1d1d28] text-[#9090a8] px-2 py-0.5 rounded border border-[#2e2e40] flex items-center gap-1">
                      <Lock size={10} />
                      <span>PUBLIC INSPECTION</span>
                    </span>
                  )}
                  {activeOriginalUrl && (
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/25 hidden md:inline">
                      SCANNED FILE
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate max-w-xs sm:max-w-md md:max-w-lg">
                  {credential ? credential.title : leadership?.role}
                </h3>
              </div>
            </div>

            {/* View Mode Switcher and Actions */}
            <div className="flex items-center gap-2">
              {/* Toggle Original vs Digital */}
              {activeOriginalUrl && (
                <div className="flex items-center bg-[#1d1d28] p-0.5 rounded-lg border border-[#2e2e40] text-xs font-mono">
                  <button
                    onClick={() => setViewMode("original")}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      viewMode === "original"
                        ? "bg-[#00f0ff] text-slate-950 font-bold"
                        : "text-[#a0a0b0] hover:text-white"
                    }`}
                  >
                    Original Scan
                  </button>
                  <button
                    onClick={() => setViewMode("digital")}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      viewMode === "digital"
                        ? "bg-[#00f0ff] text-slate-950 font-bold"
                        : "text-[#a0a0b0] hover:text-white"
                    }`}
                  >
                    Digital Facsimile
                  </button>
                </div>
              )}

              {/* Owner Actions vs Public Access */}
              {isOwner ? (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-[#20202e] hover:bg-[#2b2b3e] text-xs text-[#00f0ff] hover:text-white rounded-lg transition-colors flex items-center gap-1.5 font-mono border border-[#00f0ff]/30 cursor-pointer"
                    title="Attach or replace with your original scanned certificate image/PDF"
                  >
                    <Upload size={13} />
                    <span className="hidden sm:inline">
                      {customFileUrl ? "Replace File" : "Attach File"}
                    </span>
                  </button>

                  {customFileUrl && (
                    <button
                      onClick={handleRemoveCustom}
                      className="px-2 py-1.5 text-xs text-red-400 hover:text-red-300 font-mono transition-colors cursor-pointer"
                      title="Remove custom scan"
                    >
                      Remove
                    </button>
                  )}

                  <button
                    onClick={logout}
                    className="px-2 py-1.5 bg-[#20202c] hover:bg-[#28283a] text-xs text-[#a0a0b2] hover:text-white rounded-lg font-mono border border-[#303042] flex items-center gap-1 cursor-pointer"
                    title="Exit Owner Mode"
                  >
                    <Lock size={12} className="text-orange-400" />
                    <span className="hidden md:inline">Lock</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-2.5 py-1.5 bg-[#1a1a26] hover:bg-[#242436] text-xs text-[#b0b0c2] hover:text-white rounded-lg transition-colors flex items-center gap-1.5 font-mono border border-[#2d2d40] cursor-pointer"
                  title="Authenticate as Anirban Bhowmik"
                >
                  <Lock size={12} className="text-orange-400" />
                  <span className="hidden sm:inline">Owner Unlock</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />

              {/* Zoom Button */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="p-2 text-[#a5a5b2] hover:text-white hover:bg-[#252532] rounded-lg transition-colors hidden sm:block cursor-pointer"
                title={isZoomed ? "Reset Zoom" : "Zoom"}
              >
                {isZoomed ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 text-[#a5a5b2] hover:text-white hover:bg-[#252532] rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Feedback alert banner */}
          {feedback && (
            <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 text-xs font-mono text-emerald-300 flex items-center justify-between">
              <span>{feedback}</span>
              <button
                onClick={() => setFeedback(null)}
                className="text-emerald-400 hover:text-emerald-200"
              >
                ×
              </button>
            </div>
          )}

          {/* Certificate Viewport Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              if (isOwner) setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-4 sm:p-6 md:p-8 bg-[#0a0a0d] flex flex-col items-center justify-center min-h-[420px] max-h-[72vh] overflow-auto relative transition-colors ${
              isDragging && isOwner ? "bg-[#141d24] border-2 border-dashed border-[#00f0ff]" : ""
            }`}
          >
            {/* Drag Overlay hint (only when owner) */}
            {isDragging && isOwner && (
              <div className="absolute inset-0 bg-[#0a0a0d]/90 flex flex-col items-center justify-center z-20 pointer-events-none">
                <Upload size={48} className="text-[#00f0ff] animate-bounce mb-3" />
                <p className="text-sm font-mono text-[#00f0ff] font-bold">
                  Drop Genuine Certificate File Here (PNG, JPG, PDF)
                </p>
              </div>
            )}

            {/* Document Content View */}
            <div
              className={`w-full transition-transform duration-300 flex items-center justify-center ${
                isZoomed ? "max-w-none scale-125 my-12" : "max-w-4xl"
              }`}
            >
              {viewMode === "original" && activeOriginalUrl ? (
                <div className="w-full flex flex-col items-center">
                  {activeOriginalUrl.startsWith("data:application/pdf") || activeOriginalUrl.endsWith(".pdf") ? (
                    <div className="py-8 px-6 bg-[#151520] rounded-xl border border-[#2b2b3b] text-center space-y-4 max-w-md w-full my-6">
                      <div className="w-16 h-16 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 mx-auto">
                        <FileText size={36} />
                      </div>
                      <div>
                        <h4 className="text-white font-mono font-bold text-sm">Genuine PDF Document Attached</h4>
                        <p className="text-xs font-mono text-[#888898] mt-1">Verified Certificate Document</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center pt-2">
                        <button
                          onClick={() => {
                            if (activeOriginalUrl.startsWith("data:")) {
                              const blob = dataUrlToBlob(activeOriginalUrl);
                              if (blob) {
                                const u = URL.createObjectURL(blob);
                                window.open(u, "_blank");
                                setTimeout(() => URL.revokeObjectURL(u), 60000);
                              }
                            } else {
                              window.open(activeOriginalUrl, "_blank");
                            }
                          }}
                          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-mono font-bold transition-all cursor-pointer"
                        >
                          Open PDF in New Tab
                        </button>
                        <button
                          onClick={() => setViewMode("digital")}
                          className="px-4 py-2 bg-[#252535] hover:bg-[#303045] text-white rounded-lg text-xs font-mono transition-all cursor-pointer"
                        >
                          View Digital Replica
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={activeOriginalUrl}
                      alt={credential?.title || leadership?.role || "Original Certificate"}
                      className="max-h-[62vh] w-auto max-w-full rounded-lg shadow-2xl border border-[#2b2b3b] object-contain"
                    />
                  )}
                  <div className="mt-3 flex items-center gap-3 text-xs font-mono text-[#888898]">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <Check size={12} />
                      Displaying Genuine Scanned Certificate File
                    </span>
                    {customFileUrl && (
                      <button
                        onClick={handleRemoveCustom}
                        className="text-red-400 hover:text-red-300 underline"
                      >
                        Reset to default
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* Authentic Pixel-Identical Document */
                <div className="w-full">{renderDigitalDocument()}</div>
              )}
            </div>
          </div>

          {/* Footer Metadata & Institutional Verification */}
          <div className="px-6 py-4 bg-[#14141c] border-t border-[#22222e]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              {/* Col 1: Institutional Authority */}
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#777785] uppercase block mb-1">
                  ISSUING BODY
                </span>
                <span className="font-semibold text-white block">
                  {credential ? credential.issuer : leadership?.organization}
                </span>
                {leadership && (
                  <span className="text-[10px] text-amber-300 font-mono block mt-0.5">
                    {leadership.recognition}
                  </span>
                )}
              </div>

              {/* Col 2: Date & Status */}
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#777785] uppercase block mb-1">
                  ISSUANCE TIMELINE
                </span>
                <div className="flex items-center gap-1.5 text-white">
                  <Calendar size={13} className="text-[#00f0ff]" />
                  <span>{credential ? credential.issueDate : leadership?.dates}</span>
                </div>
                {credential?.validUntil && (
                  <span className="text-[10px] text-[#888896] block mt-0.5 font-mono">
                    Valid Until: {credential.validUntil}
                  </span>
                )}
              </div>

              {/* Col 3 & 4: Serial / Verification Identifier */}
              <div className="sm:col-span-2">
                <span className="text-[10px] font-mono tracking-widest text-[#777785] uppercase block mb-1">
                  VERIFICATION IDENTIFIER / CREDENTIAL ID
                </span>
                {identifier ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#00f0ff] bg-[#00f0ff]/10 px-2.5 py-1 rounded border border-[#00f0ff]/20 truncate">
                      {identifier}
                    </span>
                    <button
                      onClick={handleCopyId}
                      className="p-1.5 bg-[#20202c] hover:bg-[#2c2c3e] text-[#c0c0d0] rounded transition-colors flex items-center gap-1 text-[11px] font-mono shrink-0"
                      title="Copy credential ID"
                    >
                      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                    <ShieldCheck size={14} />
                    <span>Audited &amp; Authenticated</span>
                  </div>
                )}
              </div>
            </div>

            {/* Core Domain Skills */}
            {credential && credential.skills && (
              <div className="mt-3 pt-3 border-t border-[#20202a] flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase text-[#777785] mr-2">Verified Competencies:</span>
                {credential.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[10px] font-mono bg-[#1b1b26] text-[#c2c2cf] rounded border border-[#2b2b3b]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
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
