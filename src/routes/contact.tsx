import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSettings } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vintage Furniture Nairobi" },
      { name: "description", content: "Find us in Ongata Rongai, Nairobi. Order furniture via WhatsApp." },
      { property: "og:title", content: "Contact Vintage Furniture" },
      { property: "og:description", content: "Ready to order? We're one message away." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const displayNumber = "0" + number.slice(-9);
  const hours = settings.business_hours || "Mon–Sat 8AM–6PM · Sun 10AM–4PM";
  const location = settings.location || "Ongata Rongai, Nairobi";
  const wa = waLink("Hi Vintage Furniture! 👋 I have a question about your furniture.", number);

  return (
    <SiteLayout>
      <section className="bg-brand py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl text-ivory">Find Us</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand pb-20">
        <div className="container-page grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl bg-burgundy p-8 border border-gold-soft space-y-5">
              <h2 className="font-serif text-2xl text-gold mb-2">Get in Touch</h2>
              <div className="flex items-start gap-3 text-ivory">
                <MessageCircle className="h-5 w-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <a href={wa} target="_blank" rel="noreferrer" className="text-cream hover:text-gold">
                    {displayNumber}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 text-ivory">
                <MapPin className="h-5 w-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-cream">{location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-ivory">
                <Clock className="h-5 w-5 text-gold mt-1" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-cream">{hours}</p>
                </div>
              </div>
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 mt-4 h-12 rounded-lg bg-whatsapp text-white font-bold hover:brightness-110 transition"
              >
                <MessageCircle className="h-5 w-5" /> Chat With Us Now
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden border-2 border-gold h-full min-h-[400px]">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Ongata+Rongai+Nairobi&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-gold py-16">
        <div className="container-page text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-[#080808] mb-6">
            Ready to Order? We're One Message Away
          </h2>
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-whatsapp text-white font-bold hover:brightness-110 transition"
          >
            <MessageCircle className="h-5 w-5" /> Chat With Us on WhatsApp
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
