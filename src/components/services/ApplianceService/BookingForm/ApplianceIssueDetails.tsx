"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, TriangleAlert, UploadCloud, X } from "lucide-react";

import type { ServiceDetailsStepProps } from "@/components/booking/BookingForm/BookingForm";
import { toIssueFrequency, useBookingData } from "@/components/booking/BookingData/BookingDataContext";
import { ISSUE_ICONS } from "../issueIcons";
import { useApplianceFormConfig } from "./ApplianceFormContext";

const SELECT = "w-full cursor-pointer rounded border border-black/20 px-3 py-2 text-[12px] font-medium text-ink outline-none transition-colors focus:border-primary-dark";
const LABEL = "mb-1.5 block text-[11px] font-bold text-ink";

// Step 2 of the booking form for any appliance — same layout as the AC form
// (ACService/BookingForm/ACIssueDetails), with fields from the service's
// content/formOptions.ts.
export function ApplianceIssueDetails({ onBack, onNext }: ServiceDetailsStepProps) {
  const config = useApplianceFormConfig();
  const booking = useBookingData();
  const saved = booking?.service;
  const savedExtra = (label: string) => saved?.extraDetails?.find((d) => d.label === label)?.value;
  // Pre-filled from the booking when coming back via "Edit" on the review step.
  const [form, setForm] = useState(() => ({
    brand: saved?.brand ?? config.brands[0] ?? "",
    model: saved?.modelNumber ?? "",
    type: saved?.applianceType ?? config.types[0] ?? "",
    capacity: saved?.capacity ?? "",
    age: savedExtra(config.ageLabel) ?? "",
    description: saved?.issueDescription ?? "",
    frequency: saved?.issueFrequency === "Once" ? "First time" : saved?.issueFrequency ?? "Always",
    extraAnswer: savedExtra(config.extraQuestion.label) ?? config.extraQuestion.options[0] ?? "",
    safetyConcern: config.safetyOptions.find((o) => o.label === saved?.safetyConcern)?.value ?? "",
  }));
  const [selectedIssues, setSelectedIssues] = useState<string[]>(() =>
    saved ? config.issues.filter((o) => saved.issues.includes(o.label)).map((o) => o.id) : [config.defaultIssueId]
  );
  const [issueError, setIssueError] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

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
      brand: form.brand,
      modelNumber: form.model,
      applianceType: form.type,
      capacity: form.capacity,
      issues: config.issues.filter((o) => selectedIssues.includes(o.id)).map((o) => o.label),
      issueDescription: form.description,
      issueFrequency: toIssueFrequency(form.frequency),
      safetyConcern: config.safetyOptions.find((o) => o.value === form.safetyConcern)?.label,
      extraDetails: [
        { label: config.ageLabel, value: form.age },
        { label: config.extraQuestion.label, value: form.extraAnswer },
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
              <label className={LABEL}>{config.brandLabel} <span className="text-red-500">*</span></label>
              <select required className={SELECT} value={form.brand} onChange={(event) => updateField("brand", event.target.value)}>
                {config.brands.map((brand) => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Model Number (Optional)</label>
              <input
                type="text"
                placeholder={config.modelPlaceholder}
                className="w-full rounded border border-black/20 px-3 py-2 text-[12px] font-medium outline-none transition-colors placeholder:font-normal placeholder:text-ink/40 focus:border-primary-dark"
                value={form.model}
                onChange={(event) => updateField("model", event.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={LABEL}>{config.typeLabel} <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-2 gap-2">
                {config.types.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => updateField("type", type)}
                    className={`relative rounded border px-2 py-2 text-[10px] font-medium transition-colors ${form.type === type ? "border-[#3e8914] bg-[#3e8914]/5 text-[#3e8914]" : "border-black/20 text-ink hover:border-black/30"}`}
                  >
                    {form.type === type && <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3e8914] text-white"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>}
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={LABEL}>{config.capacityLabel}</label>
                <select className={SELECT} value={form.capacity} onChange={(event) => updateField("capacity", event.target.value)}>
                  <option value="">{config.capacityPlaceholder}</option>
                  {config.capacities.map((capacity) => <option key={capacity} value={capacity}>{capacity}</option>)}
                </select>
              </div>
              <div>
                <label className={LABEL}>{config.ageLabel}</label>
                <select className={SELECT} value={form.age} onChange={(event) => updateField("age", event.target.value)}>
                  <option value="">Select age</option>
                  <option value="Under 1 year">Under 1 year</option>
                  <option value="1-3 years">1–3 years</option>
                  <option value="3-5 years">3–5 years</option>
                  <option value="Above 5 years">Above 5 years</option>
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
                const Icon = ISSUE_ICONS[issue.icon];
                const selected = selectedIssues.includes(issue.id);
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => toggleIssue(issue.id)}
                    className={`relative flex items-center justify-center gap-2 rounded border px-2 py-3 transition-colors ${selected ? "border-[#3e8914] bg-[#3e8914]/5" : "border-black/20 hover:border-black/30"}`}
                  >
                    {selected && <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#3e8914] text-white"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>}
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${selected ? "text-[#3e8914]" : "text-ink/60"}`} />
                    <span className={`text-[10px] font-bold ${selected ? "text-[#3e8914]" : "text-ink"}`}>{issue.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className={LABEL}>{config.descriptionLabel} <span className="text-red-500">*</span></label>
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
              <label className="block text-[11px] font-bold text-ink">{config.photoLabel}</label>
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
              <label className={LABEL}>How often does it happen?</label>
              <select className={SELECT} value={form.frequency} onChange={(event) => updateField("frequency", event.target.value)}>
                {["Always", "Sometimes", "Occasionally", "First time"].map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>{config.extraQuestion.label}</label>
              <select className={SELECT} value={form.extraAnswer} onChange={(event) => updateField("extraAnswer", event.target.value)}>
                {config.extraQuestion.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL}>Safety Concern</label>
              <div className="relative">
                <TriangleAlert className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink/40" />
                <select className="w-full rounded border border-black/20 py-2 pl-9 pr-3 text-[12px] font-medium outline-none focus:border-primary-dark" value={form.safetyConcern} onChange={(event) => updateField("safetyConcern", event.target.value)}>
                  <option value="">Select concern</option>
                  {config.safetyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
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
