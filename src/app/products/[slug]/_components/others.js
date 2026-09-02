"use client";

import Section from "@/components/layout/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductDetailsTabs({
  description,
  ingredients,
  deliveryInfo,
}) {
  return (
    <Section className="bg-white">
      <div className="max-w-7xl px-4 mx-auto">
        <Tabs defaultValue="description" className="w-full">
          {/* Tabs Header */}
          <TabsList
            className="
            h-auto w-full justify-start overflow-x-auto  no-scrollbar gap-1 rounded-xl
            bg-[hsl(30_30%_92%)] !py-5 px-4
          "
          >
            {["description", "ingredients", "delivery"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="
                rounded-lg px-6 py-3 text-sm font-medium
                text-[hsl(25_15%_45%)]
                data-[state=active]:bg-[hsl(30_20%_99%)]
                data-[state=active]:text-[hsl(25_30%_15%)]
                data-[state=active]:shadow-[0_2px_8px_-2px_hsl(25_30%_15%/0.08)]
              "
              >
                {tab === "description"
                  ? "Description"
                  : tab === "ingredients"
                    ? "Ingredients"
                    : "Delivery Info"}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Description */}
          <TabsContent value="description" className="mt-6">
            <p className="leading-relaxed text-[hsl(25_15%_45%)]">
              {description}
            </p>
          </TabsContent>

          {/* Ingredients */}
          <TabsContent value="ingredients" className="mt-6">
            <ul className="grid gap-2 sm:grid-cols-2">
              {ingredients?.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-[hsl(25_15%_45%)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(38_90%_55%)]" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </TabsContent>

          {/* Delivery */}
          <TabsContent value="delivery" className="mt-6">
            <ul className="space-y-3">
              {deliveryInfo?.map((info, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-[hsl(25_15%_45%)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(38_90%_55%)]" />
                  {info}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}
