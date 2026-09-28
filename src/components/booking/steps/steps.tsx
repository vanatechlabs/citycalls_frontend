"use client";

import { Check, Plus, Minus, CreditCard, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import type { BookingData } from "@/types";
import { popularPackages } from "../../../data/packages";
import { useBooking } from "@/context/BookingContext";

const stepLabels = ["Cart", "Details", "Slot", "Payment", "Done"];

export function Stepper({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {stepLabels.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div key={label} className="flex items-center gap-1.5 flex-1">
            <div
              className={`grid place-items-center h-7 w-7 rounded-full text-xs font-bold shrink-0 transition-all duration-300 ${
                done
                  ? "bg-primary text-ink"
                  : active
                  ? "bg-ink text-primary ring-[3px] ring-primary/30"
                  : "bg-black/5 text-ink/30"
              }`}
            >
              {done ? <Check size={13} strokeWidth={3} /> : i + 1}
            </div>
            {i < stepLabels.length - 1 && (
              <div className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${done ? "bg-primary" : "bg-black/8"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

const inputCls = "w-full bg-transparent border-0 border-b border-black/15 pb-3 text-sm font-medium outline-none placeholder-ink/30 focus:border-primary transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="block">
      <div className="text-xs font-bold tracking-widest uppercase text-ink/70 mb-2">{label}</div>
      <div>{children}</div>
    </div>
  );
}

const slotCardCls = (active: boolean) =>
  `text-center w-full rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
    active
      ? "border-primary bg-primary/5 text-ink ring-2 ring-primary/20"
      : "border-black/8 bg-white hover:border-primary/40 hover:bg-accent"
  }`;

export function StepCart() {
  const { data, addToCart, updateQuantity, removeFromCart } = useBooking();
  const cart = data.cart || [];

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-ink/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-ink">Your cart is empty</h3>
        <p className="text-sm text-blue-500 max-w-[250px]">Looks like you haven't added any services yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-2">
      <h3 className="text-base font-bold text-ink mb-4">Your Cart ({cart.length})</h3>
      {cart.map((cartItem) => {
        const originalPrice = Math.round(cartItem.price * 1.2);

        return (
          <div key={cartItem.id} className="flex gap-3 border-b border-black/5 pb-3 last:border-0">
            {/* Left Image */}
            <div className="w-[60px] h-[64px] bg-black/5 rounded-lg shrink-0 overflow-hidden">
              {cartItem.image ? (
                <img
                  src={cartItem.image}
                  alt={cartItem.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[9px] font-bold text-ink/30 uppercase tracking-widest">{cartItem.duration || "N/A"}</span>
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="flex-1 flex flex-col justify-between min-h-[64px]">
              <div className="flex justify-between items-start gap-1">
                <h4 className="font-semibold text-ink text-[12px] leading-tight">{cartItem.name}</h4>
                <div className="text-right shrink-0">
                  <div className="text-[12px] font-bold text-ink">Rs.{cartItem.price}</div>
                  <div className="text-[10px] font-medium text-ink/40 line-through">Rs.{originalPrice}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center bg-[#faf9f8] rounded-full border border-black/10 px-0.5 py-0.5">
                  <button
                    onClick={() => {
                      if (cartItem.quantity === 1) removeFromCart(cartItem.id);
                      else updateQuantity(cartItem.id, -1);
                    }}
                    className="w-5 h-5 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="w-5 text-center text-[12px] font-bold text-ink">{cartItem.quantity}</span>
                  <button
                    onClick={() => updateQuantity(cartItem.id, 1)}
                    className="w-5 h-5 flex items-center justify-center text-ink/60 hover:text-ink transition-colors"
                  >
                    <Plus size={11} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(cartItem.id)}
                  className="text-[11px] font-semibold text-red-500 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Recommendations */}
      <div className="mt-5 pt-4 border-t border-black/5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[10px] font-bold tracking-widest uppercase text-ink/60">Recommended for you</h4>
          <span className="text-[8px] font-bold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            Popular add-ons
          </span>
        </div>
        <div className="space-y-2.5">
          {popularPackages.filter(p => !cart.some(c => c.id === p.id)).slice(0, 2).map(pkg => (
            <div
              key={pkg.id}
              className="group flex items-center gap-2.5 bg-white border border-black/8 rounded-xl p-2 hover:border-primary/40 hover:shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="w-10 h-10 rounded-lg bg-[#faf9f8] shrink-0 overflow-hidden grid place-items-center">
                {(pkg as any).image ? (
                  <img src={(pkg as any).image} alt={pkg.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[8px] font-bold text-ink/30 uppercase tracking-wide text-center leading-tight px-1">
                    {pkg.duration}
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-semibold text-ink leading-tight truncate">{pkg.name}</h5>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-bold text-ink">Rs.{pkg.price}</span>
                  <span className="text-ink/30">•</span>
                  <span className="text-[9.5px] font-medium text-ink/50">{pkg.duration}</span>
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={() => addToCart({ id: pkg.id, name: pkg.name, price: pkg.price, duration: pkg.duration, originalPrice: Math.round(pkg.price * 1.2) })}
                className="shrink-0 w-7 h-7 grid place-items-center rounded-full bg-ink text-primary group-hover:bg-primary group-hover:text-ink transition-colors duration-200 shadow-sm"
                aria-label={`Add ${pkg.name}`}
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StepCustomer({
  data,
  onChange,
}: {
  data: BookingData;
  onChange: (patch: Partial<BookingData>) => void;
}) {
  return (
    <div className="space-y-4">
      <Field label="Full Name">
        <input className={inputCls} value={data.name ?? ""} onChange={(e) => onChange({ name: e.target.value })} placeholder="e.g. Rahul Sharma" />
      </Field>
      <Field label="Phone Number">
        <input className={inputCls} value={data.phone ?? ""} onChange={(e) => onChange({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} placeholder="10-digit mobile" inputMode="numeric" />
      </Field>
      <Field label="Email">
        <input className={inputCls} type="email" value={(data as any).email ?? ""} onChange={(e) => onChange({ ...(data as any), email: e.target.value })} placeholder="e.g. rahul@email.com" inputMode="email" />
      </Field>
      <Field label="Address">
        <textarea className={inputCls} rows={2} value={data.address ?? ""} onChange={(e) => onChange({ address: e.target.value })} placeholder="Flat / building, street, area" />
      </Field>
      <Field label="Pincode">
        <input className={inputCls} value={data.pincode ?? ""} onChange={(e) => onChange({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })} placeholder="201002" inputMode="numeric" />
      </Field>
    </div>
  );
}

export function StepSlot({
  data,
  onChange,
}: {
  data: BookingData;
  onChange: (patch: Partial<BookingData>) => void;
}) {
  const dates = useMemo(() => {
    const out: { iso: string; label: string; sub: string }[] = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      out.push({
        iso: d.toISOString().slice(0, 10),
        label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" }),
        sub: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      });
    }
    return out;
  }, []);
  const slots = ["08–10 AM", "10–12 PM", "12–02 PM", "02–04 PM", "04–06 PM", "06–08 PM"];

  return (
    <div className="space-y-7">
      <p className="text-base font-serif font-black uppercase tracking-tight text-ink">Pick a Slot</p>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-3">Choose Date</div>
        <div className="grid grid-cols-3 gap-2">
          {dates.map((d) => (
            <button
              key={d.iso}
              type="button"
              onClick={() => onChange({ date: d.iso })}
              className={`${slotCardCls(data.date === d.iso)}`}
            >
              <div className="font-bold text-sm">{d.label}</div>
              <div className="text-xs text-ink/50 font-normal mt-0.5">{d.sub}</div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-ink/40 mb-3">Choose Time Slot</div>
        <div className="grid grid-cols-3 gap-2">
          {slots.map((s) => (
            <button key={s} type="button" onClick={() => onChange({ slot: s })} className={slotCardCls(data.slot === s)}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StepPayment({ data }: { data: BookingData }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const cart = data.cart || [];
  const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const originalTotal = cart.reduce((acc, curr) => acc + ((curr.originalPrice ?? curr.price) * curr.quantity), 0);
  const saved = originalTotal - subtotal;

  return (
    <div className="space-y-4">

      {/* Order Summary */}
      <div className="rounded-2xl border border-black/8 overflow-hidden">
        <div className="bg-ink px-4 py-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-white/60">Order Summary</span>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="bg-[#fafaf9] divide-y divide-black/5">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-ink leading-tight">{item.name}</p>
                <p className="text-[11px] text-ink/40 mt-0.5">Qty: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-ink">₹{item.price * item.quantity}</p>
                {item.originalPrice && (
                  <p className="text-[10px] text-ink/35 line-through">₹{item.originalPrice * item.quantity}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white px-4 py-3 border-t border-black/10">
          {saved > 0 && (
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs text-green-600 font-semibold">You save</span>
              <span className="text-xs font-bold text-green-600">− ₹{saved}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-ink">Total Amount</span>
            <span className="text-xl font-black text-ink">₹{subtotal}</span>
          </div>
        </div>
      </div>

      {/* Razorpay Gateway Card */}
      <div className="rounded-2xl border border-[#072654]/12 bg-gradient-to-br from-[#f0f7ff] to-white p-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-28 h-28 bg-[#3399cc]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#072654] flex items-center justify-center shadow-sm flex-shrink-0">
            <CreditCard className="text-white w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-black text-[#072654] tracking-tight">Razorpay Secure Checkout</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              {["UPI", "Cards", "Wallets", "NetBanking"].map(m => (
                <span key={m} className="text-[9px] font-bold uppercase tracking-wide bg-[#072654]/8 text-[#072654]/70 rounded px-1.5 py-0.5">{m}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-ink/55 leading-relaxed border-t border-black/5 pt-3">
          You will be securely redirected to Razorpay's payment gateway. Your financial data is encrypted and never stored on our servers.
        </p>
        <div className="flex items-center gap-1.5 mt-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
          <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">256-bit SSL Encrypted · 100% Secure</span>
        </div>
      </div>

    </div>
  );
}

export function StepConfirmation({ data, bookingId }: { data: BookingData; bookingId: string }) {
  const cart = data.cart || [];
  return (
    <div className="text-center py-4">
      <div className="mx-auto h-16 w-16 rounded-full bg-primary/15 text-primary grid place-items-center ring-4 ring-primary/10">
        <Check size={30} strokeWidth={2.5} />
      </div>
      <h3 className="mt-4 font-serif font-black uppercase tracking-tight text-2xl text-ink">Booking Confirmed!</h3>
      <p className="mt-2 text-sm text-ink/50">
        Your complaint ID is{" "}
        <span className="font-mono font-bold text-ink bg-primary/10 px-2 py-0.5 rounded">
          {bookingId}
        </span>
      </p>
      <div className="mt-6 rounded-2xl border border-black/8 bg-[#faf9f8] p-5 text-left text-sm space-y-3">
        {[
          { label: "Packages", value: cart.map(c => `${c.name} (x${c.quantity})`).join(", ") },
          { label: "Customer", value: data.name },
          { label: "Phone", value: data.phone },
          { label: "Slot", value: `${data.date} · ${data.slot}` },
        ].map((row) => (
          <div key={row.label} className="flex flex-col gap-1 border-b border-black/5 pb-2 last:border-0 last:pb-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-ink/40">{row.label}</span>
            <span className="font-semibold text-ink leading-tight">{row.value}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-xs text-ink/40">Our team will call you within 10 minutes to confirm.</p>
    </div>
  );
}

export function validateStep(step: number, data: BookingData): string | null {
  switch (step) {
    case 0:
      return (data.cart && data.cart.length > 0) ? null : "Please add at least one package to the cart.";
    case 1:
      if (!data.name?.trim()) return "Please enter your name.";
      if (!data.phone || data.phone.length !== 10) return "Enter a valid 10-digit phone.";
      if (!data.address?.trim()) return "Please enter your address.";
      if (!data.pincode || data.pincode.length !== 6) return "Enter a valid 6-digit pincode.";
      return null;
    case 2:
      if (!data.date) return "Pick a date.";
      if (!data.slot) return "Pick a time slot.";
      return null;
    case 3:
      return null; // Mock payment, no validation needed
    default:
      return null;
  }
}
