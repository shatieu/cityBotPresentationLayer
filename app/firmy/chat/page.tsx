"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { PageContainer } from "@/components/layout/PageContainer";
import { ChatWindow } from "@/components/chat/ChatWindow";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function FirmyChatPage() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <PageContainer className="py-12">
        <EmptyState
          title="Přihlášení vyžadováno"
          description="Pro použití průvodce firmami se musíte přihlásit."
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
        Průvodce firmami
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Zeptejte se, jakou službu potřebujete, a my vám pomůžeme najít
        správnou firmu ve Znojmě.
      </p>
      <ChatWindow />
    </PageContainer>
  );
}
