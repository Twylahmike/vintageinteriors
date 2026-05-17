import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DISMISS_KEY = "vf_ann_dismissed";

export function AnnouncementBar() {
  const [ann, setAnn] = useState<{ text: string; background_color: string; visible: boolean } | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("visible", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    if (data) {
      setAnn(data);
      const last = typeof window !== "undefined" ? localStorage.getItem(DISMISS_KEY) : null;
      setDismissed(last === data.text);
    }
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("announcements")
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (ann && ann.visible && ann.text && !dismissed) {
      root.style.setProperty("--ann-h", "36px");
      root.dataset.ann = "1";
    } else {
      root.style.setProperty("--ann-h", "0px");
      delete root.dataset.ann;
    }
  }, [ann, dismissed]);

  if (!ann || !ann.visible || !ann.text || dismissed) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-center text-xs md:text-sm font-medium tracking-wide text-ivory border-b border-gold-soft px-10"
      style={{ backgroundColor: ann.background_color || "#3b0a0a" }}
      role="status"
    >
      <span className="truncate">{ann.text}</span>
      <button
        onClick={() => {
          setDismissed(true);
          try { localStorage.setItem(DISMISS_KEY, ann.text); } catch {}
        }}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gold hover:text-[var(--color-gold-hover)]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
