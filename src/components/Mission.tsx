"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Mission() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const missionTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      missionTl
        .from(".mission-left span", {
          y: 25,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(
          ".mission-left h2",
          {
            y: 70,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".mission-right p",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.7"
        )
;
    },
    { scope: container }
  );

  return (
    <section ref={container} id="mission" className="py-32 px-6 md:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto pt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="mission-left">
            <span data-section-heading data-heading-alpha="0.4" className="text-xs font-semibold uppercase tracking-[0.2em]">
              Our Mission
            </span>
            <h2 data-section-heading className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-druk-bold uppercase italic tracking-[0.02em] leading-[0.9]">
              Design is the difference between existing and mattering.
            </h2>
          </div>
          <div className="mission-right flex items-end">
            <div>
              <p data-section-heading data-heading-alpha="0.5" className="text-lg leading-relaxed">
                Every pixel, every interaction, every moment of friction removed
                — it all adds up to something people feel but can&apos;t always
                articulate. That&apos;s where we live.
              </p>
              <p data-section-heading data-heading-alpha="0.5" className="mt-6 text-lg leading-relaxed">
                We partner with ambitious brands to create digital experiences
                that don&apos;t just work — they resonate, convert, and endure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
