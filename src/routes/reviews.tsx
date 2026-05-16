import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { useSupabaseTable } from "@/hooks/use-supabase-table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Client Reviews — Vintage Furniture Nairobi" },
      { name: "description", content: "Read what our clients say about Vintage Furniture & Interior Design." },
      { property: "og:title", content: "Client Reviews" },
      { property: "og:description", content: "Real stories from our furniture clients across Kenya." },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: Reviews,
});

interface Review {
  id: string;
  customer_name: string;
  product_purchased: string | null;
  rating: number;
  review_text: string;
  created_at: string;
}

function Reviews() {
  const { data: reviews } = useSupabaseTable<Review>({
    table: "reviews",
    filter: (q) => q.eq("is_approved", true),
    order: { column: "created_at", ascending: false },
  });

  const { avg, count } = useMemo(() => {
    if (reviews.length === 0) return { avg: 0, count: 0 };
    const total = reviews.reduce((s, r) => s + r.rating, 0);
    return { avg: total / reviews.length, count: reviews.length };
  }, [reviews]);

  return (
    <SiteLayout>
      <section className="bg-brand py-16 md:py-20">
        <div className="container-page text-center">
          <Reveal>
            <h1 className="font-serif text-5xl md:text-6xl text-ivory mb-4">Client Reviews</h1>
            {count > 0 && (
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.round(avg) ? "fill-[var(--color-gold)] text-gold" : "text-cream"}`}
                    />
                  ))}
                </div>
                <p className="text-cream text-sm">
                  {avg.toFixed(1)} average · {count} review{count !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section className="bg-brand pb-20">
        <div className="container-page">
          {reviews.length === 0 ? (
            <p className="text-center text-cream py-12">No reviews yet — be the first!</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 60}>
                  <div className="rounded-2xl bg-burgundy p-7 border border-gold-soft h-full">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} className={`h-4 w-4 ${idx < r.rating ? "fill-[var(--color-gold)] text-gold" : "text-cream"}`} />
                      ))}
                    </div>
                    <p className="italic text-ivory text-sm mb-4">"{r.review_text}"</p>
                    <p className="font-display text-sm text-gold">{r.customer_name}</p>
                    {r.product_purchased && <p className="text-xs text-cream mt-1">{r.product_purchased}</p>}
                    <p className="text-xs text-cream mt-2">
                      {new Date(r.created_at).toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <ReviewForm />
    </SiteLayout>
  );
}

function ReviewForm() {
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast.error("Please fill in your name and review");
      return;
    }
    setSubmitting(true);
    const { error } = await (supabase as any).from("reviews").insert({
      customer_name: name.trim(),
      product_purchased: product.trim() || null,
      rating,
      review_text: text.trim(),
      is_approved: false,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit — please try again");
      return;
    }
    toast.success("Thank you! Your review will appear after approval 😊");
    setName("");
    setProduct("");
    setRating(5);
    setText("");
  };

  return (
    <section className="bg-burgundy py-20">
      <div className="container-page max-w-2xl">
        <h2 className="font-serif text-3xl md:text-4xl text-ivory text-center mb-3">Love Our Furniture?</h2>
        <p className="text-center text-cream mb-10">Share your experience</p>

        <form onSubmit={submit} className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-3 focus:outline-none focus:border-gold"
            required
          />
          <input
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Product purchased (optional)"
            className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-3 focus:outline-none focus:border-gold"
          />
          <div className="flex items-center gap-3">
            <span className="text-cream text-sm">Rating:</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="hover:scale-110 transition"
                >
                  <Star className={`h-7 w-7 ${i < rating ? "fill-[var(--color-gold)] text-gold" : "text-cream"}`} />
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us about your experience..."
            rows={5}
            className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-3 focus:outline-none focus:border-gold resize-none"
            required
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 rounded-lg bg-gold text-[#080808] font-bold hover:bg-[var(--color-gold-hover)] transition disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </section>
  );
}
