import { PageContainer } from "@/components/layout/PageContainer";
import { TheatreCard } from "@/components/data-display/TheatreCard";
import { getTheatreProgram } from "@/lib/api/theatre";

export default async function DivadloPage() {
  const shows = await getTheatreProgram();

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-1">
        Divadlo
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Program znojemských divadel
      </p>
      <div className="space-y-4">
        {shows.map((show) => (
          <TheatreCard key={show.id} show={show} />
        ))}
      </div>
    </PageContainer>
  );
}
