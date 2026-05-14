"use client";

import { Link } from "@/i18n/navigation";
import { HoverExpand } from "./hover-expand";
import { useFormatter, useTranslations } from "next-intl";
import { Button } from "./ui/button";

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

                        <Button
                            asChild
                            className="tracking-wide uppercase"
                            size="lg"
                        >
                            <Link
                                data-clickable
                                href="/achievements"
                                data-testid="link-view-all-achievements"
                            >
                                {t("allAwardsBtn")}
                            </Link>
                        </Button>
                    </div>

                    <HoverExpand
                        items={achievements.map((x) => ({
                            image: x.image,
                            label: x.competition,
                            sublabel: `${x.location}, ${x.date}`,
                            description: format.list(x.result),
                        }))}
                    />
                </div>
            </div>
        </section>
    );
}
