import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { Button } from "@/components/ui/Button";
import { getNewsArticle } from "@/lib/api/news";
import { formatCzechDateFull } from "@/lib/utils/format-date";
import type { NewsDetail } from "@/lib/types";
import { ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const article = await getNewsArticle(id) as NewsDetail;

  return (
    <PageContainer className="py-6">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="stone">{article.source_name}</Badge>
          {article.provenance && <TrustBadge provenance={article.provenance} />}
        </div>

        <h1 className="font-heading text-2xl font-bold text-ink-900 mb-2">
          {article.title}
        </h1>

        <p className="text-sm text-stone-500 mb-6">
          {formatCzechDateFull(article.published_at)}
        </p>

        {article.summary && (
          <div className="text-sm text-ink-900 leading-relaxed mb-6">
            {article.summary}
          </div>
        )}

        {article.source_url && (
          <a href={article.source_url} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary">
              <ExternalLink size={16} />
              Přečíst na {article.source_name}
            </Button>
          </a>
        )}
      </div>
    </PageContainer>
  );
}
