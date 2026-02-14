import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  seeAllHref?: string;
  seeAllLabel?: string;
}

export function SectionHeading({
  title,
  seeAllHref,
  seeAllLabel = "Zobrazit vše",
}: SectionHeadingProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 mb-4">
      <h2 className="font-heading text-xl font-semibold text-green-900">
        {title}
      </h2>
      {seeAllHref && (
        <Link
          href={seeAllHref}
          className="text-sm text-green-700 hover:text-green-500 transition-colors font-medium whitespace-nowrap"
        >
          {seeAllLabel}
        </Link>
      )}
    </div>
  );
}
