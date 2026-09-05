"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { PlaceEditForm } from "@/components/forms/PlaceEditForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function UpravitMistoPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          title="Přihlášení vyžadováno"
          description="Pro úpravu místa se musíte přihlásit jako firma."
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
        Upravit místo
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Aktualizujte informace o vašem podniku.
      </p>
      <PlaceEditForm
        onSubmit={(data) => {
          alert(`Místo "${data.name}" bylo aktualizováno. (Demo režim)`);
        }}
      />
    </PageContainer>
  );
}
