"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "@/lib/features/productsSlice";
import { FeaturedProductCard } from "@/components/ui/product-card";
import Section from "@/components/layout/section";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const OurProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Section className="bg-gray-50">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products?.map((product) => (
            <CarouselItem key={product.id} className="basis-full pl-4">
              <FeaturedProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {products?.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
    </Section>
  );
};

export default OurProducts;
