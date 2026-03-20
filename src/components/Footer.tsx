"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      ctaTl
        .from(".cta-text", {
          y: 90,
          opacity: 0,
          scale: 0.97,
          duration: 1.4,
          ease: "power3.out",
        })
        .from(
          ".cta-email",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );

      gsap.from(".footer-col", {
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".footer-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} id="footer" className="">
      {/* CTA Section */}
      <section className="cta-section py-32 md:py-48 px-6 text-center border-t border-cyan/10">
        <h2 data-section-heading className="cta-text text-[clamp(3rem,10vw,10rem)] font-druk-bold uppercase italic tracking-[0.02em] leading-[0.9]">
          LET&apos;S TALK.
        </h2>
        <a
          href="mailto:hello@axiom.studio"
          data-section-heading
          data-heading-alpha="0.5"
          className="cta-email inline-block mt-8 text-lg md:text-xl transition-colors duration-300 underline underline-offset-4"
        >
          hello@axiom.studio
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan/10 py-16 px-6 md:px-16">
        <div className="footer-grid max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="footer-col">
            <h4 data-section-heading className="text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Social
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Dribbble
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 data-section-heading className="text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Studio
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 data-section-heading className="text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Design
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Development
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Branding
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 data-section-heading className="text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" data-section-heading data-heading-alpha="0.5" className="transition-colors duration-300">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cyan/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p data-section-heading data-heading-alpha="0.4">&copy; 2024 AXIOM Studio. All rights reserved.</p>
          <p data-section-heading data-heading-alpha="0.4" className="tracking-[0.15em]">CRAFTED WITH PRECISION</p>
        </div>
      </footer>
    </div>
  );
}
