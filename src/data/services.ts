import type { ServiceCategory, SubService } from "@/types";
import s1 from "@/assets/Services/s1.png";
import s2 from "@/assets/Services/s2.png";
import s3 from "@/assets/Services/s3.png";
import s4 from "@/assets/Services/s4.png";
import s5 from "@/assets/Services/s5.png";
import s6 from "@/assets/Services/s6.png";
import s7 from "@/assets/Services/s7.png";
import s8 from "@/assets/Services/s8.png";
import s10 from "@/assets/Services/s10.png";
import s11 from "@/assets/Services/s11.png";
import s12 from "@/assets/Services/s12.png";

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=70`;

const commonFaqs = [
  {
    q: "Are your technicians verified?",
    a: "Every professional on CityCalls is background-verified, trained, and rated by real customers.",
  },
  {
    q: "Do you offer a service warranty?",
    a: "Yes — most repairs come with a 30-day service warranty. Spare parts carry the manufacturer warranty.",
  },
  {
    q: "How do I pay?",
    a: "Pay after the job is done. UPI, cards, wallets and cash — whatever you prefer.",
  },
];

const applianceBrands = ["LG", "Samsung", "Whirlpool", "Voltas", "Daikin", "Haier", "Godrej", "IFB", "Bosch", "Others"];

const make = (s: Omit<SubService, "faqs"> & Partial<Pick<SubService, "faqs">>): SubService => ({
  faqs: commonFaqs,
  ...s,
});

export const serviceCategories: ServiceCategory[] = [
  {
    id: "home-appliance",
    label: "Home Appliance",
    services: [
      make({
        slug: "refrigerator-service",
        name: "Refrigerator Service",
        categoryId: "home-appliance",
        short: "Cooling issues, gas refill, ice buildup — sorted at your doorstep.",
        description:
          "From single-door to side-by-side, our certified technicians diagnose and fix every refrigerator brand. Genuine parts, transparent pricing, same-day service across Ghaziabad.",
        image: s1,
        price: "₹299 visit charge",
        duration: "45–90 min",
        brands: applianceBrands,
        issues: ["Not cooling", "Gas leak / refill", "Ice buildup", "Water leakage", "Compressor noise", "Door not sealing"],
        included: ["Full diagnosis", "Genuine spare parts", "30-day service warranty", "Doorstep repair"],
      }),
      make({
        slug: "ac-service",
        name: "AC Service",
        categoryId: "home-appliance",
        short: "Deep-clean, gas top-up, installation & repair for every AC.",
        description:
          "Split, window or cassette — trained AC pros handle installation, dry service, wet service, gas refill and part replacement with genuine spares.",
        image: s2,
        price: "₹299 visit charge",
        duration: "60–120 min",
        brands: applianceBrands,
        issues: ["Not cooling", "Water leaking", "Loud noise", "Gas refill", "Installation / uninstall", "Deep clean service"],
        included: ["Coil cleaning", "Filter service", "Pressure check", "Post-service report"],
      }),
      make({
        slug: "washing-machine-services",
        name: "Washing Machine Services",
        categoryId: "home-appliance",
        short: "Top-load, front-load, semi-automatic — repaired the same day.",
        description:
          "Drum noise, drainage issues, PCB faults or bad bearings — we fix all makes and models with a 30-day warranty on labour.",
        image: s3,
        price: "₹299 visit charge",
        duration: "45–90 min",
        brands: applianceBrands,
        issues: ["Not draining", "Not spinning", "Loud noise", "Error code on display", "Water leakage", "Door lock issue"],
        included: ["Full diagnosis", "Belt & bearing check", "Genuine parts", "Post-repair test wash"],
      }),
      make({
        slug: "television-repair-services",
        name: "Television Repair Services",
        categoryId: "home-appliance",
        short: "LED, LCD, Smart TV — panel, board and speaker fixes.",
        description:
          "From black screens to smart-TV software issues, our certified engineers repair every brand of TV with original spares.",
        image: s4,
        price: "₹299 visit charge",
        duration: "45–75 min",
        brands: applianceBrands,
        issues: ["No display", "No sound", "Lines on screen", "Smart TV not connecting", "Remote / port issues", "Software update"],
        included: ["Circuit board inspection", "Panel diagnostics", "Original spare parts", "30-day warranty"],
      }),
      make({
        slug: "microwave-oven-services",
        name: "Microwave & Oven Services",
        categoryId: "home-appliance",
        short: "Solo, grill, convection — fast diagnostics & repair.",
        description:
          "Magnetron replacement, heating faults, panel failures — repaired on-site with a service warranty.",
        image: s5,
        price: "₹299 visit charge",
        duration: "45–60 min",
        brands: applianceBrands,
        issues: ["Not heating", "Sparking inside", "Turntable not rotating", "Display / panel error", "Door not closing", "Fan noise"],
        included: ["Magnetron check", "Panel diagnostics", "Genuine parts", "Post-repair test"],
      }),
      make({
        slug: "geyser-repair-services",
        name: "Geyser Repair Services",
        categoryId: "home-appliance",
        short: "Instant & storage geysers — repaired, installed, replaced.",
        description:
          "Element failure, leakage, thermostat issues — expert plumbers-cum-electricians handle it end-to-end.",
        image: s6,
        price: "₹299 visit charge",
        duration: "45–90 min",
        brands: applianceBrands,
        issues: ["No hot water", "Water leakage", "Tripping the MCB", "Thermostat issue", "Installation", "Descaling & servicing"],
        included: ["Full inspection", "Descaling if required", "Element / thermostat check", "Safety test"],
      }),
      make({
        slug: "chimney-repair-services",
        name: "Chimney Repair Services",
        categoryId: "home-appliance",
        short: "Deep cleaning, motor repair, filter replacement.",
        description:
          "Kitchen chimneys collect oil fast — our team dismantles, deep-cleans and services every brand.",
        image: s7,
        price: "₹299 visit charge",
        duration: "60–120 min",
        brands: applianceBrands,
        issues: ["Low suction", "Loud motor noise", "Filter cleaning / replacement", "Light not working", "Auto-clean not working", "Installation"],
        included: ["Dismantle & deep clean", "Filter replacement", "Motor lubrication", "Suction test"],
      }),
    ],
  },
  {
    id: "pest-control",
    label: "Pest Control",
    services: [
      make({
        slug: "general-pest-control",
        name: "General Pest Control",
        categoryId: "pest-control",
        short: "Full-home protection against cockroaches, ants, spiders & lizards.",
        description:
          "Odourless, child-safe & pet-safe chemicals. Government-approved formulations with a 3-month protection guarantee.",
        image: s8,
        price: "₹299 visit charge",
        duration: "60–90 min",
        issues: ["Cockroach infestation", "Ants everywhere", "Lizards & spiders", "General maintenance", "Post-renovation treatment", "Others"],
        included: ["Gel + spray treatment", "Kitchen & bathroom focus", "3-month warranty", "Certified chemicals"],
      }),
      make({
        slug: "termite-control",
        name: "Termite Control",
        categoryId: "pest-control",
        short: "Chemical drilling & injection — long-term termite protection.",
        description:
          "We locate active colonies and treat wood, walls and flooring with a full 5-year written warranty on covered areas.",
        image: img("photo-1526397751294-331021109fbd"),
        price: "₹299 visit charge",
        duration: "3–5 hours",
        issues: ["Active termite trails", "Wooden furniture damage", "Wall / ceiling infestation", "Pre-construction treatment", "Preventive treatment", "Others"],
        included: ["Drill & fill method", "Chemical injection", "Wood surface spray", "Up to 5-year warranty"],
      }),
      make({
        slug: "cockroach-control",
        name: "Cockroach Control",
        categoryId: "pest-control",
        short: "Gel-bait targeted treatment — zero smell, zero mess.",
        description:
          "German + American cockroach elimination with targeted gel-bait applied to entry points, cracks and crevices.",
        image: img("photo-1560393464-5c69a73c5770"),
        price: "₹299 visit charge",
        duration: "30–60 min",
        issues: ["Kitchen infestation", "Bathroom cockroaches", "Small brown cockroaches", "American cockroaches", "Recurring problem", "Others"],
        included: ["Gel-bait treatment", "Entry-point sealing tips", "3-month warranty", "Odourless service"],
      }),
      make({
        slug: "mosquito-control",
        name: "Mosquito Control",
        categoryId: "pest-control",
        short: "Indoor & outdoor mosquito & larvae control.",
        description:
          "Fogging plus larvicidal treatment for balconies, terraces and stagnant water zones — safe for kids and pets.",
        image: img("photo-1587653263995-422546a7a559"),
        price: "₹299 visit charge",
        duration: "45–75 min",
        issues: ["Adult mosquitoes indoors", "Balcony / terrace larvae", "Society common areas", "Water body treatment", "Recurring problem", "Others"],
        included: ["Indoor spray", "Outdoor fogging", "Larvicide treatment", "Post-service report"],
      }),
      make({
        slug: "bed-bug-treatment",
        name: "Bed Bug Treatment",
        categoryId: "pest-control",
        short: "Complete bed-bug elimination — mattresses, sofas, crevices.",
        description:
          "A two-round treatment guaranteed to eliminate bed bugs from mattresses, headboards, sofas and floor gaps.",
        image: img("photo-1611095564985-e3fa2e7f6d1a"),
        price: "₹299 visit charge",
        duration: "90–120 min",
        issues: ["Mattress infestation", "Sofa infestation", "Full apartment treatment", "Post-travel / hotel exposure", "Recurring problem", "Others"],
        included: ["Two-round treatment", "Mattress spray", "Furniture crevice spray", "45-day warranty"],
      }),
    ],
  },
  {
    id: "sofa-cleaning",
    label: "Sofa Cleaning",
    services: [
      make({
        slug: "sofa-shampooing",
        name: "Sofa Shampooing",
        categoryId: "sofa-cleaning",
        short: "Foam extraction cleaning for fabric sofas — like new again.",
        description:
          "Professional shampoo + hot-water extraction lifts dust mites, stains and odours from every fibre.",
        image: s10,
        price: "₹299 visit charge",
        duration: "60–90 min",
        issues: ["Deep stains", "Bad odour", "General dust & grime", "Post-party cleanup", "Pet hair & odour", "Others"],
        included: ["Vacuuming", "Shampoo + extraction", "Stain treatment", "Deodoriser finish"],
      }),
      make({
        slug: "sofa-dry-cleaning",
        name: "Sofa Dry Cleaning",
        categoryId: "sofa-cleaning",
        short: "Water-free cleaning for suede, velvet & delicate fabrics.",
        description:
          "Solvent-based dry cleaning perfect for fabrics that can't handle water — dries in minutes.",
        image: img("photo-1493663284031-b7e3aefcae8e"),
        price: "₹399 / seat",
        duration: "45–75 min",
        issues: ["Suede / velvet sofa", "Delicate fabric", "Quick refresh needed", "Light stains", "Post-guest cleaning", "Others"],
        included: ["Dry solvent cleaning", "Stain treatment", "Fabric-safe process", "Zero drying time"],
      }),
      make({
        slug: "carpet-cleaning",
        name: "Carpet Cleaning",
        categoryId: "sofa-cleaning",
        short: "Deep carpet shampoo & extraction on-site.",
        description:
          "Rugs and wall-to-wall carpets — deep-cleaned at your home. No dismantling, no transport.",
        image: img("photo-1524758631624-e2822e304c36"),
        price: "₹15 / sq ft",
        duration: "60–120 min",
        issues: ["Heavy soiling", "Wine / food stains", "Pet odour", "Post-renovation dust", "Rug refresh", "Others"],
        included: ["Vacuuming", "Shampoo extraction", "Stain treatment", "Deodoriser finish"],
      }),
      make({
        slug: "mattress-cleaning",
        name: "Mattress Cleaning",
        categoryId: "sofa-cleaning",
        short: "Dust-mite & allergen deep-clean for mattresses.",
        description:
          "UV + extraction cleaning to remove dust mites, sweat and allergens — better sleep, healthier air.",
        image: img("photo-1631049307264-da0ec9d70304"),
        price: "₹599 / mattress",
        duration: "45–60 min",
        issues: ["Dust mite allergy", "Sweat stains", "Bad odour", "Post-illness cleaning", "General deep clean", "Others"],
        included: ["Vacuuming", "Steam / UV treatment", "Stain spot cleaning", "Anti-allergen spray"],
      }),
    ],
  },
  {
    id: "home-cleaning",
    label: "Home Cleaning",
    services: [
      make({
        slug: "home-cleaning",
        name: "Home Cleaning",
        categoryId: "home-cleaning",
        short: "Full-home deep cleaning by a trained crew.",
        description:
          "Everything from ceiling fans to floor grouting — a 4–6 hour deep clean that restores your home to move-in shine.",
        image: img("photo-1581578731548-c64695cc6952"),
        price: "₹1,999 onwards",
        duration: "4–6 hours",
        issues: ["Full-home deep clean", "Move-in / move-out", "Post-renovation", "Pre-festival cleaning", "General maintenance", "Others"],
        included: ["Dusting & vacuuming", "Floor scrubbing", "Bathroom & kitchen degrease", "Ceiling fan cleaning"],
      }),
      make({
        slug: "kitchen-cleaning",
        name: "Kitchen Cleaning",
        categoryId: "home-cleaning",
        short: "Deep-degrease of every surface — cabinets to chimney.",
        description:
          "Cabinets, tiles, sink, chimney exterior, appliances — professionally degreased with food-safe products.",
        image: s11,
        price: "₹299 visit charge",
        duration: "3–4 hours",
        issues: ["Heavy grease", "Chimney exterior", "Cabinet interiors", "Sink & tap descaling", "Backsplash tiles", "Others"],
        included: ["Full degrease", "Cabinet cleaning", "Tile scrubbing", "Appliance exterior clean"],
      }),
      make({
        slug: "bathroom-cleaning",
        name: "Bathroom Cleaning",
        categoryId: "home-cleaning",
        short: "Tile, grout, fittings — sanitised & disinfected.",
        description:
          "Descaling, disinfection and grout cleaning that leaves bathrooms hotel-grade clean.",
        image: img("photo-1552321554-5fefe8c9ef14"),
        price: "₹599 / bathroom",
        duration: "60–90 min",
        issues: ["Hard water stains", "Grout blackening", "Bad odour", "Descaling fittings", "Full sanitisation", "Others"],
        included: ["Descaling", "Grout scrubbing", "Fitting polish", "Disinfection spray"],
      }),
    ],
  },
  /*
  {
    id: "smart-plus",
    label: "Smart Plus Accessories",
    services: [
      make({
        slug: "fridge-storage-bins",
        name: "Fridge Storage Bins",
        categoryId: "smart-plus",
        short: "Modular stackable bins — organise your fridge in minutes.",
        description:
          "Food-grade transparent storage bins in multiple sizes. Delivered and set up at your doorstep.",
        image: img("photo-1584568694244-14fbdf83bd30"),
        price: "₹499 / set",
        duration: "Same-day delivery",
        issues: ["Small (3 bins)", "Medium (6 bins)", "Large (10 bins)", "Custom combo", "Refill order", "Others"],
        included: ["Food-grade material", "Stackable design", "Free doorstep delivery", "7-day replacement"],
      }),
      make({
        slug: "fruit-vegetable-boxes",
        name: "Fruit & Vegetable Boxes",
        categoryId: "smart-plus",
        short: "Vented boxes that keep produce fresh 3× longer.",
        description:
          "Breathable, food-safe containers designed to extend the shelf-life of fruits and vegetables.",
        image: img("photo-1610348725531-843dff563e2c"),
        price: "₹399 / set",
        duration: "Same-day delivery",
        issues: ["2-box starter", "4-box family", "6-box combo", "Custom combo", "Refill order", "Others"],
        included: ["Vented lids", "Food-grade plastic", "Stackable", "7-day replacement"],
      }),
    ],
  },
  */
  {
    id: "beauty-salon",
    label: "Beauty & Salon",
    services: [
      make({
        slug: "beauty-salon-services",
        name: "Beauty & Salon",
        categoryId: "beauty-salon",
        short: "At-home salon services for grooming and beauty.",
        description:
          "Professional beauticians deliver salon-grade services in the privacy of your home, with single-use kits.",
        image: s12,
        price: "₹299 visit charge",
        duration: "60–120 min",
        issues: ["Waxing", "Threading & de-tan", "Facial & clean-up", "Hair spa / haircut", "Manicure & pedicure", "Others"],
        included: ["Single-use disposables", "Trained beautician", "Premium products", "Sanitised tools"],
      }),
      make({
        slug: "salon-for-men",
        name: "Salon for Men",
        categoryId: "beauty-salon",
        short: "Grooming, beard, hair & spa — for men, at home.",
        description:
          "Certified male groomers deliver haircuts, beard styling, facials and massages at your convenience.",
        image: img("photo-1503951914875-452162b0f3f1"),
        price: "₹299 onwards",
        duration: "45–90 min",
        issues: ["Haircut", "Beard styling", "Facial & clean-up", "Hair colour", "Head massage", "Others"],
        included: ["Trained groomer", "Sanitised tools", "Premium products", "Single-use disposables"],
      }),
      make({
        slug: "spa-massage",
        name: "Spa & Massage",
        categoryId: "beauty-salon",
        short: "Deep-tissue, Swedish & aromatherapy — at home.",
        description:
          "Trained masseuses with portable tables bring a spa-grade experience to your doorstep.",
        image: img("photo-1544161515-4ab6ce6db874"),
        price: "₹1,499 onwards",
        duration: "60–120 min",
        issues: ["Swedish relaxation", "Deep tissue", "Aromatherapy", "Head & shoulder", "Foot reflexology", "Others"],
        included: ["Portable spa table", "Premium oils", "Sanitised linen", "Certified therapist"],
      }),
      make({
        slug: "makeup-services",
        name: "Makeup Services",
        categoryId: "beauty-salon",
        short: "Party, engagement, bridal — pro makeup at home.",
        description:
          "MUAs with 5+ years experience, HD-ready products and full trial sessions available for weddings.",
        image: img("photo-1487412720507-e7ab37603c6f"),
        price: "₹1,999 onwards",
        duration: "60–150 min",
        issues: ["Party makeup", "Engagement", "Bridal makeup", "Airbrush HD", "Trial session", "Others"],
        included: ["HD makeup range", "Hair styling", "Draping assistance", "Touch-up kit"],
      }),
    ],
  },
];

export const allServices: SubService[] = serviceCategories.flatMap((c) => c.services);

export const findService = (slug: string) => allServices.find((s) => s.slug === slug);
export const findCategory = (id: string) => serviceCategories.find((c) => c.id === id);
