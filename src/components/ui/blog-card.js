import Image from "next/image";
import Link from "next/link";

export default function BlogCard({
  title,
  excerpt,
  image,
  slug,
  category,
  date,
  readTime,
}) {
  return (
    <div className="group overflow-hidden">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-60 w-full overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="py-4">
        <div className="mb-2 flex flex-wrap gap-2 text-xs text-gray-500">
          <span>{category}</span>
          <span>•</span>
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        <h3 className="mb-2 line-clamp-2 text-xl font-semibold">{title}</h3>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600">{excerpt}</p>

        <Link href={`/blog/${slug}`} className="font-medium hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
}
