"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { joinWaitlist, type JoinState } from "../actions";
import { buddy } from "./buddy-face";
import { Icon } from "./icon";

const idle: JoinState = { status: "idle", message: "" };

export function WaitlistForm({ id }: { id: string }) {
  const [state, action, pending] = useActionState(joinWaitlist, idle);

  useEffect(() => {
    if (state.status === "ok") buddy("happy");
  }, [state]);

  if (state.status === "ok") {
    return (
      <div className="flex max-w-[30rem] items-start gap-3 rounded-[28px] border border-line bg-surface p-5" role="status">
        <Icon name="checkCircle" className="mt-0.5 size-6 shrink-0 text-mint" />
        <div>
          <p className="text-base font-semibold text-ink">{state.message}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">
            I&apos;ll email you once, when the beta opens. Nothing else.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="max-w-[30rem]">
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface p-1.5 transition-colors focus-within:border-mint/60">
        <label htmlFor={`${id}-email`} className="sr-only">
          Your email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          onFocus={() => buddy("listen")}
          onBlur={() => buddy("rest")}
          className="min-w-0 flex-1 bg-transparent py-3 pl-4 text-base text-ink placeholder:text-dim focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="shine shrink-0 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-bg transition hover:bg-white active:scale-[0.98] disabled:opacity-60"
        >
          {pending ? (
            "Joining…"
          ) : (
            <>
              <span className="sm:hidden">Join</span>
              <span className="hidden sm:inline">Join the waitlist</span>
            </>
          )}
        </button>
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 px-1 text-sm leading-relaxed text-muted">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-mint"
        />
        <span>
          Email me when the beta opens. That&apos;s all the address is used for, and it&apos;s deleted whenever you ask.{" "}
          <Link href="/privacy" className="text-ink underline decoration-line underline-offset-4 hover:decoration-mint">
            Privacy
          </Link>
        </span>
      </label>

      {/* Hidden from people, filled in by bots. */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <p aria-live="polite" className="mt-3 min-h-5 px-1 text-sm text-[#ff9b9b]">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
