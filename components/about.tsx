"use client";

import Image from "next/image";
import { motion } from "motion/react";

export function About() {
    return (
        <section
            id="about"
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
                        src="/IMG_1968.webp"
                        alt="Portrait of Darinela Vangelova"
                        width={1200}
                        height={1600}
                        className="max-h-[80vh] w-full object-cover saturate-80"
                    />
                </motion.div>

                <div className="absolute top-12 -left-12 z-0 hidden h-full w-full border border-primary/30 md:block" />
            </div>

            <div className="order-1 flex flex-col gap-8 md:pl-12 lg:order-2">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="font-display text-4xl font-semibold tracking-tighter uppercase md:text-5xl xl:text-6xl">
                        Lorem ipsum <br />
                        <span className="font-light italic">
                            dolor sit amet
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="space-y-6 text-justify font-mono text-sm leading-relaxed text-muted-foreground md:text-base"
                >
                    <p>
                        Pellentesque eget nisl maximus magna mattis varius eu ac
                        sem. Morbi convallis dignissim tellus vel malesuada.
                        Nunc blandit dui id purus egestas, ac tempus magna
                        egestas. Pellentesque facilisis eget orci vel ultrices
                    </p>
                    <p>
                        Donec aliquet dui lectus. Orci varius natoque penatibus
                        et magnis dis parturient montes, nascetur ridiculus mus.
                        Mauris pharetra mauris eget diam venenatis venenatis.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-8 pt-8 font-mono text-xs tracking-widest">
                    <div>
                        <h4 className="mb-2 border-b border-primary pb-1 uppercase">
                            Title A
                        </h4>
                        <p className="uppercase">Description A</p>
                    </div>
                    <div>
                        <h4 className="mb-2 border-b border-primary pb-1 uppercase">
                            Title B
                        </h4>
                        <p className="uppercase">Description B</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
