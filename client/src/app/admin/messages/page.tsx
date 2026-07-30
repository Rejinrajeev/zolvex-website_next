"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MessageSquare, Star, CheckCircle2, Mail, Phone, Clock, RefreshCw } from "lucide-react";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Review {
  _id: string;
  customerName: string;
  customerLocation: string;
  rating: number;
  comment: string;
  status: string;
  isFeatured: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "reviews">("messages");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [msgRes, revRes] = await Promise.all([
        fetch("/api/v1/admin/messages"),
        fetch("/api/v1/admin/reviews")
      ]);
      const msgJson = await msgRes.json();
      const revJson = await revRes.json();

      if (msgJson.success && msgJson.data) setMessages(msgJson.data);
      if (revJson.success && revJson.data) setReviews(revJson.data);
    } catch (e) {
      console.warn("Failed to fetch messages/reviews:", e);
    } finally {
      setLoading(false);
    }
  };

  const toggleReviewFeatured = (id: string) => {
    setReviews(prev => prev.map(r => r._id === id ? { ...r, isFeatured: !r.isFeatured } : r));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-neutral-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2">
              <MessageSquare className="w-7 h-7 text-primary" />
              <span>Contact Messages & Testimonials Moderation</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Respond to customer inquiries and moderate featured homepage reviews.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex space-x-2 border-b border-neutral-800 pb-3 mb-6">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "messages"
                ? "bg-primary text-neutral-950 shadow-md"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800"
            }`}
          >
            Contact Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "reviews"
                ? "bg-primary text-neutral-950 shadow-md"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800"
            }`}
          >
            Testimonials & Reviews ({reviews.length})
          </button>
        </div>

        {activeTab === "messages" ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{msg.name}</span>
                  <span className="text-[10px] text-neutral-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-xs text-neutral-400 flex items-center space-x-4">
                  <span className="flex items-center space-x-1"><Mail className="w-3.5 h-3.5 text-primary" /> <span>{msg.email}</span></span>
                  <span className="flex items-center space-x-1"><Phone className="w-3.5 h-3.5 text-primary" /> <span>{msg.phone}</span></span>
                </div>
                <div className="pt-2 text-xs text-neutral-200 bg-neutral-950 p-3 rounded-xl border border-neutral-850">
                  <strong className="text-white block mb-1">{msg.subject || "General Inquiry"}</strong>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev._id} className="bg-neutral-900 border border-neutral-800 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-sm block">{rev.customerName}</span>
                    <span className="text-[11px] text-neutral-400">{rev.customerLocation}</span>
                  </div>
                  <div className="flex text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-neutral-300 italic">"{rev.comment}"</p>
                <div className="pt-3 border-t border-neutral-800 flex justify-between items-center">
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Approved</span>
                  <button
                    onClick={() => toggleReviewFeatured(rev._id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                      rev.isFeatured
                        ? "bg-primary text-neutral-950"
                        : "bg-neutral-950 text-neutral-400 border border-neutral-800"
                    }`}
                  >
                    {rev.isFeatured ? "Featured on Home" : "Feature Review"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
