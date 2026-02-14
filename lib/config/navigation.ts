export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
  visibility: "public" | "authenticated" | "both";
  showInTopNav: boolean;
  showInDashboard: boolean;
};

export const navigationItems: NavItem[] = [
  { id: "gastro", label: "Gastro", href: "/gastro", icon: "Utensils", visibility: "both", showInTopNav: true, showInDashboard: true },
  { id: "kultura", label: "Kultura", href: "/kultura", icon: "Film", visibility: "both", showInTopNav: true, showInDashboard: true },
  { id: "vino", label: "Víno", href: "/vino", icon: "Wine", visibility: "both", showInTopNav: true, showInDashboard: true },
  { id: "udalosti", label: "Události", href: "/udalosti", icon: "Calendar", visibility: "both", showInTopNav: true, showInDashboard: true },
  { id: "firmy", label: "Firmy", href: "/firmy", icon: "Building2", visibility: "both", showInTopNav: true, showInDashboard: true },
  { id: "mapa", label: "Mapa", href: "/mapa", icon: "Map", visibility: "both", showInTopNav: true, showInDashboard: false },
  { id: "zpravy", label: "Zprávy", href: "/zpravy", icon: "Newspaper", visibility: "both", showInTopNav: true, showInDashboard: true },
  { id: "urady", label: "Úřady", href: "/urady", icon: "Landmark", visibility: "both", showInTopNav: false, showInDashboard: true },
  { id: "inzerce", label: "Inzerce", href: "/inzerce", icon: "Tag", visibility: "both", showInTopNav: false, showInDashboard: true },
  { id: "krouzky", label: "Kroužky", href: "/krouzky", icon: "Palette", visibility: "both", showInTopNav: false, showInDashboard: true },
];

export function getTopNavItems(): NavItem[] {
  return navigationItems.filter((item) => item.showInTopNav);
}

export function getMoreItems(): NavItem[] {
  return navigationItems.filter((item) => !item.showInTopNav);
}

export function getDashboardItems(): NavItem[] {
  return navigationItems.filter((item) => item.showInDashboard);
}
