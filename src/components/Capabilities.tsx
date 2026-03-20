"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const lines = [
  "OUR",
  "MISSION?",
  "REDEFINING",
  "THE RULES",
  "OF CLASSIC",
  "DESIGN,",
  "NETWORKING",
  "& STRATEGY",
];

export function Capabilities() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".cap-word");

      // Micro label fade in
      gsap.from(".cap-label", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Each word slides in from alternating left/right as section scrolls through
      words.forEach((word, i) => {
        const fromRight = i % 2 === 0;
        const xVal = fromRight ? 120 : -120;

        gsap.fromTo(
          word,
          { x: xVal, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: word,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="capabilities" className="py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Micro label */}
        <span data-section-heading data-heading-alpha="0.4" className="cap-label block text-[10px] font-semibold uppercase tracking-[0.3em] text-center mb-8">
          WHAT WE BRING TO THE TABLE
        </span>

        {/* Massive stacked typography */}
        <div className="flex flex-col items-center -space-y-1 md:-space-y-3">
          {lines.map((line, i) => (
            <div
              key={i}
              className="cap-word justify-center"
              style={{ opacity: 0 }}
            >
              <span data-section-heading className="text-[clamp(3.5rem,13vw,11rem)] font-druk-bold uppercase italic leading-[0.92] tracking-[-0.02em] whitespace-nowrap">
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
