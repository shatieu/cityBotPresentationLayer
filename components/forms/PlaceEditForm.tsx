"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface PlaceEditFormProps {
  initialData?: PlaceEditData;
  onSubmit: (data: PlaceEditData) => void;
}

export interface PlaceEditData {
  name: string;
  address: string;
  phone: string;
  website: string;
  description: string;
  openingHours: string;
}

export function PlaceEditForm({ initialData, onSubmit }: PlaceEditFormProps) {
  const [form, setForm] = useState<PlaceEditData>(
    initialData ?? {
      name: "",
      address: "",
      phone: "",
      website: "",
      description: "",
      openingHours: "",
    }
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  function update(field: keyof PlaceEditData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        label="Název místa"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
        required
      />
      <Input
        label="Adresa"
        value={form.address}
        onChange={(e) => update("address", e.target.value)}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Telefon"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Input
          label="Webové stránky"
          type="url"
          placeholder="https://..."
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>
      <Textarea
        label="Popis"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        rows={4}
      />
      <Textarea
        label="Otevírací doba"
        placeholder="Po–Pá 8:00–17:00&#10;So 9:00–12:00&#10;Ne Zavřeno"
        value={form.openingHours}
        onChange={(e) => update("openingHours", e.target.value)}
        rows={3}
      />
      <Button type="submit">Uložit změny</Button>
    </form>
  );
}
