"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
}

export interface EventFormData {
  title: string;
  description: string;
  category: string;
  dateStart: string;
  dateEnd: string;
  placeQuery: string;
  ticketUrl: string;
}

const categories = [
  { value: "", label: "Vyberte kategorii" },
  { value: "festivals", label: "Festival" },
  { value: "concerts", label: "Koncert" },
  { value: "wine", label: "Víno" },
  { value: "theatre", label: "Divadlo" },
  { value: "sport", label: "Sport" },
  { value: "other", label: "Ostatní" },
];

export function EventForm({ onSubmit }: EventFormProps) {
  const [form, setForm] = useState<EventFormData>({
    title: "",
    description: "",
    category: "",
    dateStart: "",
    dateEnd: "",
    placeQuery: "",
    ticketUrl: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  function update(field: keyof EventFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        label="Název události"
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
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Datum a čas začátku"
          type="datetime-local"
          value={form.dateStart}
          onChange={(e) => update("dateStart", e.target.value)}
          required
        />
        <Input
          label="Datum a čas konce"
          type="datetime-local"
          value={form.dateEnd}
          onChange={(e) => update("dateEnd", e.target.value)}
        />
      </div>
      <Input
        label="Místo konání"
        placeholder="Název místa ve Znojmě"
        value={form.placeQuery}
        onChange={(e) => update("placeQuery", e.target.value)}
      />
      <Input
        label="Odkaz na vstupenky"
        type="url"
        placeholder="https://..."
        value={form.ticketUrl}
        onChange={(e) => update("ticketUrl", e.target.value)}
      />
      <Button type="submit">Odeslat událost</Button>
    </form>
  );
}
