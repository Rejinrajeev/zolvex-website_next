"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { CalendarCheck, Search, Download, ShieldCheck, UserCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Technician {
  name: string;
  phone: string;
  photo?: string;
  rating?: number;
}

interface Booking {
  _id: string;
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  totalPrice: number;
  assignedTechnician?: Technician;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Assign Technician Modal State
  const [assigningBooking, setAssigningBooking] = useState<Booking | null>(null);
  const [techData, setTechData] = useState({
    name: "Rajesh Kumar",
    phone: "+91 9876543210",
    photo: "/images/work_img_1.jpeg",
    rating: 4.9
  });

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = statusFilter !== "all" 
        ? `/api/v1/admin/bookings?status=${statusFilter}`
        : "/api/v1/admin/bookings";
      const res = await fetch(url);
      const json = await res.json();
      if (json.success && json.data) {
        setBookings(json.data);
      }
    } catch (e) {
      console.warn("Failed to fetch admin bookings:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/v1/admin/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        fetchBookings();
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAssignTechnician = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningBooking) return;

    try {
      const res = await fetch(`/api/v1/admin/bookings/${assigningBooking._id}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(techData)
      });
      const json = await res.json();
      if (json.success) {
        setAssigningBooking(null);
        fetchBookings();
      }
    } catch (err) {
      console.error("Failed to assign technician:", err);
    }
  };

  const exportToCSV = () => {
    const headers = ["Booking Number,Customer Name,Phone,Address,Date,Time,Status,Total Price\n"];
    const rows = bookings.map(b => 
      `"${b.bookingNumber}","${b.customerName}","${b.customerPhone}","${b.customerAddress.replace(/"/g, '""')}","${b.preferredDate}","${b.preferredTime}","${b.status}",${b.totalPrice}`
    );
    const blob = new Blob([headers.concat(rows).join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Zolvex_Bookings_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const filtered = bookings.filter(b => 
    b.bookingNumber.toLowerCase().includes(search.toLowerCase()) ||
    b.customerName.toLowerCase().includes(search.toLowerCase()) ||
    b.customerPhone.includes(search)
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <CalendarCheck className="w-7 h-7 text-primary" />
              <span>Booking Control Hub</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">Approve, dispatch cleaning specialists, transition status, and export customer orders.</p>
          </div>

          <Button
            onClick={exportToCSV}
            className="bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4 text-primary" />
            <span>Export CSV</span>
          </Button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ref no, customer name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:border-primary outline-none"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
            {["all", "pending", "confirmed", "assigned", "in_progress", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  statusFilter === status
                    ? "bg-primary text-neutral-950 font-bold"
                    : "bg-neutral-950 text-neutral-400 hover:text-white"
                }`}
              >
                {status.replace("_", " ")}
              </button>
            ))}
          </div>

        </div>

        {/* Bookings Table */}
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
            <p className="text-xs font-semibold text-neutral-400">Loading bookings...</p>
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 uppercase tracking-wider font-bold border-b border-neutral-800">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Schedule</th>
                    <th className="p-4">Technician</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-medium">
                  {filtered.map((b) => (
                    <tr key={b._id} className="hover:bg-neutral-800/30 transition-colors">
                      
                      <td className="p-4 font-mono font-black text-primary">{b.bookingNumber}</td>
                      
                      <td className="p-4">
                        <span className="font-bold text-white block">{b.customerName}</span>
                        <span className="text-[11px] text-neutral-400">{b.customerPhone}</span>
                      </td>

                      <td className="p-4">
                        <span className="text-white block font-semibold">{b.preferredDate}</span>
                        <span className="text-[10px] text-neutral-400">{b.preferredTime}</span>
                      </td>

                      <td className="p-4 text-neutral-300">
                        {b.assignedTechnician ? (
                          <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-semibold">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{b.assignedTechnician.name}</span>
                          </div>
                        ) : (
                          <span className="text-neutral-500 italic text-[11px]">Unassigned</span>
                        )}
                      </td>

                      <td className="p-4 font-extrabold text-white">
                        ₹{b.totalPrice?.toLocaleString()}
                      </td>

                      <td className="p-4">
                        <select
                          value={b.status}
                          disabled={updatingId === b._id}
                          onChange={(e) => handleStatusChange(b._id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer ${
                            b.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            b.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                            b.status === 'assigned' || b.status === 'in_progress' ? 'bg-primary/10 text-primary border-primary/30' :
                            'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          <option value="pending" className="bg-neutral-900 text-white">Pending</option>
                          <option value="confirmed" className="bg-neutral-900 text-white">Confirmed</option>
                          <option value="assigned" className="bg-neutral-900 text-white">Assigned</option>
                          <option value="in_progress" className="bg-neutral-900 text-white">In Progress</option>
                          <option value="completed" className="bg-neutral-900 text-white">Completed</option>
                          <option value="cancelled" className="bg-neutral-900 text-white">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => setAssigningBooking(b)}
                          className="px-3 py-1.5 rounded-xl bg-primary hover:bg-primaryHover text-neutral-950 font-extrabold text-[11px] shadow-sm flex items-center space-x-1 ml-auto"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Assign Staff</span>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="p-8 text-center text-neutral-500 text-xs">
                No bookings found matching your search criteria.
              </div>
            )}
          </div>
        )}

        {/* Assign Specialist Modal */}
        {assigningBooking && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-md w-full space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-primary" />
                <span>Assign Cleaning Specialist</span>
              </h2>

              <p className="text-xs text-neutral-400">
                Assign a technician lead for booking <span className="font-mono text-primary font-bold">{assigningBooking.bookingNumber}</span>.
              </p>

              <form onSubmit={handleAssignTechnician} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Technician Full Name</label>
                  <input
                    type="text"
                    required
                    value={techData.name}
                    onChange={(e) => setTechData({ ...techData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300">Contact Phone Number</label>
                  <input
                    type="text"
                    required
                    value={techData.phone}
                    onChange={(e) => setTechData({ ...techData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Rating Badge</label>
                    <input
                      type="number"
                      step="0.1"
                      value={techData.rating}
                      onChange={(e) => setTechData({ ...techData, rating: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Photo Avatar URL</label>
                    <input
                      type="text"
                      value={techData.photo}
                      onChange={(e) => setTechData({ ...techData, photo: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4 border-t border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setAssigningBooking(null)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary text-neutral-950 text-xs font-bold shadow-md"
                  >
                    Dispatch Specialist
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
