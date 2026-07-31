"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  CalendarCheck, 
  Tag, 
  Palette, 
  Users, 
  MessageSquare, 
  ShieldCheck,
  Shield,
  ArrowLeft,
  Sparkles,
  Menu,
  X,
  LogOut,
  Image as ImageIcon
} from "lucide-react";
import { useState } from "react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Services Catalog", href: "/admin/services", icon: Sparkles },
    { label: "Cloudinary Media", href: "/admin/media", icon: ImageIcon },
    { label: "Website CMS Editor", href: "/admin/cms", icon: FileText },
    { label: "Booking Control", href: "/admin/bookings", icon: CalendarCheck },
    { label: "Offers & Coupons", href: "/admin/offers", icon: Tag },
    { label: "Theme Customizer", href: "/admin/theme", icon: Palette },
    { label: "User & RBAC Manager", href: "/admin/users", icon: Users },
    { label: "Messages & Reviews", href: "/admin/messages", icon: MessageSquare },
    { label: "Security & Sessions", href: "/admin/security", icon: ShieldCheck },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: Shield }
  ];

  const handleLogout = () => {
    localStorage.removeItem("zolvex_token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-card text-foreground p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-extrabold text-base tracking-tight text-foreground">ZOLVEX <span className="text-primary">ADMIN</span></span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-secondaryBg text-foreground"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card text-foreground flex flex-col justify-between border-r border-border transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div>
          {/* Logo Header */}
          <div className="p-6 border-b border-border hidden lg:flex items-center justify-between">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-black text-xl tracking-tight text-foreground">ZOLVEX <span className="text-primary">ADMIN</span></span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted px-3 block mb-2">Management Modules</span>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white font-bold shadow-md"
                      : "text-muted hover:text-foreground hover:bg-secondaryBg/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Quick Return & Logout */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out Admin Session</span>
          </button>

          <Link
            href="/"
            className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded-xl border border-border hover:bg-secondaryBg text-xs font-semibold text-muted hover:text-foreground transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
