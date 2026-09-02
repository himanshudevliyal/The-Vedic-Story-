import { blogs } from "@/contentdata/blogs-data";
import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";
import BlogCard from "@/components/ui/blog-card";

export default function BlogSection({
  limit,
  heading = true,
  title = "Our",
  highlight = "Blogs",
}) {
  const displayBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <Section>
      {heading && (
        <SectionHeading
          des="Dive into our thoughtfully curated blog collection, where ancient Ayurvedic wisdom meets modern wellness. Explore articles on digestion, herbal care, daily routines, and holistic health to support a naturally balanced life."
          title={title}
          highlight={highlight}
          className="mb-14 md:text-xl text-center"
          titleClassName="text-4xl"
        />
      )}

      <div className="grid gap-6 lg:grid-cols-3 ">
        {displayBlogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </Section>
  );
}
