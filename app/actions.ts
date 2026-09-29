"use server";

import { neon } from "@neondatabase/serverless";

export type JoinState = { status: "idle" | "ok" | "error"; message: string };

// Stored with each address, so it's clear later what someone agreed to.
const CONSENT = "Email me when the Buddy beta opens. (2026-09-29)";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function joinWaitlist(_prev: JoinState, form: FormData): Promise<JoinState> {
  // Bots fill the hidden field; they get the normal answer and nothing is saved.
  if (form.get("company")) return { status: "ok", message: "You're on the list." };

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }
  if (form.get("consent") !== "yes") {
    return { status: "error", message: "Please tick the box, so I'm allowed to email you." };
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    // Same answer whether the address is new or already on the list.
    await sql`insert into waitlist (email, consent) values (${email}, ${CONSENT}) on conflict (email) do nothing`;
    return { status: "ok", message: "You're on the list." };
  } catch {
    return { status: "error", message: "Something went wrong on my side. Please try again in a minute." };
  }
}
