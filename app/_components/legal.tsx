import Link from "next/link";

/** Shared frame for the privacy and imprint pages. */
export function Legal({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <>
      <header className="mx-auto flex w-full max-w-[720px] items-center justify-between px-4 py-6 sm:px-6">
        <Link href="/" className="text-sm font-medium text-muted transition-colors hover:text-ink">
          ← Buddy
        </Link>
      </header>
      <main className="mx-auto w-full max-w-[720px] px-4 pt-8 pb-24 sm:px-6">
        <h1 className="text-[40px] leading-tight font-semibold tracking-[-0.03em]">{title}</h1>
        {updated && <p className="mt-3 text-sm text-muted">{updated}</p>}
        <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed text-muted [&_a]:text-ink [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-4 [&_a:hover]:decoration-mint [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink">
          {children}
        </div>
      </main>
    </>
  );
}

/** Details only Vinh can fill in; shown plainly so they can't be missed before going live. */
export function Missing({ children }: { children: React.ReactNode }) {
  return <span className="rounded bg-raised px-1.5 py-0.5 font-mono text-sm text-mint">[{children}]</span>;
}
