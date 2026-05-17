import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/admin/bi/support")({ component: () => <BIPage title="Support" desc="Unified view of gift requests, contact form submissions, and enquiries." /> });
function BIPage({ title, desc }: { title: string; desc: string }) {
  return <div><h1 className="font-serif text-3xl text-ivory mb-2">{title}</h1><p className="text-cream/60">{desc}</p><div className="mt-8 bg-burgundy border border-gold-soft rounded-xl p-8 text-center text-cream/40">Analytics dashboard coming soon — data is being collected.</div></div>;
}
