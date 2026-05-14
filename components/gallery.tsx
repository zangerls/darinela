"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Slide = {
    src: string;
    year: number;
    tall?: boolean;
};

const slides: Slide[] = [
    {
        src: "/IMG_1719.jpeg",
        year: 2025,
    },
    {
        src: "/IMG_1747.jpeg",
        year: 2025,
        tall: true,
    },
    {
        src: "/IMG_1799.jpeg",
        year: 2025,
    },
    {
        src: "/IMG_1910.jpeg",
        year: 2025,
        tall: true,
    },
    {
        src: "/IMG_2048.jpeg",
        year: 2025,
    },
    {
        src: "/IMG_1883.jpeg",
        year: 2025,
        tall: true,
    },
];

export function Gallery() {
    const t = useTranslations("Gallery");
    const trackRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let vh = window.innerHeight;
        let vw = window.innerWidth;
        let trackWidth = trackRef.current?.scrollWidth ?? 0;

        const measure = () => {
            vh = window.innerHeight;
            vw = window.innerWidth;
            trackWidth = trackRef.current?.scrollWidth ?? 0;
        };

        const onScroll = () => {
            const sec = sectionRef.current;
            const track = trackRef.current;
            if (!sec || !track) return;

            const rect = sec.getBoundingClientRect();
            const total = rect.height - vh;

            const scrolled = Math.min(Math.max(-rect.top, 0), total);
            const p = total > 0 ? scrolled / total : 0;

            const maxTranslate = Math.max(0, trackWidth - vw + 48);
            track.style.transform = `translate3d(-${p * maxTranslate}px, 0, 0)`;

            if (progressRef.current) {
                progressRef.current.style.width = `${p * 100}%`;
            }
        };

        const onResize = () => {
            measure();
            onScroll();
        };

        measure();
        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <section
            id="gallery"
            ref={sectionRef}
            className="relative h-[320vh] border-t border-border bg-background [@supports(height:320svh)]:h-[320svh]"
            aria-labelledby="gallery-heading"
        >
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden [@supports(height:100svh)]:h-svh">
                <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-8 md:px-10 md:pt-28">
                    <h2
                        id="gallery-heading"
                        className="mt-6 max-w-3xl text-4xl font-semibold tracking-tighter uppercase md:text-6xl"
                    >
                        {t("headline.lead")}
                        <span className="text-primary italic">
                            {" "}
                            {t("headline.accent")}
                        </span>
                        .
                    </h2>
                </div>

                <div className="relative flex-1 overflow-hidden">
                    <div
                        ref={trackRef}
                        className="absolute inset-y-0 left-6 flex items-center gap-8 will-change-transform md:left-10"
                    >
                        {slides.map((s, i) => (
                            <figure
                                key={s.src}
                                className={cn(
                                    "group relative flex h-full shrink-0 items-center",
                                    s.tall
                                        ? "w-[62vw] md:w-[44vw] lg:w-[32vw]"
                                        : "w-[78vw] md:w-[58vw] lg:w-[46vw]"
                                )}
                            >
                                <div
                                    className={cn(
                                        "relative max-h-full w-full overflow-hidden",
                                        s.tall
                                            ? "aspect-[3/4]"
                                            : "aspect-[16/10]"
                                    )}
                                >
                                    <Image
                                        src={s.src}
                                        alt={t("imageAlt")}
                                        fill
                                        sizes={
                                            s.tall
                                                ? "(min-width: 1024px) 32vw, (min-width: 768px) 44vw, 62vw"
                                                : "(min-width: 1024px) 46vw, (min-width: 768px) 58vw, 78vw"
                                        }
                                        className={cn(
                                            "object-cover",
                                            !s.tall && "object-top"
                                        )}
                                    />
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-0 ring-1 ring-foreground/10 ring-inset"
                                    />
                                    <div className="tracking-wider-2 pointer-events-none absolute right-4 bottom-4 left-4 flex items-end justify-between font-mono text-[0.65rem] text-background text-white uppercase">
                                        <span>
                                            N°&nbsp;
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span>{s.year}</span>
                                    </div>
                                </div>
                            </figure>
                        ))}

                        <div className="w-[10vw] shrink-0" aria-hidden />
                    </div>
                </div>

                <div className="mx-auto w-full px-6 pt-10 pb-6 md:px-52 md:pb-12">
                    <div className="relative h-px w-full overflow-hidden bg-border">
                        <div
                            ref={progressRef}
                            className="absolute top-0 left-0 h-px w-0 bg-primary"
                        />
                    </div>
                    <div className="tracking-wider-2 mt-3 flex items-center justify-between text-[0.65rem] text-muted-foreground uppercase">
                        <span>{t("scrollToPan")}</span>
                        <span>{t("nSlides", { count: slides.length })}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
