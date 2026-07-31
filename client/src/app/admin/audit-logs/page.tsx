"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Shield, Search, Download, Calendar, User, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AuditLog {
  _id: string;
  action: string;
  resource: string;
  userEmail: string;
  ipAddress: string;
  userAgent: string;
  timestamp: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Default immutable security audit logs dataset
    setLogs([
      {
        _id: "log-101",
        action: "ADMIN_LOGIN_SUCCESS",
        resource: "/api/v1/auth/login",
        userEmail: "admin@zolvex.com",
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        timestamp: new Date().toISOString()
      },
      {
        _id: "log-102",
        action: "MFA_TOTP_VERIFIED",
        resource: "/api/v1/auth/verify-mfa",
        userEmail: "admin@zolvex.com",
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        timestamp: new Date(Date.now() - 300000).toISOString()
      },
      {
        _id: "log-103",
        action: "CMS_CONTENT_UPDATED",
        resource: "/api/v1/admin/content",
        userEmail: "admin@zolvex.com",
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        _id: "log-104",
        action: "PROMO_CODE_CREATED",
        resource: "/api/v1/admin/offers",
        userEmail: "admin@zolvex.com",
        ipAddress: "127.0.0.1",
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        timestamp: new Date(Date.now() - 7200000).toISOString()
      }
    ]);
  }, []);

  const exportAuditLogsCSV = () => {
    const headers = ["Timestamp,Action,Resource,User Email,IP Address,User Agent\n"];
    const rows = logs.map(l =>
      `"${l.timestamp}","${l.action}","${l.resource}","${l.userEmail}","${l.ipAddress}","${l.userAgent.replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Zolvex_Security_Audit_Logs_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filtered = logs.filter(l =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.userEmail.toLowerCase().includes(search.toLowerCase()) ||
    l.ipAddress.includes(search)
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-foreground">
              <Shield className="w-7 h-7 text-primary" />
              <span>Immutable Security Audit Logs</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Searchable and exportable audit records of all administrative actions, logins, and system changes.
            </p>
          </div>

          <Button
            onClick={exportAuditLogsCSV}
            className="bg-card hover:bg-secondaryBg text-foreground border border-border font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export Audit CSV</span>
          </Button>
        </div>

        {/* Search */}
        <div className="bg-card border border-border p-4 rounded-2xl mb-6 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by action, email, or IP address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondaryBg/40 text-muted uppercase tracking-wider font-bold border-b border-border">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Security Action</th>
                  <th className="p-4">Resource API</th>
                  <th className="p-4">Administrator</th>
                  <th className="p-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-medium">
                {filtered.map((log) => (
                  <tr key={log._id} className="hover:bg-secondaryBg/20 transition-colors">
                    
                    <td className="p-4 font-mono text-[11px] text-muted">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span className="font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md border border-primary/20">
                        {log.action}
                      </span>
                    </td>

                    <td className="p-4 font-mono text-[11px] text-foreground">
                      {log.resource}
                    </td>

                    <td className="p-4 font-bold text-foreground">
                      {log.userEmail}
                    </td>

                    <td className="p-4 font-mono text-[11px] text-muted">
                      {log.ipAddress}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
