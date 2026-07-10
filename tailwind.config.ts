import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#ffffff",
        ink: "#17211f",
        teal: {
          DEFAULT: "#0f7d84",
          light: "#12a3ad",
          dark: "#0d6d75",
        },
        muted: {
          DEFAULT: "#4a5956",
          light: "#6a7772",
          faint: "#9aa59e",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-instrument-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      keyframes: {
        softFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        gradFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        wordRotate: {
          "0%, 17%": { transform: "translateY(0%)" },
          "19%, 37%": { transform: "translateY(-20%)" },
          "39%, 57%": { transform: "translateY(-40%)" },
          "59%, 77%": { transform: "translateY(-60%)" },
          "79%, 100%": { transform: "translateY(-80%)" },
        },
        sealPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(18,163,173,0.45)" },
          "55%": { boxShadow: "0 0 0 12px rgba(18,163,173,0)" },
        },
        caretBlink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        packetGo: {
          "0%": { left: "0%", transform: "translate(0,-50%)", opacity: "0" },
          "12%": { opacity: "1" },
          "88%": { opacity: "1" },
          "100%": { left: "100%", transform: "translate(-100%,-50%)", opacity: "0" },
        },
        encPop: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        encSpin: {
          to: { transform: "rotate(360deg)" },
        },
        encSheetUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        softFloat: "softFloat 6s ease-in-out infinite",
        gradFlow: "gradFlow 14s linear infinite",
        wordRotate: "wordRotate 10s cubic-bezier(0.65,0,0.35,1) infinite",
        sealPulse: "sealPulse 3.6s ease-out infinite",
        caretBlink: "caretBlink 1s step-end infinite",
        packetGo: "packetGo 2.8s linear infinite",
        encPop: "encPop 0.4s ease both",
        encSpin: "encSpin 0.7s linear infinite",
        encSheetUp: "encSheetUp 0.35s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
