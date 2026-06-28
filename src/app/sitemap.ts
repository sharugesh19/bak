import { MetadataRoute } from "next";
import cakesData from "@/data/cakes.json";
import blogData from "@/data/blog.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.anahcakes.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/catalog",
    "/custom-order",
    "/gallery",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Catalog detail routes
  const catalogRoutes = cakesData.map((cake) => ({
    url: `${baseUrl}/catalog/${cake.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog detail routes
  const blogRoutes = blogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Locality landing pages
  const localityRoutes = ["rs-puram", "peelamedu", "gandhipuram"].map((loc) => ({
    url: `${baseUrl}/delivery/${loc}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...catalogRoutes, ...blogRoutes, ...localityRoutes];
}
