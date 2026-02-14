import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageContainer className="py-16 text-center">
      <h1 className="font-heading text-4xl font-bold text-green-900 mb-3">
        404
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Stránka nebyla nalezena
      </p>
      <p className="text-sm text-gray-500 mb-8">
        Omlouváme se, ale hledaná stránka neexistuje nebo byla přesunuta.
      </p>
      <Link href="/">
        <Button variant="primary">Zpět na hlavní stránku</Button>
      </Link>
    </PageContainer>
  );
}
