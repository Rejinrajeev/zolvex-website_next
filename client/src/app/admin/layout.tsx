"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Skip auth check for login page itself
    if (pathname === "/admin/login") {
      setAuthorized(true);
      return;
    }

    const token =
      localStorage.getItem("zolvex_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [pathname, router]);

  if (!authorized && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
        <p className="text-xs font-semibold text-neutral-400 animate-pulse">
          Verifying Admin Credentials & Authorization...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
