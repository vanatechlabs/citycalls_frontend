"use client";

export function MarqueeText() {
  const content = (
    <span className="inline-block pr-16 md:pr-24 text-[36px] md:text-[46px] font-extrabold leading-none uppercase" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      <span className="text-primary">DOORSTEP SERVICE </span>
      <span style={{ color: "transparent", WebkitTextStroke: "1.5px #000000" }}>
        • VERIFIED TECHNICIANS • TRANSPARENT PRICING •{" "}
      </span>
      <span className="text-primary">ON-TIME GUARANTEE </span>
      <span style={{ color: "transparent", WebkitTextStroke: "1.5px #000000" }}>
        • 30-DAY WARRANTY • SAME-DAY BOOKING •{" "}
      </span>
    </span>
  );

  return (
    <section className="w-full overflow-hidden bg-transparent pt-2 md:pt-3 pb-3 md:pb-4 relative z-30">
      <style>{`
        @keyframes strokeMarqueeAnim {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .stroke-marquee-track {
          display: flex;
          width: max-content;
          white-space: nowrap;
          will-change: transform;
          animation: strokeMarqueeAnim 55s linear infinite;
        }
      `}</style>

      <div className="stroke-marquee-track">
        <span className="inline-block">{content}</span>
        <span className="inline-block">{content}</span>
        <span className="inline-block">{content}</span>
        <span className="inline-block">{content}</span>
      </div>
    </section>
  );
}
