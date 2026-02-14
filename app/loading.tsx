import { PageContainer } from "@/components/layout/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function HomeLoading() {
  return (
    <PageContainer className="py-6">
      <Skeleton height="32px" width="280px" className="mb-2" />
      <Skeleton height="16px" width="200px" className="mb-section" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-section">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} height="52px" />
        ))}
      </div>

      <Skeleton height="24px" width="160px" className="mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-section">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="180px" />
        ))}
      </div>
    </PageContainer>
  );
}
