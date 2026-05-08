"use client";

import { motion } from "framer-motion";

type Upcoming = {
    day: string;
    month: string;
    year: string;
    program: string;
    venue: string;
    location: string;
    role: string;
    href?: string;
};

export function UpcomingPerformances() {
    const upcoming: Upcoming[] = [
        {
            day: "1",
            month: "Jan",
            year: "2026",
            program: "Program 1",
            venue: "Venue 1",
            location: "Location 1",
            role: "Role 1",
        },
        {
            day: "2",
            month: "Jan",
            year: "2026",
            program: "Program 2",
            venue: "Venue 2",
            location: "Location 2",
            role: "Role 2",
        },
        {
            day: "3",
            month: "Jan",
            year: "2026",
            program: "Program 3",
            venue: "Venue 3",
            location: "Location 3",
            role: "Role 3",
        },
    ];

    return (
        <section
            id="upcoming"
            className="relative overflow-hidden bg-foreground px-6 py-24 text-background md:px-24"
        >
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-16 flex items-end justify-between border-b border-background/20 pb-4">
                    <h2 className="font-display text-4xl font-semibold tracking-tighter uppercase md:text-6xl">
                        Upcoming Performances
                    </h2>
                    <div className="hidden items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-60 md:flex">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        Indicator
                    </div>
                </div>

                <div className="divide-y divide-background/15 border-y border-background/15">
                    {upcoming.map((event, i) => {
                        const Component = event.href ? motion.a : motion.div;
                        return (
                            <Component
                                key={i}
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
                                <div className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-background/5 transition-all duration-500 group-hover:w-full" />

                                <div className="relative font-mono leading-none">
                                    <div className="font-display text-5xl font-bold tracking-tighter md:text-7xl">
                                        {event.day.padStart(2, "0")}
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-xs tracking-widest uppercase opacity-70">
                                        <span>{event.month}</span>
                                        <span className="opacity-40">/</span>
                                        <span>{event.year}</span>
                                    </div>
                                </div>

                                <div className="relative">
                                    <h3 className="font-display text-2xl font-bold uppercase md:text-4xl">
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
