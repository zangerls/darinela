import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { LenisProvider } from "@/providers/lenis-provider";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    let { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        locale = "en";
    }

    const t = await getTranslations({
        locale: locale as Locale,
        namespace: "Metadata",
    });

    return {
        title: t("title"),
        description: t("description"),
        metadataBase: new URL("https://darinela.com"),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: "/en",
                de: "/de",
                bg: "/bg",
            },
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: `https://darinela.com/${locale}`,
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
            title: t("title"),
            description: t("description"),
            images: ["https://darinela.com/og.png"],
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                geist.variable
            )}
        >
            <body>
                <NextIntlClientProvider>
                    <LenisProvider>
                        <ThemeProvider>{children}</ThemeProvider>
                    </LenisProvider>
                </NextIntlClientProvider>
                <Analytics />
            </body>
        </html>
    );
}
