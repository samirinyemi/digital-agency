"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const values = [
  {
    number: "01",
    title: "Innovation",
    description: "Pushing beyond convention to find better solutions.",
    color: "#0c3236",
    cover: "https://cdn.cosmos.so/1c27cc61-5677-41c3-bd29-5ddc366575ea?format=jpeg",
  },
  {
    number: "02",
    title: "Collaboration",
    description: "We design with you, not for you.",
    color: "#0e3a3e",
    cover: "https://cdn.cosmos.so/47035496-a006-4e01-bf5e-9fa849087b12?format=jpeg",
  },
  {
    number: "03",
    title: "Excellence",
    description: "Every detail matters, every pixel earned.",
    color: "#0a3538",
    cover: "https://cdn.cosmos.so/7947e7a5-ddad-4191-b18f-91a7216f60e9?format=jpeg",
  },
  {
    number: "04",
    title: "Precision",
    description: "Intentional craft at every level of execution.",
    color: "#0d3840",
    cover: "https://cdn.cosmos.so/6e59a456-b253-4e50-8824-0a15ae1876e3?format=jpeg",
  },
  {
    number: "05",
    title: "Transparency",
    description: "Open process, honest communication, clear outcomes.",
    color: "#0b3035",
    cover: "https://cdn.cosmos.so/6628f395-9ee5-4064-9bf0-4701e544a424?format=jpeg",
  },
  {
    number: "06",
    title: "Ambition",
    description: "We aim for work that redefines what's possible.",
    color: "#0e3640",
    cover: "https://cdn.cosmos.so/df92aa73-2bae-44dc-9093-72fd96a7ac73?format=jpeg",
  },
];

export function Values() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Stagger label → heading
      const valuesTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      valuesTl
        .from(".values-heading span[data-heading-alpha]", {
          y: 25,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(
          ".values-heading h2",
          {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.2"
        );

      // Cards stagger in row-by-row (3 per row)
      gsap.from(".value-card", {
        y: 70,
        opacity: 0,
        duration: 0.9,
        stagger: {
          each: 0.1,
          from: "start",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".values-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} id="values" className="py-12 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="values-heading">
          <span
            data-section-heading
            data-heading-alpha="0.4"
            className="text-xs font-semibold uppercase tracking-[0.2em]"
          >
            Our Values
          </span>
          <h2
            data-section-heading
            className="mt-4 text-5xl md:text-7xl font-druk-bold uppercase italic tracking-[0.02em]"
          >
            What drives us
          </h2>
        </div>

        {/* 3×2 grid */}
        <div className="values-grid mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {values.map((value, i) => (
            <div
              key={i}
              className="value-card group"
            >
              {/* Visual card area */}
              <div
                className="aspect-[4/5] rounded-2xl overflow-hidden relative flex items-center justify-center border border-cyan/10 transition-all duration-700 group-hover:border-cyan/30 group-hover:scale-[0.98]"
                style={{ backgroundColor: value.color }}
              >
                {value.cover && (
                  <img
                    src={value.cover}
                    alt={value.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {!value.cover && (
                  <span
                    data-section-heading
                    data-heading-alpha="0.15"
                    className="text-[clamp(5rem,10vw,8rem)] font-druk-bold tracking-[0.02em] italic select-none"
                  >
                    {value.number}
                  </span>
                )}
              </div>

              {/* Text below card */}
              <div className="mt-5">
                <h3
                  data-section-heading
                  className="text-xl md:text-2xl font-bold tracking-[-0.02em]"
                >
                  {value.title}
                </h3>
                <p
                  data-section-heading
                  data-heading-alpha="0.5"
                  className="mt-1 text-sm"
                >
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
