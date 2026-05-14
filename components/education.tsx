"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

type Education = {
    year: string;
    institution: string;
    location: string;
    focus: string;
    href: string;
};

export function Education() {
    const t = useTranslations("Education");

    const education: Education[] = [
        {
            year: t("schools.mdw.year"),
            institution: t("schools.mdw.instiution"),
            location: t("schools.mdw.location"),
            focus: t("schools.mdw.focus"),
            href: "https://www.mdw.ac.at/",
        },
        {
            year: t("schools.vecchiTonelli.year"),
            institution: t("schools.vecchiTonelli.instiution"),
            location: t("schools.vecchiTonelli.location"),
            focus: t("schools.vecchiTonelli.focus"),
            href: "https://www.vecchitonelli.it/",
        },
        {
            year: t("schools.pancho.year"),
            institution: t("schools.pancho.instiution"),
            location: t("schools.pancho.location"),
            focus: t("schools.pancho.focus"),
            href: "https://nma.bg/en/",
        },
    ];

    return (
        <section
            id="education"
            aria-labelledby="education-heading"
            className="relative overflow-hidden bg-foreground px-6 py-24 text-background md:px-24"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-0 h-96 w-96 -translate-y-1/2 opacity-5"
            >
                <div className="h-full w-full rounded-full border-[50px] border-background" />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="mb-16 border-b border-background/20 pb-4">
                    <h2
                        id="education-heading"
                        className="text-4xl font-semibold tracking-tighter uppercase md:text-6xl"
                    >
                        {t("heading")}
                    </h2>
                </div>

                <ul className="grid list-none gap-8 p-0 md:grid-cols-2 md:gap-12">
                    {education.map((edu, index) => (
                        <li key={index}>
                            <motion.a
                                data-clickable
                                href={edu.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="group relative block h-full border border-background/20 p-8 transition-all duration-300 hover:bg-background/10"
                            >
                                <div className="mb-4 font-mono text-xs tracking-widest uppercase opacity-60 duration-300 group-hover:opacity-100">
                                    {edu.year}
                                </div>

                                <h3 className="mb-2 text-xl font-bold uppercase md:text-2xl">
                                    {edu.institution}
                                </h3>

                                <p className="mb-4 font-mono text-xs tracking-widest uppercase opacity-60">
                                    {edu.location}
                                </p>

                                <p className="font-mono text-sm text-muted-foreground italic">
                                    {edu.focus}
                                </p>

                                <div
                                    aria-hidden="true"
                                    className="absolute top-0 right-0 h-full w-1 bg-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
                                />
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
