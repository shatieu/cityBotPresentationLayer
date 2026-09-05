import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { getBusiness } from "@/lib/api/businesses";
import type { BusinessDetail } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BusinessDetailPage({ params }: Props) {
  const { slug } = await params;
  const business = await getBusiness(slug) as BusinessDetail;

  return (
    <PageContainer className="py-6">
      <div className="max-w-3xl">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-ink-900">
              {business.name}
            </h1>
            <p className="text-sm text-stone-500 mt-0.5">{business.address}</p>
          </div>
          {business.provenance && <TrustBadge provenance={business.provenance} />}
        </div>

        {business.tags && business.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {business.tags.map((tag) => (
              <Badge key={tag} variant="stone">{tag}</Badge>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Services */}
          {business.services && business.services.length > 0 && (
            <Card hover={false}>
              <h2 className="font-heading font-semibold text-ink-900 mb-3">
                Služby
              </h2>
              <ul className="space-y-1.5">
                {business.services.map((service) => (
                  <li key={service} className="text-sm text-stone-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-sm bg-gold-300 flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Contact */}
          <Card hover={false}>
            <h2 className="font-heading font-semibold text-ink-900 mb-3">
              Kontakt
            </h2>
            <dl className="space-y-2 text-sm">
              {business.phone && (
                <div>
                  <dt className="text-stone-500">Telefon</dt>
                  <dd className="font-data">
                    <a href={`tel:${business.phone}`} className="text-gold-700">
                      {business.phone}
                    </a>
                  </dd>
                </div>
              )}
              {business.website && (
                <div>
                  <dt className="text-stone-500">Web</dt>
                  <dd>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-700 hover:text-gold-500 transition-colors"
                    >
                      {business.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </dd>
                </div>
              )}
              {business.ico && (
                <div>
                  <dt className="text-stone-500">IČO</dt>
                  <dd className="font-data text-stone-700">{business.ico}</dd>
                </div>
              )}
            </dl>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
