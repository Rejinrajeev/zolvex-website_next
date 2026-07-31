"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MessageSquare, Star, CheckCircle2, Mail, Phone, Clock, RefreshCw } from "lucide-react";
import { fetchWithAuth } from "@/lib/api";

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
        fetchWithAuth("/api/v1/admin/messages"),
        fetchWithAuth("/api/v1/admin/reviews")
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
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-foreground">
              <MessageSquare className="w-7 h-7 text-primary" />
              <span>Contact Messages & Testimonials Moderation</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Respond to customer inquiries and moderate featured homepage reviews.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex space-x-2 border-b border-border pb-3 mb-6">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "messages"
                ? "bg-primary text-white shadow-md"
                : "bg-card text-muted border border-border hover:border-primary"
            }`}
          >
            Contact Messages ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "reviews"
                ? "bg-primary text-white shadow-md"
                : "bg-card text-muted border border-border hover:border-primary"
            }`}
          >
            Testimonials & Reviews ({reviews.length})
          </button>
        </div>

        {activeTab === "messages" ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg._id} className="bg-card border border-border p-5 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground text-sm">{msg.name}</span>
                  <span className="text-[10px] text-muted">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-xs text-muted flex items-center space-x-4">
                  <span className="flex items-center space-x-1"><Mail className="w-3.5 h-3.5 text-primary" /> <span>{msg.email}</span></span>
                  <span className="flex items-center space-x-1"><Phone className="w-3.5 h-3.5 text-primary" /> <span>{msg.phone}</span></span>
                </div>
                <div className="pt-2 text-xs text-foreground bg-secondaryBg/30 p-3 rounded-xl border border-border">
                  <strong className="text-foreground block mb-1">{msg.subject || "General Inquiry"}</strong>
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div key={rev._id} className="bg-card border border-border p-5 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-foreground text-sm block">{rev.customerName}</span>
                    <span className="text-[11px] text-muted">{rev.customerLocation}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-foreground italic">"{rev.comment}"</p>
                <div className="pt-3 border-t border-border flex justify-between items-center">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase">Approved</span>
                  <button
                    onClick={() => toggleReviewFeatured(rev._id)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                      rev.isFeatured
                        ? "bg-primary text-white shadow-xs"
                        : "bg-secondaryBg/30 text-muted border border-border hover:border-primary"
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
