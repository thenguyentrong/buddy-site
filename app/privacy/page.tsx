import type { Metadata } from "next";
import Link from "next/link";
import { Legal } from "../_components/legal";

export const metadata: Metadata = { title: "Privacy · Buddy" };

export default function Privacy() {
  return (
    <Legal title="Privacy" updated="29 September 2026">
      <p>
        This site has one job: collecting email addresses for Buddy&apos;s beta. Here is everything that happens with
        yours.
      </p>
      <section>
        <h2>Who is responsible</h2>
        <p>
          The person in the <Link href="/imprint">imprint</Link>. Write to the email address there for anything about
          your data.
        </p>
      </section>
      <section>
        <h2>What is stored</h2>
        <p>
          If you join the waitlist: your email address, the time you joined, and the sentence you agreed to (“Email me
          when the beta opens”). Nothing else: no name, no IP address, no tracking.
        </p>
      </section>
      <section>
        <h2>What for</h2>
        <p>
          To email you when the Buddy beta opens. Nothing else is sent, and the address is never shared or sold. The
          legal basis is your consent (Art. 6(1)(a) GDPR). You can withdraw it any time by email; that doesn&apos;t make
          anything before it unlawful.
        </p>
      </section>
      <section>
        <h2>Where it is kept</h2>
        <p>
          The list is stored in a Neon Postgres database in Frankfurt, Germany. The site runs on Vercel. Both process
          the data on my behalf under their data processing terms. To deliver the site and keep it secure, Vercel also
          handles your IP address and technical request data for a short time (legitimate interest, Art. 6(1)(f) GDPR).
          Vercel and Neon are US companies; transfers rely on the EU Standard Contractual Clauses and, where it applies,
          the EU-US Data Privacy Framework.
        </p>
      </section>
      <section>
        <h2>How long</h2>
        <p>Until the beta has opened and you&apos;ve had the invite. Then the list is deleted. Sooner if you ask.</p>
      </section>
      <section>
        <h2>Cookies and tracking</h2>
        <p>None. No analytics, no ads, no third-party scripts. The font is served from this site.</p>
      </section>
      <section>
        <h2>Your rights</h2>
        <p>
          You can ask what is stored about you, have it corrected or deleted, restrict or object to its use, and get it
          in a portable format. You can also complain to a data protection authority, for example the one where you
          live.
        </p>
      </section>
      <section>
        <h2>The app</h2>
        <p>
          This page is about the website. What the Buddy app does with data is in its{" "}
          <a href="https://github.com/thenguyentrong/watch-ai/blob/main/PRIVACY.md">privacy notice</a>.
        </p>
      </section>
    </Legal>
  );
}
