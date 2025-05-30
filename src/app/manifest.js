export default function manifest() {
  return {
    name: "Webitya LMS - Learning Management System",
    short_name: "Webitya LMS",
    description: "A comprehensive learning platform for modern education",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3b82f6",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["education", "productivity"],
    lang: "en",
    dir: "ltr",
  }
}
