"use client";

import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";
import { ShieldCheck, Heart, Baby } from "lucide-react";

export default function AyurvedicSection() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Zero Hormones & Antibiotics",
      description:
        "Our cows live a peaceful, natural life without synthetic oxytocin or growth hormones.",
    },
    {
      icon: Baby,
      title: "Calves Come First",
      description:
        "A mother cow’s first duty is to her calf. We only harvest the surplus milk after the calf is happily fed.",
    },
    {
      icon: Heart,
      title: "Cared for Life",
      description:
        "Old or non-lactating cows are never sold to slaughterhouses; they stay protected and cared for throughout their natural lifespan.",
    },
  ];

  return (
    <Section className="relative bg-[url('/img/bg-4.png')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#241006]/85" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Heading */}
        <SectionHeading
          title="Ahimsa First: "
          highlight="Honouring the Sacred Cow"
          des={<>The Ahimsa & Cow Welfare Commitment</>}
          className="mb-14 text-center md:text-xl"
          titleClassName="text-4xl text-white"
          desClassName="text-white/80"
        />

        {/* Features Grid */}
        <div className="grid border border-white/20 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  group flex flex-col items-center justify-center
                  gap-5 p-8 text-center
                  border-r border-b border-white/20
                  last:border-r-0
                  hover:bg-[#D8A83E]/10
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D8A83E]/40 bg-[#D8A83E]/10 transition-all duration-300 group-hover:bg-[#D8A83E]/20">
                  <Icon className="h-8 w-8 text-[#D8A83E]" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-3 text-md font-semibold uppercase tracking-wide text-white">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-white/80">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
