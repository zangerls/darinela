import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { hasLocale, type Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { YearNav } from "./year-nav";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale: rawLocale } = await params;
    const locale = (
        hasLocale(routing.locales, rawLocale)
            ? rawLocale
            : routing.defaultLocale
    ) as Locale;

    const t = await getTranslations({ locale, namespace: "AchievementsPage" });
    const tMeta = await getTranslations({ locale, namespace: "Metadata" });

    const title = `${t("title")} · ${tMeta("title")}`;
    const description = t("intro");

    return {
        title,
        description,
        alternates: {
            canonical: `/${locale}/achievements`,
            languages: {
                en: "/en/achievements",
                de: "/de/achievements",
                bg: "/bg/achievements",
            },
        },
        openGraph: {
            title,
            description,
            url: `https://darinela.com/${locale}/achievements`,
            siteName: "Darinela Vangelova",
            locale,
            type: "website",
            images: [
                {
                    url: "https://darinela.com/og.png",
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ["https://darinela.com/og.png"],
        },
    };
}

type Achievement = {
    competition: string;
    prizes: string[];
    year: number;
    city?: string;
    country?: string;
};

const sectionId = (year: number) => `year-${year}`;

function formatLocation(
    city: string | undefined,
    country: string | undefined
): string | null {
    if (!city && !country) return null;
    if (city && country) return `${city} • ${country}`;
    if (!city) return country!;
    return city;
}

export default async function AchievementsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale: rawLocale } = await params;
    const locale = (
        hasLocale(routing.locales, rawLocale)
            ? rawLocale
            : routing.defaultLocale
    ) as Locale;

    const t = await getTranslations({ locale, namespace: "AchievementsPage" });
    const format = await getFormatter({ locale });

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

    const titleId = "achievements-page-title";

    const tally = [
        { key: "awards", label: t("tally.awards"), value: achievements.length },
        { key: "cities", label: t("tally.cities"), value: uniqueCityCount },
        { key: "years", label: t("tally.years"), value: years.length },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white [@supports(min-height:100dvh)]:min-h-dvh">
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

                        <YearNav
                            years={years}
                            onThisPageLabel={t("onThisPage")}
                            yearNavLabel={t("yearNavLabel")}
                        />
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
