import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useSettings } from "@/hooks/use-supabase-table";

const DISMISS_KEY = "vf_ann_dismissed";

export function AnnouncementBar() {
  const { settings } = useSettings();
  const text = settings.announcement_text || "";
  const visible = (settings.announcement_visible || "true") === "true";
  const bg = settings.announcement_bg || "#3b0a0a";

  const [dismissed, setDismissed] = useState(false);

  // re-show if admin changes the text
  useEffect(() => {
    const last = typeof window !== "undefined" ? localStorage.getItem(DISMISS_KEY) : null;
    setDismissed(last === text && !!text);
  }, [text]);

  // expose its height for layout offsets
  useEffect(() => {
    const root = document.documentElement;
    if (visible && text && !dismissed) {
      root.style.setProperty("--ann-h", "36px");
      root.dataset.ann = "1";
    } else {
      root.style.setProperty("--ann-h", "0px");
      delete root.dataset.ann;
    }
  }, [visible, text, dismissed]);

  if (!visible || !text || dismissed) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-center text-xs md:text-sm font-medium tracking-wide text-ivory border-b border-gold-soft px-10"
      style={{ backgroundColor: bg }}
      role="status"
    >
      <span className="truncate">{text}</span>
      <button
        onClick={() => {
          setDismissed(true);
          try { localStorage.setItem(DISMISS_KEY, text); } catch {}
        }}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gold hover:text-[var(--color-gold-hover)]"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
