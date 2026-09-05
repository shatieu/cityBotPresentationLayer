"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  Utensils,
  Film,
  Wine,
  Calendar,
  Building2,
  Landmark,
  Tag,
  Palette,
  Newspaper,
  MapPin,
} from "lucide-react";

interface BentoCardProps {
  id: string;
  label: string;
  href: string;
  icon: string;
  count?: number;
  description?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Utensils,
  Film,
  Wine,
  Calendar,
  Building2,
  Landmark,
  Tag,
  Palette,
  Newspaper,
  Map: MapPin,
};

export function BentoCard({ id, label, href, icon, count, description }: BentoCardProps) {
  const Icon = iconMap[icon] ?? MapPin;

  return (
    <Link href={href}>
      <Card className="h-full flex flex-col items-start gap-3">
        <div className="w-10 h-10 rounded-base bg-gold-100 flex items-center justify-center">
          <Icon size={20} className="text-gold-700" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-ink-900">{label}</h3>
          {description && (
            <p className="text-sm text-stone-500 mt-0.5">{description}</p>
          )}
          {count !== undefined && (
            <p className="font-data text-sm text-wine-700 mt-1">
              {count} položek
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
