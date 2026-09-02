import CurvedLoop from "@/components/CurvedLoop";

export default function Marquee(params) {
  return (
    <>
      <div className="bg-primary py-12">
        <CurvedLoop
          marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
          speed={1.3}
          curveAmount={0}
          direction="right"
          interactive
          className="custom-text-style"
        />
      </div>
    </>
  );
}
// Basic usage
