import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-100 mt-section">
      <div className="mx-auto max-w-[1120px] px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-700">
          <p>&copy; {new Date().getFullYear()} Znojmo City Hub</p>
          <nav className="flex gap-4">
            <Link href="/" className="hover:text-gold-700 transition-colors">
              Domů
            </Link>
            <Link href="/gastro" className="hover:text-gold-700 transition-colors">
              Gastro
            </Link>
            <Link href="/mapa" className="hover:text-gold-700 transition-colors">
              Mapa
            </Link>
            <Link href="/udalosti" className="hover:text-gold-700 transition-colors">
              Události
            </Link>
            <Link href="/zpravy" className="hover:text-gold-700 transition-colors">
              Zprávy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
