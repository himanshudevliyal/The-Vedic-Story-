import Breadcrumb from "@/components/breadcrumb";
import ContactForm from "@/components/form/contact-us";
import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";
import FAQ from "@/home/faq";
import { Phone, Mail, MapPin, Clock, GlobeXIcon } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Breadcrumb current="Contact" bgImage="/img/breadcrumb.png" />

      <Section>
        <SectionHeading
          badge="Contact us"
          title={"Contact "}
          des=" At Viwana, we embrace authentic Ayurveda to nurture holistic
                  wellness, empowering you to find balance and rejuvenation in life."
          highlight="us"
          className="  text-center"
          titleClassName="text-4xl text-center"
        />

        <div className=" grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-primary text-white p-10 md:p-14 flex flex-col justify-between">
            <div>
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <a
                      href="tel:7827307546"
                      className="text-green-100 hover:text-white transition-colors"
                    >
                      +91 78273 07546
                    </a>
                  </div>
                </div>
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <a
                      href="mailto:thevedicstory@gmail.com"
                      className="text-green-100 hover:text-white transition-colors"
                    >
                      thevedicstory@gmail.com
                    </a>
                  </div>
                </div>
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-green-100">Faridabad, Haryana, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION (FORM) */}
          <div className="bg-primary/20 p-10">
            <ContactForm />
          </div>
        </div>
      </Section>

      <div className="bg-gray-50">
        <FAQ />
      </div>
    </>
  );
}
