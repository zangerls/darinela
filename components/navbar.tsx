"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { LanguagePicker } from "./language-picker";
import { Separator } from "./ui/separator";

type Link = {
    label: string;
    href: string;
};

type FlagAnimationProps = {
    isPlaying: boolean;
    motionKey: number;
    cancelAnimation: () => void;
};

function FlagAnimation({
    isPlaying,
    motionKey,
    cancelAnimation,
}: FlagAnimationProps) {
    const flagStripes = [
        { color: "#FFFFFF", top: "0%", delay: 0 },
        { color: "#00966E", top: "33.333%", delay: 0.08 },
        { color: "#D62612", top: "66.666%", delay: 0.16 },
    ];
    return (
        <AnimatePresence>
            {isPlaying && (
                <motion.div
                    key={motionKey}
                    className="pointer-events-none fixed inset-0 z-[200]"
                    onAnimationComplete={cancelAnimation}
                >
                    {flagStripes.map((stripe) => (
                        <motion.div
                            key={stripe.color}
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                duration: 1.2,
                                ease: [0.76, 0, 0.24, 1],
                                delay: stripe.delay,
                            }}
                            style={{
                                top: stripe.top,
                                backgroundColor: stripe.color,
                            }}
                            className="absolute left-0 h-[33.333vh] w-full"
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [flagKey, setFlagKey] = useState<number>(0);
    const [flagPlaying, setFlagPlaying] = useState<boolean>(false);

    const links: Link[] = [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Education", href: "#education" },
        { label: "Acclaim", href: "#acclaim" },
        { label: "Performances", href: "#performances" },
        { label: "Upcoming", href: "#upcoming" },
        { label: "Gallery", href: "#gallery" },
        { label: "Contact", href: "#contact" },
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            <FlagAnimation
                isPlaying={flagPlaying}
                motionKey={flagKey}
                cancelAnimation={() => setFlagPlaying(false)}
            />
            <nav className="pointer-events-none fixed inset-0 z-[100] p-6 text-white mix-blend-difference md:p-12">
                <div className="flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <a
                            href="/"
                            className="pointer-events-auto text-lg font-bold tracking-widest uppercase transition-opacity hover:opacity-70 md:text-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            Darinela Vangelova
                        </a>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="group pointer-events-auto flex cursor-pointer items-center gap-4 font-mono text-sm tracking-widest transition-opacity hover:opacity-70"
                        >
                            <span className="hidden uppercase md:block">
                                {isOpen ? "Close" : "Menu"}
                            </span>
                            <div className="relative flex h-8 w-8 items-center">
                                <motion.div
                                    animate={{
                                        y: isOpen ? 0 : -8,
                                        rotate: isOpen ? 45 : 0,
                                        width: 24,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{ transformOrigin: "center" }}
                                    className="absolute left-0 h-[1.5px] bg-white"
                                />
                                <motion.div
                                    animate={{
                                        opacity: isOpen ? 0 : 1,
                                        width: isOpen ? 0 : 14,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-0 h-[1.5px] bg-white"
                                />
                                <motion.div
                                    animate={{
                                        y: isOpen ? 0 : 8,
                                        rotate: isOpen ? -45 : 0,
                                        width: isOpen ? 24 : 19,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{ transformOrigin: "center" }}
                                    className="absolute left-0 h-[1.5px] bg-white"
                                />
                            </div>
                        </button>
                    </div>

                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="hidden items-end justify-between font-mono text-xs opacity-60 md:flex"
                        >
                            <div className="flex flex-col gap-1">
                                <ThemeToggle />
                                <LanguagePicker />
                            </div>
                            <div className="text-right uppercase">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFlagKey((k) => k + 1);
                                        setFlagPlaying(true);
                                    }}
                                    className="pointer-events-auto cursor-pointer uppercase transition-opacity hover:opacity-70"
                                >
                                    Born in Bulgaria
                                </button>
                                <br />
                                <span>Based in Vienna</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-foreground text-background"
                    >
                        <div className="relative z-10 flex flex-col items-center gap-5 md:gap-8">
                            {links.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ y: 100, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 100, opacity: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                    }}
                                    className="overflow-hidden"
                                    data-clickable
                                >
                                    <a
                                        data-clickable
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="group font-display relative block text-4xl font-black tracking-tighter transition-all duration-300 sm:text-5xl md:text-6xl lg:text-7xl"
                                    >
                                        <span
                                            data-clickable
                                            className="group-hover:text-stroke relative z-10 px-2 uppercase transition-colors duration-300"
                                        >
                                            {item.label}
                                        </span>

                                        <span className="absolute top-1/2 left-0 z-20 h-[8px] w-0 -translate-y-1/2 bg-primary transition-all duration-300 ease-out group-hover:w-full md:h-[12px]" />
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 md:hidden">
                            <ThemeToggle />
                            <Separator
                                className="bg-muted-foreground"
                                orientation="vertical"
                            />
                            <LanguagePicker />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
