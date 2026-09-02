import AboutSection from "./_components/about";

import FAQ from "@/home/faq";
import Breadcrumb from "@/components/breadcrumb";

export default function page() {
  return (
    <>
      <Breadcrumb current="Our Story" bgImage="/img/breadcrumb.png" />
      <AboutSection></AboutSection>

      <FAQ />
    </>
  );
}
