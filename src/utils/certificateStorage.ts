/**
 * Certificate Storage & Resolver
 * Manages original uploaded certificates (via local storage or file system)
 * Allows users to upload their actual scanned certificates / PDFs directly
 */

const STORAGE_PREFIX = "anirban_cert_";
const OFFER_LETTER_STORAGE_KEY = "anirban_offer_letter_custom";
const OFFER_LETTER_META_KEY = "anirban_offer_letter_meta";

export interface OfferLetterMeta {
  name: string;
  size: number;
  type: string;
}

export function getStoredOfferLetterMeta(): OfferLetterMeta | null {
  try {
    const data = localStorage.getItem(OFFER_LETTER_META_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setStoredOfferLetterMeta(meta: OfferLetterMeta): void {
  try {
    localStorage.setItem(OFFER_LETTER_META_KEY, JSON.stringify(meta));
  } catch (e) {
    console.warn("Unable to save offer letter meta", e);
  }
}

export function removeStoredOfferLetterMeta(): void {
  try {
    localStorage.removeItem(OFFER_LETTER_META_KEY);
  } catch {
    // ignore
  }
}

export function dataUrlToBlob(dataUrl: string): Blob | null {
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

export function getStoredCertificate(certId: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_PREFIX}${certId}`);
  } catch {
    return null;
  }
}

export function setStoredCertificate(certId: string, dataUrl: string): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${certId}`, dataUrl);
  } catch (e) {
    console.warn("Unable to save certificate to local storage", e);
  }
}

export function removeStoredCertificate(certId: string): void {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${certId}`);
  } catch {
    // ignore
  }
}

/** Offer letter storage functions */
export function getStoredOfferLetter(): string | null {
  try {
    return localStorage.getItem(OFFER_LETTER_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredOfferLetter(dataUrl: string): void {
  try {
    localStorage.setItem(OFFER_LETTER_STORAGE_KEY, dataUrl);
  } catch (e) {
    console.warn("Unable to save offer letter to local storage", e);
  }
}

export function removeStoredOfferLetter(): void {
  try {
    localStorage.removeItem(OFFER_LETTER_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export const CANDIDATE_OFFER_LETTER_PATHS: string[] = [
  "/certificates/yuvaintern-offer-letter.png",
  "/certificates/yuvaintern-offer-letter.jpg",
  "/certificates/yuvaintern-offer-letter.jpeg",
  "/certificates/offer-letter.png",
  "/certificates/offer-letter.jpg",
  "/certificates/offer-letter.jpeg",
  "/certificates/offer-letter.pdf",
  "/certificates/YuvaIntern_Offer_Letter.pdf",
  "/certificates/yuvaintern-offer-letter.svg"
];

/**
 * List of candidate file paths to check in /public/certificates/
 * If user places real files in /public/certificates/, these will be matched.
 */
export const CANDIDATE_ASSET_PATHS: Record<string, string[]> = {
  "oracle-genai-professional": [
    "/certificates/oracle.png",
    "/certificates/oracle.jpg",
    "/certificates/oracle-genai.png",
    "/certificates/oracle-genai.jpg",
    "/certificates/Certificate of Recognition.pdf",
    "/certificates/Certificate_of_Recognition.pdf",
    "/certificates/oracle-genai.svg"
  ],
  "hp-life-strategic-ai": [
    "/certificates/hp-life.png",
    "/certificates/hp-life.jpg",
    "/certificates/hp-life-ai.png",
    "/certificates/hp-life-ai.jpg",
    "/certificates/Certificate of Completion.pdf",
    "/certificates/Certificate_of_Completion.pdf",
    "/certificates/hp-life-ai.svg"
  ],
  "icissesc-2026-volunteer": [
    "/certificates/image.png",
    "/certificates/icisesc-2026.png",
    "/certificates/icisesc-2026.jpg",
    "/certificates/icisessc.png",
    "/certificates/icisessc-2026.png",
    "/certificates/icisesc-2026.svg"
  ],
  "deloitte-data-analytics": [
    "/certificates/deloitte.png",
    "/certificates/deloitte.jpg",
    "/certificates/deloitte-analytics.svg"
  ],
  "tata-data-analytics": [
    "/certificates/tata.png",
    "/certificates/tata.jpg",
    "/certificates/tata-analytics.svg"
  ]
};
