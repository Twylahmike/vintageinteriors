import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Clock, MessageCircle } from "lucide-react";
import { useSettings } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function SiteFooter() {
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const displayNumber = "0" + number.slice(-9);
  const hours = settings.business_hours || "Mon–Sat 8AM–6PM · Sun 10AM–4PM";
  const location = settings.location || "Ongata Rongai, Nairobi";

  return (
    <footer className="bg-surface mt-24" style={{ borderTop: "1px solid rgba(184,149,42,0.4)" }}>
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl text-gold mb-3">Vintage Furniture</h3>
            <p className="text-cream text-sm leading-relaxed mb-5">
              Premium Handcrafted Furniture — Ongata Rongai, Nairobi
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/vintagefurnitureke"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-ivory hover:text-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-ivory hover:text-gold transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs text-gold uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/shop", "Shop"],
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
                <a
                  href={waLink("Hi Vintage Furniture! 👋", number)}
                  className="hover:text-gold transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
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
