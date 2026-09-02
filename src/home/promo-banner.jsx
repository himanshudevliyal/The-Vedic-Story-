"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function PromoBanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-900 py-20"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Parallax Background */}
      <motion.div style={{ y: y1, scale: 1.1 }} className="absolute inset-0">
        <Image
          src="/img/why-choose.webp"
          width={1200}
          height={800}
          className="h-full w-full object-cover"
          alt="Ayurvedic wellness background"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-white">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <Leaf className="h-12 w-12 text-green-300 animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-4xl md:text-5xl font-bold font-serif">
            Embrace the Power of Ayurveda
          </h2>

          {/* Sub text */}
          <p className="mb-10 text-lg md:text-2xl text-white/90">
            Experience natural healing with{" "}
            <span className="font-semibold text-green-300">
              authentic Ayurvedic medicines<br></br>
            </span>{" "}
            — now with a special wellness offer
          </p>

          {/* Highlights */}

          {/* CTA */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="rounded-full bg-primary/200 px-10 py-3 text-lg font-semibold text-white transition hover:bg-green-400">
              Explore Ayurvedic Products
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
