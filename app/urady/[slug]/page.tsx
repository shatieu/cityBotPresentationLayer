import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "@/components/data-display/TrustBadge";
import { getOffice } from "@/lib/api/offices";
import type { OfficeDetail } from "@/lib/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OfficeDetailPage({ params }: Props) {
  const { slug } = await params;
  const office = await getOffice(slug) as OfficeDetail;

  return (
    <PageContainer className="py-6">
      <div className="max-w-3xl">
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-green-900">
              {office.name}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{office.address}</p>
          </div>
          {office.provenance && <TrustBadge provenance={office.provenance} />}
        </div>

        {office.department && (
          <Badge variant="default" className="mb-6">{office.department}</Badge>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Services */}
          {office.services && office.services.length > 0 && (
            <Card hover={false}>
              <h2 className="font-heading font-semibold text-green-900 mb-3">
                Služby
              </h2>
              <ul className="space-y-1.5">
                {office.services.map((service) => (
                  <li key={service} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-sm bg-green-300 flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Contact */}
          <Card hover={false}>
            <h2 className="font-heading font-semibold text-green-900 mb-3">
              Kontakt
            </h2>
            <dl className="space-y-2 text-sm">
              {office.phone && (
                <div>
                  <dt className="text-gray-500">Telefon</dt>
                  <dd className="font-data">
                    <a href={`tel:${office.phone}`} className="text-green-700">
                      {office.phone}
                    </a>
                  </dd>
                </div>
              )}
              {office.website && (
                <div>
                  <dt className="text-gray-500">Web</dt>
                  <dd>
                    <a
                      href={office.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-500 transition-colors"
                    >
                      {office.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
