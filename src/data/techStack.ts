import { Cloud, LayoutDashboard, Server } from "lucide-react";

import type { TechGroup } from "@/types";

export const techGroups: TechGroup[] = [
  {
    icon: LayoutDashboard,
    label: "Frontend",
    why: "Cross-platform native app that runs on the low-end phones crews actually carry.",
    items: ["Expo", "React Native", "TypeScript", "Expo Router", "Zustand", "AsyncStorage"],
  },
  {
    icon: Server,
    label: "Backend",
    why: "A fast, type-safe API with a solid relational core for money and ledgers.",
    items: ["Fastify", "Prisma", "PostgreSQL", "SQLite", "JWT auth", "Twilio (OTP SMS)"],
  },
  {
    icon: Cloud,
    label: "Infrastructure",
    why: "Simple, reliable hosting that scales as the fleet grows.",
    items: ["AWS"],
  },
];
