import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { listCouncilSessions } from "@/lib/api/offices";
import { formatCzechDate } from "@/lib/utils/format-date";

export default async function ZastupitelstvoPage() {
  const sessions = await listCouncilSessions();

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-1">
        Zastupitelstvo
      </h1>
      <p className="text-sm text-gray-700 mb-6">
        Zasedání zastupitelstva města Znojma
      </p>

      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-heading font-semibold text-green-900">
                  {session.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  <time dateTime={session.date}>
                    {formatCzechDate(session.date)}
                  </time>
                </p>
                {session.summary && (
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                    {session.summary}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Badge variant={session.minutes_url ? "green" : "gray"}>
                  {session.minutes_url ? "Proběhlo" : "Nadcházející"}
                </Badge>
                {session.minutes_url && (
                  <a
                    href={session.minutes_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-green-700 hover:text-green-500"
                  >
                    Zápis ze zasedání
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
