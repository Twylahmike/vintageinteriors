import { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { AnnouncementBar } from "./AnnouncementBar";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-brand animate-fade-in">
      <AnnouncementBar />
      <SiteNav />
      <main
        className="flex-1"
        style={{ paddingTop: "calc(4rem + var(--ann-h, 0px))" }}
      >
        {children}
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
}
