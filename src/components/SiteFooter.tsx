import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Clock, MessageCircle } from "lucide-react";
import { useSettings, useSupabaseTable } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function SiteFooter() {
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const displayNumber = "0" + number.slice(-9);
  const hours = settings.business_hours || "Mon–Sat 8AM–6PM · Sun 10AM–4PM";
  const location = settings.location || "Ongata Rongai, Nairobi";
  const instagram = settings.instagram_url || "https://instagram.com/vintagefurnitureke";
  const facebook = settings.facebook_url || "https://facebook.com";
  const tiktok = settings.tiktok_url || "";

  const { data: deliverySettings } = useSupabaseTable<{ key: string; value: string }>({
    table: "delivery_settings",
  });
  const freeText = deliverySettings.find((s) => s.key === "free_zones_summary_text")?.value || "Free delivery in Ongata Rongai & Karen";

  return (
    <footer className="bg-surface mt-24" style={{ borderTop: "1px solid rgba(184,149,42,0.4)" }}>
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl text-gold mb-3">Vintage Furniture</h3>
            <p className="text-cream text-sm leading-relaxed mb-2">
              Premium Handcrafted Furniture — Ongata Rongai, Nairobi
            </p>
            <p className="text-xs text-gold mb-5">🚚 {freeText}</p>
            <div className="flex gap-3">
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-ivory hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-ivory hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              {tiktok && (
                <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-ivory hover:text-gold transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs text-gold uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/shop", "Shop"],
                ["/gifting", "Gifting 🎁"],
                ["/about", "About"],
                ["/delivery", "Delivery"],
                ["/reviews", "Reviews"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="text-ivory hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-xs text-gold uppercase mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-ivory">
              <li className="flex items-start gap-2">
                <MessageCircle className="h-4 w-4 text-gold mt-0.5" />
                <a href={waLink("Hi Vintage Furniture! 👋", number)} className="hover:text-gold transition-colors" target="_blank" rel="noreferrer">
                  {displayNumber}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold mt-0.5" />
                <span>{location}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-gold mt-0.5" />
                <span>{hours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gold-soft py-5 text-center text-xs text-cream">
        © 2025 Vintage Furniture &amp; Interior Design. All rights reserved.
      </div>
    </footer>
  );
}
