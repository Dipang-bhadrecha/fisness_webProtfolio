import {
  BarChart3,
  CalendarCheck,
  FileSpreadsheet,
  IndianRupee,
  QrCode,
  ScanLine,
  Printer,
  Users,
  WifiOff,
  type LucideIcon,
} from "lucide-react";

/** WhatsApp number (with country code, digits only) that licence enquiries go to. */
const licenceWhatsAppNumber = "917619108524";

/** Pre-filled so the visitor only has to tap Send. */
const licenceWhatsAppMessage = [
  "Hi Fisness, I want to know more about FishToken and get a licence key for my fish-cutting plant.",
  "નમસ્તે, મારે મારા ફિશ કટિંગ પ્લાન્ટ માટે FishToken ની લાઇસન્સ કી વિશે જાણવું છે.",
].join("\n\n");

/** Everything the /fishtoken pages link to — change a download here, not in the JSX. */
export const fishTokenLinks = {
  playStore:
    "https://play.google.com/store/apps/details?id=com.fisness.fishcuttingtoken",
  /**
   * Windows installer. The fishCut-desktop GitHub workflow builds
   * FishToken-Manager-Setup-<version>.exe; drop that file in public/downloads/
   * and bump the version here when a new one ships.
   */
  desktopInstaller: "/downloads/FishToken-Manager-Setup-0.1.1.exe",
  desktopVersion: "0.1.1",
  androidVersion: "1.1.0",
  privacyPolicy: "/fishtoken/privacy-policy",
  support: "mailto:support@fisness.com?subject=FishToken%20licence",
  /** Opens WhatsApp (the app on phones) with the enquiry already typed. */
  licenceWhatsApp: `https://wa.me/${licenceWhatsAppNumber}?text=${encodeURIComponent(licenceWhatsAppMessage)}`,
};

export type FishTokenStep = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const fishTokenSteps: FishTokenStep[] = [
  {
    icon: ScanLine,
    title: "Scan the member's card",
    body: "Every member gets a QR card. The supervisor scans it, or types the member code.",
  },
  {
    icon: CalendarCheck,
    title: "Pick fish and count",
    body: "Choose the fish and the besan / jali count. Tokens and the amount are worked out to the paisa.",
  },
  {
    icon: Printer,
    title: "Print the token",
    body: "A numbered slip prints on a Bluetooth printer in seconds — in Gujarati, even with no internet.",
  },
];

export type FishTokenFeature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const fishTokenFeatures: FishTokenFeature[] = [
  {
    icon: Users,
    title: "Members & groups",
    body: "Codes, Gujarati names, per-member rates and groups like contractor › village.",
  },
  {
    icon: QrCode,
    title: "QR member cards",
    body: "Design and print cards in bulk. A card's QR never changes once printed.",
  },
  {
    icon: BarChart3,
    title: "Entries & reports",
    body: "By day or month, member or supervisor, valid or voided — export to CSV or print.",
  },
  {
    icon: IndianRupee,
    title: "Payments & dues",
    body: "Record bank, UPI or cash payouts and always see what each member is owed.",
  },
  {
    icon: WifiOff,
    title: "Works offline",
    body: "Phones keep printing without signal and sync the moment they reconnect.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel backup",
    body: "Download your whole plant as one Excel file, and import it back any time.",
  },
];
