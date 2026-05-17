import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseTable } from "@/hooks/use-supabase-table";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const { data: items, refetch } = useSupabaseTable<any>({
    table: "gallery",
    order: { column: "display_order", ascending: true },
  });
  const [newUrl, setNewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const add = async () => {
    if (!newUrl) return;
    await (supabase as any).from("gallery").insert({
      image_url: newUrl,
      caption: caption || null,
      display_order: items.length,
    });
    toast.success("Added");
    setNewUrl(null);
    setCaption("");
    refetch();
  };

  const remove = async (id: string) => {
    await (supabase as any).from("gallery").delete().eq("id", id);
    refetch();
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-ivory mb-6">Gallery</h2>

      <div className="rounded-xl bg-burgundy border border-gold-soft p-5 mb-8">
        <p className="text-cream mb-3 text-sm">Add new image</p>
        <div className="flex flex-wrap items-end gap-4">
          <ImageUpload value={newUrl} onChange={setNewUrl} folder="gallery" />
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption (optional)"
            className="rounded-lg bg-[#1a0404] border border-gold-soft text-ivory px-4 py-2.5"
          />
          <button onClick={add} disabled={!newUrl} className="px-5 py-2.5 rounded-lg bg-gold text-[#080808] font-bold disabled:opacity-50">
            Add to gallery
          </button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="relative group rounded-lg overflow-hidden">
            <img src={g.image_url} alt="" className="w-full aspect-square object-cover" />
            <button
              onClick={() => remove(g.id)}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
