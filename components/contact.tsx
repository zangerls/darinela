"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

const EMAIL = "email@email.com";
const INSTAGRAM_URL = "https://instagram.com/user";
const YOUTUBE_URL = "https://youtube.com/@user";

export function Contact() {
    const t = useTranslations("Contact");
    return (
        <section
            id="contact"
            className="relative border-t border-border bg-background px-6 py-24 md:px-24 md:py-32"
        >
            <div className="mx-auto max-w-6xl">
                <div className="mb-20 flex items-end justify-between border-b border-primary pb-4 md:mb-28">
                    <h2 className="text-4xl font-semibold tracking-tighter uppercase md:text-6xl">
                        {t("heading")}
                    </h2>
                </div>

                <motion.a
                    href={`mailto:${EMAIL}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="group block"
                    data-clickable
                >
                    <p className="mb-4 font-mono text-xs tracking-widest text-muted-foreground uppercase">
                        {t("subHeading")}
                    </p>
                    <h3 className="text-2xl leading-none font-bold tracking-tighter break-all transition-colors duration-300 group-hover:text-primary md:text-6xl">
                        <span className="italic">{EMAIL.split("@")[0]}</span>
                        <span>@{EMAIL.split("@")[1]}</span>
                    </h3>
                </motion.a>

                <div className="mt-8 grid gap-12 border-t border-border pt-12 md:grid-cols-3 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="mb-3 border-b border-primary pb-1 font-mono text-xs tracking-widest uppercase">
                            {t("social")}
                        </h4>
                        <ul className="space-y-2 font-mono text-sm uppercase">
                            <li>
                                <a
                                    href={INSTAGRAM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 transition-opacity hover:opacity-60"
                                    data-clickable
                                >
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={YOUTUBE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-2 transition-opacity hover:opacity-60"
                                    data-clickable
                                >
                                    <span>Youtube</span>
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="mb-3 border-b border-primary pb-1 font-mono text-xs tracking-widest uppercase">
                            {t("share")}
                        </h4>
                        <button
                            type="button"
                            onClick={() => {
                                if (typeof window !== "undefined") {
                                    void navigator.clipboard?.writeText(
                                        window.location.href
                                    );
                                }
                            }}
                            className="group inline-flex items-center gap-2 font-mono text-sm uppercase transition-opacity hover:opacity-60"
                            data-clickable
                        >
                            <span>Portfolio</span>
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="md:text-right"
                    >
                        <h4 className="mb-3 border-b border-primary pb-1 font-mono text-xs tracking-widest uppercase">
                            {t("location.basedIn")}
                        </h4>
                        <p className="font-mono text-sm uppercase">
                            {t("location.city")}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground uppercase">
                            {t("location.country")}
                        </p>
                    </motion.div>
                </div>

                <div className="mt-24 flex flex-col items-start justify-between gap-4 font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase md:flex-row md:items-end md:gap-0">
                    <span>Darinela Vangelova</span>
                    <span>
                        © {new Date().getFullYear()} - All rights reserved
                    </span>
                </div>
            </div>
        </section>
    );
}
