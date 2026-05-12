"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";

type Achievement = {
    competition: string;
    prizes: string[];
    year: number;
    city?: string;
    country?: string;
};

const sectionId = (year: number) => `year-${year}`;

export default function AchievementsPage() {
    const t = useTranslations("AchievementsPage");
    const format = useFormatter();
    const sectionsRef = useRef<Map<number, HTMLElement>>(new Map());

    const achievements: Achievement[] = [
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.imcv"),
            city: t("cities.vienna"),
            country: t("countries.austria"),
            year: 2026,
        },
        {
            prizes: [t("prizes.first"), t("prizes.laureate")],
            competition: t("competitions.angelVoiceOnline"),
            city: t("cities.belgrade"),
            country: t("countries.serbia"),
            year: 2022,
        },
        {
            prizes: [t("prizes.third")],
            competition: t("competitions.balkanRomansiada"),
            city: t("cities.sofia"),
            country: t("countries.bulgaria"),
            year: 2021,
        },
        {
            prizes: [
                t("prizes.first"),
                t("prizes.laureate"),
                t("prizes.grandPrix"),
            ],
            competition: t("competitions.angelVoice"),
            city: t("cities.belgrade"),
            country: t("countries.serbia"),
            year: 2021,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.magic14"),
            year: 2021,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.futureStars"),
            country: t("countries.italy"),
            year: 2020,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.belcanto3"),
            city: t("cities.yambol"),
            country: t("countries.bulgaria"),
            year: 2020,
        },
        {
            prizes: [t("prizes.second")],
            competition: t("competitions.varbanVarbanov"),
            city: t("cities.burgas"),
            country: t("countries.bulgaria"),
            year: 2020,
        },
        {
            prizes: [t("prizes.second")],
            competition: t("competitions.flyingStage"),
            year: 2020,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.hyblaMusic"),
            city: t("cities.ragusaSicily"),
            country: t("countries.italy"),
            year: 2020,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.wienMelody"),
            city: t("cities.vienna"),
            country: t("countries.austria"),
            year: 2020,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.tatraOfStars"),
            country: t("countries.slovenia"),
            year: 2020,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.schubert"),
            city: t("cities.ruse"),
            country: t("countries.bulgaria"),
            year: 2019,
        },
        {
            prizes: [t("prizes.first"), t("prizes.grandPrix")],
            competition: t("competitions.belcanto2"),
            city: t("cities.yambol"),
            country: t("countries.bulgaria"),
            year: 2019,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.artStars"),
            city: t("cities.varna"),
            country: t("countries.bulgaria"),
            year: 2019,
        },
        {
            prizes: [t("prizes.third")],
            competition: t("competitions.magic13"),
            year: 2019,
        },
        {
            prizes: [t("prizes.first")],
            competition: t("competitions.vivaVoce"),
            city: t("cities.sofia"),
            country: t("countries.bulgaria"),
            year: 2018,
        },
    ];

    const uniqueCityCount = new Set(
        achievements.map((a) => a.city).filter(Boolean)
    ).size;

    const grouped = achievements.reduce<Record<number, Achievement[]>>(
        (acc, item) => {
            (acc[item.year] ??= []).push(item);
            return acc;
        },
        {}
    );

    const years = Object.keys(grouped)
        .map(Number)
        .sort((a, b) => b - a);

    const [activeYear, setActiveYear] = useState<number>(years[0]);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.target.getBoundingClientRect().top -
                            b.target.getBoundingClientRect().top
                    );
                if (visible[0]) {
                    const year = Number(
                        (visible[0].target as HTMLElement).dataset.year
                    );
                    if (!Number.isNaN(year)) setActiveYear(year);
                }
            },
            { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
        );

        sectionsRef.current.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        year: number
    ) => {
        e.preventDefault();
        const el = sectionsRef.current.get(year);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const titleId = "achievements-page-title";

    const tally = [
        { key: "awards", label: t("tally.awards"), value: achievements.length },
        { key: "cities", label: t("tally.cities"), value: uniqueCityCount },
        { key: "years", label: t("tally.years"), value: years.length },
    ];

    function formatLocation(
        city: string | undefined,
        country: string | undefined
    ): string | null {
        if (!city && !country) return null;
        if (city && country) return `${city} • ${country}`;
        if (!city) return country!;
        return city;
    }

    return (
        <div className="min-h-dvh bg-background text-foreground selection:bg-black selection:text-white">
            <div className="sticky top-0 z-30 border-b border-primary/10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-24">
                    <Link
                        data-clickable
                        href="/#acclaim"
                        aria-label={t("backToAcclaimAria")}
                        className="group inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase transition-colors duration-300 hover:text-primary"
                    >
                        <ArrowLeft aria-hidden="true" size={14} />
                        {t("backToAcclaim")}
                    </Link>
                    <span className="hidden font-mono text-xs tracking-widest uppercase opacity-50 sm:inline">
                        {t("entriesCount", { count: achievements.length })}
                    </span>
                </div>
            </div>

            <main
                aria-labelledby={titleId}
                className="relative px-6 py-16 md:px-24 md:py-24"
            >
                <div className="mx-auto max-w-6xl">
                    <header className="mb-16 border-b border-primary/20 pb-8 md:mb-20">
                        <p className="mb-4 font-mono text-xs tracking-widest uppercase opacity-50">
                            {t("eyebrow")}
                        </p>
                        <h1
                            id={titleId}
                            className="mb-6 text-4xl font-semibold tracking-tighter uppercase sm:text-5xl md:text-7xl"
                        >
                            {t("title")}
                        </h1>
                        <p className="max-w-2xl text-justify font-mono text-sm text-muted-foreground md:text-base">
                            {t("intro")}
                        </p>
                    </header>

                    <div className="lg:grid lg:grid-cols-[1fr_10rem] lg:gap-16">
                        <div className="min-w-0">
                            <ol className="list-none space-y-20 p-0 md:space-y-24">
                                {years.map((year) => (
                                    <li key={year}>
                                        <section
                                            ref={(el) => {
                                                if (el)
                                                    sectionsRef.current.set(
                                                        year,
                                                        el
                                                    );
                                                else
                                                    sectionsRef.current.delete(
                                                        year
                                                    );
                                            }}
                                            data-year={year}
                                            id={sectionId(year)}
                                            aria-labelledby={`${sectionId(
                                                year
                                            )}-heading`}
                                            className="scroll-mt-24"
                                        >
                                            <div className="mb-8 flex items-baseline gap-6 border-b border-primary/15 pb-4">
                                                <h2
                                                    id={`${sectionId(
                                                        year
                                                    )}-heading`}
                                                    className="text-3xl font-bold tracking-tighter md:text-4xl"
                                                >
                                                    {year}
                                                </h2>
                                                <span className="font-mono text-xs tracking-widest uppercase opacity-50">
                                                    {t("yearAwardsCount", {
                                                        count: grouped[year]
                                                            .length,
                                                    })}
                                                </span>
                                            </div>

                                            <ul className="list-none p-0">
                                                {grouped[year].map((award) => (
                                                    <li
                                                        key={award.competition}
                                                        className="border-b border-primary/10 py-6 last:border-b-0 md:py-8"
                                                    >
                                                        <article className="grid grid-cols-1 gap-1 md:grid-cols-[10rem_1fr] md:gap-8">
                                                            <p className="font-mono text-xs tracking-widest text-primary uppercase md:pt-1">
                                                                {format.list(
                                                                    award.prizes
                                                                )}
                                                            </p>
                                                            <div>
                                                                <h3 className="mb-1 text-lg font-bold uppercase md:text-xl">
                                                                    {
                                                                        award.competition
                                                                    }
                                                                </h3>
                                                                {(award.city ||
                                                                    award.country) && (
                                                                    <p className="font-mono text-xs tracking-widest uppercase opacity-60">
                                                                        {formatLocation(
                                                                            award.city,
                                                                            award.country
                                                                        )}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </article>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <aside
                            aria-label={t("yearNavLabel")}
                            className="hidden lg:block"
                        >
                            <nav className="sticky top-24">
                                <p
                                    id="on-this-page-label"
                                    className="mb-4 font-mono text-xs tracking-widest uppercase opacity-50"
                                >
                                    {t("onThisPage")}
                                </p>
                                <ul
                                    aria-labelledby="on-this-page-label"
                                    className="list-none border-l border-primary/15 p-0"
                                >
                                    {years.map((year) => {
                                        const isActive = year === activeYear;
                                        return (
                                            <li key={year}>
                                                <a
                                                    data-clickable
                                                    href={`#${sectionId(year)}`}
                                                    onClick={(e) =>
                                                        handleNavClick(e, year)
                                                    }
                                                    aria-current={
                                                        isActive
                                                            ? "location"
                                                            : undefined
                                                    }
                                                    className={`relative -ml-px block border-l py-2 pl-4 font-mono text-xs tracking-widest uppercase transition-colors duration-200 ${
                                                        isActive
                                                            ? "border-primary text-primary"
                                                            : "border-transparent text-muted-foreground/60 hover:text-foreground"
                                                    }`}
                                                >
                                                    {year}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </aside>
                    </div>

                    <section
                        aria-label={t("summaryLabel")}
                        className="mt-24 border-t border-primary/15 pt-10 md:mt-32 md:pt-12"
                    >
                        <dl className="flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-16">
                            {tally.map((item) => (
                                <div
                                    key={item.key}
                                    className="flex flex-row-reverse items-baseline gap-3"
                                >
                                    <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                                        {item.label}
                                    </dt>
                                    <dd className="text-2xl font-semibold tracking-tighter md:text-3xl">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <div className="mt-6 flex w-full justify-center">
                        <Button asChild size="lg">
                            <Link
                                data-clickable
                                href="/#acclaim"
                                aria-label={t("backToAcclaimAria")}
                                className="tracking-wide uppercase"
                            >
                                <ArrowLeft aria-hidden="true" />
                                {t("backToAcclaim")}
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
