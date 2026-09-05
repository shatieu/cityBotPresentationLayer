import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "./TrustBadge";
import { formatRelativeDate } from "@/lib/utils/format-date";
import type { NewsSummary } from "@/lib/types";
import Link from "next/link";

interface NewsCardProps {
  article: NewsSummary;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <Link href={`/zpravy/${article.id}`}>
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-heading font-semibold text-ink-900">
              {article.title}
            </h3>
            {article.summary && (
              <p className="text-sm text-stone-700 mt-1 line-clamp-2">
                {article.summary}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="stone">{article.source_name}</Badge>
              <span className="text-xs text-stone-500">
                {formatRelativeDate(article.published_at)}
              </span>
            </div>
          </div>
          {article.provenance && <TrustBadge provenance={article.provenance} />}
        </div>
      </Card>
    </Link>
  );
}
