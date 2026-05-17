import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

type Category = {
  id: string;
  name: string;
  icon: string;
  display_order: number;
  visible: boolean;
};

export default function AdminCategories() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🛋️");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const load = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("display_order");
    setCats(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const order = cats.length + 1;
    const { error } = await supabase
      .from("categories")
      .insert({ name: name.trim(), icon, display_order: order, visible: true });
    if (error) showToast("❌ Error adding category");
    else { showToast("✅ Category added"); setName(""); setIcon("🛋️"); await load(); }
    setSaving(false);
  };

  const toggleVisible = async (cat: Category) => {
    await supabase.from("categories").update({ visible: !cat.visible }).eq("id", cat.id);
    await load();
    showToast("✅ Updated");
  };

  const remove = async (cat: Category) => {
    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("category_id", cat.id);
    if (count && count > 0) {
      showToast(`❌ Cannot delete — ${count} product(s) use this category`);
      return;
    }
    if (!confirm(`Delete "${cat.name}"?`)) return;
    await supabase.from("categories").delete().eq("id", cat.id);
    showToast("✅ Deleted");
    await load();
  };

  return (
    <div className="max-w-2xl">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-surface border border-gold rounded-lg px-4 py-3 text-ivory text-sm shadow-lg">
          {toast}
        </div>
      )}

      <h1 className="font-serif text-3xl text-ivory mb-1">Categories</h1>
      <p className="text-cream/60 text-sm mb-8">Manage product categories shown on the shop page</p>

      {/* Add form */}
      <div className="bg-burgundy rounded-xl border border-gold-soft p-5 mb-8">
        <h2 className="text-gold font-semibold mb-4">Add New Category</h2>
        <div className="flex gap-3 flex-wrap">
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            placeholder="Emoji"
            className="w-16 rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2 text-center"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category name e.g. Sofas"
            className="flex-1 min-w-[180px] rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2"
            onKeyDown={(e) => e.key === "Enter" && add()}
          />
          <button
            onClick={add}
            disabled={saving || !name.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-gold text-[#080808] rounded-lg font-semibold text-sm disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {loading ? (
          <p className="text-cream/50 text-sm">Loading...</p>
        ) : cats.length === 0 ? (
          <p className="text-cream/50 text-sm">No categories yet. Add one above.</p>
        ) : (
          cats.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center gap-3 bg-burgundy border border-gold-soft rounded-xl px-4 py-3"
            >
              <GripVertical className="h-4 w-4 text-cream/30 shrink-0" />
              <span className="text-xl">{cat.icon}</span>
              <span className="flex-1 text-ivory font-medium">{cat.name}</span>
              <span className="text-xs text-cream/40">Order {cat.display_order}</span>
              <button
                onClick={() => toggleVisible(cat)}
                className="p-1.5 rounded-lg hover:bg-black/20 text-cream/60 hover:text-gold"
                title={cat.visible ? "Hide" : "Show"}
              >
                {cat.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button
                onClick={() => remove(cat)}
                className="p-1.5 rounded-lg hover:bg-black/20 text-cream/60 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
