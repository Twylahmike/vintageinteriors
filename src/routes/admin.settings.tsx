import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseTable } from "@/hooks/use-supabase-table";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings;
});

const FIELDS = [
  { key: "whatsapp_number", label: "WhatsApp number (with country code, no +)" },
  { key: "business_hours", label: "Business hours" },
  { key: "location", label: "Location" },
  { key: "about_text", label: "About Us text", textarea: true },
  { key: "delivery_nairobi", label: "Delivery — Nairobi", textarea: true },
  { key: "delivery_countrywide", label: "Delivery — Countrywide", textarea: true },
  { key: "admin_password", label: "Admin password" },
];

function AdminSettings() {
  const { data: rows } = useSupabaseTable<{ key: string; value: string }>({ table: "settings" });
  const [vals, setVals] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const m: Record<string, string> = {};
    for (const r of rows) m[r.key] = r.value || "";
    setVals((prev) => ({ ...m, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows.length]);

  const save = async () => {
    setBusy(true);
    for (const f of FIELDS) {
      const value = vals[f.key] ?? "";
      const existing = rows.find((r) => r.key === f.key);
      if (existing) {
        await (supabase as any).from("settings").update({ value, updated_at: new Date().toISOString() }).eq("key", f.key);
      } else {
        await (supabase as any).from("settings").insert({ key: f.key, value });
      }
    }
    setBusy(false);
    toast.success("Settings saved");
  };

  return (
    <div className="max-w-2xl">
      <h2 className="font-serif text-3xl text-ivory mb-6">Settings</h2>
      <div className="space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="block text-cream text-sm mb-1.5">{f.label}</label>
            {f.textarea ? (
              <textarea
                value={vals[f.key] || ""}
                onChange={(e) => setVals((v) => ({ ...v, [f.key]: e.target.value }))}
                rows={3}
                className="w-full rounded-lg bg-burgundy border border-gold-soft text-ivory px-4 py-2.5"
              />
            ) : (
              <input
                value={vals[f.key] || ""}
                onChange={(e) => setVals((v) => ({ ...v, [f.key]: e.target.value }))}
                className="w-full rounded-lg bg-burgundy border border-gold-soft text-ivory px-4 py-2.5"
              />
            )}
          </div>
        ))}
        <button onClick={save} disabled={busy} className="px-6 py-3 rounded-lg bg-gold text-[#080808] font-bold">
          {busy ? "Saving..." : "Save settings"}
        </button>
      </div>
    </div>
  );
}
