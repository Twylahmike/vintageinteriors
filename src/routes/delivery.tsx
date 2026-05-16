import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSettings } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery & Payment — Vintage Furniture Nairobi" },
      { name: "description", content: "Simple, reliable furniture delivery across Kenya. Pay after delivery in Nairobi. G4S countrywide." },
      { property: "og:title", content: "Delivery & Payment" },
      { property: "og:description", content: "Simple, reliable delivery across Kenya." },
    ],
    links: [{ rel: "canonical", href: "/delivery" }],
  }),
  component: Delivery,
});

const FAQ = [
  ["How long does delivery take?", "Nairobi: same day or next day. Countrywide via G4S: 2–5 working days depending on your location."],
  ["Can I track my order?", "Yes — we send updates via WhatsApp and provide G4S tracking for countrywide orders."],
  ["Do you do assembly?", "Yes, our team assembles your furniture on delivery within Nairobi at no extra cost."],
  ["Can I pay in installments?", "Talk to us on WhatsApp — flexible options available for larger orders."],
  ["What if my furniture arrives damaged?", "We replace or repair any damaged piece at no cost. Quality is our promise."],
];

function Delivery() {
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const nairobi = settings.delivery_nairobi || "";
  const countrywide = settings.delivery_countrywide || "";
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SiteLayout>
      <section className="bg-brand py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl text-ivory mb-3">Delivery &amp; Payment</h1>
            <p className="text-cream">Simple, reliable delivery across Kenya</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand pb-16">
        <div className="container-page grid gap-6 md:grid-cols-2">
          {[
            { icon: "🏙️", title: "Nairobi Delivery", text: nairobi },
            { icon: "🌍", title: "Countrywide via G4S", text: countrywide },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="rounded-2xl bg-burgundy p-8 border-t-4 border-gold border-x border-b border-x-gold-soft border-b-gold-soft h-full">
                <div className="text-5xl mb-4">{c.icon}</div>
                <h3 className="font-display text-lg text-ivory mb-3">{c.title.toUpperCase()}</h3>
                <p className="text-cream leading-relaxed">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory text-center mb-10">Payment Methods</h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-6 py-3 rounded-full bg-whatsapp text-white font-bold">M-Pesa</span>
            <span className="px-6 py-3 rounded-full bg-gold text-[#080808] font-bold">Cash on Delivery</span>
          </div>
        </div>
      </section>

      <section className="bg-brand py-20">
        <div className="container-page max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory text-center mb-10">Frequently Asked</h2>
          </Reveal>
          <div className="space-y-3">
            {FAQ.map(([q, a], i) => {
              const isOpen = open === i;
              return (
                <div key={q} className="rounded-xl bg-burgundy border border-gold-soft overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-display text-sm md:text-base text-ivory">{q}</span>
                    <ChevronDown className={`h-5 w-5 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 px-5"
                    style={{ maxHeight: isOpen ? 200 : 0, paddingBottom: isOpen ? 16 : 0 }}
                  >
                    <p className="text-cream text-sm">{a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-burgundy py-16">
        <div className="container-page text-center">
          <p className="text-ivory text-lg mb-5">Have questions? Chat with us on WhatsApp</p>
          <a
            href={waLink("Hi Vintage Furniture! 👋 I have a question about delivery.", number)}
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
