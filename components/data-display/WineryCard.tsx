import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { WinerySummary } from "@/lib/types";

interface WineryCardProps {
  winery: WinerySummary;
}

export function WineryCard({ winery }: WineryCardProps) {
  return (
    <Link href={`/vino/${winery.slug}`}>
      <Card>
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading font-semibold text-ink-900">
            {winery.name}
          </h3>
          {winery.open_today && (
            <Badge variant="gold">Otevřeno</Badge>
          )}
          {winery.open_today === false && (
            <Badge variant="stone">Zavřeno</Badge>
          )}
        </div>
        {winery.wine_types && winery.wine_types.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {winery.wine_types.slice(0, 4).map((type) => (
              <Badge key={type} variant="wine">{type}</Badge>
            ))}
          </div>
        )}
        {winery.address && (
          <p className="text-xs text-stone-700 mt-1">{winery.address}</p>
        )}
        {winery.has_tastings && (
          <p className="text-xs text-gold-700 mt-1.5 font-medium">
            Degustace k dispozici
          </p>
        )}
      </Card>
    </Link>
  );
}
