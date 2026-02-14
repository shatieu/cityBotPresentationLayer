"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogIn, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { getTopNavItems, getMoreItems, navigationItems } from "@/lib/config/navigation";

export function Header() {
  const pathname = usePathname();
  const { isLoggedIn, login, logout, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const topItems = getTopNavItems();
  const moreItems = getMoreItems();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-nav">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-4 md:h-16 md:px-6 lg:px-8">
        <Link href="/" className="font-heading text-lg font-bold text-green-900">
          Znojmo Hub
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {topItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`px-2.5 py-2 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-green-700 border-b-2 border-green-700"
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* Více dropdown */}
          {moreItems.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              >
                Více
                <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-1 min-w-[160px] bg-white rounded-base shadow-card-hover border border-gray-100 py-1 z-50">
                  {moreItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-3 py-2 text-sm transition-colors ${
                        isActive(item.href)
                          ? "text-green-700 bg-green-50"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <Link
                href="/moje-znojmo"
                className="text-sm text-green-700 hover:text-green-500 font-medium px-3 py-2"
              >
                Moje Znojmo
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:text-green-700 px-3 py-2 transition-colors"
              >
                <LogOut size={16} />
                Odhlásit
              </button>
            </>
          ) : (
            <Link
              href="/prihlaseni"
              className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:text-green-500 font-medium px-3 py-2 transition-colors"
            >
              <LogIn size={16} />
              Přihlásit se
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-gray-700"
          aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile slide-in — full list, no "Více" nesting */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-gray-100">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-base transition-colors ${
                  isActive(item.href)
                    ? "text-green-700 bg-green-50"
                    : "text-gray-700 hover:text-green-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/moje-znojmo"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm text-green-700 font-medium"
                  >
                    Moje Znojmo
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-gray-700"
                  >
                    <LogOut size={16} />
                    Odhlásit
                  </button>
                </>
              ) : (
                <Link
                  href="/prihlaseni"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-green-700 font-medium"
                >
                  <LogIn size={16} />
                  Přihlásit se
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
