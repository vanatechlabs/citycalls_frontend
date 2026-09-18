import { Link } from "react-router-dom";
import { ChevronDown, Menu, Phone, X, Sun, Moon, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { serviceCategories } from "@/data/services";
import { useBooking } from "@/context/BookingContext";
import { Logo } from "@/components/layout/Logo";
import { MegaMenu } from "./MegaMenu";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function Navbar() {
  const { openDrawer } = useBooking();
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCat, setMobileCat] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [mobileOpen]);

  return (
    <header className={`sticky top-0 z-[100] text-white border-b border-white/5 transition-colors duration-300 ${scrolled ? 'bg-ink/95 backdrop-blur shadow-soft' : 'bg-ink'}`}>
      <div className="w-full px-4 lg:px-6 xl:px-8 flex items-center justify-between h-16 md:h-[72px] max-w-[1600px] mx-auto">
        <div className="ml-8">
          <Logo />
        </div>

        <nav className="hidden lg:flex items-center gap-0.5">
          {serviceCategories
            .filter(cat => ["home-appliance", "home-cleaning", "sofa-cleaning", "pest-control"].includes(cat.id))
            .sort((a, b) => {
              const order = ["home-appliance", "home-cleaning", "sofa-cleaning", "pest-control"];
              return order.indexOf(a.id) - order.indexOf(b.id);
            })
            .map((cat) => (
            <div
              key={cat.id}
              className="relative"
              onMouseEnter={() => setOpenCat(cat.id)}
              onMouseLeave={() => setOpenCat(null)}
            >
              <button className="group relative flex items-center gap-1 px-1.5 xl:px-2.5 py-2 text-[12px] font-sans font-semibold uppercase tracking-wider text-white/90 hover:text-white transition-colors duration-200 rounded-md whitespace-nowrap">
                {cat.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${openCat === cat.id ? "rotate-180 text-primary" : "opacity-60"}`}
                />
                <span
                  className={`absolute left-1.5 right-1.5 xl:left-2.5 xl:right-2.5 -bottom-[1px] h-[2px] bg-primary origin-left transition-transform duration-300 ${
                    openCat === cat.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </button>
              {openCat === cat.id && <MegaMenu category={cat} onNavigate={() => setOpenCat(null)} />}
            </div>
          ))}
          <Link
            to="/contact"
            className="group relative flex items-center px-1.5 xl:px-2.5 py-2 text-[12px] font-sans font-semibold uppercase tracking-wider text-white/90 hover:text-white transition-colors duration-200 rounded-md whitespace-nowrap"
          >
            Contact
            <span className="absolute left-1.5 right-1.5 xl:left-2.5 xl:right-2.5 -bottom-[1px] h-[2px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </Link>


        </nav>

        <div className="flex items-center gap-2">
          <style>{`
            @keyframes swing {
              0%, 100% { transform: rotate(-2.5deg); }
              50% { transform: rotate(2.5deg); }
            }
            .animate-swing {
              animation: swing 1.8s ease-in-out infinite;
              transform-origin: top center;
            }
            @keyframes dropIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-drop-in {
              animation: dropIn 0.5s ease-out 0.2s both;
            }
          `}</style>
          <div className="hidden md:flex items-center gap-3 mr-14 animate-drop-in">
            {/* Beauty Saloon pendant — RIGHT */}
            <div className="relative justify-center flex mr-5">
              <div className="relative origin-top group animate-swing">
                <span className="absolute left-1/2 -top-[18px] -translate-x-1/2 w-[2px] h-[18px] bg-gradient-to-b from-primary to-primary-dark" />
                <a
                  href="https://vanatechsaloon.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Btn"
                ></a>
              </div>
            </div>

            {/* Help Now — New UI Button */}
            <a href="/help-now" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-gradient-to-b from-[#FFCF24] to-[#FDBA00] hover:from-[#FFE066] hover:to-[#F5B50A] transition-all duration-300 rounded-full pl-2.5 pr-1 py-0.5 shadow-[0_4px_14px_rgba(253,186,0,0.4)] border border-[#E5A800]">
              {/* Left Icon (House + Sparkles) */}
              <div className="flex items-center gap-1.5">
                <div className="relative flex items-center pr-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <rect x="9" y="12" width="2.5" height="2.5" fill="black"></rect>
                    <rect x="12.5" y="12" width="2.5" height="2.5" fill="black"></rect>
                    <rect x="9" y="15.5" width="2.5" height="2.5" fill="black"></rect>
                    <rect x="12.5" y="15.5" width="2.5" height="2.5" fill="black"></rect>
                  </svg>
                  <div className="absolute -top-0.5 right-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="black">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
                    </svg>
                  </div>
                  <div className="absolute top-3 -right-1.5">
                    <svg width="6" height="6" viewBox="0 0 24 24" fill="black">
                      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"/>
                    </svg>
                  </div>
                </div>
                {/* Divider */}
                <div className="w-[1.5px] h-6 bg-black/80 rounded-full" />
              </div>

              {/* Middle Text */}
              <div className="flex flex-col items-start leading-none">
                <div className="text-black text-[15px] tracking-tight flex items-baseline">
                  <span className="font-extrabold font-sans">Help</span>
                  <span className="font-serif italic font-bold ml-[1px]">Now</span>
                </div>
                <span className="text-black font-bold text-[8px] uppercase tracking-wider mt-0.5">
                  House Help Services
                </span>
              </div>

              {/* Right Arrow */}
              <div className="w-7 h-7 bg-white/95 rounded-full flex items-center justify-center ml-1 shadow-sm">
                <ArrowRight size={15} className="text-black" strokeWidth={2.5} />
              </div>
            </a>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
            className="lg:hidden grid place-items-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/15"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>


      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-ink text-white flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Close" className="p-2">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              {serviceCategories
                .filter(cat => ["home-appliance", "home-cleaning", "sofa-cleaning", "pest-control"].includes(cat.id))
                .sort((a, b) => {
                  const order = ["home-appliance", "home-cleaning", "sofa-cleaning", "pest-control"];
                  return order.indexOf(a.id) - order.indexOf(b.id);
                })
                .map((cat) => (
                <div key={cat.id} className="border-b border-white/5">
                  <button
                    onClick={() => setMobileCat(mobileCat === cat.id ? null : cat.id)}
                    className="w-full flex items-center justify-between px-5 py-3.5 text-[13px] font-sans font-semibold uppercase tracking-wider"
                  >
                    {cat.label}
                    <ChevronDown size={16} className={`transition-transform ${mobileCat === cat.id ? "rotate-180" : ""}`} />
                  </button>
                  {mobileCat === cat.id && (
                    <div className="pb-3 bg-white/[0.03]">
                      {cat.services.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block px-8 py-2.5 text-sm text-white/75 hover:text-primary"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/about" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 text-[13px] font-sans font-semibold uppercase tracking-wider border-b border-white/5">
                About
              </Link>
              <Link to="/blogs" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 text-[13px] font-sans font-semibold uppercase tracking-wider border-b border-white/5">
                Blogs
              </Link>
              <Link to="/contact" onClick={() => setMobileOpen(false)} className="block px-5 py-3.5 text-[13px] font-sans font-semibold uppercase tracking-wider border-b border-white/5">
                Contact
              </Link>

            </div>
            <div className="p-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex justify-center w-full">
                <a
                  href="https://vanatechsaloon.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Btn"
                  onClick={() => setMobileOpen(false)}
                ></a>
              </div>
              <a
                href="/help-now"
                className="help-now-btn-mobile"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.2199 21.63C13.0399 21.63 11.3699 20.8 10.0499 16.83L9.32988 14.67L7.16988 13.95C3.20988 12.63 2.37988 10.96 2.37988 9.78001C2.37988 8.61001 3.20988 6.93001 7.16988 5.60001L15.6599 2.77001C17.7799 2.06001 19.5499 2.27001 20.6399 3.35001C21.7299 4.43001 21.9399 6.21001 21.2299 8.33001L18.3999 16.82C17.0699 20.8 15.3999 21.63 14.2199 21.63ZM7.63988 7.03001C4.85988 7.96001 3.86988 9.06001 3.86988 9.78001C3.86988 10.5 4.85988 11.6 7.63988 12.52L10.1599 13.36C10.3799 13.43 10.5599 13.61 10.6299 13.83L11.4699 16.35C12.3899 19.13 13.4999 20.12 14.2199 20.12C14.9399 20.12 16.0399 19.13 16.9699 16.35L19.7999 7.86001C20.3099 6.32001 20.2199 5.06001 19.5699 4.41001C18.9199 3.76001 17.6599 3.68001 16.1299 4.19001L7.63988 7.03001Z" fill="currentColor"></path>
                  <path d="M10.11 14.4C9.92005 14.4 9.73005 14.33 9.58005 14.18C9.29005 13.89 9.29005 13.41 9.58005 13.12L13.16 9.53C13.45 9.24 13.93 9.24 14.22 9.53C14.51 9.82 14.51 10.3 14.22 10.59L10.64 14.18C10.5 14.33 10.3 14.4 10.11 14.4Z" fill="currentColor"></path>
                </svg>
                Help Now
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}