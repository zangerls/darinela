"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";

const images: string[] = ["/IMG_1901.jpeg", "/IMG_1840.jpeg", "/IMG_1799.jpeg"];

type Coords = {
    x: number;
    y: number;
};

export function Hero() {
    const t = useTranslations("Hero");
    const tName = useTranslations("_Name");
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState<Coords>({ x: 0, y: 0 });
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yImage = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -15]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 0]);
    const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const x1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const x3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const yStack = useTransform(scrollYProgress, [0, 1], [0, 80]);

    function handleMouseMove(e: React.MouseEvent) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        setMousePosition({ x, y });
    }

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            aria-labelledby="hero-name"
            className="relative flex h-dvh min-h-[500px] items-center justify-center overflow-hidden bg-background"
        >
            <motion.div
                style={{
                    y: yImage,
                    x: mousePosition.x,
                    rotateY: mousePosition.x / 2,
                }}
                className="perspective-1000 relative z-10 aspect-[3/4] w-full max-w-md md:aspect-square md:max-w-xl"
            >
                <motion.div
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute inset-[-10%] z-0 rounded-full border border-primary/10"
                >
                    <div className="absolute top-0 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
                </motion.div>

                <div className="relative flex h-full w-full items-center justify-center">
                    <motion.div
                        className="group absolute aspect-[3/4] w-[70vw] overflow-hidden rounded-xl md:w-[380px] lg:w-[450px]"
                        style={{ rotate: rotate1, x: x1, y: yStack, zIndex: 1 }}
                        initial={{ clipPath: "inset(100% 0 0 0)" }}
                        animate={{ clipPath: "inset(0 0 0 0)" }}
                        transition={{
                            duration: 1,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 z-20 bg-primary/10 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent"
                        />
                        <Image
                            src={images[0]}
                            alt={t("imageAlt")}
                            fill
                            priority
                            sizes="(min-width: 1024px) 450px, (min-width: 768px) 380px, 70vw"
                            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                    </motion.div>

                    <motion.div
                        className="group absolute aspect-[3/4] w-[70vw] overflow-hidden rounded-xl md:w-[380px] lg:w-[450px]"
                        style={{ rotate: rotate2, y: yStack, zIndex: 2 }}
                        initial={{ clipPath: "inset(100% 0 0 0)" }}
                        animate={{ clipPath: "inset(0 0 0 0)" }}
                        transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 z-20 bg-primary/10 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent"
                        />
                        <Image
                            src={images[1]}
                            alt={t("imageAlt")}
                            fill
                            priority
                            sizes="(min-width: 1024px) 450px, (min-width: 768px) 380px, 70vw"
                            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                    </motion.div>

                    <motion.div
                        className="group absolute aspect-[3/4] w-[70vw] overflow-hidden rounded-xl md:w-[380px] lg:w-[450px]"
                        style={{ rotate: rotate3, x: x3, y: yStack, zIndex: 3 }}
                        initial={{ clipPath: "inset(100% 0 0 0)" }}
                        animate={{ clipPath: "inset(0 0 0 0)" }}
                        transition={{
                            duration: 1,
                            delay: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 z-20 bg-primary/10 mix-blend-multiply transition-colors duration-700 group-hover:bg-transparent"
                        />
                        <Image
                            src={images[2]}
                            alt={t("imageAlt")}
                            fill
                            priority
                            sizes="(min-width: 1024px) 450px, (min-width: 768px) 380px, 70vw"
                            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                    </motion.div>
                </div>

                <motion.div
                    aria-hidden="true"
                    animate={{ y: [0, 30, 0] }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute -bottom-8 -left-8 z-30 hidden h-48 w-48 rounded-full border border-primary/20 mix-blend-difference md:block"
                />
            </motion.div>

            <div className="absolute bottom-24 left-6 z-40 md:bottom-32 md:left-24">
                <motion.h1
                    id="hero-name"
                    initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="text-5xl leading-[0.8] font-bold uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
                >
                    {tName("first")}
                    <br />
                    <span className="ml-12 font-light uppercase italic">
                        {tName("last")}
                    </span>
                </motion.h1>
            </div>

            <div
                aria-hidden="true"
                className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 text-white mix-blend-difference"
            >
                <span className="animate-pulse font-mono text-xs tracking-widest uppercase">
                    {t("scrollIndicator")}
                </span>
                <div className="h-8 w-[1px] bg-white/50 md:h-10"></div>
            </div>
        </section>
    );
}
