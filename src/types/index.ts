import type { LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
};

export type FeatureTint = {
  tint: string;
  border: string;
  ink: string;
};

export type Feature = FeatureTint & {
  icon: LucideIcon;
  tag: string;
  title: string;
  /** Screen-recording for this feature (e.g. "/videos/login_flow.mp4"). Falls back to a tinted icon placeholder until it loads. */
  mediaSrc?: string;
};

export type TechGroup = {
  icon: LucideIcon;
  label: string;
  why: string;
  items: string[];
};
