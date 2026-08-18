export default function ContactHero() {
  return (
    <div className="bg-[#f5f3ef] p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" 
           style={{ background: 'radial-gradient(circle at 10% 10%, rgba(0,0,0,0.08) 0%, transparent 60%)' }}></div>
      <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none opacity-30" 
           style={{ background: 'radial-gradient(circle at 90% 90%, rgba(0,0,0,0.05) 0%, transparent 50%)' }}></div>

      <div className="z-10 relative h-full flex flex-col justify-start">
        <div className="text-center mb-12 lg:mb-0 lg:-mt-4">
          {/* Logo / Brand Name */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-black p-2 px-4 rounded-xl inline-block shadow-sm">
              <img src="/logo.png" alt="CityCalls Logo" className="h-10 md:h-12 object-contain" />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-serif mt-6 uppercase tracking-tight">We're here for you</h1>
          <p className="mt-4 text-xs md:text-sm max-w-sm mx-auto text-ink/80 leading-relaxed font-medium">
            Have a question, feedback or just want to say hello? We'd love to hear from you. Let's connect.
          </p>
        </div>

        {/* Map Section */}
        <div className="mt-auto pt-2 mx-auto w-full max-w-3xl h-[450px] lg:h-[550px]">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-sm border border-black/5">
            <iframe
              title="CityCalls office map"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112024.79835134117!2d77.23935890804523!3d28.666456488559664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1e7c6d74735%3A0xf40e0c1b03cc114f!2sCityCalls!5e0!3m2!1sen!2sin!4v1784698469970!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
