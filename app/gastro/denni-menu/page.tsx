import { PageContainer } from "@/components/layout/PageContainer";
import { MenuCard } from "@/components/data-display/MenuCard";
import { getTodayMenus } from "@/lib/api/menus";

export default async function DailyMenuPage() {
  const menusRes = await getTodayMenus();
  const menus = menusRes.data ?? [];

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-1">
        Denní menu
      </h1>
      <p className="text-sm text-gray-700 mb-6">
        Dnešní nabídka restaurací ve Znojmě
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menus.map((menu, i) => (
          <MenuCard key={menu.place_id || i} menu={menu} />
        ))}
      </div>
    </PageContainer>
  );
}
