import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { AdminGate, useAdminAuth } from "@/components/admin/AdminGate";
import {
  LayoutDashboard, Package, MessageSquare, Images, Settings, LogOut,
  Tag, Megaphone, Gift, Truck, TrendingUp, DollarSign, BarChart3,
  HeadphonesIcon, Cog, Home
} from "lucide-react";

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

  const ops = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/categories", label: "Categories", icon: Tag },
    { to: "/admin/reviews", label: "Reviews", icon: MessageSquare },
    { to: "/admin/gallery", label: "Gallery", icon: Images },
    { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
    { to: "/admin/gifting", label: "Gifting", icon: Gift },
    { to: "/admin/delivery", label: "Delivery Zones", icon: Truck },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const bi = [
    { to: "/admin/bisales", label: "Sales", icon: TrendingUp },
    { to: "/admin/bifinancial", label: "Financial", icon: DollarSign },
    { to: "/admin/bimarketing", label: "Marketing", icon: BarChart3 },
    { to: "/admin/bisupport", label: "Support", icon: HeadphonesIcon },
    { to: "/admin/bioperations", label: "Operations", icon: Cog },
  ];

  const NavLink = ({ l }: { l: typeof ops[0] }) => {
    const active = l.exact ? path === l.to : path === l.to || path.startsWith(l.to + "/");
    return (
      <Link
        key={l.to}
        to={l.to}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
          active ? "bg-gold text-[#080808] font-semibold" : "text-ivory hover:bg-burgundy"
        }`}
      >
        <l.icon className="h-4 w-4 shrink-0" />
        {l.label}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-brand flex flex-col md:flex-row">
      <aside className="md:w-64 bg-surface border-r border-gold-soft p-5 flex flex-col">
        <h1 className="font-serif text-2xl text-gold mb-8">Vintage Admin</h1>

        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible flex-1">
          {/* OPERATIONS */}
          <p className="hidden md:block text-[10px] uppercase tracking-widest text-cream/50 font-sans px-4 mb-1 mt-1">
            Operations
          </p>
          {ops.map((l) => <NavLink key={l.to} l={l} />)}

          {/* BI SUITE */}
          <p className="hidden md:block text-[10px] uppercase tracking-widest text-cream/50 font-sans px-4 mb-1 mt-5">
            BI Suite
          </p>
          {bi.map((l) => <NavLink key={l.to} l={l} />)}

          {/* Bottom links */}
          <div className="hidden md:flex flex-col gap-1 mt-6 pt-6 border-t border-gold-soft">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ivory hover:bg-burgundy"
            >
              <Home className="h-4 w-4" /> Back to Site
            </Link>
            <button
              onClick={() => { logout(); window.location.href = "/"; }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-cream hover:bg-burgundy"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          {/* Mobile sign out */}
          <button
            onClick={() => { logout(); window.location.href = "/"; }}
            className="md:hidden flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-cream hover:bg-burgundy"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
