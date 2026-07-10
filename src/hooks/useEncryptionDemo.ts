"use client";

import { useEffect, useRef, useState } from "react";

type EncPhase =
  | "list"
  | "sheet"
  | "amount"
  | "reason"
  | "save"
  | "transit"
  | "stored"
  | "done";

type EncState = {
  phase: EncPhase;
  amount: number;
  reason: string;
};

const CAPTIONS: Record<EncPhase, string> = {
  list: "Encrypted in transit",
  sheet: "Encrypted in transit",
  amount: "Encrypted in transit",
  reason: "Encrypted in transit",
  save: "Sealing your entry…",
  transit: "Travelling encrypted…",
  stored: "Locked in the cloud",
  done: "Encrypted in transit",
};

const inr = (n: number) => (n ? n.toLocaleString("en-IN") : "0");

/**
 * Reproduces the timed phone -> transit -> AWS-cloud demo from the original
 * source prototype as a looping state machine, driven by chained setTimeouts.
 */
export function useEncryptionDemo() {
  const [enc, setEnc] = useState<EncState>({ phase: "list", amount: 0, reason: "" });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const SPEED = 1.6; // >1 = slower

    function play() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
      let t = 0;
      const at = (delay: number, fn: () => void) => {
        t += delay * SPEED;
        timers.current.push(setTimeout(fn, t));
      };
      const set = (patch: Partial<EncState>) =>
        setEnc((s) => ({ ...s, ...patch }));

      at(0, () => set({ phase: "list", amount: 0, reason: "" }));
      at(1500, () => set({ phase: "sheet", amount: 0, reason: "" }));
      at(850, () => {});
      [3, 30, 300, 3000, 30000].forEach((a) =>
        at(240, () => set({ phase: "amount", amount: a }))
      );
      at(550, () => {});
      const reason = "bank account ma transfer a/c no.3370";
      const chunks: string[] = [];
      for (let i = 5; i < reason.length; i += 5) chunks.push(reason.slice(0, i));
      chunks.push(reason);
      chunks.forEach((c) =>
        at(150, () => set({ phase: "reason", amount: 30000, reason: c }))
      );
      at(800, () => set({ phase: "save" }));
      at(650, () => set({ phase: "transit" }));
      at(2900, () => set({ phase: "stored" }));
      at(1400, () => set({ phase: "done" }));
      at(3400, () => play());
    }

    play();
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const p = enc.phase;
  const sheetOpen = (["sheet", "amount", "reason", "save"] as EncPhase[]).includes(p);
  const saveActive = (p === "reason" && enc.reason.length > 0) || p === "save";
  const nhPending = (["transit", "stored"] as EncPhase[]).includes(p);

  return {
    encSheetOpen: sheetOpen,
    encAmountFmt: inr(enc.amount),
    encAmountColor: enc.amount ? "#17211f" : "#b4bcb6",
    encReason: enc.reason,
    encReasonEmpty: enc.reason.length === 0,
    encCaretAmount: p === "amount",
    encCaretReason: p === "reason",
    encSaveActive: saveActive,
    encSavedBadge: p === "done",
    encNhSaved: p === "done",
    encNhPending: nhPending,
    encNhIdle: p !== "done" && !nhPending,
    encTransitActive: (["save", "transit", "stored"] as EncPhase[]).includes(p),
    encMidCaption: CAPTIONS[p],
    encCloudEntry: (["stored", "done"] as EncPhase[]).includes(p),
  };
}
