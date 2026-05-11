"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Education = {
    year: string;
    degree: string;
    institution: string;
    location: string;
    focus: string;
    href: string;
};

export function Education() {
    const t = useTranslations("Education");

    const education: Education[] = [
        {
            year: "2024 - 2026",
            degree: "Degree 1",
            institution: "Institution 1",
            location: "Location 1",
            focus: "Focus A, Focus B, Focus C",
            href: "https://google.com",
        },
        {
            year: "2024 - 2026",
            degree: "Degree 2",
            institution: "Institution 2",
            location: "Location 2",
            focus: "Focus A, Focus B, Focus C",
            href: "https://google.com",
        },
        {
            year: "2024 - 2026",
            degree: "Degree 3",
            institution: "Institution 3",
            location: "Location 3",
            focus: "Focus A, Focus B, Focus C",
            href: "https://google.com",
        },
    ];

    return (
        <section
            id="education"
            className="relative overflow-hidden bg-foreground px-6 py-24 text-background md:px-24"
        >
            <div className="pointer-events-none absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 opacity-5">
                <div className="h-full w-full rounded-full border-[50px] border-background" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-16 border-b border-background/20 pb-4">
                    <h2 className="text-4xl font-semibold tracking-tighter uppercase md:text-6xl">
                        {t("heading")}
                    </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    {education.map((edu, index) => (
                        <motion.a
                            data-clickable
                            key={index}
                            href={edu.href}
                            target="_blank"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative border border-background/20 p-8 transition-all duration-300 hover:bg-background/10"
                        >
                            <div className="mb-4 font-mono text-xs tracking-widest uppercase opacity-60 duration-300 group-hover:opacity-100">
                                {edu.year}
                            </div>

                            <h3 className="mb-2 text-xl font-bold uppercase md:text-2xl">
                                {edu.degree}
                            </h3>

                            <div className="mb-4 font-mono text-sm">
                                <p className="font-bold uppercase">
                                    {edu.institution}
                                </p>
                                <p className="font-mono text-xs tracking-widest uppercase opacity-60">
                                    {edu.location}
                                </p>
                            </div>

                            <p className="font-mono text-sm text-muted-foreground italic">
                                {edu.focus}
                            </p>

                            <div className="absolute top-0 right-0 h-full w-1 bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
