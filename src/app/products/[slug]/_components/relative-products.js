"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCards from "@/components/ui/product-card";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { SectionHeading } from "@/components/layout/heading";
import Loader from "@/components/loader";

export default function CategoryProductSection() {
  // ---------------- PRODUCTS ----------------
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await http().get(endpoints.products.getAll);
      return data?.products ?? [];
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="w-full">
      <SectionHeading
        title={"Related"}
        highlight="Products"
        className="mb-8 text-start"
        titleClassName="text-4xl"
      />

      {products.length === 0 ? (
        <p className="text-center">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
