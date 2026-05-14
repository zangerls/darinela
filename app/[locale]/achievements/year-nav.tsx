"use client";

import { useEffect, useState } from "react";

type Props = {
    years: number[];
    onThisPageLabel: string;
    yearNavLabel: string;
};

const sectionId = (year: number) => `year-${year}`;

export function YearNav({ years, onThisPageLabel, yearNavLabel }: Props) {
    const [activeYear, setActiveYear] = useState<number>(years[0]);

    useEffect(() => {
        const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-year]")
        );

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

        sections.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        year: number
    ) => {
        e.preventDefault();
        const el = document.getElementById(sectionId(year));
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <aside aria-label={yearNavLabel} className="hidden lg:block">
            <nav className="sticky top-24">
                <p
                    id="on-this-page-label"
                    className="mb-4 font-mono text-xs tracking-widest uppercase opacity-50"
                >
                    {onThisPageLabel}
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
                                    onClick={(e) => handleNavClick(e, year)}
                                    aria-current={
                                        isActive ? "location" : undefined
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
    );
}
