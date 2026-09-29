import type { Metadata } from "next";
import { Legal } from "../_components/legal";

export const metadata: Metadata = { title: "Imprint · Buddy" };

export default function Imprint() {
  return (
    <Legal title="Imprint">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          The Vinh Nguyen Trong
          <br />
          Süsterfeldstraße 200
          <br />
          52072 Aachen-Laurensberg
          <br />
          Germany
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:the.vinh.nguyen.trong@rwth-aachen.de">the.vinh.nguyen.trong@rwth-aachen.de</a>
        </p>
      </section>
      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>The Vinh Nguyen Trong, address as above.</p>
      </section>
    </Legal>
  );
}
