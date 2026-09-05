"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageContainer } from "@/components/layout/PageContainer";
import { ClassifiedForm } from "@/components/forms/ClassifiedForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function PridatInzeratPage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          title="Přihlášení vyžadováno"
          description="Pro přidání inzerátu se musíte přihlásit."
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
        Přidat inzerát
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Zveřejněte nabídku, poptávku nebo pracovní pozici.
      </p>
      <ClassifiedForm
        onSubmit={(data) => {
          alert(`Inzerát "${data.title}" byl odeslán. (Demo režim)`);
        }}
      />
    </PageContainer>
  );
}
