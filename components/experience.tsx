"use client";

import { motion, MotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

type Experience = {
    year: string;
    role: string;
    venue: string;
    location: string;
    details: string;
    href?: string;
};

function ExperienceItem({
    children,
    index,
    href,
}: {
    children: ReactNode;
    index: number;
    href?: string;
}) {
    function getMotionProps(index: number): MotionProps {
        return {
            initial: { opacity: 0, x: -30 },
            whileInView: { opacity: 1, x: 0 },
            transition: { duration: 0.6, delay: index * 0.08 },
            viewport: { once: true },
        };
    }

    const Component = href ? motion.a : motion.div;

    return (
        <Component
            data-clickable={!!href}
            {...getMotionProps(index)}
            className="group relative block border-l-2 border-primary/30 pl-8 transition-colors duration-500 hover:border-primary"
            {...(href
                ? { href, target: "_blank", rel: "noopener noreferrer" }
                : {})}
        >
            {children}
        </Component>
    );
}

export function Experience() {
    const experiences: Experience[] = [
        {
            year: "2026",
            role: "Role 1",
            venue: "Venue 1",
            location: "Location 1",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor efficitur leo quis molestie.",
            href: "https://google.com",
        },
        {
            year: "2025",
            role: "Role 2",
            venue: "Venue 2",
            location: "Location 2",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor efficitur leo quis molestie.",
        },

        {
            year: "2024",
            role: "Role 3",
            venue: "Venue 3",
            location: "Location 3",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor efficitur leo quis molestie.",
        },

        {
            year: "2024",
            role: "Role 4",
            venue: "Venue 4",
            location: "Location 4",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor efficitur leo quis molestie.",
        },
        {
            year: "2023",
            role: "Role 5",
            venue: "Venue 5",
            location: "Location 5",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor efficitur leo quis molestie.",
        },
        {
            year: "2022",
            role: "Role 6",
            venue: "Venue 6",
            location: "Location 6",
            details:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor efficitur leo quis molestie.",
        },
    ];

    return (
        <section
            id="experience"
            className="relative bg-background px-6 py-24 md:px-24"
        >
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 border-b border-primary pb-4">
                    <h2 className="font-display text-4xl font-semibold tracking-tighter uppercase md:text-6xl">
                        Professional Experience
                    </h2>
                </div>

                <div className="space-y-16">
                    {experiences.map((exp, index) => (
                        <ExperienceItem
                            key={index}
                            href={exp.href}
                            index={index}
                        >
                            <motion.div className="absolute top-0 -left-[9px] h-4 w-4 rounded-full border-2 border-primary/30 bg-background transition-all duration-300 group-hover:bg-primary" />

                            <div className="grid gap-8 md:grid-cols-3">
                                <div className="font-mono text-xs tracking-widest uppercase opacity-50 transition-opacity group-hover:opacity-100">
                                    {exp.year}
                                </div>

                                <div>
                                    <h3 className="font-display mb-1 flex items-center gap-2 text-2xl font-bold uppercase md:text-3xl">
                                        {exp.role}
                                        {exp.href && (
                                            <ArrowUpRight className="opacity-25 transition-opacity group-hover:opacity-100" />
                                        )}
                                    </h3>
                                    <p className="font-mono text-sm uppercase">
                                        {exp.venue}
                                    </p>
                                    <p className="font-mono text-xs uppercase opacity-60">
                                        {exp.location}
                                    </p>
                                </div>

                                <div className="font-mono text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                                    {exp.details}
                                </div>
                            </div>
                        </ExperienceItem>
                    ))}
                </div>
            </div>
        </section>
    );
}
