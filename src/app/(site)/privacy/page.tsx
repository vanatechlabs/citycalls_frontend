import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const fallbackMetadata: Metadata = {
  title: "Privacy Policy | CityCalls",
  description:
    "How CityCalls (CityTimes India Co.) collects, uses, shares and protects your personal data when you book home services.",
};

export function generateMetadata() {
  return buildMetadata("/privacy", fallbackMetadata);
}

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          CityCalls is a home services brand operated by <strong>CityTimes India Co.</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;),
          based in Raj Nagar, Ghaziabad, Uttar Pradesh. We connect customers with background-verified technicians for
          appliance repair, cleaning, pest control, beauty and other home services.
        </p>
        <p>
          This Privacy Policy explains what personal data we collect when you use citycalls.in, call us, message us on
          WhatsApp or book a service, and how we use and protect it. It is written in line with the Digital Personal Data
          Protection Act, 2023 and the Information Technology Act, 2000.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>We only ask for what we need to deliver and support your service:</p>
        <ul>
          <li><strong>Contact details</strong> — name, mobile number, alternate number and email address.</li>
          <li><strong>Service address</strong> — house address, city, state and pincode, so a technician can reach you.</li>
          <li><strong>Booking details</strong> — the service you choose, appliance type, brand, model, capacity, the issues you describe, photos you share, and your preferred date and time slot.</li>
          <li><strong>Payment information</strong> — amount paid and payment status. Card, UPI and bank details are handled by our payment partners; we do not store full card numbers or UPI PINs.</li>
          <li><strong>Communication records</strong> — calls, WhatsApp messages and emails with our support team, used to resolve your request.</li>
          <li><strong>Technical data</strong> — device and browser type, IP address, pages visited and cookies, collected automatically when you use our website.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    body: (
      <ul>
        <li>To confirm, schedule and complete your booking, and to send booking updates by call, SMS, WhatsApp or email.</li>
        <li>To assign a suitable technician and share the details they need to do the job.</li>
        <li>To prepare estimates and invoices, collect payment and honour our service warranty.</li>
        <li>To answer questions, handle complaints and follow up on service quality.</li>
        <li>To improve our website, services and pricing, and to prevent fraud and misuse.</li>
        <li>To share offers and service reminders — only where you have agreed, and you can opt out at any time.</li>
        <li>To meet legal, tax and regulatory requirements.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We do not sell your personal data. We share it only when needed to serve you:</p>
        <ul>
          <li><strong>Technicians and service partners</strong> assigned to your booking — your name, phone number, address and service details.</li>
          <li><strong>Service providers</strong> who help us run CityCalls — payment gateways, SMS/WhatsApp and email providers, cloud hosting and image storage — under confidentiality obligations.</li>
          <li><strong>Authorities</strong> when required by law, a court order, or to protect the rights and safety of our customers, technicians or the public.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        Our website uses cookies and similar technologies to keep it working (for example, remembering items in your booking
        cart), to understand how visitors use it, and to improve it. You can block or delete cookies in your browser
        settings; some parts of the site may not work properly without them.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep data",
    body: (
      <p>
        We keep booking and invoice records for as long as needed to provide the service, honour warranties, resolve
        disputes and meet accounting and tax laws (generally up to 8 years for financial records). Marketing preferences
        are kept until you opt out. Data we no longer need is deleted or anonymised.
      </p>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        We use reasonable security safeguards — encrypted connections (HTTPS), access controls so only authorised staff see
        customer data, and trusted hosting providers. No system is completely secure, so please keep your phone and email
        accounts safe and tell us straight away if you suspect misuse.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <p>Under Indian data protection law you can:</p>
        <ul>
          <li>Ask what personal data we hold about you and how it is used.</li>
          <li>Ask us to correct, complete or update your data.</li>
          <li>Ask us to erase your data when it is no longer needed (subject to legal record-keeping).</li>
          <li>Withdraw consent for marketing messages at any time.</li>
          <li>Nominate another person to exercise these rights on your behalf.</li>
          <li>Raise a grievance with us, and if unresolved, with the Data Protection Board of India.</li>
        </ul>
        <p>Write to <strong>hello@citycalls.in</strong> to use any of these rights. We will respond within 30 days.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        Our services are meant for adults (18+). We do not knowingly collect personal data from children. If you believe a
        child has shared data with us, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "grievance",
    title: "Grievance officer",
    body: (
      <p>
        For any privacy concern or complaint, contact our Grievance Officer at <strong>hello@citycalls.in</strong> or
        <strong> +91 74288 08884</strong> (Mon–Sun, 8:00 AM – 8:00 PM), or write to CityTimes India Co., Raj Nagar, Ghaziabad,
        Uttar Pradesh 201002. We acknowledge complaints within 48 hours and aim to resolve them within 30 days.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy as our services or the law change. The &quot;Last updated&quot; date at the top shows the latest
        version; important changes will be highlighted on the website.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Your data, protected"
      title="Privacy Policy"
      highlight="Policy"
      intro="We respect your privacy. This policy explains what we collect when you book a CityCalls service, why we need it, who we share it with and the choices you have."
      lastUpdated="6 October 2026"
      sections={sections}
    />
  );
}
