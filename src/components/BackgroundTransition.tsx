"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SectionTheme {
  bg: string;
  text: string;
}

// Each section's background and heading text color
const sectionThemes: Record<string, SectionTheme> = {
  hero: { bg: "#1C0E20", text: "#BF72F9" },
  work: { bg: "#0E2528", text: "#74FECE" },
  services: { bg: "#FFFFFF", text: "#0A0A0A" },
  mission: { bg: "#FFFFFF", text: "#0A0A0A" },
  values: { bg: "#0E2528", text: "#74FECE" },
  capabilities: { bg: "#FFFFFF", text: "#0A0A0A" },
  footer: { bg: "#0E2528", text: "#74FECE" },
};

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function BackgroundTransition() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const sectionIds = Object.keys(sectionThemes);
    const triggers: ScrollTrigger[] = [];

    // Query all heading elements that participate in color transitions
    const headings =
      document.querySelectorAll<HTMLElement>("[data-section-heading]");

    // Set initial heading colors to match hero theme
    headings.forEach((h) => {
      const alpha = parseFloat(h.dataset.headingAlpha || "1");
      h.style.color = hexToRgba(sectionThemes.hero.text, alpha);
    });

    // Animate background + all headings to a given theme
    const animateToTheme = (theme: SectionTheme) => {
      gsap.to(bg, {
        backgroundColor: theme.bg,
        duration: 0.6,
        ease: "power2.inOut",
      });

      headings.forEach((h) => {
        const alpha = parseFloat(h.dataset.headingAlpha || "1");
        gsap.to(h, {
          color: hexToRgba(theme.text, alpha),
          duration: 0.6,
          ease: "power2.inOut",
        });
      });
    };

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const theme = sectionThemes[id];

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => animateToTheme(theme),
        onEnterBack: () => animateToTheme(theme),
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-10"
      style={{ backgroundColor: sectionThemes.hero.bg }}
    />
  );
}
