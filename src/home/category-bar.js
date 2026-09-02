"use client";

import Image from "next/image";
import React from "react";
import Section from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/heading";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Link from "next/link";
// ✅ removed wrong `data` import from autoprefixer

export default function CategoryBar() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await http().get(`${endpoints.categories.getAll}`);
      return data?.categories;
    },
  });

  return (
    <Section className="relative">
      <Image
        src="/img/bg-3.jpg"
        alt="Leaf Background"
        width={300}
        height={500}
        className="absolute right-0 -z-1 h-full w-full bottom-0 opacity-70 pointer-events-none"
      />

      <SectionHeading
        title={"Shop by "}
        des={
          <>
            Explore our range of Ayurvedic wellness solutions crafted with
            traditional herbal <br></br> wisdom to support your everyday health
            and well-being.
          </>
        }
        highlight=" Category
"
        className="mb-14 md:text-xl text-center"
        titleClassName="text-4xl"
      />

      {isLoading ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        <div className="flex gap-10 py-4 overflow-x-auto scrollbar-hide justify-center mb-5">
          {categories?.map((cat) => (
            <Link
              href={`products?category=${cat.id}`}
              key={cat.id}
              className="group min-w-[96px] items-center"
            >
              <div
                className="rounded-[100px] overflow-hidden bg-gray-100
                shadow-sm transition-all duration-300
                group-hover:shadow-md w-[200px]"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_FILE_BASE}${cat.pictures?.[0]}`}
                  alt={cat.title}
                  width={500}
                  height={500}
                  className="h-[300px] object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>

              <p className="mt-2 text-xl  italic font-bold text-gray-700 text-center group-hover:text-gray-900">
                {cat.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
