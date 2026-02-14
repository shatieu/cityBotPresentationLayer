import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { getClassified } from "@/lib/api/classifieds";
import { formatCzechDateFull } from "@/lib/utils/format-date";
import type { ClassifiedDetail } from "@/lib/types";

interface Props {
  params: Promise<{ id: string }>;
}

const adTypeLabels: Record<string, string> = {
  offer: "Nabídka",
  request: "Poptávka",
  job: "Práce",
};

export default async function ClassifiedDetailPage({ params }: Props) {
  const { id } = await params;
  const ad = await getClassified(id) as ClassifiedDetail;

  return (
    <PageContainer className="py-6">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="green">
            {adTypeLabels[ad.ad_type] ?? ad.ad_type}
          </Badge>
          {ad.category && <Badge variant="gray">{ad.category}</Badge>}
          {ad.provenance && <TrustBadge provenance={ad.provenance} />}
        </div>

        <h1 className="font-heading text-2xl font-bold text-green-900 mb-2">
          {ad.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-700 mb-6">
          {ad.price && (
            <span className="font-data text-amber-700">{ad.price}</span>
          )}
          {ad.location && <span>{ad.location}</span>}
          <span className="text-gray-500">
            {formatCzechDateFull(ad.created_at)}
          </span>
        </div>

        {ad.description && (
          <div className="text-sm text-gray-900 leading-relaxed mb-6 whitespace-pre-line">
            {ad.description}
          </div>
        )}

        {ad.contact && (
          <div className="bg-white rounded-base shadow-card p-4">
            <h2 className="font-heading font-semibold text-green-900 mb-2">
              Kontakt
            </h2>
            <p className="text-sm text-gray-700">{ad.contact}</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
