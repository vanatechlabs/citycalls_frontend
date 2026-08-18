import { CalendarPlus } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

export function FloatingBookButton() {
  const { openDrawer, open } = useBooking();
  if (open) return null;
  return (
    <button
      onClick={() => openDrawer()}
      aria-label="Book a service"
      className="fixed bottom-6 right-6 z-30 group inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-dark text-primary-foreground pl-4 pr-5 py-3.5 shadow-elevate transition-all hover:scale-105"
    >
      <span className="grid place-items-center h-8 w-8 rounded-full bg-white/25">
        <CalendarPlus size={18} />
      </span>
      <span className="font-semibold text-sm">Book Now</span>
    </button>
  );
}
