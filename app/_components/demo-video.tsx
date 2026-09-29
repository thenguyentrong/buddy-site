"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./icon";

const VIDEO = "Pj9TbxwClHw";

/**
 * The demo video. Until you press play it's only the video's first frame from this site, so nothing loads from
 * YouTube and nothing is stored; then the player comes from YouTube's privacy-enhanced domain.
 */
export function DemoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[32px] border border-line bg-bg">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${VIDEO}?autoplay=1&rel=0&playsinline=1`}
          title="Buddy: the AI gadget you already own, demo video"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play the demo video, 1 minute 32 seconds"
          className="group absolute inset-0 size-full cursor-pointer text-left"
        >
          <Image
            src="/img/demo-poster.webp"
            alt=""
            fill
            sizes="(min-width: 1152px) 1104px, 100vw"
            quality={90}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          />
          <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-line bg-surface/90 py-1.5 pr-3.5 pl-1.5 backdrop-blur transition-colors group-hover:border-mint/60 sm:bottom-4 sm:left-4 sm:gap-3 sm:py-2 sm:pr-5 sm:pl-2 md:bottom-6 md:left-6">
            <span className="flex size-8 items-center justify-center rounded-full bg-mint text-bg transition-transform group-hover:scale-105 group-active:scale-95 sm:size-10 md:size-12">
              <Icon name="play" className="ml-0.5 size-5 sm:size-6 md:size-7" />
            </span>
            <span className="text-[13px] font-semibold text-ink sm:text-[15px]">
              <span className="hidden sm:inline">Play the demo </span>
              <span className="font-medium text-muted">1:32</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
