import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

/**
 * Updated Navbar:
 * - No search, no account
 * - All nav links (including promo dropdown) are right-aligned on desktop
 * - Mobile: hamburger opens a panel with links and promo grid (no search / account)
 *
 * If you use react-router, replace <a> with <Link>.
 */

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        promoOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setPromoOpen(false);
      }
    }
    // use capture phase to run before React handlers
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [promoOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setOpen(false);
        setPromoOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Prize", href: "/prize" },
  ];

  const promoLinks = [
    { name: "Reward", href: "/prize" },
    { name: "Games", href: "/prize" },
    { name: "Answer/Win", href: "/prize" },
    { name: "VIP", href: "/prize" },
    { name: "Explore", href: "/prize" },
    { name: "Quick Play", href: "/prize" },
  ];

  return (
    <header
      className="w-full text-white z-50"
      style={{ backgroundColor: "var(--rm-gray-900)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* LOGO - left */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              <div className="logo-mark flex items-center justify-center rounded-md font-extrabold text-[var(--rm-gray-900)] bg-[var(--rm-yellow)] w-10 h-10">
                PCH
              </div>
              <span className="text-xl font-extrabold text-[var(--rm-yellow)] tracking-tight">
                Publishers Clearing House
              </span>
            </a>
          </div>

          {/* NAV - right aligned on desktop */}
          <div className="hidden md:flex md:items-center md:gap-6 ml-auto">
            <nav className="flex items-center gap-6" aria-label="Primary">
              {mainLinks.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="nav-link text-white text-sm font-medium relative px-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rm-yellow)] rounded"
                >
                  {l.name}
                </a>
              ))}

              {/* Promo dropdown (still on the right) */}
              <div className="relative" ref={panelRef}>
                <button
                  onClick={() => setPromoOpen((s) => !s)}
                  aria-expanded={promoOpen}
                  className="inline-flex items-center gap-1 text-white text-sm font-medium nav-link px-1 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rm-yellow)] rounded"
                >
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* dropdown */}
                <div
                  className={`absolute mt-2 right-0 w-48 rounded-md shadow-lg bg-[var(--rm-gray-900)] ring-1 ring-black ring-opacity-5 transform transition-opacity duration-180 ${
                    promoOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="py-1">
                    {promoLinks.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        className="block px-4 py-2 text-sm text-white hover:bg-[rgba(246,195,0,0.06)] focus-visible:outline-none"
                      >
                        {p.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* MOBILE hamburger (right) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-md focus-visible:ring-2 focus-visible:ring-[var(--rm-yellow)]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL (no search, no account) */}
      <div
        className={`md:hidden fixed inset-x-0 top-0 z-50 ${
          open ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
          onClick={() => setOpen(false)}
        />
        <div className="relative bg-[var(--rm-gray-900)] max-w-md w-full ml-auto h-screen shadow-xl transform transition-transform duration-200">
          <div className="flex items-center px-4 py-4 border-b border-[rgba(255,255,255,0.04)]">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md ml-auto"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-4 py-6 space-y-4 overflow-auto h-[calc(100%-88px)]">
            {/* Primary links */}
            <nav className="space-y-1">
              {mainLinks.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  className="block px-3 py-3 rounded-md text-base font-medium text-white hover:bg-[rgba(255,255,255,0.02)]"
                  onClick={() => setOpen(false)}
                >
                  {l.name}
                </a>
              ))}
            </nav>

            <div className="mt-2 border-t border-[rgba(255,255,255,0.04)] pt-4">
              <h4 className="text-xs text-gray-300 uppercase tracking-wider mb-2">
                Explore
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {promoLinks.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    className="block text-sm px-3 py-2 rounded-md bg-[rgba(255,255,255,0.02)] text-white text-center"
                    onClick={() => setOpen(false)}
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>

            {/* optional CTA area kept out (removed account/sign-in per request) */}
          </div>
        </div>
      </div>
    </header>
  );
}
