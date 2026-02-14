import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TrustBadge } from "./TrustBadge";
import type { ActivitySummary } from "@/lib/types";

interface ActivityCardProps {
  activity: ActivitySummary;
}

const categoryLabels: Record<string, string> = {
  dance: "Tanec",
  sports: "Sport",
  languages: "Jazyky",
  art: "Výtvarno",
  music: "Hudba",
  crafts: "Řemesla",
  other: "Ostatní",
};

const categoryVariants: Record<string, "default" | "green" | "amber" | "gray"> = {
  dance: "amber",
  sports: "green",
  languages: "default",
  art: "amber",
  music: "green",
  crafts: "default",
  other: "gray",
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Link href={`/krouzky/${activity.id}`}>
      <Card>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading font-semibold text-green-900">
              {activity.title}
            </h3>
            <p className="text-sm text-gray-700 mt-1">{activity.schedule}</p>
            {activity.place && (
              <p className="text-xs text-gray-500 mt-1">
                {activity.place.name}
              </p>
            )}
            {activity.price && (
              <p className="font-data text-sm text-amber-700 mt-1">
                {activity.price}
              </p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {activity.category && (
              <Badge variant={categoryVariants[activity.category] ?? "gray"}>
                {categoryLabels[activity.category] ?? activity.category}
              </Badge>
            )}
            {activity.provenance && <TrustBadge provenance={activity.provenance} />}
          </div>
        </div>
      </Card>
    </Link>
  );
}
