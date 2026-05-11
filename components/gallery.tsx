"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Slide = {
    src: string;
    caption: string;
    place: string;
    year: string;
    tall?: boolean;
};

const slides: Slide[] = [
    {
        src: "/IMG_1719.jpeg",
        caption: "Caption 1",
        place: "Place 1",
        year: "2025",
    },
    {
        src: "/IMG_1747.jpeg",
        caption: "Caption 2",
        place: "Place 2",
        year: "2024",
        tall: true,
    },
    {
        src: "/IMG_1782.jpeg",
        caption: "Caption 3",
        place: "Place 3",
        year: "2024",
    },
    {
        src: "/IMG_1840.jpeg",
        caption: "Caption 4",
        place: "Place 4",
        year: "2023",
        tall: true,
    },
    {
        src: "/IMG_2024.jpeg",
        caption: "Caption 5",
        place: "Place 5",
        year: "2023",
    },
    {
        src: "/IMG_2243.jpeg",
        caption: "Caption 6",
        place: "Place 6",
        year: "2024",
        tall: true,
    },
];

export function Gallery() {
    const t = useTranslations("Gallery");
    const trackRef = useRef<HTMLDivElement | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const onScroll = () => {
            const sec = sectionRef.current;
            const track = trackRef.current;
            if (!sec || !track) return;

            const rect = sec.getBoundingClientRect();
            const vh = window.innerHeight;
            const total = rect.height - vh;

            const scrolled = Math.min(Math.max(-rect.top, 0), total);
            const p = total > 0 ? scrolled / total : 0;
            setProgress(p);

            const trackWidth = track.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxTranslate = Math.max(0, trackWidth - viewportWidth + 48);
            track.style.transform = `translate3d(-${p * maxTranslate}px, 0, 0)`;
        };
        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <section
            id="gallery"
            ref={sectionRef}
            className="relative border-t border-border bg-background"
            style={{ height: "320vh" }}
            aria-label="Photo gallery, scrolls horizontally"
        >
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
                <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-8 md:px-10 md:pt-28">
                    <h2 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tighter uppercase md:text-6xl">
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
                        style={{ transition: "transform 0.1s linear" }}
                    >
                        {slides.map((s, i) => (
                            <figure
                                key={s.src}
                                className={cn(
                                    "group relative shrink-0",
                                    s.tall
                                        ? "w-[62vw] md:w-[44vw] lg:w-[32vw]"
                                        : "w-[78vw] md:w-[58vw] lg:w-[46vw]"
                                )}
                            >
                                <div
                                    className={cn(
                                        "relative w-full overflow-hidden",
                                        s.tall
                                            ? "aspect-[3/4]"
                                            : "aspect-[16/10]"
                                    )}
                                >
                                    <Image
                                        src={s.src || "/placeholder.svg"}
                                        alt={s.caption}
                                        fill
                                        sizes={
                                            s.tall
                                                ? "(min-width: 1024px) 32vw, (min-width: 768px) 44vw, 62vw"
                                                : "(min-width: 1024px) 46vw, (min-width: 768px) 58vw, 78vw"
                                        }
                                        className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 ring-1 ring-foreground/10 ring-inset" />
                                    <div className="tracking-wider-2 pointer-events-none absolute right-4 bottom-4 left-4 flex items-end justify-between font-mono text-[0.65rem] text-background text-white uppercase">
                                        <span>
                                            N°&nbsp;
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span>{s.year}</span>
                                    </div>
                                </div>
                                <figcaption className="mt-4 flex items-start justify-between gap-6 text-sm">
                                    <span className="text-xl leading-tight italic">
                                        {s.caption}
                                    </span>
                                    <span className="tracking-wider-2 max-w-[18ch] shrink-0 text-right text-[0.65rem] text-muted-foreground uppercase">
                                        {s.place}
                                    </span>
                                </figcaption>
                            </figure>
                        ))}

                        <div className="w-[10vw] shrink-0" aria-hidden />
                    </div>
                </div>

                <div className="mx-auto w-full px-6 pt-10 pb-6 md:px-44 md:pb-12">
                    <div className="relative h-px w-full overflow-hidden bg-border">
                        <div
                            className="absolute top-0 left-0 h-px bg-primary"
                            style={{ width: `${progress * 100}%` }}
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
