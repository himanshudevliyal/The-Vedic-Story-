"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VariantSelector from "./variant-selector";
import ProductDetailsTabs from "./others";
import Image from "next/image";
import { Lens } from "@/components/ui/lens";
import config from "@/config";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/useAddToCart";
import QickAdd from "./qick-addcart";

function mapVariant(v) {
  return {
    id: v.id,
    label: `${v.pack_size} ${v.unit}`,
    price: v.display_price,
    originalPrice: v.price,
    sku: v.sku,
    stock: v.stock,
    pictures: v.pictures,
    popular: false,
    tag: v.stock === 0 ? "Out of Stock" : "In Stock",
    tagIcon: v.stock === 0 ? "zap" : "leaf",
  };
}

export default function ProductPage({ product }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const variants = product.variants.map(mapVariant);

  const variantId = searchParams.get("variant") ?? variants[0]?.id;

  const [pack, setPack] = useState(() => {
    const found = product?.variants?.find((v) => v.id == variantId);
    return found ? mapVariant(found) : mapVariant(product.variants[0]);
  });

  const [pictures, setPictures] = useState(() => {
    const found = product?.variants?.find((v) => v.id == variantId);
    if (found) {
      return found.pictures.length ? found.pictures : product.pictures;
    }
    return product.pictures;
  });

  const { addToCart, isLoading } = useAddToCart();

  // Keep pack & pictures in sync when URL variant param changes
  useEffect(() => {
    const found = product?.variants?.find((v) => v.id == variantId);
    if (found) {
      setPack(mapVariant(found));
      setPictures(found.pictures.length ? found.pictures : product.pictures);
    }
  }, [variantId, product]);

  /* Active variant: ?variant=<id> in URL, fallback to first */
  const selectedVariant =
    variants.find((v) => v.id == variantId) ?? variants[0];

  /* Update URL param on variant click — no full re-render */
  function handleVariantSelect(pack) {
    setPack(pack);
    setPictures(pack.pictures.length ? pack.pictures : product.pictures);
    const next = new URLSearchParams(searchParams.toString());
    next.set("variant", pack.id);
    router.push(`?${next.toString()}`, { scroll: false });
  }

  const handleAdd = async (redirectToCheckout = false, quantity = 1) => {
    if (!selectedVariant) return;

    await addToCart({
      product: {
        id: product.id,
        slug: product.slug,
        title: product.title,
        price: selectedVariant.price,
        product_price: selectedVariant.price,
        pack_size: selectedVariant.label,
        variant_id: selectedVariant.id,
        pictures: selectedVariant.pictures,
      },
      quantity,
      openCart: !redirectToCheckout, // Add to Cart => true, Buy Now => false
    });

    if (redirectToCheckout) {
      router.push("/checkout");
    }
  };

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2">
        {/* ================= LEFT SECTION — Images ================= */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            {/* Thumbnails */}
            <div className="flex gap-3 sm:flex-col">
              {pictures.map((img, i) => (
                <button
                  key={i}
                  className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-xl border transition"
                >
                  <Image
                    src={`${config.file_base}${img}`}
                    alt=""
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Lens */}
            <div className="relative flex-1 overflow-hidden rounded-2xl  shadow-sm cursor-none">
              <Lens zoomFactor={2} lensSize={150} isStatic={false}>
                <Image
                  src={`${config.file_base}${pictures?.[0]}`}
                  alt="Immunity Booster"
                  width={600}
                  height={600}
                  className="  object-contain   mix-blend-multiply max-h-[500px]"
                />
              </Lens>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-2xl font-mono! font-bold leading-tight sm:text-3xl lg:text-4xl">
              {product.title}
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              {product.short_description}
            </p>
          </div>

          {/* Rating + Price */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">4.7</span>
              <span className="text-muted-foreground">
                (8,326 verified reviews)
              </span>
            </div>

            {pack && (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  ₹{pack.price}
                </span>
                <span className="text-base line-through text-muted-foreground sm:text-lg">
                  ₹ {pack.originalPrice}
                </span>
                <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  ₹ {pack.originalPrice - pack.price} OFF
                </span>
              </div>
            )}
          </div>

          <VariantSelector
            variants={variants}
            selected={selectedVariant?.id}
            onSelect={handleVariantSelect}
          />

          {/* Display selected variant info */}
          {selectedVariant && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Selected:</span>{" "}
                {selectedVariant.label}
              </p>
              <p className="text-sm text-gray-600">
                SKU: {selectedVariant.sku}
              </p>
            </div>
          )}

          <Image
            width={600}
            height={300}
            alt="Herbal Ingredients"
            className="w-full rounded-xl"
            src="/img/herbal.webp"
          />

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 gap-2 rounded-xl text-base font-semibold shadow-sm"
              onClick={() => handleAdd(false)}
              disabled={selectedVariant.stock === 0 || isLoading}
            >
              <ShoppingCart className="h-5 w-5" />
              {isLoading ? "Adding..." : "Add to Cart"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => handleAdd(true)}
              disabled={selectedVariant.stock === 0 || isLoading}
              className="flex-1 rounded-xl text-base font-semibold"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Description / Ingredients / Delivery tabs */}
      <ProductDetailsTabs
        description={product.description}
        ingredients={product.ingredients.map((i) => i.ingredient)}
        deliveryInfo={product.delivery_info.map((d) => d.info)}
      />

      {/* Sticky bottom add-to-cart bar */}
      {selectedVariant && (
        <QickAdd
          mainImage={pictures}
          price={selectedVariant.price}
          title={product.title}
          addToCart={handleAdd}
          stock={selectedVariant.stock}
        />
      )}
    </>
  );
}
