import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Eye, EyeOff, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/admin/gifting")({
  component: AdminGifting,
});

type Occasion = { id: string; name: string; emoji: string; description: string; is_visible: boolean; display_order: number };
type GiftRequest = { id: string; name: string; phone: string; occasion: string; budget_range: string; message: string; status: string; created_at: string };

function AdminGifting() {
  const [tab, setTab] = useState<"occasions" | "requests">("occasions");
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [requests, setRequests] = useState<GiftRequest[]>([]);
  const [form, setForm] = useState({ name: "", emoji: "🎁", description: "" });
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const loadOccasions = async () => {
    const { data } = await supabase.from("gift_occasions").select("*").order("display_order");
    setOccasions(data || []);
  };

  const loadRequests = async () => {
    const { data } = await supabase.from("gift_requests").select("*").order("created_at", { ascending: false });
    setRequests(data || []);
  };

  useEffect(() => { loadOccasions(); loadRequests(); }, []);

  const addOccasion = async () => {
    if (!form.name.trim()) return;
    await supabase.from("gift_occasions").insert({
      name: form.name, emoji: form.emoji, description: form.description,
      display_order: occasions.length + 1, is_visible: true
    });
    showToast("✅ Occasion added");
    setForm({ name: "", emoji: "🎁", description: "" });
    await loadOccasions();
  };

  const toggleOccasion = async (o: Occasion) => {
    await supabase.from("gift_occasions").update({ is_visible: !o.is_visible }).eq("id", o.id);
    await loadOccasions();
  };

  const deleteOccasion = async (o: Occasion) => {
    if (!confirm(`Delete "${o.name}"?`)) return;
    await supabase.from("gift_occasions").delete().eq("id", o.id);
    showToast("✅ Deleted");
    await loadOccasions();
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("gift_requests").update({ status }).eq("id", id);
    await loadRequests();
  };

  const waLink = (r: GiftRequest) =>
    `https://wa.me/${r.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Hi ${r.name}! 🎁 Thanks for your gift request. Occasion: ${r.occasion}, Budget: ${r.budget_range}. ${r.message ? "Note: " + r.message : ""} Let me help you find the perfect piece!`
    )}`;

  const statusColor = (s: string) =>
    s === "pending" ? "bg-yellow-900/50 text-yellow-300" :
    s === "contacted" ? "bg-blue-900/50 text-blue-300" : "bg-green-900/50 text-green-300";

  return (
    <div className="max-w-4xl">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-surface border border-gold rounded-lg px-4 py-3 text-ivory text-sm shadow-lg">
          {toast}
        </div>
      )}

      <h1 className="font-serif text-3xl text-ivory mb-1">Gifting</h1>
      <p className="text-cream/60 text-sm mb-6">Manage gift occasions and customer gift requests</p>

      <div className="flex gap-2 mb-8">
        {(["occasions", "requests"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
              tab === t ? "bg-gold text-[#080808]" : "bg-burgundy text-ivory border border-gold-soft"
            }`}>
            {t} {t === "requests" && requests.filter(r => r.status === "pending").length > 0 &&
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {requests.filter(r => r.status === "pending").length}
              </span>}
          </button>
        ))}
      </div>

      {tab === "occasions" && (
        <div className="space-y-6">
          <div className="bg-burgundy rounded-xl border border-gold-soft p-5">
            <h2 className="text-gold font-semibold mb-4">Add Occasion</h2>
            <div className="flex gap-3 flex-wrap mb-3">
              <input value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                className="w-16 text-center rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-2 py-2" />
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Occasion name" className="flex-1 min-w-[160px] rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2" />
            </div>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Short description" className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2 mb-3" />
            <button onClick={addOccasion} className="flex items-center gap-2 px-4 py-2 bg-gold text-[#080808] rounded-lg font-semibold text-sm">
              <Plus className="h-4 w-4" /> Add Occasion
            </button>
          </div>

          <div className="space-y-2">
            {occasions.map((o) => (
              <div key={o.id} className="flex items-center gap-3 bg-burgundy border border-gold-soft rounded-xl px-4 py-3">
                <span className="text-xl">{o.emoji}</span>
                <div className="flex-1">
                  <p className="text-ivory font-medium">{o.name}</p>
                  <p className="text-cream/50 text-xs">{o.description}</p>
                </div>
                <button onClick={() => toggleOccasion(o)} className="p-1.5 text-cream/60 hover:text-gold">
                  {o.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
                <button onClick={() => deleteOccasion(o)} className="p-1.5 text-cream/60 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "requests" && (
        <div className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-cream/50 text-sm">No gift requests yet.</p>
          ) : requests.map((r) => (
            <div key={r.id} className="bg-burgundy border border-gold-soft rounded-xl p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-ivory font-semibold">{r.name}</p>
                  <p className="text-cream/60 text-sm">{r.phone} · {r.occasion} · {r.budget_range}</p>
                  {r.message && <p className="text-cream/50 text-xs mt-1 italic">"{r.message}"</p>}
                  <p className="text-cream/30 text-xs mt-1">{new Date(r.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor(r.status)}`}>
                    {r.status}
                  </span>
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    className="text-xs bg-[#1a0404] border border-gold-soft text-ivory rounded-lg px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <a href={waLink(r)} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-green-700 text-white rounded-lg text-xs font-medium hover:bg-green-600">
                    <MessageCircle className="h-3 w-3" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
