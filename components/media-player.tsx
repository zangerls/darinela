"use client";

import {
    AnimatePresence,
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react";
import { Play, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";

const YOUTUBE_ID = "i8q7OpLG_x4";

export function MediaPlayer() {
    const t = useTranslations("MediaPlayer");
    const playerRef = useRef<HTMLDivElement | null>(null);
    const [showPopOver, setShowPopOver] = useState<boolean>(false);

    const { scrollYProgress: playerProgress } = useScroll({
        target: playerRef,
        offset: ["start end", "end start"],
    });
    const playerWidth = useTransform(playerProgress, [0, 1], ["70%", "40%"]);

    const cursorSpring = { mass: 0.1 };
    const cursorX = useSpring(0, cursorSpring);
    const cursorY = useSpring(0, cursorSpring);
    const cursorOpacity = useSpring(0, cursorSpring);

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
        cursorOpacity.set(1);
        const bounds = e.currentTarget.getBoundingClientRect();
        cursorX.set(e.clientX - bounds.left);
        cursorY.set(e.clientY - bounds.top);
    };

    const teaserSrc =
        `https://www.youtube.com/embed/${YOUTUBE_ID}` +
        `?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_ID}` +
        `&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3`;

    const fullSrc =
        `https://www.youtube.com/embed/${YOUTUBE_ID}` +
        `?autoplay=1&mute=0&controls=1&modestbranding=1&playsinline=1&rel=0`;

    return (
        <>
            <section
                ref={playerRef}
                aria-labelledby="media-player-heading"
                className="relative w-full bg-background py-24"
            >
                <div className="mx-auto mb-8 max-w-2xl px-6 text-center">
                    <h2
                        id="media-player-heading"
                        className="mb-3 text-3xl font-semibold tracking-tight"
                    >
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground">{t("description")}</p>
                </div>
                <div className="flex w-full justify-center">
                    <motion.button
                        type="button"
                        style={{ width: playerWidth, aspectRatio: "16 / 9" }}
                        onClick={() => setShowPopOver(true)}
                        onPointerMove={handlePointerMove}
                        onPointerLeave={() => cursorOpacity.set(0)}
                        aria-label={t("openLabel")}
                        className="relative cursor-none overflow-hidden bg-muted"
                    >
                        <iframe
                            src={teaserSrc}
                            title={t("teaserTitle")}
                            aria-hidden="true"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            tabIndex={-1}
                            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.4]"
                        />
                        <motion.span
                            aria-hidden="true"
                            style={{
                                x: cursorX,
                                y: cursorY,
                                opacity: cursorOpacity,
                            }}
                            className="pointer-events-none absolute top-0 left-0 z-20 flex w-fit items-center gap-2 p-2 text-sm text-white mix-blend-exclusion select-none"
                        >
                            <Play className="size-4 fill-white" /> {t("play")}
                        </motion.span>
                    </motion.button>
                </div>
            </section>

            <AnimatePresence>
                {showPopOver && (
                    <VideoPopOver
                        src={fullSrc}
                        onClose={() => setShowPopOver(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

function VideoPopOver({ src, onClose }: { src: string; onClose: () => void }) {
    const t = useTranslations("MediaPlayer");
    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={t("fullTitle")}
            className="fixed inset-0 z-[101] flex items-center justify-center"
        >
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="absolute inset-0 bg-background/90 backdrop-blur-lg"
            />
            <motion.div
                initial={{
                    clipPath: "inset(43.5% 43.5% 33.5% 43.5%)",
                    opacity: 0,
                }}
                animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
                exit={{
                    clipPath: "inset(43.5% 43.5% 33.5% 43.5%)",
                    opacity: 0,
                    transition: {
                        duration: 1,
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                        opacity: { duration: 0.2, delay: 0.8 },
                    },
                }}
                transition={{
                    duration: 1,
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                }}
                className="relative aspect-video w-[90vw] max-w-7xl"
            >
                <iframe
                    src={src}
                    title={t("fullTitle")}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                />
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-10 right-0 z-10 cursor-pointer rounded-full p-1 text-white"
                    aria-label={t("closeLabel")}
                >
                    <Plus aria-hidden="true" className="size-5 rotate-45" />
                </button>
            </motion.div>
        </div>
    );
}
