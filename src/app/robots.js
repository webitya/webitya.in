export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://webitya.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/profile/", "/payment/", "/auth/", "/_next/", "/logs/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/profile/", "/payment/", "/auth/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
