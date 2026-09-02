"use client";

import * as React from "react";
import { Youtube } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";

const reels = [
  { id: 1, user: "Tech World", videoId: "dQw4w9WgXcQ" },
  { id: 2, user: "Code Lab", videoId: "9bZkp7q19f0" },
  { id: 3, user: "Design Hub", videoId: "3tmd-ClpJxA" },
  { id: 4, user: "Dev Talks", videoId: "l482T0yNkeo" },
];

function ReelCard({ reel }) {
  return (
    <Card className="relative overflow-hidden rounded-md p-0">
      {/* YouTube Video */}
      <iframe
        className="h-[400px] w-full"
        src={`https://www.youtube.com/embed/${reel.videoId}`}
        title={reel.user}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Optional Overlay Icon */}

      {/* Channel Name */}
      <div className="absolute bottom-3 left-4 z-10 text-sm font-medium text-white">
        {reel.user}
      </div>
    </Card>
  );
}

export default function ReelsCarousel() {
  return (
    <Section className="bg-gray-50">
      <SectionHeading
        badge="faq"
        title="Frequently Asked "
        highlight="Questions"
        des="We believe in building lasting relationships with our patients, offering not just medications, but comprehensive health support."
        className="mb-14 text-center"
        titleClassName="text-4xl"
      />

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="m-0 gap-0">
          {reels.map((reel) => (
            <CarouselItem
              key={reel.id}
              className="pl-2 basis-[85%] md:basis-1/2 lg:basis-1/4"
            >
              <ReelCard reel={reel} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
