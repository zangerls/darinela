"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { Pause, Play } from "lucide-react";
import { useLenis } from "@/providers/lenis-provider";
import { Separator } from "./ui/separator";

type Performance = {
    id: number;
    title: string;
    opera: string;
    composer: string;
    venue: string;
    year: number;
    image: string;
    audio: string;
};

const PERFORMANCES: Performance[] = [
    {
        id: 1,
        title: "Title 1",
        opera: "Opera 1",
        composer: "Composer 1",
        venue: "Venue 1",
        year: 2023,
        image: "/IMG_1719.jpeg",
        audio: "/audio.wav",
    },
    {
        id: 2,
        title: "Title 2",
        opera: "Opera 2",
        composer: "Composer 2",
        venue: "Venue 2",
        year: 2023,
        image: "/IMG_1719.jpeg",
        audio: "/audio.wav",
    },
    {
        id: 3,
        title: "Title 3",
        opera: "Opera 3",
        composer: "Composer 3",
        venue: "Venue 3",
        year: 2023,
        image: "/IMG_1719.jpeg",
        audio: "/audio.wav",
    },
    {
        id: 4,
        title: "Title 4",
        opera: "Opera 4",
        composer: "Composer 4",
        venue: "Venue 4",
        year: 2023,
        image: "/IMG_1719.jpeg",
        audio: "/audio.wav",
    },
    {
        id: 5,
        title: "Title 5",
        opera: "Opera 5",
        composer: "Composer 5",
        venue: "Venue 5",
        year: 2023,
        image: "/IMG_1719.jpeg",
        audio: "/audio.wav",
    },
];

function Waveform({ isPlaying }: { isPlaying: boolean }) {
    const bars = 40;
    return (
        <div className="flex h-10 items-center justify-center gap-[3px]">
            {Array.from({ length: bars }).map((_, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-primary/70"
                    animate={
                        isPlaying
                            ? {
                                  scaleY: [
                                      0.15,
                                      Math.random() * 0.85 + 0.15,
                                      Math.random() * 0.85 + 0.15,
                                      0.15,
                                  ],
                              }
                            : { scaleY: 0.15 }
                    }
                    transition={
                        isPlaying
                            ? {
                                  duration: 0.8 + Math.random() * 0.6,
                                  repeat: Infinity,
                                  repeatType: "loop",
                                  ease: "easeInOut",
                                  delay: (i / bars) * 0.4,
                              }
                            : { duration: 0.3 }
                    }
                    style={{ height: 40, originY: 0.5 }}
                />
            ))}
        </div>
    );
}

function useAudioPlayer(src: string) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        if (!src) return;

        const audio = new Audio(src);
        audioRef.current = audio;

        audio.addEventListener("loadedmetadata", () =>
            setDuration(audio.duration)
        );
        audio.addEventListener("timeupdate", () =>
            setProgress(audio.currentTime / (audio.duration || 1))
        );
        audio.addEventListener("ended", () => setIsPlaying(false));

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [src]);

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying((p) => !p);
    }, [isPlaying]);

    const seek = useCallback((fraction: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = fraction * audio.duration;
    }, []);

    return { isPlaying, progress, duration, toggle, seek };
}

function formatTime(secs: number) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function ExpandedPlayer({
    perf,
    onClose,
}: {
    perf: Performance;
    onClose: () => void;
}) {
    const { isPlaying, progress, duration, toggle, seek } = useAudioPlayer(
        perf.audio
    );

    return (
        <>
            <div className="absolute inset-0 z-10" onClick={onClose} />

            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div
                    className="flex w-[60vw] max-w-2xl flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <motion.div
                        layoutId={`label-${perf.id}`}
                        className="text-center"
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <h2 className="font-display text-4xl leading-none font-bold uppercase md:text-6xl">
                            {perf.title}
                        </h2>
                        <p className="mt-1 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                            {perf.opera} — {perf.composer}
                        </p>
                    </motion.div>

                    <motion.div
                        layoutId={`image-${perf.id}`}
                        className="relative mt-3 aspect-square w-full overflow-hidden rounded-sm"
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <Image
                            src={perf.image}
                            alt={perf.title}
                            fill
                            sizes="(min-width: 768px) 672px, 60vw"
                            className="object-cover"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                        className="mt-4 space-y-3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                            <span>
                                {perf.venue}, {perf.year}
                            </span>
                            <span>
                                {duration
                                    ? formatTime(progress * duration) +
                                      " / " +
                                      formatTime(duration)
                                    : "--:-- / --:--"}
                            </span>
                        </div>

                        <Waveform isPlaying={isPlaying} />

                        <div
                            className="relative h-[2px] w-full cursor-pointer bg-border"
                            onClick={(e) => {
                                e.stopPropagation();
                                const rect =
                                    e.currentTarget.getBoundingClientRect();
                                seek((e.clientX - rect.left) / rect.width);
                            }}
                        >
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-primary"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggle();
                                }}
                                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                                aria-label={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <Pause className="size-5" />
                                ) : (
                                    <Play className="size-5 translate-x-[1px]" />
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}

function ScrollProgressBar({
    sectionRef,
}: {
    sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
    const fillRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();

    useEffect(() => {
        const compute = () => {
            const sec = sectionRef.current;
            const fill = fillRef.current;
            if (!sec || !fill) return;

            const rect = sec.getBoundingClientRect();
            const vh = window.innerHeight;
            const total = rect.height - vh;

            const scrolled = Math.min(Math.max(-rect.top, 0), total);
            const progress = total > 0 ? scrolled / total : 0;
            fill.style.width = `${progress * 100}%`;
        };
        compute();
        if (lenis) {
            lenis.on("scroll", compute);
            window.addEventListener("resize", compute);

            return () => {
                lenis.off("scroll", compute);
                window.removeEventListener("resize", compute);
            };
        }

        window.addEventListener("scroll", compute, { passive: true });
        window.addEventListener("resize", compute);

        return () => {
            window.removeEventListener("scroll", compute);
            window.removeEventListener("resize", compute);
        };
    }, [lenis, sectionRef]);

    return (
        <div className="absolute right-0 bottom-0 left-0 px-6 pb-6 md:px-44 md:pb-12">
            <div className="relative h-px w-full overflow-hidden bg-border">
                <div
                    ref={fillRef}
                    className="absolute top-0 left-0 h-px bg-primary"
                />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase">
                <span>Scroll to continue</span>
                <span>{PERFORMANCES.length} recordings</span>
            </div>
        </div>
    );
}

export function Performances() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeId, setActiveId] = useState<number>(PERFORMANCES[0].id);
    const [expandedId, setExpandedId] = useState<number | null>(null);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape" && expandedId !== null) setExpandedId(null);
        }

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [expandedId]);

    const activePerf = PERFORMANCES.find((p) => p.id === activeId)!;
    const expandedPerf = PERFORMANCES.find((p) => p.id === expandedId) ?? null;

    return (
        <section
            id="performances"
            ref={sectionRef}
            className="relative bg-background"
            style={{ height: "200vh" }}
        >
            <motion.div
                layoutScroll
                className="sticky top-0 h-screen overflow-hidden"
                style={{ transform: "translateZ(0)", willChange: "transform" }}
                onClick={() => {
                    if (expandedId !== null) setExpandedId(null);
                }}
            >
                {expandedPerf ? (
                    <div className="absolute inset-0">
                        <ExpandedPlayer
                            perf={expandedPerf}
                            onClose={() => setExpandedId(null)}
                        />
                    </div>
                ) : (
                    <div className="absolute inset-0">
                        <div className="absolute top-24 left-6 md:left-12">
                            <motion.div
                                key={activePerf.id}
                                layoutId={`image-${activePerf.id}`}
                                className="relative aspect-square w-42 overflow-hidden rounded-sm sm:w-56 md:w-72 lg:w-96"
                                transition={{
                                    duration: 0.5,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <Image
                                    src={activePerf.image}
                                    alt={activePerf.title}
                                    fill
                                    sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 168px"
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        <div className="absolute right-6 bottom-20 flex flex-col items-end gap-1 md:right-12 md:bottom-32">
                            <div className="mb-1 flex items-center gap-4">
                                <Separator className="w-8! bg-muted-foreground sm:w-10! md:w-12!" />
                                <span className="md:text-md text-sm text-muted-foreground uppercase">
                                    Live Performances
                                </span>
                            </div>
                            {PERFORMANCES.map((perf) => {
                                const isActive = perf.id === activeId;
                                return (
                                    <motion.button
                                        key={perf.id}
                                        layoutId={`label-${perf.id}`}
                                        onHoverStart={() =>
                                            setActiveId(perf.id)
                                        }
                                        onClick={() => {
                                            setActiveId(perf.id);
                                            setExpandedId(perf.id);
                                        }}
                                        className="group relative text-right"
                                        transition={{
                                            layout: {
                                                duration: 0.5,
                                                ease: [0.4, 0, 0.2, 1],
                                            },
                                        }}
                                    >
                                        <span
                                            className="block"
                                            style={{
                                                transform: isActive
                                                    ? "translateX(-6px)"
                                                    : "translateX(0)",
                                                transition:
                                                    "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                                            }}
                                        >
                                            <span
                                                className={`font-display block text-xl leading-tight font-bold uppercase transition-colors duration-200 sm:text-2xl md:text-3xl ${isActive ? "text-primary" : ""}`}
                                            >
                                                {perf.title}
                                            </span>
                                            <span className="block font-mono text-[10px] tracking-widest text-muted-foreground uppercase sm:text-[11px] md:text-xs">
                                                {perf.opera} - {perf.composer}
                                            </span>
                                        </span>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>
                )}

                <ScrollProgressBar sectionRef={sectionRef} />
            </motion.div>
        </section>
    );
}
