import Head from "next/head";

const SEO = ({ title, description, keywords, image, url }) => {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Your Name or Company" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

SEO.defaultProps = {
  title: "Default Title",
  description: "Default description for the webpage.",
  keywords: "default, keywords, for, webpage",
  image: "/default-image.png", // Replace with a default image path
  url: "https://yourwebsite.com", // Replace with your website URL
};

export default SEO;
