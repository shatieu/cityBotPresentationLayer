"use client";

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabLayoutProps {
  tabs: Tab[];
  defaultTab?: string;
  children: (activeTab: string) => React.ReactNode;
}

export function TabLayout({ tabs, defaultTab, children }: TabLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");

  return (
    <div>
      <div className="flex border-b border-gray-100 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? "text-green-700 border-b-2 border-green-700"
                : "text-gray-500 hover:text-green-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children(activeTab)}
    </div>
  );
}
