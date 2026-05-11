import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const baseUrl = "https://darinela.com";

const routes = ["/", "/achievements"];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.flatMap((route) =>
        routing.locales.map((locale) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
        }))
    );
}
