import { useSettings } from "@/hooks/use-supabase-table";
import { waLink, WHATSAPP_NUMBER, formatKES } from "@/lib/whatsapp";
import { SafeImage } from "./SafeImage";
import { MessageCircle } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string | null;
  dimensions?: string | null;
  image_url?: string | null;
  images?: string[] | null;
  is_visible?: boolean;
}

export function ProductCard({ product, onOpen }: { product: Product; onOpen?: (p: Product) => void }) {
  const { settings } = useSettings();
  const number = settings.whatsapp_number || WHATSAPP_NUMBER;
  const msg = `Hi Vintage Furniture! 👋 I'm interested in ${product.name} priced at ${formatKES(product.price)}. Is it available?`;
  return (
    <article
      onClick={() => onOpen?.(product)}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-burgundy border border-transparent hover:border-[var(--color-gold)] transition-all duration-300 hover:shadow-gold hover:-translate-y-1"
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#2a0606]">
        <SafeImage
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-ivory mb-1.5">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-cream line-clamp-2 mb-3">{product.description}</p>
        )}
        <p className="font-bold text-lg text-gold mb-4">{formatKES(product.price)}</p>
        <a
          href={waLink(msg, number)}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-2 w-full rounded-md bg-whatsapp text-white font-semibold py-2.5 text-sm hover:brightness-110 transition"
        >
          <MessageCircle className="h-4 w-4" />
          Order via WhatsApp
        </a>
      </div>
    </article>
  );
}
