"use client";

import {
  CheckCircle2,
  ChevronLeft,
  Cloud,
  Eye,
  KeyRound,
  Lock,
} from "lucide-react";

import { useEncryptionDemo } from "@/hooks/useEncryptionDemo";
import { cn } from "@/lib/utils";

const checklist = [
  "Sealed on your phone with AES-256, before it is sent",
  "Travels sealed — safe even on shared Wi-Fi",
  "Stored sealed on AWS — bank-grade cloud servers",
  "Only your key opens it — not hackers, not even us",
];

export function EncryptionShowcase() {
  const enc = useEncryptionDemo();

  return (
    <section className="max-w-[1240px] mx-auto px-6 pt-32 pb-2">
      <div className="text-center max-w-[640px] mx-auto mb-16">
        <h2 className="font-display font-semibold text-[clamp(30px,3.8vw,42px)] tracking-[-0.025em] leading-[1.06]">
          No one can see your data.
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-[60px]">
        {/* text */}
        <div className="flex-none w-full lg:w-[36%] lg:max-w-[440px]">
          <h3 className="font-display font-medium text-3xl tracking-[-0.02em] leading-[1.1] mb-4 text-ink">
            Your data stays private.
          </h3>
          <p className="text-lg text-[#556661] leading-relaxed mb-6">
            No more talis scattered across notes, WhatsApp chats and Excel
            files. Every record is sealed on your phone{" "}
            <em className="not-italic text-teal font-semibold">before</em> it
            leaves — and Amazon&#8217;s cloud only ever holds the sealed copy.
          </p>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-base text-[#2b3a37]"
              >
                <CheckCircle2 size={18} className="text-teal flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* dark proof panel */}
        <div className="flex-1 min-w-0 w-full py-2">
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-4">
            {/* 01 · your phone */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <div className="w-60 rounded-[36px] p-[6px] bg-gradient-to-br from-[#20282a] to-[#05100e] shadow-[0_30px_60px_-24px_rgba(9,20,18,0.55)] flex-shrink-0">
                <div className="relative rounded-[31px] overflow-hidden bg-[#f1f2f1] h-[480px]">
                  <span className="absolute top-[10px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#05100e] rounded-full z-[9]" />
                  {/* app header */}
                  <div className="flex items-center gap-2 pt-6 pb-3 px-3 bg-white border-b border-ink/[0.07]">
                    <span className="grid place-items-center w-[30px] h-[30px] rounded-lg bg-[#f2f3f2] border border-ink/[0.08] flex-shrink-0">
                      <ChevronLeft size={17} className="text-ink" />
                    </span>
                    <span className="flex flex-col leading-tight flex-1 min-w-0">
                      <span className="font-display font-bold text-[15.5px] text-ink">
                        Add Kharchi
                      </span>
                      <span className="text-[11px] text-muted-faint">Boat name</span>
                    </span>
                    {enc.encSavedBadge ? (
                      <span className="inline-flex items-center text-[11px] font-bold text-[#0f7a3d] bg-[#dff3e8] border border-[#c3e7d0] px-2.5 py-1 rounded-md animate-encPop">
                        1 saved
                      </span>
                    ) : null}
                  </div>
                  {/* crew list */}
                  <div className="py-3 px-3 flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-wider text-muted-faint px-0.5">
                      CREW &mdash; 6 MEMBERS
                    </span>
                    <CrewRow initial="T" name="Tandel" role="Tandel" roleBg="#e7f0fb" roleColor="#1653cc" avatarBg="#dbe7fb" />
                    <CrewRow initial="K1" name="Khalasi 1" role="Khalasi" roleBg="#dff3e8" roleColor="#0f7a3d" avatarBg="#d7f2e1" />

                    {/* Khalasi 2 — the entry being recorded */}
                    <div
                      className={cn(
                        "flex items-center gap-2 border rounded-xl py-2.5 px-3 transition-colors",
                        enc.encNhSaved
                          ? "bg-[#e6f5ec] border-[#c3e7d0]"
                          : "bg-white border-ink/[0.08]"
                      )}
                    >
                      <span className="grid place-items-center w-8 h-8 rounded-full bg-[#d7f2e1] text-[#0f7a3d] font-display font-bold text-[11px] flex-shrink-0">
                        K2
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-bold text-ink">Khalasi 2</span>
                        <span className="inline-block mt-0.5 text-[9.5px] font-bold text-[#0f7a3d] bg-[#dff3e8] px-2 py-0.5 rounded">
                          Khalasi
                        </span>
                      </span>
                      {enc.encNhIdle ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1653cc] bg-[#e7f0fb] py-2 px-2.5 rounded-lg">
                          + Add
                        </span>
                      ) : null}
                      {enc.encNhPending ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-faint">
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-[#d4d7da] border-t-[#1653cc] animate-encSpin" />
                          Saving
                        </span>
                      ) : null}
                      {enc.encNhSaved ? (
                        <span className="inline-flex items-center gap-1 text-[13px] font-bold text-[#0f7a3d] animate-encPop">
                          <CheckCircle2 size={16} />
                          &#8377; 30,000
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* add advance sheet */}
                  {enc.encSheetOpen ? (
                    <>
                      <span className="absolute inset-0 bg-[rgba(10,18,17,0.42)] z-[5]" />
                      <div className="absolute left-0 right-0 bottom-0 z-[6] bg-[#f1f2f1] rounded-t-[25px] pt-3 px-4 pb-4 shadow-[0_-14px_34px_-18px_rgba(0,0,0,0.45)] animate-encSheetUp">
                        <span className="block w-11 h-1 rounded-full bg-[#cdd2ce] mx-auto mb-3" />
                        <div className="text-center mb-4">
                          <span className="block font-display font-bold text-base text-ink">
                            Add Advance / Kharchi
                          </span>
                          <span className="block text-[11px] text-[#8a5a1a] mt-0.5">
                            Khalasi 2
                          </span>
                        </div>
                        <span className="block text-[11px] font-bold text-[#1653cc] mb-1">
                          Amount (&#8377;) *
                        </span>
                        <div className="flex items-center gap-1.5 h-[42px] px-3.5 bg-white border border-ink/10 rounded-[10px]">
                          <span className="text-[17px] font-bold text-ink">&#8377;</span>
                          <span
                            className="text-[17px] font-bold"
                            style={{ color: enc.encAmountColor }}
                          >
                            {enc.encAmountFmt}
                          </span>
                          {enc.encCaretAmount ? (
                            <span className="w-0.5 h-[20px] bg-[#1653cc] animate-caretBlink" />
                          ) : null}
                        </div>
                        <span className="block text-[11px] font-bold text-[#1653cc] mt-3 mb-1">
                          Reason
                        </span>
                        <div className="flex items-center min-h-[42px] py-2 px-3.5 bg-white border border-ink/10 rounded-[10px]">
                          {enc.encReasonEmpty ? (
                            <span className="text-[12.5px] text-[#b4bcb6]">
                              e.g. Advance, Medicine, Travel&hellip;
                            </span>
                          ) : (
                            <span className="text-[12.5px] text-ink leading-snug">
                              {enc.encReason}
                            </span>
                          )}
                          {enc.encCaretReason ? (
                            <span className="w-0.5 h-[17px] bg-[#1653cc] ml-px flex-shrink-0 animate-caretBlink" />
                          ) : null}
                        </div>
                        <div
                          className="flex items-center justify-center gap-1.5 h-12 mt-4 rounded-[12px] font-bold text-[15px] transition-colors"
                          style={{
                            background: enc.encSaveActive ? "#1653cc" : "#eef0ef",
                            color: enc.encSaveActive ? "#ffffff" : "#b0b5ba",
                          }}
                        >
                          <CheckCircle2 size={18} />
                          Save Entry
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-[#0d5a60] bg-[#e5f2f1] border border-[#cfe6e4] py-1.5 px-3.5 rounded-lg">
                <Eye size={15} />
                readable only here
              </span>
            </div>

            {/* 02 · on the move */}
            <div className="flex-1 min-w-[170px] w-full flex flex-col items-center justify-center gap-4 px-0.5">
              <div className="relative w-full h-16 flex items-center justify-center">
                <span className="absolute -left-3.5 -right-3.5 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-teal/0 via-teal/30 to-teal/0" />
                {enc.encTransitActive ? (
                  <span className="absolute top-1/2 left-0 -translate-y-1/2 inline-flex items-center gap-1.5 bg-[#eafaf9] border border-teal/35 rounded-full py-1.5 px-3 whitespace-nowrap shadow-[0_4px_10px_-6px_rgba(13,109,117,0.5)] animate-packetGo">
                    <Lock size={10} className="text-teal" />
                    <span className="font-mono text-[10px] text-teal">9f3A2B&hellip;</span>
                  </span>
                ) : null}
                <span className="relative z-[2] grid place-items-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-light to-teal-dark shadow-[0_12px_26px_-10px_rgba(13,109,117,0.7)] border-[3px] border-cream animate-sealPulse">
                  <Lock size={26} className="text-white" />
                </span>
              </div>
              <span className="font-display font-semibold text-sm text-ink">
                {enc.encMidCaption}
              </span>
            </div>

            {/* 03 · aws server */}
            <div className="flex-none w-full md:w-[280px] flex flex-col justify-center gap-2.5">
              <div className="rounded-[20px] overflow-hidden bg-white border border-ink/10 shadow-[0_26px_50px_-30px_rgba(13,31,29,0.35)]">
                <div className="flex items-center gap-2.5 py-4 px-5 bg-gradient-to-br from-teal-light to-teal-dark">
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/[0.18]">
                    <Cloud size={18} className="text-white" />
                  </span>
                  <span className="font-display font-semibold text-[15px] text-white">
                    Amazon AWS Server
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-white bg-white/[0.18] border border-white/[0.28] py-1.5 px-3 rounded-full">
                    <Lock size={11} />
                    Locked
                  </span>
                </div>
                <div className="p-3.5 flex flex-col gap-2.5">
                  {enc.encCloudEntry ? (
                    <div className="flex items-center gap-2.5 bg-[#e9f6ee] border border-[#bfe6cd] rounded-xl py-3 px-3 animate-encPop">
                      <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#d7f2e1] flex-shrink-0">
                        <Lock size={17} className="text-[#0f7a3d]" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-mono text-[10px] text-muted-faint">
                            rec_04 &middot; Vx28q&hellip;
                          </span>
                          <span className="text-[9px] font-bold text-[#0f7a3d] bg-[#d7f2e1] px-2 py-0.5 rounded">
                            just now
                          </span>
                        </span>
                        <span className="block font-mono text-sm font-semibold text-teal break-all leading-snug">
                          9f3A2Bk4mZpQ7Lx8Rd1Tn
                        </span>
                      </span>
                      <CheckCircle2 size={17} className="text-[#0f7a3d] flex-shrink-0" />
                    </div>
                  ) : null}
                  <CloudEntryRow id="rec_03" hash="8kPw1…" age="2 days ago" value="1tJs+hYupLx4kBvkPm0gYw2" />
                  <CloudEntryRow id="rec_02" hash="qL5me…" age="5 days ago" value="Zx7Qd2mR8kFa0uLpN4vHs1" />
                </div>
                <div className="flex items-center gap-2 py-3.5 px-5 border-t border-ink/[0.08] bg-gradient-to-br from-teal-light to-teal-dark">
                  <KeyRound size={17} className="text-white" />
                  <span className="text-sm font-bold text-white">
                    No one can read this &mdash; not even us.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CrewRow({
  initial,
  name,
  role,
  roleBg,
  roleColor,
  avatarBg,
}: {
  initial: string;
  name: string;
  role: string;
  roleBg: string;
  roleColor: string;
  avatarBg: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-white border border-ink/[0.08] rounded-xl py-2.5 px-3">
      <span
        className="grid place-items-center w-8 h-8 rounded-full font-display font-bold text-[11px] flex-shrink-0"
        style={{ background: avatarBg, color: roleColor }}
      >
        {initial}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-bold text-ink">{name}</span>
        <span
          className="inline-block mt-0.5 text-[9.5px] font-bold px-2 py-0.5 rounded"
          style={{ background: roleBg, color: roleColor }}
        >
          {role}
        </span>
      </span>
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1653cc] bg-[#e7f0fb] py-2 px-2.5 rounded-lg">
        + Add
      </span>
    </div>
  );
}

function CloudEntryRow({
  id,
  hash,
  age,
  value,
}: {
  id: string;
  hash: string;
  age: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-[#f7f8f7] border border-ink/[0.07] rounded-xl py-3 px-3">
      <span className="grid place-items-center w-9 h-9 rounded-lg bg-[#eef0ef] flex-shrink-0">
        <Lock size={17} className="text-[#7c8a83]" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="flex items-center gap-1.5 mb-0.5">
          <span className="font-mono text-[10px] text-muted-faint">
            {id} &middot; {hash}
          </span>
          <span className="text-[9px] text-[#b4bcb6]">{age}</span>
        </span>
        <span className="block font-mono text-sm font-semibold text-teal break-all leading-snug">
          {value}
        </span>
      </span>
      <Lock size={16} className="text-[#c2c9c4] flex-shrink-0" />
    </div>
  );
}
