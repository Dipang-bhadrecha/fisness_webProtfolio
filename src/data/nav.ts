import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Features", href: "/#features" },
  { label: "FishToken", href: "/fishtoken", badge: "New" },
];

export const heroRotatingWords = [
  "business",
  "khataook",
  "kharchi",
  "tali",
  "business",
];

export const footerLinks = {
  product: [
    { label: "Features", href: "/#features" },
    {
      label: "Download",
      href: "https://play.google.com/store/apps/details?id=com.fisness.app",
    },
    { label: "FishToken", href: "/fishtoken" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "FishToken Privacy", href: "/fishtoken/privacy-policy" },
  ],
};
