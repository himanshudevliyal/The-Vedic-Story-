import React from "react";

const SECTIONS = [
  {
    title: "Order Cancellation",
    body: "Customers may request the cancellation of an order before it has been processed or dispatched from our warehouse. Once an order has been packed, shipped, or handed over to our logistics partner, it cannot be cancelled as it enters the delivery process. To request a cancellation, customers are advised to contact our customer support team as soon as possible with their order details. While we make every effort to accommodate cancellation requests, approval is subject to the current processing status of the order.",
  },
  {
    title: "Cancellation by Radhayu Herbals",
    body: "In certain situations, Radhayu Herbals reserves the right to cancel an order without prior notice. This may occur due to reasons such as product unavailability, pricing or technical errors, payment verification issues, suspected fraudulent transactions, incorrect customer information, or circumstances beyond our reasonable control. If an order is cancelled by Radhayu Herbals after successful payment has been received, the customer will be notified, and the applicable refund will be processed to the original payment method.",
  },
  {
    title: "Refund for Cancelled Orders",
    body: "For prepaid orders cancelled before dispatch, the full order value will be refunded to the original payment method. Refunds are generally initiated within 5–7 business days after cancellation approval. However, the time taken for the amount to reflect in the customer's account may vary depending on the respective bank or payment service provider. Orders placed using Cash on Delivery (COD) can only be cancelled before dispatch. As no advance payment is collected for COD orders, no refund process will be applicable in such cases.",
  },
  {
    title: "Modification of Orders",
    body: "Once an order has been successfully placed, modifications such as changes to products, quantities, delivery address, or payment method may not always be possible. Customers are requested to verify all order details carefully before completing the checkout process. If you require any assistance regarding your order, our customer support team will make every reasonable effort to help before the order is dispatched.",
  },
];

export const metadata = {
  title: "Cancellation Policy | Radhayu Herbals",
  description:
    "Learn about Radhayu Herbals' order cancellation conditions, refund process, and order modification policy.",
};

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c2b1f]">
      {/* Hero */}
      <section className="border-b border-[#e3ede4] bg-gradient-to-b from-[#f3f9f4] to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <span className="inline-block rounded-full bg-[#e6f4e8] px-3 py-1 text-xs font-medium tracking-wide text-[#2f7a3d]">
            Radhayu Herbals
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#163a1e] sm:text-4xl">
            Cancellation Policy
          </h1>
          <p className="mt-3 text-sm text-[#4d5f50]">
            Effective Date: July 1st, 2026
          </p>
          <p className="mt-6 text-base leading-7 text-[#3c4a3e]">
            At The Vadic Story we understand that you may need to modify or
            cancel an order due to unforeseen circumstances. This Cancellation
            Policy explains the conditions under which an order may be cancelled
            and the applicable refund process.
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
                <div>
                  <h2 className="text-lg font-semibold text-[#163a1e]">
                    {section.title}
                  </h2>
                  <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
                    {section.body}
                  </p>
                </div>
              </div>
            </article>
          ))}

          <article id="contact-us" className="scroll-mt-20 py-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#2f7a3d] text-xs font-semibold text-white">
                05
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#163a1e]">
                  Contact Us
                </h2>
                <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
                  For cancellation requests or order-related assistance,
                  customers may contact our support team using the contact
                  information available on the Contact Us page. We are committed
                  to providing timely assistance and ensuring a smooth shopping
                  experience.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Footer note */}
    </main>
  );
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
