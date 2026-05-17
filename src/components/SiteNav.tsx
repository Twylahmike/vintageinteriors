import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/delivery", label: "Delivery" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "bg-[#0f0f0f] shadow-[0_4px_24px_rgba(0,0,0,0.6)]" : "bg-brand"
        }`}
        style={{ borderBottomColor: "rgba(184,149,42,0.3)" }}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="font-serif text-2xl font-semibold text-gold tracking-wide">
            Vintage Furniture
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                    active ? "text-gold border-b-2 border-[var(--color-gold)] pb-1" : "text-ivory"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <button
            className="md:hidden text-gold p-2"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[100] bg-brand md:hidden animate-fade-in">
          <div className="flex h-16 items-center justify-between container-page">
            <span className="font-serif text-2xl text-gold">Vintage Furniture</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-gold p-2">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 pt-16">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="font-serif text-4xl text-ivory hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
