"use client";
import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

// Below-the-fold media waits for its own section, rather than the browser's
// broad lazy-image distance. The original image remains available without JS.
export function DeferredImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <img
        {...props}
        alt={props.alt || ""}
        ref={ref}
        className={`${props.className || ""} deferred-image`}
        src={near ? props.src : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}
        srcSet={near ? props.srcSet : undefined}
      />
      <noscript>
        <style>{".deferred-image{display:none}"}</style>
        <img {...props} alt={props.alt || ""} />
      </noscript>
    </>
  );
}
