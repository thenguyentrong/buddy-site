import Image from "next/image";
import Link from "next/link";
import frames from "../public/buddy-frames.json";
import { BuddyFace } from "./_components/buddy-face";
import { HeroWatch } from "./_components/hero-watch";
import { Icon, type IconName } from "./_components/icon";
import { WaitlistForm } from "./_components/waitlist-form";
import { Watch } from "./_components/watch";

const GITHUB = "https://github.com/thenguyentrong/watch-ai";

const more = [
  "Calls",
  "Replies in WhatsApp, Signal and SMS",
  "Alarms",
  "Calendar and reminders",
  "Notes",
  "Music and volume",
  "Do Not Disturb",
  "Find my phone",
  "Flashlight",
  "Open apps",
];

const rules: { title: string; text: string; wide?: boolean }[] = [
  { title: "Your yes, every time", text: "Texts and calls are read back and wait for your yes.", wide: true },
  { title: "Only when you're there", text: "Watch on your wrist, phone unlocked or earbuds in.", wide: true },
  { title: "Ten an hour, at most", text: "A hard limit on texts and calls." },
  { title: "Never your bank", text: "Banking, payment and password apps are never read." },
  { title: "“Stop” means stop", text: "It ends everything and drops what's waiting." },
];

const setup: { icon: IconName; title: string; text: string }[] = [
  { icon: "watch", title: "Your watch", text: "Mic, speaker and Buddy's face" },
  { icon: "graphicEq", title: "Your earbuds", text: "They take over the sound" },
  { icon: "neurology", title: "Your ChatGPT plan", text: "Plus or Pro, no API keys" },
];

const faq = [
  {
    q: "Which watch and phone?",
    a: "A Wear OS watch paired with an Android phone. I build and test Buddy on a Galaxy Watch5 and a Galaxy S23 Ultra.",
  },
  {
    q: "What does it cost?",
    a: "Buddy is free. It runs on your own ChatGPT Plus or Pro plan, so there's nothing new to pay for. Buddy Plus is optional.",
  },
  {
    q: "Does ChatGPT see my messages?",
    a: "No. They're read on your phone, and the phone answers you itself. If you switch that off in Settings, ChatGPT gets them with codes, numbers and links taken out.",
  },
  {
    q: "Is it always listening?",
    a: "“Hey Buddy” is heard on the watch itself after you raise your wrist, or all the time if you switch that on. Nothing is recorded or sent until it hears the phrase.",
  },
  {
    q: "iPhone or Apple Watch?",
    a: "Not yet. Buddy is built natively for Android and Wear OS.",
  },
  {
    q: "When can I try it?",
    a: "I'm getting a beta ready. Join the list and I'll email you once, when it opens. The code is open source, so you can also build it yourself today.",
  },
];

const h2 = "reveal text-[34px] leading-[1.05] font-semibold tracking-[-0.035em] text-balance md:text-[48px]";
const body = "reveal mt-5 max-w-[34rem] text-lg leading-relaxed text-muted";

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`reveal-3d mx-auto w-full max-w-[300px] overflow-hidden rounded-[40px] border border-line bg-bg ${className}`}>
      <Image src={src} alt={alt} width={720} height={1561} sizes="300px" className="block h-auto w-full" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-[1152px] items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/buddy-icon.png" alt="" width={32} height={32} preload className="rounded-[9px]" />
          <span className="text-lg font-semibold tracking-tight">Buddy</span>
        </Link>
        <a href={GITHUB} className="text-sm font-medium text-muted transition-colors hover:text-ink">
          GitHub
        </a>
      </header>

      <main>
        {/* Hook. The glow and the 3D watch reach past the column on purpose; the wrapper stops them at the screen's edge. */}
        <div className="overflow-x-clip">
          <section className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 pt-10 pb-20 sm:px-6 md:grid-cols-2 md:items-center md:pt-16 md:pb-28">
            <div>
              <p className="text-sm font-semibold tracking-wide text-mint">Wear OS + Android</p>
              <h1 className="mt-5 text-[42px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-[56px] md:text-[length:clamp(42px,5.2vw,68px)]">
                The AI gadget you already own.
              </h1>
              <p className="mt-6 max-w-[30rem] text-xl leading-relaxed text-muted">
                Buddy turns your smartwatch into a private AI agent. Say what you need, and your phone does it.
              </p>
              <div className="mt-9">
                <WaitlistForm id="top" />
              </div>
            </div>

            <figure className="relative flex w-full items-center justify-center gap-6">
              <div className="aurora" aria-hidden="true" />
              <HeroWatch first={frames.rest[0].b} />
              <div className="phone-float relative hidden w-[190px] shrink-0 overflow-hidden rounded-[32px] border-[6px] border-[#08080a] shadow-[0_0_0_1.5px_#2c2c32] lg:block">
                <Image
                  src="/img/3-text-waits-for-yes.webp"
                  alt="On the phone: a text to Alex waits for Send or Cancel"
                  width={720}
                  height={1561}
                  sizes="190px"
                  preload
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="sr-only">Buddy on the watch, and the text it prepared on the phone</figcaption>
            </figure>
          </section>
        </div>

        {/* Problem */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 sm:px-6 md:py-36">
            <h2 className="reveal max-w-[20ch] text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance md:text-[76px]">
              Small things still need both hands.
            </h2>
            <p className="reveal mt-8 max-w-[38rem] text-xl leading-relaxed text-muted md:text-2xl">
              AI agents can already text, remind and look things up. But they live on laptops, and AI gadgets are one
              more thing to buy and charge.
            </p>
          </div>
        </section>

        {/* Demo */}
        <section className="demo border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-32">
            <div>
              <h2 className={h2}>Say it. It&apos;s done.</h2>
              <p className={body}>
                Buddy reads anything that goes out back to you, and waits for your yes. Nothing is sent without it.
              </p>
            </div>
            <ol className="flex flex-col gap-4" aria-label="An example conversation">
              <li className="bubble bubble-1 max-w-[26rem] self-end rounded-[26px] rounded-br-lg bg-ink px-6 py-4 text-lg font-medium text-pretty text-bg">
                Hey Buddy, text Alex I&apos;m running ten minutes late.
              </li>
              <li className="bubble bubble-2 max-w-[26rem] rounded-[26px] rounded-bl-lg border border-mint/35 bg-surface px-6 py-4 text-lg text-pretty text-ink">
                <span className="mb-1 block text-sm font-semibold text-mint">Buddy</span>
                To Alex: “Running ten minutes late.” Send it?
              </li>
              <li className="bubble bubble-3 self-end rounded-[26px] rounded-br-lg bg-ink px-6 py-4 text-lg font-medium text-bg">
                Yes.
              </li>
              <li className="bubble bubble-4 flex items-center gap-3 text-lg font-medium text-ink">
                <Icon name="checkCircle" className="size-7 text-mint" />
                Sent.
              </li>
            </ol>
          </div>
        </section>

        {/* It acts: bento */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 sm:px-6 md:py-32">
            <h2 className={`${h2} max-w-[16ch]`}>It doesn&apos;t just answer. It acts.</h2>
            <p className={body}>Buddy runs the phone in your pocket, and shows every action as a small pop-up.</p>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              <div className="cell cell-glow reveal flex flex-col justify-end rounded-[32px] border border-line p-5 md:row-span-2">
                <p className="mb-4 px-2 text-sm font-semibold text-muted">“Take me to the station.”</p>
                <Image src="/img/popup-map.webp" alt="Pop-up: directions to Aachen Hauptbahnhof, with a map" width={1016} height={603} sizes="(min-width: 768px) 540px, 100vw" className="pop h-auto w-full" />
              </div>
              <div className="cell reveal rounded-[32px] border border-line bg-surface p-5">
                <p className="mb-4 px-2 text-sm font-semibold text-muted">“Pasta timer, ten minutes.”</p>
                <Image src="/img/popup-timer.webp" alt="Pop-up: timer, 10 minutes, pasta" width={1016} height={179} sizes="(min-width: 768px) 540px, 100vw" className="pop h-auto w-full" />
              </div>
              <div className="cell reveal rounded-[32px] border border-line bg-surface p-5">
                <p className="mb-4 px-2 text-sm font-semibold text-muted">“Text Alex I&apos;m late.”</p>
                <Image src="/img/popup-text.webp" alt="Pop-up: a text to Alex waits for Send or Cancel" width={1016} height={366} sizes="(min-width: 768px) 540px, 100vw" className="pop h-auto w-full" />
              </div>
              <div className="cell reveal rounded-[32px] border border-line bg-raised p-7 md:col-span-2">
                <p className="text-lg font-semibold">And more</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {more.map((a) => (
                    <li key={a} className="chip rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-32">
            <div>
              <p className="reveal text-sm font-semibold tracking-wide text-mint">Privacy-first, with on-device AI</p>
              <h2 className={`${h2} mt-4`}>Private things stay on your phone.</h2>
              <p className={body}>
                ChatGPT decides what to do. Your messages are read by an AI model on the phone, and never sent.
              </p>
              <dl className="reveal mt-10 max-w-[34rem] divide-y divide-line border-y border-line">
                {[
                  ["ChatGPT hears", "“Any new messages?”"],
                  ["Your phone reads", "Your messages, with Gemma on the phone"],
                  ["ChatGPT gets", "“Done. The phone is telling the user itself.”"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-4 text-[15px] sm:grid-cols-[11rem_1fr]">
                    <dt className="text-muted">{k}</dt>
                    <dd className={k === "ChatGPT gets" ? "font-medium text-mint" : "font-medium text-ink"}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Phone
              src="/img/5-what-chatgpt-gets.webp"
              alt="Buddy's check page: a message that tries to give orders is read out on the phone with the number hidden, and ChatGPT only gets a note that the phone is telling the user"
            />
          </div>
        </section>

        {/* Safety: 2 + 3 grid */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 sm:px-6 md:py-32">
            <h2 className={h2}>It can&apos;t be talked into things.</h2>
            <p className={body}>Every action passes one gate written in code, not in a prompt.</p>
            <div className="mt-14 grid gap-4 md:grid-cols-6">
              {rules.map((r) => (
                <div
                  key={r.title}
                  className={`cell reveal rounded-[32px] border border-line bg-surface p-7 ${r.wide ? "md:col-span-3" : "md:col-span-2"}`}
                >
                  <Icon name="checkCircle" className="size-7 text-mint" />
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup: the equation */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 text-center sm:px-6 md:py-32">
            <h2 className={`${h2} mx-auto`}>
              <span className="block">No new gadget.</span> <span className="block">No new subscription.</span>
            </h2>
            <div className="mt-12 flex flex-col items-center gap-3 md:mt-16 md:flex-row md:justify-center md:gap-4">
              {setup.map((s, i) => (
                <div key={s.title} className="contents">
                  {i > 0 && (
                    <span className="reveal text-2xl leading-none font-light text-dim md:text-3xl" aria-hidden="true">
                      +
                    </span>
                  )}
                  <div className="reveal flex w-[210px] flex-col items-center">
                    <div className="flex size-14 items-center justify-center rounded-full border border-line bg-surface md:size-20">
                      <Icon name={s.icon} className="size-7 text-mint md:size-9" />
                    </div>
                    <p className="mt-3 text-lg font-semibold md:mt-4">{s.title}</p>
                    <p className="mt-1 text-sm text-muted">{s.text}</p>
                  </div>
                </div>
              ))}
              <span className="reveal text-2xl leading-none font-light text-dim md:text-3xl" aria-hidden="true">
                =
              </span>
              <div className="reveal flex w-[210px] flex-col items-center">
                <Image src="/img/buddy-icon.png" alt="" width={80} height={80} className="size-14 rounded-[17px] md:size-20 md:rounded-[24px]" />
                <p className="mt-3 text-lg font-semibold text-mint md:mt-4">Buddy</p>
                <p className="mt-1 text-sm text-muted">No servers of mine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buddy Plus */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-32">
            <Phone
              src="/img/8-choose-your-buddy.webp"
              alt="Choose your Buddy: twelve Buddies in different shapes and colours"
              className="md:order-1"
            />
            <div className="md:order-2">
              <p className="reveal text-sm font-semibold tracking-wide text-mint">Buddy Plus</p>
              <h2 className={`${h2} mt-4`}>Everything Buddy does is free.</h2>
              <p className={body}>
                Plus is for people who want to support it: choose your Buddy, get new things first, and a thank-you mark.
              </p>
              <p className="reveal mt-4 text-base text-dim">Runs on RevenueCat. Privacy and safety are never part of it.</p>
            </div>
          </div>
        </section>

        {/* Open source */}
        <section className="border-t border-line">
          <div className="mx-auto flex w-full max-w-[1152px] flex-col items-start gap-8 px-4 py-20 sm:px-6 md:flex-row md:items-end md:justify-between md:py-24">
            <div>
              <h2 className={h2}>Open source.</h2>
              <p className={body}>Read how it works, check the safety gate, or build it yourself. Apache-2.0.</p>
            </div>
            <a
              href={GITHUB}
              className="shine reveal inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-mint/60 active:scale-[0.98]"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-10 px-4 py-24 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-32">
            <h2 className={h2}>Questions</h2>
            <div className="reveal divide-y divide-line border-y border-line">
              {faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-2xl leading-none text-muted transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[40rem] text-base leading-relaxed text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Close */}
        <section className="border-t border-line">
          <div className="mx-auto flex w-full max-w-[1152px] flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32">
            {/* Buddy again, small: it listens while you type your address, and cheers when you're on the list. */}
            <Watch className="watch-sm reveal mb-12">
              <BuddyFace first={frames.rest[0].b} className="w-[62%]" />
            </Watch>
            <h2 className="reveal max-w-[16ch] text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance md:text-[68px]">
              Get Buddy on your wrist first.
            </h2>
            <p className="reveal mt-6 text-xl text-muted">One email when the beta opens. That&apos;s it.</p>
            <div className="mt-10 w-full max-w-[30rem] text-left">
              <WaitlistForm id="bottom" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1152px] flex-col gap-4 px-4 py-10 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>Buddy. Made for the RevenueCat Shipaton 2026.</p>
          <nav className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/imprint" className="hover:text-ink">
              Imprint
            </Link>
            <a href={GITHUB} className="hover:text-ink">
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </>
  );
}
