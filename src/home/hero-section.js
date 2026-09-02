"use client";

import { useState, useEffect, useRef, Component } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    src: "/img/banner-1.png",
    alt: "Natural Ayurvedic Products – Free Shipping Above Rs1000",
  },
  {
    src: "/img/banner-2.png",
    alt: "Boost Immunity with Herbal Ayurvedic Supplements",
  },
  { src: "/img/banner-3.png", alt: "Trusted Ayurvedic Brands – Shop Now" },
];

/* ── Fallback: SSR + carousel error dono ke liye ── */
function FallbackBanner() {
  return (
    <section aria-label="Hero Banner">
      <Link href="/products">
        <div className="relative w-full aspect-[21/9] min-h-[200px]">
          <Image
            src={slides[0].src}
            alt={slides[0].alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </Link>
    </section>
  );
}

/* ── React Error Boundary (class component — React requirement) ── */
class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError?.();
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/* ── Main HeroSection ── */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [carouselFailed, setFailed] = useState(false);
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || carouselFailed) return <FallbackBanner />;

  return (
    <section aria-label="Hero Banner">
      <h1 className="sr-only">
        Natural &amp; Herbal Ayurvedic Products – Free Shipping Above Rs1000
      </h1>

      <ErrorBoundary onError={() => setFailed(true)}>
        <Carousel
          className="w-full"
          opts={{ loop: true }}
          plugins={[autoplay.current]}
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-0 basis-full">
                <Link href="/products">
                  <div className="relative w-full   ">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      width={1000}
                      height={1000}
                      priority={index === 0}
                      className=" w-full object-center"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </ErrorBoundary>
    </section>
  );
}
