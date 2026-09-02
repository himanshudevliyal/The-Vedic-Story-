"use client";

import Image from "next/image";

import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      q: "Why is Vedic Bilona Ghee more expensive than regular commercial ghee?",
      a: "Traditional Bilona Ghee is a slow and resource-intensive process. It takes approximately 25–30 litres of A2 Gir Cow milk to produce around 1 litre of ghee, followed by curd setting, Bilona churning and slow heating. Unlike mass-produced ghee, the focus is on traditional preparation rather than speed and volume.",
    },
    {
      q: "What makes A2 Gir Cow Bilona Ghee different from regular ghee?",
      a: "The difference begins with the milk and continues through the process. Our ghee is made from A2 Gir Cow milk, which is first converted into curd, traditionally churned using the Bilona method, and then slowly heated to prepare aromatic golden ghee.",
    },
    {
      q: "What does “Ahimsa” mean in your ghee-making process?",
      a: "Ahimsa represents a compassionate approach to caring for cows. The calf is given priority to feed first, while the cows are cared for respectfully and allowed to graze naturally.",
    },
    {
      q: "Is Bilona Ghee suitable for people who are lactose intolerant?",
      a: "Ghee typically contains very low levels of lactose and milk solids because these are largely removed during clarification. However, individual sensitivities vary, so anyone with a diagnosed milk allergy or significant intolerance should consult a healthcare professional before consuming it.",
    },
    {
      q: "How should I store the ghee after opening?",
      a: "Keep the jar at room temperature in a cool, dry place, away from direct sunlight and moisture. Always use a clean, dry spoon. Refrigeration is generally not required when the ghee is stored properly.",
    },
    {
      q: "How can I use A2 Gir Cow Bilona Ghee every day?",
      a: "It can easily become part of everyday meals—use it on rotis and parathas, with dal or khichdi, for cooking and tadka, or simply add a spoonful to your favourite traditional dishes.",
    },
  ];

  return (
    <Section className="bg-[#FBF7EC] relative overflow-hidden">
      <SectionHeading
        title="Frequently Asked "
        highlight="Questions"
        des="Find answers to the most common questions about our A2 Gir Cow Bilona Ghee, traditional preparation, Ahimsa practices, storage, and everyday use."
        className="mb-10"
        titleClassName="text-4xl md:text-5xl"
      />
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 ">
        {/* LEFT - IMAGE */}
        <div className="relative w-full">
          <div className="relative overflow-hidden rounded-[30px] min-h-[500px] lg:min-h-[650px]">
            <Image
              src="/img/FAQs.png"
              alt="A2 Gir Cow and traditional dairy farming"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Decorative element */}
          <div className="absolute -bottom-5 -right-5 w-28 h-28 rounded-full bg-[#D8A94A]/20 -z-0" />
          <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-[#8B9A58]/15 -z-0" />
        </div>

        {/* RIGHT - FAQ */}
        <div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-[#DCCFB5] rounded-xl px-5 bg-white/60"
              >
                <AccordionTrigger className="text-left text-lg font-semibold py-5 hover:no-underline">
                  {item.q}
                </AccordionTrigger>

                <AccordionContent className="text-base  text-gray-700 leading-relaxed pb-5 pr-4">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </Section>
  );
}
