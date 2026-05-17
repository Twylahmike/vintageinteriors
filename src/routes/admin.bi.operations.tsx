import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/bi/operations")({ component: () => <BIPage title="Operations" desc="Inventory overview, hidden products, and low stock alerts." /> });
function BIPage({ title, desc }: { title: string; desc: string }) {
  return <div><h1 className="font-serif text-3xl text-ivory mb-2">{title}</h1><p className="text-cream/60">{desc}</p><div className="mt-8 bg-burgundy border border-gold-soft rounded-xl p-8 text-center text-cream/40">Analytics dashboard coming soon — data is being collected.</div></div>;
}
