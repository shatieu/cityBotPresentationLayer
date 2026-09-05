"use client";

import { PageContainer } from "@/components/layout/PageContainer";
import { BusinessRegistrationForm } from "@/components/forms/BusinessRegistrationForm";

export default function RegistraceFirmaPage() {
  return (
    <PageContainer className="py-6">
      <h1 className="font-heading text-2xl font-bold text-ink-900 mb-1">
        Registrace firmy
      </h1>
      <p className="text-sm text-stone-700 mb-6">
        Zaregistrujte svou firmu a začněte spravovat svůj profil na Znojmo
        City Hub.
      </p>
      <BusinessRegistrationForm
        onSubmit={(data) => {
          alert(
            `Firma "${data.businessName}" (IČO: ${data.ico}) byla zaregistrována. (Demo režim)`
          );
        }}
      />
    </PageContainer>
  );
}
