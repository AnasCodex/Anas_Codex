"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Film } from "lucide-react";
import { text, type Locale } from "@/lib/i18n";
import type { ProjectVideo as Video } from "@/lib/content";

export function ProjectVideo({
  video,
  name,
  locale: l,
  preview = false,
}: {
  video: Video;
  name: string;
  locale: Locale;
  preview?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const src = preview ? video.previewSrc || video.src : video.src;
  const play = useCallback(() => {
    const element = player.current;
    if (!element) return;
    // No source (and no video request) until visible preview or explicit playback.
    if (!element.getAttribute("src")) element.src = src;
    element.play().catch(() => {
      // Autoplay can be blocked or interrupted by scrolling. Keep the play control available.
    });
  }, [src]);

  useEffect(() => {
    const element = player.current;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    let visible = false;
    const update = () => {
      if (!visible || document.hidden) element?.pause();
      else if (preview) {
        if (motion.matches || connection?.saveData || userPaused.current) element?.pause();
        else play();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        update();
      },
      { threshold: [0, 0.4] },
    );
    if (root.current) observer.observe(root.current);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      element?.pause();
    };
  }, [play, preview]);

  const label = playing
    ? text(l, "إيقاف المعاينة مؤقتًا", "Pause preview")
    : text(
        l,
        preview ? "تشغيل المعاينة" : "شاهد تسجيل المشروع",
        preview ? "Play preview" : "Watch the project recording",
      );
  return (
    <div
      ref={root}
      className={`project-video ${preview ? "video-preview" : "video-full"} ${started && !failed ? "has-started" : ""}`}
      style={{ aspectRatio: `${video.width} / ${video.height}` }}
    >
      <img
        className="video-poster"
        src={video.poster}
        width={video.width}
        height={video.height}
        loading="lazy"
        alt={text(
          l,
          `${name} — لقطة من تسجيل المشروع`,
          `${name} — frame from the project recording`,
        )}
      />
      <video
        ref={player}
        width={video.width}
        height={video.height}
        muted
        playsInline
        loop={preview}
        preload="none"
        controls={!preview && started && !failed}
        aria-hidden={preview || !started || failed}
        aria-label={text(l, `تسجيل لتصفح مشروع ${name} — دون صوت`, `Silent walkthrough of ${name}`)}
        onPlaying={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
      />
      {failed ? (
        <p className="video-unavailable" role="status">
          {text(
            l,
            "تعذّر تشغيل الفيديو. يمكنك استكشاف صور المشروع.",
            "The video is unavailable. You can still explore the project screenshots.",
          )}
        </p>
      ) : (
        (preview || !started) && (
          <button
            className="video-control"
            aria-label={`${label} — ${name}`}
            onClick={() => {
              if (playing) {
                userPaused.current = true;
                player.current?.pause();
              } else {
                userPaused.current = false;
                play();
              }
            }}
          >
            {playing ? (
              <Pause size={17} aria-hidden="true" />
            ) : (
              <Play size={17} aria-hidden="true" />
            )}
            <span>{label}</span>
            {!preview && (
              <span className="mono" dir="ltr">
                {Math.floor(video.duration / 60)}:
                {String(Math.round(video.duration) % 60).padStart(2, "0")}
              </span>
            )}
          </button>
        )
      )}
      {preview && (
        <span className="video-label">
          <Film size={13} aria-hidden="true" />
          {text(l, "معاينة من المشروع", "PROJECT PREVIEW")}
        </span>
      )}
    </div>
  );
}
