const avatars = Array.from({ length: 14 }, (_, i) =>
  `https://i.pravatar.cc/120?img=${(i % 70) + 1}`,
);

export function CustomerMarquee() {
  const row = [...avatars, ...avatars];
  return (
    <section className="bg-background border-y border-border overflow-hidden">
      <div className="container-x py-8">
        <div className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
          10,000+ happy customers · and counting
        </div>
      </div>
      <div className="marquee-track-slow gap-4 pb-8 whitespace-nowrap">
        {row.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-16 w-16 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
          />
        ))}
      </div>
    </section>
  );
}
