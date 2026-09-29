"use client";

import { useCallback, useState } from "react";
import { BuddyFace } from "./buddy-face";
import { Watch } from "./watch";
import { Watch3D } from "./watch-3d";

/** The drawn watch first; the 3D watch takes over once its first frame is on screen. */
export function HeroWatch({ first }: { first: string }) {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  return (
    <div className="relative z-10 shrink-0">
      <div className={`transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100"}`}>
        <Watch>
          <BuddyFace first={first} className="w-[62%]" />
        </Watch>
      </div>
      <Watch3D
        onReady={onReady}
        className={`watch-3d absolute -inset-x-[22%] -inset-y-[6%] transition-opacity duration-700 md:-inset-x-[38%] ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
