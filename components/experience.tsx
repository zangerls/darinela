"use client";

import { motion, MotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
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
        <li className="list-none">
            <Component
                data-clickable={!!href}
                {...getMotionProps(index)}
                className="group/item relative block border-l-2 border-primary/30 pb-16 pl-8 transition-colors duration-500 hover:border-primary"
                {...(href
                    ? { href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
            >
                {children}
            </Component>
        </li>
    );
}

export function Experience() {
    const t = useTranslations("Experience");

    const experiences: Experience[] = [
        {
            year: t("experiences.liveMusicNow.date"),
            role: t("experiences.liveMusicNow.role"),
            venue: t("experiences.liveMusicNow.venue"),
            location: t("experiences.liveMusicNow.location"),
            details: t("experiences.liveMusicNow.description"),
            href: "https://livemusicnow-wien.at/",
        },
        {
            year: t("experiences.hanselAndGretel.date"),
            role: t("experiences.hanselAndGretel.role"),
            venue: t("experiences.hanselAndGretel.venue"),
            location: t("experiences.hanselAndGretel.location"),
            details: t("experiences.hanselAndGretel.description"),
        },
        {
            year: t("experiences.rainaKabaivanska.date"),
            role: t("experiences.rainaKabaivanska.role"),
            venue: t("experiences.rainaKabaivanska.venue"),
            location: t("experiences.rainaKabaivanska.location"),
            details: t("experiences.rainaKabaivanska.description"),
            href: "https://rainakabaivanska.net/en/news/xxv-international-masterclass-of-raina-kabaivanska",
        },
        {
            year: t("experiences.youngTalentsNewAcademy.date"),
            role: t("experiences.youngTalentsNewAcademy.role"),
            venue: t("experiences.youngTalentsNewAcademy.venue"),
            location: t("experiences.youngTalentsNewAcademy.location"),
            details: t("experiences.youngTalentsNewAcademy.description"),
        },
        {
            year: t("experiences.idomeneo.date"),
            role: t("experiences.idomeneo.role"),
            venue: t("experiences.idomeneo.venue"),
            location: t("experiences.idomeneo.location"),
            details: t("experiences.idomeneo.description"),
        },
    ];

    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className="relative bg-background px-6 py-24 md:px-24"
        >
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 border-b border-primary pb-4">
                    <h2
                        id="experience-heading"
                        className="text-4xl font-semibold tracking-tighter uppercase md:text-6xl"
                    >
                        {t("heading")}
                    </h2>
                </div>

                <ol className="group/list list-none p-0">
                    {experiences.map((exp, index) => (
                        <ExperienceItem
                            key={index}
                            href={exp.href}
                            index={index}
                        >
                            <motion.div
                                aria-hidden="true"
                                className="absolute top-0 -left-[9px] h-4 w-4 rounded-full border-2 border-primary/30 bg-background transition-all duration-300 group-hover/item:bg-primary"
                            />

                            <div className="grid gap-8 transition-opacity group-hover/item:opacity-100! group-hover/list:opacity-50 md:grid-cols-5 dark:group-hover/list:opacity-30">
                                <div className="font-mono text-xs tracking-widest uppercase opacity-50 transition-opacity group-hover/item:opacity-100 md:col-span-1">
                                    {exp.year}
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="mb-1 flex items-center gap-2 text-2xl font-bold uppercase md:text-3xl">
                                        {exp.role}
                                        {exp.href && (
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className="opacity-25 transition-opacity group-hover/item:opacity-100"
                                            />
                                        )}
                                    </h3>
                                    <p className="font-mono text-sm uppercase">
                                        {exp.venue}
                                    </p>
                                    <p className="font-mono text-xs uppercase opacity-60">
                                        {exp.location}
                                    </p>
                                </div>

                                <div className="font-mono text-sm text-muted-foreground transition-colors duration-300 group-hover/item:text-foreground md:col-span-2">
                                    {exp.details}
                                </div>
                            </div>
                        </ExperienceItem>
                    ))}
                </ol>
            </div>
        </section>
    );
}
