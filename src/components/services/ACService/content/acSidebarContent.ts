import type { ServiceSidebarContent } from "@/components/services/RefrigeratorService/ServiceSidebar/ServiceSidebar";

// AC-specific trust points, contact details, coverage copy and FAQs.
export const acSidebarContent: ServiceSidebarContent = {
  whyChooseTitle: "Why Choose CityCalls for AC Service?",
  whyChooseItems: [
    "Split, window and inverter AC experts",
    "Jet-pump deep cleaning",
    "Genuine parts and correct refrigerant",
    "Service warranty up to 30 days",
  ],
  contactTitle: "AC Service Support",
  phone: "+91 74288 08884",
  whatsapp: "+91 74288 08884",
  email: "hello@citycalls.in",
  hours: "Mon-Sat: 9:00 AM – 8:00 PM",
  coverageTitle: "AC Service Coverage",
  coverageLines: ["All major areas in Ghaziabad", "and nearby locations."],
  faqs: [
    {
      q: "Do you service split, window and inverter ACs?",
      a: "Yes. Our trained technicians service split, window, inverter and cassette AC systems from all major brands.",
    },
    {
      q: "How long does an AC service take?",
      a: "Standard AC service usually takes 45–75 minutes. Repairs, installation or gas charging may take longer after diagnosis.",
    },
    {
      q: "Do you use genuine parts and the correct gas?",
      a: "Yes. We use genuine or company-approved parts and the refrigerant specified for your AC model.",
    },
    {
      q: "Is there a warranty on AC repair?",
      a: "Eligible AC repairs include up to a 30-day service warranty. Part warranties follow the manufacturer terms.",
    },
  ],
};
