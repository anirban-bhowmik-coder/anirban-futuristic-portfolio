import React from "react";
import type { CredentialItem, LeadershipItem } from "../../data/credentials";

// ==========================================
// 1. GENUINE ORACLE CERTIFICATE DOCUMENT
// ==========================================
export function OracleDocument() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#c74634] p-3 sm:p-5 md:p-6 rounded-lg shadow-2xl relative select-none overflow-hidden text-slate-800">
      {/* Authentic Geometric Border Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
        backgroundImage: `radial-gradient(#1e1e24 2px, transparent 2px), radial-gradient(#9e2a1b 2px, transparent 2px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px"
      }} />

      {/* Inner Crisp White Certificate Parchment */}
      <div className="relative w-full h-full bg-white rounded-md p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xl border border-slate-200">
        {/* Top Bar: Oracle University & OCP Ribbon Badge */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-2xl sm:text-3xl tracking-widest text-[#c74634] font-sans">
                ORACLE
              </span>
            </div>
            <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-600 block mt-0.5">
              University
            </span>
          </div>

          {/* Official Oracle Certified Professional Medal Badge */}
          <div className="flex flex-col items-center">
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 p-1 shadow-md border border-slate-300 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center p-1 text-center">
                  <span className="text-[8px] sm:text-[9px] font-extrabold tracking-widest text-[#c74634]">ORACLE</span>
                  <span className="text-[6px] sm:text-[7px] text-slate-500 uppercase tracking-tighter">Certified</span>
                  <span className="text-[6px] sm:text-[7px] font-bold bg-slate-900 text-white px-1.5 py-0.2 rounded-sm mt-0.5">
                    Professional
                  </span>
                </div>
              </div>
              {/* Ribbon Tails */}
              <div className="flex gap-1 -mt-2">
                <div className="w-3 h-5 bg-[#c74634] transform -rotate-12 rounded-b-sm" />
                <div className="w-3 h-5 bg-[#9e2a1b] transform rotate-12 rounded-b-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Title Header */}
        <div className="mt-2 sm:mt-4">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-semibold text-slate-800 tracking-tight">
            Oracle Certified Professional
          </h2>
          <p className="text-sm sm:text-lg md:text-xl font-serif text-slate-500 mt-0.5">
            Certificate of Recognition
          </p>
          <div className="w-24 sm:w-36 h-0.5 bg-[#c74634] mt-3" />
        </div>

        {/* Recipient & Program */}
        <div className="my-3 sm:my-5">
          <p className="text-xs sm:text-sm uppercase tracking-wider text-slate-500 font-mono">
            Awarded To
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-1">
            Anirban Bhowmik
          </h3>
          <h4 className="text-sm sm:text-lg md:text-xl font-bold text-[#c74634] mt-2 leading-snug">
            Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl font-sans">
            This certifies that the above named is recognized by Oracle Corporation as Oracle Certified.
          </p>
        </div>

        {/* Signatures & Validity Footer */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-12 gap-4 items-end">
          {/* Date */}
          <div className="col-span-3">
            <p className="text-xs sm:text-sm font-semibold text-slate-800">October 28, 2025</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Date</p>
          </div>

          {/* Gary N Miller Signature */}
          <div className="col-span-5">
            <div className="font-serif italic text-base sm:text-xl font-bold text-slate-900 border-b border-slate-300 pb-1">
              Gary N Miller
            </div>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-800 mt-0.5">Gary N Miller</p>
            <p className="text-[9px] sm:text-[10px] text-slate-500">Customer Success Officer, EVP CSS</p>
          </div>

          {/* Barcode & Validity */}
          <div className="col-span-4 text-right">
            <p className="text-[9px] sm:text-[11px] text-slate-700 font-sans">
              Valid until <strong className="font-bold text-slate-900">October 28, 2027</strong>
            </p>
            {/* Barcode Graphic */}
            <div className="inline-block mt-1 bg-white p-1">
              <div className="flex h-5 sm:h-6 gap-[2px] items-stretch justify-end">
                {[3,1,2,4,1,3,2,1,4,2,3,1,2,3,4,1,2,3,1,4,2,3].map((w, i) => (
                  <div key={i} className="bg-slate-900" style={{ width: `${w}px` }} />
                ))}
              </div>
              <p className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider text-slate-900 mt-0.5">
                103008434OCI25GAIOCP
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. GENUINE HP LIFE CERTIFICATE DOCUMENT
// ==========================================
export function HpLifeDocument() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white p-6 sm:p-10 md:p-12 rounded-lg shadow-2xl relative select-none overflow-hidden text-slate-800 border border-slate-200 flex flex-col justify-between">
      {/* Top Left Cyan Blue Geometric Wedge */}
      <div
        className="absolute top-0 left-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #0096d6 0%, #0066d4 50%, transparent 50%)"
        }}
      />

      {/* Bottom Right Deep Blue Geometric Wedge */}
      <div
        className="absolute bottom-0 right-0 w-44 sm:w-64 h-44 sm:h-64 pointer-events-none"
        style={{
          background: "linear-gradient(315deg, #004c9e 0%, #0066d4 50%, transparent 50%)"
        }}
      />

      {/* Top Header: HP LIFE | HP Foundation */}
      <div className="relative z-10 flex items-center justify-center gap-4">
        {/* HP LIFE logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0066d4] flex items-center justify-center text-white font-serif font-black italic text-lg sm:text-xl shadow-sm">
            hp
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-wider text-slate-900">
            LIFE
          </span>
        </div>

        <div className="h-6 w-[1.5px] bg-slate-300" />

        {/* HP Foundation logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0066d4] flex items-center justify-center text-white font-serif font-black italic text-lg sm:text-xl shadow-sm">
            hp
          </div>
          <span className="font-semibold text-lg sm:text-xl text-slate-600">
            Foundation
          </span>
        </div>
      </div>

      {/* Certificate Title */}
      <div className="relative z-10 text-center mt-4">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Certificate of Completion
        </h2>
        <div className="mt-4 sm:mt-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Anirban Bhowmik
          </h3>
          <p className="text-xs sm:text-base text-slate-500 font-sans mt-1">
            has successfully completed the HP LIFE online course
          </p>
        </div>

        <h4 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 mt-3 sm:mt-4">
          Strategic Planning in the AI Age
        </h4>
      </div>

      {/* Course Impact Paragraph (Exact from Certificate) */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
        By completing this course, the above-named student has learned how to use strategic planning to make better business decisions in an AI-driven world. They have learned about the core components of a strategic plan, discovered how to evaluate practical planning frameworks, and developed the skills to use AI tools to support strategic thinking.
      </div>

      {/* Presentation Date & Signature */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-3">
        <p className="text-xs sm:text-sm font-semibold text-slate-900">
          Presented 9/13/2026
        </p>

        <div className="mt-3 text-center">
          <div className="font-serif italic text-lg sm:text-2xl font-bold text-slate-900 border-b border-slate-400 pb-1 px-8">
            Michele Malejki
          </div>
          <p className="text-xs sm:text-sm font-bold text-slate-900 mt-1">Michele Malejki</p>
          <p className="text-[10px] sm:text-xs text-slate-500">Executive Director, HP Foundation</p>
        </div>
      </div>

      {/* Serial Number Footer */}
      <div className="relative z-10 text-center pt-2">
        <p className="text-[10px] sm:text-xs text-slate-500 font-sans">
          Certificate serial number:{" "}
          <span className="font-mono font-bold text-[#0066d4]">
            fc29e5c9-44f2-4ecc-a174-22161fdf07d0
          </span>
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 3. GENUINE ICISESSC-2026 CERTIFICATE
// (Exact replica of image.png uploaded by user)
// ==========================================
export function IcisescDocument() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-[1.414/1] bg-[#fbf9f4] p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl relative select-none overflow-hidden text-slate-900 border-4 border-[#c59b27]">
      {/* Intricate Inner Double Border */}
      <div className="absolute inset-2 sm:inset-3 border-2 border-[#8c1d2e] pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-[#c59b27] border-dashed pointer-events-none" />

      <div className="relative w-full h-full flex flex-col justify-between p-2 sm:p-4">
        {/* Top Institutional Header Logos */}
        <div className="grid grid-cols-12 items-center gap-2 pb-2">
          {/* IILM University */}
          <div className="col-span-4 flex flex-col">
            <span className="font-serif font-black text-xs sm:text-base md:text-lg tracking-wider text-slate-900">
              IILM UNIVERSITY
            </span>
            <span className="text-[9px] sm:text-xs font-sans text-slate-600">
              Greater Noida
            </span>
          </div>

          {/* Liwa & CUS Logos */}
          <div className="col-span-4 flex items-center justify-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-[9px] sm:text-xs">
                LU
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[8px] sm:text-[10px] font-bold text-slate-900 leading-tight">Liwa University</span>
                <span className="text-[7px] sm:text-[8px] text-slate-500">Est 1993</span>
              </div>
            </div>
          </div>

          {/* IEEE UP Section Co-Sponsor */}
          <div className="col-span-4 text-right">
            <span className="text-[8px] sm:text-[10px] text-slate-600 block leading-tight">
              Technically Co-Sponsored by
            </span>
            <div className="inline-flex items-center gap-1 mt-0.5">
              <span className="font-sans font-black text-xs sm:text-sm text-[#00629b]">IEEE</span>
              <span className="text-[8px] sm:text-[10px] font-bold text-slate-800">UP SECTION (INDIA)</span>
            </div>
          </div>
        </div>

        {/* Deep Maroon Conference Banner */}
        <div className="bg-[#751122] text-white text-center py-2 sm:py-3 px-3 rounded shadow-md my-1">
          <p className="font-serif font-bold text-xs sm:text-base md:text-lg tracking-wider">
            INTERNATIONAL CONFERENCE
          </p>
          <p className="text-[9px] sm:text-xs italic text-slate-200">on</p>
          <p className="font-sans font-bold text-[10px] sm:text-xs md:text-sm text-amber-200 tracking-tight leading-tight">
            Intelligent Systems In Engineering, Secured Systems &amp; Cybersecurity (ICISESSC-2026)
          </p>
        </div>

        {/* Certificate Title */}
        <div className="text-center my-1 sm:my-2">
          <h2 className="font-serif font-black text-lg sm:text-2xl md:text-3xl text-slate-900 tracking-wider">
            CERTIFICATE OF APPRECIATION
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-slate-600 mt-0.5">
            This is to certify that
          </p>

          {/* Recipient Name in Calligraphic Script */}
          <h3 className="font-serif italic font-bold text-2xl sm:text-4xl md:text-5xl text-slate-900 mt-1 sm:mt-2 text-[#0f172a]">
            Anirban Bhowmik
          </h3>
          <div className="w-32 sm:w-64 h-0.5 bg-[#c59b27] mx-auto mt-1" />
        </div>

        {/* Certificate Body Text (Exact from image.png) */}
        <div className="text-center max-w-3xl mx-auto text-[10px] sm:text-xs md:text-sm text-slate-800 leading-relaxed font-sans px-2">
          has actively contributed as a <strong className="font-bold text-[#751122]">Student Volunteer</strong> in the “International Conference on Intelligent Systems in Engineering, Communications, Secured Systems and Cyber security (ICISESSC-2026)”, organized during <strong className="font-semibold text-slate-900">April 9–10, 2026</strong> at IILM University, Greater Noida. Their dedication, support, and valuable efforts contributed significantly to the successful organization of the conference.
        </div>

        {/* 4 Official Faculty Signatures (Exact from image.png) */}
        <div className="pt-3 sm:pt-4 border-t border-slate-300 grid grid-cols-4 gap-2 text-center">
          {/* Signatory 1 */}
          <div>
            <div className="font-serif italic text-xs sm:text-sm text-[#1d4ed8] font-bold">
              Dr. Swati Vashisht
            </div>
            <p className="text-[9px] sm:text-[11px] font-bold text-slate-900 mt-0.5">Dr. Swati Vashisht</p>
            <p className="text-[7px] sm:text-[8px] text-slate-600 leading-tight">School of CSE, IILM University</p>
            <p className="text-[7px] sm:text-[8px] font-semibold text-[#751122]">Organizing Co-Chair</p>
          </div>

          {/* Signatory 2 */}
          <div>
            <div className="font-serif italic text-xs sm:text-sm text-slate-900 font-bold">
              Dr. Deependra Rastogi
            </div>
            <p className="text-[9px] sm:text-[11px] font-bold text-slate-900 mt-0.5">Dr. Deependra Rastogi</p>
            <p className="text-[7px] sm:text-[8px] text-slate-600 leading-tight">School of CSE, IILM University</p>
            <p className="text-[7px] sm:text-[8px] font-semibold text-[#751122]">Organizing Co-Chair</p>
          </div>

          {/* Signatory 3 */}
          <div>
            <div className="font-serif italic text-xs sm:text-sm text-[#1d4ed8] font-bold">
              Prof. (Dr.) Alok Aggarwal
            </div>
            <p className="text-[9px] sm:text-[11px] font-bold text-slate-900 mt-0.5">Prof. (Dr.) Alok Aggarwal</p>
            <p className="text-[7px] sm:text-[8px] text-slate-600 leading-tight">Dean, School of CSE</p>
            <p className="text-[7px] sm:text-[8px] font-semibold text-[#751122]">General Chair</p>
          </div>

          {/* Signatory 4 */}
          <div>
            <div className="font-serif italic text-xs sm:text-sm text-slate-900 font-bold">
              Dr. Munish Sabharwal
            </div>
            <p className="text-[9px] sm:text-[11px] font-bold text-slate-900 mt-0.5">Dr. Munish Sabharwal</p>
            <p className="text-[7px] sm:text-[8px] text-slate-600 leading-tight">Director, School of CSE</p>
            <p className="text-[7px] sm:text-[8px] font-semibold text-[#751122]">General Chair</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. DELOITTE JOB SIMULATION DOCUMENT
// ==========================================
export function DeloitteDocument() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white p-6 sm:p-10 md:p-12 rounded-lg shadow-2xl relative select-none overflow-hidden text-slate-900 border-t-8 border-[#86bc25] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-black text-2xl sm:text-3xl text-slate-900 font-sans">
            Deloitte<span className="text-[#86bc25]">.</span>
          </span>
          <p className="text-xs font-semibold text-slate-500">Australia</p>
        </div>
        <div className="text-right">
          <span className="font-bold text-sm sm:text-base tracking-widest text-slate-800">FORAGE</span>
          <p className="text-[10px] text-slate-500">Virtual Experience Programs</p>
        </div>
      </div>

      <div className="text-center my-4">
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
          Certificate of Completion
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">This certifies that</p>
        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
          Anirban Bhowmik
        </h3>
        <div className="w-32 h-1 bg-[#86bc25] mx-auto mt-2" />
        <h4 className="text-lg sm:text-2xl font-bold text-slate-800 mt-4">
          Data Analytics Job Simulation
        </h4>
      </div>

      <p className="text-xs sm:text-sm text-center text-slate-600 max-w-xl mx-auto leading-relaxed">
        Successfully completed practical tasks involving data exploration, dashboard architecture, forensic telemetry analysis, and communicating analytical findings to senior leadership.
      </p>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div>
          <p className="font-bold text-slate-900">Issued: October 22, 2025</p>
          <p className="text-[10px] text-slate-500 font-mono">DEL-AU-2025-FORAGE</p>
        </div>
        <div className="text-right">
          <div className="font-serif italic font-bold text-slate-900">Deloitte Australia Practice</div>
          <p className="text-[10px] text-slate-500">Analytics &amp; Forensic Advisory</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. TATA JOB SIMULATION DOCUMENT
// ==========================================
export function TataDocument() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-[1.414/1] bg-white p-6 sm:p-10 md:p-12 rounded-lg shadow-2xl relative select-none overflow-hidden text-slate-900 border-t-8 border-[#005a9c] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#005a9c] text-white font-bold flex items-center justify-center">
            T
          </div>
          <div>
            <span className="font-black text-xl sm:text-2xl text-[#005a9c] tracking-widest font-sans">
              TATA
            </span>
            <p className="text-[10px] font-bold text-slate-500">TATA GROUP</p>
          </div>
        </div>
        <div className="text-right">
          <span className="font-bold text-sm sm:text-base tracking-widest text-slate-800">FORAGE</span>
          <p className="text-[10px] text-slate-500">Virtual Experience Programs</p>
        </div>
      </div>

      <div className="text-center my-4">
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900">
          Certificate of Completion
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">This certifies that</p>
        <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#005a9c] mt-2">
          Anirban Bhowmik
        </h3>
        <div className="w-32 h-1 bg-[#005a9c] mx-auto mt-2" />
        <h4 className="text-lg sm:text-2xl font-bold text-slate-800 mt-4">
          Data Analytics Job Simulation
        </h4>
      </div>

      <p className="text-xs sm:text-sm text-center text-slate-600 max-w-xl mx-auto leading-relaxed">
        Completed practical tasks in exploratory data analysis, visual storytelling for C-level executives, scenario-based business metrics, and presentation design.
      </p>

      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div>
          <p className="font-bold text-slate-900">Issued: October 2025</p>
          <p className="text-[10px] text-slate-500 font-mono">TATA-EDA-2025-FORAGE</p>
        </div>
        <div className="text-right">
          <div className="font-serif italic font-bold text-slate-900">Tata Insights &amp; Analytics</div>
          <p className="text-[10px] text-slate-500">Executive Delivery Practice</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. GENUINE YUVAINTERN OFFER LETTER DOCUMENT
// ==========================================
export function YuvaInternOfferLetterDocument() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-[1/1.38] bg-white p-6 sm:p-10 md:p-12 rounded-lg shadow-2xl relative select-none text-slate-900 border border-slate-200 flex flex-col justify-between font-sans">
      {/* Top Header Logos */}
      <div>
        <div className="flex items-center justify-center gap-8 pb-6 border-b border-slate-200">
          {/* YuvaIntern Brand */}
          <div className="text-center">
            <span className="font-black text-3xl sm:text-4xl text-[#e65100] tracking-tight">yuvā</span>
            <span className="block text-xs uppercase tracking-[0.3em] text-slate-700 font-semibold -mt-1">intern</span>
          </div>

          <div className="h-10 w-[1px] bg-slate-300" />

          {/* NSDC Brand */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00838f]" />
              <span className="w-2 h-2 rounded-full bg-[#e65100]" />
              <span className="w-2 h-2 rounded-full bg-[#1565c0]" />
            </div>
            <span className="font-black text-lg sm:text-xl text-slate-900 tracking-widest block mt-0.5">N·S·D·C</span>
            <span className="text-[8px] uppercase tracking-wider text-slate-500 font-semibold block">Re-Imagine Future</span>
          </div>
        </div>

        {/* Title & Date */}
        <div className="text-center mt-6">
          <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-slate-900">
            INTERNSHIP OFFER LETTER
          </h2>
          <div className="w-20 h-0.5 bg-[#e65100] mx-auto mt-2" />
        </div>

        <div className="text-right mt-4 text-xs text-slate-700 font-serif">
          <strong>Date of Issue:</strong> September 01, 2026
        </div>

        {/* Body Salutation & Offer */}
        <div className="mt-4 text-left font-serif text-xs sm:text-sm text-slate-800 leading-relaxed">
          <p className="font-bold text-slate-900 mb-2">Dear Anirban Bhowmik,</p>
          <p className="mb-4">
            We are pleased to extend to you this formal offer for an Internship position as{" "}
            <strong className="text-slate-900">Junior Cyber Security Analyst - E-Governance &amp; Digital Services</strong> at{" "}
            <strong className="text-[#e65100]">YuvaIntern</strong>. We were impressed with your background, skills and enthusiasm, and we believe you will be a valuable addition to our team.
          </p>

          {/* Internship Details Table */}
          <div className="my-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 mb-2">
              Internship Details
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans">
              <div>
                <span className="text-slate-500 block">Start Date:</span>
                <span className="font-semibold text-slate-900">September 01, 2026</span>
              </div>
              <div>
                <span className="text-slate-500 block">End Date:</span>
                <span className="font-semibold text-slate-900">September 29, 2026</span>
              </div>
              <div>
                <span className="text-slate-500 block">Duration:</span>
                <span className="font-semibold text-slate-900">4 weeks</span>
              </div>
              <div>
                <span className="text-slate-500 block">Location:</span>
                <span className="font-semibold text-slate-900">Remote</span>
              </div>
            </div>
          </div>

          {/* Key Responsibilities */}
          <div className="mb-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 mb-1">
              Key Responsibilities:
            </h4>
            <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed">
              As a Junior Cyber Security Analyst in the E-Governance &amp; Digital Services sector, you will be responsible for ensuring the security of digital platforms and services used in government operations. Your tasks may include conducting security assessments, implementing security measures, and responding to cybersecurity incidents.
            </p>
          </div>

          {/* Benefits & Learning */}
          <div className="mb-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-900 mb-1">
              Benefits &amp; Learning Opportunities:
            </h4>
            <ul className="list-disc list-inside text-slate-700 text-xs space-y-1">
              <li>Develop practical skills in security assessment, access-control auditing, and mitigation tools.</li>
              <li>Gain hands-on experience in public digital platforms security and compliance frameworks.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Signature & Certified Stamp */}
      <div>
        <div className="flex items-end justify-between pt-4 border-t border-slate-200">
          <div>
            <div className="flex items-center gap-4">
              <div>
                <div className="font-serif italic font-bold text-blue-900 text-lg sm:text-xl">
                  Kounal
                </div>
                <p className="font-bold text-xs sm:text-sm text-slate-900">Kounal Gupta</p>
                <p className="text-[11px] font-semibold text-[#e65100]">Founder, YuvaIntern.com</p>
              </div>

              {/* Certified Stamp */}
              <div className="w-16 h-16 rounded-full border-2 border-blue-600 border-dashed p-1 flex flex-col items-center justify-center text-center text-blue-600">
                <span className="text-[7px] font-bold uppercase tracking-wider">YUVAINTERN</span>
                <span className="text-[8px] font-extrabold tracking-widest">★ ★ ★</span>
                <span className="text-[7px] font-bold uppercase tracking-tighter">CERTIFIED</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-300 px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1">
              <span>OFFICIAL OFFER LETTER</span>
            </span>
          </div>
        </div>

        {/* Global Offices Footer */}
        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-3 gap-2 text-[9px] text-slate-500 font-sans">
          <div>
            <strong className="text-slate-700 block">America Head Office</strong>
            <span>Henry Harvin Inc., 8 The Green, Dover, DE 19901, USA</span>
          </div>
          <div>
            <strong className="text-slate-700 block">Asia Pacific Office</strong>
            <span>Henry Harvin House, B-12, Sector-6, Noida(UP), India - 201301</span>
          </div>
          <div>
            <strong className="text-slate-700 block">Middle East Office</strong>
            <span>2703, Blue Matrix, Prime Tower, Business Bay, Dubai, UAE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

