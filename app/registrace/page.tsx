"use client";

import Link from "next/link";
import { User, Building2 } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";

export default function RegistracePage() {
  return (
    <PageContainer className="py-12">
      <div className="max-w-lg mx-auto">
        <h1 className="font-heading text-2xl font-bold text-ink-900 text-center mb-2">
          Registrace
        </h1>
        <p className="text-sm text-stone-700 text-center mb-8">
          Vyberte typ účtu
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/prihlaseni">
            <Card className="h-full text-center">
              <div className="w-12 h-12 rounded-base bg-gold-100 flex items-center justify-center mx-auto mb-3">
                <User size={24} className="text-gold-700" />
              </div>
              <h2 className="font-heading font-semibold text-ink-900 mb-1">
                Jsem občan
              </h2>
              <p className="text-xs text-stone-500">
                Přihlaste se přes Google nebo Facebook a přizpůsobte si
                dashboard.
              </p>
            </Card>
          </Link>

          <Link href="/registrace/firma">
            <Card className="h-full text-center">
              <div className="w-12 h-12 rounded-base bg-wine-100 flex items-center justify-center mx-auto mb-3">
                <Building2 size={24} className="text-wine-700" />
              </div>
              <h2 className="font-heading font-semibold text-ink-900 mb-1">
                Vlastním firmu
              </h2>
              <p className="text-xs text-stone-500">
                Zaregistrujte svou firmu a spravujte informace o ní.
              </p>
            </Card>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
