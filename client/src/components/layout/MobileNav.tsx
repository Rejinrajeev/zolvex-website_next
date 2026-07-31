"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Search, PhoneCall, CalendarCheck } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Services", href: "/services", icon: Sparkles },
    { label: "Track", href: "/track", icon: Search },
    { label: "Call Us", href: "tel:+918089631909", icon: PhoneCall, external: true }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/80 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-3 py-2 transition-colors duration-200">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.external && (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)));

          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all text-muted hover:text-primary active:scale-95"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-0.5 shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold tracking-tight text-foreground">{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all active:scale-95 ${
                isActive ? "text-primary font-bold" : "text-muted hover:text-foreground"
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all ${
                isActive ? "bg-primary/15 text-primary scale-110" : ""
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 ${
                isActive ? "font-bold text-primary" : "font-medium"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
