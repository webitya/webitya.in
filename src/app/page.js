import Navbar from "@/Components/Header";
import HomeCarousel from "@/Components/HomeCarousel";
import SEO from "@/Components/SEO";

export default function Home() {
  return (
    <>
      <Navbar/>
      <HomeCarousel/>
      <SEO
        title="Home Page - Your Website"
        description="Welcome to our homepage. Discover our services and products."
        keywords="homepage, services, products"
        image="/images/homepage-banner.jpg"
        url="https://yourwebsite.com"
      />
      <h1>Welcome to the Home Page</h1>
    </>
  );
}
