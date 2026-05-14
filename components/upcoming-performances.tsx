"use client";

import { motion } from "framer-motion";
import { useFormatter, useTranslations } from "next-intl";

type Upcoming = {
    day: number;
    month: number;
    year: number;
    program: string;
    venue: string;
    location: string;
    role: string;
    href?: string;
};

export function UpcomingPerformances() {
    const t = useTranslations("UpcomingPerformances");
    const format = useFormatter();

    const upcoming: Upcoming[] = [
        {
            day: 18,
            month: 5,
            year: 2026,
            program: t("upcoming.20260518.program"),
            venue: t("upcoming.20260518.venue"),
            location: t("upcoming.20260518.location"),
            role: t("upcoming.20260518.role"),
            href: "https://www.mdw.ac.at/veranstaltung/?v=59740&g=43106",
        },
        {
            day: 21,
            month: 5,
            year: 2026,
            program: t("upcoming.20260521.program"),
            venue: t("upcoming.20260521.venue"),
            location: t("upcoming.20260521.location"),
            role: t("upcoming.20260521.role"),
        },
    ];

    return (
        <section
            id="upcoming"
            aria-labelledby="upcoming-heading"
            className="relative overflow-hidden bg-foreground px-6 py-24 text-background md:px-24"
        >
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-16 flex items-end justify-between border-b border-background/20 pb-4">
                    <h2
                        id="upcoming-heading"
                        className="text-4xl font-semibold tracking-tighter uppercase md:text-6xl"
                    >
                        {t("heading")}
                    </h2>
                    <div className="hidden items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-60 md:flex">
                        <span
                            aria-hidden="true"
                            className="relative flex h-2 w-2"
                        >
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        {t("indicator")}
                    </div>
                </div>

                <ul
                    aria-label={t("listLabel")}
                    className="list-none divide-y divide-background/15 border-y border-background/15 p-0"
                >
                    {upcoming.map((event, i) => {
                        const Component = event.href ? motion.a : motion.div;
                        const eventDate = new Date(
                            event.year,
                            event.month - 1,
                            event.day
                        );
                        const isoDate = `${event.year}-${String(event.month).padStart(2, "0")}-${String(event.day).padStart(2, "0")}`;
                        return (
                            <li key={i}>
                                <Component
                                    data-clickable={!!event.href}
                                    {...(event.href
                                        ? {
                                              href: event.href,
                                              target: "_blank",
                                              rel: "noopener noreferrer",
                                          }
                                        : {})}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: i * 0.1,
                                    }}
                                    viewport={{ once: true }}
                                    className="group relative grid grid-cols-[auto_1fr] items-center gap-6 py-8 transition-colors duration-500 md:grid-cols-[160px_1fr_auto] md:gap-12 md:py-10"
                                >
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-background/5 transition-all duration-500 group-hover:w-full"
                                    />

                                    <time
                                        dateTime={isoDate}
                                        className="relative font-mono leading-none"
                                    >
                                        <span className="block text-5xl font-bold tracking-tighter md:text-7xl">
                                            {event.day
                                                .toString()
                                                .padStart(2, "0")}
                                        </span>
                                        <span className="mt-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-60">
                                            <span>
                                                {format.dateTime(eventDate, {
                                                    month: "short",
                                                })}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="opacity-40"
                                            >
                                                /
                                            </span>
                                            <span>{event.year}</span>
                                        </span>
                                    </time>

                                    <div className="relative">
                                        <h3 className="text-2xl font-bold uppercase md:text-4xl">
                                            {event.program}
                                        </h3>
                                        <p className="mt-2 font-mono text-sm uppercase">
                                            {event.venue}
                                        </p>
                                        <p className="font-mono text-xs uppercase opacity-60">
                                            {event.location}
                                        </p>
                                        <p className="mt-3 font-mono text-xs tracking-wider text-background/70 italic md:hidden">
                                            {event.role}
                                        </p>
                                    </div>

                                    <div className="relative hidden text-right font-mono text-xs tracking-wider text-background/60 transition-colors duration-300 group-hover:text-background md:block md:max-w-xs">
                                        {event.role}
                                    </div>
                                </Component>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
