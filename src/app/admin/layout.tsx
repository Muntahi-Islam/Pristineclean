"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Building2,
  Image,
  Star,
  FileText,
  HelpCircle,
  Settings,
  Menu,
  FileSpreadsheet,
  LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Quotes", icon: MessageSquare },
  { href: "/admin/invoices", label: "Invoices", icon: FileSpreadsheet },
  { href: "/admin/customers", label: "People", icon: Users },
  { href: "/admin/services", label: "Services", icon: Building2 },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const session = await authClient.getSession();
        if (!session.data && pathname !== "/admin/login") {
          router.push("/admin/login");
        } else {
          setAuthenticated(true);
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setChecking(false);
      }
    }
    checkAuth();
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking || !authenticated) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <div className="text-navy-400 text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy-900 text-warm-50 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center px-6 border-b border-navy-800">
          <Link href="/admin" className="text-xl font-bold">
            <span className="font-serif">Tori&apos;s</span>
            <span className="text-navy-300">Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-navy-600 text-white"
                    : "text-warm-300 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-navy-800 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-warm-400 hover:text-white transition-colors"
          >
            ← Back to Website
          </Link>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-navy-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0">
        <header className="h-20 bg-white border-b-2 border-navy-100 flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-navy-900"
          >
            <Menu size={24} />
          </button>
          <div className="flex-1" />
          <button
            onClick={async () => {
              await authClient.signOut();
              router.push("/admin/login");
            }}
            className="flex items-center gap-2 text-sm text-navy-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
          <Link
            href="/"
            className="text-sm text-navy-500 hover:text-navy-600 transition-colors"
          >
            View Site
          </Link>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
