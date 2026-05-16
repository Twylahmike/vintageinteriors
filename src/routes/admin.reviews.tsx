import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseTable } from "@/hooks/use-supabase-table";
import { toast } from "sonner";
import { Star, Trash2, Check, X } from "lucide-react";

export const Route = createFileRoute("/admin/reviews")({
  component: AdminReviews,
});

function AdminReviews() {
  const { data: reviews, refetch } = useSupabaseTable<any>({
    table: "reviews",
    order: { column: "created_at", ascending: false },
  });

  const toggle = async (r: any) => {
    await (supabase as any).from("reviews").update({ is_approved: !r.is_approved }).eq("id", r.id);
    refetch();
  };
  const remove = async (r: any) => {
    if (!confirm("Delete this review?")) return;
    await (supabase as any).from("reviews").delete().eq("id", r.id);
    toast.success("Deleted");
    refetch();
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-ivory mb-6">Reviews</h2>
      <div className="space-y-3">
        {reviews.length === 0 && <p className="text-cream">No reviews yet</p>}
        {reviews.map((r) => (
          <div key={r.id} className={`rounded-xl border p-5 ${r.is_approved ? "border-gold-soft bg-burgundy" : "border-yellow-700/50 bg-[#2a1a06]"}`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-display text-gold">{r.customer_name}</p>
                {r.product_purchased && <p className="text-xs text-cream">{r.product_purchased}</p>}
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-[var(--color-gold)] text-gold" : "text-cream"}`} />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggle(r)} className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 ${r.is_approved ? "bg-yellow-700/40 text-yellow-200" : "bg-green-700/40 text-green-200"}`}>
                  {r.is_approved ? <><X className="h-3 w-3" /> Unapprove</> : <><Check className="h-3 w-3" /> Approve</>}
                </button>
                <button onClick={() => remove(r)} className="text-red-400 p-1.5"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="text-ivory text-sm italic">"{r.review_text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
