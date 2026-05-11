"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const t = useTranslations("ThemeToggle");
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";
    const label = isDark ? t("switchLabel.toLight") : t("switchLabel.toDark");

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="pointer-events-auto cursor-pointer text-left text-xs uppercase transition-opacity"
        >
            {label}
        </button>
    );
}
