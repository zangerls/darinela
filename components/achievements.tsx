"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { HoverExpand } from "./hover-expand";
import { useFormatter, useTranslations } from "next-intl";

type Achievement = {
    date: number;
    location: string;
    competition: string;
    result: string[];
    image: string;
};

export function Achievements() {
    const t = useTranslations("Achievements");
    const tPage = useTranslations("AchievementsPage");
    const format = useFormatter();

    const achievements: Achievement[] = [
        {
            date: 2026,
            competition: tPage("competitions.imcv"),
            location: tPage("cities.vienna"),
            result: [tPage("prizes.first"), tPage("prizes.laureate")],
            image: "/vienna-2.jpg",
        },
        {
            date: 2022,
            competition: tPage("competitions.angelVoiceOnline"),
            location: tPage("countries.serbia"),
            result: [
                tPage("prizes.first"),
                tPage("prizes.laureate"),
                tPage("prizes.grandPrix"),
            ],
            image: "/belgrade.jpg",
        },
        {
            date: 2021,
            competition: tPage("competitions.angelVoice"),
            location: tPage("countries.serbia"),
            result: [tPage("prizes.first")],
            image: "/belgrade-3.jpg",
        },
        {
            date: 2020,
            competition: tPage("competitions.futureStars"),
            location: tPage("countries.italy"),
            result: [tPage("prizes.first")],
            image: "/italy-1.jpg",
        },
    ];

    return (
        <section
            id="acclaim"
            aria-labelledby="acclaim-heading"
            className="relative overflow-hidden bg-background px-6 py-24 md:px-24"
        >
            <div className="relative z-10 mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-16 xl:grid-cols-2">
                    <div className="h-fit md:sticky xl:top-24">
                        <h2
                            id="acclaim-heading"
                            className="mb-8 text-4xl font-semibold tracking-tighter uppercase sm:text-5xl md:text-6xl"
                        >
                            {t("heading")}
                        </h2>
                        <p className="mb-4 text-justify font-mono text-sm text-muted-foreground md:text-base">
                            {t("description")}
                        </p>

                        <Link
                            data-clickable
                            href="/achievements"
                            data-testid="link-view-all-achievements"
                            className="inline-block border border-primary/30 px-6 py-3 font-mono text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                        >
                            {t("allAwardsBtn")}
                        </Link>
                    </div>

                    <HoverExpand
                        items={achievements.map((x) => ({
                            image: x.image,
                            label: x.competition,
                            sublabel: `${x.location}, ${x.date}`,
                            description: format.list(x.result),
                        }))}
                    />

                    <div aria-hidden="true" className="hidden space-y-12">
                        {achievements.map((award, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="group relative border-l border-primary/20 pl-8 transition-colors duration-500 hover:border-primary"
                            >
                                <span className="absolute top-0 -left-[5px] h-[9px] w-[9px] scale-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-100" />

                                <div className="mb-2 font-mono text-xs uppercase opacity-50">
                                    {award.date} - {award.location}
                                </div>
                                <h3 className="group-hover:text-stroke mb-1 text-2xl font-bold uppercase transition-all duration-300 md:text-3xl">
                                    {award.competition}
                                </h3>
                                <Badge>{award.result}</Badge>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
