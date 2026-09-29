/**
 * Runs in <head> before the first paint. Every block ([data-seq]) waits, paused, until it scrolls into
 * view, then its entrances play (the moves and delays are CSS, see globals.css). Blocks that come into
 * view together go one after another, [data-gap] seconds apart, so a headline starts before the things
 * next to it pop in. It never touches the DOM React renders: the pause is a constructed stylesheet and
 * the start is the Web Animations API. Without it (no JS, reduced motion, an old browser) the entrances
 * just play on load, and if anything here fails the pause is lifted, so nothing stays hidden.
 */
export const SEQUENCE = `(() => {
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window) ||
    !("adoptedStyleSheets" in Document.prototype) ||
    !Element.prototype.getAnimations
  ) return;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync("[data-seq] [data-a],[data-seq][data-a]{animation-play-state:paused}");
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  const release = () => (sheet.disabled = true);

  // The hero plays first; a block never waits more than 1.2 s for its turn.
  let next = performance.now() + 900;
  const play = (block) => {
    const now = performance.now();
    const start = Math.min(Math.max(now, next), now + 1200);
    next = start + 1000 * (parseFloat(block.dataset.gap) || 0.25);
    setTimeout(() => {
      try {
        block.getAnimations({ subtree: true }).forEach((a) => a.play());
      } catch {
        release();
      }
    }, start - now);
  };

  const watch = () => {
    try {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && (io.unobserve(e.target), play(e.target))),
        { rootMargin: "0px 0px -18% 0px" },
      );
      const seen = new WeakSet();
      const scan = () =>
        document.querySelectorAll("[data-seq]").forEach((b) => seen.has(b) || (seen.add(b), io.observe(b)));
      scan();
      // Pages rendered later (client-side navigation) bring new blocks.
      new MutationObserver(scan).observe(document.body, { childList: true, subtree: true });
    } catch {
      release();
    }
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", watch);
  else watch();
})();`;
