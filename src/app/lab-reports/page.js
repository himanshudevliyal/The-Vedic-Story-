import Breadcrumb from "@/components/breadcrumb";
import { SectionHeading } from "@/components/layout/heading";
import Section from "@/components/layout/section";

const reports = [
  {
    title: "COA Report",
    description:
      "Certificate of Analysis documenting the quality, purity and key test parameters of our A2 Gir Cow Bilona Ghee batch.",
    file: "/img/pdf-1.pdf",
  },
  {
    title: "NABL Report",
    description:
      "Laboratory test report providing verified analysis of the ghee batch against applicable quality and purity parameters.",
    file: "/img/pdf-2.pdf",
  },
];

export default function Blogs() {
  return (
    <>
      <Breadcrumb current="Lab Reports" bgImage="/img/breadcrumb.png" />

      <Section>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reports.map((report) => (
            <a
              key={report.file}
              href={report.file}
              download
              className="group flex items-center gap-5 rounded-[var(--radius)] border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2v6h6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-heading text-lg text-foreground">
                  {report.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {report.description}
                </p>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </>
  );
}
