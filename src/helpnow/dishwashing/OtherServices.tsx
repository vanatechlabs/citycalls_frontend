import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import h1 from '@/assets/Images/h1.png';
import h2 from '@/assets/Images/h2.png';
import h3 from '@/assets/Images/h3.png';
import h4 from '@/assets/Images/h4.png';
import h5 from '@/assets/Images/h5.png';

const otherServices = [
  { title: "Kitchen Cleaning", image: h2, price: "₹199/hr", desc: "Deep degrease & stove sanitization" },
  { title: "Fan & Ceiling Care", image: h3, price: "₹149/hr", desc: "Dust-free blade restoration" },
  { title: "Window Cleaning", image: h4, price: "₹179/hr", desc: "Spotless glass & track wiping" },
  { title: "Laundry & Ironing", image: h5, price: "₹169/hr", desc: "Washing, folding & steam press" },
  { title: "Bathroom Cleaning", image: h1, price: "₹189/hr", desc: "Tile descaling & sanitization" },
  { title: "Full Home Sweeping", image: h2, price: "₹149/hr", desc: "Floor scrubbing & disinfectant" },
];

export function OtherServices() {
  return (
    <div className="w-full bg-white py-14 md:py-18 border-t border-slate-200">
      <div className="container-x mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#f5a623] bg-[#fff6e8] px-3.5 py-1.5 rounded-full border border-[#f5a623]/30 inline-block mb-3">
            Flexible Domestic Help
          </span>
          <h2 className="text-[24px] md:text-[32px] font-sans font-black uppercase tracking-tight text-slate-900 leading-tight">
            OTHER <span className="text-[#f5a623]">MAID SERVICES</span>
          </h2>
          <p className="text-slate-600 text-[13px] md:text-[14px] mt-2 font-medium max-w-[500px] mx-auto">
            Book trusted, background-verified helpers by the hour for all home needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {otherServices.map((service, idx) => (
            <div 
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col items-center justify-between shadow-sm hover:shadow-lg hover:border-[#f5a623] transition-all group"
            >
              {/* Image Container */}
              <div className="w-full h-[100px] md:h-[115px] rounded-lg overflow-hidden mb-3 bg-slate-50">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text */}
              <div className="text-center flex-1 flex flex-col justify-between w-full">
                <div>
                  <h3 className="text-[13px] md:text-[14px] font-bold text-slate-900 group-hover:text-[#b5730f] transition-colors leading-tight">{service.title}</h3>
                  <p className="text-[10px] text-slate-500 mt-1 mb-2 font-medium line-clamp-1">{service.desc}</p>
                </div>
                
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between w-full">
                  <span className="text-[11px] font-extrabold text-emerald-600">{service.price}</span>
                  <Link 
                    to="/help-now#services"
                    className="inline-flex items-center gap-1 text-[#f5a623] hover:text-[#b5730f] text-[11px] font-bold uppercase tracking-wider"
                  >
                    Book
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
