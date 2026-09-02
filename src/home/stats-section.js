"use client";

import Section from "@/components/layout/section";
import { Milk, RefreshCw, HeartHandshake, Package } from "lucide-react";
import Image from "next/image";

export default function StatsSection() {
  const stats = [
    {
      icon: Milk,
      value: "100% A2 Gir Cow Milk",
      label: "Sourced from Free-Grazing Gir Cows",
    },
    {
      icon: RefreshCw,
      value: "Bi-Directional Wooden Churned",
      label: "Traditional Bilona Method",
    },
    {
      icon: HeartHandshake,
      value: "Ahimsa Certified",
      label: "Calf Feeds First, Always",
    },
    {
      icon: Package,
      value: "Food-Grade Glass Jars",
      label: "No Plastic, No Leaching",
    },
  ];

  return (
    <Section className=" relative">
      {/* <Image
        src="/img/banner6.png"
        alt="Leaf Background"
        width={300}
        height={500}
        className="absolute right-0 -z-1 h-full w-full bottom-0 opacity-10 pointer-events-none"
      /> */}

      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2  gap-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            Rooted in Tradition, Made the Bilona Way
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed">
            At The Vadic Story, our A2 ghee follows the age-old Bilona method —
            from Ahimsa milking of free-grazing Gir cows to clay pot curd
            setting, wooden churning, and slow cow-dung fire boiling. Every step
            is done by hand, the traditional way, to give you ghee that is pure,
            nutrient-rich, and true to its roots.
          </p>
        </div>

        <div className="grid grid-cols-full md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0 rounded-lg">
                <stat.icon className="w-5 h-5 text-white" />
              </div>

              <div>
                <div className="text-lg md:text-xl font-bold text-primary font-heading">
                  {stat.value}
                </div>

                <p className="text-muted-foreground text-xs">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
