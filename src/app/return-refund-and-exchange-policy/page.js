import React from "react";

const SECTIONS = [
  {
    title: "Returns & Exchanges",
    body: "We accept return or exchange requests only if the product delivered is damaged during transit, defective, expired, or different from the item originally ordered. Due to hygiene, safety, and quality considerations, products that have been opened, used, tampered with, or partially consumed cannot be returned or exchanged unless they were received in a damaged or defective condition. Any request for return or exchange must be reported to our customer support team within 48 hours of delivery along with clear photographs of the product, packaging, shipping label, and, wherever possible, an uninterrupted unboxing video. Requests received beyond this period may not be eligible for review. Once the returned product is received and successfully inspected by our quality team, the exchange or refund request will be processed in accordance with this policy.",
  },
  {
    title: "Refund Policy",
    body: "Approved refunds will be initiated only after the returned product has been inspected and verified by our quality assurance team. Refunds for prepaid orders will be credited back to the original payment method within 5–7 business days after approval. The actual credit timeline may vary depending on the customer's bank or payment service provider. For Cash on Delivery (COD) orders, eligible refunds will be processed through bank transfer or any other mutually agreed payment method after the required account details have been provided by the customer. Shipping charges, Cash on Delivery charges, convenience fees, or other applicable service charges are generally non-refundable unless the refund is initiated due to an error on the part of Radhayu Herbals.",
  },
  {
    title: "Non-Returnable Products",
    body: "To ensure product safety and maintain the highest quality standards, the following items are generally not eligible for return or exchange:",
    list: [
      "Products that have been opened, used, or consumed.",
      "Products returned without original packaging or labels.",
      "Products damaged due to improper handling or storage after delivery.",
      "Products purchased during clearance, promotional, or special sale campaigns, unless received in a damaged or incorrect condition.",
      "Requests made after the specified reporting period.",
    ],
  },
  {
    title: "Cancellation of Return Requests",
    body: "Radhayu Herbals reserves the right to decline any return, refund, or exchange request if:",
    list: [
      "The product has been used or altered after delivery.",
      "Sufficient evidence regarding the reported issue is not provided.",
      "The returned product does not match the original shipment.",
      "The request does not comply with the terms of this policy.",
      "The damage is determined to have occurred after successful delivery.",
    ],
    note: "Our decision regarding product inspection and refund eligibility shall be considered final.",
  },
  {
    title: "Quality Assurance",
    body: "Every product dispatched by Radhayu Herbals undergoes quality checks before shipment. As our products contain natural and herbal ingredients, slight variations in colour, texture, fragrance, consistency, or packaging may occur from batch to batch. Such natural variations are not considered manufacturing defects and therefore do not qualify for return or refund.",
  },
];

export const metadata = {
  title: "Return, Refund & Exchange Policy | Radhayu Herbals",
  description:
    "Understand Radhayu Herbals' policy on returns, refunds, exchanges, and non-returnable products.",
};

export default function ReturnRefundExchangePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c2b1f]">
      {/* Hero */}
      <section className="border-b border-[#e3ede4] bg-gradient-to-b from-[#f3f9f4] to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <span className="inline-block rounded-full bg-[#e6f4e8] px-3 py-1 text-xs font-medium tracking-wide text-[#2f7a3d]">
            Radhayu Herbals
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#163a1e] sm:text-4xl">
            Return, Refund & Exchange Policy
          </h1>
          <p className="mt-3 text-sm text-[#4d5f50]">
            Effective Date: July 1st, 2026
          </p>
          <p className="mt-6 text-base leading-7 text-[#3c4a3e]">
            At The Vadic Story customer satisfaction is our priority. We take
            utmost care to ensure that every product is carefully packed and
            delivered in excellent condition. As our products belong to the
            herbal and personal wellness category, certain return and refund
            conditions are applicable to maintain product quality, hygiene, and
            customer safety.
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
                href="#need-assistance"
                className="text-sm text-[#3c4a3e] underline decoration-[#bfe0c5] underline-offset-4 transition-colors hover:text-[#2f7a3d]"
              >
                Need Assistance?
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
                    <ul className="mt-3 list-inside list-disc space-y-1">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="text-base leading-7 text-[#3c4a3e]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.note && (
                    <p className="mt-3 text-base leading-7 text-[#3c4a3e]">
                      {section.note}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}

          <article id="need-assistance" className="scroll-mt-20 py-8">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#2f7a3d] text-xs font-semibold text-white">
                06
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#163a1e]">
                  Need Assistance?
                </h2>
                <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
                  If you have any concerns regarding your order, our customer
                  support team will be happy to assist you. Please contact us
                  using the details available on the Contact Us page, and we
                  will make every reasonable effort to resolve your concern
                  promptly and fairly.
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
