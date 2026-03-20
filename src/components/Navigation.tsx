"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const themes = {
  dark: {
    bg: "rgba(26, 10, 31, 0.85)",
    text: "#f0d0ff",
    muted: "#8b5e9a",
    accent: "#d466ff",
    border: "rgba(212, 102, 255, 0.15)",
  },
  teal: {
    bg: "rgba(14, 37, 40, 0.85)",
    text: "#7dffd2",
    muted: "#3a7a7e",
    accent: "#7dffd2",
    border: "rgba(125, 255, 210, 0.15)",
  },
  light: {
    bg: "rgba(255, 255, 255, 0.85)",
    text: "#0a0a0a",
    muted: "#6b6b6b",
    accent: "#0a0a0a",
    border: "rgba(0, 0, 0, 0.08)",
  },
};

type ThemeKey = keyof typeof themes;

// Map section IDs to nav themes — matches BackgroundTransition
const sectionThemeMap: Record<string, ThemeKey> = {
  hero: "dark",
  work: "teal",
  services: "light",
  mission: "light",
  values: "teal",
  capabilities: "light",
  footer: "teal",
};

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#values", label: "Culture" },
  { href: "#capabilities", label: "Insights" },
];

export function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;

    const nav = navRef.current;
    const logo = nav.querySelector(".nav-logo");
    const links = nav.querySelectorAll(".nav-link");
    const cta = nav.querySelector(".nav-cta");

    const tl = gsap.timeline({ delay: 0.3 });

    if (logo) {
      tl.fromTo(
        logo,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }

    if (links.length) {
      tl.fromTo(
        links,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
        "-=0.4"
      );
    }

    if (cta) {
      tl.fromTo(
        cta,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Section-based nav theming using ScrollTrigger callbacks
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    const sectionIds = Object.keys(sectionThemeMap);

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const themeKey = sectionThemeMap[id];

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveTheme(themeKey),
        onEnterBack: () => setActiveTheme(themeKey),
      });

      triggers.push(st);
    });

    // Scroll detection for background blur
    const detectScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", detectScroll, { passive: true });
    detectScroll();

    return () => {
      triggers.forEach((st) => st.kill());
      window.removeEventListener("scroll", detectScroll);
    };
  }, []);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = () => setMobileMenuOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [mobileMenuOpen]);

  const theme = themes[activeTheme];
  const menuTheme = mobileMenuOpen ? theme : null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: isScrolled || mobileMenuOpen ? theme.bg : "transparent",
        backdropFilter: isScrolled || mobileMenuOpen ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled || mobileMenuOpen ? "blur(20px)" : "none",
        borderBottom: isScrolled ? `1px solid ${theme.border}` : "none",
      }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16 h-20 flex items-center justify-between">
        {/* Logo — text only */}
        <a
          href="/"
          className="nav-logo font-druk-bold uppercase text-[1.875rem] md:text-4xl tracking-wide italic transition-colors duration-500 whitespace-nowrap"
          style={{ color: theme.text }}
        >
          SONI LABS STUDIO
        </a>

        {/* Center nav links — desktop */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium tracking-wide transition-colors duration-500 hover:opacity-70"
              style={{ color: theme.muted }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA button — desktop */}
        <a
          href="#footer"
          className="nav-cta max-md:hidden inline-flex px-6 py-2.5 text-sm font-semibold tracking-wide rounded-full transition-all duration-500 hover:scale-[0.97]"
          style={{
            border: `1px solid ${theme.accent}`,
            color: theme.accent,
          }}
        >
          Start Project
        </a>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[6px]">
            <span
              className="block w-6 h-[2px] rounded-full transition-all duration-300 origin-center"
              style={{
                backgroundColor: theme.text,
                transform: mobileMenuOpen ? "rotate(45deg) translate(2.8px, 2.8px)" : "none",
              }}
            />
            <span
              className="block w-6 h-[2px] rounded-full transition-all duration-300"
              style={{
                backgroundColor: theme.text,
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[2px] rounded-full transition-all duration-300 origin-center"
              style={{
                backgroundColor: theme.text,
                transform: mobileMenuOpen ? "rotate(-45deg) translate(2.8px, -2.8px)" : "none",
              }}
            />
          </div>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-400 ease-in-out"
        style={{
          maxHeight: mobileMenuOpen ? "400px" : "0px",
          opacity: mobileMenuOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-8 pt-2 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium tracking-wide transition-colors duration-300"
              style={{ color: theme.text }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#footer"
            className="inline-flex justify-center px-6 py-3 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 mt-2"
            style={{
              border: `1px solid ${theme.accent}`,
              color: theme.accent,
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Project
          </a>
        </div>
      </div>
    </nav>
  );
}
