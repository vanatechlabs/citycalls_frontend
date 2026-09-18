import { useState, useRef } from "react";
import { ArrowRight, ArrowLeft, UploadCloud, TriangleAlert, X, Check, Snowflake, Droplets, Volume2, DoorOpen, Flame, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Step2Props {
  onBack: () => void;
  onNext: () => void;
}

export function Step2({ onBack, onNext }: Step2Props) {
  const [form, setForm] = useState({
    brand: "LG",
    model: "",
    fridgeType: "Double Door",
    capacity: "",
    description: "",
    frequency: "Always",
    safetyConcern: ""
  });
  const [selectedIssues, setSelectedIssues] = useState<string[]>(["Not Cooling"]);
  const [issueError, setIssueError] = useState(false);

  const upd = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const toggleIssue = (issueId: string) => {
    setSelectedIssues((prev) => {
      const exists = prev.includes(issueId);
      const next = exists ? prev.filter((id) => id !== issueId) : [...prev, issueId];
      if (next.length > 0) setIssueError(false);
      return next;
    });
  };

  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIssues.length === 0) {
      setIssueError(true);
      return;
    }
    onNext();
  };

  const fridgeTypes = [
    { id: "Single Door", label: "Single Door" },
    { id: "Double Door", label: "Double Door" },
    { id: "Side by Side", label: "Side by Side" },
  ];

  const issueTypes = [
    { id: "Not Cooling", label: "Not Cooling", icon: Snowflake },
    { id: "Cooling Issues", label: "Cooling Issues", icon: Snowflake },
    { id: "Gas Leakage", label: "Gas Leakage", icon: Flame },
    { id: "Water Leakage", label: "Water Leakage", icon: Droplets },
    { id: "Ice Build-up", label: "Ice Build-up", icon: Snowflake },
    { id: "Strange Noise", label: "Strange Noise", icon: Volume2 },
    { id: "Door Issue", label: "Door Issue", icon: DoorOpen },
    { id: "Other Issue", label: "Other Issue", icon: HelpCircle },
  ];

  return (
    <div 
      className="rounded-xl overflow-hidden bg-white mt-1 relative"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
    >
      <div className="p-4 md:p-5">
        <h3 className="text-[14px] font-bold text-ink">Step 2: Issue Details</h3>
        <p className="text-ink/60 text-[11px] mt-0.5 mb-6 font-medium">
          Tell us more about the issue with your appliance
        </p>

        <form id="step2-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Select Appliance Brand <span className="text-red-500">*</span></label>
              <select required className="w-full border border-black/20 rounded px-3 py-2 text-[12px] outline-none focus:border-primary-dark transition-colors cursor-pointer font-medium text-ink" value={form.brand} onChange={e => upd("brand", e.target.value)}>
                <option value="LG">LG</option>
                <option value="Samsung">Samsung</option>
                <option value="Whirlpool">Whirlpool</option>
                <option value="Godrej">Godrej</option>
                <option value="Haier">Haier</option>
                <option value="Bosch">Bosch</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Model Number (Optional)</label>
              <input type="text" placeholder="Enter model number" className="w-full border border-black/20 rounded px-3 py-2 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40" value={form.model} onChange={e => upd("model", e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Refrigerator Type <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {fridgeTypes.map((type) => (
                  <div 
                    key={type.id}
                    onClick={() => upd("fridgeType", type.id)}
                    className={`border rounded px-2 py-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors relative ${
                      form.fridgeType === type.id ? 'border-[#3e8914] bg-[#3e8914]/5' : 'border-black/20 hover:border-black/30'
                    }`}
                  >
                    {form.fridgeType === type.id && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#3e8914] rounded-full flex items-center justify-center text-white">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                    )}
                    <span className="text-[10px] text-center font-medium text-ink">{type.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Refrigerator Capacity (in Liters)</label>
              <select className="w-full border border-black/20 rounded px-3 py-2 text-[12px] outline-none focus:border-primary-dark transition-colors cursor-pointer font-medium text-ink" value={form.capacity} onChange={e => upd("capacity", e.target.value)}>
                <option value="" disabled hidden className="text-ink/40">Select capacity</option>
                <option value="Below 200L">Below 200L</option>
                <option value="200L - 300L">200L - 300L</option>
                <option value="300L - 400L">300L - 400L</option>
                <option value="Above 400L">Above 400L</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold text-ink">
                What seems to be the issue? <span className="text-red-500">*</span>
                <span className="text-[10px] font-normal text-ink/50 ml-1.5">(Select all that apply)</span>
              </label>
              {issueError && (
                <span className="text-[10px] font-semibold text-red-500">
                  Please select at least one issue
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {issueTypes.map((issue) => {
                const Icon = issue.icon;
                const isSelected = selectedIssues.includes(issue.id);
                return (
                  <div 
                    key={issue.id}
                    onClick={() => toggleIssue(issue.id)}
                    className={`border rounded px-2 py-3 flex items-center justify-center gap-2 cursor-pointer transition-colors relative select-none ${
                      isSelected ? 'border-[#3e8914] bg-[#3e8914]/5' : 'border-black/20 hover:border-black/30'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#3e8914] rounded-full flex items-center justify-center text-white z-10">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                    )}
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#3e8914]' : 'text-ink/60'}`} />
                    <span className={`text-[10px] font-bold ${isSelected ? 'text-[#3e8914]' : 'text-ink'}`}>{issue.label}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-ink mb-1.5">Please describe the issue in detail <span className="text-red-500">*</span></label>
            <div className="relative">
              <textarea 
                required 
                rows={3}
                placeholder="E.g. Refrigerator is not cooling from last 2 days, not freezing properly, etc." 
                className="w-full border border-black/20 rounded px-3 py-2 text-[12px] outline-none focus:border-primary-dark transition-colors font-medium placeholder:font-normal placeholder:text-ink/40 resize-none" 
                value={form.description} 
                onChange={e => upd("description", e.target.value.substring(0, 500))} 
              />
              <span className="absolute bottom-2 right-2 text-[10px] text-ink/40 font-medium bg-white px-1">
                {form.description.length}/500
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold text-ink">Upload Photos (Optional) <span className="text-red-500">*</span></label>
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="bg-[#3e8914] text-white px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 text-[10px] font-bold"
                  >
                    <div className="bg-white rounded-full p-0.5">
                      <Check className="w-2.5 h-2.5 text-[#3e8914]" strokeWidth={3} />
                    </div>
                    Files Uploaded Successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-[#3e8914]/40 bg-[#3e8914]/[0.02] rounded-md p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#3e8914]/[0.05] transition-colors"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                multiple 
                accept="image/png, image/jpeg, image/jpg, video/mp4" 
              />
              <div className="flex items-center gap-2 text-[#3e8914]">
                <UploadCloud className="w-4 h-4" />
                <span className="text-[12px] font-bold text-ink">Click to upload images</span>
              </div>
              <p className="text-[10px] text-ink/50 font-medium mt-0.5">Upload clear photos of the issue (Max 5 images, 5MB each)</p>
              <p className="text-[9px] text-ink/40 font-medium mt-0.5">JPG, PNG or WebP</p>
            </div>

            {files.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-black/5 border border-black/10 rounded px-2 py-1">
                    <span className="text-[10px] font-medium text-ink truncate max-w-[120px]" title={file.name}>{file.name}</span>
                    <button 
                      type="button" 
                      onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                      className="text-red-500 hover:text-red-600 bg-white rounded-full p-0.5"
                    >
                      <X className="w-2.5 h-2.5" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">How often is the issue happening?</label>
              <div className="grid grid-cols-2 gap-2">
                {["Always", "Sometimes", "Occasionally", "Once"].map((option) => (
                  <div 
                    key={option}
                    onClick={() => upd("frequency", option)}
                    className={`border rounded px-2 py-2 flex items-center gap-2 cursor-pointer transition-colors ${
                      form.frequency === option ? 'border-[#3e8914] bg-[#3e8914]/5' : 'border-black/20 hover:border-black/30'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                      form.frequency === option ? 'border-[#3e8914]' : 'border-black/30'
                    }`}>
                      {form.frequency === option && <div className="w-1.5 h-1.5 rounded-full bg-[#3e8914]" />}
                    </div>
                    <span className="text-[10px] font-medium text-ink">{option}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-ink mb-1.5">Any Safety Concern?</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40">
                  <TriangleAlert className="w-3.5 h-3.5" />
                </div>
                <select className="w-full border border-black/20 rounded pl-9 pr-3 py-2 text-[12px] outline-none focus:border-primary-dark transition-colors cursor-pointer font-medium text-ink" value={form.safetyConcern} onChange={e => upd("safetyConcern", e.target.value)}>
                  <option value="" disabled hidden className="text-ink/40">Select if there is any safety concern</option>
                  <option value="electrical">Electrical Hazard</option>
                  <option value="leakage">Gas / Water Leakage</option>
                  <option value="none">No safety concern</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      
      {/* Footer of the box */}
      <div className="border-t border-black/5 p-4 flex items-center justify-between gap-4 bg-black/[0.01]">
        <button type="button" onClick={onBack} className="border border-black/20 bg-white text-ink hover:bg-black/5 px-4 py-1.5 rounded font-bold text-[12px] shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
        <button form="step2-form" type="submit" className="bg-[#3e8914] text-white px-5 py-1.5 rounded font-bold text-[12px] shadow-sm hover:bg-[#347311] transition-colors flex items-center justify-center gap-1.5 shrink-0">
          Continue to Next Step
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
