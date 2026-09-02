import StatsSection from "@/home/stats-section";
// import CategoryBar from "@/home/category-bar";
// import FeaturedProducts from "@/home/featured-products";
import HeroSection from "@/home/hero-section";
import TrendingProducts from "@/home/trending-products";
import AyurvedicSection from "@/home/why-choose";
import BlogSection from "@/home/blog-section";
import FAQ from "@/home/faq";
// import ReelsCarousel from "@/home/instragram";
import Reviews from "@/home/reviews";
import FeaturesSection from "@/home/features";
import Section from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/heading";
import Image from "next/image";
import FeaturedProducts from "@/home/featured-products";
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
