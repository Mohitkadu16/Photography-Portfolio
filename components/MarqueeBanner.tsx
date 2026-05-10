"use client";

const TEXT =
  "MUMBAI · STREET PHOTOGRAPHY · CINEMATIC VISION · LOYALMANUKA · URBAN LIFE · VISUAL STORYTELLING · SOUTH BOMBAY · ";

export default function MarqueeBanner() {
  // Duplicate text so the loop is seamless
  const repeated = TEXT.repeat(4);

  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-black py-3 select-none">
      {/* Row 1 — scrolls left */}
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
      >
        <span className="inline-block font-mono text-[11px] tracking-[0.25em] text-white uppercase">
          {repeated}
        </span>
        <span className="inline-block font-mono text-[11px] tracking-[0.25em] text-white uppercase">
          {repeated}
        </span>
      </div>

      {/* Row 2 — scrolls right */}
      <div
        className="mt-2 flex whitespace-nowrap"
        style={{ animation: "marqueeReverse 28s linear infinite" }}
      >
        <span className="inline-block font-mono text-[11px] tracking-[0.25em] text-amber-400/60 uppercase">
          {repeated}
        </span>
        <span className="inline-block font-mono text-[11px] tracking-[0.25em] text-amber-400/60 uppercase">
          {repeated}
        </span>
      </div>
    </div>
  );
}
