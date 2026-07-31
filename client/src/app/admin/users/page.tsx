"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Users, Search, Shield, UserX, UserCheck, Mail, Phone } from "lucide-react";

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "user" | "technician" | "admin" | "super_admin";
  isActive: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Default system users list
    setUsers([
      {
        _id: "usr-001",
        fullName: "Rejin Rajeev (Super Admin)",
        email: "admin@zolvex.com",
        phone: "+91 98765 43210",
        role: "super_admin",
        isActive: true,
        createdAt: "2026-01-15"
      },
      {
        _id: "usr-002",
        fullName: "Anand Kumar",
        email: "anand@example.com",
        phone: "+91 99988 77766",
        role: "user",
        isActive: true,
        createdAt: "2026-03-10"
      },
      {
        _id: "usr-003",
        fullName: "Suresh Pillai (Technician)",
        email: "suresh.tech@zolvex.com",
        phone: "+91 94455 66778",
        role: "technician",
        isActive: true,
        createdAt: "2026-02-01"
      }
    ]);
    setLoading(false);
  }, []);

  const toggleUserActive = (id: string) => {
    setUsers(prev => prev.map(u => u._id === id ? { ...u, isActive: !u.isActive } : u));
  };

  const changeRole = (id: string, newRole: any) => {
    setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
  };

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-foreground">
              <Users className="w-7 h-7 text-primary" />
              <span>User & Role-Based Access Control (RBAC)</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Manage user accounts, assign security roles, suspend accounts, and view activity history.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-card border border-border p-4 rounded-2xl mb-6 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search users by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondaryBg/40 text-muted uppercase tracking-wider font-bold border-b border-border">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-medium">
                {filtered.map((u) => (
                  <tr key={u._id} className="hover:bg-secondaryBg/20 transition-colors">
                    
                    <td className="p-4 font-bold text-foreground">
                      {u.fullName}
                      <span className="text-[10px] text-muted block font-normal">ID: {u._id}</span>
                    </td>

                    <td className="p-4">
                      <span className="text-foreground block font-semibold">{u.email}</span>
                      <span className="text-[11px] text-muted">{u.phone}</span>
                    </td>

                    <td className="p-4">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u._id, e.target.value)}
                        className="bg-card border border-border text-primary font-bold text-xs px-2.5 py-1.5 rounded-lg outline-none cursor-pointer"
                      >
                        <option value="user">User</option>
                        <option value="technician">Technician</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </td>

                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${u.isActive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                        {u.isActive ? "Active" : "Suspended"}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleUserActive(u._id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          u.isActive
                            ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        }`}
                      >
                        {u.isActive ? "Suspend Account" : "Activate Account"}
                      </button>
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
