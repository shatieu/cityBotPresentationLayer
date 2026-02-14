"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

export default function FirmaUdalostiPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/prihlaseni");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  return (
    <PageContainer className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-green-900">
          Události vaší firmy
        </h1>
        <Link href="/udalosti/pridat">
          <Button size="sm">
            <Plus size={16} />
            Přidat událost
          </Button>
        </Link>
      </div>

      <EmptyState
        title="Zatím žádné události"
        description="Vytvořte první událost a dejte o sobě vědět."
      >
        <Link href="/udalosti/pridat">
          <Button variant="secondary">Přidat událost</Button>
        </Link>
      </EmptyState>
    </PageContainer>
  );
}
