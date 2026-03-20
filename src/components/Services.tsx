"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    title: "UX/UI Design",
    subtitle: "From $3,500",
    description:
      "User-centered interfaces that are intuitive, beautiful, and conversion-focused.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Design Systems",
    ],
    number: "01",
    bgColor: "#062629",
    textColor: "#94ffe5",
    accentColor: "#94ffe5",
  },
  {
    title: "Web Development",
    subtitle: "From $5,000",
    description:
      "Performant, accessible web experiences built with modern frameworks.",
    features: [
      "Next.js & React",
      "Performance Optimization",
      "CMS Integration",
    ],
    number: "02",
    bgColor: "#2a1810",
    textColor: "#fff",
    accentColor: "#f5a623",
  },
  {
    title: "Branding",
    subtitle: "From $4,000",
    description:
      "Visual identities that capture essence and create lasting recognition.",
    features: [
      "Logo & Identity Design",
      "Brand Guidelines",
      "Marketing Collateral",
    ],
    number: "03",
    bgColor: "#d8b4fe",
    textColor: "#1a1a2e",
    accentColor: "#7c3aed",
  },
  {
    title: "Motion",
    subtitle: "From $2,500",
    description:
      "Fluid animations and micro-interactions that bring interfaces to life.",
    features: [
      "Scroll Animations",
      "Micro-interactions",
      "Video & Motion Graphics",
    ],
    number: "04",
    bgColor: "#1a1a2e",
    textColor: "#f0d0ff",
    accentColor: "#d466ff",
  },
];

export function Services() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Heading entrance
      const servicesTl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      servicesTl
        .from(".services-heading span[data-heading-alpha]", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .from(
          ".services-heading h2",
          {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Cards stagger in — obvious cascade effect
      gsap.from(".service-card", {
        y: 120,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="services"
      className="px-6 md:px-16 py-32"
    >
      <div className="max-w-[90rem] mx-auto">
        <div className="services-heading text-center mb-20">
          <span
            data-section-heading
            data-heading-alpha="0.4"
            className="text-xs font-semibold uppercase tracking-[0.2em]"
          >
            What We Do
          </span>
          <h2
            data-section-heading
            className="mt-4 text-6xl md:text-8xl lg:text-9xl font-druk-bold uppercase tracking-[0.02em] italic leading-[0.9]"
          >
            OUR
            <br />
            SERVICES
          </h2>
        </div>

        {/* Simple responsive grid */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-card rounded-3xl p-8 md:p-10 flex flex-col shadow-[0_8px_40px_rgba(0,0,0,0.15)] min-h-[480px]"
              style={{
                backgroundColor: service.bgColor,
                color: service.textColor,
              }}
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
                  <circle cx="42" cy="14" r="5" fill={service.accentColor} />
                  <path
                    d="M30 52L36 36L28 28L20 32L16 48"
                    stroke={service.accentColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <path
                    d="M28 28L40 22L56 20"
                    stroke={service.accentColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M36 36L44 42L48 54"
                    stroke={service.accentColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl font-bold tracking-[-0.01em] text-center font-druk-bold uppercase italic"
                style={{ color: service.accentColor }}
              >
                {service.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-1 text-xs text-center opacity-60">
                {service.subtitle}
              </p>

              {/* Divider */}
              <div
                className="mt-5 mb-4 h-px w-full opacity-20"
                style={{ backgroundColor: service.textColor }}
              />

              {/* Description */}
              <p className="text-sm leading-relaxed opacity-70">
                {service.description}
              </p>

              {/* Features */}
              <ul className="mt-5 space-y-3 flex-1">
                {service.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: service.accentColor }}
                    />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className="mt-6 w-full py-3 rounded-lg text-sm font-semibold tracking-wide border transition-all duration-300 hover:scale-[0.98]"
                style={{
                  borderColor: service.accentColor,
                  color: service.accentColor,
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
