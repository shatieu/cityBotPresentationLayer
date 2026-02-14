export interface WidgetConfig {
  id: string;
  enabled: boolean;
  options?: Record<string, unknown>;
}

export interface DashboardConfig {
  widgets: WidgetConfig[];
}

export type WidgetSize = "small" | "medium" | "large";

export interface WidgetMeta {
  id: string;
  title: string;
  icon: string;
  href: string;
  defaultSize: WidgetSize;
  defaultEnabled: boolean;
}

export const WIDGET_REGISTRY: WidgetMeta[] = [
  { id: "denni-menu", title: "Denní menu", icon: "Utensils", href: "/gastro/denni-menu", defaultSize: "large", defaultEnabled: true },
  { id: "kino-dnes", title: "Kino dnes", icon: "Film", href: "/kultura/kino", defaultSize: "medium", defaultEnabled: true },
  { id: "divadlo-dnes", title: "Divadlo dnes", icon: "Theater", href: "/kultura/divadlo", defaultSize: "small", defaultEnabled: true },
  { id: "udalosti", title: "Události", icon: "Calendar", href: "/udalosti", defaultSize: "medium", defaultEnabled: true },
  { id: "vino", title: "Víno & degustace", icon: "Wine", href: "/vino", defaultSize: "medium", defaultEnabled: true },
  { id: "zpravy", title: "Zprávy", icon: "Newspaper", href: "/zpravy", defaultSize: "medium", defaultEnabled: true },
  { id: "uredni-deska", title: "Úřední deska", icon: "FileText", href: "/urady/uredni-deska", defaultSize: "small", defaultEnabled: true },
  { id: "inzerce", title: "Inzerce", icon: "Tag", href: "/inzerce", defaultSize: "medium", defaultEnabled: true },
  { id: "krouzky", title: "Kroužky", icon: "Palette", href: "/krouzky", defaultSize: "small", defaultEnabled: true },
  { id: "pocasi", title: "Počasí", icon: "CloudSun", href: "#", defaultSize: "small", defaultEnabled: true },
  { id: "chat", title: "Asistent", icon: "MessageCircle", href: "/firmy/chat", defaultSize: "medium", defaultEnabled: false },
  { id: "mapa", title: "Mapa", icon: "MapPin", href: "/mapa", defaultSize: "medium", defaultEnabled: false },
  { id: "gastro-nabidky", title: "Gastro nabídky", icon: "ShoppingBag", href: "/gastro", defaultSize: "medium", defaultEnabled: true },
];
