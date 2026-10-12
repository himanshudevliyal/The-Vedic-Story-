import StatsSection from "@/home/stats-section";
import HeroSection from "@/home/hero-section";
import TrendingProducts from "@/home/trending-products";
import AyurvedicSection from "@/home/why-choose";
import FAQ from "@/home/faq";
import Reviews from "@/home/reviews";
import FeaturesSection from "@/home/features";

export const metadata = {
  alternates: { canonical: "/" },
};

const BASE = "https://www.thevedicstory.in";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "The Vedic Story",
      url: `${BASE}/`,
      logo: {
        "@type": "ImageObject",
        "@id": `${BASE}/#logo`,
        url: `${BASE}/logo.png`,
        contentUrl: `${BASE}/logo.png`,
        caption: "The Vedic Story",
      },
      image: { "@id": `${BASE}/#logo` },
      description:
        "The Vedic Story sells traditionally handcrafted A2 Gir Cow Bilona Ghee, made in small batches using the Vedic process with a commitment to Ahimsa, purity and authentic ghee making.",
      email: "thevedicstory@gmail.com",
      telephone: "+91-7827307546",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Faridabad",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+91-7827307546",
        email: "thevedicstory@gmail.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      knowsAbout: [
        "A2 Gir Cow Ghee",
        "Bilona Ghee",
        "Desi Cow Ghee",
        "Ahimsa dairy",
        "Traditional ghee making",
      ],
      // sameAs: ["https://www.instagram.com/...", "https://www.facebook.com/..."],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: `${BASE}/`,
      name: "The Vedic Story",
      description:
        "A2 Gir Cow Vedic Bilona Ghee, handcrafted in small batches with free shipping across India.",
      inLanguage: "en-IN",
      publisher: { "@id": `${BASE}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${BASE}/#webpage`,
      url: `${BASE}/`,
      name: "The Vedic Story – A2 Gir Cow Vedic Bilona Ghee",
      description:
        "Traditionally handcrafted A2 Gir Cow Bilona Ghee made in small batches using the traditional Vedic process with a commitment to Ahimsa.",
      isPartOf: { "@id": `${BASE}/#website` },
      about: { "@id": `${BASE}/#organization` },
      primaryImageOfPage: { "@id": `${BASE}/#logo` },
      inLanguage: "en-IN",
    },
  ],
};

const faqs = [
  {
    q: "Why is Vedic Bilona Ghee more expensive than regular commercial ghee?",
    a: "ANSWER_YAHAN",
  },
  {
    q: "What makes A2 Gir Cow Bilona Ghee different from regular ghee?",
    a: "ANSWER_YAHAN",
  },
  {
    q: "What does “Ahimsa” mean in your ghee-making process?",
    a: "ANSWER_YAHAN",
  },
  {
    q: "Is Bilona Ghee suitable for people who are lactose intolerant?",
    a: "ANSWER_YAHAN",
  },
  {
    q: "How should I store the ghee after opening?",
    a: "ANSWER_YAHAN",
  },
  {
    q: "How can I use A2 Gir Cow Bilona Ghee every day?",
    a: "ANSWER_YAHAN",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// "<" escape karna zaroori hai (XSS safety)
const toJsonLd = (data) => JSON.stringify(data).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(homeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(faqSchema) }}
      />

      <HeroSection />
      <StatsSection />
      {/* <CategoryBar /> */}
      <FeaturesSection />

      <TrendingProducts />
      <AyurvedicSection />
      {/* <ReelsCarousel></ReelsCarousel> */}
      <Reviews />
      {/* <BlogSection /> */}
      <FAQ />
    </>
  );
}