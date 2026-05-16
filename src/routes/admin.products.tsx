import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseTable } from "@/hooks/use-supabase-table";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { SafeImage } from "@/components/SafeImage";
import { formatKES } from "@/lib/whatsapp";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

interface Cat { id: string; name: string; slug: string; }
interface P {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  dimensions: string | null;
  image_url: string | null;
  is_visible: boolean;
}

function AdminProducts() {
  const { data: products, refetch } = useSupabaseTable<P>({
    table: "products",
    order: { column: "created_at", ascending: false },
  });
  const { data: categories } = useSupabaseTable<Cat>({ table: "categories" });
  const [editing, setEditing] = useState<P | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const toggleVisible = async (p: P) => {
    await (supabase as any).from("products").update({ is_visible: !p.is_visible }).eq("id", p.id);
    refetch();
  };

  const remove = async (p: P) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    await (supabase as any).from("products").delete().eq("id", p.id);
    toast.success("Deleted");
    refetch();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="font-serif text-3xl text-ivory">Products</h2>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold text-[#080808] font-bold"
        >
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="w-full max-w-sm mb-5 rounded-lg bg-burgundy border border-gold-soft text-ivory px-4 py-2.5 focus:outline-none focus:border-gold"
      />

      <div className="rounded-xl bg-burgundy border border-gold-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#2a0606] text-cream uppercase text-xs">
            <tr>
              <th className="text-left p-3">Image</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3 hidden md:table-cell">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Visible</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-gold-soft text-ivory">
                <td className="p-3"><SafeImage src={p.image_url} alt={p.name} className="h-12 w-12 object-cover rounded" /></td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 hidden md:table-cell text-cream">{p.category}</td>
                <td className="p-3 text-gold font-semibold">{formatKES(p.price)}</td>
                <td className="p-3">
                  <button onClick={() => toggleVisible(p)} className={`text-xs px-2 py-1 rounded ${p.is_visible ? "bg-green-700/30 text-green-300" : "bg-red-700/30 text-red-300"}`}>
                    {p.is_visible ? "Yes" : "No"}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => setEditing(p)} className="text-gold p-1.5"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => remove(p)} className="text-red-400 p-1.5"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-cream">No products yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <ProductForm
          initial={editing}
          categories={categories}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSaved={() => {
            setEditing(null);
            setCreating(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}

function ProductForm({
  initial,
  categories,
  onClose,
  onSaved,
}: {
  initial: P | null;
  categories: Cat[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState(initial?.name || "");
  const [category, setCategory] = useState(initial?.category || categories[0]?.name || "");
  const [price, setPrice] = useState(initial?.price?.toString() || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [dimensions, setDimensions] = useState(initial?.dimensions || "");
  const [imageUrl, setImageUrl] = useState<string | null>(initial?.image_url || null);
  const [visible, setVisible] = useState(initial?.is_visible ?? true);
  const [busy, setBusy] = useState(false);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !price) {
      toast.error("Name, category and price are required");
      return;
    }
    setBusy(true);
    const payload = {
      name, category, price: Number(price), description: description || null,
      dimensions: dimensions || null, image_url: imageUrl, is_visible: visible,
    };
    const res = initial
      ? await (supabase as any).from("products").update(payload).eq("id", initial.id)
      : await (supabase as any).from("products").insert(payload);
    setBusy(false);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success(initial ? "Updated" : "Created");
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={save} className="bg-burgundy rounded-2xl border border-gold p-6 w-full max-w-lg space-y-4 my-8">
        <h3 className="font-serif text-2xl text-gold">{initial ? "Edit" : "New"} Product</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name *" className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-2.5" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-2.5">
          {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="Price (KES) *" className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-2.5" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={3} className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-2.5 resize-none" />
        <input value={dimensions} onChange={(e) => setDimensions(e.target.value)} placeholder="Dimensions (optional)" className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-2.5" />
        <div>
          <label className="block text-cream text-sm mb-2">Image</label>
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </div>
        <label className="flex items-center gap-2 text-ivory">
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
          Visible on storefront
        </label>
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gold-soft text-ivory">Cancel</button>
          <button disabled={busy} className="px-5 py-2 rounded-lg bg-gold text-[#080808] font-bold">{busy ? "Saving..." : "Save"}</button>
        </div>
      </form>
    </div>
  );
}
