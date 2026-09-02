import React from "react";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "When you browse our website, create an account, place an order, or contact our customer support team, we may collect personal information such as your name, email address, mobile number, billing and shipping address, and order details. We may also collect technical information including your IP address, browser type, device information, and website usage data through cookies and similar technologies to improve our services.",
  },
  {
    title: "How We Use Your Information",
    body: "The information collected is used to process your orders, arrange deliveries, provide customer support, improve our products and website, and keep you informed about your purchases. With your permission, we may also send promotional emails, SMS, or WhatsApp messages regarding new products, offers, and updates. You can opt out of these communications at any time.",
  },
  {
    title: "Payment Security",
    body: "Your payment security is our priority. All online payments are processed through secure and trusted third-party payment gateways using industry-standard encryption. Radhayu Herbals does not store your credit card, debit card, UPI PIN, CVV, or any sensitive banking information on its servers.",
  },
  {
    title: "Cookies & Website Analytics",
    body: "Our website uses cookies and similar technologies to enhance your browsing experience, remember your preferences, analyse website traffic, and improve overall performance. These cookies help us understand customer behaviour and deliver a more personalised shopping experience. You may choose to disable cookies through your browser settings; however, certain features of the website may not function as intended.",
  },
  {
    title: "Sharing of Information",
    body: "We respect your privacy and do not sell, rent, or trade your personal information. Your information may only be shared with trusted service providers such as payment gateways, courier partners, technology providers, and government authorities where required by law. These partners are authorised to use your information only for the services they provide on our behalf.",
  },
  {
    title: "Data Protection",
    body: "We take reasonable administrative, technical, and organisational measures to protect your personal information from unauthorised access, misuse, alteration, or disclosure. While we continuously work to maintain a secure environment, no online platform can guarantee absolute security, and users are encouraged to protect their account credentials.",
  },
  {
    title: "Third-Party Links",
    body: "Our website may include links to third-party websites or services for your convenience. These websites operate independently, and Radhayu Herbals is not responsible for their privacy practices, content, or policies. We encourage users to review the privacy policies of any external websites they visit.",
  },
  {
    title: "Children's Privacy",
    body: "Radhayu Herbals does not knowingly collect personal information from individuals below the age of 18 years. If we become aware that such information has been submitted, we will take appropriate steps to remove it from our records.",
  },
  {
    title: "Updates to This Privacy Policy",
    body: "We reserve the right to modify or update this Privacy Policy whenever necessary to reflect changes in our business practices or legal requirements. Any updates will be published on this page with the revised effective date. Continued use of the website after such changes indicates your acceptance of the updated policy.",
  },
];

export const metadata = {
  title: "Privacy Policy | Radhayu Herbals",
  description:
    "Learn how Radhayu Herbals collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c2b1f]">
      {/* Hero */}
      <section className="border-b border-[#e3ede4] bg-gradient-to-b from-[#f3f9f4] to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <span className="inline-block rounded-full bg-[#e6f4e8] px-3 py-1 text-xs font-medium tracking-wide text-[#2f7a3d]">
            Radhayu Herbals
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#163a1e] sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-[#4d5f50]">
            Effective Date: July 1st, 2026
          </p>
          <p className="mt-6 text-base leading-7 text-[#3c4a3e]">
            At The Vadic Story your privacy is important to us. We are committed
            to protecting the personal information you share while visiting our
            website or purchasing our products. This Privacy Policy explains how
            we collect, use, store, and safeguard your information to provide
            you with a secure and seamless shopping experience. By accessing or
            using our website, you agree to the terms outlined in this policy.
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
                10
              </span>
              <div>
                <h2 className="text-lg font-semibold text-[#163a1e]">
                  Contact Us
                </h2>
                <p className="mt-2 text-base leading-7 text-[#3c4a3e]">
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or the way your personal information is
                  handled, please feel free to contact the Radhayu Herbals
                  customer support team through the contact details provided on
                  our website. We are always happy to assist you.
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
