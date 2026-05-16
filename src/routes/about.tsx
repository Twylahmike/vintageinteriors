import { createFileRoute } from "@tanstack/react-router";
import { Hammer, HandCoins, Heart, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSettings } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import workshopImg from "@/assets/workshop.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vintage Furniture Nairobi" },
      { name: "description", content: "The story of Vintage Furniture & Interior Design — handcrafted furniture from Ongata Rongai." },
      { property: "og:title", content: "About Vintage Furniture" },
      { property: "og:description", content: "Built with craft. Made for Kenya." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const aboutText = settings.about_text || "";

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden -mt-16 pt-16">
        <img src={workshopImg} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.4 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-brand/70 via-transparent to-brand" />
        <div className="relative z-10 container-page text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl text-ivory mb-3">Built With Craft. Made for Kenya.</h1>
            <p className="text-cream">Our story, our passion, our promise.</p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-brand py-20">
        <div className="container-page grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <h2 className="font-serif text-4xl text-gold mb-5">Our Story</h2>
            <p className="text-ivory leading-relaxed" dangerouslySetInnerHTML={{ __html: aboutText }} />
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden border-2 border-gold-soft">
              <img src={workshopImg} alt="Our workshop in Ongata Rongai" className="w-full h-80 object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <Reveal>
            <h2 className="font-serif text-4xl text-ivory text-center mb-12">Our Values</h2>
          </Reveal>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Hammer, title: "Quality Craftsmanship", text: "Solid wood, precise joinery, finishes that last." },
              { icon: HandCoins, title: "Honest Pricing", text: "Premium quality without the premium markup." },
              { icon: Heart, title: "Customer First", text: "From your first message to delivery and beyond." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="rounded-2xl bg-burgundy p-8 text-center border border-gold-soft">
                  <v.icon className="h-12 w-12 text-gold mx-auto mb-4" />
                  <h3 className="font-display text-lg text-ivory mb-2">{v.title.toUpperCase()}</h3>
                  <p className="text-sm text-cream">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop image */}
      <section className="bg-brand py-12">
        <div className="container-page">
          <img src={workshopImg} alt="Our team at the Ongata Rongai workshop" className="w-full h-[400px] object-cover rounded-2xl border border-gold-soft" loading="lazy" />
          <p className="italic text-cream text-center mt-4 text-sm">Our team at the Ongata Rongai workshop</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-burgundy py-20">
        <div className="container-page text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-ivory mb-6">Ready to Transform Your Space?</h2>
          <a
            href={waLink("Hi Vintage Furniture! 👋 I'd like to discuss a piece.", number)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-whatsapp text-white font-bold hover:brightness-110 transition"
          >
            <MessageCircle className="h-5 w-5" /> Order via WhatsApp
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
