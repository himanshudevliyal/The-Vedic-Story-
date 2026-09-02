"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";

import {
  HeartHandshake,
  Milk,
  RotateCcw,
  Flame,
  HandHeart,
  GlassWater,
} from "lucide-react";

const features = [
  // LEFT
  {
    icon: HeartHandshake,
    title: "Ahimsa First Philosophy",
    description:
      "Our Gir cows are cared for with compassion, with the calf given priority before milking.",
    accent: "#9A6B32",
    position: "left",
  },

  {
    icon: Milk,
    title: "Pure A2 Gir Cow Milk",
    description:
      "Made using carefully sourced A2 milk from Gir cows raised with a focus on natural and responsible care.",
    accent: "#7A9E7E",
    position: "left",
  },

  {
    icon: RotateCcw,
    title: "Traditional Bilona Churning",
    description:
      "Whole curd is churned using the traditional wooden Bilona method—slowly and in both directions.",
    accent: "#B07D5A",
    position: "left",
  },

  // RIGHT
  {
    icon: Flame,
    title: "Slow-Fire Preparation",
    description:
      "The cultured butter is gently heated over a slow fire to develop its characteristic golden texture and rich aroma.",
    accent: "#C28B45",
    position: "right",
  },

  {
    icon: HandHeart,
    title: "Handcrafted in Small Batches",
    description:
      "Prepared in controlled small batches instead of relying on high-speed mass-production methods.",
    accent: "#8B6B3D",
    position: "right",
  },

  {
    icon: GlassWater,
    title: "Packed in Glass, Not Plastic",
    description:
      "Finished ghee is carefully packed in food-grade glass jars for clean, convenient storage.",
    accent: "#6F8F7A",
    position: "right",
  },
];

const Mandala = () => (
  <svg
    viewBox="0 0 200 200"
    className="absolute inset-0 w-full h-full opacity-[0.06] animate-[spin_60s_linear_infinite]"
  >
    {[0, 30, 60, 90, 120, 150].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <ellipse cx="100" cy="60" rx="4" ry="14" fill="#8B6B3D" />
        <ellipse cx="100" cy="40" rx="2" ry="8" fill="#8B6B3D" />
        <circle cx="100" cy="30" r="3" fill="#8B6B3D" />
      </g>
    ))}
    {[0, 45, 90, 135].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <rect x="98" y="20" width="4" height="20" rx="2" fill="#8B6B3D" />
      </g>
    ))}
    <circle
      cx="100"
      cy="100"
      r="60"
      fill="none"
      stroke="#8B6B3D"
      strokeWidth="0.5"
      strokeDasharray="4 6"
    />
    <circle
      cx="100"
      cy="100"
      r="45"
      fill="none"
      stroke="#8B6B3D"
      strokeWidth="0.5"
    />
    <circle
      cx="100"
      cy="100"
      r="18"
      fill="none"
      stroke="#8B6B3D"
      strokeWidth="1"
    />
    <circle cx="100" cy="100" r="8" fill="#8B6B3D" />
  </svg>
);

export default function FeaturesSection() {
  const leftFeatures = features.filter((f) => f.position === "left");
  const rightFeatures = features.filter((f) => f.position === "right");

  return (
    <Section className="relative overflow-hidden px-4  bg-white">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background decorative orbs */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #d4a96a 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-10 h-80 w-80 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #c4856a 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <SectionHeading
        badge="The Vedic Way"
        title="Rooted in Tradition, "
        highlight="Crafted for Purity"
        des={
          <>
            From ethical Gir cow care to the traditional Bilona process, every
            step reflects our commitment to purity, patience and authentic ghee
            making.
          </>
        }
        className="mb-14 text-center"
        titleClassName="text-4xl"
      />
      <div className="grid  gap-8 md:grid-cols-[1fr_auto_1fr] items-center ">
        <div className="flex flex-col gap-10">
          {leftFeatures.map((feature, i) => (
            <FeatureCard key={i} feature={feature} align="left" index={i} />
          ))}
        </div>

        {/* Center bottle */}
        <div
          className="relative mx-auto flex items-center justify-center grid-cols-2"
          style={{ width: 280, minHeight: 520 }}
        >
          {/* Mandala behind bottle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[460px] w-[460px]">
              <Mandala />
            </div>
          </div>

          {/* Glow pool */}
          <div
            className="absolute bottom-4 left-1/2 h-28 w-80 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, #d4a96a60 0%, transparent 70%)",
            }}
          />

          {/* Ring */}
          <div
            className="absolute inset-8 rounded-full border-2 opacity-20"
            style={{ borderColor: "#c9a96e", borderStyle: "dashed" }}
          />

          <Image
            src="/img/vedic-ghee.png"
            alt="Deep Nourishing Treatment"
            width={240}
            height={400}
            className="relative z-10  rounded-2xl  w-full min-h-[500px]  "
          />
        </div>

        {/* Right features */}
        <div className="flex flex-col gap-10">
          {rightFeatures.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              align="right"
              index={i}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({ feature, align, index }) {
  const Icon = feature.icon;
  const isRight = align === "right";

  return (
    <div
      className={`group flex flex-col gap-3 ${
        isRight ? "items-end text-right" : "items-start text-left"
      }`}
    >
      {/* Tag pill */}
      {/* <span
        className="rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
        style={{
          background: `${feature.accent}15`,
          color: feature.accent,
          border: `1px solid ${feature.accent}30`,
          fontFamily: "'Georgia', serif",
        }}
      >
        {feature.tag}
      </span> */}

      {/* Icon + Title row */}
      <div
        className={`flex items-center gap-3 ${
          isRight ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${feature.accent}18`,
            border: `1.5px solid ${feature.accent}30`,
          }}
        >
          <Icon
            className="h-4.5 w-4.5"
            style={{ color: feature.accent }}
            size={18}
          />
        </div>
      </div>
      <h3 className="text-xl font-semibold leading-tight ">{feature.title}</h3>
      {/* Description */}
      <p
        className="lg:max-w-[350px] text-sm leading-relaxed"
        style={{
          color: "#7a5c3a",
          fontFamily: "'Georgia', serif",
          fontStyle: "italic",
        }}
      >
        {feature.description}
      </p>

      {/* Decorative underline */}
      <div
        className="h-px w-10 transition-all duration-500 group-hover:w-20"
        style={{
          background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
        }}
      />
    </div>
  );
}
