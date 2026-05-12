"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LANGUAGE_NAMES: Record<(typeof routing.locales)[number], string> = {
    en: "English",
    de: "Deutsch",
    bg: "Български",
};

export function LanguagePicker() {
    const t = useTranslations("LanguagePicker");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const [isPending, startTransition] = useTransition();

    function selectLocale(nextLocale: (typeof routing.locales)[number]) {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- params shape always matches the current pathname
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }

    return (
        <div
            role="group"
            aria-label={t("groupLabel")}
            className="flex gap-3 uppercase"
        >
            {routing.locales.map((l) => {
                const isActive = l === locale;
                return (
                    <button
                        key={l}
                        type="button"
                        lang={l}
                        onClick={() => selectLocale(l)}
                        disabled={isPending}
                        aria-pressed={isActive}
                        aria-label={t("selectLanguage", {
                            language: LANGUAGE_NAMES[l],
                        })}
                        className={cn(
                            "pointer-events-auto cursor-pointer text-xs uppercase transition-opacity hover:opacity-100",
                            isActive ? "opacity-100" : "opacity-50"
                        )}
                    >
                        {l}
                    </button>
                );
            })}
        </div>
    );
}
