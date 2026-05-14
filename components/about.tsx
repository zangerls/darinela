"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function About() {
    const t = useTranslations("About");

    return (
        <section
            id="about"
            aria-labelledby="about-heading"
            className="grid min-h-[80vh] items-center gap-12 overflow-hidden px-6 py-24 md:px-24 lg:grid-cols-2"
        >
            <div className="relative order-2 lg:order-1">
                <motion.div
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0 0 0)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="relative z-10"
                >
                    <Image
                        src="/IMG_1968.jpeg"
                        alt={t("imageAlt")}
                        width={960}
                        height={1440}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="max-h-[80vh] w-full object-cover brightness-80 saturate-80"
                    />
                </motion.div>

                <div
                    aria-hidden="true"
                    className="absolute top-12 -left-12 z-0 hidden h-full w-full border border-primary/30 md:block"
                />
            </div>

            <div className="order-1 flex flex-col gap-8 md:pl-12 lg:order-2">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2
                        id="about-heading"
                        className="text-4xl font-semibold tracking-tighter uppercase md:text-6xl"
                    >
                        {t("headline.line1")} <br />
                        <span className="font-light italic">
                            {t("headline.line2")}
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="space-y-6 text-justify font-mono text-sm leading-relaxed text-muted-foreground md:text-base"
                >
                    <p>{t("paragraphs.first")}</p>
                    <p>
                        {t.rich("paragraphs.second", {
                            i: (chunks) => (
                                <span className="italic">{chunks}</span>
                            ),
                        })}
                    </p>
                </motion.div>

                <dl className="grid grid-cols-2 gap-8 pt-8 font-mono text-xs tracking-widest">
                    <div>
                        <dt className="mb-2 border-b border-primary pb-1 uppercase">
                            {t("stats.voice.label")}
                        </dt>
                        <dd className="text-muted-foreground uppercase">
                            {t("stats.voice.value")}
                        </dd>
                    </div>
                    <div>
                        <dt className="mb-2 border-b border-primary pb-1 uppercase">
                            {t("stats.studies.label")}
                        </dt>
                        <dd className="text-muted-foreground uppercase">
                            {t("stats.studies.value")}
                        </dd>
                    </div>
                </dl>
            </div>
        </section>
    );
}
