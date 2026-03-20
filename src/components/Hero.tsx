"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.3,
      });

      // Icons enter first
      tl.from(".hero-icon", {
        y: 40,
        opacity: 0,
        scale: 0.7,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      })
        // Big muted text
        .from(
          ".hero-line-1",
          {
            y: 120,
            opacity: 0,
            duration: 1.4,
          },
          "-=0.5"
        )
        // Massive bottom text
        .from(
          ".hero-line-3",
          {
            y: 150,
            opacity: 0,
            duration: 1.4,
          },
          "-=0.6"
        );

      // Floating icon animations
      gsap.to(".hero-icon-1", {
        y: -15,
        rotation: 4,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".hero-icon-2", {
        y: 12,
        rotation: -3,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });

      // SVG 1 — smooth stroke-draw animation on paths
      const svg1Paths = gsap.utils.toArray<SVGPathElement>(
        ".hero-svg-1 path"
      );
      svg1Paths.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 3.5,
          delay: i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
        });
      });

      // SVG 1 — gentle circle pulse
      gsap.to(".hero-svg-1 circle", {
        scale: 1.12,
        transformOrigin: "center center",
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // SVG 2 — smooth stroke-draw animation on paths
      const svg2Paths = gsap.utils.toArray<SVGPathElement>(
        ".hero-svg-2 path"
      );
      svg2Paths.forEach((path, i) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 4,
          delay: 0.6 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
        });
      });

      // SVG 2 — gentle circle pulse
      gsap.to(".hero-svg-2 circle", {
        scale: 1.1,
        transformOrigin: "center center",
        duration: 3,
        delay: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Background glow pulse
      gsap.to(".hero-glow", {
        opacity: 0.6,
        scale: 1.2,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: container }
  );

  // Mouse parallax effect on icons
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;

      const icon1 = container.current.querySelector(
        ".hero-icon-1"
      ) as HTMLElement;
      const icon2 = container.current.querySelector(
        ".hero-icon-2"
      ) as HTMLElement;

      if (icon1) {
        gsap.to(icon1, {
          x: moveX * 30,
          y: moveY * 20,
          rotation: moveX * 5,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      if (icon2) {
        gsap.to(icon2, {
          x: moveX * -20,
          y: moveY * -15,
          rotation: moveX * -3,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={container}
      id="hero"
      className="relative h-screen flex flex-col justify-end overflow-hidden pb-10 md:pb-0"
    >
      {/* Background glow */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-accent/[0.08] blur-[180px] pointer-events-none" />

      {/* Hidden ref container for mouse parallax targeting */}
      <div ref={iconsRef} className="contents" />

      {/* Hero typography */}
      <div className="relative z-10 text-center w-full px-4 -mb-2 md:-mb-4">
        {/* Icons — above text on mobile, beside text on desktop */}
        <div className="flex justify-center gap-4 mb-8 md:hidden">
          <div data-section-bg="0.2" className="hero-icon hero-icon-1 w-28 h-20 rounded-[20px] flex items-center justify-center cursor-pointer">
            <svg width="44" height="44" viewBox="0 0 64 64" fill="none" data-section-heading data-heading-alpha="1" className="hero-svg-1">
              <circle cx="42" cy="14" r="5" fill="currentColor" />
              <path d="M30 52L36 36L28 28L20 32L16 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M28 28L40 22L56 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M36 36L44 42L48 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div data-section-border="0.3" className="hero-icon hero-icon-2 w-28 h-20 rounded-[20px] border-2 flex items-center justify-center cursor-pointer">
            <svg width="44" height="44" viewBox="0 0 64 64" fill="none" data-section-heading data-heading-alpha="0.4" className="hero-svg-2">
              <circle cx="22" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
              <path d="M34 52L28 36L36 28L44 32L48 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M36 28L24 22L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M28 36L20 42L16 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* DIGITAL line with icons on both sides — desktop only */}
        <div className="hero-line-1 relative">
          {/* Icon 1 — left of DIGITAL (desktop only) */}
          <div data-section-bg="0.2" className="hero-icon hero-icon-1 hidden md:flex absolute left-[12%] top-1/2 -translate-y-1/2 z-20 w-48 h-28 rounded-[28px] items-center justify-center cursor-pointer">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" data-section-heading data-heading-alpha="1" className="hero-svg-1">
              <circle cx="42" cy="14" r="5" fill="currentColor" />
              <path d="M30 52L36 36L28 28L20 32L16 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M28 28L40 22L56 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M36 36L44 42L48 54" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Icon 2 — right of DIGITAL (desktop only) */}
          <div data-section-border="0.3" className="hero-icon hero-icon-2 hidden md:flex absolute right-[12%] top-1/2 -translate-y-1/2 z-20 w-48 h-28 rounded-[28px] border-2 items-center justify-center cursor-pointer">
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none" data-section-heading data-heading-alpha="0.4" className="hero-svg-2">
              <circle cx="22" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
              <path d="M34 52L28 36L36 28L44 32L48 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M36 28L24 22L8 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M28 36L20 42L16 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <span data-section-heading className="block font-druk-heavy italic text-[clamp(9rem,30vw,22rem)] md:text-[clamp(6rem,20vw,22rem)] uppercase tracking-[-0.02em] leading-[0.85]">
            DIGITAL
          </span>
        </div>

        <div className="hero-line-3 -mt-2 md:-mt-4">
          {/* Mobile: split into 2 lines */}
          <span data-section-heading className="md:hidden block font-druk-heavy italic text-[clamp(9rem,30vw,22rem)] uppercase tracking-[-0.02em] leading-[0.85]">
            EXPE -
          </span>
          <span data-section-heading className="md:hidden block font-druk-heavy italic text-[clamp(9rem,30vw,22rem)] uppercase tracking-[-0.02em] leading-[0.85]">
            RIENCES
          </span>
          {/* Desktop: single line */}
          <span data-section-heading className="hidden md:block font-druk-heavy italic text-[clamp(6rem,20vw,22rem)] uppercase tracking-[-0.02em] leading-[0.85]">
            EXPERIENCES
          </span>
        </div>
      </div>
    </section>
  );
}
