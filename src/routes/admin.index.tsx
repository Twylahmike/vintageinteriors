import { createFileRoute, Link } from "@tanstack/react-router";
import { useSupabaseTable } from "@/hooks/use-supabase-table";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: products } = useSupabaseTable<any>({ table: "products" });
  const { data: reviews } = useSupabaseTable<any>({ table: "reviews" });
  const visible = products.filter((p) => p.is_visible).length;
  const pending = reviews.filter((r) => !r.is_approved).length;

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Visible Products", value: visible },
    { label: "Total Reviews", value: reviews.length },
    { label: "Pending Reviews", value: pending },
  ];

  return (
    <div>
      <h2 className="font-serif text-4xl text-ivory mb-2">Dashboard</h2>
      <p className="text-cream mb-8">Manage your catalogue and reviews</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-burgundy border border-gold-soft p-5">
            <p className="text-xs text-cream uppercase tracking-wide mb-2">{s.label}</p>
            <p className="font-serif text-4xl text-gold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/admin/products" className="px-5 py-2.5 rounded-lg bg-gold text-[#080808] font-bold">
          + Add Product
        </Link>
        <Link to="/admin/reviews" className="px-5 py-2.5 rounded-lg border border-gold text-gold font-bold">
          Review Approvals ({pending})
        </Link>
        <Link to="/admin/gallery" className="px-5 py-2.5 rounded-lg border border-gold text-gold font-bold">
          Manage Gallery
        </Link>
      </div>
    </div>
  );
}
