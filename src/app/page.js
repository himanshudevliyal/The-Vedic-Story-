import StatsSection from "@/home/stats-section";
import HeroSection from "@/home/hero-section";
import TrendingProducts from "@/home/trending-products";
import AyurvedicSection from "@/home/why-choose";
import FAQ from "@/home/faq";
import Reviews from "@/home/reviews";
import FeaturesSection from "@/home/features";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      {/* <CategoryBar /> */}
      <FeaturesSection />

      <TrendingProducts />
      <AyurvedicSection />
      {/* <ReelsCarousel></ReelsCarousel> */}
      <Reviews />
      {/* <BlogSection /> */}
      <FAQ />
    </>
  );
}
