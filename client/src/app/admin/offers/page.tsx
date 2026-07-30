"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Tag, Plus, CheckCircle2, Clock, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

interface Offer {
  _id: string;
  title: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minBookingAmount: number;
  maxDiscountAmount: number;
  isActive: boolean;
  timesUsed: number;
}

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    discountType: "percentage",
    discountValue: 20,
    minBookingAmount: 1500,
    maxDiscountAmount: 1000
  });

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await fetchWithAuth("/api/v1/admin/offers");
      const json = await res.json();
      if (json.success && json.data) {
        setOffers(json.data);
      }
    } catch (e) {
      console.warn("Failed to fetch offers:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth("/api/v1/admin/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (json.success) {
        setShowModal(false);
        fetchOffers();
      }
    } catch (err) {
      console.error("Create offer error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <Tag className="w-7 h-7 text-primary" />
              <span>Offers & Discount Engine</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Create and manage promotional coupons, percentage discounts, and minimum order requirements.
            </p>
          </div>

          <Button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primaryHover text-neutral-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Promo Code</span>
          </Button>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer._id} className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-lg text-primary tracking-wider px-3 py-1 bg-primary/10 rounded-lg border border-primary/30">
                  {offer.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase ${offer.isActive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400"}`}>
                  {offer.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base">{offer.title}</h3>
                <p className="text-xs text-neutral-400 mt-1">
                  {offer.discountType === "percentage" ? `${offer.discountValue}% OFF` : `₹${offer.discountValue} OFF`} on bookings over ₹{offer.minBookingAmount}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex justify-between text-[11px] text-neutral-400 font-semibold">
                <span>Times Used: <strong className="text-white">{offer.timesUsed}</strong></span>
                <span>Max Savings: <strong className="text-white">₹{offer.maxDiscountAmount}</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl max-w-md w-full space-y-4">
              <h2 className="text-lg font-bold text-white">Create Promo Code</h2>

              <form onSubmit={handleCreateOffer} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-neutral-300">Offer Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Monsoon Special 20% Off"
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300">Promo Code (Uppercase)</label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. SAVE20"
                    className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-primary outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Discount Value (%)</label>
                    <input
                      type="number"
                      required
                      value={formData.discountValue}
                      onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300">Min Order Amount (₹)</label>
                    <input
                      type="number"
                      required
                      value={formData.minBookingAmount}
                      onChange={(e) => setFormData({ ...formData, minBookingAmount: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-primary text-neutral-950 text-xs font-bold"
                  >
                    Save Coupon
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
