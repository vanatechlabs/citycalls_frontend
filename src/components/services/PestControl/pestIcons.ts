import {
  Bath, Bed, BedDouble, Bug, BugOff, Building2, CircleHelp, CookingPot, Droplets, Fence, Flower2, Footprints,
  Hammer, House, Layers, Leaf, Moon, Rat, ShieldCheck, Snail, Sofa, Sprout, Trees, Warehouse, Waves, Wind, Worm,
  type LucideIcon,
} from "lucide-react";

// Icons the pest control form configs can refer to by name.
export const PEST_ICONS = {
  bath: Bath,
  bed: Bed,
  "bed-double": BedDouble,
  bug: Bug,
  "bug-off": BugOff,
  building: Building2,
  help: CircleHelp,
  kitchen: CookingPot,
  droplets: Droplets,
  fence: Fence,
  flower: Flower2,
  footprints: Footprints,
  hammer: Hammer,
  house: House,
  layers: Layers,
  leaf: Leaf,
  moon: Moon,
  rat: Rat,
  shield: ShieldCheck,
  snail: Snail,
  sofa: Sofa,
  sprout: Sprout,
  trees: Trees,
  warehouse: Warehouse,
  waves: Waves,
  wind: Wind,
  worm: Worm,
} satisfies Record<string, LucideIcon>;

export type PestIconKey = keyof typeof PEST_ICONS;
