export function AboutStats() {
  const stats = [
    { number: "10,000+", label: "Jobs completed" },
    { number: "450+", label: "Verified pros" },
    { number: "4.8★", label: "Average rating" },
    { number: "8+ yrs", label: "In Ghaziabad" },
  ];

  return (
    <section className="bg-ink text-white">
      <div className="container-x py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className={idx === 0 || idx === 2 ? "border-l-0" : ""}>
              <div className="text-3xl md:text-5xl font-black text-primary mb-2">{stat.number}</div>
              <div className="text-sm font-semibold tracking-wider uppercase text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
