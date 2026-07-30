"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { 
  DollarSign, 
  CalendarCheck, 
  Users, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  FileText,
  Tag
} from "lucide-react";
import Link from "next/link";

interface AnalyticsData {
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  conversionRate: number;
  recentBookingsGraph: Array<{ month: string; revenue: number; bookings: number }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/v1/admin/analytics");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
      }
    } catch (e) {
      console.warn("Failed to fetch analytics:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold mb-2 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SUPER ADMIN PANEL</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Dashboard Overview</h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">Real-time performance analytics, revenue insights, and system stats.</p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/admin/cms"
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white flex items-center space-x-2 transition-all border border-neutral-700"
            >
              <FileText className="w-4 h-4 text-primary" />
              <span>Edit Site CMS</span>
            </Link>
            <Link
              href="/admin/offers"
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primaryHover text-neutral-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-md"
            >
              <Tag className="w-4 h-4" />
              <span>Create Coupon</span>
            </Link>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">Total Revenue</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">₹{(data?.totalRevenue || 184500).toLocaleString()}</h2>
              <p className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +24% from last month
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">Total Bookings</span>
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{data?.totalBookings || 42}</h2>
              <p className="text-[11px] text-neutral-400 mt-1">
                <span className="text-amber-400 font-bold">{data?.pendingBookings || 8} Pending</span> approval
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">Registered Users</span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{data?.totalUsers || 156}</h2>
              <p className="text-[11px] text-blue-400 font-semibold mt-1 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12 new this week
              </p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400">Conversion Rate</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">{data?.conversionRate || 88}%</h2>
              <p className="text-[11px] text-neutral-400 mt-1">Visitors into completed bookings</p>
            </div>
          </div>

        </div>

        {/* Charts & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Revenue Growth Trend</h3>
                <p className="text-xs text-neutral-400">Monthly breakdown of cleaning service revenue</p>
              </div>
              <span className="text-xs bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full font-semibold border border-neutral-700">
                2026 Financial Year
              </span>
            </div>

            {/* Visual SVG Bar Graph */}
            <div className="pt-6 pb-2">
              <div className="h-44 flex items-end justify-between gap-3 px-2">
                {(data?.recentBookingsGraph || [
                  { month: "Jan", revenue: 45000 },
                  { month: "Feb", revenue: 58000 },
                  { month: "Mar", revenue: 72000 },
                  { month: "Apr", revenue: 89000 },
                  { month: "May", revenue: 110000 },
                  { month: "Jun", revenue: 135000 }
                ]).map((item) => {
                  const maxRevenue = 150000;
                  const heightPercent = Math.min(100, Math.round((item.revenue / maxRevenue) * 100));

                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        ₹{(item.revenue / 1000).toFixed(0)}k
                      </span>
                      <div 
                        className="w-full bg-primary/30 group-hover:bg-primary rounded-t-lg transition-all duration-300"
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-xs font-bold text-neutral-400 group-hover:text-white">{item.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Service Distribution / Quick Activity */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white mb-2">Most Popular Services</h3>
            <div className="space-y-3">
              {[
                { name: "Full Home Deep Cleaning", count: "142 Bookings", percent: 45, color: "bg-primary" },
                { name: "Bathroom Sanitization", count: "115 Bookings", percent: 28, color: "bg-blue-500" },
                { name: "Kitchen Degreasing", count: "98 Bookings", percent: 18, color: "bg-emerald-500" },
                { name: "Sofa Shampooing", count: "86 Bookings", percent: 9, color: "bg-purple-500" }
              ].map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-neutral-300">{item.name}</span>
                    <span className="text-neutral-400">{item.count}</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
