"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

export default function FirmaProfilPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          title="Přihlášení vyžadováno"
          description="Pro správu profilu se musíte přihlásit jako firma."
        >
          <Link href="/prihlaseni">
            <Button>Přihlásit se</Button>
          </Link>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-green-900 mb-1">
        Firemní profil
      </h1>
      <p className="text-sm text-gray-700 mb-6">
        Upravte údaje o vaší firmě.
      </p>

      <Card hover={false} className="max-w-lg">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Profil aktualizován. (Demo režim)");
          }}
        >
          <Input label="Název firmy" defaultValue="Restaurace U Karla" />
          <Input label="IČO" defaultValue="12345678" />
          <Input label="Kontaktní email" type="email" defaultValue="info@ukarla.cz" />
          <Input label="Telefon" type="tel" defaultValue="+420 515 222 111" />
          <Input label="Adresa" defaultValue="Masarykovo náměstí 12, 669 02 Znojmo" />
          <Textarea label="Popis" defaultValue="Tradiční česká kuchyně v centru Znojma." rows={3} />
          <Button type="submit">Uložit změny</Button>
        </form>
      </Card>
    </PageContainer>
  );
}
