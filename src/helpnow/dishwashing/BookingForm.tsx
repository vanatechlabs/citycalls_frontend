import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, ArrowRight, ArrowLeft, Calendar as CalendarIcon, Clock, 
  ShieldCheck, Info, Users, Edit2, User, Sparkles, ChevronRight, ChevronLeft,
  CheckCircle2, PenTool, Lock, Calendar, Zap
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface Props {
  onStepChange?: (step: number) => void;
}

const timeSlots = [
  "Instant (Within 30-45 mins)",
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "01:00 PM - 03:00 PM",
  "03:00 PM - 05:00 PM",
  "05:00 PM - 07:00 PM",
  "07:00 PM - 09:00 PM",
];

const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function BookingForm({ onStepChange }: Props) {
  const [step, setStepState] = useState(1);

  // Step 1: Personal Info — NO AUTOFILL, clean empty fields for user input
  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    whatsapp: "",
    altNumber: "",
    address: "",
    city: "",
    state: "Uttar Pradesh",
    pincode: "",
    language: "English",
    source: "",
    reference: "",
    instructions: "",
    otp: "",
  });
  const [otpState, setOtpState] = useState<"idle" | "sent" | "verified">("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  const PROPERTY_OPTIONS = [
    { id: "1bhk", name: "1 BHK", maids: 1 },
    { id: "2bhk", name: "2 BHK", maids: 1 },
    { id: "3bhk", name: "3 BHK", maids: 2 },
    { id: "4bhk", name: "4 BHK", maids: 3 },
    { id: "villa", name: "Villa / Duplex", maids: 3 },
    { id: "estate", name: "Bungalow / Estate", maids: 4 },
  ];

  // Step 2: Service Details
  const [selectedProperty, setSelectedProperty] = useState("1bhk");
  const [maids, setMaids] = useState(1);
  const [hours, setHours] = useState(3);
  const [isOtherHours, setIsOtherHours] = useState(false);
  const [extraTime, setExtraTime] = useState("none");
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

  // Pricing calculation
  const baseRatePerHour = 159;
  const extraTimeRate = extraTime === "30 mins" ? 79 : extraTime === "1 hr" ? 149 : 0;
  const tasksExtraPrice = selectedTasks.reduce((acc, t) => {
    const item = CLEANING_TASKS.find((ct) => ct.name === t);
    return acc + (item ? item.price : 0);
  }, 0);
  const totalBasePrice = maids * hours * baseRatePerHour;
  const totalPrice = totalBasePrice + extraTimeRate + tasksExtraPrice;

  // Step 3: Date & Time
  const [selectedDay, setSelectedDay] = useState(25);
  const [selectedSlot, setSelectedSlot] = useState("01:00 PM - 03:00 PM");
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTime, setCustomTime] = useState("");

  // Confirmation
  const [isBooked, setIsBooked] = useState(false);
  const [bookingId] = useState(() => `#HN-${Math.floor(10000 + Math.random() * 90000)}`);

  const setStep = (newStep: number) => {
    setStepState(newStep);
    if (onStepChange) onStepChange(newStep);
  };

  const toggleTask = (task: string) => {
    if (selectedTasks.includes(task)) {
      setSelectedTasks(selectedTasks.filter((t) => t !== task));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const updPersonal = (k: keyof typeof personal, v: string) =>
    setPersonal((p) => ({ ...p, [k]: v }));

  const handleSendOtp = () => {
    if (personal.whatsapp.length >= 10) setOtpState("sent");
  };

  const handleVerifyOtp = () => {
    if (personal.otp.length > 0) {
      setOtpState("verified");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getFullDateString = (day: number) => {
    const date = new Date(2026, 8, day);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div 
      className="bg-white rounded-xl overflow-hidden flex flex-col h-full min-h-[600px]"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}
    >
      {/* Header with HelpNow warm theme */}
      {!isBooked && (
        <div className="p-6 md:p-8 pb-0">
          <div className="mb-5">
            <h2 className="text-[22px] font-sans font-black uppercase tracking-tight text-slate-900 leading-tight">
              Book{" "}
              <span className="text-[#f5a623] relative inline-block">
                Dish Washing Service
                {/* Animated underline with HelpNow amber color */}
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full h-2.5"
                  viewBox="0 0 150 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  initial="hidden"
                  animate="visible"
                >
                  <motion.path
                    d="M0 8 L 150 8"
                    stroke="#f5a623"
                    strokeWidth="3"
                    strokeLinecap="round"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          pathLength: { duration: 1.2, ease: "easeInOut", delay: 0.4 },
                          opacity: { duration: 0.3, delay: 0.4 },
                        },
                      },
                    }}
                  />
                </motion.svg>
              </span>
            </h2>
            <p className="text-slate-500 text-[11px] mt-1.5 font-bold uppercase tracking-widest">
              Fast, Reliable & Secure
            </p>
          </div>

          {/* Stepper with HelpNow Amber theme */}
          <div className="-mb-12 relative z-10">
            <div className="flex items-center justify-between lg:justify-start lg:gap-3 mb-3 text-[11px] font-bold border-b border-slate-200 pb-3 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { id: 1, label: "Personal Information" },
                { id: 2, label: "Service Details" },
                { id: 3, label: "Choose Date & Time" },
              ].map((s, i) => {
                const active = step === s.id;
                const done = step > s.id;

                return (
                  <div key={s.id} className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] ${
                        done || active
                          ? "bg-[#f5a623] text-white font-bold"
                          : "bg-white border border-slate-300 text-slate-400 font-semibold"
                      }`}
                    >
                      {done ? (
                        <Check className="w-3 h-3" strokeWidth={3} />
                      ) : active ? (
                        <span>{s.id}</span>
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                    </div>
                    <span
                      className={`${
                        done || active ? "text-[#f5a623] font-bold" : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < 2 && (
                      <div className="hidden sm:flex items-center mx-1.5 opacity-40">
                        <div className="w-6 lg:w-10 h-[1.5px] bg-slate-400" />
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 -ml-1" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Multi-step Form Content */}
      <div className={`flex-1 p-6 md:p-8 pt-0 -mt-2 ${isBooked ? 'p-0 md:p-0' : ''}`}>
        <AnimatePresence mode="wait">
          {/* ================= STEP 1: Personal Information (No Autofill) ================= */}
          {step === 1 && !isBooked && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <div 
                className="bg-white mt-1 relative border border-slate-200"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
              >
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 text-[11px] font-bold"
                    >
                      <div className="bg-white rounded-full p-0.5">
                        <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                      </div>
                      Phone number Verified Successfully!
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6">
                  {/* Header */}
                  <div className="mb-4 border-b border-slate-100 pb-3">
                    <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                        <User className="w-3.5 h-3.5 text-[#b5730f]" />
                      </div>
                      Personal Information
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-0.5 font-medium">
                      Please provide your details so we can reach you easily
                    </p>
                  </div>

                  <form 
                    id="step1-form" 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(2);
                    }} 
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Enter your full name"
                          value={personal.name}
                          onChange={(e) => updPersonal("name", e.target.value)}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="Enter your email address"
                          value={personal.email}
                          onChange={(e) => updPersonal("email", e.target.value)}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          Phone number <span className="text-red-500">*</span>
                        </label>
                        <div
                          className={`flex items-center border ${
                            otpState === "verified"
                              ? "border-emerald-500 bg-emerald-50/20"
                              : "border-slate-300 bg-white"
                          } focus-within:border-[#f5a623] transition-colors`}
                        >
                          {otpState !== "sent" && (
                            <div className="bg-slate-50 px-2.5 py-2 border-r border-slate-300 text-[12px] font-bold text-slate-600">
                              +91
                            </div>
                          )}

                          {otpState === "sent" ? (
                            <input
                              autoFocus
                              type="text"
                              placeholder="Enter OTP"
                              maxLength={6}
                              value={personal.otp}
                              onChange={(e) => updPersonal("otp", e.target.value.replace(/\D/g, ""))}
                              className="flex-1 min-w-0 px-3 py-2 text-[12px] outline-none font-bold text-center tracking-widest"
                            />
                          ) : (
                            <input
                              required
                              type="tel"
                              placeholder="Enter your phone number"
                              value={personal.whatsapp}
                              onChange={(e) => updPersonal("whatsapp", e.target.value.replace(/\D/g, ""))}
                              disabled={otpState === "verified"}
                              className="flex-1 min-w-0 px-3 py-2 text-[12px] outline-none font-medium bg-transparent"
                            />
                          )}

                          {otpState === "idle" && (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className={`text-[10.5px] font-bold text-white px-3 py-1.5 m-1 uppercase tracking-wider transition-colors cursor-pointer ${
                                personal.whatsapp.length >= 10
                                  ? "bg-[#f5a623] hover:bg-[#e0951a]"
                                  : "bg-slate-300 cursor-not-allowed"
                              }`}
                            >
                              Send OTP
                            </button>
                          )}

                          {otpState === "sent" && (
                            <button
                              type="button"
                              onClick={handleVerifyOtp}
                              className={`text-[10.5px] font-bold text-white px-3 py-1.5 m-1 uppercase tracking-wider transition-colors cursor-pointer ${
                                personal.otp.length > 0
                                  ? "bg-emerald-600 hover:bg-emerald-700"
                                  : "bg-slate-300 cursor-not-allowed"
                              }`}
                            >
                              Verify
                            </button>
                          )}

                          {otpState === "verified" && (
                            <div className="px-3">
                              <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} />
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-red-500 font-semibold mt-1 block">
                          We will contact you on this phone number
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          Alternate Number (Optional)
                        </label>
                        <div className="flex items-center border border-slate-300 bg-white focus-within:border-[#f5a623] transition-colors">
                          <div className="bg-slate-50 px-2.5 py-2 border-r border-slate-300 text-[12px] font-bold text-slate-600">
                            +91
                          </div>
                          <input
                            type="tel"
                            placeholder="Enter alternate number"
                            value={personal.altNumber}
                            onChange={(e) => updPersonal("altNumber", e.target.value.replace(/\D/g, ""))}
                            className="flex-1 px-3 py-2 text-[12px] outline-none font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                        Complete Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="House / Flat / Building, Street, Area"
                        value={personal.address}
                        onChange={(e) => updPersonal("address", e.target.value)}
                        className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Enter pincode (e.g. 201010)"
                          value={personal.pincode}
                          onChange={(e) => updPersonal("pincode", e.target.value.replace(/\D/g, ""))}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Enter your city (e.g. Ghaziabad / Ballia)"
                          value={personal.city}
                          onChange={(e) => updPersonal("city", e.target.value)}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={personal.state}
                          onChange={(e) => updPersonal("state", e.target.value)}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors bg-white font-medium"
                        >
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          Preferred Language
                        </label>
                        <select
                          value={personal.language}
                          onChange={(e) => updPersonal("language", e.target.value)}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors bg-white font-medium"
                        >
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Hinglish">Hinglish</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          How did you hear about us?
                        </label>
                        <select
                          value={personal.source}
                          onChange={(e) => updPersonal("source", e.target.value)}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors bg-white font-medium"
                        >
                          <option value="" disabled hidden>Select an option</option>
                          <option value="Google">Google</option>
                          <option value="Facebook">Facebook</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Friend">Friend</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(personal.source === "Friend" || personal.source === "Other") && (
                        <div>
                          <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                            Name (for reference) <span className="text-red-500">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder="Enter name for reference"
                            value={personal.reference}
                            onChange={(e) => updPersonal("reference", e.target.value)}
                            className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors font-medium"
                          />
                        </div>
                      )}
                      <div className={personal.source !== "Friend" && personal.source !== "Other" ? "col-span-1 md:col-span-2" : ""}>
                        <label className="block text-[11px] font-bold text-slate-900 mb-1.5">
                          Any instructions for us? (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Gate number, landmark, floor number etc."
                          value={personal.instructions}
                          onChange={(e) => updPersonal("instructions", e.target.value)}
                          className="w-full border border-slate-300 px-3 py-2 text-[12px] outline-none focus:border-[#f5a623] transition-colors font-medium"
                        />
                      </div>
                    </div>
                  </form>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-1.5 text-blue-600 text-[11px] font-medium">
                    <ShieldCheck className="w-4 h-4" />
                    100% secure info
                  </div>

                  <button
                    form="step1-form"
                    type="submit"
                    className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-6 py-2.5 font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    Next Step
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 2: Service Details (Select Maids & Duration) ================= */}
          {step === 2 && !isBooked && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <div 
                className="bg-white mt-1 relative border border-slate-200"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
              >
                <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6">
                  {/* Title Bar */}
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-[15px] font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-[#b5730f]" />
                        </div>
                        Select Maids & Duration
                      </h3>
                      <p className="text-blue-600 text-[11px] mt-0.5 font-semibold">
                        Transparent hourly pricing with flexible extra time support
                      </p>
                    </div>
                    <div className="bg-[#fff6e8] border border-[#f5a623]/30 px-3 py-1 text-[11px] font-bold text-[#b5730f] shrink-0 rounded">
                      ₹{baseRatePerHour} / hr per maid
                    </div>
                  </div>

                  <form 
                    id="step2-form" 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(3);
                    }} 
                    className="space-y-5"
                  >
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
                              className={`py-2 px-1.5 border text-center transition-all cursor-pointer rounded flex flex-col justify-center min-h-[52px] ${
                                isSelected
                                  ? "border-[#f5a623] bg-[#fff6e8]/50 text-slate-900 font-bold ring-1 ring-[#f5a623]"
                                  : "border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300"
                              }`}
                            >
                              <div className="text-[11px] font-bold leading-tight">{opt.name}</div>
                              <div
                                className={`text-[9px] mt-0.5 ${
                                  isSelected ? "text-[#b5730f] font-semibold" : "text-slate-400 font-normal"
                                }`}
                              >
                                {opt.maids} Maid{opt.maids > 1 ? "s" : ""}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Hours Needed Selection (Fixed Base Rate Cards) */}
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
                              className={`py-2 px-1.5 border text-center transition-all cursor-pointer rounded flex flex-col justify-center min-h-[52px] ${
                                isSelected
                                  ? "border-[#f5a623] bg-[#fff6e8]/50 text-slate-900 font-bold ring-1 ring-[#f5a623]"
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
                          className={`py-2 px-1.5 border text-center transition-all cursor-pointer rounded flex flex-col justify-center min-h-[52px] ${
                            isOtherHours
                              ? "border-[#f5a623] bg-[#fff6e8]/50 text-slate-900 font-bold ring-1 ring-[#f5a623]"
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
                        <div className="mt-2.5 p-2.5 bg-amber-50/60 border border-[#f5a623]/30 rounded flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-800">
                            Specify Custom Hours (5 to 16 hrs):
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setHours(Math.max(5, hours - 1))}
                              className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer text-xs transition-colors shadow-xs"
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
                              className="w-12 text-center text-[12px] font-bold border border-slate-300 rounded py-1 bg-white focus:outline-none focus:border-[#f5a623]"
                            />
                            <span className="text-[11px] font-medium text-slate-600">hrs</span>
                            <button
                              type="button"
                              onClick={() => setHours(Math.min(16, hours + 1))}
                              className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer text-xs transition-colors shadow-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Extra Time Buffer Pricing */}
                    <div className="bg-slate-50 border border-slate-200 p-3.5 rounded">
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
                            className={`py-1.5 px-2 border text-center transition-all cursor-pointer rounded ${
                              extraTime === opt.value
                                ? "border-[#f5a623] bg-[#fff6e8]/50 text-slate-900 font-bold ring-1 ring-[#f5a623]"
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
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 px-4 py-2 text-[12px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer rounded"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <div>
                      <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                        Estimated Total
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-slate-900">₹{totalPrice}</span>
                        <span className="text-[11px] font-semibold text-red-500">
                          ({PROPERTY_OPTIONS.find((p) => p.id === selectedProperty)?.name} · {maids} maid{maids > 1 ? "s" : ""} · {hours} hrs)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    form="step2-form"
                    type="submit"
                    className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-6 py-2.5 font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm rounded"
                  >
                    Continue to Date & Time
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 3: Choose Date & Time ================= */}
          {step === 3 && !isBooked && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <div 
                className="bg-white mt-1 relative border border-slate-200"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
              >
                <div className="px-4 pt-4 pb-5 md:px-6 md:pt-4 md:pb-6">
                  {/* Header */}
                  <div className="mb-5 border-b border-slate-100 pb-3">
                    <h3 className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                        <Calendar className="w-3.5 h-3.5 text-[#b5730f]" />
                      </div>
                      Choose Date & Time
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-0.5 font-medium">
                      Select a convenient date and time slot for our expert to visit.
                    </p>
                  </div>

                  <form 
                    id="step3-form" 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(4);
                    }} 
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* LEFT COLUMN: Mini Interactive Calendar + Selected Date Banner */}
                      <div className="space-y-3">
                        <label className="block text-[11px] font-bold text-slate-900">
                          Select Date <span className="text-red-500">*</span>
                        </label>

                        <div className="border border-slate-200 p-4 bg-white rounded">
                          {/* Month Selector */}
                          <div className="flex items-center justify-between mb-4">
                            <button type="button" className="p-1 hover:bg-slate-100 rounded transition-colors">
                              <ChevronLeft className="w-4 h-4 text-slate-600" />
                            </button>
                            <span className="text-[13px] font-bold text-slate-900">September 2026</span>
                            <button type="button" className="p-1 hover:bg-slate-100 rounded transition-colors">
                              <ChevronRight className="w-4 h-4 text-slate-600" />
                            </button>
                          </div>

                          {/* Weekday Labels */}
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {weekDays.map((d) => (
                              <span key={d} className="text-[10px] font-bold text-slate-400">
                                {d}
                              </span>
                            ))}
                          </div>

                          {/* Days Grid */}
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {[30, 31].map((prevDay) => (
                              <span key={`prev-${prevDay}`} className="text-[11px] text-slate-300 py-1.5">
                                {prevDay}
                              </span>
                            ))}
                            {daysInMonth.map((day) => {
                              const isSelected = selectedDay === day;
                              const isPast = day < 5;
                              return (
                                <button
                                  type="button"
                                  key={day}
                                  disabled={isPast}
                                  onClick={() => setSelectedDay(day)}
                                  className={`py-1.5 text-[11px] font-bold transition-all rounded ${
                                    isSelected
                                      ? "bg-[#f5a623] text-white shadow-xs font-extrabold"
                                      : isPast
                                      ? "text-slate-300 cursor-not-allowed"
                                      : "text-slate-700 hover:bg-slate-100 cursor-pointer"
                                  }`}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Selected Date Indicator Banner */}
                        <div className="bg-[#fff6e8] border border-[#f5a623]/30 p-3 flex items-center gap-3 rounded">
                          <CalendarIcon className="w-4 h-4 text-[#b5730f] shrink-0" />
                          <div>
                            <div className="text-[10px] text-slate-500 font-bold">Selected Date</div>
                            <div className="text-[11.5px] font-bold text-blue-600">
                              {getFullDateString(selectedDay)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT COLUMN: Time Slots */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-900 flex items-center gap-1.5">
                            Select Time Slot <span className="text-red-500">*</span>
                            <button
                              type="button"
                              onClick={() => setIsCustomTime(!isCustomTime)}
                              className={`p-1 border text-[10px] transition-colors rounded ${
                                isCustomTime
                                  ? "border-red-500 bg-red-500 text-white"
                                  : "border-slate-200 text-slate-400 hover:border-slate-300"
                              }`}
                              title="Set Custom Time"
                            >
                              <Clock className="w-3 h-3" />
                            </button>
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsCustomTime(!isCustomTime)}
                            className="text-[10px] text-blue-600 font-semibold hover:underline cursor-pointer"
                          >
                            Click <Clock className="w-2.5 h-2.5 inline mx-0.5" /> for custom time
                          </button>
                        </div>

                        {isCustomTime ? (
                          <div className="border border-slate-200 p-4 space-y-2 bg-white rounded">
                            <label className="text-[11px] font-bold text-slate-700 block">
                              Enter Specific Time
                            </label>
                            <input
                              type="time"
                              required
                              value={customTime}
                              onChange={(e) => setCustomTime(e.target.value)}
                              className="w-full border border-slate-300 p-2 text-[12px] outline-none focus:border-[#f5a623] rounded"
                            />
                            <p className="text-[10px] text-slate-400">
                              Our maid will arrive at your specified time.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            {timeSlots.map((slot) => {
                              const isChecked = selectedSlot === slot;
                              const isInstant = slot.startsWith("Instant");
                              return (
                                <button
                                  type="button"
                                  key={slot}
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`w-full p-2.5 border text-left flex items-center justify-between transition-all cursor-pointer rounded ${
                                    isChecked
                                      ? "border-[#f5a623] bg-[#fff6e8] text-slate-900 font-bold ring-1 ring-[#f5a623]"
                                      : isInstant
                                      ? "border-amber-300 bg-amber-50/50 text-slate-800 font-medium hover:border-amber-400 hover:bg-amber-50"
                                      : "border-slate-200 bg-white text-slate-700 font-medium hover:border-slate-300"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                        isChecked ? "border-[#f5a623]" : "border-slate-300"
                                      }`}
                                    >
                                      {isChecked && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
                                      )}
                                    </div>
                                    <span className="text-[11.5px] flex items-center gap-1.5">
                                      {isInstant && <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />}
                                      {slot}
                                    </span>
                                  </div>
                                  {isInstant && (
                                    <span className="text-[9.5px] font-bold uppercase tracking-wider bg-amber-500 text-white px-1.5 py-0.5 rounded shrink-0">
                                      ⚡ Fastest
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        <div className="bg-[#fff6e8] border border-[#f5a623]/30 p-2.5 flex items-center gap-2.5 rounded">
                          <Clock className="w-3.5 h-3.5 text-[#b5730f]" />
                          <div>
                            <span className="text-[10px] text-slate-500 font-bold block">Duration</span>
                            <span className="text-[11px] font-medium text-slate-900">
                              Estimated {hours} hours dedicated cleaning
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3.5 flex items-start gap-3">
                      <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[12px] font-bold text-emerald-900 mb-0.5">Important Notes</h4>
                        <p className="text-[11px] text-emerald-800/90 font-medium leading-relaxed">
                          Our expert will arrive within the selected time slot. You will receive a call or WhatsApp message from our team before the visit.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-slate-200 p-4 flex items-center justify-between bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 px-4 py-2 text-[12px] font-bold tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer rounded"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>

                  <button
                    form="step3-form"
                    type="submit"
                    className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-6 py-2.5 font-bold text-[12px] uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-sm rounded"
                  >
                    Review Booking
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= STEP 4: Review Your Booking (Exact CityCalls Refrigerator Layout & Colors) ================= */}
          {step === 4 && !isBooked && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <div 
                className="bg-white mt-1 relative border border-slate-200 rounded-xl"
                style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
              >
                <div className="p-4 md:p-5 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-[14px] font-bold text-ink">Review Your Booking</h3>
                    <p className="text-ink/60 text-[11px] mt-0.5 mb-4 font-medium">
                      Please check all the details below and confirm your booking.
                    </p>
                  </div>

                  {/* 1. Personal Information Card */}
                  <div className="border border-black/10 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                          <User className="w-3.5 h-3.5 text-[#b5730f]" />
                        </div>
                        <h4 className="text-[12px] font-bold text-ink">Personal Information</h4>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="flex items-center gap-1 text-[#b5730f] border border-[#f5a623] hover:bg-[#fff6e8] px-3 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {/* Left Column */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Full Name</span>
                          <span className="text-[11px] font-medium text-[#4B1426] break-words">{personal.name || "—"}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">WhatsApp No.</span>
                          <span className="text-[11px] font-medium text-ink break-words">{personal.whatsapp ? `+91 ${personal.whatsapp}` : "—"}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Email Address</span>
                          <span className="text-[11px] font-medium text-blue-600 break-words flex-1">{personal.email || "—"}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Address</span>
                          <span className="text-[11px] font-medium text-ink leading-relaxed break-words flex-1">{personal.address || "—"}</span>
                        </div>
                      </div>
                      {/* Right Column */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">City</span>
                          <span className="text-[11px] font-medium text-ink break-words">{personal.city || "—"}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">State</span>
                          <span className="text-[11px] font-medium text-ink break-words">{personal.state || "—"}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Pincode</span>
                          <span className="text-[11px] font-medium text-ink break-words">{personal.pincode || "—"}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Language</span>
                          <span className="text-[11px] font-medium text-ink break-words">{personal.language || "English"}</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Alternate No.</span>
                          <span className="text-[11px] font-medium text-ink break-words">{personal.altNumber ? `+91 ${personal.altNumber}` : "Not Provided"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Service Details Card */}
                  <div className="border border-black/10 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                          <PenTool className="w-3.5 h-3.5 text-[#b5730f]" />
                        </div>
                        <h4 className="text-[12px] font-bold text-ink">Service Details</h4>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setStep(2)} 
                        className="flex items-center gap-1 text-[#b5730f] border border-[#f5a623] hover:bg-[#fff6e8] px-3 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Category</span>
                          <span className="text-[11px] font-medium text-[#4B1426] break-words">HelpNow Cleaning</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Sub Category</span>
                          <span className="text-[11px] font-medium text-ink break-words">Dish Washing Service</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Home & Maids</span>
                          <span className="text-[11px] font-medium text-ink break-words">
                            {PROPERTY_OPTIONS.find((p) => p.id === selectedProperty)?.name} ({maids} Verified Maid{maids > 1 ? "s" : ""})
                          </span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Working Hours</span>
                          <span className="text-[11px] font-medium text-ink break-words">{hours} Hours Selected</span>
                        </div>
                        <div className="flex items-start">
                          <span className="text-[10px] text-ink/60 font-bold w-24 md:w-28 shrink-0 mt-0.5">Extra Protection</span>
                          <span className="text-[11px] font-medium text-ink break-words">
                            {extraTime === "none" ? "none (₹0)" : extraTime === "30 mins" ? "+30 Mins Extra (+₹79)" : "+1 Hour Extra (+₹149)"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <div>
                          <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Tasks</span>
                          <span className="text-[11px] font-medium text-ink leading-relaxed block break-words">
                            {selectedTasks.length > 0 ? selectedTasks.join(", ") : "Dish Washing"}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Pricing Model</span>
                          <span className="text-[11px] font-medium text-emerald-600 block">₹159 / hr per maid · Pay after service completion</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Date & Time Slot Card */}
                  <div className="border border-black/10 rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-black/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#fff6e8] flex items-center justify-center">
                          <Calendar className="w-3.5 h-3.5 text-[#b5730f]" />
                        </div>
                        <h4 className="text-[12px] font-bold text-ink">Date & Time Slot</h4>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setStep(3)} 
                        className="flex items-center gap-1 text-[#b5730f] border border-[#f5a623] hover:bg-[#fff6e8] px-3 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" /> Edit
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Scheduled Date</span>
                        <span className="text-[11px] font-medium text-blue-600 flex items-center gap-1">
                          {getFullDateString(selectedDay)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Arrival Slot</span>
                        <span className="text-[11px] font-medium text-[#4B1426] flex items-center gap-1">
                          {isCustomTime ? (customTime || "01:00 PM - 03:00 PM") : selectedSlot}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-ink/60 font-bold block mb-0.5">Duration</span>
                        <span className="text-[11px] font-medium text-ink flex items-center gap-1">
                          Estimated {hours} Hours Selected
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Total Amount Payable Card */}
                  <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/70 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-ink/60 font-bold uppercase tracking-wider block">
                        Total Amount Payable
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                        Pay after service completion
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl md:text-2xl font-black text-slate-900">
                        ₹{totalPrice}
                      </span>
                      <span className="block text-[10px] text-slate-500 font-medium">
                        ({PROPERTY_OPTIONS.find((p) => p.id === selectedProperty)?.name} · {maids} {maids > 1 ? "maids" : "maid"} · {hours} hrs{extraTime !== "none" ? ` + ${extraTime}` : ""})
                      </span>
                    </div>
                  </div>

                  {/* Important Notes Box */}
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3.5 flex items-start gap-3">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[12px] font-bold text-emerald-900 mb-0.5">Important Notes</h4>
                      <p className="text-[11px] text-emerald-800/90 font-medium leading-relaxed">
                        Our expert will arrive within the selected time slot. You will receive a call or WhatsApp message from our team before the visit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-black/5 p-4 flex items-center justify-between gap-4 bg-black/[0.01]">
                  <button 
                    type="button" 
                    onClick={() => setStep(3)} 
                    className="cursor-pointer border border-black/20 bg-white text-ink hover:bg-black/5 px-4 py-1.5 rounded font-bold text-[12px] shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>

                  <button 
                    type="button" 
                    onClick={() => setIsBooked(true)} 
                    className="cursor-pointer bg-[#f5a623] text-white px-5 py-1.5 rounded font-bold text-[12px] shadow-sm hover:bg-[#e0951a] transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    Confirm & Place Order
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Security info note below */}
                <div className="flex items-center justify-center gap-1.5 py-3 text-blue-600 bg-white border-t border-slate-100">
                  <Lock className="w-3 h-3" />
                  <span className="text-[10px] font-medium">Your information is 100% secure and will never be shared.</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= SUCCESS CONFIRMATION ================= */}
          {isBooked && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[500px]"
            >
              <div className="w-24 h-24 mb-4">
                <DotLottieReact
                  src="https://lottie.host/8046aa79-d5c4-4b55-a2a9-72f87c10b777/m8Qn7tZgWJ.lottie"
                  loop={false}
                  autoplay
                />
              </div>

              <div className="inline-block bg-[#fff6e8] text-[#b5730f] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-[#f5a623]/30">
                {bookingId}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-1">
                Dish Washing Maid Booked!
              </h3>
              <p className="text-slate-500 text-xs max-w-sm mb-6 leading-relaxed">
                Thank you, <strong className="text-slate-900">{personal.name || "Customer"}</strong>. Your background-verified maid details and live tracking link have been sent to <strong className="text-slate-900">{personal.whatsapp ? `+91 ${personal.whatsapp}` : "your mobile number"}</strong>.
              </p>

              <div className="bg-slate-50 border border-slate-200 p-4 text-left w-full max-w-sm mb-6 text-[12px] space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Service:</span>
                  <span className="font-semibold text-slate-900">HelpNow Dish Washing</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Schedule:</span>
                  <span className="font-semibold text-slate-900">{getFullDateString(selectedDay)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Time Slot:</span>
                  <span className="font-bold text-[#4B1426]">{isCustomTime ? customTime : selectedSlot}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Team:</span>
                  <span className="font-semibold text-slate-900">
                    {PROPERTY_OPTIONS.find((p) => p.id === selectedProperty)?.name} ({maids} Maid{maids > 1 ? "s" : ""}) · {hours} Hours
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 pt-1 border-t border-slate-200">
                  <span>Amount Payable:</span>
                  <span className="font-bold text-emerald-600">₹{totalPrice} (Cash After Service)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsBooked(false);
                  setStep(1);
                }}
                className="bg-[#f5a623] hover:bg-[#e0951a] text-white px-8 py-3 font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer rounded"
              >
                Book Another Service
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
