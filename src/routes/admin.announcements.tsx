import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/announcements")({
  component: AdminAnnouncements,
});

function AdminAnnouncements() {
  const [text, setText] = useState("");
  const [bg, setBg] = useState("#B8952A");
  const [visible, setVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(1).single()
      .then(({ data }) => {
        if (data) { setText(data.text || ""); setBg(data.background_color || "#B8952A"); setVisible(data.visible ?? true); }
      });
  }, []);

  const save = async () => {
    setSaving(true);
    const { data: existing } = await supabase.from("announcements").select("id").limit(1).single();
    if (existing) {
      await supabase.from("announcements").update({ text, background_color: bg, visible }).eq("id", existing.id);
    } else {
      await supabase.from("announcements").insert({ text, background_color: bg, visible });
    }
    showToast("✅ Saved — live site updated");
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-surface border border-gold rounded-lg px-4 py-3 text-ivory text-sm shadow-lg">
          {toast}
        </div>
      )}
      <h1 className="font-serif text-3xl text-ivory mb-1">Announcement Bar</h1>
      <p className="text-cream/60 text-sm mb-8">Controls the banner shown at the top of every page</p>
      <div
        className="w-full rounded-xl px-4 py-3 text-center text-sm font-medium mb-8 transition-all"
        style={{ backgroundColor: bg, color: "#080808" }}
      >
        {text || "Your announcement will appear here"}
      </div>
      <div className="bg-burgundy rounded-xl border border-gold-soft p-6 space-y-5">
        <div>
          <label className="text-gold text-sm font-semibold block mb-2">Announcement Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            placeholder="e.g. 🚚 Free delivery this weekend on all orders above KES 15,000!"
            className="w-full rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-3 py-2 resize-none"
          />
        </div>
        <div>
          <label className="text-gold text-sm font-semibold block mb-2">Background Color</label>
          <div className="flex items-center gap-3">
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)}
              className="h-10 w-16 rounded cursor-pointer bg-transparent border-0" />
            <span className="text-ivory text-sm">{bg}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setVisible(!visible)}
            className={`relative w-12 h-6 rounded-full transition-colors ${visible ? "bg-gold" : "bg-gray-600"}`}
          >
            <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${visible ? "left-7" : "left-1"}`} />
          </button>
          <span className="text-ivory text-sm">{visible ? "Visible on site" : "Hidden"}</span>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="w-full h-11 bg-gold text-[#080808] rounded-lg font-bold text-sm disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Announcement"}
        </button>
      </div>
    </div>
  );
}
