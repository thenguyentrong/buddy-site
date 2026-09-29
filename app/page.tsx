import Image from "next/image";
import Link from "next/link";
import frames from "../public/buddy-frames.json";
import { BuddyFace } from "./_components/buddy-face";
import { HeroWatch } from "./_components/hero-watch";
import { Icon, type IconName } from "./_components/icon";
import { at, Typed, typing, Words } from "./_components/motion";
import { WaitlistForm } from "./_components/waitlist-form";
import { Watch } from "./_components/watch";

const GITHUB = "https://github.com/thenguyentrong/watch-ai";

const ask = "Hey Buddy, text Alex I'm running ten minutes late.";

// The same text without Buddy.
const phoneSteps = ["Take out your phone", "Unlock it", "Open Messages", "Find Alex", "Type it out", "Send"];

// You say it, then its pop-up drops in, the way it happens on the phone.
const acts = [
  {
    say: "“Take me to the station.”",
    src: "/img/popup-map.webp",
    alt: "Pop-up: directions to Aachen Hauptbahnhof, with a map",
    height: 603,
  },
  { say: "“Pasta timer, ten minutes.”", src: "/img/popup-timer.webp", alt: "Pop-up: timer, 10 minutes, pasta", height: 179 },
  {
    say: "“Text Alex I'm late.”",
    src: "/img/popup-text.webp",
    alt: "Pop-up: a text to Alex waits for Send or Cancel",
    height: 366,
  },
];

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

const reads = [
  ["ChatGPT hears", "“Any new messages?”"],
  ["Your phone reads", "Your messages, with Gemma on the phone"],
  ["ChatGPT gets", "“Done. The phone is telling the user itself.”"],
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

const h2 = "text-[34px] leading-[1.05] font-semibold tracking-[-0.035em] text-balance md:text-[48px]";
const body = "mt-5 max-w-[34rem] text-lg leading-relaxed text-muted";
const eyebrow = "text-sm font-semibold tracking-wide text-mint";

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div
      data-seq
      data-gap="0.3"
      data-a="phone"
      style={at(0.05)}
      className={`mx-auto w-full max-w-[300px] overflow-hidden rounded-[40px] border border-line bg-bg ${className}`}
    >
      <Image src={src} alt={alt} width={1179} height={2556} sizes="300px" quality={90} className="block h-auto w-full" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-[1152px] items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/buddy.png" alt="" width={32} height={32} preload className="rounded-[9px]" />
          <span className="text-lg font-semibold tracking-tight">Buddy</span>
        </Link>
        <a href={GITHUB} className="text-sm font-medium text-muted transition-colors hover:text-ink">
          GitHub
        </a>
      </header>

      <main>
        {/* Hook. It plays as soon as the page shows: the words, then the watch, then the phone next to it.
            The glow and the 3D watch reach past the column on purpose; the wrapper stops them at the screen's edge. */}
        <div className="overflow-x-clip">
          <section className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 pt-10 pb-20 sm:px-6 md:grid-cols-2 md:items-center md:pt-16 md:pb-28">
            <div>
              <p className={eyebrow} data-a="rise" style={at(0.05)}>
                Wear OS + Android
              </p>
              <h1 className="mt-5 text-[42px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-[56px] md:text-[length:clamp(42px,5.2vw,68px)]">
                <Words text="The AI gadget you already own." start={0.12} />
              </h1>
              <p className="mt-6 max-w-[30rem] text-xl leading-relaxed text-muted" data-a="rise" style={at(0.62)}>
                Buddy turns your smartwatch into a private AI agent. Say what you need, and your phone does it.
              </p>
              <div className="mt-9" data-a="rise" style={at(0.8)}>
                <WaitlistForm id="top" />
              </div>
            </div>

            <figure className="relative flex w-full items-center justify-center gap-6">
              <div className="aurora" aria-hidden="true" data-a="glow" style={at(0.3)} />
              <div className="relative z-10 shrink-0" data-a="grow" style={at(0.2)}>
                <HeroWatch first={frames.rest[0].b} />
              </div>
              <div className="relative hidden w-[190px] shrink-0 lg:block" data-a="right" style={at(0.75)}>
                <div className="phone-float overflow-hidden rounded-[32px] border-[6px] border-[#08080a] shadow-[0_0_0_1.5px_#2c2c32]">
                  <Image
                    src="/img/3-text-waits-for-yes.webp"
                    alt="On the phone: a text to Alex waits for Send or Cancel"
                    width={1179}
                    height={2556}
                    sizes="190px"
                    quality={90}
                    preload
                    className="block h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="sr-only">Buddy on the watch, and the text it prepared on the phone</figcaption>
            </figure>
          </section>
        </div>

        {/* Problem: the statement and its two sentences; next to it, what a small thing takes on a phone
            today, step by step, and then the same thing with Buddy. */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-32">
            <div data-seq data-gap="0.5">
              <h2 className="text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance md:text-[length:clamp(44px,4.6vw,60px)]">
                <Words text="Small things still need both hands." />
              </h2>
              <p className="mt-8 max-w-[34rem] text-xl leading-relaxed text-muted">
                <span className="block" data-a="rise" style={at(0.55)}>
                  AI agents can already text, remind and look things up.
                </span>
                <span className="block" data-a="rise" style={at(0.95)}>
                  But they live on laptops, and AI gadgets are one more thing to buy and charge.
                </span>
              </p>
            </div>
            <figure
              className="rounded-[32px] border border-line bg-surface p-6 md:p-7"
              data-seq
              data-gap="0.3"
              data-a="rise"
              style={at(0)}
            >
              <figcaption className="text-sm font-semibold text-muted" data-a="rise" style={at(0.1)}>
                Texting Alex you&apos;re running late
              </figcaption>
              <ol className="mt-5 space-y-3">
                {phoneSteps.map((s, i) => (
                  <li
                    key={s}
                    className="flex items-center gap-3 text-[15px] text-ink"
                    data-a="row"
                    style={at(0.25 + i * 0.14)}
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-xs font-semibold text-dim">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-right text-sm text-dim" data-a="rise" style={at(0.3 + phoneSteps.length * 0.14)}>
                On your phone: {phoneSteps.length} steps, both hands
              </p>
              <div className="mt-5 border-t border-line pt-5">
                <div className="flex items-center gap-3" data-a="grow" style={at(0.55 + phoneSteps.length * 0.14)}>
                  <Image src="/img/buddy.png" alt="" width={36} height={36} className="size-9 shrink-0 rounded-[10px]" />
                  <p className="text-[15px] font-medium text-pretty text-ink">“{ask}”</p>
                </div>
                <p
                  className="mt-3 text-right text-sm font-semibold text-mint"
                  data-a="rise"
                  style={at(0.85 + phoneSteps.length * 0.14)}
                >
                  With Buddy: one sentence, hands-free
                </p>
              </div>
            </figure>
          </div>
        </section>

        {/* Demo: your message is typed out, Buddy types back, you say yes, and it's sent. */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-32">
            <div data-seq data-gap="0.5">
              <h2 className={h2}>
                <Words text="Say it. It's done." />
              </h2>
              <p className={body} data-a="rise" style={at(0.4)}>
                Buddy reads anything that goes out back to you, and waits for your yes. Nothing is sent without it.
              </p>
            </div>
            <ol className="flex flex-col gap-4" aria-label="An example conversation" data-seq data-gap="0.3">
              <li
                className="max-w-[26rem] self-end rounded-[26px] rounded-br-lg bg-ink px-6 py-4 text-lg font-medium text-pretty text-bg"
                data-a="rise"
                style={at(0)}
              >
                <Typed text={ask} start={0.3} step={0.026} />
              </li>
              <li className="relative max-w-[26rem]">
                <span
                  className="typing absolute top-0 left-0 flex h-[54px] items-center gap-1.5 rounded-[26px] rounded-bl-lg border border-mint/35 bg-surface px-5"
                  aria-hidden="true"
                  data-a="blip"
                  style={at(0.5 + typing(ask, 0.026))}
                >
                  <i />
                  <i />
                  <i />
                </span>
                <div
                  className="rounded-[26px] rounded-bl-lg border border-mint/35 bg-surface px-6 py-4 text-lg text-pretty text-ink"
                  data-a="rise"
                  style={at(1.2 + typing(ask, 0.026))}
                >
                  <span className="mb-1 block text-sm font-semibold text-mint">Buddy</span>
                  To Alex: “Running ten minutes late.” Send it?
                </div>
              </li>
              <li
                className="self-end rounded-[26px] rounded-br-lg bg-ink px-6 py-4 text-lg font-medium text-bg"
                data-a="rise"
                style={at(2 + typing(ask, 0.026))}
              >
                Yes.
              </li>
              <li
                className="flex items-center gap-3 text-lg font-medium text-ink"
                data-a="nudge"
                style={at(2.5 + typing(ask, 0.026))}
              >
                <span className="inline-flex" data-a="pop" style={at(2.55 + typing(ask, 0.026))}>
                  <Icon name="checkCircle" className="size-7 text-mint" />
                </span>
                Sent.
              </li>
            </ol>
          </div>
        </section>

        {/* It acts: each request is typed, then its pop-up drops in. */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 sm:px-6 md:py-32">
            <div data-seq data-gap="0.5">
              <h2 className={`${h2} max-w-[16ch]`}>
                <Words text="It doesn't just answer. It acts." step={0.06} />
              </h2>
              <p className={body} data-a="rise" style={at(0.45)}>
                Buddy runs the phone in your pocket, and shows every action as a small pop-up.
              </p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2">
              {acts.map((a, i) => (
                <div
                  key={a.src}
                  className={`cell rounded-[32px] border border-line p-5 ${i === 0 ? "cell-glow flex flex-col justify-end md:row-span-2" : "bg-surface"}`}
                  data-seq
                  data-gap="0.3"
                  data-a="rise"
                  style={at(0)}
                >
                  <p className="mb-4 px-2 text-sm font-semibold text-muted">
                    <Typed text={a.say} start={0.2} step={0.022} />
                  </p>
                  <Image
                    src={a.src}
                    alt={a.alt}
                    width={1016}
                    height={a.height}
                    sizes="(min-width: 768px) 540px, 100vw"
                    quality={90}
                    className="h-auto w-full"
                    data-a="drop"
                    style={at(0.32 + typing(a.say, 0.022))}
                  />
                </div>
              ))}
              <div
                className="cell rounded-[32px] border border-line bg-raised p-7 md:col-span-2"
                data-seq
                data-gap="0.3"
                data-a="rise"
                style={at(0)}
              >
                <p className="text-lg font-semibold" data-a="rise" style={at(0.12)}>
                  And more
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {more.map((m, i) => (
                    <li
                      key={m}
                      className="chip rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink"
                      data-a="chip"
                      style={at(0.25 + i * 0.06)}
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy: what goes where, one row at a time. */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-32">
            <div data-seq data-gap="0.45">
              <p className={eyebrow} data-a="rise" style={at(0)}>
                Privacy-first, with on-device AI
              </p>
              <h2 className={`${h2} mt-4`}>
                <Words text="Private things stay on your phone." start={0.08} step={0.06} />
              </h2>
              <p className={body} data-a="rise" style={at(0.5)}>
                ChatGPT decides what to do. Your messages are read by an AI model on the phone, and never sent.
              </p>
              <dl className="mt-10 max-w-[34rem] divide-y divide-line border-y border-line">
                {reads.map(([k, v], i) => (
                  <div
                    key={k}
                    className="grid grid-cols-[9rem_1fr] gap-4 py-4 text-[15px] sm:grid-cols-[11rem_1fr]"
                    data-a="row"
                    style={at(0.8 + i * 0.3)}
                  >
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

        {/* Safety: the five rules, one after another. */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 sm:px-6 md:py-32">
            <div data-seq data-gap="0.45">
              <h2 className={h2}>
                <Words text="It can't be talked into things." step={0.06} />
              </h2>
              <p className={body} data-a="rise" style={at(0.45)}>
                Every action passes one gate written in code, not in a prompt.
              </p>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-6">
              {rules.map((r) => (
                <div
                  key={r.title}
                  className={`cell rounded-[32px] border border-line bg-surface p-7 ${r.wide ? "md:col-span-3" : "md:col-span-2"}`}
                  data-seq
                  data-gap="0.14"
                  data-a="rise"
                  style={at(0)}
                >
                  <span className="inline-flex" data-a="pop" style={at(0.2)}>
                    <Icon name="checkCircle" className="size-7 text-mint" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup: the equation writes itself, and Buddy comes out of it. */}
        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 text-center sm:px-6 md:py-32">
            <h2 className={`${h2} mx-auto`} data-seq data-gap="0.4">
              <span className="block">
                <Words text="No new gadget." />
              </span>{" "}
              <span className="block">
                <Words text="No new subscription." start={0.3} />
              </span>
            </h2>
            <div
              className="mt-12 flex flex-col items-center gap-3 md:mt-16 md:flex-row md:justify-center md:gap-4"
              data-seq
              data-gap="0.3"
            >
              {setup.map((s, i) => (
                <div key={s.title} className="contents">
                  {i > 0 && (
                    <span
                      className="text-2xl leading-none font-light text-dim md:text-3xl"
                      aria-hidden="true"
                      data-a="pop"
                      style={at(i * 0.32 - 0.16)}
                    >
                      +
                    </span>
                  )}
                  <div className="flex w-[210px] flex-col items-center" data-a="rise" style={at(i * 0.32)}>
                    <div className="flex size-14 items-center justify-center rounded-full border border-line bg-surface md:size-20">
                      <Icon name={s.icon} className="size-7 text-mint md:size-9" />
                    </div>
                    <p className="mt-3 text-lg font-semibold md:mt-4">{s.title}</p>
                    <p className="mt-1 text-sm text-muted">{s.text}</p>
                  </div>
                </div>
              ))}
              <span
                className="text-2xl leading-none font-light text-dim md:text-3xl"
                aria-hidden="true"
                data-a="pop"
                style={at(0.8)}
              >
                =
              </span>
              <div className="flex w-[210px] flex-col items-center" data-a="grow" style={at(0.98)}>
                <Image
                  src="/img/buddy.png"
                  alt=""
                  width={80}
                  height={80}
                  className="size-14 rounded-[17px] md:size-20 md:rounded-[24px]"
                />
                <p className="mt-3 text-lg font-semibold text-mint md:mt-4">Buddy</p>
                <p className="mt-1 text-sm text-muted">No servers of mine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Buddy Plus */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-32">
            <div className="md:order-2" data-seq data-gap="0.4">
              <p className={eyebrow} data-a="rise" style={at(0)}>
                Buddy Plus
              </p>
              <h2 className={`${h2} mt-4`}>
                <Words text="Everything Buddy does is free." start={0.08} step={0.06} />
              </h2>
              <p className={body} data-a="rise" style={at(0.45)}>
                Plus is for people who want to support it: choose your Buddy, get new things first, and a thank-you mark.
              </p>
              <p className="mt-4 text-base text-dim" data-a="rise" style={at(0.65)}>
                Runs on RevenueCat. Privacy and safety are never part of it.
              </p>
            </div>
            <Phone
              src="/img/8-choose-your-buddy.webp"
              alt="Choose your Buddy: twelve Buddies in different shapes and colours"
              className="md:order-1"
            />
          </div>
        </section>

        {/* Open source */}
        <section className="border-t border-line">
          <div className="mx-auto flex w-full max-w-[1152px] flex-col items-start gap-8 px-4 py-20 sm:px-6 md:flex-row md:items-end md:justify-between md:py-24">
            <div data-seq data-gap="0.35">
              <h2 className={h2}>
                <Words text="Open source." />
              </h2>
              <p className={body} data-a="rise" style={at(0.3)}>
                Read how it works, check the safety gate, or build it yourself. Apache-2.0.
              </p>
            </div>
            <a
              href={GITHUB}
              className="shine inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-mint/60 active:scale-[0.98]"
              data-seq
              data-a="pop"
              style={at(0.05)}
            >
              GitHub
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-10 px-4 py-24 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-32">
            <h2 className={h2} data-seq data-gap="0.25">
              <Words text="Questions" />
            </h2>
            <div className="divide-y divide-line border-y border-line" data-seq data-gap="0.3">
              {faq.map((f, i) => (
                <details key={f.q} className="group py-5" data-a="rise" style={at(i * 0.07)}>
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
          <div
            className="mx-auto flex w-full max-w-[1152px] flex-col items-center px-4 py-24 text-center sm:px-6 md:py-32"
            data-seq
            data-gap="0.5"
          >
            {/* Buddy again, small: it listens while you type your address, and cheers when you're on the list. */}
            <div className="mb-12" data-a="grow" style={at(0)}>
              <Watch className="watch-sm">
                <BuddyFace first={frames.rest[0].b} className="w-[62%]" />
              </Watch>
            </div>
            <h2 className="max-w-[16ch] text-[40px] leading-[1.02] font-semibold tracking-[-0.045em] text-balance md:text-[68px]">
              <Words text="Get Buddy on your wrist first." start={0.35} />
            </h2>
            <p className="mt-6 text-xl text-muted" data-a="rise" style={at(0.85)}>
              One email when the beta opens. That&apos;s it.
            </p>
            <div className="mt-10 w-full max-w-[30rem] text-left" data-a="rise" style={at(1)}>
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
