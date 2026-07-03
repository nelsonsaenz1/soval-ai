import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { SERVICE_PAGES } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = BRAND.url.replace(/\/$/, "");
  const staticPaths = [
    "",
    "/services",
    "/pricing",
    "/quiz",
    "/book",
    "/about",
    "/faq",
    "/privacy",
    "/terms",
  ];

  const servicePaths = SERVICE_PAGES.map((s) => s.href);

  return [...staticPaths, ...servicePaths].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/book" || path === "/quiz" ? 0.9 : 0.7,
  }));
}
