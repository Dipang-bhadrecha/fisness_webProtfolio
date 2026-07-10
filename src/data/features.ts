import { BookText, CirclePlus, ShieldCheck, Ship, Smartphone } from "lucide-react";

import type { Feature, FeatureTint } from "@/types";

const tints: FeatureTint[] = [
  { tint: "#e7f2f1", border: "#cfe6e3", ink: "#0f7d84" },
  { tint: "#f6ecdc", border: "#eddcbf", ink: "#c07d34" },
  { tint: "#e9eef8", border: "#d5deef", ink: "#3f68b0" },
  { tint: "#f5eae7", border: "#ecd7d0", ink: "#b56a5b" },
];

const base: Omit<Feature, keyof FeatureTint>[] = [
  {
    icon: Smartphone,
    tag: "onboarding",
    title: "Phone OTP login",
    mediaSrc: "/videos/login_flow.mp4",
  },
  {
    icon: CirclePlus,
    tag: "add-kharchi",
    title: "Add Kharchi",
    mediaSrc: "/videos/add_kharchi_in_second.mp4",
  },
  {
    icon: Ship,
    tag: "boats",
    title: "Boats management",
    mediaSrc: "/videos/boat_management.mp4",
  },
  {
    icon: ShieldCheck,
    tag: "manager-access",
    title: "Manager Access",
    mediaSrc: "/videos/manager_access.mp4",
  },
  {
    icon: BookText,
    tag: "ledger-flow",
    title: "Ledger Flow",
    mediaSrc: "/videos/ledger_flow.mp4",
  },
];

export const features: Feature[] = base.map((f, i) => ({
  ...f,
  ...tints[i % tints.length],
}));
