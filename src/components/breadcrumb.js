"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Breadcrumb({ current, bgImage }) {
  const ref = useRef(null);

  // Default image if not provided
  const defaultImage = "/img/breadcrumb.png";
  const background = bgImage || defaultImage;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      ref={ref}
      className="relative h-[300px] flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div
          className="h-[120%] w-full bg-cover bg-bottom"
          style={{
            backgroundImage: `url(${background})`,
          }}
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center text-white space-y-4">
        <h1 className="text-5xl md:text-6xl font-serif  capitalize">
          {current}
        </h1>

        <nav className="flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>

          <span className="text-gray-400">»</span>

          <span className="text-white font-medium">{current}</span>
        </nav>
      </div>
    </section>
  );
}
