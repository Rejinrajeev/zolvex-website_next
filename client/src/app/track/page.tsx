"use client";

import { useState, useEffect } from "react";
import { Search, Sparkles, CheckCircle2, Clock, User, Phone, MapPin, AlertCircle, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Technician {
  name: string;
  phone: string;
  photo: string;
  rating: number;
  assignedAt?: string;
}

interface StatusHistoryItem {
  status: string;
  timestamp: string;
  note?: string;
}

interface BookingDetails {
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
  statusHistory?: StatusHistoryItem[];
  createdAt: string;
}

export default function TrackBookingPage() {
  const [refQuery, setRefQuery] = useState("");
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!refQuery.trim()) return;

    setLoading(true);
    setSearched(true);
    setErrorMsg("");

    try {
      const res = await fetch(`/api/v1/bookings/track/${encodeURIComponent(refQuery.trim())}`);
      const json = await res.json();
      if (json.success && json.data) {
        setBooking(json.data);
      } else {
        setBooking(null);
        setErrorMsg(json.error || "No booking found with this reference number or phone.");
      }
    } catch (err) {
      console.error("Tracking lookup failed:", err);
      setErrorMsg("Failed to connect to tracking service.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: "pending", label: "Booking Received", desc: "Order submitted & queued" },
    { key: "confirmed", label: "Confirmed & Scheduled", desc: "Time slot verified by dispatch" },
    { key: "assigned", label: "Technician Assigned", desc: "Specialist dispatched to site" },
    { key: "in_progress", label: "Cleaning In-Progress", desc: "Sanitization actively underway" },
    { key: "completed", label: "Job Completed", desc: "Quality inspect & handover" }
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case "pending": return 0;
      case "confirmed": return 1;
      case "assigned": return 2;
      case "in_progress": return 3;
      case "completed": return 4;
      case "cancelled": return -1;
      default: return 0;
    }
  };

  const currentStepIdx = booking ? getStepIndex(booking.status) : 0;

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-1.5 bg-primary/10 text-primary px-3.5 py-1 rounded-full text-xs font-bold border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>REAL-TIME SERVICE TRACKER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Track Your Cleaning Job</h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Enter your booking reference ID (e.g. ZLV-2026-XXXX) or mobile number to track live status.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-3xl space-y-4 shadow-xl max-w-xl mx-auto">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={refQuery}
                onChange={(e) => setRefQuery(e.target.value)}
                placeholder="Booking Ref (ZLV-...) or Phone..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-semibold text-white focus:border-primary outline-none"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="py-3 px-6 rounded-xl bg-primary hover:bg-primaryHover text-neutral-950 font-extrabold text-xs shadow-lg transition-all"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Track Progress"}
            </Button>
          </form>
        </div>

        {/* Results Screen */}
        {searched && (
          <div className="space-y-6">
            {errorMsg ? (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-3xl text-center space-y-2">
                <AlertCircle className="w-8 h-8 mx-auto text-red-400" />
                <p className="text-xs font-bold">{errorMsg}</p>
              </div>
            ) : booking && (
              <div className="space-y-6">
                
                {/* Status Card Header */}
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-500 block">Booking Reference</span>
                      <span className="font-mono font-black text-xl text-primary">{booking.bookingNumber}</span>
                    </div>

                    <span className={`text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase border ${
                      booking.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      booking.status === 'cancelled' ? 'bg-red-500/10 text-red-400 border-red-500/30' :
                      booking.status === 'assigned' || booking.status === 'in_progress' ? 'bg-primary/10 text-primary border-primary/30' :
                      'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    }`}>
                      {booking.status.replace("_", " ")}
                    </span>
                  </div>

                  {/* 5-Step Visual Timeline */}
                  {booking.status !== "cancelled" ? (
                    <div className="py-4 space-y-6">
                      <div className="relative flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                        {steps.map((st, i) => {
                          const isDone = i <= currentStepIdx;
                          const isCurrent = i === currentStepIdx;

                          return (
                            <div key={st.key} className="flex md:flex-col items-center space-x-3 md:space-x-0 text-left md:text-center flex-1">
                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                                isCurrent ? "border-primary bg-primary text-neutral-950 shadow-lg scale-110" :
                                isDone ? "border-emerald-500 bg-emerald-500/20 text-emerald-400" :
                                "border-neutral-800 bg-neutral-950 text-neutral-600"
                              }`}>
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                              </div>
                              <div className="mt-2">
                                <span className={`text-xs font-bold block ${isDone ? "text-white" : "text-neutral-500"}`}>
                                  {st.label}
                                </span>
                                <span className="text-[10px] text-neutral-500 block hidden md:block">{st.desc}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                      This booking was cancelled.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-4 border-t border-neutral-800">
                    <div>
                      <span className="text-neutral-400 block font-semibold">Scheduled Arrival Slot</span>
                      <span className="text-white font-bold flex items-center space-x-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{booking.preferredDate} ({booking.preferredTime})</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block font-semibold">Service Address</span>
                      <span className="text-white font-medium flex items-center space-x-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="line-clamp-1">{booking.customerAddress}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Assigned Technician Profile Card */}
                {booking.assignedTechnician && (
                  <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl space-y-4">
                    <div className="flex items-center space-x-2 text-xs font-extrabold text-primary uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Assigned Cleaning Specialist</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 overflow-hidden">
                          <img src={booking.assignedTechnician.photo || "/images/work_img_1.jpeg"} alt="Technician" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-white text-sm">{booking.assignedTechnician.name}</h4>
                          <span className="text-xs text-neutral-400 flex items-center space-x-1">
                            <span>Rating: ★ {booking.assignedTechnician.rating || 4.9}</span>
                          </span>
                        </div>
                      </div>

                      <a
                        href={`tel:${booking.assignedTechnician.phone}`}
                        className="px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 text-xs font-bold transition-all flex items-center space-x-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Specialist</span>
                      </a>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
