"use client";

import config from "@/config";
import { Leaf, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

export default function VariantSelector({ variants, selected, onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground sm:text-base">
        Choose Pack
      </h3>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {variants.map((pack) => {
          const isSelected = selected === pack.id;

          const savings = pack.originalPrice - pack.price;

          return (
            <button
              key={pack.id}
              onClick={() => onSelect(pack)}
              className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border-2 text-center transition-all duration-300 ${
                isSelected
                  ? "border-primary bg-card ring-2 ring-primary/20 shadow-lg"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-md"
              }`}
            >
              {/* Popular badge */}
              {pack.popular && (
                <div className="absolute -right-8 top-3 z-10 rotate-45 bg-accent px-10 py-1 text-[10px] font-bold uppercase text-accent-foreground shadow-sm">
                  Best
                </div>
              )}

              {/* Title */}
              <div className="w-full px-3 pt-4">
                <p
                  className={`text-xs font-bold sm:text-sm ${
                    isSelected ? "text-primary" : "text-foreground"
                  }`}
                >
                  {pack.label}
                </p>
              </div>

              {/* Image */}
              <div className="my-3 flex h-[80px] w-[80px] items-center justify-center rounded-xl bg-leaf-light/60 p-2 sm:h-[90px] sm:w-[90px]">
                <Image
                  width={500}
                  height={500}
                  src={`${config.file_base}${pack.pictures?.[0]}`}
                  alt={pack.label}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Price */}
              <div className="w-full space-y-1 px-3 pb-3">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-lg font-extrabold sm:text-xl">
                    ₹{pack.price}
                  </span>
                  <span className="text-xs text-muted-foreground line-through sm:text-sm">
                    ₹{pack.originalPrice}
                  </span>
                </div>

                <p className="text-xs font-semibold text-primary">
                  Save ₹{savings}
                </p>
              </div>

              {/* Bottom Tag */}
              {pack.tag && (
                <div
                  className={`flex w-full items-center justify-center gap-1 py-2 text-xs font-bold sm:text-sm transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-leaf-light text-leaf"
                  }`}
                >
                  {pack.tagIcon === "sparkles" && (
                    <Sparkles className="h-3 w-3" />
                  )}
                  {pack.tagIcon === "zap" && <Zap className="h-3 w-3" />}
                  {pack.tagIcon === "leaf" && <Leaf className="h-3 w-3" />}
                  {pack.tag}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
