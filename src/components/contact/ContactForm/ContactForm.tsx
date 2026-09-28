"use client";

import { Instagram, Mail, MapPin, Phone, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", subject: "", otherSubject: "" });
  const upd = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="bg-background p-8 lg:px-16 xl:px-24 lg:pb-16 flex flex-col justify-start pt-8 lg:pt-12">
      <div className="mt-0 lg:-mt-4 mb-2">
        <h2 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-tight text-ink relative inline-block pb-3">
          <span className="text-primary">Contact</span> Us
          {/* Black & Green Underline */}
          <div className="absolute bottom-0 left-0 flex h-1 w-32 rounded-full overflow-hidden">
            <div className="w-1/2 bg-black"></div>
            <div className="w-1/2 bg-primary"></div>
          </div>
        </h2>
      </div>
      <p className="text-sm font-semibold tracking-widest text-ink/60 uppercase mt-4 mb-8">
        For inquiries, support, or partnership advice.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8 text-sm bg-[#faf9f8] p-8 rounded-xl border border-black/5">
         <div>
           <div className="flex items-start gap-4">
             <Mail className="w-4 h-4 mt-1 opacity-70"/>
             <div>
               <div className="font-bold text-xs tracking-widest uppercase mb-1.5 opacity-80">Email</div>
               <a href="mailto:hello@citycalls.in" className="text-blue-600 underline font-medium hover:text-blue-700">hello@citycalls.in</a>
             </div>
           </div>
           <div className="flex items-start gap-4 mt-8">
             <Phone className="w-4 h-4 mt-1 opacity-70"/>
             <div>
               <div className="font-bold text-xs tracking-widest uppercase mb-1.5 opacity-80">WhatsApp</div>
               <a href="tel:+917428808884" className="hover:underline font-medium">+91 74288 08884</a>
             </div>
           </div>
           <div className="flex items-start gap-4 mt-8">
             <Instagram className="w-4 h-4 mt-1 opacity-70"/>
             <div>
               <div className="font-bold text-xs tracking-widest uppercase mb-1.5 opacity-80">Instagram</div>
               <a href="#" className="text-blue-600 underline font-medium hover:text-blue-700">@citycalls_official</a>
             </div>
           </div>
         </div>
         <div>
           <div className="flex items-start gap-4">
             <MapPin className="w-4 h-4 mt-1 opacity-70"/>
             <div>
               <div className="font-bold text-xs tracking-widest uppercase mb-1.5 opacity-80">Address</div>
               <div className="font-medium leading-relaxed">CITYCALLS<br/>3rd Floor, Raj Nagar<br/>Ghaziabad, UP 201002</div>
             </div>
           </div>
           <div className="flex items-start gap-4 mt-8">
             <Clock className="w-4 h-4 mt-1 opacity-70" />
             <div>
               <div className="font-bold text-xs tracking-widest uppercase mb-1.5 opacity-80">Hours</div>
               <div className="font-medium leading-relaxed">Monday - Saturday<br/><span className="text-red-600 font-bold">10:00 AM - 7:00 PM</span></div>
             </div>
           </div>
         </div>
      </div>

      <div className="font-bold text-sm uppercase tracking-widest mb-8">Send a Message</div>
      
      {sent ? (
         <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
            <div className="font-bold text-lg text-primary-dark mb-2">Message sent successfully</div>
            <p className="text-ink/70">Thank you for reaching out. We will get back to you shortly.</p>
         </div>
      ) : (
         <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative border-b border-ink/20 focus-within:border-ink transition-colors">
                <input required type="text" className="w-full pb-3 bg-transparent outline-none placeholder-ink/40 text-sm font-medium" placeholder="Full Name *" value={form.name} onChange={e => upd("name", e.target.value)} />
              </div>
              <div className="relative border-b border-ink/20 focus-within:border-ink transition-colors">
                <input required type="email" className="w-full pb-3 bg-transparent outline-none placeholder-ink/40 text-sm font-medium" placeholder="Email Address *" value={form.email} onChange={e => upd("email", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative border-b border-ink/20 focus-within:border-ink transition-colors">
                <input type="tel" className="w-full pb-3 bg-transparent outline-none placeholder-ink/40 text-sm font-medium" placeholder="Phone Number" value={form.phone} onChange={e => upd("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} />
              </div>
              <div className="relative border-b border-ink/20 focus-within:border-ink transition-colors">
                <select 
                  className={`w-full pb-3 bg-transparent outline-none text-sm font-medium cursor-pointer ${!form.subject ? 'text-ink/40' : 'text-ink'}`}
                  value={form.subject} 
                  onChange={e => upd("subject", e.target.value)}
                >
                  <option value="" disabled hidden className="text-black">Select Your service</option>
                  <option value="Refrigerator Service" className="text-black bg-white">Refrigerator Service</option>
                  <option value="AC Service" className="text-black bg-white">AC Service</option>
                  <option value="Geyser Repair Services" className="text-black bg-white">Geyser Repair Services</option>
                  <option value="Home Cleaning" className="text-black bg-white">Home Cleaning</option>
                  <option value="Kitchen Cleaning" className="text-black bg-white">Kitchen Cleaning</option>
                  <option value="Bathroom Cleaning" className="text-black bg-white">Bathroom Cleaning</option>
                  <option value="Hair Styling" className="text-black bg-white">Hair Styling</option>
                  <option value="Hair Spa" className="text-black bg-white">Hair Spa</option>
                  <option value="Hair Straightening" className="text-black bg-white">Hair Straightening</option>
                  <option value="Fridge Storage Bins" className="text-black bg-white">Fridge Storage Bins</option>
                  <option value="Fruit & Vegatable Boxes" className="text-black bg-white">Fruit & Vegatable Boxes</option>
                  <option value="Washing Machine Services" className="text-black bg-white">Washing Machine Services</option>
                  <option value="Microwave & Oven Services" className="text-black bg-white">Microwave & Oven Services</option>
                  <option value="Television Repair Services" className="text-black bg-white">Television Repair Services</option>
                  <option value="Chimney Repair Services" className="text-black bg-white">Chimney Repair Services</option>
                  <option value="Others" className="text-black bg-white">Others</option>
                </select>
              </div>
            </div>
            {form.subject === "Others" && (
              <div className="relative border-b border-ink/20 focus-within:border-ink transition-colors">
                <input required type="text" className="w-full pb-3 bg-transparent outline-none placeholder-ink/40 text-sm font-medium" placeholder="Please specify your service *" value={form.otherSubject} onChange={e => upd("otherSubject", e.target.value)} />
              </div>
            )}
            <div className="relative border-b border-ink/20 focus-within:border-ink transition-colors">
              <textarea required rows={1} className="w-full pb-3 bg-transparent outline-none placeholder-ink/40 text-sm font-medium resize-none" placeholder="Your Message *" value={form.message} onChange={e => upd("message", e.target.value)} />
            </div>
            <button className="w-full bg-ink text-primary font-bold text-sm tracking-widest uppercase py-5 hover:bg-ink/90 transition-colors mt-4">
              Submit Inquiry
            </button>
         </form>
      )}
    </div>
  );
}
