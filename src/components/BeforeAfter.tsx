import SafeImage from "@/components/SafeImage";

const examples = [
  {
    id: "exterior",
    label: "Exterior Detailing",
    before: "/images/before-after/exterior-before.webp",
    after: "/images/before-after/exterior-after.webp",
  },
  {
    id: "interior",
    label: "Interior Deep Clean",
    before: "/images/before-after/interior-before.webp",
    after: "/images/before-after/interior-after.webp",
  },
  {
    id: "ceramic",
    label: "Ceramic Protection",
    before: "/images/before-after/ceramic-before.webp",
    after: "/images/before-after/ceramic-after.webp",
  },
];

export default function BeforeAfter() {
  return (
    <section className="bg-light py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            See the Difference
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            Real results from our detailing work around Lahore.
          </p>
        </div>

        <div className="mt-8 grid sm:mt-10 gap-6 md:grid-cols-3">
          {examples.map((example) => (
            <div
              key={example.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <SafeImage
                    src={example.before}
                    alt={`${example.label} — before`}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-navy/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-square">
                  <SafeImage
                    src={example.after}
                    alt={`${example.label} — after`}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-primary-strong px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    After
                  </span>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm font-semibold text-navy">{example.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
