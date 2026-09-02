import React from "react";

const PARAGRAPHS = [
  "At The Vadic Story we are committed to offering high-quality herbal and Ayurvedic products inspired by traditional wellness practices. The information provided on this website, including product descriptions, ingredient details, health-related content, blogs, and customer testimonials, is intended solely for general informational and educational purposes.",
  "Our products are not intended to diagnose, treat, cure, or prevent any disease and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Individual results may vary depending on factors such as age, body type, lifestyle, dietary habits, existing medical conditions, and overall health.",
  "Customers are advised to carefully read the product label, usage instructions, ingredients, and any precautions before using any product. If you are pregnant, nursing, suffering from a medical condition, taking prescription medication, or undergoing any medical treatment, we strongly recommend consulting a qualified healthcare professional before using our products.",
  "While every effort is made to ensure the accuracy of the information available on this website, Radhayu Herbals does not guarantee that all content is complete, current, or free from errors. Product formulations, packaging, availability, and pricing may be updated from time to time without prior notice.",
  "As our products are made using natural and herbal ingredients, slight variations in colour, texture, fragrance, consistency, or appearance may occur between batches. These natural variations are a normal characteristic of herbal products and should not be considered manufacturing defects.",
  "Customers with known allergies or sensitivities are advised to review the ingredient list carefully before use. If any allergic reaction, irritation, or discomfort occurs after using a product, discontinue its use immediately and seek appropriate medical advice.",
  "By purchasing or using products from The Vadic Story you acknowledge that the use of herbal products is a personal choice and that you are responsible for ensuring the products are suitable for your individual needs. Radhayu Herbals shall not be liable for any adverse effects, allergic reactions, misuse, or damages arising from the improper use of its products or reliance on the information provided on this website.",
];

export const metadata = {
  title: "Medical Disclaimer | Radhayu Herbals",
  description:
    "Important information regarding the informational nature of Radhayu Herbals' product and health-related content.",
};

export default function MedicalDisclaimerPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c2b1f]">
      {/* Hero */}
      <section className="border-b border-[#e3ede4] bg-gradient-to-b from-[#f3f9f4] to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <span className="inline-block rounded-full bg-[#e6f4e8] px-3 py-1 text-xs font-medium tracking-wide text-[#2f7a3d]">
            Radhayu Herbals
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#163a1e] sm:text-4xl">
            Medical Disclaimer
          </h1>
          <p className="mt-3 text-sm text-[#4d5f50]">
            Effective Date: July 1st, 2026
          </p>
        </div>
      </section>

      {/* Callout */}
      <section className="mx-auto max-w-3xl px-6 pt-10">
        <div className="flex items-start gap-3 rounded-lg border border-[#bfe0c5] bg-[#f3f9f4] px-5 py-4">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#2f7a3d] text-xs font-bold text-white"
          >
            !
          </span>
          <p className="text-sm leading-6 text-[#2f4f34]">
            Our products are not intended to diagnose, treat, cure, or prevent
            any disease and are not a substitute for professional medical
            advice.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="space-y-6">
          {PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className="text-base leading-7 text-[#3c4a3e]">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact-us" className="mx-auto max-w-3xl px-6 pb-16">
        <div className="border-t border-[#e3ede4] pt-8">
          <h2 className="text-lg font-semibold text-[#163a1e]">Contact Us</h2>
          <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
            If you have any questions regarding our products or require
            additional information, please feel free to contact our customer
            support team through the details available on the Contact Us page.
          </p>
        </div>
      </section>

      {/* Footer note */}
    </main>
  );
}
