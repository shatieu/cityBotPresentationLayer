"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { MenuEntryForm } from "@/components/forms/MenuEntryForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function FirmaMenuPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          title="Přihlášení vyžadováno"
          description="Pro správu menu se musíte přihlásit jako firma."
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
        Správa denního menu
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Zadejte dnešní menu vaší restaurace.
      </p>
      <MenuEntryForm
        onSubmit={(items) => {
          alert(
            `Menu uloženo s ${items.length} položkami. (Demo režim)`
          );
        }}
      />
    </PageContainer>
  );
}
