"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface ClassifiedFormProps {
  onSubmit: (data: ClassifiedFormData) => void;
}

export interface ClassifiedFormData {
  title: string;
  description: string;
  adType: string;
  category: string;
  price: string;
  contact: string;
  location: string;
}

const adTypes = [
  { value: "", label: "Typ inzerátu" },
  { value: "offer", label: "Nabídka" },
  { value: "request", label: "Poptávka" },
  { value: "job", label: "Práce" },
];

const categories = [
  { value: "", label: "Vyberte kategorii" },
  { value: "nábytek", label: "Nábytek" },
  { value: "elektronika", label: "Elektronika" },
  { value: "sport a volný čas", label: "Sport a volný čas" },
  { value: "nemovitosti", label: "Nemovitosti" },
  { value: "služby", label: "Služby" },
  { value: "pro děti", label: "Pro děti" },
  { value: "řemesla", label: "Řemesla" },
  { value: "gastronomie", label: "Gastronomie" },
  { value: "obchod", label: "Obchod" },
  { value: "administrativa", label: "Administrativa" },
  { value: "ostatní", label: "Ostatní" },
];

export function ClassifiedForm({ onSubmit }: ClassifiedFormProps) {
  const [form, setForm] = useState<ClassifiedFormData>({
    title: "",
    description: "",
    adType: "",
    category: "",
    price: "",
    contact: "",
    location: "Znojmo",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  function update(field: keyof ClassifiedFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Select
        label="Typ inzerátu"
        value={form.adType}
        onChange={(e) => update("adType", e.target.value)}
        options={adTypes}
        required
      />
      <Input
        label="Titulek"
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
        label="Cena"
        placeholder="Např. 5 000 Kč"
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
        label="Lokalita"
        value={form.location}
        onChange={(e) => update("location", e.target.value)}
      />
      <Button type="submit">Zveřejnit inzerát</Button>
    </form>
  );
}
