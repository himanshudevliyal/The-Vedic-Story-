"use client";

import Image from "next/image";

import { Leaf, Phone, Mail, MapPin } from "lucide-react";

const navLinks = [
  { name: "Shop", href: "/products" },
  { name: "Our Story", href: "/our-story" },
  { name: "The Vedic Process", href: "/vedic-process" },
  { name: "The Ahimsa Promise", href: "/ahimsa-promise" },
  { name: "Lab Reports", href: "/lab-reports" },
  { name: "Contact", href: "/contact" },
];

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2 py-2 border-b border-white/5 last:border-0"
    >
      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/5 text-[10px] text-white/40 transition-colors group-hover:bg-[#D8A83E] group-hover:text-[#371700]">
        ›
      </span>

      <span className="text-[13px] text-white/50 transition-colors group-hover:text-[#D8A83E]">
        {children}
      </span>
    </a>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold text-white">{children}</h3>

      <div className="mt-3 h-0.5 w-8 bg-[#D8A83E]" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#1D0B03] via-[#371700] to-[#522400] text-white">
      {/* Background Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D8A83E 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#D8A83E]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 xl:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/white-logo.png"
              alt="The Vedic Story"
              width={200}
              height={90}
              className="mb-4"
            />

            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              The Vedic Story brings you traditionally handcrafted A2 Gir Cow
              Bilona Ghee, made with patience, purity and the timeless wisdom of
              the Vedic way.
            </p>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              From ethical cow care to traditional Bilona churning, every jar
              carries a story of authenticity, craftsmanship and conscious
              nourishment.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <FooterHeading>Explore</FooterHeading>

            <nav>
              {navLinks.map((link) => (
                <FooterLink key={link.href} href={link.href}>
                  {link.name}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <FooterHeading>Get in Touch</FooterHeading>

            <div className="space-y-5 text-sm">
              {/* Address */}
              <div className="flex gap-3">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#D8A83E]/10">
                  <MapPin size={16} className="text-[#D8A83E]" />
                </span>

                <p className="pt-1.5 leading-relaxed text-white/60">
                  Faridabad, Haryana, India
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:7827307546"
                className="group flex items-center gap-3"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#D8A83E]/10">
                  <Phone size={16} className="text-[#D8A83E]" />
                </span>

                <span className="text-white/60 transition-colors group-hover:text-[#D8A83E]">
                  +91 7827 307546
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:thevedicstory@gmail.com"
                className="group flex items-center gap-3"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#D8A83E]/10">
                  <Mail size={16} className="text-[#D8A83E]" />
                </span>

                <span className="text-white/60 transition-colors group-hover:text-[#D8A83E]">
                  thevedicstory@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />

          <Leaf size={16} className="text-[#D8A83E]" />

          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Bottom Bar */}
        <div className=" py-6 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} The Vedic Story. All Rights Reserved.{" "}
            Designed & Developed by{" "}
            <a
              href="https://brandingwaale.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8A83E] transition-colors hover:text-[#F0C866]"
            >
              Brandingwaale Webtech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
