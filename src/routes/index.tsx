import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ChevronDown, Award, Truck, Globe, Pencil, MessageCircle, Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { ProductCard, type Product } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { useSupabaseTable, useSettings } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-room.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vintage Furniture & Interior Design | Premium Furniture Nairobi" },
      {
        name: "description",
        content:
          "Premium handcrafted furniture in Nairobi. Sofas, beds, dining sets, wardrobes and more. Pay after delivery. Order via WhatsApp. Based in Ongata Rongai.",
      },
      { property: "og:title", content: "Vintage Furniture & Interior Design" },
      { property: "og:description", content: "Premium handcrafted furniture in Nairobi — order via WhatsApp." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

function Home() {
  useEffect(() => {
    document.body.style.opacity = "1";
  }, []);
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const ctaMsg = "Hi Vintage Furniture! 👋 I'd like to place an order. Please share your catalogue.";

  const { data: categories } = useSupabaseTable<Category>({
    table: "categories",
    filter: (q) => q.eq("is_visible", true),
    order: { column: "display_order", ascending: true },
  });
  const { data: products } = useSupabaseTable<Product>({
    table: "products",
    filter: (q) => q.eq("is_visible", true),
    order: { column: "created_at", ascending: false },
    limit: 4,
  });
  const { data: reviews } = useSupabaseTable<any>({
    table: "reviews",
    filter: (q) => q.eq("is_approved", true),
    order: { column: "created_at", ascending: false },
    limit: 3,
  });
  const { data: gallery } = useSupabaseTable<any>({
    table: "gallery",
    order: { column: "display_order", ascending: true },
    limit: 6,
  });

  const features = [
    { icon: Award, title: "Handcrafted Quality", text: "Every piece built with precision and care for Kenyan homes" },
    { icon: Truck, title: "Pay After Delivery", text: "Order with confidence — pay when your furniture arrives" },
    { icon: Globe, title: "Countrywide Shipping", text: "Nairobi delivery + G4S countrywide on request" },
    { icon: Pencil, title: "Custom Orders Welcome", text: "Tell us your vision and we'll build it exactly" },
  ];

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] -mt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt=""
            className="h-full w-full object-cover animate-ken-burns"
            style={{ opacity: 0.35 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand via-transparent to-brand" />
        </div>
        <div className="relative z-10 container-page text-center max-w-3xl">
          <Reveal>
            <p className="font-display text-xs md:text-sm text-gold tracking-widest mb-5">
              NAIROBI'S PREMIUM FURNITURE BRAND
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-serif text-5xl md:text-7xl text-ivory leading-[1.05] mb-6">
              Turn Your Space Into a Statement
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base md:text-lg text-cream max-w-xl mx-auto mb-9">
              Premium handcrafted furniture for Kenyan living — sofas, beds, dining sets and more.
              Based in Ongata Rongai, delivering countrywide.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-gold text-[#080808] font-bold hover:bg-[var(--color-gold-hover)] transition"
              >
                Shop Now
              </Link>
              <a
                href={waLink(ctaMsg, number)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-whatsapp text-white font-bold hover:brightness-110 transition"
              >
                <MessageCircle className="h-5 w-5" />
                Order via WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold animate-bounce-slow z-10">
          <ChevronDown className="h-7 w-7" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-brand py-20">
        <div className="container-page">
          <Reveal>
            <p className="font-display text-xs text-gold text-center tracking-widest mb-3">BROWSE BY CATEGORY</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory text-center mb-12">Shop by Category</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <Link
                  to="/shop"
                  search={{ category: c.slug }}
                  className="group block rounded-2xl bg-burgundy p-8 border border-gold-soft hover:border-[var(--color-gold)] hover:-translate-y-1 transition-all duration-300 hover:shadow-gold"
                >
                  <div className="text-5xl mb-4">{c.icon}</div>
                  <h3 className="font-display text-lg text-ivory mb-2">{c.name.toUpperCase()}</h3>
                  <p className="text-sm text-cream mb-5">{c.description}</p>
                  <span className="text-gold text-sm font-medium inline-flex items-center gap-1">
                    View Collection
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-surface py-20">
        <div className="container-page">
          <Reveal>
            <p className="font-display text-xs text-gold text-center tracking-widest mb-3">OUR BEST PIECES</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory text-center mb-12">Handpicked for You</h2>
          </Reveal>
          {products.length === 0 ? (
            <p className="text-center text-cream">Catalogue coming soon. Chat with us for more pieces.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border-2 border-gold text-gold font-bold hover:bg-gold hover:text-[#080808] transition"
            >
              View Full Catalogue →
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-burgundy py-20">
        <div className="container-page">
          <Reveal>
            <p className="font-display text-xs text-gold text-center tracking-widest mb-3">WHY VINTAGE FURNITURE</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory text-center mb-14">
              Built Different. Built Better.
            </h2>
          </Reveal>
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="text-center md:text-left">
                  <f.icon className="h-12 w-12 text-gold mb-4 mx-auto md:mx-0" />
                  <h3 className="font-display text-base text-ivory mb-2">{f.title.toUpperCase()}</h3>
                  <p className="text-sm text-cream">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-brand py-20">
        <div className="container-page">
          <Reveal>
            <p className="font-display text-xs text-gold text-center tracking-widest mb-3">CLIENT TESTIMONIALS</p>
            <h2 className="font-serif text-4xl md:text-5xl text-ivory text-center mb-12">What Our Clients Say</h2>
          </Reveal>
          {reviews.length === 0 ? (
            <p className="text-center text-cream">Be one of our first reviewers!</p>
          ) : (
            <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory pb-4 md:overflow-visible">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 80} className="min-w-[85%] md:min-w-0 snap-center">
                  <div className="h-full rounded-2xl bg-burgundy p-7 border border-gold-soft">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${idx < r.rating ? "fill-[var(--color-gold)] text-gold" : "text-cream"}`}
                        />
                      ))}
                    </div>
                    <p className="italic text-ivory text-sm mb-4 line-clamp-5">"{r.review_text}"</p>
                    <p className="font-display text-sm text-gold">{r.customer_name}</p>
                    {r.product_purchased && (
                      <p className="text-xs text-cream mt-1">{r.product_purchased}</p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/reviews" className="text-gold hover:text-[var(--color-gold-hover)] font-medium">
              Read All Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="bg-surface py-20">
          <div className="container-page">
            <Reveal>
              <p className="font-display text-xs text-gold text-center tracking-widest mb-3">OUR WORK</p>
              <h2 className="font-serif text-4xl md:text-5xl text-ivory text-center mb-12">Spaces We've Transformed</h2>
            </Reveal>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
              {gallery.map((g, i) => (
                <Reveal key={g.id} delay={i * 60}>
                  <div className="group relative aspect-square overflow-hidden rounded-lg">
                    <SafeImage src={g.image_url} alt={g.caption || "Gallery"} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#080808]/0 group-hover:bg-[#080808]/60 transition-all flex items-center justify-center">
                      <span className="text-gold font-display text-sm opacity-0 group-hover:opacity-100 transition-opacity">VIEW</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="text-center text-cream text-sm mt-6">Follow us @vintagefurnitureke</p>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
