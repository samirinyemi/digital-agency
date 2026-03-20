"use client";

import { useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hls from "hls.js";

interface Project {
  title: string;
  category: string;
  year: string;
  color: string;
  cover?: string;
  video?: string;
  coverFrame?: "first" | "last";
}

const projects: Project[] = [
  {
    title: "Lumina",
    category: "Brand Identity & Web",
    year: "2024",
    color: "#0a3538",
    cover: "https://cdn.cosmos.so/f6b3486d-fc0d-47ca-8d54-fdb6c97da8cf?format=jpeg",
    video: "https://stream.mux.com/Cq1gQBdGbx02FEMw2m6PGiKE8yPEc7k9yAttGGOGF01kc.m3u8",
  },
  {
    title: "Meridian",
    category: "Product Design",
    year: "2024",
    color: "#083d40",
    cover: "https://cdn.cosmos.so/c4c1ae72-c6e0-4791-8662-65834e4706a0?format=jpeg",
    video: "https://stream.mux.com/LfPwbV02uHCCJ2vyUWbVUn02Gj00Zgpb01J65Bblsqi3iE00.m3u8",
  },
  {
    title: "Vertex",
    category: "Digital Experience",
    year: "2023",
    color: "#0d4a4e",
    video: "https://cdn.cosmos.so/91cab024-4794-4cae-a4e0-93935e477eff.mp4",
  },
  {
    title: "Horizon",
    category: "E-Commerce Platform",
    year: "2023",
    color: "#0a2e38",
    video: "https://cdn.cosmos.so/62e1c8bc-65e7-4289-aaaf-df777aea4b5e.mp4",
    coverFrame: "last",
  },
  {
    title: "Prism",
    category: "Creative Direction",
    year: "2023",
    color: "#0c3840",
    cover: "https://cdn.cosmos.so/699c28f2-ca8f-43ff-b9ad-aa2d17f88fea?format=jpeg",
  },
];

function isHlsUrl(url: string) {
  return url.includes(".m3u8");
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Set up HLS source once on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.video) return;

    if (isHlsUrl(project.video)) {
      if (Hls.isSupported()) {
        const hls = new Hls({ autoStartLoad: false });
        hls.attachMedia(video);
        hls.loadSource(project.video);
        hlsRef.current = hls;
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = project.video;
      }
    } else {
      video.src = project.video;
    }

    // For coverFrame: "last", seek to end once metadata loads
    if (project.coverFrame === "last") {
      const seekToEnd = () => {
        video.currentTime = video.duration;
      };
      video.addEventListener("loadedmetadata", seekToEnd, { once: true });
    }

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [project.video, project.coverFrame]);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hlsRef.current) {
      hlsRef.current.startLoad();
    }
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    // Seek back to last frame or first frame depending on coverFrame
    if (project.coverFrame === "last") {
      video.currentTime = video.duration;
    } else {
      video.currentTime = 0;
    }
  }, [project.coverFrame]);

  return (
    <div className="portfolio-card w-[85vw] md:w-[60vw] xl:w-[50vw] 2xl:w-[42vw] max-w-[900px] flex-shrink-0 px-3 pb-[75px] relative z-10">
      <div className="w-full group cursor-pointer">
        <div
          className="aspect-[16/14] xl:aspect-[16/11] rounded-2xl overflow-hidden relative flex items-center justify-center border border-cyan/10 transition-all duration-700 group-hover:border-cyan/30 group-hover:scale-[0.98]"
          style={{ backgroundColor: project.color }}
          onMouseEnter={project.video ? handleMouseEnter : undefined}
          onMouseLeave={project.video ? handleMouseLeave : undefined}
        >
          {project.cover ? (
            <>
              {/* Cover image — fades out on hover only if there's a video */}
              <img
                src={project.cover}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${project.video ? "group-hover:opacity-0" : ""}`}
              />
              {/* Hover video */}
              {project.video && (
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  loop
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              )}
            </>
          ) : project.video ? (
            /* Video-only: first frame as cover, plays on hover */
            <video
              ref={videoRef}
              src={!isHlsUrl(project.video) ? project.video : undefined}
              muted
              playsInline
              loop
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span
              data-section-heading
              data-heading-alpha="0.3"
              className="text-5xl md:text-7xl font-druk-bold tracking-[0.02em] italic"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <h3
              data-section-heading
              className="text-2xl md:text-3xl font-bold tracking-[-0.02em]"
            >
              {project.title}
            </h3>
            <p
              data-section-heading
              data-heading-alpha="0.5"
              className="mt-1 text-sm"
            >
              {project.category}
            </p>
          </div>
          <span data-section-heading data-heading-alpha="0.5" className="text-sm">
            {project.year}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const container = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
      const heading = headingRef.current!;

      // Heading entrance animation
      gsap.from(heading, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards entrance — staggered fade-up before horizontal scroll begins
      gsap.from(".portfolio-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Horizontal scroll animation — stops when last card is centered
      const flexContainer = wrapperRef.current!.querySelector(".flex") as HTMLElement;
      const lastCard = cards[cards.length - 1];
      const lastCardW = lastCard.offsetWidth;
      const totalW = flexContainer.scrollWidth;
      const moveX = totalW - lastCardW / 2 - window.innerWidth / 2;

      gsap.to(flexContainer, {
        x: -moveX,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: () => `+=${moveX}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="work"
      className="pt-32 md:pt-40 relative"
      style={{ overflowX: "clip" }}
    >
      {/* Horizontal scroll wrapper — pinned (heading + cards together) */}
      <div ref={wrapperRef} className="relative">
        {/* Heading inside pinned wrapper so it scrolls away with cards */}
        <div
          ref={headingRef}
          className="text-center px-6 pointer-events-none pt-[110px] md:pt-[130px] pb-12 md:pb-14"
        >
          <h2
            data-section-heading
            className="text-[clamp(3.5rem,12vw,10rem)] font-druk-bold uppercase tracking-[0.02em] leading-[0.85] italic"
          >
            SELECTED WORKS
          </h2>
        </div>

        {/* Cards row */}
        <div className="flex w-max relative">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
