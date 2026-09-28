export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

export const blogs: Blog[] = [
  {
    slug: "5-signs-your-ac-needs-servicing",
    title: "5 Signs Your AC Needs Servicing Before Summer Hits",
    excerpt: "Weak airflow, strange smells, water leaks — spot the signals early and save on repairs.",
    image: img("photo-1621905251189-08b45d6a269e"),
    author: "Rohit Sharma",
    date: "May 12, 2026",
    category: "Home Appliance",
    content:
      "Every summer we get thousands of AC service requests in Ghaziabad — and 8 out of 10 could have been prevented. Here are five signs your AC is asking for a service call.\n\n1. Weak or warm airflow — usually a clogged filter or low gas.\n2. Unusual smell — bacterial growth on the evaporator coil.\n3. Water dripping indoors — blocked drain pipe.\n4. Loud rattling — a loose fan blade or worn bearing.\n5. High electricity bills — the compressor is working overtime.\n\nA ₹499 service now is far cheaper than a ₹6,000 compressor later.",
  },
  {
    slug: "monsoon-pest-control-checklist",
    title: "The Monsoon Pest-Control Checklist Every Ghaziabad Home Needs",
    excerpt: "Cockroaches, mosquitoes and termites peak in the rains. Here's how to stay ahead of them.",
    image: img("photo-1526397751294-331021109fbd"),
    author: "Neha Verma",
    date: "June 3, 2026",
    category: "Pest Control",
    content:
      "Monsoon in NCR means one thing to pests — party time. Standing water, high humidity and cool corners create the ideal breeding ground. Here is our tried-and-tested checklist.\n\n- Empty flowerpot trays weekly.\n- Seal cracks in bathroom tiles.\n- Store dry food in airtight containers.\n- Get a preventive gel-bait treatment before June.\n- Never ignore wood dust near skirting — that's termite territory.\n\nBook a preventive treatment and enjoy the rains without the guests.",
  },
  {
    slug: "how-often-should-you-deep-clean-your-sofa",
    title: "How Often Should You Deep-Clean Your Sofa? (Answer May Surprise You)",
    excerpt: "That plush 3-seater collects more dust than a doormat. Here's the honest servicing schedule.",
    image: img("photo-1555041469-a586c61ea9bc"),
    author: "Ananya Iyer",
    date: "July 1, 2026",
    category: "Cleaning",
    content:
      "Your sofa is the most-used piece of furniture in your home — and the most neglected. Dust mites, dead skin cells, pet dander and food particles pile up inside the cushions.\n\nOur recommendation: deep-clean every 4 months if you have kids or pets, every 6 months otherwise. A single session is around ₹1,200 for a 3-seater and takes ~90 minutes.",
  },
  {
    slug: "at-home-salon-hygiene-standards",
    title: "The 7 Hygiene Standards to Demand From Any At-Home Salon",
    excerpt: "Single-use waxing strips, sealed disposables, sanitised tools — non-negotiables.",
    image: img("photo-1560066984-138dadb4c035"),
    author: "Priya Malhotra",
    date: "July 10, 2026",
    category: "Beauty & Salon",
    content:
      "At-home beauty is convenient — but only if hygiene is uncompromising. Here are the seven things a professional at-home service must always deliver.\n\n1. Sealed, single-use disposables.\n2. UV-sanitised metal tools.\n3. Fresh linen for every client.\n4. Product freshness — never squeezed from bulk tubs.\n5. Handwash before starting.\n6. Gloves for waxing.\n7. Trained, verified professional with an ID card.",
  },
  {
    slug: "ro-water-purifier-maintenance-tips",
    title: "5 RO Water Purifier Maintenance Tips for Clean Drinking Water",
    excerpt: "Don't wait for your RO to stop working. Regular filter changes keep your water safe and tasty.",
    image: img("photo-1548839140-29a749e1cf4d"),
    author: "Kunal Gupta",
    date: "August 5, 2026",
    category: "Home Appliance",
    content: "RO purifiers need love too. Ensure you change your pre-filters every 3-4 months and get a complete service annually.",
  },
  {
    slug: "how-to-remove-stubborn-bathroom-stains",
    title: "How to Remove Stubborn Bathroom Stains in Minutes",
    excerpt: "Hard water stains ruining your bathroom's look? Try these expert cleaning hacks.",
    image: img("photo-1584622650111-993a426fbf0a"),
    author: "Ananya Iyer",
    date: "August 18, 2026",
    category: "Cleaning",
    content: "Hard water stains are the enemy of shiny tiles. Using a mix of vinegar and baking soda can help, or you can book a professional deep clean.",
  },
  {
    slug: "microwave-not-heating-troubleshooting",
    title: "Microwave Not Heating? Common Causes and Fixes",
    excerpt: "Is your microwave turning on but food stays cold? Here's what might be wrong.",
    image: img("photo-1584269600464-37b1b58a9fe7"),
    author: "Rohit Sharma",
    date: "September 2, 2026",
    category: "Home Appliance",
    content: "Magnetron failure, door switch issues, or a blown diode could be the culprit. Never try to fix a microwave yourself due to high voltage risks.",
  },
  {
    slug: "diy-facial-vs-professional-facial",
    title: "DIY Facial vs. Professional At-Home Facial: What's the Difference?",
    excerpt: "Are store-bought kits enough, or do you need a professional touch for that glow?",
    image: img("photo-1512290923902-8a9f81dc236c"),
    author: "Priya Malhotra",
    date: "September 15, 2026",
    category: "Beauty & Salon",
    content: "While DIY facials are great for maintenance, professional facials offer deep extraction, targeted treatments, and proper massage techniques.",
  },
];

export const findBlog = (slug: string) => blogs.find((b) => b.slug === slug);
