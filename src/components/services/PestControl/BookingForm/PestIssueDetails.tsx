"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShieldAlert, UploadCloud, X } from "lucide-react";

import type { ServiceDetailsStepProps } from "@/components/booking/BookingForm/BookingForm";
import { useBookingData } from "@/components/booking/BookingData/BookingDataContext";
import { PEST_ICONS } from "../pestIcons";
import {
  EXTRA_LABELS, HOUSEHOLD_SAFETY, INFESTATION_LEVELS, LAST_TREATMENT, OCCUPANCY, PROPERTY_SIZES, PROPERTY_TYPES,
  SIGHTING_FREQUENCY,
} from "./pestFormOptions";
import { usePestFormConfig } from "./PestFormContext";

const SELECT = "w-full cursor-pointer rounded border border-black/20 px-3 py-2 text-[12px] font-medium text-ink outline-none transition-colors focus:border-primary-dark";
const LABEL = "mb-1.5 block text-[11px] font-bold text-ink";
const TILE = (selected: boolean) =>
  `relative rounded border px-2 py-2 text-[10px] font-medium transition-colors ${selected ? "border-[#3e8914] bg-[#3e8914]/5 text-[#3e8914]" : "border-black/20 text-ink hover:border-black/30"}`;

function SelectedTick() {
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3e8914] text-white">
      <Check className="h-2.5 w-2.5" strokeWidth={3} />
    </span>
  );
}

// Step 2 of the booking form for any pest control service: property details,
// what was seen, how bad it is, and who's at home. Service-specific parts
// come from that service's content/formOptions.ts.
export function PestIssueDetails({ onBack, onNext }: ServiceDetailsStepProps) {
  const config = usePestFormConfig();
  const booking = useBookingData();
  const saved = booking?.service;
  const savedExtra = (label: string) => saved?.extraDetails?.find((d) => d.label === label)?.value;

  // Pre-filled from the booking when coming back via "Edit" on the review step.
  const [form, setForm] = useState(() => ({
    propertyType: saved?.applianceType ?? "2 BHK",
    propertySize: saved?.capacity ?? "",
    infestation: savedExtra(EXTRA_LABELS.infestation) ?? "Medium",
    treatment: savedExtra(config.treatmentLabel) ?? config.treatments[0] ?? "",
    frequency: SIGHTING_FREQUENCY.find((f) => f.value === saved?.issueFrequency)?.label ?? "Every day",
    occupancy: savedExtra(EXTRA_LABELS.occupancy) ?? OCCUPANCY[0],
    lastTreatment: savedExtra(EXTRA_LABELS.lastTreatment) ?? LAST_TREATMENT[0],
    household: saved?.safetyConcern ?? "",
    description: saved?.issueDescription ?? "",
  }));
  const [selectedIssues, setSelectedIssues] = useState<string[]>(() =>
    saved ? config.issues.filter((o) => saved.issues.includes(o.label)).map((o) => o.id) : [config.defaultIssueId]
  );
  const [issueError, setIssueError] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  function toggleIssue(issueId: string) {
    setSelectedIssues((current) => {
      const next = current.includes(issueId) ? current.filter((id) => id !== issueId) : [...current, issueId];
      if (next.length > 0) setIssueError(false);
      return next;
    });
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.target.files ?? []);
    const allowed = selected.filter((file) => file.size <= 5 * 1024 * 1024).slice(0, Math.max(0, 5 - files.length));
    event.target.value = "";
    if (allowed.length === 0) return;
    setFiles((current) => [...current, ...allowed]);
    setShowUploadSuccess(true);
    window.setTimeout(() => setShowUploadSuccess(false), 2500);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (selectedIssues.length === 0) {
      setIssueError(true);
      return;
    }
    booking?.setService({
      applianceType: form.propertyType,
      capacity: form.propertySize,
      issues: config.issues.filter((o) => selectedIssues.includes(o.id)).map((o) => o.label),
      issueDescription: form.description,
      issueFrequency: SIGHTING_FREQUENCY.find((f) => f.label === form.frequency)?.value,
      safetyConcern: form.household,
      extraDetails: [
        { label: EXTRA_LABELS.infestation, value: form.infestation },
        { label: config.treatmentLabel, value: form.treatment },
        { label: EXTRA_LABELS.occupancy, value: form.occupancy },
        { label: EXTRA_LABELS.lastTreatment, value: form.lastTreatment },
      ],
    });
    onNext();
  }

  return (
    <div
      className="relative mt-1 overflow-hidden rounded-xl bg-white"
      style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset" }}
    >
      <div className="p-4 md:p-5">
        <h3 className="text-[14px] font-bold text-ink">{config.stepTitle}</h3>
        <p className="mb-6 mt-0.5 text-[11px] font-medium text-ink/60">{config.stepSubtitle}</p>

        <form id={config.formId} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={LABEL}>Property Type <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {PROPERTY_TYPES.map((type) => (
                  <button key={type} type="button" onClick={() => updateField("propertyType", type)} className={TILE(form.propertyType === type)}>
                    {form.propertyType === type && <SelectedTick />}
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className={LABEL}>Property Size</label>
                <select className={SELECT} value={form.propertySize} onChange={(event) => updateField("propertySize", event.target.value)}>
                  <option value="">Select carpet area</option>
                  {PROPERTY_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
                </select>
              </div>
              <div>
                <label className={LABEL}>{config.treatmentLabel}</label>
                <select className={SELECT} value={form.treatment} onChange={(event) => updateField("treatment", event.target.value)}>
                  {config.treatments.map((treatment) => <option key={treatment} value={treatment}>{treatment}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label className="block text-[11px] font-bold text-ink">
                {config.issueLabel} <span className="text-red-500">*</span> <span className="ml-1 text-[10px] font-normal text-ink/50">(Select all that apply)</span>
              </label>
              {issueError && <span className="text-[10px] font-semibold text-red-500">Select at least one option</span>}
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {config.issues.map((issue) => {
                const Icon = PEST_ICONS[issue.icon];
                const selected = selectedIssues.includes(issue.id);
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => toggleIssue(issue.id)}
                    className={`relative flex items-center justify-center gap-2 rounded border px-2 py-3 transition-colors ${selected ? "border-[#3e8914] bg-[#3e8914]/5" : "border-black/20 hover:border-black/30"}`}
                  >
                    {selected && <SelectedTick />}
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${selected ? "text-[#3e8914]" : "text-ink/60"}`} />
                    <span className={`text-[10px] font-bold ${selected ? "text-[#3e8914]" : "text-ink"}`}>{issue.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={LABEL}>Infestation Level <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {INFESTATION_LEVELS.map((level) => (
                  <button key={level.value} type="button" onClick={() => updateField("infestation", level.value)} className={`${TILE(form.infestation === level.value)} flex flex-col items-center gap-0.5`}>
                    {form.infestation === level.value && <SelectedTick />}
                    <span className="text-[11px] font-bold">{level.value}</span>
                    <span className="text-[9px] opacity-70">{level.hint}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={LABEL}>How often do you see them?</label>
              <div className="grid grid-cols-2 gap-2">
                {SIGHTING_FREQUENCY.map((option) => (
                  <button key={option.label} type="button" onClick={() => updateField("frequency", option.label)} className={`${TILE(form.frequency === option.label)} flex items-center gap-2`}>
                    <span className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full border ${form.frequency === option.label ? "border-[#3e8914]" : "border-black/30"}`}>
                      {form.frequency === option.label && <span className="h-1.5 w-1.5 rounded-full bg-[#3e8914]" />}
                    </span>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className={LABEL}>Describe the problem <span className="text-red-500">*</span></label>
            <div className="relative">
              <textarea
                required
                rows={3}
                maxLength={500}
                placeholder={config.descriptionPlaceholder}
                className="w-full resize-none rounded border border-black/20 px-3 py-2 text-[12px] font-medium outline-none transition-colors placeholder:font-normal placeholder:text-ink/40 focus:border-primary-dark"
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
              <span className="absolute bottom-2 right-2 bg-white px-1 text-[10px] font-medium text-ink/40">{form.description.length}/500</span>
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-[11px] font-bold text-ink">Upload Photos (Optional)</label>
              <AnimatePresence>
                {showUploadSuccess && (
                  <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="rounded-full bg-[#3e8914] px-3 py-1 text-[10px] font-bold text-white">Photos added</motion.span>
                )}
              </AnimatePresence>
            </div>
            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded-md border border-dashed border-[#3e8914]/40 bg-[#3e8914]/[0.02] p-3 text-center transition-colors hover:bg-[#3e8914]/[0.05]">
              <span className="flex items-center gap-2 text-[#3e8914]"><UploadCloud className="h-4 w-4" /><span className="text-[12px] font-bold text-ink">{config.photoHint}</span></span>
              <span className="mt-0.5 text-[10px] font-medium text-ink/50">Maximum 5 images, 5 MB each</span>
            </button>
            <input ref={fileInputRef} type="file" multiple accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileChange} />
            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((file, index) => (
                  <span key={`${file.name}-${index}`} className="flex items-center gap-1.5 rounded border border-black/10 bg-black/5 px-2 py-1 text-[10px] font-medium text-ink">
                    <span className="max-w-32 truncate">{file.name}</span>
                    <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="text-red-500"><X className="h-3 w-3" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className={LABEL}>Property Status</label>
              <select className={SELECT} value={form.occupancy} onChange={(event) => updateField("occupancy", event.target.value)}>
                {OCCUPANCY.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Last Pest Treatment</label>
              <select className={SELECT} value={form.lastTreatment} onChange={(event) => updateField("lastTreatment", event.target.value)}>
                {LAST_TREATMENT.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Anyone sensitive at home?</label>
              <div className="relative">
                <ShieldAlert className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/40" />
                <select className="w-full rounded border border-black/20 py-2 pl-9 pr-3 text-[12px] font-medium outline-none focus:border-primary-dark" value={form.household} onChange={(event) => updateField("household", event.target.value)}>
                  <option value="">Select</option>
                  {HOUSEHOLD_SAFETY.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-black/[0.01] p-4">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 rounded border border-black/20 bg-white px-4 py-1.5 text-[12px] font-bold text-ink shadow-sm transition-colors hover:bg-black/5"><ArrowLeft className="h-3.5 w-3.5" /> Back</button>
        <button form={config.formId} type="submit" className="flex items-center gap-1.5 rounded bg-[#3e8914] px-5 py-1.5 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-[#347311]">Choose Date &amp; Time <ArrowRight className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}
