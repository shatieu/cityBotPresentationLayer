import { Badge } from "@/components/ui/Badge";
import { PageContainer } from "./PageContainer";
import type { PlaceDetail, OpeningHours } from "@/lib/types";

interface PlacePageLayoutProps {
  place: PlaceDetail;
  children: React.ReactNode;
}

const typeLabels: Record<string, string> = {
  restaurant: "Restaurace",
  cafe: "Kavárna",
  bar: "Bar",
  cinema: "Kino",
  theatre: "Divadlo",
  winery: "Vinařství",
  attraction: "Památka",
  accommodation: "Ubytování",
  sport: "Sport",
  shopping: "Obchod",
  office: "Úřad",
  business: "Firma",
};

const dayLabels: Record<keyof OpeningHours, string> = {
  monday: "Pondělí",
  tuesday: "Úterý",
  wednesday: "Středa",
  thursday: "Čtvrtek",
  friday: "Pátek",
  saturday: "Sobota",
  sunday: "Neděle",
};

const dayOrder: (keyof OpeningHours)[] = [
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
];

export function PlacePageLayout({ place, children }: PlacePageLayoutProps) {
  return (
    <PageContainer className="py-6">
      {/* Hero area */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="default">
            {typeLabels[place.type] || place.type}
          </Badge>
        </div>
        <h1 className="font-heading text-2xl font-bold text-green-900 mb-2">
          {place.name}
        </h1>
        {place.address && (
          <p className="text-sm text-gray-700">{place.address}</p>
        )}
        {place.phone && (
          <p className="text-sm text-gray-700 mt-1">
            Tel: <a href={`tel:${place.phone}`} className="text-green-700">{place.phone}</a>
          </p>
        )}
        {place.website && (
          <p className="text-sm mt-1">
            <a
              href={place.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:text-green-500 transition-colors"
            >
              {place.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </p>
        )}
      </div>

      {place.description && (
        <p className="text-sm text-gray-900 mb-6 leading-relaxed">
          {place.description}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          {children}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Opening hours */}
          {place.opening_hours && (
            <div className="bg-white rounded-base shadow-card p-4">
              <h3 className="font-heading font-semibold text-green-900 mb-3">
                Otevírací doba
              </h3>
              <dl className="space-y-1">
                {dayOrder.map((day) => {
                  const value = place.opening_hours?.[day];
                  if (!value) return null;
                  return (
                    <div key={day} className="flex justify-between text-sm">
                      <dt className="text-gray-700">{dayLabels[day]}</dt>
                      <dd className="font-data text-gray-900">{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}

          {/* External links */}
          {place.links && Object.keys(place.links).length > 0 && (
            <div className="bg-white rounded-base shadow-card p-4">
              <h3 className="font-heading font-semibold text-green-900 mb-3">
                Odkazy
              </h3>
              <ul className="space-y-1.5">
                {Object.entries(place.links).map(([label, url]) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-700 hover:text-green-500 transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
