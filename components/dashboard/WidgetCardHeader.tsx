import Link from "next/link";
import {
  Utensils, Film, Calendar, Wine, Newspaper, FileText,
  Tag, Palette, CloudSun, MessageCircle, MapPin, Theater,
  ArrowRight, ShoppingBag,
} from "lucide-react";
import type { WidgetAccent } from "./WidgetCard";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Utensils, Film, Calendar, Wine, Newspaper, FileText,
  Tag, Palette, CloudSun, MessageCircle, MapPin, Theater,
  ShoppingBag, ArrowRight,
};

const accentIconBg: Record<WidgetAccent, string> = {
  green: "bg-green-100 text-green-700",
  amber: "bg-amber-100 text-amber-700",
  terracotta: "bg-terracotta-100 text-terracotta-700",
  neutral: "bg-gray-100 text-gray-700",
};

interface WidgetCardHeaderProps {
  title: string;
  icon: string;
  href: string;
  accent?: WidgetAccent;
}

export function WidgetCardHeader({ title, icon, href, accent = "green" }: WidgetCardHeaderProps) {
  const Icon = iconMap[icon];

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className={`w-7 h-7 rounded-base flex items-center justify-center ${accentIconBg[accent]}`}>
            <Icon size={15} />
          </div>
        )}
        <h3 className="font-heading font-bold text-sm text-green-900">
          {title}
        </h3>
      </div>
      {href !== "#" && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-green-700 bg-transparent hover:bg-green-50 px-2 py-1 rounded-base transition-all"
        >
          Zobrazit vše
          <ArrowRight size={12} />
        </Link>
      )}
    </div>
  );
}
