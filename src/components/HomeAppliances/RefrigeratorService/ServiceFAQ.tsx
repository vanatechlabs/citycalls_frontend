import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQProps {
  faqs: { q: string; a: string }[];
}

export function ServiceFAQ({ faqs }: FAQProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="mt-10 bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.04)] border border-black/5 p-6 md:p-8">
      <h3 className="text-[18px] font-bold text-ink mb-6">Frequently Asked Questions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {faqs.map((f, i) => (
          <div key={f.q} className="rounded-lg border border-black/5 bg-[#f9fafb]">
            <button 
              onClick={() => setOpenFaq(openFaq === i ? null : i)} 
              className="w-full flex items-center justify-between text-left px-4 py-3"
            >
              <span className="font-semibold text-[13px] text-ink/80">{f.q}</span>
              <ChevronDown size={14} className={`text-ink/40 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
            </button>
            {openFaq === i && <div className="px-4 pb-4 pt-1 text-[12px] leading-relaxed text-ink/60">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
