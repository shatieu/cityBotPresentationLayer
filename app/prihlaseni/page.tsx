"use client";

import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PrihlaseniPage() {
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  if (isLoggedIn) {
    router.push("/moje-znojmo");
    return null;
  }

  function handleLogin() {
    login();
    router.push("/moje-znojmo");
  }

  return (
    <PageContainer className="py-12">
      <div className="max-w-sm mx-auto">
        <h1 className="font-heading text-2xl font-bold text-ink-900 text-center mb-2">
          Přihlášení
        </h1>
        <p className="text-sm text-stone-700 text-center mb-6">
          Přihlaste se a přizpůsobte si Znojmo podle sebe.
        </p>

        <Card hover={false}>
          <div className="space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleLogin}
            >
              Přihlásit se přes Google
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleLogin}
            >
              Přihlásit se přes Facebook
            </Button>
          </div>
          <p className="text-xs text-stone-500 text-center mt-4">
            V demo režimu se přihlásíte jako testovací uživatel.
          </p>
        </Card>
      </div>
    </PageContainer>
  );
}
