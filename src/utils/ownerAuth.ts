import { useState, useEffect } from "react";

const OWNER_TOKEN_KEY = "anirban_portfolio_owner_token";
const OWNER_PASSCODE_KEY = "anirban_portfolio_owner_passcode";

// Private Passkey for Anirban Bhowmik
export const DEFAULT_MASTER_PASSCODE = "ayan12389*";
export const OWNER_EMAIL = "anirbanboy905@gmail.com";
export const OWNER_NAME = "Anirban Bhowmik";

export function getStoredOwnerPasscode(): string {
  try {
    return localStorage.getItem(OWNER_PASSCODE_KEY) || DEFAULT_MASTER_PASSCODE;
  } catch {
    return DEFAULT_MASTER_PASSCODE;
  }
}

export function isOwnerAuthenticated(): boolean {
  try {
    const token = localStorage.getItem(OWNER_TOKEN_KEY);
    if (!token) return false;
    return token === "verified_owner_anirban_bhowmik";
  } catch {
    return false;
  }
}

export function authenticateOwner(enteredPasscode: string): { success: boolean; message: string } {
  const currentPasscode = getStoredOwnerPasscode();
  const trimmed = enteredPasscode.trim();

  // Strictly verify against the secret owner passkey
  if (trimmed === currentPasscode || trimmed === DEFAULT_MASTER_PASSCODE) {
    try {
      localStorage.setItem(OWNER_TOKEN_KEY, "verified_owner_anirban_bhowmik");
      window.dispatchEvent(new Event("owner-auth-changed"));
      return {
        success: true,
        message: "Owner access verified. Welcome, Anirban!"
      };
    } catch {
      return { success: false, message: "Storage access denied." };
    }
  }

  return {
    success: false,
    message: "Access denied. Invalid passkey."
  };
}

export function logoutOwner(): void {
  try {
    localStorage.removeItem(OWNER_TOKEN_KEY);
    window.dispatchEvent(new Event("owner-auth-changed"));
  } catch {
    // ignore
  }
}

export function updateOwnerPasscode(newPasscode: string): boolean {
  if (!newPasscode || newPasscode.trim().length < 4) return false;
  try {
    localStorage.setItem(OWNER_PASSCODE_KEY, newPasscode.trim());
    return true;
  } catch {
    return false;
  }
}

export function useOwnerAuth() {
  const [isOwner, setIsOwner] = useState<boolean>(() => isOwnerAuthenticated());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsOwner(isOwnerAuthenticated());
    };

    window.addEventListener("owner-auth-changed", handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener("owner-auth-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return {
    isOwner,
    isAuthModalOpen,
    openAuthModal: () => setIsAuthModalOpen(true),
    closeAuthModal: () => setIsAuthModalOpen(false),
    login: authenticateOwner,
    logout: logoutOwner,
    ownerName: OWNER_NAME,
    ownerEmail: OWNER_EMAIL
  };
}