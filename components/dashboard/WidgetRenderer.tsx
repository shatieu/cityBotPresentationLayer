"use client";

import type { WidgetConfig } from "@/lib/types/dashboard";
import { WIDGET_REGISTRY } from "@/lib/types/dashboard";
import { DenniMenuWidget } from "./widgets/DenniMenuWidget";
import { KinoDnesWidget } from "./widgets/KinoDnesWidget";
import { DivadloDnesWidget } from "./widgets/DivadloDnesWidget";
import { UdalostiWidget } from "./widgets/UdalostiWidget";
import { VinoWidget } from "./widgets/VinoWidget";
import { ZpravyWidget } from "./widgets/ZpravyWidget";
import { UredniDeskaWidget } from "./widgets/UredniDeskaWidget";
import { InzerceWidget } from "./widgets/InzerceWidget";
import { KrouzkyWidget } from "./widgets/KrouzkyWidget";
import { PocasiWidget } from "./widgets/PocasiWidget";
import { ChatWidget } from "./widgets/ChatWidget";
import { MapaWidget } from "./widgets/MapaWidget";
import { GastroNabidkyWidget } from "./widgets/GastroNabidkyWidget";

const widgetComponents: Record<string, React.ComponentType> = {
  "denni-menu": DenniMenuWidget,
  "kino-dnes": KinoDnesWidget,
  "divadlo-dnes": DivadloDnesWidget,
  "udalosti": UdalostiWidget,
  "vino": VinoWidget,
  "zpravy": ZpravyWidget,
  "uredni-deska": UredniDeskaWidget,
  "inzerce": InzerceWidget,
  "krouzky": KrouzkyWidget,
  "pocasi": PocasiWidget,
  "chat": ChatWidget,
  "mapa": MapaWidget,
  "gastro-nabidky": GastroNabidkyWidget,
};

interface WidgetRendererProps {
  widgets: WidgetConfig[];
}

export function WidgetRenderer({ widgets }: WidgetRendererProps) {
  return (
    <>
      {widgets.map((w) => {
        const Component = widgetComponents[w.id];
        if (!Component) return null;
        return <Component key={w.id} />;
      })}
    </>
  );
}
