"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface ActivityFormProps {
  onSubmit: (data: ActivityFormData) => void;
}

export interface ActivityFormData {
  title: string;
  description: string;
  category: string;
  schedule: string;
  price: string;
  contact: string;
  placeQuery: string;
}

const categories = [
  { value: "", label: "Vyberte kategorii" },
  { value: "dance", label: "Tanec" },
  { value: "sports", label: "Sport" },
  { value: "languages", label: "Jazyky" },
  { value: "art", label: "Výtvarno" },
  { value: "music", label: "Hudba" },
  { value: "crafts", label: "Řemesla" },
  { value: "other", label: "Ostatní" },
];

export function ActivityForm({ onSubmit }: ActivityFormProps) {
  const [form, setForm] = useState<ActivityFormData>({
    title: "",
    description: "",
    category: "",
    schedule: "",
    price: "",
    contact: "",
    placeQuery: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  function update(field: keyof ActivityFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        label="Název aktivity"
        value={form.title}
        onChange={(e) => update("title", e.target.value)}
        required
      />
      <Textarea
        label="Popis"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        rows={4}
        required
      />
      <Select
        label="Kategorie"
        value={form.category}
        onChange={(e) => update("category", e.target.value)}
        options={categories}
        required
      />
      <Input
        label="Rozvrh"
        placeholder="Např. Pondělí 18:00–19:30"
        value={form.schedule}
        onChange={(e) => update("schedule", e.target.value)}
        required
      />
      <Input
        label="Cena"
        placeholder="Např. 250 Kč/lekce"
        value={form.price}
        onChange={(e) => update("price", e.target.value)}
      />
      <Input
        label="Kontakt"
        placeholder="Telefon nebo email"
        value={form.contact}
        onChange={(e) => update("contact", e.target.value)}
        required
      />
      <Input
        label="Místo konání"
        placeholder="Název místa ve Znojmě"
        value={form.placeQuery}
        onChange={(e) => update("placeQuery", e.target.value)}
      />
      <Button type="submit">Odeslat aktivitu</Button>
    </form>
  );
}
