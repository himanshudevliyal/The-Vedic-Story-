import React from "react";

const SECTIONS = [
  {
    title: "Order Processing",
    body: "Orders placed through our website are generally processed within 1–2 business days after successful payment confirmation. Orders received on Sundays or public holidays will be processed on the next working day. During festive seasons, promotional campaigns, or periods of high order volume, processing may take slightly longer than usual.",
  },
  {
    title: "Shipping & Delivery",
    body: "We currently deliver across most serviceable locations within India through reliable courier and logistics partners. Once your order has been dispatched, you will receive shipment confirmation along with tracking details, wherever applicable, allowing you to monitor the delivery status of your package. Delivery timelines generally range between 3–7 business days, depending on your delivery location. Remote or non-serviceable areas may require additional transit time. While we strive to meet the estimated delivery schedule, delays caused by weather conditions, courier operations, government restrictions, or other unforeseen circumstances may occasionally occur and are beyond our direct control.",
  },
  {
    title: "Shipping Charges",
    body: "Shipping charges, if applicable, will be clearly displayed during the checkout process before payment is completed. From time to time, Radhayu Herbals may offer free shipping on selected products, promotional offers, or orders above a specified value.",
  },
  {
    title: "Delivery Responsibility",
    body: "Customers are requested to provide complete and accurate shipping information while placing an order. Radhayu Herbals shall not be responsible for delays or unsuccessful deliveries resulting from incorrect addresses, incomplete contact information, or the unavailability of the recipient at the delivery location. If a shipment is returned due to an incorrect address, multiple failed delivery attempts, or refusal to accept the package, additional shipping charges may apply for re-dispatch of the order.",
  },
  {
    title: "Damaged or Incorrect Deliveries",
    body: "We take utmost care while packaging every order. However, if you receive a damaged, tampered, defective, or incorrect product, we request that you notify our customer support team within 48 hours of receiving the order. Failure to report such issues within the specified time may result in the request being declined.",
    list: [
      "Clear photographs of the product.",
      "Images of the outer packaging and shipping label.",
      "An unboxing video showing the condition of the package at the time of opening.",
    ],
    listIntro:
      "To help us investigate and resolve the issue promptly, customers may be asked to provide:",
  },
  {
    title: "Delivery Delays",
    body: "While we work closely with our logistics partners to ensure timely deliveries, Radhayu Herbals shall not be held responsible for delays caused by circumstances beyond our reasonable control, including natural disasters, transportation disruptions, strikes, government regulations, or other force majeure events.",
  },
];

export const metadata = {
  title: "Shipping Policy | Radhayu Herbals",
  description:
    "Learn about order processing, delivery timelines, shipping charges, and how Radhayu Herbals handles damaged or delayed deliveries.",
};

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c2b1f]">
      {/* Hero */}
      <section className="border-b border-[#e3ede4] bg-gradient-to-b from-[#f3f9f4] to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <span className="inline-block rounded-full bg-[#e6f4e8] px-3 py-1 text-xs font-medium tracking-wide text-[#2f7a3d]">
            Radhayu Herbals
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#163a1e] sm:text-4xl">
            Shipping Policy
          </h1>
          <p className="mt-3 text-sm text-[#4d5f50]">
            Effective Date: July 1st, 2026
          </p>
          <p className="mt-6 text-base leading-7 text-[#3c4a3e]">
            At The Vadic Story we are committed to delivering your orders safely
            and efficiently. Every order is carefully processed, packed, and
            shipped to ensure your products reach you in the best possible
            condition. This Shipping Policy explains our standard order
            processing and delivery procedures.
          </p>
        </div>
      </section>

      {/* Table of contents */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <nav aria-label="Table of contents">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#2f7a3d]">
            On this page
          </p>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {SECTIONS.map((section) => (
              <li key={section.title}>
                <a
                  href={`#${slugify(section.title)}`}
                  className="text-sm text-[#3c4a3e] underline decoration-[#bfe0c5] underline-offset-4 transition-colors hover:text-[#2f7a3d]"
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact-us"
                className="text-sm text-[#3c4a3e] underline decoration-[#bfe0c5] underline-offset-4 transition-colors hover:text-[#2f7a3d]"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="divide-y divide-[#e3ede4]">
          {SECTIONS.map((section, index) => (
            <article
              key={section.title}
              id={slugify(section.title)}
              className="scroll-mt-20 py-8"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#e6f4e8] text-xs font-semibold text-[#2f7a3d]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#163a1e]">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
                    {section.body}
                  </p>
                  {section.list && (
                    <>
                      <p className="mt-3 text-sm font-medium text-[#2f7a3d]">
                        {section.listIntro}
                      </p>
                      <ul className="mt-2 list-inside list-disc space-y-1">
                        {section.list.map((item) => (
                          <li
                            key={item}
                            className="text-base leading-7 text-[#3c4a3e]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}

          <article id="contact-us" className="scroll-mt-20 py-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#2f7a3d] text-xs font-semibold text-white">
                07
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#163a1e]">
                  Contact Us
                </h2>
                <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
                  For any shipping-related queries or assistance regarding your
                  order, customers may contact our support team through the
                  contact details available on the Contact Us page of our
                  website. We are committed to providing prompt assistance and
                  ensuring a smooth shopping experience.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
