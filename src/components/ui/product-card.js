"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import config from "@/config";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { useAddToCart } from "@/hooks/useAddToCart";
import { useState } from "react";

export default function ProductCards({ product }) {
  return (
    <Link
      href={`/products/${product.slug}?variant=${product.variants?.[0]?.id}`}
      className="group rounded-3xl border p-2 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image Section */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-3xl bg-white p-4">
          <Image
            width={500}
            height={500}
            src={`${config.file_base}${product.pictures?.[0]}`}
            alt={product.title}
            className={cn(
              `h-[280px] w-full object-contain transition-all duration-500 `,
            )}
          />
        </div>

        {/* Category Badge */}
        {product.category_name && (
          <span className="absolute left-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-gray-800">
            {product.category_name}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 px-2 pb-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg font-bold leading-tight text-gray-900">
            {product.title}
          </h3>
        </div>

        <p className="line-clamp-2 text-sm text-gray-600">
          {product.short_description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Starting at
            </span>

            <div className="font-serif text-xl font-bold italic">
              ₹{product.starting_at}
            </div>
          </div>

          <div
            // href={`/products/${product.slug}?variant=${product.variants?.[0]?.id}`}
            className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent"
          >
            <ShoppingBag className="h-4 w-4" />
            Buy Now
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProductCard({ product }) {
  const { addToCart, isLoading } = useAddToCart();

  const variants = product?.variants ?? [];

  // First variant selected by default
  const [selectedVariantId, setSelectedVariantId] = useState(variants?.[0]?.id);

  // Get selected variant
  const selectedVariant =
    variants.find((v) => v.id === selectedVariantId) ?? variants[0];

  // Selected variant image
  const selectedImage =
    selectedVariant?.pictures?.length > 0
      ? selectedVariant.pictures[0]
      : product?.pictures?.[0];

  const handleVariantChange = (variant) => {
    setSelectedVariantId(variant.id);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!selectedVariant || selectedVariant.stock === 0 || isLoading) {
      return;
    }

    await addToCart({
      product: {
        id: product.id,
        slug: product.slug,
        title: product.title,

        price: selectedVariant.price,
        product_price: selectedVariant.display_price,

        pack_size: `${selectedVariant.pack_size} ${selectedVariant.unit}`,

        variant_id: selectedVariant.id,

        pictures: selectedVariant.pictures?.length
          ? selectedVariant.pictures
          : product.pictures,
      },

      quantity: 1,

      openCart: true,
    });
  };

  const isOutOfStock = !selectedVariant || selectedVariant.stock === 0;

  return (
    <div
      className="group flex flex-col items-stretch gap-6 rounded-3xl border p-4 transition-all duration-500 hover:-translate-y-1 sm:gap-8 sm:p-6 md:flex-row md:p-8"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
      }}
    >
      {/* ================= IMAGE ================= */}
      <div className="relative w-full shrink-0 md:w-[340px] lg:w-[400px]">
        <div
          className="relative h-[240px] w-full overflow-hidden rounded-2xl p-6 sm:h-[320px] sm:p-8 md:h-full"
          style={{
            backgroundColor: "var(--secondary)",
          }}
        >
          <Image
            key={selectedImage}
            width={600}
            height={600}
            src={`${config.file_base}${selectedImage}`}
            alt={product.title}
            className={cn(
              "h-full w-full object-contain transition-all duration-500",
              "group-hover:scale-105",
            )}
          />
        </div>

        {product.category_name && (
          <span
            className="absolute left-4 top-4 rounded-full px-3.5 py-2 text-xs font-medium sm:text-sm"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-foreground)",
            }}
          >
            {product.category_name}
          </span>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="space-y-4 sm:space-y-5">
          {/* Title */}
          <h2
            className="font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl"
            style={{
              color: "var(--foreground)",
            }}
          >
            {product.title}
          </h2>

          {/* Description */}
          <p
            className="max-w-xl text-sm leading-relaxed sm:text-base md:text-lg"
            style={{
              color: "var(--muted-foreground)",
            }}
          >
            {product.short_description}
          </p>

          {/* ================= VARIANTS ================= */}
          {variants.length > 0 && (
            <div className="pt-2">
              <p
                className="mb-2 text-xs font-medium uppercase tracking-wide"
                style={{
                  color: "var(--muted-foreground)",
                }}
              >
                Select Pack Size
              </p>

              <div className="flex flex-wrap gap-2">
                {variants.map((v) => {
                  const isSelected = v.id === selectedVariant?.id;
                  const isVariantOutOfStock = v.stock === 0;

                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleVariantChange(v)}
                      disabled={isVariantOutOfStock}
                      className={cn(
                        "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm",
                        "disabled:cursor-not-allowed disabled:opacity-40",
                        isSelected
                          ? "scale-[1.02] shadow-sm"
                          : "hover:-translate-y-0.5",
                      )}
                      style={{
                        borderColor: isSelected
                          ? "var(--primary)"
                          : "var(--border)",

                        backgroundColor: isSelected
                          ? "var(--primary)"
                          : "transparent",

                        color: isSelected
                          ? "var(--primary-foreground)"
                          : "var(--foreground)",
                      }}
                    >
                      {v.pack_size} {v.unit}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= SELECTED VARIANT ================= */}
          {selectedVariant && (
            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl px-4 py-3"
              style={{
                backgroundColor: "var(--secondary)",
              }}
            >
              <span
                className="text-sm font-semibold"
                style={{
                  color: "var(--foreground)",
                }}
              >
                {selectedVariant.pack_size} {selectedVariant.unit}
              </span>

              {selectedVariant.sku && (
                <span
                  className="text-xs"
                  style={{
                    color: "var(--muted-foreground)",
                  }}
                >
                  SKU: {selectedVariant.sku}
                </span>
              )}

              <span
                className="text-xs font-medium"
                style={{
                  color: isOutOfStock ? "var(--destructive)" : "var(--primary)",
                }}
              >
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </span>
            </div>
          )}
        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          {/* Price */}
          <div>
            <span
              className="font-body text-xs uppercase tracking-wide sm:text-sm"
              style={{
                color: "var(--muted-foreground)",
              }}
            >
              Selected Pack
            </span>

            <div className="flex items-center gap-3">
              <div
                className="font-heading text-3xl font-bold italic sm:text-4xl"
                style={{
                  color: "var(--primary)",
                }}
              >
                ₹{selectedVariant.display_price}
              </div>

              {selectedVariant?.display_price &&
                selectedVariant.display_price < selectedVariant.price && (
                  <span
                    className="text-sm line-through"
                    style={{
                      color: "var(--muted-foreground)",
                    }}
                  >
                    ₹{selectedVariant.price}
                  </span>
                )}
            </div>
          </div>

          {/* ================= BUTTONS ================= */}
          <div className="flex flex-wrap gap-2">
            {/* View Product */}
            <Link
              href={`/products/${product.slug}?variant=${selectedVariant?.id}`}
              className="flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition hover:-translate-y-0.5 sm:px-6 sm:py-3.5 sm:text-base"
              style={{
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
              View Product
            </Link>

            {/* Add To Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isLoading}
              className={cn(
                "flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition sm:px-6 sm:py-3.5 sm:text-base",
                "hover:-translate-y-0.5 hover:opacity-90",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />

              {isLoading ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
