import {
  Armchair, Bath, BedDouble, Brush, CookingPot, Droplets, Dog, Flame, Grid3x3, Hammer, House, Layers, PartyPopper,
  ShowerHead, Sofa, Sparkles, SprayCan, Stethoscope, Truck, Wind, type LucideIcon,
} from "lucide-react";

// Icons the cleaning form configs can refer to by name.
export const CLEANING_ICONS = {
  armchair: Armchair,
  bath: Bath,
  bed: BedDouble,
  brush: Brush,
  kitchen: CookingPot,
  droplets: Droplets,
  pet: Dog,
  flame: Flame,
  grid: Grid3x3,
  hammer: Hammer,
  house: House,
  layers: Layers,
  party: PartyPopper,
  shower: ShowerHead,
  sofa: Sofa,
  sparkles: Sparkles,
  spray: SprayCan,
  health: Stethoscope,
  truck: Truck,
  wind: Wind,
} satisfies Record<string, LucideIcon>;

export type CleaningIconKey = keyof typeof CLEANING_ICONS;
