"use client";

import { useState, useEffect } from "react";
import { CalendarCheck, Search, Clock, MapPin, XCircle, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  createdAt: string;
}

export default function MyBookingsPage() {
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/v1/bookings/search/${encodeURIComponent(phone.trim())}`);
      const json = await res.json();
      if (json.success && json.data) {
        setBookings(json.data);
      }
    } catch (err) {
      console.error("Failed to search bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    setCancellingId(id);

    try {
      const res = await fetch(`/api/v1/bookings/${id}/cancel`, {
        method: "PUT"
      });
      const json = await res.json();
      if (json.success) {
        handleSearch();
      }
    } catch (err) {
      console.error("Cancel failed:", err);
    } finally {
      setCancellingId(null);
    }
  };

  const upcomingBookings = bookings.filter(b => ["pending", "confirmed", "assigned", "in_progress"].includes(b.status));
  const completedBookings = bookings.filter(b => b.status === "completed");
  const cancelledBookings = bookings.filter(b => b.status === "cancelled");

  const displayedList = 
    activeTab === "upcoming" ? upcomingBookings :
    activeTab === "completed" ? completedBookings : cancelledBookings;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOMER BOOKING PORTAL</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">My Service Bookings</h1>
          <p className="text-sm text-muted max-w-md mx-auto">
            View your upcoming cleaning schedules, track live technician status, or cancel bookings.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-xs max-w-xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number (e.g. 9998887770)..."
              className="flex-1 p-3.5 rounded-xl bg-secondaryBg/30 border border-border text-sm font-semibold text-foreground focus:border-primary outline-none"
            />
            <Button
              type="submit"
              disabled={loading}
              className="py-3.5 px-6 rounded-xl bg-primary hover:bg-primaryHover text-white font-bold text-xs shadow-md transition-all"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Lookup Bookings"}
            </Button>
          </form>
        </div>

        {searched && (
          <div className="space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex justify-center space-x-2 border-b border-border pb-3">
              {[
                { id: "upcoming", label: `Upcoming (${upcomingBookings.length})` },
                { id: "completed", label: `Completed (${completedBookings.length})` },
                { id: "cancelled", label: `Cancelled (${cancelledBookings.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-card text-muted border border-border hover:border-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {displayedList.map((b) => (
                <div key={b._id} className="bg-card border border-border p-6 rounded-3xl space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-muted block">Booking Reference</span>
                      <span className="font-mono font-black text-lg text-primary">{b.bookingNumber}</span>
                    </div>

                    <span className={`self-start sm:self-auto text-xs font-extrabold px-3 py-1 rounded-full uppercase border ${
                      b.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                      b.status === 'cancelled' ? 'bg-red-500/10 text-red-500 border-red-500/30' :
                      b.status === 'confirmed' ? 'bg-blue-500/10 text-blue-500 border-blue-500/30' :
                      'bg-amber-500/10 text-amber-500 border-amber-500/30'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-muted block font-semibold">Service Date & Time Slot</span>
                      <span className="text-foreground font-bold block flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{b.preferredDate} ({b.preferredTime})</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-muted block font-semibold">Service Location</span>
                      <span className="text-foreground font-medium block flex items-center space-x-1.5">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{b.customerAddress}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted font-semibold block">Total Amount Payable</span>
                      <span className="text-lg font-black text-foreground">₹{b.totalPrice?.toLocaleString()}</span>
                    </div>

                    {["pending", "confirmed"].includes(b.status) && (
                      <button
                        onClick={() => handleCancel(b._id)}
                        disabled={cancellingId === b._id}
                        className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold transition-all"
                      >
                        {cancellingId === b._id ? "Cancelling..." : "Cancel Booking"}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {displayedList.length === 0 && (
                <div className="text-center py-12 bg-card border border-border rounded-3xl p-6">
                  <AlertCircle className="w-8 h-8 text-muted mx-auto mb-2" />
                  <p className="text-xs font-semibold text-muted">No {activeTab} bookings found for this phone number.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
