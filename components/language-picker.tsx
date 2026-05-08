"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguagePicker() {
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
        <div className="flex gap-3 uppercase">
            {routing.locales.map((l) => {
                const isActive = l === locale;
                return (
                    <button
                        key={l}
                        type="button"
                        onClick={() => selectLocale(l)}
                        disabled={isPending}
                        className={`pointer-events-auto cursor-pointer text-xs uppercase transition-opacity hover:opacity-100 ${
                            isActive ? "opacity-100" : "opacity-50"
                        }`}
                    >
                        {l}
                    </button>
                );
            })}
        </div>
    );
}
