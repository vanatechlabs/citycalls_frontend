import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo/seoMetadata";

const fallbackMetadata: Metadata = {
  title: "Terms & Conditions | CityCalls",
  description:
    "The terms for booking and using CityCalls home services — bookings, pricing, payments, cancellations, warranty and liability.",
};

export function generateMetadata() {
  return buildMetadata("/terms", fallbackMetadata);
}

const sections: LegalSection[] = [
  {
    id: "about",
    title: "About these terms",
    body: (
      <>
        <p>
          These Terms &amp; Conditions apply when you use citycalls.in or book a service through CityCalls, a brand operated
          by <strong>CityTimes India Co.</strong>, Raj Nagar, Ghaziabad, Uttar Pradesh (&quot;CityCalls&quot;, &quot;we&quot;, &quot;us&quot;).
        </p>
        <p>By booking a service or using the website, you agree to these terms. If you do not agree, please do not use our services.</p>
      </>
    ),
  },
  {
    id: "services",
    title: "Our services",
    body: (
      <p>
        CityCalls arranges home services — appliance repair and installation, home and sofa cleaning, pest control, beauty
        and other services — carried out by trained, background-verified technicians and service partners. Service
        availability depends on your location, the time slot and technician availability.
      </p>
    ),
  },
  {
    id: "bookings",
    title: "Bookings",
    body: (
      <ul>
        <li>You can book on our website, by phone or on WhatsApp. A booking is confirmed once we share a booking/registration number.</li>
        <li>Please give accurate details — address, contact number and a clear description of the problem. Wrong details may delay or cancel the visit.</li>
        <li>Someone aged 18 or above must be present at the address during the service.</li>
        <li>Time slots are indicative; we will inform you if a technician is running late.</li>
      </ul>
    ),
  },
  {
    id: "pricing",
    title: "Pricing & visit charge",
    body: (
      <ul>
        <li>A <strong>visit/inspection charge</strong> (currently ₹299 for most services, unless stated otherwise) applies for the technician&apos;s visit and diagnosis.</li>
        <li>Package prices shown on the website are &quot;starting from&quot; prices. The final amount depends on the actual work and spare parts needed.</li>
        <li>For repairs, the technician shares an estimate before starting. Work begins only after you approve it.</li>
        <li>If you approve the repair, the visit charge is usually adjusted in the final bill; if you decline, only the visit charge is payable.</li>
        <li>All prices are in Indian Rupees and include applicable taxes unless stated otherwise.</li>
      </ul>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <p>
        Payment is due once the service is completed, by UPI, card, wallet or cash. You will receive an invoice for every
        paid service. Please pay only through official CityCalls channels and ask for a receipt for cash payments.
      </p>
    ),
  },
  {
    id: "cancellation",
    title: "Cancellation & rescheduling",
    body: (
      <ul>
        <li>You can cancel or reschedule free of charge before the technician leaves for your address.</li>
        <li>If the technician has already arrived, the visit charge may apply.</li>
        <li>We may cancel or reschedule a booking because of technician unavailability, safety concerns, bad weather or incorrect booking details. We will inform you and help rebook.</li>
      </ul>
    ),
  },
  {
    id: "warranty",
    title: "Service warranty",
    body: (
      <>
        <p>
          Most repairs come with a <strong>30-day service warranty</strong> on the work done, starting from the service date. If
          the same problem returns within this period, we will re-inspect and fix it at no extra labour cost.
        </p>
        <ul>
          <li>Spare parts carry the manufacturer&apos;s or supplier&apos;s warranty, where available.</li>
          <li>The warranty does not cover new or unrelated faults, physical or water damage, power fluctuations, misuse, or repairs done by anyone else after our visit.</li>
          <li>Cleaning and pest control results depend on site conditions; follow-up visits, where included, are mentioned at booking.</li>
        </ul>
      </>
    ),
  },
  {
    id: "customer-responsibilities",
    title: "Your responsibilities",
    body: (
      <ul>
        <li>Provide safe access to the appliance or area, with electricity and water supply where needed.</li>
        <li>Keep valuables secured and remove fragile items from the work area.</li>
        <li>Inform the technician about any known safety hazard, such as electrical faults or gas leakage.</li>
        <li>Treat our technicians with respect. We may refuse service in case of abusive or unsafe behaviour.</li>
      </ul>
    ),
  },
  {
    id: "liability",
    title: "Liability",
    body: (
      <p>
        Our technicians take care while working. If damage is directly caused by our technician&apos;s negligence, please report
        it within 48 hours of the service and we will review it fairly. Our total liability for any booking is limited to the
        amount paid for that service. We are not liable for pre-existing defects, old or worn-out parts that fail during
        normal handling, or indirect losses.
      </p>
    ),
  },
  {
    id: "offers",
    title: "Offers & coupons",
    body: (
      <p>
        Coupon codes and offers are valid only for the services, dates and conditions stated with them, cannot be exchanged
        for cash and usually cannot be combined. We may change or withdraw an offer at any time, and may cancel bookings that
        misuse offers.
      </p>
    ),
  },
  {
    id: "website-use",
    title: "Using our website",
    body: (
      <p>
        The CityCalls name, logo, content and design are owned by CityTimes India Co. You may not copy, misuse or try to
        disrupt the website, submit false bookings or impersonate others. Links to third-party websites are provided for
        convenience; we are not responsible for their content.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Your personal data is handled as described in our <a href="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</a>.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law & disputes",
    body: (
      <p>
        These terms are governed by the laws of India. We will first try to resolve any complaint amicably — please contact
        us at hello@citycalls.in or +91 74288 08884. Any dispute that cannot be resolved will be subject to the jurisdiction
        of the courts at Ghaziabad, Uttar Pradesh.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms from time to time. The &quot;Last updated&quot; date at the top shows the current version.
        Bookings already confirmed follow the terms in place when they were made.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Clear & fair"
      title="Terms & Conditions"
      highlight="Conditions"
      intro="The simple rules for booking and using CityCalls home services — bookings, pricing, payments, cancellations, warranty and more."
      lastUpdated="6 October 2026"
      sections={sections}
    />
  );
}
