"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface BusinessRegistrationFormProps {
  onSubmit: (data: BusinessRegFormData) => void;
}

export interface BusinessRegFormData {
  businessName: string;
  ico: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  tags: string;
}

export function BusinessRegistrationForm({ onSubmit }: BusinessRegistrationFormProps) {
  const [form, setForm] = useState<BusinessRegFormData>({
    businessName: "",
    ico: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    tags: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  function update(field: keyof BusinessRegFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        label="Název firmy"
        value={form.businessName}
        onChange={(e) => update("businessName", e.target.value)}
        required
      />
      <Input
        label="IČO"
        placeholder="12345678"
        value={form.ico}
        onChange={(e) => update("ico", e.target.value)}
        required
      />
      <Input
        label="Kontaktní osoba"
        value={form.contactPerson}
        onChange={(e) => update("contactPerson", e.target.value)}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
        />
        <Input
          label="Telefon"
          type="tel"
          placeholder="+420 ..."
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          required
        />
      </div>
      <Input
        label="Adresa provozovny"
        value={form.address}
        onChange={(e) => update("address", e.target.value)}
        required
      />
      <Textarea
        label="Popis podnikání"
        value={form.description}
        onChange={(e) => update("description", e.target.value)}
        rows={3}
      />
      <Input
        label="Štítky / obor"
        placeholder="Např. instalatér, topení, voda"
        value={form.tags}
        onChange={(e) => update("tags", e.target.value)}
      />
      <Button type="submit">Zaregistrovat firmu</Button>
    </form>
  );
}
