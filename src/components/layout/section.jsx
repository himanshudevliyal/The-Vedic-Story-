import { cn } from "@/lib/utils";
import React from "react";

export default function Section({ children, className }) {
  return (
    <section className={cn("py-12 ", className)}>
      <div className=" max-w-7xl mx-auto container  px-4 ">{children}</div>
    </section>
  );
}
