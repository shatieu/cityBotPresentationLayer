"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageContainer } from "@/components/layout/PageContainer";
import { EventForm } from "@/components/forms/EventForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function PridatUdalostPage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          title="Přihlášení vyžadováno"
          description="Pro přidání události se musíte přihlásit."
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
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-1">
        Přidat událost
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Vytvořte komunitní událost viditelnou pro všechny uživatele.
      </p>
      <EventForm
        onSubmit={(data) => {
          alert(`Událost "${data.title}" byla odeslána. (Demo režim)`);
        }}
      />
    </PageContainer>
  );
}
