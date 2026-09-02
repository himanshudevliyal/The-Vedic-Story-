import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";
import Image from "next/image";

export default function AboutSection() {
  return (
    <Section className="relative overflow-hidden bg-[#FBF7EC]">
      {/* Decorative Leaf */}
      <Image
        src="/img/element-1.png"
        alt=""
        width={500}
        height={500}
        className="pointer-events-none absolute bottom-10 right-2  opacity-40"
      />

      <div className="relative grid grid-cols-1  gap-4 lg:grid-cols-2">
        {/* LEFT - VISUAL STORY */}
        <div className="flex ">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/img/family-ghee.jpg"
              alt="The Vedic Story family and Gir cows"
              width={500}
              height={700}
              className="w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* RIGHT - STORY CONTENT */}
        <div>
          <SectionHeading
            badge="The Origin of The Vedic Story"
            title="It Started With a Simple Question: What Are We Feeding Our Family?"
            des="When our son, Raghunath, was born, we wanted to give him the very best—especially when it came to something as fundamental as the food we put on our family's plate."
            className="text-left"
            titleClassName="text-4xl"
          />

          <div className="mt-8 space-y-5 text-gray-600">
            <p>
              We searched for ghee that was{" "}
              <strong className="font-semibold text-gray-900">
                pure, traditionally made
              </strong>
              , and prepared with the same care we would expect in our own home.
            </p>

            <p>
              But we struggled to find something that truly felt{" "}
              <strong className="font-semibold text-gray-900">
                Clean. Honest. Pure.
              </strong>
            </p>

            <p>
              That search became a journey. We went back to our roots—to the
              wisdom of traditional Indian food-making, where food was not
              simply a product, but something prepared with{" "}
              <strong className="font-semibold text-gray-900">
                patience, respect and purpose.
              </strong>
            </p>

            <p>
              We discovered the traditional{" "}
              <strong className="font-semibold text-gray-900">
                Bilona method
              </strong>
              —where milk is first transformed into curd, the curd is
              traditionally churned to obtain makkhan, and the makkhan is then
              slowly heated to make ghee.
            </p>

            <p>
              What began as a search for better ghee for our family gradually
              became a larger dream:
            </p>

            <p className="text-lg font-medium text-gray-900">
              What if we could make the kind of food we wanted for our own
              family—and make it available to others?
            </p>

            <p>
              And that is how{" "}
              <strong className="font-semibold text-gray-900">
                The Vedic Story
              </strong>{" "}
              began.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-5 max-w-3xl text-gray-600 text-balance">
        <p className="">
          We started with ghee because we believe that some of the oldest food
          traditions are worth preserving—not just as a memory of our past, but
          as a way of bringing greater care and authenticity to our everyday
          lives.
        </p>

        <p>
          For us, The Vedic Story is not just a brand. It is our attempt to
          bring back a little of what was once natural—food made with patience,
          ingredients chosen with care, and traditions made with honesty.
        </p>
        {/* Promise */}
        <div className="mt-8 border-l-2 border-primary pl-5">
          <p className="text-xl font-semibold leading-relaxed text-gray-900">
            Because every family deserves to know the story behind their food.
          </p>
        </div>

        {/* Brand Values */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-lg">
            ✦
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              The Vedic Story
            </p>

            <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
              Clean · Honest · Pure
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
