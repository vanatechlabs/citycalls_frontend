"use client";

import { useState, type ReactNode } from "react";
import { ArrowLeft, Calendar, Check, Edit2, Info, Loader2, Lock, PenTool, TriangleAlert, User } from "lucide-react";
import { useBookingData } from "../BookingData/BookingDataContext";

interface Step4Props {
  onBack: () => void;
  onEditStep: (step: number) => void;
  onSubmit: () => void;
}

function formatDay(day?: string) {
  if (!day) return undefined;
  return new Date(`${day}T00:00:00`).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function Row({ label, children, valueClass = "text-ink" }: { label: string; children?: ReactNode; valueClass?: string }) {
  return (
    <div className="flex items-start">
      <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">{label}</span>
      <span className={`text-[11px] font-medium break-words flex-1 ${valueClass}`}>{children || "—"}</span>
    </div>
  );
}

function SectionCard({ icon, title, onEdit, children }: { icon: ReactNode; title: string; onEdit: () => void; children: ReactNode }) {
  return (
    <div className="border border-black/10 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#3e8914]/10 flex items-center justify-center">{icon}</div>
          <h4 className="text-[12px] font-bold text-ink">{title}</h4>
        </div>
        <button type="button" onClick={onEdit} className="flex items-center gap-1 text-[#3e8914] border border-[#3e8914] hover:bg-[#3e8914]/5 px-3 py-1 rounded text-[10px] font-bold transition-colors">
          <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>
      {children}
    </div>
  );
}

// Review of everything entered in steps 1–3; "Confirm Booking" saves it as a
// registration (Admin → Registration Section → Pending, unread).
export function Step4({ onBack, onEditStep, onSubmit }: Step4Props) {
  const booking = useBookingData();
  const personal = booking?.personal;
  const service = booking?.service;
  const schedule = booking?.schedule;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!booking) {
      onSubmit();
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await booking.submit();
      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-1 flex flex-col h-full">
      <div
        className="rounded-xl overflow-hidden bg-white relative flex-1"
        style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
      >
        <div className="p-4 md:p-5">
          <h3 className="text-[14px] font-bold text-ink">Review Your Booking</h3>
          <p className="text-ink/60 text-[11px] mt-0.5 mb-4 font-medium">
            Please check all the details below and confirm your booking.
          </p>

          <form id="step4-form" onSubmit={handleSubmit} className="space-y-4">
            <SectionCard icon={<User className="w-3.5 h-3.5 text-[#3e8914]" />} title="Personal Information" onEdit={() => onEditStep(1)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex flex-col gap-3">
                  <Row label="Full Name" valueClass="text-[#4B1426]">{personal?.fullName}</Row>
                  <Row label="Phone No.">{personal?.phone && `+91 ${personal.phone}`}</Row>
                  <Row label="Email Address" valueClass="text-blue-600">{personal?.email}</Row>
                  <Row label="Address">{personal?.address}</Row>
                </div>
                <div className="flex flex-col gap-3">
                  <Row label="City">{personal?.city}</Row>
                  <Row label="State">{personal?.state}</Row>
                  <Row label="Pincode">{personal?.pincode}</Row>
                  <Row label="Language">{personal?.language}</Row>
                  <Row label="Alternate No.">{personal?.altPhone && `+91 ${personal.altPhone}`}</Row>
                </div>
              </div>
            </SectionCard>

            <SectionCard icon={<PenTool className="w-3.5 h-3.5 text-[#3e8914]" />} title="Service Details" onEdit={() => onEditStep(2)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex flex-col gap-3">
                  <Row label="Service" valueClass="text-[#4B1426]">{booking?.serviceName}</Row>
                  <Row label="Type">{service?.applianceType}</Row>
                  <Row label="Brand">{service?.brand}</Row>
                  <Row label="Model">{service?.modelNumber}</Row>
                  <Row label="Capacity / Size">{service?.capacity}</Row>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] text-ink/60 font-bold block mb-1">Issue / Problem</span>
                    <div className="flex flex-wrap gap-1 mb-1.5">
                      {service?.issues.map((issue) => (
                        <span key={issue} className="rounded border border-[#3e8914]/30 bg-[#3e8914]/5 px-1.5 py-0.5 text-[10px] font-bold text-[#3e8914]">{issue}</span>
                      ))}
                    </div>
                    <span className="text-[11px] font-medium text-ink leading-relaxed block break-words">{service?.issueDescription || "—"}</span>
                  </div>
                  {service?.extraDetails?.filter((d) => d.value).map((d) => (
                    <Row key={d.label} label={d.label}>{d.value}</Row>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard icon={<Calendar className="w-3.5 h-3.5 text-[#3e8914]" />} title="Date & Time" onEdit={() => onEditStep(3)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Selected Date</span>
                  <span className="text-[11px] font-medium text-blue-600">{formatDay(schedule?.preferredDate) ?? "—"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Selected Time Slot</span>
                  <span className="text-[11px] font-medium text-[#4B1426]">{schedule?.timeSlot || "—"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Duration</span>
                  <span className="text-[11px] font-medium text-ink">Estimated 60 - 90 minutes</span>
                </div>
              </div>
            </SectionCard>

            <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3.5 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#3e8914] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[12px] font-bold text-emerald-900 mb-0.5">Important Notes</h4>
                <p className="text-[11px] text-emerald-800/90 font-medium leading-relaxed">
                  Our expert will arrive within the selected time slot. You will receive a call or WhatsApp message from our team before the visit.
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-[11px] font-bold text-red-700">
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {error}
              </div>
            )}
          </form>
        </div>

        <div className="border-t border-black/5 p-4 flex items-center justify-between gap-4 bg-black/[0.01]">
          <button type="button" onClick={onBack} disabled={submitting} className="cursor-pointer border border-black/20 bg-white text-ink hover:bg-black/5 px-4 py-1.5 rounded font-bold text-[12px] shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-60">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          <button form="step4-form" type="submit" disabled={submitting} className="cursor-pointer bg-[#3e8914] text-white px-5 py-1.5 rounded font-bold text-[12px] shadow-sm hover:bg-[#347311] transition-colors flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-70">
            {submitting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Confirming...</> : <>Confirm Booking <Check className="w-3.5 h-3.5" /></>}
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-3 text-blue-600 pb-2">
        <Lock className="w-3 h-3" />
        <span className="text-[10px] font-medium">Your information is 100% secure and will never be shared.</span>
      </div>
    </div>
  );
}
