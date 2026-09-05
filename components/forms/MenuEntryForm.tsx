"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2 } from "lucide-react";

interface MenuEntryFormProps {
  onSubmit: (items: MenuItemEntry[]) => void;
}

export interface MenuItemEntry {
  name: string;
  category: string;
  price: string;
}

const categories = [
  { value: "soup", label: "Polévka" },
  { value: "main", label: "Hlavní jídlo" },
  { value: "dessert", label: "Dezert" },
  { value: "drink", label: "Nápoj" },
  { value: "other", label: "Ostatní" },
];

export function MenuEntryForm({ onSubmit }: MenuEntryFormProps) {
  const [items, setItems] = useState<MenuItemEntry[]>([
    { name: "", category: "soup", price: "" },
    { name: "", category: "main", price: "" },
    { name: "", category: "main", price: "" },
  ]);

  function addItem() {
    setItems((prev) => [...prev, { name: "", category: "main", price: "" }]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(index: number, field: keyof MenuItemEntry, value: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(items.filter((item) => item.name.trim() !== ""));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <h3 className="font-heading font-semibold text-ink-900">
        Denní menu
      </h3>
      {items.map((item, i) => (
        <div key={i} className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              label={i === 0 ? "Název jídla" : undefined}
              placeholder="Název jídla"
              value={item.name}
              onChange={(e) => updateItem(i, "name", e.target.value)}
            />
          </div>
          <div className="w-32">
            <Select
              label={i === 0 ? "Kategorie" : undefined}
              value={item.category}
              onChange={(e) => updateItem(i, "category", e.target.value)}
              options={categories}
            />
          </div>
          <div className="w-24">
            <Input
              label={i === 0 ? "Cena" : undefined}
              placeholder="Kč"
              value={item.price}
              onChange={(e) => updateItem(i, "price", e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => removeItem(i)}
            className="p-2 text-stone-500 hover:text-error transition-colors"
            aria-label="Odebrat položku"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="inline-flex items-center gap-1.5 text-sm text-gold-700 hover:text-gold-500 font-medium transition-colors"
      >
        <Plus size={16} />
        Přidat položku
      </button>
      <div className="pt-2">
        <Button type="submit">Uložit menu</Button>
      </div>
    </form>
  );
}
