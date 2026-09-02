import Breadcrumb from "@/components/breadcrumb";
import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";
import Image from "next/image";

export default function Blogs(params) {
  return (
    <>
      <Breadcrumb current="Vedic Process" bgImage="/img/breadcrumb.png" />

      {/* <SectionHeading
          title="THE VEDIC PROCESS"
          des="Five traditional steps. No shortcuts."
          className="text-center"
          titleClassName="text-4xl"
        /> */}
      <Image
        src="/img/process.png"
        alt="Vedic Process"
        width={500}
        height={500}
        className="w-full h-auto"
      />
    </>
  );
}
