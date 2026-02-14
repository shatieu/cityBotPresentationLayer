import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { listNotices } from "@/lib/api/offices";
import { formatCzechDate } from "@/lib/utils/format-date";

export default async function UredniDeskaPage() {
  const notices = await listNotices();

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-1">
        Úřední deska
      </h1>
      <p className="text-sm text-gray-700 mb-6">
        Veřejné vyhlášky a oznámení města Znojma
      </p>

      <div className="space-y-4">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <h3 className="font-heading font-semibold text-green-900">
              {notice.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Zveřejněno: {formatCzechDate(notice.published_at)}
              {notice.expires_at && ` · Platnost do: ${formatCzechDate(notice.expires_at)}`}
            </p>
            {notice.document_url && (
              <a
                href={notice.document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-green-700 hover:text-green-500 font-medium"
              >
                Stáhnout dokument (PDF)
              </a>
            )}
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
