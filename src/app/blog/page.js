import Breadcrumb from "@/components/breadcrumb";
import BlogSection from "@/home/blog-section";

export default function Blogs(params) {
  return (
    <>
      <Breadcrumb current="Our Blog" bgImage="/img/breadcrumb.png" />

      <BlogSection />
    </>
  );
}
