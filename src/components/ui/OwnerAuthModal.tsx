import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  X,
  CheckCircle2,
  AlertTriangle,
  Eye,
  EyeOff,
  UserCheck
} from "lucide-react";
import {
  authenticateOwner,
  logoutOwner,
  isOwnerAuthenticated,
  DEFAULT_MASTER_PASSCODE,
  OWNER_NAME,
  OWNER_EMAIL
} from "../../utils/ownerAuth";

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function OwnerAuthModal({ isOpen, onClose, onSuccess }: OwnerAuthModalProps) {
  const [passcode, setPasscode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const isCurrentlyOwner = isOwnerAuthenticated();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const res = authenticateOwner(passcode);
    if (res.success) {
      setSuccessMsg(res.message);
      setPasscode("");
      setTimeout(() => {
        setSuccessMsg(null);
        onSuccess?.();
        onClose();
      }, 1000);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleLogout = () => {
    logoutOwner();
    setSuccessMsg("Owner mode locked. Portfolio returned to public read-only inspection.");
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-[#111118] border border-[#2d2d3e] rounded-2xl shadow-2xl overflow-hidden z-10 text-[#f4f1eb]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#222232] flex items-center justify-between bg-[#151520]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Lock size={18} />
              </div>
              <div>
                <h3 className="text-sm font-mono font-bold text-white tracking-wide uppercase">
                  Owner Access Gate
                </h3>
                <p className="text-[11px] font-mono text-[#888898]">
                  Portfolio Document Integrity Security
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#888898] hover:text-white hover:bg-[#202030] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Identity badge */}
            <div className="p-3.5 rounded-xl bg-[#181824] border border-[#29293d] flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
                <UserCheck size={20} />
              </div>
              <div className="text-xs font-mono">
                <span className="text-[#888898] block text-[10px] uppercase tracking-wider">
                  Authorized Owner &amp; Author
                </span>
                <span className="text-white font-bold block">{OWNER_NAME}</span>
                <span className="text-orange-400/90 text-[11px]">{OWNER_EMAIL}</span>
              </div>
            </div>

            {/* Explanation */}
            <p className="text-xs font-mono text-[#9999aa] leading-relaxed">
              To protect verified credentials from unauthorized changes, document uploads and edits are restricted. Recruiter and public visitors have strict <strong>read-only</strong> inspection access.
            </p>

            {/* State: Already Authenticated */}
            {isCurrentlyOwner ? (
              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-start gap-3">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-400" />
                  <div>
                    <strong className="block font-bold">Owner Privileges Active</strong>
                    <span>You are authenticated as Anirban Bhowmik. You can upload, replace, or delete your credentials and offer letter.</span>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock size={14} />
                    <span>Lock / Exit Owner Mode</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="py-2.5 px-5 rounded-xl bg-[#202030] hover:bg-[#28283c] text-white font-mono text-xs font-semibold border border-[#35354a] transition-all cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </div>
            ) : (
              /* State: Login Form */
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-[#aaaaee] block font-semibold">
                    Enter Owner Passkey:
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#777788]">
                      <KeyRound size={15} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter passkey (e.g. anirban2026)"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#161622] border border-[#2e2e42] focus:border-orange-500 focus:outline-none text-white text-xs font-mono placeholder:text-[#555566]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#777788] hover:text-white"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <p className="text-[10px] font-mono text-[#777788] pt-1">
                    Default Master Passkey: <code className="text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded font-bold">{DEFAULT_MASTER_PASSCODE}</code>
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertTriangle size={15} className="shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                  >
                    <Unlock size={14} />
                    <span>Unlock Owner Mode</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="py-2.5 px-4 rounded-xl bg-[#1b1b26] hover:bg-[#242434] text-[#a0a0b2] hover:text-white font-mono text-xs transition-all border border-[#2b2b3a] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
