import { PageContainer } from "@/components/layout/PageContainer";
import { NewsCard } from "@/components/data-display/NewsCard";
import { listNews } from "@/lib/api/news";

export default async function ZpravyPage() {
  const news = await listNews();

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-1">
        Zprávy
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Lokální zprávy ze Znojma a okolí
      </p>
      <div className="space-y-4">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </PageContainer>
  );
}
