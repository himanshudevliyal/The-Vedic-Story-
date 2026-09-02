import FAQ from "@/home/faq";
import Breadcrumb from "@/components/breadcrumb";
import Section from "@/components/layout/section";
import AyurvedicSection from "@/home/why-choose";

export default function page() {
  return (
    <>
      <Breadcrumb current="Ahimsa Promise" bgImage="/img/breadcrumb.png" />
      <Section>
        <div className="rounded-2xl  overflow-hidden">
          <AyurvedicSection></AyurvedicSection>
        </div>
      </Section>
    </>
  );
}
