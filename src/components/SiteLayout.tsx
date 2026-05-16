import { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand animate-fade-in">
      <SiteNav />
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
