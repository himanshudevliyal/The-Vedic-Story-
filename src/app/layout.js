// app/layout.js
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

import QueryProvider from "@/providers/query-client-provider";
import Providers from "@/lib/povider";
import { NuqsProvider } from "@/providers/nuqs-provider";
import Layout from "@/components/layout/layout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});
const BASE_URL = "http://thevedicstory.in";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "The Vedic Story – A2 Gir Cow Vedic Bilona Ghee",
    template: "%s | The Vedic Story",
  },

  description:
    "Discover The Vedic Story's traditionally handcrafted A2 Gir Cow Bilona Ghee, made in small batches using the traditional Vedic process with a commitment to Ahimsa, purity and authentic ghee making.",

  keywords: [
    "A2 Gir Cow Ghee",
    "A2 Gir Cow Bilona Ghee",
    "Vedic Bilona Ghee",
    "Bilona Ghee",
    "A2 Cow Ghee",
    "Gir Cow Ghee",
    "Desi Cow Ghee",
    "Traditional Bilona Ghee",
    "Handcrafted Ghee",
    "Pure Cow Ghee",
    "A2 Ghee Online India",
    "Bilona Ghee Online",
    "Gir Cow Bilona Ghee",
    "Ahimsa Ghee",
    "Vedic Ghee",
    "Traditional Cow Ghee",
    "Natural Cow Ghee",
    "The Vedic Story",
  ],

  authors: [
    {
      name: "The Vedic Story",
      url: BASE_URL,
    },
  ],

  creator: "The Vedic Story",
  publisher: "The Vedic Story",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "The Vedic Story",

    title: "The Vedic Story – A2 Gir Cow Vedic Bilona Ghee",

    description:
      "Pure nourishment as nature intended. Discover traditionally handcrafted A2 Gir Cow Bilona Ghee made in small batches with the timeless Vedic process and a commitment to Ahimsa.",

    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "The Vedic Story – A2 Gir Cow Vedic Bilona Ghee",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "The Vedic Story – A2 Gir Cow Vedic Bilona Ghee",

    description:
      "Traditionally handcrafted A2 Gir Cow Bilona Ghee made with patience, purity and the Vedic way.",

    images: ["/logo.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  name: "The Vedic Story",

  url: BASE_URL,

  logo: `${BASE_URL}/logo.png`,

  description:
    "The Vedic Story creates traditionally handcrafted A2 Gir Cow Bilona Ghee using time-honoured Vedic methods with a focus on purity, ethical cow care and small-batch craftsmanship.",

  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  name: "The Vedic Story",

  url: BASE_URL,

  potentialAction: {
    "@type": "SearchAction",

    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/shop?search={search_term_string}`,
    },

    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <QueryProvider>
          <Providers>
            <NuqsProvider>
              <Layout>{children}</Layout>
            </NuqsProvider>
          </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
