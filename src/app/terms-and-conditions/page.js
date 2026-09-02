import React from "react";

const SECTIONS = [
  {
    title: "Website Usage",
    body: "The content, images, product descriptions, logos, graphics, and other materials available on this website are the property of Radhayu Herbals and are protected under applicable intellectual property laws. You may browse the website and purchase products for personal use; however, reproducing, copying, modifying, distributing, or commercially using any content without prior written permission is strictly prohibited.",
  },
  {
    title: "Product Information",
    body: "We strive to provide accurate information regarding our herbal and wellness products, including descriptions, ingredients, pricing, and images. Since our products are made using natural ingredients, slight variations in colour, texture, fragrance, or packaging may occur and should not be considered manufacturing defects. Product images are for illustrative purposes only and may differ slightly from the actual product.",
  },
  {
    title: "Pricing & Payments",
    body: "All prices displayed on the website are in Indian Rupees (INR) and are subject to change without prior notice. Payments can be made through the payment methods available during checkout. Orders will be processed only after successful payment confirmation. In case of pricing errors or technical issues, Radhayu Herbals reserves the right to cancel or modify any order after informing the customer.",
  },
  {
    title: "Order Acceptance",
    body: "Placing an order on our website does not automatically guarantee its acceptance. We reserve the right to accept, decline, or cancel any order due to product unavailability, incorrect pricing, payment verification issues, suspected fraudulent activity, or any unforeseen circumstances. If an order is cancelled after payment has been received, the applicable refund will be initiated in accordance with our Refund Policy.",
  },
  {
    title: "Intellectual Property",
    body: "All trademarks, brand names, logos, designs, photographs, product content, and website materials displayed on this website belong to Radhayu Herbals unless otherwise stated. Any unauthorised use, reproduction, or distribution of these materials is strictly prohibited and may result in legal action.",
  },
  {
    title: "User Responsibilities",
    body: "By using this website, you agree to provide accurate and complete information while placing orders or creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities carried out under your account. Any misuse of the website, fraudulent activity, or violation of applicable laws may result in suspension or termination of access without prior notice.",
  },
  {
    title: "Health Information Disclaimer",
    body: "The information provided on this website is intended for general awareness and educational purposes only. Our herbal products are not intended to diagnose, treat, cure, or prevent any disease. Customers are advised to consult a qualified healthcare professional before using any herbal product, especially if they are pregnant, nursing, taking medication, or managing an existing medical condition.",
  },
  {
    title: "Limitation of Liability",
    body: "While we make every effort to ensure the accuracy of information and the quality of our products, Radhayu Herbals shall not be held liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or its products. Individual results from herbal products may vary depending on personal health conditions, lifestyle, and other factors.",
  },
  {
    title: "Changes to Terms",
    body: "Radhayu Herbals reserves the right to update or modify these Terms & Conditions at any time without prior notice. Any changes will become effective immediately upon publication on this page. Continued use of the website after such updates signifies your acceptance of the revised terms.",
  },
  {
    title: "Governing Law",
    body: "These Terms & Conditions shall be governed and interpreted in accordance with the laws of India. Any disputes arising in connection with the use of this website or the purchase of products shall be subject to the exclusive jurisdiction of the competent courts in India.",
  },
];

export const metadata = {
  title: "Terms & Conditions | Radhayu Herbals",
  description:
    "Read the Terms & Conditions governing your use of the Radhayu Herbals website, products, and services.",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c2b1f]">
      {/* Hero */}
      <section className="border-b border-[#e3ede4] bg-gradient-to-b from-[#f3f9f4] to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <span className="inline-block rounded-full bg-[#e6f4e8] px-3 py-1 text-xs font-medium tracking-wide text-[#2f7a3d]">
            Radhayu Herbals
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#163a1e] sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-sm text-[#4d5f50]">
            Effective Date: July 1st, 2026
          </p>
          <p className="mt-6 text-base leading-7 text-[#3c4a3e]">
            Welcome to Radhayu Herbals. By accessing or using our website, you
            agree to comply with these Terms & Conditions. These terms govern
            your use of our website, products, and services. If you do not agree
            with any part of these terms, we kindly request that you discontinue
            using our website.
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
                11
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#163a1e]">
                  Contact Us
                </h2>
                <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
                  If you have any questions regarding these Terms & Conditions,
                  please feel free to contact our customer support team through
                  the contact details available on our website. We are always
                  happy to assist you.
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
