export const generateMetadata = ({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
  url,
  type = "website",
}) => {
  const siteName = "Webitya LMS"
  const fullTitle = title ? `${title} | ${siteName}` : siteName
  const fullUrl = url ? `${process.env.NEXT_PUBLIC_APP_URL}${url}` : process.env.NEXT_PUBLIC_APP_URL

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export const structuredData = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Webitya LMS",
    url: process.env.NEXT_PUBLIC_APP_URL,
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    sameAs: ["https://twitter.com/webitya", "https://linkedin.com/company/webitya", "https://facebook.com/webitya"],
  },

  course: (course) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {
      "@type": "Organization",
      name: "Webitya LMS",
    },
    instructor: {
      "@type": "Person",
      name: course.instructor,
    },
    offers: {
      "@type": "Offer",
      price: course.price,
      priceCurrency: "USD",
    },
  }),
}
