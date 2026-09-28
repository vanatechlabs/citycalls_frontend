import {
  Cable, CircleHelp, CircleOff, Droplets, Fan, Flame, Gauge, Lightbulb, MonitorOff, Power, RotateCw, Settings2,
  Sparkles, Thermometer, Tv, Volume2, VolumeX, WashingMachine, Wifi, Wind, Wrench, Zap, type LucideIcon,
} from "lucide-react";

// Icons the appliance form configs can refer to by name.
export const ISSUE_ICONS = {
  cable: Cable,
  "circle-off": CircleOff,
  droplets: Droplets,
  fan: Fan,
  flame: Flame,
  gauge: Gauge,
  help: CircleHelp,
  lightbulb: Lightbulb,
  "monitor-off": MonitorOff,
  power: Power,
  rotate: RotateCw,
  settings: Settings2,
  sparkles: Sparkles,
  thermometer: Thermometer,
  tv: Tv,
  volume: Volume2,
  "volume-off": VolumeX,
  "washing-machine": WashingMachine,
  wifi: Wifi,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
} satisfies Record<string, LucideIcon>;

export type IssueIconKey = keyof typeof ISSUE_ICONS;
