"use client";

import * as React from "react";
import { motion } from "motion/react";
import Image from "next/image";

import { cn } from "@/lib/utils";

export interface HoverExpandItem {
    label: string;
    /** e.g. country, year, category */
    sublabel?: string;
    image: string;
    imageAlt?: string;
    /** short descriptor shown when expanded */
    description?: string;
}

export interface HoverExpandProps {
    items: HoverExpandItem[];
    /**
     * Row height when collapsed, in pixels.
     * @default 68
     */
    collapsedHeight?: number;
    /**
     * Row height when expanded, in pixels.
     * @default 320
     */
    expandedHeight?: number;
    className?: string;
}

export function HoverExpand({
    items,
    collapsedHeight = 68,
    expandedHeight = 320,
    className,
}: HoverExpandProps) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    return (
        <ul className={cn("flex w-full list-none flex-col p-0", className)}>
            <li
                aria-hidden="true"
                className="w-full border-t border-current opacity-15"
            />

            {items.map((item, i) => {
                const isActive = activeIndex === i;
                const isOtherActive = activeIndex !== null && !isActive;

                return (
                    <React.Fragment key={i}>
                        <motion.li
                            role="button"
                            tabIndex={0}
                            aria-expanded={isActive}
                            className="relative w-full overflow-hidden select-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                            animate={{
                                height: isActive
                                    ? expandedHeight
                                    : collapsedHeight,
                                opacity: isOtherActive ? 0.38 : 1,
                            }}
                            transition={{
                                height: {
                                    type: "spring",
                                    stiffness: 280,
                                    damping: 32,
                                    mass: 0.9,
                                },
                                opacity: { duration: 0.22, ease: "easeOut" },
                            }}
                            onHoverStart={() => setActiveIndex(i)}
                            onHoverEnd={() => setActiveIndex(null)}
                            onFocus={() => setActiveIndex(i)}
                            onBlur={() => setActiveIndex(null)}
                            onClick={() =>
                                setActiveIndex((prev) =>
                                    prev === i ? null : i
                                )
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setActiveIndex((prev) =>
                                        prev === i ? null : i
                                    );
                                }
                            }}
                            aria-label={[
                                item.label,
                                item.sublabel,
                                item.description,
                            ]
                                .filter(Boolean)
                                .join(" — ")}
                        >
                            <motion.div
                                className="absolute inset-0 h-full w-full"
                                initial={false}
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    scale: isActive ? 1 : 1.06,
                                }}
                                transition={{
                                    opacity: {
                                        duration: 0.45,
                                        ease: [0.23, 1, 0.32, 1],
                                    },
                                    scale: {
                                        duration: 0.55,
                                        ease: [0.23, 1, 0.32, 1],
                                    },
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.imageAlt ?? ""}
                                    fill
                                    sizes="(min-width: 1280px) 576px, (min-width: 768px) calc(100vw - 12rem), 100vw"
                                    className="object-cover"
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30"
                                />
                            </motion.div>

                            {(item.sublabel || item.description) &&
                                isActive && (
                                    <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-end gap-1 px-5 pt-4">
                                        {item.sublabel && (
                                            <motion.span
                                                layoutId={`sublabel-${i}`}
                                                className="shrink-0 font-mono text-xs tracking-wide text-white uppercase"
                                                initial={{ opacity: 1 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    layout: {
                                                        type: "spring",
                                                        stiffness: 280,
                                                        damping: 32,
                                                        mass: 0.9,
                                                    },
                                                    opacity: { duration: 0.2 },
                                                }}
                                            >
                                                {item.sublabel}
                                            </motion.span>
                                        )}
                                        {item.description && (
                                            <motion.span
                                                className="truncate font-mono text-xs text-white uppercase"
                                                initial={{ opacity: 0, x: 8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 8 }}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: 0.12,
                                                    ease: [0.23, 1, 0.32, 1],
                                                }}
                                            >
                                                {item.description}
                                            </motion.span>
                                        )}
                                    </div>
                                )}

                            <div className="absolute inset-0 flex items-end px-5 pb-4">
                                <div className="flex w-full items-center justify-between gap-4">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <motion.span
                                            className="hidden shrink-0 font-mono text-xs tabular-nums opacity-40 md:block"
                                            animate={{
                                                color: isActive
                                                    ? "#ffffff"
                                                    : "currentColor",
                                                opacity: isActive ? 1 : 0.4,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </motion.span>

                                        <motion.span
                                            className={cn(
                                                "text-md truncate font-semibold tracking-tight sm:text-lg md:text-xl",
                                                isActive &&
                                                    "overflow-visible text-clip whitespace-normal"
                                            )}
                                            animate={{
                                                color: isActive
                                                    ? "#ffffff"
                                                    : "currentColor",
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    </div>

                                    {item.sublabel && !isActive && (
                                        <motion.span
                                            layoutId={`sublabel-${i}`}
                                            className="shrink-0 font-mono text-xs tracking-wide uppercase"
                                            initial={{ opacity: 0.45 }}
                                            animate={{ opacity: 0.45 }}
                                            transition={{
                                                layout: {
                                                    type: "spring",
                                                    stiffness: 280,
                                                    damping: 32,
                                                    mass: 0.9,
                                                },
                                                opacity: { duration: 0.2 },
                                            }}
                                        >
                                            {item.sublabel}
                                        </motion.span>
                                    )}
                                </div>
                            </div>
                        </motion.li>

                        <li
                            aria-hidden="true"
                            className="w-full border-t border-current opacity-15"
                        />
                    </React.Fragment>
                );
            })}
        </ul>
    );
}
