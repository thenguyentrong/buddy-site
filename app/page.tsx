import Image from "next/image";
import Link from "next/link";
import frames from "../public/buddy-frames.json";
import { BuddyFace } from "./_components/buddy-face";
import { Icon, type IconName } from "./_components/icon";
import { Watch } from "./_components/watch";
import { WaitlistForm } from "./_components/waitlist-form";

const GITHUB = "https://github.com/thenguyentrong/watch-ai";

const abilities = [
  "Texts",
  "Calls",
  "Replies in WhatsApp, Signal and SMS",
  "Timers and alarms",
  "Calendar and reminders",
  "Notes",
  "Music and volume",
  "Do Not Disturb",
  "Find my phone",
  "Flashlight",
  "Open apps",
  "Directions",
];

const rules = [
  "Nothing is sent without your yes, said in a later turn.",
  "Only while you're there: watch on your wrist, phone unlocked or earbuds in.",
  "At most ten texts or calls an hour.",
  "Banking, payment and password apps are never read, and one-time codes never leave the phone.",
  "“Stop” ends everything and drops what's waiting.",
];

const gadgets: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "watch",
    title: "Your watch",
    text: "It's the microphone, the speaker and Buddy's face. Raise your wrist and say “Hey Buddy”, or tap it.",
  },
  {
    icon: "graphicEq",
    title: "Your earbuds",
    text: "When they're in, they take over the sound, so Buddy talks straight into your ear.",
  },
  {
    icon: "neurology",
    title: "Your AI plan",
    text: "Sign in with ChatGPT and Buddy runs on your Plus or Pro plan. No API keys, no extra bill.",
  },
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

function Phone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[40px] border border-line bg-bg">
      <Image src={src} alt={alt} width={720} height={1561} sizes="300px" className="block h-auto w-full" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold tracking-wide text-mint">{children}</p>;
}

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-[1152px] items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/img/buddy-icon.png" alt="" width={32} height={32} preload className="rounded-[9px]" />
          <span className="text-lg font-semibold tracking-tight">Buddy</span>
        </Link>
        <a href={GITHUB} className="text-sm font-medium text-muted transition-colors hover:text-ink">
          GitHub
        </a>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-[1152px] gap-16 px-4 pt-12 pb-24 sm:px-6 md:grid-cols-2 md:items-center md:pt-20 md:pb-32">
          <div>
            <Eyebrow>Smartwatch app · Wear OS + Android</Eyebrow>
            <h1 className="mt-5 text-[40px] leading-[1.05] font-semibold tracking-[-0.035em] text-balance md:text-[56px]">
              A private, hands‑free AI agent on the watch you already wear.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
              Say “Hey Buddy” and it texts, calls, reads and answers your messages, sets timers and finds your phone. It
              runs on the ChatGPT plan you already pay for, and what&apos;s private is read on your phone, not in the cloud.
            </p>
            <div className="mt-10">
              <WaitlistForm id="top" />
            </div>
          </div>

          <figure className="relative flex w-full items-center justify-center gap-6">
            <div className="absolute top-1/2 left-1/2 aspect-square w-full max-w-[640px] -translate-x-1/2 md:w-[120%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(111,227,180,0.15)_0%,rgba(111,227,180,0.04)_45%,transparent_70%)]" />
            <Watch className="relative z-10 shrink-0">
              <BuddyFace first={frames.rest[0].b} className="w-[62%]" />
            </Watch>
            <div className="relative hidden w-[190px] shrink-0 overflow-hidden rounded-[32px] border-[6px] border-[#08080a] shadow-[0_0_0_1.5px_#2c2c32] lg:block">
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

        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center md:py-32">
            <div>
              <h2 className="text-[32px] leading-tight font-semibold tracking-[-0.03em] text-balance md:text-[40px]">
                It doesn&apos;t just answer. It acts on your phone.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                Buddy listens and talks through your watch, or your earbuds when they&apos;re in. The work happens on your
                phone, which stays in your pocket. Each action shows up as a small pop-up, and anything that goes out
                waits for your yes.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {abilities.map((a) => (
                  <li key={a} className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <Image
                src="/img/card-timer.webp"
                alt="Pop-up: timer, 10 minutes, pasta"
                width={1028}
                height={202}
                sizes="(min-width: 768px) 540px, 100vw"
                className="h-auto w-full"
              />
              <Image
                src="/img/card-map.webp"
                alt="Pop-up: directions to Aachen Hauptbahnhof, with a map"
                width={1028}
                height={616}
                sizes="(min-width: 768px) 540px, 100vw"
                className="h-auto w-full"
              />
              <Image
                src="/img/card-text.webp"
                alt="Pop-up: a text to Alex waiting for Send or Cancel"
                width={1028}
                height={380}
                sizes="(min-width: 768px) 540px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-32">
            <div>
              <Eyebrow>Privacy-first, with on-device AI</Eyebrow>
              <h2 className="mt-4 text-[32px] leading-tight font-semibold tracking-[-0.03em] md:text-[40px]">
                Private things stay on your phone.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                ChatGPT hears what you ask and decides what to do. Your messages, notes and calendar are read by an AI
                model that runs on the phone, and your phone says the answer in its own voice. ChatGPT only learns that
                the phone told you, and its microphone hears silence meanwhile.
              </p>
              <dl className="mt-8 max-w-[32rem] divide-y divide-line border-y border-line">
                {[
                  ["ChatGPT hears", "“Any new messages?”"],
                  ["Your phone reads", "Your messages, with Gemma running on the phone"],
                  ["ChatGPT gets", "“Done. The phone is telling the user itself.”"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 py-4 text-[15px] sm:grid-cols-[11rem_1fr]">
                    <dt className="text-muted">{k}</dt>
                    <dd className={k === "ChatGPT gets" ? "font-medium text-mint" : "font-medium text-ink"}>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 max-w-[32rem] text-[15px] leading-relaxed text-muted">
                No servers of mine: your requests go from your phone to OpenAI, under your own account.
              </p>
            </div>
            <Phone
              src="/img/5-what-chatgpt-gets.webp"
              alt="Buddy's check page: a message that tries to give orders is read out on the phone with the number hidden, and ChatGPT only gets a note that the phone is telling the user"
            />
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-32">
            <div className="md:order-2">
              <Eyebrow>Agent safety by design</Eyebrow>
              <h2 className="mt-4 text-[32px] leading-tight font-semibold tracking-[-0.03em] md:text-[40px]">
                It can&apos;t be talked into things.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                Any message an AI agent reads can try to give it orders. So every action goes through one gate written
                in code, not in a prompt.
              </p>
              <ul className="mt-8 flex max-w-[32rem] flex-col gap-4">
                {rules.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-base leading-relaxed text-ink">
                    <Icon name="checkCircle" className="mt-0.5 size-6 shrink-0 text-mint" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:order-1">
              <Phone
                src="/img/3-text-waits-for-yes.webp"
                alt="A text to Alex waits on the phone with Send and Cancel, above Buddy"
              />
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 sm:px-6 md:py-32">
            <h2 className="max-w-[40rem] text-[32px] leading-tight font-semibold tracking-[-0.03em] md:text-[40px]">
              No new gadget. No new subscription.
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {gadgets.map((g) => (
                <div key={g.title} className="border-t border-line pt-6">
                  <Icon name={g.icon} className="size-7 text-mint" />
                  <h3 className="mt-4 text-lg font-semibold">{g.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-muted">{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-32">
            <div>
              <Eyebrow>Buddy Plus</Eyebrow>
              <h2 className="mt-4 text-[32px] leading-tight font-semibold tracking-[-0.03em] md:text-[40px]">
                Everything Buddy does is free.
              </h2>
              <p className="mt-5 max-w-[32rem] text-lg leading-relaxed text-muted">
                Plus is for people who want to support it: choose your own Buddy (it&apos;s the one on your watch too), get
                new things first, and a thank-you mark. Privacy and safety are never part of it. Plus runs on RevenueCat.
              </p>
            </div>
            <Phone
              src="/img/8-choose-your-buddy.webp"
              alt="Choose your Buddy: twelve Buddies in different shapes and colours"
            />
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto flex w-full max-w-[1152px] flex-col items-start gap-6 px-4 py-24 sm:px-6 md:flex-row md:items-end md:justify-between md:py-28">
            <div>
              <h2 className="text-[32px] leading-tight font-semibold tracking-[-0.03em] md:text-[40px]">Open source.</h2>
              <p className="mt-4 max-w-[32rem] text-lg leading-relaxed text-muted">
                Read how it works, check the safety gate, or build it yourself. Apache-2.0.
              </p>
            </div>
            <a
              href={GITHUB}
              className="rounded-full border border-line bg-surface px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-mint/60"
            >
              View on GitHub
            </a>
          </div>
        </section>

        <section className="border-t border-line">
          <div className="mx-auto grid w-full max-w-[1152px] gap-10 px-4 py-24 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-32">
            <h2 className="text-[32px] leading-tight font-semibold tracking-[-0.03em] md:text-[40px]">Questions</h2>
            <div className="divide-y divide-line border-y border-line">
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

        <section className="border-t border-line">
          <div className="mx-auto w-full max-w-[1152px] px-4 py-24 sm:px-6 md:py-32">
            <h2 className="max-w-[40rem] text-[32px] leading-tight font-semibold tracking-[-0.03em] md:text-[40px]">
              Get Buddy on your wrist first.
            </h2>
            <p className="mt-4 max-w-[32rem] text-lg leading-relaxed text-muted">
              One email when the beta opens. That&apos;s it.
            </p>
            <div className="mt-8">
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
