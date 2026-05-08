import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { LenisProvider } from "@/providers/lenis-provider";
import { ReactNode } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                fontMono.variable,
                "font-sans",
                geist.variable
            )}
        >
            <body>
                <LenisProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </LenisProvider>
            </body>
        </html>
    );
}
