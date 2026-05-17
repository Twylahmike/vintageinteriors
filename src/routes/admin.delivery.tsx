import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/admin/delivery")({
  component: AdminDelivery,
});

type Zone = { id: string; zone_name: string; fee: number; delivery_time: string; is_free: boolean; is_active: boolean; color_hex: string };
type Area = { id: string; zone_id: string; area_name: string; aliases: string[] };

function AdminDelivery() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [newZone, setNewZone] = useState({ zone_name: "", fee: "", delivery_time: "", color_hex: "#B8952A" });
  const [newArea, setNewArea] = useState<Record<string, { area_name: string; aliases: string }>>({});
  const [threshold, setThreshold] = useState("15000");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const load = async () => {
    const [{ data: z }, { data: a }] = await Promise.all([
      supabase.from("delivery_zones").select("*").order("id"),
      supabase.from("delivery_zone_areas").select("*").order("area_name"),
    ]);
    setZones(z || []);
    setAreas(a || []);
    const { data: setting } = await supabase.from("delivery_settings").select("value").eq("key", "free_delivery_threshold").single();
    if (setting) setThreshold(setting.value);
  };

  useEffect(() => { load(); }, []);

  const addZone = async () => {
    if (!newZone.zone_name.trim()) return;
    await supabase.from("delivery_zones").insert({
      zone_name: newZone.zone_name,
      fee: parseInt(newZone.fee) || 0,
      delivery_time: newZone.delivery_time,
      color_hex: newZone.color_hex,
      is_free: parseInt(newZone.fee) === 0,
      is_active: true,
    });
    showToast("✅ Zone added");
    setNewZone({ zone_name: "", fee: "", delivery_time: "", color_hex: "#B8952A" });
    await load();
  };

  const deleteZone = async (id: string, name: string) => {
    if (!confirm(`Delete zone "${name}"? All areas in this zone will also be deleted.`)) return;
    await supabase.from("delivery_zone_areas").delete().eq("zone_id", id);
    await supabase.from("delivery_zones").delete().eq("id", id);
    showToast("✅ Zone deleted");
    await load();
  };

  const toggleZone = async (z: Zone) => {
    await supabase.from("delivery_zones").update({ is_active: !z.is_active }).eq("id", z.id);
    await load();
  };

  const addArea = async (zoneId: string) => {
    const entry = newArea[zoneId];
    if (!entry?.area_name.trim()) return;
    const aliases = entry.aliases.split(",").map((a) => a.trim()).filter(Boolean);
    await supabase.from("delivery_zone_areas").insert({ zone_id: zoneId, area_name: entry.area_name, aliases });
    showToast("✅ Area added");
    setNewArea((prev) => ({ ...prev, [zoneId]: { area_name: "", aliases: "" } }));
    await load();
  };

  const deleteArea = async (id: string) => {
    await supabase.from("delivery_zone_areas").delete().eq("id", id);
    await load();
  };

  const saveThreshold = async () => {
    const { data } = await supabase.from("delivery_settings").select("id").eq("key", "free_delivery_threshold").single();
    if (data) await supabase.from("delivery_settings").update({ value: threshold }).eq("key", "free_delivery_threshold");
    else await supabase.from("delivery_settings").insert({ key: "free_delivery_threshold", value: threshold });
    showToast("✅ Threshold saved");
  };

  return (
    <div className="max-w-3xl">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-surface border border-gold rounded-lg px-4 py-3 text-ivory text-sm shadow-lg">
          {toast}
        </div>
      )}

      <h1 className="font-serif text-3xl text-ivory mb-1">Delivery Zones</h1>
      <p className="text-cream/60 text-sm mb-8">Manage zones, areas, and delivery fees shown on the Delivery page</p>

      <div className="bg-burgundy rounded-xl border border-gold-soft p-5 mb-8">
        <h2 className="text-gold font-semibold mb-3">Free Delivery Threshold</h2>
        <div className="flex gap-3 items-center">
          <span className="text-ivory text-sm">KES</span>
          <input value={threshold} onChange={(e) => setThreshold(e.target.value)}
            className="w-32 rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2 text-sm" />
          <button onClick={saveThreshold} className="px-4 py-2 bg-gold text-[#080808] rounded-lg text-sm font-semibold">Save</button>
        </div>
      </div>

      <div className="bg-burgundy rounded-xl border border-gold-soft p-5 mb-8">
        <h2 className="text-gold font-semibold mb-4">Add Zone</h2>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <input value={newZone.zone_name} onChange={(e) => setNewZone({ ...newZone, zone_name: e.target.value })}
            placeholder="Zone name e.g. Zone 1 — Karen"
            className="col-span-2 rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2 text-sm" />
          <input value={newZone.fee} onChange={(e) => setNewZone({ ...newZone, fee: e.target.value })}
            placeholder="Fee (KES) — 0 for free"
            className="rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2 text-sm" />
          <input value={newZone.delivery_time} onChange={(e) => setNewZone({ ...newZone, delivery_time: e.target.value })}
            placeholder="Delivery time e.g. Same day"
            className="rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2 text-sm" />
          <div className="flex items-center gap-2">
            <label className="text-cream/60 text-sm">Color:</label>
            <input type="color" value={newZone.color_hex} onChange={(e) => setNewZone({ ...newZone, color_hex: e.target.value })}
              className="h-9 w-16 rounded cursor-pointer bg-transparent border-0" />
          </div>
        </div>
        <button onClick={addZone} className="flex items-center gap-2 px-4 py-2 bg-gold text-[#080808] rounded-lg text-sm font-semibold">
          <Plus className="h-4 w-4" /> Add Zone
        </button>
      </div>

      <div className="space-y-3">
        {zones.map((zone) => {
          const zoneAreas = areas.filter((a) => a.zone_id === zone.id);
          const isOpen = expanded === zone.id;
          return (
            <div key={zone.id} className="bg-burgundy border border-gold-soft rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: zone.color_hex }} />
                <div className="flex-1">
                  <p className="text-ivory font-medium text-sm">{zone.zone_name}</p>
                  <p className="text-cream/50 text-xs">{zone.is_free ? "FREE" : `KES ${zone.fee.toLocaleString()}`} · {zone.delivery_time} · {zoneAreas.length} area(s)</p>
                </div>
                <button onClick={() => toggleZone(zone)}
                  className={`text-xs px-2 py-1 rounded-full font-medium ${zone.is_active ? "bg-green-900/50 text-green-300" : "bg-gray-800 text-gray-400"}`}>
                  {zone.is_active ? "Active" : "Inactive"}
                </button>
                <button onClick={() => setExpanded(isOpen ? null : zone.id)} className="p-1 text-cream/60 hover:text-gold">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <button onClick={() => deleteZone(zone.id, zone.zone_name)} className="p-1 text-cream/60 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {isOpen && (
                <div className="border-t border-gold-soft px-4 py-3 space-y-2">
                  {zoneAreas.map((a) => (
                    <div key={a.id} className="flex items-center gap-2 text-sm">
                      <span className="flex-1 text-ivory">{a.area_name}</span>
                      {a.aliases?.length > 0 && <span className="text-cream/40 text-xs">{a.aliases.join(", ")}</span>}
                      <button onClick={() => deleteArea(a.id)} className="p-1 text-cream/40 hover:text-red-400">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <input
                      value={newArea[zone.id]?.area_name || ""}
                      onChange={(e) => setNewArea((prev) => ({ ...prev, [zone.id]: { ...prev[zone.id], area_name: e.target.value, aliases: prev[zone.id]?.aliases || "" } }))}
                      placeholder="Area name e.g. Karen"
                      className="flex-1 min-w-[120px] rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-1.5 text-sm"
                    />
                    <input
                      value={newArea[zone.id]?.aliases || ""}
                      onChange={(e) => setNewArea((prev) => ({ ...prev, [zone.id]: { ...prev[zone.id], aliases: e.target.value, area_name: prev[zone.id]?.area_name || "" } }))}
                      placeholder="Aliases (comma separated)"
                      className="flex-1 min-w-[160px] rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-1.5 text-sm"
                    />
                    <button onClick={() => addArea(zone.id)}
                      className="px-3 py-1.5 bg-gold text-[#080808] rounded-lg text-sm font-semibold">
                      + Add Area
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
