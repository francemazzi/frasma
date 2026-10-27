"use client";

import { useState } from "react";

type Props = {
  videoId: string;
  title: string;
  className?: string;
};

/**
 * Click-to-load YouTube facade: a poster image until the visitor presses play,
 * then the privacy-enhanced embed. No YouTube cookies before the click.
 */
export default function LiteYouTube({ videoId, title, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-3xl border border-hairline-strong bg-paper-3 ${className}`}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 flex h-full w-full items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt=""
            loading="lazy"
            width={480}
            height={360}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ink/90 text-paper shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-7 w-7 fill-current"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
