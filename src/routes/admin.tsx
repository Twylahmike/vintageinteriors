import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { AdminGate, useAdminAuth } from "@/components/admin/AdminGate";
import { LayoutDashboard, Package, MessageSquare, Images, Settings, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminGate>
      <Shell />
    </AdminGate>
  );
}

function Shell() {
  const { logout } = useAdminAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/reviews", label: "Reviews", icon: MessageSquare },
    { to: "/admin/gallery", label: "Gallery", icon: Images },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];
  return (
    <div className="min-h-screen bg-brand flex flex-col md:flex-row">
      <aside className="md:w-64 bg-surface border-r border-gold-soft p-5">
        <h1 className="font-serif text-2xl text-gold mb-8">Vintage Admin</h1>
        <nav className="flex md:flex-col gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = l.exact ? path === l.to : path.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm whitespace-nowrap ${
                  active ? "bg-gold text-[#080808] font-semibold" : "text-ivory hover:bg-burgundy"
                }`}
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              logout();
              window.location.href = "/";
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-cream hover:bg-burgundy mt-auto"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
