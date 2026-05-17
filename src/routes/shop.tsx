import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { X, MessageCircle, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard, type Product } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { Reveal } from "@/components/Reveal";
import { useSupabaseTable, useSettings } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER, formatKES } from "@/lib/whatsapp";

const searchSchema = z.object({ category: z.string().optional() });

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — Vintage Furniture Nairobi" },
      { name: "description", content: "Browse our complete catalogue of premium handcrafted furniture in Kenya." },
      { property: "og:title", content: "Shop — Vintage Furniture" },
      { property: "og:description", content: "Browse our complete catalogue of premium handcrafted furniture." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

interface Category {
  id: string;
  name: string;
  slug: string;
}

function Shop() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const active = category || "all";

  const { data: categories } = useSupabaseTable<Category>({
    table: "categories",
    filter: (q) => q.eq("is_visible", true),
    order: { column: "display_order", ascending: true },
  });
  const { data: products, loading } = useSupabaseTable<Product>({
    table: "products",
    filter: (q) => q.eq("is_visible", true),
    order: { column: "created_at", ascending: false },
  });

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = products;
    if (active !== "all") {
      const cat = categories.find((c) => c.slug === active);
      if (cat) list = list.filter((p) => p.category === cat.name);
    }
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [products, categories, active, query]);

  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <SiteLayout>
      <section className="bg-brand py-14 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl text-ivory mb-3">Our Collection</h1>
            <p className="text-cream">Handcrafted furniture for every room</p>
          </Reveal>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 bg-surface border-b border-gold-soft">
        <div className="container-page py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {[{ name: "All", slug: "all" }, ...categories].map((c) => {
              const isActive = c.slug === active;
              return (
                <button
                  key={c.slug}
                  onClick={() => navigate({ search: c.slug === "all" ? {} : { category: c.slug } })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                    isActive
                      ? "bg-gold text-[#080808]"
                      : "border border-gold text-ivory hover:bg-gold/10"
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="bg-brand py-14">
        <div className="container-page">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl bg-burgundy animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛋️</div>
              <p className="text-cream mb-6">No pieces in this category yet — check back soon!</p>
              <button
                onClick={() => navigate({ search: {} })}
                className="inline-flex h-11 px-5 rounded-lg bg-gold text-[#080808] font-bold items-center"
              >
                Browse All
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onOpen={setSelected} />
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </SiteLayout>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const msg = `Hi Vintage Furniture! 👋 I'm interested in ${product.name} at ${formatKES(product.price)}. Is it available?`;

  // ESC closes
  useMemo(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-6 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] bg-burgundy md:rounded-2xl border border-gold overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 text-gold hover:text-[var(--color-gold-hover)] bg-black/40 rounded-full p-2"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <SafeImage
            src={product.image_url}
            alt={product.name}
            className="w-full aspect-[4/3] md:aspect-auto md:h-full object-cover"
          />
          <div className="p-6 md:p-8">
            <span className="inline-block px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-display tracking-widest mb-3">
              {product.category.toUpperCase()}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-ivory mb-3">{product.name}</h2>
            {product.description && (
              <p className="text-cream text-sm leading-relaxed mb-4">{product.description}</p>
            )}
            {product.dimensions && (
              <p className="text-sm text-ivory mb-4">
                <span className="text-gold">Dimensions:</span> {product.dimensions}
              </p>
            )}
            <p className="font-bold text-3xl text-gold mb-6">{formatKES(product.price)}</p>
            <a
              href={waLink(msg, number)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full rounded-lg bg-whatsapp text-white font-bold py-3 hover:brightness-110 transition"
            >
              <MessageCircle className="h-5 w-5" />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
