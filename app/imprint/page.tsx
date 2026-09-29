import type { Metadata } from "next";
import { Legal, Missing } from "../_components/legal";

export const metadata: Metadata = { title: "Imprint · Buddy" };

export default function Imprint() {
  return (
    <Legal title="Imprint">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <p>
          <Missing>Full name</Missing>
          <br />
          <Missing>Street and number</Missing>
          <br />
          <Missing>Postcode and city</Missing>
          <br />
          Germany
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Email: <Missing>email address</Missing>
        </p>
      </section>
      <section>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          <Missing>Full name</Missing>, address as above.
        </p>
      </section>
    </Legal>
  );
}
