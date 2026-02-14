"use client";

import { useState, useCallback, useEffect } from "react";
import type { DashboardConfig, WidgetConfig } from "@/lib/types/dashboard";
import { WIDGET_REGISTRY } from "@/lib/types/dashboard";

const STORAGE_KEY = "znojmo-dashboard-config";

function getDefaultConfig(): DashboardConfig {
  return {
    widgets: WIDGET_REGISTRY.map((w) => ({
      id: w.id,
      enabled: w.defaultEnabled,
    })),
  };
}

function loadConfig(): DashboardConfig {
  if (typeof window === "undefined") return getDefaultConfig();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultConfig();
    const parsed = JSON.parse(raw) as DashboardConfig;
    // Merge with registry to handle new widgets added after user saved config
    const existingIds = new Set(parsed.widgets.map((w) => w.id));
    const merged = [
      ...parsed.widgets,
      ...WIDGET_REGISTRY.filter((w) => !existingIds.has(w.id)).map((w) => ({
        id: w.id,
        enabled: w.defaultEnabled,
      })),
    ];
    return { widgets: merged };
  } catch {
    return getDefaultConfig();
  }
}

function saveConfig(config: DashboardConfig) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function useDashboardConfig() {
  const [config, setConfig] = useState<DashboardConfig>(getDefaultConfig);

  useEffect(() => {
    setConfig(loadConfig());
  }, []);

  const toggleWidget = useCallback((widgetId: string) => {
    setConfig((prev) => {
      const next: DashboardConfig = {
        widgets: prev.widgets.map((w) =>
          w.id === widgetId ? { ...w, enabled: !w.enabled } : w
        ),
      };
      saveConfig(next);
      return next;
    });
  }, []);

  const updateWidgetOptions = useCallback(
    (widgetId: string, options: Record<string, unknown>) => {
      setConfig((prev) => {
        const next: DashboardConfig = {
          widgets: prev.widgets.map((w) =>
            w.id === widgetId ? { ...w, options: { ...w.options, ...options } } : w
          ),
        };
        saveConfig(next);
        return next;
      });
    },
    []
  );

  const getWidget = useCallback(
    (widgetId: string): WidgetConfig | undefined => {
      return config.widgets.find((w) => w.id === widgetId);
    },
    [config]
  );

  const enabledWidgets = config.widgets.filter((w) => w.enabled);

  return { config, enabledWidgets, toggleWidget, updateWidgetOptions, getWidget };
}
