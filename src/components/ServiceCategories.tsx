import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { serviceCategories } from "@/data/service-categories";

/**
 * The three top-level services AutoGlow offers in Lahore. Each card links to
 * its dedicated page; pricing for all three lives in the pricing section below.
 */
export default function ServiceCategories() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {serviceCategories.map((category) => (
        <div
          key={category.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="relative aspect-[16/9] w-full shrink-0 bg-light">
            <SafeImage
              src={category.image}
              alt={category.imageAlt}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="text-base font-semibold text-navy sm:text-lg">{category.name}</h3>
            <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
              {category.description}
            </p>
            <p className="mt-3 text-sm font-semibold text-navy">
              Starting from{" "}
              <span className="text-primary-strong">{category.startingPrice}</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href={category.href}
                className="inline-flex items-center text-sm font-semibold text-primary-strong transition-colors group-hover:text-[#0559b0]"
              >
                Learn More &rarr;
              </Link>
              {/* A plain anchor (not Link) so an on-page hash change actually
                  fires hashchange and the pricing tab switches. */}
              <a
                href={`/#pricing-${category.id}`}
                className="inline-flex items-center text-sm font-medium text-muted transition-colors hover:text-primary"
              >
                View Packages
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
