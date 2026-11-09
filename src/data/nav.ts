import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "FishToken", href: "/fishtoken", badge: "New" },
  { label: "Fisness App", href: "/#features" },
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
    { label: "FishToken", href: "/fishtoken" },
    { label: "Download FishToken", href: "/fishtoken#download" },
    { label: "Fisness App", href: "/#features" },
    {
      label: "Download Fisness App",
      href: "https://play.google.com/store/apps/details?id=com.fisness.app",
    },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "FishToken Privacy", href: "/fishtoken/privacy-policy" },
  ],
};
