"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function MotionDirector() {
  const path = usePathname();
  const previous = useRef(path);
  useGSAP(
    () => {
      const navigated = previous.current !== path;
      previous.current = path;
      if (navigated) document.getElementById("main-content")?.focus({ preventScroll: true });
      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { desktop, motion } = context.conditions!;
          if (!motion) return;
          const cleanups: (() => void)[] = [];
          if (navigated) {
            gsap.fromTo(
              ".route-wipe",
              { scaleY: 1, transformOrigin: "bottom" },
              { scaleY: 0, duration: 0.48, ease: "power3.inOut", clearProps: "transformOrigin" },
            );
          }
          if (document.querySelector(".hero-stage")) {
            if (desktop) {
              const departure = gsap.timeline({
                scrollTrigger: {
                  trigger: ".hero-stage",
                  start: "top top",
                  end: "bottom top",
                  scrub: 0.7,
                },
              });
              departure
                .to(".hero-title-first", { xPercent: 12, y: -60, ease: "none" }, 0)
                .to(".hero-title-last", { xPercent: -9, y: -30, ease: "none" }, 0)
                .to(".hero-portrait-wrap", { y: 80, ease: "none" }, 0)
                .to(".hero-orbit", { rotation: 10, scale: 1.2, ease: "none" }, 0)
                .to(".hero-sculpture", { y: 20, rotation: -4, ease: "none" }, 0);
              const magnet = document.querySelector<HTMLElement>("[data-magnetic]");
              if (magnet && matchMedia("(pointer: fine)").matches) {
                const x = gsap.quickTo(magnet, "x", { duration: 0.4, ease: "power3" });
                const y = gsap.quickTo(magnet, "y", { duration: 0.4, ease: "power3" });
                const move = (e: PointerEvent) => {
                  const r = magnet.getBoundingClientRect();
                  x((e.clientX - r.left - r.width / 2) * 0.22);
                  y((e.clientY - r.top - r.height / 2) * 0.22);
                };
                const leave = () => {
                  x(0);
                  y(0);
                };
                magnet.addEventListener("pointermove", move);
                magnet.addEventListener("pointerleave", leave);
                cleanups.push(() => {
                  magnet.removeEventListener("pointermove", move);
                  magnet.removeEventListener("pointerleave", leave);
                });
              }
            }
          }
          if (document.querySelector(".work-door")) {
            const entry = gsap.timeline({
              scrollTrigger: {
                trigger: ".work-door",
                start: "top 85%",
                end: "bottom 20%",
                scrub: 0.6,
              },
            });
            entry
              .from(
                ".work-door h2 span:first-child",
                { xPercent: desktop ? 8 : 3, ease: "none" },
                0,
              )
              .from(
                ".work-door h2 span:last-child",
                { xPercent: desktop ? -10 : -4, ease: "none" },
                0,
              );
            gsap.fromTo(
              ".cinema-image",
              {
                clipPath: desktop ? "inset(0 16% 0 16%)" : "inset(0 4% 0 4%)",
                rotateX: desktop ? 12 : 0,
              },
              {
                clipPath: "inset(0 0% 0 0%)",
                rotateX: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: ".feature-cinema",
                  start: "top 95%",
                  end: "top 15%",
                  scrub: 0.5,
                },
              },
            );
            gsap.fromTo(
              ".cinema-image>img",
              { scale: 1.14 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".feature-cinema",
                  start: "top bottom",
                  end: "center center",
                  scrub: 0.6,
                },
              },
            );
          }
          if (document.querySelector(".kripton-feature")) {
            gsap.fromTo(
              ".kripton-image",
              { rotation: desktop ? 6 : 1, y: desktop ? 70 : 20 },
              {
                rotation: -4,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: ".kripton-feature",
                  start: "top 85%",
                  end: "center center",
                  scrub: 0.6,
                },
              },
            );
            if (desktop)
              gsap.fromTo(
                ".kripton-word",
                { xPercent: -6 },
                {
                  xPercent: 5,
                  ease: "none",
                  scrollTrigger: {
                    trigger: ".kripton-feature",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                },
              );
          }
          if (document.querySelector(".system-glyph")) {
            gsap.to(".glyph-ring:first-child", {
              rotation: 135,
              ease: "none",
              scrollTrigger: {
                trigger: ".engineering",
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
              },
            });
            gsap.to(".glyph-ring:nth-child(2)", {
              rotation: -60,
              ease: "none",
              scrollTrigger: {
                trigger: ".engineering",
                start: "top 90%",
                end: "bottom 20%",
                scrub: 1,
              },
            });
          }
          const portrait = document.querySelector<HTMLElement>(".about-home .human-portrait");
          const portraitScene = portrait?.closest(".human-editorial");
          if (portrait && portraitScene) {
            gsap.fromTo(
              portrait,
              { rotation: -3, y: 35 },
              {
                rotation: 6,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: portraitScene,
                  start: "top 85%",
                  end: "center center",
                  scrub: 0.7,
                },
              },
            );
          }
          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh, { once: true });
          const frame = requestAnimationFrame(refresh);
          return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("load", refresh);
            cleanups.forEach((fn) => fn());
          };
        },
      );
      return () => mm.revert();
    },
    { dependencies: [path], revertOnUpdate: true },
  );
  return <div className="route-wipe" aria-hidden="true" />;
}
