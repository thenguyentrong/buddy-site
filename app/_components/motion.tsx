import { Fragment, type CSSProperties } from "react";

/** When an element makes its entrance: seconds after its block starts (globals.css has the moves). */
export const at = (s: number) => ({ "--d": `${Math.round(s * 1000)}ms` }) as CSSProperties;

/** A headline whose words rise one after another, like the titles in the demo video. */
export function Words({ text, start = 0, step = 0.07 }: { text: string; start?: number; step?: number }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span data-a="word" style={at(start + i * step)}>
        {word}
      </span>
    </Fragment>
  ));
}

/** Text typed out letter by letter. Screen readers get it whole. */
export function Typed({ text, start = 0, step = 0.025 }: { text: string; start?: number; step?: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text, (c, i) => (
          <span key={i} data-a="char" style={at(start + i * step)}>
            {c}
          </span>
        ))}
      </span>
    </>
  );
}

/** How long Typed takes for a text, so the next thing can wait for it. */
export const typing = (text: string, step = 0.025) => Array.from(text).length * step;
