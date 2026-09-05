import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HeroCarousel } from "@/components/layout/HeroCarousel";
import { BentoGrid } from "@/components/layout/BentoGrid";
import { BentoCard } from "@/components/data-display/BentoCard";
import { MenuCard } from "@/components/data-display/MenuCard";
import { EventCard } from "@/components/data-display/EventCard";
import { ShowtimeCard } from "@/components/data-display/ShowtimeCard";
import { Button } from "@/components/ui/Button";
import { getTodayMenus } from "@/lib/api/menus";
import { getShowtimes } from "@/lib/api/cinema";
import { listEvents } from "@/lib/api/events";
import { formatCzechDateFull } from "@/lib/utils/format-date";
import { getTimePeriod } from "@/lib/utils/time-of-day";
import { navigationItems } from "@/lib/config/navigation";

const heroSlides = [
  { src: "/placeholders/hero-1.svg", alt: "Znojmo", title: "Znojmo City Hub", subtitle: "Vše o Znojmě na jednom místě" },
  { src: "/placeholders/hero-2.svg", alt: "Vinobraní", title: "Víno a gastronomie", subtitle: "Objevte vinařství a restaurace Znojemska" },
  { src: "/placeholders/hero-3.svg", alt: "Podzemí", title: "Kultura a události", subtitle: "Kino, divadlo, festivaly a koncerty" },
];

export default async function HomePage() {
  const [menusData, showtimesData, eventsData] = await Promise.all([
    getTodayMenus({ limit: 4 }),
    getShowtimes(),
    listEvents({ limit: 4 }),
  ]);

  const menus = menusData.data ?? [];
  const showtimes = showtimesData.data ?? [];
  const events = eventsData.data ?? [];
  const period = getTimePeriod();

  const filmGroups = new Map<string, typeof showtimes>();
  showtimes.forEach((st) => {
    const group = filmGroups.get(st.film_title) ?? [];
    group.push(st);
    filmGroups.set(st.film_title, group);
  });

  const isMenusFirst = period === "morning" || period === "lunch";
  const isCinemaFirst = period === "evening";

  return (
    <PageContainer className="py-6">
      {/* Hero carousel */}
      <section className="mb-section">
        <HeroCarousel slides={heroSlides} />
      </section>

      {/* Date + heading */}
      <section className="mb-section">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-ink-900 mb-1">
          Co dnes ve Znojmě?
        </h1>
        <p className="text-sm text-stone-700">
          {formatCzechDateFull(new Date())}
        </p>
      </section>

      {/* Domain quick links as bento grid */}
      <section className="mb-section">
        <BentoGrid columns={4}>
          {navigationItems.filter((n) => n.showInDashboard).map((item) => (
            <BentoCard
              key={item.id}
              id={item.id}
              label={item.label}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </section>

      {/* Content sections — order depends on time of day */}
      {isMenusFirst && (
        <>
          <MenusSection menus={menus} />
          <EventsSection events={events} />
          <CinemaSection filmGroups={filmGroups} />
        </>
      )}

      {isCinemaFirst && (
        <>
          <CinemaSection filmGroups={filmGroups} />
          <EventsSection events={events} />
          <MenusSection menus={menus} />
        </>
      )}

      {!isMenusFirst && !isCinemaFirst && (
        <>
          <EventsSection events={events} />
          <CinemaSection filmGroups={filmGroups} />
          <MenusSection menus={menus} />
        </>
      )}

      {/* CTA */}
      <section className="mb-section text-center py-8">
        <h2 className="font-heading text-xl font-semibold text-ink-900 mb-2">
          Přizpůsobte si Znojmo
        </h2>
        <p className="text-sm text-stone-700 mb-4 max-w-md mx-auto">
          Vytvořte si účet a nastavte si dashboard podle svých zájmů —
          oblíbené restaurace, události a víc.
        </p>
        <Link href="/registrace">
          <Button variant="primary" size="lg">Vytvořit účet</Button>
        </Link>
      </section>
    </PageContainer>
  );
}

function MenusSection({ menus }: { menus: NonNullable<Awaited<ReturnType<typeof getTodayMenus>>["data"]> }) {
  if (menus.length === 0) return null;
  return (
    <section className="mb-section">
      <SectionHeading title="Denní menu" seeAllHref="/gastro/denni-menu" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menus.map((menu, i) => (
          <MenuCard key={menu.place_id || i} menu={menu} />
        ))}
      </div>
    </section>
  );
}

function CinemaSection({ filmGroups }: { filmGroups: Map<string, NonNullable<Awaited<ReturnType<typeof getShowtimes>>["data"]>> }) {
  if (filmGroups.size === 0) return null;
  return (
    <section className="mb-section">
      <SectionHeading title="V kině" seeAllHref="/kultura/kino" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from(filmGroups.entries())
          .slice(0, 4)
          .map(([title, sts]) => (
            <ShowtimeCard key={title} showtimes={sts} />
          ))}
      </div>
    </section>
  );
}

function EventsSection({ events }: { events: NonNullable<Awaited<ReturnType<typeof listEvents>>["data"]> }) {
  if (events.length === 0) return null;
  return (
    <section className="mb-section">
      <SectionHeading title="Události" seeAllHref="/udalosti" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
