import Link from "next/link";
import { notFound } from "next/navigation";
import { blogs } from "@/contentdata/blogs-data";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const post = blogs.find((blog) => blog.slug === slug);

  if (!post) notFound();

  const related = blogs.filter((b) => b.id !== post.id).slice(0, 2);

  return (
    <article className="min-h-screen bg-background">
      {/* ── Top nav bar ── */}
      <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Link href="/blog">
              <ArrowLeft className="size-4" />
              Back to blog
            </Link>
          </Button>
          <span className="hidden text-sm text-muted-foreground sm:inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* ── Main content wrapper ── */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left Column: Main Content ── */}
          <div className="lg:col-span-2">
            {/* Hero / Header */}
            <header className="pb-8">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  {post.category}
                </Badge>
                <span className="text-border">·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="size-3.5" />
                  {post.date}
                </span>
                <span className="text-border">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h1
                className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-foreground md:text-[2.6rem]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {post.excerpt}
              </p>

              {/* Accent divider */}
              <div className="mt-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <div className="h-1.5 w-8 rounded-full bg-primary" />
                <div className="h-px flex-1 bg-border" />
              </div>
            </header>

            {/* Hero Image */}
            <div className="mb-12">
              <div className="overflow-hidden rounded-2xl border shadow-sm">
                <Image
                  width={500}
                  height={500}
                  src={post.image}
                  alt={post.title}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>

            {/* Body Content */}
            <div className="space-y-12">
              {post.sections.map((section, i) => (
                <section key={i} className="scroll-mt-24">
                  {/* Section heading with accent dot */}
                  {section.heading && (
                    <div className="mb-5 flex items-start gap-3">
                      <div className="mt-2 h-5 w-1 shrink-0 rounded-full bg-primary" />
                      <h2
                        className="text-xl font-semibold leading-snug text-foreground md:text-2xl"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {section.heading}
                      </h2>
                    </div>
                  )}

                  {/* Paragraphs */}
                  {section.paragraphs?.map((p, j) => (
                    <p
                      key={j}
                      className="mt-3 text-base leading-[1.85] text-foreground/80"
                    >
                      {p}
                    </p>
                  ))}

                  {/* List items */}
                  {section.list && (
                    <ul className="mt-4 space-y-3">
                      {section.list.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-3 rounded-lg border border-border/60 bg-muted/40 px-4 py-3 text-sm text-foreground/80 transition-colors hover:border-primary/30 hover:bg-secondary/40"
                        >
                          <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="leading-relaxed">
                            {item.title && (
                              <span className="font-semibold text-foreground">
                                {item.title}:{" "}
                              </span>
                            )}
                            <span>{item.text}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Callout strip */}
            <div className="mt-14 rounded-2xl border border-primary/20 bg-secondary/60 px-6 py-6 text-center">
              <p
                className="text-lg font-semibold text-foreground"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Supporting digestive health is the foundation of total
                well-being.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Ayurveda offers timeless wisdom for modern lifestyle challenges.
              </p>
            </div>

            <Separator className="my-14" />

            {/* FAQ */}
            <section>
              <div className="mb-2 flex items-start gap-3">
                <div className="mt-2 h-5 w-1 shrink-0 rounded-full bg-accent" />
                <h2
                  className="text-xl font-semibold text-foreground md:text-2xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="mb-6 pl-4 text-sm text-muted-foreground">
                Common questions answered about this topic.
              </p>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {post.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="overflow-hidden rounded-xl border border-border/70 px-1 transition-colors data-[state=open]:border-primary/40 data-[state=open]:bg-secondary/30"
                  >
                    <AccordionTrigger className="px-4 py-4 text-left text-sm font-medium text-foreground hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Related posts */}
            {related.length > 0 && (
              <>
                <Separator className="my-14" />
                <section>
                  <div className="mb-6 flex items-center justify-between">
                    <h2
                      className="text-xl font-semibold text-foreground md:text-2xl"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Continue reading
                    </h2>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <Link href="/blog">
                        All posts
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </section>
              </>
            )}
          </div>

          {/* ── Right Column: Sidebar ── */}
          <div className="lg:col-span-1">
            {/* Sticky sidebar */}
            <div className="sticky top-20 space-y-6">
              {/* Related Products Card */}
              <aside className="rounded-2xl border bg-card p-6">
                <h3 className="mb-6 text-2xl font-semibold text-foreground">
                  Related Articles
                </h3>

                <div className="space-y-6">
                  {related.map((blog, index) => (
                    <div key={blog.id}>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="group flex gap-4"
                      >
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex-1">
                          <h4 className="line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                            {blog.title}
                          </h4>

                          <p className="mt-2 text-sm text-muted-foreground">
                            {blog.date}
                          </p>
                        </div>
                      </Link>

                      {index !== blogs.length - 1 && (
                        <div className="mt-6 border-b" />
                      )}
                    </div>
                  ))}
                </div>
              </aside>

              {/* Contact Details Card */}
              <Card className="border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5">
                <CardHeader>
                  <CardTitle
                    className="text-lg text-foreground"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-lg bg-accent/20">
                      <Phone className="size-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Phone
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-1">
                        +91 97119 75094
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-lg bg-accent/20">
                      <Mail className="size-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-foreground mt-1 break-all">
                        radhayuherbals@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 rounded-lg bg-accent/20">
                      <MapPin className="size-4 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase">
                        Address
                      </p>
                      <p className="text-sm text-foreground mt-1 leading-relaxed">
                        DPT 808B, F79 & 80, DLF Prime Tower, Industrial Area,
                        Okhla Phase-1, New Delhi - 110020
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full mt-6 gap-2">
                    <Mail className="size-4" />
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
