const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

export default function Card({ slug, id, title, img }) {
  return (
    <>
      <Link
        href={""}
        key={id}
        className="relative  rounded-[20px] overflow-hidden cursor-pointer transition-all duration-[600ms] shadow-[0_10px_30px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,193,7,0.1)] bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,193,7,0.1)_0%,transparent_50%,rgba(255,193,7,0.1)_100%)] z-[1]"></div>

        <Image
          src={img}
          width={400}
          height={300}
          alt={title || "Category Image"}
          className="w-full h-full object-cover opacity-70 filter brightness-[0.8] contrast-[1.2] z-[0]"
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 z-[2] bg-gradient-to-t from-black/80 to-transparent">
          <h4 className="text-lg font-semibold text-white text-center">
            {title}
          </h4>
        </div>
      </Link>
    </>
  );
}
