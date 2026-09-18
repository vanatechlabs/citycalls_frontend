import { useState } from "react";
import { ArrowRight, Clock, Users, Sparkles, Check, Info } from "lucide-react";

interface Step1Props {
  onNext?: () => void;
}

export function Step1({ onNext }: Step1Props) {
  const PROPERTY_OPTIONS = [
    { id: "1bhk", name: "1 BHK", maids: 1 },
    { id: "2bhk", name: "2 BHK", maids: 1 },
    { id: "3bhk", name: "3 BHK", maids: 2 },
    { id: "4bhk", name: "4 BHK", maids: 3 },
    { id: "villa", name: "Villa / Duplex", maids: 3 },
    { id: "estate", name: "Bungalow / Estate", maids: 4 },
  ];

  const [selectedProperty, setSelectedProperty] = useState("1bhk");
  const [maids, setMaids] = useState(1);
  const [hours, setHours] = useState(3);
  const [isOtherHours, setIsOtherHours] = useState(false);
  const [extraTime, setExtraTime] = useState("30 mins");
  const CLEANING_TASKS = [
    { name: "Dish Washing", price: 0, tag: "Included" },
    { name: "Kitchen Deep Clean", price: 99, tag: "+₹99" },
    { name: "Fan & Window Wiping", price: 79, tag: "+₹79" },
    { name: "Floor Mopping & Sweeping", price: 69, tag: "+₹69" },
    { name: "Laundry & Ironing", price: 89, tag: "+₹89" },
    { name: "Bathroom Sanitization", price: 119, tag: "+₹119" },
  ];

  const [selectedTasks, setSelectedTasks] = useState<string[]>([
    "Dish Washing",
    "Kitchen Deep Clean",
  ]);

  const baseRatePerHour = 159;
  const extraTimeRate = extraTime === "30 mins" ? 79 : extraTime === "1 hr" ? 149 : 0;
  const tasksExtraPrice = selectedTasks.reduce((acc, t) => {
    const item = CLEANING_TASKS.find((ct) => ct.name === t);
    return acc + (item ? item.price : 0);
  }, 0);
  const totalBasePrice = maids * hours * baseRatePerHour;
  const totalPrice = totalBasePrice + extraTimeRate + tasksExtraPrice;

  const toggleTask = (task: string) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter((t) => t !== task));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext) onNext();
  };

  return (
    <div className="bg-white mt-1 relative border border-slate-200">
      <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#f5a623]" />
              Select Maids & Duration
            </h3>
            <p className="text-blue-600 text-[11px] mt-0.5 font-semibold">
              Transparent hourly pricing with flexible extra time support
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold text-emerald-600 shrink-0">
            ₹{baseRatePerHour} / hr per maid
          </div>
        </div>

        <form id="step1-form" onSubmit={handleSubmit} className="space-y-5">
          {/* Maid Count & Home Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[11px] font-bold text-slate-900">
                Number of Verified Maids Needed <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] font-bold text-[#b5730f]">
                {PROPERTY_OPTIONS.find((p) => p.id === selectedProperty)?.name} ({maids} {maids > 1 ? "Maids" : "Maid"})
              </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PROPERTY_OPTIONS.map((opt) => {
                const isSelected = selectedProperty === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => {
                      setSelectedProperty(opt.id);
                      setMaids(opt.maids);
                    }}
                    className={`py-2 px-1.5 border text-center transition-all cursor-pointer flex flex-col justify-center min-h-[52px] ${
                      isSelected
                        ? "border-[#f5a623] bg-[#fff6e8] text-[#b5730f] font-bold shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300"
                    }`}
                  >
                    <div className="text-[11px] font-bold leading-tight">{opt.name}</div>
                    <div
                      className={`text-[9px] mt-0.5 ${
                        isSelected ? "text-[#b5730f] font-medium" : "text-slate-400 font-normal"
                      }`}
                    >
                      {opt.maids} Maid{opt.maids > 1 ? "s" : ""}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hours Needed Selection */}
          <div>
            <label className="block text-[11px] font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span>Required Working Hours <span className="text-red-500">*</span></span>
              <span className="text-[11px] font-bold text-[#b5730f]">{hours} Hour{hours > 1 ? "s" : ""} Selected</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4].map((h) => {
                const isSelected = !isOtherHours && hours === h;
                return (
                  <button
                    type="button"
                    key={h}
                    onClick={() => {
                      setIsOtherHours(false);
                      setHours(h);
                    }}
                    className={`py-2 px-1.5 border text-center transition-all cursor-pointer flex flex-col justify-center min-h-[52px] ${
                      isSelected
                        ? "border-[#f5a623] bg-[#fff6e8] text-[#b5730f] font-bold shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300"
                    }`}
                  >
                    <div className="text-[12px]">{h} hr{h > 1 ? "s" : ""}</div>
                    <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">
                      ₹{h * baseRatePerHour}
                    </div>
                  </button>
                );
              })}

              {/* Others Option */}
              <button
                type="button"
                onClick={() => {
                  setIsOtherHours(true);
                  if (hours <= 4) setHours(5);
                }}
                className={`py-2 px-1.5 border text-center transition-all cursor-pointer flex flex-col justify-center min-h-[52px] ${
                  isOtherHours
                    ? "border-[#f5a623] bg-[#fff6e8] text-[#b5730f] font-bold shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300"
                }`}
              >
                <div className="text-[12px]">Others</div>
                <div className="text-[9px] text-emerald-600 font-semibold mt-0.5">
                  {isOtherHours ? `₹${hours * baseRatePerHour}` : "Custom"}
                </div>
              </button>
            </div>

            {/* Custom Hours Stepper if Others is selected */}
            {isOtherHours && (
              <div className="mt-2.5 p-2.5 bg-amber-50/60 border border-[#f5a623]/30 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800">
                  Specify Custom Hours (5 to 16 hrs):
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHours(Math.max(5, hours - 1))}
                    className="w-7 h-7 border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer text-xs transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={5}
                    max={16}
                    value={hours}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 5;
                      setHours(Math.max(1, Math.min(24, val)));
                    }}
                    className="w-12 text-center text-[12px] font-bold border border-slate-300 py-1 bg-white focus:outline-none focus:border-[#f5a623]"
                  />
                  <span className="text-[11px] font-medium text-slate-600">hrs</span>
                  <button
                    type="button"
                    onClick={() => setHours(Math.min(16, hours + 1))}
                    className="w-7 h-7 border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer text-xs transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Extra Time Buffer Pricing */}
          <div className="bg-slate-50 border border-slate-200 p-3.5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#f5a623]" />
                Extra Time Protection (Optional)
              </label>
              <span className="text-[10px] text-red-500 font-semibold">In case of deep grease/dirt</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "None", value: "none", price: "₹0" },
                { label: "+30 Mins Extra", value: "30 mins", price: "+₹79" },
                { label: "+1 Hour Extra", value: "1 hr", price: "+₹149" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setExtraTime(opt.value)}
                  className={`py-1.5 px-2 border text-center transition-all cursor-pointer ${
                    extraTime === opt.value
                      ? "border-[#f5a623] bg-white text-[#b5730f] font-bold"
                      : "border-slate-200 bg-white text-slate-600 font-medium hover:border-slate-300"
                  }`}
                >
                  <div className="text-[11px]">{opt.label}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">{opt.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tasks checklist in Light Blue Container */}
          <div className="bg-[#f0f7ff] border border-[#cbe2fe] p-3.5 rounded-lg">
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1e40af]" />
                Select Cleaning Requirements (Add-on Services)
              </label>
              <span className="text-[10px] text-[#1e40af] font-semibold bg-white border border-[#bfdbfe] px-2 py-0.5 rounded-full shadow-xs">
                {selectedTasks.length} Selected{tasksExtraPrice > 0 ? ` (+₹${tasksExtraPrice})` : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CLEANING_TASKS.map((task) => {
                const checked = selectedTasks.includes(task.name);
                return (
                  <button
                    type="button"
                    key={task.name}
                    onClick={() => toggleTask(task.name)}
                    className={`flex flex-col justify-between p-2.5 border text-left transition-all cursor-pointer rounded-lg min-h-[66px] ${
                      checked
                        ? "border-[#2563eb] bg-white text-slate-900 font-bold shadow-xs ring-1 ring-[#2563eb]"
                        : "border-[#dbeafe] bg-white text-slate-700 font-medium hover:border-[#93c5fd] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 rounded-xs mt-0.5 transition-colors ${
                          checked ? "bg-[#2563eb] border-[#2563eb] text-white" : "border-slate-300 bg-white"
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" strokeWidth={3} />}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-900 leading-snug break-words">
                        {task.name}
                      </span>
                    </div>

                    <div className="mt-2 pl-6 flex items-center">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          checked
                            ? task.price === 0
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                            : "text-slate-500 bg-slate-100 border border-slate-200"
                        }`}
                      >
                        {task.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </form>
      </div>

      {/* Footer Price + CTA */}
      <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
        <div>
          <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
            Estimated Total
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-emerald-600">₹{totalPrice}</span>
            <span className="text-[11px] font-semibold text-red-500">
              ({PROPERTY_OPTIONS.find((p) => p.id === selectedProperty)?.name} · {maids} {maids > 1 ? "maids" : "maid"} · {hours} hrs)
            </span>
          </div>
        </div>

        <button
          form="step1-form"
          type="submit"
          className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-6 py-2.5 font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
        >
          Continue to Date & Time
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
